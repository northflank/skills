# Northflank Skill

An agent skill for deploying, operating, and automating workloads on Northflank. Includes guidance and references for services, jobs, addons, preview environments, release workflows, sandboxes, GPU workloads, domains, secrets, templates, BYOC/BYOK, and the Northflank API and CLI.

## Installation

### Claude Code

From inside an interactive Claude Code session:

```text
/plugin marketplace add northflank/skills
/plugin install northflank@northflank
```

Or from your terminal using the `claude` CLI:

```bash
claude plugin marketplace add northflank/skills
claude plugin install northflank@northflank
```

`northflank/skills` is the GitHub shorthand for [`github.com/northflank/skills`](https://github.com/northflank/skills) — Claude Code resolves it to the marketplace at the repo root. Pass a full URL (`https://github.com/northflank/skills`) instead if you prefer to be explicit.

### OpenAI Codex

Install the Northflank plugin from its Git marketplace with a Codex version that supports `codex plugin`:

```bash
codex plugin marketplace add northflank/skills --ref master
codex plugin add northflank@northflank
```

Start a new Codex session after installation. The plugin includes the same skill and references as the Claude Code plugin. It does not configure the Northflank MCP server.

To refresh the marketplace from GitHub:

```bash
codex plugin marketplace upgrade northflank
```

Restart Codex after refreshing. This setup tracks `master`; a fixed commit would stay pinned. Run the refresh command when you need the latest version. See [Codex plugin packaging and marketplaces](https://developers.openai.com/plugins/build/plugins).

Workspace admins can instead import this repository as a GitHub marketplace. Workspace imports support automatic daily sync. See [workspace plugin management](https://learn.chatgpt.com/docs/enterprise/plugin-management).

If you previously installed the skill separately, remove that standalone copy to avoid loading it alongside the plugin.

For Codex versions without plugin support, use the built-in skill installer:

```text
$skill-installer https://github.com/northflank/skills/tree/master/skills/northflank
```

This installs a standalone copy rather than a marketplace-managed plugin.

### Skills CLI

Alternatively, install the Northflank Skill using the Skills CLI, which supports Codex, Claude Code, Cursor, OpenCode, and other coding agents:

```bash
npx skills add northflank/skills --global
```

### Manual Installation

If your editor supports loading skills from a directory, copy `skills/northflank` into the appropriate skills directory:

| Editor | Skill directory |
| :----- | :-------------- |
| Claude Code | `~/.claude/skills/` |
| Cursor | `~/.cursor/skills/` |
| OpenCode | `~/.config/opencode/skills/` |
| OpenAI Codex | `~/.codex/skills/` |
| Windsurf | `~/.windsurf/skills/` |

## Usage

For guided deployments and resource management from your coding agent, [connect the Northflank MCP server](https://northflank.com/docs/v1/application/ai-agents/mcp-server). The skill also supports the Northflank CLI and SDK workflows, so you can use your existing tools and authentication. Installing the skill and connecting MCP are separate setup steps.

After installation, ask your coding agent to do Northflank work directly. The skill should load automatically when the task involves Northflank projects, services, jobs, addons, preview environments, release workflows, AI sandboxes, GPU workloads, domains, secrets, templates, or the Northflank API and CLI.

Examples:

- "Deploy this service to Northflank from `ghcr.io/acme/api:latest`"
- "Create a preview environment for this branch on Northflank"
- "Set up a Postgres addon and wire its credentials into my service"
- "Help me write a Northflank template for this stack"
- "Use the Northflank CLI to exec into this service and triage this issue"
- "Show me how to deploy this workload to a GPU node pool on Northflank"

## Repository Structure

```text
northflank-skill/
├── plugin.json
├── .agents/
│   └── plugins/
│       └── marketplace.json
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .claude/
│   └── settings.json
└── skills/
    └── northflank/
        ├── SKILL.md
        ├── references/
        └── scripts/
```

## Maintainers

- The repository root is both the marketplace root and the `northflank` plugin root. The Codex and Claude marketplace entries both point to `./`.
- `plugin.json` uses the portable Agent Plugins format. `.claude-plugin/plugin.json` provides the Claude Code manifest. Keep their names, versions, and shared metadata in sync when releasing.
- The skill lives at `./skills/northflank/`.
- Generated references under `skills/northflank/references/guides/` and `skills/northflank/references/api/` are rebuilt from Northflank's `llms.txt` index.
- Refresh generated references with `./skills/northflank/scripts/update-references.sh`
