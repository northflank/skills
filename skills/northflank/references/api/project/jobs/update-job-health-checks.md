# Update job health checks

Source: https://northflank.com/docs/v1/api/project/jobs/update-job-health-checks.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /jobs/patch-job instead](patch-job.md)

Updates health checks for the given job.

Required permission: Project > Jobs > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `healthChecks`: [array of] {object}
   - `protocol`: (string) (required) The protocol to access the health check with. (enum: HTTP, CMD, TCP)
   - `type`: (string) (required) The type of health check. (enum: livenessProbe, readinessProbe, startupProbe)
   - `path`: (string) The path of the health check endpoint. Required when protocol is HTTP. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*((\?([a-zA-Z0-9-._]+(=[a-zA-Z0-9-._]+)?)*)(&([a-zA-Z0-9-._]+(=[a-zA-Z0-9-._]+)?)*)*)?$)
   - `cmd`: (string) The command to run for the health check. Required when protocol is CMD
   - `port`: (integer) Port number for the health check endpoint. Required when protocol is HTTP.
   - `initialDelaySeconds`: (integer) (required) Initial delay, in seconds, before the health check is first run.
   - `periodSeconds`: (integer) (required) The time between each check, in seconds.
   - `timeoutSeconds`: (integer) (required) The time to wait for a response before marking the health check as a failure.
   - `failureThreshold`: (integer) (required) The maximum number of allowed failures.
   - `successThreshold`: (integer) The number of successes required to mark the health check as a success.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/jobs/{jobId}/health-checks

POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/health-checks

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}]}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/health-checks
```

```javascript
const payload = {
  "healthChecks": [
    {
      "protocol": "HTTP",
      "type": "readinessProbe",
      "path": "/health-check",
      "port": 8080,
      "initialDelaySeconds": 10,
      "periodSeconds": 60,
      "timeoutSeconds": 1,
      "failureThreshold": 3,
      "successThreshold": 1
    }
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/health-checks', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/health-checks"

payload = {"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/health-checks"

  var jsonStr = []byte(`{"healthChecks":[{"protocol":"HTTP","type":"readinessProbe","path":"/health-check","port":8080,"initialDelaySeconds":10,"periodSeconds":60,"timeoutSeconds":1,"failureThreshold":3,"successThreshold":1}]}`)
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

$ northflank update job health-checks

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "healthChecks": [
    {
      "protocol": "HTTP",
      "type": "readinessProbe",
      "path": "/health-check",
      "port": 8080,
      "initialDelaySeconds": 10,
      "periodSeconds": 60,
      "timeoutSeconds": 1,
      "failureThreshold": 3,
      "successThreshold": 1
    }
  ]
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
await apiClient.update.job.healthChecks({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "healthChecks": [
      {
        "protocol": "HTTP",
        "type": "readinessProbe",
        "path": "/health-check",
        "port": 8080,
        "initialDelaySeconds": 10,
        "periodSeconds": 60,
        "timeoutSeconds": 1,
        "failureThreshold": 3,
        "successThreshold": 1
      }
    ]
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
