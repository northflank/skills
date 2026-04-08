# Create or update project

Source: https://northflank.com/docs/v1/api/team/projects/create-or-update-project.md

Creates or updates a project.

Required permission: Project > Projects > Manage > Create

**Request body:**

{object}
- `name`: (string) (required) The name of the project. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The description of the project. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `color`: (string) The color of the project in the Northflank App. (pattern: ^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$)
- `region`: (string) The region the project will be hosted in.
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
    - `secrets`: {object}
      - `clientId`: (string) (required) Tailscale OAuth client ID (required for generating auth keys for Tailscale)
      - `clientSecret`: (string) (required) Tailscale OAuth client secret (required for generating auth keys for Tailscale)
  - `hostAliases`: {object}
    - `enabled`: (boolean) Enable support for adding /etc/hosts overrides for a container
    - `hostEntries`: [array of] {object}
        - `ipAddress`: (string) (required) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$)
        - `hostnames`: [array of] (string) (pattern: ^(([a-z0-9][a-z0-9\-]*)|[a-z0-9]\.)*([a-z]+|xn\-\-[a-z0-9]+)\.?$)
    - `restrictions`: {object}
      - `enabled`: (boolean) (required) Whether or not to restrict the settings to resources with specific tags
      - `tags`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
      - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)

OR

{object}
- `name`: (string) (required) The name of the project. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The description of the project. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `color`: (string) The color of the project in the Northflank App. (pattern: ^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$)
- `clusterId`: (string) The BYOC cluster this project will be hosted in. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
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
    - `secrets`: {object}
      - `clientId`: (string) (required) Tailscale OAuth client ID (required for generating auth keys for Tailscale)
      - `clientSecret`: (string) (required) Tailscale OAuth client secret (required for generating auth keys for Tailscale)
  - `hostAliases`: {object}
    - `enabled`: (boolean) Enable support for adding /etc/hosts overrides for a container
    - `hostEntries`: [array of] {object}
        - `ipAddress`: (string) (required) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$)
        - `hostnames`: [array of] (string) (pattern: ^(([a-z0-9][a-z0-9\-]*)|[a-z0-9]\.)*([a-z]+|xn\-\-[a-z0-9]+)\.?$)
    - `restrictions`: {object}
      - `enabled`: (boolean) (required) Whether or not to restrict the settings to resources with specific tags
      - `tags`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
      - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)

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
      - `secrets`: {object}
        - `clientId`: (string) (required) Tailscale OAuth client ID (required for generating auth keys for Tailscale)
        - `clientSecret`: (string) (required) Tailscale OAuth client secret (required for generating auth keys for Tailscale)
    - `hostAliases`: {object}
      - `enabled`: (boolean) Enable support for adding /etc/hosts overrides for a container
      - `hostEntries`: [array of] {object}
          - `ipAddress`: (string) (required) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$)
          - `hostnames`: [array of] (string) (pattern: ^(([a-z0-9][a-z0-9\-]*)|[a-z0-9]\.)*([a-z]+|xn\-\-[a-z0-9]+)\.?$)
      - `restrictions`: {object}
        - `enabled`: (boolean) (required) Whether or not to restrict the settings to resources with specific tags
        - `tags`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
        - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

PUT /v1/projects

PUT /v1/teams/{teamId}/projects

#### Example request

Request body

Create a project in a Northflank region

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"name":"New Project","description":"This is a new project.","color":"#EF233C","region":"europe-west","networking":{"tailscale":{"restrictions":{"tagMatchCondition":"or"}},"hostAliases":{"restrictions":{"tagMatchCondition":"or"}}}}' \
  https://api.northflank.com/v1/projects
```

```javascript
const payload = {
  "name": "New Project",
  "description": "This is a new project.",
  "color": "#EF233C",
  "region": "europe-west",
  "networking": {
    "tailscale": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    },
    "hostAliases": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects', {
  method: 'PUT',
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

url = "https://api.northflank.com/v1/projects"

payload = {"name":"New Project","description":"This is a new project.","color":"#EF233C","region":"europe-west","networking":{"tailscale":{"restrictions":{"tagMatchCondition":"or"}},"hostAliases":{"restrictions":{"tagMatchCondition":"or"}}}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/projects"

  var jsonStr = []byte(`{"name":"New Project","description":"This is a new project.","color":"#EF233C","region":"europe-west","networking":{"tailscale":{"restrictions":{"tagMatchCondition":"or"}},"hostAliases":{"restrictions":{"tagMatchCondition":"or"}}}}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

OR

Create a project in a BYOC cluster

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"name":"New Project","description":"This is a new project.","color":"#EF233C","clusterId":"gcp-cluster-1","networking":{"tailscale":{"restrictions":{"tagMatchCondition":"or"}},"hostAliases":{"restrictions":{"tagMatchCondition":"or"}}}}' \
  https://api.northflank.com/v1/projects
```

```javascript
const payload = {
  "name": "New Project",
  "description": "This is a new project.",
  "color": "#EF233C",
  "clusterId": "gcp-cluster-1",
  "networking": {
    "tailscale": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    },
    "hostAliases": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects', {
  method: 'PUT',
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

url = "https://api.northflank.com/v1/projects"

payload = {"name":"New Project","description":"This is a new project.","color":"#EF233C","clusterId":"gcp-cluster-1","networking":{"tailscale":{"restrictions":{"tagMatchCondition":"or"}},"hostAliases":{"restrictions":{"tagMatchCondition":"or"}}}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/projects"

  var jsonStr = []byte(`{"name":"New Project","description":"This is a new project.","color":"#EF233C","clusterId":"gcp-cluster-1","networking":{"tailscale":{"restrictions":{"tagMatchCondition":"or"}},"hostAliases":{"restrictions":{"tagMatchCondition":"or"}}}}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details about the created or updated project.

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
        }
      },
      "hostAliases": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      }
    },
    "createdAt": "2000-01-01T12:00:00.000Z",
    "updatedAt": "2000-01-01T12:00:00.000Z"
  }
}
```

### CLI reference

$ northflank put project

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

Create a project in a Northflank region

```json
{
  "name": "New Project",
  "description": "This is a new project.",
  "color": "#EF233C",
  "region": "europe-west",
  "networking": {
    "tailscale": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    },
    "hostAliases": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    }
  }
}
```

OR

Create a project in a BYOC cluster

```json
{
  "name": "New Project",
  "description": "This is a new project.",
  "color": "#EF233C",
  "clusterId": "gcp-cluster-1",
  "networking": {
    "tailscale": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    },
    "hostAliases": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    }
  }
}
```

#### Example Response

 Details about the created or updated project.

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
      }
    },
    "hostAliases": {
      "restrictions": {
        "tagMatchCondition": "or"
      }
    }
  },
  "createdAt": "2000-01-01T12:00:00.000Z",
  "updatedAt": "2000-01-01T12:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

Request body

Create a project in a Northflank region

```javascript
await apiClient.put.project({
  data: {
    "name": "New Project",
    "description": "This is a new project.",
    "color": "#EF233C",
    "region": "europe-west",
    "networking": {
      "tailscale": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      },
      "hostAliases": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      }
    }
  }
});
```

OR

Create a project in a BYOC cluster

```javascript
await apiClient.put.project({
  data: {
    "name": "New Project",
    "description": "This is a new project.",
    "color": "#EF233C",
    "clusterId": "gcp-cluster-1",
    "networking": {
      "tailscale": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      },
      "hostAliases": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      }
    }
  }
});
```

#### Example Response

 Details about the created or updated project.

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
        }
      },
      "hostAliases": {
        "restrictions": {
          "tagMatchCondition": "or"
        }
      }
    },
    "createdAt": "2000-01-01T12:00:00.000Z",
    "updatedAt": "2000-01-01T12:00:00.000Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
