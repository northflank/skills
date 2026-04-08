# Add registry

Source: https://northflank.com/docs/v1/api/team/integrations/add-registry.md

Adds a new set of container registry credentials to this account.

Required permission: Account > Credentials > General > Create

**Request body:**

{object}
- `name`: (string) (required) The name of the docker credentials. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `provider`: (string) (required) The provider of the docker registry. (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)
- `registryUrl`: (string) The URL of the docker registry.
- `aws`: {object}
  - `region`: (string) The region of the docker registry.
- `gcp`: {object}
  - `projectId`: (string) The project ID of the GCP docker registry.
- `azure`: {object}
  - `resourceGroup`: (string) The resource group of the Azure docker registry.
- `integrationId`: (string) Integration to use for this registry. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
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
  - `id`: (string) (required) ID of the docker credentials (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) The name of the docker credentials. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `provider`: (string) (required) The provider of the docker registry. (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)
  - `registryUrl`: (string) The URL of the docker registry.
  - `aws`: {object}
    - `region`: (string) The region of the docker registry.
  - `gcp`: {object}
    - `projectId`: (string) The project ID of the GCP docker registry.
  - `azure`: {object}
    - `resourceGroup`: (string) The resource group of the Azure docker registry.
  - `integrationId`: (string) Integration to use for this registry. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
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

### API reference

POST /v1/integrations/registries

POST /v1/teams/{teamId}/integrations/registries

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Docker Credentials"}' \
  https://api.northflank.com/v1/integrations/registries
```

```javascript
const payload = {
  "name": "Example Docker Credentials"
}

const response = await fetch('https://api.northflank.com/v1/integrations/registries', {
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

url = "https://api.northflank.com/v1/integrations/registries"

payload = {"name":"Example Docker Credentials"}
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
  url := "https://api.northflank.com/v1/integrations/registries"

  var jsonStr = []byte(`{"name":"Example Docker Credentials"}`)
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

200 OK: Data about the newly created credentials.

```json
{
  "data": {
    "id": "example-credentials",
    "name": "Example Docker Credentials"
  }
}
```

### CLI reference

$ northflank add registry-credentials

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Docker Credentials"
}
```

#### Example Response

 Data about the newly created credentials.

```json
{
  "id": "example-credentials",
  "name": "Example Docker Credentials"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.add.registryCredentials({
  data: {
    "name": "Example Docker Credentials"
  }
});
```

#### Example Response

 Data about the newly created credentials.

```json
{
  "data": {
    "id": "example-credentials",
    "name": "Example Docker Credentials"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
