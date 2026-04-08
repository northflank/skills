# List teams

Source: https://northflank.com/docs/v1/api/org/teams/list-teams.md

Gets a list of teams belonging to the authenticated org.

Required permission: Organisation > Team > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `teams`: [array of] {object}
     - `id`: (string) (required) ID of the team. (pattern: ^[A-Za-z0-9-]+$)
     - `name`: (string) (required) Display name of the team.
     - `description`: (string) Description of the team.
     - `createdAt`: (string) (required) The time the team was created. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/teams

#### Example Response

200 OK: A list of teams belonging to the org.

```json
{
  "data": {
    "teams": [
      {
        "id": "my-team",
        "name": "My Team",
        "description": "This is my team.",
        "createdAt": "2021-01-20T11:19:53.175Z"
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

$ northflank list teams

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of teams belonging to the org.

```json
{
  "teams": [
    {
      "id": "my-team",
      "name": "My Team",
      "description": "This is my team.",
      "createdAt": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.teams({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of teams belonging to the org.

```json
{
  "data": {
    "teams": [
      {
        "id": "my-team",
        "name": "My Team",
        "description": "This is my team.",
        "createdAt": "2021-01-20T11:19:53.175Z"
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
