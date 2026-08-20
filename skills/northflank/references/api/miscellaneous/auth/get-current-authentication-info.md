# Get current authentication info

Source: https://northflank.com/docs/v1/api/miscellaneous/auth/get-current-authentication-info.md

Returns details about the authentication material used in this request.

**Response body:**

{object}
- `data`: {object}
  - `tokenKind`: (string) (required) The type of authentication material used for the request. (enum: api, session)
  - `id`: (string) (required) The API token ID (slug) or session token UUID.
  - `name`: (string) The API token name or session token label, if set.
  - `description`: (string) The description of the API token, if API token authentication was used.
  - `entityId`: (string) (required) The ID (slug) of the entity this authentication material is scoped to.
  - `entityUid`: (string) (required) The object ID of the entity this authentication material is scoped to.
  - `entityType`: (string) (required) The type of entity this authentication material is scoped to. (enum: team, org)
  - `orgId`: (string) The ID (slug) of the organisation, if the entity is an org-owned team.
  - `orgUid`: (string) The object ID of the organisation, if the entity is an org-owned team.
  - `role`: {object}
    - `name`: (string) The display name of the role.
    - `roleId`: (string) The ID (slug) of the role.
    - `roleType`: (string) The type of the role. (enum: team, org)
    - `entityType`: (string) The entity type of the role. (enum: team, org)
  - `permissions`: {object}
    - `orgScope`: [array of] (string)
    - `teamScope`: [array of] (string)
    - `projectScope`: [array of] (string)
  - `creatorEmail`: (string) The email of the user who created the API token. (format: email)
  - `createdAt`: (string) (required) The time the authentication material was created. (format: date-time)
  - `expiresAt`: (string) The time the authentication material expires, or null if it has no expiry. (format: date-time)

### API reference

GET /v1/auth

#### Example Response

200 OK: Details about the current authentication.

```json
{
  "data": {
    "tokenKind": "api",
    "id": "my-api-token",
    "name": "My API Token",
    "description": "CI/CD pipeline token",
    "entityId": "my-team",
    "entityUid": "507f1f77bcf86cd799439011",
    "entityType": "team",
    "orgId": "my-org",
    "orgUid": "507f191e810c19729de860ea",
    "role": {
      "name": "Developer",
      "roleId": "developer",
      "roleType": "team",
      "entityType": "team"
    },
    "creatorEmail": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "expiresAt": "2024-07-15T10:30:00.000Z"
  }
}
```

### CLI reference

$ northflank get auth

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the current authentication.

```json
{
  "tokenKind": "api",
  "id": "my-api-token",
  "name": "My API Token",
  "description": "CI/CD pipeline token",
  "entityId": "my-team",
  "entityUid": "507f1f77bcf86cd799439011",
  "entityType": "team",
  "orgId": "my-org",
  "orgUid": "507f191e810c19729de860ea",
  "role": {
    "name": "Developer",
    "roleId": "developer",
    "roleType": "team",
    "entityType": "team"
  },
  "creatorEmail": "user@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "expiresAt": "2024-07-15T10:30:00.000Z"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.auth({});
```

#### Example Response

 Details about the current authentication.

```json
{
  "data": {
    "tokenKind": "api",
    "id": "my-api-token",
    "name": "My API Token",
    "description": "CI/CD pipeline token",
    "entityId": "my-team",
    "entityUid": "507f1f77bcf86cd799439011",
    "entityType": "team",
    "orgId": "my-org",
    "orgUid": "507f191e810c19729de860ea",
    "role": {
      "name": "Developer",
      "roleId": "developer",
      "roleType": "team",
      "entityType": "team"
    },
    "creatorEmail": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "expiresAt": "2024-07-15T10:30:00.000Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
