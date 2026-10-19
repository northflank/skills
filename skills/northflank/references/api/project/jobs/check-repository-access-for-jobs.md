# Check repository access for jobs

Source: https://northflank.com/docs/v1/api/project/jobs/check-repository-access-for-jobs.md

Check whether a repository is public or accessible through an existing Git connection in this project. Requires job creation permission and preserves workload project restrictions. Does not create a Git connection.

Required permission: Project > Jobs > General > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `projectUrl`: (string) (required) HTTPS URL of the git repository to check access for.
- `projectType`: (string) (required) The version control provider the repository belongs to. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
- `projectBranch`: (string) Optional branch to check.
- `vcsLinkId`: (string) If provided, only checks access via this specific linked account. (min length: 24) (max length: 24)
- `accountLogin`: (string) If provided, only checks access via the linked account with this login.
- `selfHostedVcsId`: (multiple options) (multiple options) (undefined)

**Response body:**

{object}
- `data`: {object}
  - `publicRepo`: (boolean) (required) Whether the repository is publicly reachable without a linked account.
  - `accessible`: (boolean) (required) Whether the repository can be accessed — publicly or via a linked account.
  - `vcsLinkId`: (string) The linked account that can access the repository. Present when `reason` is `linked-account`.
  - `accountLogin`: (string) Login of the linked account that can access the repository. Present when `reason` is `linked-account`.
  - `reason`: (string) (required) Why the repository is (in)accessible: `public` (reachable anonymously), `linked-account` (a linked account can access it), `no-linked-access` (no linked account can access it), or `not-found` (the repository URL does not resolve). (enum: public, linked-account, no-linked-access, not-found)

### API reference

POST /v1/projects/{projectId}/jobs/repo-access

POST /v1/teams/{teamId}/projects/{projectId}/jobs/repo-access

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"projectUrl":"https://github.com/northflank-examples/next-js-example","projectType":"github","projectBranch":"main","accountLogin":"example-user"}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/repo-access
```

```javascript
const payload = {
  "projectUrl": "https://github.com/northflank-examples/next-js-example",
  "projectType": "github",
  "projectBranch": "main",
  "accountLogin": "example-user"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/repo-access', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/repo-access"

payload = {"projectUrl":"https://github.com/northflank-examples/next-js-example","projectType":"github","projectBranch":"main","accountLogin":"example-user"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/repo-access"

  var jsonStr = []byte(`{"projectUrl":"https://github.com/northflank-examples/next-js-example","projectType":"github","projectBranch":"main","accountLogin":"example-user"}`)
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

200 OK: Public repository reachability or access through an existing Git connection.

```json
{
  "data": {
    "publicRepo": false,
    "accessible": true,
    "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
    "accountLogin": "example-user",
    "reason": "linked-account"
  }
}
```

### CLI reference

$ northflank get job repository-access

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "projectUrl": "https://github.com/northflank-examples/next-js-example",
  "projectType": "github",
  "projectBranch": "main",
  "accountLogin": "example-user"
}
```

#### Example Response

 Public repository reachability or access through an existing Git connection.

```json
{
  "publicRepo": false,
  "accessible": true,
  "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
  "accountLogin": "example-user",
  "reason": "linked-account"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.job.repositoryAccess({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "projectUrl": "https://github.com/northflank-examples/next-js-example",
    "projectType": "github",
    "projectBranch": "main",
    "accountLogin": "example-user"
  }
});
```

#### Example Response

 Public repository reachability or access through an existing Git connection.

```json
{
  "data": {
    "publicRepo": false,
    "accessible": true,
    "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
    "accountLogin": "example-user",
    "reason": "linked-account"
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

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
