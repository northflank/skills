# Northflank CLI Reference

## Installation

```bash
pnpm add -g @northflank/cli@latest
nf --version
```

Requires Node.js 22.13.0 or later, excluding 26.0.x. Both `nf` and `northflank` run the same CLI.

## Authentication

```bash
# Browser-based login
northflank login

# Manual API-token login through a prompt
northflank login --token-login

# Name the context for switching later
northflank login -n my-context
```

Browser login saves a CLI session without a separately created API token. Select the intended team and wait for the command to finish. Never paste credentials into an agent conversation.

## Coding agent setup

Use a team login and an installed Claude Code, Codex, Cursor, or OpenCode client. Codex requires the `codex` command with plugin support. Personal and organization-scoped logins cannot connect through the CLI bridge, which reads your saved CLI session for MCP requests.

Replace `claude` with the requested agent:

```sh
nf agent setup --agent claude --dry-run
nf agent setup --agent claude --yes
nf agent status --check --agent claude
```

Setup installs the canonical skill or Codex plugin and configures MCP for all your projects. Tokens stay out of the agent configuration. `--dry-run` previews changes without authentication checks. Explain any replacement before applying it. `--yes` accepts replacement of conflicting Northflank MCP entries after a private backup. Keep backups private because they can contain credentials. Modified skills and other MCP servers are preserved.

Reconnect or restart the agent if it cannot load the new connection. Then call `get_auth_context` to confirm the intended team. In Claude Code, use `/mcp` or `claude mcp get northflank` to inspect connection failures. A project entry can override the user connection.

Use `nf agent update --agent claude` to update the installation. Use `nf agent remove --agent claude` to remove the managed installation and MCP connection. Both include MCP by default. Add `--yes` for non-interactive changes.

For skills or plugins only, add `--no-mcp --scope user`. For a project skill, use `--no-mcp --scope project`. Codex plugins require user scope. These flags also apply to update, status, and removal.

### Login recovery

When credentials expire, the bridge returns login instructions. Follow them to renew the same named context and team. Renewal updates the normal CLI login too. The running bridge reads the new session on the next request. Reconnect only if the agent disconnected.

The `--override` login option clears the context's saved resource defaults. To change teams or context names, select the intended CLI context, rerun setup, and reconnect. Rerun setup if the CLI or Node.js installation moves.

If an environment token overrides your saved login, unset `NF_API_TOKEN`, `NORTHFLANK_API_TOKEN`, `NF_API_HOST`, and `NORTHFLANK_API_HOST` before setup.

### Managed harnesses

On harness images with automatic MCP setup, startup configures the selected supported agent when `NORTHFLANK_API_TOKEN_FILE` is set. This file contains a rotating workload identity token. It grants the harness its assigned permissions. Reuse this connection instead of logging in with a personal CLI session.

If `NORTHFLANK_API_TOKEN_FILE` is set but MCP is not configured, run:

```sh
nf agent mcp setup-workload --agent claude
```

Replace `claude` with `codex`, `cursor`, or `opencode` as needed. The command configures MCP without installing skills. It preserves conflicting user configuration. Follow the reported error before making changes. The bridge reads the mounted token as it rotates. Do not copy it into a static environment value or run `nf login` to replace it.

## Contexts

```bash
# List all contexts
northflank context ls

# Switch context
northflank context use

# Set default project, service, or job for current context
northflank context use project
northflank context use service
northflank context use job
```

## Repository defaults

Create `northflank.yaml` to share resource defaults in a repository:

```yaml
context:
  team: my-team
  project: my-project
  service: my-service
```

Use resource IDs, as you do with `--projectId` and `--serviceId`. Supported fields are `team`, `project`, `service`, `job`, `addon`, `volume`, and `harness`. Keep credentials and API endpoints out of this file. Saved logins remain in `~/.northflank/config.json`, or the configured CLI directory, and use JSON only.

The CLI checks the current directory, then the Git repository root. It supports `northflank.yaml` and `northflank.yml`, with `.yaml` taking precedence in each directory. Explicit command options override file defaults. When a local file is present, omitted fields do not inherit global defaults. Use `--noDefaults` to ignore both. Deletion commands also ignore resource defaults.

Use a regular file of at most 64 KiB. Invalid files cause a warning and disable local and global defaults. `nf context use` changes global defaults, not this file. See the [generated CLI guide](api/use-the-cli.md) for the full file rules.

## Creating Resources

Pass resource definitions as JSON/YAML inline or from a file. Definitions match API request bodies.

```bash
# Inline JSON/YAML
northflank create service deployment --input '{"name": "my-service", ...}'

# From file
northflank create service deployment --file ./service-definition.yaml
```

Short flags: `--input` / `-i`, `--file` / `-f`.

Common create commands:
- `northflank create project`
- `northflank create service combined|deployment|build`
- `northflank create addon`
- `northflank create secret`
- `northflank create template`
- `northflank create job`

## Querying Resources

```bash
# Get details
northflank get project
northflank get service
northflank get addon
northflank get addon credentials

# List resources
northflank list projects
northflank list services
northflank list addons
northflank list secrets
northflank list jobs
```

## Logs

```bash
# Tail runtime logs (live follow)
northflank get service logs -f
northflank get job logs -f
northflank get addon logs -f

# Options
#   --lineLimit <n>        Max lines to return
#   --startTime <iso>      Start from timestamp
#   --textIncludes <str>   Filter by text substring
#   --regexIncludes <pat>  Filter by regex pattern

# Build logs
northflank get service build-logs -f
northflank get job build-logs -f
```

## Lifecycle Commands

```bash
northflank pause service|addon|job
northflank resume service|addon|job
northflank restart service
northflank delete service|addon|job|project
```

## Scaling

```bash
northflank scale service
```

## Shell Access and Exec

```bash
# Interactive shell
northflank exec service
northflank exec job

# One-off command
northflank exec service --cmd "ls -la /app"

# Specific user or instance
northflank exec service --user root
northflank exec service --instance <INSTANCE_NAME>
```

> **No-TTY pitfall:** `northflank exec service --cmd "..."` silently discards stdout/stderr when there's no TTY (CI, agent harnesses, anything wrapped in `bash -c`). Neither `--shell-cmd` nor `--verbose` changes this. Workaround: wrap the call in `script -q /dev/null northflank exec service ...` (macOS/BSD) or `script -qfc 'northflank exec service ...' /dev/null` (Linux).

## File Transfer

```bash
# Upload
northflank upload service file --localPath ./local-file.txt --remotePath /app/remote-file.txt
northflank upload job file --localPath ./data.csv --remotePath /tmp/data.csv

# Download
northflank download service file --localPath ./downloaded.txt --remotePath /app/file.txt
northflank download job file --localPath ./output.csv --remotePath /tmp/output.csv
```

## Templates

```bash
northflank create template --file ./template.yaml
northflank run template
```

## Output Formatting

```bash
# Format options
-o format    # Human-readable (default)
-o json      # JSON output
-o yaml      # YAML output
```

## Verbosity

```bash
--verbose    # Show detailed request/response info
--quiet      # Suppress non-essential output
```

## Help

```bash
# Help on any command
northflank <command> --help

# Full command tree overview
northflank command-overview
```

The CLI is fully interactive -- if you omit required parameters, it will prompt for them. Pass all flags for non-interactive (scripted) usage.
