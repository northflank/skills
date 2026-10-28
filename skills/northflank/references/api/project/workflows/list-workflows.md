# List workflows

Source: https://northflank.com/docs/v1/api/project/workflows/list-workflows.md

Lists all workflows for a project

Required permission: Project > Workflows > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `workflows`: [array of] {object}
     - `apiVersion`: (string) (required) The version of the Northflank API to run the template against. (enum: v1.2)
     - `arguments`: {object}
     - `gitops`: {object}
       - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
       - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
       - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
       - `vcsLinkId`: (string) Legacy key. Please used accountLogin instead.
       - `repoUrl`: (string) (required) URL of the Git repo to sync the file with. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
       - `branch`: (string) (required) The name of the branch to use.
       - `filePath`: (string) (required) The file path in the repository. If using an existing file, it should be in JSON format. (pattern: ^\/((?!\.\.?\/)[a-zA-Z0-9-._]+\/)*(?!\.\.?$)[a-zA-Z0-9-._]+$)
     - `$schema`: (string)
     - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `spec`: (undefined)
     - `richInputs`: [array of] (undefined)
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
               - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
               - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
               - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
               - `vcsLinkId`: (string)
               - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
             - `branchNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
             - `commitMessageFlags`: {object}
               - `enabled`: (boolean)
               - `flags`: [array of] (string) A commit ignore flag. (max length: 72)
             - `filePaths`: {object}
               - `enabled`: (boolean)
               - `allowList`: (boolean)
               - `paths`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
           - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
           - `id`: (string)
           - `paused`: (boolean) | {object}
           - `kind`: (string) (required) (enum: vcs-pr)
           - `spec`: {object}
             - `vcs`: {object}
               - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
               - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
               - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
               - `vcsLinkId`: (string)
               - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
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
           - `id`: (string)
           - `paused`: (boolean) | {object}
           - `kind`: (string) (required) (enum: webhook)
           - `spec`: {object}
             - `token`: (string) (required)
           - `ref`: (string) (required) A reference that can be used to access the output of this trigger in the template.
           - `id`: (string)
           - `paused`: (boolean) | {object}
           - `kind`: (string) (required) (enum: vcs-release)
           - `spec`: {object}
             - `vcs`: {object}
               - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
               - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
               - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
               - `vcsLinkId`: (string)
               - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
           - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
           - `id`: (string)
           - `paused`: (boolean) | {object}
           - `kind`: (string) (required) (enum: vcs-pr-label)
           - `spec`: {object}
             - `vcs`: {object}
               - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
               - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
               - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
               - `vcsLinkId`: (string)
               - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
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
           - `id`: (string)
           - `paused`: (boolean) | {object}
           - `kind`: (string) (required) (enum: vcs-check-suite)
           - `spec`: {object}
             - `vcs`: {object}
               - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
               - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
               - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
               - `vcsLinkId`: (string)
               - `repoUrl`: (string) (required) URL of the Git repo that will trigger the template. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+(\/((?:[a-zA-Z0-9\-._]|%[a-fA-F0-9]{2}){2,}))+?$)
             - `branchNamePatterns`: [array of] (string) (pattern: ^[a-zA-Z/*0-9%\-.#_!'();,&=+]*$)
             - `commitMessageFlags`: {object}
               - `enabled`: (boolean)
               - `flags`: [array of] (string) A commit ignore flag. (max length: 72)
             - `filePaths`: {object}
               - `enabled`: (boolean)
               - `allowList`: (boolean)
               - `paths`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
           - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
           - `id`: (string)
           - `paused`: (boolean) | {object}
           - `kind`: (string) (required) (enum: cron)
           - `spec`: {object}
             - `cron`: (string) (required) A cron expression that defines the schedule on which the template will be executed.
           - `ref`: (string) A reference that can be used to access the output of this trigger in the template.
           - `id`: (string)
           - `paused`: (boolean)
     - `id`: (string) (required) Identifier for the workflow
     - `createdAt`: (string) (required) Timestamp the template was created at. (format: date-time)
     - `updatedAt`: (string) (required) Timestamp the template was last updated at. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/workflows

GET /v1/teams/{teamId}/projects/{projectId}/workflows

#### Example Response

200 OK: A list of workflows that belong to the project.

```json
{
  "data": {
    "workflows": [
      {
        "apiVersion": "v1.2",
        "gitops": {
          "vcsService": "github",
          "accountLogin": "github-user",
          "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
          "branch": "main",
          "filePath": "/Dockerfile"
        },
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
        ],
        "id": "example-workflow",
        "createdAt": "2021-01-01 12:00:00.000Z",
        "updatedAt": "2021-01-01 12:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list workflows

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of workflows that belong to the project.

```json
{
  "workflows": [
    {
      "apiVersion": "v1.2",
      "gitops": {
        "vcsService": "github",
        "accountLogin": "github-user",
        "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
        "branch": "main",
        "filePath": "/Dockerfile"
      },
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
      ],
      "id": "example-workflow",
      "createdAt": "2021-01-01 12:00:00.000Z",
      "updatedAt": "2021-01-01 12:00:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.workflows({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of workflows that belong to the project.

```json
{
  "data": {
    "workflows": [
      {
        "apiVersion": "v1.2",
        "gitops": {
          "vcsService": "github",
          "accountLogin": "github-user",
          "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
          "branch": "main",
          "filePath": "/Dockerfile"
        },
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
        ],
        "id": "example-workflow",
        "createdAt": "2021-01-01 12:00:00.000Z",
        "updatedAt": "2021-01-01 12:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
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

response = client.list.workflows(
    project_id="default-project",
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "workflows": [
    {
      "apiVersion": "v1.2",
      "gitops": {
        "vcsService": "github",
        "accountLogin": "github-user",
        "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
        "branch": "main",
        "filePath": "/Dockerfile"
      },
      "spec": {
        "kind": "RolloutStrategy",
        "spec": {
          "name": "my-canary-rollout",
          "type": "canary",
          "options": {
            "triggers": {
              "releaseFromTemplate": true,
              "releaseFromReleaseFlow": true,
              "releaseFromCD": true,
              "releaseFromUI": true,
              "releaseFromApi": true
            },
            "blockDeploymentOnActiveRollout": true
          },
          "details": {
            "canaryStrategy": "percentage",
            "config": {
              "canaryPercentage": 20,
              "stablePercentage": 80
            }
          }
        },
        "updateMode": "patch"
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
      "options": {
        "autorun": false,
        "concurrencyPolicy": "allow"
      },
      "crossProjectAccess": {
        "projects": [
          "example-project"
        ],
        "enabled": false,
        "isAllowList": false
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
                "[skip ci]",
                "[ci skip]",
                "[no ci]",
                "[skip nf]",
                "[nf skip]",
                "[northflank skip]",
                "[skip northflank]"
              ]
            },
            "filePaths": {
              "paths": [
                "README.md"
              ]
            }
          },
          "kind": "vcs-push"
        }
      ],
      "id": "example-workflow",
      "createdAt": "2021-01-01 12:00:00.000Z",
      "updatedAt": "2021-01-01 12:00:00.000Z",
      "name": "string"
    }
  ]
}
```
