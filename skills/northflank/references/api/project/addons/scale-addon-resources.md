# Scale addon resources

Source: https://northflank.com/docs/v1/api/project/addons/scale-addon-resources.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /addons/patch-addon instead](patch-addon.md)

Modifies the allocated resources for the given addon.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object}
- `deploymentPlan`: (string) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `storage`: (integer) The size of the addon storage, in megabytes.
- `replicas`: (integer) The number of addon replicas to run.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/scale

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/scale

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"deploymentPlan":"nf-compute-20","storage":1024,"replicas":1}' \
  https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/scale
```

```javascript
const payload = {
  "deploymentPlan": "nf-compute-20",
  "storage": 1024,
  "replicas": 1
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/scale', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/scale"

payload = {"deploymentPlan":"nf-compute-20","storage":1024,"replicas":1}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/scale"

  var jsonStr = []byte(`{"deploymentPlan":"nf-compute-20","storage":1024,"replicas":1}`)
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

$ northflank scale addon

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "deploymentPlan": "nf-compute-20",
  "storage": 1024,
  "replicas": 1
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
await apiClient.scale.addon({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {
    "deploymentPlan": "nf-compute-20",
    "storage": 1024,
    "replicas": 1
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
