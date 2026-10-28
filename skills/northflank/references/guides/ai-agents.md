# Ai Agents

Generated from 3 application pages listed in `llms.txt`.

## Pages

- [Agent Skills](#agent-skills)
- [Agents on Northflank](#agents-on-northflank)
- [Connect your agent with MCP](#connect-your-agent-with-mcp)

## Agent Skills

Source: https://northflank.com/docs/v1/application/ai-agents/agent-skills.md

Northflank agent skills extend your AI coding assistant with domain-specific knowledge about Northflank. Instead of your agent having only general programming knowledge, it understands Northflank's architecture, APIs, CLI commands, and best practices.

When you work with an agent on Northflank infrastructure, the skill enables the agent to make informed decisions about deployments, configurations, and architecture patterns specific to Northflank.

### Agent Skills: How Northflank agent skills work

Northflank agent skills are markdown files that contain structured knowledge about a platform. They include:

- Conceptual guidance on how Northflank works

- Step-by-step instructions for common tasks

- API and CLI references

- Best practices and patterns

- Examples of deployments and configurations

When you ask your AI agent to do something with Northflank, like deploy a service, create a database, or write infrastructure-as-code, the agent reads the skill and understands the context, capabilities, and constraints of Northflank. This lets the agent make better decisions without you having to explain Northflank every time.

### Agent Skills: Install Northflank agent skills

Northflank agent skills are installed into your AI code editor. The installation process depends on which editor you use.

Installing a skill does not connect your Northflank account. To give the agent authenticated platform tools, [add the Northflank MCP server](ai-agents.md#connect-your-agent-with-mcp). You can use the skill with MCP or with your existing CLI setup.

#### Agent Skills: Install and connect with the Northflank CLI

Use the [latest Northflank CLI](ai-agents.md#connect-your-agent-with-mcp-connect-with-your-cli-login) for this workflow. To include MCP, first run `nf login` and select your team, or reuse a valid team login. Then run:

```sh
nf agent setup --agent claude
```

Replace `claude` with `codex`, `cursor`, or `opencode` for another agent. The command installs the canonical skill, or the Codex plugin, and configures MCP with your saved CLI team login. You do not need to create another API token.

To install skills without MCP, add `--no-mcp`. Use `--scope project --no-mcp` to install skills in the current project. Codex plugins require user scope.

Restart or reconnect your agent after setup. Run `nf agent status --check --agent claude`, replacing `claude` with your agent. Follow the [MCP connection guide](ai-agents.md#connect-your-agent-with-mcp-connect-with-your-cli-login) to resolve an existing configuration.

To let your agent perform setup, use the [copyable setup prompt](ai-agents.md#connect-your-agent-with-mcp-ask-your-agent-to-set-up-northflank). It covers installation, browser login, configuration, and connection checks.

For agents that use the CLI, add [repository defaults in `northflank.yaml`](../api/use-the-cli.md#repository-defaults-with-northflankyaml) to select resources without repeating CLI options. This file does not contain credentials or configure MCP.

The methods below install the skill only. They do not configure MCP.

#### Agent Skills: Claude Code

From inside an interactive Claude Code session:

```
/plugin marketplace add northflank/skills
/plugin install northflank@northflank
```

Or from your terminal using the Claude CLI:

```
claude plugin marketplace add northflank/skills
claude plugin install northflank@northflank
```

`northflank/skills` is the GitHub shorthand for `github.com/northflank/skills`. Claude Code resolves it to the marketplace at the repo root. Pass a full URL (`https://github.com/northflank/skills`) if you prefer to be explicit.

#### Agent Skills: OpenAI Codex

Install using Codex's built-in skill installer:

```
$skill-installer https://github.com/northflank/skills/tree/master/skills/northflank
```

#### Agent Skills: Skills CLI

Install using the Skills CLI, which supports Codex, Claude Code, Cursor, OpenCode, and other coding agents:

```
npx skills add northflank/skills --global
```

#### Agent Skills: Manual installation

If your editor supports loading skills from a directory, copy `skills/northflank` into the appropriate skills directory:

| Editor | Skill directory |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Cursor | `~/.cursor/skills/` |
| OpenCode | `~/.config/opencode/skills/` |
| OpenAI Codex | `~/.codex/skills/` |
| Windsurf | `~/.windsurf/skills/` |

### Agent Skills: Use Northflank agent skills

After installation, ask your coding agent to do Northflank work directly. The skill should load automatically when the task involves Northflank projects, services, jobs, addons, preview environments, release workflows, AI sandboxes, GPU workloads, domains, secrets, templates, or the Northflank API and CLI.

Examples:

- "Deploy this service to Northflank from `ghcr.io/acme/api:latest`"

- "Create a preview environment for this branch on Northflank"

- "Set up a Postgres addon and wire its credentials into my service"

- "Help me write a Northflank template for this stack"

- "Use the Northflank CLI to exec into this service and triage this issue"

- "Show me how to deploy this workload to a GPU node pool on Northflank"

### Agent Skills: Source

The Northflank agent skills are open source and available on [GitHub](https://github.com/northflank/skills). You can view the skill content, report issues, and contribute.

### Agent Skills: Next steps

- [Get started with Cloud Harness: Create your first cloud coding environment for running AI agents.](cloud-harness.md#quickstart)
- [Configure and manage Cloud Harnesses: Configure networking, environment variables, resources, and monitor your Cloud Harness.](cloud-harness.md#configure-and-manage-cloud-harnesses)

## Agents on Northflank

Source: https://northflank.com/docs/v1/application/ai-agents/agents-on-northflank.md

Use AI coding agents on Northflank for code generation, debugging, and development assistance. Run agents in isolated cloud environments without using your local machine.

To manage Northflank from your own coding agent, [connect the hosted MCP server](ai-agents.md#connect-your-agent-with-mcp). You can also [install the Northflank skill](ai-agents.md#agent-skills) for platform guidance.

### Agents on Northflank: Cloud Harness

Cloud environments for running your coding agents. Create a Cloud Harness, authenticate your agent, connect your repository, and access it from the dashboard or local terminal.

- [Get started with Cloud Harness: Create your first cloud coding environment for running AI agents.](cloud-harness.md#quickstart)
- [Configure and manage Cloud Harnesses: Configure networking, environment variables, resources, and monitor your Cloud Harness.](cloud-harness.md#configure-and-manage-cloud-harnesses)

### Agents on Northflank: Agent Skills

Give agents domain-specific knowledge about Northflank. With Skills, agents can deploy services, manage infrastructure, configure environments, and work directly with your Northflank setup.

- [Get started with Agent skills: Give agents domain-specific knowledge about Northflank infrastructure and APIs.](ai-agents.md#agent-skills)

## Connect your agent with MCP

Source: https://northflank.com/docs/v1/application/ai-agents/mcp-server.md

Connect your coding agent to Northflank to deploy applications, manage databases, and inspect resources. Setup installs the Northflank skill or plugin and connects the hosted MCP server using your CLI login.

#### Connect your agent with MCP: Requirements

Use the [latest CLI](../api/use-the-cli.md) and an installed copy of Claude Code, Codex, Cursor, or OpenCode. Codex also needs the `codex` command with plugin support.

Select a team when you log in. MCP uses that team's permissions. Personal and organization-scoped logins are not supported. You do not need to create another API token.

#### Connect your agent with MCP: Connect with your CLI login

1. Install or update the CLI:

  ```sh
  pnpm add -g @northflank/cli@latest
  ```

2. If you need to log in, run `nf login` and select your team in the browser.

3. Set up your agent:

  ```sh
  nf agent setup --agent claude
  ```

4. Restart or reconnect the agent to load the new connection.

Replace `claude` with `codex`, `cursor`, or `opencode`. You can pass several names after `--agent`.

Setup applies to all your projects. It reads your saved CLI session when needed, without copying the token into agent configuration.

##### Connect your agent with MCP: Ask your agent to set up Northflank

You can give your agent this prompt instead:

Set up the latest Northflank CLI, skill or plugin, and MCP connection for this agent.
Follow [https://northflank.com/docs/v1/application/ai-agents/mcp-server](ai-agents.md#connect-your-agent-with-mcp).

Reuse my team login.
If login is needed, run `nf login` and wait for me to finish in the browser.
Never print saved credentials or ask me to paste a token.

Preview setup with `nf agent setup --agent <agent> --dry-run`.
Explain any replacement before applying it with `--yes`.
Preserve modified skills and other MCP servers.

Run `nf agent status --check --agent <agent>`.
Tell me if I need to reconnect.
Then use `get_auth_context` to confirm the team.
Do not create or change cloud resources.

Replace `<agent>` with `claude`, `codex`, `cursor`, or `opencode`. Keep the login command running while the user completes the browser step.

#### Connect your agent with MCP: Confirm the connection

Run:

```sh
nf agent status --check --agent claude
```

Then ask your agent to show the authenticated team with `get_auth_context`. Make sure that it matches the team you intended.

#### Connect your agent with MCP: Setup options

> [!warning]
>
> `--yes` accepts replacement of conflicting Northflank MCP entries. Setup saves a private backup first. Keep backups private because they can contain credentials.

| Option | Use |
| --- | --- |
| `--yes` | Apply without prompts. Specify `--agent`. Browser login can still require your input. |
| `--dry-run` | Preview changes without installing or testing authentication. |
| `--no-mcp` | Install skills or plugins only. Add `--scope user` or `--scope project` for non-interactive use. Codex plugins require user scope. |

Setup preserves modified skills and other MCP servers. Use `nf agent update --agent claude` to update, or `nf agent remove --agent claude` to remove managed installation files and MCP configuration.

##### Connect your agent with MCP: Login changes and expiry

If your session expires, MCP returns login instructions to the agent. Follow those instructions to renew the same context and team. This updates your normal CLI login too, and the running bridge uses it on the next request.

The `--override` login option clears that context's saved resource defaults. Reconnect only if the agent disconnected. To change teams, select the new CLI context, rerun setup, and reconnect.

#### Connect your agent with MCP: Troubleshooting

| Problem | Next step |
| --- | --- |
| No tools appear | Run `nf agent status --check --agent claude`, then reconnect. In Claude Code, use `/mcp` and `claude mcp get northflank` to inspect the active connection. |
| Login is rejected | Use a team login. For an expired session, follow the returned [login instructions](ai-agents.md#connect-your-agent-with-mcp-login-changes-and-expiry). |
| An environment token overrides your login | Unset `NF_API_TOKEN`, `NORTHFLANK_API_TOKEN`, `NF_API_HOST`, and `NORTHFLANK_API_HOST` before setup. |
| Access is denied | Make sure that the credential's role permits the requested operation. |
| CLI or Node.js moved | Rerun setup with the installed CLI, then reconnect. |

#### Connect your agent with MCP: Deploy your first application

Deployment creates billable resources. Ask your agent:

Deploy nginx:latest in a new Northflank project named mcp-demo. Expose HTTP port 80. Show me the region and plan before creating resources, then return the working URL.

For Git deployments, push your changes first. Private repositories need a Git connection with access to the repository. Follow any authorization link the agent returns.

Your agent can also manage jobs, databases, and existing resources. Ask it to inspect the available tools for your task. If creation fails partway through, inspect any returned resource IDs before retrying.

The [Northflank skill](ai-agents.md#agent-skills) supplies platform guidance. MCP supplies authenticated tools. CLI setup installs both by default.

#### Connect your agent with MCP: Use an API token for authentication

For clients without the CLI, connect directly with a team API token.

##### Connect your agent with MCP: Prepare your token

Use a client that supports Streamable HTTP and an Authorization header. The endpoint is `https://mcp.northflank.com/mcp`. Northflank MCP does not support OAuth login.

1. [Create a team API token](secure.md#grant-api-access-generate-an-api-token) with permissions for the resources you want the agent to manage.

2. Store it as `NORTHFLANK_API_TOKEN` in the environment of the agent process, using your shell or secret manager.

3. Start the agent with that environment available.

Set the variable to the token alone, without the `Bearer ` prefix. The client configuration adds that prefix.

For deployment, the role needs permission to create and read the relevant resources. A new project also needs project creation permission. Connecting a Git account needs a user-associated token with Git management permission. Public repositories do not require a Git account connection.

Do not paste the token into chat or commit it to Git. Start the agent with the environment variable available. An already running desktop app does not inherit variables from another terminal.

##### Connect your agent with MCP: Add MCP to your client

Merge the Northflank entry into your existing configuration. Preserve other servers. After saving, restart or reconnect the client so it loads the new configuration and environment.

##### Connect your agent with MCP: Codex

Add this table to `~/.codex/config.toml`:

```toml
[mcp_servers.northflank]
url = "https://mcp.northflank.com/mcp"
bearer_token_env_var = "NORTHFLANK_API_TOKEN"
```

This configuration sends the variable as a bearer token. MCP OAuth login is not required. See the [Codex MCP documentation](https://developers.openai.com/codex/mcp/) for configuration locations and connection controls.

##### Connect your agent with MCP: Claude Code

Add this entry to `.mcp.json` in your project:

```json
{
  "mcpServers": {
    "northflank": {
      "type": "http",
      "url": "https://mcp.northflank.com/mcp",
      "headers": {
        "Authorization": "Bearer ${NORTHFLANK_API_TOKEN}"
      }
    }
  }
}
```

Approve the project MCP configuration when prompted. Use `/mcp` to inspect the connection. See the [Claude Code MCP documentation](https://code.claude.com/docs/en/mcp).

##### Connect your agent with MCP: Cursor

Add this entry to `~/.cursor/mcp.json` for all projects, or `.cursor/mcp.json` for one project:

```json
{
  "mcpServers": {
    "northflank": {
      "url": "https://mcp.northflank.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:NORTHFLANK_API_TOKEN}"
      }
    }
  }
}
```

Cursor uses `${env:NAME}` for environment variables. See the [Cursor MCP documentation](https://cursor.com/docs/mcp) for connection controls.

##### Connect your agent with MCP: OpenCode

Add this entry to your project's `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "northflank": {
      "type": "remote",
      "url": "https://mcp.northflank.com/mcp",
      "oauth": false,
      "headers": {
        "Authorization": "Bearer {env:NORTHFLANK_API_TOKEN}"
      }
    }
  }
}
```

Keep `oauth` set to `false` for this API-token connection. See the [OpenCode MCP documentation](https://opencode.ai/docs/mcp-servers/).

##### Connect your agent with MCP: Other clients

Use Streamable HTTP with the endpoint above and this request header:

```text
Authorization: Bearer <YOUR_TEAM_API_TOKEN>
```

Use the client's secret storage or environment substitution where available. Configuration syntax differs between clients.
