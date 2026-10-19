# List addons

Source: https://northflank.com/docs/v1/api/project/addons/list-addons.md

Gets a list of addons belonging to the project

Required permission: Project > Addons > General > Read

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
  - `addons`: [array of] {object}
     - `id`: (string) (required) Identifier for the addon.
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `name`: (string) (required) Addon name.
     - `appId`: (string) (required) Full identifier for the addon.
     - `stageId`: (string) ID of the environment the addon belongs to.
     - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) A short description of the addon.
     - `spec`: {object}
       - `type`: (string) (required) The type of the addon
     - `status`: (string) (required) The current state of the addon. (enum: preDeployment, triggerAllocation, allocating, postDeployment, running, paused, scaling, upgrading, resetting, backup, restore, failed, error, errorAllocating, deleting, deleted)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/addons

GET /v1/teams/{teamId}/projects/{projectId}/addons

#### Example Response

200 OK: A list of addons belonging to the project.

```json
{
  "data": {
    "addons": [
      {
        "id": "example-addon",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "name": "Example Addon",
        "appId": "/example-user/default-project/example-job",
        "stageId": "staging",
        "description": "This is the addon description",
        "spec": {
          "type": "mongodb"
        },
        "status": "running"
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

$ northflank list addons

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of addons belonging to the project.

```json
{
  "addons": [
    {
      "id": "example-addon",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "name": "Example Addon",
      "appId": "/example-user/default-project/example-job",
      "stageId": "staging",
      "description": "This is the addon description",
      "spec": {
        "type": "mongodb"
      },
      "status": "running"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.addons({
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

 A list of addons belonging to the project.

```json
{
  "data": {
    "addons": [
      {
        "id": "example-addon",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "name": "Example Addon",
        "appId": "/example-user/default-project/example-job",
        "stageId": "staging",
        "description": "This is the addon description",
        "spec": {
          "type": "mongodb"
        },
        "status": "running"
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

response = client.list.addons(
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
  "addons": [
    {
      "id": "example-addon",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "name": "Example Addon",
      "appId": "/example-user/default-project/example-job",
      "stageId": "staging",
      "description": "This is the addon description",
      "spec": {
        "type": "mongodb"
      },
      "status": "running",
      "tags": []
    }
  ]
}
```
