# Rotate a key on an API token

Source: https://northflank.com/docs/v1/api/org/api-tokens/rotate-a-key-on-an-api-token.md

Creates a new key for an API token and sets all other keys to expire.

Required permission: Account > Admin > ApiTokens > Update

**Path parameters:**

{object}
- `tokenId`: (string) (required) ID of the API token

**Request body:**

{object}
- `otherKeysExpiresAt`: (string) Expiry time for all existing keys. Defaults to immediate expiry. (format: date-time)

**Response body:**

{object}
- `data`: {object}
  - `key`: {object}
    - `id`: (string) (required) UUID of the new API key. (format: uuid)
    - `issuedAt`: (string) (required) The time the key was issued. (format: date-time)
  - `token`: (string) (required) The API token for authentication.

### API reference

POST /v1/tokens/{tokenId}/keys

POST /v1/teams/{teamId}/tokens/{tokenId}/keys

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{}' \
  https://api.northflank.com/v1/tokens/{tokenId}/keys
```

```javascript
const payload = {}

const response = await fetch('https://api.northflank.com/v1/tokens/{tokenId}/keys', {
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

url = "https://api.northflank.com/v1/tokens/{tokenId}/keys"

payload = {}
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
  url := "https://api.northflank.com/v1/tokens/{tokenId}/keys"

  var jsonStr = []byte(`{}`)
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

200 OK: The newly created API key and token.

```json
{
  "data": {
    "key": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "issuedAt": "2021-01-20T11:19:53.175Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### CLI reference

$ northflank rotate api-token-key

Options:

- `--tokenId <tokenId>`: ID of the API token

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{}
```

#### Example Response

 The newly created API key and token.

```json
{
  "key": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "issuedAt": "2021-01-20T11:19:53.175Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.rotate.apiTokenKey({
  parameters: {
    "tokenId": "my-api-token"
  },
  data: {}
});
```

#### Example Response

 The newly created API key and token.

```json
{
  "data": {
    "key": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "issuedAt": "2021-01-20T11:19:53.175Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
