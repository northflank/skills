# Resume job

Source: https://northflank.com/docs/v1/api/project/jobs/resume-job.md

Resumes the given job. Optionally takes several arguments to override resumed settings.

Required permission: Project > Jobs > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `suspended`: (boolean) In the case of cron jobs, whether scheduling should be paused.
- `disabledCI`: (boolean) Whether CI should be disabled
- `disabledCD`: (boolean) Whether CD should be disabled

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/jobs/{jobId}/resume

POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/resume

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"suspended":false,"disabledCI":false,"disabledCD":false}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/resume
```

```javascript
const payload = {
  "suspended": false,
  "disabledCI": false,
  "disabledCD": false
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/resume', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/resume"

payload = {"suspended":false,"disabledCI":false,"disabledCD":false}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/resume"

  var jsonStr = []byte(`{"suspended":false,"disabledCI":false,"disabledCD":false}`)
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

#### Example Response

409 Conflict: The job could not be resumed as it is not paused.

### CLI reference

$ northflank resume job

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
  "suspended": false,
  "disabledCI": false,
  "disabledCD": false
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
await apiClient.resume.job({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "suspended": false,
    "disabledCI": false,
    "disabledCD": false
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
