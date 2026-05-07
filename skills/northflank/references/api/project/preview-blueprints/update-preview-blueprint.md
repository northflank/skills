# Update preview blueprint

Source: https://northflank.com/docs/v1/api/project/preview-blueprints/update-preview-blueprint.md

Updates a preview blueprint

Required permission: Project > PreviewBlueprints > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `previewBlueprintId`: (string) (required) ID of the preview blueprint

**Request body:**

{object}
- `arguments`: {object}
- `gitops`: {object}
  - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
  - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
  - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
  - `vcsLinkId`: (string) Legacy key. Please used accountLogin instead.
  - `repoUrl`: (string) (required) URL of the Git repo to sync the file with. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
  - `branch`: (string) (required) The name of the branch to use.
  - `filePath`: (string) (required) The file path in the repository. If using an existing file, it should be in JSON format. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
- `$schema`: (string)
- `name`: (multiple options) (string) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) (pattern: .*\${.*}.*)
- `description`: (multiple options) (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200) | (string) (pattern: .*\${.*}.*)
- `options`: {object}
  - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
  - `nameFormat`: (string) The format of the automatically generated preview name. This is a parsed ref string.
  - `prefixName`: (boolean) If true, the preview name will default to the front of the resource name.
  - `useBranchContents`: (boolean) If true, and gitops is enabled, the preview will run based on the contents of the branch that triggered it, rather than the set branch.
  - `schedule`: {object}
    - `mon`: {object}
      - `startTime`: (integer)
      - `endTime`: (integer)
    - `tue`: {object}
      - `startTime`: (integer)
      - `endTime`: (integer)
    - `wed`: {object}
      - `startTime`: (integer)
      - `endTime`: (integer)
    - `thu`: {object}
      - `startTime`: (integer)
      - `endTime`: (integer)
    - `fri`: {object}
      - `startTime`: (integer)
      - `endTime`: (integer)
    - `sat`: {object}
      - `startTime`: (integer)
      - `endTime`: (integer)
    - `sun`: {object}
      - `startTime`: (integer)
      - `endTime`: (integer)
  - `expiry`: {object}
    - `previewLifetime`: (integer) If set, preview environments will be automatically deleted after this many minutes since their last update.
    - `resetOnUpdate`: (boolean) If `true`, the expiry time for an existing preview will be reset when it is ran again.
  - `autorun`: (boolean) If true, the template will run automatically whenever a change is made to it.
- `argumentOverrides`: {object}
- `teardownSpec`: {object}
  - `spec`: (undefined) (required) The root node of the teardown workflow.
  - `failurePolicy`: (string) Controls what happens if the teardown spec fails or times out. `ignore` (default) — proceed with resource deletion regardless. `block` — halt deletion and set the environment to `teardown_failed` (enum: ignore, block)
- `triggers`: [array of] (multiple options) {object}
    - `kind`: (string) (required) (enum: vcs-push)
    - `spec`: {object}
      - `vcs`: {object}
        - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
        - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
        - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
        - `vcsLinkId`: (string)
        - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
      - `branchNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
      - `commitMessageFlags`: {object}
        - `enabled`: (boolean)
        - `flags`: [array of] (string) A commit ignore flag. (max length: 72)
      - `filePaths`: {object}
        - `enabled`: (boolean)
        - `allowList`: (boolean)
        - `paths`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
    - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
    - `id`: (string) | {object}
    - `kind`: (string) (required) (enum: vcs-pr)
    - `spec`: {object}
      - `vcs`: {object}
        - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
        - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
        - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
        - `vcsLinkId`: (string)
        - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
      - `branchNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
      - `commitMessageFlags`: {object}
        - `enabled`: (boolean)
        - `flags`: [array of] (string) A commit ignore flag. (max length: 72)
      - `filePaths`: {object}
        - `enabled`: (boolean)
        - `allowList`: (boolean)
        - `paths`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
      - `ignoreDrafts`: (boolean) If `true`, draft pull requests from this repo will not trigger the template.
    - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
    - `id`: (string) | {object}
    - `kind`: (string) (required) (enum: webhook)
    - `spec`: {object}
      - `token`: (string) (required)
    - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
    - `id`: (string) | {object}
    - `kind`: (string) (required) (enum: vcs-release)
    - `spec`: {object}
      - `vcs`: {object}
        - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
        - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
        - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
        - `vcsLinkId`: (string)
        - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
    - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
    - `id`: (string) | {object}
    - `kind`: (string) (required) (enum: vcs-pr-label)
    - `spec`: {object}
      - `vcs`: {object}
        - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
        - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
        - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
        - `vcsLinkId`: (string)
        - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
      - `labelNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
      - `branchNamePatterns`: {object}
        - `enabled`: (boolean)
        - `names`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
      - `commitMessageFlags`: {object}
        - `enabled`: (boolean)
        - `flags`: [array of] (string) A commit ignore flag. (max length: 72)
      - `filePaths`: {object}
        - `enabled`: (boolean)
        - `allowList`: (boolean)
        - `paths`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
      - `ignoreDrafts`: (boolean) If `true`, draft pull requests from this repo will not trigger the template.
    - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
    - `id`: (string) | {object}
    - `kind`: (string) (required) (enum: cron)
    - `spec`: {object}
      - `cron`: (string) (required) A cron expression that defines the schedule on which the template will be executed.
    - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
    - `id`: (string)
- `apiVersion`: (string) (required)
- `project`: {object}
- `spec`: {object}

### API reference

POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}

POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"options":{"concurrencyPolicy":"allow","autorun":false},"triggers":[{"spec":{"vcs":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo"},"commitMessageFlags":{"flags":["[skip ci]"]},"filePaths":{"paths":["README.md"]}}}]}' \
  https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}
```

```javascript
const payload = {
  "gitops": {
    "vcsService": "github",
    "accountLogin": "github-user",
    "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
    "branch": "main",
    "filePath": "/Dockerfile"
  },
  "options": {
    "concurrencyPolicy": "allow",
    "autorun": false
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
            "[skip ci]"
          ]
        },
        "filePaths": {
          "paths": [
            "README.md"
          ]
        }
      }
    }
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}"

payload = {"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"options":{"concurrencyPolicy":"allow","autorun":false},"triggers":[{"spec":{"vcs":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo"},"commitMessageFlags":{"flags":["[skip ci]"]},"filePaths":{"paths":["README.md"]}}}]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}"

  var jsonStr = []byte(`{"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"options":{"concurrencyPolicy":"allow","autorun":false},"triggers":[{"spec":{"vcs":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo"},"commitMessageFlags":{"flags":["[skip ci]"]},"filePaths":{"paths":["README.md"]}}}]}`)
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

$ northflank update preview-blueprint

Options:

- `--projectId <projectId>`: ID of the project

- `--previewBlueprintId <previewBlueprintId>`: ID of the preview blueprint

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "gitops": {
    "vcsService": "github",
    "accountLogin": "github-user",
    "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
    "branch": "main",
    "filePath": "/Dockerfile"
  },
  "options": {
    "concurrencyPolicy": "allow",
    "autorun": false
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
            "[skip ci]"
          ]
        },
        "filePaths": {
          "paths": [
            "README.md"
          ]
        }
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.previewBlueprint({
  parameters: {
    "projectId": "default-project",
    "previewBlueprintId": "development"
  },
  data: {
    "gitops": {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "branch": "main",
      "filePath": "/Dockerfile"
    },
    "options": {
      "concurrencyPolicy": "allow",
      "autorun": false
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
              "[skip ci]"
            ]
          },
          "filePaths": {
            "paths": [
              "README.md"
            ]
          }
        }
      }
    ]
  }
});
```
