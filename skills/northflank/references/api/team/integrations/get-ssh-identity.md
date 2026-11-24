# Get SSH identity

Source: https://northflank.com/docs/v1/api/team/integrations/get-ssh-identity.md

Views SSH identity data including public keys.

Required permission: Account > Platform > Ssh > Read

**Path parameters:**

{object}
- `identityId`: (string) (required) ID of the SSH identity

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
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

### API reference

GET /v1/integrations/ssh-identities/{identityId}

GET /v1/teams/{teamId}/integrations/ssh-identities/{identityId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/integrations/ssh-identities/{identityId}"
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/ssh-identities/{identityId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Data about the SSH identity.

```json
{
  "data": {
    "id": "example-identity",
    "name": "Example SSH Identity",
    "sshPublicKeys": [
      {
        "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ...",
        "__depth": 5
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
}
```

### CLI reference

$ northflank get ssh-identities

Options:

- `--identityId <identityId>`: ID of the SSH identity

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the SSH identity.

```json
{
  "id": "example-identity",
  "name": "Example SSH Identity",
  "sshPublicKeys": [
    {
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ...",
      "__depth": 5
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
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.sshIdentities({
  parameters: {
    "identityId": "example-ssh-identity"
  }
});
```

#### Example Response

 Data about the SSH identity.

```json
{
  "data": {
    "id": "example-identity",
    "name": "Example SSH Identity",
    "sshPublicKeys": [
      {
        "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ...",
        "__depth": 5
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

response = client.get.ssh_identities(
    identity_id="example-ssh-identity",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "example-identity",
  "name": "Example SSH Identity",
  "sshPublicKeys": [
    {
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ...",
      "__depth": 5
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
```
