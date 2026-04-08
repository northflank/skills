# Update subdomain path

Source: https://northflank.com/docs/v1/api/team/domains/update-subdomain-path.md

Update a subdomain path.

Required permission: Account > SubdomainPaths > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain
- `subdomainPath`: (string) (required) Name of the path

**Request body:**

{object}
- `options`: {object}
  - `priority`: (integer) In case of uri conflicts, the route with the higher priority will take precedence
  - `ignoreUriCase`: (boolean) Allows case insensitive matching for 'prefix' and 'exact' modes
  - `rewrite`: (multiple options) {object}
     - `uri`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$) | {object}
     - `regex`: {object}
       - `match`: (string) (required) Regex match for the given path
       - `rewrite`: (string) (required) Regex rewrite for the given matched path
  - `timeout`: (string) Customised request timeout for the given path. By default no timeout is set. (pattern: ^[1-9][0-9]*(s|ms)$)
  - `headers`: {object}
    - `request`: {object}
      - `set`: {object}
      - `add`: {object}
      - `remove`: [array of] (string) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
    - `response`: {object}
      - `set`: {object}
      - `add`: {object}
      - `remove`: [array of] (string) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
  - `corsPolicy`: {object}
    - `enabled`: (boolean) (required)
    - `allowOrigins`: [array of] {object}
        - `mode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix, exact, regex)
        - `origin`: (string) Origin definition.
    - `allowMethods`: [array of] (string) (enum: GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE, CONNECT, HEAD)
    - `allowCredentials`: (boolean)
    - `allowHeaders`: [array of] (string)
    - `maxAge`: (string) (pattern: ^[1-9][0-9]*(s|m|h)$)
  - `retries`: {object}
    - `enabled`: (boolean) (required)
    - `attempts`: (integer) (required)
    - `perTryTimeout`: (string) Timeout per attempt. By default uses the path level timeout. (pattern: ^[1-9][0-9]*(s|ms)$)
    - `retryOn`: [array of] (string) (enum: 5xx, gateway-error, reset, connect-failure, envoy-ratelimited, retriable-4xx, refused-stream, retriable-status-codes, retriable-headers, cancelled, deadline-exceeded, internal, resource-exhausted, unavailable)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}

POST /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"options":{"priority":0,"corsPolicy":{"allowOrigins":[{"mode":"prefix","origin":"https://example.com"}]}}}' \
  https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}
```

```javascript
const payload = {
  "options": {
    "priority": 0,
    "corsPolicy": {
      "allowOrigins": [
        {
          "mode": "prefix",
          "origin": "https://example.com"
        }
      ]
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}', {
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

url = "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}"

payload = {"options":{"priority":0,"corsPolicy":{"allowOrigins":[{"mode":"prefix","origin":"https://example.com"}]}}}
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
  url := "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}"

  var jsonStr = []byte(`{"options":{"priority":0,"corsPolicy":{"allowOrigins":[{"mode":"prefix","origin":"https://example.com"}]}}}`)
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

$ northflank update subdomain path

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
  "options": {
    "priority": 0,
    "corsPolicy": {
      "allowOrigins": [
        {
          "mode": "prefix",
          "origin": "https://example.com"
        }
      ]
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
await apiClient.update.subdomain.path({
  parameters: {
    "domain": "example.com",
    "subdomain": "app",
    "subdomainPath": "/"
  },
  data: {
    "options": {
      "priority": 0,
      "corsPolicy": {
        "allowOrigins": [
          {
            "mode": "prefix",
            "origin": "https://example.com"
          }
        ]
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
