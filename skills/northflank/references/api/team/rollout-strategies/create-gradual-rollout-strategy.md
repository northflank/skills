# Create gradual rollout strategy

Source: https://northflank.com/docs/v1/api/team/rollout-strategies/create-gradual-rollout-strategy.md

Creates a new gradual rollout strategy.

Required permission: Account > GradualRollouts > General > Create

**Request body:**

{object}
- `name`: (string) Display name for the gradual rollout strategy
- `type`: (string) (required) Type of the gradual rollout strategy (enum: canary)
- `options`: {object}
  - `triggers`: {object}
    - `releaseFromTemplate`: (boolean) Automatically trigger the rollout strategy when a release is initiated from a template
    - `releaseFromReleaseFlow`: (boolean) Automatically trigger the rollout strategy when a release is initiated from a release flow
    - `releaseFromCD`: (boolean) Automatically trigger the rollout strategy when a release is initiated from a CD pipeline
    - `releaseFromUI`: (boolean) Automatically trigger the rollout strategy when a release is initiated from the UI
    - `releaseFromApi`: (boolean) Automatically trigger the rollout strategy when a release is initiated via the API
  - `blockDeploymentOnActiveRollout`: (boolean) When enabled, new deployments are blocked while a rollout is in progress
- `details`: (multiple options) {object}
   - `canaryStrategy`: (string) (required) Strategy used to split traffic between stable and canary deployments (enum: percentage, header)
   - `config`: (multiple options) {object}
      - `canaryPercentage`: (integer) (required) Percentage of traffic to route to the canary deployment
      - `stablePercentage`: (integer) (required) Percentage of traffic to route to the stable deployment | {object}
      - `canaryHeader`: {object}
        - `headerName`: (string) (required) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1)
        - `headerValue`: (string) (required) HTTP header value that routes matching requests to the target deployment (min length: 1)
      - `stableHeader`: {object}
        - `headerName`: (string) (required) HTTP header name used to identify requests that should be routed to the target deployment (min length: 1)
        - `headerValue`: (string) (required) HTTP header value that routes matching requests to the target deployment (min length: 1)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the gradual rollout strategy
  - `name`: (string) (required) Name of the gradual rollout strategy
  - `type`: (string) (required) Type of the gradual rollout strategy (enum: canary)
  - `options`: {object}
    - `triggers`: {object}
      - `releaseFromTemplate`: (boolean)
      - `releaseFromReleaseFlow`: (boolean)
      - `releaseFromCD`: (boolean)
      - `releaseFromUI`: (boolean)
      - `releaseFromApi`: (boolean)
    - `blockDeploymentOnActiveRollout`: (boolean)
  - `details`: {object}
    - `canaryStrategy`: (string) (required) (enum: percentage, header)
    - `config`: (multiple options) {object}
        - `canaryPercentage`: (integer) (required)
        - `stablePercentage`: (integer) (required) | {object}
        - `headerName`: (string) (required) (min length: 1)
        - `headerValue`: (string) (required) (min length: 1)

### API reference

POST /v1/gradual-rollout-strategies

POST /v1/teams/{teamId}/gradual-rollout-strategies

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"my-canary-rollout","type":"canary","options":{"triggers":{"releaseFromTemplate":true,"releaseFromReleaseFlow":true,"releaseFromCD":true,"releaseFromUI":true,"releaseFromApi":true},"blockDeploymentOnActiveRollout":true},"details":{"canaryStrategy":"percentage","config":{"canaryPercentage":20,"stablePercentage":80}}}' \
  https://api.northflank.com/v1/gradual-rollout-strategies
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

url = "https://api.northflank.com/v1/gradual-rollout-strategies"

payload = {"name":"my-canary-rollout","type":"canary","options":{"triggers":{"releaseFromTemplate":true,"releaseFromReleaseFlow":true,"releaseFromCD":true,"releaseFromUI":true,"releaseFromApi":true},"blockDeploymentOnActiveRollout":true},"details":{"canaryStrategy":"percentage","config":{"canaryPercentage":20,"stablePercentage":80}}}
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
  url := "https://api.northflank.com/v1/gradual-rollout-strategies"

  var jsonStr = []byte(`{"name":"my-canary-rollout","type":"canary","options":{"triggers":{"releaseFromTemplate":true,"releaseFromReleaseFlow":true,"releaseFromCD":true,"releaseFromUI":true,"releaseFromApi":true},"blockDeploymentOnActiveRollout":true},"details":{"canaryStrategy":"percentage","config":{"canaryPercentage":20,"stablePercentage":80}}}`)
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

200 OK: Details about the created gradual rollout strategy.

```json
{
  "data": {
    "id": "example-identifier",
    "name": "example-name",
    "type": "canary"
  }
}
```

### CLI reference

$ northflank create gradual-rollout-strategy

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

 Details about the created gradual rollout strategy.

```json
{
  "id": "example-identifier",
  "name": "example-name",
  "type": "canary"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.gradualRolloutStrategy({
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

 Details about the created gradual rollout strategy.

```json
{
  "data": {
    "id": "example-identifier",
    "name": "example-name",
    "type": "canary"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
