# Update job settings

Source: https://northflank.com/docs/v1/api/project/jobs/update-job-settings.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /jobs/patch-job instead](patch-job.md)

Updates settings for the job

Required permission: Project > Jobs > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `backoffLimit`: (integer) The number of attempts to rerun a job before it is marked as failed.
- `runOnSourceChange`: (string) Configure when the job should be run if the source image changes. (enum: never, cd-promote, always)
- `activeDeadlineSeconds`: (integer) The maximum amount of time, in seconds, for a job to run before it is marked as failed.
- `schedule`: (string) The cron timer scheduling when to run the job. Required for cron jobs and unavailable for other job types. (pattern: (@(annually|yearly|monthly|weekly|daily|hourly))|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5}))
- `concurrencyPolicy`: (string) Whether this job should run when another instance of the job is already running. Only available for cron jobs. `allow` will enable multiple instances of this job to run. `forbid` will keep the current instance of the job running and stop a new instance from being run. `replace` will terminate any currently running instance of the job and start a new one. (enum: allow, forbid, replace)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/jobs/{jobId}/settings

POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/settings

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"backoffLimit":0,"runOnSourceChange":"never","activeDeadlineSeconds":600,"schedule":"30 8 * * *","concurrencyPolicy":"allow"}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/settings
```

```javascript
const payload = {
  "backoffLimit": 0,
  "runOnSourceChange": "never",
  "activeDeadlineSeconds": 600,
  "schedule": "30 8 * * *",
  "concurrencyPolicy": "allow"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/settings', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/settings"

payload = {"backoffLimit":0,"runOnSourceChange":"never","activeDeadlineSeconds":600,"schedule":"30 8 * * *","concurrencyPolicy":"allow"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/settings"

  var jsonStr = []byte(`{"backoffLimit":0,"runOnSourceChange":"never","activeDeadlineSeconds":600,"schedule":"30 8 * * *","concurrencyPolicy":"allow"}`)
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

$ northflank update job settings

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
  "backoffLimit": 0,
  "runOnSourceChange": "never",
  "activeDeadlineSeconds": 600,
  "schedule": "30 8 * * *",
  "concurrencyPolicy": "allow"
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
await apiClient.update.job.settings({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "backoffLimit": 0,
    "runOnSourceChange": "never",
    "activeDeadlineSeconds": 600,
    "schedule": "30 8 * * *",
    "concurrencyPolicy": "allow"
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
