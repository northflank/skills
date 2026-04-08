# Scale service

Source: https://northflank.com/docs/v1/api/project/services/scale-service.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /services/patch-combined-service instead](patch-combined-service.md)

Modifies the scaling settings for the given service.

Required permission: Project > Services > Deployment > Scale Service

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `instances`: (integer) The number of instances to scale the service to
- `deploymentPlan`: (string) ID of the deployment plan to switch to. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `storage`: {object}
  - `useHdbStorage`: (boolean)
  - `usePdSsdStorage`: (boolean)
  - `ephemeralStorage`: {object}
    - `storageSize`: (integer) Ephemeral storage per container in MB
  - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
- `gracePeriodSeconds`: (integer) The maximum amount of time the process has to shut down after receiving a SIGTERM signal before it is forcefully shut down SIGKILL by the system.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/scale

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/scale

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"instances":1,"deploymentPlan":"nf-compute-20","storage":{"ephemeralStorage":{"storageSize":1024}}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/scale
```

```javascript
const payload = {
  "instances": 1,
  "deploymentPlan": "nf-compute-20",
  "storage": {
    "ephemeralStorage": {
      "storageSize": 1024
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/scale', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/scale"

payload = {"instances":1,"deploymentPlan":"nf-compute-20","storage":{"ephemeralStorage":{"storageSize":1024}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/scale"

  var jsonStr = []byte(`{"instances":1,"deploymentPlan":"nf-compute-20","storage":{"ephemeralStorage":{"storageSize":1024}}}`)
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

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank scale service

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
  "instances": 1,
  "deploymentPlan": "nf-compute-20",
  "storage": {
    "ephemeralStorage": {
      "storageSize": 1024
    }
  }
}
```

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.scale.service({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "instances": 1,
    "deploymentPlan": "nf-compute-20",
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    }
  }
});
```

#### Example Response

 The operation was performed successfully.

```json
{
  "data": {},
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
