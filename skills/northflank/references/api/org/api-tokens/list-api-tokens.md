# List API tokens

Source: https://northflank.com/docs/v1/api/org/api-tokens/list-api-tokens.md

Lists API tokens belonging to the authenticated org or team, newest first. Only active tokens are returned unless the `all` query parameter is set.

Required permission: Account > Admin > ApiTokens > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `all`: (boolean) When true, include inactive tokens (revoked or expired). By default only active tokens are returned.

**Response body:**

{object}
- `data`: {object}
  - `tokens`: [array of] {object}
     - `id`: (string) (required) The ID (slug) of the API token.
     - `name`: (string) (required) The display name of the API token.
     - `description`: (string) The description of the API token.
     - `role`: {object}
       - `name`: (string) The display name of the role.
       - `roleId`: (string) The ID (slug) of the role.
       - `roleType`: (string) The type of the role. (enum: team, org)
       - `entityType`: (string) The entity type of the role. (enum: team, org)
     - `creatorEmail`: (string) The email of the user who created this token. (format: email)
     - `createdAt`: (string) (required) The time the token was created. (format: date-time)
     - `expiresAt`: (string) The time the token expires, or null if it has no expiry. (format: date-time)
     - `revoked`: (boolean) (required) Whether the token has been revoked.
     - `revokedAt`: (string) The time the token was revoked, if it has been. (format: date-time)
     - `lastUsedAt`: (string) The time the token was last used to authenticate. (format: date-time)
     - `active`: (boolean) (required) Whether the token is currently active (not revoked and not expired).
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/tokens

GET /v1/teams/{teamId}/tokens

#### Example Response

200 OK: A list of API tokens.

```json
{
  "data": {
    "tokens": [
      {
        "id": "my-api-token",
        "name": "My API Token",
        "description": "CI/CD pipeline token",
        "role": {
          "name": "Developer",
          "roleId": "developer",
          "roleType": "team",
          "entityType": "team"
        },
        "creatorEmail": "user@example.com",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "expiresAt": "2024-07-15T10:30:00.000Z",
        "revoked": false,
        "revokedAt": "2024-06-15T10:30:00.000Z",
        "lastUsedAt": "2024-06-01T10:30:00.000Z",
        "active": true
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

$ northflank list api-tokens

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--all <all>`: When true, include inactive tokens (revoked or expired). By default only active tokens are returned.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of API tokens.

```json
{
  "tokens": [
    {
      "id": "my-api-token",
      "name": "My API Token",
      "description": "CI/CD pipeline token",
      "role": {
        "name": "Developer",
        "roleId": "developer",
        "roleType": "team",
        "entityType": "team"
      },
      "creatorEmail": "user@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "expiresAt": "2024-07-15T10:30:00.000Z",
      "revoked": false,
      "revokedAt": "2024-06-15T10:30:00.000Z",
      "lastUsedAt": "2024-06-01T10:30:00.000Z",
      "active": true
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.apiTokens({
  options: {
    "per_page": 50,
    "page": 1,
    "all": false
  }
});
```

#### Example Response

 A list of API tokens.

```json
{
  "data": {
    "tokens": [
      {
        "id": "my-api-token",
        "name": "My API Token",
        "description": "CI/CD pipeline token",
        "role": {
          "name": "Developer",
          "roleId": "developer",
          "roleType": "team",
          "entityType": "team"
        },
        "creatorEmail": "user@example.com",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "expiresAt": "2024-07-15T10:30:00.000Z",
        "revoked": false,
        "revokedAt": "2024-06-15T10:30:00.000Z",
        "lastUsedAt": "2024-06-01T10:30:00.000Z",
        "active": true
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
