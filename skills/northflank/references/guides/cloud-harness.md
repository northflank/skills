# Cloud Harness

Generated from 2 application pages listed in `llms.txt`.

## Pages

- [Configure and manage Cloud Harnesses](#configure-and-manage-cloud-harnesses)
- [Quickstart](#quickstart)

## Configure and manage Cloud Harnesses

Source: https://northflank.com/docs/v1/application/cloud-harness/configure-and-manage-cloud-harnesses.md

You can configure networking, environment variables, resources, and storage for your Cloud Harness. You can also pause, resume, and delete Cloud Harnesses as needed.

#### Configure and manage Cloud Harnesses: Workspace storage

Persist workspace files is enabled by default under Advanced → Workspace storage. It preserves files in `/home/harness` across stops, restarts, and redeployments. Files outside this directory are temporary.

You can disable persistence during creation, but you cannot change this choice later. Without persistence, stops, restarts, and redeployments erase workspace files and agent sign-ins. Persistent workspace storage can grow but cannot shrink.

### Configure and manage Cloud Harnesses: Configure networking

You can expose applications running in your Cloud Harness by adding public or private ports. You can also attach domains to publicly exposed ports.

To configure a port:

1. Open your Cloud Harness overview.

2. Click the **Networking** icon in the right sidebar.

3. Click **Add port**.

4. Enter the port and select the protocol.

5. Enable **Publicly expose** if you want the port to be accessible from the internet.

6. Click **Save changes**.

You can add multiple ports to a Cloud Harness.

![Configure Cloud Harness networking](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/configure-harness.png)

### Configure and manage Cloud Harnesses: Configure environment variables

Set runtime variables and secret files that your Cloud Harness can access.

1. Open your Cloud Harness overview.

2. Click the Environment icon in the right sidebar.

3. Click Edit.

4. Add or update your variables or secret files.

5. Click Update & restart.

Learn more about [runtime variables](secure.md#inject-secrets-runtime-variables) and [secret files](secure.md#upload-secret-files).

![Configure Cloud Harness environment variables](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/env-harness.png)

### Configure and manage Cloud Harnesses: Update Cloud Harness configuration

You can update an existing Cloud Harness's authentication, runtime image, and resources. With [workspace persistence](cloud-harness.md#configure-and-manage-cloud-harnesses-workspace-storage) enabled, you can increase storage size. You cannot reduce its size or change persistence after creation.

> [!warning] Before updating
>
> If workspace persistence is disabled, save files you need outside the harness before updating it. Configuration changes can redeploy the harness and erase workspace files and agent sign-ins.

To update your Cloud Harness:

1. Open the Cloud Harness overview.

2. Click the Options icon in the right sidebar.

3. Update the configuration you want to change.

4. Click Update options.

![Update Cloud Harness configuration](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/update-harness.png)

### Configure and manage Cloud Harnesses: Pause and resume a Cloud Harness

Pausing a Cloud Harness scales it to zero and stops its terminal sessions and processes. With [workspace persistence](cloud-harness.md#configure-and-manage-cloud-harnesses-workspace-storage) enabled, files in `/home/harness` remain available when you resume it.

> [!warning] Before pausing
>
> If workspace persistence is disabled, save files you need outside the harness before pausing it. Pausing then erases workspace files and agent sign-ins.

To pause a Cloud Harness:

1. Open the Cloud Harness overview.

2. Click the Pause harness icon in the top-right corner.

3. Wait for the Cloud Harness to pause.

To resume a Cloud Harness:

1. Open the Cloud Harness overview.

2. Click the Resume harness icon in the top-right corner.

3. Wait for the Cloud Harness to start.

### Configure and manage Cloud Harnesses: Monitor Cloud Harness resources

You can monitor the resource usage of your Cloud Harness from the **Observe** section.

To view your Cloud Harness metrics:

1. Open the Cloud Harness overview.

2. Click the **Observe** icon in the right sidebar.

You can view metrics such as CPU and memory usage to monitor your Cloud Harness.

Learn more about [observability on Northflank](observe.md#observability-on-northflank).

![Monitor Cloud Harness resources](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/monitor-harness.png)

### Configure and manage Cloud Harnesses: Delete a Cloud Harness

You can permanently delete a Cloud Harness and its associated workspace.

> [!warning] Deletion is permanent
>
> Deleting a Cloud Harness cannot be undone. Back up any files or data you want to keep before you delete it.

To delete a Cloud Harness:

1. Open the Cloud Harness overview.

2. Click the **three-dot** menu in the top-right corner.

3. Click **Delete harness**.

4. Confirm the deletion.

![Delete a Cloud Harness](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/delete-harness.png)

### Configure and manage Cloud Harnesses: Choose privacy

With Team privacy, team members with the required permissions can connect to the Cloud Harness. With Private privacy, only its creator can access the workspace.

Your team must allow private harnesses before you can select Private. You cannot change privacy after creation.

Private harnesses use the in-app terminal. Northflank SSH and port forwarding are unavailable, including for the creator.

When you create a Cloud Harness, open Advanced → Privacy to select its privacy.

Private harnesses remain visible to your team, including their name, creator, source repository, and allocated resources. Team members with the required permissions can still pause, resume, or delete them. Privacy does not make application ports private. Configure [networking](cloud-harness.md#configure-and-manage-cloud-harnesses-configure-networking) separately.

### Configure and manage Cloud Harnesses: Set team policies

You need permission to update harness policies in your team. By default, all harness types are allowed and private harnesses are disabled.

1. Open Configuration → Harness policies in your team.

2. Select the harness types that team members can create.

3. To allow private workspaces, enable Allow private harnesses.

4. Click Save changes.

The policy applies when you create a harness or change its agent type. Existing harnesses keep running. Disabling private harnesses prevents new private harnesses but does not change existing ones.

> [!note] Questions?
>
> Reach out to the Northflank team at [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) or [book a demo](https://cal.com/team/northflank/northflank-demo?duration=30).

### Configure and manage Cloud Harnesses: Next steps

- [Get started with Agent skills: Give agents domain-specific knowledge about Northflank infrastructure and APIs.](ai-agents.md#agent-skills)

## Quickstart

Source: https://northflank.com/docs/v1/application/cloud-harness/quickstart.md

Cloud Harnesses are coding environments that let you run coding agents like Claude or Codex in isolated, secure environments on Northflank. Instead of running agents on your local machine or directly against your codebase, a Cloud Harness provides a controlled workspace with its own resources, networking, and configuration.

Run Cloud Harnesses in [Northflank's managed cloud](https://northflank.com/features/managed-cloud) or [in your own cloud infrastructure](https://northflank.com/features/bring-your-own-cloud). You can connect repositories, configure ports and environment variables, and monitor resource usage—all from the Northflank dashboard or your local terminal.

![Cloud Harness on Northflank](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/harness.png)

### Quickstart: How Cloud Harness works

When you create a Cloud Harness:

1. Northflank provisions a cloud coding environment in your environment (managed cloud or your own infrastructure).

2. If you use a coding agent, sign in or provide an API key as your agent requires.

3. (Optional) You connect a Git repository for the agent to work with.

4. You configure networking, environment variables, and resources.

5. You access the Cloud Harness from the Northflank dashboard. With Team privacy, you can also connect locally using SSH.

An active Cloud Harness runs continuously until you pause or delete it. With [workspace persistence](cloud-harness.md#configure-and-manage-cloud-harnesses-workspace-storage) enabled, files in `/home/harness` survive pauses and restarts. You can update its configuration and monitor its resource usage at any time.

With Team privacy, team members with the required permissions can work in the same Cloud Harness simultaneously. With Private privacy, only the creator can access the workspace. See [privacy and team policies](cloud-harness.md#configure-and-manage-cloud-harnesses-choose-privacy).

#### Quickstart: Browser tools and agent skills

The Managed runtime image includes `playwright-cli` and Chromium for browser tasks without a graphical interface. You can ask your agent to inspect a website or capture screenshots with the bundled `northflank-browser` skill.

Managed images also include the `northflank` skill for [working with Northflank resources](ai-agents.md#agent-skills).

For a custom runtime image, tool and skill availability depends on the image that you use. Make sure that it includes the tools that your agent needs.

### Quickstart: Create your first Cloud Harness

> [!note] Requirements
>
> You will need the following to get started:
>
> - A [Northflank account](https://app.northflank.com/signup). Free projects support one harness, including paused harnesses.
> - For a coding agent, an account or API key that your selected agent supports.
> - A [Git integration](getting-started.md#link-your-git-account) if you want to connect a repository.
> - For BYOC, a supported microVM runtime installed on the cluster and nodes that can run it. See [cluster sandbox setup](sandboxes.md#sandboxes-in-your-own-cloud-configure-your-cluster-for-sandboxes). Harnesses do not require changing the default runtime for other services.

Your team controls which harness types and privacy choices are available. Choose privacy during creation, because you cannot change it later. See [privacy and team policies](cloud-harness.md#configure-and-manage-cloud-harnesses-choose-privacy).

> [!warning] Workspace persistence
>
> Keep Persist workspace files enabled to retain files in `/home/harness`. It is enabled by default. If you disable it, stops, restarts, and redeployments erase workspace files and agent sign-ins. You cannot change this choice after creation. See [workspace storage](cloud-harness.md#configure-and-manage-cloud-harnesses-workspace-storage).

To create a Cloud Harness:

> [!note]
>
> [Click here](https://app.northflank.com/s/project/create/harness) to create a Cloud Harness.

1. Open or [create a project](getting-started.md#create-a-project).

2. Open Harnesses and click Create harness.

3. Select a coding agent, or select Empty sandbox to start without one.

4. Enter a name for your Cloud Harness.

5. Select the environment where you want to run it.

6. For a coding agent, choose an available authentication method or review the terminal sign-in instructions under Authentication.

7. Under Repository, select a repository and branch, create a new repository, or continue without a repository.

8. Under Advanced, configure privacy, runtime variables, the runtime image, resources, and workspace storage as needed.

9. Click Create harness.

Northflank opens the Cloud Harness terminal. Follow the [sign-in instructions](cloud-harness.md#quickstart-sign-in-to-your-coding-agent) for your agent.

![Creating a Cloud Harness in the Northflank application](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/create-harness.png)

#### Quickstart: Sign in to your coding agent

For Claude Code, OpenAI Codex, or Cursor, you can enable Authenticate with an API key under Authentication during creation. Otherwise, sign in from the terminal when prompted.

Pi, OpenCode, OMP, and Devin CLI use terminal sign-in after creation:

| Agent | Sign in | Start the agent |
| --- | --- | --- |
| Pi | Run `pi`, then enter `/login` and follow the prompts. | Run `pi`. |
| OpenCode | Run `opencode`, then enter `/connect` and follow the prompts. | Run `opencode`. |
| OMP | Run `omp`, then enter `/login` and follow the prompts. | Run `omp`. |
| Devin CLI | Run `devin auth login` and follow the prompts. | Run `devin`. |

#### Quickstart: Quick create and terminal dock

The harness dock lets you use a terminal while you browse other pages in your team.

Quick create uses Team privacy. To choose privacy, connect a repository, or configure resources first, use Configure & create instead.

1. From your team's dashboard, open the Harnesses dock at the bottom of the sidebar.

2. Click the plus icon, New harness.

3. Select a project and coding agent.

4. Click Quick create.

The terminal opens in the dock. Follow the [sign-in instructions](cloud-harness.md#quickstart-sign-in-to-your-coding-agent) for your agent.

You can also open an existing harness from the dock. Closing its tab or minimizing the dock does not pause the harness.

### Quickstart: Connect to your Cloud Harness locally

Access your Cloud Harness from your terminal, Visual Studio Code, or Cursor using SSH.

> [!note] Requirements
>
> You will need the following to get started:
>
> - The [Northflank CLI installed and authenticated](../api/use-the-cli.md).
> - Permission to connect to the Cloud Harness.
> - A Cloud Harness with Team privacy. Private harnesses require the in-app terminal, including for their creator.
> - The Cloud Harness must be running.

#### Quickstart: Connect from your terminal

To connect to your Cloud Harness:

1. Open the Cloud Harness overview.

2. Under Local access, click Connect.

3. Copy the command under SSH into this harness.

4. Run the command in your terminal.

Example: `northflank dev ssh --projectId harness --harnessId numerous-class`

You can now work in your Cloud Harness environment from your local terminal.

![Connect to your Cloud Harness locally](https://assets.northflank.com/documentation/v1/application/ai-agents/harnesses/connect-harness.png)

#### Quickstart: Connect your editor

You can connect Cursor or Visual Studio Code to your Cloud Harness using SSH. This lets you work with files in your Cloud Harness workspace directly from your local editor.

Before connecting, add your public key to an [SSH identity](run.md#access-services-with-ssh-create-an-ssh-identity). Your harness must meet any project or tag restrictions on the identity.

Start an SSH proxy, a local connection to your harness, with this command. Replace the project and harness IDs with your own:

```bash
northflank dev ssh --projectId my-project --harnessId my-harness --proxyOnly
```

The CLI starts a local SSH proxy and displays its address and port, for example `127.0.0.1:51887`. Keep the terminal open while using your editor. Closing it stops the proxy and disconnects your editor.

Your editor connects as the `harness` user. Use the following format with the address and port displayed by the CLI:

```
harness@<address>:<port>
```

##### Quickstart: Cursor

1. Start the SSH proxy.

2. In Cursor, click Connect via SSH.

3. Enter the connection, for example `harness@127.0.0.1:51887`, and press Enter.

4. If prompted, select Linux as the platform and confirm the host fingerprint.

5. Click Open Folder and open `/home/harness`.

##### Quickstart: Visual Studio Code

Install the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) first.

1. Start the SSH proxy.

2. In VS Code, click the remote indicator in the bottom-left corner of the status bar and select Connect to Host....

3. Enter the connection, for example `harness@127.0.0.1:51887`, and press Enter.

4. If prompted, select Linux as the platform and confirm the host fingerprint.

5. Click Open Folder and open `/home/harness`.

For more details, see the [VS Code Remote SSH documentation](https://code.visualstudio.com/docs/remote/ssh).

> [!note] Questions?
>
> Reach out to the Northflank team at [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) or [book a demo](https://cal.com/team/northflank/northflank-demo?duration=30).

### Quickstart: Next steps

- [Configure and manage Cloud Harnesses: Configure networking, environment variables, resources, and monitor your Cloud Harness.](cloud-harness.md#configure-and-manage-cloud-harnesses)
- [Get started with Agent skills: Give agents domain-specific knowledge about Northflank infrastructure and APIs.](ai-agents.md#agent-skills)
