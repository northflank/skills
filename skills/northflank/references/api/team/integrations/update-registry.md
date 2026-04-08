# Update registry

Source: https://northflank.com/docs/v1/api/team/integrations/update-registry.md

Updates a set of registry credential data.

Required permission: Account > Credentials > General > Update

**Path parameters:**

{object}
- `credentialId`: (string) (required) ID of the registry credential

**Request body:**

{object}
- `credentials`: {object}
  - `username`: (string) Username for the docker registry. Required when `integrationId` is provided.
  - `password`: (string) Password for the docker registry. Required when `integrationId` is provided.
  - `scope`: {object}
    - `pull`: (boolean) Whether the credentials can pull images.
    - `push`: (boolean) Whether the credentials can push images.
- `restrictions`: {object}
  - `restricted`: (boolean) (required) Whether access to this credential is restricted.
  - `projects`: [array of] (string)
- `updatedAt`: (string) time of update (format: date-time)
- `createdAt`: (string) time of creation (format: date-time)

**Response body:**

{object}
- `data`: {object}

### API reference

PATCH /v1/integrations/registries/{credentialId}

PATCH /v1/teams/{teamId}/integrations/registries/{credentialId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data 'undefined' \
  https://api.northflank.com/v1/integrations/registries/{credentialId}
```

```javascript
const payload = undefined

const response = await fetch('https://api.northflank.com/v1/integrations/registries/{credentialId}', {
  method: 'PATCH',
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

url = "https://api.northflank.com/v1/integrations/registries/{credentialId}"

payload = undefined
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PATCH", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/integrations/registries/{credentialId}"

  var jsonStr = []byte(`undefined`)
  req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonStr))
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

$ northflank update registry-credentials

Options:

- `--credentialId <credentialId>`: ID of the registry credential

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
undefined
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
await apiClient.update.registryCredentials({
  parameters: {
    "credentialId": "example-credentials"
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
