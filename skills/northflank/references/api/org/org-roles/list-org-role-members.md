# List org role members

Source: https://northflank.com/docs/v1/api/org/org-roles/list-org-role-members.md

Gets a list of members assigned to a platform role in the authenticated org.

Required permission: Organisation > Admin > Roles > Read

**Path parameters:**

{object}
- `roleId`: (string) (required) ID of the org role

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)
- `type`: (string) Filter members by how they were added, directly or implicitly via directory group membership. (enum: explicit, implicit)
- `userIds`: (multiple options) Filter members by user ID. Specify the parameter multiple times to filter by multiple user IDs. [array of] (string) (pattern: ^[A-Za-z0-9-]+$) | (string) (pattern: ^[A-Za-z0-9-]+$)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `members`: [array of] (required) An array of members in the org role. {object} An org role member object.
     - `id`: (string) (required) ID (username) of the org member. For users who are not finalized this ID may change on finalisation. (pattern: ^[A-Za-z0-9-]+$)
     - `name`: (string) Display name from the member profile.
     - `emails`: [array of] Email addresses of the member. {object} Email addresses of the member.
         - `address`: (string)
         - `verified`: (boolean)
     - `joinedAt`: (string) The time the member joined the org. (format: date-time)
     - `lastLoginTime`: (string) The time the member last logged in. (format: date-time)
     - `finalized`: (boolean) (required) Whether the account has been fully set up by the user.
     - `uid`: (string) (required) Permanent UID of the organization member. (min length: 24) (max length: 24)
     - `type`: (string) (required) How the member was added to the role. `explicit` means manually added; `implicit` means provisioned via Directory Sync. (enum: explicit, implicit)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/org-roles/{roleId}/members

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/org-roles/{roleId}/members?per_page=50&page=1&type=explicit&userIds=john-doe"
```

```python
import requests

url = "https://api.northflank.com/v1/org-roles/{roleId}/members?per_page=50&page=1&type=explicit&userIds=john-doe"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of members in the org role.

```json
{
  "data": {
    "members": [
      {
        "id": "john-doe",
        "name": "John Doe",
        "emails": [
          {
            "address": "john@example.com",
            "verified": true
          }
        ],
        "joinedAt": "2021-01-20T11:19:53.175Z",
        "lastLoginTime": "2021-01-20T11:19:53.175Z",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "type": "explicit",
        "finalized": false
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

$ northflank list org-role-members

Options:

- `--roleId <roleId>`: ID of the org role

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--type <type>`: Filter members by how they were added, directly or implicitly via directory group membership.

- `--userIds <userIds>`: Filter members by user ID. Specify the parameter multiple times to filter by multiple user IDs.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of members in the org role.

```json
{
  "members": [
    {
      "id": "john-doe",
      "name": "John Doe",
      "emails": [
        {
          "address": "john@example.com",
          "verified": true
        }
      ],
      "joinedAt": "2021-01-20T11:19:53.175Z",
      "lastLoginTime": "2021-01-20T11:19:53.175Z",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "type": "explicit",
      "finalized": false
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.orgRoleMembers({
  parameters: {
    "roleId": "developer"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "type": "explicit",
    "userIds": "john-doe"
  }
});
```

#### Example Response

 A list of members in the org role.

```json
{
  "data": {
    "members": [
      {
        "id": "john-doe",
        "name": "John Doe",
        "emails": [
          {
            "address": "john@example.com",
            "verified": true
          }
        ],
        "joinedAt": "2021-01-20T11:19:53.175Z",
        "lastLoginTime": "2021-01-20T11:19:53.175Z",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "type": "explicit",
        "finalized": false
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.org_role_members(
    role_id="developer",
    page=1,
    per_page=50,
    type="explicit",
    user_ids=["john-doe"],
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "members": [
    {
      "id": "john-doe",
      "name": "John Doe",
      "emails": [
        {
          "address": "john@example.com",
          "verified": true
        }
      ],
      "joinedAt": "2021-01-20T11:19:53.175Z",
      "lastLoginTime": "2021-01-20T11:19:53.175Z",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "type": "explicit",
      "finalized": false
    }
  ]
}
```
