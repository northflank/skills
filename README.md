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

Install the Northflank Skill using Codex's built-in skill installer:

```text
$skill-installer https://github.com/northflank/skills/tree/master/skills/northflank
```

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

- The repository root is both the marketplace root and the `northflank` plugin root (`source: "./"` in `marketplace.json`).
- The skill lives at `./skills/northflank/`.
- Generated references under `skills/northflank/references/guides/` and `skills/northflank/references/api/` are rebuilt from Northflank's `llms.txt` index.
- Refresh generated references with `./skills/northflank/scripts/update-references.sh`
