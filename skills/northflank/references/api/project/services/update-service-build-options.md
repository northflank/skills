# Update service build options

Source: https://northflank.com/docs/v1/api/project/services/update-service-build-options.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /services/patch-combined-service instead](patch-combined-service.md)

Updates the build options for a given service.

Required permission: Project > Services > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `dockerfile`: {object}
  - `buildEngine`: (string) Build engine to use. Defaults to recommended build engine `buildkit` (enum: buildkit, kaniko)
  - `dockerFilePath`: (string) The file path of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
  - `dockerWorkDir`: (string) The working directory of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
  - `buildkit`: {object}
    - `useCache`: (boolean) Use persistent storage to cache build layers.
    - `cacheStorageSize`: (integer) The amount of persistent storage available to each build in MB.
    - `useInternalCache`: (boolean) DEPRECATED: This field will be removed in the near future.
    - `internalCacheStorage`: (integer) DEPRECATED: This field will be removed in the near future.
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

OR

{object}
- `buildpack`: {object}
  - `builder`: (string) Buildpack stack to use. Defaults to recommended stack `HEROKU_24`. (enum: HEROKU_24, HEROKU_22, HEROKU_22_CLASSIC, HEROKU_20, HEROKU_18, GOOGLE_22, GOOGLE_V1, CNB_ALPINE, CNB_BIONIC, PAKETO_JAMMY_TINY, PAKETO_JAMMY_BASE, PAKETO_JAMMY_FULL, PAKETO_TINY, PAKETO_BASE, PAKETO_FULL)
  - `buildpackLocators`: [array of] (string) Url or registry identifier of custom buildpack.
  - `buildContext`: (string) The working directory to build in. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
  - `useCache`: (boolean) Should build dependencies be cached?
- `pathIgnoreRules`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
- `isAllowList`: (boolean) If `true`, the functionality of `pathIgnoreRules` will be inverted. A commit will only be built if a file has been changed that matches one or more of the rules in `pathIgnoreRules`.
- `ciIgnoreFlagsEnabled`: (boolean) If `true`, enables commit ignore flags. If a commit message contains one or more of the flags in `ciIgnoreFlags`, that commit will not be built.
- `ciIgnoreFlags`: [array of] (string) A commit ignore flag. (max length: 72)

OR

{object}
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

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/build-options

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-options

#### Example request

Request body

Build from a Dockerfile

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/"},"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options
```

```javascript
const payload = {
  "dockerfile": {
    "buildEngine": "buildkit",
    "dockerFilePath": "/Dockerfile",
    "dockerWorkDir": "/"
  },
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
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options"

payload = {"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/"},"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options"

  var jsonStr = []byte(`{"dockerfile":{"buildEngine":"buildkit","dockerFilePath":"/Dockerfile","dockerWorkDir":"/"},"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}}`)
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

OR

Build from a Buildpack

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"buildpack":{"builder":"HEROKU_24","buildpackLocators":["https://buildpack-registry.heroku.com/cnb/mars/create-react-app"],"buildContext":"/","useCache":false},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"]}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options
```

```javascript
const payload = {
  "buildpack": {
    "builder": "HEROKU_24",
    "buildpackLocators": [
      "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
    ],
    "buildContext": "/",
    "useCache": false
  },
  "pathIgnoreRules": [
    "README.md"
  ],
  "isAllowList": false,
  "ciIgnoreFlags": [
    "[skip ci]"
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options"

payload = {"buildpack":{"builder":"HEROKU_24","buildpackLocators":["https://buildpack-registry.heroku.com/cnb/mars/create-react-app"],"buildContext":"/","useCache":false},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options"

  var jsonStr = []byte(`{"buildpack":{"builder":"HEROKU_24","buildpackLocators":["https://buildpack-registry.heroku.com/cnb/mars/create-react-app"],"buildContext":"/","useCache":false},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"]}`)
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

OR

Don't modify build type settings

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options
```

```javascript
const payload = {
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
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options"

payload = {"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build-options"

  var jsonStr = []byte(`{"prRestrictions":["feature/*"],"branchRestrictions":["feature/*"],"crossProjectAccess":{"enabled":true,"projects":["example-project"]},"pathIgnoreRules":["README.md"],"isAllowList":false,"ciIgnoreFlags":["[skip ci]"],"dockerCredentials":["example-docker-credential"],"storage":{"ephemeralStorage":{"storageSize":16384}}}`)
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

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank update service build-options

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

Build from a Dockerfile

```json
{
  "dockerfile": {
    "buildEngine": "buildkit",
    "dockerFilePath": "/Dockerfile",
    "dockerWorkDir": "/"
  },
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
}
```

OR

Build from a Buildpack

```json
{
  "buildpack": {
    "builder": "HEROKU_24",
    "buildpackLocators": [
      "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
    ],
    "buildContext": "/",
    "useCache": false
  },
  "pathIgnoreRules": [
    "README.md"
  ],
  "isAllowList": false,
  "ciIgnoreFlags": [
    "[skip ci]"
  ]
}
```

OR

Don't modify build type settings

```json
{
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
}
```

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

Request body

Build from a Dockerfile

```javascript
await apiClient.update.service.buildOptions({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "dockerfile": {
      "buildEngine": "buildkit",
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/"
    },
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
  }
});
```

OR

Build from a Buildpack

```javascript
await apiClient.update.service.buildOptions({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "buildpack": {
      "builder": "HEROKU_24",
      "buildpackLocators": [
        "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
      ],
      "buildContext": "/",
      "useCache": false
    },
    "pathIgnoreRules": [
      "README.md"
    ],
    "isAllowList": false,
    "ciIgnoreFlags": [
      "[skip ci]"
    ]
  }
});
```

OR

Don't modify build type settings

```javascript
await apiClient.update.service.buildOptions({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
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
  }
});
```

#### Example Response

 The operation was performed successfully.

```json
{
  "data": {},
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
