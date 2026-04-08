# Scale job

Source: https://northflank.com/docs/v1/api/project/jobs/scale-job.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /jobs/patch-job instead](patch-job.md)

Modifies the scaling settings for the given job.

Required permission: Project > Jobs > Deployment > Scale Job

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `deploymentPlan`: (string) ID of the deployment plan to switch to. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `storage`: {object}
  - `useHdbStorage`: (boolean)
  - `usePdSsdStorage`: (boolean)
  - `ephemeralStorage`: {object}
    - `storageSize`: (integer) Ephemeral storage per container in MB
  - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/jobs/{jobId}/scale

POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/scale

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"deploymentPlan":"nf-compute-20","storage":{"ephemeralStorage":{"storageSize":1024}}}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/scale
```

```javascript
const payload = {
  "deploymentPlan": "nf-compute-20",
  "storage": {
    "ephemeralStorage": {
      "storageSize": 1024
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/scale', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/scale"

payload = {"deploymentPlan":"nf-compute-20","storage":{"ephemeralStorage":{"storageSize":1024}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/scale"

  var jsonStr = []byte(`{"deploymentPlan":"nf-compute-20","storage":{"ephemeralStorage":{"storageSize":1024}}}`)
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

$ northflank scale job

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
await apiClient.scale.job({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
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
