# Create combined service

Source: https://northflank.com/docs/v1/api/project/services/create-combined-service.md

Creates a new combined service.

Required permission: Project > Services > General > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `name`: (string) (required) The name of the service. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54)
- `description`: (string) A description of the service. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `billing`: {object}
  - `deploymentPlan`: (string) (required) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `buildPlan`: (string) The ID of the build plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `gpu`: {object}
    - `enabled`: (boolean)
    - `configuration`: {object}
      - `gpuType`: (string) (required)
      - `gpuCount`: (integer)
      - `timesliced`: (boolean)
- `infrastructure`: {object}
  - `architecture`: (string) (enum: x86, arm)
- `deployment`: {object}
  - `type`: (string) The way the service should be deployed. Either as a deployment (default), or as a stateful set. (enum: deployment, statefulSet)
  - `instances`: (integer) (required) The number of instances to run the service on.
  - `buildpack`: {object}
    - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
    - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
    - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
    - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
  - `docker`: {object}
    - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
    - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
    - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
  - `storage`: {object}
    - `useHdbStorage`: (boolean)
    - `usePdSsdStorage`: (boolean)
    - `ephemeralStorage`: {object}
      - `storageSize`: (integer) Ephemeral storage per container in MB
    - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
  - `strategy`: {object}
    - `type`: (string) Configures the instance roll out strategy of your service. Currently only available via feature flag. (enum: recreate, rollout-steady, rollout-balanced, rollout-fast, custom)
    - `settings`: {object}
      - `maxSurge`: (multiple options) (integer) A non-negative integer. | (string) A percentage string in the range 0% to 100%, e.g. `25%` (pattern: ^\d+%$)
      - `maxUnavailable`: (multiple options) (integer) A non-negative integer. | (string) A percentage string in the range 0% to 100%, e.g. `25%` (pattern: ^\d+%$)
  - `zonalRedundancy`: {object}
    - `type`: (string) Defines scheduling behaviour across different zones within the same region. (enum: disabled, preferred, required)
    - `minZones`: (integer) Defines how many zones are required and will prevent containers from additional scheduling into existing zones. (Only relevant if type is set to "required")
  - `gpu`: {object}
    - `enabled`: (boolean)
    - `configuration`: {object}
      - `gpuType`: (string) (required)
      - `gpuCount`: (integer)
      - `timesliced`: (boolean)
  - `gracePeriodSeconds`: (integer) The maximum amount of time the process has to shut down after receiving a SIGTERM signal before it is forcefully shut down SIGKILL by the system.
  - `gradualRolloutStrategyId`: (string) The id of the strategy to be attached to service. (pattern: ^[A-Za-z0-9-]+$)
  - `ssh`: {object}
    - `enabled`: (boolean) (required) Enables SSH access if the resource matches an SSH identity selector.
  - `metadata`: {object}
    - `labels`: {object}
    - `annotations`: {object}
- `ports`: [array of] {object}
   - `name`: (string) (required) The name used to identify the port. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 1) (max length: 8)
   - `internalPort`: (integer) (required) The port number.
   - `public`: (boolean) If true, the port will be exposed publicly.
   - `security`: {object}
     - `credentials`: [array of] {object}
         - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
         - `password`: (string) (required) The password to access the service with this username.
         - `type`: (string) (required) The type of authentication used (enum: basic-auth)
     - `ip`: [array of] {object}
         - `addresses`: [array of] (string) An IP address used by this rule
         - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
     - `policies`: [array of] {object}
         - `addresses`: [array of] (string) An IP address used by this rule
         - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
     - `sso`: {object}
       - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
       - `directoryGroupIds`: [array of] (string)
       - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
       - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
       - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
       - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
     - `headers`: [array of] (multiple options) {object}
           - `regexMode`: (boolean)
           - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
           - `value`: (string) (required) | {object}
           - `regexMode`: (boolean)
           - `name`: (string) (required)
           - `value`: (string) (required)
     - `verificationMode`: (string) Mode used to verify multiple security features like ip policies and SSO authentication (enum: or, and)
     - `securePathConfiguration`: {object}
       - `enabled`: (boolean) Enable security policies on a path-level style
       - `skipSecurityPoliciesForInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip all security policies
       - `rules`: [array of] {object}
           - `paths`: [array of] (multiple options) {object}
                 - `path`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
                 - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix)
                 - `priority`: (integer) (required) | {object}
                 - `path`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
                 - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: exact)
                 - `priority`: (integer) (required) | {object}
                 - `path`: (string) (required)
                 - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: regex)
                 - `priority`: (integer) (required)
           - `accessMode`: (string) (required) Specify the way the path rule will behave when processing policies. This enables an allow-list/deny-list approach for access control on each path (enum: protected, unprotected)
           - `securityPolicies`: {object}
             - `orPolicies`: {object}
               - `credentials`: [array of] {object}
                   - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
                   - `password`: (string) (required) The password to access the service with this username.
                   - `type`: (string) (required) The type of authentication used (enum: basic-auth)
               - `ip`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `policies`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `sso`: {object}
                 - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
                 - `directoryGroupIds`: [array of] (string)
                 - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
                 - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
                 - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
                 - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
               - `headers`: [array of] (multiple options) {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
                     - `value`: (string) (required) | {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required)
                     - `value`: (string) (required)
             - `requiredPolicies`: {object}
               - `credentials`: [array of] {object}
                   - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
                   - `password`: (string) (required) The password to access the service with this username.
                   - `type`: (string) (required) The type of authentication used (enum: basic-auth)
               - `ip`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `policies`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `sso`: {object}
                 - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
                 - `directoryGroupIds`: [array of] (string)
                 - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
                 - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
                 - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
                 - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
               - `headers`: [array of] (multiple options) {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
                     - `value`: (string) (required) | {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required)
                     - `value`: (string) (required)
   - `domains`: [array of] (string) A domain to redirect to this port.
   - `disableNfDomain`: (boolean) Disable routing on the default code.run domain for public HTTP ports with custom domains.
   - `advancedOptions`: {object}
     - `enableTlsPassthrough`: (boolean) Whether this port should use pass through mode for TLS
   - `protocol`: (string) (required) The protocol to use for the port. (enum: HTTP, HTTP/2, TCP, UDP)
- `disabledCI`: (boolean) Whether CI (continuous integration) should be disabled.
- `buildSource`: (string) Defines the build source for this resource (enum: git, bundle)
- `vcsData`: {object}
  - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
  - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
  - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
  - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
  - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
  - `projectBranch`: (string) (required) The name of the branch to use.
- `bundleData`: {object}
  - `bundleUrl`: (string) (required) URL of the bundle to be built
  - `branch`: (string) (required) Branch identifier for the bundle. (pattern: ^[A-Za-z0-9-]+$)
- `buildSettings`: (multiple options) {object}
   - `storage`: {object}
     - `ephemeralStorage`: {object}
       - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
   - `dockerfile`: {object}
     - `useCache`: (boolean) DEPRECATED: This field will be removed in the near future and currently has no effect.
     - `buildEngine`: (string) Build engine to use. Defaults to recommended build engine `buildkit` (enum: buildkit, kaniko)
     - `dockerFilePath`: (string) (required) The file path of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
     - `dockerWorkDir`: (string) (required) The working directory of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
     - `buildkit`: {object}
       - `useCache`: (boolean) Use persistent storage to cache build layers.
       - `cacheStorageSize`: (integer) The amount of persistent storage available to each build in MB.
       - `useInternalCache`: (boolean) DEPRECATED: This field will be removed in the near future.
       - `internalCacheStorage`: (number) DEPRECATED: This field will be removed in the near future. (format: float) | {object}
   - `storage`: {object}
     - `ephemeralStorage`: {object}
       - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
   - `buildpack`: {object}
     - `builder`: (string) Buildpack stack to use. Defaults to recommended stack `HEROKU_24`. (enum: HEROKU_24, HEROKU_22, HEROKU_22_CLASSIC, HEROKU_20, HEROKU_18, GOOGLE_22, GOOGLE_V1, CNB_ALPINE, CNB_BIONIC, PAKETO_JAMMY_TINY, PAKETO_JAMMY_BASE, PAKETO_JAMMY_FULL, PAKETO_TINY, PAKETO_BASE, PAKETO_FULL)
     - `buildpackLocators`: [array of] (string) Url or registry identifier of custom Buildpack.
     - `buildContext`: (string) The working directory to build in. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
     - `useCache`: (boolean) Should build dependencies be cached?
- `buildConfiguration`: {object}
  - `pathIgnoreRules`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
  - `isAllowList`: (boolean) If `true`, the functionality of `pathIgnoreRules` will be inverted. A commit will only be built if a file has been changed that matches one or more of the rules in `pathIgnoreRules`.
  - `ciIgnoreFlagsEnabled`: (boolean) If `true`, enables commit ignore flags. If a commit message contains one or more of the flags in `ciIgnoreFlags`, that commit will not be built.
  - `ciIgnoreFlags`: [array of] (string) A commit ignore flag. (max length: 72)
  - `dockerfileTarget`: (string) If your Dockerfile contains multiple build stages, you can specify the target stage by entering its name here.
  - `dockerCredentials`: [array of] (string) The ID of the docker credentials to use. (pattern: ^[A-Za-z0-9-]+$)
  - `includeGitFolder`: (boolean) Include .git folder inside the build context
  - `fullGitClone`: (boolean) Include the entire git history as part of the .git folder. Only relevant if "includeGitFolder" is set.
  - `enableGitLfs`: (boolean) Enable Git LFS support for the build
  - `storage`: {object}
    - `ephemeralStorage`: {object}
      - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
- `runtimeEnvironment`: {object}
- `runtimeFiles`: {object}
- `buildArguments`: {object}
- `buildFiles`: {object}
- `dockerSecretMounts`: {object}
- `healthChecks`: [array of] {object}
   - `protocol`: (string) (required) The protocol to access the health check with. (enum: HTTP, CMD, TCP)
   - `type`: (string) (required) The type of health check. (enum: livenessProbe, readinessProbe, startupProbe)
   - `path`: (string) The path of the health check endpoint. Required when protocol is HTTP. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*((\?([a-zA-Z0-9-._]+(=[a-zA-Z0-9-._]+)?)*)(&([a-zA-Z0-9-._]+(=[a-zA-Z0-9-._]+)?)*)*)?$)
   - `cmd`: (string) The command to run for the health check. Required when protocol is CMD
   - `port`: (integer) Port number for the health check endpoint. Required when protocol is HTTP.
   - `initialDelaySeconds`: (integer) (required) Initial delay, in seconds, before the health check is first run.
   - `periodSeconds`: (integer) (required) The time between each check, in seconds.
   - `timeoutSeconds`: (integer) (required) The time to wait for a response before marking the health check as a failure.
   - `failureThreshold`: (integer) (required) The maximum number of allowed failures.
   - `successThreshold`: (integer) The number of successes required to mark the health check as a success.
- `loadBalancing`: {object}
  - `mode`: (string) (required) (enum: leastConnection, consistentHash, roundRobin, consistentReplicaRouting)
  - `consistentHash`: {object}
    - `mode`: (string) (required) (enum: ip, customHeader)
    - `header`: (string)
  - `consistentReplicaRouting`: {object}
    - `mode`: (string) (required) (enum: path, header)
- `autoscaling`: {object}
  - `horizontal`: {object}
    - `enabled`: (boolean) (required) Whether horizontal autoscaling should be enabled
    - `minReplicas`: (number) (required) Minimum number of replicas which should be running at any time (format: float)
    - `maxReplicas`: (number) (required) Maximum number of replicas which can be running at any time (format: float)
    - `cpu`: {object}
      - `enabled`: (boolean) (required) Whether autoscaling should take into account cpu usage
      - `thresholdPercentage`: (integer) (required) Threshold CPU usage percentage at which the workload will be scaled
    - `memory`: {object}
      - `enabled`: (boolean) (required) Whether autoscaling should take into account memory usage
      - `thresholdPercentage`: (integer) (required) Threshold memory usage percentage at which the workload will be scaled
    - `rps`: {object}
      - `enabled`: (boolean) (required) Whether autoscaling should take into requests-per-second
      - `thresholdValue`: (integer) (required) Threshold rps value on which the workload will be scaled
    - `userMetrics`: {object}
      - `enabled`: (boolean) (required) Whether to enable handling for custom metrics in the autoscaling configuration
      - `exposedMetricsPath`: (string) (required) Path on which the metrics will be exposed by the service.. (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
      - `exposedMetricsPort`: (integer) (required) Port on which the metrics will be exposed by the service.
      - `metrics`: [array of] {object}
          - `metricName`: (string) (required) Name of the custom metric (pattern: [a-zA-Z_:][a-zA-Z0-9_:]*$)
          - `metricType`: (string) (required) Type of metric exposed, this will affect how it'll be queried by the autoscaler component: Gauge will be used as is, Counter will be used with rate() (enum: gauge, counter)
          - `thresholdValue`: (number) (required) Threshold value on which the workload will be scaled. Represents the average value across all running pods. (format: float)
- `createOptions`: {object}
  - `volumesToAttach`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the service. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54)
  - `description`: (string) A description of the service. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `billing`: {object}
    - `deploymentPlan`: (string) (required) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `buildPlan`: (string) The ID of the build plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `gpu`: {object}
      - `enabled`: (boolean)
      - `configuration`: {object}
        - `gpuType`: (string) (required)
        - `gpuCount`: (integer)
        - `timesliced`: (boolean)
  - `infrastructure`: {object}
    - `architecture`: (string) (enum: x86, arm)
  - `ports`: [array of] {object}
     - `name`: (string) (required) The name used to identify the port. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 1) (max length: 8)
     - `internalPort`: (integer) (required) The port number.
     - `public`: (boolean) If true, the port will be exposed publicly.
     - `security`: {object}
       - `credentials`: [array of] {object}
           - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
           - `password`: (string) (required) The password to access the service with this username.
           - `type`: (string) (required) The type of authentication used (enum: basic-auth)
       - `ip`: [array of] {object}
           - `addresses`: [array of] (string) An IP address used by this rule
           - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
       - `policies`: [array of] {object}
           - `addresses`: [array of] (string) An IP address used by this rule
           - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
       - `sso`: {object}
         - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
         - `directoryGroupIds`: [array of] (string)
         - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
         - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
         - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
         - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
       - `headers`: [array of] (multiple options) {object}
             - `regexMode`: (boolean)
             - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
             - `value`: (string) (required) | {object}
             - `regexMode`: (boolean)
             - `name`: (string) (required)
             - `value`: (string) (required)
       - `verificationMode`: (string) Mode used to verify multiple security features like ip policies and SSO authentication (enum: or, and)
       - `securePathConfiguration`: {object}
         - `enabled`: (boolean) Enable security policies on a path-level style
         - `skipSecurityPoliciesForInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip all security policies
         - `rules`: [array of] {object}
             - `paths`: [array of] (multiple options) {object}
                   - `path`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
                   - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix)
                   - `priority`: (integer) (required) | {object}
                   - `path`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
                   - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: exact)
                   - `priority`: (integer) (required) | {object}
                   - `path`: (string) (required)
                   - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: regex)
                   - `priority`: (integer) (required)
             - `accessMode`: (string) (required) Specify the way the path rule will behave when processing policies. This enables an allow-list/deny-list approach for access control on each path (enum: protected, unprotected)
             - `securityPolicies`: {object}
               - `orPolicies`: {object}
                 - `credentials`: [array of] {object}
                     - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
                     - `password`: (string) (required) The password to access the service with this username.
                     - `type`: (string) (required) The type of authentication used (enum: basic-auth)
                 - `ip`: [array of] {object}
                     - `addresses`: [array of] (string) An IP address used by this rule
                     - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
                 - `policies`: [array of] {object}
                     - `addresses`: [array of] (string) An IP address used by this rule
                     - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
                 - `sso`: {object}
                   - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
                   - `directoryGroupIds`: [array of] (string)
                   - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
                   - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
                   - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
                   - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
                 - `headers`: [array of] (multiple options) {object}
                       - `regexMode`: (boolean)
                       - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
                       - `value`: (string) (required) | {object}
                       - `regexMode`: (boolean)
                       - `name`: (string) (required)
                       - `value`: (string) (required)
               - `requiredPolicies`: {object}
                 - `credentials`: [array of] {object}
                     - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
                     - `password`: (string) (required) The password to access the service with this username.
                     - `type`: (string) (required) The type of authentication used (enum: basic-auth)
                 - `ip`: [array of] {object}
                     - `addresses`: [array of] (string) An IP address used by this rule
                     - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
                 - `policies`: [array of] {object}
                     - `addresses`: [array of] (string) An IP address used by this rule
                     - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
                 - `sso`: {object}
                   - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
                   - `directoryGroupIds`: [array of] (string)
                   - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
                   - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
                   - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
                   - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
                 - `headers`: [array of] (multiple options) {object}
                       - `regexMode`: (boolean)
                       - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
                       - `value`: (string) (required) | {object}
                       - `regexMode`: (boolean)
                       - `name`: (string) (required)
                       - `value`: (string) (required)
     - `domains`: [array of] (string) A domain to redirect to this port.
     - `disableNfDomain`: (boolean) Disable routing on the default code.run domain for public HTTP ports with custom domains.
     - `advancedOptions`: {object}
       - `enableTlsPassthrough`: (boolean) Whether this port should use pass through mode for TLS
     - `protocol`: (multiple options) (string) (enum: HTTP, HTTP/2) | (string) (enum: HTTP, HTTP/2, TCP, UDP)
  - `disabledCI`: (boolean) Whether CI (continuous integration) should be disabled.
  - `buildSource`: (string) Defines the build source for this resource (enum: git, bundle)
  - `vcsData`: {object}
    - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
    - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
    - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
    - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
    - `projectBranch`: (string) (required) The name of the branch to use.
  - `bundleData`: {object}
    - `bundleUrl`: (string) (required) URL of the bundle to be built
    - `branch`: (string) (required) Branch identifier for the bundle. (pattern: ^[A-Za-z0-9-]+$)
  - `buildSettings`: (multiple options) {object}
     - `storage`: {object}
       - `ephemeralStorage`: {object}
         - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
     - `dockerfile`: {object}
       - `useCache`: (boolean) DEPRECATED: This field will be removed in the near future and currently has no effect.
       - `buildEngine`: (string) Build engine to use. Defaults to recommended build engine `buildkit` (enum: buildkit, kaniko)
       - `dockerFilePath`: (string) (required) The file path of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
       - `dockerWorkDir`: (string) (required) The working directory of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
       - `buildkit`: {object}
         - `useCache`: (boolean) Use persistent storage to cache build layers.
         - `cacheStorageSize`: (integer) The amount of persistent storage available to each build in MB.
         - `useInternalCache`: (boolean) DEPRECATED: This field will be removed in the near future.
         - `internalCacheStorage`: (number) DEPRECATED: This field will be removed in the near future. (format: float) | {object}
     - `storage`: {object}
       - `ephemeralStorage`: {object}
         - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
     - `buildpack`: {object}
       - `builder`: (string) Buildpack stack to use. Defaults to recommended stack `HEROKU_24`. (enum: HEROKU_24, HEROKU_22, HEROKU_22_CLASSIC, HEROKU_20, HEROKU_18, GOOGLE_22, GOOGLE_V1, CNB_ALPINE, CNB_BIONIC, PAKETO_JAMMY_TINY, PAKETO_JAMMY_BASE, PAKETO_JAMMY_FULL, PAKETO_TINY, PAKETO_BASE, PAKETO_FULL)
       - `buildpackLocators`: [array of] (string) Url or registry identifier of custom Buildpack.
       - `buildContext`: (string) The working directory to build in. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
       - `useCache`: (boolean) Should build dependencies be cached?
  - `buildConfiguration`: {object}
    - `pathIgnoreRules`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
    - `isAllowList`: (boolean) If `true`, the functionality of `pathIgnoreRules` will be inverted. A commit will only be built if a file has been changed that matches one or more of the rules in `pathIgnoreRules`.
    - `ciIgnoreFlagsEnabled`: (boolean) If `true`, enables commit ignore flags. If a commit message contains one or more of the flags in `ciIgnoreFlags`, that commit will not be built.
    - `ciIgnoreFlags`: [array of] (string) A commit ignore flag. (max length: 72)
    - `dockerfileTarget`: (string) If your Dockerfile contains multiple build stages, you can specify the target stage by entering its name here.
    - `dockerCredentials`: [array of] (string) The ID of the docker credentials to use. (pattern: ^[A-Za-z0-9-]+$)
    - `includeGitFolder`: (boolean) Include .git folder inside the build context
    - `fullGitClone`: (boolean) Include the entire git history as part of the .git folder. Only relevant if "includeGitFolder" is set.
    - `enableGitLfs`: (boolean) Enable Git LFS support for the build
    - `storage`: {object}
      - `ephemeralStorage`: {object}
        - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
  - `runtimeEnvironment`: {object}
  - `runtimeFiles`: {object}
  - `buildArguments`: {object}
  - `buildFiles`: {object}
  - `dockerSecretMounts`: {object}
  - `healthChecks`: [array of] {object}
     - `protocol`: (string) (required) The protocol to access the health check with. (enum: HTTP, CMD, TCP)
     - `type`: (string) (required) The type of health check. (enum: livenessProbe, readinessProbe, startupProbe)
     - `path`: (string) The path of the health check endpoint. Required when protocol is HTTP. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*((\?([a-zA-Z0-9-._]+(=[a-zA-Z0-9-._]+)?)*)(&([a-zA-Z0-9-._]+(=[a-zA-Z0-9-._]+)?)*)*)?$)
     - `cmd`: (string) The command to run for the health check. Required when protocol is CMD
     - `port`: (integer) Port number for the health check endpoint. Required when protocol is HTTP.
     - `initialDelaySeconds`: (integer) (required) Initial delay, in seconds, before the health check is first run.
     - `periodSeconds`: (integer) (required) The time between each check, in seconds.
     - `timeoutSeconds`: (integer) (required) The time to wait for a response before marking the health check as a failure.
     - `failureThreshold`: (integer) (required) The maximum number of allowed failures.
     - `successThreshold`: (integer) The number of successes required to mark the health check as a success.
  - `loadBalancing`: {object}
    - `mode`: (string) (required) (enum: leastConnection, consistentHash, roundRobin, consistentReplicaRouting)
    - `consistentHash`: {object}
      - `mode`: (string) (required) (enum: ip, customHeader)
      - `header`: (string)
    - `consistentReplicaRouting`: {object}
      - `mode`: (string) (required) (enum: path, header)
  - `autoscaling`: {object}
    - `horizontal`: {object}
      - `enabled`: (boolean) (required) Whether horizontal autoscaling should be enabled
      - `minReplicas`: (number) (required) Minimum number of replicas which should be running at any time (format: float)
      - `maxReplicas`: (number) (required) Maximum number of replicas which can be running at any time (format: float)
      - `cpu`: {object}
        - `enabled`: (boolean) (required) Whether autoscaling should take into account cpu usage
        - `thresholdPercentage`: (integer) (required) Threshold CPU usage percentage at which the workload will be scaled
      - `memory`: {object}
        - `enabled`: (boolean) (required) Whether autoscaling should take into account memory usage
        - `thresholdPercentage`: (integer) (required) Threshold memory usage percentage at which the workload will be scaled
      - `rps`: {object}
        - `enabled`: (boolean) (required) Whether autoscaling should take into requests-per-second
        - `thresholdValue`: (integer) (required) Threshold rps value on which the workload will be scaled
      - `userMetrics`: {object}
        - `enabled`: (boolean) (required) Whether to enable handling for custom metrics in the autoscaling configuration
        - `exposedMetricsPath`: (string) (required) Path on which the metrics will be exposed by the service.. (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
        - `exposedMetricsPort`: (integer) (required) Port on which the metrics will be exposed by the service.
        - `metrics`: [array of] {object}
            - `metricName`: (string) (required) Name of the custom metric (pattern: [a-zA-Z_:][a-zA-Z0-9_:]*$)
            - `metricType`: (string) (required) Type of metric exposed, this will affect how it'll be queried by the autoscaler component: Gauge will be used as is, Counter will be used with rate() (enum: gauge, counter)
            - `thresholdValue`: (number) (required) Threshold value on which the workload will be scaled. Represents the average value across all running pods. (format: float)
  - `createOptions`: {object}
    - `volumesToAttach`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `serviceType`: (string) (required) Type of the service (combined, build or deployment) (enum: combined)
  - `deployment`: {object}
    - `type`: (string) The way the service should be deployed. Either as a deployment (default), or as a stateful set. (enum: deployment, statefulSet)
    - `instances`: (integer) (required) The number of instances to run the service on.
    - `buildpack`: {object}
      - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
      - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
      - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
      - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
    - `docker`: {object}
      - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
      - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
      - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
    - `storage`: {object}
      - `useHdbStorage`: (boolean)
      - `usePdSsdStorage`: (boolean)
      - `ephemeralStorage`: {object}
        - `storageSize`: (integer) Ephemeral storage per container in MB
      - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
    - `strategy`: {object}
      - `type`: (string) Configures the instance roll out strategy of your service. Currently only available via feature flag. (enum: recreate, rollout-steady, rollout-balanced, rollout-fast, custom)
      - `settings`: {object}
        - `maxSurge`: (multiple options) (integer) A non-negative integer. | (string) A percentage string in the range 0% to 100%, e.g. `25%` (pattern: ^\d+%$)
        - `maxUnavailable`: (multiple options) (integer) A non-negative integer. | (string) A percentage string in the range 0% to 100%, e.g. `25%` (pattern: ^\d+%$)
    - `zonalRedundancy`: {object}
      - `type`: (string) Defines scheduling behaviour across different zones within the same region. (enum: disabled, preferred, required)
      - `minZones`: (integer) Defines how many zones are required and will prevent containers from additional scheduling into existing zones. (Only relevant if type is set to "required")
    - `gpu`: {object}
      - `enabled`: (boolean)
      - `configuration`: {object}
        - `gpuType`: (string) (required)
        - `gpuCount`: (integer)
        - `timesliced`: (boolean)
    - `gracePeriodSeconds`: (integer) The maximum amount of time the process has to shut down after receiving a SIGTERM signal before it is forcefully shut down SIGKILL by the system.
    - `gradualRolloutStrategyId`: (string) The id of the strategy to be attached to service. (pattern: ^[A-Za-z0-9-]+$)
    - `ssh`: {object}
      - `enabled`: (boolean) (required) Enables SSH access if the resource matches an SSH identity selector.
    - `metadata`: {object}
      - `labels`: {object}
      - `annotations`: {object}
    - `imageUrl`: (string) Image registry url of the deployed image.
  - `id`: (string) (required) Identifier for the service
  - `appId`: (string) (required) Full identifier used for service deployment
  - `cluster`: {object}
    - `id`: (string) (required) The id of the cluster associated with this project.
    - `name`: (string) (required) The name of the cluster associated with this project.
    - `namespace`: (string) Namespace this resource is located within on the cluster.
    - `loadBalancers`: [array of] (string)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)
  - `status`: {object}
    - `build`: {object}
      - `status`: (string) (required) The current status of the build. (enum: QUEUED, PENDING, UNSCHEDULABLE, STARTING, CLONING, BUILDING, UPLOADING, ABORTED, FAILURE, SUBMISSION_FAILURE, SUCCESS, CRASHED, IN_PROGRESS)
      - `lastTransitionTime`: (string) The timestamp of when the build reached this status. (format: date-time)
    - `deployment`: {object}
      - `status`: (string) (required) The current status of the deployment. (enum: PENDING, IN_PROGRESS, COMPLETED, FAILED)
      - `reason`: (string) (required) The reason the current deployment was started. (enum: SCALING, DEPLOYING)
      - `lastTransitionTime`: (string) The timestamp of when the deployment reached this status. (format: date-time)

### API reference

POST /v1/projects/{projectId}/services/combined

POST /v1/teams/{teamId}/projects/{projectId}/services/combined

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Service","description":"A service description","billing":{"deploymentPlan":"nf-compute-20","buildPlan":"nf-compute-200-8"},"deployment":{"instances":1,"docker":{"configType":"default"},"storage":{"ephemeralStorage":{"storageSize":1024}},"gradualRolloutStrategyId":"strategy-id"},"ports":[{"name":"p01","internalPort":8080,"public":true,"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}},"domains":["app.example.com"],"protocol":"HTTP"}],"buildSource":"git","vcsData":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"bundleData":{"bundleUrl":"https://example.com/archive.tar","branch":"main"},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}}},"buildConfiguration":{"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}],"autoscaling":{"horizontal":{"enabled":true,"minReplicas":1,"maxReplicas":3,"userMetrics":{"enabled":true,"exposedMetricsPath":"/metrics","exposedMetricsPort":8080,"metrics":[{"metricName":"example-metric","metricType":"gauge","thresholdValue":2}]}}}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/combined
```

```javascript
const payload = {
  "name": "Example Service",
  "description": "A service description",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "buildPlan": "nf-compute-200-8"
  },
  "deployment": {
    "instances": 1,
    "docker": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "gradualRolloutStrategyId": "strategy-id"
  },
  "ports": [
    {
      "name": "p01",
      "internalPort": 8080,
      "public": true,
      "security": {
        "credentials": [
          {
            "username": "admin",
            "password": "password123",
            "type": "basic-auth"
          }
        ],
        "ip": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "policies": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "headers": [
          {
            "regexMode": false,
            "name": "headerName",
            "value": "headerValue"
          }
        ],
        "securePathConfiguration": {
          "rules": [
            {
              "paths": [
                {
                  "routingMode": "prefix",
                  "priority": 80
                }
              ],
              "accessMode": "protected",
              "securityPolicies": {
                "orPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                },
                "requiredPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                }
              }
            }
          ]
        }
      },
      "domains": [
        "app.example.com"
      ],
      "protocol": "HTTP"
    }
  ],
  "buildSource": "git",
  "vcsData": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user",
    "projectBranch": "master"
  },
  "bundleData": {
    "bundleUrl": "https://example.com/archive.tar",
    "branch": "main"
  },
  "buildSettings": {
    "storage": {
      "ephemeralStorage": {
        "storageSize": 16384
      }
    },
    "dockerfile": {
      "buildEngine": "buildkit",
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/",
      "buildkit": {
        "useCache": true,
        "cacheStorageSize": 32768
      }
    }
  },
  "buildConfiguration": {
    "pathIgnoreRules": [
      "README.md"
    ],
    "isAllowList": false,
    "ciIgnoreFlags": [
      "[skip ci]"
    ],
    "dockerCredentials": [
      "example-docker-credential"
    ],
    "storage": {
      "ephemeralStorage": {
        "storageSize": 16384
      }
    }
  },
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "buildArguments": {
    "ARGUMENT_1": "abcdef",
    "ARGUMENT_2": "12345"
  },
  "buildFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "dockerSecretMounts": {
    "example-secret-mount_1": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "healthChecks": [
    {
      "protocol": "HTTP",
      "type": "readinessProbe",
      "path": "/health-check",
      "port": 8080,
      "initialDelaySeconds": 10,
      "periodSeconds": 60,
      "timeoutSeconds": 1,
      "failureThreshold": 3,
      "successThreshold": 1
    }
  ],
  "autoscaling": {
    "horizontal": {
      "enabled": true,
      "minReplicas": 1,
      "maxReplicas": 3,
      "userMetrics": {
        "enabled": true,
        "exposedMetricsPath": "/metrics",
        "exposedMetricsPort": 8080,
        "metrics": [
          {
            "metricName": "example-metric",
            "metricType": "gauge",
            "thresholdValue": 2
          }
        ]
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/combined', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/combined"

payload = {"name":"Example Service","description":"A service description","billing":{"deploymentPlan":"nf-compute-20","buildPlan":"nf-compute-200-8"},"deployment":{"instances":1,"docker":{"configType":"default"},"storage":{"ephemeralStorage":{"storageSize":1024}},"gradualRolloutStrategyId":"strategy-id"},"ports":[{"name":"p01","internalPort":8080,"public":true,"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}},"domains":["app.example.com"],"protocol":"HTTP"}],"buildSource":"git","vcsData":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"bundleData":{"bundleUrl":"https://example.com/archive.tar","branch":"main"},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}}},"buildConfiguration":{"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}],"autoscaling":{"horizontal":{"enabled":true,"minReplicas":1,"maxReplicas":3,"userMetrics":{"enabled":true,"exposedMetricsPath":"/metrics","exposedMetricsPort":8080,"metrics":[{"metricName":"example-metric","metricType":"gauge","thresholdValue":2}]}}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/combined"

  var jsonStr = []byte(`{"name":"Example Service","description":"A service description","billing":{"deploymentPlan":"nf-compute-20","buildPlan":"nf-compute-200-8"},"deployment":{"instances":1,"docker":{"configType":"default"},"storage":{"ephemeralStorage":{"storageSize":1024}},"gradualRolloutStrategyId":"strategy-id"},"ports":[{"name":"p01","internalPort":8080,"public":true,"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}},"domains":["app.example.com"],"protocol":"HTTP"}],"buildSource":"git","vcsData":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"bundleData":{"bundleUrl":"https://example.com/archive.tar","branch":"main"},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}}},"buildConfiguration":{"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}],"autoscaling":{"horizontal":{"enabled":true,"minReplicas":1,"maxReplicas":3,"userMetrics":{"enabled":true,"exposedMetricsPath":"/metrics","exposedMetricsPort":8080,"metrics":[{"metricName":"example-metric","metricType":"gauge","thresholdValue":2}]}}}}`)
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

200 OK: Details about the newly created service.

```json
{
  "data": {
    "name": "Example Service",
    "description": "A service description",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "buildPlan": "nf-compute-200-8"
    },
    "ports": [
      {
        "name": "p01",
        "internalPort": 8080,
        "public": true,
        "security": {
          "credentials": [
            {
              "username": "admin",
              "password": "password123",
              "type": "basic-auth"
            }
          ],
          "ip": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "policies": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ],
          "securePathConfiguration": {
            "rules": [
              {
                "paths": [
                  {
                    "routingMode": "prefix",
                    "priority": 80
                  }
                ],
                "accessMode": "protected",
                "securityPolicies": {
                  "orPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  },
                  "requiredPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  }
                }
              }
            ]
          }
        },
        "domains": [
          "app.example.com"
        ]
      }
    ],
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "bundleData": {
      "bundleUrl": "https://example.com/archive.tar",
      "branch": "main"
    },
    "buildSettings": {
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      },
      "dockerfile": {
        "buildEngine": "buildkit",
        "dockerFilePath": "/Dockerfile",
        "dockerWorkDir": "/",
        "buildkit": {
          "useCache": true,
          "cacheStorageSize": 32768
        }
      }
    },
    "buildConfiguration": {
      "pathIgnoreRules": [
        "README.md"
      ],
      "isAllowList": false,
      "ciIgnoreFlags": [
        "[skip ci]"
      ],
      "dockerCredentials": [
        "example-docker-credential"
      ],
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      }
    },
    "runtimeEnvironment": {
      "VARIABLE_1": "abcdef",
      "VARIABLE_2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "buildArguments": {
      "ARGUMENT_1": "abcdef",
      "ARGUMENT_2": "12345"
    },
    "buildFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "healthChecks": [
      {
        "protocol": "HTTP",
        "type": "readinessProbe",
        "path": "/health-check",
        "port": 8080,
        "initialDelaySeconds": 10,
        "periodSeconds": 60,
        "timeoutSeconds": 1,
        "failureThreshold": 3,
        "successThreshold": 1
      }
    ],
    "autoscaling": {
      "horizontal": {
        "enabled": true,
        "minReplicas": 1,
        "maxReplicas": 3,
        "userMetrics": {
          "enabled": true,
          "exposedMetricsPath": "/metrics",
          "exposedMetricsPort": 8080,
          "metrics": [
            {
              "metricName": "example-metric",
              "metricType": "gauge",
              "thresholdValue": 2
            }
          ]
        }
      }
    },
    "serviceType": "combined",
    "deployment": {
      "instances": 1,
      "docker": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "gradualRolloutStrategyId": "strategy-id"
    },
    "id": "example-service",
    "appId": "/example-user/default-project/example-service",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    },
    "status": {
      "build": {
        "status": "SUCCESS",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      },
      "deployment": {
        "status": "COMPLETED",
        "reason": "DEPLOYING",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      }
    }
  }
}
```

#### Example Response

409 Conflict: There is already a service with the same derived identifier

### CLI reference

$ northflank create service combined

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Service",
  "description": "A service description",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "buildPlan": "nf-compute-200-8"
  },
  "deployment": {
    "instances": 1,
    "docker": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "gradualRolloutStrategyId": "strategy-id"
  },
  "ports": [
    {
      "name": "p01",
      "internalPort": 8080,
      "public": true,
      "security": {
        "credentials": [
          {
            "username": "admin",
            "password": "password123",
            "type": "basic-auth"
          }
        ],
        "ip": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "policies": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "headers": [
          {
            "regexMode": false,
            "name": "headerName",
            "value": "headerValue"
          }
        ],
        "securePathConfiguration": {
          "rules": [
            {
              "paths": [
                {
                  "routingMode": "prefix",
                  "priority": 80
                }
              ],
              "accessMode": "protected",
              "securityPolicies": {
                "orPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                },
                "requiredPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                }
              }
            }
          ]
        }
      },
      "domains": [
        "app.example.com"
      ],
      "protocol": "HTTP"
    }
  ],
  "buildSource": "git",
  "vcsData": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user",
    "projectBranch": "master"
  },
  "bundleData": {
    "bundleUrl": "https://example.com/archive.tar",
    "branch": "main"
  },
  "buildSettings": {
    "storage": {
      "ephemeralStorage": {
        "storageSize": 16384
      }
    },
    "dockerfile": {
      "buildEngine": "buildkit",
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/",
      "buildkit": {
        "useCache": true,
        "cacheStorageSize": 32768
      }
    }
  },
  "buildConfiguration": {
    "pathIgnoreRules": [
      "README.md"
    ],
    "isAllowList": false,
    "ciIgnoreFlags": [
      "[skip ci]"
    ],
    "dockerCredentials": [
      "example-docker-credential"
    ],
    "storage": {
      "ephemeralStorage": {
        "storageSize": 16384
      }
    }
  },
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "buildArguments": {
    "ARGUMENT_1": "abcdef",
    "ARGUMENT_2": "12345"
  },
  "buildFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "dockerSecretMounts": {
    "example-secret-mount_1": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "healthChecks": [
    {
      "protocol": "HTTP",
      "type": "readinessProbe",
      "path": "/health-check",
      "port": 8080,
      "initialDelaySeconds": 10,
      "periodSeconds": 60,
      "timeoutSeconds": 1,
      "failureThreshold": 3,
      "successThreshold": 1
    }
  ],
  "autoscaling": {
    "horizontal": {
      "enabled": true,
      "minReplicas": 1,
      "maxReplicas": 3,
      "userMetrics": {
        "enabled": true,
        "exposedMetricsPath": "/metrics",
        "exposedMetricsPort": 8080,
        "metrics": [
          {
            "metricName": "example-metric",
            "metricType": "gauge",
            "thresholdValue": 2
          }
        ]
      }
    }
  }
}
```

#### Example Response

 Details about the newly created service.

```json
{
  "name": "Example Service",
  "description": "A service description",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "buildPlan": "nf-compute-200-8"
  },
  "ports": [
    {
      "name": "p01",
      "internalPort": 8080,
      "public": true,
      "security": {
        "credentials": [
          {
            "username": "admin",
            "password": "password123",
            "type": "basic-auth"
          }
        ],
        "ip": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "policies": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "headers": [
          {
            "regexMode": false,
            "name": "headerName",
            "value": "headerValue"
          }
        ],
        "securePathConfiguration": {
          "rules": [
            {
              "paths": [
                {
                  "routingMode": "prefix",
                  "priority": 80
                }
              ],
              "accessMode": "protected",
              "securityPolicies": {
                "orPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                },
                "requiredPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                }
              }
            }
          ]
        }
      },
      "domains": [
        "app.example.com"
      ]
    }
  ],
  "buildSource": "git",
  "vcsData": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user",
    "projectBranch": "master"
  },
  "bundleData": {
    "bundleUrl": "https://example.com/archive.tar",
    "branch": "main"
  },
  "buildSettings": {
    "storage": {
      "ephemeralStorage": {
        "storageSize": 16384
      }
    },
    "dockerfile": {
      "buildEngine": "buildkit",
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/",
      "buildkit": {
        "useCache": true,
        "cacheStorageSize": 32768
      }
    }
  },
  "buildConfiguration": {
    "pathIgnoreRules": [
      "README.md"
    ],
    "isAllowList": false,
    "ciIgnoreFlags": [
      "[skip ci]"
    ],
    "dockerCredentials": [
      "example-docker-credential"
    ],
    "storage": {
      "ephemeralStorage": {
        "storageSize": 16384
      }
    }
  },
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "buildArguments": {
    "ARGUMENT_1": "abcdef",
    "ARGUMENT_2": "12345"
  },
  "buildFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "dockerSecretMounts": {
    "example-secret-mount_1": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "healthChecks": [
    {
      "protocol": "HTTP",
      "type": "readinessProbe",
      "path": "/health-check",
      "port": 8080,
      "initialDelaySeconds": 10,
      "periodSeconds": 60,
      "timeoutSeconds": 1,
      "failureThreshold": 3,
      "successThreshold": 1
    }
  ],
  "autoscaling": {
    "horizontal": {
      "enabled": true,
      "minReplicas": 1,
      "maxReplicas": 3,
      "userMetrics": {
        "enabled": true,
        "exposedMetricsPath": "/metrics",
        "exposedMetricsPort": 8080,
        "metrics": [
          {
            "metricName": "example-metric",
            "metricType": "gauge",
            "thresholdValue": 2
          }
        ]
      }
    }
  },
  "serviceType": "combined",
  "deployment": {
    "instances": 1,
    "docker": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "gradualRolloutStrategyId": "strategy-id"
  },
  "id": "example-service",
  "appId": "/example-user/default-project/example-service",
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  },
  "status": {
    "build": {
      "status": "SUCCESS",
      "lastTransitionTime": "2021-11-29T11:47:16.624Z"
    },
    "deployment": {
      "status": "COMPLETED",
      "reason": "DEPLOYING",
      "lastTransitionTime": "2021-11-29T11:47:16.624Z"
    }
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.service.combined({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "name": "Example Service",
    "description": "A service description",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "buildPlan": "nf-compute-200-8"
    },
    "deployment": {
      "instances": 1,
      "docker": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "gradualRolloutStrategyId": "strategy-id"
    },
    "ports": [
      {
        "name": "p01",
        "internalPort": 8080,
        "public": true,
        "security": {
          "credentials": [
            {
              "username": "admin",
              "password": "password123",
              "type": "basic-auth"
            }
          ],
          "ip": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "policies": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ],
          "securePathConfiguration": {
            "rules": [
              {
                "paths": [
                  {
                    "routingMode": "prefix",
                    "priority": 80
                  }
                ],
                "accessMode": "protected",
                "securityPolicies": {
                  "orPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  },
                  "requiredPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  }
                }
              }
            ]
          }
        },
        "domains": [
          "app.example.com"
        ],
        "protocol": "HTTP"
      }
    ],
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "bundleData": {
      "bundleUrl": "https://example.com/archive.tar",
      "branch": "main"
    },
    "buildSettings": {
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      },
      "dockerfile": {
        "buildEngine": "buildkit",
        "dockerFilePath": "/Dockerfile",
        "dockerWorkDir": "/",
        "buildkit": {
          "useCache": true,
          "cacheStorageSize": 32768
        }
      }
    },
    "buildConfiguration": {
      "pathIgnoreRules": [
        "README.md"
      ],
      "isAllowList": false,
      "ciIgnoreFlags": [
        "[skip ci]"
      ],
      "dockerCredentials": [
        "example-docker-credential"
      ],
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      }
    },
    "runtimeEnvironment": {
      "VARIABLE_1": "abcdef",
      "VARIABLE_2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "buildArguments": {
      "ARGUMENT_1": "abcdef",
      "ARGUMENT_2": "12345"
    },
    "buildFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "healthChecks": [
      {
        "protocol": "HTTP",
        "type": "readinessProbe",
        "path": "/health-check",
        "port": 8080,
        "initialDelaySeconds": 10,
        "periodSeconds": 60,
        "timeoutSeconds": 1,
        "failureThreshold": 3,
        "successThreshold": 1
      }
    ],
    "autoscaling": {
      "horizontal": {
        "enabled": true,
        "minReplicas": 1,
        "maxReplicas": 3,
        "userMetrics": {
          "enabled": true,
          "exposedMetricsPath": "/metrics",
          "exposedMetricsPort": 8080,
          "metrics": [
            {
              "metricName": "example-metric",
              "metricType": "gauge",
              "thresholdValue": 2
            }
          ]
        }
      }
    }
  }
});
```

#### Example Response

 Details about the newly created service.

```json
{
  "data": {
    "name": "Example Service",
    "description": "A service description",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "buildPlan": "nf-compute-200-8"
    },
    "ports": [
      {
        "name": "p01",
        "internalPort": 8080,
        "public": true,
        "security": {
          "credentials": [
            {
              "username": "admin",
              "password": "password123",
              "type": "basic-auth"
            }
          ],
          "ip": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "policies": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ],
          "securePathConfiguration": {
            "rules": [
              {
                "paths": [
                  {
                    "routingMode": "prefix",
                    "priority": 80
                  }
                ],
                "accessMode": "protected",
                "securityPolicies": {
                  "orPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  },
                  "requiredPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  }
                }
              }
            ]
          }
        },
        "domains": [
          "app.example.com"
        ]
      }
    ],
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "bundleData": {
      "bundleUrl": "https://example.com/archive.tar",
      "branch": "main"
    },
    "buildSettings": {
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      },
      "dockerfile": {
        "buildEngine": "buildkit",
        "dockerFilePath": "/Dockerfile",
        "dockerWorkDir": "/",
        "buildkit": {
          "useCache": true,
          "cacheStorageSize": 32768
        }
      }
    },
    "buildConfiguration": {
      "pathIgnoreRules": [
        "README.md"
      ],
      "isAllowList": false,
      "ciIgnoreFlags": [
        "[skip ci]"
      ],
      "dockerCredentials": [
        "example-docker-credential"
      ],
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      }
    },
    "runtimeEnvironment": {
      "VARIABLE_1": "abcdef",
      "VARIABLE_2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "buildArguments": {
      "ARGUMENT_1": "abcdef",
      "ARGUMENT_2": "12345"
    },
    "buildFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "healthChecks": [
      {
        "protocol": "HTTP",
        "type": "readinessProbe",
        "path": "/health-check",
        "port": 8080,
        "initialDelaySeconds": 10,
        "periodSeconds": 60,
        "timeoutSeconds": 1,
        "failureThreshold": 3,
        "successThreshold": 1
      }
    ],
    "autoscaling": {
      "horizontal": {
        "enabled": true,
        "minReplicas": 1,
        "maxReplicas": 3,
        "userMetrics": {
          "enabled": true,
          "exposedMetricsPath": "/metrics",
          "exposedMetricsPort": 8080,
          "metrics": [
            {
              "metricName": "example-metric",
              "metricType": "gauge",
              "thresholdValue": 2
            }
          ]
        }
      }
    },
    "serviceType": "combined",
    "deployment": {
      "instances": 1,
      "docker": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "gradualRolloutStrategyId": "strategy-id"
    },
    "id": "example-service",
    "appId": "/example-user/default-project/example-service",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    },
    "status": {
      "build": {
        "status": "SUCCESS",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      },
      "deployment": {
        "status": "COMPLETED",
        "reason": "DEPLOYING",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
