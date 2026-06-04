# Put tag

Source: https://northflank.com/docs/v1/api/team/tags/put-tag.md

Update or create a resource tag.

Required permission: Account > Tags > General > Update

**Path parameters:**

{object}
- `resourceTagId`: (string) (required) ID of the tag

**Request body:**

{object}
- `useSpotNodes`: (boolean) Schedule workloads to spot nodes
- `useOnDemandNodes`: (boolean) Also allow workloads to schedule to on demand nodes. Only relevant if you want workloads to schedule across both spot and on demand nodes
- `nodeAffinities`: [array of] {object}
   - `preference`: (boolean)
   - `weight`: (number) The node affinity weight. Required when `preference` is `true`. (format: float)
   - `matchExpressions`: [array of] {object}
      - `key`: (string) (required)
      - `operator`: (string) (required) (enum: In, NotIn)
      - `values`: [array of] (string)
- `sandboxing`: {object}
  - `builds`: {object}
    - `enabled`: (boolean) (required) Enables runtime scheduling constraints for builds
    - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for builds (enum: none, gvisor, kata-clh, kata-qemu)
  - `services`: {object}
    - `enabled`: (boolean) (required) Enables runtime scheduling constraints for services
    - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for services (enum: none, gvisor, kata-clh, kata-qemu)
  - `addons`: {object}
    - `enabled`: (boolean) (required) Enables runtime scheduling constraints for addons
    - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for addons (enum: none, gvisor, kata-clh, kata-qemu)
  - `jobs`: {object}
    - `enabled`: (boolean) (required) Enables runtime scheduling constraints for jobs
    - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for jobs (enum: none, gvisor, kata-clh, kata-qemu)
- `color`: (string) (pattern: ^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$)
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

**Response body:**

{object}
- `data`: {object}

### API reference

PUT /v1/tags

PUT /v1/teams/{teamId}/tags

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"useSpotNodes":false,"useOnDemandNodes":false,"sandboxing":{"builds":{"enabled":false,"runtimeClass":"gvisor"},"services":{"enabled":false,"runtimeClass":"gvisor"},"addons":{"enabled":false,"runtimeClass":"gvisor"},"jobs":{"enabled":false,"runtimeClass":"gvisor"}},"color":"#57637A","name":"Example Tag"}' \
  https://api.northflank.com/v1/tags
```

```javascript
const payload = {
  "useSpotNodes": false,
  "useOnDemandNodes": false,
  "sandboxing": {
    "builds": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "services": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "addons": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "jobs": {
      "enabled": false,
      "runtimeClass": "gvisor"
    }
  },
  "color": "#57637A",
  "name": "Example Tag"
}

const response = await fetch('https://api.northflank.com/v1/tags', {
  method: 'PUT',
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

url = "https://api.northflank.com/v1/tags"

payload = {"useSpotNodes":false,"useOnDemandNodes":false,"sandboxing":{"builds":{"enabled":false,"runtimeClass":"gvisor"},"services":{"enabled":false,"runtimeClass":"gvisor"},"addons":{"enabled":false,"runtimeClass":"gvisor"},"jobs":{"enabled":false,"runtimeClass":"gvisor"}},"color":"#57637A","name":"Example Tag"}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/tags"

  var jsonStr = []byte(`{"useSpotNodes":false,"useOnDemandNodes":false,"sandboxing":{"builds":{"enabled":false,"runtimeClass":"gvisor"},"services":{"enabled":false,"runtimeClass":"gvisor"},"addons":{"enabled":false,"runtimeClass":"gvisor"},"jobs":{"enabled":false,"runtimeClass":"gvisor"}},"color":"#57637A","name":"Example Tag"}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

$ northflank put tag

Options:

- `--resourceTagId <resourceTagId>`: ID of the tag

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "useSpotNodes": false,
  "useOnDemandNodes": false,
  "sandboxing": {
    "builds": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "services": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "addons": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "jobs": {
      "enabled": false,
      "runtimeClass": "gvisor"
    }
  },
  "color": "#57637A",
  "name": "Example Tag"
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
await apiClient.put.tag({
  parameters: {
    "resourceTagId": "example-tag"
  },
  data: {
    "useSpotNodes": false,
    "useOnDemandNodes": false,
    "sandboxing": {
      "builds": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "services": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "addons": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "jobs": {
        "enabled": false,
        "runtimeClass": "gvisor"
      }
    },
    "color": "#57637A",
    "name": "Example Tag"
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
