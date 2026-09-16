# Create harness

Source: https://northflank.com/docs/v1/api/project/harnesses/create-harness.md

Creates a new harness

Required permission: Project > Harnesses > General > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `name`: (string) (required) The name of the harness. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54)
- `description`: (string) A description of the harness. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `billing`: {object}
  - `deploymentPlan`: (string) (required) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `gpu`: {object}
    - `enabled`: (boolean) Whether GPUs are enabled for this workload.
    - `configuration`: {object}
      - `gpuType`: (string) (required) The type of GPU to use.
      - `gpuCount`: (integer) The number of GPUs to allocate.
      - `timesliced`: (boolean) Whether GPU timeslicing is enabled.
- `deployment`: {object}
  - `gpu`: {object}
    - `enabled`: (boolean) Whether GPUs are enabled for this workload.
    - `configuration`: {object}
      - `gpuType`: (string) (required) The type of GPU to use.
      - `gpuCount`: (integer) The number of GPUs to allocate.
      - `timesliced`: (boolean) Whether GPU timeslicing is enabled.
  - `imageSource`: (string) Container image source. Managed uses the Northflank harness image, internal uses a Northflank build service, and external uses a registry image. (enum: managed, internal, external)
  - `internal`: {object}
    - `id`: (multiple options) (string) The ID of a build service in the same project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) The ID of a build service in another project, in the format `project-id/build-service-id`
    - `branch`: (string) Branch to deploy
    - `buildSHA`: (multiple options) (string) A commit sha. (min length: 40) (max length: 40) | (string) Latest commit. (enum: latest)
    - `buildId`: (string) ID of the build that should be deployed
  - `external`: {object}
    - `imagePath`: (string) (required) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z0-9.\-]+))?(?:\/)?([a-zA-Z/-9.\-_]+)(?::([a-zA-Z/-9.\-_:]+)|@([a-zA-Z/-9.\-_:]+))$)
    - `credentials`: (string) ID of the saved credentials to use to access this external image. (pattern: ^[A-Za-z0-9-]+$)
  - `storage`: {object}
    - `ephemeralStorage`: {object}
      - `storageSize`: (integer) Ephemeral storage per container in MB
  - `persistentWorkspace`: (boolean) Use a persistent workspace volume. Defaults to true on creation. Prefers ReadWriteMany, falling back to ReadWriteOnce. When false, files are lost on container restart, redeployment or stop. Cannot be changed after creation.
  - `workspaceSize`: (integer) Size of the persistent workspace volume in MiB. Only available with persistence enabled. Can only be grown after creation; shrinking is rejected because Kubernetes does not support shrinking persistent volume claims.
- `ports`: [array of] {object}
   - `name`: (string) (required) The name used to identify the port. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 1) (max length: 8)
   - `internalPort`: (integer) (required) The port number.
   - `public`: (boolean) If true, the port will be exposed publicly.
   - `vpcAccessible`: (boolean) If true, the port will be exposed on the cluster's private (VPC) load balancer.
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
       - `noindexRedirect`: (boolean) Add an X-Robots-Tag: noindex response header to the SSO authentication redirect
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
                 - `noindexRedirect`: (boolean) Add an X-Robots-Tag: noindex response header to the SSO authentication redirect
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
                 - `noindexRedirect`: (boolean) Add an X-Robots-Tag: noindex response header to the SSO authentication redirect
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
- `source`: {object}
  - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
  - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
  - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
  - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
  - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
  - `projectBranch`: (string) (required) The name of the branch to pre-pull for the harness environment.
  - `publicRepo`: (boolean) Whether the linked repository is public.
- `additionalRepositories`: [array of] {object}
   - `source`: {object}
     - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
     - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
     - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
     - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
     - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
     - `projectBranch`: (string) (required) The name of the branch to pre-pull for the harness environment.
     - `publicRepo`: (boolean) Whether the linked repository is public.
   - `directory`: (string) (required) Folder to clone the repository into, relative to /home/harness. (pattern: ^(?!\.{1,2}$)[A-Za-z0-9._-]+$) (max length: 237)
- `branchData`: {object}
  - `source`: {object}
    - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
    - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
    - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
    - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
    - `projectBranch`: (string) (required) The name of the branch to pre-pull for the harness environment.
    - `publicRepo`: (boolean) Whether the linked repository is public.
  - `name`: (string) (required) Name of the new branch to create. (max length: 255)
- `repositoryData`: {object}
  - `name`: (string) (required) Name of the new repository to create. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54)
  - `projectType`: (string) (required) The VCS provider to create the repository on. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
  - `vcsLinkId`: (string) (required) Linked account ID under which to create the repository. (min length: 24) (max length: 24)
  - `accountLogin`: (string) Linked account login to create the repository under.
  - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
  - `privateRepo`: (boolean) Whether the new repository should be private.
  - `context`: (string) Namespace/owner the repository is created under (gitlab/bitbucket).
  - `folder`: (string) Project/folder the repository is created under (bitbucket).
  - `description`: (string) Description for the new repository. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `harness`: {object}
  - `type`: (string) (required) The harness environment type to run. (enum: codex, claude, pi, opencode, cursor, none)
  - `authMode`: (string) How Codex, Claude and Cursor authenticate. Pi and OpenCode require `account`; agentless harnesses omit this field. When omitted for Codex, Claude or Cursor, `apiKey` is inferred if an apiKey is provided. (enum: apiKey, account)
  - `apiKey`: (multiple options) (undefined) | (undefined)
  - `cloneDirectory`: (string) Absolute path the repo is cloned into in the harness container. Must be /home/harness or a directory inside it. This workspace is persisted only when deployment.persistentWorkspace is enabled. Defaults to /home/harness. Can only be set when creating the harness. (pattern: ^\/((?!\.\.?\/)[a-zA-Z0-9-._]+\/)*(?!\.\.?$)[a-zA-Z0-9-._]*$)
- `runtimeEnvironment`: {object}
- `runtimeFiles`: {object}

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the harness. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54)
  - `description`: (string) A description of the harness. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `billing`: {object}
    - `deploymentPlan`: (string) (required) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `gpu`: {object}
      - `enabled`: (boolean) Whether GPUs are enabled for this workload.
      - `configuration`: {object}
        - `gpuType`: (string) (required) The type of GPU to use.
        - `gpuCount`: (integer) The number of GPUs to allocate.
        - `timesliced`: (boolean) Whether GPU timeslicing is enabled.
  - `ports`: [array of] {object}
     - `name`: (string) (required) The name used to identify the port. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 1) (max length: 8)
     - `internalPort`: (integer) (required) The port number.
     - `public`: (boolean) If true, the port will be exposed publicly.
     - `vpcAccessible`: (boolean) If true, the port will be exposed on the cluster's private (VPC) load balancer.
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
         - `noindexRedirect`: (boolean) Add an X-Robots-Tag: noindex response header to the SSO authentication redirect
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
                   - `noindexRedirect`: (boolean) Add an X-Robots-Tag: noindex response header to the SSO authentication redirect
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
                   - `noindexRedirect`: (boolean) Add an X-Robots-Tag: noindex response header to the SSO authentication redirect
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
     - `protocol`: (multiple options) (string) (enum: HTTP, HTTP/2) | (multiple options) (string) (enum: HTTP, HTTP/2) | (string) (enum: HTTP, HTTP/2, TCP, UDP)
  - `source`: {object}
    - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
    - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
    - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
    - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
    - `projectBranch`: (string) (required) The name of the branch to pre-pull for the harness environment.
    - `publicRepo`: (boolean) Whether the linked repository is public.
  - `additionalRepositories`: [array of] {object}
     - `source`: {object}
       - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
       - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
       - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
       - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
       - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
       - `projectBranch`: (string) (required) The name of the branch to pre-pull for the harness environment.
       - `publicRepo`: (boolean) Whether the linked repository is public.
     - `directory`: (string) (required) Folder to clone the repository into, relative to /home/harness. (pattern: ^(?!\.{1,2}$)[A-Za-z0-9._-]+$) (max length: 237)
  - `repositoryData`: {object}
    - `name`: (string) (required) Name of the new repository to create. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54)
    - `projectType`: (string) (required) The VCS provider to create the repository on. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
    - `vcsLinkId`: (string) (required) Linked account ID under which to create the repository. (min length: 24) (max length: 24)
    - `accountLogin`: (string) Linked account login to create the repository under.
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
    - `privateRepo`: (boolean) Whether the new repository should be private.
    - `context`: (string) Namespace/owner the repository is created under (gitlab/bitbucket).
    - `folder`: (string) Project/folder the repository is created under (bitbucket).
    - `description`: (string) Description for the new repository. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `runtimeEnvironment`: {object}
  - `runtimeFiles`: {object}
  - `deployment`: {object}
    - `gpu`: {object}
      - `enabled`: (boolean) Whether GPUs are enabled for this workload.
      - `configuration`: {object}
        - `gpuType`: (string) (required) The type of GPU to use.
        - `gpuCount`: (integer) The number of GPUs to allocate.
        - `timesliced`: (boolean) Whether GPU timeslicing is enabled.
    - `imageSource`: (string) Container image source. Managed uses the Northflank harness image, internal uses a Northflank build service, and external uses a registry image. (enum: managed, internal, external)
    - `internal`: {object}
      - `id`: (multiple options) (string) The ID of a build service in the same project (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string) The ID of a build service in another project, in the format `project-id/build-service-id`
      - `branch`: (string) Branch to deploy
      - `buildSHA`: (multiple options) (string) A commit sha. (min length: 40) (max length: 40) | (string) Latest commit. (enum: latest)
      - `buildId`: (string) ID of the build that should be deployed
    - `external`: {object}
      - `imagePath`: (string) (required) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9-]+\.[a-zA-Z0-9.\-]+))?(?:\/)?([a-zA-Z/-9.\-_]+)(?::([a-zA-Z/-9.\-_:]+)|@([a-zA-Z/-9.\-_:]+))$)
      - `credentials`: (string) ID of the saved credentials to use to access this external image. (pattern: ^[A-Za-z0-9-]+$)
    - `storage`: {object}
      - `ephemeralStorage`: {object}
        - `storageSize`: (integer) Ephemeral storage per container in MB
    - `persistentWorkspace`: (boolean) Use a persistent workspace volume. Defaults to true on creation. Prefers ReadWriteMany, falling back to ReadWriteOnce. When false, files are lost on container restart, redeployment or stop. Cannot be changed after creation.
    - `workspaceSize`: (integer) Size of the persistent workspace volume in MiB. Only available with persistence enabled. Can only be grown after creation; shrinking is rejected because Kubernetes does not support shrinking persistent volume claims.
  - `harness`: {object}
    - `type`: (string) (required) The harness environment type to run. (enum: codex, claude, pi, opencode, cursor, none)
    - `authMode`: (string) How the harness authenticates: `apiKey` (a provider key is stored) or `account` (interactive/account login, no key). (enum: apiKey, account)
    - `apiKey`: (string) Masked API key used by the harness environment. Absent for `account` harnesses.
    - `cloneDirectory`: (string) Absolute path the repo is cloned into in the harness container.
  - `id`: (string) (required) Identifier for the harness
  - `appId`: (string) (required) Full identifier used for harness deployment
  - `cluster`: {object}
    - `id`: (string) (required) The id of the cluster associated with this project.
    - `name`: (string) (required) The name of the cluster associated with this project.
    - `namespace`: (string) Namespace this resource is located within on the cluster.
    - `loadBalancers`: [array of] (string)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)
  - `harnessPaused`: (boolean) Is the harness paused?
  - `status`: {object}
    - `deployment`: {object}
      - `status`: (string) (required) The current status of the deployment. (enum: PENDING, IN_PROGRESS, COMPLETED, FAILED)
      - `reason`: (string) (required) The reason the current deployment was started. (enum: SCALING, DEPLOYING)
      - `lastTransitionTime`: (string) The timestamp of when the deployment reached this status. (format: date-time)

### API reference

POST /v1/projects/{projectId}/harnesses

POST /v1/teams/{teamId}/projects/{projectId}/harnesses

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Harness","description":"A harness description","billing":{"deploymentPlan":"nf-compute-20"},"deployment":{"internal":{"id":"example-build-service","branch":"master","buildSHA":"latest","buildId":"premium-guide-6393"},"external":{"imagePath":"nginx:latest","credentials":"example-credentials"},"storage":{"ephemeralStorage":{"storageSize":1024}},"persistentWorkspace":true,"workspaceSize":10240},"ports":[{"name":"p01","internalPort":8080,"public":true,"vpcAccessible":false,"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80,"path":"/path"}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}},"domains":["app.example.com"],"protocol":"HTTP"}],"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"additionalRepositories":[{"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"directory":"payments-api"}],"branchData":{"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"name":"harness/my-task"},"repositoryData":{"name":"my-harness-repo","projectType":"bitbucket","vcsLinkId":"stringaaaaaaaaaaaaaaaaaa"},"harness":{"type":"claude","authMode":"apiKey","cloneDirectory":"/home/harness/repo"},"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}' \
  https://api.northflank.com/v1/projects/{projectId}/harnesses
```

```javascript
const payload = {
  "name": "Example Harness",
  "description": "A harness description",
  "billing": {
    "deploymentPlan": "nf-compute-20"
  },
  "deployment": {
    "internal": {
      "id": "example-build-service",
      "branch": "master",
      "buildSHA": "latest",
      "buildId": "premium-guide-6393"
    },
    "external": {
      "imagePath": "nginx:latest",
      "credentials": "example-credentials"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "persistentWorkspace": true,
    "workspaceSize": 10240
  },
  "ports": [
    {
      "name": "p01",
      "internalPort": 8080,
      "public": true,
      "vpcAccessible": false,
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
                  "priority": 80,
                  "path": "/path"
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
  "source": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user",
    "projectBranch": "master"
  },
  "additionalRepositories": [
    {
      "source": {
        "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
        "projectType": "github",
        "accountLogin": "github-user",
        "projectBranch": "master"
      },
      "directory": "payments-api"
    }
  ],
  "branchData": {
    "source": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "name": "harness/my-task"
  },
  "repositoryData": {
    "name": "my-harness-repo",
    "projectType": "bitbucket",
    "vcsLinkId": "stringaaaaaaaaaaaaaaaaaa"
  },
  "harness": {
    "type": "claude",
    "authMode": "apiKey",
    "cloneDirectory": "/home/harness/repo"
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
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/harnesses', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/harnesses"

payload = {"name":"Example Harness","description":"A harness description","billing":{"deploymentPlan":"nf-compute-20"},"deployment":{"internal":{"id":"example-build-service","branch":"master","buildSHA":"latest","buildId":"premium-guide-6393"},"external":{"imagePath":"nginx:latest","credentials":"example-credentials"},"storage":{"ephemeralStorage":{"storageSize":1024}},"persistentWorkspace":true,"workspaceSize":10240},"ports":[{"name":"p01","internalPort":8080,"public":true,"vpcAccessible":false,"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80,"path":"/path"}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}},"domains":["app.example.com"],"protocol":"HTTP"}],"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"additionalRepositories":[{"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"directory":"payments-api"}],"branchData":{"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"name":"harness/my-task"},"repositoryData":{"name":"my-harness-repo","projectType":"bitbucket","vcsLinkId":"stringaaaaaaaaaaaaaaaaaa"},"harness":{"type":"claude","authMode":"apiKey","cloneDirectory":"/home/harness/repo"},"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/harnesses"

  var jsonStr = []byte(`{"name":"Example Harness","description":"A harness description","billing":{"deploymentPlan":"nf-compute-20"},"deployment":{"internal":{"id":"example-build-service","branch":"master","buildSHA":"latest","buildId":"premium-guide-6393"},"external":{"imagePath":"nginx:latest","credentials":"example-credentials"},"storage":{"ephemeralStorage":{"storageSize":1024}},"persistentWorkspace":true,"workspaceSize":10240},"ports":[{"name":"p01","internalPort":8080,"public":true,"vpcAccessible":false,"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80,"path":"/path"}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}},"domains":["app.example.com"],"protocol":"HTTP"}],"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"additionalRepositories":[{"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"directory":"payments-api"}],"branchData":{"source":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user","projectBranch":"master"},"name":"harness/my-task"},"repositoryData":{"name":"my-harness-repo","projectType":"bitbucket","vcsLinkId":"stringaaaaaaaaaaaaaaaaaa"},"harness":{"type":"claude","authMode":"apiKey","cloneDirectory":"/home/harness/repo"},"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}`)
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

200 OK: Details about the newly created harness.

```json
{
  "data": {
    "name": "Example Harness",
    "description": "A harness description",
    "billing": {
      "deploymentPlan": "nf-compute-20"
    },
    "ports": [
      {
        "name": "p01",
        "internalPort": 8080,
        "public": true,
        "vpcAccessible": false,
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
    "source": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "additionalRepositories": [
      {
        "source": {
          "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
          "projectType": "github",
          "accountLogin": "github-user",
          "projectBranch": "master"
        },
        "directory": "payments-api"
      }
    ],
    "repositoryData": {
      "name": "my-harness-repo"
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
    "deployment": {
      "internal": {
        "id": "example-build-service",
        "branch": "master",
        "buildId": "premium-guide-6393"
      },
      "external": {
        "imagePath": "nginx:latest",
        "credentials": "example-credentials"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "persistentWorkspace": true,
      "workspaceSize": 10240
    },
    "harness": {
      "type": "claude",
      "authMode": "apiKey",
      "apiKey": "sk-...abcd"
    },
    "id": "example-harness",
    "appId": "/example-user/default-project/example-harness",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    },
    "status": {
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

409 Conflict: There is already a harness with the same derived identifier

### CLI reference

$ northflank create harness

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Harness",
  "description": "A harness description",
  "billing": {
    "deploymentPlan": "nf-compute-20"
  },
  "deployment": {
    "internal": {
      "id": "example-build-service",
      "branch": "master",
      "buildSHA": "latest",
      "buildId": "premium-guide-6393"
    },
    "external": {
      "imagePath": "nginx:latest",
      "credentials": "example-credentials"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "persistentWorkspace": true,
    "workspaceSize": 10240
  },
  "ports": [
    {
      "name": "p01",
      "internalPort": 8080,
      "public": true,
      "vpcAccessible": false,
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
                  "priority": 80,
                  "path": "/path"
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
  "source": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user",
    "projectBranch": "master"
  },
  "additionalRepositories": [
    {
      "source": {
        "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
        "projectType": "github",
        "accountLogin": "github-user",
        "projectBranch": "master"
      },
      "directory": "payments-api"
    }
  ],
  "branchData": {
    "source": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "name": "harness/my-task"
  },
  "repositoryData": {
    "name": "my-harness-repo",
    "projectType": "bitbucket",
    "vcsLinkId": "stringaaaaaaaaaaaaaaaaaa"
  },
  "harness": {
    "type": "claude",
    "authMode": "apiKey",
    "cloneDirectory": "/home/harness/repo"
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
  }
}
```

#### Example Response

 Details about the newly created harness.

```json
{
  "name": "Example Harness",
  "description": "A harness description",
  "billing": {
    "deploymentPlan": "nf-compute-20"
  },
  "ports": [
    {
      "name": "p01",
      "internalPort": 8080,
      "public": true,
      "vpcAccessible": false,
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
  "source": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user",
    "projectBranch": "master"
  },
  "additionalRepositories": [
    {
      "source": {
        "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
        "projectType": "github",
        "accountLogin": "github-user",
        "projectBranch": "master"
      },
      "directory": "payments-api"
    }
  ],
  "repositoryData": {
    "name": "my-harness-repo"
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
  "deployment": {
    "internal": {
      "id": "example-build-service",
      "branch": "master",
      "buildId": "premium-guide-6393"
    },
    "external": {
      "imagePath": "nginx:latest",
      "credentials": "example-credentials"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "persistentWorkspace": true,
    "workspaceSize": 10240
  },
  "harness": {
    "type": "claude",
    "authMode": "apiKey",
    "apiKey": "sk-...abcd"
  },
  "id": "example-harness",
  "appId": "/example-user/default-project/example-harness",
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  },
  "status": {
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
await apiClient.create.harness({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "name": "Example Harness",
    "description": "A harness description",
    "billing": {
      "deploymentPlan": "nf-compute-20"
    },
    "deployment": {
      "internal": {
        "id": "example-build-service",
        "branch": "master",
        "buildSHA": "latest",
        "buildId": "premium-guide-6393"
      },
      "external": {
        "imagePath": "nginx:latest",
        "credentials": "example-credentials"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "persistentWorkspace": true,
      "workspaceSize": 10240
    },
    "ports": [
      {
        "name": "p01",
        "internalPort": 8080,
        "public": true,
        "vpcAccessible": false,
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
                    "priority": 80,
                    "path": "/path"
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
    "source": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "additionalRepositories": [
      {
        "source": {
          "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
          "projectType": "github",
          "accountLogin": "github-user",
          "projectBranch": "master"
        },
        "directory": "payments-api"
      }
    ],
    "branchData": {
      "source": {
        "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
        "projectType": "github",
        "accountLogin": "github-user",
        "projectBranch": "master"
      },
      "name": "harness/my-task"
    },
    "repositoryData": {
      "name": "my-harness-repo",
      "projectType": "bitbucket",
      "vcsLinkId": "stringaaaaaaaaaaaaaaaaaa"
    },
    "harness": {
      "type": "claude",
      "authMode": "apiKey",
      "cloneDirectory": "/home/harness/repo"
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
    }
  }
});
```

#### Example Response

 Details about the newly created harness.

```json
{
  "data": {
    "name": "Example Harness",
    "description": "A harness description",
    "billing": {
      "deploymentPlan": "nf-compute-20"
    },
    "ports": [
      {
        "name": "p01",
        "internalPort": 8080,
        "public": true,
        "vpcAccessible": false,
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
    "source": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "additionalRepositories": [
      {
        "source": {
          "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
          "projectType": "github",
          "accountLogin": "github-user",
          "projectBranch": "master"
        },
        "directory": "payments-api"
      }
    ],
    "repositoryData": {
      "name": "my-harness-repo"
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
    "deployment": {
      "internal": {
        "id": "example-build-service",
        "branch": "master",
        "buildId": "premium-guide-6393"
      },
      "external": {
        "imagePath": "nginx:latest",
        "credentials": "example-credentials"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "persistentWorkspace": true,
      "workspaceSize": 10240
    },
    "harness": {
      "type": "claude",
      "authMode": "apiKey",
      "apiKey": "sk-...abcd"
    },
    "id": "example-harness",
    "appId": "/example-user/default-project/example-harness",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    },
    "status": {
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
