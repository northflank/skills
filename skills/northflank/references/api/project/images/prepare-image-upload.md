# Prepare image upload

Source: https://northflank.com/docs/v1/api/project/images/prepare-image-upload.md

Reserves a named image tag and returns five-minute direct-upload credentials. Supply the image ID to refresh the same reservation.

Required permission: Project > Images > General > Import

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `name`: (string) (required) (pattern: ^[a-z0-9]+(?:[._-][a-z0-9]+)*$) (min length: 1) (max length: 128)
- `tag`: (string) (required) (pattern: ^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$)
- `imageId`: (string) (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `registryUrl`: (string) (required)
  - `repository`: (string) (required)
  - `imageId`: (string) (required) (min length: 24) (max length: 24)
  - `token`: (string) (required)
  - `expiresAt`: (string) (required) (format: date-time)

### API reference

POST /v1/projects/{projectId}/images/upload-credentials

POST /v1/teams/{teamId}/projects/{projectId}/images/upload-credentials

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"string","tag":"string"}' \
  https://api.northflank.com/v1/projects/{projectId}/images/upload-credentials
```

```javascript
const payload = {
  "name": "string",
  "tag": "string"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/images/upload-credentials', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/images/upload-credentials"

payload = {"name":"string","tag":"string"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/images/upload-credentials"

  var jsonStr = []byte(`{"name":"string","tag":"string"}`)
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

200 OK: Scoped direct-upload credentials.

```json
undefined
```

### CLI reference

$ northflank create image upload-credentials

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "string",
  "tag": "string"
}
```

#### Example Response

 Scoped direct-upload credentials.

```json
undefined
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.create.image.uploadCredentials({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "name": "string",
    "tag": "string"
  }
});
```

#### Example Response

 Scoped direct-upload credentials.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
