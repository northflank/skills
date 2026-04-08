# Get team role

Source: https://northflank.com/docs/v1/api/team/team-roles/get-team-role.md

Gets details about a specific platform role.

Required permission: Account > Admin > Roles > Read

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team
- `roleId`: (string) (required) ID of the team role

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the role. (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) Display name of the role.
  - `description`: (string) Description of the role.
  - `restrictions`: {object}
    - `enabled`: (boolean) (required)
    - `projects`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
    - `restrictionMode`: (string) (enum: in, notIn)
  - `createdAt`: (string) Creation time. (format: date-time)
  - `updatedAt`: (string) Last updated. (format: date-time)
  - `permissions`: {object}
    - `teamScope`: [array of] (string)
    - `projectScope`: [array of] (string)

### API reference

GET /v1/teams/{teamId}/roles/{roleId}

#### Example Response

200 OK: Details about the team role.

```json
{
  "data": {
    "id": "developer",
    "name": "Developer",
    "description": "Role for developers.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  }
}
```

### CLI reference

$ northflank get team-role

Options:

- `--teamId <teamId>`: ID of the team

- `--roleId <roleId>`: ID of the team role

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the team role.

```json
{
  "id": "developer",
  "name": "Developer",
  "description": "Role for developers.",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.teamRole({
  parameters: {
    "teamId": "my-team",
    "roleId": "developer"
  }
});
```

#### Example Response

 Details about the team role.

```json
{
  "data": {
    "id": "developer",
    "name": "Developer",
    "description": "Role for developers.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
