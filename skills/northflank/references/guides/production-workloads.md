# Production Workloads

Generated from 4 application pages listed in `llms.txt`.

## Pages

- [Get production-ready on Northflank](#get-production-ready-on-northflank)
- [Persistent storage in production](#persistent-storage-in-production)
- [Production operations](#production-operations)
- [Release for production](#release-for-production)

## Get production-ready on Northflank

Source: https://northflank.com/docs/v1/application/production-workloads/get-production-ready-on-northflank.md

Northflank provides the tooling, infrastructure, and security required to confidently run and manage your production workloads. Once you have successfully configured your team and set up your project essentials, we recommend using the following features to prepare for production. If you need a refresher on any of the Northflank basics, please review our [getting started](getting-started.md#introduction-to-northflank) guide.

#### Get production-ready on Northflank: Release deployments with:

- Release flows to automate every aspect of a release, from database operations to promoting images, with quick roll backs

- GitOps to trigger a release on git push

- CI/CD to automatically build and deploy, with rules for specific branches, commit messages, and file changes

- Manual build and deploy to quickly override your default configuration

- Migrations that can be run before, or with, a release

- Zero downtime using health checks and high-availability databases

#### Get production-ready on Northflank: Manage your persistent storage with:

- Managed database, file storage, and message-queue addons

- Secure private and public networking to access your addons

- Secret groups to inject connection details into your workloads

- Manual and automatic backups

- One-click data restore

- Persistent volumes for workloads

#### Get production-ready on Northflank: Monitor and analyse your production environment with:

- Logs and third-party log sinks

- Detailed metrics

- Shell access to your running containers

- Notifications for events in your project or account, alerts for infrastructure usage and issues, and account spend

- Autoscaling to automatically scale to meet demand

- Health checks to restart crashed containers

- [Release for production: Learn how to deploy your production releases on Northflank with zero downtime.](production-workloads.md#release-for-production)
- [Persistent storage in production: Use Northflank-managed databases and persistent storage with your production workloads.](production-workloads.md#persistent-storage-in-production)
- [Production operations: Monitor your deployments, ensure they cope with increased traffic, and automatically recover containers from issues.](production-workloads.md#production-operations)

## Persistent storage in production

Source: https://northflank.com/docs/v1/application/production-workloads/persistent-storage-in-production.md

You can deploy many of the most popular databases on Northflank with one click, and enjoy a fully-managed experience for upgrading, scaling, and administering your persistent storage.

You can check the [available types of Northflank addon here](databases-and-persistence.md#deploy-a-database-available-databases).

Using Northflank’s database as a service option allows you to easily:

- Deploy in one click with minimal configuration

- Dynamically import connection details to workloads

- Access securely with TLS, private networking, or expose to the internet

- Import data from a live database or dump file

- Create a backup schedule or create manual backups

- Restore from a backup

- Scale vertically and horizontally

- Upgrade version

- Access metrics and receive alerts about your database

If you need to run a workload with persistent storage and have a use-case not covered by any available addons, you can create a persistent volume attached to a deployment. However, this comes with several limitations, and you are recommended to use Northflank addons wherever possible.

### Persistent storage in production: Import your production data

You can import your production data after creating an addon, the exact method depends on the type of addon.

For PostgreSQL, MongoDB, and MySQL you can import your data from either a dump backup of your database, or by providing a connection string to your live database.

You can only import one database by uploading a dump file, which will become the default database for the Northflank addon. Importing via connection string will allow you to import multiple databases.

Other addons have different methods to import data, such as command-line tools or web interfaces, which are detailed in their specific guides.

#### Persistent storage in production: Learn more

- [Migrate PostgreSQL to Northflank: Import your PostgreSQL database to Northflank by uploading a dump, or providing a connection string to a running PostgreSQL instance.](databases-and-persistence.md#migrate-your-postgresql-database-to-northflank)
- [Migrate MongoDB® to Northflank: Import your MongoDB data to Northflank by uploading a dump, or providing a connection string to a running MongoDB instance.](databases-and-persistence.md#migrate-your-mongodb®-database-to-northflank)
- [Migrate MySQL to Northflank: Import your MySQL database to Northflank by uploading a dump, or provide a connection string to a running MySQL instance.](databases-and-persistence.md#migrate-your-mysql-database-to-northflank)
- [Migrate S3 storage to Northflank: Configure live replication of your existing MinIO® instance, or transfer files from S3-compatible storage to Northflank.](databases-and-persistence.md#migrate-your-minio®-deployment-to-northflank)
- [Migrate Redis® to Northflank: Import a snapshot of your Redis keystore, or configure live replication to migrate without interruption.](databases-and-persistence.md#migrate-your-redis®-deployment-to-northflank)
- [Migrate RabbitMQ to Northflank: Import your RabbitMQ definitions to run your message broker with the same configuration on Northflank.](databases-and-persistence.md#migrate-your-rabbitmq-deployment-to-northflank)

### Persistent storage in production: Configure networking for your database

You can configure network settings to change where you can access your addon: from within your project only, from within your project and your local machine only, or publicly available on the internet.

By default, your addon will have TLS enabled, and will only be accessible within your Northflank project.

You can enable or disable TLS for addons, depending on your application’s requirements. The TLS status will be reflected in the connection detail `TLS_ENABLED`.

### Persistent storage in production: Forward your addon for local access

You can securely forward your addon to your local machine to access and administer your database while it remains otherwise inaccessible over the internet. Forwarding establishes a secure connection between your local machine and the addon via a Northflank proxy.

You can forward an addon, and other Northflank resources, using the Northflank CLI. You can copy the specific forward command from your addon’s overview, in the local access section.

### Persistent storage in production: Publicly expose an addon

You may need to make an addon available over the public internet, for example to connect external services, where forwarding is insufficient.

You can make an addon publicly accessible from the network settings page, which requires TLS to be enabled. Making an addon publicly accessible will add new connection strings which can be used to connect to the addon over the public internet.

If you expose an addon in this method you are advised to add security rules to restrict external ingress traffic to the specified IP addresses.

#### Persistent storage in production: Learn more

- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Networking: Configure public and private ports for your Northflank workloads, and add security with IP policies and basic authentication.](network.md#networking-on-northflank)

### Persistent storage in production: Connect your addon to production workloads

The best way to connect your addon is by providing the relevant connection details to your application via environment variables.

You can do this by linking the addon to a secret group, which will make the connection details available automatically throughout your project or the scoped resources. This also has the benefit of automatically updating any connection details that are passed to your application if they change, for example if you scale your addon to more replicas.

Alternatively you can manually add the relevant secrets to individual services or jobs on their environment variables page.

To access an addon in your build process, it must be [publicly exposed](databases-and-persistence.md#connect-database-secrets-to-workloads-access-a-database-in-a-build).

#### Persistent storage in production: Learn more

- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)
- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)

### Persistent storage in production: Configure your addon for high availability

You can configure your Northflank addons for high availability to remove or reduce downtime incurred from adding more replicas, updating your addon’s version, or from issues with replicas. Restoring data to an addon will always lead to some downtime, which depends on the size of the backup you are restoring from.

Each addon behaves differently when multiple replicas are added, but by configuring at least two replicas you can minimise the amount of downtime your production workloads will experience. By using the only read replicas to read data, you can also reduce the load on the primary replica and ensure it is always available to handle writes.

You may need to configure your application to make use of separate read replica connection details, or configure your addon to work with multiple replicas.

#### Persistent storage in production: Learn more

- [Configure addons for high availability: Configure your addons to maximise availability.](databases-and-persistence.md#configure-addons-for-high-availability)
- [Configure your deployments for zero downtime: Configure your production workloads to run with high availability.](production-workloads.md#release-for-production-configure-your-deployments-for-zero-downtime)

### Persistent storage in production: Backup and restore your data

You can ensure that your data is securely backed up on Northflank by either running manual backups, or creating a backup schedule. You can create either native dump backups, which can also be downloaded, or take a disk snapshot of the addon storage. Native backups are not available for all types of addon.

Native backups will always back up the whole database which can require a large number of read operations for databases with more records, which can increase addon resource usage for some time. Native backup dumps can also be downloaded, so that you can back your data up to another location.

Disk snapshots initially save a copy of the entire addon storage, but subsequent backups only record changes since the last snapshot (changes will be propagated to the next backup if an older backup is deleted). This makes snapshots much faster than dump backups, and they can use less storage space than native backups. Snapshots can also be used to create new addons with the data pre-provisioned, but they cannot be downloaded.

### Persistent storage in production: Schedule backups

Scheduled backups are the best way to ensure your data is regularly saved.

You can create hourly, daily, and weekly backup schedules with different configurations to suit your needs. You could create an hourly disk snapshot backup schedule with a short retention time to be able to restore your data if you encounter an issue, and a weekly native backup schedule with a longer retention period to store data for regulatory purposes.

The retention time you select determines how long the backup will be kept on Northflank. A shorter retention time for hourly and daily backup schedule would make sense, as it reduces storage costs, and longer retention times can be used for weekly backups to ensure data is available in the long term.

### Persistent storage in production: Export backups

It is a good idea to export backups on a regular basis, whether that is to your own storage or a third-party storage service, for disaster recovery and to meet any legal and regulatory requirements you may be subject to.

You can manually download native backups from the backup page, or create a [job](run.md#run-an-image-once-or-on-a-schedule) which uses the [Northflank API](../api/introduction.md) to trigger a backup, and then automatically download the backup and transfer it to another storage service when it is completed.

### Persistent storage in production: Restore data

You can restore from native dump backups or disk snapshots created in the addon, or import dump backups to restore from.

Importing a dump allows you to migrate your data from another database, restore data from a different Northflank addon, or restore from a backup that you downloaded but is no longer available on Northflank after the retention period has expired.

#### Persistent storage in production: Learn more

- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)

### Persistent storage in production: Run a migration

You can run a migration, or perform other jobs on a database, by connecting either in the build stage, or by running your migration as a job or service.

If you want to connect to an addon in your build stage, you must use external connection details and publicly expose your addon, as builds are run on separate, dedicated infrastructure.

#### Persistent storage in production: Learn more

- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)
- [Link connection details to group: Use your database in your application by linking it to a secret group.](databases-and-persistence.md#connect-database-secrets-to-workloads)

### Persistent storage in production: Fork an addon

You can fork an existing addon to create a duplicate for development and testing purposes. For example, you may want to test a migration for a specific customer before running it in production, or test your application works with newer version of the addon.

You can create a fork of an addon that contains a disk snapshot backup when creating a new addon of the same type and version. Forking is only available for some addons.

#### Persistent storage in production: Learn more

- [Fork an addon: Fork an addon to create an exact duplicate of your existing database.](databases-and-persistence.md#fork-an-addon)

### Persistent storage in production: Upgrade an addon

Upgrades are fully managed by Northflank, and new versions of addons are regularly made available. You will receive a notification in the Northflank application if your addon can be upgraded, or if your current version is deprecated.

You should endeavour to keep your addon versions up to date as part of a regular maintenance schedule to make sure bugs and security vulnerabilities have been patched.

Northflank will always ensure there is a valid upgrade path from your current version to the latest available version, but addon versions cannot be downgraded. You can fork an addon before upgrading to ensure you can revert to a previous version.

#### Persistent storage in production: Learn more

- [Upgrade a database: Upgrade your database to a newer version with one click.](databases-and-persistence.md#upgrade-a-database)

### Persistent storage in production: Connect to an external service

You may choose to use an external service to manage your data, such as [MongoDB Atlas](https://www.mongodb.com/atlas), [Amazon RDS](https://aws.amazon.com/rds/), or [Upstash](https://upstash.com/), if you have existing relationships with these providers or require more features and database-specific support.

You can add the connection details for these external services to a secret group, or directly in the environment variable of your services and jobs, as you would for a Northflank addon.

You may be required to provide the IP address for your Northflank services to your external service provider. If you would like to discuss creating a static egress IP address for your team, contact [support@northflank.com](mailto:support@northflank.com).

### Persistent storage in production: Add a persistent volume

If no Northflank addons or external services are suitable for your needs you can create persistent volumes to attach to your service. Persistent volumes are not a recommended solution as they limit your service to 1 instance, meaning you cannot configure your application for zero downtime.

#### Persistent storage in production: Learn more

- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)

## Production operations

Source: https://northflank.com/docs/v1/application/production-workloads/production-operations.md

Once you’ve deployed your code to production, you can use Northflank’s observability tooling and autoscaling to monitor and grow your applications and microservices.

- Logs: access container logs in the application, via the CLI or API, or send to third-party log processors

- Metrics: view detailed metrics for individual containers, or combined metrics for all running containers for a resource

- Shell access: run commands or access an interactive terminal in your running containers

- Notifications: receive notifications for events via different integrations, and configure alerts for your infrastructure and spend

- Autoscaling: enable autoscaling for your services so they can respond to unexpected increases in demand

This guide will help you understand how to monitor and analyse your deployments and storage on Northflank, so you can choose the most suitable method for your project. Each topic provides links to in-depth documentation on the relevant features.

#### Production operations: Container view

You can click on a container for a service or job to view logs, metrics, health checks, and gain shell access.

Select the drop-down next to the container name to view another container, or select `all containers` to view logs and metrics from all containers for the service.

![A list of running and terminated containers in the Northflank application](https://assets.northflank.com/documentation/v1/application/use-northflank-in-production/production-operations/container-view.png)

### Production operations: Access container logs

Accessing and searching logs can be vital to ensure your code is running as expected, and to diagnose any issues.

You can click on a container for a service or job in the Northflank application to view logs for that container, or select `all containers` from the dropdown in the header to view combined logs from all containers for the service.

![Viewing build logs from a build in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/view-logs/build-logs.png)

Logs contain all messages produced by your code that output to `stdout` or `stderr` and can be searched using plain text or regex. By default logs are shown with live tailing, but you can also select a custom time range using the dropdown menu.

You can also live tail logs using the [Northflank CLI, or with the JavaScript Client](../api/log-tailing.md).

#### Production operations: Log sinks

You can configure log sinks to forward logs from your services and jobs to third-party aggregators or external storage. These tools can help you filter and analyse logs, store logs for regulatory purposes, and collect logs from different sources.

#### Production operations: Learn more

- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [Configure log sinks: Integrate third-party logging and observability services with Northflank.](observe.md#configure-log-sinks)

### Production operations: View container metrics

Metrics can help you interpret the performance of your code, and whether it needs to be optimised in certain aspects, or whether your infrastructure needs to be scaled up.

You can view metrics for an individual container or all your containers for a service in the Northflank application in the same way as logs. You can live tail metrics for a specified time period, or select a custom time range to view metrics from.

![Viewing metrics for all containers of a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/view-metrics/metrics-view.png)

You can also access metrics using the Northflank API.

#### Production operations: Learn more

- [View metrics: View detailed, real-time metrics from builds, deployments, and more.](observe.md#view-metrics)
- [Scale with Northflank: Increase the resources available to your workloads, and the number of running instances for a deployment.](scale.md#scale-on-northflank)
- [Networking: Configure public and private ports for your Northflank workloads, and add security with IP policies and basic authentication.](network.md#networking-on-northflank)

### Production operations: Access running containers

You can access running containers in the container view in the Northflank application using the `shell` view, which will create a new shell session in the selected container. Only running containers can be accessed, and a shell session can only be created in one specific container at a time.

You will gain full access to the file system in the container, and be able to access any files and run any programs or commands available in the build image.

You can also send commands to be executed in a container for a service using the [Northflank API or CLI, or start an interactive shell session in the CLI](../api/execute-command.md).

![Accessing a container shell in the Northflank application](https://assets.northflank.com/documentation/v1/application/run/access-running-containers-locally/shell-access-container.png)

#### Production operations: Learn more

- [Access running containers locally: Forward a deployment for local development and access it using the Northflank CLI.](run.md#access-running-containers-locally)
- [Execute commands in your workloads: Access the shell for your running workloads or send commands to execute using the UI, CLI, API, or JavaScript client.](../api/execute-command.md)

### Production operations: Receive notifications

You can create notification integrations to provide alerts to third-party services such as Slack and Discord, or to your own custom webhook endpoint. These integrations can alert you to various events that occur in your Northflank account, or in specific projects, such as the status of an addon backup or build (`started`, `succeeded`, `failed`, or `aborted`), or updates on a deployment’s status.

You can configure separate notification integrations to send messages about specific events and from specific projects to separate channels. You could configure a notification integration to send all alerts for a project to a specific endpoint (a project alerts Slack channel, for example), or send messages regarding all addon backup events to another channel. You could also create separate notification integrations for specific events in specific projects, for instance all job run notifications for one project might be sent to a dedicated Slack channel.

You can use the webhook endpoint to integrate with your existing services, or third party services, such as an SMS service to alert your on-call engineers if an infrastructure alert is triggered.

![Configuring infrastructure alerts in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/set-infrastructure-alerts/infrastructure-alerts-page.png)

#### Production operations: Infrastructure alerts

You can enable infrastructure alerts in a notification integration, which will be triggered by issues affecting your containers or volumes, either by project or across your entire account.

Infrastructure alerts can notify you when, for example, a service container is crashing, which may require intervention to restore your service, or when a database is reaching capacity, which may need to be scaled up to avoid failures.

You can configure the thresholds for infrastructure alerts being triggered in your account, which applies to alerts for all of your resources and all notification integrations. These thresholds ensure events which happen at a high frequency don’t spam your endpoints.

#### Production operations: Billing alerts

You can create billing alerts to notify you when your monthly account spend exceeds the given amount. You can create multiple billing alerts to help you keep track of your spend.

For example, if your average monthly usage is $1000, you might create alerts for $250, $500, $750, and $1000. This would help you track if your spend was as projected throughout the month and avoid any surprises, as you would expect to receive the $250 alert after the first week, the $500 alert the next, etc.

Billing alerts will be sent to your account’s invoice delivery addresses by email, and any notification integrations with billing alerts enabled.

#### Production operations: Learn more

- [Receive notifications: Create notification integrations to be alerted when selected events occur in your account.](observe.md#configure-notification-integrations)
- [Infrastructure alerts: Set infrastructure alerts to let you and your team know when there is an issue with your applications or addons.](observe.md#set-infrastructure-alerts)
- [Monitor spending: Monitor your current resource usage across services.](billing.md#monitor-spending)

### Production operations: Set up autoscaling

Autoscaling can help you reduce unnecessary spend on resources you aren't using, while also helping you make sure you can cover any increased activity, expected or not. Rather than trying to anticipate spikes in demand or running more instances than necessary, you can configure your deployments to respond to demand in real-time.

You can configure horizontal autoscaling for your deployments, which can increase or decrease the amount of instances for a service based on demand, from your service's resources page.

You can set your service to autoscale on CPU usage, memory usage, or both, and set the minimum and maximum number of instances that autoscaling will be allowed to scale the service to.

#### Production operations: Learn more

- [Enable autoscaling: Increase availability and reduce cost by automatically responding to changes in usage of your deployments.](scale.md#autoscale-deployments)
- [Scale with Northflank: Increase the resources available to your workloads, and the number of running instances for a deployment.](scale.md#scale-on-northflank)

### Production operations: Add health checks

Health checks make sure that your containers are healthy and ready to serve traffic before requests are routed to them, and that any containers that become unhealthy are replaced.

- Liveness probes ensure your running containers remain healthy. A liveness probe will check the given endpoint in intervals to ensure the response is ok. If a liveness probe fails, the failing container will be marked for termination and a new one will be deployed.

- Readiness probes test if a container is ready to receive traffic after initialisation. Until the check passes old containers will not be terminated, and no traffic will be directed to the new container. If the check fails the container will not serve traffic. Configure a liveness probe to replace containers that fail readiness probes.

- Startup probes stop other probes from running until they pass, and enable you to use a different command and different initial delays from your other probes.

You can monitor the status of health checks for individual containers from the container view, and identify any issues that may be causing your containers to crash or restart. Incorrectly configured probes can also cause otherwise healthy containers to be terminated.

![Viewing the status of health checks for a container in the Northflank application](https://assets.northflank.com/documentation/v1/application/use-northflank-in-production/release-for-production/container-health-checks.png)

#### Production operations: Learn more

- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [More about health checks: Health checks use Kubernetes probes to test containers. Learn more about them here.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

## Release for production

Source: https://northflank.com/docs/v1/application/production-workloads/release-for-production.md

After you have created your development environment on Northflank to build, deploy, and preview your applications and microservices, you can use the features explained in this guide to release production deployments smoothly and with zero downtime.

Northflank's features allow you to:

- Release quickly

- Deploy with zero downtime

- Add health checks to ensure requests are served only to healthy containers

- Run migrations and other jobs automatically

- Re-run previous releases easily

### Release for production: Release strategies

The right release strategy for your project depends on its complexity. Choose the approach that fits your needs:

#### Release for production: 1. Manual deployment

**Best for:** Single-service applications

Manually select a specific build or image to deploy. Best for projects with one or two resources.

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)

#### Release for production: 2. CI/CD

**Best for:** Smaller projects

Automatically build and deploy your latest commit using continuous integration and deployment. Set up path rules and commit message filters to control when builds trigger.

- [Manage CI/CD: Configure continuous integration and continuous delivery on your Northflank services.](release.md#manage-cicd)

#### Release for production: 3. Environments

**Best for:** All projects, especially complex releases

Create environments for each deployment stage and define workflows within each environment to automate your entire release process including backups, migrations, and multi-service deployments. Run manually, on Git push, or on a schedule.

- [Set up environments: Create environments to organize your release process by deployment stage.](release.md#set-up-environments)
- [Configure a release flow: Learn how to use the visual editor or code to configure a release flow.](release.md#configure-a-release-flow)
- [Set up a preview environment: Create templates in your pipelines to automatically generate temporary preview environments to view pull requests and branches.](release.md#set-up-a-preview-environment)

### Release for production: Manage your production environment

You can ensure your production environment has the correct environment variables and build arguments available using secret groups and tags.

Secret groups can contain connection details for addons, passwords, tokens, keys, and other sensitive data. You can also create configuration groups to manage non-sensitive data, and assign roles to your team members accordingly.

You can create groups that contain the relevant secrets for your different environments, and restrict them based on tag, or by specific resources.

Tags are a useful way to identify and manage resources in different environments. You can quickly add or remove multiple groups of secrets and configuration details from resources by adding and removing tags.

- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Tag your workloads and resources: Create tags to assign to your Northflank workloads and resources to help keep track of them.](release.md#tag-workloads-and-resources)

### Release for production: Run migrations during release

When you make changes to your database schema you may need to update your application and change your production database simultaneously. Workflows are the recommended approach, as they allow you to back up your database, run a migration, and deploy your new release only when the migration is successful.

- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)

### Release for production: Deploy with zero downtime

You can deploy your release with zero downtime by configuring health checks to ensure that your code is ready before traffic is served to it. Northflank handles deployments differently depending on how many instances your service has.

For single instance deployments, a new container will be started and the old one terminated when the new container is ready. For multiple instances, containers are replaced in a rolling redeployment.

In both cases, configure a readiness probe to ensure your application is initialised and ready to serve requests before traffic is routed to it.

- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)

#### Release for production: Upgrade databases with zero downtime

You can configure your addons for high availability, which allows you to update or scale them without losing access to your data.

- [Configure addons for high availability: Configure your addons to maximise availability.](databases-and-persistence.md#configure-addons-for-high-availability)

### Release for production: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
