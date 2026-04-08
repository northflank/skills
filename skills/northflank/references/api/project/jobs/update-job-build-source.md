# Update job build source

Source: https://northflank.com/docs/v1/api/project/jobs/update-job-build-source.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /jobs/patch-job instead](patch-job.md)

Updates the version control source for a given job.

Required permission: Project > Jobs > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `projectUrl`: (string) URL of the Git repo to build. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
- `projectType`: (string) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
- `projectBranch`: (string) The name of the branch to use.
- `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
- `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/jobs/{jobId}/build-source

POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-source

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","projectBranch":"master","accountLogin":"github-user"}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build-source
```

```javascript
const payload = {
  "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
  "projectType": "github",
  "projectBranch": "master",
  "accountLogin": "github-user"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build-source', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build-source"

payload = {"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","projectBranch":"master","accountLogin":"github-user"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build-source"

  var jsonStr = []byte(`{"projectUrl":"https://github.com/northflank/gatsby-with-northflank","projectType":"github","projectBranch":"master","accountLogin":"github-user"}`)
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

$ northflank update job build-source

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
  "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
  "projectType": "github",
  "projectBranch": "master",
  "accountLogin": "github-user"
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
await apiClient.update.job.buildSource({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "projectBranch": "master",
    "accountLogin": "github-user"
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
