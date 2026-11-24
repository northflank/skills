# Run template

Source: https://northflank.com/docs/v1/api/team/templates/run-template.md

Run a template

Required permission: Account > Templates > General > Run

**Path parameters:**

{object}
- `templateId`: (string) (required) ID of the template

**Request body:**

{object}
- `arguments`: {object} A set of arguments that can be referenced in a template using '${args.argumentName}'.

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `name`: (string) Optional name of the run.
  - `description`: (string) Optional description of the run.
  - `apiVersion`: (string) Template API version.
  - `spec`: (multiple options) {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Workflow)
     - `spec`: {object} (required)
       - `type`: (string) (required) (enum: parallel, sequential)
       - `steps`: [array of] (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: LoopWorkflow)
     - `spec`: {object} (required)
       - `steps`: [array of] (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Approval)
     - `spec`: {object} (required)
       - `amount`: (integer)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: [array of] {object}
           - `user`: (string) (required) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Service)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: restart)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `serviceId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Addon)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: restart)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `addonId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: AddonBackup)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: restore)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `addonId`: (string)
         - `backupId`: (string)
         - `restoreId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Domain)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: verify)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `domain`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: VCS)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: createRepoFromSource)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `trackerId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Service)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: execute)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Job)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: execute)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: CustomPlan, Subdomain, SubdomainPath, ResourceTag, BYOCIntegration, RolloutStrategy, BYOCCluster, BYOCRegistry, CustomDockerCredentials, Project, CombinedService, DeploymentService, PreviewDeploymentService, Harness, LLMModelDeployment, CronJob, ManualJob, Job, Addon, SecretGroup, SSHIdentity, Pipeline, Volume, ReleaseRollback, EgressIp, LoadBalancer, NetworkPolicy, WorkflowTemplate, PreviewBlueprint, ReleaseStage)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Domain)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `name`: (string)
         - `hostname`: (string)
         - `status`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: BuildService)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `name`: (string)
         - `image`: {object}
           - `projectId`: (string)
           - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: ExternalAddon, Condition, ReleaseFlowRollback, Template, Message, LoopData, SecretInheritance, OpenTofu, OpenTofuDestroy, WorkflowRollback, RunTemplate)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: AddonBackup)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `name`: (string)
         - `addonId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: AddonImport)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: WorkloadIdentity)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: (multiple options) {object}
           - `id`: (string)
           - `name`: (string) | [array of] {object}
             - `id`: (string)
             - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Build, BuildSource)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `status`: (string)
         - `nfObjectId`: (string)
         - `nfObjectType`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: ContainerScan)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: (multiple options) {object}
           - `id`: (string)
           - `status`: (string) | [array of] {object}
             - `id`: (string)
             - `status`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: JobRun)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `jobId`: (string)
         - `runName`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Release)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
  - `project`: {object}
    - `ref`: (string)
    - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
    - `detailsHidden`: (boolean) (required)
    - `kind`: (string) (required)
    - `spec`: {object} (required)
    - `response`: {object}
      - `status`: (string)
      - `startTime`: (number) (format: float)
      - `endTime`: (number) (format: float)
      - `duration`: (number) (format: float)
      - `attempts`: (number) (format: float)
      - `data`: {object}
        - `id`: (string)
        - `name`: (string)
        - `_id`: (string)
    - `_id`: (string)
    - `id`: (string)
    - `internalId`: (string)
    - `type`: (string)
    - `name`: (string)
    - `pipelineId`: (string)
  - `templateId`: (string) Identifier of the template, when available.
  - `environmentId`: (string) Identifier of the preview environment, when available.
  - `status`: (string) (required) Status of the template run (enum: pending, running, success, failure, aborted, aborting, queued, unknown, skipped, waiting, retrying, async_wait, approval_wait)
  - `concluded`: (boolean) (required) Whether execution has concluded.
  - `startedAt`: (string) When execution started. (format: date-time)
  - `concludedAt`: (string) When execution concluded. (format: date-time)
  - `createdAt`: (string) (required) When the run was created. (format: date-time)
  - `updatedAt`: (string) (required) When the run was last updated. (format: date-time)
  - `detailsHidden`: (boolean) (required) Run details include available public results. Sensitive inputs and results are omitted.
  - `_id`: (string)
  - `internalId`: (string)
  - `entityId`: (string)
  - `entityType`: (string)
  - `projectId`: (string)
  - `pipelineId`: (string)
  - `userId`: (string)
  - `environmentName`: (string)
  - `expiresAt`: (string) (format: date-time)
  - `deleted`: (boolean)
  - `phase`: (string)
  - `templateVersionSha`: (string)
  - `commitSHA`: (string)
  - `hasDiff`: (boolean)
  - `content`: {object}
    - `name`: (string)
    - `description`: (string)
    - `apiVersion`: (string)
    - `spec`: (multiple options) {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Workflow)
     - `spec`: {object} (required)
       - `type`: (string) (required) (enum: parallel, sequential)
       - `steps`: [array of] (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: LoopWorkflow)
     - `spec`: {object} (required)
       - `steps`: [array of] (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Approval)
     - `spec`: {object} (required)
       - `amount`: (integer)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: [array of] {object}
           - `user`: (string) (required) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Service)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: restart)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `serviceId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Addon)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: restart)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `addonId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: AddonBackup)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: restore)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `addonId`: (string)
         - `backupId`: (string)
         - `restoreId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Domain)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: verify)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `domain`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: VCS)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: createRepoFromSource)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `trackerId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Service)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: execute)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
       - `kind`: (string) (required) (enum: Job)
       - `spec`: {object} (required)
         - `type`: (string) (required) (enum: execute)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Action)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: CustomPlan, Subdomain, SubdomainPath, ResourceTag, BYOCIntegration, RolloutStrategy, BYOCCluster, BYOCRegistry, CustomDockerCredentials, Project, CombinedService, DeploymentService, PreviewDeploymentService, Harness, LLMModelDeployment, CronJob, ManualJob, Job, Addon, SecretGroup, SSHIdentity, Pipeline, Volume, ReleaseRollback, EgressIp, LoadBalancer, NetworkPolicy, WorkflowTemplate, PreviewBlueprint, ReleaseStage)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Domain)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `name`: (string)
         - `hostname`: (string)
         - `status`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: BuildService)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `name`: (string)
         - `image`: {object}
           - `projectId`: (string)
           - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: ExternalAddon, Condition, ReleaseFlowRollback, Template, Message, LoopData, SecretInheritance, OpenTofu, OpenTofuDestroy, WorkflowRollback, RunTemplate)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: AddonBackup)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `name`: (string)
         - `addonId`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: AddonImport)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: WorkloadIdentity)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: (multiple options) {object}
           - `id`: (string)
           - `name`: (string) | [array of] {object}
             - `id`: (string)
             - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Build, BuildSource)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `status`: (string)
         - `nfObjectId`: (string)
         - `nfObjectType`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: ContainerScan)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: (multiple options) {object}
           - `id`: (string)
           - `status`: (string) | [array of] {object}
             - `id`: (string)
             - `status`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: JobRun)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `id`: (string)
         - `jobId`: (string)
         - `runName`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required) (enum: Release)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
       - `data`: {object}
         - `name`: (string) | {object}
     - `ref`: (string)
     - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
     - `detailsHidden`: (boolean) (required)
     - `kind`: (string) (required)
     - `spec`: {object} (required)
     - `response`: {object}
       - `status`: (string)
       - `startTime`: (number) (format: float)
       - `endTime`: (number) (format: float)
       - `duration`: (number) (format: float)
       - `attempts`: (number) (format: float)
    - `project`: {object}
      - `ref`: (string)
      - `skipNodeExecution`: (multiple options) (boolean) | (string) (enum: true, false)
      - `detailsHidden`: (boolean) (required)
      - `kind`: (string) (required)
      - `spec`: {object} (required)
      - `response`: {object}
        - `status`: (string)
        - `startTime`: (number) (format: float)
        - `endTime`: (number) (format: float)
        - `duration`: (number) (format: float)
        - `attempts`: (number) (format: float)
        - `data`: {object}
          - `id`: (string)
          - `name`: (string)
          - `_id`: (string)
      - `_id`: (string)
      - `id`: (string)
      - `internalId`: (string)
      - `type`: (string)
      - `name`: (string)
      - `pipelineId`: (string)
  - `template`: {object}
    - `_id`: (string)
    - `id`: (string)
    - `internalId`: (string)
    - `type`: (string)
    - `name`: (string)
    - `pipelineId`: (string)
  - `pipeline`: {object}
    - `_id`: (string)
    - `id`: (string)
    - `internalId`: (string)
    - `type`: (string)
    - `name`: (string)
    - `pipelineId`: (string)
    - `stage`: (string)
  - `run`: {object}
    - `_id`: (string)
    - `id`: (string)
    - `internalId`: (string)
    - `type`: (string)
    - `name`: (string)
    - `pipelineId`: (string)
  - `auditLog`: {object}
    - `_id`: (string)
  - `runContext`: {object}
    - `origin`: (string)
    - `userId`: (string)
    - `user`: {object}
      - `_id`: (string)
    - `sha`: (string)
    - `branch`: (string)
    - `pullRequestId`: (multiple options) (string) | (integer)
    - `matchedFile`: (string)
    - `trigger`: {object}
      - `globalSecretInternalId`: (string)
  - `pendingApprovals`: [array of] {object}
     - `nodePath`: (string) (required)
     - `user`: (string) (required)
  - `id`: (string) (required) Identifier of the run.

### API reference

POST /v1/templates/{templateId}/runs

POST /v1/teams/{teamId}/templates/{templateId}/runs

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{}' \
  "https://api.northflank.com/v1/templates/{templateId}/runs"
```

```javascript
const payload = {}

const response = await fetch('https://api.northflank.com/v1/templates/{templateId}/runs', {
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

url = "https://api.northflank.com/v1/templates/{templateId}/runs"

payload = "{}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/templates/{templateId}/runs"

  var jsonStr = []byte("{}")
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

200 OK: Details about the newly create template run.

```json
{
  "data": {
    "name": "Production deployment",
    "description": "Deploy the latest release.",
    "status": "success",
    "concluded": true,
    "startedAt": "2026-01-01T12:00:00.000Z",
    "concludedAt": "2026-01-01T12:01:00.000Z",
    "createdAt": "2026-01-01T12:00:00.000Z",
    "updatedAt": "2026-01-01T12:01:00.000Z",
    "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
    "detailsHidden": false
  }
}
```

### CLI reference

$ northflank run template

Options:

- `--templateId <templateId>`: ID of the template

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{}
```

#### Example Response

 Details about the newly create template run.

```json
{
  "name": "Production deployment",
  "description": "Deploy the latest release.",
  "status": "success",
  "concluded": true,
  "startedAt": "2026-01-01T12:00:00.000Z",
  "concludedAt": "2026-01-01T12:01:00.000Z",
  "createdAt": "2026-01-01T12:00:00.000Z",
  "updatedAt": "2026-01-01T12:01:00.000Z",
  "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
  "detailsHidden": false
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.run.template({
  parameters: {
    "templateId": "example-template"
  },
  data: {}
});
```

#### Example Response

 Details about the newly create template run.

```json
{
  "data": {
    "name": "Production deployment",
    "description": "Deploy the latest release.",
    "status": "success",
    "concluded": true,
    "startedAt": "2026-01-01T12:00:00.000Z",
    "concludedAt": "2026-01-01T12:01:00.000Z",
    "createdAt": "2026-01-01T12:00:00.000Z",
    "updatedAt": "2026-01-01T12:01:00.000Z",
    "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
    "detailsHidden": false
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

response = client.run.template(
    template_id="example-template",
    data={},
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "name": "Production deployment",
  "description": "Deploy the latest release.",
  "status": "success",
  "concluded": true,
  "startedAt": "2026-01-01T12:00:00.000Z",
  "concludedAt": "2026-01-01T12:01:00.000Z",
  "createdAt": "2026-01-01T12:00:00.000Z",
  "updatedAt": "2026-01-01T12:01:00.000Z",
  "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
  "detailsHidden": false
}
```
