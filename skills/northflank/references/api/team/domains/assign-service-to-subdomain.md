# Assign service to subdomain

Source: https://northflank.com/docs/v1/api/team/domains/assign-service-to-subdomain.md

Assigns a service port to the given subdomain

Required permission: Account > Subdomains > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Request body:**

{object}
- `serviceId`: (string) (required) The ID of the service to assign the subdomain to. (pattern: ^[A-Za-z0-9-]+$)
- `projectId`: (string) (required) The ID of the project the service belongs to. (pattern: ^[A-Za-z0-9-]+$)
- `portName`: (string) (required) The name of the port that will be assigned to the subdomain. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 1) (max length: 8)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/subdomains/{subdomain}/assign

POST /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/assign

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"serviceId":"example-service","projectId":"default-project","portName":"p01"}' \
  https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/assign
```

```javascript
const payload = {
  "serviceId": "example-service",
  "projectId": "default-project",
  "portName": "p01"
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/assign', {
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

url = "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/assign"

payload = {"serviceId":"example-service","projectId":"default-project","portName":"p01"}
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
  url := "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/assign"

  var jsonStr = []byte(`{"serviceId":"example-service","projectId":"default-project","portName":"p01"}`)
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

$ northflank assign subdomain service

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
  "serviceId": "example-service",
  "projectId": "default-project",
  "portName": "p01"
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
await apiClient.assign.subdomain.service({
  parameters: {
    "domain": "example.com",
    "subdomain": "app"
  },
  data: {
    "serviceId": "example-service",
    "projectId": "default-project",
    "portName": "p01"
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
