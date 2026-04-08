# Start job build

Source: https://northflank.com/docs/v1/api/project/jobs/start-job-build.md

Start a new build for the given job. Given a commit sha, it will build that commit.

Required permission: Project > Jobs > Deployment > Deploy Build

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `sha`: (string) Commit sha to build. If not provided, will build the most recent commit of the job's branch. (min length: 40) (max length: 40)

OR

{object}
- `sha`: (string) Commit sha to build. If not provided, will build the most recent commit of the job's branch. (min length: 40) (max length: 40)
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

POST /v1/projects/{projectId}/jobs/{jobId}/build

POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build

#### Example request

Request body

Start a build with the current settings

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"sha":"262ed9817b3cad5142fbceabe0c9e371e390d616"}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build
```

```javascript
const payload = {
  "sha": "262ed9817b3cad5142fbceabe0c9e371e390d616"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build"

payload = {"sha":"262ed9817b3cad5142fbceabe0c9e371e390d616"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build"

  var jsonStr = []byte(`{"sha":"262ed9817b3cad5142fbceabe0c9e371e390d616"}`)
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

OR

Start a build with overrides for the current settings

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"sha":"262ed9817b3cad5142fbceabe0c9e371e390d616","overrides":{"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"docker":{"dockerFilePath":"/Dockerfile","dockerWorkDir":"/"}}}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build
```

```javascript
const payload = {
  "sha": "262ed9817b3cad5142fbceabe0c9e371e390d616",
  "overrides": {
    "buildArguments": {
      "ARGUMENT_1": "abcdef",
      "ARGUMENT_2": "12345"
    },
    "buildFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "docker": {
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build"

payload = {"sha":"262ed9817b3cad5142fbceabe0c9e371e390d616","overrides":{"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"docker":{"dockerFilePath":"/Dockerfile","dockerWorkDir":"/"}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build"

  var jsonStr = []byte(`{"sha":"262ed9817b3cad5142fbceabe0c9e371e390d616","overrides":{"buildArguments":{"ARGUMENT_1":"abcdef","ARGUMENT_2":"12345"},"buildFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"docker":{"dockerFilePath":"/Dockerfile","dockerWorkDir":"/"}}}`)
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

$ northflank start job build

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

Start a build with the current settings

```json
{
  "sha": "262ed9817b3cad5142fbceabe0c9e371e390d616"
}
```

OR

Start a build with overrides for the current settings

```json
{
  "sha": "262ed9817b3cad5142fbceabe0c9e371e390d616",
  "overrides": {
    "buildArguments": {
      "ARGUMENT_1": "abcdef",
      "ARGUMENT_2": "12345"
    },
    "buildFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "docker": {
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/"
    }
  }
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

Start a build with the current settings

```javascript
await apiClient.start.job.build({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "sha": "262ed9817b3cad5142fbceabe0c9e371e390d616"
  }
});
```

OR

Start a build with overrides for the current settings

```javascript
await apiClient.start.job.build({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "sha": "262ed9817b3cad5142fbceabe0c9e371e390d616",
    "overrides": {
      "buildArguments": {
        "ARGUMENT_1": "abcdef",
        "ARGUMENT_2": "12345"
      },
      "buildFiles": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      },
      "dockerSecretMounts": {
        "example-secret-mount_1": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      },
      "docker": {
        "dockerFilePath": "/Dockerfile",
        "dockerWorkDir": "/"
      }
    }
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
