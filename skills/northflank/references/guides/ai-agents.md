# Ai Agents

Generated from 4 application pages listed in `llms.txt`.

## Pages

- [Agent Skills](#agent-skills)
- [Agents on Northflank](#agents-on-northflank)
- [Configure and manage Harnesses](#configure-and-manage-harnesses)
- [Quickstart](#quickstart)

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

- [Get started with Harnesses: Create your first cloud coding environment for running AI agents.](ai-agents.md#quickstart)
- [Configure and manage Harnesses: Configure networking, environment variables, resources, and monitor your Harness.](ai-agents.md#configure-and-manage-harnesses)

## Agents on Northflank

Source: https://northflank.com/docs/v1/application/ai-agents/agents-on-northflank.md

Use AI coding agents on Northflank for code generation, debugging, and development assistance. Run agents in isolated cloud environments without using your local machine.

### Agents on Northflank: Harnesses

Cloud environments for running your coding agents. Create a Harness, authenticate your agent, connect your repository, and access it from the dashboard or local terminal.

- [Get started with Harnesses: Create your first cloud coding environment for running AI agents.](ai-agents.md#quickstart)
- [Configure and manage Harnesses: Configure networking, environment variables, resources, and monitor your Harness.](ai-agents.md#configure-and-manage-harnesses)

### Agents on Northflank: Agent Skills

Give agents domain-specific knowledge about Northflank. With Skills, agents can deploy services, manage infrastructure, configure environments, and work directly with your Northflank setup.

- [Get started with Agent skills: Give agents domain-specific knowledge about Northflank infrastructure and APIs.](ai-agents.md#agent-skills)

## Configure and manage Harnesses

Source: https://northflank.com/docs/v1/application/ai-agents/harnesses/configure-and-manage-harnesses.md

You can configure networking, environment variables, resources, and storage for your Harness. You can also pause, resume, and delete Harnesses as needed. All configuration can be updated at any time without losing your files.

### Configure and manage Harnesses: Configure networking

You can expose applications running in your Harness by adding public or private ports. You can also attach domains to publicly exposed ports.

To configure a port:

1. Open your Harness overview.

2. Click the **Networking** icon in the right sidebar.

3. Click **Add port**.

4. Enter the port and select the protocol.

5. Enable **Publicly expose** if you want the port to be accessible from the internet.

6. Click **Save changes**.

You can add multiple ports to a Harness.

![Configure Harness networking](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/configure-harness.png)

### Configure and manage Harnesses: Configure environment variables

Set runtime variables and secret files that your Harness can access.

1. Open your Harness overview.

2. Click the **Environment variables** icon in the right sidebar.

3. Click **Edit**.

4. Add or update your variables or secret files.

5. Click **Update & restart**.

Learn more about [runtime variables](secure.md#inject-secrets-runtime-variables) and [secret files](secure.md#upload-secret-files).

![Configure Harness environment variables](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/env-harness.png)

### Configure and manage Harnesses: Update Harness configuration

You can update the configuration of an existing Harness, including its authentication, runtime image, resources, and workspace storage.

To update your Harness:

1. Open the Harness overview.

2. Click the **Settings** icon in the right sidebar.

3. Update the configuration you want to change.

4. Click **Update options**.

![Update Harness configuration](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/update-harness.png)

### Configure and manage Harnesses: Pause and resume a Harness

You can pause a Harness when you are not using it to scale it to zero. This stops running terminal sessions and processes while preserving files in the Harness workspace.

To pause a Harness:

1. Open the Harness overview.

2. Click the **Pause harness** icon in the top-right corner.

3. Confirm that the Harness has been paused.

To resume a Harness:

1. Open the Harness overview.

2. Click the **Resume harness** icon in the top-right corner.

3. Wait for the Harness to start.

Your files in `/home/harness` are preserved when the Harness is paused and resumed.

### Configure and manage Harnesses: Monitor Harness resources

You can monitor the resource usage of your Harness from the **Observe** section.

To view your Harness metrics:

1. Open the Harness overview.

2. Click the **Observe** icon in the right sidebar.

You can view metrics such as CPU and memory usage to monitor your Harness.

Learn more about [observability on Northflank](observe.md#observability-on-northflank).

![Monitor Harness resources](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/monitor-harness.png)

### Configure and manage Harnesses: Delete a Harness

You can permanently delete a Harness and its associated workspace.

To delete a Harness:

1. Open the Harness overview.

2. Click the **three-dot** menu in the top-right corner.

3. Click **Delete harness**.

4. Confirm the deletion.

Deletion is permanent and cannot be undone. Make sure you have backed up any files or data you want to keep before deleting the Harness.

![Delete Harness](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/delete-harness.png)

> [!note] Questions?
> Reach out to the Northflank team at [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) or [book a demo](https://cal.com/team/northflank/northflank-demo?duration=30).

### Configure and manage Harnesses: Next steps

- [Get started with Agent skills: Give agents domain-specific knowledge about Northflank infrastructure and APIs.](ai-agents.md#agent-skills)

## Quickstart

Source: https://northflank.com/docs/v1/application/ai-agents/harnesses/quickstart.md

Harnesses are cloud coding environments that let you run coding agents like Claude or Codex in isolated, secure environments on Northflank. Instead of running agents on your local machine or directly against your codebase, Harnesses provide a controlled workspace with its own resources, networking, and configuration.

Run Harnesses in [Northflank's managed cloud](https://northflank.com/features/managed-cloud) or [in your own cloud infrastructure](https://northflank.com/features/bring-your-own-cloud). You can connect repositories, configure ports and environment variables, and monitor resource usage—all from the Northflank dashboard or your local terminal.

### Quickstart: How Harnesses work

When you create a Harness:

1. Northflank provisions a cloud coding environment in your environment (managed cloud or your own infrastructure).

2. You authenticate your coding agent using an API key or linked account.

3. (Optional) You connect a Git repository for the agent to work with.

4. You configure networking, environment variables, and resources.

5. You access the Harness from the Northflank dashboard or connect to it locally using SSH.

An active Harness runs continuously until you pause or delete it. Files in the Harness workspace are preserved when you pause and resume the Harness. You can update its configuration and monitor its resource usage at any time.

Multiple team members can work in the same Harness simultaneously. Your teammates can see what you're doing in real-time and collaborate together in the same environment.

### Quickstart: Create your first Harness

> [!note] Prerequisites
>

- A [Northflank account](https://app.northflank.com/signup) on a Pay As You Go plan

- A coding agent account or API key (Claude, Codex, Pi, or your own agent)

- A [Git integration](getting-started.md#link-your-git-account) if you want to connect a repository

To create a Harness:

> [!note]
> [Click here](https://app.northflank.com/s/project/create/harness) to create a harness.

1. In your Northflank dashboard, [create a new project](getting-started.md#create-a-project) and click **Harnesses**

2. Select your coding agent (Claude, Codex, OpenCode, Pi) or select **Bring Your Own Agent.**

3. Enter a name for your Harness.

4. Select the environment where you want to run the Harness.

5. Under **Authentication**, select how you want to authenticate your coding agent. You can use an API key or a linked account.

6. Under **Repository**, select an existing repository and branch, create a new repository, or continue without a repository.

7. Optionally, under **Advanced**, configure runtime variables, the runtime image, resources, and workspace storage.

8. Click **Create Harness**.

You'll be redirected to the Harness terminal. If you didn't use an API key, you may need to sign in to your coding agent when you first open it.

![Creating a Harness in the Northflank application](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/create-harness.png)

### Quickstart: Connect to your Harness locally

Access your Harness from your local machine using SSH.

> [!note] Prerequisites
>

- The [Northflank CLI installed and authenticated](../api/use-the-cli.md).

- Access to the Harness you want to connect to.

To connect to your Harness:

1. Open the Harness overview.

2. Under **Local access**, click **Connect**.

3. Copy the SSH command shown.

4. Run the command in your terminal.

Example: `northflank dev ssh --projectId harness --harnessId numerous-class`

You can now work in your Harness environment from your local terminal.

![Connect to your Harness locally](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/connect-harness.png)

> [!note] Questions?
> Reach out to the Northflank team at [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) or [book a demo](https://cal.com/team/northflank/northflank-demo?duration=30).

### Quickstart: Next steps

- [Configure and manage Harnesses: Configure networking, environment variables, resources, and monitor your Harness.](ai-agents.md#configure-and-manage-harnesses)
- [Get started with Agent skills: Give agents domain-specific knowledge about Northflank infrastructure and APIs.](ai-agents.md#agent-skills)
