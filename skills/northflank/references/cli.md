# Northflank CLI Reference

## Installation

```bash
npm i -g @northflank/cli
# or
yarn global add @northflank/cli
```

Requires Node.js 12+.

## Authentication

```bash
# Browser-based login
northflank login

# Token-based login (non-interactive)
northflank login -t <TOKEN>

# Name the context for switching later
northflank login -n my-context
```

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
