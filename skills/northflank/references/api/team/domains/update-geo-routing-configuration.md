# Update geo routing configuration

Source: https://northflank.com/docs/v1/api/team/domains/update-geo-routing-configuration.md

Updates the geo routing configuration for a geo-routed subdomain.

Required permission: Account > Networking > Subdomains > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Request body:**

{object}
- `geoRouting`: {object}
  - `strategy`: (string) The geo routing strategy. (enum: continent, closest)
  - `rules`: [array of] {object}
     - `continents`: [array of] (string) (enum: NA, SA, EU, AF, AS, OC, AN)
     - `backend`: {object}
       - `id`: (string) (required) Backend reference in format {projectInternalId}/{serviceInternalId} (pattern: ^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$)
       - `port`: (string) (required) Port name on the backend service
  - `defaultBackend`: {object}
    - `id`: (string) (required) Backend reference in format {projectInternalId}/{serviceInternalId} (pattern: ^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$)
    - `port`: (string) (required) Port name on the backend service

**Response body:**

{object}
- `data`: {object}

### API reference

PATCH /v1/domains/{domain}/subdomains/{subdomain}/geo-routing

PATCH /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/geo-routing

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"geoRouting":{"rules":[{"backend":{"id":"my-project/my-service","port":"http"}}],"defaultBackend":{"id":"my-project/my-service","port":"http"}}}' \
  https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/geo-routing
```

```javascript
const payload = {
  "geoRouting": {
    "rules": [
      {
        "backend": {
          "id": "my-project/my-service",
          "port": "http"
        }
      }
    ],
    "defaultBackend": {
      "id": "my-project/my-service",
      "port": "http"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/geo-routing', {
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

url = "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/geo-routing"

payload = {"geoRouting":{"rules":[{"backend":{"id":"my-project/my-service","port":"http"}}],"defaultBackend":{"id":"my-project/my-service","port":"http"}}}
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
  url := "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/geo-routing"

  var jsonStr = []byte(`{"geoRouting":{"rules":[{"backend":{"id":"my-project/my-service","port":"http"}}],"defaultBackend":{"id":"my-project/my-service","port":"http"}}}`)
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

$ northflank update subdomain geo-routing

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "geoRouting": {
    "rules": [
      {
        "backend": {
          "id": "my-project/my-service",
          "port": "http"
        }
      }
    ],
    "defaultBackend": {
      "id": "my-project/my-service",
      "port": "http"
    }
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

Request body

```javascript
await apiClient.update.subdomain.geoRouting({
  parameters: {
    "domain": "example.com",
    "subdomain": "app"
  },
  data: {
    "geoRouting": {
      "rules": [
        {
          "backend": {
            "id": "my-project/my-service",
            "port": "http"
          }
        }
      ],
      "defaultBackend": {
        "id": "my-project/my-service",
        "port": "http"
      }
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
