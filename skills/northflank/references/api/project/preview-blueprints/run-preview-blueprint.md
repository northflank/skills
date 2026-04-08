# Run preview blueprint

Source: https://northflank.com/docs/v1/api/project/preview-blueprints/run-preview-blueprint.md

Runs a given preview blueprint with given arguments. This endpoint can be used as part of a CI pipeline to automatically create a preview environment.

Required permission: Project > PreviewBlueprints > Runs > Start

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `previewBlueprintId`: (string) (required) ID of the preview blueprint

**Request body:**

{object}
- `name`: (string) The optional name of the preview blueprint run. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The optional description of the preview blueprint run. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `arguments`: {object}
- `triggers`: {object}

### API reference

POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs

POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Run","description":"This is a description for the preview blueprint run.","arguments":{"ARG_1":"value"},"triggers":{"example-trigger":{"branch":"devel"}}}' \
  https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs
```

```javascript
const payload = {
  "name": "Example Run",
  "description": "This is a description for the preview blueprint run.",
  "arguments": {
    "ARG_1": "value"
  },
  "triggers": {
    "example-trigger": {
      "branch": "devel"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs"

payload = {"name":"Example Run","description":"This is a description for the preview blueprint run.","arguments":{"ARG_1":"value"},"triggers":{"example-trigger":{"branch":"devel"}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs"

  var jsonStr = []byte(`{"name":"Example Run","description":"This is a description for the preview blueprint run.","arguments":{"ARG_1":"value"},"triggers":{"example-trigger":{"branch":"devel"}}}`)
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

$ northflank run preview-blueprint

Options:

- `--projectId <projectId>`: ID of the project

- `--previewBlueprintId <previewBlueprintId>`: ID of the preview blueprint

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Run",
  "description": "This is a description for the preview blueprint run.",
  "arguments": {
    "ARG_1": "value"
  },
  "triggers": {
    "example-trigger": {
      "branch": "devel"
    }
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.run.previewBlueprint({
  parameters: {
    "projectId": "default-project",
    "previewBlueprintId": "development"
  },
  data: {
    "name": "Example Run",
    "description": "This is a description for the preview blueprint run.",
    "arguments": {
      "ARG_1": "value"
    },
    "triggers": {
      "example-trigger": {
        "branch": "devel"
      }
    }
  }
});
```
