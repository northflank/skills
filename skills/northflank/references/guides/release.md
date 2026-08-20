# Release

Generated from 15 application pages listed in `llms.txt`.

## Pages

- [CI/CD on Northflank](#cicd-on-northflank)
- [Configure workflows](#configure-workflows)
- [Manage CI/CD](#manage-cicd)
- [Manage preview blueprints](#manage-preview-blueprints)
- [Configure a release flow](#configure-a-release-flow)
- [Create a pipeline and release flow](#create-a-pipeline-and-release-flow)
- [Create and manage previews](#create-and-manage-previews)
- [Run and manage releases](#run-and-manage-releases)
- [Run migrations](#run-migrations)
- [Set up a preview environment](#set-up-a-preview-environment)
- [Run and manage workflows](#run-and-manage-workflows)
- [Run migrations](#run-migrations)
- [Set up environments](#set-up-environments)
- [Set up preview blueprints](#set-up-preview-blueprints)
- [Tag workloads and resources](#tag-workloads-and-resources)

## CI/CD on Northflank

Source: https://northflank.com/docs/v1/application/release/ci-cd-on-northflank.md

Northflank enables you to manage your application delivery from development, through testing, to production.

You can automate builds and deployments using CI/CD in individual services, or use environments and workflows to configure complex release processes covering many resources.

You can also learn more in the guide on [release for production](production-workloads.md#release-for-production).

### CI/CD on Northflank: Continuous integration and delivery

Continuous integration (CI) allows you to automatically build code when a commit is pushed to your Git repository. Continuous delivery (CD) automatically deploys new builds in any environment.

You can configure rules in services and jobs to manage your development workflows and releases.

CI/CD on Northflank can be used to set up simple but powerful release flows. You can enable CI/CD in a single combined service to automatically build and deploy from one repository. You could also use CI/CD with a build service to build development, release, and production branches and deploy to different deployment services.

- [Manage CI/CD: Configure continuous integration and continuous delivery on your Northflank services.](release.md#manage-cicd)

### CI/CD on Northflank: Release with environments

Environments represent deployment targets in your release process, such as development, staging, and production. Each environment is a separate stage where you manage builds, services, and resources. Environments keep your deployments organized and allow you to maintain clear separation between different stages of your application lifecycle.

Within each environment, you define workflows that automate your release tasks. A workflow is a series of automated steps that orchestrate building, testing, and deploying your code to that specific environment.

#### CI/CD on Northflank: Workflows

Workflows are templates for specific environments that automate release tasks, such as backing up databases, triggering builds, running jobs, and deploying services.

You can make each step in a workflow conditional so that if a step fails, the rest of the workflow will not continue. You can also quickly roll back to a previous deployment.

#### CI/CD on Northflank: Triggering workflows

Workflows can be run manually, or you can configure Git or cron triggers to start workflow runs automatically.

- [Configure a workflow: Learn how to use the visual editor or code to configure a workflow.](release.md#configure-workflows)
- [Run and manage workflows: Run and manage workflows for different environments.](release.md#run-and-manage-workflows)
- [Workflows and preview blueprints within templates: Create and manage environments with workflow and preview blueprint templates within Northflank templates.](infrastructure-as-code.md#write-a-template-include-workflows-and-preview-blueprints)

### CI/CD on Northflank: Run database migrations

You can run database migrations manually or automate the process as part of a workflow.

- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)

### CI/CD on Northflank: Ephemeral preview environments

You can define a preview blueprint to create ephemeral environments to preview Git branches or pull requests.

Preview environments can be created automatically using Git or cron triggers, and deleted in one action.

- [Set up preview blueprints: Create preview blueprints to automatically create preview environments for your branches and pull requests.](release.md#set-up-preview-blueprints)
- [Manage preview blueprints: Manage active previews, manually create test environments, and configure automatic cleanup.](release.md#manage-preview-blueprints)
- [Workflows and preview blueprints within templates: Create and manage environments with workflow and preview blueprint templates within Northflank templates.](infrastructure-as-code.md#write-a-template-include-workflows-and-preview-blueprints)

### CI/CD on Northflank: Release using Git

You can store workflows as JSON in a Git repository with bidirectional sync, so that when you commit changes to your workflow template it will update in Northflank, and vice versa.

You can also trigger a workflow using a webhook in a GitHub action.

- [GitOps on Northflank: Use templates and workflows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Use Git Actions on Northflank: Create workflows and publish GitHub Actions that interact with Northflank.](infrastructure-as-code.md#use-github-actions-with-northflank)

## Configure workflows

Source: https://northflank.com/docs/v1/application/release/configure-workflows.md

Workflows on Northflank allow you to automate your release process for each environment, from development through to production.

You can create workflows to deploy and promote builds, back up databases, run migrations, and manage infrastructure. Workflows can be automatically run using Git or cron triggers, and work alongside CI/CD for individual services and jobs.

Each workflow is built in a visual editor by connecting nodes that perform specific actions. You can also edit workflows as JSON templates.

### Configure workflows: Create a workflow

> [!note]
> There are two ways to create a workflow. Click **(+ workflow)** in an environment column to create a workflow directly in that environment. Or click the **Create workflow** button to create an unassigned workflow, which you can then drag to the desired environment.

1. Navigate to **Environments** in your project

2. Click **(+ workflow)** in an environment column, or click **Create workflow** to create an unassigned workflow

3. Enter a name for the workflow

4. Click **Add trigger** (optional) to configure Git push, Git pull request, or cron schedule triggers

5. Click **Continue**

The visual editor opens with your workflow nodes.

![Creating a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/create-workflow.png)

### Configure workflows: Configure workflow nodes

Workflows are built from nodes connected together. Each node performs a specific action and executes in sequence based on connections.

1. Select a node to configure its settings

2. Enter the configuration details for that node type

3. Click **Save node**

4. On the node, click a connection point (e.g., **Deploy build**) to add the next node

5. Configure the new node and save it

6. Repeat to build your complete workflow

7. Click **Save workflow** when finished

![Configuring a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/configure-workflow.png)

### Configure workflows: Node types

See [template nodes](infrastructure-as-code.md#template-nodes) for detailed documentation on all available node types. Common workflow nodes include:

**Build nodes:** Start build, Build on trigger

**Deployment nodes:** Deploy build, Deploy service

**Action nodes:** Run job, Run backup, Import backup, Run action

**Control nodes:** Condition, Approval, Message

**Infrastructure nodes:** Create resource, OpenTofu

### Configure workflows: Configure node settings

Each node type has specific settings. Click a node in the workflow editor to open its settings panel.

#### Configure workflows: Build nodes

**Service or repository**: The source to build from, either an existing build service or a repository directly

**Branch and commit**: Which branch or commit ref to build. Can use references like `${triggers.<name>.branch}` to build the branch that triggered the workflow

**Preview or override build configuration**: Expand to override build arguments and Docker configuration for this specific run

**Build rules**: Expand to configure commit message ignore flags, path rules and Build rule fall through handling.

**Reuse existing builds**: Whether to reuse an existing build if available

**Wait for completion**: Whether the workflow waits for the build to finish before proceeding to the next node

**Skip node execution**: Skip running this node

#### Configure workflows: Deployment nodes

**Target service or job**: The service or job to deploy to

**Wait for completion**: Whether the workflow waits for the deployment to finish before proceeding to the next node

**Skip node execution**: Skip running this node

**Timeout duration**: How long to wait before the deployment times out

#### Configure workflows: Action nodes

**Target resource**: The service, job, or addon to act on

**Action type**: The operation to perform (e.g. run job, run backup, import backup, restart service)

**Parameters**: Action-specific inputs, such as the job run arguments or backup source

**Retry settings**: Number of retries and delay between attempts if the action fails

#### Configure workflows: Condition nodes

**Condition expression**: A boolean expression that checks the state of other resources (e.g. addon or service readiness). The workflow waits until this condition evaluates to true before proceeding.

**Success and failure paths**: Connect different downstream nodes to each branch to define what happens in each case

#### Configure workflows: Approval nodes

**Approvers**: Team members who must approve before the workflow proceeds. Useful as a gate before deploying to production

**Timeout**: How long to wait for approval before the run fails

#### Configure workflows: Message nodes

Send a Slack, Discord, or webhook notification at a specific point in the workflow. Use message nodes to alert your team when a deployment to production is about to start or has completed, or once a preview environment has been provisioned.

### Configure workflows: Use references in workflows

Workflows can reference values from triggers and other nodes. This makes workflows dynamic based on how they were triggered.

For detailed information on using references in your workflows, see [template nodes](infrastructure-as-code.md#template-nodes-environment-node) and [GitOps documentation](infrastructure-as-code.md#gitops-on-northflank).

#### Configure workflows: Git trigger references

If a workflow has a Git trigger, you can use these references:

`${triggers.<name>.branch}` - Branch name

`${triggers.<name>.sha}` - Commit SHA

`${triggers.<name>.pullRequestId}` - Pull request ID

`${triggers.<name>.repoUrl}` - Repository URL

#### Configure workflows: Node references

Reference outputs from other nodes:

`${refs.<node-ref>.nfObjectId}` - Access the ID of the service built by a build node

`${refs.<node-ref>.ports.0.dns}` - Access the generated URL of a deployment or combined service

Use these references in node settings to make workflows dynamic.

### Configure workflows: Add triggers

Workflows can have multiple triggers to run automatically on different events.

#### Configure workflows: Git push trigger

1. Click the plus sign or **Add trigger**

2. Select **Git push** from the **Kind** dropdown

3. Configure:

  - **Repository**: Select your repository

  - **Branch rules**: Specify branches (e.g., `main`, `develop`, or `*` for all)

  - **Path rules** (optional): Only trigger on changes to specific files or directories

  - **Ignore rules** (optional): Skip runs for commits with specific message patterns

4. Click **Save**

The workflow runs automatically when commits are pushed to matching branches.

#### Configure workflows: Git pull request trigger

1. Click the plus sign or **Add trigger**

2. Select **Git pull request** from the **Kind** dropdown

3. Configure:

  - **Repository**: Select your repository

  - **Pull request rules**: Specify when to trigger

4. Click **Save**

The workflow runs when pull requests are opened or updated.

#### Configure workflows: Cron schedule trigger

1. Click the plus sign or **Add trigger**

2. Select **Cron schedule** from the **Kind** dropdown

3. Enter a cron expression in the **Schedule** field (times are UTC, minimum interval is 10 minutes)

4. Click **Save**

The workflow runs automatically on the configured schedule.

### Configure workflows: Configure workflow settings

Click **Settings** in the workflow editor to configure workflow behavior:

#### Configure workflows: Basic information

**Template name**: Name of the workflow

**Description**: (Optional) Describe what this workflow does. Useful when you have multiple workflows in a project to distinguish their purpose.

#### Configure workflows: GitOps

Enable GitOps to sync workflow configuration with a Git repository. Changes to the workflow definition are committed to your repo, giving you version history, code review, and the ability to roll back to a previous state.

#### Configure workflows: Concurrency policy

Controls what happens when a new workflow run is triggered while a previous run is still in progress.

**Allow**: Multiple workflow runs can execute simultaneously without restriction. Suitable for workflows that act on independent resources and have no shared state, such as deploying to separate environments.

**Queue**: New runs wait for previous runs to complete before starting. Use this when runs must not overlap, for example a release workflow that runs database migrations before deploying, where two concurrent runs could apply migrations out of order.

**Cancel previous**: New runs cancel any in-progress runs and start immediately. Use this for workflows triggered by Git pushes where only the latest commit matters, such as building and deploying a staging environment on every push to `main`.

#### Configure workflows: Cross project access

Enable **Share workflow access to other projects** to allow other projects to trigger this workflow. This is useful for central workflows, for example a shared infrastructure provisioning workflow in a platform project that individual product projects can trigger as part of their own release process.

#### Configure workflows: Use branch contents

Enable **Enable using branch contents** to provision the preview environment according to the GitOps file in the repository branch. This means if a PR modifies the preview blueprint definition, the preview will be provisioned according to the updated definition from that branch.

#### Configure workflows: Argument overrides

Define default values that can be overridden when running the workflow manually. Arguments can be referenced in nodes using `${args.<name>}`.

For example, you could define `target_env` with a default of `staging`, then reference `${args.target_env}` in deployment nodes. When triggering manually, you can override this to deploy to a different environment without changing the workflow definition.

#### Configure workflows: Teardown

Add a teardown specification to define cleanup actions when the workflow is deleted. For example, you can use teardown to delete OpenTofu resources on external providers. Note that Northflank resources provisioned as part of a preview will already be auto-deleted, and in most cases workflows won't create resources.

### Configure workflows: Save workflow

Click **Save workflow** to save your changes. The workflow is ready to run.

### Configure workflows: Next steps

- [Run and manage workflows: Run and manage workflows for different environments.](release.md#run-and-manage-workflows)
- [Set up preview blueprints: Create preview blueprints to automatically create preview environments for your branches and pull requests.](release.md#set-up-preview-blueprints)
- [Manage preview blueprints: Manage active previews, manually create test environments, and configure automatic cleanup.](release.md#manage-preview-blueprints)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)

## Manage CI/CD

Source: https://northflank.com/docs/v1/application/release/manage-ci-cd.md

You can configure continuous integration (CI) and continuous deployment (CD) for individual services and jobs. This approach works well for simple deployments from a single repository.

For complex release processes involving multiple resources, backups, migrations, or deployments across multiple environments, use [workflows in environments](release.md#configure-workflows) instead. Workflows provide better control, visibility, and automation for production releases.

Your service or job must build from a Git repository or deploy from a Northflank build service to configure CI/CD.

Continuous integration can be configured to build each commit, or you can build from specific branches or pull requests. You can also configure advanced settings to only build when specific files or directories are updated, or to skip builds with certain commit messages.

Using CI/CD with [path rules](build.md#build-code-from-a-git-repository-trigger-a-build-on-changes-to-specific-files-or-directories) and [ignore flags](build.md#build-code-from-a-git-repository-skip-ci-with-commit-messages) allows you to manage your build and deployment workflow, automatically building and deploying only where desired and retaining manual control where needed.

![Overview of a combined service with CI/CD settings in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/manage-ci-cd/combined_service.png)

### Manage CI/CD: Use continuous integration

Continuous integration can be enabled on combined services, build services, and jobs that build from a repository as a source.

You can enable and disable CI using the toggle in the header of the service or job.

> [!note] Trigger builds in templates
> You may want to disable CI if you prefer to start builds in [templates](infrastructure-as-code.md#infrastructure-as-code-on-northflank) or [release flows](https://northflank.com/docs/v1/application/release/configure-a-release-flow). The build service will then only build commits specified by a start build node when the template is run.

#### Manage CI/CD: CI on a combined service

You can enable CI on a combined service so that any new commits to the linked repository branch will be built automatically. If you also enable CD, every new commit to the branch will be automatically built and deployed.

#### Manage CI/CD: CI on a build service

You can enable CI on a build service to build any [new commits to branches or pull requests](build.md#build-code-from-a-git-repository-build-specific-branches-or-pull-requests) that the service is configured to monitor.

You can combine this build service with one or more deployment services to create an effective workflow. For example, your build service could build both your development and production branches, and a deployment service with CD enabled could automatically deploy the latest development build. Another deployment service with CD disabled could then be used to manually deploy stable production builds when you are ready to release. You can also use the build service as a source for jobs.

#### Manage CI/CD: CI on a job

If you create a job that has version control as the image source, you can configure CI and other build settings within the job. If you enable CI on a job, it will always build the latest commit to the linked branch. If you also enable CD, the job will use the latest build when a run is triggered.

### Manage CI/CD: Trigger builds with commits to specific files or directories

You can use [path rules](build.md#build-code-from-a-git-repository-trigger-a-build-on-changes-to-specific-files-or-directories) to trigger a build only when specific parts of your repository have been modified. You can either ignore directories or files containing code that you don't want to build in a specific job or service, or allow only the directories or files containing code that you want to build for a particular service or job.

Path rules can be configured from the build options page of a job or service, in advanced build settings under build type.

![Advanced build options in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/manage-ci-cd/advanced-build.png)

### Manage CI/CD: Skip builds with commit messages

You can use [commit message ignore flags](build.md#build-code-from-a-git-repository-skip-ci-with-commit-messages) to stop builds being triggered if the commit message contains a specific string.

Commit message ignore flags can be configured from the build options page of a job or service, in advanced build settings under build type.

### Manage CI/CD: Use continuous deployment

Continuous deployment can be enabled on combined services, deployment services, and jobs.

You can enable and disable CD using the toggle in the header of the service or job.

> [!note] CD override
> CD will be automatically disabled if a build is deployed manually, or via a [template](infrastructure-as-code.md#infrastructure-as-code-on-northflank) or [release flow](https://northflank.com/docs/v1/application/release/configure-a-release-flow).

#### Manage CI/CD: CD on a combined service

You can enable CD on a combined service so that it will always use the latest build from the service. If you have CI enabled, any commits that trigger a build will then be automatically deployed.

#### Manage CI/CD: CD on a deployment service

You can enable CD on a deployment service to always use the latest available image from the source. If you're using a build service as source, this will trigger a redeployment with the latest build when one is completed successfully.

If you're deploying an image from a container registry, this will always deploy the image tagged `latest` when a container is started. This means you must roll out a restart of your service to redeploy the latest container image.

#### Manage CI/CD: CD on a job

You can enable CD on a job so that it will always run using the latest available build or the container image tagged `latest`.

### Manage CI/CD: Run a job on image change

You can configure a job to run automatically when the source image is changed, if the job uses version control or a Northflank build service as the source. You can set this when creating the job, and change it from the job settings page. The following options are available:

- Never: the job will not automatically run when the image changes. The job will continue to run on a schedule, or when run manually, and the image deployed will be according to the CI/CD configuration

- CD & environment promotion: the job will be triggered to run if a build finishes and CD is enabled, or if an image is promoted to the job [via a workflow](release.md#configure-workflows)

- Always: the job will run every time the image is deployed via the UI, if a build finishes and CD is enabled, or if an image is promoted via a workflow

### Manage CI/CD: Next steps

- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Configure a release flow: Learn how to use the visual editor or code to configure a release flow.](release.md#configure-a-release-flow)

## Manage preview blueprints

Source: https://northflank.com/docs/v1/application/release/manage-preview-blueprints.md

Preview blueprints create ephemeral environments for testing pull requests and branches. Manage active previews, manually create test environments, and configure automatic cleanup.

### Manage preview blueprints: View preview environments

1. Navigate to **Environments** in your project

2. Preview environments appear in the **Previews** section

3. Each preview shows:

  - Available metadata (e.g. pull request ID, branch name)

  - Status (running, building, failed)

  - Created date

Click on any preview to view its resources and access URLs.

### Manage preview blueprints: Create a preview environment manually

You can create a preview environment without waiting for a Git trigger:

1. Navigate to **Environments**

2. Click on a preview blueprint

3. Click **Run**

4. Select a commit or branch

5. Click **Create**

This is useful for testing branches before creating pull requests or setting up demo environments.

![Running a preview blueprint in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/run-preview-blueprint.png)

### Manage preview blueprints: Access preview services

Each preview environment has unique URLs for accessing deployed services:

1. Click on a preview environment

2. View the **Services** section

3. Click on a service to see its URL

Preview URLs typically follow the pattern: `service-name-pr-123.project.northflank.app`

### Manage preview blueprints: Update a preview environment

Previews automatically update when new commits are pushed to the pull request branch or watched branch.

To manually trigger an update:

1. Click on the preview environment

2. Click **Run**

3. Select the new commit

4. Click **Create**

The preview will rebuild and redeploy with the latest code.

### Manage preview blueprints: Pause preview triggers

You can temporarily stop automatic preview creation without deleting the preview blueprint:

1. Navigate to **Environments**

2. Click on a preview blueprint

3. Click **Settings**

4. Disable triggers or remove them

5. Click **Save**

Existing preview environments will remain active, but new ones will not be created automatically.

### Manage preview blueprints: Delete a preview environment

Previews are automatically deleted when pull requests are closed or merged (if configured). To manually delete a preview:

1. Click on the preview environment

2. Click **Delete**

3. Confirm the deletion

All resources created by the preview (services, databases, volumes) are permanently deleted.

### Manage preview blueprints: Configure automatic cleanup

Set policies for automatically deleting inactive previews:

1. Open a preview blueprint

2. Click **Settings**

3. Configure cleanup policies:

  - **Delete on pull request close**: Automatically delete when PR is closed

  - **Delete on pull request merge**: Automatically delete when PR is merged

  - **Inactivity period**: Delete previews after X days of no commits

4. Click **Save**

Automatic cleanup helps manage costs and keep your project organized.

### Manage preview blueprints: Preview environment resources

Each preview environment can include:

- **Services**: Deployment services running your application code

- **Databases**: Addons like PostgreSQL, MongoDB, or Redis

- **Jobs**: Background tasks or one-time operations

- **Volumes**: Persistent storage

- **Secret groups**: Environment variables and configuration

All resources are isolated to the preview environment and deleted when the preview is deleted.

A default tag is automatically added to each preview environment. Secret groups scoped to this tag are made available only within the preview environment by default.

### Manage preview blueprints: Manage preview costs

Preview environments consume resources and incur costs. To manage costs:

- Use smaller resource plans for previews than production

- Enable automatic cleanup for closed pull requests

- Set maximum concurrent preview limits

- Delete unused previews manually

- Review preview resource usage regularly

### Manage preview blueprints: Troubleshoot preview environments

**Preview failed to create:**

Check the run logs for errors. Verify build configuration and resource availability.

**Preview URL not accessible:**

Check service port configuration, networking settings, and deployment status.

**Preview not updating on new commits:**

Verify Git trigger is configured correctly and webhook settings in your Git provider are active.

**Preview environment costs too high:**

Reduce resource plans, enable automatic cleanup, avoid running too many previews concurrently, or configure your Git triggers to watch fewer pull requests.

### Manage preview blueprints: Next steps

- [Configure a workflow: Learn how to use the visual editor or code to configure a workflow.](release.md#configure-workflows)
- [Run and manage workflows: Run and manage workflows for different environments.](release.md#run-and-manage-workflows)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)

## Configure a release flow

Source: https://northflank.com/docs/v1/application/release/pipeline/configure-a-release-flow.md

Release flows are templates that can automate your release process for a pipeline stage. Release flows consist of workflows that contain nodes to perform specific actions, such as triggering a build, backing up a database, or promoting a deployed image.

To configure a release flow you will need a pipeline with the services, jobs, and addons you want to manage added to it. You can create a release flow for each stage of your pipeline. You can only manage resources that exist in the same pipeline stage as the release flow, which you can refer to in the  stage resources view of a release flow template.

You can refer to the documentation in [create a pipeline and release flow](release.md#create-a-pipeline-and-release-flow-create-a-release-flow) to learn more about creating and configuring a release flow's settings.

Release flows can be created using the visual editor in the Northflank application, or configured as code, in the same way as [Northflank templates](https://northflank.com/docs/v1/application/release/infrastructure-as-code/create-a-template#use-the-visual-editor). Similarly, release flows are [structured with workflows](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#structure-a-template) and run in the same way as Northflank templates.

This documentation also includes examples for a simple [release flow that deploys builds](release.md#configure-a-release-flow-example-build-deployment) to deployment services, and a more complex example that performs a [database migration before promoting deployments](release.md#configure-a-release-flow-example-build-promotion-with-database-migration) to the current stage.

![The release flow visual editor in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/configure-a-release-flow/backup-migrate-promote-visual.png)

### Configure a release flow: Release flow nodes

Release flow templates have a release node specific to them with different types to deploy from a build service, from a container registry, or to promote an image from another deployment service. The remaining nodes are the same as [template nodes](https://northflank.com/docs/v1/application/release/infrastructure-as-code/template-nodes).

Some nodes have a `wait for completion` option. You can enable this so that the next steps in the workflow will only run when the node has finished and was successful. This can be useful for ensuring, for example, a job run has completed before promoting a deployment with related changes. You can also use a separate [await condition](https://northflank.com/docs/v1/application/release/infrastructure-as-code/template-nodes#condition-nodes) node to pause the workflow.

Release node specification
Error fetching template node schema

#### Configure a release flow: Deploy build

Deploys an [image from a build service](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository) to a target deployment service or job.

To configure the node, select the build service you want to deploy from. Open the build menu to select a branch or pull request. From here you can select a specific commit to deploy, or choose to always deploy the latest build. You can filter results for branches, pull requests, or commits by typing in the dropdown.

Finally, select a job or service from the pipeline stage to deploy the built image to.

When you run the release flow you can optionally change the branch, pull request, or select a specific commit to deploy instead of the configured option.

#### Configure a release flow: Promote deployment

Deploys images from the preceding stage to the stage that the release flow is in.

To configure the node select the source service or job from the previous stage which contains the deployed image you want to promote, then select the target service or job to promote the image to. Arrows will appear in the pipeline to indicate which deployments will be promoted when a release flow is run.

When the release flow is run, the current image deployed on the source will be deployed on the target. The image can either be built on Northflank, or deployed from a container registry.

#### Configure a release flow: Deploy image

Deploys an image from an [external container registry](https://northflank.com/docs/v1/application/release/run/run-an-image-from-a-container-registry) to a target deployment service or job.

To configure the node, [enter the URL](https://northflank.com/docs/v1/application/release/run/run-an-image-from-a-container-registry#image-paths) of the image you want to deploy. Northflank will try to confirm the image is accessible at the given path. If the image is private, select or create the relevant [registry credentials](https://northflank.com/docs/v1/application/release/run/save-registry-credentials).

Finally, select a job or service from the pipeline stage to deploy the built image to.

When you run the release flow you can optionally change the image to deploy (and associated credentials) instead of the configured option.

### Configure a release flow: Use Git triggers in a release flow

You can use [Git triggers](release.md#create-a-pipeline-and-release-flow-automatically-run-a-release-flow) in your release flow to build the triggering commit. You can also pass the data in to a job or services as environment variables, or use them as part of a command override or shell command.

You can select trigger values in a start build node by selecting a build service that builds from the same repository that the trigger monitors. You can then set the branch and commit using the trigger reference.

Git trigger references take the format `${refs.<git-trigger-name>.<key>}` and return the following values:

| Key | Value |
| --- | --- |
| `branch` | The name of the branch that triggered the preview environment |
| `sha` | The SHA to identify the specific commit to be built |
| `repoUrl` | The URL of the repository specified in the Git trigger |

You can also override Git trigger values [using a webhook trigger](release.md#run-and-manage-releases-run-a-release-flow-using-a-webhook).

### Configure a release flow: Enable webhook for a release flow

You can use a webhook trigger to run release flows. Enable the webhook trigger in the template settings and trigger it by making either a `GET` or `POST` request. This can be used to quickly integrate with third-party services such as GitHub Actions or your own tools.

You can [use query parameters](release.md#run-and-manage-releases-run-a-release-flow-using-a-webhook) to override Git trigger values and supply other arguments to the template.

### Configure a release flow: Create a dynamic release flow

You can use references, arguments, and functions in a release flow the same as you would in any Northflank [template](https://northflank.com/docs/v1/application/release/infrastructure-as-code/make-a-template-dynamic).

#### Configure a release flow: References

All nodes are automatically given a unique reference, and you can change this reference if desired.

You can access references in the release flow using the `refs` object, in the format `${refs.<reference-name>.<property>}`.

This can be useful if you need to access details from resources created earlier, such as the status of a build in an await condition node.

![The release flow visual editor in the Northflank application showing node configuration](https://assets.northflank.com/documentation/v1/application/release/configure-a-release-flow/edit-deploy-build-node.png)

#### Configure a release flow: Arguments

You can include arguments in your release flow, referenced in the format `${args.<argument-name>}`, replacing `<argument-name>` with your key. Arguments are stored in the [argument object at the top-level of the template](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#template-specification) as key-value pairs.

You can set argument overrides on the settings page of a release flow to pass [configuration values and secrets](release.md#create-a-pipeline-and-release-flow-provide-secrets-securely-to-a-template) securely to your release flow.

#### Configure a release flow: Functions

You can include [template functions](https://northflank.com/docs/v1/application/release/infrastructure-as-code/make-a-template-dynamic#use-northflank-functions) in your release flow, which will be evaluated when the release flow is run.

### Configure a release flow: Manually select a commit or build to release

You can add your own components to the release flow run UI to select specific branches, commits, or builds for all relevant template nodes when you run a release. This makes it possible to select a specific commit or build to deploy to multiple resources at once, instead of overriding each node individually.

Rich input components can be used to populate the values of argument overrides, and you can use these arguments to start and deploy builds. You can add these components to your release flow template, as an array of objects at the top level of the template object.

You can give each component a `title` and a `description`, which will be displayed when you run the release flow via the Northflank application.

Each component requires a `source` in the `inputs` object, which is the ID of the build service you want to select a commit or build from.

The `outputs` object maps your selection in the run modal to argument overrides. You can use these argument overrides in start build and deploy build nodes.

There are two available rich input components: `BranchCommitSelector` and `BuildSelector`, which can be added to an array called `richInputs` at the top-level of your release flow template.

![Selecting a commit using a rich input component in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/configure-a-release-flow/rich-inputs-branch-commit.png)

#### Configure a release flow: Branch commit selector

The branch commit selector rich input allows you to select a branch or a specific commit to build and deploy. You can map the `branch` and `buildSha` outputs to arguments to start builds, and then deploy the resulting build to a deployment service or job.

- kind
  string required`BranchCommitSelector`
- spec
  {object} required

Branch and commit rich input example

```json
{
  "apiVersion": "v1.2",
  "richInputs": [
    {
      "kind": "BranchCommitSelector",
      "spec": {
        "inputs": {
          "source": "build-service"
        },
        "outputs": {
          "branch": "RELEASE_BRANCH",
          "buildSha": "RELEASE_SHA"
        },
        "title": "Select branch & commit",
        "description": "Use this to set the branch and commit for all deployment and job nodes."
      }
    }
  ],
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Build",
          "ref": "start-build",
          "spec": {
            "reuseExistingBuilds": true,
            "buildRuleFallThroughHandling": "fail",
            "buildOverrides": {
              "buildArguments": {}
            },
            "id": "build-service",
            "type": "service",
            "branch": "${args.RELEASE_BRANCH}",
            "sha": "${args.RELEASE_SHA}"
          },
          "condition": "success"
        },
        {
          "kind": "Release",
          "spec": {
            "type": "build",
            "origin": {
              "branch": "${refs.start-build.branch}",
              "build": "${refs.start-build.id}"
            },
            "target": {
              "id": "deployment-service",
              "type": "service"
            }
          }
        }
      ]
    }
  }
}
```

#### Configure a release flow: Build selector

The build selector rich input allows you to select a specific build from a build service to deploy in your release flow. You can map the `branch` and `buildId` outputs to arguments to deploy builds to deployment services and jobs.

- kind
  string required`BuildSelector`
- spec
  {object} required

Build selector rich input example

```json
{
  "apiVersion": "v1.2",
  "richInputs": [
    {
      "kind": "BuildSelector",
      "spec": {
        "inputs": {
          "source": "build-service"
        },
        "outputs": {
          "branch": "DEPLOY_BRANCH",
          "buildSha": "DEPLOY_SHA",
          "buildId": "DEPLOY_BUILD_ID"
        },
        "title": "Select build",
        "description": "Use this to select a build for all deployment and job nodes."
      }
    }
  ],
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Release",
          "spec": {
            "type": "build",
            "origin": {
              "id": "build-service",
              "branch": "${args.DEPLOY_SHA}",
              "build": "${args.DEPLOY_BUILD_ID}"
            },
            "target": {
              "id": "deployment-service",
              "type": "service"
            }
          }
        }
      ]
    }
  }
}
```

### Configure a release flow: Example build deployment

This is an example of a release flow that deploys the latest build of the branch `main` from a build service to a deployment service and a job. This is executed in a parallel workflow, so both deployments roll out at the same time.

![An example of a release flow in the Northflank application to deploy builds](https://assets.northflank.com/documentation/v1/application/release/configure-a-release-flow/deploy-build-parallel.png)

Example release flow

```JSON
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "parallel",
      "steps": [
        {
          "kind": "Release",
          "spec": {
            "type": "build",
            "origin": {
              "id": "builder",
              "branch": "main",
              "build": "latest"
            },
            "target": {
              "id": "job-prod",
              "type": "job"
            }
          }
        },
        {
          "kind": "Release",
          "spec": {
            "type": "build",
            "origin": {
              "id": "builder",
              "branch": "main",
              "build": "latest"
            },
            "target": {
              "id": "deployment-prod",
              "type": "service"
            }
          }
        }
      ]
    }
  },
  "triggers": []
}
```

### Configure a release flow: Example build promotion with database migration

This is an example of a release flow that runs a database migration before promoting a deployment. The workflow is executed sequentially, as each node needs to complete successfully before the next node is executed.

The individual steps are:

1. Run backup: backs up a database and waits for this to be completed successfully

2. Promote deployment: promotes the image from the staging job to the production job

3. Run job: runs the production job and waits for it to complete successfully

4. Promote deployment: promotes the image from the staging deployment to the production deployment

![An example of a release flow in the Northflank application to promote deployments](https://assets.northflank.com/documentation/v1/application/release/configure-a-release-flow/backup-migrate-release-flow.png)

Example release flow

```JSON
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "AddonBackup",
          "spec": {
            "addonId": "postgres-prod",
            "backupType": "snapshot"
          },
          "condition": "success"
        },
        {
          "kind": "Release",
          "spec": {
            "type": "deployment",
            "origin": {
              "id": "job-staging",
              "type": "job"
            },
            "target": {
              "id": "job-prod",
              "type": "job"
            }
          },
          "condition": "running"
        },
        {
          "kind": "JobRun",
          "spec": {
            "jobId": "job-prod"
          },
          "condition": "success"
        },
        {
          "kind": "Release",
          "spec": {
            "type": "deployment",
            "origin": {
              "id": "deployment-staging",
              "type": "service"
            },
            "target": {
              "id": "deployment-prod",
              "type": "service"
            }
          }
        }
      ]
    }
  },
  "triggers": []
}
```

### Configure a release flow: Next steps

- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Run a release flow: Run a release flow and manage releases for your different environments.](release.md#run-and-manage-releases)
- [Roll back a release: Roll back a release to a previous version.](release.md#run-and-manage-releases-roll-back-a-release)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)

## Create a pipeline and release flow

Source: https://northflank.com/docs/v1/application/release/pipeline/create-a-pipeline-and-release-flow.md

Pipelines on Northflank allow you to manage your project's resources for different environments, from development through to production.

You can automate your release workflows for each pipeline stage, and define ephemeral environments to preview pull requests and branches.

You can create a release flow for each pipeline stage, to deploy and promote builds, back up databases, and run jobs. Release flows can be automatically run using Git or webhook triggers, and replaces CI/CD for individual services and jobs.

![A pipeline overview in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/create-a-pipeline-and-release-flow/pipeline-overview.png)

### Create a pipeline and release flow: Create a pipeline

To create a new pipeline either select create new from the pipelines page, or  pipeline from the create new menu.

> [!note]
> [Click here](https://app.northflank.com/s/project/create/pipeline) to create a pipeline.
Enter a name to identify and select the project resources to add to each stage. You can add resources to each stage of your pipeline in whatever configuration best represents your workflow, and add or remove resources from the pipeline after creation. Build services are not added to pipelines, but can be used in [release flows](release.md#configure-a-release-flow-release-flow-nodes) and [preview environments](release.md#set-up-a-preview-environment-build-on-trigger).

![Selecting resources to create a pipeline in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/create-a-pipeline-and-release-flow/create-pipeline.png)

> [!note]
> You can only include resources from the project that contains your pipeline. You can only add services and jobs that use a Northflank build service or an external image as the deployment source. This means combined services and jobs that build directly from a Git repository cannot be used in pipelines.

You can also create and manage a pipeline using a [pipeline node in the template editor](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#include-release-flows-and-preview-environment-templates).

### Create a pipeline and release flow: Use a pipeline

The resources in your pipeline can be used to [create a release flow](release.md#create-a-pipeline-and-release-flow-create-a-release-flow) for each stage of your pipeline, to automate your releases for different environments.

You can monitor the status of each deployment, job, and addon in your pipeline, as well as the history of your release flow runs. You can also manage any existing preview environments and their resources in your pipeline.

#### Create a pipeline and release flow: Add resources

Click the  add button at the bottom of a stage to view the resources available to add to your pipeline. You can select multiple resources and click add to put them in that stage of the pipeline.

Resources that belong to another pipeline cannot be added, and you can filter resources by name using the search function.

The pipeline stages determine what resources will be available in your release flow for that stage, for example in the production stage you can only promote an image from a deployment in the staging stage. To move a resource to another stage, remove it from its current stage and add it to the stage you want it to be in.

#### Create a pipeline and release flow: Remove resources

You can remove a resource from a pipeline by clicking the  remove button on the service, addon, or job you want to remove. This will not delete the resource from your project.

This will also remove any nodes related to this resource in your release flows, please make sure you carefully review the effect this might have on your release flows.

### Create a pipeline and release flow: Create a release flow

You can create a release flow for a stage of your pipeline by clicking  add release flow in the release header for the specific stage.

Release flows are [Northflank templates](https://northflank.com/docs/v1/application/release/infrastructure-as-code/infrastructure-as-code#create-integrations-infrastructure-and-resources-in-templates) with specific nodes and handling. You can also create and update release flows in a [pipeline node in the template editor](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#include-release-flows-and-preview-environment-templates).

You can define a release flow template using the [visual editor](https://northflank.com/docs/v1/application/release/infrastructure-as-code/create-a-template#use-the-visual-editor) to drag and drop nodes, and click on a node to edit its configuration. You can use nodes to build and deploy from a repository, promote built images from one stage to the next, backup addons, execute commands in a deployment, run migration jobs, and more.

Configure settings for a release flow by opening the  settings view in the editor.

You can run a release flow manually, or configure it to [run automatically](release.md#create-a-pipeline-and-release-flow-automatically-run-a-release-flow) via a Git trigger or webhook.

See [configure a release flow](release.md#configure-a-release-flow) to learn about release flow templates and specific nodes.

![Settings for a release flow in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/create-a-pipeline-and-release-flow/release-flow-settings.png)

### Create a pipeline and release flow: Automatically run a release flow

You can automatically run a release flow using Git triggers, or using the [webhook trigger](). You can access [values from triggers](release.md#configure-a-release-flow-create-a-dynamic-release-flow) using references.

This allows you to run your releases on merge to your relevant Git branch. For example, you could configure Git triggers in the production pipeline stage for a `production` branch, and your entire release workflow will run automatically when you push a change to your production branch, or you could include a webhook trigger with your existing tooling to run your Northflank release.

#### Create a pipeline and release flow: Configure a Git trigger

A release flow will run when a commit is pushed to a branch or pull request that matches a configured Git trigger.

Click  add trigger to create a new Git trigger. Enter a reference for your Git trigger, a string by which it can be accessed in the release flow template, and select the repository you want to use.

![Adding a Git trigger to a release flow in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/create-a-pipeline-and-release-flow/add-git-trigger.png)

You can now define [pull request and branch rules](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#build-specific-branches-or-pull-requests). Branch rules will run the template when a commit is pushed to a branch matching the given rules. Pull request rules will run the template whenever a pull request is opened for a branch matching the given rules, or a commit is pushed to a branch matching the given rules with an open pull request.

You can also add [path rules](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#trigger-a-build-on-changes-to-specific-files-or-directories) and [ignore flags](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#skip-ci-with-commit-messages) in order to only run the template on changes to specific files, or to skip runs when a certain commit message is included.

### Create a pipeline and release flow: Manage your release flow with GitOps

Northflank uses bidirectional GitOps to sync template content between Northflank and a Git repository. This allows you to maintain a single source of truth, back up your templates, and update your template on Git push.

You can create and update release flows as part of a template using the [pipeline node](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#include-release-flows-and-preview-environment-templates). You can use the full visual editor to configure the release flows for each stage of a pipeline, and refer to resources and arguments contained in the parent template.

You can then manage the parent template [using GitOps](https://northflank.com/docs/v1/application/release/infrastructure-as-code/gitops-on-northflank), and the release flow will be updated whenever the parent template is run.

#### Create a pipeline and release flow: Use GitOps to manage an individual release flow

You can enable GitOps to sync an individual release flow template with a Git repository.

You can make changes to your release flow by committing changes to it in the repository or by editing it on Northflank, and the changes will be propagated to the other platform automatically. This allows you to maintain your release flows alongside your codebase, or in a separate infrastructure repository.

Enable GitOps in the release flow settings and select the repository and branch that contains, or will contain, the release flow. Enter the path to the release flow file relative to the repository root. For example `/release-development.json` will look for a file called `release-development.json` in the repository root, while `/release/development.json` will look for a file called `development.json` in the directory `release`.

If a release flow file already exists at the path it will be loaded into the editor (this will overwrite any existing release flow saved in Northflank). If no file exists, one will be created with the specification defined in the editor.

It is not necessary, but it is recommended, to save the release flow with the format `json` so it can be recognised by IDEs and text editors.

### Create a pipeline and release flow: Configure template run concurrency

You can choose how a template will behave if it receives more than one request to run at the same time, or receives a request to run while a run is still in progress. You can set the run concurrency on the template's settings page.

- Allow (default): multiple template runs can be executed in parallel, with no restrictions

- Queue: each time a template run is triggered it will be added to a queue, and runs will be executed sequentially in order of creation

- Forbid: if a template is currently pending or running any run requests will be ignored

You may want to queue or forbid simultaneous runs to ensure that resources are not updated with conflicting configurations.

### Create a pipeline and release flow: Provide secrets securely to a release flow

Resources in your project should have secrets [set in their configuration](https://northflank.com/docs/v1/application/release/secure/inject-secrets) directly, or inherited via [secret groups](https://northflank.com/docs/v1/application/release/secure/manage-secret-groups). You can manage which secrets are inherited by resources in different environments [using tags](https://northflank.com/docs/v1/application/release/pipeline/tag-workloads-and-resources#restrict-by-tag).

You should not include any secrets, such as API keys, passwords, or other sensitive data directly in your template. To add configuration details or secret values you should include them in your template as [arguments](https://northflank.com/docs/v1/application/release/infrastructure-as-code/make-a-template-dynamic#add-arguments) and [set them as overrides in the settings](https://northflank.com/docs/v1/application/release/infrastructure-as-code/make-a-template-dynamic#supply-secrets-with-argument-overrides). This stores them securely on Northflank where they are only injected when the template is run.

### Create a pipeline and release flow: Manage release flows

Each release flow header the pipeline stages show the status of recent runs, a  run button to trigger a release flow run, a button  to open the list of release flow runs, and an edit button  to edit the release flow and its settings.

Learn more in [run and manage releases](release.md#run-and-manage-releases).

You can pause triggers for a release flow in the header of the release flow settings. While paused, Git triggers will be inactive and requests to the webhook will return the HTTP status `202`, with a message explaining the trigger is paused. Release flows can still be run manually using the UI or the [Northflank API](https://northflank.com/docs/v1/application/api/pipelines/run-release-flow) while triggers are paused.

### Create a pipeline and release flow: Delete a pipeline

You can view and delete pipelines from the pipelines page. If you delete a pipeline, it will remove your configured pipeline overview and any release flows it contains. Deleting a pipeline will not affect any of your services, all the deployments, job, and addons added to the pipeline will continue to run as individually configured.

### Create a pipeline and release flow: Next steps

- [Configure a release flow: Learn how to use the visual editor or code to configure a release flow.](release.md#configure-a-release-flow)
- [Run a release flow: Run a release flow and manage releases for your different environments.](release.md#run-and-manage-releases)
- [Roll back a release: Roll back a release to a previous version.](release.md#run-and-manage-releases-roll-back-a-release)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)
- [GitOps on Northflank: Use templates and workflows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)

## Create and manage previews

Source: https://northflank.com/docs/v1/application/release/pipeline/create-and-manage-previews.md

Northflank will automatically create new preview environments for branches that match your branch and pull request Git trigger rules.

If you have configured a webhook trigger, a new preview environment will be created when you send a request to the webhook URL.

> [!note] Updating preview environment templates
> If you update your preview environment template while there are existing environments, please note that when the preview is next triggered:

- Resources with the same ID (name) will be updated with the new values in the template
- If the new template changes values that cannot be patched the template run will fail and the existing preview environment will not be updated
- Existing resources will not be automatically deleted and if you have changed resource names in the template, the new resources will be created alongside the existing ones

All resources created by the preview environment will be tagged with the environment name. You are unable to assign or manage tags created by a preview environment, and they will be deleted when the environment is deleted.

You can see a list of preview environments created in your pipeline, with the repository, branch, and status for each environment. Click through to a preview environment to see the status of the template run and resources associated with the environment.

#### Create and manage previews: Resources

Resources for a preview environment, including services, jobs, addons, and secret groups, will be added to the list as they are created by the template. You can view the status of resources created by the preview environment, pause and resume them, and click through to manage them where required.

#### Create and manage previews: View runs

You can view a list of template runs for the preview environment, and click through to see the status and results of specific nodes in the template. A new template run for a preview environment will be triggered if a new commit is pushed to the same branch.

#### Create and manage previews: Settings

You can delete your preview environment from the settings page.

### Create and manage previews: Create a preview environment using a webhook

You can use a webhook trigger to create and update preview environments. Enable the webhook trigger in the template settings and trigger it by making either a `GET` or `POST` request.

You can include query parameters at the end of the webhook URL to pass values directly to your template as arguments.

#### Create and manage previews: Git trigger parameters

You can override the values for Git triggers configured in your preview environment using a webhook. For example, you may have configured a template to build from multiple repositories, or to build from specific directories in a single repository, and need to override the default branch and commit for each trigger.

To set the values for specific triggers, use the name of the Git trigger followed by the field name in dot notation:

| Parameter | Value |
| --- | --- |
| `<git-trigger>.branch` | The branch name |
| `<git-trigger>.sha` | The commit SHA |
| `<git-trigger>.pullRequestId` | The ID of the pull request, if triggered by PR |
| `<git-trigger>.repoUrl` | The repository URL |

For example, the following endpoint would create a preview environment and set the branch for the trigger `frontend` to `feature/example` and the branch for the trigger `backend` to `develop`: `https://webhooks.northflank.com/previews/<TOKEN>?frontend.branch=feature%2Fexample&backend.branch=develop` (the character `/` has been encoded as `%2F`).

#### Create and manage previews: Preview environment name and description

You can pass in optional query parameters to set the `name` and `description` for a preview environment. If you do not pass in `name`, the preview environment will use a generated name if it has the data required for your [selected naming convention](release.md#set-up-a-preview-environment-choose-a-naming-convention). Otherwise, it will use a random name which is returned in the response body.

Triggering a preview environment run with the name of an existing preview environment will update that environment.

#### Create and manage previews: Other values

You can also add whatever other URL query parameters you require. For example, the triggering a preview environment with the following parameters: `https://webhooks.northflank.com/previews/<TOKEN>?foo=bar` would make `${args.foo}` available in the template, resolving to the value `bar`.

You can use this to pass in secrets or configuration details for your preview environment, or set the branch and commit in build nodes that don't have any Git triggers configured.

### Create and manage previews: Create a preview environment manually

You can click  create preview in your pipeline to run your preview environment template manually.

You will be prompted to select the branches and commits to use from the repository for each Git trigger. You can also override any arguments for the template. Manually-created preview environments will be given a [random name](release.md#create-and-manage-previews-choose-a-naming-convention).

CI/CD is disabled for any manually-created environments, meaning it will not be updated when commits are pushed to the previewed branch. You can update the preview environment by creating a new preview with the same branch, which will run the preview template again.

### Create and manage previews: Pause preview environment triggers

You can pause triggers for a preview environment in the header of the preview environment settings. While paused, Git triggers will be inactive and requests to the webhook will return the HTTP status `202`, with a message explaining the trigger is paused. Preview environments can still be created manually while triggers are paused.

This will suspend all Git and webhook triggers, and preview environments will not be automatically provisioned until you enable the triggers again.

### Create and manage previews: Delete a preview environment

If the preview environment has been created by a pull request trigger, the environment will be deleted when the pull request is closed or merged. A preview environment created by a branch trigger will be deleted if the branch is deleted. You can manually delete a preview environment from its settings page.

Deleting a preview environment will remove all the resources generated by the template and remove the preview environment entirely from your pipeline. If a new commit is pushed that matches the Git trigger, a new preview environment will be created for the branch.

Preview environment tags will only be deleted when a preview environment is automatically or manually deleted.

### Create and manage previews: Next steps

- [Create and manage previews: Manage your preview environments, pause triggers, and generate previews manually.](release.md#create-and-manage-previews)
- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)
- [GitOps on Northflank: Use templates and workflows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)

## Run and manage releases

Source: https://northflank.com/docs/v1/application/release/pipeline/run-and-manage-releases.md

You can run and manage release flows from the pipeline you [created them in](release.md#create-a-pipeline-and-release-flow).

Select the pipeline that contains the release flows you want to manage from the pipelines list. You can  run a release flow for a stage, or click the options button  to view runs or edit the release flow.

### Run and manage releases: Run a release flow manually

You can run a release flow for a pipeline stage by clicking  run in the release header in the pipeline overview.

You can enter a display name and description for the release run to help you track releases, particularly useful if you need to roll back a release. If you do not enter a name for the run it will display the generated UUID, but you can edit the display name of a run afterwards.

If the release flow contains any build deployments from build services or container registries you will be able to override the configured build or image to deploy, if required.

Click run to begin the release flow run and the view of the release flow run will open, showing you the status of each workflow and node as they are executed.

![An example of a release flow run in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/run-and-manage-releases/release-run.png)

### Run and manage releases: Use Git triggers to run a release flow

You can [add Git triggers on the settings page](release.md#create-a-pipeline-and-release-flow-automatically-run-a-release-flow) of a release flow.

A trigger will run the release flow whenever a change to the specified repository is committed.

You can include:

- [branch and pull request rules](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#build-specific-branches-or-pull-requests) to only trigger on commits to specific branches or pull requests

- [path rules](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#trigger-a-build-on-changes-to-specific-files-or-directories) to only trigger on changes to specific directories or files in a repository, or to ignore changes to specific directories or files

- [commit message ignore flags](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#skip-ci-with-commit-messages) to skip runs for commits with messages that contain certain strings

You can [use references to obtain the values of Git triggers](release.md#configure-a-release-flow-use-git-triggers-in-a-release-flow) in your template.

### Run and manage releases: Run a release flow using a webhook

You can trigger a release flow run by making a `GET` or `POST` request to a release flow's [webhook endpoint](release.md#configure-a-release-flow-enable-webhook-for-a-release-flow).

You can include query parameters at the end of the webhook URL to pass values directly to your template as arguments.

#### Run and manage releases: Git trigger parameters

You can override the values for Git triggers configured in your release flow using a webhook. For example, you may have configured a template to build from multiple repositories, or to build from specific directories in a single repository, and need to override the default branch and commit for each trigger.

To set the values for specific triggers, use the name of the Git trigger followed by the field name in dot notation:

| Parameter | Value |
| --- | --- |
| `<git-trigger>.branch` | The branch name |
| `<git-trigger>.sha` | The commit SHA |
| `<git-trigger>.pullRequestId` | The ID of the pull request |
| `<git-trigger>.repoUrl` | The repository URL |

For example, the following endpoint would run a release and set the branch for the Git trigger `frontend` to `feature` and the branch for the trigger `backend` to `develop`:

`https://webhooks.northflank.com/release-flows/<TOKEN>?frontend%2Ebranch=feature&backend%2Ebranch=develop`

Note the characters `/` and `.` have been encoded as `%2F` and `%2E` respectively.

#### Run and manage releases: Release flow name and description

You can pass in optional values to set the `name` and `description` for a release, otherwise the release flow will be given a random identifier as the name and no description.

#### Run and manage releases: Other values

You can also add whatever other URL query parameters you require. For example, the triggering a release flow with the following parameters: `https://webhooks.northflank.com/release-flows/<TOKEN>?foo=bar` would make `${args.foo}` available in the template, resolving to the value `bar`.

You can use this to pass in secrets or configuration details for your release, or set the branch and commit in build nodes that don't have any Git triggers configured.

### Run and manage releases: View runs

The state of the current or most recent release is indicated in the release header for each pipeline stage. This can be clicked on to view the currently running release, or the list of previous runs.

#### Run and manage releases: Release flow run statuses

Pending: the release flow is scheduled to run
Running: the release flow is currently running
Success: all of the nodes within the release flow completed successfully
Failed: some or all of the nodes within the release flow failed to complete successfully

#### Run and manage releases: Release flow runs

Click the options button  and select  view release flow runs.

![A list of release flow runs and rollbacks in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/run-and-manage-releases/release-rollback.png)

This displays a list of previous and current release flow runs and their status. You can also see when the release flow was run, when it was completed, and whether it was a release or rollback.

Click on any run in the list to view the status of individual nodes. You can click on an individual node to view its code, as well as the `response` object which contains the response from the Northflank API and the `retries` object, which contains information about any attempted retries.

#### Run and manage releases: Node statuses

Pending: the node or workflow will run when previous steps are executed successfully
Running: the node or workflow is currently being executed
Waiting: the node is waiting for an action to be completed, will eventually timeout unless it receives a successful response
Retrying: the node has failed on previous runs, but is being executed again (up to 3 attempts)
Success: the node or workflow has completed successfully
Failed: the node or workflow has failed to execute, or exceeded 3 retries

### Run and manage releases: Roll back a release

You can roll back to a specific release by opening it from the [list of past release flow runs](release.md#run-and-manage-releases-view-runs).

Click  roll back to this release to return your pipeline stage to the state it was in after the selected release flow run.

Deployments to services, builds, etc, will be reverted to those deployed or promoted in the selected release flow run. This will not undo any changes such as a [database migration](https://northflank.com/docs/v1/application/release/pipeline/handle-runtime-migrations), which you will need to restore manually.

You can also choose to roll back release flow configuration, which will restore your release flow configuration to the state it was in for the selected run.

Select view rollbacks to see a list of rollbacks to the selected release.

### Run and manage releases: Next steps

- [GitOps on Northflank: Use templates and workflows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Manage CI/CD: Configure continuous integration and continuous delivery on your Northflank services.](release.md#manage-cicd)
- [Expose a deployment's port: Configure ports and security for your deployments.](network.md#configure-ports)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)

## Run migrations

Source: https://northflank.com/docs/v1/application/release/pipeline/run-migrations.md

When you make changes to your database schema you may need to update your application and change your production database simultaneously.

You can handle database schema migrations on Northflank in various ways:

- By configuring a release flow, which automatically runs a migration and then promotes the deployment only when the migration is successful (recommended)

- Using a job triggered by CI

- Restarting your deployment with command overrides

- Executing commands in a container's shell

We recommend using release flows to automate your migration process, especially for production deployments, as this makes the process easy and ensures the migration has run before deploying your updated application.

To release a new version of your application with a migration it is recommended you follow the workflow:

1. Back up your database, in case you need to restore it

2. Run your migration

3. If the migration is successful, deploy the new release to the deployment service

If your updated application is deployed before the migration has completed it may crash or not function as expected, and you may need to redeploy it.

### Run migrations: Migrate using a release flow

You can handle a migration with a release flow by [creating and populating a pipeline](release.md#create-a-pipeline-and-release-flow) with your relevant deployments and database addons.

You can then [configure a release flow](release.md#configure-a-release-flow) to automate the various steps of your release workflow.

You could create, for example, a sequential workflow that backs up the database, executes your migration, and then promotes the deployment. The migration could be executed by using a job node to run a job with your migration code, or by using an action node to execute a command in a running container.

![An example release flow to run a migration in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/run-migrations/release-flow-migration.png)

### Run migrations: Migrate using a job triggered by CI

You can run a migration automatically by configuring a job to run whenever a new build is completed.

You can:

- build directly from the same repository and branch as the deployment that requires migration, with CI and CD enabled on the job

- deploy an image from a [build service](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository) that also builds the image for your deployment service, with CD enabled

Create a new manual job with the source for your migration code, either from a repository or a build service. Enable `run on image change` on your job, select `CD & pipeline promotion` or `always`, depending on your desired workflow.

Enter any necessary configuration details to run your migration, for example a [command override](https://northflank.com/docs/v1/application/release/run/override-command-entrypoint) if your migration code needs to be called with a command other than the default.

Your job will now execute when your latest commit to the repository is built, so your migration should occur at the same time as your new deployment. You can check the [logs](https://northflank.com/docs/v1/application/release/observe/view-logs) for the job run to ensure it has executed successfully.

![Configuration settings for a job in the Northflank application to run a migration when a new build is available](https://assets.northflank.com/documentation/v1/application/release/run-migrations/ci-job-migrate.png)

### Run migrations: Migrate using command override

You can run a migration using [command override](https://northflank.com/docs/v1/application/release/run/override-command-entrypoint#override-command) to execute the migration code when deploying your latest commit. This allows you to chain commands to run a migration and then start your application whenever it is redeployed.

Your deployment will begin redeploying as soon as you save the custom command.

#### Run migrations: Enter command manually

```shell
## Run migration, then start the server
bin/sh -c "node migrate/migration-code.js; node built/server.js"

## Run migration, then start the server if it is successful (migration process returns exit code 0)
bin/sh -c "node migrate/migration-code.js && node built/server.js"
```

#### Run migrations: Use a script or process

If you have added a script containing your migration command, for example in `package.json` for node-based applications or `Pipfile` for Python applications using Pipenv, you can include this in the command override. If you are building your application with buildpacks you can [add a process to your Procfile](https://northflank.com/docs/v1/application/release/run/override-command-entrypoint#buildpack-processes) and select `custom process` in the runtime mode.

```shell
yarn migrate-and-run
```

![An example command override in the Northflank application for a service to run a migration for Rails in a deployment service](https://assets.northflank.com/documentation/v1/application/release/run-migrations/cmd-override-migrate.png)

### Run migrations: Migrate by executing a shell command

You can manually [execute commands](https://northflank.com/docs/v1/application/release/run/access-running-containers-locally#execute-commands-in-a-container) in a running workload by accessing the shell from the Northflank application, or by using the [Northflank CLI or JS client](https://northflank.com/docs/v1/application/api/execute-command).

Navigate to your deployment and ensure the commit with your migration is deployed. Open a shell for a running container and enter the command to run your migration.

![An example command in a container shell in the Northflank application for a service to run a migration for Django in a deployment service](https://assets.northflank.com/documentation/v1/application/release/run-migrations/shell-migrate.png)

### Run migrations: Common migration commands

You can write your own migrations and run them either embedded in your application, or as separate processes using command override or via a container shell.

#### Run migrations: Node

You can run migrations on Node using tools like [Knex](https://knexjs.org/guide/migrations.html), [Prisma](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production), [db-migrate](https://db-migrate.readthedocs.io/en/latest/), and [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/).

```shell
## Knex
knex migrate:latest

## Prisma (in production)
npx prisma migrate deploy

## db-migrate
db-migrate up

## Sequelize
npx sequelize-cli db:migrate
```

#### Run migrations: Ruby on Rails

You can use the following commands to run a migration, either as a command in a running container, as a command override to start a deployment or job, or as a process (for example in a Procfile):

```shell
bin/rails db:migrate
## or
bundle exec rails db:migrate
```

While `bin/rails` will work in both running deployments and as a runtime command or command override, `bundle exec rails` may be more reliable as a command for starting jobs. You can specify the migration to run as a command argument (`VERSION=<version-number>`), or as an environment variable with the key `VERSION`.

[Learn more about creating and running migrations in Rails](https://guides.rubyonrails.org/active_record_migrations.html).

#### Run migrations: Flask

You can run migrations using Flask extensions such as [Flask-Alembic](https://flask-alembic.readthedocs.io/) or [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/).

Migrations can be run for these extensions using:

```shell
## flask-alembic
alembic upgrade head

## flask-migrate
flask db upgrade
```

#### Run migrations: Django

Django has built-in support for [creating and running migrations.](https://docs.djangoproject.com/en/4.1/topics/migrations/)

```shell
python manage.py migrate
```

#### Run migrations: Laravel

You can run [migrations in Laravel](https://laravel.com/docs/11.x/migrations) using artisan:

```shell
php artisan migrate
```

#### Run migrations: Rust

You can run migrations in Rust via the command line with Crates for toolkits such as [SQLx](https://crates.io/crates/sqlx-cli), [Refinery](https://crates.io/crates/refinery_cli), and [Diesel](https://crates.io/crates/diesel_cli).

```shell
## sqlx
sqlx migrate run

## refinery
refinery migrate -e ${DB_URI} -p ./sql_migrations

## diesel
diesel migration run
```

### Run migrations: Learn more

- [Configure a release flow: Learn how to use the visual editor or code to configure a release flow.](release.md#configure-a-release-flow)
- [Run an image once or on a schedule: Run an image manually or on a cron schedule.](run.md#run-an-image-once-or-on-a-schedule)
- [Override command or entrypoint: Override the default command or entrypoint instructions for your application.](run.md#override-command-or-entrypoint)
- [Execute commands in your workloads: Access the shell for your running workloads or send commands to execute using the UI, CLI, API, or JavaScript client.](../api/execute-command.md)

## Set up a preview environment

Source: https://northflank.com/docs/v1/application/release/pipeline/set-up-a-preview-environment.md

You can preview your changes on your Git branches and pull requests with ephemeral environments, configured in your [pipelines](release.md#create-a-pipeline-and-release-flow).

Preview environments can automatically build your latest changes and deploy them, either in an entirely self-contained environment, or one that shares resources with your existing development environment.

A new preview environment will be created automatically when you push a commit to a branch or open a pull request that matches your Git triggers. If the branch already has a preview environment, the existing preview environment will be updated. You can also use a webhook to create a new preview environment, or create one manually.

![Creating a new preview environment template using the visual editor in the Northflank application.](https://assets.northflank.com/documentation/v1/application/release/create-a-preview-environment/create-preview-template-form.png)

Preview environments are defined using [Northflank templates](https://northflank.com/docs/v1/application/release/infrastructure-as-code/infrastructure-as-code) to provision resources and to build and deploy your commits. They use existing [build services](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository) from your project to build the branch or PR for preview.

You can use trigger references, node references, and arguments to programmatically provision resources for your preview environment, and resources created by the preview environment are tagged for easy identification and teardown.

#### Set up a preview environment: Preview environment scope

You can define previews as entirely separate environments from your existing project resources, or share existing configuration values and resources from your project.

To provision preview environments faster and with less resource consumption you could share an existing development database and any services in your project that aren't under development. Alternatively, to completely isolate your existing environments you could replicate your project in its entirety, fork your development database and provision a new addon, and create new secret groups and configuration details for it.

Learn more in [inject secrets securely and share environment resources](release.md#set-up-a-preview-environment-inject-secrets-securely-and-share-environment-resources).

### Set up a preview environment: Create a preview environment template

To create a preview environment, open a new or existing pipeline in your project and click the configure button  add preview template. When you create a new preview environment template it will guide you through selecting a naming convention and a Git trigger, and automatically create a [build on trigger](release.md#set-up-a-preview-environment-build-on-trigger) node in your template.

You can also create and manage a preview environment using a [pipeline node in the template editor](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#include-release-flows-and-preview-environment-templates).

> [!note]
> [Click here](https://app.northflank.com/s/project/v2-pipelines) to select a pipeline and create a preview environment in it.
You can edit an existing preview environment configuration with the  settings button in a pipeline, or run a template that updates the preview environment template.

### Set up a preview environment: Choose a naming convention

When you create a new preview environment you will be prompted to choose a naming convention. You can change the naming convention in the preview environment template settings.

The naming convention for a preview environment will determine the name of the preview environment and resources within it, to distinguish the preview environment from your permanent project resources.

| Convention | Description |
| --- | --- |
| Pull request ID | Uses the ID of the pull request that triggered the preview environment, for example `pr-1234` |
| Branch name | Uses the name of the branch that the preview environment is based on, for example `feature-new-ui`. Branch names will be slugified, removing any slashes and other non-alphanumeric characters |
| Timestamp | Uses the current date and time in the format `yy-mm-dd-hhmm`, for example `24-01-31-1301` |
| Random words | Uses the Northflank name generator to provide two random words, for example `general-question` |

You can then choose whether the generated portion of the name will be attached to the start (prefix) or the end (suffix) of the names for your resources.

The name of a preview environment is available within the preview environment template as the argument `name`, accessible in the format `${args.name}`.

Any names you assign to resources in the preview environment template (using the visual editor) will automatically have the naming convention applied when the template is run.

| Naming convention | Preview environment name | Resource name | Resource name template value | Resulting name |
| --- | --- | --- | --- | --- |
| Pull request ID (suffix) | `pr-439` | `database` | `database-${args.name}` | `database-pr-439` |

If a run is triggered by an event that does not match your selected convention the preview will use a randomly-generated name instead.

> [!note]
> Resource names are limited to 39 characters, you must ensure your naming convention combined with your resource names do not exceed this limit.

### Set up a preview environment: Add a Git trigger

You can add Git triggers that will create a new preview environment when a commit is pushed to a branch or pull request that matches the trigger. If a preview environment already exists for the branch or pull request, the template will re-run to build and deploy the new commit and update the environment's resources.

You will be prompted to add one or more Git triggers when you create your preview environment template. You can also add  or remove  Git triggers in the visual editor, and click on an existing trigger to edit it.

To configure a Git trigger, select the repository you want to trigger preview environments for. The trigger will be given a reference based on the repository name to access it in the template.

You can choose to create new preview environments based on all pull requests, which will trigger when a new PR is opened or a commit is pushed to a branch with an open PR. You can also trigger on all branches, which will create a preview environment for any branch in your repository when a commit is pushed to it. Preview environments will be created for draft pull requests, unless you choose to ignore them.

The values from the triggers can be used in your template to build and deploy the desired commit using [build on trigger nodes](release.md#set-up-a-preview-environment-build-on-trigger). Northflank will automatically add build on trigger nodes for each trigger you add when you create a new preview environment.

#### Set up a preview environment: Custom rules

You can define custom [pull request and branch rules](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#build-specific-branches-or-pull-requests) instead of creating a new preview environment for all branches or pull requests. Branch rules will run the template when a commit is pushed to a branch matching the given rules. Pull request rules will run the template whenever a pull request is opened for a branch matching the given rules, or a commit is pushed to a branch matching the given rules with an open pull request.

You can also add [path rules](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#trigger-a-build-on-changes-to-specific-files-or-directories) and [ignore flags](https://northflank.com/docs/v1/application/release/build/build-code-from-a-git-repository#skip-ci-with-commit-messages) to only create a preview when changes are made to specific files, or to skip runs when a certain commit message is included.

#### Set up a preview environment: Reference triggers in your template

Git trigger references take the format `${refs.<git-trigger-name>.<key>}` and can return the following values:

| Key | Value |
| --- | --- |
| `branch` | The name of the branch |
| `sha` | The SHA of the specific commit |
| `pullRequestId` | The ID of the pull request, if triggered by PR |
| `repoUrl` | The repository URL |

You can also override Git trigger values [using a webhook trigger](release.md#create-and-manage-previews-create-a-preview-environment-using-a-webhook).

### Set up a preview environment: Build on trigger

The build on trigger node uses an existing build service to build a commit when it is triggered by the selected Git trigger. You can add multiple build on trigger nodes to handle multiple repositories. For most use cases the repository for the build service and the repository for the trigger should be the same.

The node will use the branch and commit passed by the trigger. You can specify a default branch and commit to use if your template has multiple triggers and build on trigger nodes, or for [manually created previews](release.md#create-and-manage-previews-create-a-preview-environment-manually) or [webhook triggers](release.md#create-and-manage-previews-create-a-preview-environment-using-a-webhook) with no `branch` or `sha` arguments provided. You can also select the branch and commit for each node when manually creating a new preview environment.

![Editing a build on trigger node in a preview environment template using the visual editor in the Northflank application.](https://assets.northflank.com/documentation/v1/application/release/create-a-preview-environment/build-on-trigger-node.png)

After adding a build on trigger node you can use the  deploy to service or  deploy to job to create a deployment service or job that uses the build from the build on trigger node.

> [!note]
> The build on trigger node will not override the repository of the chosen build service. The build service will attempt to build the branch specified by the provided trigger, if it does not exist on the build service repository the build will fail.

The node has the following configurable settings:

| Option | Description |
| --- | --- |
| Build service (required) | The build service to use to build the image |
| Trigger (required) | A Git trigger specified in the preview environment settings |
| Reference | A reference to refer to the node and its outputs later in the template, generated automatically from the repository name |
| Default branch (advanced) | Select a Git repository branch to build from by default if the template is run is caused by a different trigger |
| Default commit (advanced) | Select a Git commit to build by default, if the template is run is caused by a different trigger. If left blank, the latest commit to the branch will be built |
| Build configuration (advanced) | Preview and override build arguments to be used |
| Reuse existing builds | Use an existing build for the commit if one is available, otherwise a new build will be triggered |
| Wait for completion | If selected, the next node or workflow will not run until the build has completed |
| Skip node execution | Use references, functions, or arguments that resolve to a boolean to conditionally [skip the node](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#control-node-execution) |

Build on trigger node specification and example
Error fetching template node schemaAn example of a build on trigger node specification, which obtains the `branch` and `sha` to build from a trigger called `application`. It will use the `main` branch by default, it will use an existing build of the commit if one is available, and will wait until the build has completed before allowing the template to progress. It does not pass any build overrides, so the build service will use the default configuration.

```JSON
{
  "kind": "BuildSource",
  "ref": "build",
  "spec": {
    "type": "service",
    "id": "<build service>",
    "branch": "${refs.application.branch}",
    "sha": "${refs.application.sha}",
    "defaults": {
      "branch": "main"
    },
    "reuseExistingBuilds": true,
    "buildOverrides": {
      "buildArguments": {}
    }
  },
  "condition": "success"
}
```

### Set up a preview environment: Configure a preview environment template

Your preview environment should have [one or more triggers](release.md#set-up-a-preview-environment-add-a-git-trigger), with one or more corresponding [build on trigger nodes](release.md#set-up-a-preview-environment-build-on-trigger). Alternatively, you can use a [webhook trigger](release.md#create-and-manage-previews-create-a-preview-environment-using-a-webhook) or create the environment [manually](release.md#create-and-manage-previews-create-a-preview-environment-manually), passing in the required `branch` and `sha` values as arguments.

You can then deploy the new builds from the build on trigger nodes in deployment service nodes, or using job nodes.

You can add nodes for the other resources required in your environment, such as addons, secret groups. You can base these on existing resources in your project by [copying their specification](https://northflank.com/docs/v1/application/release/infrastructure-as-code/create-a-template#create-from-an-existing-project-or-resource) and pasting the code into a new node.

Depending on your requirements you may want to duplicate your entire development environment, including databases, services, and jobs, or deploy some resources for the preview environment and [share databases](release.md#set-up-a-preview-environment-inject-secrets-securely-and-share-environment-resources) and jobs with your permanent environment.

When you saved your preview environment template Northflank will create a preview environment for each branch that matches your Git triggers when they receive a new commit.

You can choose how a template will behave if it receives more than one request to run at the same time, or receives a request to run while a run is still in progress. You can set the run concurrency on the template's settings page.

- Allow (default): multiple template runs can be executed in parallel, with no restrictions

- Queue: each time a template run is triggered it will be added to a queue, and runs will be executed sequentially in order of creation

- Forbid: if a template is currently pending or running any run requests will be ignored

You may want to queue or forbid simultaneous runs to ensure that resources are not updated with conflicting configurations.

### Set up a preview environment: Manage your preview environment template with GitOps

You can create and update preview environment templates as part of a template using the [pipeline node](https://northflank.com/docs/v1/application/release/infrastructure-as-code/write-a-template#include-release-flows-and-preview-environment-templates). You can use the visual editor to configure the preview environment template for the pipeline, and refer to resources and arguments contained in the parent template.

You can then manage the parent template [using GitOps](https://northflank.com/docs/v1/application/release/infrastructure-as-code/gitops-on-northflank), and the preview environment template will be updated whenever the parent template is run.

#### Set up a preview environment: Use GitOps to manage a preview environment template

You can enable GitOps to sync the preview environment template with a Git repository. You can make changes to your preview environment template by committing changes to it in the repository or by editing it on Northflank, and the changes will be propagated to Northflank or Git respectively. This allows you to maintain your preview environment templates alongside your codebase, or in a separate infrastructure repository.

Enable GitOps and select the repository and branch that contains, or will contain, the preview environment template. Enter the path to the preview environment template file relative to the repository root. For example `/release-development.json` will look for a file called `release-development.json` in the repository root, while `/release/development.json` will look for a file called `development.json` in the directory `release`.

If a preview environment template already exists at the path, it will be loaded into the editor. If no template exists, one will be created with the specification defined in the editor.

It is not necessary, but it is recommended, to save the preview environment template with the format `json` so it can be recognised by IDEs and text editors.

### Set up a preview environment: Inject secrets securely and share environment resources

You can provide secrets to preview environment resources by creating a [secret group](https://northflank.com/docs/v1/application/release/secure/manage-secret-groups) in the template. It will be automatically [restricted](https://northflank.com/docs/v1/application/release/secure/manage-secret-groups#restrict-secrets) by the preview environment's [tag](https://northflank.com/docs/v1/application/release/release/tag-workloads-and-resources) so that only resources in the environment inherit variables from it.

You should not include any secrets, such as API keys, passwords, or other sensitive data directly in your template. To add configuration details or secret values you should include them as [arguments](https://northflank.com/docs/v1/application/release/infrastructure-as-code/make-a-template-dynamic#add-arguments) and [set them as overrides in the settings](https://northflank.com/docs/v1/application/release/infrastructure-as-code/make-a-template-dynamic#supply-secrets-with-argument-overrides). This stores them securely on Northflank, and they are only injected when the template is run.

![Adding secrets to a group via arguments and functions in a preview environment template in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/create-a-preview-environment/preview-arguments.png)

#### Set up a preview environment: Share secrets

You can share secrets from a development or staging environment with your preview environment by using [secret groups](https://northflank.com/docs/v1/application/release/secure/manage-secret-groups) that are restricted by [tag](https://northflank.com/docs/v1/application/release/release/tag-workloads-and-resources). Add the relevant tag to preview environment resources so that they can also inherit secrets from the restricted group.

You can create a new secret group in your preview environment and link it to an existing addon to share connection details. The new secret group will be restricted to resources tagged with the preview environment ID by default.

Preview environments will also inherit from any [unrestricted](https://northflank.com/docs/v1/application/release/secure/manage-secret-groups#restrict-secrets) secret groups in your project.

#### Set up a preview environment: Share resources

You can use existing permanent resources from your project in your preview environments, such as build services, databases, and jobs.

For example, build on trigger nodes use existing build services, you can run a [job with overrides](https://northflank.com/docs/v1/application/release/run/run-an-image-once-or-on-a-schedule#override-a-job-configuration), or execute a command in a running service.

You can provide the connection details for an existing database via an existing secret group, so that your preview environment can use the database in your development environment, for example. Alternatively, create a new secret group in your template and link the existing addon. The secret group will be restricted to resources tagged with the preview environment ID by default.

You can back up and create a fork of an existing database, so that the original database in your permanent environment is unaffected by any changes (for example migrations) in the preview branch. You can use `latest` to attempt to use the most recent backup, but if no backup exists the preview environment creation will fail. The backup must be for the same major version.

### Set up a preview environment: Generate dynamic domains for preview environments

You can generate dynamic subdomains and subdomain paths to assign to deployments in preview environments. Subdomains and subdomain paths created in the template will be deleted when the preview environment is deleted or expires.

You can include template [arguments, references, and functions](https://northflank.com/docs/v1/application/release/infrastructure-as-code/make-a-template-dynamic), such as the [preview environment name](release.md#set-up-a-preview-environment-choose-a-naming-convention), when creating your subdomain or subdomain paths.

You can create a new subdomain and paths for the new subdomain by using the reference to the subdomain node in the subdomain path node.

#### Set up a preview environment: Generate a subdomain

You can configure a domain to use [wildcard redirect routing and certificate generation](https://northflank.com/docs/v1/application/release/domains/wildcard-domains-and-certificates) to dynamically create subdomains in preview environment templates. This approach does not require certificates to be generated, and will not impact certificate generation rate limits.

If you need to generate dynamic domains in multiple regions you will need to add a wildcard domain for each region, for example `us-east.previews.acme.com`.

Add a subdomain node to your template and select the wildcard domain to use. The name will be the new subdomain created for the domain.

For example, creating a subdomain and selecting `previews.acme.com` as the domain and using the reference `${args.name}` for the name will result in a new subdomain of `<preview-name>.previews.acme.com` (where the preview name is the name of the preview environment). Assigning the subdomain directly to a port will use the root path.

Error fetching template node schema

#### Set up a preview environment: Generate a subdomain path

You can use [path-based routing](https://northflank.com/docs/v1/application/release/domains/use-path-based-routing) to create or update a path for an existing subdomain, or select a reference to a subdomain node in the preview template to use a subdomain created by the template.

For example, creating a subdomain and selecting `previews.acme.com` as the domain and entering `${args.API_PATH}` for the URI will result in a new path of `previews.acme.com/<API_PATH>` (provided the `API_PATH` argument is supplied to the preview environment template).

Error fetching template node schema

#### Set up a preview environment: Assign a dynamic subdomain or subdomain path to a port

You can select a subdomain or subdomain path in the port configuration options of a deployment or combined service node. After you [add a port](https://northflank.com/docs/v1/application/release/network/configure-ports) to the service, expand custom domains & security rules. Add custom domain, and select the reference to the subdomain or subdomain path node you wish to assign to the port.

Example template
This example template shows the creation of a new subdomain (for the domain `preview.example.com`), the creation of a path for that subdomain, and assigns the subdomain path to a deployment service's port.

```json
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Subdomain",
          "spec": {
            "name": "${args.name}",
            "domain": "preview.example.com"
          },
          "ref": "previewexamplecom"
        },
        {
          "kind": "SubdomainPath",
          "spec": {
            "subdomain": "${refs.previewexamplecom.id}",
            "uri": "/${args.API_PATH}",
            "mode": "prefix"
          },
          "ref": "subdomainpath"
        },
        {
          "kind": "DeploymentService",
          "spec": {
            "deployment": {
              "instances": 1,
              "storage": {
                "ephemeralStorage": {
                  "storageSize": 1024
                },
                "shmSize": 64
              },
              "docker": {
                "configType": "default"
              },
              "external": {
                "imagePath": "nginx:latest"
              }
            },
            "name": "nginx-${args.name}",
            "tags": [
              "${args.previewId}"
            ],
            "runtimeEnvironment": {},
            "runtimeFiles": {},
            "billing": {
              "deploymentPlan": "nf-compute-20"
            },
            "ports": [
              {
                "internalPort": 80,
                "protocol": "HTTP",
                "public": true,
                "name": "web",
                "domains": [
                  "${refs.subdomainpath.name}"
                ],
                "security": {
                  "policies": [],
                  "credentials": []
                },
                "disableNfDomain": true
              }
            ]
          },
          "ref": "nginx"
        }
      ]
    }
  }
}
```

![Selecting a dynamic subdomain to assign to a port in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/create-a-preview-environment/dynamic-subdomain-path.png)

### Set up a preview environment: Set preview environment duration and creation times

You can configure a preview environment to be torn down after a certain amount of time, and set preview environments to only be created automatically during certain hours. This allows you to limit preview environment creation and existence to your working hours to reduce spend on resources. Both of these options are configurable in a preview environment template's settings.

#### Set up a preview environment: Preview environment duration

Set the hours and minutes for a preview environment's resources to persist before the environment is torn down. You can allow this duration to be reset if the environment is updated. For example, if a new commit is pushed to the branch of the preview environment the duration timer will start again.

#### Set up a preview environment: Active hours

Configure the days and hours during which preview environments should be created by Git triggers. Outside of these hours you can still create preview environments manually, or using a webhook trigger, but committing to a branch or opening a pull request will not create or update a preview environment.

You can create a schedule with start and end times for each selected day, or select a start time for one day and an end time on another day to enable previews across multiple days. For example, you could create a schedule that's active from 09:00 to 18:00 each week day, or from 09:00 on Monday through to 18:00 Friday to enable previews for the whole work week.

This feature is only available for [projects deployed to your own cloud account](https://northflank.com/docs/v1/application/release/bring-your-own-cloud/use-other-cloud-providers-with-northflank).

![Configuring a preview environment's lifetime and active hours in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/create-a-preview-environment/preview-duration-and-active-hours.png)

### Set up a preview environment: Example preview environment template

This example preview environment template has two Git triggers configured to build on any pull request to the selected repositories, configured in the `triggers` array.

The template starts with a parallel workflow containing two build on trigger nodes and a backup node, which triggers a snapshot of an existing addon (`postgres-demo`).

After the backup has completed a new addon is deployed as a fork of the existing addon, using the addon ID and the latest backup. A secret group is then created with connection details for the ephemeral preview environment addon. These secrets are restricted to resources that have the preview environment tag.

Finally, two deployment services are deploying the builds created by the build on trigger nodes. The Redis deployment includes the existing tag `devel-redis`, so that it can inherit the secrets for a permanent resource in the project and share the addon with the development environment, rather than creating a new one for each preview environment.

Example preview environment template

```JSON
{
  "apiVersion": "v1.2",
  "triggers": [
    {
      "accountLogin": "northflank-platform",
      "vcsService": "github",
      "repoUrl": "https://github.com/northflank-platform/postgres-demo",
      "branchRestrictions": [],
      "prRestrictions": [
        "*"
      ],
      "pathIgnoreRules": [],
      "isAllowList": false,
      "ciIgnoreFlagsEnabled": true,
      "ciIgnoreFlags": [
        "[skip ci]",
        "[ci skip]",
        "[no ci]",
        "[skip nf]",
        "[nf skip]",
        "[northflank skip]",
        "[skip northflank]"
      ],
      "ref": "postgres-demo",
      "manualOnly": false,
      "id": "<trigger-ID>"
    },
    {
      "accountLogin": "northflank-platform",
      "vcsService": "github",
      "repoUrl": "https://github.com/northflank-platform/redis-demo",
      "branchRestrictions": [],
      "prRestrictions": [
        "*"
      ],
      "pathIgnoreRules": [],
      "isAllowList": false,
      "ciIgnoreFlagsEnabled": true,
      "ciIgnoreFlags": [
        "[skip ci]",
        "[ci skip]",
        "[no ci]",
        "[skip nf]",
        "[nf skip]",
        "[northflank skip]",
        "[skip northflank]"
      ],
      "ref": "redis-demo",
      "manualOnly": false,
      "id": "<trigger_ID>"
    }
  ],
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Workflow",
          "spec": {
            "type": "parallel",
            "steps": [
              {
                "kind": "BuildSource",
                "ref": "build-source-1",
                "spec": {
                  "defaults": {},
                  "reuseExistingBuilds": true,
                  "branch": "${refs.postgres-demo.branch}",
                  "id": "build-postgres-demo",
                  "type": "service",
                  "sha": "${refs.postgres-demo.sha}"
                },
                "condition": "success"
              },
              {
                "kind": "BuildSource",
                "ref": "build-source-2",
                "spec": {
                  "defaults": {},
                  "reuseExistingBuilds": true,
                  "branch": "${refs.redis-demo.branch}",
                  "id": "build-redis-demo",
                  "type": "service",
                  "sha": "${refs.redis-demo.sha}"
                },
                "condition": "success"
              },
              {
                "kind": "AddonBackup",
                "spec": {
                  "addonId": "postgres-demo",
                  "backupType": "snapshot"
                },
                "condition": "success"
              }
            ]
          }
        },
        {
          "kind": "Addon",
          "spec": {
            "name": "${args.name}-postgres",
            "tags": [
              "${args.previewId}"
            ],
            "externalAccessEnabled": false,
            "type": "postgresql",
            "billing": {
              "replicas": 1,
              "storage": 6144,
              "storageClass": "nvme",
              "deploymentPlan": "nf-compute-200"
            },
            "typeSpecificSettings": {
              "postgresqlConnectionPoolerReplicas": 2,
              "postgresqlReadConnectionPoolerReplicas": 2
            },
            "tlsEnabled": true,
            "version": "16",
            "source": {
              "addonId": "postgres-demo",
              "backupId": "latest"
            }
          },
          "ref": "postgres-addon"
        },
        {
          "kind": "SecretGroup",
          "spec": {
            "type": "secret",
            "secretType": "environment-arguments",
            "priority": 10,
            "name": "${args.name}-secrets",
            "tags": [
              "${args.previewId}"
            ],
            "secrets": {
              "variables": {},
              "files": {}
            },
            "restrictions": {
              "restricted": true,
              "tags": [
                "${args.previewId}"
              ],
              "nfObjects": []
            },
            "addonDependencies": [
              {
                "addonId": "${refs.postgres-addon.id}",
                "keys": [
                  {
                    "keyName": "HOST",
                    "aliases": []
                  },
                  {
                    "keyName": "POSTGRES_URI",
                    "aliases": [
                      "POSTGRES_URL"
                    ]
                  },
                  {
                    "keyName": "USERNAME",
                    "aliases": []
                  },
                  {
                    "keyName": "PASSWORD",
                    "aliases": []
                  },
                  {
                    "keyName": "DATABASE",
                    "aliases": []
                  }
                ]
              }
            ]
          },
          "ref": "secrets"
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "parallel",
            "steps": [
              {
                "kind": "DeploymentService",
                "spec": {
                  "deployment": {
                    "instances": 1,
                    "storage": {
                      "ephemeralStorage": {
                        "storageSize": 1024
                      },
                      "shmSize": 64
                    },
                    "docker": {
                      "configType": "default"
                    },
                    "internal": {
                      "id": "${refs.build-source-1.nfObjectId}",
                      "branch": "${refs.build-source-1.branch}"
                    }
                  },
                  "name": "${args.name}-demo",
                  "tags": [
                    "${args.previewId}"
                  ],
                  "runtimeEnvironment": {},
                  "runtimeFiles": {},
                  "billing": {
                    "deploymentPlan": "nf-compute-20"
                  },
                  "ports": []
                },
                "ref": "demo"
              },
              {
                "kind": "DeploymentService",
                "spec": {
                  "deployment": {
                    "instances": 1,
                    "storage": {
                      "ephemeralStorage": {
                        "storageSize": 1024
                      },
                      "shmSize": 64
                    },
                    "docker": {
                      "configType": "default"
                    },
                    "internal": {
                      "id": "${refs.build-source-2.nfObjectId}",
                      "branch": "${refs.build-source-2.branch}"
                    }
                  },
                  "name": "${args.name}-redis",
                  "tags": [
                    "${args.previewId}",
                    "devel-redis"
                  ],
                  "runtimeEnvironment": {},
                  "runtimeFiles": {},
                  "billing": {
                    "deploymentPlan": "nf-compute-20"
                  },
                  "ports": []
                },
                "ref": "redis-demo"
              }
            ]
          }
        }
      ]
    }
  },
  "options": {
    "concurrencyPolicy": "allow"
  }
}
```

![A preview environment template in the visual editor in the Northflank application.](https://assets.northflank.com/documentation/v1/application/release/create-a-preview-environment/preview-environment-template.png)

### Set up a preview environment: Next steps

- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)
- [GitOps on Northflank: Use templates and workflows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)

## Run and manage workflows

Source: https://northflank.com/docs/v1/application/release/run-and-manage-workflows.md

You can run and manage workflows from the environments view. Execute workflows manually, automatically via Git triggers, or on a cron schedule. Monitor workflow runs and roll back to previous deployments.

Select the environment that contains the workflow you want to manage from the environments view. You can run a workflow, or click the options button to view runs or edit the workflow.

### Run and manage workflows: Run a workflow manually

You can run a workflow by clicking run in the workflow header.

1. Navigate to **Environments** in your project

2. Click on a workflow to open it

3. Click **Run** in the header

4. Configure the run (optional):

  - **Name**: Enter a descriptive name for this run

  - **Description**: Add details about what this release includes

  - **Git triggers**: Select branch and commit for each configured Git trigger

  - **Arguments**: Override default argument values

5. Click **Create**

![Running a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/run-workflow.png)

If you do not enter a name for the run it will display a generated UUID, but you can edit the display name afterwards.

If the workflow contains build or deployment nodes you will be able to override the configured build or image to deploy, if required.

The workflow executes and you can monitor its progress in the run view.

### Run and manage workflows: Use Git triggers to run workflows

You can [add Git triggers in the workflow settings](release.md#configure-workflows-add-triggers).

A trigger will run the workflow whenever a change to the specified repository is committed.

You can include:

- **Branch and pull request rules** to only trigger on commits to specific branches or pull requests

- **Path rules** to only trigger on changes to specific directories or files in a repository, or to ignore changes to specific directories or files

- **Commit message ignore flags** to skip runs for commits with messages that contain certain strings

You can use references to obtain the values of Git triggers in your workflow nodes.

### Run and manage workflows: Use cron schedules to run workflows

Workflows can run automatically on a repeating schedule. This is useful for regular deployments, periodic maintenance tasks, or refreshing test environments.

To add a cron trigger:

1. Open your workflow

2. Click the plus sign or **Add trigger**

3. Select **Cron schedule** from the **Kind** dropdown

4. Enter a cron expression in the **Schedule** field (times are UTC, minimum interval is 10 minutes)

Each workflow can have one cron trigger.

### Run and manage workflows: Run a workflow using a webhook

You can trigger a workflow run by making a GET or POST request to a workflow's webhook endpoint.

You can include query parameters at the end of the webhook URL to pass values directly to your workflow as arguments.

#### Run and manage workflows: Git trigger parameters

You can override the values for Git triggers configured in your workflow using a webhook. For example, you may have configured a workflow to build from multiple repositories, or to build from specific directories in a single repository, and need to override the default branch and commit for each trigger.

To set the values for specific triggers, use the name of the Git trigger followed by the field name in dot notation:

| Parameter | Value |
| --- | --- |
| `<git-trigger>.branch` | The branch name |
| `<git-trigger>.sha` | The commit SHA |
| `<git-trigger>.pullRequestId` | The ID of the pull request |
| `<git-trigger>.repoUrl` | The repository URL |

For example, the following endpoint would run a workflow and set the branch for the Git trigger `frontend` to `feature` and the branch for the trigger `backend` to `develop`:

`https://webhooks.northflank.com/workflows/<TOKEN>?frontend.branch=feature&backend.branch=develop`

#### Run and manage workflows: Workflow name and description

You can pass in optional values to set the `name` and `description` for a workflow run, otherwise the workflow will be given a random identifier as the name and no description.

#### Run and manage workflows: Other values

You can also add whatever other URL query parameters you require. For example, triggering a workflow with the following parameters: `https://webhooks.northflank.com/workflows/<TOKEN>?foo=bar` would make `${args.foo}` available in the workflow, resolving to the value `bar`.

You can use this to pass in secrets or configuration details for your workflow, or set the branch and commit in build nodes that don't have any Git triggers configured.

### Run and manage workflows: View runs

The state of the current or most recent workflow run is indicated in the workflow header. This can be clicked to view the currently running workflow, or the list of previous runs.

#### Run and manage workflows: Workflow run statuses

Pending: the workflow is scheduled to run
Running: the workflow is currently running
Success: all of the nodes within the workflow completed successfully
Failed: some or all of the nodes within the workflow failed to complete successfully

#### Run and manage workflows: View workflow runs

Click on a workflow and click **view runs**.

This displays a list of previous and current workflow runs and their status. You can also see when the workflow was run, and when it was completed.

#### Run and manage workflows: Node statuses

Pending: the node or workflow will run when previous steps are executed successfully
Running: the node or workflow is currently being executed
Waiting: the node is waiting for an action to be completed, will eventually timeout unless it receives a successful response
Retrying: the node has failed on previous runs, but is being executed again (up to 3 attempts)
Success: the node or workflow has completed successfully
Failed: the node or workflow has failed to execute, or exceeded 3 retries

### Run and manage workflows: Re-run a workflow

You can re-run a previous workflow run to execute the same workflow with the same structure and arguments.

1. Navigate to **Environments** in your project

2. Click on a workflow

3. Click **View runs** in the sidebar

4. Click on the **Re-trigger** icon on the run you want to rerun

The workflow will execute again with the same configuration and arguments as the selected run. This allows you to re-execute a previous workflow without manually configuring it again.

### Run and manage workflows: Next steps

- [Set up preview blueprints: Create preview blueprints to automatically create preview environments for your branches and pull requests.](release.md#set-up-preview-blueprints)
- [Manage preview blueprints: Manage active previews, manually create test environments, and configure automatic cleanup.](release.md#manage-preview-blueprints)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)

## Run migrations

Source: https://northflank.com/docs/v1/application/release/run-migrations.md

When you make changes to your database schema you may need to update your application and change your production database simultaneously.

You can handle database schema migrations on Northflank in various ways:

- By configuring a workflow, which automatically runs a migration and then deploys only when the migration is successful (recommended)

- Using a job triggered by CI

- Restarting your deployment with command overrides

- Executing commands in a container's shell

We recommend using workflows to automate your migration process, especially for production deployments, as this makes the process easy and ensures the migration has run before deploying your updated application.

To release a new version of your application with a migration it is recommended you follow this workflow:

1. Back up your database in case you need to restore it

2. Run your migration

3. If the migration is successful, deploy the new release to the deployment service

If your updated application is deployed before the migration has completed it may crash or not function as expected, and you may need to redeploy it.

### Run migrations: Migrate using a workflow

You can add a migration step to your workflow to run database migrations automatically as part of your deployment process.

1. Open your workflow in the visual editor

2. Add a **Run job** node after your build node and before your deployment node

3. Configure the job node:

  - **Job**: Select or create a job that runs your migration script

  - **Build**: Use the same build as your deployment

  - **Environment variables**: Include database connection details from secret groups

4. Connect the migration node between your build and deployment nodes

5. Click **Save workflow**

This ensures migrations run after building but before deploying the new code.

### Run migrations: Migrate using a job triggered by CI

Create a dedicated job for running migrations:

1. Navigate to **Jobs**

2. Click **Create job**

3. Configure:

  - **Name**: e.g., `run-migrations`

  - **Build source**: Same repository as your application

  - **Command**: Script that runs your migrations (e.g., `npm run migrate`, `python manage.py migrate`, `rake db:migrate`)

  - **Environment variables**: Database credentials from addon secret groups

4. Click **Create job**

The job is now available to use in workflow migration nodes.

### Run migrations: Migration strategies

#### Run migrations: Run before deployment

Place the migration node before the deployment node. New schema is applied before the updated service starts.

Use when new code requires new schema, migrations add columns or tables, or downtime is acceptable.

#### Run migrations: Run after deployment

Place the migration node after the deployment node. New code deploys first, then schema is updated.

Use when old code works with new schema, migrations are backwards compatible, or zero downtime is required.

#### Run migrations: Separate migration workflow

Create a dedicated workflow for migrations, separate from deployment workflows.

Use when migrations take a long time, you want manual control over when migrations run, or multiple services share the same database.

### Run migrations: Migration best practices

**Make migrations backwards compatible:**

Add new columns as nullable initially. Deploy code that works with both old and new schema. Run migration after deployment. Deploy code that requires new columns. Make columns non-nullable if needed.

**Test migrations:**

Run migrations in preview environments first. Verify migrations work with test data. Check migration rollback procedures.

**Monitor migrations:**

View migration logs in the job run. Set up alerts for migration failures. Track migration execution time.

**Backup before migrations:**

Add a backup node before the migration node. Restore from backup if migration fails. Keep backups of pre-migration state.

### Run migrations: Migration workflow example

A safe migration workflow:

1. **Start build** node: Build application code

2. **Run backup** node: Backup database before migration

3. **Run job** node: Execute database migration

4. **Condition** node: Check if migration succeeded

5. **Deploy build** node: Deploy new code only if migration succeeded

6. **Run action** node: Restart services if needed

This pattern ensures migrations are applied safely with backup and failure handling.

### Run migrations: Roll back migrations

If a migration causes issues:

1. Navigate to the workflow run

2. Find the backup created before the migration

3. Run a new workflow to restore from the backup

4. Deploy the previous version of your code

Some migration frameworks support automatic rollback. Configure your migration job to support rollback commands.

## Set up environments

Source: https://northflank.com/docs/v1/application/release/set-up-environments.md

Environments represent deployment targets in your release process. Create environments for development, staging, and production to organize your services, workflows, and resources by deployment stage.

Each environment contains its own set of resources and workflows, keeping your deployments separate and easy to manage.

![Environments in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/environments.png)

### Set up environments: Create an environment

1. Navigate to **Environments** in your project

2. Click the plus icon to create a new environment

An environment will be created with a default name (e.g., `New environment 1`).

1. Click the edit icon on the environment to rename it

2. Enter your environment name (e.g., `production`, `staging`, `development`)

3. Click the checkmark icon to save

Your environment is now created. You can add workflows, services, jobs, and addons to it.

### Set up environments: Configure workflows in an environment

Once you have created an environment, you can set up workflows to automate your release process.

- [Configure a workflow: Learn how to use the visual editor or code to configure a workflow.](release.md#configure-workflows)

### Set up environments: Next steps

- [Configure a workflow: Learn how to use the visual editor or code to configure a workflow.](release.md#configure-workflows)
- [Run and manage workflows: Run and manage workflows for different environments.](release.md#run-and-manage-workflows)
- [Set up preview blueprints: Create preview blueprints to automatically create preview environments for your branches and pull requests.](release.md#set-up-preview-blueprints)
- [Manage preview blueprints: Manage active previews, manually create test environments, and configure automatic cleanup.](release.md#manage-preview-blueprints)

## Set up preview blueprints

Source: https://northflank.com/docs/v1/application/release/set-up-preview-blueprints.md

Preview blueprints are templates that automatically create ephemeral environments when you open pull requests or push to branches. Each preview environment is an isolated instance of your application with its own services, databases, and URLs.

Preview blueprints can be triggered by Git events (pull requests and pushes), webhooks, or API calls. While Git triggers are the most common, you can also trigger preview blueprints dynamically via webhook or API for custom workflows.

### Set up preview blueprints: Create a preview blueprint

1. Navigate to **Environments** in your project

2. Click **Create preview blueprint**

3. Configure the blueprint:

  - **Name**: Enter a name (e.g., `pr-previews`)

  - **Naming convention**: Select how preview resources should be named

  - **Prefix / Suffix**: Toggle whether to prepend or append pull request numbers or branch names to resource names

4. Click **Add trigger**:

  - **Kind**: Select **Git pull request** or **Git push**

  - **Repository**: Select the repository to watch

5. Click **Continue** to open the visual editor

The visual editor opens where you can define the resources that will be created in each preview environment.

![Creating a preview blueprint in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/create-preview-blueprint.png)

### Set up preview blueprints: Configure the preview blueprint

Use the visual editor to define what gets created in each preview environment. Connect nodes together to build your preview infrastructure.

1. Start with a **Build on trigger** node that builds code from the pull request or branch

2. Add deployment nodes to deploy the built code to services

3. Add infrastructure nodes to create databases, volumes, or other resources

4. Configure networking to expose services with unique URLs

5. Click **Save preview blueprint**

![Configuring a preview blueprint in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/configure-preview-blueprint.png)

#### Set up preview blueprints: Common patterns

##### Set up preview blueprints: Simple frontend or API

Build your code and deploy it as a single service with a public URL. Each preview gets its own URL so reviewers can open the exact version from the PR.

**Nodes:** Build on trigger → Create service → Expose port with generated domain

##### Set up preview blueprints: Full stack application

Build your application, provision a fresh database for the preview, deploy the application, and inject the database credentials. Each preview environment is fully isolated with its own data.

**Nodes:** Build on trigger → Create addon (e.g. PostgreSQL) → Deploy build → Link addon credentials to service

This is the most common pattern for web applications. Because the database is created fresh for each preview, you can seed it with test data using a job node that runs after the database is ready.

##### Set up preview blueprints: Full stack with seed data

Extend the full stack pattern by running a one-off job after the database is ready to load fixtures or seed data. Alternatively, fork your database from a snapshot to restore pre-seeded data more efficiently. The preview is then ready to use immediately after deployment without manual setup.

**Nodes:** Build on trigger → Create addon (or fork from snapshot) → Run job (seed data, optional) → Deploy build → Link addon credentials

##### Set up preview blueprints: Microservices

Build and deploy multiple services in the same preview. Internal services communicate using Northflank's private networking, while only the public-facing service is exposed externally.

**Nodes:** Build service A → Build service B → Deploy service A → Deploy service B → Expose service A

Use condition nodes to skip certain services if the PR only touches specific parts of the codebase.

##### Set up preview blueprints: Branch-specific overrides

Use the **Skip node execution** option with conditional functions like `fn.if()` in node references to change what gets deployed based on which branch or repository triggered the preview. For example, skip creating a full database and deploy a lightweight mock instead when the PR is against a docs branch.

**Nodes:** Build on trigger → Condition (check `${triggers.repo.branch}`) → Deploy full stack (true path) → Deploy lightweight mock (false path)

### Set up preview blueprints: Configure triggers

Preview blueprints can have multiple triggers to create environments automatically.

#### Set up preview blueprints: Git pull request trigger

Creates preview environments when pull requests are opened and updates them when new commits are pushed:

1. Click the plus sign or **Add trigger**

2. Select **Git pull request**

3. Configure:

  - **Repository**: Select your repository

  - **Pull request rules**: Specify when to trigger

4. Click **Save**

Preview environments are automatically deleted when pull requests are closed or merged.

#### Set up preview blueprints: Git push trigger

Creates preview environments when commits are pushed to specific branches:

1. Click the plus sign or **Add trigger**

2. Select **Git push**

3. Configure:

  - **Repository**: Select your repository

  - **Branch rules**: Specify branches to watch

4. Click **Save**

#### Set up preview blueprints: Cron schedule trigger

Recreates preview environments on a schedule to refresh test data:

1. Click the plus sign or **Add trigger**

2. Select **Cron schedule**

3. Enter a cron expression (times are UTC, minimum interval is 10 minutes)

4. Click **Save**

#### Set up preview blueprints: Webhook trigger

Manually trigger a preview environment by sending a webhook request to Northflank. Useful for integrations with external systems or custom CI/CD pipelines.

1. Click the plus sign or **Add trigger**

2. Select **Webhook**

3. Copy the webhook URL provided

4. Click **Save**

Send a POST request to the webhook URL to trigger a new preview environment.

#### Set up preview blueprints: Tagged release trigger

Triggers a new preview environment whenever a new Git tag is created in your repository. Useful for testing release candidates or deploying specific versions.

1. Click the plus sign or **Add trigger**

2. Select **Tagged release**

3. Configure:

  - **Repository**: Select your repository

4. Click **Save**

#### Set up preview blueprints: GitHub check suite trigger

Automatically triggers a preview environment only after all GitHub checks (tests, linters, security scans) pass on a pull request. Prevents deploying broken code.

1. Click the plus sign or **Add trigger**

2. Select **GitHub check suite**

3. Configure:

  - **Repository**: Select your repository

  - **Branch trigger rules**: Specify which branches to watch

  - **Path rules**: Optionally filter by file changes

  - **Commit message ignore flags**: Optionally skip based on commit messages

4. Click **Save**

All status checks configured on your repository must pass before the preview runs.

#### Set up preview blueprints: GitHub PR label trigger

Triggers a preview environment when a pull request is labeled with a specific label. Useful for on-demand previews triggered by reviewers or automation.

1. Click the plus sign or **Add trigger**

2. Select **GitHub PR label**

3. Configure:

  - **Repository**: Select your repository

  - **Label trigger rules**: Choose which labels should trigger previews

  - **Branch rules**: Optionally limit to specific branches

  - **Path rules**: Optionally filter by file changes

  - **Commit message ignore flags**: Optionally skip based on commit messages

4. Click **Save**

### Set up preview blueprints: Configure preview settings

Click **Settings** in the blueprint editor to configure preview environment behavior:

#### Set up preview blueprints: Resource naming

Controls how resources created inside each preview environment are named.

**Use pull request ID**: Resources are named with the pull request number (e.g., `api-pr-123`). This is predictable and stable; the name stays the same if you push new commits to the same PR.

**Use branch name**: Resources are named with the branch name (e.g., `api-feature-login`). Useful when you want the resource name to reflect what is being reviewed, but names can become long for branches with verbose naming conventions.

**Custom naming**: Use template variables to define your own naming scheme, e.g. `api-${triggers.repo.pullRequestId}-${triggers.repo.sha}`. By default, Northflank automatically adds `${args.name}` as a prefix or suffix to ensure uniqueness, but you can remove this if needed.

#### Set up preview blueprints: Resource limits

Set smaller resource plans for previews than production to manage costs. For example, you might run a 0.1 vCPU / 256 MB container for a preview API instead of the 1 vCPU / 1024 MB plan used in production.

#### Set up preview blueprints: Cleanup policies

Configure when preview environments are automatically deleted to avoid accumulating idle infrastructure.

**Delete on pull request close**: The preview environment is automatically deleted when the PR is closed without merging.

**Delete on pull request merge**: The preview environment is automatically deleted when the PR is merged.

**Inactivity period**: Delete previews after a set number of days with no new commits. Useful as a safety net to catch long-running previews for PRs that have gone quiet but not been formally closed.

You can enable multiple cleanup policies simultaneously. The preview is deleted when any of the conditions is met first.

#### Set up preview blueprints: Use branch contents

Enable **Enable using branch contents** to provision the preview environment according to the GitOps file in the repository branch. This means if a PR modifies the preview blueprint definition, the preview will be provisioned according to the updated definition from that branch.

#### Set up preview blueprints: Teardown

Add a teardown specification to define cleanup actions when the preview environment is deleted. For example, you can use teardown to delete OpenTofu resources on external providers. Note that Northflank resources provisioned as part of a preview will already be auto-deleted, and in most cases workflows won't create resources.

### Set up preview blueprints: Test the preview blueprint

Before relying on automatic triggers, test your preview blueprint manually:

1. Click **Run** in the blueprint editor

2. Select a commit from the repository

3. Click **Create**

This creates a preview environment without opening a pull request, allowing you to verify the blueprint works correctly.

### Set up preview blueprints: Next steps

- [Manage preview blueprints: Manage active previews, manually create test environments, and configure automatic cleanup.](release.md#manage-preview-blueprints)
- [Configure a workflow: Learn how to use the visual editor or code to configure a workflow.](release.md#configure-workflows)
- [Run and manage workflows: Run and manage workflows for different environments.](release.md#run-and-manage-workflows)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)

## Tag workloads and resources

Source: https://northflank.com/docs/v1/application/release/tag-workloads-and-resources.md

You can use tags to track and manage workloads and resources in your Northflank team. Tags exist in your team and are available across all your team's projects.

Tags can help you identify resources at a glance, and all resources sharing a tag will be visible from the tag overview. You can apply tags to services, jobs, addons, and secret groups.

You can use tags to [restrict the resources](release.md#tag-workloads-and-resources-restrict-by-tag) in a project that can access secret groups and Tailscale networks, and to determine [where workloads can be deployed](release.md#tag-workloads-and-resources-provision-by-tag) in your own cloud account. This allows you to dynamically manage resources, for example in [templates](infrastructure-as-code.md#infrastructure-as-code-on-northflank), as you can define restrictions first by tag and then tag resources later to give them access.

For example, you could create tags for:

- Pipeline stages (`development`, `staging`, `production`) to manage variables for different environments

- Node pool deployment rules (`spot`, `gpu`) to deploy workloads to specific node pools on a cluster

- Network configuration (`public` `private` `vpc`) to show what network access resources have

- Other useful information (`experimental`, `using-deno`, `frontend-rebuild`) to help your team identify the nature of deployments

> [!note]
> [Click here](https://app.northflank.com/s/account/tags) to view your team's tags page.

![Resources with the same tag in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/tag-workloads-and-resources/tagged-resources.png)

### Tag workloads and resources: Create a tag

You can create a tag by navigating to your team dashboard in the Northflank application and opening the  Tags page.

Click Create tag and enter a name, description (optional), and choose a colour for the tag. Create tag to save your new tag and begin applying it to resources. Tags will be visible and available to the rest of your team across all projects, as long as they have [the necessary permissions](secure.md#use-role-based-access-control).

If you are [using your own cloud account on Northflank](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank) you will also be able to expand advanced resource settings to [configure node pool deployment preferences](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-deploy-workloads-to-specific-node-pools).

### Tag workloads and resources: Add a tag to a workload or resource

You can tag workloads from either the resource list, or in the resource itself. From the list of resources you can hover next to a resource's name, to bring up the tag button . Alternatively click through to a resource to find the tag button  Add tags in the header. Resources with tags already present will show the existing tags in the resource overview, or the tag button  in the resource list.

Hover over the button to reveal the tag menu and select the tags you want to assign to the resource, then click save.

> [!note]
> Adding or removing a tag will not take effect until the workload is restarted.
Tagged workloads will use all the [deployment behaviours](release.md#tag-workloads-and-resources-provision-by-tag) defined in their tags, for each tag.

![The tag menu for a service in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/tag-workloads-and-resources/edit-tags.png)

### Tag workloads and resources: Manage tags

#### Tag workloads and resources: View tagged resources

Tags are visible from resource overview lists and in the resource itself. You can also view a list of resources associated with the tag by opening the tags page in your account.

#### Tag workloads and resources: Edit a tag

Select a tag from the tags page and open the tag's settings to change the tag's description and colour.

If you are using your own cloud account you can also edit the tag's [advanced resource settings](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-deploy-workloads-to-specific-node-pools).

#### Tag workloads and resources: Remove a tag

You can remove a tag from a resource the same way as it was added, from the tag menu in the resource list or overview. Simply deselect the tag and save.

#### Tag workloads and resources: Delete a tag

Deleting a tag will remove it from all resources that were tagged with it.

### Tag workloads and resources: Restrict by tag

You can use tags to manage which resources should be given access to secret groups or features in a project.

#### Tag workloads and resources: Restrict secret groups

You can restrict secret groups by tag, which makes it easier to manage which services inherit environment variables and build arguments. You can use tags to manage secrets by environment simply by adding or removing tags from resources.

For example, you could create tags for `development` and `production` and restrict your secret groups to the tags for the environments they relate to, rather than listing currently existing resources by name. When you create new services or jobs you can simply add the relevant tag to them so that they inherit the correct secrets.

#### Tag workloads and resources: Restrict Tailscale

You can [enable Tailscale in a project](network.md#use-tailscale) to give resources to access to your Tailscale network. By default, all resources in your project will be able to access Tailscale devices. You can restrict Tailscale access to only resources with the selected tags.

#### Tag workloads and resources: Force matching all tags

By default, a resource will meet the restriction criteria at least one of the tags listed in the restriction.

You can enable force matching all tags to require a resource to have all the tags selected in the restriction for it to be granted access.

| Force matching enabled | Tag restrictions | Resource tags | Included in allowed resources |
| --- | --- | --- | --- |
| No | `A`, `B` | `A` | Yes |
| Yes | `A`, `B` | `A` | No |
| Yes | `A`, `B` | `A`, `B` | Yes |

### Tag workloads and resources: Provision by tag

You can use tags to determine how workloads are provisioned on your clusters on [other cloud providers](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

You can specify which workloads should be deployed to spot nodes, as well as deploy specific workloads to a node pool according to label. Node provisioning rules can be configured on the settings page of a tag, in advanced resource settings.

#### Tag workloads and resources: Schedule workloads to spot nodes

You can select schedule tagged workloads to spot nodes to ensure that workloads with this tag are only deployed to node pools that use spot nodes. If there is no spot node capacity in your cluster, the workload will fail to deploy.

To prevent this you can enable also allow scheduling to on-demand nodes on the tag, which will allow the workload to schedule to non-spot node pools if no spot node pools are available.

[Learn more about using spot instances](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-use-spot-instances).

![Creating a tag for spot workloads in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/tag-workloads-and-resources/spot-tag-settings.png)

#### Tag workloads and resources: Node affinities

You can add affinity rules to tags, which will only deploy workloads to node pools with labels that match the expressions in the rule. You can add multiple rules for a tag, and rules can be mandatory or preferential.

##### Tag workloads and resources: Match expression rules

You can add multiple match expression rules to an affinity rule, and each match expression will be evaluated your node pool labels. Enter a key, which is the name of the node pool label to check, and the values to check for in that label.

Choose the operator to evaluate the expression, `In`, or `NotIn`, depending on your requirement. `In` will ensure that the node pool has a label that contains the value before deploying the workload, and `NotIn` will deploy the workload on node pools that do not contain the value in the specified label.

##### Tag workloads and resources: Preference

You can select whether the rule is a preference or requirement by selecting preference. This will show a weight value, which can be set between 1 and 100, with higher weighted preferences being applied first.

If the rule is a preference, workloads will be deployed depending on the availability (capacity) of a node pool. If a workload cannot be deployed on a node pool that matches a higher weighted rule, the next highest weighted rule will be used to determine the node pool the workload is deployed on.

If the rule is not a preference, the workload will only be deployed on a node pool matching the affinity rule. If there is no availability on node pools that match the rule, the workload will not be deployed.

[Learn more about labelling node pools](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-use-spot-instances).

![Creating node affinity rules in the Northflank application](https://assets.northflank.com/documentation/v1/application/release/tag-workloads-and-resources/node-affinity-rules.png)

### Tag workloads and resources: Next steps

- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Monitor containers: Monitor the health and resource usage of deployments, and view detailed logs and metrics for individual container.](observe.md#monitor-containers)
