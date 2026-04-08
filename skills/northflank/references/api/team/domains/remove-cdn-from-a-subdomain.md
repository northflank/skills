# Remove CDN from a subdomain

Source: https://northflank.com/docs/v1/api/team/domains/remove-cdn-from-a-subdomain.md

Removes the CDN integration from the given subdomain

Required permission: Account > Subdomains > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Request body:**

{object}
- `provider`: (string) (required) Provider for which the CDN on the subdomain should be disabled.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/subdomains/{subdomain}/cdn/disable

POST /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/cdn/disable

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"provider":"northflank"}' \
  https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/disable
```

```javascript
const payload = {
  "provider": "northflank"
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/disable', {
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

url = "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/disable"

payload = {"provider":"northflank"}
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
  url := "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/disable"

  var jsonStr = []byte(`{"provider":"northflank"}`)
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

$ northflank disable subdomain cdn

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
  "provider": "northflank"
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
await apiClient.disable.subdomain.cdn({
  parameters: {
    "domain": "example.com",
    "subdomain": "app"
  },
  data: {
    "provider": "northflank"
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
