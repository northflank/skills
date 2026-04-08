# Update SSH identity

Source: https://northflank.com/docs/v1/api/team/integrations/update-ssh-identity.md

Updates SSH identity data.

Required permission: Account > Ssh > General > Update

**Path parameters:**

{object}
- `identityId`: (string) (required) ID of the SSH identity

**Request body:**

{object}
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `sshPublicKeys`: [array of] {object}
   - `key`: (string) (required) The SSH public key.
- `restrictions`: {object}
  - `projects`: {object}
    - `enabled`: (boolean) Whether restriction by project should be enabled.
    - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `tags`: {object}
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `updatedAt`: (string) time of update (format: date-time)
- `createdAt`: (string) time of creation (format: date-time)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the ssh identity (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `sshPublicKeys`: [array of] {object}
     - `key`: (string) (required) The SSH public key.
  - `restrictions`: {object}
    - `projects`: {object}
      - `enabled`: (boolean) Whether restriction by project should be enabled.
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `tags`: {object}
      - `enabled`: (boolean) Whether restriction by tag should be enabled.
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
  - `updatedAt`: (string) time of update (format: date-time)
  - `createdAt`: (string) time of creation (format: date-time)

### API reference

PATCH /v1/integrations/ssh-identities/{identityId}

PATCH /v1/teams/{teamId}/integrations/ssh-identities/{identityId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"sshPublicKeys":[{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."}],"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}}}' \
  https://api.northflank.com/v1/integrations/ssh-identities/{identityId}
```

```javascript
const payload = {
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

const response = await fetch('https://api.northflank.com/v1/integrations/ssh-identities/{identityId}', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/ssh-identities/{identityId}"

payload = {"sshPublicKeys":[{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."}],"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PATCH", url, headers = headers, json = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/ssh-identities/{identityId}"

  var jsonStr = []byte(`{"sshPublicKeys":[{"key":"ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."}],"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}}}`)
  req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
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
}
```

### CLI reference

$ northflank update ssh-identities

Options:

- `--identityId <identityId>`: ID of the SSH identity

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
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
```

#### Example Response

 Data about the SSH identity.

```json
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
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.sshIdentities({
  parameters: {
    "identityId": "example-ssh-identity"
  },
  data: {
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
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
