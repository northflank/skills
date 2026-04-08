# Get team

Source: https://northflank.com/docs/v1/api/org/teams/get-team.md

Gets information about a team belonging to the authenticated org.

Required permission: Organisation > Team > General > Read

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the team. (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) Display name of the team.
  - `description`: (string) Description of the team.
  - `createdAt`: (string) (required) The time the team was created. (format: date-time)
  - `updatedAt`: (string) The time the team was last updated. (format: date-time)

### API reference

GET /v1/teams/{teamId}

#### Example Response

200 OK: Details about the team.

```json
{
  "data": {
    "id": "my-team",
    "name": "My Team",
    "description": "This is my team.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  }
}
```

### CLI reference

$ northflank get team

Options:

- `--teamId <teamId>`: ID of the team

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the team.

```json
{
  "id": "my-team",
  "name": "My Team",
  "description": "This is my team.",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.team({
  parameters: {
    "teamId": "my-team"
  }
});
```

#### Example Response

 Details about the team.

```json
{
  "data": {
    "id": "my-team",
    "name": "My Team",
    "description": "This is my team.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
