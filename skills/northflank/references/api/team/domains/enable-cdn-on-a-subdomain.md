# Enable CDN on a subdomain

Source: https://northflank.com/docs/v1/api/team/domains/enable-cdn-on-a-subdomain.md

Enables a CDN integration on the given subdomain

Required permission: Account > Subdomains > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Request body:**

{object}
- `provider`: (string) (required) Provider for which a CDN on the subdomain should be enabled.
- `options`: (multiple options) {object}
   - `service`: {object}
     - `forceTlsEnableHsts`: (boolean)
     - `hstsDuration`: (number) HSTS duration. Required when `forceTlsEnableHsts` is `true`. (format: float)
     - `staleIfError`: (boolean)
     - `staleIfErrorTtl`: (number) (format: float)
     - `defaultTtl`: (number) (format: float)
   - `logging`: {object}
     - `enabled`: (boolean)
   - `http3`: {object}
     - `enabled`: (boolean)
   - `websockets`: {object}
     - `enabled`: (boolean)
   - `compression`: {object}
     - `enabled`: (boolean)
     - `mode`: (string) Compression options. Required when `enabled` is `true`. (enum: gzip, brotli)
   - `vclSnippets`: [array of] {object}
      - `id`: (string)
      - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
      - `type`: (string) (required) (enum: init, recv, hash, hit, miss, pass, fetch, error, deliver, log, none)
      - `dynamic`: (string) (required) (enum: 0, 1)
      - `priority`: (number) (required) (format: float)
      - `content`: (string) (required)
   - `cacheSettings`: [array of] {object}
      - `id`: (string)
      - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
      - `action`: (string) (enum: pass, cache, restart)
      - `cacheCondition`: (string)
      - `staleTtl`: (number) (required) (format: float)
      - `ttl`: (number) (required) (format: float)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/subdomains/{subdomain}/cdn/enable

POST /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/cdn/enable

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"provider":"northflank"}' \
  https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/enable
```

```javascript
const payload = {
  "provider": "northflank"
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/enable', {
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

url = "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/enable"

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
  url := "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/cdn/enable"

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

$ northflank enable subdomain cdn

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
await apiClient.enable.subdomain.cdn({
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
