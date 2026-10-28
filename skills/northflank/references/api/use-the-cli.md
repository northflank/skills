# Use the CLI

Source: https://northflank.com/docs/v1/api/use-the-cli.md

The [Northflank CLI client](https://npmjs.com/@northflank/cli) allows you to interact with Northflank via the command line.

> [!note] Requirements
>
> You will need the following to get started:
>
> - [Node.js](https://nodejs.org/en) 22.13.0 or later, excluding 26.0.x
> - A Node.js package manager, such as pnpm or npm

Install the CLI with your package manager:

```sh
pnpm add -g @northflank/cli
nf --version
```

Alternatively, run `npm i -g @northflank/cli`. Both `nf` and `northflank` run the same CLI.

Run `nf login` and complete authentication in your browser. Select the team you want to manage. The CLI saves a session for later commands. You do not need to create an API token for browser login. For manual API-token authentication, see [Authentication and contexts](use-the-cli.md#authentication-and-contexts).

To configure a coding agent, follow [CLI setup for MCP and skills](../guides/ai-agents.md#connect-your-agent-with-mcp-connect-with-your-cli-login). That guide includes the required CLI version and an [agent setup prompt](../guides/ai-agents.md#connect-your-agent-with-mcp-ask-your-agent-to-set-up-northflank).

The CLI client is fully interactive, meaning that it will ask for any parameters needed along the way. However, you always have the option to pass in any required parameters in your commands. For example, after entering the command `northflank get service` you will be prompted to enter a project ID and a service ID. You can achieve the same result in a single step by using the command `northflank get service --project <PROJECT_ID> --service <SERVICE_ID>`.

### Authentication and contexts

Contexts allow you to separate different Northflank accounts and preferences when using the CLI client.

For example, you may have a context for your personal Northflank account, and a different context for a team account.

Create a context with `northflank login`. Complete authentication in the browser and select your team. The CLI saves the session in that context. Browser login does not require a separately created API token. Wait for the terminal to confirm a successful login.

See `northflank login --help` for the full list of options, including `-n` to name your context, and `-t` to manually provide a Northflank API token. Once logged in, the active context will be switched automatically.

For manual token login, use `nf login --token-login`. Team members can generate an API token in the team's settings with an [API role](../guides/secure.md#grant-api-access). Use the token prompt rather than pasting credentials into an agent conversation.

- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](../guides/secure.md#grant-api-access)
- [Generate API tokens: Generate an API token to access your team and project.](../guides/secure.md#grant-api-access-generate-an-api-token)

Once created, contexts can be viewed with `northflank context ls` and switched to with `northflank context use`, where you can choose from a list of available contexts.

To set a default project or service within a context, you can use the command `northflank context use project|service|job` to choose from an available list (or `-i` to specify manually by internal ID) and you will no longer need to supply a project/service/job for the set resources in the context in your commands.

#### Repository defaults with northflank.yaml

Create a `northflank.yaml` file to share resource defaults with people and coding agents that use the CLI in your repository:

```yaml
context:
  team: my-team
  project: my-project
  service: my-service
```

Use the resource IDs that you would pass to the corresponding CLI options, such as `--projectId` and `--serviceId`. Supported fields under `context` are `team`, `project`, `service`, `job`, `addon`, `volume`, and `harness`. Include at least one field. Each value must be a non-empty string.

Keep credentials, secrets, and API endpoints out of this file. It supplies resource defaults, not authentication or access permissions. Saved CLI logins remain in `~/.northflank/config.json`, or `config.json` inside your configured `NF_CONFIG_DIR` or `NORTHFLANK_CONFIG_DIR`. The login store supports JSON only.

##### File location and precedence

The CLI looks in the current directory first, then the Git repository root. It does not search intermediate directories. Outside a Git repository, it checks only the current directory.

Both `northflank.yaml` and `northflank.yml` are supported. In each directory, `.yaml` takes precedence over `.yml`. The CLI does not discover `northflank.json` as a repository defaults file.

Explicit command options override file defaults. When a local file is present, omitted resource fields do not inherit saved global defaults. For example, a file containing only `project` does not inherit a globally selected `service`. Without a local file, the CLI uses saved global defaults. Add `--noDefaults` to ignore both local and global resource defaults. Resource deletion commands also ignore these defaults.

Commands such as `nf context use project` change saved global defaults. They do not edit `northflank.yaml`.

##### File requirements

Use a regular file of at most 64 KiB. Symbolic links and unknown fields are rejected. If the file is invalid, the CLI prints a warning and continues without local or global resource defaults. Fix or remove the file, or supply the required resource options explicitly.

The file can also contain a `commands` section. The CLI does not validate or execute that section. A file containing only `commands` supplies no resource defaults and disables inheritance of global resource defaults.

This configuration file is separate from JSON or YAML [resource definitions](use-the-cli.md#creating-resources) passed through `--file` or `--input`.

### Running with sudo

If you need to run Northflank CLI commands with `sudo`, you may encounter environment and path resolution issues.

#### Common issues

- **Environment variable preservation**: The `env_reset` directive in sudo configuration prevents `sudo -E` from preserving your entire environment. You need to explicitly preserve required variables.

- **Path resolution**: `sudo` does not resolve paths the same way your shell does, which can prevent the CLI from being found.

#### Solution

Use `--preserve-env` to explicitly preserve environment variables and wrap the command in `bash -c`:

```bash
sudo --preserve-env=PATH,HOME bash -c 'northflank forward service --projectId <project-id> --serviceId <service-id>'
```

This ensures:

- `PATH` is preserved so `sudo` can find the `northflank` command

- `HOME` is preserved so the CLI can access your authentication contexts

- The command is resolved correctly through `bash -c`

Replace `<project-id>` and `<service-id>` with your actual project and service IDs.

### Creating resources

When creating resources on Northflank, you can do so interactively, or you can supply a resource definition. This can be done using the `--input` or `-i` option followed by a JSON/YAML string, or by using the `--file` or `-f` option followed by the path to a JSON/YAML file containing the definition.

The resource definitions are equivalent to the API request bodies you will find in this documentation.

### Use Northflank Skills with the CLI

Northflank Skills provide AI coding agents with Northflank-specific knowledge for deploying, operating, and automating workloads on the platform.

They help agents understand Northflank primitives such as services, jobs, add-ons, preview environments, release workflows, sandboxes, GPU workloads, templates, and the API/CLI.

Skills can be used with agentic coding tools like Claude Code, Codex, and Cursor to create, configure, deploy, and troubleshoot applications on Northflank using the right platform concepts and commands.

To install the skill or plugin and connect MCP with your saved team login, use `nf agent setup --agent claude`. Replace `claude` with `codex`, `cursor`, or `opencode`.

Follow the [MCP setup guide](../guides/ai-agents.md#connect-your-agent-with-mcp-connect-with-your-cli-login) for the required CLI version, login, and connection checks. You can also give your agent the [setup prompt](../guides/ai-agents.md#connect-your-agent-with-mcp-ask-your-agent-to-set-up-northflank).

> [!note]
>
> [Click here](https://github.com/northflank/skills) to explore Northflank Skills on GitHub.

### Help

You can get help at any time by using the `--help` flag. This includes getting help with specific commands, for example `northflank create project --help` will return helpful information about creating a project.

To see a handy tree view of all possible commands, you can run `northflank command-overview`.
