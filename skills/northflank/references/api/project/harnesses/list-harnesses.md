# List harnesses

Source: https://northflank.com/docs/v1/api/project/harnesses/list-harnesses.md

Gets a list of harnesses belonging to the project

Required permission: Project > Harnesses > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)
- `projectUrl`: (string) If provided, only returns harnesses whose source repository URL matches this value.
- `projectType`: (string) If provided, only returns harnesses whose source VCS provider matches this value. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
- `projectBranch`: (string) If provided, only returns harnesses whose source branch matches this value.

**Response body:**

{object}
- `data`: {object}
  - `harnesses`: [array of] {object}
     - `id`: (string) (required) Identifier for the harness.
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `name`: (string) (required) Harness name.
     - `appId`: (string) (required) Full identifier for the harness.
     - `tags`: [array of] (string)
     - `private`: (boolean) Whether runtime access is restricted to the creator.
     - `description`: (string) A short description of the harness.
     - `harness`: {object}
       - `type`: (string) (required) The harness environment type. (enum: codex, claude, pi, omp, devin, opencode, cursor, none)
     - `source`: {object}
       - `projectUrl`: (string) URL of the git repository pre-pulled into the harness environment.
       - `projectType`: (string) The VCS provider of the harness source.
       - `projectBranch`: (string) The branch of the harness source.
     - `status`: {object}
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/harnesses

GET /v1/teams/{teamId}/projects/{projectId}/harnesses

#### Example Response

200 OK: A list of harnesses belonging to the project.

```json
{
  "data": {
    "harnesses": [
      {
        "id": "example-harness",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "name": "Example Harness",
        "appId": "/example-user/default-project/example-harness",
        "description": "This is the harness description",
        "harness": {
          "type": "claude"
        },
        "source": {
          "projectUrl": "https://github.com/northflank-examples/next-js-example",
          "projectType": "github",
          "projectBranch": "main"
        }
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

$ northflank list harnesses

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--projectUrl <projectUrl>`: If provided, only returns harnesses whose source repository URL matches this value.

- `--projectType <projectType>`: If provided, only returns harnesses whose source VCS provider matches this value.

- `--projectBranch <projectBranch>`: If provided, only returns harnesses whose source branch matches this value.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of harnesses belonging to the project.

```json
{
  "harnesses": [
    {
      "id": "example-harness",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "name": "Example Harness",
      "appId": "/example-user/default-project/example-harness",
      "description": "This is the harness description",
      "harness": {
        "type": "claude"
      },
      "source": {
        "projectUrl": "https://github.com/northflank-examples/next-js-example",
        "projectType": "github",
        "projectBranch": "main"
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.harnesses({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "projectUrl": "https://github.com/northflank-examples/next-js-example",
    "projectType": "github",
    "projectBranch": "main"
  }
});
```

#### Example Response

 A list of harnesses belonging to the project.

```json
{
  "data": {
    "harnesses": [
      {
        "id": "example-harness",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "name": "Example Harness",
        "appId": "/example-user/default-project/example-harness",
        "description": "This is the harness description",
        "harness": {
          "type": "claude"
        },
        "source": {
          "projectUrl": "https://github.com/northflank-examples/next-js-example",
          "projectType": "github",
          "projectBranch": "main"
        }
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

response = client.list.harnesses(
    project_id="default-project",
    page=1,
    per_page=50,
    project_branch="main",
    project_type="github",
    project_url="https://github.com/northflank-examples/next-js-example",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "harnesses": [
    {
      "id": "example-harness",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "name": "Example Harness",
      "appId": "/example-user/default-project/example-harness",
      "description": "This is the harness description",
      "harness": {
        "type": "claude"
      },
      "source": {
        "projectUrl": "https://github.com/northflank-examples/next-js-example",
        "projectType": "github",
        "projectBranch": "main"
      }
    }
  ]
}
```
