# Update service rollout configuration

Source: https://northflank.com/docs/v1/api/project/rollout-strategies/update-service-rollout-configuration.md

Updates the traffic split of the active gradual rollout. Only percentage based rollouts can be reconfigured. Setting the canary to 100% promotes the rollout.

Required permission: Project > Services > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `canaryPercentage`: (integer) (required) Percentage of traffic to route to the canary deployment. Must sum to 100 with stablePercentage.
- `stablePercentage`: (integer) (required) Percentage of traffic to route to the stable deployment. Must sum to 100 with canaryPercentage.

**Response body:**

{object}
- `data`: {object}
  - `strategyId`: (string) (required) ID of the gradual rollout strategy this rollout was created from. Null if the strategy has since been deleted.
  - `type`: (string) (required) Type of the gradual rollout strategy. (enum: canary)
  - `promoted`: (boolean) (required) Whether the canary has been promoted to stable. A promoted rollout serves all traffic from the canary deployment and can no longer be reconfigured.
  - `createdAt`: (string) (required) Time the rollout started. (format: date-time)
  - `updatedAt`: (string) (required) Time the rollout was last changed. (format: date-time)
  - `options`: {object}
    - `triggers`: {object}
      - `releaseFromTemplate`: (boolean)
      - `releaseFromReleaseFlow`: (boolean)
      - `releaseFromCD`: (boolean)
      - `releaseFromUI`: (boolean)
      - `releaseFromApi`: (boolean)
    - `blockDeploymentOnActiveRollout`: (boolean) Whether new deployments are blocked while this rollout is in progress.
  - `details`: {object}
    - `canaryStrategy`: (string) (required) How traffic is split between the stable and canary deployments. (enum: percentage, header)
    - `config`: (multiple options) {object}
        - `canaryPercentage`: (integer) (required) Percentage of traffic to route to the canary deployment. Must sum to 100 with stablePercentage.
        - `stablePercentage`: (integer) (required) Percentage of traffic to route to the stable deployment. Must sum to 100 with canaryPercentage. | {object}
        - `canaryHeader`: {object}
          - `headerName`: (string) (required)
          - `headerValue`: (string) (required)
        - `stableHeader`: {object}
          - `headerName`: (string) (required)
          - `headerValue`: (string) (required)
  - `stableDeployment`: {object}
    - `id`: (string) (required) Identifier of the deployment. Use this as the rollback target.
    - `name`: (string) Display name of the deployment. Null until the first pod of the deployment has been observed.
    - `createdAt`: (string) (required) Time the deployment was created. (format: date-time)
    - `active`: (boolean) Whether the deployment is currently serving traffic. During a gradual rollout both the stable and the canary deployment are active.
    - `releaseType`: (string) Current role of the deployment in the gradual rollout. This is mutable: promoting a canary deployment changes its release type to `stable`, so it does not record how the deployment was originally created. Absent for services that do not use a gradual rollout strategy. (enum: stable, canary)
    - `image`: {object}
      - `imagePath`: (string) Full path of the deployed image.
      - `image`: (string) Name of the deployed image.
      - `tag`: (string) Tag of the deployed image.
      - `sha`: (string) Digest of the deployed image.
    - `commit`: {object}
      - `sha`: (string) Commit the deployed image was built from.
      - `message`: (string) Commit message.
      - `author`: (string) Login of the commit author.
      - `date`: (multiple options) (string) | (string) (format: date-time)
    - `instances`: (number) Number of instances the deployment was created with. (format: float)
    - `reason`: {object}
      - `id`: (string) Why the deployment was created.
      - `user`: {object}
        - `name`: (string) Name of the acting user.
        - `email`: (string) Email of the acting user.
  - `canaryDeployment`: {object}
    - `id`: (string) (required) Identifier of the deployment. Use this as the rollback target.
    - `name`: (string) Display name of the deployment. Null until the first pod of the deployment has been observed.
    - `createdAt`: (string) (required) Time the deployment was created. (format: date-time)
    - `active`: (boolean) Whether the deployment is currently serving traffic. During a gradual rollout both the stable and the canary deployment are active.
    - `releaseType`: (string) Current role of the deployment in the gradual rollout. This is mutable: promoting a canary deployment changes its release type to `stable`, so it does not record how the deployment was originally created. Absent for services that do not use a gradual rollout strategy. (enum: stable, canary)
    - `image`: {object}
      - `imagePath`: (string) Full path of the deployed image.
      - `image`: (string) Name of the deployed image.
      - `tag`: (string) Tag of the deployed image.
      - `sha`: (string) Digest of the deployed image.
    - `commit`: {object}
      - `sha`: (string) Commit the deployed image was built from.
      - `message`: (string) Commit message.
      - `author`: (string) Login of the commit author.
      - `date`: (multiple options) (string) | (string) (format: date-time)
    - `instances`: (number) Number of instances the deployment was created with. (format: float)
    - `reason`: {object}
      - `id`: (string) Why the deployment was created.
      - `user`: {object}
        - `name`: (string) Name of the acting user.
        - `email`: (string) Email of the acting user.
  - `history`: [array of] {object}
     - `config`: (multiple options) {object}
         - `canaryPercentage`: (integer) (required) Percentage of traffic to route to the canary deployment. Must sum to 100 with stablePercentage.
         - `stablePercentage`: (integer) (required) Percentage of traffic to route to the stable deployment. Must sum to 100 with canaryPercentage. | {object}
         - `canaryHeader`: {object}
           - `headerName`: (string) (required)
           - `headerValue`: (string) (required)
         - `stableHeader`: {object}
           - `headerName`: (string) (required)
           - `headerValue`: (string) (required)
     - `updatedAt`: (string) (required) Time the split was applied. (format: date-time)

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/rollout/configuration

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout/configuration

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"canaryPercentage":20,"stablePercentage":80}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/configuration
```

```javascript
const payload = {
  "canaryPercentage": 20,
  "stablePercentage": 80
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/configuration', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/configuration"

payload = {"canaryPercentage":20,"stablePercentage":80}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/configuration"

  var jsonStr = []byte(`{"canaryPercentage":20,"stablePercentage":80}`)
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

200 OK: The rollout after the configuration was applied.

```json
{
  "data": {
    "strategyId": "example-gradual-rollout-strategy",
    "type": "canary",
    "promoted": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z",
    "details": {
      "canaryStrategy": "percentage",
      "config": {
        "canaryPercentage": 20,
        "stablePercentage": 80
      }
    },
    "stableDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "canaryDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "history": [
      {
        "config": {
          "canaryPercentage": 20,
          "stablePercentage": 80
        },
        "updatedAt": "2024-01-15T10:45:00.000Z"
      }
    ]
  }
}
```

#### Example Response

404 Not Found: The service does not have an active gradual rollout.

#### Example Response

409 Conflict: The rollout has been promoted, splits traffic by header, or the canary deployment is not ready.

### CLI reference

$ northflank update service rollout configuration

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "canaryPercentage": 20,
  "stablePercentage": 80
}
```

#### Example Response

 The rollout after the configuration was applied.

```json
{
  "strategyId": "example-gradual-rollout-strategy",
  "type": "canary",
  "promoted": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z",
  "details": {
    "canaryStrategy": "percentage",
    "config": {
      "canaryPercentage": 20,
      "stablePercentage": 80
    }
  },
  "stableDeployment": {
    "id": "6560a1b2c3d4e5f6a7b8c9d0",
    "name": "example-service-7d9f8b6c5d",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "active": true,
    "releaseType": "canary",
    "image": {
      "imagePath": "nginx:latest",
      "image": "nginx",
      "tag": "latest",
      "sha": "sha256:9c8f8d"
    },
    "commit": {
      "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      "message": "fix: handle empty payload",
      "author": "octocat"
    },
    "instances": 2,
    "reason": {
      "id": "service-updated",
      "user": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  },
  "canaryDeployment": {
    "id": "6560a1b2c3d4e5f6a7b8c9d0",
    "name": "example-service-7d9f8b6c5d",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "active": true,
    "releaseType": "canary",
    "image": {
      "imagePath": "nginx:latest",
      "image": "nginx",
      "tag": "latest",
      "sha": "sha256:9c8f8d"
    },
    "commit": {
      "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      "message": "fix: handle empty payload",
      "author": "octocat"
    },
    "instances": 2,
    "reason": {
      "id": "service-updated",
      "user": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  },
  "history": [
    {
      "config": {
        "canaryPercentage": 20,
        "stablePercentage": 80
      },
      "updatedAt": "2024-01-15T10:45:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.service.rollout.configuration({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "canaryPercentage": 20,
    "stablePercentage": 80
  }
});
```

#### Example Response

 The rollout after the configuration was applied.

```json
{
  "data": {
    "strategyId": "example-gradual-rollout-strategy",
    "type": "canary",
    "promoted": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z",
    "details": {
      "canaryStrategy": "percentage",
      "config": {
        "canaryPercentage": 20,
        "stablePercentage": 80
      }
    },
    "stableDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "canaryDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "history": [
      {
        "config": {
          "canaryPercentage": 20,
          "stablePercentage": 80
        },
        "updatedAt": "2024-01-15T10:45:00.000Z"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
