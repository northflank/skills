# List projects

Source: https://northflank.com/docs/v1/api/team/projects/list-projects.md

Lists projects for the authenticated user or team.

Required permission: Project > Projects > Manage > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `projects`: [array of] {object}
     - `id`: (string) (required) Identifier for the project.
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
      "name": "Default Project",
      "description": "The project description"
    }
  ]
}
```

### JavaScript client reference

#### Example request

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
