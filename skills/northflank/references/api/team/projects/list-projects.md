# List projects

Source: https://northflank.com/docs/v1/api/team/projects/list-projects.md

Lists projects for the authenticated user or team.

Required permission: Project > Projects > Manage > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `projects`: [array of] {object}
     - `id`: (string) (required) Identifier for the project.
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `lifecycleStatus`: (string) (required) Status of resource on the platform (enum: pending_initialization, creating, created, creation_failed, upgrading, upgrade_failed, migration_pending, migrating, migration_failed, deleting, deletion_failed, deleted, cluster_deleted, initializing, tearing_down, teardown_failed)
     - `name`: (string) (required) The name of the project.
     - `description`: (string) A short description of the project.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects

GET /v1/teams/{teamId}/projects

#### Example Response

200 OK: A list of projects for the authenticated user

```json
{
  "data": {
    "projects": [
      {
        "id": "default-project",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "lifecycleStatus": "creating",
        "name": "Default Project",
        "description": "The project description"
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

$ northflank list projects

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of projects for the authenticated user

```json
{
  "projects": [
    {
      "id": "default-project",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "lifecycleStatus": "creating",
      "name": "Default Project",
      "description": "The project description"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.projects({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of projects for the authenticated user

```json
{
  "data": {
    "projects": [
      {
        "id": "default-project",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "lifecycleStatus": "creating",
        "name": "Default Project",
        "description": "The project description"
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

response = client.list.projects(
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "projects": [
    {
      "id": "default-project",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "lifecycleStatus": "creating",
      "name": "Default Project",
      "description": "The project description"
    }
  ]
}
```
