# Get current authentication info

Source: https://northflank.com/docs/v1/api/miscellaneous/auth/get-current-authentication-info.md

Returns the current API, session or workload token’s identity, permissions and expiry. Workload tokens also report their effective project restrictions. No additional permissions are required.

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `tokenKind`: (string) (required) The type of authentication material used for the request. (enum: api, session, workload)
  - `id`: (string) (required) The API token ID (slug), session UUID or workload credential UUID.
  - `name`: (string) The API token name, session label or workload identity name, if set.
  - `description`: (string) The description of the API token, if API token authentication was used.
  - `entityId`: (string) (required) The ID (slug) of the entity this authentication material is scoped to.
  - `entityUid`: (string) (required) The object ID of the entity this authentication material is scoped to.
  - `entityType`: (string) (required) The type of entity this authentication material is scoped to. (enum: team, org)
  - `orgId`: (string) The ID (slug) of the organisation, if the entity is an org-owned team.
  - `orgUid`: (string) The object ID of the organisation, if the entity is an org-owned team.
  - `role`: {object} The current role assigned to the API or workload token.
    - `name`: (string) The display name of the role.
    - `roleId`: (string) The ID (slug) of the role.
    - `roleType`: (string) The type of the role. (enum: team, org)
    - `entityType`: (string) The entity type of the role. (enum: team, org)
  - `permissions`: {object} The effective permission actions, subject to project restrictions and resource-level checks.
    - `orgScope`: [array of] Organisation-level permission strings. (string)
    - `teamScope`: [array of] Team-level permission strings. (string)
    - `projectScope`: [array of] Project-level permission strings. (string)
  - `workload`: {object} The caller, when authenticated with a workload token.
    - `id`: (string) (required) The calling workload ID (slug).
    - `name`: (string) (required) The calling workload name.
    - `type`: (string) (required) The calling workload type. (enum: harness, service, job)
    - `projectId`: (string) (required) The calling workload’s project ID (slug).
  - `workloadIdentity`: {object} The identity providing the workload credential.
    - `id`: (string) (required) The workload identity ID (slug).
    - `name`: (string) (required) The workload identity name.
  - `scope`: (string) Whether workload access is capped to its own project or uses the role’s full scope. (enum: own-project, role)
  - `projectRestrictions`: {object} The effective project restriction for a workload token.
    - `enabled`: (boolean) (required) Whether project access is restricted.
    - `restrictionMode`: (string) (required) Whether the listed project UIDs are included or excluded when enabled. (enum: in, notIn)
    - `projects`: [array of] (required) Immutable project UIDs used by the effective restriction, not project slugs. (string)
  - `creatorEmail`: (string) The email of the user who created the API token. (format: email)
  - `createdAt`: (string) (required) The creation time, or the verified issue time for a workload credential. (format: date-time)
  - `expiresAt`: (string) (nullable) The time the authentication material expires, or null if it has no expiry. (format: date-time)

### API reference

GET /v1/auth

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/auth"
```

```python
import requests

url = "https://api.northflank.com/v1/auth"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.get.auth()
print(response.data)
```

#### Example Response

 Example value of response.data:

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
