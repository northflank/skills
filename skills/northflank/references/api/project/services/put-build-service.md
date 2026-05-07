# Put build service

Source: https://northflank.com/docs/v1/api/project/services/put-build-service.md

Creates or updates a build service.

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
  - `deploymentPlan`: (string) The ID of the deployment plan to use. (Deprecated - use buildPlan for build resources instead.). (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `buildPlan`: (string) The ID of the build plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `gpu`: {object}
    - `enabled`: (boolean)
    - `configuration`: {object}
      - `gpuType`: (string) (required)
      - `gpuCount`: (integer)
      - `timesliced`: (boolean)
- `infrastructure`: {object}
  - `architecture`: (string) (enum: x86, arm)
- `disabledCI`: (boolean) Whether CI (continuous integration) should be disabled.
- `buildSource`: (string) Defines the build source for this resource (enum: git, bundle)
- `vcsData`: {object}
  - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
  - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
  - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
  - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
  - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
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
  - `prRestrictions`: [array of] (string) A pull request build rule. Can contain `*` as a wildcard to match multiple branch names. For example, `feature/*` will build all commits from pull requests from branches that start with `feature/`. (pattern: ^[^?:@$~ [\]{}]*$)
  - `branchRestrictions`: [array of] (string) A branch build rule. Can contain `*` as a wildcard to match multiple branch names. For example, `feature/*` will build all commits from branches that start with `feature/`. (pattern: ^[^?:@$~ [\]{}]*$)
  - `crossProjectAccess`: {object}
    - `enabled`: (boolean) (required) Allow this build service to be referenced by resources in other projects.
    - `projects`: [array of] (string) The ID of a project to include or exclude. (pattern: ^[A-Za-z0-9-]+$)
    - `isAllowList`: (boolean) (required) If true, only the listed projects can use this build service. If false, all projects except the listed ones can use this build service.
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
- `buildArguments`: {object}
- `buildFiles`: {object}
- `dockerSecretMounts`: {object}

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the service. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54)
  - `description`: (string) A description of the service. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `billing`: {object}
    - `deploymentPlan`: (string) The ID of the deployment plan to use. (Deprecated - use buildPlan for build resources instead.). (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `buildPlan`: (string) The ID of the build plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `gpu`: {object}
      - `enabled`: (boolean)
      - `configuration`: {object}
        - `gpuType`: (string) (required)
        - `gpuCount`: (integer)
        - `timesliced`: (boolean)
  - `infrastructure`: {object}
    - `architecture`: (string) (enum: x86, arm)
  - `disabledCI`: (boolean) Whether CI (continuous integration) should be disabled.
  - `buildSource`: (string) Defines the build source for this resource (enum: git, bundle)
  - `vcsData`: {object}
    - `projectUrl`: (string) (required) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
    - `projectType`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use.
    - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
    - `vcsLinkId`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `vcsLinkId` is provided, Northflank will instead use your linked account with that ID. (min length: 24) (max length: 24)
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
    - `prRestrictions`: [array of] (string) A pull request build rule. Can contain `*` as a wildcard to match multiple branch names. For example, `feature/*` will build all commits from pull requests from branches that start with `feature/`. (pattern: ^[^?:@$~ [\]{}]*$)
    - `branchRestrictions`: [array of] (string) A branch build rule. Can contain `*` as a wildcard to match multiple branch names. For example, `feature/*` will build all commits from branches that start with `feature/`. (pattern: ^[^?:@$~ [\]{}]*$)
    - `crossProjectAccess`: {object}
      - `enabled`: (boolean) (required) Allow this build service to be referenced by resources in other projects.
      - `projects`: [array of] (string) The ID of a project to include or exclude. (pattern: ^[A-Za-z0-9-]+$)
      - `isAllowList`: (boolean) (required) If true, only the listed projects can use this build service. If false, all projects except the listed ones can use this build service.
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
  - `buildArguments`: {object}
  - `buildFiles`: {object}
  - `dockerSecretMounts`: {object}
  - `serviceType`: (string) (required) Type of the service (combined, build or deployment) (enum: build)
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

### API reference

PUT /v1/projects/{projectId}/services/build

PUT /v1/teams/{teamId}/projects/{projectId}/services/build

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"name":"Example Service","description":"A service description","billing":{"deploymentPlan":"nf-compute-20","buildPlan":"nf-compute-200-8"},"buildSource":"git","vcsData":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user"},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}}},"buildConfiguration":{"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/build
```

```javascript
const payload = {
  "name": "Example Service",
  "description": "A service description",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "buildPlan": "nf-compute-200-8"
  },
  "buildSource": "git",
  "vcsData": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user"
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
    "prRestrictions": [
      "feature/*"
    ],
    "branchRestrictions": [
      "feature/*"
    ],
    "crossProjectAccess": {
      "enabled": true,
      "projects": [
        "example-project"
      ]
    },
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
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/build', {
  method: 'PUT',
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/build"

payload = {"name":"Example Service","description":"A service description","billing":{"deploymentPlan":"nf-compute-20","buildPlan":"nf-compute-200-8"},"buildSource":"git","vcsData":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user"},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}}},"buildConfiguration":{"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/build"

  var jsonStr = []byte(`{"name":"Example Service","description":"A service description","billing":{"deploymentPlan":"nf-compute-20","buildPlan":"nf-compute-200-8"},"buildSource":"git","vcsData":{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","accountLogin":"github-user"},"buildSettings":{"storage":{"ephemeralStorage":{"storageSize":16384}},"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/","buildkit":{"useCache":true,"cacheStorageSize":32768}}},"buildConfiguration":{"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}},"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details about the created or updated service.

```json
{
  "data": {
    "name": "Example Service",
    "description": "A service description",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "buildPlan": "nf-compute-200-8"
    },
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user"
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
      "prRestrictions": [
        "feature/*"
      ],
      "branchRestrictions": [
        "feature/*"
      ],
      "crossProjectAccess": {
        "enabled": true,
        "projects": [
          "example-project"
        ]
      },
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
    "serviceType": "build",
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
      }
    }
  }
}
```

### CLI reference

$ northflank put service build

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
  "buildSource": "git",
  "vcsData": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user"
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
    "prRestrictions": [
      "feature/*"
    ],
    "branchRestrictions": [
      "feature/*"
    ],
    "crossProjectAccess": {
      "enabled": true,
      "projects": [
        "example-project"
      ]
    },
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
  }
}
```

#### Example Response

 Details about the created or updated service.

```json
{
  "name": "Example Service",
  "description": "A service description",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "buildPlan": "nf-compute-200-8"
  },
  "buildSource": "git",
  "vcsData": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "accountLogin": "github-user"
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
    "prRestrictions": [
      "feature/*"
    ],
    "branchRestrictions": [
      "feature/*"
    ],
    "crossProjectAccess": {
      "enabled": true,
      "projects": [
        "example-project"
      ]
    },
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
  "serviceType": "build",
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
    }
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.put.service.build({
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
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user"
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
      "prRestrictions": [
        "feature/*"
      ],
      "branchRestrictions": [
        "feature/*"
      ],
      "crossProjectAccess": {
        "enabled": true,
        "projects": [
          "example-project"
        ]
      },
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
    }
  }
});
```

#### Example Response

 Details about the created or updated service.

```json
{
  "data": {
    "name": "Example Service",
    "description": "A service description",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "buildPlan": "nf-compute-200-8"
    },
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "accountLogin": "github-user"
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
      "prRestrictions": [
        "feature/*"
      ],
      "branchRestrictions": [
        "feature/*"
      ],
      "crossProjectAccess": {
        "enabled": true,
        "projects": [
          "example-project"
        ]
      },
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
    "serviceType": "build",
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
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
