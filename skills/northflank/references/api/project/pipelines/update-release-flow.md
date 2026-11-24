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
- `arguments`: {object} A set of arguments that can be referenced in a template using '${args.argumentName}'.
- `triggers`: [array of] {object}
   - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
   - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
   - `selfHostedVcsId`: (string) If vcsService is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
   - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
   - `vcsLinkId`: (string)
   - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
   - `branchRestrictions`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
   - `prRestrictions`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
   - `pathIgnoreRules`: [array of] An array of path ignore rules. A commit will only be built if a file has been changed that does not match any of the ignore rules. Path ignore rules follow `.gitignore` syntax. (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
   - `ciIgnoreFlags`: [array of] An array of commit ignore flags. If a commit message contains one or more of these flags, that commit will not be built. Defaults to `["[skip ci]", "[ci skip]", "[no ci]", "[skip nf]", "[nf skip]", "[northflank skip]", "[skip northflank]"]` (string) A commit ignore flag. (max length: 72)
   - `ciIgnoreFlagsEnabled`: (boolean)
   - `isAllowList`: (boolean)
   - `ignoreDrafts`: (boolean) If `true`, draft pull requests from this repo will not trigger the template.
- `options`: {object} Options regarding how the template is run.
  - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
  - `paused`: (boolean) If `true`, the template will not run when triggered by git.
- `gitops`: {object}
  - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
  - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
  - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
  - `vcsLinkId`: (string) Legacy key. Please used accountLogin instead.
  - `repoUrl`: (string) (required) URL of the Git repo to sync the file with. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
  - `branch`: (string) (required) The name of the branch to use.
  - `filePath`: (string) (required) The file path in the repository. If using an existing file, it should be in JSON format. (pattern: ^\/((?!\.\.?\/)[a-zA-Z0-9-._]+\/)*(?!\.\.?$)[a-zA-Z0-9-._]+$)
- `$schema`: (string)
- `richInputs`: [array of] An array of rich UI override inputs for the Release Flow template. (multiple options) A node representing a rich UI override for the Release Flow template. {object} BranchCommitSelector input
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
- `teardownSpec`: {object} (nullable) Optional spec to run when the template is deleted.
  - `spec`: (multiple options) (required) A node representing an action to be performed as part of the teardown spec. {object} Workflow node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Workflow)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: (required) | {object} JobRun node
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
               - `trackerId`: (multiple options) (required) The tracker id outputted from the 'createRepoFromSource' action to monitor. (string) The tracker id outputted from the 'createRepoFromSource' action to monitor. | (string) A string containing one or more references that resolve to the tracker id outputted from the 'createRepoFromSource' action to monitor. (pattern: .*\${.*}.*) | {object} Message node
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
     - `spec`: {object} (required) The specification for the LoopData node. | {object} OpenTofuDestroy node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: OpenTofuDestroy)
     - `condition`: (string) (enum: success)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the OpenTofuDestroy node.
       - `nodeRef`: (string) (required) The `ref` value of the `OpenTofu` node in the parent template whose state should be destroyed. | {object} Approval node
     - `ref`: (string) An identifier that can used to reference the output of this node later in the template.
     - `kind`: (string) (required) The kind of node. (enum: Approval)
     - `skipNodeExecution`: (multiple options) If set to 'true', the execution of the node will be skipped. (string) If set to 'true', the execution of the node will be skipped. (enum: true, false) | (string) A string containing one or more references that resolve to if set to 'true', the execution of the node will be skipped. (pattern: .*\${.*}.*)
     - `spec`: {object} (required) The specification for the Approval node.
       - `amount`: (integer) (required)
  - `failurePolicy`: (string) Controls what happens if the teardown spec fails or times out. `ignore` (default) — proceed with resource deletion regardless. `block` — halt deletion and set the environment to `teardown_failed` (enum: ignore, block)
- `apiVersion`: (string) (required)
- `project`: {object}
- `spec`: {object} (required)

### API reference

POST /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}

POST /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"triggers":[{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","pathIgnoreRules":["README.md"],"ciIgnoreFlags":["[skip ci]","[ci skip]","[no ci]","[skip nf]","[nf skip]","[northflank skip]","[skip northflank]"]}],"options":{"concurrencyPolicy":"allow","paused":false},"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"richInputs":[{"kind":"BranchCommitSelector","spec":{"required":false,"inputs":{"source":"build-service"},"outputs":{"branch":"TARGET_BRANCH","buildSha":"TARGET_COMMIT"},"title":"string"}}],"teardownSpec":{"spec":{"kind":"Workflow","spec":{"type":"sequential","steps":[{"kind":"JobRun","spec":{"projectId":"example-project","runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"billing":{"deploymentPlan":"nf-compute-20"},"deployment":{"docker":{"configType":"default"},"storage":{"ephemeralStorage":{"storageSize":1024}},"internal":{"id":"example-build-service","branch":"master","buildSHA":"latest","buildId":"premium-guide-6393"}},"jobId":"example-job"}}]}}},"apiVersion":"string","spec":{}}' \
  "https://api.northflank.com/v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}"
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
        "[skip ci]",
        "[ci skip]",
        "[no ci]",
        "[skip nf]",
        "[nf skip]",
        "[northflank skip]",
        "[skip northflank]"
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
        },
        "title": "string"
      }
    }
  ],
  "teardownSpec": {
    "spec": {
      "kind": "Workflow",
      "spec": {
        "type": "sequential",
        "steps": [
          {
            "kind": "JobRun",
            "spec": {
              "projectId": "example-project",
              "runtimeFiles": {
                "/dir/fileName": {
                  "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
                  "encoding": "utf-8"
                }
              },
              "billing": {
                "deploymentPlan": "nf-compute-20"
              },
              "deployment": {
                "docker": {
                  "configType": "default"
                },
                "storage": {
                  "ephemeralStorage": {
                    "storageSize": 1024
                  }
                },
                "internal": {
                  "id": "example-build-service",
                  "branch": "master",
                  "buildSHA": "latest",
                  "buildId": "premium-guide-6393"
                }
              },
              "jobId": "example-job"
            }
          }
        ]
      }
    }
  },
  "apiVersion": "string",
  "spec": {}
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

payload = "{\"triggers\":[{\"vcsService\":\"github\",\"accountLogin\":\"github-user\",\"repoUrl\":\"https://github.com/northflank-examples/remix-postgres-redis-demo\",\"pathIgnoreRules\":[\"README.md\"],\"ciIgnoreFlags\":[\"[skip ci]\",\"[ci skip]\",\"[no ci]\",\"[skip nf]\",\"[nf skip]\",\"[northflank skip]\",\"[skip northflank]\"]}],\"options\":{\"concurrencyPolicy\":\"allow\",\"paused\":false},\"gitops\":{\"vcsService\":\"github\",\"accountLogin\":\"github-user\",\"repoUrl\":\"https://github.com/northflank-examples/remix-postgres-redis-demo\",\"branch\":\"main\",\"filePath\":\"/Dockerfile\"},\"richInputs\":[{\"kind\":\"BranchCommitSelector\",\"spec\":{\"required\":false,\"inputs\":{\"source\":\"build-service\"},\"outputs\":{\"branch\":\"TARGET_BRANCH\",\"buildSha\":\"TARGET_COMMIT\"},\"title\":\"string\"}}],\"teardownSpec\":{\"spec\":{\"kind\":\"Workflow\",\"spec\":{\"type\":\"sequential\",\"steps\":[{\"kind\":\"JobRun\",\"spec\":{\"projectId\":\"example-project\",\"runtimeFiles\":{\"/dir/fileName\":{\"data\":\"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=\",\"encoding\":\"utf-8\"}},\"billing\":{\"deploymentPlan\":\"nf-compute-20\"},\"deployment\":{\"docker\":{\"configType\":\"default\"},\"storage\":{\"ephemeralStorage\":{\"storageSize\":1024}},\"internal\":{\"id\":\"example-build-service\",\"branch\":\"master\",\"buildSHA\":\"latest\",\"buildId\":\"premium-guide-6393\"}},\"jobId\":\"example-job\"}}]}}},\"apiVersion\":\"string\",\"spec\":{}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

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

  var jsonStr = []byte("{\"triggers\":[{\"vcsService\":\"github\",\"accountLogin\":\"github-user\",\"repoUrl\":\"https://github.com/northflank-examples/remix-postgres-redis-demo\",\"pathIgnoreRules\":[\"README.md\"],\"ciIgnoreFlags\":[\"[skip ci]\",\"[ci skip]\",\"[no ci]\",\"[skip nf]\",\"[nf skip]\",\"[northflank skip]\",\"[skip northflank]\"]}],\"options\":{\"concurrencyPolicy\":\"allow\",\"paused\":false},\"gitops\":{\"vcsService\":\"github\",\"accountLogin\":\"github-user\",\"repoUrl\":\"https://github.com/northflank-examples/remix-postgres-redis-demo\",\"branch\":\"main\",\"filePath\":\"/Dockerfile\"},\"richInputs\":[{\"kind\":\"BranchCommitSelector\",\"spec\":{\"required\":false,\"inputs\":{\"source\":\"build-service\"},\"outputs\":{\"branch\":\"TARGET_BRANCH\",\"buildSha\":\"TARGET_COMMIT\"},\"title\":\"string\"}}],\"teardownSpec\":{\"spec\":{\"kind\":\"Workflow\",\"spec\":{\"type\":\"sequential\",\"steps\":[{\"kind\":\"JobRun\",\"spec\":{\"projectId\":\"example-project\",\"runtimeFiles\":{\"/dir/fileName\":{\"data\":\"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=\",\"encoding\":\"utf-8\"}},\"billing\":{\"deploymentPlan\":\"nf-compute-20\"},\"deployment\":{\"docker\":{\"configType\":\"default\"},\"storage\":{\"ephemeralStorage\":{\"storageSize\":1024}},\"internal\":{\"id\":\"example-build-service\",\"branch\":\"master\",\"buildSHA\":\"latest\",\"buildId\":\"premium-guide-6393\"}},\"jobId\":\"example-job\"}}]}}},\"apiVersion\":\"string\",\"spec\":{}}")
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
        "[skip ci]",
        "[ci skip]",
        "[no ci]",
        "[skip nf]",
        "[nf skip]",
        "[northflank skip]",
        "[skip northflank]"
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
        },
        "title": "string"
      }
    }
  ],
  "teardownSpec": {
    "spec": {
      "kind": "Workflow",
      "spec": {
        "type": "sequential",
        "steps": [
          {
            "kind": "JobRun",
            "spec": {
              "projectId": "example-project",
              "runtimeFiles": {
                "/dir/fileName": {
                  "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
                  "encoding": "utf-8"
                }
              },
              "billing": {
                "deploymentPlan": "nf-compute-20"
              },
              "deployment": {
                "docker": {
                  "configType": "default"
                },
                "storage": {
                  "ephemeralStorage": {
                    "storageSize": 1024
                  }
                },
                "internal": {
                  "id": "example-build-service",
                  "branch": "master",
                  "buildSHA": "latest",
                  "buildId": "premium-guide-6393"
                }
              },
              "jobId": "example-job"
            }
          }
        ]
      }
    }
  },
  "apiVersion": "string",
  "spec": {}
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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
          "[skip ci]",
          "[ci skip]",
          "[no ci]",
          "[skip nf]",
          "[nf skip]",
          "[northflank skip]",
          "[skip northflank]"
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
          },
          "title": "string"
        }
      }
    ],
    "teardownSpec": {
      "spec": {
        "kind": "Workflow",
        "spec": {
          "type": "sequential",
          "steps": [
            {
              "kind": "JobRun",
              "spec": {
                "projectId": "example-project",
                "runtimeFiles": {
                  "/dir/fileName": {
                    "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
                    "encoding": "utf-8"
                  }
                },
                "billing": {
                  "deploymentPlan": "nf-compute-20"
                },
                "deployment": {
                  "docker": {
                    "configType": "default"
                  },
                  "storage": {
                    "ephemeralStorage": {
                      "storageSize": 1024
                    }
                  },
                  "internal": {
                    "id": "example-build-service",
                    "branch": "master",
                    "buildSHA": "latest",
                    "buildId": "premium-guide-6393"
                  }
                },
                "jobId": "example-job"
              }
            }
          ]
        }
      }
    },
    "apiVersion": "string",
    "spec": {}
  }
});
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.release_flow(
    pipeline_id="example-pipeline",
    project_id="default-project",
    stage="development",
    data={
        "triggers": [{
            "vcsService": "github",
            "accountLogin": "github-user",
            "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
            "pathIgnoreRules": ["README.md"],
            "ciIgnoreFlags": ["[skip ci]", "[ci skip]", "[no ci]", "[skip nf]", "[nf skip]", "[northflank skip]", "[skip northflank]"],
        }],
        "options": {
            "concurrencyPolicy": "allow",
            "paused": False,
        },
        "gitops": {
            "vcsService": "github",
            "accountLogin": "github-user",
            "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
            "branch": "main",
            "filePath": "/Dockerfile",
        },
        "richInputs": [{
            "kind": "BranchCommitSelector",
            "spec": {
                "required": False,
                "inputs": {
                    "source": "build-service",
                },
                "outputs": {
                    "branch": "TARGET_BRANCH",
                    "buildSha": "TARGET_COMMIT",
                },
                "title": "string",
            },
        }],
        "teardownSpec": {
            "spec": {
                "kind": "Workflow",
                "spec": {
                    "type": "sequential",
                    "steps": [{
                        "kind": "JobRun",
                        "spec": {
                            "projectId": "example-project",
                            "runtimeFiles": {
                                "/dir/fileName": {
                                    "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
                                    "encoding": "utf-8",
                                },
                            },
                            "billing": {
                                "deploymentPlan": "nf-compute-20",
                            },
                            "deployment": {
                                "docker": {
                                    "configType": "default",
                                },
                                "storage": {
                                    "ephemeralStorage": {
                                        "storageSize": 1024,
                                    },
                                },
                                "internal": {
                                    "id": "example-build-service",
                                    "branch": "master",
                                    "buildSHA": "latest",
                                    "buildId": "premium-guide-6393",
                                },
                            },
                            "jobId": "example-job",
                        },
                    }],
                },
            },
        },
        "apiVersion": "string",
        "spec": {},
    },
)
print(response.data)
```
