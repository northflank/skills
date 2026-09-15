# Create container snapshot

Source: https://northflank.com/docs/v1/api/project/services/create-container-snapshot.md

Schedules a snapshot of a running deployment service pod. When no pod is provided, the service must have exactly one eligible pod. Repeated requests for an active pod return the existing snapshot.

Required permission: Account > Platform > ContainerSnapshots > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `podName`: (string) The running service pod to snapshot.
- `backupDestinationId`: (string) The backup destination to store the snapshot in.

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) (format: uuid)
  - `trigger`: (string) (required) (enum: manual, containerTermination)
  - `state`: (string) (required) (enum: scheduled, accepted, running, succeeded, failed, cancelled)
  - `source`: {object}
    - `projectId`: (string) (required)
    - `nfObject`: {object}
      - `id`: (string) (required)
      - `type`: (string) (required) (enum: job, service, harness, addon, volume, opentofu-job, llm-model-deployment, external-addon)
  - `target`: {object}
    - `podName`: (string) (required)
  - `compatibility`: {object}
    - `runtime`: (string) (required) (enum: kata)
    - `architecture`: (string) (required) (enum: x86, arm)
    - `baseImageDigest`: (string) (pattern: ^sha256:[0-9a-f]{64}$)
  - `parentSnapshotId`: (string) (format: uuid)
  - `inUse`: (boolean) (required)
  - `result`: {object}
    - `sizeBytes`: (integer) (required)
  - `error`: {object}
    - `code`: (string) (required)
    - `message`: (string) (required)
    - `retryable`: (boolean) (required)
  - `requestedAt`: (string) (format: date-time)
  - `deadline`: (string) (format: date-time)
  - `lastTransitionTime`: (string) (required) (format: date-time)
  - `startedAt`: (string) (format: date-time)
  - `completedAt`: (string) (format: date-time)
  - `createdAt`: (string) (required) (format: date-time)
  - `updatedAt`: (string) (required) (format: date-time)

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/snapshots

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/snapshots

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"__depth":1}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/snapshots
```

```javascript
const payload = {
  "__depth": 1
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/snapshots', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/snapshots"

payload = {"__depth":1}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/snapshots"

  var jsonStr = []byte(`{"__depth":1}`)
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

202 Accepted: The scheduled container snapshot.

```json
undefined
```

#### Example Response

409 Conflict: No eligible pod exists, or multiple eligible pods require explicit selection.

### CLI reference

$ northflank create container-snapshot

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
  "__depth": 1
}
```

#### Example Response

 The scheduled container snapshot.

```json
undefined
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.containerSnapshot({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "__depth": 1
  }
});
```

#### Example Response

 The scheduled container snapshot.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
