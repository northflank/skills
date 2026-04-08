# Assign subdomain path

Source: https://northflank.com/docs/v1/api/team/domains/assign-subdomain-path.md

Assign a subdomain path to a port.

Required permission: Account > SubdomainPaths > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain
- `subdomainPath`: (string) (required) Name of the path

**Request body:**

{object}
- `assignment`: {object}
  - `project`: (string) (required) The ID of the service to assign the subdomain path to. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `service`: (string) (required) The ID of the project the service belongs to. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `port`: (string) (required) The name of the port that will be assigned to the subdomain path.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}/assign

POST /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}/assign

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"assignment":{"project":"default-project","service":"example-service","port":"p01"}}' \
  https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}/assign
```

```javascript
const payload = {
  "assignment": {
    "project": "default-project",
    "service": "example-service",
    "port": "p01"
  }
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}/assign', {
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

url = "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}/assign"

payload = {"assignment":{"project":"default-project","service":"example-service","port":"p01"}}
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
  url := "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}/assign"

  var jsonStr = []byte(`{"assignment":{"project":"default-project","service":"example-service","port":"p01"}}`)
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

$ northflank assign subdomain path

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

- `--subdomainPath <subdomainPath>`: Name of the path

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "assignment": {
    "project": "default-project",
    "service": "example-service",
    "port": "p01"
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
await apiClient.assign.subdomain.path({
  parameters: {
    "domain": "example.com",
    "subdomain": "app",
    "subdomainPath": "/"
  },
  data: {
    "assignment": {
      "project": "default-project",
      "service": "example-service",
      "port": "p01"
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
