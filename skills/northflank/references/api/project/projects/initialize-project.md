# Initialize project

Source: https://northflank.com/docs/v1/api/project/projects/initialize-project.md

Assigns a region or cluster to a pending project.

Required permission: Project > Projects > Manage > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `region`: (string) The region the project will be hosted in.
- `clusterId`: (string) The BYOC cluster this project will be hosted in. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
- `customRegistry`: {object}
  - `enabled`: (boolean)
  - `configuration`: {object}
    - `credentialId`: (string) (required) (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `provider`: (string) (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the project
  - `name`: (string) (required) The name of the project. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `description`: (string) The description of the project. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `color`: (string) The color of the project in the Northflank App. (pattern: ^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$)
  - `region`: (string) The region the project will be hosted in.
  - `clusterId`: (string) The BYOC cluster this project will be hosted in. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
  - `customRegistry`: {object}
    - `enabled`: (boolean)
    - `configuration`: {object}
      - `credentialId`: (string) (required) (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `provider`: (string) (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)
  - `networking`: {object}
    - `allowedIngressProjects`: [array of] (string) (pattern: ^[A-Za-z0-9-]+$)
    - `tailscale`: {object}
      - `enabled`: (boolean) Whether or not to inject a Tailscale sidecar for this project's resources
      - `authKeyTags`: [array of] (string) (pattern: ^tag:.+)
      - `restrictions`: {object}
        - `enabled`: (boolean) (required) Whether or not to restrict the settings to resources with specific tags
        - `tags`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
        - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
      - `options`: {object}
        - `applyToAddons`: (boolean) Apply the Tailscale configuration to addons.
        - `applyToAddonJobs`: (boolean) Apply the Tailscale configuration to addon jobs (backups, restores).
        - `autoRedeployOnRegeneration`: (boolean) Automatically restart applicable services when the auth key is regenerated
      - `tailscaleOptions`: {object}
        - `acceptRoutes`: (boolean) Accept advertised routes from the Tailscale network
        - `tailnetServicesEnabled`: (boolean) Enable automatic creation of Tailnet services for resources in this project
        - `useUnscopedServiceNames`: (boolean) Use the service internal ID as the Tailnet Service name without the project UID. This causes undefined behavior when two services in the tailnet have matching internal IDs.
        - `tailnetServicesRestrictions`: {object}
          - `enabled`: (boolean) (required) Whether or not to restrict the settings to resources with specific tags
          - `tags`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
          - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
      - `secrets`: {object}
        - `clientId`: (string) (required) Tailscale OAuth client ID (required for generating auth keys for Tailscale)
        - `clientSecret`: (string) (required) Tailscale OAuth client secret (required for generating auth keys for Tailscale)
    - `hostAliases`: {object}
      - `enabled`: (boolean) Enable support for adding /etc/hosts overrides for a container
      - `hostEntries`: [array of] {object}
          - `ipAddress`: (string) (required) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$)
          - `hostnames`: [array of] (string) (pattern: ^(([a-z0-9][a-z0-9-]*)|[a-z0-9]\.)*([a-z]+|xn-\-[a-z0-9]+)\.?$)
      - `restrictions`: {object}
        - `enabled`: (boolean) (required) Whether or not to restrict the settings to resources with specific tags
        - `tags`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
        - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
  - `lifecycleStatus`: (string) (required) Status of resource on the platform (enum: pending_initialization, creating, created, creation_failed, upgrading, upgrade_failed, migration_pending, migrating, migration_failed, deleting, deletion_failed, deleted, cluster_deleted, initializing, tearing_down, teardown_failed)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

POST /v1/projects/{projectId}/initialize

POST /v1/teams/{teamId}/projects/{projectId}/initialize

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"region":"europe-west","clusterId":"gcp-cluster-1"}' \
  https://api.northflank.com/v1/projects/{projectId}/initialize
```

```javascript
const payload = {
  "region": "europe-west",
  "clusterId": "gcp-cluster-1"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/initialize', {
  method: 'POST',
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

url = "https://api.northflank.com/v1/projects/{projectId}/initialize"

payload = {"region":"europe-west","clusterId":"gcp-cluster-1"}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/projects/{projectId}/initialize"

  var jsonStr = []byte(`{"region":"europe-west","clusterId":"gcp-cluster-1"}`)
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details about the initialized project.

```json
{
  "data": {
    "id": "example-project",
    "name": "New Project",
    "description": "This is a new project.",
    "color": "#EF233C",
    "region": "europe-west",
    "clusterId": "gcp-cluster-1",
    "networking": {
      "tailscale": {
        "restrictions": {
          "tagMatchCondition": "or"
        },
        "tailscaleOptions": {
          "tailnetServicesRestrictions": {
            "tagMatchCondition": "or"
          }
        }
      },
      "hostAliases": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      }
    },
    "lifecycleStatus": "creating",
    "createdAt": "2000-01-01T12:00:00.000Z",
    "updatedAt": "2000-01-01T12:00:00.000Z"
  }
}
```

### CLI reference

$ northflank initialize project

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "region": "europe-west",
  "clusterId": "gcp-cluster-1"
}
```

#### Example Response

 Details about the initialized project.

```json
{
  "id": "example-project",
  "name": "New Project",
  "description": "This is a new project.",
  "color": "#EF233C",
  "region": "europe-west",
  "clusterId": "gcp-cluster-1",
  "networking": {
    "tailscale": {
      "restrictions": {
        "tagMatchCondition": "or"
      },
      "tailscaleOptions": {
        "tailnetServicesRestrictions": {
          "tagMatchCondition": "or"
        }
      }
    },
    "hostAliases": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    }
  },
  "lifecycleStatus": "creating",
  "createdAt": "2000-01-01T12:00:00.000Z",
  "updatedAt": "2000-01-01T12:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.initialize.project({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "region": "europe-west",
    "clusterId": "gcp-cluster-1"
  }
});
```

#### Example Response

 Details about the initialized project.

```json
{
  "data": {
    "id": "example-project",
    "name": "New Project",
    "description": "This is a new project.",
    "color": "#EF233C",
    "region": "europe-west",
    "clusterId": "gcp-cluster-1",
    "networking": {
      "tailscale": {
        "restrictions": {
          "tagMatchCondition": "or"
        },
        "tailscaleOptions": {
          "tailnetServicesRestrictions": {
            "tagMatchCondition": "or"
          }
        }
      },
      "hostAliases": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      }
    },
    "lifecycleStatus": "creating",
    "createdAt": "2000-01-01T12:00:00.000Z",
    "updatedAt": "2000-01-01T12:00:00.000Z"
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

response = client.initialize.project(
    project_id="default-project",
    data={
        "region": "europe-west",
        "clusterId": "gcp-cluster-1",
    },
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "example-project",
  "name": "New Project",
  "description": "This is a new project.",
  "color": "#EF233C",
  "region": "europe-west",
  "clusterId": "gcp-cluster-1",
  "networking": {
    "tailscale": {
      "restrictions": {
        "tagMatchCondition": "or",
        "enabled": false
      },
      "tailscaleOptions": {
        "tailnetServicesRestrictions": {
          "tagMatchCondition": "or",
          "enabled": false
        }
      }
    },
    "hostAliases": {
      "restrictions": {
        "tagMatchCondition": "or",
        "enabled": false
      }
    }
  },
  "lifecycleStatus": "creating",
  "createdAt": "2000-01-01T12:00:00.000Z",
  "updatedAt": "2000-01-01T12:00:00.000Z"
}
```
