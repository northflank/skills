# Import domain certificate

Source: https://northflank.com/docs/v1/api/team/domains/import-domain-certificate.md

Import a certificate for the domain

Required permission: Account > Domains > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Request body:**

{object}
- `certificate`: {object}
  - `privateKey`: (string) (required) Certificate private key.
  - `certificateChain`: (string) (required) Certificate chain. May consist of one or more certificates.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/import

POST /v1/teams/{teamId}/domains/{domain}/import

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data 'undefined' \
  https://api.northflank.com/v1/domains/{domain}/import
```

```javascript
const payload = undefined

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/import', {
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

url = "https://api.northflank.com/v1/domains/{domain}/import"

payload = undefined
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
  url := "https://api.northflank.com/v1/domains/{domain}/import"

  var jsonStr = []byte(`undefined`)
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

#### Example Response

400 Bad Request: Could not parse certificate.

#### Example Response

409 Conflict: Expiry date must be at least one month in the future.

### CLI reference

$ northflank import domain-certificate

Options:

- `--domain <domain>`: Name of the domain

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
await apiClient.import.domainCertificate({
  parameters: {
    "domain": "example.com"
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
