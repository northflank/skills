# Update external addon

Source: https://northflank.com/docs/v1/api/project/external-addons/update-external-addon.md

Updates configuration for an external addon

Required permission: Project > ExternalAddons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `externalAddonId`: (string) (required) ID of the external addon

**Request body:**

{object}
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `environmentId`: (string)
- `spec`: {object}
  - `resourceType`: (string) (required) (enum: s3, rds, cloudSql, memorystore)
  - `provider`: {object}
    - `aws`: {object}
      - `region`: (string) (required)
      - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `google`: {object}
      - `project`: (string) (required)
      - `region`: (string)
      - `zone`: (string)
      - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `cloudflare`: {object}
      - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `aiven`: {object}
      - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `backblaze`: {object}
      - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `azure`: {object}
      - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `akamai`: {object}
      - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
  - `config`: {object}
  - `outputs`: {object}
  - `workloadIdentityId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

**Response body:**

{object}
- `data`: {object}
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `environmentId`: (string)
  - `spec`: {object}
    - `resourceType`: (string) (required) (enum: s3, rds, cloudSql, memorystore)
    - `provider`: {object}
      - `aws`: {object}
        - `region`: (string) (required)
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `google`: {object}
        - `project`: (string) (required)
        - `region`: (string)
        - `zone`: (string)
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `cloudflare`: {object}
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `aiven`: {object}
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `backblaze`: {object}
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `azure`: {object}
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `akamai`: {object}
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `config`: {object}
    - `outputs`: {object}
    - `workloadIdentityId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

### API reference

PATCH /v1/projects/{projectId}/external-addons/{externalAddonId}

PATCH /v1/teams/{teamId}/projects/{projectId}/external-addons/{externalAddonId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"spec":{"provider":{"aws":{"region":"eu-west-1"},"google":{"region":"us-central1","zone":"us-central1-c"}}}}' \
  https://api.northflank.com/v1/projects/{projectId}/external-addons/{externalAddonId}
```

```javascript
const payload = {
  "spec": {
    "provider": {
      "aws": {
        "region": "eu-west-1"
      },
      "google": {
        "region": "us-central1",
        "zone": "us-central1-c"
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/external-addons/{externalAddonId}', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/external-addons/{externalAddonId}"

payload = {"spec":{"provider":{"aws":{"region":"eu-west-1"},"google":{"region":"us-central1","zone":"us-central1-c"}}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/external-addons/{externalAddonId}"

  var jsonStr = []byte(`{"spec":{"provider":{"aws":{"region":"eu-west-1"},"google":{"region":"us-central1","zone":"us-central1-c"}}}}`)
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

200 OK: Details about the updated external addon.

```json
{
  "data": {
    "spec": {
      "provider": {
        "aws": {
          "region": "eu-west-1"
        },
        "google": {
          "region": "us-central1",
          "zone": "us-central1-c"
        }
      }
    }
  }
}
```

### CLI reference

$ northflank update external-addon

Options:

- `--projectId <projectId>`: ID of the project

- `--externalAddonId <externalAddonId>`: ID of the external addon

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "spec": {
    "provider": {
      "aws": {
        "region": "eu-west-1"
      },
      "google": {
        "region": "us-central1",
        "zone": "us-central1-c"
      }
    }
  }
}
```

#### Example Response

 Details about the updated external addon.

```json
{
  "spec": {
    "provider": {
      "aws": {
        "region": "eu-west-1"
      },
      "google": {
        "region": "us-central1",
        "zone": "us-central1-c"
      }
    }
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.externalAddon({
  parameters: {
    "projectId": "default-project",
    "externalAddonId": "my-s3-bucket"
  },
  data: {
    "spec": {
      "provider": {
        "aws": {
          "region": "eu-west-1"
        },
        "google": {
          "region": "us-central1",
          "zone": "us-central1-c"
        }
      }
    }
  }
});
```

#### Example Response

 Details about the updated external addon.

```json
{
  "data": {
    "spec": {
      "provider": {
        "aws": {
          "region": "eu-west-1"
        },
        "google": {
          "region": "us-central1",
          "zone": "us-central1-c"
        }
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
