# Run workflow

Source: https://northflank.com/docs/v1/api/project/workflows/run-workflow.md

Runs a given workflow with given arguments. This endpoint can be used as part of a CI pipeline to automatically trigger a release process.

Required permission: Project > Workflows > Runs > Start

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `workflowId`: (string) (required) ID of the workflow

**Request body:**

{object}
- `name`: (string) The optional name of the workflow run. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The optional description of the workflow run. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `arguments`: {object}
- `overrides`: {object}
- `releaseNodeOverrides`: {object}

### API reference

POST /v1/projects/{projectId}/workflows/{workflowId}/runs

POST /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}/runs

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Run","description":"This is a description for the workflow run.","arguments":{"ARG_1":"value"},"overrides":{"example-ref":{"branch":"devel"}},"releaseNodeOverrides":{"example-service":{"type":"registry","origin":{"imagePath":"nginx:latest"}}}}' \
  https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}/runs
```

```javascript
const payload = {
  "name": "Example Run",
  "description": "This is a description for the workflow run.",
  "arguments": {
    "ARG_1": "value"
  },
  "overrides": {
    "example-ref": {
      "branch": "devel"
    }
  },
  "releaseNodeOverrides": {
    "example-service": {
      "type": "registry",
      "origin": {
        "imagePath": "nginx:latest"
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}/runs', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}/runs"

payload = {"name":"Example Run","description":"This is a description for the workflow run.","arguments":{"ARG_1":"value"},"overrides":{"example-ref":{"branch":"devel"}},"releaseNodeOverrides":{"example-service":{"type":"registry","origin":{"imagePath":"nginx:latest"}}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}/runs"

  var jsonStr = []byte(`{"name":"Example Run","description":"This is a description for the workflow run.","arguments":{"ARG_1":"value"},"overrides":{"example-ref":{"branch":"devel"}},"releaseNodeOverrides":{"example-service":{"type":"registry","origin":{"imagePath":"nginx:latest"}}}}`)
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

200 OK: success

### CLI reference

$ northflank run workflow

Options:

- `--projectId <projectId>`: ID of the project

- `--workflowId <workflowId>`: ID of the workflow

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Run",
  "description": "This is a description for the workflow run.",
  "arguments": {
    "ARG_1": "value"
  },
  "overrides": {
    "example-ref": {
      "branch": "devel"
    }
  },
  "releaseNodeOverrides": {
    "example-service": {
      "type": "registry",
      "origin": {
        "imagePath": "nginx:latest"
      }
    }
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.run.workflow({
  parameters: {
    "projectId": "default-project",
    "workflowId": "development"
  },
  data: {
    "name": "Example Run",
    "description": "This is a description for the workflow run.",
    "arguments": {
      "ARG_1": "value"
    },
    "overrides": {
      "example-ref": {
        "branch": "devel"
      }
    },
    "releaseNodeOverrides": {
      "example-service": {
        "type": "registry",
        "origin": {
          "imagePath": "nginx:latest"
        }
      }
    }
  }
});
```
