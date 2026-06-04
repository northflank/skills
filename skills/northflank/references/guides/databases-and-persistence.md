# Databases And Persistence

Generated from 29 application pages listed in `llms.txt`.

## Pages

- [Access a database](#access-a-database)
- [Add a persistent volume](#add-a-persistent-volume)
- [Backup and clone volumes](#backup-and-clone-volumes)
- [Backup, restore, and import data](#backup-restore-and-import-data)
- [Configure addons for high availability](#configure-addons-for-high-availability)
- [Connect database secrets to workloads](#connect-database-secrets-to-workloads)
- [Create a custom addon type](#create-a-custom-addon-type)
- [Create a managed external addon](#create-a-managed-external-addon)
- [Database observability and monitoring](#database-observability-and-monitoring)
- [Deploy a database](#deploy-a-database)
- [Deploy MinIO® on Northflank](#deploy-minio®-on-northflank)
- [Deploy MongoDB® on Northflank](#deploy-mongodb®-on-northflank)
- [Deploy MySQL on Northflank](#deploy-mysql-on-northflank)
- [Deploy PostgreSQL on Northflank](#deploy-postgresql-on-northflank)
- [Deploy RabbitMQ on Northflank](#deploy-rabbitmq-on-northflank)
- [Deploy Redis® on Northflank](#deploy-redis®-on-northflank)
- [Fork an addon](#fork-an-addon)
- [Global backup](#global-backup)
- [Integrate MongoDB Atlas with Northflank](#integrate-mongodb-atlas-with-northflank)
- [Migrate your MinIO® deployment to Northflank](#migrate-your-minio®-deployment-to-northflank)
- [Migrate your MongoDB® database to Northflank](#migrate-your-mongodb®-database-to-northflank)
- [Migrate your MySQL database to Northflank](#migrate-your-mysql-database-to-northflank)
- [Migrate your PostgreSQL database to Northflank](#migrate-your-postgresql-database-to-northflank)
- [Migrate your RabbitMQ deployment to Northflank](#migrate-your-rabbitmq-deployment-to-northflank)
- [Migrate your Redis® deployment to Northflank](#migrate-your-redis®-deployment-to-northflank)
- [Migrate from RDS to Northflank](#migrate-from-rds-to-northflank)
- [Scale a database](#scale-a-database)
- [Stateful workloads on Northflank](#stateful-workloads-on-northflank)
- [Upgrade a database](#upgrade-a-database)

## Access a database

Source: https://northflank.com/docs/v1/application/databases-and-persistence/access-a-database.md

As well as using a database within your project, you can access it locally for development, and expose it publicly to make it available online.

By default, a database will be given an internal address and only be accessible from services and jobs within the same project. You will still be able to access it locally using [port forwarding](../api/forwarding.md) through the Northflank CLI.

![The network settings page for an addon in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/access-a-database/addon-network-page.png)

### Access a database: Deploy a database with TLS

You can choose to deploy with TLS on a database's network settings page. If enabled, the database will use TLS for all internal connections.

Some databases, such as MySQL, cannot enable or disable TLS after creation and will use the configuration they were created with.

Your deployments may require further configuration to connect to your database if TLS is enabled, the TLS status will be reflected in the connection detail secret `TLS_ENABLED` as a boolean.

### Access a database: Expose a database publicly

Databases can be publicly exposed by selecting publicly accessible on their network settings page. The database must be deployed with TLS enabled to expose it publicly.

Exposing a database will make it available online via a network load-balancer and a TCP endpoint secured with TLS, and new public connection strings will be available in connection details.

Some databases, such as MySQL, cannot enable or disable TLS after creation and will use the configuration they were created with.

### Access a database: Access a database locally

You can forward a database for local access using the [Northflank CLI](../api/use-the-cli.md).

Your database must be running in order to access it.

You can view and copy the command to connect to a specific database on its overview, in the local access section, or use the following commands:

- To forward a specific database:

`sudo northflank forward addon --projectId [project-name] --addonId [addon-name]`

- To forward all ports in a project:

`sudo northflank forward all --projectId [project-name]`
You can now connect to your database locally using the relevant connection strings or secrets from the connection details page.

> [!note]
> You may need to provide the URI in quotation marks if you are connecting via a shell command using an addon's URI connection string.

### Access a database: Set IP policy rules

You can set IP policies from the security rules section on a database's network settings page.

An IP policy restricts external ingress traffic to specific addresses specified in the policy. For example, a policy of `192.168.1.48` will only allow traffic originating from the IP address `192.168.1.48` and a policy of `192.168.1.0/24` will only allow traffic originating from IP addresses matching the subnet mask. If you have not set any IP policies all external ingress traffic will be allowed to attempt to connect to the database, if it is publicly exposed.

### Access a database: Access TLS certificates in containers

Your container's file system will likely already have root certificates for Certificate Authorities included, depending on the base image it was built with. You may need to provide this location via environment variable, or other configuration options, to your service or job to enable TLS connections with your Northflank addons.

You can check if your container's image contains the default certificate store by [opening a container's shell](run.md#access-running-containers-locally-execute-commands-in-a-container) and searching for `ISRG_Root_X1.pem` (Let's Encrypt root cert) or `ca-certificates.crt` in your container's CA path.

If the default certificate store is not present, or does not contain the required certificates, you can [download the Certificate Authority root cert](https://letsencrypt.org/certificates/) `isrgrootx1` and provide it as [a secret file](secure.md#upload-secret-files).

Alternatively, if your image includes a package manager, you can include an entrypoint or startup script that installs and updates the certificate store. For example:

| Base image | CA path | Update command |
| --- | --- | --- |
| Debian/Ubuntu | `/etc/ssl/certs` | `apt-get update && apt-get install -y ca-certificates && update-ca-certificates` |
| Alpine Linux | `/etc/ssl/certs` | `apk add --no-cache ca-certificates && update-ca-certificates` |
| RHEL/CentOS | `/etc/pki/tls/certs` | `yum install -y ca-certificates && update-ca-trust force-enable && update-ca-trust extract` |

### Access a database: Next steps

- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](../api/use-the-cli.md)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

## Add a persistent volume

Source: https://northflank.com/docs/v1/application/databases-and-persistence/add-a-volume.md

Volumes can be added to your deployment services to persist data across restarts. This can be useful if you require a storage solution other than the available [databases](databases-and-persistence.md#deploy-a-database). Volumes are highly configurable and can be moved between services.

### Add a persistent volume: Volume access modes

Volumes support two access modes that control how they can be attached to workloads:

| Access mode | Description | Use case |
| --- | --- | --- |
| Single Read/Write | Volume can be attached to one pod at a time | Default mode for most workloads |
| Multi Read/Write | Volume can be attached to multiple pods simultaneously | Shared storage across replicas, horizontal scaling, high availability |

#### Add a persistent volume: Single Read/Write

The default access mode. The volume can only be mounted by a single pod at a time. This means:

- Services are limited to 1 instance

- Cannot scale services horizontally (replicas > 1) with the same volume attached

- Cannot enable high availability for services using this volume

- Jobs with parallelism cannot use the same volume

- During restarts, the running container will always be terminated before the new one starts (regardless of health check settings)

Use this mode for:

- Database storage

- Application state that shouldn't be shared

- Workloads that don't require horizontal scaling

#### Add a persistent volume: Multi Read/Write

Allows the same volume to be attached to multiple pods simultaneously across different services, jobs, or replicas of the same service.

Use this mode for:

- Shared file storage across multiple replicas

- Horizontally scaled applications that need access to the same files

- High availability setups where multiple pods need the same volume

- Jobs with parallelism that share data

**Example:** A web application with 3 replicas sharing uploaded files:

1. Create a volume with Multi Read/Write access mode

2. Attach the volume to your service

3. Scale the service to 3 replicas

4. All 3 pods can read and write to the same volume

#### Add a persistent volume: Setting the access mode

The access mode is selected when creating a volume. It cannot be changed after the volume is created. To change modes, you must create a new volume and migrate your data.

#### Add a persistent volume: Performance considerations

**Multi Read/Write volumes:**

- May have different performance characteristics than Single Read/Write

- Concurrent writes from multiple pods require application-level coordination

- Not suitable for databases or applications expecting exclusive write access

**Single Read/Write volumes:**

- Typically offer better performance for single-pod workloads

- No coordination overhead

- Recommended for most use cases unless sharing is required

### Add a persistent volume: Create a persistent volume

You can create a volume on the volumes page of a [combined or deployment service](run.md#run-containers-and-micro-services-on-northflank). Select add volume, choose a name, select the **access mode**, and select the size of the volume to create. Volume storage cannot be scaled down after creation.

You must add at least one [container mount path](databases-and-persistence.md#add-a-persistent-volume-volume-mount-configuration), and optionally a [volume mount path](databases-and-persistence.md#add-a-persistent-volume-volume-mount-configuration).

You can attach multiple volumes to the same service.

![Configuring a persistent volume in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/add-a-volume/edit-volume.png)

### Add a persistent volume: Volume mount configuration

You can add multiple mount rules for each volume to determine how the volume is mounted and accessed.

#### Add a persistent volume: Container mount path

The container mount path allows you to specify where to make the volume available in the running container for a service. Anything your application reads and writes to the path will be written or read from the volume.

For example, using the path `/data` means any files in `/data` or subdirectories of `/data` will be written to or read from the volume. The container mount path is absolute, and must start from the container root (`/`).

#### Add a persistent volume: Volume mount path

The volume mount path is optional and allows you to specify a directory on the volume to mount, rather than the volume root. The volume mount path is relative, and cannot start from root (`/`).

You can use this to persist data in multiple directories in a service on the same volume. Any data written or read from the container mount path will be written or read to the volume mount path.

| Container mount path | Volume mount path | Volume directory used | Result |
| --- | --- | --- | --- |
| `/data` | - | `/` | The whole volume is mounted to the container path `/data` |
| `/data/config` | `config` | `config` | The volume directory `config` is mounted to the container path `/data/config` |
| `/data/logs` | `logs` | `logs` | The volume directory `logs` is mounted to the container path `/data/logs` |

### Add a persistent volume: Permissions

Ownership of persistent volumes will be given to the group specified in the Docker image, determined at build time. This may cause issues if your application attempts to read, write, or execute with a different user. You can designate the user and group the image will use in your Dockerfile with the command `USER <user>:<group>`.

To avoid permissions issues and to not overwrite any existing data from the image you should mount the volume only to the specific path(s) you require. For example if you mount a volume to `/app/data` your application may try to write data to that path and encounter permission errors, which may crash your application. If, in this case, you only need to persist data written to `/app/data/logs`, you should mount to that specific path instead. You can use [volume mount paths](databases-and-persistence.md#add-a-persistent-volume-volume-mount-configuration) to mount to multiple paths using the same volume.

If you are experiencing application issues with permissions, you can include a script as part of your application startup to run the `chown` command and change the directory to the required ownership and permissions: `chown -R <user>:<group> /<container-mount-path>`.

Alternatively you can set a [custom entrypoint and command](run.md#override-command-or-entrypoint) for the deployment, with the entrypoint as `bash -c` and the command as `"chown -R <user>:<group> /<container-mount-path> && <default startup command>"`

### Add a persistent volume: Scale a volume

To scale an attached volume, navigate to the volumes page of the service that has the volume attached. To scale a detached volume, navigate to any service's volumes page.

Select edit volume  and open the storage dropdown to resize the volume. Volume storage cannot be scaled down.

### Add a persistent volume: Move or delete a volume

Volumes can be detached  on the volumes page of the service they are currently linked to. Detaching a volume will redeploy any running containers in the service.

A volume must be detached from its current service before being attached to another. Attach a volume to another service by navigating to the detached section on the volumes page of the service you want to link it to and select  on the volume to attach. Attaching a volume will redeploy any running containers in the service.

Volumes can be deleted by first detaching them, and then selecting delete .

### Add a persistent volume: Transfer data to and from a volume

You can transfer data to and from a persistent volume when it is mounted to a running service using commands like curl or wget. See [transfer data to and from containers](run.md#transfer-data-to-and-from-containers) for more detail.

### Add a persistent volume: Next steps

- [Deploy a database: Create a database to use with your Northflank deployments.](databases-and-persistence.md#deploy-a-database)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Transfer data to and from containers: Download data from, or to, ephemeral or persistent storage in your running containers.](run.md#transfer-data-to-and-from-containers)

## Backup and clone volumes

Source: https://northflank.com/docs/v1/application/databases-and-persistence/backup-and-clone-volumes.md

Volume backups allow you to create point-in-time snapshots of your persistent volumes. You can restore these backups to new volumes or clone existing volumes for testing and development.

### Backup and clone volumes: Creating volume backups

Volume backups create snapshots of your volume at a specific point in time.

#### Backup and clone volumes: Manual backups

To create a manual backup:

1. Navigate to your project

2. Click **Volumes** and select the volume you want to backup

3. Open the **Backups** tab

4. Click **Create backup**

5. (Optional) Provide a description for the backup

6. Click **Create**

The backup will be created and appear in the backups list.

### Backup and clone volumes: Cloning volumes

Cloning creates a new volume from an existing volume or backup. This is useful for:

- Creating test environments with production data

- Duplicating volumes across projects

- Recovering from volume corruption

#### Backup and clone volumes: Clone from an existing volume

To clone a volume:

1. Navigate to **Volumes** in your project

2. Click **Create volume**

3. In the **Configuration** section, select **From source**

4. Configure the source:

  - **Source type**: Select **Existing volume**

  - **Volume to clone**: Select the volume to clone

5. Configure the new volume:

  - **Access mode**: Choose Single Read/Write or Multi Read/Write

  - **Storage type**: Select your preferred storage type

  - **Storage**: Must be equal to or larger than source volume

  - **Container mount path**: Specify where to mount the volume in containers

6. In the **Resources** section, select the service you want to attach it to

7. Click **Create volume**

The new volume will be created with data from the source volume.

#### Backup and clone volumes: Restore from backup

To create a volume from a backup:

1. Navigate to **Volumes** in your project

2. Click **Create volume**

3. In the **Configuration** section, select **From source**

4. Configure the source:

  - **Source type**: Select **From backup**

  - **Source backup**: Select the backup to restore from

5. Configure the new volume:

  - **Access mode**: Choose **Single Read/Write** or **Multi Read/Write**

  - **Storage type**: Select **SSD** (or your preferred storage type)

  - **Storage**: Set size (must be equal to or larger than backup size)

  - **Container mount path**: Specify where to mount the volume (e.g., `/mydata`)

6. Complete any additional configuration (resources, tags, etc.)

7. Click **Create volume**

The new volume will be created with data from the backup.

### Backup and clone volumes: Use cases

#### Backup and clone volumes: Development and testing

Clone production volumes to create staging or development environments with realistic data:

1. Create a backup of the production volume

2. Restore the backup to a new volume in your staging project

3. Attach the cloned volume to your staging services

4. Test with production-like data without affecting production

#### Backup and clone volumes: Disaster recovery

Regular backups enable quick recovery from data corruption or accidental deletion:

1. Create regular manual backups of critical volumes

2. If data is corrupted, restore from the most recent backup

3. Attach the restored volume to your services

### Backup and clone volumes: Best practices

**Backup frequency:**

- Production volumes: Daily or more frequent

- Development volumes: Weekly or on-demand

- Critical data: Create backups before major changes

**Testing restores:**

- Regularly test backup restoration to verify data integrity

- Create test volumes from backups to ensure they're usable

- Document restoration procedures

**Monitoring:**

- Track backup creation success

- Monitor backup size growth

- Document backup schedules and procedures

### Backup and clone volumes: Limitations

- Backups are point-in-time snapshots and may not capture in-flight writes

- Restoration time depends on volume size

- Cloned volumes must be equal to or larger than the source

- Backups must be created manually (scheduled backups not currently supported)

### Backup and clone volumes: Next steps

- [Deploy a database: Create a database to use with your Northflank deployments.](databases-and-persistence.md#deploy-a-database)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Transfer data to and from containers: Download data from, or to, ephemeral or persistent storage in your running containers.](run.md#transfer-data-to-and-from-containers)

## Backup, restore, and import data

Source: https://northflank.com/docs/v1/application/databases-and-persistence/backup-restore-and-import-data.md

You can create, import, and delete backups of your database or addon from the backups page, as well as restore your database or addon from an existing backup.

You can also use backups to [fork an existing addon]().

### Backup, restore, and import data: Types of backup

#### Backup, restore, and import data: Snapshot (disk backup)

Snapshots save the state of the whole volume. Each new snapshot you create will only store the differences from the previous snapshot.

Snapshots are the best method for regular backups as the incremental way of storing backup data is highly efficient and uses a minimal amount of storage space.

Snapshots cannot be downloaded and do not support logging.

#### Backup, restore, and import data: Dump (native backup)

Creates a text dump of the full existing database and stores it in a compressed file. Native backups are [not available for all databases](databases-and-persistence.md#deploy-a-database).

You can select either [gzip](https://www.gnu.org/software/gzip/) or [Zstandard](https://facebook.github.io/zstd/) compression when creating the dump.

Dumps can be downloaded, and logs can be viewed for backups and restores.

![Logs for a dump backup of a MongoDB addon in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/backup-restore-and-import-data/addon-backup-logs.png)

### Backup, restore, and import data: Schedule backups

You can configure up to three separate backup schedules for each database or addon.

You can create one hourly, one daily, and one weekly schedule to meet your operational and legal requirements.

#### Backup, restore, and import data: Create a schedule

You can add schedule from the backups schedule page on an addon to begin configuring a new backup schedule. You can also add a backup schedule to a new addon on creation.

Choose the backup type, and how often to run the backup: hourly, daily, or weekly.

![Adding scheduled backups for an addon in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/backup-restore-and-import-data/addon-scheduled-backups.png)

You can configure each schedule by minute, hour, and day. Your schedule will then run the backup at the selected times, per the schedule frequency (hourly, daily, or weekly).

- Retention time defines how many days a backup will be stored for.

- If any backup schedules overlap, only one backup will be created at the overlapping time.

- After creating a schedule you will only be able to edit the retention period. To change any other settings, delete the current schedule and create a new one.

- Schedules can produce a maximum of 500 backups before any expire, you will be unable to create schedules that would produce more than this.

#### Backup, restore, and import data: Backups from schedule

Backups created by schedule are available on the [backups page](databases-and-persistence.md#backup-restore-and-import-data-restore-from-a-backup) for the database or addon, and detail the schedule they were created by. You can click on an individual backup to see more details and select  retain backup forever to override the schedule's retention policy.

### Backup, restore, and import data: Create a manual backup

You can manually create a new backup from the backups page on a running database or addon. Choose the backup type and it will be immediately scheduled for creation. Check the entry on the backups page to view its status.

### Backup, restore, and import data: Import a backup

You can import a backup from a file or directly from another running database. Once imported you can [restore](databases-and-persistence.md#backup-restore-and-import-data-restore-from-a-backup) from the imported backup.

#### Backup, restore, and import data: URL or file upload

You can restore a database from a file by providing the URL to the hosted file, for example `https://yourdomain.com/backups/data.db.gz`, or uploading a file. If the file ends in `.gz` or `.zst` Northflank will attempt to unzip it, otherwise it will be treated as clear text. Northflank will copy the imported file, which will be used as a source when restoring the backup.

Please note that when you restore from this kind of import:

- All existing user databases will be removed. The default admin and access users and system databases will not be affected.

- All databases from the backup source will be imported

- The default admin and access users will have full access to the imported database. If these users have been deleted they will be recreated before restoring.

- If the source includes user manipulation commands (create user, grant permissions), they will be executed unless they grant too many rights

#### Backup, restore, and import data: Connection string

You can restore or import from another database by providing a connection string with relevant credentials and parameters. Northflank will create a dump from the source database which you can then restore from. You can choose the type of compression to use when Northflank creates a dump of the live database.

You can download the created dump after it has been imported, in whichever compression format you selected to create it.

Please note that when you restore from this kind of import:

- All existing user databases will be removed. The default admin and access users and system databases will not be affected.

- All databases, except users, from the backup source will be imported (depending on the access of the specified user when importing by connection string)

- The default admin and access users will have full access to the imported database. If these users have been deleted they will be recreated before restoring.

| Database | Connection string syntax example |
| --- | --- |
| MongoDB | `mongodb://user:password@mongodb0.yourdomain.com:port` |
| MySQL (using JDBC) | `jdbc:mysql://user:password@yourdomain.com:port` |
| PostgreSQL | `postgresql://user:password@yourdomain.com:port` |

### Backup, restore, and import data: Restore from a backup

You can restore your database or addon from a specific backup on the backups page. Select  restore backup to immediately schedule a restoration.

Each listed backup displays the following information:

| Column | Explanation |
| --- | --- |
| Name | Backup name, usually automatically generated |
| Source | Indicates whether the backup was created on Northflank or imported, and if it's a disk or native backup |
| Status | Displays the date the backup was completed, or the status if it is in-progress |
| Schedule | Indicates which schedule created the backup, if any. If created by overlapping schedules, it will list all applicable. |
| Size | The size of the backup. May not be displayed if the backup is too small. |
| Restore status | Indicates if a restore has been scheduled from the backup, is in progress, or is complete |
| Created | The date and time the backup was scheduled for creation |

You can click on the entry in the list to view the backup logs, restore history, and abort scheduled restorations. Each backup has the following available actions:

| Button | Action |
| --- | --- |
|  | Download the backup as a gzip (`.gz`) or ZStandard (`.zst`) archive file. Only available for native (dump) backups. |
|  | Restore from this backup. The restore will be immediately scheduled and executed as soon as possible. |
|  | Override the retention policy of the schedule and keep the backup forever. Only available for backups created by a schedule |
|  | Delete the backup from Northflank. |

### Backup, restore, and import data: Reset an addon

You can reset an addon from the billing page. Resetting an addon will erase all the data, and restore it to the state of a newly-provisioned addon. If you reset an addon that was created by [forking an existing addon](databases-and-persistence.md#fork-an-addon), the backup must still be available to restore from.

This can be used to reset the addon's data while retaining the same [connection details](databases-and-persistence.md#connect-database-secrets-to-workloads) used in any environment variables, secret groups, or to connect locally.

### Backup, restore, and import data: Next steps

- [Upgrade a database: Upgrade your database to a newer version with one click.](databases-and-persistence.md#upgrade-a-database)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

## Configure addons for high availability

Source: https://northflank.com/docs/v1/application/databases-and-persistence/configure-addons-for-high-availability.md

Northflank implements several features to ensure high availability (HA) of your [addons](databases-and-persistence.md#stateful-workloads-on-northflank) in the event a replica becomes unavailable. You can configure both your addon and your application to maximise your uptime.

#### Configure addons for high availability: Multiple replicas

You can scale addons on Northflank to deploy multiple replicas. Deploying multiple replicas helps you ensure that your data will be accessible even if the primary replica is inaccessible.

An addon with multiple replicas either consists of:

- a primary read-write replica with secondary read replicas that maintain a copy of the data on the primary replica. Primary replicas can handle any read-write connections, while read-only replicas can only handle read connections.

- a sharded distribution, where data is replicated across multiple replicas, but each replica may not contain the full dataset

How an addon manages additional replicas, and replica failures, depends on the type of addon deployed. With automated failover, a secondary replica will be promoted to a primary using a failure detection mechanism. This means that after a primary failure, writes are typically available again within less than 30 seconds. For addons which don’t support automated failover, it can take several minutes until the primary replica is restarted and available again. In the severe case of a complete failure of the primary replica (such as disk failure) write downtime can be longer as the primary needs to be recovered manually.

| Addon | Replication strategy | Failover strategy |
| --- | --- | --- |
| PostgreSQL | Primary-secondary | Automated failover: a read replica is promoted to primary |
| MongoDB® | Primary-secondary | Automated failover: a read replica is promoted to primary |
| MySQL | Primary-secondary | Read-only: writes unavailable until primary replica is replaced |
| MySQL (InnoDB Cluster) | Group Replication | Automated failover: Group Replication elects a new primary |
| Redis® | Primary-secondary | Read-only: writes unavailable until primary replica is replaced OR Automated failover if deployed with Sentinel |
| MinIO® | Sharding | Damaged data is restored using healthy shards, failing replicas will be replaced |
| RabbitMQ (quorum queue) | Primary-secondary | Automated failover: a queue follower is promoted to leader |
| RabbitMQ (streams) | Sharding | Streams are available as long as a quorum of replicas is available, failing replicas will be replaced |

#### Configure addons for high availability: Read-only connection strings

Some addons provide separate read-only connection strings. You can configure your application to use separate connection strings for read operations, which will allow your application to still read data when write requests cannot be processed.

Methods to set up your application to use an addon with high-availability vary depending on which client you use in your application. You could, for example, implement separate read and write clients and select the appropriate client depending on your query. Alternatively, you could use the connection string containing both primary and read replicas, and fall back to a read-only client if a read fails. Consider the importance of write operations for your application and plan how to gracefully handle unavailability.

If your application is read-intensive, it is best to use read-only connection strings to keep the primary replica free for write operations.

You can read specific information below on how to use read-only connection strings for each type of addon.

#### Configure addons for high availability: Upgrades and maintenance

[Major upgrades](databases-and-persistence.md#upgrade-a-database) can cause some downtime for an addon, but can also potentially introduce breaking changes between your addon and your application.

For major upgrades we recommend [forking your addon](databases-and-persistence.md#fork-an-addon), upgrade the forked addon, and then connecting a development version of your application to the upgraded addon. This allows you to test and verify proper functionality before running the upgrade on your production addon.

Having a [snapshot](databases-and-persistence.md#backup-restore-and-import-data-types-of-backup) of your data before running a major upgrade also allows you to create a forked addon of the previous version, if you find that you need to revert to the older version.

#### Configure addons for high availability: Deploy with zonal redundancy

Your addon will be deployed to your [project's region](run.md#deploy-to-a-region). Each region may have multiple availability zones, which are data centers with independent infrastructure such as networking, power supply and cooling within the region. Some regions, however, do not have more than one availability zone.

Normally your addon replicas will be provisioned in the same availability zone, but you can enable zonal redundancy to provision replicas across multiple availability zones.

This will ensure that your addon remains available in the event that one zone fails, however networking between replicas in different zones will be slightly slower compared to replicas provisioned in the same availability zone. Replicas will be bound to the zone they are deployed in.

### Configure addons for high availability: PostgreSQL

Northflank's PostgreSQL addon offers automated failover to replace failed primary replicas and the option to add connection poolers.

##### Configure addons for high availability: Automated failover

Northflank uses [Patroni](https://github.com/zalando/patroni) for automated PostgreSQL failover. If a primary replica becomes unavailable due to a failure or scheduled maintenance, a read replica will be promoted to primary, allowing read-write operations to continue. The old primary replica will become a new read replica when it is restarted.

The addon provides two connection strings, a primary for read/write operations, and a secondary that directs to read replicas for read-only operations.

##### Configure addons for high availability: Connection pooler

Northflank uses [PgBouncer](https://www.pgbouncer.org/) to provider connection poolers for PostgreSQL addons. You can enable connection poolers to improve performance for workloads which frequently create large numbers of database connections. Opening a connection is a relatively resource-intensive action and a pooler can reduce this overhead by keeping a pool of reusable connections open.

For high-availability applications you should deploy at least 2 connection pooler instances per type of connection to provide redundancy in the event that one pooler instance becomes unavailable.

You can add connection poolers to a PostgreSQL addon by configuring them under advanced resource options during creation, or on the resources page for an existing addon. You can configure primary and read connection poolers separately, so you can deploy more of one type depending on whether your application will be more read or write intensive.

![Connection poolers deployed for a PostgreSQL addon in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/configure-addons-for-high-availability/postgressql-connection-poolers.png)

Northflank will automatically begin routing connections through a pooler when they become available, using the same connection details as before.

Using the connection pooler also increases the maximum number of connections, limited by the amount of memory available:

| Memory available | Maximum connections |
| --- | --- |
| 256MB | 64 |
| 512MB | 96 |
| 1024MB | 124 |
| 2048MB | 256 |
| 4096MB | 1024 |
| 8192MB | 2048 |
| 16384MB | 4096 |
| 32768MB | 8192 |
| 65536MB | 16384 |

### Configure addons for high availability: MongoDB

You can scale MongoDB to multiple replicas. The primary replica will handle read/write operations, and secondary replicas will replicate all operations on the primary to maintain an identical data set. If a primary replica fails, a secondary replica will automatically be promoted to primary.

You can configure your [read preference](https://www.mongodb.com/docs/manual/core/read-preference/) in your MongoDB client to favour the primary replica or secondary replicas for read operations. Setting your preference to `secondaryPreferred`, for example, would first attempt to read from secondary replicas and fall back to the primary, which would reduce load on the primary replica and free it up for write operations.

### Configure addons for high availability: MySQL

#### Configure addons for high availability: Standard MySQL

When you scale a MySQL addon, new read replicas of the database are added. New read replica secrets are also added to the connection details for the addon. The read replica connection is added to each connection string, as well as a separate `HOST_READ` secret.

In the event a primary replica becomes unavailable, writes will be blocked and only read operations will be available. Write operations will resume when the primary replica becomes available again.

You can configure your application to make use of the read replica connections to ensure your application can still read data during primary unavailability — for example, by implementing a separate read connection for read-only operations, or falling back to a read-only connection if the primary becomes unavailable.

#### Configure addons for high availability: MySQL HA (InnoDB Cluster)

Northflank's MySQL HA addon provides automated failover and high availability using [MySQL Group Replication](https://dev.mysql.com/doc/refman/9.6/en/group-replication.html) and [MySQL Router](https://dev.mysql.com/doc/refman/9.6/en/mysql-router.html).

##### Configure addons for high availability: Architecture

InnoDB Cluster deploys three nodes in a single-writer, multi-reader configuration. MySQL Router is included and runs transparently — your application connects using the same connection string as a standard MySQL addon, and the Router directs writes to the current primary and distributes reads across all nodes. A separate `HOST_READ` secret is also available if you want to direct read-only traffic explicitly.

Enabling InnoDB Cluster is a toggle at addon creation time and cannot be changed after creation.

##### Configure addons for high availability: Requirements

MySQL Group Replication has schema requirements that must be met for replication to function correctly. The most important requirement is that **every table must have a primary key**. Review the full list of [Group Replication requirements](https://dev.mysql.com/doc/refman/9.6/en/group-replication-requirements.html) before migrating existing data or creating new schemas.

##### Configure addons for high availability: MySQL Router connection pooling

MySQL Router maintains a persistent pool of backend connections, which reduces the overhead of establishing new connections for each client request. This has practical advantages over connecting directly through a Kubernetes service:

- **Reduced connection overhead** — Router reuses backend connections across multiple client connections, reducing TCP and authentication handshake costs at scale.

- **Connection limiting** — Router caps backend connections independently of how many clients connect, protecting MySQL nodes from connection storms during traffic spikes.

- **Faster failover recovery** — On primary election, Router detects the topology change and reroutes connections faster than waiting for the Kubernetes service label reconciliation loop, reducing the disruption window visible to your application.

In routerless mode, you give up these benefits in exchange for direct node access — the Kubernetes service still handles failover via label updates, but there is no connection pooling or topology-aware rerouting at the proxy layer.

##### Configure addons for high availability: Routerless mode

You can disable the Router to run in routerless mode, where your application connects directly to the primary node via a Kubernetes service. This can be changed on an existing InnoDB Cluster addon at any time.

In routerless mode:

- The connection string points to the primary or read-only node via a Kubernetes service.

- On failover, Group Replication still elects a new primary automatically. The Kubernetes service updates to point to the new primary, so connections resume without manual intervention after a brief transition period.

Routerless mode is suitable for workloads that require direct database access or cannot use an intermediary proxy.

##### Configure addons for high availability: Automated failover

If the primary node becomes unavailable, Group Replication automatically elects a new primary from the remaining nodes. Read and write operations continue without application-level intervention. After a defined period, the cluster automatically fails back to the preferred primary node (replica-0) with proper connection draining to avoid disruption.

##### Configure addons for high availability: Quorum loss recovery

If two or more nodes fail simultaneously, the cluster loses quorum and enters read-only protection mode to prevent split-brain scenarios. Northflank has automatic quorum recovery in place, which triggers after a delay (default: 2 minutes) to distinguish a genuine quorum loss from a transient network issue before attempting recovery.

##### Configure addons for high availability: Node rejoin

When a failed or replaced node comes back online, it automatically attempts to rejoin the cluster. Group Replication uses incremental recovery (replaying missed transactions from the binary log) or a full clone if the node has fallen too far behind. No manual intervention is required under normal conditions.

### Configure addons for high availability: Redis

When you scale a Redis addon, new read replicas of the database are added. New read replica secrets are also added to the connection details for the addon.

A `REDIS_SLAVE_URL` is added to the connection details, to connect to the read replicas, and the `REDIS_MASTER_URL` remains unchanged.

In the event a primary replica becomes unavailable writes will be blocked, and only read operations will be available. Write operations will be available when the primary replica becomes available again, within 1-2 minutes.

#### Configure addons for high availability: Redis Sentinel

##### Configure addons for high availability: Deploy Redis with Sentinel

When you create a Redis addon you can enable Sentinel, which will trigger automated failover in case of an instance failure.

An additional Sentinel process will be deployed with each of your Redis instances to monitor their health. This requires a minimum of 3 Redis replicas to be deployed in order to reach consensus. The Sentinel processes will also incur compute costs, which can be seen in the cost breakdown in resources.

Sentinel can only be enabled on addon creation, and cannot be disabled after creation. To use Sentinel with an existing Redis addon, you can [create a fork](databases-and-persistence.md#fork-an-addon) from an existing Redis addon, or [use another migration strategy](databases-and-persistence.md#migrate-your-redis®-deployment-to-northflank) and configure your application to use the new addon.

##### Configure addons for high availability: Use Redis Sentinel

Deploying Redis with Sentinel will remove the `MASTER` and `SLAVE` connection details. You should use the `HOST_SENTINEL` and `PORT_SENTINEL` details to connect instead. The [client library](https://redis.io/resources/libraries/) you use to access Redis in your application will need to support Sentinel.

If your application is read-heavy you can configure your Redis client to prioritise read replicas, or load-balance across all replicas, for read connections.

You can use [CLI commands and the Sentinel API](https://redis.io/docs/management/sentinel/#sentinel-api) to monitor your Redis instances. The `SENTINEL_GET_MASTER_COMMAND` CLI command will fetch the current Redis master, and should be used if you require a write connection.

### Configure addons for high availability: MinIO

To ensure high-availability access you must create your MinIO addon with multiple replicas, as it cannot be horizontally scaled afterwards. You do not need to configure any special handling in your application, and MinIO will use an [erasure coding algorithm](https://min.io/docs/minio/linux/operations/concepts/erasure-coding.html) to continue read/write operations even when half the configured replicas are unavailable.

### Configure addons for high availability: RabbitMQ

RabbitMQ addons have two options for configuring high-availability: quorum queues and streams.

##### Configure addons for high availability: Quorum queues

If you scale RabbitMQ to multiple replicas you can configure it to use a [quorum queue](https://www.rabbitmq.com/quorum-queues.html), a durable, replicated, first-in-first-out queue, rather than the classic queue type. This ensures your RabbitMQ addon will be highly available and fault-tolerant.

You can create a quorum queue by creating a queue with the type `quorum`, which requires the RabbitMQ addon to be scaled to three or more replicas (odd numbers of replicas are best for quorum queues). One of the replicas will be the queue leader, and if the queue leader becomes unavailable, another replica will be selected as the leader. When a replica comes back online it will resynchronise with the leader, which does not affect the queue's availability.

##### Configure addons for high availability: Streams

[Streams](https://www.rabbitmq.com/streams.html) are an alternative option to quorum queues, and are more suitable for use-cases which require replicated, persistent messages.

You can declare a stream by setting the queue type to `stream`, however you will need to contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) to enable the stream plugin first.

### Configure addons for high availability: Next steps

- [Upgrade a database: Upgrade your database to a newer version with one click.](databases-and-persistence.md#upgrade-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)

## Connect database secrets to workloads

Source: https://northflank.com/docs/v1/application/databases-and-persistence/connect-database-secrets-to-workloads.md

Databases can be accessed and used by services within the same project.

The way you connect to your database will depend on the implementation in your application or service. Your deployment should be configured to receive connection details from [runtime variables](secure.md#inject-secrets-runtime-variables).

Open the connection details page in your database to view the relevant connection strings and secrets, which you can use to connect to the database from your deployments. You can either add these manually to a specific deployment or secret group, or link the variables to a secret group.

You should not use the administration connection string or administrator account to connect from your deployments, unless deploying a secured administration interface.

### Connect database secrets to workloads: Link database secrets to a secret group

You can link a database to a secret group so that the desired secrets are inherited as variables within that secret group. These secrets can then be used in any services and jobs that inherit from that secret group.

> [!note]
> [Click here](https://app.northflank.com/s/project/create/secret) to create a secret group.
You can select the suggested variables to automatically include the most useful and commonly used connection details, or manually select which variables to include.

Variables names are generated using the database name and connection detail, e.g. `NF_MY-DATABASE_HOST`. If your application is expecting certain variable names you can give aliases to the variables, for example adding `DB_HOST` and `ENV_DB_HOST` as aliases to `NF_MY-DATABASE_HOST` means that the variable can be accessed by all three of the aliases in the environment.

After linking the variables they will be available in any service or job in the project that inherits from that secret group.

![Linking an addon's connection details to a secret group in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/connect-database-secrets-to-workloads/link-addon-to-secret-group.png)

#### Connect database secrets to workloads: Link an addon to a secret group

From an addon or secret group creation form, expand the list of addons or secret groups and select configure. You can select suggested to automatically select the most commonly-used secrets from the addon to configure, or manually select the secrets to include.

Secrets will be added to the group with the default alias, and you can include your own aliases where your Dockerfile or application expects a different key to access the build argument or runtime environment variable.

Alternatively, you can link an existing addon to a secret group from the addon's connection details page, or from an existing secret group's linked addons page, and then configure the linked variables.

Linked variables can be added or edited from the linked addons page of a secret group, or the addon can be unlinked entirely.

### Connect database secrets to workloads: Access a database in a build

If you need to connect to an addon during the build process you will need to ensure that your secret group can be [inherited by build services](secure.md#manage-secret-groups-secret-group-type). As builds run on separate, dedicated infrastructure from your project, your addon must be publicly exposed, and the service or job you are using to build must inherit [external connection details](databases-and-persistence.md#access-a-database-expose-a-database-publicly).

### Connect database secrets to workloads: Next steps

- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Expose a database with TLS: Secure internal database connections or expose it publicly with TLS.](databases-and-persistence.md#access-a-database)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

## Create a custom addon type

Source: https://northflank.com/docs/v1/application/databases-and-persistence/create-a-custom-addon-type.md

You can create custom addon types for your team to deploy, using Helm charts. These custom types allow you to deploy databases and other applications which Northflank does not currently offer as a managed service, or custom configurations of addons that Northflank does offer.

> [!note]
> Custom addons can only be deployed into [clusters in your own cloud account](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank), and not in the Northflank managed cloud.

> [!note]
> [Click here](https://app.northflank.com/s/account/addon-types) to view your custom addon types.

### Create a custom addon type: Create a custom addon type

You can create a new custom addon type on the addon types page in your team dashboard. To create a custom addon type you must have a Helm chart bundle, as well as any values the Helm chart may require. You can create your own Helm chart, or use a [published Helm chart](https://artifacthub.io/) for the application you want to deploy.

#### Create a custom addon type: Create your Helm chart bundle

A Helm chart bundle can consist of your Helm chart, any values required by your chart, templates, and CRDs. You can [create your own charts](https://helm.sh/docs/topics/charts/), download them from a library such as [Artifact Hub](https://artifacthub.io/), or fetch charts using [Helm pull](https://helm.sh/docs/helm/helm_pull/).

You can create your bundle by navigating to your chart directory in your shell and running `helm package <application-name>`, or using your preferred compression or archiving tool for example `gzip -r chart-directory`. Northflank supports most compression and archive types.

#### Create a custom addon type: Upload your bundle

Click create addon type on your addon types page in the Northflank team you want to make the application available to. Drag and drop your bundle into the form, or click to select the file to upload. Northflank will run a basic check to ensure it is a valid Helm chart, and to fetch basic metadata.

#### Create a custom addon type: Values override

You can provide any values required by the Helm chart as JSON in the Helm values override field. The values provided at this point are only used to validate the Helm chart, and will need to be supplied when an instance of the addon type is deployed.

After uploading and validating your Helm chart bundle, you can configure the rest of the settings for the custom addon.

### Create a custom addon type: Configure a custom addon type

You can set the basic details for the custom addon type such as the display name, a description of the addon type, and the color. The ID for the addon type comes from the `name` value in the `Chart.yaml` from your uploaded bundle. Your custom addon type will be saved as a draft if you exit configuration, you can return to edit and create it later.

#### Create a custom addon type: Addon type scope

Addon types can be scoped to individual projects, or your entire cluster.

Project-scoped addon types can only deploy resources that belong to namespaced kubernetes resources. Cluster-scoped addon types can deploy cluster-wide resources that do not belong to a namespace.

#### Create a custom addon type: Features

You can select whether users can pause, redeploy, or reset a deployed addon.

#### Create a custom addon type: Configuration

You can configure the following options for an addon, which affect how it is deployed and how users can interact with the deployed addon:

- Show template values - allows users to view the values provided to a deployed addon, which may contain sensitive secrets such as API keys

- Enable modifying template values - allow users to change the override values for the addon, while it is running (triggers a redeployment)

- Enable error recovery - adds a page to the addon which displays a detailed error log and allows users to attempt to recover it from an error state

- Use Northflank labels and annotations on Kubernetes resources - deploys resources with Northflank labels and annotations to enable [logs, metrics, health checks](observe.md#monitor-containers)

- Install CRDs provided in resource bundle - enables the use of [custom resource definitions](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) from your Helm chart

- Use Northflank secret injection - adapt pod secrets, container command, and probes to enable full integration with Northflank

- Use default Northflank image pull secret - you should disable this if one or more of your template creates a custom image pull secret

#### Create a custom addon type: Restrict addon type to specific projects

You can restrict the addon type to specific projects in a team, so that it can only be deployed in the selected projects.

### Create a custom addon type: Deploy a custom addon

You can deploy your custom addon in any project running in a [cluster on your own cloud provider account](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

From the addons page, or the create new menu, open the [create new addon](https://app.northflank.com/s/project/create/addon) form and select your custom addon type from the options.

Values required by the Helm chart such as API keys, connection details, or configuration options can be supplied as JSON in the Helm template values field. If `show template values` is enabled in the custom addon type's configuration, these values will be visible and updatable in the deployed addon. The values are stored securely, encrypted at rest on the Northflank platform.

#### Create a custom addon type: Use and monitor your addon

Installed secrets will be automatically detected and displayed on the connection details page of your addon.

If you have enabled Northflank labels and annotations in the addon type's configuration, you can view the containers deployed for your addon with [logs, metrics, health checks](observe.md#monitor-containers). The resources for each container may vary, and are defined in the Helm chart bundle.

You can view and update the template's values and attempt to recover from an error state if this feature is enable if these features have been enabled for your addon type.

### Create a custom addon type: Manage a custom addon type

You can update the details, scope, features, and configuration for existing custom addon types. These settings are independent of your custom addon's versions.

#### Create a custom addon type: Versioning

You can manage the versions of your custom addon type, which are different versions of your Helm chart bundle, from the versions page. The version is obtained from your chart's `version` field.

You can upload a new version of your Helm chart bundle and make it active from the versions page. All deployments of your custom addon will be deployed with the new Helm chart and values, existing addons will use the new version when they are redeployed.

#### Create a custom addon type: Debugging

Helm install notes will be shown on your addon's connection details page, when it has been deployed. These notes include information, warnings, and error messages which can help you configure your Helm chart bundle or override values. You can also check the addon's containers for logs and health check messages, if you have enabled Northflank labels and annotations in the custom addon type's configuration.

If you have enabled error recovery in your addon type configuration, you can access an error recovery page in deployed addons of that type. This page displays detailed error messages in case the addon has reached an error state, and allows you to trigger an attempt to recover the addon. An error state is reached if the helm chart produces invalid Kubernetes manifests and usually requires you to change the template values.

### Create a custom addon type: Next steps

- [Bring your own cloud to Northflank: Use all the features of the Northflank platform on other cloud hosting providers, with control over your own infrastructure.](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank)
- [Use Tailscale: Allow secure access to Tailscale devices to resources within your project.](network.md#use-tailscale)
- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)
- [Audit logs: Monitor and review events affecting your organisation, teams, projects, and resources.](observe.md#audit-logs)

## Create a managed external addon

Source: https://northflank.com/docs/v1/application/databases-and-persistence/create-a-managed-external-addon.md

Managed external addons are preconfigured OpenTofu resources that simplify setup of common cloud resources like S3 buckets or RDS instances. They expose a subset of configuration fields for easier management while providing the same infrastructure-as-code benefits.

Unlike regular addons which run on Northflank infrastructure, external addons are hosted in your cloud account.

### Create a managed external addon: Available types

Managed external addon types currently include:

- Amazon S3 Bucket

- Amazon RDS

### Create a managed external addon: Create an external addon

#### Create a managed external addon: From the Addons page

1. Navigate to your project

2. Click **Addons** → **External addons** tab

3. Click **Create new addon**

4. Select **External addon** from the sidebar

#### Create a managed external addon: Basic information

1. **External addon type**: Select the resource type (e.g., Amazon S3 Bucket, Amazon RDS)

2. **External addon name**: Provide a name for the resource

3. **Description**: (Optional) Describe the purpose of this resource

4. **Tags**: (Optional) Add tags for organization

#### Create a managed external addon: Integration

1. **Integration**: Select your cloud provider integration (currently AWS only)

2. **Region**: Choose the cloud region where the resource will be created

3. **Workload identity** (optional): Select a workload identity to automatically inject cloud credentials into services and jobs using this addon

This determines where the external addon will be provisioned in your cloud account.

When you select a workload identity, it is automatically injected into services and jobs that use this addon via a secret group, allowing them to access cloud resources without separate configuration. The workload identity must use the same cloud provider as the addon.

#### Create a managed external addon: Configuration mode

Choose between Managed and Advanced configuration:

- **Managed**: Configure only recommended settings

- **Advanced**: Access all configuration options from the OpenTofu provider

**For Advanced mode:**

Enter the JSON configuration for your resource. Configuration fields match the OpenTofu provider for your cloud platform (e.g., [AWS provider](https://search.opentofu.org/provider/opentofu/aws/latest)).

#### Create a managed external addon: Create the addon

Click **Create external addon** to provision the resource in your cloud account using OpenTofu.

### Create a managed external addon: Using external addons

Once created, external addons work like regular addons. You can:

- Link outputs to secret groups

- Reference them in services for connection details

- Manage them through the Northflank interface

For example, an S3 bucket external addon can expose bucket name and region to a secret group, which your service can then consume.

### Create a managed external addon: Create from templates

External addons can be created using the External Addon template node. This allows you to define external resources alongside other infrastructure.

#### Create a managed external addon: Example: S3 bucket with secret group

This example creates an S3 bucket and links its outputs to a secret group:

```json
{
  "kind": "ExternalAddon",
  "ref": "my-s3-bucket",
  "condition": "success",
  "spec": {
    "name": "my-app-bucket",
    "description": "S3 bucket for application storage",
    "tags": [],
    "spec": {
      "config": {
        "aws_s3_bucket": {
          "nf": {
            "bucket": "my-app-bucket-name"
          }
        },
        "aws_s3_bucket_acl": {
          "nf": {
            "depends_on": [
              "aws_s3_bucket.nf",
              "aws_s3_bucket_ownership_controls.nf"
            ],
            "bucket": "${'\\${aws_s3_bucket.nf.id}'}",
            "acl": "private"
          }
        },
        "aws_s3_bucket_versioning": {
          "nf": {
            "depends_on": ["aws_s3_bucket.nf"],
            "bucket": "${'\\${aws_s3_bucket.nf.id}'}",
            "versioning_configuration": {
              "status": "Disabled"
            }
          }
        },
        "aws_s3_bucket_ownership_controls": {
          "nf": {
            "depends_on": ["aws_s3_bucket.nf"],
            "bucket": "${'\\${aws_s3_bucket.nf.id}'}",
            "rule": {
              "object_ownership": "ObjectWriter"
            }
          }
        },
        "envs": {
          "data": {
            "bucket_name": {},
            "bucket_arn": {},
            "bucket_domain_name": {},
            "bucket_regional_domain_name": {},
            "region": {}
          }
        },
        "secrets": {
          "data": {}
        }
      },
      "provider": {
        "aws": {
          "integrationId": "your-integration-id",
          "region": "us-east-1"
        }
      },
      "resourceType": "s3"
    }
  }
}
```

**Link outputs to a secret group:**

```json
{
  "kind": "SecretGroup",
  "ref": "s3-config",
  "spec": {
    "name": "s3-bucket-config",
    "type": "secret",
    "secretType": "environment-arguments",
    "priority": 10,
    "secrets": {
      "variables": {},
      "files": {},
      "dockerSecretMounts": {}
    },
    "addonDependencies": [],
    "externalAddonDependencies": [
      {
        "addonId": "${refs.my-s3-bucket.id}",
        "keys": [
          {"keyName": "bucket_name"},
          {"keyName": "bucket_arn"},
          {"keyName": "bucket_domain_name"},
          {"keyName": "bucket_regional_domain_name"},
          {"keyName": "region"}
        ]
      }
    ]
  }
}
```

The secret group automatically receives the S3 bucket details as environment variables, which can then be referenced by your services.

### Create a managed external addon: Next steps

- [Bring your own cloud to Northflank: Use all the features of the Northflank platform on other cloud hosting providers, with control over your own infrastructure.](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank)
- [Use Tailscale: Allow secure access to Tailscale devices to resources within your project.](network.md#use-tailscale)
- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)
- [Audit logs: Monitor and review events affecting your organisation, teams, projects, and resources.](observe.md#audit-logs)

## Database observability and monitoring

Source: https://northflank.com/docs/v1/application/databases-and-persistence/database-observability-and-monitoring.md

You can monitor the health and see the logs of your running and terminated database containers as you can with services and jobs.

You can also monitor the status and review the logs of imports, backups, and restores.

### Database observability and monitoring: Containers

You can view a list of running and terminated containers, which can be filtered by state, from the containers page in an addon.

Only the 10 most recently terminated containers are displayed.

You can click through on each container to view live, detailed logs and metrics.

![A list of containers for an addon in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/database-observability-and-monitoring/addon-containers.png)

### Database observability and monitoring: Backups, imports, and restores

At a glance the backups list will show you the status of each backup, the time and date it was completed (if successful), and the status of the most recently attempted restore.

Logs are available for native backups, but not disk snapshots.

#### Database observability and monitoring: Backup logs and metrics

You can click through on each backup to view more detailed logs and metrics.

Native backups created on Northflank will display a live tail log containing information about the success or failure of the attempted backup.

#### Database observability and monitoring: Restore logs and metrics

Each backup includes a list of restores from that backup, with the date, current status, and whether the backup has been completed. Click on a native backup to view live tail logs of the attempted restore.

![A list of backups for an addon in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/database-observability-and-monitoring/addon-backups-list.png)

### Database observability and monitoring: Learn more

- [Monitor containers: Monitor the health and resource usage of deployments, and view detailed logs and metrics for individual container.](observe.md#monitor-containers)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)

## Deploy a database

Source: https://northflank.com/docs/v1/application/databases-and-persistence/deploy-a-database.md

To deploy a new database in your project, create a new addon and select the type and version you require. Please note that while you can increase the storage size or replica count of databases after creation, you cannot decrease them.

After creating your addon it may take a few minutes to provision resources and set up a default configuration, after which its status will change to running.

Your database will be accessible by workloads within the same project using the provided [connection details](databases-and-persistence.md#connect-database-secrets-to-workloads).

> [!note]
> [Click here](https://app.northflank.com/s/project/create/addon) to deploy an addon.

![Creating a MongoDB addon in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/deploy-a-database/create-addon.png)

### Deploy a database: Available databases

| Addon | Versions | Description | Backups | TLS |
| --- | --- | --- | --- | --- |
| [MongoDB](https://www.mongodb.com/docs/manual/) | 8.0.20, 8.0.17, 8.0.10, 7.0.31, 7.0.28, 7.0.21, 6.0.27, 6.0.24, 5.0.31, 4.4.15, 4.2.21 | MongoDB® is a document-oriented database program that uses JSON-like documents with schema. | Native or disk | Yes |
| [Redis](https://redis.io/) | 8.6.1, 8.4.2, 8.4.0, 7.2.13, 7.2.12, 7.2.4, 6.2.21 | Redis® implements a distributed, in-memory key-value database with optional durability. | Disk | Yes |
| [MySQL](https://www.mysql.com/) | 9.6.0, 9.5.0, 8.4.8, 8.4.7, 8.0.45, 8.0.44 | MySQL is a fast, reliable, scalable, and easy to use open-source relational database system. | Native or disk | Yes (cannot be changed after creation) |
| [PostgreSQL](https://www.postgresql.org/) | 18, 17, 16, 15, 14, 13, 12 | PostgreSQL is a free and open-source relational database management system. High availability with Patroni | Native or disk | Yes |
| [MinIO](https://min.io/) | 2025.10.15 | MinIO® is a High Performance Object Storage with an Amazon S3 cloud storage service compatible API. | Disk | Yes |
| [RabbitMQ](https://www.rabbitmq.com/) | 4.2.4, 4.0.9, 3.13.7, 3.12.14 | RabbitMQ is an open source message broker software that implements the Advanced Message Queuing Protocol (AMQP). | Disk | Yes |

### Deploy a database: Advanced configuration

You can configure advanced options for addons, such as [backup schedules](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups) and custom database names. You can also fork databases from addons with existing backups.

See the [deployment guides](databases-and-persistence.md#deploy-a-database-next-steps) for addon-specific configuration options.

### Deploy a database: Next steps

- [Deploy MongoDB® on Northflank: MongoDB is a document-oriented database program that uses JSON-like documents with schema.](databases-and-persistence.md#deploy-mongodb®-on-northflank)
- [Deploy PostgreSQL on Northflank: PostgreSQL, also known as Postgres, is a free and open-source relational database management system.](databases-and-persistence.md#deploy-postgresql-on-northflank)
- [Deploy MySQL on Northflank: MySQL is a fast, reliable, scalable, and easy to use open-source relational database system.](databases-and-persistence.md#deploy-mysql-on-northflank)
- [Deploy Redis® on Northflank: Redis implements a distributed, in-memory key-value database with optional durability.](databases-and-persistence.md#deploy-redis®-on-northflank)
- [Deploy MinIO® on Northflank: MinIO is a High Performance Object Storage with an Amazon S3 cloud storage service compatible API.](databases-and-persistence.md#deploy-minio®-on-northflank)

## Deploy MinIO® on Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/deploy-databases-on-northflank/deploy-minio-on-northflank.md

This guide explains how to quickly and easily deploy and use [MinIO®*](https://min.io/) on Northflank.

| Available versions | Description | Backups | TLS |
| --- | --- | --- | --- |
| 2025.10.15 | MinIO® is a High Performance Object Storage with an Amazon S3 cloud storage service compatible API. | Disk | Yes |

> [!note]
> On some UNIX systems, the MinIO client `mc` may also be aliased to `mcli`.

### Deploy MinIO® on Northflank: Deploy MinIO

1. [Click here to create an addon](https://app.northflank.com/s/project/create/addon), or choose addon from the create new menu in the top right corner of the dashboard

2. Select MinIO and enter a name

3. Choose a version or leave as default (most recent version)

4. Choose whether to [deploy with TLS](databases-and-persistence.md#connect-database-secrets-to-workloads-enable-tls). This can be changed later.

5. Choose whether to make MinIO publicly accessible. This will give your addon a URL and make it available online. TLS must be enabled to select this.

6. If you have [secret groups](secure.md#manage-secret-groups) in your project, choose ones to [link to the addon](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group) so that MinIO can be used in services and jobs that inherit variables from the secret group. To link MinIO to a secret group:

  - Show secret groups and configure the secret groups you wish to use

  - Select suggested secrets from MinIO to link, or select all

  - Set any required aliases for specific secrets to make them accessible by that name within your application

7. Select the required [resources](databases-and-persistence.md#scale-a-database) for your MinIO deployment. You can scale MinIO after creation, but available storage and replicas cannot be decreased once increased.

8. Create addon and MinIO will begin provisioning, this may take a few minutes.

### Deploy MinIO® on Northflank: Advanced options

MinIO has the following advanced options available when creating your addon.

#### Deploy MinIO® on Northflank: Deploy with zonal redundancy

Your addon will be deployed to your [project's region](run.md#deploy-to-a-region). Each region may have multiple availability zones, which are data centers with independent infrastructure such as networking, power supply and cooling within the region. Some regions, however, do not have more than one availability zone.

Normally your addon replicas will be provisioned in the same availability zone, but you can enable zonal redundancy to provision replicas across multiple availability zones.

This will ensure that your addon remains available in the event that one zone fails, however networking between replicas in different zones will be slightly slower compared to replicas provisioned in the same availability zone. Replicas will be bound to the zone they are deployed in.

#### Deploy MinIO® on Northflank: Backup schedules

You can [add backup schedules](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups) when creating your addon. Backups of the addon will be taken according to the schedules.

### Deploy MinIO® on Northflank: Connect to MinIO

You can manually copy the connection secrets for MinIO from the connection details page into runtime variables or build arguments of your workloads on Northflank.

However, it is much easier to link your storage's connection details to a new or existing [secret group](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group).

The necessary secrets to connect your workload will vary depending on the application in your workload.

You can connect to your MinIO storage using the endpoint URL which takes the format `[http|https]://[host][:port]`, or `MINIO_CONNECT_COMMAND` for command-line clients. On some UNIX systems, the MinIO client `mc` may also be aliased to `mcli`.

You can supply connections details and secrets such as `host`, `port`, and `accessKey` to your workload if your application requires them.

#### Deploy MinIO® on Northflank: Available ports

| Internal port | External port | Protocol | URL prefix |
| --- | --- | --- | --- |
| 9000 | 443 | HTTP | `http[s]://` |

#### Deploy MinIO® on Northflank: Automatically inherit MinIO connection details into your workload

1. Create a new [secret group](secure.md#manage-secret-groups) of runtime variables to connect in the running workload

2. Show addons and configure your addon with either the `MINIO_ENDPOINT` or select connection details and secrets

3. Set the aliases required in your workload to access the secrets

4. Enable apply secrets to specific services/jobs and select the workloads you want to access the database

5. Create secret group

6. Go to one of the workloads that inherits from the group and check the environment page, you should see the inherited variables from the secret group

The connection string or secrets will now be available in your workload under the configured aliases, and your application will be able to connect to MinIO using them.

### Deploy MinIO® on Northflank: Access MinIO

You can access MinIO using the [MinIO client](https://min.io/docs/minio/linux/reference/minio-mc.html) (`mc`, may be aliased to `mcli` on some systems), or open the MinIO console in a browser.

#### Deploy MinIO® on Northflank: Secure local access

To forward your MinIO addon for local access using the [Northflank CLI](../api/use-the-cli.md), copy and execute the forward addon command from the local access section of the overview.

You can then use the `MINIO_CONNECT_COMMAND` from the connection details page to access your MinIO deployment using the command-line client or the `MINIO_ENDPOINT` to access in a browser, using the `ACCESS_KEY` and `SECRET_KEY` to authenticate.

#### Deploy MinIO® on Northflank: External access

To access your MinIO storage externally, ensure deploy with TLS and publicly accessible are enabled on the settings page under networking. The connection details will be updated to include an external endpoint, external ports, and an external connect command.

### Deploy MinIO® on Northflank: MinIO specifications

#### Deploy MinIO® on Northflank: Maximum requests

By default, a MinIO addon will calculate the maximum number of API requests to accept based on the available memory. You can increase the available memory by selecting the compute plan on the [addon's resources page](databases-and-persistence.md#scale-a-database).

You can also manually set the maximum number of API requests to handle using the MinIO client:

```
mc admin config set myminio/ api requests_max=1600
mc admin service restart myminio/
```

Setting `requests_max` to `0` will set the limit to the default, calculated on the memory available to the addon.

#### Deploy MinIO® on Northflank: Requests deadline

Setting the requests deadline allows long waiting requests to time out when MinIO is unable to process the request. The default value, if `requests_max` is set, is `10 seconds`.

```
mc admin config set myminio/ api requests_max=1600 requests_deadline=2m
mc admin service restart myminio/
```

### Deploy MinIO® on Northflank: Next steps

- [Configure MinIO® for high availability: Deploy multiple MinIO replicas for high availability MinIO on Northflank.](databases-and-persistence.md#configure-addons-for-high-availability-minio)
- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](../api/use-the-cli.md)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

* MinIO is a registered trademark of the MinIO Corporation.

## Deploy MongoDB® on Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/deploy-databases-on-northflank/deploy-mongodb-on-northflank.md

This guide explains how to quickly and easily deploy and use [MongoDB®](https://mongodb.com/docs/manual/) on Northflank.

| Available versions | Description | Backups | TLS |
| --- | --- | --- | --- |
| 8.0.20, 8.0.17, 8.0.10, 7.0.31, 7.0.28, 7.0.21, 6.0.27, 6.0.24, 5.0.31, 4.4.15, 4.2.21 | MongoDB® is a document-oriented database program that uses JSON-like documents with schema. | Native or disk | Yes |

### Deploy MongoDB® on Northflank: Deploy MongoDB

1. [Click here to create an addon](https://app.northflank.com/s/project/create/addon), or choose addon from the create new menu in the top right corner of the dashboard

2. Select MongoDB and enter a name

3. Choose a version or leave as default (most recent version)

4. Choose whether to [deploy with TLS](databases-and-persistence.md#connect-database-secrets-to-workloads-enable-tls). This can be changed later.

5. Choose whether to make the database publicly accessible. This will give your database a URL and make it available online. TLS must be enabled to select this.

6. If you have [secret groups](secure.md#manage-secret-groups) in your project, choose ones to [link to the addon](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group) so that the database can be used in services and jobs that inherit variables from the secret group. To link the database to a secret group:

  - Show secret groups and configure the secret groups you wish to use

  - Select suggested secrets from the database to link, or select all

  - Set any required aliases for specific secrets to make them accessible by that name within your application

7. Select the required [resources](databases-and-persistence.md#scale-a-database) for your database. You can scale the database after creation, but available storage and replicas cannot be decreased once increased.

8. Create addon and MongoDB will begin provisioning, this may take a few minutes.

### Deploy MongoDB® on Northflank: Advanced options

MinIO has the following advanced options available when creating your addon.

#### Deploy MongoDB® on Northflank: Fork existing addon

You can create your new addon as a [fork from an existing addon](databases-and-persistence.md#fork-an-addon).

This will copy all data, including database names and users, from the selected backup of the source addon to your new addon during creation.

The newly forked addon may have a newer minor version than the source backup, but must have the same major version.

#### Deploy MongoDB® on Northflank: Custom database name

The default database name is a randomly-generated string, and is used in connection details to access the addon. If your application expects a specific database name it can be useful to change it.

You can set a custom name for the default database created in your addon by entering one in advanced options. The name cannot be changed after creation.

If you are [forking from an existing addon](databases-and-persistence.md#fork-an-addon), it will use the name of the default database from the source addon.

#### Deploy MongoDB® on Northflank: Deploy with zonal redundancy

Your addon will be deployed to your [project's region](run.md#deploy-to-a-region). Each region may have multiple availability zones, which are data centers with independent infrastructure such as networking, power supply and cooling within the region. Some regions, however, do not have more than one availability zone.

Normally your addon replicas will be provisioned in the same availability zone, but you can enable zonal redundancy to provision replicas across multiple availability zones.

This will ensure that your addon remains available in the event that one zone fails, however networking between replicas in different zones will be slightly slower compared to replicas provisioned in the same availability zone. Replicas will be bound to the zone they are deployed in.

#### Deploy MongoDB® on Northflank: Backup schedules

You can [add backup schedules](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups) when creating your addon. Backups of the addon will be taken according to the schedules.

### Deploy MongoDB® on Northflank: Connect to MongoDB

You can manually copy the connection secrets for your MongoDB database from the connection details page into environment variables or build arguments of your workloads on Northflank.

However, it is much easier to link your database's connection details to a new or existing [secret group](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group).

The necessary secrets to connect your workload will vary depending on the application in your workload.

Some clients may use the [MongoDB connection string](https://www.mongodb.com/docs/manual/reference/connection-string/), while some clients may not support the connection string URI format.

The connection string takes the format `mongodb://[username:password@][host][:port][/database][...options]`, options include specifying the replica set, authentication source, and TLS requirement. The `mongoSrv` connection string will be automatically configured for your database.

You can supply connections details and secrets such as `host`, `database`, `username`, `password`, and `port`  to your workload if your application is configured to use these instead of a connection string.

#### Deploy MongoDB® on Northflank: Available ports

| Port | Protocol | URI prefix |
| --- | --- | --- |
| 27017 | MongoDB | `mongodb://` |

#### Deploy MongoDB® on Northflank: Automatically inherit database connection details into your workload

1. Create a new [secret group](secure.md#manage-secret-groups) of runtime variables to connect in the running workload

2. Show addons and configure your addon with either the `mongoSrv` connection string, or select connection details and secrets

3. Set the aliases required in your workload to access the secrets

4. Enable apply secrets to specific services/jobs and select the workloads you want to access the database

5. Create secret group

6. Go to one of the workloads that inherits from the group and check the environment page, you should see the inherited variables from the secret group

The connection string or secrets will now be available in your workload under the configured aliases, and your application will be able to connect to the database using them.

### Deploy MongoDB® on Northflank: Access MongoDB

You can access your MongoDB addon using the relevant [connection string](https://www.mongodb.com/docs/manual/reference/connection-string/), or by using the `HOST`, `PORT`, `USERNAME` and `PASSWORD` secrets found in the connection details page of the addon.

You can connect using the [Mongo shell](https://www.mongodb.com/docs/v4.4/mongo/#mongodb-instance-on-a-remote-host), or via a GUI such as [Compass](https://www.mongodb.com/products/compass).

#### Deploy MongoDB® on Northflank: Secure local access

To forward your MongoDB database for local access using the [Northflank CLI](../api/use-the-cli.md), copy and execute the `forward addon` command from the local access section of the overview in your terminal.

You can then use the connection details to access your MongoDB deployment in your local development environment.

#### Deploy MongoDB® on Northflank: External access

To access your MongoDB database externally, ensure deploy with TLS and publicly accessible are enabled on the settings page under networking. External connection strings will appear in the addon's connection details page, and the host will now resolve externally.

#### Deploy MongoDB® on Northflank: Administration

You can connect to your MongoDB database as administrator using the connection strings that end in `_ADMIN`, or log in using `ADMIN_USERNAME` and `ADMIN_PASSWORD`. You should only use this account for necessary maintenance, and otherwise access the database using the standard user credentials.

### Deploy MongoDB® on Northflank: Scale MongoDB

You can scale your MongoDB database on the resources page. You can increase the CPU and memory, storage, and replicas available to your database.

#### Deploy MongoDB® on Northflank: Compute plan

You can change the compute plan to improve performance for more intensive workloads.

#### Deploy MongoDB® on Northflank: Storage

You can increase storage, but not decrease it. You should increase storage if your database uses over 50% of the available storage.

#### Deploy MongoDB® on Northflank: Replica behaviour

You can increase the number of available replicas, but you cannot decrease them. If a primary node becomes unavailable one of the replica nodes will be promoted to primary, supporting read/write operations.

### Deploy MongoDB® on Northflank: MongoDB specifications

#### Deploy MongoDB® on Northflank: Connection limits

The [default connection limit](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-net.maxIncomingConnections) for MongoDB is 80% of the limit for the maximum number of open files on the system.

Your addon will be able to handle more concurrent connections by increasing the available CPU and memory. You can do this by selecting the compute plan on the [addon's resources page](databases-and-persistence.md#scale-a-database).

### Deploy MongoDB® on Northflank: Next steps

- [Configure MongoDB® for high availability: Take advantage of automated failover and configure your client's read preference.](databases-and-persistence.md#configure-addons-for-high-availability-mongodb)
- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](../api/use-the-cli.md)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

## Deploy MySQL on Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/deploy-databases-on-northflank/deploy-mysql-on-northflank.md

This guide explains how to quickly and easily deploy and use [MySQL](https://www.mysql.com/) on Northflank.

| Available versions | Description | Backups | TLS |
| --- | --- | --- | --- |
| 9.6.0, 9.5.0, 8.4.8, 8.4.7, 8.0.45, 8.0.44 | MySQL is a fast, reliable, scalable, and easy to use open-source relational database system. | Native or disk | Yes (cannot be changed after creation) |

### Deploy MySQL on Northflank: Deploy MySQL

1. [Click here to create an addon](https://app.northflank.com/s/project/create/addon), or choose addon from the create new menu in the top right corner of the dashboard

2. Select MySQL and enter a name

3. Choose a version or leave as default (most recent version)

4. Choose whether to [deploy with TLS](databases-and-persistence.md#connect-database-secrets-to-workloads-enable-tls). This cannot be changed later.

5. Choose whether to make the database publicly accessible. This will give your addon a URL and make it available online. TLS must be enabled to select this.

6. If you have [secret groups](secure.md#manage-secret-groups) in your project, choose ones to [link to the addon](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group) so that the database can be used in services and jobs that inherit variables from the secret group. To link the database to a secret group:

  - Show secret groups and configure the secret groups you wish to use

  - Select suggested secrets from the database to link, or select all

  - Set any required aliases for specific secrets to make them accessible by that name within your application

7. Select the required [resources](databases-and-persistence.md#scale-a-database) for your database. You can scale the database after creation, but available storage and replicas cannot be decreased once increased.

8. Optionally, enable high availability to deploy as a [MySQL InnoDB Cluster](databases-and-persistence.md#configure-addons-for-high-availability-mysql) — a 3-node Group Replication cluster with MySQL Router and automated failover. This cannot be changed after creation.

9. Create addon and MySQL will begin provisioning, this may take a few minutes.

### Deploy MySQL on Northflank: Advanced options

MySQL has the following advanced options available when creating your addon.

#### Deploy MySQL on Northflank: Fork existing addon

You can create your new addon as a [fork from an existing addon](databases-and-persistence.md#fork-an-addon).

This will copy all data, including database names and users, from the selected backup of the source addon to your new addon during creation.

The newly forked addon may have a newer minor version than the source backup, but must have the same major version.

#### Deploy MySQL on Northflank: Custom database name

The default database name is a randomly-generated string, and is used in connection details to access the addon. If your application expects a specific database name it can be useful to change it.

You can set a custom name for the default database created in your addon by entering one in advanced options. The name cannot be changed after creation.

If you are [forking from an existing addon](databases-and-persistence.md#fork-an-addon), it will use the name of the default database from the source addon.

#### Deploy MySQL on Northflank: Deploy with zonal redundancy

Your addon will be deployed to your [project's region](run.md#deploy-to-a-region). Each region may have multiple availability zones, which are data centers with independent infrastructure such as networking, power supply and cooling within the region. Some regions, however, do not have more than one availability zone.

Normally your addon replicas will be provisioned in the same availability zone, but you can enable zonal redundancy to provision replicas across multiple availability zones.

This will ensure that your addon remains available in the event that one zone fails, however networking between replicas in different zones will be slightly slower compared to replicas provisioned in the same availability zone. Replicas will be bound to the zone they are deployed in.

#### Deploy MySQL on Northflank: Backup schedules

You can [add backup schedules](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups) when creating your addon. Backups of the addon will be taken according to the schedules.

### Deploy MySQL on Northflank: Connect to MySQL

You can manually copy the connection secrets for your MySQL database from the connection details page into runtime variables or build arguments of your workloads on Northflank.

However, it is much easier to link your database's connection details to a new or existing [secret group](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group).

The necessary secrets to connect your workload will vary depending on the application in your workload.

Some clients may use a URI-like [connection string](https://dev.mysql.com/doc/refman/8.0/en/connecting-using-uri-or-key-value-pairs.html), while some clients may not support the connection string format.

The connection string takes the format `[scheme://][user:password@][host][:port][/schema][...options]`. The `MYSQL_CONNECTOR_URI` and `MYSQL_JDBC_URI` (for Java applications using JDBC) connection strings will be automatically configured for your database, as well as the `CONNECT_COMMAND` for command-line clients.

You can supply connections details and secrets such as `host`, `database`, `username`, `password`, and `port`  to your workload if your application is configured to use these instead of a connection string.

#### Deploy MySQL on Northflank: Available ports

| Internal port | External port | Protocol |
| --- | --- | --- |
| 3306 | Dynamically generated | MySQL |

If you create more than one replica, read replicas will have the `read` prefixes in place of the `primary` prefix for the primary replica.

#### Deploy MySQL on Northflank: Automatically inherit database connection details into your workload

1. Create a new [secret group](secure.md#manage-secret-groups) of runtime variables to connect in the running workload

2. Show addons and configure your addon with either the `MYSQL_CONNECTOR_URI` or `MYSQL_JDBC_URI` connection string, or select connection details and secrets

3. Set the aliases required in your workload to access the secrets

4. Enable apply secrets to specific services/jobs and select the workloads you want to access the database

5. Create secret group

6. Go to one of the workloads that inherits from the group and check the environment page, you should see the inherited variables from the secret group

The connection string or secrets will now be available in your workload under the configured aliases, and your application will be able to connect to the database using them.

### Deploy MySQL on Northflank: Access MySQL

You can access your MySQL addon using the relevant connection string, or by using the `HOST`, `PORT`, `USERNAME` and `PASSWORD` secrets found in the connection details page of the addon.

You can connect using the [MySQL shell](https://dev.mysql.com/doc/mysql-shell/8.0/en/) using the connect command, or via a GUI such as [phpMyAdmin](https://www.phpmyadmin.net/).

#### Deploy MySQL on Northflank: Secure local access

To forward your MySQL database for local access using the [Northflank CLI](../api/use-the-cli.md), copy and execute the forward addon command from the local access section of the overview.

You can then use the `CONNECT_COMMAND` from the connection details page to access your MySQL deployment using the command-line client, or use the connection details in your local development environment.

#### Deploy MySQL on Northflank: External access

To access your MySQL database externally it must have been created with TLS enabled. If so, you can enable publicly accessible on the settings page under networking. External connection strings will appear in the addon's connection details page, as well as an external port, and the host will now resolve externally.

#### Deploy MySQL on Northflank: Administration

You can connect to your MySQL database as administrator using the connection strings that end in `_ADMIN`, or log in using `ADMIN_USERNAME` and `ADMIN_PASSWORD`. You should only use this account for necessary maintenance, and otherwise access the database using the standard user credentials.

### Deploy MySQL on Northflank: MySQL specifications

#### Deploy MySQL on Northflank: Connection limits

The maximum concurrent connections allowed on a MySQL addon depend on the amount of available memory. This can be configured by selecting the compute plan on the [addon's resources page](databases-and-persistence.md#scale-a-database).

| Memory available | Maximum connections |
| --- | --- |
| 512MB | 32 |
| 1024MB | 96 |
| 4096MB | 250 |
| 8192MB | 350 |
| 16384MB | 700 |
| 32768MB | 1000 |
| > 32768MB | 2000 |

### Deploy MySQL on Northflank: Next steps

- [Configure MySQL for high availability: Deploy MySQL with InnoDB Cluster for automated failover, Group Replication, and transparent routing.](databases-and-persistence.md#configure-addons-for-high-availability-mysql)
- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](../api/use-the-cli.md)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

## Deploy PostgreSQL on Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/deploy-databases-on-northflank/deploy-postgresql-on-northflank.md

This guide explains how to quickly and easily deploy and use [PostgreSQL](https://www.postgresql.org/) on Northflank.

| Available versions | Description | Backups | TLS |
| --- | --- | --- | --- |
| 18, 17, 16, 15, 14, 13, 12 | PostgreSQL is a free and open-source relational database management system. High availability with Patroni | Native or disk | Yes |

### Deploy PostgreSQL on Northflank: Deploy PostgreSQL

1. [Click here to create an addon](https://app.northflank.com/s/project/create/addon), or choose addon from the create new menu in the top right corner of the dashboard

2. Select PostgreSQL and enter a name

3. Choose a version or leave as default (most recent version)

4. Choose whether to [deploy with TLS](databases-and-persistence.md#connect-database-secrets-to-workloads-enable-tls). This can be changed later.

5. Choose whether to make the database publicly accessible. This will give your addon a URL and make it available online. TLS must be enabled to select this.

6. If you have [secret groups](secure.md#manage-secret-groups) in your project, choose ones to [link to the addon](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group) so that the database can be used in services and jobs that inherit variables from the secret group. To link the database to a secret group:

  - Show secret groups and configure the secret groups you wish to use

  - Select suggested secrets from the database to link, or select all

  - Set any required aliases for specific secrets to make them accessible by that name within your application

7. Select the required [resources](databases-and-persistence.md#scale-a-database) for your database. You can scale the database after creation, but available storage and replicas cannot be decreased once increased.

8. Create addon and PostgreSQL will begin provisioning, this may take a few minutes.

### Deploy PostgreSQL on Northflank: Advanced options

PostgreSQL has the following advanced options available when creating your addon.

#### Deploy PostgreSQL on Northflank: Fork existing addon

You can create your new addon as a [fork from an existing addon](databases-and-persistence.md#fork-an-addon).

This will copy all data, including database names and users, from the selected backup of the source addon to your new addon during creation.

The newly forked addon may have a newer minor version than the source backup, but must have the same major version.

#### Deploy PostgreSQL on Northflank: Custom database name

The default database name is a randomly-generated string, and is used in connection details to access the addon. If your application expects a specific database name it can be useful to change it.

You can set a custom name for the default database created in your addon by entering one in advanced options. The name cannot be changed after creation.

If you are [forking from an existing addon](databases-and-persistence.md#fork-an-addon), it will use the name of the default database from the source addon.

#### Deploy PostgreSQL on Northflank: Write-Ahead Logging (WAL)

You can set the [wal_level](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-WAL-LEVEL) to either `replica` (default) or `logical`. This cannot be changed after creation. Setting the WAL to `Logical` will incur more usage for vCPU, networking, and disk space compared to `replica`.

#### Deploy PostgreSQL on Northflank: Deploy with zonal redundancy

Your addon will be deployed to your [project's region](run.md#deploy-to-a-region). Each region may have multiple availability zones, which are data centers with independent infrastructure such as networking, power supply and cooling within the region. Some regions, however, do not have more than one availability zone.

Normally your addon replicas will be provisioned in the same availability zone, but you can enable zonal redundancy to provision replicas across multiple availability zones.

This will ensure that your addon remains available in the event that one zone fails, however networking between replicas in different zones will be slightly slower compared to replicas provisioned in the same availability zone. Replicas will be bound to the zone they are deployed in.

#### Deploy PostgreSQL on Northflank: Backup schedules

You can [add backup schedules](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups) when creating your addon. Backups of the addon will be taken according to the schedules.

### Deploy PostgreSQL on Northflank: Connect to PostgreSQL

You can manually copy the connection secrets for your PostgreSQL database from the connection details page into runtime variables or build arguments of your workloads on Northflank.

However, it is much easier to link your database's connection details to a new or existing [secret group](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group).

The necessary secrets to connect your workload will vary depending on the application in your workload.

Some clients may use a [connection string](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING), while some clients may not support the connection string URI format.

The connection string takes the format `postgresql://[username:password@][host][:port][/database][...options]`. The `POSTGRES_URI` and `JDBC_POSTGRES_URI` (for Java applications using JDBC) connection strings will be automatically configured for your database.

You can supply connections details and secrets such as `host`, `username`, `password`, and `port`  to your workload if your application is configured to use these instead of a connection string.

#### Deploy PostgreSQL on Northflank: Available ports

| Internal port | External port | Protocol | URI prefix |
| --- | --- | --- | --- |
| 5432 | Dynamically generated | PostgreSQL | `postgresql://` |

If you create more than one replica, read replicas will have the `read` prefixes in place of the `primary` prefix for the primary replica.

#### Deploy PostgreSQL on Northflank: Automatically inherit database connection details into your workload

1. Create a new [secret group](secure.md#manage-secret-groups) of runtime variables to connect in the running workload

2. Show addons and configure your addon with either the `POSTGRES_URI` or `JDBC_POSTGRES_URI` connection string, or select connection details and secrets

3. Set the aliases required in your workload to access the secrets

4. Enable apply secrets to specific services/jobs and select the workloads you want to access the database

5. Create secret group

6. Go to one of the workloads that inherits from the group and check the environment page, you should see the inherited variables from the secret group

The connection string or secrets will now be available in your workload under the configured aliases, and your application will be able to connect to the database using them.

### Deploy PostgreSQL on Northflank: Access PostgreSQL

You can access your PostgreSQL addon using the relevant connection string, or by using the `HOST`, `PORT`, `USERNAME` and `PASSWORD` secrets found in the connection details page of the addon.

You can connect using the [psql interactive terminal](https://www.postgresql.org/docs/current/app-psql.html), or via a GUI such as [pgAdmin](https://www.pgadmin.org/).

#### Deploy PostgreSQL on Northflank: Secure local access

To forward your PostgreSQL database for local access using the [Northflank CLI](../api/use-the-cli.md), copy and execute the forward addon command from the local access section of the overview.

You can then use the connection details to access your PostgreSQL deployment in your local development environment.

#### Deploy PostgreSQL on Northflank: External access

To access your PostgreSQL database externally, ensure deploy with TLS and publicly accessible are enabled on the settings page under networking. External connection strings will appear in the addon's connection details page, and the host will now resolve externally.

#### Deploy PostgreSQL on Northflank: Administration

You can connect to your PostgreSQL database as administrator using the connection strings that end in `_ADMIN`, or log in using `ADMIN_USERNAME` and `ADMIN_PASSWORD`. You should only use this account for necessary maintenance, and otherwise access the database using the standard user credentials.

### Deploy PostgreSQL on Northflank: PostgreSQL specifications

#### Deploy PostgreSQL on Northflank: Connection limits

The maximum concurrent connections allowed on a PostgreSQL is 750. You can add [connection poolers](databases-and-persistence.md#configure-addons-for-high-availability-postgresql) on the resources page if you need to manage high numbers of connections.

#### Deploy PostgreSQL on Northflank: Extensions

The PostgreSQL addon offers a number of available extensions which include:

- `PostGIS`

- `earthdistance`

- `timescaledb`

- `vector`

- `pg_stat_statements`

- `pg_cron`

For a complete list [connect to your PostgreSQL addon](databases-and-persistence.md#deploy-postgresql-on-northflank-connect-to-postgresql) and run `SELECT pg_available_extensions();`.

You can install an extension by running the `CREATE EXTENSION <extension-name>;` SQL command on your addon.

### Deploy PostgreSQL on Northflank: Next steps

- [Configure PostgreSQL for high availability: Northflank's PostgreSQL addon offers automated failover and connection poolers.](databases-and-persistence.md#configure-addons-for-high-availability-postgresql)
- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](../api/use-the-cli.md)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

## Deploy RabbitMQ on Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/deploy-databases-on-northflank/deploy-rabbitmq-on-northflank.md

This guide explains how to quickly and easily deploy and use [RabbitMQ](https://www.rabbitmq.com/) on Northflank.

| Available versions | Description | Backups | TLS |
| --- | --- | --- | --- |
| 4.2.4, 4.0.9, 3.13.7, 3.12.14 | RabbitMQ is an open source message broker software that implements the Advanced Message Queuing Protocol (AMQP). | Disk | Yes |

### Deploy RabbitMQ on Northflank: Deploy RabbitMQ

1. [Click here to create an addon](https://app.northflank.com/s/project/create/addon), or choose addon from the create new menu in the top right corner of the dashboard

2. Select RabbitMQ and enter a name

3. Choose a version or leave as default (most recent version)

4. Choose whether to [deploy with TLS](databases-and-persistence.md#connect-database-secrets-to-workloads-enable-tls). This can be changed later.

5. Choose whether to make RabbitMQ publicly accessible. This will give your addon a URL and make it available online. TLS must be enabled to select this.

6. If you have [secret groups](secure.md#manage-secret-groups) in your project, choose ones to [link to the addon](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group) so that RabbitMQ can be used in services and jobs that inherit variables from the secret group. To link RabbitMQ to a secret group:

  - Show secret groups and configure the secret groups you wish to use

  - Select suggested secrets from RabbitMQ to link, or select all

  - Set any required aliases for specific secrets to make them accessible by that name within your application

7. Select the required [resources](databases-and-persistence.md#scale-a-database) for your RabbitMQ deployment. You can scale RabbitMQ after creation, but available storage and replicas cannot be decreased once increased.

8. Create addon and RabbitMQ will begin provisioning, this may take a few minutes.

### Deploy RabbitMQ on Northflank: Advanced options

RabbitMQ has the following advanced options available when creating your addon.

#### Deploy RabbitMQ on Northflank: Custom virtual host name

You can set a custom name for the default [virtual host](https://www.rabbitmq.com/docs/vhosts) to be created within your addon, otherwise it will be given a random name. The virtual host name will be used in the connection details for your RabbitMQ addon.

#### Deploy RabbitMQ on Northflank: Deploy with zonal redundancy

Your addon will be deployed to your [project's region](run.md#deploy-to-a-region). Each region may have multiple availability zones, which are data centers with independent infrastructure such as networking, power supply and cooling within the region. Some regions, however, do not have more than one availability zone.

Normally your addon replicas will be provisioned in the same availability zone, but you can enable zonal redundancy to provision replicas across multiple availability zones.

This will ensure that your addon remains available in the event that one zone fails, however networking between replicas in different zones will be slightly slower compared to replicas provisioned in the same availability zone. Replicas will be bound to the zone they are deployed in.

#### Deploy RabbitMQ on Northflank: Backup schedules

You can [add backup schedules](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups) when creating your addon. Backups of the addon will be taken according to the schedules.

### Deploy RabbitMQ on Northflank: Connect to RabbitMQ

You can manually copy the connection secrets for RabbitMQ from the connection details page into runtime variables or build arguments of your workloads on Northflank.

However, it is much easier to link your storage's connection details to a new or existing [secret group](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group).

The necessary secrets to connect your workload will vary depending on your application and the protocols you are using.

To access the [RabbitMQ management dashboard](https://www.rabbitmq.com/management.html) you can use the `MANAGEMENT_ENDPOINT` with the the `USERNAME` and `PASSWORD` secrets as credentials, which gives access to a [management user](https://www.rabbitmq.com/management.html#permissions). Using `ADMIN_USERNAME` and `ADMIN_PASSWORD` to log in to the management dashboard will allow access to [administrator account](https://www.rabbitmq.com/management.html#permissions).

You can access RabbitMQ using the [AMQP connection string](https://www.rabbitmq.com/uri-spec.html) and AMQP port.

#### Deploy RabbitMQ on Northflank: Available ports

| Port | TLS Port | Protocol | URI prefixes |
| --- | --- | --- | --- |
| 5672 | 5671 | AMQP | `ampq[s]://` |
| 1883 | 8883 | MQTT | `mqtt[s]://` |
| 15672 | 15671 | HTTP | `http[s]://` |

STOMP and Streams are disabled by default, contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) to request that they are enabled.

#### Deploy RabbitMQ on Northflank: Automatically inherit RabbitMQ connection details into your workload

1. Create a new [secret group](secure.md#manage-secret-groups) of runtime variables to connect in the running workload

2. Show addons and configure your addon with either the `AMQP_CONNECTION_STRING` and `AMQP_PORT`, or other connection details and secrets as required

3. Set the aliases required in your workload to access the secrets

4. Enable apply secrets to specific services/jobs and select the workloads you want to access the database

5. Create secret group

6. Go to one of the workloads that inherits from the group and check the environment page, you should see the inherited variables from the secret group

The connection string or secrets will now be available in your workload under the configured aliases, and your application will be able to connect to RabbitMQ using them.

### Deploy RabbitMQ on Northflank: Access RabbitMQ

#### Deploy RabbitMQ on Northflank: Secure local access

To forward RabbitMQ for local access using the [Northflank CLI](../api/use-the-cli.md), copy and execute the forward addon command from the local access section of the overview. You can then access the addon using the `AMQP` and `MQTT` connection strings.

#### Deploy RabbitMQ on Northflank: External access

To access your RabbitMQ deployment externally, ensure deploy with TLS and publicly accessible are enabled on the settings page under networking. The connection strings, endpoints, and ports will be updated with the new configuration if TLS was previously disabled (otherwise they will remain the same, but publicly exposed).

#### Deploy RabbitMQ on Northflank: Administration

You can use the `RABBITMQ_ADMIN_CMD` from the connection details page to access your RabbitMQ deployment using the [command-line client](https://www.rabbitmq.com/management-cli.html).

Alternatively you can access the web interface via the `MANAGEMENT_ENDPOINT` link, logging in with the administrator credentials `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

You can also access the addon using the `AMQP` and `MQTT` admin connection strings.

### Deploy RabbitMQ on Northflank: RabbitMQ specifications

#### Deploy RabbitMQ on Northflank: Connection limits

The number of maximum connections for a virtual host or user can be configured under limits. Log in to the RabbitMQ management endpoint using the admin credentials, open the admin page and select limits to set and update limits.

Your addon will be able to handle more concurrent connections by increasing the available memory. You can do this by selecting the compute plan on the [addon's resources page](databases-and-persistence.md#scale-a-database).

### Deploy RabbitMQ on Northflank: Next steps

- [Configure RabbitMQ for high availability: Use quorum queues or streams for high availability RabbitMQ on Northflank.](databases-and-persistence.md#configure-addons-for-high-availability-rabbitmq)
- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](../api/use-the-cli.md)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

## Deploy Redis® on Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/deploy-databases-on-northflank/deploy-redis-on-northflank.md

This guide explains how to quickly and easily deploy and use [Redis®*](https://redis.io/) on Northflank.

| Available versions | Description | Backups | TLS |
| --- | --- | --- | --- |
| 8.6.1, 8.4.2, 8.4.0, 7.2.13, 7.2.12, 7.2.4, 6.2.21 | Redis® implements a distributed, in-memory key-value database with optional durability. | Disk | Yes |

### Deploy Redis® on Northflank: Deploy Redis

1. [Click here to create an addon](https://app.northflank.com/s/project/create/addon), or choose addon from the create new menu in the top right corner of the dashboard

2. Select Redis and enter a name

3. Choose a version or leave as default (most recent version)

4. Choose whether to [deploy with TLS](databases-and-persistence.md#connect-database-secrets-to-workloads-enable-tls). This can be changed later.

5. Choose whether to make the database publicly accessible. This will give your addon a URL and make it available online. TLS must be enabled to select this.

6. If you have [secret groups](secure.md#manage-secret-groups) in your project, choose ones to [link to the addon](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group) so that the database can be used in services and jobs that inherit variables from the secret group. To link the database to a secret group:

  - Show secret groups and configure the secret groups you wish to use

  - Select suggested secrets from the database to link, or select all

  - Set any required aliases for specific secrets to make them accessible by that name within your application

7. Select the required [resources](databases-and-persistence.md#scale-a-database) for your database. You can scale the database after creation, but available storage and replicas cannot be decreased once increased.

8. Create addon and Redis will begin provisioning, this may take a few minutes.

### Deploy Redis® on Northflank: Advanced options

Redis has the following advanced options available when creating your addon.

#### Deploy Redis® on Northflank: Redis Sentinel

[Deploy Redis with an additional Sentinel process](databases-and-persistence.md#configure-addons-for-high-availability-redis). Sentinel monitors Redis instance health and triggers automated failover in case of an instance failure. Client library needs to support Sentinel for master discovery.

This cannot be changed after creation.

#### Deploy Redis® on Northflank: Maxmemory policy

You can select an [eviction policy](https://redis.io/docs/reference/eviction/), which determines how Redis will behave when the `maxmemory` limit is reached. The maximum memory is determined by the memory assigned to the replica [according to the addon's plan](databases-and-persistence.md#scale-a-database). The `maxmemory` limit will be redefined when you change the addon's plan.

The policy cannot be changed after creation. By default, a Redis addon will use the `noeviction` policy, which will not remove existing values, nor save new ones if the memory limit is reached.

| Policy | Effect |
| --- | --- |
| `noeviction` | New values aren’t saved when memory limit is reached. When a database uses replication, this applies to the primary database |
| `allkeys-lru` | Keeps most recently used keys; removes least recently used (LRU) key |
| `allkeys-lfu` | Keeps frequently used keys; removes least frequently used (LFU) key |
| `volatile-lru` | Removes least recently used keys with the expire field set to true |
| `volatile-lfu` | Removes least frequently used keys with the expire field set to true |
| `allkeys-random` | Randomly removes keys to make space for the new data added |
| `volatile-random` | Randomly removes keys with expire field set to true |
| `volatile-ttl` | Removes keys with expire field set to true and the shortest remaining time-to-live (TTL) value |

#### Deploy Redis® on Northflank: Deploy with zonal redundancy

Your addon will be deployed to your [project's region](run.md#deploy-to-a-region). Each region may have multiple availability zones, which are data centers with independent infrastructure such as networking, power supply and cooling within the region. Some regions, however, do not have more than one availability zone.

Normally your addon replicas will be provisioned in the same availability zone, but you can enable zonal redundancy to provision replicas across multiple availability zones.

This will ensure that your addon remains available in the event that one zone fails, however networking between replicas in different zones will be slightly slower compared to replicas provisioned in the same availability zone. Replicas will be bound to the zone they are deployed in.

#### Deploy Redis® on Northflank: Backup schedules

You can [add backup schedules](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups) when creating your addon. Backups of the addon will be taken according to the schedules.

### Deploy Redis® on Northflank: Connect to Redis

You can manually copy the connection secrets for your Redis database from the connection details page into runtime variables or build arguments of your workloads on Northflank.

However, it is much easier to link your database's connection details to a new or existing [secret group](databases-and-persistence.md#connect-database-secrets-to-workloads-link-database-secrets-to-a-secret-group).

The necessary secrets to connect your workload will vary depending on the application in your workload.

[Some clients may use a connection string](https://redis.io/docs/latest/develop/connect/), while some clients may not support the connection string format.

The connection string `REDIS_MASTER_URL` takes the format `[redis|rediss]://[user:password@][host][:port]`. There is also `REDIS_CONNECT_COMMAND` for command-line clients.

You can supply connections details and secrets such as `host`, `password`, and `port`  to your workload if your application is configured to use these instead of a connection string.

#### Deploy Redis® on Northflank: Available ports

| Port | Protocol | URI prefix |
| --- | --- | --- |
| 6379 | RESP | `redis[s]://` |

#### Deploy Redis® on Northflank: Automatically inherit database connection details into your workload

1. Create a new [secret group](secure.md#manage-secret-groups) of runtime variables to connect in the running workload

2. Show addons and configure your addon with either `REDIS_MASTER_URL` or select connection details and secrets

3. Set the aliases required in your workload to access the secrets

4. Enable apply secrets to specific services/jobs and select the workloads you want to access the database

5. Create secret group

6. Go to one of the workloads that inherits from the group and check the environment page, you should see the inherited variables from the secret group

The connection string or secrets will now be available in your workload under the configured aliases, and your application will be able to connect to the database using them.

### Deploy Redis® on Northflank: Access Redis

You can use the connect command to access Redis using the Redis CLI, or connect a [GUI tool](https://redis.io/resources/tools/) using the `HOST` secret. The addon must be forwarded to connect using the host name.

#### Deploy Redis® on Northflank: Secure local access

To forward Redis for local access using the [Northflank CLI](../api/use-the-cli.md), copy and execute the forward addon command from the local access section of the overview.

You can then use the `REDIS_CONNECT_COMMAND` from the connection details page to access your Redis deployment using the command-line client, or use the connection details in your local development environment.

#### Deploy Redis® on Northflank: External access

To access your Redis database externally, ensure deploy with TLS and publicly accessible are enabled on the settings page under networking. The connection details will be updated to include an external connect command, and the host will now resolve externally.

### Deploy Redis® on Northflank: Redis specifications

#### Deploy Redis® on Northflank: Connection limits

By default, a maximum of 10,000 concurrent connections are allowed on a Redis addon.

Your addon will be able to handle more concurrent connections by increasing the available CPU and memory available. You can do this by selecting the compute plan on the [addon's resources page](databases-and-persistence.md#scale-a-database).

#### Deploy Redis® on Northflank: Redis persistence

Redis is run with [AOF (Append Only File) persistence](https://redis.io/docs/management/persistence/) on Northflank. This may have implications for Redis instances with very high write workloads:

- Memory: AOF rewrites lead to elevated memory requirements. Redis is configured to reserve 20% of the available plan memory as a buffer for processes such as AOF rewrites.

- Disk: Running Redis with AOF persistence means that all write operations are persisted to disk. This can temporarily lead to higher storage requirements than the minimally recommended disk size, which is equal to the memory size.

- vCPU: AOF rewrites create a fork process which can temporarily require vCPU resources. The performance impact should be minimal and is usually not noticeable.

For custom requirements or configurations, please contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com).

### Deploy Redis® on Northflank: Next steps

- [Configure Redis® for high availability: Use primary and read replicas, and Redis Sentinel for high availability Redis on Northflank.](databases-and-persistence.md#configure-addons-for-high-availability-redis)
- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](../api/use-the-cli.md)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)

* Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. Any use by Northflank is for referential purposes only and does not indicate any sponsorship, endorsement or affiliation between Redis and Northflank.

## Fork an addon

Source: https://northflank.com/docs/v1/application/databases-and-persistence/fork-an-addon.md

You can fork an addon to create a duplicate of an existing addon. You can use this to easily clone an addon for development and testing, or to safely migrate to an addon with a different major version or configuration.

You can create a duplicate of an existing addon manually, or in a template. The newly forked addon may have a newer minor version than the source backup, but must have the same major version.

Forking is currently available for the following addons:

- PostgreSQL

- MongoDB

- MySQL

### Fork an addon: Create an addon from a backup

You can fork an addon by creating an addon of the same type. You must have an existing addon that contains a disk backup of the same major version as the fork addon.

In the advanced section of addon creation, expand the fork existing addon option. Select the addon you want to clone, and select the disk backup to use when creating the new forked addon. Click create addon and your forked addon will begin provisioning with the data from your source addon.

Your newly-forked addon will display the source addon it was created from, but will be entirely separate from the source addon.

### Fork an addon: Fork an addon in a template

You can create a backup of an existing addon and fork it in a [template](infrastructure-as-code.md#write-a-template). This is particularly useful in preview environments, where you may want to use existing data to preview your changes or test a migration, without potentially corrupting your existing databases.

You can use the run backup node to schedule a disk backup of an addon, and open fork existing addon in an addon node to enter the source addon and backup. If your addon already contains usable backups, for example from a [backup schedule](databases-and-persistence.md#backup-restore-and-import-data-schedule-backups), you can use `latest` as the `backupId` to fork from the most recent backup.

Below is an example of taking a backup and using the reference (`${refs.sourceData}`) to get the addon (`addonId`) and the backup (`id`). You can ensure the new addon is the same version as the source backup by using the reference property `config.addonVersion`.

```json
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
            "addonId": "postgres",
            "backupType": "snapshot"
          },
          "condition": "success",
          "ref": "sourceData"
        },
        {
          "kind": "Addon",
          "spec": {
            "tlsEnabled": true,
            "billing": {
              "replicas": 1,
              "storage": 6144,
              "storageClass": "nvme",
              "deploymentPlan": "nf-compute-50"
            },
            "typeSpecificSettings": {
              "postgresqlConnectionPoolerReplicas": 2,
              "postgresqlReadConnectionPoolerReplicas": 2
            },
            "tags": [
              "${args.previewId}"
            ],
            "type": "postgresql",
            "name": "${args.previewId}-database",
            "version": "${refs.sourceData.config.addonVersion}",
            "source": {
              "addonId": "${refs.sourceData.addonId}",
              "backupId": "${refs.sourceData.id}"
            },
            "externalAccessEnabled": false,
            "ipPolicies": [],
            "pitrEnabled": false
          }
        }
      ]
    }
  }
}
```

### Fork an addon: Next steps

- [Upgrade a database: Upgrade your database to a newer version with one click.](databases-and-persistence.md#upgrade-a-database)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)
- [Set up a preview environment: Create templates in your pipelines to automatically generate temporary preview environments to view pull requests and branches.](release.md#set-up-a-preview-environment)
- [Create a template: Learn how to create and configure a Northflank template.](infrastructure-as-code.md#create-a-template)

## Global backup

Source: https://northflank.com/docs/v1/application/databases-and-persistence/global-backup.md

Global backups are team-level backup resources that can be accessed and restored across any project in your team. Unlike project-scoped backups which are tied to a specific addon, global backups provide flexibility for cross-project restoration, disaster recovery, and data migration scenarios.

To view or manage global backups, navigate to the `Backups` page from your team menu.

The global backups page displays all backups created in your team, including both native snapshots and database dumps, regardless of which project they originated from.

> [!note]
> [Click here](http://app.northflank.com/s/account/backups) to view your global backups.

### Global backup: Global backup types

Global backups support two backup types:

| Type | Description | Best for |
| --- | --- | --- |
| Disk | Block-level snapshots of addon storage | Fast backups with minimal impact on running addons |
| Native | Database dumps using native tools | Portability outside Northflank and cross-platform use |

**Disk backups** create snapshots of your addon's storage. They're fast to create and restore with minimal impact on your addon. Global backups enable cross-region restoration of disk snapshots, which are normally zone or region-scoped.

**Native backups** export database contents using database-native tools (e.g., `pg_dump`, `mongodump`). They take longer and may impact the addon during backup (run against read replicas when possible). The main advantage is portability: native dumps work outside Northflank and across different infrastructure.

Both types support cross-region restoration and migration through global backups.

### Global backup: Creating global backups

#### Global backup: Manual global backups

Manual global backups can be created on-demand from any addon in your team.

**From an addon:**

1. Navigate to the addon you want to backup

2. Open the **Backups** tab

3. Click **Create backup**

4. Choose backup type:

  - **Disk**: For fast snapshots

  - **Native Dump**: For portable database dumps

5. Configure global backup settings:

  - For **disk backups**: Enable "Take additional global backups" and choose the destination and retention time

  - For **native backups**: Enable "Store backup in custom destination" and select the backup destination

6. Click **Create backup**

The backup will appear in the global backups list and be accessible from any project in your team. Global backups are automatically tagged with the source addon name, project, timestamp, and database information.

#### Global backup: Scheduled global backups

Configure automatic global backups to run on a schedule, ensuring your critical data is backed up regularly without manual intervention.

**Setting up a backup schedule:**

1. Navigate to the addon

2. Click on the **Backup schedule** tab

3. Click **Add schedule**

4. Configure the schedule:

  - **Hourly**: Every N hours (1-23)

  - **Daily**: Specific time each day

  - **Weekly**: Specific day and time

5. Enable "Take additional global backups" and choose the destination and retention time

6. Save the schedule

#### Global backup: Multiple destinations

Scheduled global backups can store copies in multiple destinations simultaneously. This provides redundancy and allows you to meet different requirements with a single backup operation.

For example, you could configure:

- Primary: Your S3 bucket in `us-east-1` (co-located with services)

- Secondary: Your S3 bucket in `eu-west-1` (for disaster recovery)

All copies are created from the same backup operation, ensuring consistency.

### Global backup: Global backup destinations

Backup destinations define where backup data is stored. You can use Northflank's managed storage (on PaaS) or configure custom S3-compatible destinations (on BYOC).

To manage backup destinations, navigate to the [backup destinations page](https://app.northflank.com/s/account/backups/destinations) from your team menu.

#### Global backup: Custom backup destinations

Create custom backup destinations for:

- **Compliance**: Store backups in your own infrastructure

- **Fault tolerance**: Store backups in different regions

- **Data migration**: Move data between clusters

**To create a custom destination:**

1. Navigate to [backup destinations](https://app.northflank.com/s/account/backups/destinations)

2. Click **Create backup destination**

3. Provide S3-compatible storage credentials:

  - Endpoint URL

  - Access key ID

  - Secret access key

  - Bucket name

  - Region

4. Test the connection

5. Save the destination

### Global backup: Restoring from global backups

Global backups can be restored to create new addons in any project within your team.

**To restore a backup:**

1. Navigate to the [global backups page](https://app.northflank.com/s/account/backups)

2. Find the backup you want to restore

3. Click **Restore** or **Fork**

4. Select the target project

5. Configure the new addon settings (name, region, resources, version)

6. Confirm restoration

The addon will be created from the backup data.

### Global backup: Forking addons from global backups

Forking creates a new addon from an existing global backup, allowing you to create copies of databases for testing, development, or migration. This can be done across projects, clusters, and regions.

#### Global backup: During addon creation

When creating a new addon, you can select a global backup as the data source:

1. Create a new addon (database)

2. In the **Data** section, choose **From global backup** and select:

  - **Source project**: Choose any project in your team

  - **Source addon**: Choose your preferred source addon

  - **Global backup**: Choose from any backup in your team

3. Configure the new addon settings (name, region, resources, version)

4. Click **Create addon**

The new addon will be created with data from the selected backup.

## Integrate MongoDB Atlas with Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/integrate-with-a-database-provider/integrate-mongodb-atlas-with-northflank.md

This guide explains how to connect your [MongoDB® Atlas](https://www.mongodb.com/atlas) cluster to your applications on Northflank. We will first take you through setting up an Atlas cluster, deploying an application on Northflank, and connecting a database in your cluster with your application.

We will then look at egress gateways and configuring your Atlas cluster and Northflank project to reduce latency and bandwidth costs.

To get started you will need a Northflank account and a MongoDB Atlas account. [Create your Northflank account here](https://app.northflank.com/signup) and follow the onboarding steps, and create your [MongoDB Atlas account here](https://www.mongodb.com/cloud/atlas/register).

### Integrate MongoDB Atlas with Northflank: Create a MongoDB Atlas cluster

For this example we will deploy a free cluster on Google Cloud, in the central US region, the same as the Northflank project we will create in this guide.

1. Log in to your Atlas account, and select the organisation and project to deploy your cluster in

2. Navigate to the Database page under the Deployment section and click Build a database

3. Configure your Atlas cluster:

  1. select the `M0 (free)` plan

  2. Choose `Google Cloud` as the provider

  3. Select `Iowa (us-central1)` for the region

  4. Name your cluster `Northflank-Atlas`

4. Click Create

You should be taken automatically to the security quickstart page for your new Atlas cluster. You can read more about configuring your Atlas cluster for low latency, and reduced bandwidth costs later in this guide.

### Integrate MongoDB Atlas with Northflank: Configure MongoDB Atlas authentication

You can authenticate to your cluster using a username and password combination, or via certificate. To configure authentication using the quickstart page for security:

1. Select username and password, enter a username (`northflank`, for example), and generate a password

2. Save the password in a secure place and click Create user

3. Add `0.0.0.0/0` to your IP Access List

4. Click finish and close, and return to the cluster overview

This will allow Northflank workloads to connect to your Atlas cluster. You can read more about configuring a secure egress gateway on Northflank later in this guide.

### Integrate MongoDB Atlas with Northflank: Find your MongoDB Atlas connection string

We will now find and save your connection string, which you will use to connect your application to your Atlas database.

1. From the overview click the Connect button for the database we just deployed

2. Select Drivers from the 'connect to your application' section

3. Skip the configuration steps and find and copy your connection string. It should look like this:
  `mongodb+srv://<username>:<password>@<host>/?retryWrites=true&w=majority`

4. Replace `<password>` with your password for the user that you created earlier, and save the connection string in a secure place

We are now ready to connect our Atlas database with an application running on Northflank.

### Integrate MongoDB Atlas with Northflank: Deploy an application on Northflank

Follow the steps below to create a project and deploy your application:

1. Open the Create new menu and select Project

2. Give your project a name (for example, ‘Atlas integration’) and select `US - Central` as the region

3. Click Create project, then select Create secret and give it a name

4. Add the following variables to your secret group:

```ENV
PAYLOAD_SECRET=${fn.randomSecret(32)}
MONGODB_URI=<your-Atlas-connection-string>
```

1. Open the Create new menu and select Combined service

2. Give it a name, enter `https://github.com/northflank-guides/deploy-payload-on-northflank-with-atlas` for the repository and select Dockerfile for the build type

3. Create your service, and it will start a new build and deploy it when ready. It may take a moment for the Payload application to become ready after the container has deployed and is running.

4. Open the domain displayed in the header of your service to view the Payload application and add your first user

You can now return to your database on Atlas to Browse collections, where you will see your new user in the `users` collection.

### Integrate MongoDB Atlas with Northflank: Use an egress gateway to secure your network traffic

In our example we allowed any IP address to connect to our Atlas cluster, by adding `0.0.0.0/0` to the IP Access List. This makes your databases less secure, and should only be used for demonstration and testing purposes.

To use MongoDB Atlas with Northflank in production you should restrict your Atlas cluster to specific IP addresses. To allow your Northflank projects to communicate with your Atlas cluster, you can request to route traffic via an egress gateway, and provide a static IP address for your Atlas cluster’s IP Access List.

[Contact Northflank for more information](mailto:support@northflank.com).

### Integrate MongoDB Atlas with Northflank: Provision clusters to reduce latency and bandwidth costs

You can provision your Atlas clusters and Northflank projects on the same cloud provider and region to reduce latency between your applications and databases, and reduce your bandwidth costs.

If you’re deploying on Northflank’s managed cloud, you can choose Google Cloud when configuring your Atlas cluster, and choose the corresponding region:

| Northflank managed cloud region | Atlas Google Cloud region |
| --- | --- |
| Europe West | London (europe-west2) |
| Europe West Netherlands | Netherlands (europe-west4) |
| US East | South Carolina (us-east1) |
| US Central | Iowa (us-central1) |
| US West | Oregon (us-west1) |
| Asia Southeast | Singapore (asia-southeast1) |

You can also deploy Northflank clusters in your own cloud provider account, and use any provider and region available to you on MongoDB Atlas.

### Integrate MongoDB Atlas with Northflank: Next steps

- [How-to guides: Find out how to do anything on Northflank, from building from Git to deploying on your custom domain.](overview.md)
- [Run production workloads: Learn how to set up your DevOps workflow and confidently manage your production workloads on Northflank.](production-workloads.md#get-production-ready-on-northflank)

## Migrate your MinIO® deployment to Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/migrate-data-to-northflank/migrate-your-minio-deployment-to-northflank.md

You can migrate your existing MinIO®* deployment or S3-compatible storage to Northflank with different strategies:

- **Site replication:** if you are migrating from another MinIO deployment you can use site replication, which creates a two-way sync between MinIO deployments. Site replication synchronises your existing buckets and objects, as well as IAM, security tokens, access keys, and bucket-level configurations between deployments.

- **Mirror:** if you are migrating from an S3-compatible storage service or do not want to enable two-way sync you can use the mirror command. This will create a one-way sync between your existing buckets and your Northflank addon.

- **Copy:** if you are migrating from S3-compatible storage, another MinIO deployment, or your local/server filesystem and your storage is not actively being used (no new uploads, modifications, or deletions), you can use the copy command to move your bucket contents to Northflank.

### Migrate your MinIO® deployment to Northflank: Permissions

The account used to access your source MinIO deployment will require the `EnableRemoteBucketConfiguration` and `EnableReplicationRuleConfiguration` permissions.

You can find the [necessary policy here](https://min.io/docs/minio/linux/administration/bucket-replication/bucket-replication-requirements.html#id1).

### Migrate your MinIO® deployment to Northflank: Import using replicate

Site replication allows you to seamlessly migrate your existing MinIO deployment to Northflank. You can only configure site replication between MinIO deployments, if you are migrating from another S3-compatible storage system you can migrate using the [mirror](databases-and-persistence.md#migrate-your-minio®-deployment-to-northflank-import-using-mirror) or [copy](databases-and-persistence.md#migrate-your-minio®-deployment-to-northflank-import-using-copy) methods.

After configuring site replication you can either remove your old MinIO deployment and terminate it to transfer fully over to Northflank, or leave it running with site replication enabled in order to provide redundancy.

You can replicate your entire existing MinIO deployment either in the [MinIO console](https://min.io/), or using the [MinIO client](https://min.io/docs/minio/linux/reference/minio-mc.html).

First [create a Northflank MinIO addon](https://app.northflank.com/s/project/create/addon) to import to, and [connect to it](databases-and-persistence.md#deploy-minio®-on-northflank-connect-to-minio) with your preferred administration tool.

> [!note] Prerequisites for site replication
>
- The Northflank MinIO addon you want to import to must be empty of all buckets and objects
- If you are using an external identity provider with your existing MinIO deployment, configure the Northflank MinIO deployment with this before continuing
- The source MinIO site and the Northflank MinIO addon must be [publicly accessible](databases-and-persistence.md#deploy-minio®-on-northflank-access-minio) during the migration
- [Check the MinIO documentation](https://min.io/docs/minio/linux/operations/install-deploy-manage/multi-site-replication.html#prerequisites) for multi-site replication before beginning.

#### Migrate your MinIO® deployment to Northflank: Replicate your site using the MinIO console

Navigate to your source MinIO deployment that contains your data and log in using the console endpoint. Open the site replication page and click add sites. Enter the details for your existing MinIO instance, and give it a recognisable name.

Return to your Northflank MinIO addon's connection details page and copy the `EXTERNAL_MINIO_ENDPOINT`, `ACCESS_KEY` and `SECRET_KEY` into the peer sites section of the site replication page, and give it a recognisable name.

Save these details and your MinIO deployments will begin syncing. You can check the progress from the replication status page, which will show you the number of synchronised buckets, users, groups, and policies between the deployments. You can also check the status of individual buckets.

You can now replace your old MinIO deployment's connection details with the new Northflank endpoint and keys in your application/infrastructure. While both deployments are live and site replication is enabled all data will be synchronised between both MinIO instances.

You can delete the site replication configuration from either MinIO deployment's site replication page and terminate your old MinIO deployment when ready.

#### Migrate your MinIO® deployment to Northflank: Replicate your site using the MinIO client

Add your source MinIO deployment and the Northflank MinIO addon as aliases in your shell, using your relevant connection details:

```shell
mc alias set minio-source <MINIO_SOURCE_ENDPOINT> <ADMIN_USERNAME> <ADMIN_PASSWORD>
mc alias set minio-northflank <EXTERNAL_MINIO_ENDPOINT> <ADMIN_USERNAME> <ADMIN_PASSWORD>
```

Now run the `mc admin replicate add` command to configure site replication. The source MinIO instance must be listed first:

```shell
mc admin replicate add minio-source minio-northflank
```

You should see a success message, and you can check the replication configuration with the command:

```shell
mc admin replicate status minio-source
```

You can check the sync progress with:

```shell
mc admin replicate status minio-northflank
```

You can now replace your old MinIO deployment's connection details with the new Northflank endpoint and keys in your application/infrastructure. While both deployments are live and site replication is enabled all data will be synchronised between both MinIO instances. You can delete the site replication configuration with the following command when ready:

```shell
mc admin replicate rm minio-northflank minio-source --force
```

The two MinIO deployments will now be unlinked, and you can terminate your old MinIO deployment.

### Migrate your MinIO® deployment to Northflank: Import using mirror

If you are importing from another S3-compatible storage service you can use the [mirror](https://min.io/docs/minio/linux/reference/minio-mc/mc-mirror.html#continuously-mirror-s3-bucket-to-an-s3-compatible-host) command to synchronise your bucket contents.

Mirror will create a one-way sync between your source storage and your Northflank MinIO addon. This means you can transfer existing buckets and objects as well as keep up-to-date with any new uploads while migrating your applications and infrastructure to use the Northflank addon.

> [!note] Versioning and metadata
> Mirror will not copy any metadata or previous versions of your objects, this data will be lost. If versioning is enabled on a bucket in your Northflank MinIO storage, objects will be versioned from the point that they were transferred to the new bucket.

The mirror command will only copy file paths and objects, you will need to manually create any users, groups, and other MinIO configuration options. You can do this before, or after, transferring your data.

First [create a Northflank MinIO addon](https://app.northflank.com/s/project/create/addon) to import to, and [connect to it](databases-and-persistence.md#deploy-minio®-on-northflank-connect-to-minio) with your preferred administration tool.

#### Migrate your MinIO® deployment to Northflank: Configure your buckets

If your existing buckets on your source S3 storage have any policies affecting them, such as versioning, quotas, retention, or object locking you should re-create your buckets and their associated policies in your Northflank MinIO addon before transferring your objects with mirror.

For example, if your source S3 bucket has object locking enabled and has locked objects stored in it, you must create a bucket with object locking enabled otherwise the transfer will fail.

If no bucket with the specified name is present on the target, the mirror command can will a new bucket with no policies. However, you will not be able to configure some policies after bucket has been created, including retention and object locking.

#### Migrate your MinIO® deployment to Northflank: Copy your storage contents using mirror

Add your source S3 storage deployment and the Northflank MinIO addon as aliases in your shell, using your relevant connection details (you can copy the `EXTERNAL_MINIO_CONNECT_COMMAND` from the Northflank addon's connection details page):

```shell
mc alias set S3-source <S3_SOURCE_ENDPOINT> <ADMIN_USERNAME> <ADMIN_PASSWORD>
mc alias set minio <EXTERNAL_MINIO_ENDPOINT> <ADMIN_USERNAME> <ADMIN_PASSWORD>
```

You can now begin mirroring either all your buckets, or specific buckets from your existing storage to Northflank. You can mirror all buckets from the source by specifying only the source and target aliases, or mirror specific buckets/paths within buckets, by specifying the source and target aliases and buckets/paths.

```shell
## mirror all buckets
mc mirror --watch S3-source minio

## mirror specific bucket/path
mc mirror --watch S3-source/source-bucket minio/target-bucket
```

The `--watch` option means the process will continuously synchronise files from the source to Northflank until you terminate it. It will overwrite objects that exist on the source and on the Northflank addon, which means any changes to objects on the source will be synchronised.

The `--watch` option does not remove objects that exist on the target but not the source, but you can use the `--remove` flag as well if required. This will only remove objects when the command is first run, so you can continue to sync new objects from the source while also uploading new objects to the Northflank MinIO addon.

#### Migrate your MinIO® deployment to Northflank: Migrate your application/infrastructure

You can now configure your new MinIO deployment with any required users, groups, and policies, if you have not already, and update your application and infrastructure to use the Northflank MinIO addon's connection details.

The Northflank MinIO deployment should now receive uploads from applications with the new connection details, as well as new uploads to your old S3 storage. This will allow you to gracefully migrate to Northflank, and you can terminate the mirror process and your old S3 storage deployment when ready.

### Migrate your MinIO® deployment to Northflank: Import using copy

If you are importing from another S3-compatible storage service or your local/server filesystem you can use the [copy](https://min.io/docs/minio/linux/reference/minio-mc/mc-cp.html) command to simply upload objects to your buckets.

This is a one-time operation, so any changes made to the source buckets or local files will not be reflected in your Northflank MinIO addon after the copy has been completed. If you need to migrate storage that is actively in use you should use [mirror](databases-and-persistence.md#migrate-your-minio®-deployment-to-northflank-import-using-mirror) or [replicate the site (MinIO only)](databases-and-persistence.md#migrate-your-minio®-deployment-to-northflank-import-using-replicate) instead.

First [create a Northflank MinIO addon](https://app.northflank.com/s/project/create/addon) to import to, and [connect to it](databases-and-persistence.md#deploy-minio®-on-northflank-connect-to-minio) with your preferred administration tool.

#### Migrate your MinIO® deployment to Northflank: Configure your buckets

Using the console or client create your required buckets, configured with or without versioning, quotas, retention, or object locking. You will not be able to configure some policies after a bucket has been created.

#### Migrate your MinIO® deployment to Northflank: Copy objects from S3-compatible storage

Add your source S3-compatible storage deployment and the Northflank MinIO addon as aliases in your shell, using your relevant connection details (you can copy the `EXTERNAL_MINIO_CONNECT_COMMAND` from the Northflank addon's connection details page):

```shell
mc alias set S3-source <S3_SOURCE_ENDPOINT> <ADMIN_USERNAME> <ADMIN_PASSWORD>
mc alias set minio <EXTERNAL_MINIO_ENDPOINT> <ADMIN_USERNAME> <ADMIN_PASSWORD>
```

You can now copy the contents of existing buckets using the `cp` command with the `--recursive` flag, to copy all the bucket's objects and their paths:

```shell
mc cp --recursive S3-source/source-bucket minio/target-bucket
```

#### Migrate your MinIO® deployment to Northflank: Copy objects from local filesystem

Add your Northflank MinIO addon as an alias in your shell, using either the `EXTERNAL_MINIO_CONNECT_COMMAND` from the addon's connection details page, or the `MINIO_CONNECT_COMMAND` if you have [forwarded](../api/forwarding.md) your addon:

```shell
mc alias set minio <EXTERNAL_MINIO_ENDPOINT> <ADMIN_USERNAME> <ADMIN_PASSWORD>
```

You can now copy the contents of existing buckets using the `cp` command with the `--recursive` flag, to copy all objects and their paths from the specified directory:

```shell
mc cp --recursive local_files/my_objects minio/target-bucket
```

#### Migrate your MinIO® deployment to Northflank: Migrate your application/infrastructure

Check your Northflank MinIO addon has all the buckets and objects you expect it to using the console or client.

You can now configure your new MinIO deployment with any required users, groups, and policies, if you have not already, and update your application and infrastructure to use the Northflank MinIO addon's connection details.

### Migrate your MinIO® deployment to Northflank: Next steps

- [Deploy MinIO® on Northflank: MinIO is a High Performance Object Storage with an Amazon S3 cloud storage service compatible API.](databases-and-persistence.md#deploy-minio®-on-northflank)
- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)

* MinIO is a registered trademark of the MinIO Corporation.

## Migrate your MongoDB® database to Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/migrate-data-to-northflank/migrate-your-mongodb-database-to-northflank.md

You can import your existing MongoDB® database to Northflank by creating and uploading a dump of your database, or providing a connection string to your existing database.

Imports will be more reliable if the database you are importing to is the same, or a newer, version of MongoDB as the source database you are exporting from.

> [!warning]
> Both methods of importing a database will erase all existing user databases in the Northflank addon, if there are any.

You should first [create a Northflank MongoDB addon](https://app.northflank.com/s/project/create/addon) to import to, and [connect to it](databases-and-persistence.md#deploy-mongodb®-on-northflank-connect-to-mongodb) with your preferred administration tool. If you require your Northflank deployment to remain private you can [forward it](../api/forwarding.md) to your local machine and use the non-external endpoints and commands to connect.

### Migrate your MongoDB® database to Northflank: Permissions

To run mongodump you must have `find` [privileges](https://www.mongodb.com/docs/database-tools/mongodump/#required-access) on the databases you want to back up, or the `backup` role.

### Migrate your MongoDB® database to Northflank: Import from dump

Importing from a dump of a database will erase all existing user databases on the target MongoDB addon, and your dump will be imported as the default database on the Northflank addon (specified in your addon’s connection details as `DATABASE`).

To start, you will need to generate a dump of your existing database using [mongodump](https://www.mongodb.com/docs/database-tools/mongodump/#mongodb-binary-bin.mongodump).

#### Migrate your MongoDB® database to Northflank: Create a dump using mongodump

You must run mongodump from the system command line, not the mongo shell. You must have the [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/installation/installation/) installed.

You can use either a [connection string](https://www.mongodb.com/docs/manual/reference/connection-string/) or provide your connection details as parameters to the mongodump command. The exact connection string or details you use to connect will depend on your provider or MongoDB configuration. The following commands create a compressed archive file in the working directory where the command is run, you can omit the `--gzip` flag and `.gz` extension to produce an uncompressed file.

##### Migrate your MongoDB® database to Northflank: With connection string

```shell
## Standalone
mongodump --uri="mongodb://<USER><:PASSWORD>@<HOST><:PORT></DATABASE_TO_EXPORT>?authSource=<AUTH_DB>" --gzip --archive=<DUMP_NAME>.archive.gz

## Replica set using DNS seed list
mongodump --uri="mongodb+srv://<USER><:PASSWORD>@<HOST><:PORT></DATABASE_TO_EXPORT>?replicaSet=<REPLICA_SET>&authSource=<AUTH_DB>" --gzip --archive=<DUMP_NAME>.archive.gz
```

##### Migrate your MongoDB® database to Northflank: With parameters

```shell
mongodump --host=<HOST> --port=<PORT> --username=<USER> --authenticationDatabase=<AUTH_DB> --db=<DATABASE_TO_EXPORT> --gzip --archive=<DUMP_NAME>.archive.gz
```

See the [mongodump](https://www.mongodb.com/docs/database-tools/mongodump/#options) documentation for more information.

#### Migrate your MongoDB® database to Northflank: Import dump to Northflank

Navigate to your MongoDB addon’s backups page and click import backup. Enter a recognisable name and select either upload, if your dump is stored locally, or URL if your dump is hosted online and accessible. You can upload the dump as plain text, or as a gzipped file (`.gz`).

After selecting your file, or entering the URL, click upload import. All backups stored on Northflank are encrypted at rest, to keep your data private and secure.

Select the uploaded import from the backups list and click restore  to begin importing the database to your Northflank MongoDB addon. All user data in the existing MongoDB database on Northflank will be erased before importing the contents of the dump file.

You can click on a restore listed in a backup to view the logs of the restoration, and you will be able to see in the backups list and the list of restores whether or not the restoration was successful.

You can now double-check that the import has run as you expected it to by accessing the addon via the mongo shell or a GUI tool.

> [!note]
> Northflank will copy your collections to the default Northflank-generated database when importing from a dump. You can find the name of the default database in your Northflank addon's connection details as `DATABASE`.

### Migrate your MongoDB® database to Northflank: Import from connection string

You can import a database from your source MongoDB instance by [providing a connection string](https://www.mongodb.com/docs/manual/reference/connection-string/). Navigate to the backups page of your Northflank MongoDB addon and select import backup.

Enter a recognisable name and select connection string as the import method, and provide the connection string for your source database, which must be publicly available. The connection string will take the format:

```shell
## Standalone
mongodb://<USER><:PASSWORD>@<HOST><:PORT>/<DATABASE>

## Replica set using DNS seed list
mongodb+srv://<USER><:PASSWORD>@<HOST><:PORT></DATABASE>?replicaSet=<REPLICA_SET>
```

When you start the import, Northflank will create a dump of the specified database. After importing, select the new import from the backups list and click restore  to begin importing the database to your Northflank MongoDB addon. Your database will be imported to the default Northflank-generated database, the database name can be found in your addon's connection details as `DATABASE`.

You can now double-check that the import has run as you expected it to by accessing the addon via a GUI, or [forward it using the Northflank CLI](../api/forwarding.md) to connect locally. If you need to make any changes you can connect to your Northflank MongoDB addon using the admin URI connection strings, or by using the `ADMIN_USERNAME` and `ADMIN_PASSWORD` login details.

### Migrate your MongoDB® database to Northflank: Next steps

- [Deploy MongoDB® on Northflank: MongoDB is a document-oriented database program that uses JSON-like documents with schema.](databases-and-persistence.md#deploy-mongodb®-on-northflank)
- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)

## Migrate your MySQL database to Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/migrate-data-to-northflank/migrate-your-mysql-database-to-northflank.md

You can import your existing MySQL database to Northflank by creating and uploading a dump of your database, or providing a connection string to your existing database.

Imports will be more reliable if the database you are importing to is the same, or a newer, version of MySQL as the source database you are exporting from.

If you have more than one database to import from the same MySQL instance you should use the connection string method, which will import all the databases the given user has access to.

> [!warning]
> Both methods of importing a database will erase all existing user databases in the Northflank addon, if there are any.

You should first [create a Northflank MySQL addon](https://app.northflank.com/s/project/create/addon) to import to, and [connect to it](databases-and-persistence.md#deploy-mysql-on-northflank-connect-to-mysql) with your preferred administration tool. If you require your Northflank deployment to remain private you can [forward it](../api/forwarding.md) to your local machine and use the non-external endpoints and commands to connect.

### Migrate your MySQL database to Northflank: Permissions

The user for the database you are exporting from may need the following permissions: `SELECT`, `SHOW_VIEW`, `TRIGGER`, `LOCK TABLES`, and `PROCESS`. You can grant permissions to a user with the following SQL query:

```sql
GRANT <PRIVILEGE> ON <DATABASE>.* TO <USER>@'localhost';
```

Replace the values with the required privilege, the database you're trying to export, and the user.

### Migrate your MySQL database to Northflank: Import from dump

Importing from a dump of a database will erase all existing user databases on the target MySQL addon, and your dump will be imported as the default database on the Northflank addon (specified in your addon’s connection details as `DATABASE`). You can only import one database using this method, if you have more than one database to import you should use the [connection string method](databases-and-persistence.md#migrate-your-mysql-database-to-northflank-import-from-connection-string).

To start, you will need to generate a dump of your existing database using either a GUI or command line tool. The exact method to access your existing database will depend on your current service provider.

#### Migrate your MySQL database to Northflank: Create a dump using MySQL Workbench

You can create a dump of your source database using [MySQL Workbench](https://www.mysql.com/products/workbench/). Connect to your source MySQL server and select data export from the server menu.

Select the database and tables you want to export. Ensure `dump structure and data` is selected, `include create schema` is not selected, and choose to export the dump to a self-contained file. In advanced options enter `OFF` in the `set-gtid-purged` field and create your dump.

#### Migrate your MySQL database to Northflank: Create a dump using mysqldump

You can create a dump in your terminal using the [mysqldump tool](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html), part of the [mysql client](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install.html).

You should only dump a single database and you are recommended to use the following command to generate your dump:

```shell
mysqldump "--host=<HOST>" "--port=<PORT>" "--user=<USER>" -p "--skip-comments" "--no-set-names" "--no-create-db" "--set-gtid-purged=OFF" "<DATABASE>" > database.sql
```

Replace the values for `HOST`, `PORT`, `USER`, and `DATABASE` with the details for your current MySQL instance, providing a user with sufficient permissions to dump the database. You must include the `--no-create-db` and `--set-gtid-purged=OFF` options in your command, or you will not be able to restore from the dump in your Northflank addon.

The file will be generated at the given path, or in the working directory if no path is specified for the output.

#### Migrate your MySQL database to Northflank: Import dump to Northflank

Navigate to your MySQL addon’s backups page and click import backup. Enter a recognisable name and select either upload, if your dump is stored locally, or URL if your dump is hosted online and accessible. You can upload the dump as plain text or as a gzipped file (`.gz`).

After selecting your file, or entering the URL, click upload import. All backups stored on Northflank are encrypted at rest, to keep your data private and secure.

Select the uploaded import from the backups list and click restore  to begin importing the database to your Northflank MySQL addon. All user data in the existing MySQL database on Northflank will be erased, excluding the system databases `information_schema` and `performance_schema`, before importing the contents of the dump file.

You can click on a restore listed in a backup to view the logs of the restoration, and you will be able to see in the backups list and the list of restores whether the restoration was successful.

You can now double-check that the import has run as you expected it to by accessing the addon using your preferred administration tool.

> [!note]
> Northflank will import to the default database if your dump doesn't include an explicit `USE` statement. You can find the name of the default database in your Northflank addon's connection details as `DATABASE`.

### Migrate your MySQL database to Northflank: Import from connection string

You can import one or more databases from your source MySQL database by [providing a JDBC connection string](https://dev.mysql.com/doc/connector-j/en/connector-j-reference-jdbc-url-format.html). Create a new MySQL addon in Northflank, or navigate to an existing one, and select import backup from the backups page.

Enter a recognisable name and select connection string as the import method, and provide the connection string for your source database. The source database must be publicly available and the connection string must take the format:

```
jdbc:mysql://username:password@host:port/database
```

Only databases that the supplied credentials have permission to access will be imported. When you start the import, Northflank will create dumps of all the databases available.

After importing, select the import from the backups list and click restore  to begin importing to your Northflank MySQL addon. All user data in the existing MySQL database on Northflank will be erased, excluding the system databases `information_schema` and `performance_schema`, before restoring from the import.

Each database will be imported with its existing name, the default Northflank database will be recreated as an empty database.

You can now double-check that the import has run as you expected it to by accessing the addon via pgAdmin, or [forward it using the Northflank CLI](../api/forwarding.md) to connect locally. If you need to make any changes you can connect to your Northflank MySQL addon using the admin URI connection strings, or by using the `ADMIN_USERNAME` and `ADMIN_PASSWORD` login details.

### Migrate your MySQL database to Northflank: Next steps

- [Deploy MySQL on Northflank: MySQL is a fast, reliable, scalable, and easy to use open-source relational database system.](databases-and-persistence.md#deploy-mysql-on-northflank)
- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)

## Migrate your PostgreSQL database to Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/migrate-data-to-northflank/migrate-your-postgresql-database-to-northflank.md

You can import your existing PostgreSQL database to Northflank by creating and uploading a dump of your database, or providing a connection string to your existing database.

Imports will be more reliable if the database you are importing to is the same, or a newer, version of PostgreSQL as the source database you are exporting from.

If you have more than one database to import from the same PostgreSQL service you should use the connection string method, which will import all the databases the given user has access to.

> [!warning]
> Both methods of importing a database will erase all existing user databases in the Northflank addon, if there are any.

You should first [create a Northflank PostgreSQL addon](https://app.northflank.com/s/project/create/addon) to import to, and [connect to it](databases-and-persistence.md#deploy-postgresql-on-northflank-connect-to-postgresql) with your preferred administration tool. If you require your Northflank deployment to remain private you can [forward it](../api/forwarding.md) to your local machine and use the non-external endpoints and commands to connect.

### Migrate your PostgreSQL database to Northflank: Permissions

The user for the database you are exporting from must have the following permissions:

- `Connect` on the database(s) you want to export

- `Select` on all the tables in the database schema you want to export

- `Select` on all sequences in the database schema you want to export

You can grant permissions via a PostgreSQL administration tool such as pgAdmin, or via an SQL query, replacing `<DATABASE>`, `<SCHEMA>`, and `<USER>` with the relevant values for your database:

```postgresql
GRANT CONNECT ON DATABASE <DATABASE> to <USER>;
GRANT SELECT ON ALL TABLES IN SCHEMA <SCHEMA> TO <USER>;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA <SCHEMA> TO <USER>;
```

### Migrate your PostgreSQL database to Northflank: Import from dump

Importing from a dump of a database will erase all existing user databases on the target PostgreSQL addon, and your dump will be imported as the default database on the Northflank addon (specified in your addon’s connection details as `DATABASE`). You can only import one database using this method, if you have more than one database to import you should use the [connection string method](databases-and-persistence.md#migrate-your-postgresql-database-to-northflank-import-from-connection-string).

To start, you will need to generate a dump of your existing database, either using an administration tool such as [pgAdmin](https://www.pgadmin.org) or via the terminal using [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html) . The exact method will depend on your current service provider.

#### Migrate your PostgreSQL database to Northflank: Create a dump in pgAdmin

To create a dump in pgAdmin, right click on a database and select backup…. Give your dump a recognisable name, and select `plain` or `compressed` as the format.

Open the Data/Objects settings and select `owner` and `privilege` under `do not save`.

Click on tools and open storage manager, then select your newly-created dump and download it by clicking the download button .

#### Migrate your PostgreSQL database to Northflank: Create a dump using pg_dump

You can create a dump using the `pg_dump` tool in your terminal. This can be run either on your server and then downloaded, or run locally, with the publicly accessible database URI:

`pg_dump "<DB_URI>" "--no-owner" "--no-privileges" "--no-password" "--no-tablespaces" > dumpfile`

The database URI should take the format:

```
postgresql://<USERNAME>:<PASSWORD>@<HOST><:PORT>/<DATABASE>?sslmode=require
```

Note: you may need to surround the URI with quotes for the command to work.

#### Migrate your PostgreSQL database to Northflank: Import dump to Northflank

Navigate to your Northflank PostgreSQL addon’s backups page and click import backup. Enter a recognisable name and select either upload, if your dump is stored locally, or URL if your dump is hosted online and accessible. You can upload the dump as plain text or as a gzipped file (`.gz`).

After selecting your file, or entering the URL, click upload import. All backups stored on Northflank are encrypted at rest, to keep your data private and secure.

Select the uploaded import from the backups list and click restore  to begin importing the database to your Northflank PostgreSQL addon. All user data in the existing PostgreSQL database on Northflank will be erased, except for the `postgres` system database, before importing the contents of the dump file.

You can click on a restore listed in a backup to view the logs of the restoration, and you will be able to see in the backups list and the list of restores whether the restoration was successful.

You can now double-check that the import has run as you expected it to by accessing the addon using your preferred administration tool.

> [!note]
> Northflank will import to the default database if your dump doesn't include an explicit `\connect` statement. You can find the name of the default database in your Northflank addon's connection details as `DATABASE`.

### Migrate your PostgreSQL database to Northflank: Import from connection string

You can import one or more databases from your source PostgreSQL database by [providing a connection string](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING). Navigate to your Northflank PostgreSQL addon and select import backup from the backups page.

Enter a recognisable name and select connection string as the import method, and provide the connection string for your source database. The source database must be publicly available and the connection string must take the format:

```
postgresql://username:password@host:port/database?sslmode=require
```

Only databases that the supplied credentials have permission to access will be imported. When you start the import, Northflank will create dumps of all the available databases.

After importing, select the uploaded import from the backups list and click restore  to begin importing the dump to your Northflank PostgreSQL addon. All user data in the existing PostgreSQL database on Northflank will be erased, except for the `postgres` system database, before restoring from the imported dump.

Each database will be imported with its existing name, the default Northflank database will be recreated as an empty database.

You can now double-check that the import has run as you expected it to by accessing the addon via pgAdmin, or [forward it using the Northflank CLI](../api/forwarding.md) to connect locally. If you need to make any changes you can connect to your Northflank PostgreSQL addon using the admin URI connection strings, or by using the `ADMIN_USERNAME` and `ADMIN_PASSWORD` login details.

### Migrate your PostgreSQL database to Northflank: Next steps

- [Deploy PostgreSQL on Northflank: PostgreSQL, also known as Postgres, is a free and open-source relational database management system.](databases-and-persistence.md#deploy-postgresql-on-northflank)
- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)

## Migrate your RabbitMQ deployment to Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/migrate-data-to-northflank/migrate-your-rabbitmq-deployment-to-northflank.md

You can import your existing RabbitMQ instance's definitions to Northflank, so you can begin running your RabbitMQ instance on Northflank with the same configuration.

You should first [create a Northflank RabbitMQ addon](https://app.northflank.com/s/project/create/addon) to import to, and [connect to it](databases-and-persistence.md#deploy-rabbitmq-on-northflank-connect-to-rabbitmq) with your preferred administration tool. If you require your Northflank deployment to remain private you can [forward it](../api/forwarding.md) to your local machine and use the non-external endpoints and commands to connect.

### Migrate your RabbitMQ deployment to Northflank: Permissions

The user you use to import and export from RabbitMQ instances should have the [administrator tag](https://www.rabbitmq.com/access-control.html#user-tags) tag (enabled by the management plugin).

Your RabbitMQ instances require the [RabbitMQ management plugin](https://www.rabbitmq.com/management.html) to be enabled, this is enabled by default for your Northflank addon.

### Migrate your RabbitMQ deployment to Northflank: Import definitions using the RabbitMQ web interface

You can export and import definitions using the RabbitMQ web interface (`MANAGEMENT_ENDPOINT` in your Northflank addon's connection details page).

![The RabbitMQ management web interface showing definition export and import](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/migrate-your-data-to-northflank/migrate-your-rabbitmq-deployment-to-northflank/rabbitmq-definitions-gui.jpg)

#### Migrate your RabbitMQ deployment to Northflank: Export definitions

From the overview page expand the export definitions section. You can use the generated file name, or enter your own. Choose to export definitions for all virtual hosts, or export definitions from a specific virtual host and click download broker definitions to save the `.json` file.

#### Migrate your RabbitMQ deployment to Northflank: Import definitions

From the overview page expand the import definitions section. Select the `.json` file containing your definitions, and specify which virtual host to export the definitions to, or all, and click upload broker definitions.

You can now publish and consume messages using the same configuration as your existing RabbitMQ service, using the endpoints for the Northflank addon.

### Migrate your RabbitMQ deployment to Northflank: Import definitions using the CLI

You can use the [rabbitmqadmin](https://www.rabbitmq.com/management-cli.html) command-line tool to export and import definitions for your RabbitMQ instances, you must [install RabbitMQ](https://www.rabbitmq.com/download.html) locally to use `rabbitmqadmin` commands.

#### Migrate your RabbitMQ deployment to Northflank: Export definitions

You can export your current RabbitMQ instance's definitions (users, vhosts, queues, exchanges, bindings, runtime parameters) using the following command:

```shell
rabbitmqadmin --host=<SOURCE_RABBITMQ_HOST> --port=<SOURCE_RABBITMQ_HOST> -u <SOURCE_ADMIN_USERNAME> -p <SOURCE_ADMIN_PASSWORD> export <FILE_PATH>/<FILE_NAME>.json
```

This will export your current definitions to a file in your working directory (or to a specified path). You may need to use [other options](https://www.rabbitmq.com/management-cli.html) in your command, such as `-s` if your RabbitMQ instance requires TLS to connect.

#### Migrate your RabbitMQ deployment to Northflank: Import definitions

You can import your definitions to your Northflank addon using the following command, with the definitions file in the working directory or by providing the full path. The necessary parameters can be found on your addon's connection details page.

```shell
rabbitmqadmin --host=<NORTHFLANK_RABBITMQ_HOST> --port=<NORTHFLANK_RABBITMQ_HOST> -s -u <ADMIN_USERNAME> -p <ADMIN_PASSWORD> import_definitions <FILE_PATH>/<FILE_NAME>.json
```

You can now publish and consume messages using the same configuration as your existing RabbitMQ service, using the endpoints for the Northflank addon.

### Migrate your RabbitMQ deployment to Northflank: Next steps

- [Deploy RabbitMQ on Northflank: RabbitMQ is a lightweight, easy to deploy, open-source message broker that supports multiple messaging protocols.](databases-and-persistence.md#deploy-rabbitmq-on-northflank)
- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)

## Migrate your Redis® deployment to Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/migrate-data-to-northflank/migrate-your-redis-deployment-to-northflank.md

You can import your existing Redis®* data to Northflank either as a snapshot of the database or by using live replication to transfer existing and new keys to your Northflank Redis addon.

You should first [create a Northflank Redis addon](https://app.northflank.com/s/project/create/addon) to import to.

> [!note]
> There is currently an issue with RIOT which means URI handling is not working. Please specify the host, port, and password (and username if required) separately when running commands.

### Migrate your Redis® deployment to Northflank: Import a snapshot using RIOT

You can import your current Redis instance's keys and values using [RIOT](https://developer.redis.com/riot/). Download and install the tool on your local machine, or on the server with your existing Redis instance.

It is recommended that you make both the source Redis instance and the Northflank Redis addon [publicly accessible](databases-and-persistence.md#deploy-redis®-on-northflank-access-redis) over the internet. Alternatively, you can [forward the Northflank addon](../api/forwarding.md) to your local machine or existing Redis deployment and use the non-external command to connect securely.

The exact command you will need to run depends on your existing Redis provider and your Redis usage. You may need to configure [reader options](https://developer.redis.com/riot/#_file_export_reader_options) if you store a lot of keys, or big sets.

#### Migrate your Redis® deployment to Northflank: From managed service to Northflank

You can migrate from an existing service provider using the connection details for your existing Redis instance, and the connection details for your Northflank Redis addon, found on the connection details page.

```shell
## without TLS (forwarded Northflank addon)
riot -h <SOURCE_REDIS_HOST> -p <SOURCE_REDIS_PORT> -a <SOURCE_REDIS_PASSWORD> replicate -h <NORTHFLANK_REDIS_HOST> -p <NORTHFLANK_REDIS_PORT> -a <NORTHFLANK_REDIS_PASSWORD>

## with TLS enabled on Redis source and Northflank addon
riot -h <SOURCE_REDIS_HOST> -p <SOURCE_REDIS_PORT> -a <SOURCE_REDIS_PASSWORD> --tls --tls-verify=NONE replicate -h <NORTHFLANK_REDIS_HOST> -p <NORTHFLANK_REDIS_PORT> -a <NORTHFLANK_REDIS_PASSWORD> --tls --tls-verify=NONE
```

If you are not using the default user on your source Redis instance, you can also specify the user by including the `--user` flag.

#### Migrate your Redis® deployment to Northflank: From local machine to Northflank

You can migrate from your local machine, or via the terminal on your server, by specifying the hostname, port, and password for the local instance, and the connection details for your Northflank Redis addon as the target, found on the connection details page.

```shell
riot -h <LOCAL_REDIS_HOST> -p <LOCAL_REDIS_PORT> -a <LOCAL_REDIS_PASSWORD> -a  replicate -h <NORTHFLANK_REDIS_HOST> -p <NORTHFLANK_REDIS_PORT> -a <NORTHFLANK_REDIS_PASSWORD> --tls --tls-verify=NONE
```

If you are not using the default user on your local Redis instance, you can also specify the user by including the `--user` flag.

RIOT should import all keys and values from the source Redis instance to your Northflank addon, you can double-check that the import has run as you expected it to by [accessing the addon](databases-and-persistence.md#deploy-redis®-on-northflank-access-redis) and comparing keys and values.

### Migrate your Redis® deployment to Northflank: Live replication using RIOT

You can configure live replication between your existing and Northflank Redis instances using [RIOT's live replication mode](https://developer.redis.com/explore/riot).

This method will allow you to seamlessly migrate a Redis instance, as new keys created on the source will be transferred to your new Northflank Redis instance. This method uses pub/sub which means delivery is not guaranteed, and it may also fail if trying to copy big sets repeatedly. You should evaluate your Redis store for big sets before using these methods to migrate.

Before using live replication you will need to enable keyspace notifications in each Redis instance. You can do this by logging into each instance using redis-cli and entering the command `CONFIG SET notify-keyspace-events KA`.

You can use the same commands as to [import a snapshot](databases-and-persistence.md#migrate-your-redis®-deployment-to-northflank-import-a-snapshot-using-riot-redis), adding the required mode flag at the end of the command:

#### Migrate your Redis® deployment to Northflank: Live only `--mode liveonly`

Live only mode will only replicate keys added or updated in your source Redis instance after the process has started, and not keys that currently exist in your source Redis.

#### Migrate your Redis® deployment to Northflank: Initial and live `--mode live`

Live mode will copy your current keys from your source Redis instance, as well as replicate any new keys and updates to keys from your source Redis while the process is running.

#### Migrate your Redis® deployment to Northflank: Verification and migration

You can double-check that replication is working as expected by [accessing the addon](databases-and-persistence.md#deploy-redis®-on-northflank-access-redis) manually, or running RIOT's [compare command](https://developer.redis.com/explore/riot/#step-5-verification).

You can now configure your applications and infrastructure to use the Northflank Redis addon. Once your changes are live, you can terminate the RIOT replicate process and shut down your original source Redis instance.

### Migrate your Redis® deployment to Northflank: Next steps

- [Deploy Redis® on Northflank: Redis implements a distributed, in-memory key-value database with optional durability.](databases-and-persistence.md#deploy-redis®-on-northflank)
- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)

* Redis is a registered trademark of Redis Ltd. Any rights therein are reserved to Redis Ltd. Any use by Northflank is for referential purposes only and does not indicate any sponsorship, endorsement or affiliation between Redis and Northflank.

## Migrate from RDS to Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/migrate-from-database-providers-to-northflank/migrate-from-rds-to-northflank.md

For RDS instances that are configured as private (not publicly accessible) and can only be reached from within the same VPC, there are two approaches to migrating your data to Northflank:

1. **Stream MySQL data from private RDS to public Northflank addon via EC2** — Provision EC2, connect to the internal (non-public) RDS and stream the database data to a publicly-exposed Northflank addon.

2. **S3 bucket for dumping and restore data** — Provision EC2 with S3 role, connect to internal RDS, run script to take the dump and store on S3. Generate credentials for S3 bucket. Deploy private Northflank addon. Deploy Northflank service provided to you and the script, this will trigger the restore using the AWS bucket credentials in order to restore the dump to the Northflank database.

### Migrate from RDS to Northflank: 1. Stream MySQL data from private RDS to public Northflank addon via EC2

#### Migrate from RDS to Northflank: Provision EC2 Instance

Take into account how your database is setup, security-groups and relevant subnet. The following are suggestions to simplify the process but adapt it to your specific setup.

Find your RDS instance details:

```bash
aws rds describe-db-instances \
  --db-instance-identifier your-db-name \
  --query 'DBInstances[0].[DBSubnetGroup.VpcId,DBSubnetGroup.Subnets[0].SubnetIdentifier,VpcSecurityGroups[0].VpcSecurityGroupId]' \
  --output table
```

Note: Replace "your-db-name" with your actual RDS instance identifier.

Get your RDS subnet ID and export it as an env var:

```bash
export RDS_SUBNET=$(aws rds describe-db-instances \
  --db-instance-identifier your-db-name \
  --query 'DBInstances[0].DBSubnetGroup.Subnets[0].SubnetIdentifier' \
  --output text)
```

Get your RDS security group ID and export it as an env var:

```bash
export RDS_SG_ID="sg-xxxxx"
```

Get the latest Amazon Linux 2023 AMI:

```bash
AMI_ID=$(aws ec2 describe-images \
  --owners amazon \
  --filters "Name=name,Values=al2023-ami-2023.*-x86_64" \
  --query 'sort_by(Images, &CreationDate)[-1].ImageId' \
  --output text)
```

Launch instance. At this stage consider how you'll connect to the instance. If it's via ssh consider providing `--key-name=<key>`. Also it is recommended to assign it to a subnet with automatic public ipv4 provisioning which will be used later.

```bash
INSTANCE_ID=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --instance-type c5.2xlarge \
  --security-group-ids $RDS_SG_ID \
  --subnet-id $RDS_SUBNET \
  --query 'Instances[0].InstanceId' \
  --output text)

echo "Instance ID: $INSTANCE_ID"
```

Wait for instance to be ready (takes 1-2 minutes):

```bash
aws ec2 wait instance-running --instance-ids $INSTANCE_ID
```

#### Migrate from RDS to Northflank: Deploy Northflank addon

The following is the spec for the Northflank addon to deploy, can be deployed via UI, template or CLI.

```json
{
  "kind": "Addon",
  "spec": {
    "name": <ADDON_DATABASE_NAME>,
    "infrastructure": {
      "architecture": "x86"
    },
    "type": "mysql",
    "version": "8.4.7",
    "billing": {
      "deploymentPlan": "nf-compute-800-16",
      "storageClass": "nvme",
      "storage": 409600,
      "replicas": 1
    },
    "tlsEnabled": true,
    "externalAccessEnabled": false
  }
}
```

Once both the EC2 instance and addon are ready, extract the public ipv4 assigned to the EC2 node (if available) and whitelist it on the Northflank addon:

```bash
EC2_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

northflank patch addons --projectId <PROJECT_ID> --addonId <ADDON_ID> -i "{\"externalAccessEnabled\": \"true\", \"ipPolicies\": [{\"addresses\": [\"$EC2_IP\"], \"action\": \"ALLOW\"}]}"
```

#### Migrate from RDS to Northflank: Install dependencies

Connect to the EC2 instance and run the following commands to install MySQLSH and northflank CLI.

```bash
sudo dnf update
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install -y https://dev.mysql.com/get/mysql84-community-release-el9-1.noarch.rpm nodejs
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
sudo dnf install -y mysql-shell
sudo npm i -g @northflank/cli
```

Generate token from: `https://app.northflank.com/t/<team>/settings/api/tokens`

Login to northflank:

```bash
northflank login --token-login
```

Populate the relevant RDS environment variables so the EC2 instance can connect to the database:

```bash
export SOURCE_HOST=<RDS_HOST>
export SOURCE_PORT=<RDS_PORT>
export SOURCE_USER=<RDS_USER>
export SOURCE_PASSWORD=<RDS_PASSWORD>
```

Populate the following environment variables via the northflank CLI:

```bash
# northflank cli installed and authenticated
CREDS=$(northflank get addon credentials --projectId <PROJECT_ID> --addonId <ADDON_ID> -o json)

export TARGET_HOST=$(echo "$CREDS" | jq -r '.envs.HOST')
export TARGET_PORT=$(echo "$CREDS" | jq -r '.envs.EXTERNAL_PORT_PRIMARY')
export TARGET_USER=$(echo "$CREDS" | jq -r '.secrets.ADMIN_USERNAME')
export TARGET_PASSWORD=$(echo "$CREDS" | jq -r '.secrets.ADMIN_PASSWORD')
```

Set the number of threads based on the EC2 instance used:

```bash
export COPY_THREADS=<THREADS>
```

Then copy and paste the following script:

```javascript
var sourceHost = os.getenv('SOURCE_HOST') || 'localhost';
var sourcePort = parseInt(os.getenv('SOURCE_PORT') || '3306');
var sourceUser = os.getenv('SOURCE_USER') || 'root';
var sourcePassword = os.getenv('SOURCE_PASSWORD') || '';

var targetHost = os.getenv('TARGET_HOST') || 'localhost';
var targetPort = parseInt(os.getenv('TARGET_PORT') || '3306');
var targetUser = os.getenv('TARGET_USER') || 'root';
var targetPassword = os.getenv('TARGET_PASSWORD') || '';

var threads = parseInt(os.getenv('COPY_THREADS') || '4');

if (!os.getenv('SOURCE_HOST') || !os.getenv('TARGET_HOST')) {
    print("Error: SOURCE_HOST and TARGET_HOST environment variables are required.\n\n");
    print("Required:\n");
    print("  SOURCE_HOST         - Source host\n");
    print("  TARGET_HOST         - Target host\n\n");
    print("Optional (with defaults):\n");
    print("  SOURCE_PORT         - Source port (default: 3306)\n");
    print("  SOURCE_USER         - Source user (default: root)\n");
    print("  SOURCE_PASSWORD     - Source password (default: empty)\n");
    print("  TARGET_PORT         - Target port (default: 3306)\n");
    print("  TARGET_USER         - Target user (default: root)\n");
    print("  TARGET_PASSWORD     - Target password (default: empty)\n");
    print("  COPY_THREADS        - Parallel threads (default: 4)\n");
    os.exit(1);
}

print("Connecting to source " + sourceHost + ":" + sourcePort + "...\n");
shell.connect({
    host: sourceHost,
    port: sourcePort,
    user: sourceUser,
    password: sourcePassword
});

print("Copying all schemas to " + targetHost + ":" + targetPort + "...\n");
util.copyInstance(
    {
        host: targetHost,
        port: targetPort,
        user: targetUser,
        password: targetPassword
    },
    {
        threads: threads,
        showProgress: true,
        ignoreExistingObjects: true,
        users: false,
    }
);

print("Copy completed successfully.\n");
session.close();
```

Run it with: `mysqlsh --file mysqlsh_copy.js`

It should start the process of streaming data from the RDS database into the Northflank instance.

### Migrate from RDS to Northflank: 2. S3 bucket for dumping and restore data

#### Migrate from RDS to Northflank: Provision EC2 Instance

Similar instructions as with the first approach. The extra step here is to create and attach a role to be able to access and manipulate the S3 bucket:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:ListBucket",
                "s3:CreateBucket",
                "s3:ListBucketMultipartUploads"
            ],
            "Resource": [
                "arn:aws:s3:::<S3-BUCKET>",
                "arn:aws:s3:::<S3-BUCKET>/*"
            ]
        }
    ]
}
```

#### Migrate from RDS to Northflank: EC2 Instance configuration

Install dependencies

```bash
sudo dnf update
sudo dnf install -y https://dev.mysql.com/get/mysql84-community-release-el9-1.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
sudo dnf install -y mysql-shell
```

Configure the following env vars:

```bash
export DUMP_HOST=<RDS_HOST>
export DUMP_PORT=<RDS_PORT>
export DUMP_USER=<RDS_USER>
export DUMP_PASSWORD=<RDS_PASSWORD>
export DUMP_THREADS=<THREADS>
export DUMP_SCHEMA=<SCHEMA>
export DUMP_S3_BUCKET=<S3-BUCKET>
export DUMP_S3_PREFIX=<S3-PREFIX>
export DUMP_S3_REGION=<S3-REGION>
```

Copy the following scripts.

`dump_s3.sh`:

```bash
#!/bin/bash
set -e

if [ -z "$DUMP_SCHEMA" ] || [ -z "$DUMP_S3_BUCKET" ]; then
    echo "Error: DUMP_SCHEMA and DUMP_S3_BUCKET environment variables are required."
    exit 1
fi

# Fetch IAM role credentials from EC2 instance metadata (IMDSv2)
echo "Fetching IAM role credentials from instance metadata..."
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" \
    -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

ROLE_NAME=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \
    http://169.254.169.254/latest/meta-data/iam/security-credentials/)

if [ -z "$ROLE_NAME" ]; then
    echo "Error: No IAM role found on this instance."
    exit 1
fi

CREDS=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \
    http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE_NAME)

export AWS_ACCESS_KEY_ID=$(echo "$CREDS" | python3 -c "import sys,json; print(json.load(sys.stdin)['AccessKeyId'])")
export AWS_SECRET_ACCESS_KEY=$(echo "$CREDS" | python3 -c "import sys,json; print(json.load(sys.stdin)['SecretAccessKey'])")
export AWS_SESSION_TOKEN=$(echo "$CREDS" | python3 -c "import sys,json; print(json.load(sys.stdin)['Token'])")

echo "Credentials fetched for role: ${ROLE_NAME}"

mysqlsh --file ./mysqlsh_s3_dump.js
```

`mysqlsh_s3_dump.js`:

```javascript
var host = os.getenv('DUMP_HOST') || 'localhost';
var port = parseInt(os.getenv('DUMP_PORT') || '3306');
var user = os.getenv('DUMP_USER') || 'root';
var password = os.getenv('DUMP_PASSWORD') || '';
var threads = parseInt(os.getenv('DUMP_THREADS') || '4');
var schema = os.getenv('DUMP_SCHEMA');

var s3Bucket = os.getenv('DUMP_S3_BUCKET');
var s3Prefix = os.getenv('DUMP_S3_PREFIX') || '';
var s3Region = os.getenv('DUMP_S3_REGION') || '';
var s3Profile = os.getenv('DUMP_S3_PROFILE') || '';
var s3Endpoint = os.getenv('DUMP_S3_ENDPOINT') || '';

if (!schema || !s3Bucket) {
    print("Error: DUMP_SCHEMA and DUMP_S3_BUCKET environment variables are required.\n\n");
    print("Required:\n");
    print("  DUMP_SCHEMA         - Schema to dump\n");
    print("  DUMP_S3_BUCKET      - S3 bucket name (must already exist)\n\n");
    print("Optional (with defaults):\n");
    print("  DUMP_HOST           - Source host (default: localhost)\n");
    print("  DUMP_PORT           - Source port (default: 3306)\n");
    print("  DUMP_USER           - Source user (default: root)\n");
    print("  DUMP_PASSWORD       - Source password (default: empty)\n");
    print("  DUMP_THREADS        - Parallel threads (default: 4)\n");
    print("  DUMP_S3_PREFIX      - Prefix/folder inside bucket (default: schema name)\n");
    print("  DUMP_S3_REGION      - AWS region (default: from AWS config)\n");
    print("  DUMP_S3_PROFILE     - AWS credentials profile (default: from AWS config)\n");
    print("  DUMP_S3_ENDPOINT    - Custom S3 endpoint for S3-compatible storage\n");
    os.exit(1);
}

print("Connecting to " + host + ":" + port + "...\n");
shell.connect({
    host: host,
    port: port,
    user: user,
    password: password
});

var dumpOptions = {
    threads: threads,
    compression: "zstd",
    showProgress: true,
    s3BucketName: s3Bucket
};

if (s3Region !== '') dumpOptions.s3Region = s3Region;
if (s3Profile !== '') dumpOptions.s3Profile = s3Profile;
if (s3Endpoint !== '') dumpOptions.s3EndpointOverride = s3Endpoint;

var outputPath = s3Prefix || schema;

print("Dumping schema '" + schema + "' to s3://" + s3Bucket + "/" + outputPath + "...\n");
util.dumpSchemas([schema], outputPath, dumpOptions);

print("Dump completed successfully.\n");
session.close();
```

Run it: `chmod +x dump_s3.sh && ./dump_s3.sh`

The dump should start uploading to the provided S3 destination. The credentials are fetched as part of the `dump_s3.sh` script via the metadata server relying on the s3-role created for the ec2 instance.

#### Migrate from RDS to Northflank: Northflank S3 bucket import

Generate an IAM User with the following permissions:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				"s3:ListBucket",
				"s3:PutObject"
			],
			"Resource": [
				"arn:aws:s3:::<S3-BUCKET>",
				"arn:aws:s3:::<S3-BUCKET>/*"
			]
		}
	]
}
```

Generate Access Key and Secret for this User.

Import the following Northflank template to your project which will have the relevant resources to execute the restore. Make sure to update the relevant environment variables and AWS S3 credentials.

```json
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "<PROJECT_ID>",
            "region": "europe-west"
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "steps": [
              {
                "kind": "Addon",
                "spec": {
                  "name": "database",
                  "infrastructure": {
                    "architecture": "x86"
                  },
                  "type": "mysql",
                  "version": "8.4.7",
                  "billing": {
                    "deploymentPlan": "nf-compute-800-16",
                    "storageClass": "nvme",
                    "storage": 409600,
                    "replicas": 1
                  },
                  "tlsEnabled": true,
                  "externalAccessEnabled": false,
                  "typeSpecificSettings": {
                    "mysqlRouterReplicas": 2
                  },
                  "projectId": "${refs.project.id}"
                },
                "ref": "database"
              },
              {
                "kind": "SecretGroup",
                "spec": {
                  "type": "secret",
                  "secretType": "environment",
                  "priority": 10,
                  "secrets": {
                    "variables": {
                      "LOAD_THREADS": "8",
                      "LOAD_S3_BUCKET": "<S3-BUCKET>",
                      "LOAD_S3_PREFIX": "<S3-PREFIX>",
                      "LOAD_S3_REGION": "<S3-REGION>",
                      "AWS_ACCESS_KEY_ID": "<ACCESS_KEY>",
                      "AWS_SECRET_ACCESS_KEY": "<SECRET_ACCESS_KEY>"
                    },
                    "files": {
                      "/mysqlsh_s3_load.js": {
                        "data": "IyEvdXNyL2Jpbi9lbnYKdmFyIGhvc3QgPSBvcy5nZXRlbnYoJ0xPQURfSE9TVCcpIHx8ICdsb2NhbGhvc3QnOwp2YXIgcG9ydCA9IHBhcnNlSW50KG9zLmdldGVudignTE9BRF9QT1JUJykgfHwgJzMzMDYnKTsKdmFyIHVzZXIgPSBvcy5nZXRlbnYoJ0xPQURfVVNFUicpIHx8ICdyb290JzsKdmFyIHBhc3N3b3JkID0gb3MuZ2V0ZW52KCdMT0FEX1BBU1NXT1JEJykgfHwgJyc7CnZhciB0aHJlYWRzID0gcGFyc2VJbnQob3MuZ2V0ZW52KCdMT0FEX1RIUkVBRFMnKSB8fCAnNCcpOwp2YXIgZHJvcFNjaGVtYSA9IG9zLmdldGVudignTE9BRF9EUk9QX1NDSEVNQScpIHx8ICd0cnVlJzsKdmFyIHNjaGVtYSA9IG9zLmdldGVudignTE9BRF9TQ0hFTUEnKTsKCnZhciBzM0J1Y2tldCA9IG9zLmdldGVudignTE9BRF9TM19CVUNLRVQnKTsKdmFyIHMzUHJlZml4ID0gb3MuZ2V0ZW52KCdMT0FEX1MzX1BSRUZJWCcpIHx8ICcnOwp2YXIgczNSZWdpb24gPSBvcy5nZXRlbnYoJ0xPQURfUzNfUkVHSU9OJykgfHwgJyc7CnZhciBzM1Byb2ZpbGUgPSBvcy5nZXRlbnYoJ0xPQURfUzNfUFJPRklMRScpIHx8ICcnOwp2YXIgczNFbmRwb2ludCA9IG9zLmdldGVudignTE9BRF9TM19FTkRQT0lOVCcpIHx8ICcnOwoKaWYgKCFzY2hlbWEgfHwgIXMzQnVja2V0KSB7CiAgICBwcmludCgiRXJyb3I6IExPQURfU0NIRU1BIGFuZCBMT0FEX1MzX0JVQ0tFVCBlbnZpcm9ubWVudCB2YXJpYWJsZXMgYXJlIHJlcXVpcmVkLlxuXG4iKTsKICAgIHByaW50KCJSZXF1aXJlZDpcbiIpOwogICAgcHJpbnQoIiAgTE9BRF9TQ0hFTUEgICAgICAgICAgIC0gVGFyZ2V0IHNjaGVtYSB0byBsb2FkIGludG9cbiIpOwogICAgcHJpbnQoIiAgTE9BRF9TM19CVUNLRVQgICAgICAgIC0gUzMgYnVja2V0IGNvbnRhaW5pbmcgdGhlIGR1bXBcblxuIik7CiAgICBwcmludCgiT3B0aW9uYWwgKHdpdGggZGVmYXVsdHMpOlxuIik7CiAgICBwcmludCgiICBMT0FEX0hPU1QgICAgICAgICAgICAgLSBUYXJnZXQgaG9zdCAoZGVmYXVsdDogbG9jYWxob3N0KVxuIik7CiAgICBwcmludCgiICBMT0FEX1BPUlQgICAgICAgICAgICAgLSBUYXJnZXQgcG9ydCAoZGVmYXVsdDogMzMwNilcbiIpOwogICAgcHJpbnQoIiAgTE9BRF9VU0VSICAgICAgICAgICAgIC0gVGFyZ2V0IHVzZXIgKGRlZmF1bHQ6IHJvb3QpXG4iKTsKICAgIHByaW50KCIgIExPQURfUEFTU1dPUkQgICAgICAgICAtIFRhcmdldCBwYXNzd29yZCAoZGVmYXVsdDogZW1wdHkpXG4iKTsKICAgIHByaW50KCIgIExPQURfVEhSRUFEUyAgICAgICAgICAtIFBhcmFsbGVsIHRocmVhZHMgKGRlZmF1bHQ6IDQpXG4iKTsKICAgIHByaW50KCIgIExPQURfRFJPUF9TQ0hFTUEgICAgICAtIERyb3AgYW5kIHJlY3JlYXRlIHNjaGVtYSBiZWZvcmUgbG9hZCAoZGVmYXVsdDogdHJ1ZSlcbiIpOwogICAgcHJpbnQoIiAgTE9BRF9TM19QUkVGSVggICAgICAgIC0gUHJlZml4L2ZvbGRlciBpbnNpZGUgYnVja2V0IChkZWZhdWx0OiBlbXB0eSlcbiIpOwogICAgcHJpbnQoIiAgTE9BRF9TM19SRUdJT04gICAgICAgIC0gQVdTIHJlZ2lvbiAoZGVmYXVsdDogZnJvbSBBV1MgY29uZmlnKVxuIik7CiAgICBwcmludCgiICBMT0FEX1MzX1BST0ZJTEUgICAgICAgLSBBV1MgY3JlZGVudGlhbHMgcHJvZmlsZSAoZGVmYXVsdDogZnJvbSBBV1MgY29uZmlnKVxuIik7CiAgICBwcmludCgiICBMT0FEX1MzX0VORFBPSU5UICAgICAgLSBDdXN0b20gUzMgZW5kcG9pbnQgZm9yIFMzLWNvbXBhdGlibGUgc3RvcmFnZVxuIik7CiAgICBvcy5leGl0KDEpOwp9CgpwcmludCgiQ29ubmVjdGluZyB0byAiICsgaG9zdCArICI6IiArIHBvcnQgKyAiLi4uXG4iKTsKc2hlbGwuY29ubmVjdCh7CiAgICBob3N0OiBob3N0LAogICAgcG9ydDogcG9ydCwKICAgIHVzZXI6IHVzZXIsCiAgICBwYXNzd29yZDogcGFzc3dvcmQKfSk7CgppZiAoZHJvcFNjaGVtYSA9PT0gJ3RydWUnKSB7CiAgICBwcmludCgiRHJvcHBpbmcgYW5kIHJlY3JlYXRpbmcgc2NoZW1hICciICsgc2NoZW1hICsgIicuLi5cbiIpOwogICAgc2Vzc2lvbi5ydW5TcWwoIkRST1AgREFUQUJBU0UgSUYgRVhJU1RTIGAiICsgc2NoZW1hICsgImAiKTsKICAgIHNlc3Npb24ucnVuU3FsKCJDUkVBVEUgREFUQUJBU0UgYCIgKyBzY2hlbWEgKyAiYCIpOwp9IGVsc2UgewogICAgcHJpbnQoIlNraXBwaW5nIGRyb3Ag4oCUIHJlc3VtaW5nIGxvYWQgaW50byBleGlzdGluZyBzY2hlbWEgJyIgKyBzY2hlbWEgKyAiJy4uLlxuIik7Cn0KCnZhciBsb2FkT3B0aW9ucyA9IHsKICAgIHNjaGVtYTogc2NoZW1hLAogICAgdGhyZWFkczogdGhyZWFkcywKICAgIHNob3dQcm9ncmVzczogdHJ1ZSwKICAgIHJlc2V0UHJvZ3Jlc3M6IGZhbHNlLAogICAgaWdub3JlRXhpc3RpbmdPYmplY3RzOiBkcm9wU2NoZW1hICE9PSAndHJ1ZScsCiAgICBzM0J1Y2tldE5hbWU6IHMzQnVja2V0Cn07CgppZiAoczNSZWdpb24gIT09ICcnKSBsb2FkT3B0aW9ucy5zM1JlZ2lvbiA9IHMzUmVnaW9uOwppZiAoczNQcm9maWxlICE9PSAnJykgbG9hZE9wdGlvbnMuczNQcm9maWxlID0gczNQcm9maWxlOwppZiAoczNFbmRwb2ludCAhPT0gJycpIGxvYWRPcHRpb25zLnMzRW5kcG9pbnRPdmVycmlkZSA9IHMzRW5kcG9pbnQ7Cgp2YXIgaW5wdXRQYXRoID0gczNQcmVmaXggfHwgc2NoZW1hOwoKcHJpbnQoIkxvYWRpbmcgZHVtcCBmcm9tIHMzOi8vIiArIHMzQnVja2V0ICsgIi8iICsgaW5wdXRQYXRoICsgIiBpbnRvIHNjaGVtYSAnIiArIHNjaGVtYSArICInLi4uXG4iKTsKdXRpbC5sb2FkRHVtcChpbnB1dFBhdGgsIGxvYWRPcHRpb25zKTsKCnByaW50KCJMb2FkIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG4iKTsKc2Vzc2lvbi5jbG9zZSgpOwo=",
                        "encoding": "utf-8"
                      }
                    },
                    "dockerSecretMounts": {}
                  },
                  "addonDependencies": [
                    {
                      "addonId": "${refs.database.id}",
                      "keys": [
                        {
                          "keyName": "ADMIN_USERNAME",
                          "aliases": [
                            "LOAD_USER"
                          ]
                        },
                        {
                          "keyName": "ADMIN_PASSWORD",
                          "aliases": [
                            "LOAD_PASSWORD"
                          ]
                        },
                        {
                          "keyName": "PORT",
                          "aliases": [
                            "LOAD_PORT"
                          ]
                        },
                        {
                          "keyName": "HOST",
                          "aliases": [
                            "LOAD_HOST"
                          ]
                        },
                        {
                          "keyName": "DATABASE",
                          "aliases": [
                            "LOAD_SCHEMA"
                          ]
                        }
                      ]
                    }
                  ],
                  "externalAddonDependencies": [],
                  "name": "secrets",
                  "restrictions": {
                    "restricted": false,
                    "nfObjects": [],
                    "tags": []
                  },
                  "projectId": "${refs.project.id}"
                },
                "ref": "secrets"
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
                      "configType": "customEntrypointCustomCommand",
                      "customEntrypoint": "/bin/bash -c ",
                      "customCommand": "'./setup.sh && echo \"Restorer ready\" && sleep infinity'"
                    },
                    "type": "deployment",
                    "external": {
                      "imagePath": "ubuntu:22.04"
                    }
                  },
                  "loadBalancing": {
                    "mode": "leastConnection"
                  },
                  "name": "s3-restorer",
                  "infrastructure": {
                    "architecture": "x86"
                  },
                  "billing": {
                    "deploymentPlan": "nf-compute-800-16"
                  },
                  "runtimeFiles": {
                    "/setup.sh": {
                      "data": "IyEvYmluL2Jhc2gKYXB0LWdldCB1cGRhdGUKYXB0LWdldCBpbnN0YWxsIC15IHdnZXQgbHNiLXJlbGVhc2UgZ251cGcgdG11eCB2aW0Kd2dldCBodHRwczovL2Rldi5teXNxbC5jb20vZ2V0L215c3FsLWFwdC1jb25maWdfMC44LjM2LTFfYWxsLmRlYgplY2hvICIzIiB8IGRwa2cgLWkgbXlzcWwtYXB0LWNvbmZpZ18wLjguMzYtMV9hbGwuZGViCmFwdC1nZXQgdXBkYXRlCmFwdC1nZXQgaW5zdGFsbCAteSBteXNxbC1zaGVsbCBteXNxbC1jbGllbnQ=",
                      "encoding": "utf-8"
                    }
                  },
                  "ports": [],
                  "runtimeEnvironment": {},
                  "projectId": "${refs.project.id}"
                },
                "ref": "s3-restorer"
              }
            ]
          }
        }
      ]
    }
  }
}
```

Run the template and it will provision relevant database, secrets and s3-restorer service. Once running, [exec](../api/execute-command.md) into s3-restorer and run `mysqlsh --file mysqlsh_s3_load.js` and it should start the restore process to the Northflank database from the S3 bucket.

## Scale a database

Source: https://northflank.com/docs/v1/application/databases-and-persistence/scale-a-database.md

You can increase the resources available to a database, including CPU and memory, storage space, and number of replicas. You should [monitor your addon](databases-and-persistence.md#database-observability-and-monitoring) to identify bottlenecks.

You can also make use of [high-availability strategies](databases-and-persistence.md#configure-addons-for-high-availability) for many addons, to ensure availability and enable automatic fail-over.

![An addon's resources page in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/scale-a-database/addon-resources-page.png)

See [Northflank pricing plans](https://northflank.com/pricing) for compute plans available on Northflank's managed cloud, as well as storage and network egress costs.

### Scale a database: Scale compute

You can increase the vCPU and memory dedicated to an addon on the resources page. Some databases have higher requirements than others, meaning lower compute plans will be unavailable for them.

### Scale a database: Scale storage

You can increase the storage space dedicated to a database on the resources page.

You should increase the storage space for your database once it is over 50% full.

You cannot reduce the storage space assigned to a database after increasing it.

### Scale a database: Scale replicas

You can increase the number of replica sets your database will use to improve availability, each replica set contains a copy of the database.

Database replicas can be scaled up from the resources page, but cannot be scaled down. Any increase will be permanent.

### Scale a database: Next steps

- [Upgrade a database: Upgrade your database to a newer version with one click.](databases-and-persistence.md#upgrade-a-database)
- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Configure addons for high availability: Configure your addons to maximise availability.](databases-and-persistence.md#configure-addons-for-high-availability)

## Stateful workloads on Northflank

Source: https://northflank.com/docs/v1/application/databases-and-persistence/stateful-workloads-on-northflank.md

You can add persistence to your services deployed on Northflank by creating database, storage, or message queue addons and connecting to them in your running services.

Persistent databases and storage allow your applications to restart or deploy new versions without losing important data, such as registered users or uploaded content.

You can back up your data and expose addons using TLS. Check the [features](databases-and-persistence.md#deploy-a-database-available-databases) for databases and storage addons to make sure they offer the features you require.

### Stateful workloads on Northflank: Deploy an addon

Learn how to deploy an addon, or read guides for specific addons on Northflank.

Managed addons offer backups, upgrades, and high-availability options.

- [Deploy a database: Create a database to use with your Northflank deployments.](databases-and-persistence.md#deploy-a-database)
- [Deploy MongoDB® on Northflank: MongoDB is a document-oriented database program that uses JSON-like documents with schema.](databases-and-persistence.md#deploy-mongodb®-on-northflank)
- [Deploy PostgreSQL on Northflank: PostgreSQL, also known as Postgres, is a free and open-source relational database management system.](databases-and-persistence.md#deploy-postgresql-on-northflank)
- [Deploy MySQL on Northflank: MySQL is a fast, reliable, scalable, and easy to use open-source relational database system.](databases-and-persistence.md#deploy-mysql-on-northflank)
- [Deploy Redis® on Northflank: Redis implements a distributed, in-memory key-value database with optional durability.](databases-and-persistence.md#deploy-redis®-on-northflank)
- [Deploy MinIO® on Northflank: MinIO is a High Performance Object Storage with an Amazon S3 cloud storage service compatible API.](databases-and-persistence.md#deploy-minio®-on-northflank)
- [Deploy RabbitMQ on Northflank: RabbitMQ is a lightweight, easy to deploy, open-source message broker that supports multiple messaging protocols.](databases-and-persistence.md#deploy-rabbitmq-on-northflank)

### Stateful workloads on Northflank: Back up and migrate your data

Back up your data, fork addons with existing data, and migrate your data from other platforms to Northflank.

- [Backup, restore, and import your data: Create and import backups of your database, or restore from an existing backup.](databases-and-persistence.md#backup-restore-and-import-data)
- [Fork an addon: Fork an addon to create an exact duplicate of your existing database.](databases-and-persistence.md#fork-an-addon)
- [Migrate PostgreSQL to Northflank: Import your PostgreSQL database to Northflank by uploading a dump, or providing a connection string to a running PostgreSQL instance.](databases-and-persistence.md#migrate-your-postgresql-database-to-northflank)
- [Migrate MongoDB® to Northflank: Import your MongoDB data to Northflank by uploading a dump, or providing a connection string to a running MongoDB instance.](databases-and-persistence.md#migrate-your-mongodb®-database-to-northflank)
- [Migrate MySQL to Northflank: Import your MySQL database to Northflank by uploading a dump, or provide a connection string to a running MySQL instance.](databases-and-persistence.md#migrate-your-mysql-database-to-northflank)
- [Migrate S3 storage to Northflank: Configure live replication of your existing MinIO® instance, or transfer files from S3-compatible storage to Northflank.](databases-and-persistence.md#migrate-your-minio®-deployment-to-northflank)
- [Migrate Redis® to Northflank: Import a snapshot of your Redis keystore, or configure live replication to migrate without interruption.](databases-and-persistence.md#migrate-your-redis®-deployment-to-northflank)
- [Migrate RabbitMQ to Northflank: Import your RabbitMQ definitions to run your message broker with the same configuration on Northflank.](databases-and-persistence.md#migrate-your-rabbitmq-deployment-to-northflank)

### Stateful workloads on Northflank: Use an addon

Connect your addon to your deployments on Northflank, and access your addon with management tools.

You can also securely forward an addon to your local machine for development and management.

- [Use a database with your applications: Securely access your database in your project's applications and services.](databases-and-persistence.md#connect-database-secrets-to-workloads)
- [Access a database: Securely access your database locally or make it available online.](databases-and-persistence.md#access-a-database)
- [Connect to an Addon with TLS: Ensure your service or job can connect to an addon using TLS.](databases-and-persistence.md#access-a-database-access-tls-certificates-in-containers)

### Stateful workloads on Northflank: Monitor and manage an addon

Monitor your addons and scale them to meet demand. Add replicas and deploy features for high-availability applications. Upgrade your addons to access new features and remain secure.

- [Observe a database: Monitor the health and view logs of your running databases, and view the status of backups and upgrades.](databases-and-persistence.md#database-observability-and-monitoring)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)
- [Configure addons for high availability: Configure your addons to maximise availability.](databases-and-persistence.md#configure-addons-for-high-availability)
- [Upgrade a database: Upgrade your database to a newer version with one click.](databases-and-persistence.md#upgrade-a-database)

### Stateful workloads on Northflank: Use persistent volumes and create custom addons

As well as Northflank's managed addons, you can add persistent volumes to services that require other storage solutions.

You can also create custom addons for your team to use in clusters hosted on your own cloud provider account.

- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)
- [Create a custom addon type: Create your own addon types for your team to deploy using a Helm chart.](databases-and-persistence.md#create-a-custom-addon-type)

### Stateful workloads on Northflank: Integrate with other providers

You can access data or storage hosted on another provider on Northflank by providing connection details. You can also access resources on your private network by adding Tailscale to your Northflank project.

- [Use MongoDB® Atlas on Northflank: Connect your MongoDB® Atlas cluster to applications on Northflank.](databases-and-persistence.md#integrate-mongodb-atlas-with-northflank)
- [Use Tailscale: Allow secure access to Tailscale devices to resources within your project.](network.md#use-tailscale)

## Upgrade a database

Source: https://northflank.com/docs/v1/application/databases-and-persistence/upgrade-a-database.md

Northflank regularly updates the available versions of databases on the platform to ensure security and compatibility.

If your database has an upgrade available you will see a notice in the database's header: Upgrade available

If your database version is deprecated you will see a warning in the database's header: Upgrade recommended

We strongly recommend that you upgrade a database to a newer version if it becomes deprecated. Northflank will always ensure a valid upgrade path from a deprecated version.

### Upgrade a database: Upgrading

You can upgrade a database on the upgrade page in your addon.

If an upgrade is available you will be able to select the newer version to install. If multiple newer versions are available, you may need to upgrade to the next major release before upgrading to the latest minor version.

You should back up your data before upgrading. You will not be able to downgrade to an older version when it is complete.

Upgrading will incur some downtime as the addon will be restarted. Major upgrades usually take longer.

You will be able to see a list of previous upgrades and their statuses on the upgrade page.

![Upgrading an addon's version in the Northflank application](https://assets.northflank.com/documentation/v1/application/databases-and-persistence/upgrade-a-database/addon-upgrade.png)

### Upgrade a database: Next steps

- [Deploy a database: Create a database to use with your Northflank deployments.](databases-and-persistence.md#deploy-a-database)
- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)
