# Create workflow

Source: https://northflank.com/docs/v1/api/project/workflows/create-workflow.md

Create a workflow

Required permission: Project > Workflows > General > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

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
- `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
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
- `options`: {object}
  - `autorun`: (boolean) If true, the template will run automatically whenever a change is made to it.
  - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
- `teardownSpec`: {object}
  - `spec`: (undefined) (required) The root node of the teardown workflow.
  - `failurePolicy`: (string) Controls what happens if the teardown spec fails or times out. `ignore` (default) — proceed with resource deletion regardless. `block` — halt deletion and set the environment to `teardown_failed` (enum: ignore, block)
- `argumentOverrides`: {object}
- `crossProjectAccess`: {object}
  - `enabled`: (boolean) (required) Allow this workflow to be run from other projects.
  - `projects`: [array of] (string) (pattern: ^[A-Za-z0-9-]+$)
  - `isAllowList`: (boolean) (required) If true, only the listed projects can run this workflow. If false, all projects except the listed ones can run this workflow.
- `stageId`: (multiple options) (string) ID of the stage (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100) | (string) A string containing one or more references that resolve to iD of the stage (pattern: .*\${.*}.*)
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

POST /v1/projects/{projectId}/workflows

POST /v1/teams/{teamId}/projects/{projectId}/workflows

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"richInputs":[{"kind":"BranchCommitSelector","spec":{"required":false,"inputs":{"source":"build-service"},"outputs":{"branch":"TARGET_BRANCH","buildSha":"TARGET_COMMIT"}}}],"options":{"autorun":false,"concurrencyPolicy":"allow"},"crossProjectAccess":{"projects":["example-project"]},"triggers":[{"spec":{"vcs":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo"},"commitMessageFlags":{"flags":["[skip ci]"]},"filePaths":{"paths":["README.md"]}}}]}' \
  https://api.northflank.com/v1/projects/{projectId}/workflows
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
  "options": {
    "autorun": false,
    "concurrencyPolicy": "allow"
  },
  "crossProjectAccess": {
    "projects": [
      "example-project"
    ]
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

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/workflows', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/workflows"

payload = {"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"richInputs":[{"kind":"BranchCommitSelector","spec":{"required":false,"inputs":{"source":"build-service"},"outputs":{"branch":"TARGET_BRANCH","buildSha":"TARGET_COMMIT"}}}],"options":{"autorun":false,"concurrencyPolicy":"allow"},"crossProjectAccess":{"projects":["example-project"]},"triggers":[{"spec":{"vcs":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo"},"commitMessageFlags":{"flags":["[skip ci]"]},"filePaths":{"paths":["README.md"]}}}]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/workflows"

  var jsonStr = []byte(`{"gitops":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo","branch":"main","filePath":"/Dockerfile"},"richInputs":[{"kind":"BranchCommitSelector","spec":{"required":false,"inputs":{"source":"build-service"},"outputs":{"branch":"TARGET_BRANCH","buildSha":"TARGET_COMMIT"}}}],"options":{"autorun":false,"concurrencyPolicy":"allow"},"crossProjectAccess":{"projects":["example-project"]},"triggers":[{"spec":{"vcs":{"vcsService":"github","accountLogin":"github-user","repoUrl":"https://github.com/northflank-examples/remix-postgres-redis-demo"},"commitMessageFlags":{"flags":["[skip ci]"]},"filePaths":{"paths":["README.md"]}}}]}`)
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

$ northflank create workflow

Options:

- `--projectId <projectId>`: ID of the project

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
  "options": {
    "autorun": false,
    "concurrencyPolicy": "allow"
  },
  "crossProjectAccess": {
    "projects": [
      "example-project"
    ]
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
await apiClient.create.workflow({
  parameters: {
    "projectId": "default-project"
  },
  data: {
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
    "options": {
      "autorun": false,
      "concurrencyPolicy": "allow"
    },
    "crossProjectAccess": {
      "projects": [
        "example-project"
      ]
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
