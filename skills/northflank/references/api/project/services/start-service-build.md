# Start service build

Source: https://northflank.com/docs/v1/api/project/services/start-service-build.md

Start a new build for the given combined or build service. If given a commit sha, it will build that commit. Otherwise, the most recent relevant commit will be built. If the service provided is a build service, a branch name or pull request to build from is required.

Required permission: Project > Services > Deployment > Deploy Build

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

(multiple options) {object}
 - `bundleUrl`: (string) (required) URL of the bundle to be built
 - `branch`: (string)
 - `sha`: (string) | {object}
 - `sha`: (string) Commit sha to build. If not provided, builds the most recent relevant commit. (min length: 40) (max length: 40)
 - `branch`: (string) Branch to build from. If `sha` is not provided, the latest commit of this branch will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both.
 - `pullRequestId`: (integer) ID of a pull request to build from. If `sha` is not provided, the latest commit of this pull request will be built. Only supported by build services. Build services require either `branch` or `pullRequestId` field, but cannot be provided with both.
 - `overrides`: {object}
   - `buildArguments`: {object}
   - `buildFiles`: {object}
   - `dockerSecretMounts`: {object}
   - `docker`: {object}
     - `dockerFilePath`: (string) The file path of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
     - `dockerWorkDir`: (string) The working directory of the Dockerfile. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]*$)
     - `dockerfileTarget`: (string) If your Dockerfile contains multiple build stages, you can specify the target stage by entering its name here. (pattern: ^[a-zA-Z0-9-_]+$)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the build.
  - `branch`: (string) Name of the branch the built commit belongs to.
  - `pullRequestId`: (number) ID of the pull request the commit belongs to. (format: float)
  - `sha`: (string) The sha of the built commit.
  - `registry`: {object}
    - `uri`: (string) URI of that can be used to pull the image from the registry
  - `createdAt`: (string) Timestamp of the build initiation.
  - `status`: (string) The status of the build.
  - `concluded`: (boolean) Whether the build has finished.

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/build

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"bundleUrl":"https://example.com/archive.tar"}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build
```

```javascript
const payload = {
  "bundleUrl": "https://example.com/archive.tar"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build"

payload = {"bundleUrl":"https://example.com/archive.tar"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/build"

  var jsonStr = []byte(`{"bundleUrl":"https://example.com/archive.tar"}`)
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

200 OK: Returns data about the build initiated

```json
{
  "data": {
    "id": "joyous-view-6290",
    "branch": "main",
    "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
    "createdAt": "2021-07-28T15:55:38.296Z",
    "status": "PENDING",
    "concluded": false
  }
}
```

### CLI reference

$ northflank start service build

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
  "bundleUrl": "https://example.com/archive.tar"
}
```

#### Example Response

 Returns data about the build initiated

```json
{
  "id": "joyous-view-6290",
  "branch": "main",
  "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
  "createdAt": "2021-07-28T15:55:38.296Z",
  "status": "PENDING",
  "concluded": false
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.start.service.build({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "bundleUrl": "https://example.com/archive.tar"
  }
});
```

#### Example Response

 Returns data about the build initiated

```json
{
  "data": {
    "id": "joyous-view-6290",
    "branch": "main",
    "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
    "createdAt": "2021-07-28T15:55:38.296Z",
    "status": "PENDING",
    "concluded": false
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
