# Import OpenTofu state

Source: https://northflank.com/docs/v1/api/team/templates/import-opentofu-state.md

Moves state from another OpenTofu node in the same team to a node in this template. The state will be removed from the source node as such running the source node again may recreate resources.

Required permission: Account > Templates > General > Update

**Path parameters:**

{object}
- `templateId`: (string) (required) ID of the template

**Request body:**

{object}
- `copyResourceDefinitions`: (boolean) Whether to return the source node resource definitions so they can be applied to the target template.
- `overwriteTargetState`: (boolean) Whether to replace state that already exists on the target OpenTofu node.
- `sourceTemplateId`: (string) (required) ID of the template containing the source OpenTofu node. (pattern: ^[A-Za-z0-9-]+$)
- `sourceStateKey`: (string) (required) State key of the source OpenTofu node.
- `targetStateKey`: (string) (required) State key of the target OpenTofu node.

**Response body:**

{object}
- `data`: {object}
  - `resourceDefinitions`: {object}

### API reference

POST /v1/templates/{templateId}/opentofu/import-state

POST /v1/teams/{teamId}/templates/{templateId}/opentofu/import-state

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"sourceTemplateId":"source-template","sourceStateKey":"source-state","targetStateKey":"target-state"}' \
  https://api.northflank.com/v1/templates/{templateId}/opentofu/import-state
```

```javascript
const payload = {
  "sourceTemplateId": "source-template",
  "sourceStateKey": "source-state",
  "targetStateKey": "target-state"
}

const response = await fetch('https://api.northflank.com/v1/templates/{templateId}/opentofu/import-state', {
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

url = "https://api.northflank.com/v1/templates/{templateId}/opentofu/import-state"

payload = {"sourceTemplateId":"source-template","sourceStateKey":"source-state","targetStateKey":"target-state"}
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
  url := "https://api.northflank.com/v1/templates/{templateId}/opentofu/import-state"

  var jsonStr = []byte(`{"sourceTemplateId":"source-template","sourceStateKey":"source-state","targetStateKey":"target-state"}`)
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

200 OK: The imported OpenTofu resource definitions.

```json
undefined
```

### CLI reference

$ northflank import-state template

Options:

- `--templateId <templateId>`: ID of the template

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "sourceTemplateId": "source-template",
  "sourceStateKey": "source-state",
  "targetStateKey": "target-state"
}
```

#### Example Response

 The imported OpenTofu resource definitions.

```json
undefined
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.importState.template({
  parameters: {
    "templateId": "example-template"
  },
  data: {
    "sourceTemplateId": "source-template",
    "sourceStateKey": "source-state",
    "targetStateKey": "target-state"
  }
});
```

#### Example Response

 The imported OpenTofu resource definitions.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
