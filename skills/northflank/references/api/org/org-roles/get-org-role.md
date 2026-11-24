# Get org role

Source: https://northflank.com/docs/v1/api/org/org-roles/get-org-role.md

Gets details about a specific org platform role.

Required permission: Organisation > Admin > Roles > Read

**Path parameters:**

{object}
- `roleId`: (string) (required) ID of the org role

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) ID of the role. (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) Display name of the role.
  - `description`: (string) Description of the role.
  - `restrictions`: {object} (required)
    - `enabled`: (boolean) (required)
    - `teams`: [array of] {object}
        - `teamId`: (string) (required) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
        - `restrictions`: {object}
          - `enabled`: (boolean) (required)
          - `projects`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
          - `restrictionMode`: (string) (enum: in, notIn)
  - `directoryGroups`: [array of] An array of linked directory groups. Users belonging to any of these linked directory groups will automatically be a member of this role. (string) The ID of the linked directory group.
  - `createdAt`: (string) Creation time. (format: date-time)
  - `updatedAt`: (string) Last updated. (format: date-time)
  - `permissions`: {object} (required)
    - `teamScope`: [array of] (required) Team-level permissions. (string)
    - `projectScope`: [array of] (required) Project-level permissions. (string)
    - `orgScope`: [array of] (required) Org-level permissions. (string)

### API reference

GET /v1/org-roles/{roleId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/org-roles/{roleId}"
```

```python
import requests

url = "https://api.northflank.com/v1/org-roles/{roleId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details about the org role.

```json
{
  "data": {
    "id": "developer",
    "name": "Developer",
    "description": "Role for developers.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z",
    "restrictions": {
      "enabled": false
    },
    "permissions": {
      "teamScope": [],
      "projectScope": [],
      "orgScope": []
    }
  }
}
```

### CLI reference

$ northflank get org-role

Options:

- `--roleId <roleId>`: ID of the org role

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the org role.

```json
{
  "id": "developer",
  "name": "Developer",
  "description": "Role for developers.",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z",
  "restrictions": {
    "enabled": false
  },
  "permissions": {
    "teamScope": [],
    "projectScope": [],
    "orgScope": []
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.orgRole({
  parameters: {
    "roleId": "developer"
  }
});
```

#### Example Response

 Details about the org role.

```json
{
  "data": {
    "id": "developer",
    "name": "Developer",
    "description": "Role for developers.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z",
    "restrictions": {
      "enabled": false
    },
    "permissions": {
      "teamScope": [],
      "projectScope": [],
      "orgScope": []
    }
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

response = client.get.org_role(
    role_id="developer",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "developer",
  "name": "Developer",
  "description": "Role for developers.",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z",
  "restrictions": {
    "enabled": false
  },
  "permissions": {
    "teamScope": [],
    "projectScope": [],
    "orgScope": []
  }
}
```
