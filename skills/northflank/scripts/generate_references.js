#!/usr/bin/env node
/*
 * Build generated Northflank reference files from the public docs index
 * and the live Northflank public API.
 *
 * This script owns only generated reference material:
 *   - northflank/references/guides/**
 *   - northflank/references/api/**
 *   - northflank/references/plans.md   (live compute/GPU plans + regions)
 *
 * Editorial files such as SKILL.md, api-overview.md, cli.md, and js-client/*
 * stay hand-maintained.
 */

const fs = require("node:fs/promises");
const path = require("node:path");
const posixPath = path.posix;

const DEFAULT_LLMS_URL = "https://northflank.com/docs/llms.txt";
const DOCS_BASE_URL = "https://northflank.com/docs";
const NF_API_BASE = "https://api.northflank.com/v1";
const HTTP_USER_AGENT = "northflank-reference-builder/1.0";
const DOC_URL_PATTERN = /https:\/\/northflank\.com\/docs\/[^\s)>\]]+\.md/g;
const HTTP_PATH_PATTERN = /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+([/][v]1\/\S+)\s*$/gm;
const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/;

const SCRIPT_DIR = __dirname;
const SKILL_DIR = path.resolve(SCRIPT_DIR, "..");
const REFERENCES_DIR = path.join(SKILL_DIR, "references");
const GUIDES_DIR = path.join(REFERENCES_DIR, "guides");
const API_DIR = path.join(REFERENCES_DIR, "api");
const DEFAULT_CACHE_DIR = path.join(SKILL_DIR, ".cache", "references");

const NAME_OVERRIDES = {
  api: "API",
  byoc: "BYOC",
  byok: "BYOK",
  cdn: "CDN",
  cli: "CLI",
  cpu: "CPU",
  gpu: "GPU",
  ha: "HA",
  iac: "IaC",
  js: "JS",
  oauth: "OAuth",
  oidc: "OIDC",
  rbac: "RBAC",
  saml: "SAML",
  sdk: "SDK",
  sso: "SSO",
  tls: "TLS",
  vcs: "VCS",
};

class SourceDoc {
  constructor({ url, area, pathParts, stem }) {
    this.url = url;
    this.area = area;
    this.pathParts = pathParts;
    this.stem = stem;
  }

  cachePath(cacheDir) {
    return path.join(cacheDir, "pages", ...this.pathParts);
  }
}

class NorthflankReferenceBuilder {
  constructor({ llmsUrl, cacheDir, forceRefresh }) {
    this.llmsUrl = llmsUrl;
    this.cacheDir = cacheDir;
    this.forceRefresh = forceRefresh;
    this.stats = {
      applicationTotal: 0,
      apiTotal: 0,
      skippedMissing: [],
    };
    this.docLinkMap = new Map();
  }

  async run() {
    await fs.mkdir(REFERENCES_DIR, { recursive: true });

    let sourceIndex;
    try {
      sourceIndex = await this.readRemoteText(this.llmsUrl, path.join(this.cacheDir, "llms.txt"));
    } catch (error) {
      console.error(`Failed to fetch ${this.llmsUrl}: ${error.message}`);
      return 1;
    }

    const documents = this.collectDocuments(sourceIndex);
    this.docLinkMap = this.buildDocLinkMap(documents);
    const applicationDocs = documents.filter((doc) => doc.area === "application");
    const apiDocs = documents.filter((doc) => doc.area === "api");

    this.stats.applicationTotal = applicationDocs.length;
    this.stats.apiTotal = apiDocs.length;

    console.log(`Fetched llms index: ${this.llmsUrl}`);
    console.log(`Application pages: ${this.stats.applicationTotal}`);
    console.log(`API pages: ${this.stats.apiTotal}`);

    await this.buildGuideReferences(applicationDocs);
    await this.buildApiReferences(apiDocs);
    await this.buildPlansReference();

    if (this.stats.skippedMissing.length > 0) {
      console.log(`Skipped missing pages: ${this.stats.skippedMissing.length}`);
      for (const url of this.stats.skippedMissing) {
        console.log(`  - ${url}`);
      }
    }

    console.log(`Updated generated references under ${REFERENCES_DIR}`);
    return 0;
  }

  async readRemoteText(url, destination) {
    if (!this.forceRefresh) {
      try {
        return await fs.readFile(destination, "utf8");
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
    }

    await fs.mkdir(path.dirname(destination), { recursive: true });

    const response = await fetch(url, {
      headers: {
        "User-Agent": HTTP_USER_AGENT,
        Accept: "text/markdown, text/plain;q=0.9, */*;q=0.1",
      },
    });

    if (!response.ok) {
      const error = new Error(`HTTP ${response.status} ${response.statusText}`);
      error.status = response.status;
      throw error;
    }

    const text = await response.text();
    await fs.writeFile(destination, text, "utf8");
    return text;
  }

  collectDocuments(sourceIndex) {
    const discovered = [];
    const seen = new Set();

    for (const url of sourceIndex.match(DOC_URL_PATTERN) || []) {
      if (seen.has(url)) {
        continue;
      }
      seen.add(url);

      const document = this.mapUrlToSourceDoc(url);
      if (document) {
        discovered.push(document);
      }
    }

    return discovered;
  }

  mapUrlToSourceDoc(url) {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts.length < 4) {
      return null;
    }
    if (parts[0] !== "docs" || parts[1] !== "v1") {
      return null;
    }

    const area = parts[2];
    if (area !== "application" && area !== "api") {
      return null;
    }

    const pathParts = parts.slice(3);
    if (pathParts.length === 0) {
      return null;
    }

    return new SourceDoc({
      url,
      area,
      pathParts,
      stem: path.basename(pathParts[pathParts.length - 1], ".md"),
    });
  }

  async loadDocPage(document) {
    let rawText;
    try {
      rawText = await this.readRemoteText(document.url, document.cachePath(this.cacheDir));
    } catch (error) {
      if (error.status === 404) {
        this.stats.skippedMissing.push(document.url);
        console.error(`Skipping missing page from llms.txt: ${document.url}`);
        return null;
      }
      throw error;
    }

    const cleaned = this.normalizeMarkdown(rawText);
    return this.extractTitleAndBody(cleaned, this.displayName(document.stem));
  }

  normalizeMarkdown(text) {
    const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/^\uFEFF/, "");
    const outputLines = [];
    let insideCodeBlock = false;

    for (const line of normalized.split("\n")) {
      const stripped = line.trim();

      if (stripped.startsWith("```")) {
        insideCodeBlock = !insideCodeBlock;
      }

      if (!insideCodeBlock && /^<a\s+id="[^"]+"\s*><\/a>$/i.test(stripped)) {
        continue;
      }

      if (!insideCodeBlock && (stripped.startsWith("Previous: ") || stripped.startsWith("Next: "))) {
        continue;
      }

      outputLines.push(line.replace(/[ \t]+$/g, ""));
    }

    return outputLines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  buildDocLinkMap(documents) {
    const mapping = new Map();
    const conflicts = new Set();

    for (const document of documents) {
      const sourcePath = this.sourcePathForDocument(document);
      const target = this.outputTargetForDocument(document);

      this.registerDocTarget(mapping, conflicts, sourcePath, target);

      if (document.area !== "api") {
        continue;
      }

      for (const aliasPath of this.shortApiAliasesForDocument(document)) {
        this.registerDocTarget(mapping, conflicts, aliasPath, target);
      }
    }

    return mapping;
  }

  outputTargetForDocument(document) {
    if (document.area === "api") {
      return {
        outputPath: path.join("api", ...document.pathParts),
      };
    }

    if (document.pathParts.length === 1) {
      return {
        outputPath: path.join("guides", `${document.stem}.md`),
      };
    }

    return {
      outputPath: path.join("guides", `${document.pathParts[0]}.md`),
      pageAnchor: document.stem,
    };
  }

  registerDocTarget(mapping, conflicts, sourcePath, target) {
    const existing = mapping.get(sourcePath);
    if (!existing) {
      if (!conflicts.has(sourcePath)) {
        mapping.set(sourcePath, target);
      }
      return;
    }

    if (existing.outputPath === target.outputPath && existing.pageAnchor === target.pageAnchor) {
      return;
    }

    mapping.delete(sourcePath);
    conflicts.add(sourcePath);
  }

  shortApiAliasesForDocument(document) {
    const aliases = [];

    if (document.pathParts.length >= 2) {
      const [scope, ...rest] = document.pathParts;
      if (["project", "team", "org"].includes(scope)) {
        aliases.push(`/${["v1", document.area, ...rest].join("/")}`.replace(/\.md$/i, ""));
      }
    }

    const stem = document.stem;
    if (document.pathParts.join("/") === "project/secrets/create-project-secret.md") {
      aliases.push("/v1/api/secrets/create-secret");
    }
    if (document.pathParts.join("/") === "project/secrets/update-project-secret-addon-link.md") {
      aliases.push("/v1/api/secrets/update-secret-addon-link");
    }

    if (stem === "list-addon-types") {
      aliases.push("/v1/api/addons/list-addon-types");
    }

    return aliases;
  }

  sourcePathForDocument(document) {
    return `/${["v1", document.area, ...document.pathParts].join("/")}`.replace(/\.md$/i, "");
  }

  normalizeSourceHref(href, currentSourcePath = "") {
    let working = href.trim();

    while (working.startsWith("(") && working.endsWith(")")) {
      working = working.slice(1, -1).trim();
    }

    if (!this.looksLikeDocHref(working)) {
      return null;
    }

    let fragment = "";

    const hashIndex = working.indexOf("#");
    if (hashIndex >= 0) {
      fragment = working.slice(hashIndex + 1);
      working = working.slice(0, hashIndex);
    }

    if (working === "" && currentSourcePath) {
      return {
        sourcePath: currentSourcePath,
        fragment,
      };
    }

    if (working.startsWith("https://northflank.com/docs/")) {
      working = working.slice("https://northflank.com/docs".length);
    } else if (working.startsWith("http://northflank.com/docs/")) {
      working = working.slice("http://northflank.com/docs".length);
    }

    if (working.startsWith("/docs/")) {
      working = working.slice("/docs".length);
    }

    if (working.startsWith("#")) {
      return currentSourcePath
        ? {
            sourcePath: currentSourcePath,
            fragment,
          }
        : null;
    }

    if (!working.startsWith("/")) {
      if (!currentSourcePath) {
        return null;
      }

      const baseDirectory = posixPath.dirname(currentSourcePath);
      working = posixPath.resolve(baseDirectory, working);
    }

    return {
      sourcePath: working.replace(/\.md$/i, ""),
      fragment,
    };
  }

  docsUrlFromSourcePath(sourcePath, fragment = "") {
    const suffix = sourcePath.startsWith("/") ? sourcePath : `/${sourcePath}`;
    return `${DOCS_BASE_URL}${suffix}${fragment ? `#${fragment}` : ""}`;
  }

  looksLikeDocHref(href) {
    if (!href) {
      return false;
    }

    return (
      href.startsWith("#") ||
      href.startsWith("/") ||
      href.startsWith("./") ||
      href.startsWith("../") ||
      href.startsWith("docs/") ||
      href.startsWith("v1/") ||
      href.startsWith("https://northflank.com/docs/") ||
      href.startsWith("http://northflank.com/docs/") ||
      /^[a-z0-9][a-z0-9/_#.-]*$/i.test(href)
    );
  }

  toLocalLink(currentOutputPath, target) {
    const currentDir = path.dirname(currentOutputPath);
    let relativePath = path.relative(currentDir, path.join(REFERENCES_DIR, target.outputPath));
    if (relativePath === "") {
      relativePath = path.basename(target.outputPath);
    }

    return relativePath.split(path.sep).join("/");
  }

  rewriteLocalDocLinks(markdown, currentOutputPath, currentSourcePath = "") {
    const output = [];
    const lines = markdown.split("\n");
    let insideCodeBlock = false;

    for (const line of lines) {
      const stripped = line.trim();
      if (stripped.startsWith("```")) {
        insideCodeBlock = !insideCodeBlock;
        output.push(line);
        continue;
      }

      if (insideCodeBlock || !line.includes("](")) {
        output.push(line);
        continue;
      }

      output.push(this.rewriteLinksInLine(line, currentOutputPath, currentSourcePath));
    }

    return output.join("\n");
  }

  rewriteLinksInLine(line, currentOutputPath, currentSourcePath = "") {
    let index = 0;
    let rewritten = "";

    while (index < line.length) {
      const labelStart = line.indexOf("[", index);
      if (labelStart < 0) {
        rewritten += line.slice(index);
        break;
      }

      const labelEnd = line.indexOf("](", labelStart);
      if (labelEnd < 0) {
        rewritten += line.slice(index);
        break;
      }

      const hrefStart = labelEnd + 2;
      const hrefEnd = this.findMarkdownHrefEnd(line, hrefStart);
      if (hrefEnd < 0) {
        rewritten += line.slice(index);
        break;
      }

      rewritten += line.slice(index, labelStart);

      const label = line.slice(labelStart, labelEnd + 1);
      const href = line.slice(hrefStart, hrefEnd);
      rewritten += this.resolveMarkdownLink(label, href, currentOutputPath, currentSourcePath);
      index = hrefEnd + 1;
    }

    return rewritten;
  }

  findMarkdownHrefEnd(line, hrefStart) {
    let depth = 0;

    for (let index = hrefStart; index < line.length; index += 1) {
      const char = line[index];

      if (char === "(") {
        depth += 1;
        continue;
      }

      if (char !== ")") {
        continue;
      }

      if (depth === 0) {
        return index;
      }

      depth -= 1;
    }

    return -1;
  }

  resolveMarkdownLink(label, href, currentOutputPath, currentSourcePath = "") {
    if (
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("data:") ||
      href.startsWith("javascript:") ||
      (href.startsWith("http://") && !href.startsWith("http://northflank.com/docs/")) ||
      (href.startsWith("https://") && !href.startsWith("https://northflank.com/docs/"))
    ) {
      return `${label}(${href})`;
    }

    const normalized = this.normalizeSourceHref(href, currentSourcePath);
    if (!normalized) {
      return `${label}(${href})`;
    }

    const target = this.docLinkMap.get(normalized.sourcePath);
    if (!target) {
      return `${label}(${this.docsUrlFromSourcePath(normalized.sourcePath, normalized.fragment)})`;
    }

    let resolved = this.toLocalLink(currentOutputPath, target);
    if (normalized.fragment) {
      const localFragment = target.pageAnchor
        ? `${target.pageAnchor}-${normalized.fragment}`
        : normalized.fragment;
      resolved += `#${localFragment}`;
    } else if (target.pageAnchor) {
      resolved += `#${target.pageAnchor}`;
    }

    return `${label}(${resolved})`;
  }

  slugifyHeading(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[`"'()[\]{}:!?.,/\\]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  extractTitleAndBody(markdown, fallbackTitle) {
    const match = markdown.match(/^#\s+(.+)$/m);
    if (!match) {
      return [fallbackTitle, markdown.trim()];
    }

    const title = match[1].trim();
    const index = match.index ?? 0;
    const body = (markdown.slice(0, index) + markdown.slice(index + match[0].length)).replace(/^\n+/, "").trim();
    return [title, body];
  }

  displayName(value) {
    return value
      .replace(/\.md$/i, "")
      .split("-")
      .map((word) => NAME_OVERRIDES[word.toLowerCase()] || `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(" ");
  }

  nestHeadings(markdown, headingPrefix = "") {
    const nestedLines = [];
    let insideCodeBlock = false;

    for (const line of markdown.split("\n")) {
      const stripped = line.trim();

      if (stripped.startsWith("```")) {
        insideCodeBlock = !insideCodeBlock;
        nestedLines.push(line);
        continue;
      }

      if (insideCodeBlock) {
        nestedLines.push(line);
        continue;
      }

      const match = line.match(HEADING_PATTERN);
      if (!match) {
        nestedLines.push(line);
        continue;
      }

      const depth = Math.min(6, match[1].length + 1);
      const headingText = headingPrefix ? `${headingPrefix}: ${match[2]}` : match[2];
      nestedLines.push(`${"#".repeat(depth)} ${headingText}`);
    }

    return nestedLines.join("\n").trim();
  }

  async writeFile(filePath, content) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, `${content.trimEnd()}\n`, "utf8");
  }

  async resetDirectory(directory) {
    await fs.rm(directory, { recursive: true, force: true });
    await fs.mkdir(directory, { recursive: true });
  }

  async buildGuideReferences(documents) {
    await this.resetDirectory(GUIDES_DIR);

    const groupedSections = new Map();
    const standalonePages = [];

    for (const document of [...documents].sort(compareDocs)) {
      const page = await this.loadDocPage(document);
      if (!page) {
        continue;
      }

      const [title, body] = page;
      if (document.pathParts.length === 1) {
        standalonePages.push({ document, title, body });
        continue;
      }

      const sectionKey = document.pathParts[0];
      if (!groupedSections.has(sectionKey)) {
        groupedSections.set(sectionKey, []);
      }
      groupedSections.get(sectionKey).push({ document, title, body });
    }

    this.updateApplicationLinkTargets(groupedSections, standalonePages);
    await this.writeGuideIndex(groupedSections, standalonePages);

    for (const sectionKey of [...groupedSections.keys()].sort()) {
      await this.writeGroupedGuide(sectionKey, groupedSections.get(sectionKey));
    }

    for (const entry of standalonePages) {
      await this.writeFile(
        path.join(GUIDES_DIR, `${entry.document.stem}.md`),
        this.rewriteLocalDocLinks([
          `# ${entry.title}`,
          "",
          `Source: ${entry.document.url}`,
          "",
          this.rewriteLocalDocLinks(
            this.nestHeadings(entry.body),
            path.join(GUIDES_DIR, `${entry.document.stem}.md`),
            this.sourcePathForDocument(entry.document),
          ),
          "",
        ].join("\n"), path.join(GUIDES_DIR, `${entry.document.stem}.md`)),
      );
    }
  }

  async writeGuideIndex(groupedSections, standalonePages) {
    const lines = [
      "# Northflank Guides",
      "",
      "Generated from the application pages listed in `https://northflank.com/docs/llms.txt`.",
      "",
    ];

    if (groupedSections.size > 0) {
      lines.push("## Categories", "");
      for (const sectionKey of [...groupedSections.keys()].sort()) {
        lines.push(`- [${this.displayName(sectionKey)}](${sectionKey}.md) — ${groupedSections.get(sectionKey).length} pages`);
      }
      lines.push("");
    }

    if (standalonePages.length > 0) {
      lines.push("## Standalone Guides", "");
      for (const entry of standalonePages) {
        lines.push(`- [${entry.title}](${entry.document.stem}.md)`);
      }
      lines.push("");
    }

    await this.writeFile(path.join(GUIDES_DIR, "_index.md"), lines.join("\n"));
  }

  updateApplicationLinkTargets(groupedSections, standalonePages) {
    for (const entry of standalonePages) {
      this.docLinkMap.set(this.sourcePathForDocument(entry.document), {
        outputPath: path.join("guides", `${entry.document.stem}.md`),
      });
    }

    for (const [sectionKey, entries] of groupedSections.entries()) {
      for (const entry of entries) {
        this.docLinkMap.set(this.sourcePathForDocument(entry.document), {
          outputPath: path.join("guides", `${sectionKey}.md`),
          pageAnchor: this.slugifyHeading(entry.title),
        });
      }
    }
  }

  async writeGroupedGuide(sectionKey, entries) {
    const outputPath = path.join(GUIDES_DIR, `${sectionKey}.md`);
    const lines = [
      `# ${this.displayName(sectionKey)}`,
      "",
      `Generated from ${entries.length} application pages listed in \`llms.txt\`.`,
      "",
      "## Pages",
      "",
    ];

    for (const entry of entries) {
      lines.push(`- [${entry.title}](#${this.slugifyHeading(entry.title)})`);
    }
    lines.push("");

    for (const entry of entries) {
      lines.push(
        `## ${entry.title}`,
        "",
        `Source: ${entry.document.url}`,
        "",
        this.rewriteLocalDocLinks(
          this.nestHeadings(entry.body, entry.title),
          outputPath,
          this.sourcePathForDocument(entry.document),
        ),
        "",
      );
    }

    await this.writeFile(outputPath, lines.join("\n"));
  }

  async buildApiReferences(documents) {
    await this.resetDirectory(API_DIR);

    for (const document of [...documents].sort(compareDocs)) {
      const page = await this.loadDocPage(document);
      if (!page) {
        continue;
      }

      const [title, body] = page;
      const outputPath = path.join(API_DIR, ...document.pathParts);
      await this.writeFile(
        outputPath,
        this.rewriteLocalDocLinks([
          `# ${title}`,
          "",
          `Source: ${document.url}`,
          "",
          this.rewriteLocalDocLinks(
            this.nestHeadings(body),
            outputPath,
            this.sourcePathForDocument(document),
          ),
          "",
        ].join("\n"), outputPath),
      );
    }

    await this.writeApiIndexes(API_DIR, API_DIR);
  }

  async buildPlansReference() {
    const plansUrl = `${NF_API_BASE}/plans`;
    const regionsUrl = `${NF_API_BASE}/regions`;

    let plansData;
    let regionsData;

    try {
      const plansText = await this.readRemoteText(plansUrl, path.join(this.cacheDir, "api", "plans.json"));
      plansData = JSON.parse(plansText).data?.plans || [];
    } catch (error) {
      console.error(`Skipping plans reference — failed to fetch ${plansUrl}: ${error.message}`);
      return;
    }

    try {
      const regionsText = await this.readRemoteText(regionsUrl, path.join(this.cacheDir, "api", "regions.json"));
      regionsData = JSON.parse(regionsText).data?.regions || [];
    } catch (error) {
      console.error(`Skipping plans reference — failed to fetch ${regionsUrl}: ${error.message}`);
      return;
    }

    const markdown = this.formatPlansMarkdown(plansData, regionsData);
    await this.writeFile(path.join(REFERENCES_DIR, "plans.md"), markdown);
    console.log(`Wrote plans reference: ${plansData.length} compute plans, ${regionsData.length} regions`);
  }

  formatPlansMarkdown(plans, regions) {
    const formatRam = (mb) => (mb >= 1024 ? `${(mb / 1024).toString()} GB` : `${mb} MB`);
    const formatMoney = (n) => (n == null ? "—" : `$${n}`);

    const sortedPlans = [...plans].sort(
      (a, b) => (a.cpuResource - b.cpuResource) || (a.ramResource - b.ramResource) || a.id.localeCompare(b.id),
    );

    const computeRows = sortedPlans.map((plan) => {
      const buildable = (plan.type || []).includes("build") ? "✓" : "—";
      return `| \`${plan.id}\` | ${plan.cpuResource} | ${formatRam(plan.ramResource)} | ${formatMoney(plan.amountPerMonth)} | ${formatMoney(plan.amountPerHour)} | ${buildable} |`;
    });

    const gpuMap = new Map();
    for (const region of regions) {
      for (const gpu of region.gpuDevices || []) {
        if (!gpuMap.has(gpu.id)) {
          gpuMap.set(gpu.id, {
            id: gpu.id,
            name: gpu.name,
            manufacturer: gpu.manufacturer,
            memoryMiB: gpu.memoryInfo?.sizeInMiB,
            counts: gpu.countOptions || [],
            priceCents: gpu.pricing?.onDemand,
            regions: [],
          });
        }
        gpuMap.get(gpu.id).regions.push(region.id);
      }
    }

    const gpuModels = [...gpuMap.values()].sort((a, b) => (a.priceCents || 0) - (b.priceCents || 0));

    const gpuRows = gpuModels.map((gpu) => {
      const vram = gpu.memoryMiB ? `${Math.round(gpu.memoryMiB / 1024)} GB` : "—";
      const counts = gpu.counts.length ? gpu.counts.join(", ") : "—";
      const price = gpu.priceCents != null ? `$${(gpu.priceCents / 100).toFixed(2)}` : "—";
      return `| ${gpu.manufacturer} ${gpu.name} | \`${gpu.id}\` | ${vram} | ${counts} | ${price} | ${gpu.regions.join(", ")} |`;
    });

    const enumeratedSlugs = [];
    for (const gpu of [...gpuModels].sort((a, b) => a.id.localeCompare(b.id))) {
      for (const count of gpu.counts) {
        const vram = gpu.memoryMiB ? `${Math.round(gpu.memoryMiB / 1024)} GB` : "?";
        enumeratedSlugs.push(`- \`nf-gpu-${gpu.id}-${count}g\` — ${count}× ${gpu.manufacturer} ${gpu.name} (${vram})`);
      }
    }

    const sortedRegions = [...regions].sort(
      (a, b) => a.regionName.localeCompare(b.regionName) || a.id.localeCompare(b.id),
    );

    const regionRows = sortedRegions.map((region) => {
      const gpus = (region.gpuDevices || []).map((g) => g.name).join(", ") || "—";
      const provider = region.provider ? `\`${region.provider.id}/${region.provider.region}\`` : "—";
      return `| \`${region.id}\` | ${region.name} | ${region.regionName} | ${provider} | ${gpus} |`;
    });

    const lines = [
      "# Northflank Plans & Regions",
      "",
      `Generated from \`GET ${NF_API_BASE}/plans\` and \`GET ${NF_API_BASE}/regions\`. Both endpoints are public (no auth) — **query them directly if a SKU below looks stale or is missing**. Maintainers can refresh this file with \`node scripts/generate_references.js --force\`.`,
      "",
      "## Compute plans",
      "",
      "Used as `billing.deploymentPlan` (and `billing.buildPlan` for plans flagged build-capable).",
      "",
      "| Plan ID | vCPU | RAM | $/mo | $/hr | Build |",
      "|---|---|---|---|---|---|",
      ...computeRows,
      "",
      "## GPU plans",
      "",
      "GPU services use a paired plan slug: `nf-gpu-<gpuType>-<count>g`. Set `deployment.gpu` (or `billing.gpu`) with matching `gpuType` and `gpuCount`.",
      "",
      "### GPU models (managed cloud)",
      "",
      "Pricing is per GPU per hour, on top of the bundled CPU/RAM in the `nf-gpu-*` plan.",
      "",
      "| Model | `gpuType` | VRAM | Counts per instance | $/hr per GPU | Available regions |",
      "|---|---|---|---|---|---|",
      ...gpuRows,
      "",
      "### Enumerated GPU plan slugs",
      "",
      ...enumeratedSlugs,
      "",
      "## Regions",
      "",
      "Northflank's managed cloud runs on Google Cloud. GPU availability varies — only regions with GPU devices are selectable for GPU-enabled projects.",
      "",
      "| ID | Name | Group | GCP region | GPU models |",
      "|---|---|---|---|---|",
      ...regionRows,
      "",
    ];

    return lines.join("\n");
  }

  async writeApiIndexes(directory, root) {
    const relative = path.relative(root, directory);
    const relativeParts = relative === "" ? [] : relative.split(path.sep);
    const sectionTitle = relativeParts.length > 0
      ? `${relativeParts.map((part) => this.displayName(part)).join(" / ")} Endpoints`
      : "API Reference Index";

    const entries = await fs.readdir(directory, { withFileTypes: true });
    const subdirectories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
    const markdownFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "_index.md")
      .map((entry) => entry.name)
      .sort();

    const lines = [
      `# ${sectionTitle}`,
      "",
      "Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.",
      "",
    ];

    if (subdirectories.length > 0) {
      lines.push("## Groups", "");
      for (const subdirectory of subdirectories) {
        lines.push(`- [${this.displayName(subdirectory)}](${subdirectory}/_index.md) — ${await this.countMarkdownLeaves(path.join(directory, subdirectory))} endpoints`);
      }
      lines.push("");
    }

    if (markdownFiles.length > 0) {
      lines.push("## Pages", "", "| Page | API Reference | File |", "|------|---------------|------|");
      for (const markdownFile of markdownFiles) {
        const content = await fs.readFile(path.join(directory, markdownFile), "utf8");
        const [title] = this.extractTitleAndBody(content, this.displayName(path.basename(markdownFile, ".md")));
        lines.push(`| **${title}** | ${this.apiSummary(content) || "-"} | [${markdownFile}](${markdownFile}) |`);
      }
      lines.push("");
    }

    await this.writeFile(path.join(directory, "_index.md"), lines.join("\n"));

    for (const subdirectory of subdirectories) {
      await this.writeApiIndexes(path.join(directory, subdirectory), root);
    }
  }

  async countMarkdownLeaves(directory) {
    let count = 0;
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        count += await this.countMarkdownLeaves(entryPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "_index.md") {
        count += 1;
      }
    }

    return count;
  }

  apiSummary(markdown) {
    const matches = [...markdown.matchAll(HTTP_PATH_PATTERN)];
    if (matches.length === 0) {
      return "";
    }
    return matches.map((match) => `\`${match[1]} ${match[2]}\``).join("<br>");
  }
}

function compareDocs(left, right) {
  return left.pathParts.join("/").localeCompare(right.pathParts.join("/"));
}

function parseArgs(argv) {
  const options = {
    llmsUrl: DEFAULT_LLMS_URL,
    cacheDir: DEFAULT_CACHE_DIR,
    force: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--llms-url") {
      index += 1;
      if (index >= argv.length) {
        throw new Error("--llms-url requires a value");
      }
      options.llmsUrl = argv[index];
      continue;
    }

    if (arg === "--cache-dir") {
      index += 1;
      if (index >= argv.length) {
        throw new Error("--cache-dir requires a value");
      }
      options.cacheDir = path.resolve(argv[index]);
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function printHelp() {
  console.log(`usage: generate_references.js [--llms-url URL] [--cache-dir PATH] [--force]

Generate Northflank references from llms.txt

options:
  -h, --help           show this help message and exit
  --llms-url URL       Override llms.txt URL
  --cache-dir PATH     Cache directory for fetched docs
  --force              Refetch llms.txt and markdown pages`);
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    printHelp();
    process.exitCode = 1;
    return;
  }

  const builder = new NorthflankReferenceBuilder({
    llmsUrl: options.llmsUrl,
    cacheDir: options.cacheDir,
    forceRefresh: options.force,
  });

  process.exitCode = await builder.run();
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
