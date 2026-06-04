# Add subdomain

Source: https://northflank.com/docs/v1/api/team/domains/add-subdomain.md

Adds a new subdomain to the domain.

Required permission: Account > Subdomains > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Request body:**

{object}
- `subdomain`: (string) (required) A subdomain to be added. (pattern: ^\*|^@$|^([0-9a-z]([0-9a-z\-]*[0-9a-z])?\.)*[0-9a-z]([0-9a-z\-]*[0-9a-z])?$)
- `routingMode`: (string) The routing mode for the subdomain. Determines how traffic is routed. Once set, this cannot be changed. (enum: paths, geoRouting)
- `cdn`: {object}
  - `northflank`: {object}
    - `enabled`: (boolean) (required)
- `options`: {object}
  - `tlsMode`: (string) Desired TLS mode for the subdomain. (enum: default, passthrough)
  - `minTlsProtocolVersion`: (string) Minimum TLS protocol version for the subdomain. Only applicable for non-wildcard subdomains. (enum: TLSV1_1, TLSV1_2, TLSV1_3)
  - `autoVerify`: (boolean) The domain will be automatically verified on creation. Only configurable if the relevant feature flag is enabled for you account.
  - `aliasDomains`: [array of] (string)

**Response body:**

{object}
- `data`: {object}
  - `recordType`: (string) (required) The record type to use for the DNS record to verify the subdomain - always CNAME for subdomains.
  - `name`: (string) (required) The subdomain.
  - `fullName`: (string) (required) The full domain name with subdomain
  - `content`: (string) (required) The content to set the DNS record to
  - `verified`: (boolean) (required) Whether the subdomain has been verified successfully and can be used.

### API reference

POST /v1/domains/{domain}/subdomains

POST /v1/teams/{teamId}/domains/{domain}/subdomains

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"subdomain":"site"}' \
  https://api.northflank.com/v1/domains/{domain}/subdomains
```

```javascript
const payload = {
  "subdomain": "site"
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/subdomains', {
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

url = "https://api.northflank.com/v1/domains/{domain}/subdomains"

payload = {"subdomain":"site"}
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
  url := "https://api.northflank.com/v1/domains/{domain}/subdomains"

  var jsonStr = []byte(`{"subdomain":"site"}`)
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

200 OK: Details about the newly added subdomain.

```json
{
  "data": {
    "recordType": "CNAME",
    "name": "site",
    "fullName": "site.example.com",
    "content": "site.example.com.user-1234.dns.northflank.app",
    "verified": false
  }
}
```

#### Example Response

400 Bad Request: The subdomain is not valid (possibly because it is too long) or the domain has not been verified.

#### Example Response

409 Conflict: The subdomain has already been added to this domain.

### CLI reference

$ northflank add domain subdomain

Options:

- `--domain <domain>`: Name of the domain

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "subdomain": "site"
}
```

#### Example Response

 Details about the newly added subdomain.

```json
{
  "recordType": "CNAME",
  "name": "site",
  "fullName": "site.example.com",
  "content": "site.example.com.user-1234.dns.northflank.app",
  "verified": false
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.add.domain.subdomain({
  parameters: {
    "domain": "example.com"
  },
  data: {
    "subdomain": "site"
  }
});
```

#### Example Response

 Details about the newly added subdomain.

```json
{
  "data": {
    "recordType": "CNAME",
    "name": "site",
    "fullName": "site.example.com",
    "content": "site.example.com.user-1234.dns.northflank.app",
    "verified": false
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
