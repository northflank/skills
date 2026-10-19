# Use Cases

Generated from 11 application pages listed in `llms.txt`.

## Pages

- [Connect an app to AWS](#connect-an-app-to-aws)
- [Create preview environments](#create-preview-environments)
- [Deploy a production app](#deploy-a-production-app)
- [Host a model on GPUs](#host-a-model-on-gpus)
- [Choose a use case](#choose-a-use-case)
- [Release through staging](#release-through-staging)
- [Run background tasks](#run-background-tasks)
- [Run code in sandboxes](#run-code-in-sandboxes)
- [Run GPU workloads](#run-gpu-workloads)
- [Run workloads in your cloud](#run-workloads-in-your-cloud)
- [Use a cloud coding agent](#use-a-cloud-coding-agent)

## Connect an app to AWS

Source: https://northflank.com/docs/v1/application/use-cases/connect-an-app-to-aws.md

Use AWS resources from an application on Northflank. Accessing external resources does not require a Northflank cluster in your AWS account.

> [!note] Requirements
>
> You will need the following to get started:
>
> - An AWS account and permission to configure access to the intended resources
> - A Northflank application and permission to configure its connections
> - The required provider-link features enabled for your account

#### Connect an app to AWS: 1. Choose the task

| Task | Path |
| --- | --- |
| Access a resource that already exists | Provider link → Workload identity → Application request |
| Create a supported external addon | Provider link → Managed external addon → Application connection |
| Define external resources in code | Provider link → OpenTofu template → Resource outputs |

Review [provider-link features](cloud-integrations.md#provider-links) for availability. Select the features for your task before granting AWS permissions. A feature selection does not grant permissions or provision a resource.

#### Connect an app to AWS: 2. Connect the AWS account

[Connect an AWS provider link](cloud-integrations.md#connect-an-aws-provider-link). Use the authentication method and permissions required for the selected features.

Keep existing permissions that other resources still use. Cluster quotas apply when you also deploy a cluster.

#### Connect an app to AWS: 3. Configure the resource path

For an existing resource, [configure workload identity](bring-your-own-cloud.md#configure-workload-identity). This gives services and jobs cloud access without manually managing their cloud credentials. Use the intended resource permissions for the application.

For a supported S3 or RDS resource, [create a managed external addon](databases-and-persistence.md#create-a-managed-external-addon). These resources run in your AWS account. Wait for resource creation to complete before connecting the application.

For other infrastructure defined in code, [configure an OpenTofu node](infrastructure-as-code.md#manage-external-infrastructure). Select the provider link and define the outputs that the application needs. Review resource changes before running the template.

#### Connect an app to AWS: 4. Connect and exercise the application

Provide the endpoint and other required values through [runtime variables](run.md#inject-runtime-variables) or [secrets](secure.md#inject-secrets).

Access permissions and network connectivity are separate requirements. Workload identity does not create a network path. Review the resource's network access and Northflank [networking guidance](network.md#networking-on-northflank).

Make a representative request from the application. Make sure that it can access the intended resource with the intended permissions. For resources created by a template, define [teardown behavior](infrastructure-as-code.md#configure-teardown-workflows) before adding cleanup actions.

To host the application itself in AWS, use [Run workloads in your cloud](use-cases.md#run-workloads-in-your-cloud).

## Create preview environments

Source: https://northflank.com/docs/v1/application/use-cases/create-preview-environments.md

Create an isolated application environment for a pull request. A preview blueprint defines the resources and triggers for that environment.

> [!note] Requirements
>
> You will need the following to get started:
>
> - A connected Git source and an application that builds successfully
> - A list of the services, jobs, databases, and secrets required by the application
> - A decision about the data and external resources that each preview can access

#### Create preview environments: 1. Define the preview boundary

List the resources that each preview needs. Decide which resources the preview creates and which resources it shares. Keep production credentials and data out of previews unless your access policy permits that use.

Use [environments](release.md#set-up-environments) to organize the application resources. Review [secret groups](secure.md#manage-secret-groups) for the variables that those resources need.

#### Create preview environments: 2. Create a preview blueprint

[Create and configure a preview blueprint](release.md#set-up-preview-blueprints). Configure its repository triggers and resource definitions for the application.

For a guided example that includes a build service and workflows, use the [environment tutorial](getting-started.md#set-up-environments). Use the same resource names and connection values throughout that setup.

#### Create preview environments: 3. Create a preview from a pull request

Use a pull request that matches the configured trigger. Inspect the [preview and its resource states](release.md#manage-preview-blueprints).

Make sure that the preview uses the intended revision. Open the application and exercise a request that uses its dependencies. If a resource fails, examine its [logs](observe.md#view-logs) before changing the blueprint.

#### Create preview environments: 4. Define cleanup

Review preview teardown in [Manage preview blueprints](release.md#manage-preview-blueprints). Make sure that the cleanup behavior matches your data-retention requirements.

If templates manage other resources, review their [teardown workflows](infrastructure-as-code.md#configure-teardown-workflows). Identify shared resources before adding deletion steps.

The setup is complete when a matching pull request creates a working preview and the preview lifecycle handles its resources as intended.

## Deploy a production app

Source: https://northflank.com/docs/v1/application/use-cases/deploy-a-production-app.md

Deploy a web application with a database and prepare its release and operating processes. This guide uses a service named `web` and a database named `db`.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Application source or a container image that starts your web server
> - A Northflank project and permission to create its resources
> - The application port, database type, and required environment variables

#### Deploy a production app: 1. Prepare the database and secrets

[Deploy a database](databases-and-persistence.md#deploy-a-database) named `db`. Choose a database type and version that the application supports.

Prepare a [secret group](secure.md#manage-secret-groups) with the application's required variables. [Link the database credentials](databases-and-persistence.md#connect-database-secrets-to-workloads) and match the variable names that the application reads.

#### Deploy a production app: 2. Build and deploy the application

If you use source code, [build and deploy your code](getting-started.md#build-and-deploy-your-code). If you already have an image, [deploy it from a registry](run.md#run-an-image-from-a-container-registry).

Name the service `web`. Select the secret group and use the application's start command and port. Wait for the deployment to start. If it fails, examine the [container logs](observe.md#view-logs).

Make sure that `web` can connect to `db`. Use a test request that reads and writes application data.

#### Deploy a production app: 3. Configure traffic and readiness

[Configure the service port](network.md#configure-ports). If you use a custom domain, [add the domain](domains.md#add-a-domain-to-your-account) and [link it to the port](domains.md#link-a-domain-to-a-port).

[Configure health checks](observe.md#configure-health-checks) for the application. Make sure that a request to its public address returns the expected response.

#### Deploy a production app: 4. Define the release process

Use [environments](release.md#set-up-environments) to define development stages. For releases with multiple actions, [configure a workflow](release.md#configure-workflows).

If a release changes the database schema, review [database migrations](release.md#run-migrations) before deployment. Define recovery for both the application image and its data. Reverting an image does not reverse a database migration.

#### Deploy a production app: 5. Prepare for operations

1. Choose [service capacity](scale.md#scale-cpu-and-memory) and [instance count](scale.md#scale-instances).

2. Configure [database backups](databases-and-persistence.md#backup-restore-and-import-data) and review the restore procedure.

3. Review [metrics](observe.md#view-metrics) and configure [infrastructure alerts](observe.md#set-infrastructure-alerts).

4. Make sure that the team can find logs, identify the deployed revision, and use the recovery procedure.

For more detail, read the [production readiness guidance](production-workloads.md#get-production-ready-on-northflank). The application is ready for your production review when it serves requests, stores data, and has defined release and recovery processes.

## Host a model on GPUs

Source: https://northflank.com/docs/v1/application/use-cases/host-a-model-on-gpus.md

Deploy a model-serving container as a GPU-enabled service. This guide connects GPU setup, model configuration, storage, and network access.

> [!note] Requirements
>
> You will need the following to get started:
>
> - A model-serving image with a documented start command and network port
> - Model files or permission to download them from their source
> - The GPU memory and runtime requirements of the model and serving software

#### Host a model on GPUs: 1. Choose GPU capacity and hosting

Use [Run GPU workloads](use-cases.md#run-gpu-workloads) to choose Northflank cloud or your cloud. Compare the model's requirements with the available GPU configuration before deployment.

Use a service for an endpoint that must keep running. Model training or batch inference that ends can use a [job](run.md#run-an-image-once-or-on-a-schedule).

#### Host a model on GPUs: 2. Configure the model service

Deploy the serving image and configure its [GPU resources](gpu-workloads.md#configure-and-optimise-workloads-for-gpus). Set the documented command and [runtime variables](run.md#inject-runtime-variables) for that image.

If the model source needs credentials, provide them through [secrets](secure.md#inject-secrets). Choose how the container obtains model files at startup.

If files must remain between container replacements, review [persistent volumes](databases-and-persistence.md#add-a-persistent-volume) and their limitations before using them. Do not assume that temporary container storage preserves downloaded model files.

#### Host a model on GPUs: 3. Configure the endpoint

[Configure the serving port](network.md#configure-ports). Choose private access or [public access](network.md#expose-your-application) for the application's requirements.

Before exposing an endpoint publicly, configure the application's required authentication and [port security policies](network.md#add-security-policies-for-ports). Use a [health check](observe.md#configure-health-checks) that reflects whether the model server can handle requests.

#### Host a model on GPUs: 4. Exercise a representative request

Wait for model loading to complete. Send a request that fits the model server's documented API and inspect the result.

Review [logs](observe.md#view-logs) and [metrics](observe.md#view-metrics). Make sure that startup time and resource use fit the intended workload before changing capacity or adding traffic.

## Choose a use case

Source: https://northflank.com/docs/v1/application/use-cases/overview.md

Use these guides to connect Northflank features around an application task. Each guide gives the order, important choices, and links to the detailed configuration instructions.

If this is your first deployment, start with [Build and deploy your code](getting-started.md#build-and-deploy-your-code).

#### Choose a use case: AI workloads

| Goal | Guide |
| --- | --- |
| Execute application or agent code in isolated environments | [Run code in sandboxes](use-cases.md#run-code-in-sandboxes) |
| Serve a model from a GPU deployment | [Host a model on GPUs](use-cases.md#host-a-model-on-gpus) |
| Give a coding agent a cloud development environment | [Use a cloud coding agent](use-cases.md#use-a-cloud-coding-agent) |

To configure a known feature, use its sidebar section. For example, GPU configuration is under Compute → GPUs, and domain configuration is under Networking.

#### Choose a use case: Applications

| Goal | Guide |
| --- | --- |
| Deploy an application with a database | [Deploy a production app](use-cases.md#deploy-a-production-app) |
| Process work continuously or on a schedule | [Run background tasks](use-cases.md#run-background-tasks) |
| Use GPU resources for an application | [Run GPU workloads](use-cases.md#run-gpu-workloads) |
| Move an existing Heroku application | [Migrate from Heroku](migrate-from-heroku.md) |

#### Choose a use case: Release process

| Goal | Guide |
| --- | --- |
| Preview changes in an isolated environment | [Create preview environments](use-cases.md#create-preview-environments) |
| Promote changes through staging | [Release through staging](use-cases.md#release-through-staging) |
| Follow the environment setup tutorial | [Set up environments](getting-started.md#set-up-environments) |

#### Choose a use case: Cloud resources

| Goal | Guide |
| --- | --- |
| Access or create resources in AWS | [Connect an app to AWS](use-cases.md#connect-an-app-to-aws) |
| Host workloads on your cloud infrastructure | [Run workloads in your cloud](use-cases.md#run-workloads-in-your-cloud) |

Cloud resource access does not require you to host workloads in your cloud. Provider links, workload identities, and external resources have their own requirements.

## Release through staging

Source: https://northflank.com/docs/v1/application/use-cases/release-through-staging.md

Release an application through staging before production. Environments organize resources, and workflows define the actions in a release.

> [!note] Requirements
>
> You will need the following to get started:
>
> - An application image that builds and starts successfully
> - Resources and configuration for staging and production
> - A release policy, a database migration plan, and a recovery procedure

#### Release through staging: 1. Define the environments

[Create the environments](release.md#set-up-environments) for staging and production. Identify the services, jobs, databases, and secrets that each environment uses.

Use separate [secret groups](secure.md#manage-secret-groups) where the values differ. Make sure that a staging deployment cannot write to production data through an unintended connection.

#### Release through staging: 2. Define the release workflow

[Configure a workflow](release.md#configure-workflows) for the build, database operations, and deployments that the application needs. Use the [environment tutorial](getting-started.md#set-up-environments) for an assembled example.

If a release changes a database schema, read [Run migrations](release.md#run-migrations). Put required backups and migrations in the correct order for your application.

#### Release through staging: 3. Exercise the release in staging

[Run the workflow](release.md#run-and-manage-workflows) for staging. Inspect each node result and the [application logs](observe.md#view-logs).

Make sure that the application serves requests and uses the intended data. Check the revision in your release records before proceeding to production.

#### Release through staging: 4. Release to production

Use the production workflow after the staging checks and your release policy permit the change. Observe workflow results and [health checks](observe.md#configure-health-checks).

Define recovery before the release. Restoring an earlier image does not reverse a database migration. Review [release strategies](production-workloads.md#release-for-production) and [database restore procedures](databases-and-persistence.md#backup-restore-and-import-data) for the application's requirements.

For gradual traffic changes, review [canary rollouts](release.md#set-up-canary-rollouts). The release is complete when the intended revision is ready and the application checks succeed.

## Run background tasks

Source: https://northflank.com/docs/v1/application/use-cases/run-background-tasks.md

Run work outside a request to your web application. Choose a service for a continuous worker or a job for a task that ends.

> [!note] Requirements
>
> You will need the following to get started:
>
> - A container image or build source for the task
> - The command that starts the worker or task
> - Connection details for its database, queue, or external resources

#### Run background tasks: 1. Choose the workload type

| Process | Resource | Configuration guide |
| --- | --- | --- |
| Continues to consume work from a queue | Service | [Run an image continuously](run.md#run-an-image-continuously) |
| Performs a task and exits | Manual job | [Run an image once](run.md#run-an-image-once-or-on-a-schedule) |
| Performs a task at regular times | Scheduled job | [Run an image on a schedule](run.md#run-an-image-once-or-on-a-schedule) |

A continuous worker must keep its process running while it waits for work. A job command must finish when its task is complete.

#### Run background tasks: 2. Configure the workload

Create the selected resource and choose its image. If the image starts a web server by default, [override the command](run.md#override-command-or-entrypoint) with the task command.

Add the required [runtime variables](run.md#inject-runtime-variables) and [secrets](secure.md#inject-secrets). If the task uses a Northflank database, [link the database credentials](databases-and-persistence.md#connect-database-secrets-to-workloads).

Make sure that the workload can access each required resource before enabling a schedule or adding workers.

#### Run background tasks: 3. Define execution behavior

For jobs, review the schedule, concurrency policy, retry limit, and time limit in the [job guide](run.md#run-an-image-once-or-on-a-schedule). Choose values that fit the task duration and its handling of repeated work.

For a continuous worker, choose its [CPU and memory](scale.md#scale-cpu-and-memory) and [instance count](scale.md#scale-instances). Before adding instances, make sure that multiple workers can process the queue safely.

#### Run background tasks: 4. Observe the result

Run a test task and examine its [logs](observe.md#view-logs). Make sure that the expected application result exists. A process exit or a running container alone does not establish that the application work succeeded.

For tasks that form part of a release, use a [workflow](release.md#configure-workflows). For schema changes, read [Run migrations](release.md#run-migrations).

## Run code in sandboxes

Source: https://northflank.com/docs/v1/application/use-cases/run-code-in-sandboxes.md

Use sandboxes to give application or agent code an isolated execution environment. The application controls sandbox creation, task execution, and cleanup through the SDK.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Access to Sandboxes and the credentials required by the selected setup guide
> - An image and command for the code that the sandbox will execute
> - A decision about network access, credentials, and data that the code can use

#### Run code in sandboxes: 1. Choose the deployment location

Use [Northflank cloud](sandboxes.md#sandboxes-on-northflank-cloud) or [your cloud](sandboxes.md#sandboxes-in-your-own-cloud). Complete the selected setup before starting the application integration.

Retain the access and capacity requirements from that guide. For your cloud, prepare the required cluster resources first.

#### Run code in sandboxes: 2. Create a sandbox and execute a task

Use the [SDK quickstart](sandboxes.md#quickstart). Start with a representative task and the image that the application will use.

Provide only the credentials and connections required by that task. Make sure that the sandbox starts and the command produces the expected result.

#### Run code in sandboxes: 3. Handle the application lifecycle

Use the [sandbox management guide](sandboxes.md#configure-and-manage-sandboxes) to handle task completion and cleanup. Define application behavior for a task error, an unavailable sandbox, and a task that exceeds its expected duration.

Copy or store required results before removing the environment. Make sure that the application handles its result and cleanup paths, not only a successful command.

#### Run code in sandboxes: Choose the related workflow

For a scheduled container task, read [Run background tasks](use-cases.md#run-background-tasks). For a cloud development environment used by a coding agent, read [Use a cloud coding agent](use-cases.md#use-a-cloud-coding-agent).

## Run GPU workloads

Source: https://northflank.com/docs/v1/application/use-cases/run-gpu-workloads.md

Run an application with GPU access on Northflank cloud or your own infrastructure. Services and jobs can use GPUs. Use a service for a continuous process and a job for work that ends.

> [!note] Requirements
>
> You will need the following to get started:
>
> - A container image that supports the intended GPU workload
> - The GPU type, memory, and resource requirements of the application
> - Access to a deployment location with the required GPU capacity

#### Run GPU workloads: 1. Choose where the workload runs

| Hosting choice | First step | Detailed guide |
| --- | --- | --- |
| Northflank cloud | Create a GPU-enabled project | [Deploy GPUs on Northflank cloud](gpu-workloads.md#deploy-gpus-on-northflanks-managed-cloud) |
| Your cloud | Prepare a cluster and GPU node pools | [Deploy GPUs in your own cloud](gpu-workloads.md#deploy-gpus-in-your-own-cloud) |

Review availability, requirements, and supported configuration in the selected guide before creating resources. The hosting paths have different GPU configuration constraints.

For your cloud, review the provider requirements and [node pool configuration](bring-your-own-cloud.md#deploy-and-scale-node-pools). Make sure that the cluster has GPU capacity before deploying the workload.

#### Run GPU workloads: 2. Configure the service or job

Use the selected hosting guide to choose the image and GPU resources. The shared configuration guidance is under [Compute → GPUs](gpu-workloads.md#configure-and-optimise-workloads-for-gpus).

Add the application's [runtime variables](run.md#inject-runtime-variables) and [secrets](secure.md#inject-secrets). If the image needs a different start command, [override its command or entrypoint](run.md#override-command-or-entrypoint).

For an HTTP service, [configure its port](network.md#configure-ports). A batch job does not need public HTTP access to perform its work.

#### Run GPU workloads: 3. Run a representative task

Examine the [container logs](observe.md#view-logs) and the application's own GPU diagnostics. Make sure that the application can use the selected device and complete its intended task.

Use [metrics](observe.md#view-metrics) to review resource use. For your cloud, also review node pool capacity and cluster operation in the provider guide.

#### Run GPU workloads: Next steps

For model serving, continue with [Host a model on GPUs](use-cases.md#host-a-model-on-gpus). For tasks that end or use a schedule, read [Run background tasks](use-cases.md#run-background-tasks).

## Run workloads in your cloud

Source: https://northflank.com/docs/v1/application/use-cases/run-workloads-in-your-cloud.md

Run Northflank workloads on infrastructure that you control. Bring your own cloud (BYOC) creates a cluster through a cloud provider. Bring your own Kubernetes (BYOK) imports an existing cluster.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Access to BYOC or BYOK for your account
> - Provider credentials or access to the Kubernetes cluster
> - The permissions, quotas, network access, and capacity required by the selected hosting path

#### Run workloads in your cloud: 1. Choose the hosting path

Review [BYOC and BYOK requirements](bring-your-own-cloud.md#byoc-and-byok-requirements) before creating resources.

For BYOC, select a provider from the [cloud provider guides](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank). For BYOK, use [Import an existing cluster](bring-your-own-cloud.md#import-an-existing-cluster-byok).

If the application only needs an external cloud resource, use [Connect an app to AWS](use-cases.md#connect-an-app-to-aws). That path does not require cluster hosting.

#### Run workloads in your cloud: 2. Prepare the cluster

Complete the provider-specific setup or import procedure. Retain its permission, quota, and network requirements. Saving cluster configuration does not mean that the cluster is ready.

Wait for the readiness conditions in the selected guide. Use [cluster configuration](bring-your-own-cloud.md#configure-your-cluster) to review the required location and networking choices.

#### Run workloads in your cloud: 3. Prepare capacity and place workloads

For BYOC, [configure and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) with capacity for the application. If the application requires GPUs, use the [own-cloud GPU guide](gpu-workloads.md#deploy-gpus-in-your-own-cloud).

For BYOK, provision and scale nodes in your Kubernetes cluster. Then [map the existing nodes to Northflank node pools](bring-your-own-cloud.md#import-an-existing-cluster-byok-configure-node-pools). Configure GPU settings in those mappings if required. Northflank does not provision or scale nodes on imported clusters.

[Deploy workloads to the cluster](bring-your-own-cloud.md#deploy-workloads-to-your-cluster). Make sure that the workload runs in the intended location and can access its dependencies.

#### Run workloads in your cloud: 4. Define cluster operations

Review [cluster management](bring-your-own-cloud.md#manage-your-cluster), [infrastructure alerts](observe.md#set-infrastructure-alerts), and resource capacity. Identify who maintains the cluster and handles provider-side changes.

Before changing or removing infrastructure, review the effects on its workloads and persistent data in the relevant cluster guide. The setup is complete when the application works on the intended cluster and the team has an operating process.

## Use a cloud coding agent

Source: https://northflank.com/docs/v1/application/use-cases/use-a-cloud-coding-agent.md

Give a coding agent a cloud development environment with Cloud Harness. Use this path when the agent needs a repository, development tools, and an environment that you can manage.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Access to Cloud Harness and the requirements in its quickstart
> - Access to the repository used by the coding task
> - Credentials and tools required by the selected agent

#### Use a cloud coding agent: 1. Choose the agent workflow

Read [AI agents on Northflank](ai-agents.md#agents-on-northflank) to choose a workflow. For code execution controlled by your application, use [Sandboxes](use-cases.md#run-code-in-sandboxes).

Identify the repository, development tools, and network access that the coding task requires. Keep the agent's access within that task's scope.

#### Use a cloud coding agent: 2. Create the Cloud Harness

Use the [Cloud Harness quickstart](cloud-harness.md#quickstart) to create the environment. Complete its repository, credential, and startup configuration.

Wait for the environment to become ready. Make sure that it contains the intended repository and tools before starting the coding task.

#### Use a cloud coding agent: 3. Connect and work with the agent

Use the connection instructions in the quickstart. Start with a bounded task and inspect the resulting files and command output.

If the agent must work with Northflank resources, review [Agent Skills](ai-agents.md#agent-skills). Grant only the Northflank access required by the task.

#### Use a cloud coding agent: 4. Manage the environment

Use [Configure and manage Cloud Harnesses](cloud-harness.md#configure-and-manage-cloud-harnesses) for environment changes and lifecycle controls.

Preserve the work that you need before removing an environment. The setup is complete when the agent can work with the intended repository and you can inspect its results.
