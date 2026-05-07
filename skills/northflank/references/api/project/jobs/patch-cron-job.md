# Patch cron job

Source: https://northflank.com/docs/v1/api/project/jobs/patch-cron-job.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant type-agnostic job endpoint.

[Use /jobs/patch-job instead](patch-job.md)

Updates a cron job

Required permission: Project > Jobs > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `description`: (string) A description of the job. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `billing`: {object}
  - `buildPlan`: (string) The ID of the build plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `deploymentPlan`: (string) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `gpu`: {object}
    - `enabled`: (boolean)
    - `configuration`: {object}
      - `gpuType`: (string)
      - `gpuCount`: (integer)
      - `timesliced`: (boolean)
- `disabledCI`: (boolean) Whether CI should be disabled. Only relevant for jobs deploying directly from version control.
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
- `buildSettings`: {object}
  - `storage`: {object}
    - `ephemeralStorage`: {object}
      - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
  - `dockerfile`: {object}
    - `useCache`: (boolean) DEPRECATED: This field will be removed in the near future and currently has no effect.
    - `buildEngine`: (string) Build engine to use. Defaults to recommended build engine `buildkit` (enum: buildkit, kaniko)
    - `dockerFilePath`: (string) The file path of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
    - `dockerWorkDir`: (string) The working directory of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
    - `buildkit`: {object}
      - `useCache`: (boolean) Use persistent storage to cache build layers.
      - `cacheStorageSize`: (integer) The amount of persistent storage available to each build in MB.
      - `useInternalCache`: (boolean) DEPRECATED: This field will be removed in the near future.
      - `internalCacheStorage`: (number) DEPRECATED: This field will be removed in the near future. (format: float)
  - `buildpack`: {object}
    - `builder`: (string) Buildpack stack to use. Defaults to recommended stack `HEROKU_24`. (enum: HEROKU_24, HEROKU_22, HEROKU_22_CLASSIC, HEROKU_20, HEROKU_18, GOOGLE_22, GOOGLE_V1, CNB_ALPINE, CNB_BIONIC, PAKETO_JAMMY_TINY, PAKETO_JAMMY_BASE, PAKETO_JAMMY_FULL, PAKETO_TINY, PAKETO_BASE, PAKETO_FULL)
    - `buildpackLocators`: [array of] (string) Url or registry identifier of custom Buildpack.
    - `buildContext`: (string) The working directory to build in. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
    - `useCache`: (boolean) Should build dependencies be cached?
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
- `backoffLimit`: (integer) The number of attempts to rerun a job before it is marked as failed.
- `runOnSourceChange`: (string) Configure when the job should be run if the source image changes. (enum: never, cd-promote, always)
- `activeDeadlineSeconds`: (integer) The maximum amount of time, in seconds, for a job to run before it is marked as failed.
- `schedule`: (string) The cron timer scheduling when to run the job. (pattern: (@(annually|yearly|monthly|weekly|daily|hourly))|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5}))
- `suspended`: (boolean) Whether the cron's automatic scheduling is suspended
- `concurrencyPolicy`: (string) Whether this job should run when another instance of the job is already running. `allow` will enable multiple instances of this job to run. `forbid` will keep the current instance of the job running and stop a new instance from being run. `replace` will terminate any currently running instance of the job and start a new one. (enum: allow, forbid, replace)

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the job. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 52)
  - `description`: (string) A description of the job. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `infrastructure`: {object}
    - `architecture`: (string) (enum: x86, arm)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `billing`: {object}
    - `buildPlan`: (string) The ID of the build plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `deploymentPlan`: (string) (required) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `gpu`: {object}
      - `enabled`: (boolean)
      - `configuration`: {object}
        - `gpuType`: (string) (required)
        - `gpuCount`: (integer)
        - `timesliced`: (boolean)
  - `disabledCI`: (boolean) Whether CI should be disabled. Only relevant for jobs deploying directly from version control.
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
  - `backoffLimit`: (integer) (required) The number of attempts to rerun a job before it is marked as failed.
  - `runOnSourceChange`: (string) Configure when the job should be run if the source image changes. (enum: never, cd-promote, always)
  - `activeDeadlineSeconds`: (integer) The maximum amount of time, in seconds, for a job to run before it is marked as failed.
  - `schedule`: (string) The cron timer scheduling when to run the job.
  - `suspended`: (boolean) Whether the cron's automatic scheduling is suspended
  - `concurrencyPolicy`: (string) Whether this job should run when another instance of the job is already running. `allow` will enable multiple instances of this job to run. `forbid` will keep the current instance of the job running and stop a new instance from being run. `replace` will terminate any currently running instance of the job and start a new one. (enum: allow, forbid, replace)
  - `jobType`: (string) (required) Type of the job (manual or cron) (enum: cron)
  - `id`: (string) (required) Identifier for the job
  - `appId`: (string) (required) Full identifier used for job deployment
  - `deployment`: {object}
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
    - `gpu`: {object}
      - `enabled`: (boolean)
      - `configuration`: {object}
        - `gpuType`: (string) (required)
        - `gpuCount`: (integer)
        - `timesliced`: (boolean)
    - `gracePeriodSeconds`: (integer) The maximum amount of time the process has to shut down after receiving a SIGTERM signal before it is forcefully shut down SIGKILL by the system.
    - `metadata`: {object}
      - `labels`: {object}
      - `annotations`: {object}
    - `vcs`: {object}
      - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
      - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
      - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
      - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
      - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
      - `projectBranch`: (string) (required) The name of the branch to use.
    - `external`: {object}
      - `imagePath`: (string) (required) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+)(\/v1)?)?(?:\/)?([a-zA-Z/-9\.\-_]+)(?:\:([a-zA-Z/-9\.\-_\:]+)|\@([a-zA-Z/-9\.\-_\:]+))$)
      - `credentials`: (string) ID of the saved credentials to use to access this external image. (pattern: ^[A-Za-z0-9-]+$)
    - `internal`: {object}
      - `id`: (multiple options) (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string)
      - `branch`: (string) Branch to deploy
      - `buildSHA`: (multiple options) (string) A commit sha. (min length: 40) (max length: 40) | (string) Latest commit. (enum: latest)
      - `buildId`: (string) ID of the build that should be deployed
    - `imageUrl`: (string) Image registry url of the deployed image.
  - `status`: {object}
    - `build`: {object}
      - `status`: (string) (required) The current status of the build. (enum: QUEUED, PENDING, UNSCHEDULABLE, STARTING, CLONING, BUILDING, UPLOADING, ABORTED, FAILURE, SUBMISSION_FAILURE, SUCCESS, CRASHED, IN_PROGRESS)
      - `lastTransitionTime`: (string) The timestamp of when the build reached this status. (format: date-time)
  - `cluster`: {object}
    - `id`: (string) (required) The id of the cluster associated with this project.
    - `name`: (string) (required) The name of the cluster associated with this project.
    - `namespace`: (string) Namespace this resource is located within on the cluster.
    - `loadBalancers`: [array of] (string)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

PATCH /v1/projects/{projectId}/jobs/cron/{jobId}

PATCH /v1/teams/{teamId}/projects/{projectId}/jobs/cron/{jobId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"description":"A job description","billing":{"buildPlan":"nf-compute-200-8","deploymentPlan":"nf-compute-20"},"buildConfiguration":{"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}},"buildpack":{"builder":"HEROKU_24","buildpackLocators":["https://buildpack-registry.heroku.com/cnb/mars/create-react-app"],"buildContext":"/","useCache":false}},"runtimeEnvironment":{"variable1":"abcdef","variable2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"buildArguments":{"variable1":"abcdef","variable2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}],"backoffLimit":0,"runOnSourceChange":"never","activeDeadlineSeconds":600,"schedule":"30 8 * * *","suspended":false,"concurrencyPolicy":"forbid"}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/cron/{jobId}
```

```javascript
const payload = {
  "description": "A job description",
  "billing": {
    "buildPlan": "nf-compute-200-8",
    "deploymentPlan": "nf-compute-20"
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
    },
    "buildpack": {
      "builder": "HEROKU_24",
      "buildpackLocators": [
        "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
      ],
      "buildContext": "/",
      "useCache": false
    }
  },
  "runtimeEnvironment": {
    "variable1": "abcdef",
    "variable2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "buildArguments": {
    "variable1": "abcdef",
    "variable2": "12345"
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
  "backoffLimit": 0,
  "runOnSourceChange": "never",
  "activeDeadlineSeconds": 600,
  "schedule": "30 8 * * *",
  "suspended": false,
  "concurrencyPolicy": "forbid"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/cron/{jobId}', {
  method: 'PATCH',
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/cron/{jobId}"

payload = {"description":"A job description","billing":{"buildPlan":"nf-compute-200-8","deploymentPlan":"nf-compute-20"},"buildConfiguration":{"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}},"buildpack":{"builder":"HEROKU_24","buildpackLocators":["https://buildpack-registry.heroku.com/cnb/mars/create-react-app"],"buildContext":"/","useCache":false}},"runtimeEnvironment":{"variable1":"abcdef","variable2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"buildArguments":{"variable1":"abcdef","variable2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}],"backoffLimit":0,"runOnSourceChange":"never","activeDeadlineSeconds":600,"schedule":"30 8 * * *","suspended":false,"concurrencyPolicy":"forbid"}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PATCH", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/cron/{jobId}"

  var jsonStr = []byte(`{"description":"A job description","billing":{"buildPlan":"nf-compute-200-8","deploymentPlan":"nf-compute-20"},"buildConfiguration":{"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}},"buildpack":{"builder":"HEROKU_24","buildpackLocators":["https://buildpack-registry.heroku.com/cnb/mars/create-react-app"],"buildContext":"/","useCache":false}},"runtimeEnvironment":{"variable1":"abcdef","variable2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"buildArguments":{"variable1":"abcdef","variable2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}],"backoffLimit":0,"runOnSourceChange":"never","activeDeadlineSeconds":600,"schedule":"30 8 * * *","suspended":false,"concurrencyPolicy":"forbid"}`)
  req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details about the updated job.

```json
{
  "data": {
    "name": "Example Job",
    "description": "A job description",
    "billing": {
      "buildPlan": "nf-compute-200-8",
      "deploymentPlan": "nf-compute-20"
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
    "runtimeEnvironment": {
      "variable1": "abcdef",
      "variable2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "buildArguments": {
      "variable1": "abcdef",
      "variable2": "12345"
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
    "backoffLimit": 0,
    "runOnSourceChange": "never",
    "activeDeadlineSeconds": 600,
    "schedule": "30 8 * * *",
    "suspended": false,
    "concurrencyPolicy": "forbid",
    "jobType": "cron",
    "id": "example-job",
    "appId": "/example-user/default-project/example-job",
    "deployment": {
      "docker": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "vcs": {
        "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
        "projectType": "github",
        "accountLogin": "github-user",
        "projectBranch": "master"
      },
      "external": {
        "imagePath": "nginx:latest",
        "credentials": "example-credentials"
      },
      "internal": {
        "id": "example-build-service",
        "branch": "master",
        "buildId": "premium-guide-6393"
      }
    },
    "status": {
      "build": {
        "status": "SUCCESS",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      }
    },
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  }
}
```

### CLI reference

$ northflank patch job cron

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "description": "A job description",
  "billing": {
    "buildPlan": "nf-compute-200-8",
    "deploymentPlan": "nf-compute-20"
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
    },
    "buildpack": {
      "builder": "HEROKU_24",
      "buildpackLocators": [
        "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
      ],
      "buildContext": "/",
      "useCache": false
    }
  },
  "runtimeEnvironment": {
    "variable1": "abcdef",
    "variable2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "buildArguments": {
    "variable1": "abcdef",
    "variable2": "12345"
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
  "backoffLimit": 0,
  "runOnSourceChange": "never",
  "activeDeadlineSeconds": 600,
  "schedule": "30 8 * * *",
  "suspended": false,
  "concurrencyPolicy": "forbid"
}
```

#### Example Response

 Details about the updated job.

```json
{
  "name": "Example Job",
  "description": "A job description",
  "billing": {
    "buildPlan": "nf-compute-200-8",
    "deploymentPlan": "nf-compute-20"
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
  "runtimeEnvironment": {
    "variable1": "abcdef",
    "variable2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  },
  "buildArguments": {
    "variable1": "abcdef",
    "variable2": "12345"
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
  "backoffLimit": 0,
  "runOnSourceChange": "never",
  "activeDeadlineSeconds": 600,
  "schedule": "30 8 * * *",
  "suspended": false,
  "concurrencyPolicy": "forbid",
  "jobType": "cron",
  "id": "example-job",
  "appId": "/example-user/default-project/example-job",
  "deployment": {
    "docker": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "vcs": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user",
      "projectBranch": "master"
    },
    "external": {
      "imagePath": "nginx:latest",
      "credentials": "example-credentials"
    },
    "internal": {
      "id": "example-build-service",
      "branch": "master",
      "buildId": "premium-guide-6393"
    }
  },
  "status": {
    "build": {
      "status": "SUCCESS",
      "lastTransitionTime": "2021-11-29T11:47:16.624Z"
    }
  },
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.patch.job.cron({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "description": "A job description",
    "billing": {
      "buildPlan": "nf-compute-200-8",
      "deploymentPlan": "nf-compute-20"
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
      },
      "buildpack": {
        "builder": "HEROKU_24",
        "buildpackLocators": [
          "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
        ],
        "buildContext": "/",
        "useCache": false
      }
    },
    "runtimeEnvironment": {
      "variable1": "abcdef",
      "variable2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "buildArguments": {
      "variable1": "abcdef",
      "variable2": "12345"
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
    "backoffLimit": 0,
    "runOnSourceChange": "never",
    "activeDeadlineSeconds": 600,
    "schedule": "30 8 * * *",
    "suspended": false,
    "concurrencyPolicy": "forbid"
  }
});
```

#### Example Response

 Details about the updated job.

```json
{
  "data": {
    "name": "Example Job",
    "description": "A job description",
    "billing": {
      "buildPlan": "nf-compute-200-8",
      "deploymentPlan": "nf-compute-20"
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
    "runtimeEnvironment": {
      "variable1": "abcdef",
      "variable2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "buildArguments": {
      "variable1": "abcdef",
      "variable2": "12345"
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
    "backoffLimit": 0,
    "runOnSourceChange": "never",
    "activeDeadlineSeconds": 600,
    "schedule": "30 8 * * *",
    "suspended": false,
    "concurrencyPolicy": "forbid",
    "jobType": "cron",
    "id": "example-job",
    "appId": "/example-user/default-project/example-job",
    "deployment": {
      "docker": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "vcs": {
        "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
        "projectType": "github",
        "accountLogin": "github-user",
        "projectBranch": "master"
      },
      "external": {
        "imagePath": "nginx:latest",
        "credentials": "example-credentials"
      },
      "internal": {
        "id": "example-build-service",
        "branch": "master",
        "buildId": "premium-guide-6393"
      }
    },
    "status": {
      "build": {
        "status": "SUCCESS",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      }
    },
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
