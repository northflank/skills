# Update domain

Source: https://northflank.com/docs/v1/api/team/domains/update-domain.md

Update domain options such as minimum TLS protocol version

Required permission: Account > Networking > Domains > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Request body:**

{object}
- `options`: {object}
  - `minTlsProtocolVersion`: (string) Minimum TLS protocol version for all subdomains under this wildcard domain. (enum: TLSV1_1, TLSV1_2, TLSV1_3)
  - `tlsMode`: (string) TLS mode for all subdomains under this wildcard domain. (enum: default, passthrough)

**Response body:**

{object}
- `data`: {object}

### API reference

PATCH /v1/domains/{domain}

PATCH /v1/teams/{teamId}/domains/{domain}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"options":{}}' \
  https://api.northflank.com/v1/domains/{domain}
```

```javascript
const payload = {
  "options": {}
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}', {
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

url = "https://api.northflank.com/v1/domains/{domain}"

payload = {"options":{}}
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
  url := "https://api.northflank.com/v1/domains/{domain}"

  var jsonStr = []byte(`{"options":{}}`)
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

#### Example Response

400 Bad Request: Domain-level TLS version can only be configured on wildcard-redirect domains with wildcard certificates.

### CLI reference

$ northflank update domain

Options:

- `--domain <domain>`: Name of the domain

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "options": {}
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
await apiClient.update.domain({
  parameters: {
    "domain": "example.com"
  },
  data: {
    "options": {}
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
