# Get preview blueprint run details

Source: https://northflank.com/docs/v1/api/project/preview-blueprints/get-preview-blueprint-run-details.md

Get information about the given preview blueprint run

Required permission: Project > PreviewBlueprints > Runs > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `previewBlueprintId`: (string) (required) ID of the preview blueprint
- `runId`: (string) (required) ID of the preview blueprint run

**Response body:**

{object}
- `data`: {object}
  - `apiVersion`: (string) (required) The version of the Northflank API to run the template against. (enum: v1.2)
  - `arguments`: {object}
  - `triggers`: [array of] {object}
     - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
     - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
     - `selfHostedVcsId`: (string) If vcsService is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
     - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
     - `vcsLinkId`: (string)
     - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
     - `branchRestrictions`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
     - `prRestrictions`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
     - `pathIgnoreRules`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
     - `ciIgnoreFlags`: [array of] (string) A commit ignore flag. (max length: 72)
     - `ciIgnoreFlagsEnabled`: (boolean)
     - `isAllowList`: (boolean)
     - `ignoreDrafts`: (boolean) If `true`, draft pull requests from this repo will not trigger the template.
  - `options`: {object}
    - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
    - `paused`: (boolean) If `true`, the template will not run when triggered by git.
  - `gitops`: {object}
    - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
    - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
    - `vcsLinkId`: (string) Legacy key. Please used accountLogin instead.
    - `repoUrl`: (string) (required) URL of the Git repo to sync the file with. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
    - `branch`: (string) (required) The name of the branch to use.
    - `filePath`: (string) (required) The file path in the repository. If using an existing file, it should be in JSON format. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
  - `$schema`: (string)
  - `spec`: (multiple options) {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: Workflow)
     - `spec`: (undefined) (required)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the Workflow node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: RolloutStrategy)
     - `spec`: {object}
       - `name`: (multiple options) (string) Display name for the gradual rollout strategy | (string) A string containing one or more references that resolve to display name for the gradual rollout strategy (pattern: .*\${.*}.*)
       - `type`: (multiple options) (string) Type of the gradual rollout strategy (enum: canary) | (string) A string containing one or more references that resolve to type of the gradual rollout strategy (pattern: .*\${.*}.*)
       - `options`: (multiple options) {object}
           - `triggers`: (multiple options) {object}
               - `releaseFromTemplate`: (multiple options) (boolean) Automatically trigger the rollout strategy when a release is initiated from a template | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a template (pattern: .*\${.*}.*)
               - `releaseFromReleaseFlow`: (multiple options) (boolean) Automatically trigger the rollout strategy when a release is initiated from a release flow | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a release flow (pattern: .*\${.*}.*)
               - `releaseFromCD`: (multiple options) (boolean) Automatically trigger the rollout strategy when a release is initiated from a CD pipeline | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from a CD pipeline (pattern: .*\${.*}.*)
               - `releaseFromUI`: (multiple options) (boolean) Automatically trigger the rollout strategy when a release is initiated from the UI | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated from the UI (pattern: .*\${.*}.*)
               - `releaseFromApi`: (multiple options) (boolean) Automatically trigger the rollout strategy when a release is initiated via the API | (string) A string containing one or more references that resolve to automatically trigger the rollout strategy when a release is initiated via the API (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to conditions under which a new release will automatically initiate as a gradual rollout (pattern: .*\${.*}.*)
           - `blockDeploymentOnActiveRollout`: (multiple options) (boolean) When enabled, new deployments are blocked while a rollout is in progress | (string) A string containing one or more references that resolve to when enabled, new deployments are blocked while a rollout is in progress (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `details`: (multiple options) (multiple options) {object}
             - `canaryStrategy`: (multiple options) (string) Strategy used to split traffic between stable and canary deployments (enum: percentage, header) | (string) A string containing one or more references that resolve to strategy used to split traffic between stable and canary deployments (pattern: .*\${.*}.*)
             - `config`: (multiple options) (multiple options) {object}
                   - `canaryPercentage`: (multiple options) (integer) Percentage of traffic to route to the canary deployment | (string) A string containing one or more references that resolve to percentage of traffic to route to the canary deployment (pattern: .*\${.*}.*)
                   - `stablePercentage`: (multiple options) (integer) Percentage of traffic to route to the stable deployment | (string) A string containing one or more references that resolve to percentage of traffic to route to the stable deployment (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to configuration for the selected canary strategy (pattern: .*\${.*}.*) | (multiple options) {object}
                   - `canaryHeader`: {object}
                     - `headerName`: (multiple options) (string) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header name used to identify requests that should be routed to the target deployment (pattern: .*\${.*}.*)
                     - `headerValue`: (multiple options) (string) HTTP header value that routes matching requests to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header value that routes matching requests to the target deployment (pattern: .*\${.*}.*)
                   - `stableHeader`: {object}
                     - `headerName`: (multiple options) (string) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header name used to identify requests that should be routed to the target deployment (pattern: .*\${.*}.*)
                     - `headerValue`: (multiple options) (string) HTTP header value that routes matching requests to the target deployment (min length: 1) | (string) A string containing one or more references that resolve to hTTP header value that routes matching requests to the target deployment (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to configuration for the selected canary strategy (pattern: .*\${.*}.*) | (string) A string containing one or more references that resolve to strategy-specific configuration details (pattern: .*\${.*}.*)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: {object}
         - `id`: (string) (required) Identifier for the gradual rollout strategy
         - `name`: (string) (required) Name of the gradual rollout strategy
         - `type`: (string) (required) Type of the gradual rollout strategy (enum: canary)
         - `options`: {object}
           - `triggers`: {object}
             - `releaseFromTemplate`: (boolean)
             - `releaseFromReleaseFlow`: (boolean)
             - `releaseFromCD`: (boolean)
             - `releaseFromUI`: (boolean)
             - `releaseFromApi`: (boolean)
           - `blockDeploymentOnActiveRollout`: (boolean)
         - `details`: {object}
           - `canaryStrategy`: (string) (required) (enum: percentage, header)
           - `config`: (multiple options) {object}
               - `canaryPercentage`: (integer) (required)
               - `stablePercentage`: (integer) (required) | {object}
               - `headerName`: (string) (required) (min length: 1)
               - `headerValue`: (string) (required) (min length: 1) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: AddonBackup)
     - `spec`: {object}
       - `projectId`: (multiple options) (string) The ID of the addon to backup. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the addon to backup. (pattern: .*\${.*}.*)
       - `addonId`: (multiple options) (string) The ID of the addon to backup. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the addon to backup. (pattern: .*\${.*}.*)
       - `backupType`: (string) The type of backup to perform. Defaults to `snapshot`. (enum: dump, snapshot)
       - `compressionType`: (multiple options) (string) (enum: zstd, gz, none) | (string) (pattern: .*\${.*}.*)
       - `customDestinationId`: (multiple options) (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) (pattern: .*\${.*}.*)
       - `additionalDestinations`: [array of] {object}
           - `destinationId`: (multiple options) (string) Additional custom back up destination that should be used to store the snapshot. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) A string containing one or more references that resolve to additional custom back up destination that should be used to store the snapshot. (pattern: .*\${.*}.*)
           - `retentionTime`: (multiple options) (integer) Retention time of the additional back up in days. | (string) A string containing one or more references that resolve to retention time of the additional back up in days. (pattern: .*\${.*}.*)
           - `type`: (string) (required) The type of backup destination to use (enum: custom)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the AddonBackup node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: AddonImport)
     - `spec`: {object}
       - `projectId`: (multiple options) (string) The ID of the project containing the addon. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the project containing the addon. (pattern: .*\${.*}.*)
       - `addonId`: (multiple options) (string) The ID of the addon to import a backup into. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the addon to import a backup into. (pattern: .*\${.*}.*)
       - `importUrl`: (multiple options) (string) A URL to import a backup file from. | (string) A string containing one or more references that resolve to a URL to import a backup file from. (pattern: .*\${.*}.*)
       - `connectionString`: (multiple options) (string) A connection string for a live database to dump and import. | (string) A string containing one or more references that resolve to a connection string for a live database to dump and import. (pattern: .*\${.*}.*)
       - `importAllDatabases`: (boolean) When true, all non-system databases will be detected and dumped. Only applicable when using a connection string with PostgreSQL.
       - `compressionType`: (multiple options) (string) (enum: zstd, gz, none) | (string) (pattern: .*\${.*}.*)
       - `customDestinationId`: (multiple options) (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) (pattern: .*\${.*}.*)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the AddonImport node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: Build)
     - `spec`: {object}
       - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
       - `buildRules`: {object}
         - `pathIgnoreRules`: [array of] (string) (max length: 260)
         - `isAllowList`: (boolean)
         - `ciIgnoreFlagsEnabled`: (boolean)
         - `ciIgnoreFlags`: [array of] (string) (max length: 72)
       - `buildOverrides`: {object}
         - `buildArguments`: (multiple options) {object} | (string) (pattern: .*\${.*}.*)
         - `buildFiles`: {object}
         - `dockerSecretMounts`: {object}
         - `docker`: {object}
           - `dockerFilePath`: (string) The file path of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
           - `dockerWorkDir`: (string) The working directory of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
           - `dockerfileTarget`: (string) If your Dockerfile contains multiple build stages, you can specify the target stage by entering its name here. (pattern: ^[a-zA-Z0-9-_]+$)
       - `id`: (multiple options) (string) The id of object to build. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of object to build. (pattern: .*\${.*}.*)
       - `type`: (string) (required) The type of the object to build. (enum: service, job)
       - `sha`: (multiple options) (string) Commit sha to build. If not provided, builds the most recent relevant commit. (min length: 40) (max length: 40) | (string) A string containing one or more references that resolve to commit sha to build. If not provided, builds the most recent relevant commit. (pattern: .*\${.*}.*)
       - `branch`: (multiple options) (string) Branch to build from. If `sha` is not provided, the latest commit of this branch will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. | (string) A string containing one or more references that resolve to branch to build from. If `sha` is not provided, the latest commit of this branch will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. (pattern: .*\${.*}.*)
       - `pullRequestId`: (multiple options) (integer) ID of a pull request to build from. If `sha` is not provided, the latest commit of this pull request will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. | (string) A string containing one or more references that resolve to iD of a pull request to build from. If `sha` is not provided, the latest commit of this pull request will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both. (pattern: .*\${.*}.*)
       - `reuseExistingBuilds`: (boolean) If true, the build node will return an existing build if one is available for that commit. Otherwise, a new build will be created with every new preview environment. Defaults to `true`.
       - `buildRuleFallThroughHandling`: (string) Define handling if build rules do not match the specified commit (enum: fail, skip, useLastBuild)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the Build node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: JobRun)
     - `spec`: {object}
       - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
       - `runtimeEnvironment`: (multiple options) {object} | (string) (pattern: .*\${.*}.*)
       - `runtimeFiles`: {object}
       - `dockerSecretMounts`: {object}
       - `billing`: {object}
         - `deploymentPlan`: (multiple options) (string) The ID of the deployment plan override to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) A string containing one or more references that resolve to the ID of the deployment plan override to use. (pattern: .*\${.*}.*)
       - `deployment`: (multiple options) {object}
           - `docker`: {object}
             - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
             - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
           - `buildpack`: {object}
             - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
             - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
             - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
           - `storage`: {object}
             - `useHdbStorage`: (boolean)
             - `usePdSsdStorage`: (boolean)
             - `ephemeralStorage`: {object}
               - `storageSize`: (multiple options) (integer) Ephemeral storage per container in MB | (string) A string containing one or more references that resolve to ephemeral storage per container in MB (pattern: .*\${.*}.*)
             - `shmSize`: (multiple options) (integer) Configures the amount of available memory-backed disk space available to /dev/shm | (string) A string containing one or more references that resolve to configures the amount of available memory-backed disk space available to /dev/shm (pattern: .*\${.*}.*)
           - `internal`: {object}
             - `id`: (multiple options) (multiple options) (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) | (string) A string containing one or more references that resolve to iD of the build service to deploy (pattern: .*\${.*}.*)
             - `branch`: (multiple options) (string) Branch to deploy | (string) A string containing one or more references that resolve to branch to deploy (pattern: .*\${.*}.*)
             - `buildSHA`: (multiple options) (multiple options) (string) A commit sha. (min length: 40) (max length: 40) | (string) Latest commit. (enum: latest) | (string) A string containing one or more references that resolve to commit SHA to deploy, or 'latest' to deploy the most recent commit (pattern: .*\${.*}.*)
             - `buildId`: (multiple options) (string) ID of the build that should be deployed | (string) A string containing one or more references that resolve to iD of the build that should be deployed (pattern: .*\${.*}.*) | {object}
           - `docker`: {object}
             - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
             - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
           - `buildpack`: {object}
             - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
             - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
             - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
             - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
           - `storage`: {object}
             - `useHdbStorage`: (boolean)
             - `usePdSsdStorage`: (boolean)
             - `ephemeralStorage`: {object}
               - `storageSize`: (multiple options) (integer) Ephemeral storage per container in MB | (string) A string containing one or more references that resolve to ephemeral storage per container in MB (pattern: .*\${.*}.*)
             - `shmSize`: (multiple options) (integer) Configures the amount of available memory-backed disk space available to /dev/shm | (string) A string containing one or more references that resolve to configures the amount of available memory-backed disk space available to /dev/shm (pattern: .*\${.*}.*)
           - `external`: {object}
             - `imagePath`: (multiple options) (string) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+)(\/v1)?)?(?:\/)?([a-zA-Z/-9\.\-_]+)(?:\:([a-zA-Z/-9\.\-_\:]+)|\@([a-zA-Z/-9\.\-_\:]+))$) | (string) A string containing one or more references that resolve to image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: .*\${.*}.*)
             - `credentials`: (multiple options) (string) ID of the saved credentials to use to access this external image. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of the saved credentials to use to access this external image. (pattern: .*\${.*}.*)
       - `jobId`: (multiple options) (string) The ID of the job to run. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 52) | (string) A string containing one or more references that resolve to the ID of the job to run. (pattern: .*\${.*}.*)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the JobRun node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: LoopWorkflow)
     - `spec`: {object}
       - `iterations`: (multiple options) [array of] (multiple options) {object} | (string) (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `steps`: [array of] (undefined)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the LoopWorkflow node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: Action)
     - `spec`: (multiple options) {object}
         - `kind`: (string) (required) The kind of action. (enum: Addon)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of action. (enum: restart)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (string) The id of the addon to restart. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the addon to restart. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*)
             - `condition`: (string) (enum: running) | {object}
         - `kind`: (string) (required) The kind of action. (enum: AddonBackup)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of action. (enum: restore)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (string) The id of the addon to restore a backup to. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the addon to restore a backup to. (pattern: .*\${.*}.*)
               - `backupId`: (multiple options) (string) The id of the backup to restore. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the backup to restore. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*)
             - `condition`: (string) (enum: success) | {object}
         - `kind`: (string) (required) The kind of action. (enum: Job)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of action. (enum: execute)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `jobId`: (multiple options) (string) The id of the job to run the command in. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the job to run the command in. (pattern: .*\${.*}.*)
               - `command`: (string) (required)
               - `shell`: (string)
               - `user`: (string)
               - `group`: (string) | {object}
         - `kind`: (string) (required) The kind of action. (enum: Service)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of action. (enum: restart)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `serviceId`: (multiple options) (string) The id of the service to restart. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the service to restart. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*)
             - `condition`: (string) (enum: running) | {object}
             - `type`: (string) (required) The type of action. (enum: execute)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `serviceId`: (multiple options) (string) The id of the service to run the command in. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the service to run the command in. (pattern: .*\${.*}.*)
               - `options`: {object}
                 - `dispatchOnly`: (boolean) Specify whether the command output should be awaited the node should succeed after having sent the command.
               - `command`: (string) (required)
               - `shell`: (string)
               - `user`: (string)
               - `group`: (string) | {object}
         - `kind`: (string) (required) The kind of action. (enum: VCS)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of action. (enum: createRepoFromSource)
             - `data`: {object}
               - `sourceData`: {object}
                 - `publicRepo`: (multiple options) (boolean) | (string) (pattern: .*\${.*}.*)
                 - `vcsService`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `oauthProvider`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `repoUrl`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `accountLogin`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `vcsLinkId`: (multiple options) (string) (min length: 24) (max length: 24) | (string) (pattern: .*\${.*}.*)
                 - `selfHostedVcsId`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
               - `targetData`: {object}
                 - `name`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `description`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `privateRepo`: (multiple options) (boolean) | (string) (pattern: .*\${.*}.*)
                 - `context`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `folder`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `accountLogin`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `vcsLinkId`: (multiple options) (string) (min length: 24) (max length: 24) | (string) (pattern: .*\${.*}.*)
                 - `oauthProvider`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `vcsService`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
                 - `selfHostedVcsId`: (multiple options) (string) | (string) (pattern: .*\${.*}.*)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the Action node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: Condition)
     - `spec`: (multiple options) {object}
         - `kind`: (string) (required) The kind of condition. (enum: Addon)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: running)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (string) The id of the addon to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the addon to monitor. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of condition. (enum: AddonBackup)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (string) The id of the addon to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the addon to monitor. (pattern: .*\${.*}.*)
               - `backupId`: (multiple options) (string) The id of the backup to monitor. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the backup to monitor. (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of condition. (enum: AddonImport)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `addonId`: (multiple options) (string) The id of the addon to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the addon to monitor. (pattern: .*\${.*}.*)
               - `importId`: (multiple options) (string) The id of the import to monitor. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the import to monitor. (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of condition. (enum: Build)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `buildId`: (multiple options) (string) The id of the build to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the build to monitor. (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of condition. (enum: BYOCCluster)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: running)
             - `data`: {object}
               - `clusterId`: (multiple options) (string) The id of the cluster to monitor. (pattern: ^[a-z]-?[a-z0-9]+(-[a-z0-9]+)*$) (min length: 3) (max length: 20) | (string) A string containing one or more references that resolve to the id of the cluster to monitor. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of condition. (enum: JobRun)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: success)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `jobId`: (multiple options) (string) The id of the job to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the job to monitor. (pattern: .*\${.*}.*)
               - `runId`: (multiple options) (string) The id of the job run to monitor. | (string) A string containing one or more references that resolve to the id of the job run to monitor. (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of condition. (enum: Service)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: running)
             - `data`: {object}
               - `projectId`: (multiple options) (string) ID of parent project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to iD of parent project (pattern: .*\${.*}.*)
               - `serviceId`: (multiple options) (string) The id of the service to monitor. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) A string containing one or more references that resolve to the id of the service to monitor. (pattern: .*\${.*}.*)
               - `timeoutDuration`: (multiple options) (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A template reference that resolves to a timeout duration in seconds (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of condition. (enum: VCS)
         - `spec`: (multiple options) {object}
             - `type`: (string) (required) The type of condition. (enum: createRepoFromSourceSuccess)
             - `data`: {object}
               - `trackerId`: (multiple options) (string) The tracker id outputted from the 'createRepoFromSource' action to monitor. | (string) A string containing one or more references that resolve to the tracker id outputted from the 'createRepoFromSource' action to monitor. (pattern: .*\${.*}.*)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the Condition node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: Release)
     - `spec`: {object}
       - `type`: (string) (required) (enum: build, deployment, registry)
       - `origin`: (multiple options) {object}
           - `id`: (multiple options) (string) ID of the build service to deploy (pattern: ^((?<projectId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)\/)?(?<internalId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)$) | (string) A string containing one or more references that resolve to iD of the build service to deploy (pattern: .*\${.*}.*)
           - `branch`: (multiple options) (string) Branch to deploy | (string) A string containing one or more references that resolve to branch to deploy (pattern: .*\${.*}.*)
           - `build`: (multiple options) (string) ID of the build that should be deployed | (string) A string containing one or more references that resolve to iD of the build that should be deployed (pattern: .*\${.*}.*) | {object}
           - `id`: (multiple options) (string) ID of the deployment service or job to promote from. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to iD of the deployment service or job to promote from. (pattern: .*\${.*}.*)
           - `type`: (string) (required) The type of resource to promote from. (enum: service, job) | {object}
           - `imagePath`: (multiple options) (string) The image path of the external image to deploy. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+)(\/v1)?)?(?:\/)?([a-zA-Z/-9\.\-_]+)(?:\:([a-zA-Z/-9\.\-_\:]+)|\@([a-zA-Z/-9\.\-_\:]+))$) | (string) A string containing one or more references that resolve to the image path of the external image to deploy. (pattern: .*\${.*}.*)
           - `credentials`: (multiple options) (string) The ID of the credentials to authenticate with to access the external image. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the credentials to authenticate with to access the external image. (pattern: .*\${.*}.*)
       - `target`: {object}
         - `id`: (multiple options) (string) (pattern: ^[A-Za-z0-9-]+$) | (string) (pattern: .*\${.*}.*)
         - `type`: (multiple options) (string) (enum: service, job) | (string) (pattern: .*\${.*}.*)
     - `condition`: (string) (enum: running)
     - `timeoutDuration`: (multiple options) (integer) Timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. | (string) A string containing one or more references that resolve to timeout for the condition in seconds. This will fail the condition after the timeout has elapsed. (pattern: .*\${.*}.*)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the Release node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: Message)
     - `spec`: (multiple options) {object}
         - `kind`: (string) (required) The kind of message to send. (enum: VCS)
         - `spec`: {object}
           - `vcsService`: (multiple options) (string) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure) | (string) A string containing one or more references that resolve to the VCS provider to use. (pattern: .*\${.*}.*)
           - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
           - `accountLogin`: (multiple options) (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name. | (string) A string containing one or more references that resolve to by default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name. (pattern: .*\${.*}.*)
           - `repoUrl`: (multiple options) (string) URL of the Git repo to send this message to. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$) | (string) A string containing one or more references that resolve to uRL of the Git repo to send this message to. (pattern: .*\${.*}.*)
           - `pullRequestId`: (multiple options) (string) The ID of the pull request to comment on. | (string) A string containing one or more references that resolve to the ID of the pull request to comment on. (pattern: .*\${.*}.*)
           - `message`: (multiple options) (string) The rich text message to comment. | (string) A string containing one or more references that resolve to the rich text message to comment. (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of message to send. (enum: SLACK)
         - `spec`: {object}
           - `webhookUrl`: (multiple options) (string) The Slack webhook URL to send messages to. | (string) A string containing one or more references that resolve to the Slack webhook URL to send messages to. (pattern: .*\${.*}.*)
           - `integrationInternalId`: (multiple options) (string) The ID of an existing Slack integration to use. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39) | (string) A string containing one or more references that resolve to the ID of an existing Slack integration to use. (pattern: .*\${.*}.*)
           - `message`: (multiple options) (string) The message content to send to Slack. Supports markdown formatting. | (string) A string containing one or more references that resolve to the message content to send to Slack. Supports markdown formatting. (pattern: .*\${.*}.*) | {object}
         - `kind`: (string) (required) The kind of message to send. (enum: RAW_WEBHOOK)
         - `spec`: {object}
           - `webhookUrl`: (multiple options) (string) The webhook URL to send messages to. | (string) A string containing one or more references that resolve to the webhook URL to send messages to. (pattern: .*\${.*}.*)
           - `message`: (multiple options) (string) The message content to send to the webhook. | (string) A string containing one or more references that resolve to the message content to send to the webhook. (pattern: .*\${.*}.*)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the Message node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: LoopData)
     - `spec`: {object}
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the LoopData node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: SecretInheritance)
     - `spec`: {object}
       - `configs`: (multiple options) [array of] (multiple options) (string) (pattern: ^[A-Za-z0-9-]+$) | (string) (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `secrets`: (multiple options) [array of] (multiple options) (string) (pattern: ^[A-Za-z0-9-]+$) | (string) (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `requiredKeys`: (multiple options) [array of] (multiple options) (string) | (string) (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `requiredFiles`: (multiple options) [array of] (multiple options) (string) | (string) (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the SecretInheritance node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: Approval)
     - `spec`: {object}
       - `amount`: (integer) (required)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the Approval node. | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `settings`: {object}
       - `maxAttempts`: (integer) The maximum number of attempts before the node is marked as `failure`.
       - `backoff`: {object}
         - `type`: (string) The type of backoff to use. If set to `fixed`, the node will wait the same amount of time between attempts. (enum: fixed)
         - `delay`: (integer) The time between attempts in seconds.
     - `kind`: (string) (required) The kind of node. (enum: RunTemplate)
     - `spec`: {object}
       - `templateType`: (string) (required) (enum: template, release-flow-template, preview-env-template, workflow, preview-blueprint, template-teardown, workflow-teardown, preview-blueprint-teardown)
       - `templateId`: (multiple options) (multiple options) (string) The id of the workflow to run. (pattern: ^((?<projectId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)\/)?(?<internalId>[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)$) (min length: 3) (max length: 79) | (string) A string containing one or more references that resolve to the id of the workflow to run. (pattern: .*\${.*}.*) | (multiple options) (string) The id of the template to run. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the id of the template to run. (pattern: .*\${.*}.*)
       - `arguments`: {object}
         - `variables`: [array of] {object}
             - `key`: (string) (required)
             - `value`: (string)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
     - `response`: {object}
       - `status`: (string) (required) The status of the node. (enum: waiting, invalid, failure, retrying, success, aborted, aborting, skipped, async_wait, approval_wait, unknown)
       - `error`: (multiple options) {object}
           - `code`: (integer) (required)
           - `message`: (string) (required) | (undefined)
       - `retries`: {object}
         - `attempts`: (integer) (required) The current number of attempts that have been made by this node.
         - `maxAttempts`: (integer) (required) The maximum number of attempts before the node is marked as `failure`.
         - `timestamp`: (integer) (required) The timestamp of the most recent attempt.
         - `nextAttempt`: (integer) The timestamp of the next attempt.
         - `initialCheckTime`: (integer) The timestamp of the initial condition check.
       - `startTime`: (integer) The timestamp of the initial attempt.
       - `endTime`: (integer) The timestamp of the final attempt.
       - `data`: (undefined) The response data of the RunTemplate node.
  - `refs`: {object}
  - `id`: (string) (required) ID of the preview blueprint run
  - `name`: (string) Optional name for the preview blueprint run
  - `description`: (string) Optional description for the preview blueprint run
  - `status`: (string) (required) Status of the template run (enum: pending, running, success, failure, aborted, aborting, queued, unknown, skipped, waiting, retrying, async_wait, approval_wait)
  - `startedAt`: (string) Timestamp the run started at. (format: date-time)
  - `concluded`: (boolean) (required) Whether the run has concluded (aborted, success, failed)
  - `concludedAt`: (string) Timestamp the run concluded at. (format: date-time)
  - `createdAt`: (string) (required) Timestamp the run was created at. (format: date-time)
  - `updatedAt`: (string) (required) Timestamp the run was last updated at. (format: date-time)

### API reference

GET /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs/{runId}

GET /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs/{runId}

#### Example Response

200 OK: Details about a preview blueprint run.

```json
{
  "data": {
    "apiVersion": "v1.2",
    "triggers": [
      {
        "vcsService": "github",
        "accountLogin": "github-user",
        "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
        "pathIgnoreRules": [
          "README.md"
        ],
        "ciIgnoreFlags": [
          "[skip ci]"
        ]
      }
    ],
    "options": {
      "concurrencyPolicy": "allow",
      "paused": false
    },
    "gitops": {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "branch": "main",
      "filePath": "/Dockerfile"
    },
    "spec": {
      "settings": {
        "maxAttempts": 3,
        "backoff": {
          "type": "fixed",
          "delay": 60
        }
      },
      "kind": "Workflow",
      "response": {
        "status": "success",
        "retries": {
          "attempts": 1,
          "maxAttempts": 3,
          "timestamp": 1657296265
        },
        "startTime": 1657296265,
        "endTime": 1657296265
      }
    },
    "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
    "name": "Example run",
    "description": "This is an example description",
    "status": "success",
    "startedAt": "2021-01-01 12:01:00.000Z",
    "concluded": true,
    "concludedAt": "2021-01-01 12:10:00.000Z",
    "createdAt": "2021-01-01 12:00:00.000Z",
    "updatedAt": "2021-01-01 12:00:00.000Z"
  }
}
```

### CLI reference

$ northflank get preview-blueprint-run

Options:

- `--projectId <projectId>`: ID of the project

- `--previewBlueprintId <previewBlueprintId>`: ID of the preview blueprint

- `--runId <runId>`: ID of the preview blueprint run

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about a preview blueprint run.

```json
{
  "apiVersion": "v1.2",
  "triggers": [
    {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "pathIgnoreRules": [
        "README.md"
      ],
      "ciIgnoreFlags": [
        "[skip ci]"
      ]
    }
  ],
  "options": {
    "concurrencyPolicy": "allow",
    "paused": false
  },
  "gitops": {
    "vcsService": "github",
    "accountLogin": "github-user",
    "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
    "branch": "main",
    "filePath": "/Dockerfile"
  },
  "spec": {
    "settings": {
      "maxAttempts": 3,
      "backoff": {
        "type": "fixed",
        "delay": 60
      }
    },
    "kind": "Workflow",
    "response": {
      "status": "success",
      "retries": {
        "attempts": 1,
        "maxAttempts": 3,
        "timestamp": 1657296265
      },
      "startTime": 1657296265,
      "endTime": 1657296265
    }
  },
  "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
  "name": "Example run",
  "description": "This is an example description",
  "status": "success",
  "startedAt": "2021-01-01 12:01:00.000Z",
  "concluded": true,
  "concludedAt": "2021-01-01 12:10:00.000Z",
  "createdAt": "2021-01-01 12:00:00.000Z",
  "updatedAt": "2021-01-01 12:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.previewBlueprintRun({
  parameters: {
    "projectId": "default-project",
    "previewBlueprintId": "development",
    "runId": "development"
  }
});
```

#### Example Response

 Details about a preview blueprint run.

```json
{
  "data": {
    "apiVersion": "v1.2",
    "triggers": [
      {
        "vcsService": "github",
        "accountLogin": "github-user",
        "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
        "pathIgnoreRules": [
          "README.md"
        ],
        "ciIgnoreFlags": [
          "[skip ci]"
        ]
      }
    ],
    "options": {
      "concurrencyPolicy": "allow",
      "paused": false
    },
    "gitops": {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "branch": "main",
      "filePath": "/Dockerfile"
    },
    "spec": {
      "settings": {
        "maxAttempts": 3,
        "backoff": {
          "type": "fixed",
          "delay": 60
        }
      },
      "kind": "Workflow",
      "response": {
        "status": "success",
        "retries": {
          "attempts": 1,
          "maxAttempts": 3,
          "timestamp": 1657296265
        },
        "startTime": 1657296265,
        "endTime": 1657296265
      }
    },
    "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
    "name": "Example run",
    "description": "This is an example description",
    "status": "success",
    "startedAt": "2021-01-01 12:01:00.000Z",
    "concluded": true,
    "concludedAt": "2021-01-01 12:10:00.000Z",
    "createdAt": "2021-01-01 12:00:00.000Z",
    "updatedAt": "2021-01-01 12:00:00.000Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
