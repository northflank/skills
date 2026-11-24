# Get workflow

Source: https://northflank.com/docs/v1/api/project/workflows/get-workflow.md

Gets details about a workflow

Required permission: Project > Workflows > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `workflowId`: (string) (required) ID of the workflow

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `apiVersion`: (string) (required) The version of the Northflank API to run the template against. (enum: v1.2)
  - `arguments`: {object} A set of arguments that can be referenced in a template using '${args.argumentName}'.
  - `gitops`: {object}
    - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
    - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
    - `vcsLinkId`: (string) Legacy key. Please used accountLogin instead.
    - `repoUrl`: (string) (required) URL of the Git repo to sync the file with. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
    - `branch`: (string) (required) The name of the branch to use.
    - `filePath`: (string) (required) The file path in the repository. If using an existing file, it should be in JSON format. (pattern: ^\/((?!\.\.?\/)[a-zA-Z0-9-._]+\/)*(?!\.\.?$)[a-zA-Z0-9-._]+$)
  - `$schema`: (string)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `spec`: (multiple options) A node representing an action to be performed as part of the template. {object} Workflow node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Workflow)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: (required) | {object} RolloutStrategy patch node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: RolloutStrategy)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the RolloutStrategy node.
       - `name`: (multiple options) (required) Display name for the gradual rollout strategy (string) Display name for the gradual rollout strategy | (string) A string containing one or more references that resolve to display name for the gradual rollout strategy (pattern: .*\${.*}.*)
       - `type`: (multiple options) Type of the gradual rollout strategy (string) Type of the gradual rollout strategy (enum: canary) | (string) A string containing one or more references that resolve to type of the gradual rollout strategy (pattern: .*\${.*}.*)
       - `options`: (multiple options) {object}
           - `triggers`: (multiple options) Conditions under which a new release will automatically initiate as a gradual rollout {object} Conditions under which a new release will automatically initiate as a gradual rollout
               - `releaseFromTemplate`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from a template (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a template | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a template (pattern: .*\${.*}.*)
               - `releaseFromReleaseFlow`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from a release flow (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a release flow | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a release flow (pattern: .*\${.*}.*)
               - `releaseFromCD`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from a CD pipeline (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a CD pipeline | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a CD pipeline (pattern: .*\${.*}.*)
               - `releaseFromUI`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from the UI (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from the UI | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from the UI (pattern: .*\${.*}.*)
               - `releaseFromApi`: (multiple options) Automatically trigger the rollout strategy when a release is initiated via the API (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated via the API | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated via the API (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to conditions under which a new release will automatically initiate as a gradual rollout (pattern: .*\${.*}.*)
           - `blockDeploymentOnActiveRollout`: (multiple options) When enabled, new deployments are blocked while a rollout is in progress (boolean) (nullable) When enabled, new deployments are blocked while a rollout is in progress | (string) A string containing one or more references that resolve to when enabled, new deployments are blocked while a rollout is in progress (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `details`: (multiple options) (required) Strategy-specific configuration details (multiple options) Strategy-specific configuration details {object} Strategy-specific configuration details
             - `canaryStrategy`: (multiple options) (required) Strategy used to split traffic between stable and canary deployments (string) Strategy used to split traffic between stable and canary deployments (enum: percentage, header) | (string) A string containing one or more references that resolve to strategy used to split traffic between stable and canary deployments (pattern: .*\${.*}.*)
             - `config`: (multiple options) (required) Configuration for the selected canary strategy (multiple options) Configuration for the selected canary strategy {object} Configuration for the selected canary strategy
                   - `canaryPercentage`: (multiple options) (required) Percentage of traffic to route to the canary deployment (integer) Percentage of traffic to route to the canary deployment | (string) A string containing one or more references that resolve to percentage of traffic to route to the canary deployment (pattern: .*\${.*}.*)
                   - `stablePercentage`: (multiple options) (required) Percentage of traffic to route to the stable deployment (integer) Percentage of traffic to route to the stable deployment | (string) A string containing one or more references that resolve to percentage of traffic to route to the stable deployment (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to configuration for the selected canary strategy (pattern: .*\${.*}.*) | (multiple options) Configuration for the selected canary strategy {object} Configuration for the selected canary strategy
                   - `canaryHeader`: {object} (required) Header configuration that will route traffic to the canary deployment
                     - `headerName`: (multiple options) (required) HTTP header name used to identify requests that should be routed to the target deployment (string) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header name used to identify requests that should be routed to the target deployment (pattern: .*\${.*}.*)
                     - `headerValue`: (multiple options) (required) HTTP header value that routes matching requests to the target deployment (string) HTTP header value that routes matching requests to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header value that routes matching requests to the target deployment (pattern: .*\${.*}.*)
                   - `stableHeader`: {object} (required) Header configuration that will route traffic to the stable deployment
                     - `headerName`: (multiple options) (required) HTTP header name used to identify requests that should be routed to the target deployment (string) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header name used to identify requests that should be routed to the target deployment (pattern: .*\${.*}.*)
                     - `headerValue`: (multiple options) (required) HTTP header value that routes matching requests to the target deployment (string) HTTP header value that routes matching requests to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header value that routes matching requests to the target deployment (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to configuration for the selected canary strategy (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to strategy-specific configuration details (pattern: .*\${.*}.*)
     - `updateMode`: (string) (required) Partially updates only the supplied fields on an existing resource. (enum: patch) | {object} RolloutStrategy node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: RolloutStrategy)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the RolloutStrategy node.
       - `name`: (multiple options) Display name for the gradual rollout strategy (string) Display name for the gradual rollout strategy | (string) A string containing one or more references that resolve to display name for the gradual rollout strategy (pattern: .*\${.*}.*)
       - `type`: (multiple options) (required) Type of the gradual rollout strategy (string) Type of the gradual rollout strategy (enum: canary) | (string) A string containing one or more references that resolve to type of the gradual rollout strategy (pattern: .*\${.*}.*)
       - `options`: (multiple options) {object}
           - `triggers`: (multiple options) Conditions under which a new release will automatically initiate as a gradual rollout {object} Conditions under which a new release will automatically initiate as a gradual rollout
               - `releaseFromTemplate`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from a template (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a template | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a template (pattern: .*\${.*}.*)
               - `releaseFromReleaseFlow`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from a release flow (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a release flow | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a release flow (pattern: .*\${.*}.*)
               - `releaseFromCD`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from a CD pipeline (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a CD pipeline | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a CD pipeline (pattern: .*\${.*}.*)
               - `releaseFromUI`: (multiple options) Automatically trigger the rollout strategy when a release is initiated from the UI (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from the UI | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from the UI (pattern: .*\${.*}.*)
               - `releaseFromApi`: (multiple options) Automatically trigger the rollout strategy when a release is initiated via the API (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated via the API | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated via the API (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to conditions under which a new release will automatically initiate as a gradual rollout (pattern: .*\${.*}.*)
           - `blockDeploymentOnActiveRollout`: (multiple options) When enabled, new deployments are blocked while a rollout is in progress (boolean) (nullable) When enabled, new deployments are blocked while a rollout is in progress | (string) A string containing one or more references that resolve to when enabled, new deployments are blocked while a rollout is in progress (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `details`: (multiple options) (required) Strategy-specific configuration details (multiple options) Strategy-specific configuration details {object} Strategy-specific configuration details
             - `canaryStrategy`: (multiple options) (required) Strategy used to split traffic between stable and canary deployments (string) Strategy used to split traffic between stable and canary deployments (enum: percentage, header) | (string) A string containing one or more references that resolve to strategy used to split traffic between stable and canary deployments (pattern: .*\${.*}.*)
             - `config`: (multiple options) (required) Configuration for the selected canary strategy (multiple options) Configuration for the selected canary strategy {object} Configuration for the selected canary strategy
                   - `canaryPercentage`: (multiple options) (required) Percentage of traffic to route to the canary deployment (integer) Percentage of traffic to route to the canary deployment | (string) A string containing one or more references that resolve to percentage of traffic to route to the canary deployment (pattern: .*\${.*}.*)
                   - `stablePercentage`: (multiple options) (required) Percentage of traffic to route to the stable deployment (integer) Percentage of traffic to route to the stable deployment | (string) A string containing one or more references that resolve to percentage of traffic to route to the stable deployment (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to configuration for the selected canary strategy (pattern: .*\${.*}.*) | (multiple options) Configuration for the selected canary strategy {object} Configuration for the selected canary strategy
                   - `canaryHeader`: {object} (required) Header configuration that will route traffic to the canary deployment
                     - `headerName`: (multiple options) (required) HTTP header name used to identify requests that should be routed to the target deployment (string) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header name used to identify requests that should be routed to the target deployment (pattern: .*\${.*}.*)
                     - `headerValue`: (multiple options) (required) HTTP header value that routes matching requests to the target deployment (string) HTTP header value that routes matching requests to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header value that routes matching requests to the target deployment (pattern: .*\${.*}.*)
                   - `stableHeader`: {object} (required) Header configuration that will route traffic to the stable deployment
                     - `headerName`: (multiple options) (required) HTTP header name used to identify requests that should be routed to the target deployment (string) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header name used to identify requests that should be routed to the target deployment (pattern: .*\${.*}.*)
                     - `headerValue`: (multiple options) (required) HTTP header value that routes matching requests to the target deployment (string) HTTP header value that routes matching requests to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header value that routes matching requests to the target deployment (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to configuration for the selected canary strategy (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to strategy-specific configuration details (pattern: .*\${.*}.*)
     - `updateMode`: (string) Controls how the resource is created or updated on each template run. `put` (default) creates or fully replaces the resource. `create` only creates the resource and skips the node if it already exists. `patch` partially updates only the supplied fields on an existing resource. (enum: put, create) | {object} AddonBackup node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: AddonBackup)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `runNodeOnce`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the AddonBackup node.
       - `projectId`: (multiple options) The ID of the addon to backup. (string) The ID of the addon to backup. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the addon to backup. (pattern: .*\${.*}.*)
       - `addonId`: (multiple options) (required) The ID of the addon to backup. (string) The ID of the addon to backup. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the addon to backup. (pattern: .*\${.*}.*)
       - `backupType`: (string) The type of backup to perform. Defaults to `snapshot`. (enum: dump, snapshot)
       - `compressionType`: (multiple options) (string) (enum: zstd, gz, none) | (string) (pattern: .*\${.*}.*)
       - `customDestinationId`: (multiple options) (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) (pattern: .*\${.*}.*)
       - `additionalDestinations`: [array of] List of destinations for which a backup should be created of this backup. Only applicable for snapshot backups. {object}
           - `destinationId`: (multiple options) (required) Additional custom back up destination that should be used to store the snapshot. (string) Additional custom back up destination that should be used to store the snapshot. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) A string containing one or more references that resolve to additional custom back up destination that should be used to store the snapshot. (pattern: .*\${.*}.*)
           - `retentionTime`: (multiple options) Retention time of the additional back up in days. (integer) Retention time of the additional back up in days. | (string) A string containing one or more references that resolve to retention time of the additional back up in days. (pattern: .*\${.*}.*)
           - `type`: (string) (required) The type of backup destination to use (enum: custom) | {object} AddonImport node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: AddonImport)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `runNodeOnce`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the AddonImport node.
       - `projectId`: (multiple options) The ID of the project containing the addon. (string) The ID of the project containing the addon. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the project containing the addon. (pattern: .*\${.*}.*)
       - `addonId`: (multiple options) (required) The ID of the addon to import a backup into. (string) The ID of the addon to import a backup into. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the addon to import a backup into. (pattern: .*\${.*}.*)
       - `importUrl`: (multiple options) A URL to import a backup file from. (string) A URL to import a backup file from. | (string) A string containing one or more references that resolve to a URL to import a backup file from. (pattern: .*\${.*}.*)
       - `connectionString`: (multiple options) A connection string for a live database to dump and import. (string) A connection string for a live database to dump and import. | (string) A string containing one or more references that resolve to a connection string for a live database to dump and import. (pattern: .*\${.*}.*)
       - `importAllDatabases`: (boolean) When true, all non-system databases will be detected and dumped. Only applicable when using a connection string with PostgreSQL.
       - `compressionType`: (multiple options) (string) (enum: zstd, gz, none) | (string) (pattern: .*\${.*}.*)
       - `customDestinationId`: (multiple options) (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) (pattern: .*\${.*}.*) | {object} Build node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Build)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the Build node.
       - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
       - `buildRules`: {object}
         - `pathIgnoreRules`: [array of] (string) (max length: 260)
         - `isAllowList`: (boolean)
         - `ciIgnoreFlagsEnabled`: (boolean)
         - `ciIgnoreFlags`: [array of] (string) (max length: 72)
       - `buildOverrides`: {object} An optional object that may specify several different overrides on the build level.
         - `buildArguments`: (multiple options) {object} | (string) (pattern: .*\${.*}.*)
         - `buildFiles`: {object} Secret files as JSON object, encrypted at rest. File path must be absolute
         - `dockerSecretMounts`: {object} Docker secret mount contents as JSON object, encrypted at rest. Must be a valid Docker secret mount identifier
         - `docker`: {object} Overrides for docker build settings.
           - `dockerFilePath`: (string) The file path of the Dockerfile. (pattern: ^\/((?!\.\.?\/)[a-zA-Z0-9-._]+\/)*(?!\.\.?$)[a-zA-Z0-9-._]+$)
           - `dockerWorkDir`: (string) The working directory of the Dockerfile. (pattern: ^\/((?!\.\.?\/)[a-zA-Z0-9-._]+\/)*(?!\.\.?$)[a-zA-Z0-9-._]*$)
           - `dockerfileTarget`: (string) If your Dockerfile contains multiple build stages, you can specify the target stage by entering its name here. (pattern: ^[a-zA-Z0-9-_]+$)
           - `dockerfileContents`: (string) Plain UTF-8 Dockerfile contents. Ordinary API and immediate-build values are literal. In template contexts only `${args.*}` and `${refs.*}` are resolved; native Docker `${...}` syntax is preserved. Sensitive values must use Docker secret mounts rather than template expressions or sensitive arguments or references. (min length: 1)
       - `id`: (multiple options) (required) The id of object to build. (string) The id of object to build. (pattern: ^((?<projectId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)\/)?(?<internalId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)$) | (string) A string containing one or more references that resolve to the id of object to build. (pattern: .*\${.*}.*)
       - `type`: (string) (required) The type of the object to build. (enum: service, job)
       - `sha`: (multiple options) Commit sha to build. If not provided, builds the most recent relevant commit. (string) Commit sha to build. If not provided, builds the most recent relevant commit. (min length: 40) (max length: 40) | (string) A string containing one or more references that resolve to commit sha to build. If not provided, builds the most recent relevant commit. (pattern: .*\${.*}.*)
       - `branch`: (multiple options) Branch to build from. If `sha` is not provided, the latest commit of this branch will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. (string) Branch to build from. If `sha` is not provided, the latest commit of this branch will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. | (string) A string containing one or more references that resolve to branch to build from. If `sha` is not provided, the latest commit of this branch will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. (pattern: .*\${.*}.*)
       - `pullRequestId`: (multiple options) ID of a pull request to build from. If `sha` is not provided, the latest commit of this pull request will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. (integer) ID of a pull request to build from. If `sha` is not provided, the latest commit of this pull request will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. | (string) A string containing one or more references that resolve to iD of a pull request to build from. If `sha` is not provided, the latest commit of this pull request will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. (pattern: .*\${.*}.*)
       - `reuseExistingBuilds`: (boolean) If true, the build node will return an existing build if one is available for that commit. Otherwise, a new build will be created with every new preview environment. Defaults to `true`.
       - `buildRuleFallThroughHandling`: (string) Define handling if build rules do not match the specified commit (enum: fail, skip, useLastBuild) | {object} ContainerScan node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: ContainerScan)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the ContainerScan node.
       - `projectId`: (multiple options) ID of the project containing the build (string) ID of the project containing the build (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of the project containing the build (pattern: .*\${.*}.*)
       - `buildServiceId`: (multiple options) (required) ID of the build service (string) ID of the build service (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of the build service (pattern: .*\${.*}.*)
       - `branch`: (multiple options) (required) Branch used by the build (string) Branch used by the build | (string) A string containing one or more references that resolve to branch used by the build (pattern: .*\${.*}.*)
       - `buildId`: (multiple options) (required) ID of the build to scan (string) ID of the build to scan (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of the build to scan (pattern: .*\${.*}.*) | {object} JobRun node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: JobRun)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `runNodeOnce`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the JobRun node.
       - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
       - `runtimeEnvironment`: (multiple options) {object} | (string) (pattern: .*\${.*}.*)
       - `runtimeFiles`: {object} Secret files as JSON object, encrypted at rest. File path must be absolute
       - `dockerSecretMounts`:
       - `billing`: {object}
         - `deploymentPlan`: (multiple options) The ID of the deployment plan override to use. (string) The ID of the deployment plan override to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) A string containing one or more references that resolve to the ID of the deployment plan override to use. (pattern: .*\${.*}.*)
       - `deployment`: (multiple options) Override the job run deployment source. {object} Optional: Override the run to use a previously built commit
           - `docker`: {object} Allows for customization of docker runtime
             - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
             - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
           - `buildpack`: {object} Allows for customization of buildpack runtime
             - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
             - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
             - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
           - `storage`: {object}
             - `useHdbStorage`: (boolean)
             - `usePdSsdStorage`: (boolean)
             - `ephemeralStorage`: {object}
               - `storageSize`: (multiple options) Ephemeral storage per container in MB (integer) Ephemeral storage per container in MB | (string) A string containing one or more references that resolve to ephemeral storage per container in MB (pattern: .*\${.*}.*)
             - `shmSize`: (multiple options) Configures the amount of available memory-backed disk space available to /dev/shm (integer) Configures the amount of available memory-backed disk space available to /dev/shm | (string) A string containing one or more references that resolve to configures the amount of available memory-backed disk space available to /dev/shm (pattern: .*\${.*}.*)
           - `gpu`: {object} GPU configuration overrides to use for this run. Set `enabled` to `false` to run without GPUs.
             - `enabled`: (multiple options) Whether GPUs are enabled for this workload. (boolean) Whether GPUs are enabled for this workload. | (string) A string containing one or more references that resolve to whether GPUs are enabled for this workload. (pattern: .*\${.*}.*)
             - `configuration`: {object}
               - `gpuType`: (multiple options) (required) The type of GPU to use. (string) The type of GPU to use. | (string) A string containing one or more references that resolve to the type of GPU to use. (pattern: .*\${.*}.*)
               - `gpuCount`: (multiple options) The number of GPUs to allocate. (integer) The number of GPUs to allocate. | (string) A string containing one or more references that resolve to the number of GPUs to allocate. (pattern: .*\${.*}.*)
               - `timesliced`: (multiple options) Whether GPU timeslicing is enabled. (boolean) Whether GPU timeslicing is enabled. | (string) A string containing one or more references that resolve to whether GPU timeslicing is enabled. (pattern: .*\${.*}.*)
           - `internal`: {object} Optional: Specify the commit to run
             - `id`: (multiple options) ID of the build service to deploy (multiple options) ID of the build service to deploy (string) The ID of a build service in the same project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) The ID of a build service in another project, in the format `project-id/build-service-id` | (string) A string containing one or more references that resolve to iD of the build service to deploy (pattern: .*\${.*}.*)
             - `branch`: (multiple options) Branch to deploy (string) Branch to deploy | (string) A string containing one or more references that resolve to branch to deploy (pattern: .*\${.*}.*)
             - `buildSHA`: (multiple options) Commit SHA to deploy, or 'latest' to deploy the most recent commit (multiple options) Commit SHA to deploy, or 'latest' to deploy the most recent commit (string) A commit sha. (min length: 40) (max length: 40) | (string) Latest commit. (enum: latest) | (string) A string containing one or more references that resolve to commit SHA to deploy, or 'latest' to deploy the most recent commit (pattern: .*\${.*}.*)
             - `buildId`: (multiple options) ID of the build that should be deployed (string) ID of the build that should be deployed | (string) A string containing one or more references that resolve to iD of the build that should be deployed (pattern: .*\${.*}.*) | {object} Optional: Override the run to use an external image
           - `docker`: {object} Allows for customization of docker runtime
             - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
             - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
           - `buildpack`: {object} Allows for customization of buildpack runtime
             - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
             - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
             - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
           - `storage`: {object}
             - `useHdbStorage`: (boolean)
             - `usePdSsdStorage`: (boolean)
             - `ephemeralStorage`: {object}
               - `storageSize`: (multiple options) Ephemeral storage per container in MB (integer) Ephemeral storage per container in MB | (string) A string containing one or more references that resolve to ephemeral storage per container in MB (pattern: .*\${.*}.*)
             - `shmSize`: (multiple options) Configures the amount of available memory-backed disk space available to /dev/shm (integer) Configures the amount of available memory-backed disk space available to /dev/shm | (string) A string containing one or more references that resolve to configures the amount of available memory-backed disk space available to /dev/shm (pattern: .*\${.*}.*)
           - `gpu`: {object} GPU configuration overrides to use for this run. Set `enabled` to `false` to run without GPUs.
             - `enabled`: (multiple options) Whether GPUs are enabled for this workload. (boolean) Whether GPUs are enabled for this workload. | (string) A string containing one or more references that resolve to whether GPUs are enabled for this workload. (pattern: .*\${.*}.*)
             - `configuration`: {object}
               - `gpuType`: (multiple options) (required) The type of GPU to use. (string) The type of GPU to use. | (string) A string containing one or more references that resolve to the type of GPU to use. (pattern: .*\${.*}.*)
               - `gpuCount`: (multiple options) The number of GPUs to allocate. (integer) The number of GPUs to allocate. | (string) A string containing one or more references that resolve to the number of GPUs to allocate. (pattern: .*\${.*}.*)
               - `timesliced`: (multiple options) Whether GPU timeslicing is enabled. (boolean) Whether GPU timeslicing is enabled. | (string) A string containing one or more references that resolve to whether GPU timeslicing is enabled. (pattern: .*\${.*}.*)
           - `external`: {object} Optional: Specify the external image to run
             - `imagePath`: (multiple options) (required) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (string) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z0-9.\-]+))?(?:\/)?([a-zA-Z/-9.\-_]+)(?::([a-zA-Z/-9.\-_:]+)|@([a-zA-Z/-9.\-_:]+))$) | (string) A string containing one or more references that resolve to image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: .*\${.*}.*)
             - `credentials`: (multiple options) ID of the saved credentials to use to access this external image. (string) ID of the saved credentials to use to access this external image. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of the saved credentials to use to access this external image. (pattern: .*\${.*}.*) | {object} Optional: Override the run to use an image
           - `docker`: {object} Allows for customization of docker runtime
             - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
             - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
           - `buildpack`: {object} Allows for customization of buildpack runtime
             - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
             - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
             - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
           - `storage`: {object}
             - `useHdbStorage`: (boolean)
             - `usePdSsdStorage`: (boolean)
             - `ephemeralStorage`: {object}
               - `storageSize`: (multiple options) Ephemeral storage per container in MB (integer) Ephemeral storage per container in MB | (string) A string containing one or more references that resolve to ephemeral storage per container in MB (pattern: .*\${.*}.*)
             - `shmSize`: (multiple options) Configures the amount of available memory-backed disk space available to /dev/shm (integer) Configures the amount of available memory-backed disk space available to /dev/shm | (string) A string containing one or more references that resolve to configures the amount of available memory-backed disk space available to /dev/shm (pattern: .*\${.*}.*)
           - `gpu`: {object} GPU configuration overrides to use for this run. Set `enabled` to `false` to run without GPUs.
             - `enabled`: (multiple options) Whether GPUs are enabled for this workload. (boolean) Whether GPUs are enabled for this workload. | (string) A string containing one or more references that resolve to whether GPUs are enabled for this workload. (pattern: .*\${.*}.*)
             - `configuration`: {object}
               - `gpuType`: (multiple options) (required) The type of GPU to use. (string) The type of GPU to use. | (string) A string containing one or more references that resolve to the type of GPU to use. (pattern: .*\${.*}.*)
               - `gpuCount`: (multiple options) The number of GPUs to allocate. (integer) The number of GPUs to allocate. | (string) A string containing one or more references that resolve to the number of GPUs to allocate. (pattern: .*\${.*}.*)
               - `timesliced`: (multiple options) Whether GPU timeslicing is enabled. (boolean) Whether GPU timeslicing is enabled. | (string) A string containing one or more references that resolve to whether GPU timeslicing is enabled. (pattern: .*\${.*}.*)
           - `image`: {object}
             - `projectId`: (multiple options) (string) (min length: 24) (max length: 24) | (string) (pattern: .*\${.*}.*)
             - `name`: (multiple options) (required) (string) (min length: 1) | (string) (pattern: .*\${.*}.*)
             - `group`: (multiple options) (string) (min length: 1) | (string) (pattern: .*\${.*}.*)
             - `tag`: (multiple options) (required) (string) (min length: 1) | (string) (pattern: .*\${.*}.*)
       - `jobId`: (multiple options) (required) The ID of the job to run. (string) The ID of the job to run. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 52) | (string) A string containing one or more references that resolve to the ID of the job to run. (pattern: .*\${.*}.*) | {object} LoopWorkflow node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: LoopWorkflow)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the loop workflow node.
       - `iterations`: (multiple options) (required) [array of] (multiple options) {object} | (string) (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `steps`: [array of] (required) An array of nodes that will be run multiple times.  | {object} Action node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Action)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `runNodeOnce`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `spec`: (multiple options) (required) The specification for the Action node. {object} Addon action
         - `kind`: (string) (required) The kind of action. (enum: Addon)
         - `spec`: (multiple options) (required) The specification for the Addon action. {object} restart action
             - `type`: (string) (required) The type of action. (enum: restart)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (required) The id of the addon to restart. (string) The id of the addon to restart. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the addon to restart. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*)
             - `condition`: (string) (enum: running) | {object} AddonBackup action
         - `kind`: (string) (required) The kind of action. (enum: AddonBackup)
         - `spec`: (multiple options) (required) The specification for the AddonBackup action. {object} restore action
             - `type`: (string) (required) The type of action. (enum: restore)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (required) The id of the addon to restore a backup to. (string) The id of the addon to restore a backup to. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the addon to restore a backup to. (pattern: .*\${.*}.*)
               - `backupId`: (multiple options) (required) The id of the backup to restore. (string) The id of the backup to restore. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the backup to restore. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*)
             - `condition`: (string) (enum: success) | {object} Job action
         - `kind`: (string) (required) The kind of action. (enum: Job)
         - `spec`: (multiple options) (required) The specification for the Job action. {object} execute action
             - `type`: (string) (required) The type of action. (enum: execute)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `jobId`: (multiple options) (required) The id of the job to run the command in. (string) The id of the job to run the command in. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the job to run the command in. (pattern: .*\${.*}.*)
               - `command`: (string) (required)
               - `shell`: (string)
               - `user`: (string)
               - `group`: (string) | {object} Service action
         - `kind`: (string) (required) The kind of action. (enum: Service)
         - `spec`: (multiple options) (required) The specification for the Service action. {object} restart action
             - `type`: (string) (required) The type of action. (enum: restart)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `serviceId`: (multiple options) (required) The id of the service to restart. (string) The id of the service to restart. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the service to restart. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*)
             - `condition`: (string) (enum: running) | {object} execute action
             - `type`: (string) (required) The type of action. (enum: execute)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `serviceId`: (multiple options) (required) The id of the service to run the command in. (string) The id of the service to run the command in. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the service to run the command in. (pattern: .*\${.*}.*)
               - `options`: {object}
                 - `dispatchOnly`: (boolean) Specify whether the command output should be awaited the node should succeed after having sent the command.
               - `command`: (string) (required)
               - `shell`: (string)
               - `user`: (string)
               - `group`: (string) | {object} Domain action
         - `kind`: (string) (required) The kind of action. (enum: Domain)
         - `spec`: (multiple options) (required) The specification for the Domain action. {object} verify action
             - `type`: (string) (required) The type of action. (enum: verify)
             - `data`: {object} (required)
               - `domain`: (multiple options) (required) The domain to verify. (string) The domain to verify. (pattern: ^((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+$) | (string) A string containing one or more references that resolve to the domain to verify. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*)
             - `condition`: (string) (enum: verified) | {object} VCS action
         - `kind`: (string) (required) The kind of action. (enum: VCS)
         - `spec`: (multiple options) (required) The specification for the VCS action. {object} createRepoFromSource action
             - `type`: (string) (required) The type of action. (enum: createRepoFromSource)
             - `data`: {object} (required)
               - `sourceData`: {object} (required)
                 - `publicRepo`: (multiple options) Whether the source repository is a public repository. (boolean) Whether the source repository is a public repository. | (string) A string containing one or more references that resolve to whether the source repository is a public repository. (pattern: .*\${.*}.*)
                 - `vcsService`: (multiple options) The VCS provider of the source repository. (string) The VCS provider of the source repository. | (string) A string containing one or more references that resolve to the VCS provider of the source repository. (pattern: .*\${.*}.*)
                 - `oauthProvider`: (multiple options) The OAuth provider used to access the source repository. (string) The OAuth provider used to access the source repository. | (string) A string containing one or more references that resolve to the OAuth provider used to access the source repository. (pattern: .*\${.*}.*)
                 - `repoUrl`: (multiple options) (required) URL of the source Git repo. (string) URL of the source Git repo. | (string) A string containing one or more references that resolve to uRL of the source Git repo. (pattern: .*\${.*}.*)
                 - `branch`: (multiple options) The name of the branch to use. (string) The name of the branch to use. | (string) A string containing one or more references that resolve to the name of the branch to use. (pattern: .*\${.*}.*)
                 - `accountLogin`: (multiple options) The login name of the linked VCS account used to access the source repository. (string) The login name of the linked VCS account used to access the source repository. | (string) A string containing one or more references that resolve to the login name of the linked VCS account used to access the source repository. (pattern: .*\${.*}.*)
                 - `commitSha`: (multiple options) The SHA of the commit to use. (string) The SHA of the commit to use. | (string) A string containing one or more references that resolve to the SHA of the commit to use. (pattern: .*\${.*}.*)
                 - `directory`: (multiple options) The working directory of the Dockerfile. (string) The working directory of the Dockerfile. (pattern: ^\/((?!\.\.?\/)[a-zA-Z0-9-._]+\/)*(?!\.\.?$)[a-zA-Z0-9-._]*$) | (string) A string containing one or more references that resolve to the working directory of the Dockerfile. (pattern: .*\${.*}.*)
                 - `vcsLinkId`: (multiple options) The ID of the linked VCS account to use. (string) The ID of the linked VCS account to use. (min length: 24) (max length: 24) | (string) A string containing one or more references that resolve to the ID of the linked VCS account to use. (pattern: .*\${.*}.*)
                 - `selfHostedVcsId`: (multiple options) The ID of the self-hosted VCS to use. (string) The ID of the self-hosted VCS to use. | (string) A string containing one or more references that resolve to the ID of the self-hosted VCS to use. (pattern: .*\${.*}.*)
               - `targetData`: {object} (required)
                 - `name`: (multiple options) (required) The name of the repository to create. (string) The name of the repository to create. | (string) A string containing one or more references that resolve to the name of the repository to create. (pattern: .*\${.*}.*)
                 - `description`: (multiple options) A description of the repository to create. (string) A description of the repository to create. | (string) A string containing one or more references that resolve to a description of the repository to create. (pattern: .*\${.*}.*)
                 - `privateRepo`: (multiple options) (required) Whether the repository should be created as a private repository. (boolean) Whether the repository should be created as a private repository. | (string) A string containing one or more references that resolve to whether the repository should be created as a private repository. (pattern: .*\${.*}.*)
                 - `branch`: (multiple options) The repository branch. (string) The repository branch. | (string) A string containing one or more references that resolve to the repository branch. (pattern: .*\${.*}.*)
                 - `context`: (multiple options) The owner context (user or organisation) the repository should be created in. (string) The owner context (user or organisation) the repository should be created in. | (string) A string containing one or more references that resolve to the owner context (user or organisation) the repository should be created in. (pattern: .*\${.*}.*)
                 - `folder`: (multiple options) The folder or project the repository should be created in, if supported by the VCS provider. (string) The folder or project the repository should be created in, if supported by the VCS provider. | (string) A string containing one or more references that resolve to the folder or project the repository should be created in, if supported by the VCS provider. (pattern: .*\${.*}.*)
                 - `accountLogin`: (multiple options) The login name of the linked VCS account used to create the repository. (string) The login name of the linked VCS account used to create the repository. | (string) A string containing one or more references that resolve to the login name of the linked VCS account used to create the repository. (pattern: .*\${.*}.*)
                 - `vcsLinkId`: (multiple options) The ID of the linked VCS account to use. (string) The ID of the linked VCS account to use. (min length: 24) (max length: 24) | (string) A string containing one or more references that resolve to the ID of the linked VCS account to use. (pattern: .*\${.*}.*)
                 - `oauthProvider`: (multiple options) The OAuth provider used to create the repository. (string) The OAuth provider used to create the repository. | (string) A string containing one or more references that resolve to the OAuth provider used to create the repository. (pattern: .*\${.*}.*)
                 - `vcsService`: (multiple options) The VCS provider to create the repository with. (string) The VCS provider to create the repository with. | (string) A string containing one or more references that resolve to the VCS provider to create the repository with. (pattern: .*\${.*}.*)
                 - `selfHostedVcsId`: (multiple options) The ID of the self-hosted VCS to use. (string) The ID of the self-hosted VCS to use. | (string) A string containing one or more references that resolve to the ID of the self-hosted VCS to use. (pattern: .*\${.*}.*) | {object} Condition node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Condition)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: (multiple options) (required) The specification for the Condition node. {object} Addon condition
         - `kind`: (string) (required) The kind of condition. (enum: Addon)
         - `spec`: (multiple options) (required) The specification for the Addon condition. {object} running condition
             - `type`: (string) (required) The type of condition. (enum: running)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (required) The id of the addon to monitor. (string) The id of the addon to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the addon to monitor. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*) | {object} AddonBackup condition
         - `kind`: (string) (required) The kind of condition. (enum: AddonBackup)
         - `spec`: (multiple options) (required) The specification for the AddonBackup condition. {object} success condition
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (required) The id of the addon to monitor. (string) The id of the addon to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the addon to monitor. (pattern: .*\${.*}.*)
               - `backupId`: (multiple options) (required) The id of the backup to monitor. (string) The id of the backup to monitor. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the backup to monitor. (pattern: .*\${.*}.*) | {object} AddonImport condition
         - `kind`: (string) (required) The kind of condition. (enum: AddonImport)
         - `spec`: (multiple options) (required) The specification for the AddonImport condition. {object} success condition
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (required) The id of the addon to monitor. (string) The id of the addon to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the addon to monitor. (pattern: .*\${.*}.*)
               - `importId`: (multiple options) (required) The id of the import to monitor. (string) The id of the import to monitor. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the import to monitor. (pattern: .*\${.*}.*) | {object} Build condition
         - `kind`: (string) (required) The kind of condition. (enum: Build)
         - `spec`: (multiple options) (required) The specification for the Build condition. {object} success condition
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `buildId`: (multiple options) (required) The id of the build to monitor. (string) The id of the build to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the build to monitor. (pattern: .*\${.*}.*) | {object} BYOCCluster condition
         - `kind`: (string) (required) The kind of condition. (enum: BYOCCluster)
         - `spec`: (multiple options) (required) The specification for the BYOCCluster condition. {object} running condition
             - `type`: (string) (required) The type of condition. (enum: running)
             - `data`: {object} (required)
               - `clusterId`: (multiple options) (required) The id of the cluster to monitor. (string) The id of the cluster to monitor. (pattern: ^[a-z]-?[a-z0-9]+(-[a-z0-9]+)*$) (min length: 3) (max length: 20) | (string) A string containing one or more references that resolve to the id of the cluster to monitor. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*) | {object} JobRun condition
         - `kind`: (string) (required) The kind of condition. (enum: JobRun)
         - `spec`: (multiple options) (required) The specification for the JobRun condition. {object} success condition
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `jobId`: (multiple options) (required) The id of the job to monitor. (string) The id of the job to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the job to monitor. (pattern: .*\${.*}.*)
               - `runId`: (multiple options) (required) The id of the job run to monitor. (string) The id of the job run to monitor. | (string) A string containing one or more references that resolve to the id of the job run to monitor. (pattern: .*\${.*}.*) | {object} Service condition
         - `kind`: (string) (required) The kind of condition. (enum: Service)
         - `spec`: (multiple options) (required) The specification for the Service condition. {object} running condition
             - `type`: (string) (required) The type of condition. (enum: running)
             - `data`: {object} (required)
               - `projectId`: (multiple options) ID of parent project (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `serviceId`: (multiple options) (required) The id of the service to monitor. (string) The id of the service to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the service to monitor. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*) | {object} Domain condition
         - `kind`: (string) (required) The kind of condition. (enum: Domain)
         - `spec`: (multiple options) (required) The specification for the Domain condition. {object} verified condition
             - `type`: (string) (required) The type of condition. (enum: verified)
             - `data`: {object} (required)
               - `domain`: (multiple options) (required) The domain to monitor. (string) The domain to monitor. (pattern: ^((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+$) | (string) A string containing one or more references that resolve to the domain to monitor. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) Timeout in seconds, or a template reference that resolves to it. This will fail the node after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*) | {object} VCS condition
         - `kind`: (string) (required) The kind of condition. (enum: VCS)
         - `spec`: (multiple options) (required) The specification for the VCS condition. {object} createRepoFromSourceSuccess condition
             - `type`: (string) (required) The type of condition. (enum: createRepoFromSourceSuccess)
             - `data`: {object} (required)
               - `trackerId`: (multiple options) (required) The tracker id outputted from the 'createRepoFromSource' action to monitor. (string) The tracker id outputted from the 'createRepoFromSource' action to monitor. | (string) A string containing one or more references that resolve to the tracker id outputted from the 'createRepoFromSource' action to monitor. (pattern: .*\${.*}.*) | {object} Release node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Release)
     - `condition`: (string) (enum: running)
     - `timeoutDuration`: (multiple options) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A string containing one or more references that resolve to timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. (pattern: .*\${.*}.*)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the Release node.
       - `type`: (string) (required) (enum: build, deployment, registry)
       - `origin`: (multiple options) (required) {object}
           - `id`: (multiple options) (required) ID of the build service to deploy (string) ID of the build service to deploy (pattern: ^((?<projectId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)\/)?(?<internalId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)$) | (string) A string containing one or more references that resolve to iD of the build service to deploy (pattern: .*\${.*}.*)
           - `branch`: (multiple options) (required) Branch to deploy (string) Branch to deploy | (string) A string containing one or more references that resolve to branch to deploy (pattern: .*\${.*}.*)
           - `build`: (multiple options) ID of the build that should be deployed (string) ID of the build that should be deployed | (string) A string containing one or more references that resolve to iD of the build that should be deployed (pattern: .*\${.*}.*) | {object}
           - `id`: (multiple options) (required) ID of the deployment service or job to promote from. (string) ID of the deployment service or job to promote from. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of the deployment service or job to promote from. (pattern: .*\${.*}.*)
           - `type`: (string) (required) The type of resource to promote from. (enum: service, job) | {object}
           - `imagePath`: (multiple options) (required) The image path of the external image to deploy. (string) The image path of the external image to deploy. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z0-9.\-]+))?(?:\/)?([a-zA-Z/-9.\-_]+)(?::([a-zA-Z/-9.\-_:]+)|@([a-zA-Z/-9.\-_:]+))$) | (string) A string containing one or more references that resolve to the image path of the external image to deploy. (pattern: .*\${.*}.*)
           - `credentials`: (multiple options) The ID of the credentials to authenticate with to access the external image. (string) The ID of the credentials to authenticate with to access the external image. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the credentials to authenticate with to access the external image. (pattern: .*\${.*}.*)
       - `target`: {object} (required)
         - `id`: (multiple options) (required) (string) (pattern: ^[A-Za-z0-9-]+$) | (string) (pattern: .*\${.*}.*)
         - `type`: (multiple options) (required) (string) (enum: service, job) | (string) (pattern: .*\${.*}.*) | {object} Message node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Message)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `runNodeOnce`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `spec`: (multiple options) (required) The specification for the Message node. {object} VCS message
         - `kind`: (string) (required) The kind of message to send. (enum: VCS)
         - `spec`: {object} (required)
           - `vcsService`: (multiple options) (required) The VCS provider to use. (string) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin) | (string) A string containing one or more references that resolve to the VCS provider to use. (pattern: .*\${.*}.*)
           - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
           - `accountLogin`: (multiple options) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name. (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name. | (string) A string containing one or more references that resolve to by default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name. (pattern: .*\${.*}.*)
           - `repoUrl`: (multiple options) (required) URL of the Git repo to send this message to. (string) URL of the Git repo to send this message to. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$) | (string) A string containing one or more references that resolve to uRL of the Git repo to send this message to. (pattern: .*\${.*}.*)
           - `pullRequestId`: (multiple options) (required) The ID of the pull request to comment on. (string) The ID of the pull request to comment on. | (string) A string containing one or more references that resolve to the ID of the pull request to comment on. (pattern: .*\${.*}.*)
           - `message`: (multiple options) (required) The rich text message to comment. (string) The rich text message to comment. | (string) A string containing one or more references that resolve to the rich text message to comment. (pattern: .*\${.*}.*) | {object} SLACK message
         - `kind`: (string) (required) The kind of message to send. (enum: SLACK)
         - `spec`: {object} (required)
           - `webhookUrl`: (multiple options) The Slack webhook URL to send messages to. (string) The Slack webhook URL to send messages to. | (string) A string containing one or more references that resolve to the Slack webhook URL to send messages to. (pattern: .*\${.*}.*)
           - `integrationInternalId`: (multiple options) The ID of an existing Slack integration to use. (string) The ID of an existing Slack integration to use. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39) | (string) A string containing one or more references that resolve to the ID of an existing Slack integration to use. (pattern: .*\${.*}.*)
           - `message`: (multiple options) (required) The message content to send to Slack. Supports markdown formatting. (string) The message content to send to Slack. Supports markdown formatting. | (string) A string containing one or more references that resolve to the message content to send to Slack. Supports markdown formatting. (pattern: .*\${.*}.*) | {object} RAW_WEBHOOK message
         - `kind`: (string) (required) The kind of message to send. (enum: RAW_WEBHOOK)
         - `spec`: {object} (required)
           - `webhookUrl`: (multiple options) (required) The webhook URL to send messages to. (string) The webhook URL to send messages to. | (string) A string containing one or more references that resolve to the webhook URL to send messages to. (pattern: .*\${.*}.*)
           - `message`: (multiple options) (required) The message content to send to the webhook. (string) The message content to send to the webhook. | (string) A string containing one or more references that resolve to the message content to send to the webhook. (pattern: .*\${.*}.*) | {object} LoopData node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: LoopData)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the LoopData node. | {object} Approval node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Approval)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the Approval node.
       - `amount`: (integer) (required) | {object} RunTemplate node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: RunTemplate)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the RunTemplate node.
       - `templateId`: (multiple options) (required) The id of the workflow to run. (string) The id of the workflow to run. (pattern: ^((?<projectId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)\/)?(?<internalId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)$) (min length: 3) (max length: 79) | (string) A string containing one or more references that resolve to the id of the workflow to run. (pattern: .*\${.*}.*)
       - `templateType`: (string) (required) (enum: workflow)
       - `arguments`: {object}
         - `variables`: [array of] {object}
             - `key`: (string) (required)
             - `value`: (string)
  - `richInputs`: [array of] An array of rich UI override inputs for the workflow. (multiple options) A node representing a rich UI override for the Release Flow template. {object} BranchCommitSelector input
      - `kind`: (string) (required) The kind of input. (enum: BranchCommitSelector)
      - `spec`: {object} (required) The specification for the BranchCommitSelector input.
      - `title`: (string) (required) The title displayed for the input.
      - `description`: (string) The description displayed for the input.
      - `required`: (boolean) If true, an error will be displayed if this input is not provided a value.
      - `inputs`: {object} (required) Inputs for the rich input node
        - `source`: (string) (required) The ID of the build service to use for this input.
      - `outputs`: {object} (required) Outputs for the rich input node. The value of each field corresponds to the argument name to be passed to the template.
        - `branch`: (string)
        - `buildSha`: (string) | {object} BuildSelector input
      - `kind`: (string) (required) The kind of input. (enum: BuildSelector)
      - `spec`: {object} (required) The specification for the BuildSelector input.
      - `title`: (string) (required) The title displayed for the input.
      - `description`: (string) The description displayed for the input.
      - `required`: (boolean) If true, an error will be displayed if this input is not provided a value.
      - `inputs`: {object} (required) Inputs for the rich input node
        - `source`: (string) (required) The ID of the build service to use for this input.
      - `outputs`: {object} (required) Outputs for the rich input node. The value of each field corresponds to the argument name to be passed to the template.
        - `branch`: (string)
        - `buildId`: (string)
        - `buildSha`: (string)
  - `options`: {object} Options regarding how the template is run.
    - `autorun`: (boolean) If true, the template will run automatically whenever a change is made to it.
    - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
  - `teardownSpec`: {object} (nullable) Optional spec to run when the workflow is deleted.
    - `spec`: (required) The root node of the teardown workflow.
    - `failurePolicy`: (string) Controls what happens if the teardown spec fails or times out. `ignore` (default) — proceed with resource deletion regardless. `block` — halt deletion and set the environment to `teardown_failed` (enum: ignore, block)
  - `argumentOverrides`: {object} A set of arguments that can be referenced in a template using '${args.argumentName}'.
  - `crossProjectAccess`: {object} Controls which projects can run this workflow.
    - `enabled`: (boolean) (required) Allow this workflow to be run from other projects.
    - `projects`: [array of] (required) A list of project IDs used as an allow list or deny list. (string) (pattern: ^[A-Za-z0-9-]+$)
    - `isAllowList`: (boolean) (required) If true, only the listed projects can run this workflow. If false, all projects except the listed ones can run this workflow.
  - `stageId`: (multiple options) ID of the stage (string) (nullable) ID of the stage (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) A string containing one or more references that resolve to iD of the stage (pattern: .*\${.*}.*)
  - `triggers`: [array of] (multiple options) {object}
      - `kind`: (string) (required) (enum: vcs-push)
      - `spec`: {object} (required)
        - `vcs`: {object}
          - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
          - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
          - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
          - `vcsLinkId`: (string)
          - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
        - `branchNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
        - `commitMessageFlags`: {object}
          - `enabled`: (boolean)
          - `flags`: [array of] An array of commit ignore flags. If a commit message contains one or more of these flags, that commit will not be built. Defaults to `["[skip ci]", "[ci skip]", "[no ci]", "[skip nf]", "[nf skip]", "[northflank skip]", "[skip northflank]"]` (string) A commit ignore flag. (max length: 72)
        - `filePaths`: {object}
          - `enabled`: (boolean)
          - `allowList`: (boolean)
          - `paths`: [array of] An array of path ignore rules. A commit will only be built if a file has been changed that does not match any of the ignore rules. Path ignore rules follow `.gitignore` syntax. (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
      - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
      - `id`: (string)
      - `paused`: (boolean) | {object}
      - `kind`: (string) (required) (enum: vcs-pr)
      - `spec`: {object} (required)
        - `vcs`: {object}
          - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
          - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
          - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
          - `vcsLinkId`: (string)
          - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
        - `branchNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
        - `commitMessageFlags`: {object}
          - `enabled`: (boolean)
          - `flags`: [array of] An array of commit ignore flags. If a commit message contains one or more of these flags, that commit will not be built. Defaults to `["[skip ci]", "[ci skip]", "[no ci]", "[skip nf]", "[nf skip]", "[northflank skip]", "[skip northflank]"]` (string) A commit ignore flag. (max length: 72)
        - `filePaths`: {object}
          - `enabled`: (boolean)
          - `allowList`: (boolean)
          - `paths`: [array of] An array of path ignore rules. A commit will only be built if a file has been changed that does not match any of the ignore rules. Path ignore rules follow `.gitignore` syntax. (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
        - `ignoreDrafts`: (boolean) If `true`, draft pull requests from this repo will not trigger the template.
      - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
      - `id`: (string)
      - `paused`: (boolean) | {object}
      - `kind`: (string) (required) (enum: webhook)
      - `spec`: {object} (required)
        - `token`: (string) (required)
      - `ref`: (string) (required) A reference that can be used to access the output of this trigger in the template.
      - `id`: (string)
      - `paused`: (boolean) | {object}
      - `kind`: (string) (required) (enum: vcs-release)
      - `spec`: {object} (required)
        - `vcs`: {object}
          - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
          - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
          - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
          - `vcsLinkId`: (string)
          - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
      - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
      - `id`: (string)
      - `paused`: (boolean) | {object}
      - `kind`: (string) (required) (enum: vcs-pr-label)
      - `spec`: {object} (required)
        - `vcs`: {object}
          - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
          - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
          - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
          - `vcsLinkId`: (string)
          - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
        - `labelNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
        - `branchNamePatterns`: {object}
          - `enabled`: (boolean)
          - `names`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
        - `commitMessageFlags`: {object}
          - `enabled`: (boolean)
          - `flags`: [array of] An array of commit ignore flags. If a commit message contains one or more of these flags, that commit will not be built. Defaults to `["[skip ci]", "[ci skip]", "[no ci]", "[skip nf]", "[nf skip]", "[northflank skip]", "[skip northflank]"]` (string) A commit ignore flag. (max length: 72)
        - `filePaths`: {object}
          - `enabled`: (boolean)
          - `allowList`: (boolean)
          - `paths`: [array of] An array of path ignore rules. A commit will only be built if a file has been changed that does not match any of the ignore rules. Path ignore rules follow `.gitignore` syntax. (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
        - `ignoreDrafts`: (boolean) If `true`, draft pull requests from this repo will not trigger the template.
      - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
      - `id`: (string)
      - `paused`: (boolean) | {object}
      - `kind`: (string) (required) (enum: vcs-check-suite)
      - `spec`: {object} (required)
        - `vcs`: {object}
          - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
          - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
          - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
          - `vcsLinkId`: (string)
          - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
        - `branchNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
        - `commitMessageFlags`: {object}
          - `enabled`: (boolean)
          - `flags`: [array of] An array of commit ignore flags. If a commit message contains one or more of these flags, that commit will not be built. Defaults to `["[skip ci]", "[ci skip]", "[no ci]", "[skip nf]", "[nf skip]", "[northflank skip]", "[skip northflank]"]` (string) A commit ignore flag. (max length: 72)
        - `filePaths`: {object}
          - `enabled`: (boolean)
          - `allowList`: (boolean)
          - `paths`: [array of] An array of path ignore rules. A commit will only be built if a file has been changed that does not match any of the ignore rules. Path ignore rules follow `.gitignore` syntax. (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
      - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
      - `id`: (string)
      - `paused`: (boolean) | {object}
      - `kind`: (string) (required) (enum: cron)
      - `spec`: {object} (required)
        - `cron`: (string) (required) A cron expression that defines the schedule on which the template will be executed.
      - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
      - `id`: (string)
      - `paused`: (boolean)
  - `id`: (string) (required) Identifier for the workflow
  - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
  - `createdAt`: (string) (required) Timestamp the workflow was created at. (format: date-time)
  - `updatedAt`: (string) (required) Timestamp the workflow was last updated at. (format: date-time)

### API reference

GET /v1/projects/{projectId}/workflows/{workflowId}

GET /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details about a workflow.

```json
{
  "data": {
    "apiVersion": "v1.2",
    "gitops": {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "branch": "main",
      "filePath": "/Dockerfile"
    },
    "spec": {
      "kind": "RolloutStrategy",
      "spec": {
        "name": "my-canary-rollout",
        "type": "canary",
        "options": {
          "triggers": {
            "releaseFromTemplate": true,
            "releaseFromReleaseFlow": true,
            "releaseFromCD": true,
            "releaseFromUI": true,
            "releaseFromApi": true
          },
          "blockDeploymentOnActiveRollout": true
        },
        "details": {
          "canaryStrategy": "percentage",
          "config": {
            "canaryPercentage": 20,
            "stablePercentage": 80
          }
        }
      },
      "updateMode": "patch"
    },
    "richInputs": [
      {
        "kind": "BranchCommitSelector",
        "spec": {
          "required": false,
          "inputs": {
            "source": "build-service"
          },
          "outputs": {
            "branch": "TARGET_BRANCH",
            "buildSha": "TARGET_COMMIT"
          },
          "title": "string"
        }
      }
    ],
    "options": {
      "autorun": false,
      "concurrencyPolicy": "allow"
    },
    "crossProjectAccess": {
      "projects": [
        "example-project"
      ],
      "enabled": false,
      "isAllowList": false
    },
    "triggers": [
      {
        "spec": {
          "vcs": {
            "vcsService": "github",
            "accountLogin": "github-user",
            "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo"
          },
          "commitMessageFlags": {
            "flags": [
              "[skip ci]",
              "[ci skip]",
              "[no ci]",
              "[skip nf]",
              "[nf skip]",
              "[northflank skip]",
              "[skip northflank]"
            ]
          },
          "filePaths": {
            "paths": [
              "README.md"
            ]
          }
        },
        "kind": "vcs-push"
      }
    ],
    "id": "example-workflow",
    "concurrencyPolicy": "allow",
    "createdAt": "2021-01-01T12:00:00.000Z",
    "updatedAt": "2021-01-01T12:00:00.000Z",
    "name": "string"
  }
}
```

### CLI reference

$ northflank get workflow

Options:

- `--projectId <projectId>`: ID of the project

- `--workflowId <workflowId>`: ID of the workflow

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about a workflow.

```json
{
  "apiVersion": "v1.2",
  "gitops": {
    "vcsService": "github",
    "accountLogin": "github-user",
    "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
    "branch": "main",
    "filePath": "/Dockerfile"
  },
  "spec": {
    "kind": "RolloutStrategy",
    "spec": {
      "name": "my-canary-rollout",
      "type": "canary",
      "options": {
        "triggers": {
          "releaseFromTemplate": true,
          "releaseFromReleaseFlow": true,
          "releaseFromCD": true,
          "releaseFromUI": true,
          "releaseFromApi": true
        },
        "blockDeploymentOnActiveRollout": true
      },
      "details": {
        "canaryStrategy": "percentage",
        "config": {
          "canaryPercentage": 20,
          "stablePercentage": 80
        }
      }
    },
    "updateMode": "patch"
  },
  "richInputs": [
    {
      "kind": "BranchCommitSelector",
      "spec": {
        "required": false,
        "inputs": {
          "source": "build-service"
        },
        "outputs": {
          "branch": "TARGET_BRANCH",
          "buildSha": "TARGET_COMMIT"
        },
        "title": "string"
      }
    }
  ],
  "options": {
    "autorun": false,
    "concurrencyPolicy": "allow"
  },
  "crossProjectAccess": {
    "projects": [
      "example-project"
    ],
    "enabled": false,
    "isAllowList": false
  },
  "triggers": [
    {
      "spec": {
        "vcs": {
          "vcsService": "github",
          "accountLogin": "github-user",
          "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo"
        },
        "commitMessageFlags": {
          "flags": [
            "[skip ci]",
            "[ci skip]",
            "[no ci]",
            "[skip nf]",
            "[nf skip]",
            "[northflank skip]",
            "[skip northflank]"
          ]
        },
        "filePaths": {
          "paths": [
            "README.md"
          ]
        }
      },
      "kind": "vcs-push"
    }
  ],
  "id": "example-workflow",
  "concurrencyPolicy": "allow",
  "createdAt": "2021-01-01T12:00:00.000Z",
  "updatedAt": "2021-01-01T12:00:00.000Z",
  "name": "string"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.workflow({
  parameters: {
    "projectId": "default-project",
    "workflowId": "development"
  }
});
```

#### Example Response

 Details about a workflow.

```json
{
  "data": {
    "apiVersion": "v1.2",
    "gitops": {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "branch": "main",
      "filePath": "/Dockerfile"
    },
    "spec": {
      "kind": "RolloutStrategy",
      "spec": {
        "name": "my-canary-rollout",
        "type": "canary",
        "options": {
          "triggers": {
            "releaseFromTemplate": true,
            "releaseFromReleaseFlow": true,
            "releaseFromCD": true,
            "releaseFromUI": true,
            "releaseFromApi": true
          },
          "blockDeploymentOnActiveRollout": true
        },
        "details": {
          "canaryStrategy": "percentage",
          "config": {
            "canaryPercentage": 20,
            "stablePercentage": 80
          }
        }
      },
      "updateMode": "patch"
    },
    "richInputs": [
      {
        "kind": "BranchCommitSelector",
        "spec": {
          "required": false,
          "inputs": {
            "source": "build-service"
          },
          "outputs": {
            "branch": "TARGET_BRANCH",
            "buildSha": "TARGET_COMMIT"
          },
          "title": "string"
        }
      }
    ],
    "options": {
      "autorun": false,
      "concurrencyPolicy": "allow"
    },
    "crossProjectAccess": {
      "projects": [
        "example-project"
      ],
      "enabled": false,
      "isAllowList": false
    },
    "triggers": [
      {
        "spec": {
          "vcs": {
            "vcsService": "github",
            "accountLogin": "github-user",
            "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo"
          },
          "commitMessageFlags": {
            "flags": [
              "[skip ci]",
              "[ci skip]",
              "[no ci]",
              "[skip nf]",
              "[nf skip]",
              "[northflank skip]",
              "[skip northflank]"
            ]
          },
          "filePaths": {
            "paths": [
              "README.md"
            ]
          }
        },
        "kind": "vcs-push"
      }
    ],
    "id": "example-workflow",
    "concurrencyPolicy": "allow",
    "createdAt": "2021-01-01T12:00:00.000Z",
    "updatedAt": "2021-01-01T12:00:00.000Z",
    "name": "string"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.get.workflow(
    project_id="default-project",
    workflow_id="development",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "apiVersion": "v1.2",
  "gitops": {
    "vcsService": "github",
    "accountLogin": "github-user",
    "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
    "branch": "main",
    "filePath": "/Dockerfile"
  },
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "RolloutStrategy",
          "spec": {
            "name": "my-canary-rollout",
            "type": "canary",
            "options": {
              "triggers": {
                "releaseFromTemplate": true,
                "releaseFromReleaseFlow": true,
                "releaseFromCD": true,
                "releaseFromUI": true,
                "releaseFromApi": true
              },
              "blockDeploymentOnActiveRollout": true
            },
            "details": {
              "canaryStrategy": "percentage",
              "config": {
                "canaryPercentage": 20,
                "stablePercentage": 80
              }
            }
          },
          "updateMode": "patch"
        }
      ]
    }
  },
  "richInputs": [
    {
      "kind": "BranchCommitSelector",
      "spec": {
        "required": false,
        "inputs": {
          "source": "build-service"
        },
        "outputs": {
          "branch": "TARGET_BRANCH",
          "buildSha": "TARGET_COMMIT"
        },
        "title": "string"
      }
    }
  ],
  "options": {
    "autorun": false,
    "concurrencyPolicy": "allow"
  },
  "crossProjectAccess": {
    "projects": [
      "example-project"
    ],
    "enabled": false,
    "isAllowList": false
  },
  "triggers": [
    {
      "spec": {
        "vcs": {
          "vcsService": "github",
          "accountLogin": "github-user",
          "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo"
        },
        "commitMessageFlags": {
          "flags": [
            "[skip ci]",
            "[ci skip]",
            "[no ci]",
            "[skip nf]",
            "[nf skip]",
            "[northflank skip]",
            "[skip northflank]"
          ]
        },
        "filePaths": {
          "paths": [
            "README.md"
          ]
        }
      },
      "kind": "vcs-push"
    }
  ],
  "id": "example-workflow",
  "concurrencyPolicy": "allow",
  "createdAt": "2021-01-01T12:00:00.000Z",
  "updatedAt": "2021-01-01T12:00:00.000Z",
  "name": "string"
}
```
