# Detach volume

Source: https://northflank.com/docs/v1/api/project/volumes/detach-volume.md

Detach a volume

Required permission: Project > Volumes > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume

**Request body:**

{object}
- `nfObject`: {object}
  - `id`: (string) (required) The id of object to detach this volume to. (pattern: ^[A-Za-z0-9-]+$)
  - `type`: (string) (required) The type of the object to detach this volume to. (enum: service, job)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/volumes/{volumeId}/detach

POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/detach

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"nfObject":{"id":"example-service","type":"service"}}' \
  https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/detach
```

```javascript
const payload = {
  "nfObject": {
    "id": "example-service",
    "type": "service"
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/detach', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/detach"

payload = {"nfObject":{"id":"example-service","type":"service"}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/detach"

  var jsonStr = []byte(`{"nfObject":{"id":"example-service","type":"service"}}`)
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

$ northflank detach volume

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "nfObject": {
    "id": "example-service",
    "type": "service"
  }
}
```

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.detach.volume({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume"
  },
  data: {
    "nfObject": {
      "id": "example-service",
      "type": "service"
    }
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.detach.volume(
    project_id="default-project",
    volume_id="example-volume",
    data={
        "nfObject": {
            "id": "example-service",
            "type": "service",
        },
    },
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
