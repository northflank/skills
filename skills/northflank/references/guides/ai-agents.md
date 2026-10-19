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

Connect your coding agent to Northflank with Model Context Protocol (MCP), a standard for calling tools from an AI client. The hosted server lets agents deploy applications and jobs, manage databases, and inspect resources.

Northflank hosts the server. You do not need the Northflank CLI, a local MCP process, or a deployment in your team.

#### Connect your agent with MCP: Requirements

Use a team API token and a client that supports Streamable HTTP with an Authorization header. The token's role controls which resources and operations the agent can access.

The hosted endpoint is:

```text
https://mcp.northflank.com/mcp
```

The server accepts team API tokens and team workload identity tokens. Personal, organization, and browser session tokens are not accepted by this hosted entry point.

MCP authentication currently uses a bearer token, not an OAuth sign-in flow. Clients that require OAuth and cannot send a custom Authorization header cannot use this setup.

#### Connect your agent with MCP: Prepare your token

1. [Create a team API token](secure.md#grant-api-access-generate-an-api-token) with permissions for the resources you want the agent to manage.

2. Store it as `NORTHFLANK_API_TOKEN` in the environment of the agent process, using your shell or secret manager.

3. Start the agent with that environment available.

Set the variable to the token alone, without the `Bearer ` prefix. The client configuration adds that prefix.

For deployment, the role needs permission to create and read the relevant resources. A new project also needs project creation permission. Connecting a Git account needs a user-associated token with Git management permission. Public repositories do not require a Git account connection.

The configurations below reference the environment variable instead of storing the token in a project file. Do not paste the token into chat or commit it to Git. A desktop app must receive the variable in its own process environment. Setting it in an unrelated terminal does not update an already running app.

#### Connect your agent with MCP: Add MCP to your client

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

#### Connect your agent with MCP: Confirm the connection

Ask the agent:

Use the Northflank MCP to show my authenticated team and access scope. Do not create or change resources.

The agent can use `get_auth_context` to read the credential context. Make sure that the returned team matches your intended team.

If no Northflank tools appear, make sure that the server is enabled and reconnect the client. The endpoint is a protocol URL, not a web page. Opening it in a browser is not a connection test.

#### Connect your agent with MCP: Deploy your first application

Deployment creates billable resources. Use a new project name, and choose a region and plan that fit your requirements.

Ask the agent:

Use the Northflank MCP to deploy nginx:latest into a new project named mcp-demo. Expose HTTP port 80. Show the region and plan before creating resources, then return the public URL when the app is ready.

The agent uses `deploy_app` and follows the returned status instructions. Creation does not establish readiness. For a web application, the agent must also check the public URL before reporting success.

For a Git repository, ask:

Use the Northflank MCP to deploy this repository's remote branch into a new project named repo-demo. Use its Dockerfile. If Northflank needs Git access, give me the authorization link and resume after I authorize it.

Git deployment uses the remote repository. Uncommitted or unpushed local changes are not included. The agent can inspect local build configuration, but the hosted MCP does not read your local files.

Public repositories work without linking a Git account. For private repositories, the team needs a connection with access to that repository.

If Git access is missing, the deployment workflow can return a browser authorization link before creating resources. Complete the link, then ask the agent to continue. It resumes with the original inputs and the returned session ID.

If you connect the repository separately in Northflank, the original session can remain pending. Tell the agent that you connected it separately. Retry the original deployment without `gitConnectionSessionId` so the workflow checks repository access again. Preserve an explicitly selected `source.vcsLinkId` unless you intend to select a different connection. Do not create another authorization session while the original one is pending.

Git authorization grants repository access. It does not replace the team API token used to authenticate the MCP connection.

#### Connect your agent with MCP: Available workflows

The MCP includes deployment workflows and detailed resource operations. Permissions apply to every operation.

Common operations appear directly in the tool list. The agent finds advanced operations with `search_tools` and calls them through `execute_tool`. It uses `get_tool_schema` only for omitted fields or constraints. Returned `next.tool` names can be executed without another search.

| Task | Tools and behavior |
| --- | --- |
| Deploy an image or Git application | `deploy_app` checks Git access when needed and creates a service in an existing or new project. |
| Create a manual or scheduled job | `deploy_job` supports image and Git sources. Manual execution uses `run_job`. |
| Add a database | `create_database` handles common database settings and explicit environment-variable linking. |
| Inspect deployment progress | `get_deployment_status` summarizes build, rollout, run state and active source revisions. Follow its next action for recovery or diagnostics. A source revision match does not confirm the exact build artifact. |
| Manage existing resources | Resource operations cover projects, services, jobs, addons, secrets, volumes, harnesses, and supported BYOC operations. |
| Investigate a failure | `diagnose` gathers service, job or addon health, infrastructure events, deployment revisions, logs and metrics. For BYOC, it also reads cluster and node-pool configuration. |

Diagnosis gathers evidence without changing resources. Missing permissions produce partial results. It does not prove a root cause or test application connectivity. Use `get_deployment_status` or `get_addon` for routine polling.

`list_addon_types` returns Northflank-managed addon types and custom addon types available to your team. Managed type details include versions, storage sizes and replica options. Storage classes depend on the target cluster and are not included in type discovery.

For BYOC databases, set `create_database.storageClass` to a class supported by the target cluster. Its default is `nvme`, which is unavailable on some clusters. Addon type discovery does not confirm that a storage class exists on your cluster.

`list_cluster_nodes` returns recorded BYOC nodes and their `RUNNING` or `DELETED` state. This state does not establish Kubernetes readiness or schedulability.

The MCP does not expose every public API operation. Ask the agent to inspect the available tools before assuming a capability exists.

#### Connect your agent with MCP: Use MCP with the Northflank skill

The [Northflank skill](ai-agents.md#agent-skills) provides deployment guidance and platform knowledge. MCP supplies authenticated tools that execute operations.

You can use either independently. Install the skill alongside MCP when you want both guidance and tools. Installing the skill does not configure the MCP connection or grant account access.

#### Connect your agent with MCP: Workload identity

Agents running on Northflank can use a team workload identity token instead of a copied team API token. The token's permissions and project restrictions still apply.

Send the workload token in the same Authorization header. If `NORTHFLANK_API_TOKEN_FILE` is provided, use a client that can read the mounted token file again when the token rotates.

The static environment configurations above do not provide automatic workload token refresh. Use a client credential mechanism that reads the mounted token file before each request or refreshes it when authentication fails.

Workload identities cannot authorize a personal Git account. A team member must grant the required repository access in the team's Git integrations.

##### Connect your agent with MCP: Prepare a workload token helper

Codex and Claude Code can generate authentication headers with a local helper. The examples below require Node.js and access to the mounted workload token file.

Save this helper as `northflank-mcp-headers.cjs` in a trusted directory. The client runs it. Do not run it in a shared terminal because its output contains the token.

```js
const { readFileSync } = require('node:fs');
const tokenFile = process.argv[2];
if (!tokenFile) throw new Error('Supply the workload token file path.');
const token = readFileSync(tokenFile, 'utf8').trim();
if (!token) throw new Error('The workload token file is empty.');
process.stdout.write(JSON.stringify({ Authorization: `Bearer ${token}` }));
```

##### Connect your agent with MCP: Refresh workload tokens in Codex

For a local Codex HTTP connection, configure [`http_headers_helper`](https://developers.openai.com/codex/mcp/#streamable-http-servers) in `~/.codex/config.toml`. Use the helper above and replace both file paths. Use the MCP URL for the workload's Northflank environment.

```toml
[mcp_servers.northflank]
url = "https://mcp.northflank.com/mcp"
http_headers_helper = "node /absolute/path/northflank-mcp-headers.cjs /absolute/path/to/workload-token"
```

Remove `bearer_token_env_var` and other static Authorization headers for this server. An explicit bearer token or stored OAuth credential takes precedence over the helper's Authorization header.

Codex caches the helper's headers for the connection. After a same-origin POST returns HTTP `401` or `403`, it refreshes the headers once. It retries only if the helper returns changed values. The helper is not supported for connections through a remote execution environment. Do not retry uncertain mutations yourself.

##### Connect your agent with MCP: Refresh workload tokens in Claude Code

Claude Code supports [dynamic authentication headers](https://code.claude.com/docs/en/mcp#use-dynamic-headers-for-custom-authentication).

1. Save the helper from [Prepare a workload token helper](ai-agents.md#connect-your-agent-with-mcp-prepare-a-workload-token-helper).

2. Add an HTTP MCP configuration with `headersHelper`. Replace both file paths. Use the MCP URL for the workload's Northflank environment. Remove any static Authorization header for this server.

```json
{
  "mcpServers": {
    "northflank": {
      "type": "http",
      "url": "https://mcp.northflank.com/mcp",
      "headersHelper": "node /absolute/path/northflank-mcp-headers.cjs /absolute/path/to/workload-token"
    }
  }
}
```

1. Reconnect through `/mcp`. For project configuration, trust the directory before the helper can run.

Claude Code reads fresh headers on connection and reconnect. After a tool call receives HTTP `401` or `403`, it refreshes the headers and retries once. It does not read the file before every request. A permission denial still requires a role or scope change. Do not retry uncertain mutations yourself.

#### Connect your agent with MCP: Troubleshooting

| Symptom | Action |
| --- | --- |
| Missing tools or a connection failure | Make sure that the client enables the server, uses Streamable HTTP, and sends requests to the URL ending in `/mcp`. |
| `401` authentication error | Make sure that the agent receives the token variable and sends a valid team token. Replace an expired or revoked token. |
| `403` permission error | Inspect the token role and workload restrictions. Grant the required permission or use a credential with the intended scope. |
| An unexpected OAuth prompt | Configure the bearer header. In OpenCode, set `oauth` to `false`. The hosted server does not provide MCP OAuth login. |
| Git authorization cannot complete | Follow the returned recovery instructions. Check the credential's team and user context before requesting a replacement link. |

If a request fails after resource creation, retain the returned resource IDs. Inspect those resources before retrying so you do not create duplicates.
