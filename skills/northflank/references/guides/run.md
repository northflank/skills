# Run

Generated from 13 application pages listed in `llms.txt`.

## Pages

- [Access running containers locally](#access-running-containers-locally)
- [Access services with SSH](#access-services-with-ssh)
- [Change deployment source](#change-deployment-source)
- [Deploy to a region](#deploy-to-a-region)
- [Inject runtime variables](#inject-runtime-variables)
- [Override command or entrypoint](#override-command-or-entrypoint)
- [Run an image continuously](#run-an-image-continuously)
- [Run an image from a container registry](#run-an-image-from-a-container-registry)
- [Run an image once or on a schedule](#run-an-image-once-or-on-a-schedule)
- [Run as a different user](#run-as-a-different-user)
- [Run containers and micro-services on Northflank](#run-containers-and-micro-services-on-northflank)
- [Save registry credentials](#save-registry-credentials)
- [Transfer data to and from containers](#transfer-data-to-and-from-containers)

## Access running containers locally

Source: https://northflank.com/docs/v1/application/run/access-running-containers-locally.md

You can forward your deployment and addons for local development, this allows you to access resources as if you were in your secure Northflank project network.

You can also open a shell in your running containers, giving you SSH-like access to the filesystem, environment, and processes.

### Access running containers locally: Execute commands in a container

Shell access gives you access to everything inside your container, such as environment, filesystem, processes, and the ability to run commands like `top`, `npm`, `sed`, `vi`, `df`. It also provides command completion and command history where possible.

You can access the shell of running containers in deployment and combined services by navigating to the containers page for the specific service. You can open a shell for a specific container by clicking  shell access button.

Running job containers can be accessed by navigating to the job runs page and selecting an active job run. Click  shell access button on the specific container to open a shell.

![Accessing a container shell in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/access-running-containers-locally/shell-access-container.png)

> [!note] Copy & paste
> You can copy and paste in the browser shell with control-shift-c and control-shift-v. This may not work in Firefox, where you may need to use the right-click menu to copy and paste. Command-c and command-v works across all browsers on macOS.

### Access running containers locally: Forward containers for local access

You can forward a deployment for local development and access using the [Northflank CLI](../api/use-the-cli.md).

Your deployment must be running and have at least one port configured.

You can view and copy the command to connect to a deployment on the specific deployment's overview, in the local access section, or use the following commands:

- To forward a specific service:

`sudo northflank forward service --projectId [project-name] --serviceId [service-name]`

- To forward all ports in a project:

`sudo northflank forward all --projectId [project-name]`
You can now connect to your deployment locally on the available ports.

### Access running containers locally: Execute commands in an action node

You can execute commands in a service in a [template](infrastructure-as-code.md#template-nodes-action-nodes) or [release flow](release.md#configure-a-release-flow-run-action) by using an action node.

Commands supplied in an action node will not be executed with a shell by default. This means commands executed without a shell will not be able to use any shell features, and will directly pass all strings after the specified executable as parameters without any evaluation.

If you require a shell you must explicitly invoke it first, for example `sh -c`. You can then include your command in the release flow or template after `sh -c` in quote marks escaped with a backslash (`\"`).

Below is an example of a command run with and without a shell in a template's action node. The commands are executed in a service container which has the environment variable `MESSAGE` with the value `Hello!`.

| Command | Output | Description |
| --- | --- | --- |
| `"command": "echo ${MESSAGE}"` | `${MESSAGE}` | Executes `echo` directly, fails to access the environment variable `MESSAGE` without a shell |
| `"command": "sh -c \"echo ${MESSAGE}\""` | `Hello!` | Invokes a shell to execute `echo` and successfully reads the environment variable `MESSAGE` |

### Access running containers locally: Next steps

- [Forward deployments and databases: Forward deployments and databases to your local machine for development.](../api/forwarding.md)
- [Add private ports: Configure ports to allow your services to communicate securely within your project.](network.md#configure-ports-private-ports)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Use Northflank generated DNS entries: Learn about Northflank-generated DNS entries for your private and public ports.](network.md#configure-ports)
- [Run your application as a different user: Run your Docker image as a different user, or execute commands as a different user in your container.](run.md#run-as-a-different-user-run-a-command-as-a-different-user)

## Access services with SSH

Source: https://northflank.com/docs/v1/application/run/access-services-with-ssh.md

SSH identities allow you to SSH into running service containers using your SSH keys. This enables integration with development tools like VSCode and Cursor, and file transfer using standard SSH tools (scp, sftp, rsync).

SSH identities are managed at the team level and can be restricted by project or tag.

### Access services with SSH: Create an SSH identity

#### Access services with SSH: Generate an SSH keypair

If you don't already have an SSH key, generate one:

```
ssh-keygen -t ed25519 -f ~/.ssh/id_northflank
```

This creates:

- `~/.ssh/id_northflank` (private key)

- `~/.ssh/id_northflank.pub` (public key)

**Load your key into your SSH agent:**

```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_northflank
```

#### Access services with SSH: Create the identity in Northflank

1. Navigate to [**Team** → **Integrations** → **SSH Identities**](https://app.northflank.com/s/account/integrations/ssh-identities)

2. Click **Create SSH Identity**

3. **Name**: Enter a name

4. **Description**: (Optional)

5. **SSH Public Keys**: Add keys

6. **(Advanced options)** Configure restrictions:

  - **Projects**: Restrict to specific projects, or leave disabled for all projects

  - **Tags**: Restrict by tags. Toggle "Match all tags" for AND logic (service needs all tags) or leave off for OR logic (service needs one tag)

  - **Both enabled**: Service must match project AND tag requirements

7. Click **Create SSH identity**

### Access services with SSH: Enable SSH on a service

SSH must be enabled on each service individually:

1. Navigate to your project

2. Select the service

3. Open the **Resources** tab

4. Check **Enable SSH**

5. Click **Update and restart**

### Access services with SSH: Connect via SSH

[Install and authenticate the Northflank CLI](../api/use-the-cli.md) before connecting.

#### Access services with SSH: Direct SSH session

To SSH directly into a service:

**Interactive selection:**

```
northflank ssh service
```

**Specify project and service:**

```
northflank ssh service --projectId my-project --serviceId my-service
```

By default, this logs you in as the root user. To specify a different user:

```
northflank ssh service --projectId my-project --serviceId my-service --user my-user
```

#### Access services with SSH: SSH proxy mode

To run an SSH proxy without opening a terminal session:

```
northflank ssh service --projectId my-project --serviceId my-service --proxyOnly
```

This sets up port forwarding, allowing you to use standard SSH tools:

```
SSH proxy started on endpoint: 127.24.1.1:37071, stop with Ctrl+C
Use with any SSH compatible client. Example usages:
  > SSH session: ssh root@127.24.1.1 -p 37071
  > SFTP:        sftp -P 37071 root@127.24.1.1
  > RSYNC:       rsync -avz -e "ssh -p 37071" ./data/ root@127.24.1.1:/rsync-test/
  > SCP:         scp -P 37071 file.txt root@127.24.1.1:/remote/path/
```

### Access services with SSH: Transfer files

With the SSH proxy running (`--proxyOnly`), you can transfer files using standard tools. Replace the port with the one shown in your proxy output.

**Copy a file to the service:**

```
scp -P 51887 model.bin root@127.0.0.1:/data/
```

**Copy a file from the service:**

```
scp -P 51887 root@127.0.0.1:/data/results.csv ./
```

**Sync a local directory to the service:**

```
rsync -avz -e "ssh -p 51887" ./my-project/ root@127.0.0.1:/workspace/
```

**Sync a remote directory to your local machine:**

```
rsync -avz -e "ssh -p 51887" root@127.0.0.1:/workspace/outputs/ ./outputs/
```

**Interactive SFTP session:**

```
sftp -P 51887 root@127.0.0.1
```

**Note:** `rsync` must be installed on both your local machine and the remote service. `scp` and `sftp` are included with OpenSSH by default.

### Access services with SSH: Connect your editor

You can connect VSCode or Cursor to your service using the SSH proxy.

> [!note]
> Mount a directory that is persisted (backed by a volume). Otherwise, you risk losing changes when the container restarts. See [Add a persistent volume](databases-and-persistence.md#add-a-persistent-volume).

#### Access services with SSH: Cursor

1. Start the SSH proxy: `northflank ssh service --projectId my-project --serviceId my-service --proxyOnly`

2. In Cursor, click **Connect via SSH**

3. Paste the command (e.g., `ssh root@127.24.1.1 -p 37071`) and press Enter

4. Approve the host keys when prompted

5. Once connected, click **Open Folder**

#### Access services with SSH: Visual Studio Code

1. Start the SSH proxy: `northflank ssh service --projectId my-project --serviceId my-service --proxyOnly`

2. In VSCode, install the Remote SSH extension

3. Click the Remote SSH button and select **Connect to Host**

4. Enter the SSH command in this format: `ssh <user>@127.0.0.1 -p <port>`

  Example: `ssh root@127.0.0.1 -p 51887`

5. Select the platform and approve the host keys

For more details, see the [VSCode Remote SSH documentation](https://code.visualstudio.com/docs/remote/ssh).

### Access services with SSH: Troubleshooting

**Permission denied (publickey):**

```
Permission denied (publickey).
SSH exited with code: 255
```

Check that:

- You added the correct **public key** to the SSH identity

- SSH is enabled on the service's **Resources** page

- You have added the key to your SSH agent: `ssh-add ~/.ssh/id_northflank`

- Your service matches the project or tag restrictions configured on the SSH identity

### Access services with SSH: Limitations

- SSH access is currently available for **services only**. Job support is planned for the future.

- Services automatically open port 22 for SSH. You should not manually configure this port.

## Change deployment source

Source: https://northflank.com/docs/v1/application/run/change-deployment-source.md

You can switch a deployment service from using an image built from your linked Git provider to an image hosted on a container registry at any time, and vice versa. You cannot change the image source for jobs.

### Change deployment source: Change source via the deployment overview

You can open the edit deployment dialog from the service overview.

![Changing the deployment source in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/change-deployment-source/deployment-service-edit-deployment.png)

#### Change deployment source: Northflank

Change the source to an image built on Northflank from a Git repository. Select a build service and branch to deploy builds from, the deployment service will use the latest build from the branch.

#### Change deployment source: External image

Change the source to use an image from an external container registry. Enter the image path and your [registry credentials](run.md#run-an-image-from-a-container-registry-registry-credentials), if using a private image.

### Change deployment source: Next steps

- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Networking on Northflank: Configure ports and security for your deployments.](network.md#networking-on-northflank)
- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Add databases and persistent storage: Create and use databases and other types of persistent storage in your project's applications and services.](databases-and-persistence.md#stateful-workloads-on-northflank)

## Deploy to a region

Source: https://northflank.com/docs/v1/application/run/deploy-to-a-region.md

You can deploy your code to a specific region by [creating a project](getting-started.md#create-a-project) in that region. This allows jobs or services to be run closer to customers, your development team, or external service for better connectivity.

You cannot change the region of a project after it is created, and all resources deployed in that project will be deployed in that region. [Builds](build.md#build-your-code-on-northflank), unless [configured to run on your own cluster](bring-your-own-cloud.md#configure-your-cluster-select-build-infrastructure), are performed on Northflank build infrastructure outside your project.

Northflank currently supports the following regions:

| Region | API reference | Global region |
| --- | --- | --- |
| Africa South | `africa-south` | EMEA |
| Asia East | `asia-east` | Asia Pacific |
| Asia Northeast | `asia-northeast` | Asia Pacific |
| Asia Southeast | `asia-southeast` | Asia Pacific |
| Australia Southeast | `australia-southeast` | Asia Pacific |
| Canada Central | `canada-central` | Americas |
| Europe West | `europe-west` | EMEA |
| Europe West Frankfurt | `europe-west-frankfurt` | EMEA |
| Europe West Netherlands | `europe-west-netherlands` | EMEA |
| Europe West Zurich | `europe-west-zurich` | EMEA |
| Southamerica East | `southamerica-east` | Americas |
| US Central | `us-central` | Americas |
| US East Ohio | `us-east-ohio` | Americas |
| US East1 | `us-east1` | Americas |
| US West | `us-west` | Americas |
| US West California | `us-west-california` | Americas |

Contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) to register your interest for regions not listed above.

You can also [integrate with other cloud providers](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank) to deploy your own clusters, which will allow you to create projects hosted on your chosen cloud provider, in the regions they support.

### Deploy to a region: Network resources across multiple regions

Resources in a project are, by default, inaccessible from other projects. To allow resources in different projects to communicate you can either:

- create a public port, which exposes your service or database to the public internet

- [allow network ingress from your other projects](network.md#enable-multi-project-networking) which allows you to use private, secure ports as well as TCP and UDP protocols

### Deploy to a region: Next steps

- [Bring your own cloud to Northflank: Use all the features of the Northflank platform on other cloud hosting providers, with control over your own infrastructure.](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank)
- [Multi-project networking: Configure projects to securely allow ingress network traffic from other projects.](network.md#enable-multi-project-networking)
- [Use Tailscale: Allow secure access to Tailscale devices to resources within your project.](network.md#use-tailscale)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)

## Inject runtime variables

Source: https://northflank.com/docs/v1/application/run/inject-runtime-variables.md

You can set [runtime variables (ENV)](https://docs.docker.com/engine/reference/builder/#env) to be passed to the Docker container at runtime. You can set runtime variables in individual resources, or [create a secret group](secure.md#manage-secret-groups) so that multiple resources in a project can inherit the same secrets.

You can also upload [secret files](run.md#inject-runtime-variables-add-a-secret-file-to-a-deployment) to make certificates, configuration files, and other data available in your containers.

![Editing runtime variables in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/inject-runtime-variables/environment-variables.png)

Runtime variables can be set as key-value pairs, or as JSON in the following format:

```JSON
{
    "KEY_1": "value1",
    "KEY_2": "value2"
}
```

An `.env` file can also be uploaded and edited using the following format:

```ENV
KEY_1=value1
KEY_2=value2
```

### Inject runtime variables: Access environment variables in your code

Your runtime variables can be accessed via the process environment, for example in a Node environment a variable set as `ENV_VALUE=Northflank` can be accessed within the container by referring to `process.env.ENV_VALUE`.

| Runtime environment | Environment variable accessor | Required import |
| --- | --- | --- |
| Node | `process.env.ENV_KEY` | none |
| Deno | `Deno.env.get("ENV_KEY")` | none |
| Bun | `Bun.env.ENV_KEY` OR `process.env.ENV_KEY` | none |
| Python | `os.environ.get("ENV_KEY")` | `import os` |
| Java | `System.getenv("ENV_KEY")` | none |
| Kotlin | `System.getenv("ENV_KEY")` | none |
| Ruby on Rails | `ENV["ENV_KEY"]` | none |
| Rust | `env::var("ENV_KEY")` | `use std::env` |
| Go | `os.Getenv("ENV_KEY")` | `import ( "os" )` |
| C# / .NET | `Environment.GetEnvironmentVariable("ENV_KEY")` | `using System;` |
| C++ | `std::getenv("ENV_KEY")` | `#include <cstdlib>` |
| C | `getenv("ENV_KEY")` | `#include <stdlib.h>` |
| PHP | `getenv("ENV_KEY")` | none |
| Lua | `os.getenv("ENV_KEY")` | none |
| Shell / Bash | `${ENV_KEY}` | none |
| PowerShell | `$Env:ENV_KEY` OR `[Environment]::GetEnvironmentVariable('ENV_KEY')` | none |

### Inject runtime variables: Add a secret file to a deployment

You can include secret files which can be accessed in your container's file system. This can be useful to provide certificates, secrets, or configuration files that must are required by your application, but which should not be included in your repository.

To add a secret file, paste or upload the content in the secret file editor on the environment page of a deployment service, combined service, or a job. You can also upload secret files to [secret groups](secure.md#manage-secret-groups) to make them available to multiple resources in the same project.

### Inject runtime variables: Next steps

- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)

## Override command or entrypoint

Source: https://northflank.com/docs/v1/application/run/override-command-entrypoint.md

Your deployments will specify either a command (`CMD`), an entrypoint (`ENTRYPOINT`), or both to identify the command or executable to run in your built image. Commands or entrypoints will be either defined in your Dockerfile, generated by the buildpack, or defined by a [Procfile](https://devcenter.heroku.com/articles/procfile) (for buildpack builds). In many cases you will not need to change these settings from the default.

Overriding the command or entrypoint in an individual service or job allows you to run a built image without updating the Dockerfile or re-building it, or affecting any other deployments of the image. This allows you to run different services or jobs from the same repository, for example if you have a repository containing microservices or need to [run a migration](release.md#run-migrations).

Entrypoint and command overrides can be combined when required, for example if you want to [run shell commands or use variables](run.md#override-command-or-entrypoint-use-variables-in-a-command).

You can configure the Docker runtime mode when creating a deployment (combined service, deployment service, or job) to override the default command and/or entrypoint at runtime. You can set the Docker runtime mode for existing services and jobs from the CMD override page.

If your Dockerfile defines an [ENTRYPOINT instruction](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact), the entrypoint instruction and parameters will be processed first, then any [CMD instruction](https://docs.docker.com/engine/reference/builder/#cmd) and parameters. The executed command in this case is a concatenation of the entrypoint and command instructions.

### Override command or entrypoint: Override command

You can override the default command from the CMD override page in your job or service by selecting `custom command` as the Docker runtime mode.

Enter the new command and save changes to restart your containers with the new command. To use the default command again, select `default configuration` as the runtime mode and save changes to restart your deployment. Jobs will use the new configuration the next time they run.

| Command | Effect |
| - | - | - |
| `node server/index.js mode=test` | Runs `server/index.js` using `node` with the parameter `mode=test` |
| `/start.sh` | Executes the shell script `/start.sh` |

You may need to also [override the entrypoint](run.md#override-command-or-entrypoint-override-entrypoint), if one exists, to execute your command successfully.

![Command and entrypoint override page in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/override-command-entrypoint/cmd-override.png)

#### Override command or entrypoint: Command override format

The [Docker CMD instruction](https://docs.docker.com/engine/reference/builder/#cmd) is run in `exec` form on Northflank, where the executable and parameters are given as elements in an array:

CMD ["executable", "parameter1", "parameter2"]

### Override command or entrypoint: Override entrypoint

You can override the default entrypoint from the CMD override page in your job or service by selecting `custom entrypoint` as the Docker runtime mode.

Enter the new entrypoint and save changes to restart your containers with the new entrypoint. To use the default entrypoint again, select `default configuration` as the runtime mode and save changes to restart your deployment. Jobs will use the new configuration the next time they run.

### Override command or entrypoint: Execute shell commands

You must explicitly invoke a shell if you want to execute a shell command for a Docker image. This allows you to use shell primitives and command evaluations in your Docker command, and to access environment variables in your command. You can also chain multiple commands using shell operators (for example `&&` or `||`) using this method.

You should select custom command & entrypoint as your Docker runtime mode and invoke a shell (e.g. `sh -c`) as the custom entrypoint. You can then include your shell command as a custom command, as a string wrapped in quotation marks (`'` or `"`).

You can include the shell and command as a command override only, but if there is an existing entrypoint it may prevent the shell from being invoked. Overriding the entrypoint is good practice to avoid this, and you should check your command has been parsed as expected before saving your override.

You can use [variables](run.md#inject-runtime-variables) in your commands to access any variables injected into your runtime environment.

To access runtime variables in a command override you should invoke a shell (`sh -c`) using a custom entrypoint and include the custom command with variables as a string.

| Entrypoint | Command | Result |
| --- | --- | --- |
| `sh -c` | `"echo $VARIABLE"` | Executes a shell and replaces `$VARIABLE` with the matching environment variable value |
| `sh -c` | `'yarn migration:generate bootstrap && yarn migration:run'` | Executes a shell to run `yarn migration:generate`, and then `yarn migration:run` if the first command exits successfully |

### Override command or entrypoint: Buildpack processes

The buildpack builder will attempt to identify all processes and their associated commands in your repository, and will define them in the built image, with the `web` process as default. You can check a default process has been set in the [build logs](observe.md#view-logs).

You can also manually define processes and their commands in a [Procfile](https://devcenter.heroku.com/articles/procfile).

#### Override command or entrypoint: Example Procfile

A Procfile is a plain text file named `Procfile` (no file extension) in your repository root. Each line declares a process type and the command to run.

**Example Procfile:**

```
web: npm start
worker: node worker.js
release: node scripts/migrate.js
```

**Process types:**

- `web`: The default process that receives HTTP traffic (runs when no override is specified)

- Other names: Custom processes you can run using entrypoint overrides

**Running non-web processes:**

To run a process other than `web`, select **Custom process** as the Docker runtime mode and choose the process name from the dropdown (e.g., `worker`).

**Buildpack runtime modes:**

Buildpack services have four runtime modes:

- **Default process**: Uses the buildpack's default process (usually `web`, but some buildpacks don't set a default)

- **Custom process**: Select a specific process from your Procfile

- **Custom command**: Run arbitrary commands using `/cnb/lifecycle/launcher` (sets up environment, user, home directory, env vars)

- **Custom command & entrypoint**: Full control over command and entrypoint without launcher (minimal environment setup)

If your built image does not define a default process then the entrypoint of the generated image will be `/cnb/lifecycle/launcher`. In this case you must set a [command override](run.md#override-command-or-entrypoint-override-command) to one of the non-default processes, otherwise the container will not start properly. The launcher will attempt to run any command with a bash shell. To execute a command without a shell, prefix the command with `--` (e.g. `-- /cnb/process/non-default`).

[Learn more about buildpack processes](https://buildpacks.io/docs/app-developer-guide/run-an-app/).

### Override command or entrypoint: Next steps

- [Build a repository using a Dockerfile: Configure your application build process using a Dockerfile.](build.md#build-with-a-dockerfile)
- [Build a repository using Buildpacks: Build your application automatically using Buildpack stacks.](build.md#build-with-buildpacks)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Run your application as a different user: Run your Docker image as a different user, or execute commands as a different user in your container.](run.md#run-as-a-different-user-run-a-command-as-a-different-user)

## Run an image continuously

Source: https://northflank.com/docs/v1/application/run/run-an-image-continuously.md

You can run an image built on Northflank from your linked Git repositories as a continuous service.

Enabling continuous integration and continuous delivery ([CI/CD](release.md#manage-cicd)) will allow you to automatically run your latest code when a new commit is pushed to your repository's branches and/or pull requests.

Deployment services can be added to a pipeline to create complex workflows.

Alternatively you can build and run from one repository branch in a single combined service.

> [!note]
> [Click here](https://app.northflank.com/s/project/create/service) to create a deployment or combined service.

### Run an image continuously: Run an image built on Northflank

You can run an image built on Northflank continuously using a deployment service.

#### Run an image continuously: Create a new deployment

Create a new deployment service, and select Northflank as the deployment source. Expand link build service and choose the service and branch to deploy builds from. You can also create a deployment service with no build and link a build service later.

![Creating a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/run-an-image-continuously/create-deployment-service.png)

#### Run an image continuously: Edit an existing deployment

Navigate to an existing deployment service and select configure deployment from the service overview. Select `Northflank` as the deployment source, and choose a build service and branch to deploy builds from. Update to restart the service with the selected build.

#### Run an image continuously: Deploy builds using a pipeline and release flow

You can also [create a pipeline](release.md#create-a-pipeline-and-release-flow) with a [release flow](release.md#create-a-pipeline-and-release-flow-create-a-release-flow) to deploy builds when the release flow is run. You can configure the release flow to deploy either specific images, such as promoting a build deployed in a previous stage of the pipeline, or the latest image from a build service or container registry.

### Run an image continuously: Build and run an image in one service

You can build and run an image from a Git provider in a single service using a combined service. This is a self-contained CI/CD pipeline, and so cannot be used in pipelines like build and deployment services.

You can select a branch from a linked repository to build from, but cannot specify build rules to build from multiple branches or from pull request branches. With CI enabled, the service will automatically build the latest commit to your linked branch.

You can enable CD for your combined service to automatically deploy the latest build from your linked repository. Alternatively you can select commits to manually build and deploy from the builds page.

You can choose whether to build using a [Dockerfile or a buildpack](build.md#build-code-from-a-git-repository-choose-a-build-type).

Read the [getting started guide](getting-started.md#build-and-deploy-your-code) for more detail on combined services.

### Run an image continuously: Next steps

- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Networking on Northflank: Configure ports and security for your deployments.](network.md#networking-on-northflank)
- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Add databases and persistent storage: Create and use databases and other types of persistent storage in your project's applications and services.](databases-and-persistence.md#stateful-workloads-on-northflank)

## Run an image from a container registry

Source: https://northflank.com/docs/v1/application/run/run-an-image-from-a-container-registry.md

You can run images from container registries in three different ways on Northflank:

- As a continuously running service

- As a regularly scheduled cron job

- As a manually-run job

> [!note]
> [Click here](https://app.northflank.com/s/project/create/service) to create a deployment service.
You can create a new continuously-running deployment service, a scheduled cron job or a manual job with an external image as the source.
You will need to enter the full image path and, if the image is private, select the [appropriate registry credentials](run.md#run-an-image-from-a-container-registry-verify-image).

![Deploying an image from a container registry in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/run-an-image-from-a-container-registry/deploy-external-image.png)

### Run an image from a container registry: Image paths

Image paths include the registry url, username, image, and sometimes version, in the format:

`[registry-url]/[account]/[image]:[version]`

For example:

`docker.io/nginxinc/nginx-unprivileged:latest`

Northflank will automatically detect the registry and relevant credentials.

If you do not include the registry Northflank will default to `Docker Hub`, and if you do not specify an account Northflank will default to `Library`. `nginx:latest` would therefore become `docker.io/library/nginx:latest`

### Run an image from a container registry: Verify image

Northflank will attempt to automatically verify the image from the path you have entered. If the path cannot be verified, you will be prompted to either select your credentials or check the image path is correct.

If you do not have the [necessary credentials saved](run.md#save-registry-credentials), select `Add new credential +`.

If entering a path or selecting credentials fail to trigger automatic verification, you can manually verify by clicking the verify button  above the image path field.

### Run an image from a container registry: Next steps

- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Networking on Northflank: Configure ports and security for your deployments.](network.md#networking-on-northflank)
- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Add databases and persistent storage: Create and use databases and other types of persistent storage in your project's applications and services.](databases-and-persistence.md#stateful-workloads-on-northflank)

## Run an image once or on a schedule

Source: https://northflank.com/docs/v1/application/run/run-an-image-once-or-on-a-schedule.md

You can run code from a Git registry or an image from a container registry as a job that will terminate after the container has finished running. You can create either a manual job, to run once whenever you trigger it, or a cron job to run on a schedule.

You can create a job from the following sources:

- Version control: build from a specific branch in a repository [on a linked git account](getting-started.md#link-your-git-account) and run the resulting image

- External image: deploy an image from a [container registry](run.md#run-an-image-from-a-container-registry)

- Northflank: deploy an image built by a [Northflank build service](build.md#build-code-from-a-git-repository)

From the job overview you can run manual jobs, or pause and resume scheduled jobs.

> [!note]
> [Click here](https://app.northflank.com/s/project/create/job) to create a job.

### Run an image once or on a schedule: Configure CI/CD for a job

Continuous integration (CI) is available to your jobs created with version control as their source. When CI is active on your job, every new commit to the tracked branch of the linked repository will automatically result in a new build. You can change the repository and branch from the build options page.

Continuous delivery (CD) is available on your jobs that have version control or a Northflank build service as their source. When CD is active new job runs will automatically use the latest available build.

The schedule for cron jobs can be toggled between inactive and active. If a job is inactive it will still build the latest commits (if CI is enabled), but it will not run the build.

Pausing a job will disable CI/CD and, for scheduled jobs, stop it from running on a schedule.

### Run an image once or on a schedule: Run a job on image change

You can configure a job to run automatically when the source image is changed, if the job uses version control or a Northflank build service as the source. You can set this when creating the job, and change it from the job settings page. The following options are available:

- Never: the job will not automatically run when the image changes. The job will continue to run on a schedule, or when run manually, and the image deployed will be according to the CI/CD configuration

- CD & pipeline promotion: the job will be triggered to run if a build finishes and CD is enabled, or if an image is promoted to the job [via a pipeline](release.md#create-a-pipeline-and-release-flow)

- Always: the job will run every time the image is deployed via the UI, if a build finishes and CD is enabled, or if an image is promoted via a pipeline

### Run an image once or on a schedule: Set the cron schedule and concurrency policy

For scheduled cron jobs you must set a schedule and concurrency policy to dictate when the job will run.

![Cron job settings in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/run-an-image-once-or-on-a-schedule/cron-job-settings.png)

##### Run an image once or on a schedule: Job schedule

The job schedule is a cron expression. It consists of five fields representing the time at which to execute a specified command.

```
* * * * *
| | | | |
| | | | |___ day of week (0-6) (Sunday is 0)
| | | |_____ month (1-12)
| | |_______ day of month (1-31)
| |_________ hour (0-23)
|___________ minute (0-59)
```

For simple cron expressions you have option to use the following variables: `@yearly`, `@annually`, `@monthly`, `@weekly`, `@daily` or `@hourly`.

##### Run an image once or on a schedule: Concurrency policy

Choose whether to allow this job to run while another instance of the job is running, or to replace the currently running instance.

- `Allow` will enable multiple instances of this job to run.

- `Forbid` will keep the current instance of the job running and stop a new instance from being run.

- `Replace` will terminate any currently running instance of the job and start a new one.

The concurrency policy does not apply when initiating a job run manually.

### Run an image once or on a schedule: Set the retry and time limit

##### Run an image once or on a schedule: Retry limit

You can specify the maximum number of attempts to run a job before it is marked as failed.

##### Run an image once or on a schedule: Time limit

You can specify (in seconds) the maximum amount of time for a job to run, whether it has failed or not. This will take precedence over the Retry Limit.

For example, if you set a Retry Limit of 6 and a Time Limit of 480, the job will terminate after 8 minutes regardless of how many times it attempted to run.

### Run an image once or on a schedule: Override a job configuration

You can preview and override a job's configuration when manually triggering a job run. This allows you to quickly change a job's configuration for the current run only. The configuration override section also includes a button to copy a shareable URL. You can send this URL to colleagues with access to the job, and it will open the job run modal with the configuration overrides you have set.

You can also configure job run overrides in a [job run node in a release flow](release.md#configure-a-release-flow-run-job).

You can override the following settings:

#### Run an image once or on a schedule: Deployment

Overriding the deployment depends on the job source:

- From a Northflank build service: choose the [build service and build](build.md#build-code-from-a-git-repository)

- From a Git repository: choose the build service and build

- From a container registry: choose the [external image to deploy](run.md#run-an-image-from-a-container-registry)

#### Run an image once or on a schedule: Environment variables

You can add new environment variables for the run, or override values by providing the same key as existing environment variables.

#### Run an image once or on a schedule: Advanced options

You can configure the entrypoint, set a custom command, or select a process to run for [Docker or buildpack runtime modes](../run/override-command-entrypoint.

#### Run an image once or on a schedule: Resources

You can dedicate more or less resources to a job run. For example, if your job normally runs with a minimal compute plan but you want the job to complete quickly for this run, you could use a plan with more CPU and memory.

### Run an image once or on a schedule: View job runs

You can view job runs on the runs page of a job. Each run is listed with a randomly-generated name, the date and time of when the job run was started, and the status of the run: how many runs are active, how many runs have failed, and the duration of the run.

Clicking through to a job run shows more details about the status of the run, including the time limit for the run and when the run was last updated (for example when a new container was created, or when a container exited successfully).

![A job run page in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/run-an-image-once-or-on-a-schedule/manual-job-runs.png)

You can click on a container to view [logs](observe.md#view-logs), [metrics](observe.md#view-metrics), [health checks](observe.md#configure-health-checks), and [access the shell](run.md#access-running-containers-locally) for running containers.

### Run an image once or on a schedule: Next steps

- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)

## Run as a different user

Source: https://northflank.com/docs/v1/application/run/run-as-a-different-user.md

Docker images have their own filesystem and user management system, with their own user and group IDs. You may need to run commands in a container as a different user, or build your image with permission changes to run your application successfully.

Most base images will use `root` as the default user, and any commands in the Dockerfile will run as the default user. Some images may set another user with reduced permissions as default for extra security.

### Run as a different user: Run a command as a different user

You can change the user that runs your Docker command (`CMD`) when your container deploys, either in the Dockerfile or by using Northflank's [CMD override](run.md#override-command-or-entrypoint). You may need to [invoke a shell](run.md#override-command-or-entrypoint-execute-shell-commands) depending on your image's configured entrypoint, and the user needs to exist in the built image (or must be created).

For example, the Dockerfile below creates the user `notRoot`, but the default command will still execute as `root`.

```dockerfile
FROM ubuntu:24.04
RUN useradd -m -s /bin/bash notRoot
CMD ["bin/bash", "-c", "whoami"]
```

To run the command as a different user, you can include a `USER` command in your Dockerfile:

```dockerfile
FROM ubuntu:24.04
RUN useradd -m -s /bin/bash notRoot
USER notRoot
CMD ["bin/bash", "-c", "whoami"]
```

The container will start with the user `notRoot`, and this user will be used to execute any future commands in the container.

Alternatively, you can supply a [custom entrypoint and command](run.md#override-command-or-entrypoint) which specifies the user `notRoot` to execute the command. This is useful if you cannot, or do not want to, modify the Dockerfile.

| Entrypoint | Command |
| --- | --- |
| `bin/bash -c` | `"su - notRoot -c "whoami"` |

#### Run as a different user: Execute a command in the shell as a different user

You can execute a command in a running container either via the [shell in the Northflank application](run.md#access-running-containers-locally-execute-commands-in-a-container), using the [CLI, API, or JavaScript Client](../api/execute-command.md), or [in a template](run.md#access-running-containers-locally-execute-commands-in-an-action-node).

The shell invoked for a container will be the default shell for the user, and the user will be the default for the image. You can switch user, or open another shell, before executing your commands. Some shell scripts may only work with specific shells, for example a script may work when executed with `bash` but not `sh`.

> [!note]
> You will not be able to switch from a non-root user to root. You will have to modify the Dockerfile to use root, or switch to a different user with the necessary permissions.

### Run as a different user: Change file ownership and permissions

The ownership of files in your built Docker image is determined by the commands in your Dockerfile and the permissions depend on the original source files copied during the build process.

For example, the following Dockerfile command will copy `setup.sh` from the source (the cloned repository). The command is executed by the default user `root` and the copied file is owned by the same user (`root`).

```dockerfile
FROM ubuntu:24.04
COPY /init/setup.sh /scripts/
CMD ["/bin/bash", "-c", "/scripts/setup.sh"]
```

Git only tracks whether a file is executable or not. If the source file is not created or modified to be executable, then this permission will persist into the build image. You will not be able to execute a file until it is made executable (`chmod +x`).

> [!note]
> You can change the user for subsequent commands in your Dockerfile with `USER`, however Docker will always copy files as the root user. Ownership must be changed after the files are copied.

Learn more about the [USER](https://docs.docker.com/reference/dockerfile/#user), [COPY](https://docs.docker.com/reference/dockerfile/#copy), and [ADD](https://docs.docker.com/reference/dockerfile/#copy) commands.

You can the ownership or permissions of files using the `RUN` command in your Dockerfile, as long as the current user has sufficient permissions. For example, the following commands are executed by the default user `root` to change ownership of `setup.sh` and make it executable. The default user is then set to `notRoot`, which will start the container with the `CMD`.

```dockerfile
FROM ubuntu:24.04

COPY /init/setup.sh /scripts/
RUN useradd -m -s /bin/bash notRoot

RUN chown notRoot:notRoot /scripts/setup.sh
RUN chmod +x /scripts/setup.sh

USER notRoot
CMD ["/bin/bash", "-c", "/scripts/setup.sh"]
```

#### Run as a different user: Change permissions in a running container

You can also execute commands to change file ownership and permissions in a running container, either via the [shell in the Northflank application](run.md#access-running-containers-locally-execute-commands-in-a-container), using the [CLI, API, or JavaScript Client](../api/execute-command.md), or [in a template](run.md#access-running-containers-locally-execute-commands-in-an-action-node).

#### Run as a different user: Change permissions and ownership in a shell script

You may need to make a file executable, or change the ownership of a [volume mount path](databases-and-persistence.md#add-a-persistent-volume-permissions). To achieve this you can add a shell script that runs on container startup, before executing your normal application startup command. You can also include the shell script as a [secret file](secure.md#upload-secret-files) and call it using a command override.

For example, the following changes the ownership of the directory `/path` to `notRoot` and then runs the normal startup command for the application. To execute these commands the user should be root, either from the image default user or specified in the Dockerfile.

```shell
#!/bin/bash

chown -R notRoot:notRoot /path
<application start command>
```

Alternatively you can set a [custom entrypoint and command](run.md#override-command-or-entrypoint) for the deployment.

| Entrypoint | Command |
| --- | --- |
| `bin/bash -c` | `"chown -R notRoot:notRoot /path && <application start command>"` |

### Run as a different user: Next steps

- [Override command or entrypoint: Override the default command or entrypoint instructions for your application.](run.md#override-command-or-entrypoint)
- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)

## Run containers and micro-services on Northflank

Source: https://northflank.com/docs/v1/application/run/run-containers-and-micro-services.md

You can deploy images built from your linked Git repositories or from Docker container registries on Northflank.

You can run applications, websites, and micro-services continually, with Northflank ensuring maximum uptime and availability by automatically load-balancing and ensuring your deployments are always running.

You can also run one-off or scheduled jobs to execute a task whenever you require.

- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
- [Run an image once or on a schedule: Run an image manually or on a cron schedule.](run.md#run-an-image-once-or-on-a-schedule)
- [Run from a container registry: Deploy an image from a container registry.](run.md#run-an-image-from-a-container-registry)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)
- [Save registry credentials: Save your credentials for a container registry to access private images.](run.md#save-registry-credentials)
- [Change deployment source: Deploy a different image from Northflank or a container registry.](run.md#change-deployment-source)
- [Deploy to a region: Choose the specific location for your deployments to reach your users faster and more reliably.](run.md#deploy-to-a-region)
- [Access running containers locally: Forward a deployment for local development and access it using the Northflank CLI.](run.md#access-running-containers-locally)
- [Override command or entrypoint: Override the default command or entrypoint instructions for your application.](run.md#override-command-or-entrypoint)
- [Transfer data to and from containers: Download data from, or to, ephemeral or persistent storage in your running containers.](run.md#transfer-data-to-and-from-containers)
- [Run your application as a different user: Run your Docker image as a different user, or execute commands as a different user in your container.](run.md#run-as-a-different-user-run-a-command-as-a-different-user)
- [Execute files in a container: Make files and directories in your containers executable.](run.md#run-as-a-different-user-change-file-ownership-and-permissions)

## Save registry credentials

Source: https://northflank.com/docs/v1/application/run/save-registry-credentials.md

You can save external registry credentials in your account and use them to authorise when selecting external Docker images for deployment in services or jobs. You can view and add credentials by navigating to the registries section under integrations in your account settings.

You can enable the restriction of credentials on your account to specific projects, toggle restrictions on and select the projects you want to access the credentials in.

You can enter your credentials by selecting the registry and entering your username and password, or username and personal access token/API key depending on the registry.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/registry-credentials) to add registry credentials.

![Saving registry credentials in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/save-registry-credentials/save-container-registry-credentials.png)

### Save registry credentials: Container registries

#### Save registry credentials: DockerHub (registry.hub.docker.com)

To authenticate to DockerHub simply enter your DockerHub username and password. Alternatively you can create an [access token](https://docs.docker.com/docker-hub/access-tokens/) to use in place of your password. You can do this from on the security page in your Docker account settings, the token should include `read` access permission.

#### Save registry credentials: Google Container Registry (gcr.io)

To authenticate to a Google Container Registry select your Google registry location from the drop-down list on Northflank. On Google Cloud Platform create or use a current service account with the `Storage Object Viewer` role and [create a new key](https://cloud.google.com/container-registry/docs/advanced-authentication#json-key). Download the JSON keyfile and import it to Northflank.

#### Save registry credentials: GitHub Container Registry (ghcr.io)

To [authenticate to GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) you can create a [personal access token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) on your GitHub account. You can create a personal access token with the required `read: packages` permission in developer settings, on your GitHub settings page.

#### Save registry credentials: GitLab (registry.gitlab.com)

To authenticate to GitLab enter your username and [personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Personal access tokens, with the permission `read registry`, can be created in your GitLab preferences on the access tokens page. If you are using a self-hosted GitLab instance, make sure you use your own domain for verification and image paths (for example `registry.yourdomain.com`).

### Save registry credentials: Authenticate with JSON

You can alternatively authenticate to a container registry by providing your Docker config.json, which consists of your username and password/token encoded in base 64, separated by a colon.

```json
{
  "auths": {
    "[registry authentication url]": {
      "auth": "[Your auth key (username:password in base 64)]"
    }
  }
}
```

### Save registry credentials: Next steps

- [Run from a container registry: Deploy an image from a container registry.](run.md#run-an-image-from-a-container-registry)
- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Add databases and persistent storage: Create and use databases and other types of persistent storage in your project's applications and services.](databases-and-persistence.md#stateful-workloads-on-northflank)

## Transfer data to and from containers

Source: https://northflank.com/docs/v1/application/run/transfer-data-to-and-from-containers.md

You can transfer data to and from a container's ephemeral storage, or migrate data to and from a persistent volume.

If you want to transfer on a persistent volume and your service does not support the methods below, you can temporarily detach the volume from the existing service and attach it to one that does to transfer the data.

You can compress directories or groups of files to make downloading or uploading them quicker and simpler, especially if you have a large number of files to transfer. Compressing and uncompressing archives may require increased [compute resources](scale.md#scale-cpu-and-memory).

### Transfer data to and from containers: Transfer data using Northflank

You can use the [Northflank CLI](../api/use-the-cli.md) or [JavaScript client](../api/use-the-javascript-client.md) to transfer data between your local machine and running jobs or services.

For guidance on uploading or downloading files and directories with the CLI or JavaScript client, see [this documentation](../api/copy-files.md).

### Transfer data to and from containers: Transfer data using curl or wget

You can use [curl](https://curl.se/docs/manpage.html) or [wget](https://www.gnu.org/software/wget/manual/wget.html) to download data from an external host to your containers and persistent volumes on Northflank. Similarly, you can transfer data from your containers or persistent volumes to external destinations.

You can execute a curl or wget command in a running container either via the [shell in the Northflank application](run.md#access-running-containers-locally-execute-commands-in-a-container), using the [CLI, API, or JavaScript Client](../api/execute-command.md), or [in a template](run.md#access-running-containers-locally-execute-commands-in-an-action-node).

#### Transfer data to and from containers: Download data using curl or wget

You can run a curl or wget command in your container to retrieve data from an external source:

```
curl -O https://example.com/path/data.zip
```

```
wget https://example.com/path/data.zip
```

You can also recursively download directories with wget: `wget -r http://example.com/files/`

You can upload files to S3 storage or other file-hosting services, or run a HTTP server locally to serve files from your machine (when [combined with forwarding](run.md#transfer-data-to-and-from-containers-transfer-data-securely)).

Similarly, you can serve files from your container using a HTTP server, and retrieve them using curl or wget. You can either configure your application to serve files over HTTP, or attach your volume to another service that does.

#### Transfer data to and from containers: Send data using curl or wget

You can also send data from your container using curl to an endpoint that accepts file uploads.

```
curl -X POST -F "file=@/path/data.zip" https://example.com/upload`
```

```
wget --method=POST --body-file=/path/data.zip https://example.com/upload
```

##### Transfer data to and from containers: Example simple HTTP server

You can create a quick HTTP file server simply by running `python3 -m http.server`.

To deploy this on Northflank, create a deployment service with the external image `python:latest`, expose port `8000`, and set the command override to `python3 -m http.server` to serve the entire filesystem, or set the entrypoint to `/bin/sh -c` and the command to `"cd /your/path && python3 -m http.server` to serve a specific directory.

### Transfer data to and from containers: Transfer data using rsync

You can connect to a container running an [rsync daemon](https://man7.org/linux/man-pages/man1/rsync.1.html) from your local machine to download and upload files from the container's filesystem or an attached volume.

You can create a deployment service with [an rsyncd image](https://hub.docker.com/r/alpinelinux/rsyncd) and attach the volume you want to access to it, or install and run rsyncd inside a running container using the [shell](run.md#access-running-containers-locally-execute-commands-in-a-container) if your image supports it.

You will need to have installed rsync on your local machine, as well as the [Northflank CLI](../api/use-the-cli.md) to securely forward the deployment.

#### Transfer data to and from containers: Deploy an rsyncd image

To deploy rsyncd on Northflank, create a deployment service, choose external image and set the path to `alpinelinux/rsyncd:latest`, or another rsyncd image. Add `873` as a TCP port in networking.

In the service's runtime variables, expand advanced and create two secret files, mounted to `/etc/rsyncd.conf` and `/etc/rsyncd.secrets`.

##### Transfer data to and from containers: rsyncd.conf

You can [specify a configuration](https://www.man7.org/linux/man-pages/man5/rsyncd.conf.5.html) for each path you want to make accessible via rsync, and provide rules for that configuration. In the example below, the rsync configuration `data` makes the `/data` path and its contents available to the user `username`.

```Text
[default]
path = /data
comment = Northflank volume access
read only = no
write only = no
list = yes
uid = root
gid = root
auth users = username
secrets file = /etc/rsyncd.secrets
```

##### Transfer data to and from containers: rsyncd.secrets

The secrets file contains login details for you to access the container using rsync. The file is line-based and contains one `username:password` pair per line.

```Text
username:password
```

After deploying rsyncd, attach one or more volumes that you want to access to it, with the corresponding mount paths.

#### Transfer data to and from containers: Connect to rsyncd

[Forward](../api/forwarding.md) the rsyncd service to your local machine using the Northflank CLI to make it available at `<service-name>:873`. The full rsync address for commands takes the format `<username>@<service-name>::<config_name>`, for example `northflank@rsync::default`.

You can now run rsync commands against the Northflank rsync deployment. For example:

- `rsync -avz username@rsync::default ./data` recursively downloads all files from the path specified in the configuration `default` to the local directory `data`

- `rsync -rltv ./data/ username@rsync::default` recursively uploads all files from the local directory `data` to the path specified in the configuration `default`

### Transfer data to and from containers: Transfer data securely

You can securely [forward your service](../api/forwarding.md) to your local machine. This will allow you to send and receive data without making it available on the internet. You will need to run a HTTP server locally to use wget and curl.

#### Transfer data to and from containers: Securely transfer data with wget and curl

Both wget and curl support [basic authentication and bearer tokens](network.md#create-path-based-security-policies-require-credentials) to secure transfers.

##### Transfer data to and from containers: Basic authentication

```
curl -u username:password -O https://example.com/path/data.zip
```

```
wget --user=username --password=password https://example.com/path/data.zip
```

##### Transfer data to and from containers: Bearer token

```
curl -H "Authorization: Bearer <your-token>" -O https://example.com/path/data.zip
```

```
wget --header="Authorization: Bearer <your-token>" https://example.com/path/data.zip
```

### Transfer data to and from containers: Next steps

- [Override command or entrypoint: Override the default command or entrypoint instructions for your application.](run.md#override-command-or-entrypoint)
- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
