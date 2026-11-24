# Create or update gradual rollout strategy

Source: https://northflank.com/docs/v1/api/team/rollout-strategies/create-or-update-gradual-rollout-strategy.md

Creates or updates a gradual rollout strategy.

Required permission: Account > Platform > GradualRollouts > Create

**Request body:**

{object} Gradual rollout strategy specification
- `name`: (string) Display name for the gradual rollout strategy
- `type`: (string) (required) Type of the gradual rollout strategy (enum: canary)
- `options`: {object}
  - `triggers`: {object} Conditions under which a new release will automatically initiate as a gradual rollout
    - `releaseFromTemplate`: (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a template
    - `releaseFromReleaseFlow`: (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a release flow
    - `releaseFromCD`: (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from a CD pipeline
    - `releaseFromUI`: (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated from the UI
    - `releaseFromApi`: (boolean) (nullable) Automatically trigger the rollout strategy when a release is initiated via the API
  - `blockDeploymentOnActiveRollout`: (boolean) (nullable) When enabled, new deployments are blocked while a rollout is in progress
- `details`: (multiple options) (required) Strategy-specific configuration details {object} Strategy-specific configuration details
   - `canaryStrategy`: (string) (required) Strategy used to split traffic between stable and canary deployments (enum: percentage, header)
   - `config`: (multiple options) (required) Configuration for the selected canary strategy {object} Configuration for the selected canary strategy
      - `canaryPercentage`: (integer) (required) Percentage of traffic to route to the canary deployment
      - `stablePercentage`: (integer) (required) Percentage of traffic to route to the stable deployment | {object} Configuration for the selected canary strategy
      - `canaryHeader`: {object} (required) Header configuration that will route traffic to the canary deployment
        - `headerName`: (string) (required) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1)
        - `headerValue`: (string) (required) HTTP header value that routes matching requests to the target deployment (min length: 1)
      - `stableHeader`: {object} (required) Header configuration that will route traffic to the stable deployment
        - `headerName`: (string) (required) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1)
        - `headerValue`: (string) (required) HTTP header value that routes matching requests to the target deployment (min length: 1)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) Identifier for the gradual rollout strategy
  - `name`: (string) (required) Name of the gradual rollout strategy
  - `type`: (string) (required) Type of the gradual rollout strategy (enum: canary)
  - `options`: {object}
    - `triggers`: {object}
      - `releaseFromTemplate`: (boolean) (nullable)
      - `releaseFromReleaseFlow`: (boolean) (nullable)
      - `releaseFromCD`: (boolean) (nullable)
      - `releaseFromUI`: (boolean) (nullable)
      - `releaseFromApi`: (boolean) (nullable)
    - `blockDeploymentOnActiveRollout`: (boolean) (nullable)
  - `details`: {object} (required)
    - `canaryStrategy`: (string) (required) (enum: percentage, header)
    - `config`: (multiple options) {object}
        - `canaryPercentage`: (integer) (required)
        - `stablePercentage`: (integer) (required) | {object}
        - `stableHeader`: {object}
          - `headerName`: (string) (required) (min length: 1)
          - `headerValue`: (string) (required) (min length: 1)
        - `canaryHeader`: {object}
          - `headerName`: (string) (required) (min length: 1)
          - `headerValue`: (string) (required) (min length: 1)

### API reference

PUT /v1/gradual-rollout-strategies

PUT /v1/teams/{teamId}/gradual-rollout-strategies

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"name":"my-canary-rollout","type":"canary","options":{"triggers":{"releaseFromTemplate":true,"releaseFromReleaseFlow":true,"releaseFromCD":true,"releaseFromUI":true,"releaseFromApi":true},"blockDeploymentOnActiveRollout":true},"details":{"canaryStrategy":"percentage","config":{"canaryPercentage":20,"stablePercentage":80}}}' \
  "https://api.northflank.com/v1/gradual-rollout-strategies"
```

```javascript
const payload = {
  "name": "my-canary-rollout",
  "type": "canary",
  "options": {
    "triggers": {
      "releaseFromTemplate": true,
      "releaseFromReleaseFlow": true,
      "releaseFromCD": true,
      "releaseFromUI": true,
      "releaseFromApi": true
    },
    "blockDeploymentOnActiveRollout": true
  },
  "details": {
    "canaryStrategy": "percentage",
    "config": {
      "canaryPercentage": 20,
      "stablePercentage": 80
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/gradual-rollout-strategies', {
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

url = "https://api.northflank.com/v1/gradual-rollout-strategies"

payload = "{\"name\":\"my-canary-rollout\",\"type\":\"canary\",\"options\":{\"triggers\":{\"releaseFromTemplate\":true,\"releaseFromReleaseFlow\":true,\"releaseFromCD\":true,\"releaseFromUI\":true,\"releaseFromApi\":true},\"blockDeploymentOnActiveRollout\":true},\"details\":{\"canaryStrategy\":\"percentage\",\"config\":{\"canaryPercentage\":20,\"stablePercentage\":80}}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, data = payload)

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
  url := "https://api.northflank.com/v1/gradual-rollout-strategies"

  var jsonStr = []byte("{\"name\":\"my-canary-rollout\",\"type\":\"canary\",\"options\":{\"triggers\":{\"releaseFromTemplate\":true,\"releaseFromReleaseFlow\":true,\"releaseFromCD\":true,\"releaseFromUI\":true,\"releaseFromApi\":true},\"blockDeploymentOnActiveRollout\":true},\"details\":{\"canaryStrategy\":\"percentage\",\"config\":{\"canaryPercentage\":20,\"stablePercentage\":80}}}")
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
    "id": "example-identifier",
    "name": "example-name",
    "type": "canary",
    "details": {
      "canaryStrategy": "percentage"
    }
  }
}
```

### CLI reference

$ northflank put gradual-rollout-strategy

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "my-canary-rollout",
  "type": "canary",
  "options": {
    "triggers": {
      "releaseFromTemplate": true,
      "releaseFromReleaseFlow": true,
      "releaseFromCD": true,
      "releaseFromUI": true,
      "releaseFromApi": true
    },
    "blockDeploymentOnActiveRollout": true
  },
  "details": {
    "canaryStrategy": "percentage",
    "config": {
      "canaryPercentage": 20,
      "stablePercentage": 80
    }
  }
}
```

#### Example Response

 Details about the created or updated project.

```json
{
  "id": "example-identifier",
  "name": "example-name",
  "type": "canary",
  "details": {
    "canaryStrategy": "percentage"
  }
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.put.gradualRolloutStrategy({
  data: {
    "name": "my-canary-rollout",
    "type": "canary",
    "options": {
      "triggers": {
        "releaseFromTemplate": true,
        "releaseFromReleaseFlow": true,
        "releaseFromCD": true,
        "releaseFromUI": true,
        "releaseFromApi": true
      },
      "blockDeploymentOnActiveRollout": true
    },
    "details": {
      "canaryStrategy": "percentage",
      "config": {
        "canaryPercentage": 20,
        "stablePercentage": 80
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
    "id": "example-identifier",
    "name": "example-name",
    "type": "canary",
    "details": {
      "canaryStrategy": "percentage"
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

response = client.put.gradual_rollout_strategy(
    data={
        "name": "my-canary-rollout",
        "type": "canary",
        "options": {
            "triggers": {
                "releaseFromTemplate": True,
                "releaseFromReleaseFlow": True,
                "releaseFromCD": True,
                "releaseFromUI": True,
                "releaseFromApi": True,
            },
            "blockDeploymentOnActiveRollout": True,
        },
        "details": {
            "canaryStrategy": "percentage",
            "config": {
                "canaryPercentage": 20,
                "stablePercentage": 80,
            },
        },
    },
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "example-identifier",
  "name": "example-name",
  "type": "canary",
  "details": {
    "canaryStrategy": "percentage"
  }
}
```
