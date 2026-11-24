# List org directory groups

Source: https://northflank.com/docs/v1/api/org/org-roles/list-org-directory-groups.md

Lists the Directory Sync directory groups for the authenticated org.

Required permission: Organisation > Admin > Roles > Read

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `directoryGroups`: [array of] (required) An array of org directory groups. {object} An org directory group object.
     - `id`: (string) (required) ID of the directory group.
     - `name`: (string) (required) Display name of the directory group.
     - `idpId`: (string) (required) ID of the linked group from the Identity Provider (IdP).
     - `createdAt`: (string) (required) (format: date-time)
     - `updatedAt`: (string) (required) (format: date-time)

### API reference

GET /v1/directory-groups

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/directory-groups"
```

```python
import requests

url = "https://api.northflank.com/v1/directory-groups"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of directory groups for the org.

```json
{
  "data": {
    "directoryGroups": [
      {
        "id": "directory_group_1234567890ABCDEFGHIJKLMNOP",
        "name": "string",
        "idpId": "string",
        "createdAt": "1970-01-01T00:00:00.000Z",
        "updatedAt": "1970-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### CLI reference

$ northflank get org-directory-groups

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A list of directory groups for the org.

```json
{
  "directoryGroups": [
    {
      "id": "directory_group_1234567890ABCDEFGHIJKLMNOP",
      "name": "string",
      "idpId": "string",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.orgDirectoryGroups({});
```

#### Example Response

 A list of directory groups for the org.

```json
{
  "data": {
    "directoryGroups": [
      {
        "id": "directory_group_1234567890ABCDEFGHIJKLMNOP",
        "name": "string",
        "idpId": "string",
        "createdAt": "1970-01-01T00:00:00.000Z",
        "updatedAt": "1970-01-01T00:00:00.000Z"
      }
    ]
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

response = client.get.org_directory_groups()
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "directoryGroups": [
    {
      "id": "directory_group_1234567890ABCDEFGHIJKLMNOP",
      "name": "string",
      "idpId": "string",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```
