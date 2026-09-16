# Create new domain

Source: https://northflank.com/docs/v1/api/team/domains/create-new-domain.md

Registers a new domain

Required permission: Account > Networking > Domains > Create

**Request body:**

{object}
- `domain`: (string) (required) The domain name to register. (pattern: ^((www(\.[a-zA-Z0-9-]{2,})+\.)?[a-zA-Z0-9-]{2,})(\.([a-zA-Z0-9-]{2,}))+$)
- `redirect`: {object}
  - `mode`: (string) Domain redirect mode to be used. (enum: wildcard, default)
  - `region`: (multiple options) (multiple options) (undefined)
  - `cluster`: (string) BYOC cluster the wildcard redirect should be pointed at.
- `loadBalancer`: (string) Load balancer all subdomains of this domain route through. Only applies to wildcard-redirect domains. `vpc` requires a self-hosted cluster with the private load balancer enabled. Fixed at creation. (enum: public, vpc)
- `options`: {object}
  - `autoVerify`: (boolean) The domain will be automatically verified on creation. Only configurable if the relevant feature flag is enabled for you account.
  - `minTlsProtocolVersion`: (string) Minimum TLS protocol version for wildcard domains. Only applicable for wildcard-redirect domains with wildcard certificates. (enum: TLSV1_1, TLSV1_2, TLSV1_3)
  - `tlsMode`: (string) TLS mode for wildcard domains. Only applicable for wildcard-redirect domains with wildcard certificates. (enum: default, passthrough)
- `certificates`: {object}
  - `mode`: (string) Certificate provisioning mode to be used. (enum: wildcard, wildcard-import, default)
  - `certificateInput`: {object}
    - `certificateInput`: {object}
      - `is`: (undefined) (enum: wildcard-import)
      - `then`: {object}
        - `privateKey`: (string) (required) Certificate private key.
        - `certificateChain`: (string) (required) Certificate chain. May consist of one or more certificates.

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The domain name.
  - `status`: (string) (required) The status of the domain verification. (enum: pending, verified)
  - `hostname`: (string) The hostname to add to your domain's DNS records as a TXT record to verify the domain.
  - `token`: (string) The token to add as the content of the TXT record to verify the domain.
  - `redirect`: {object}
    - `mode`: (string) (required) Domain redirect mode.
    - `target`: {object}
      - `record`: (string) Expected CNAME target of the wildcard redirect.
  - `loadBalancer`: (string) Load balancer all subdomains of this domain route through. Only applies to wildcard-redirect domains. `vpc` requires a self-hosted cluster with the private load balancer enabled. Fixed at creation. (enum: public, vpc)
  - `certificates`: {object}
    - `mode`: (string) (required) Domain certificate mode.
    - `dcvRecord`: (string) DCV CNAME record used to provision wildcard certificates.
    - `dcvTarget`: {object}
      - `record`: (string) Expected CNAME target of the dcvRecord.
    - `status`: {object}
      - `expiryDate`: (string) Expiry date of the current certificate. (format: date-time)
  - `options`: {object}
    - `minTlsProtocolVersion`: (string) Minimum TLS protocol version configured at the domain level. (enum: TLSV1_1, TLSV1_2, TLSV1_3)
    - `tlsMode`: (string) TLS mode configured at the domain level. (enum: default, passthrough)

### API reference

POST /v1/domains

POST /v1/teams/{teamId}/domains

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"domain":"example.com","redirect":{"mode":"default"},"loadBalancer":"public","certificates":{"mode":"default"}}' \
  https://api.northflank.com/v1/domains
```

```javascript
const payload = {
  "domain": "example.com",
  "redirect": {
    "mode": "default"
  },
  "loadBalancer": "public",
  "certificates": {
    "mode": "default"
  }
}

const response = await fetch('https://api.northflank.com/v1/domains', {
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

url = "https://api.northflank.com/v1/domains"

payload = {"domain":"example.com","redirect":{"mode":"default"},"loadBalancer":"public","certificates":{"mode":"default"}}
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
  url := "https://api.northflank.com/v1/domains"

  var jsonStr = []byte(`{"domain":"example.com","redirect":{"mode":"default"},"loadBalancer":"public","certificates":{"mode":"default"}}`)
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

200 OK: Details about the newly added domain.

```json
{
  "data": {
    "name": "example.com",
    "status": "pending",
    "hostname": "nfverify1608026055",
    "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57",
    "redirect": {
      "mode": "default"
    },
    "loadBalancer": "public",
    "certificates": {
      "mode": "default"
    }
  }
}
```

#### Example Response

400 Bad Request: The domain is not valid, possibly because it is too long.

#### Example Response

409 Conflict: The domain is already registered with this account.

### CLI reference

$ northflank create domain

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "domain": "example.com",
  "redirect": {
    "mode": "default"
  },
  "loadBalancer": "public",
  "certificates": {
    "mode": "default"
  }
}
```

#### Example Response

 Details about the newly added domain.

```json
{
  "name": "example.com",
  "status": "pending",
  "hostname": "nfverify1608026055",
  "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57",
  "redirect": {
    "mode": "default"
  },
  "loadBalancer": "public",
  "certificates": {
    "mode": "default"
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.domain({
  data: {
    "domain": "example.com",
    "redirect": {
      "mode": "default"
    },
    "loadBalancer": "public",
    "certificates": {
      "mode": "default"
    }
  }
});
```

#### Example Response

 Details about the newly added domain.

```json
{
  "data": {
    "name": "example.com",
    "status": "pending",
    "hostname": "nfverify1608026055",
    "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57",
    "redirect": {
      "mode": "default"
    },
    "loadBalancer": "public",
    "certificates": {
      "mode": "default"
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
