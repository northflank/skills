# Roll back service rollout

Source: https://northflank.com/docs/v1/api/project/rollout-strategies/roll-back-service-rollout.md

Ends the active gradual rollout and redeploys the service from a previous deployment. Use the list service deployments endpoint to find the deployment to roll back to.

Required permission: Project > Services > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `deployment`: (string) (required) Identifier of the deployment to roll back to, as returned by the list service deployments endpoint. Must be a deployment of this service. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier of the new deployment created by the rollback.

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/rollout/rollback

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout/rollback

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"deployment":"6560a1b2c3d4e5f6a7b8c9d0"}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/rollback
```

```javascript
const payload = {
  "deployment": "6560a1b2c3d4e5f6a7b8c9d0"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/rollback', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/rollback"

payload = {"deployment":"6560a1b2c3d4e5f6a7b8c9d0"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/rollout/rollback"

  var jsonStr = []byte(`{"deployment":"6560a1b2c3d4e5f6a7b8c9d0"}`)
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

200 OK: The deployment created by the rollback.

```json
{
  "data": {
    "id": "6560a1b2c3d4e5f6a7b8c9d0"
  }
}
```

### CLI reference

$ northflank rollback service rollout

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
  "deployment": "6560a1b2c3d4e5f6a7b8c9d0"
}
```

#### Example Response

 The deployment created by the rollback.

```json
{
  "id": "6560a1b2c3d4e5f6a7b8c9d0"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.rollback.service.rollout({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "deployment": "6560a1b2c3d4e5f6a7b8c9d0"
  }
});
```

#### Example Response

 The deployment created by the rollback.

```json
{
  "data": {
    "id": "6560a1b2c3d4e5f6a7b8c9d0"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
