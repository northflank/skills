# List team roles

Source: https://northflank.com/docs/v1/api/team/team-roles/list-team-roles.md

Gets a list of platform roles for a team.

Required permission: Account > Admin > Roles > Read

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `roles`: [array of] {object}
     - `id`: (string) (required) ID of the role. (pattern: ^[A-Za-z0-9-]+$)
     - `name`: (string) (required) Display name of the role.
     - `description`: (string) Description of the role.
     - `restrictions`: {object}
       - `enabled`: (boolean) (required)
       - `projects`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
       - `restrictionMode`: (string) (enum: in, notIn)
     - `createdAt`: (string) Creation time. (format: date-time)
     - `updatedAt`: (string) Last updated. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/teams/{teamId}/roles

#### Example Response

200 OK: A list of platform roles for the team.

```json
{
  "data": {
    "roles": [
      {
        "id": "developer",
        "name": "Developer",
        "description": "Role for developers.",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "updatedAt": "2021-01-20T11:19:53.175Z"
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

$ northflank list team-roles

Options:

- `--teamId <teamId>`: ID of the team

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of platform roles for the team.

```json
{
  "roles": [
    {
      "id": "developer",
      "name": "Developer",
      "description": "Role for developers.",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "updatedAt": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.teamRoles({
  parameters: {
    "teamId": "my-team"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of platform roles for the team.

```json
{
  "data": {
    "roles": [
      {
        "id": "developer",
        "name": "Developer",
        "description": "Role for developers.",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "updatedAt": "2021-01-20T11:19:53.175Z"
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
