# Run job

Source: https://northflank.com/docs/v1/api/project/jobs/run-job.md

Starts a new job run for the given job

Required permission: Project > Jobs > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Request body:**

{object}
- `runtimeEnvironment`: {object}
- `runtimeFiles`: {object}
- `dockerSecretMounts`: {object}
- `billing`: {object}
  - `deploymentPlan`: (string) The ID of the deployment plan override to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `deployment`: (multiple options) {object}
   - `docker`: {object}
     - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
     - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
     - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
   - `buildpack`: {object}
     - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
     - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
     - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
     - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
   - `storage`: {object}
     - `useHdbStorage`: (boolean)
     - `usePdSsdStorage`: (boolean)
     - `ephemeralStorage`: {object}
       - `storageSize`: (integer) Ephemeral storage per container in MB
     - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
   - `internal`: {object}
     - `id`: (multiple options) (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string)
     - `branch`: (string) Branch to deploy
     - `buildSHA`: (multiple options) (string) A commit sha. (min length: 40) (max length: 40) | (string) Latest commit. (enum: latest)
     - `buildId`: (string) ID of the build that should be deployed | {object}
   - `docker`: {object}
     - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
     - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
     - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`
   - `buildpack`: {object}
     - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
     - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
     - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
     - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
   - `storage`: {object}
     - `useHdbStorage`: (boolean)
     - `usePdSsdStorage`: (boolean)
     - `ephemeralStorage`: {object}
       - `storageSize`: (integer) Ephemeral storage per container in MB
     - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
   - `external`: {object}
     - `imagePath`: (string) (required) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+)(\/v1)?)?(?:\/)?([a-zA-Z/-9\.\-_]+)(?:\:([a-zA-Z/-9\.\-_\:]+)|\@([a-zA-Z/-9\.\-_\:]+))$)
     - `credentials`: (string) ID of the saved credentials to use to access this external image. (pattern: ^[A-Za-z0-9-]+$)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) The ID of the job run
  - `runName`: (string) (required) The name of the job run

### API reference

POST /v1/projects/{projectId}/jobs/{jobId}/runs

POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runs

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"billing":{"deploymentPlan":"nf-compute-20"},"deployment":{"docker":{"configType":"default"},"storage":{"ephemeralStorage":{"storageSize":1024}},"internal":{"id":"example-build-service","branch":"master","buildId":"premium-guide-6393"}}}' \
  https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/runs
```

```javascript
const payload = {
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
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
  "billing": {
    "deploymentPlan": "nf-compute-20"
  },
  "deployment": {
    "docker": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "internal": {
      "id": "example-build-service",
      "branch": "master",
      "buildId": "premium-guide-6393"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/runs', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/runs"

payload = {"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"billing":{"deploymentPlan":"nf-compute-20"},"deployment":{"docker":{"configType":"default"},"storage":{"ephemeralStorage":{"storageSize":1024}},"internal":{"id":"example-build-service","branch":"master","buildId":"premium-guide-6393"}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/runs"

  var jsonStr = []byte(`{"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"billing":{"deploymentPlan":"nf-compute-20"},"deployment":{"docker":{"configType":"default"},"storage":{"ephemeralStorage":{"storageSize":1024}},"internal":{"id":"example-build-service","branch":"master","buildId":"premium-guide-6393"}}}`)
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

200 OK: Details about the new job run.

```json
{
  "data": {
    "id": "d34582a4-35bd-4c71-8e7c-e36999b88723",
    "runName": "example-job-5fcf67bc56e1913e21d49504"
  }
}
```

### CLI reference

$ northflank start job run

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
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
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
  "billing": {
    "deploymentPlan": "nf-compute-20"
  },
  "deployment": {
    "docker": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "internal": {
      "id": "example-build-service",
      "branch": "master",
      "buildId": "premium-guide-6393"
    }
  }
}
```

#### Example Response

 Details about the new job run.

```json
{
  "id": "d34582a4-35bd-4c71-8e7c-e36999b88723",
  "runName": "example-job-5fcf67bc56e1913e21d49504"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.start.job.run({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  data: {
    "runtimeEnvironment": {
      "VARIABLE_1": "abcdef",
      "VARIABLE_2": "12345"
    },
    "runtimeFiles": {
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
    "billing": {
      "deploymentPlan": "nf-compute-20"
    },
    "deployment": {
      "docker": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      },
      "internal": {
        "id": "example-build-service",
        "branch": "master",
        "buildId": "premium-guide-6393"
      }
    }
  }
});
```

#### Example Response

 Details about the new job run.

```json
{
  "data": {
    "id": "d34582a4-35bd-4c71-8e7c-e36999b88723",
    "runName": "example-job-5fcf67bc56e1913e21d49504"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
