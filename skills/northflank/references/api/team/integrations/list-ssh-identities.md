# List SSH identities

Source: https://northflank.com/docs/v1/api/team/integrations/list-ssh-identities.md

Lists the SSH identities saved to this account. Does not display SSH public keys.

Required permission: Account > Platform > Ssh > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `identities`: [array of] {object} An array of SSH Identities
     - `id`: (string) (required) ID of the ssh identity (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
     - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `sshPublicKeys`: [array of] A list of SSH public keys. {object}
         - `key`: (string) (required) The SSH public key.
     - `restrictions`: {object} Configuration of restrictions.
       - `projects`: {object} Configuration of project restriction settings.
         - `enabled`: (boolean) Whether restriction by project should be enabled.
         - `items`: [array of] An array of previously defined projects. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
       - `tags`: {object} Configuration of tag restriction settings.
         - `enabled`: (boolean) Whether restriction by tag should be enabled.
         - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
         - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
     - `updatedAt`: (string) time of update (format: date-time)
     - `createdAt`: (string) time of creation (format: date-time)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/integrations/ssh-identities

GET /v1/teams/{teamId}/integrations/ssh-identities

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/integrations/ssh-identities?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/ssh-identities?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of SSH identities saved to this account.

```json
{
  "data": {
    "identities": [
      {
        "id": "example-identity",
        "name": "Example SSH Identity",
        "sshPublicKeys": [
          {
            "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
          }
        ],
        "restrictions": {
          "projects": {
            "enabled": false
          },
          "tags": {
            "enabled": false,
            "matchCondition": "or"
          }
        }
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

$ northflank list ssh-identities

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of SSH identities saved to this account.

```json
{
  "identities": [
    {
      "id": "example-identity",
      "name": "Example SSH Identity",
      "sshPublicKeys": [
        {
          "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
        }
      ],
      "restrictions": {
        "projects": {
          "enabled": false
        },
        "tags": {
          "enabled": false,
          "matchCondition": "or"
        }
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.sshIdentities({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of SSH identities saved to this account.

```json
{
  "data": {
    "identities": [
      {
        "id": "example-identity",
        "name": "Example SSH Identity",
        "sshPublicKeys": [
          {
            "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
          }
        ],
        "restrictions": {
          "projects": {
            "enabled": false
          },
          "tags": {
            "enabled": false,
            "matchCondition": "or"
          }
        }
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

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.ssh_identities(
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "identities": [
    {
      "id": "example-identity",
      "name": "Example SSH Identity",
      "sshPublicKeys": [
        {
          "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
        }
      ],
      "restrictions": {
        "projects": {
          "enabled": false
        },
        "tags": {
          "enabled": false,
          "matchCondition": "or"
        }
      }
    }
  ]
}
```
