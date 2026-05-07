# Update release flow

Source: https://northflank.com/docs/v1/api/project/pipelines/update-release-flow.md

Updates a release flow

Required permission: Project > Pipelines > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `pipelineId`: (string) (required) ID of the pipeline
- `stage`: (string) (required) Stage of the pipeline

**Request body:**

{object}
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
- `richInputs`: [array of] (multiple options) {object}
    - `kind`: (string) (required) The kind of input. (enum: BranchCommitSelector)
    - `spec`: {object}
      - `title`: (string) (required) The title displayed for the input.
      - `description`: (string) The description displayed for the input.
      - `required`: (boolean) If true, an error will be displayed if this input is not provided a value.
      - `inputs`: {object}
        - `source`: (string) (required) The ID of the build service to use for this input.
      - `outputs`: {object}
        - `branch`: (string)
        - `buildSha`: (string) | {object}
    - `kind`: (string) (required) The kind of input. (enum: BuildSelector)
    - `spec`: {object}
      - `title`: (string) (required) The title displayed for the input.
      - `description`: (string) The description displayed for the input.
      - `required`: (boolean) If true, an error will be displayed if this input is not provided a value.
      - `inputs`: {object}
        - `source`: (string) (required) The ID of the build service to use for this input.
      - `outputs`: {object}
        - `branch`: (string)
        - `buildId`: (string)
        - `buildSha`: (string)
- `teardownSpec`: {object}
  - `spec`: (multiple options) {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Workflow)
     - `spec`: (undefined) (required)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
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
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: LoopWorkflow)
     - `spec`: {object}
       - `iterations`: (multiple options) [array of] (multiple options) {object} | (string) (pattern: .*\${.*}.*) | (string) (pattern: .*\${.*}.*)
       - `steps`: [array of] (undefined)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
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
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
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
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
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
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: LoopData)
     - `spec`: {object}
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: OpenTofuDestroy)
     - `spec`: {object}
       - `nodeRef`: (string) (required) The `ref` value of the `OpenTofu` node in the parent template whose state should be destroyed.
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*) | {object}
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Approval)
     - `spec`: {object}
       - `amount`: (integer) (required)
     - `skipNodeExecution`: (multiple options) (string) (enum: true, false) | (string) (pattern: .*\${.*}.*)
  - `failurePolicy`: (string) Controls what happens if the teardown spec fails or times out. `ignore` (default) — proceed with resource deletion regardless. `block` — halt deletion and set the environment to `teardown_failed` (enum: ignore, block)
- `apiVersion`: (string) (required)
- `project`: {object}
- `spec`: {object}

### API reference

POST /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}

POST /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"triggers":[{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","pathIgnoreRules":["README.md"],"ciIgnoreFlags":["[skip ci]"]}],"options":{"concurrencyPolicy":"allow","paused":false},"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"richInputs":[{"kind":"BranchCommitSelector","spec":{"required":false,"inputs":{"source":"build-service"},"outputs":{"branch":"TARGET_BRANCH","buildSha":"TARGET_COMMIT"}}}],"teardownSpec":{"spec":{"kind":"Workflow"}}}' \
  https://api.northflank.com/v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}
```

```javascript
const payload = {
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
        }
      }
    }
  ],
  "teardownSpec": {
    "spec": {
      "kind": "Workflow"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}"

payload = {"triggers":[{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","pathIgnoreRules":["README.md"],"ciIgnoreFlags":["[skip ci]"]}],"options":{"concurrencyPolicy":"allow","paused":false},"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"richInputs":[{"kind":"BranchCommitSelector","spec":{"required":false,"inputs":{"source":"build-service"},"outputs":{"branch":"TARGET_BRANCH","buildSha":"TARGET_COMMIT"}}}],"teardownSpec":{"spec":{"kind":"Workflow"}}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, json = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}"

  var jsonStr = []byte(`{"triggers":[{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","pathIgnoreRules":["README.md"],"ciIgnoreFlags":["[skip ci]"]}],"options":{"concurrencyPolicy":"allow","paused":false},"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"richInputs":[{"kind":"BranchCommitSelector","spec":{"required":false,"inputs":{"source":"build-service"},"outputs":{"branch":"TARGET_BRANCH","buildSha":"TARGET_COMMIT"}}}],"teardownSpec":{"spec":{"kind":"Workflow"}}}`)
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

#### Example Response

200 OK: success

### CLI reference

$ northflank update release-flow

Options:

- `--projectId <projectId>`: ID of the project

- `--pipelineId <pipelineId>`: ID of the pipeline

- `--stage <stage>`: Stage of the pipeline

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
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
        }
      }
    }
  ],
  "teardownSpec": {
    "spec": {
      "kind": "Workflow"
    }
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.releaseFlow({
  parameters: {
    "projectId": "default-project",
    "pipelineId": "example-pipeline",
    "stage": "development"
  },
  data: {
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
          }
        }
      }
    ],
    "teardownSpec": {
      "spec": {
        "kind": "Workflow"
      }
    }
  }
});
```
