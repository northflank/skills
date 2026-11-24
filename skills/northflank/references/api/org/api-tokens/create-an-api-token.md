# Create an API token

Source: https://northflank.com/docs/v1/api/org/api-tokens/create-an-api-token.md

API-only: a persisted role-backed API token creates a token with the calling role or a selected role with equal or narrower permissions and restrictions at issuance. Selected-role membership is not required. Role changes remain live. Requires the API token creation feature and grant-token-via-api permission. Expiring callers can only create tokens that expire earlier; unexpiring callers may create unexpiring tokens. Revocation is independent. Delegated tokens cannot create further tokens, regardless of role permissions. A delegated token has a fixed expiry that neither its own rotation nor parent rotation extends.

Required permission: Account > Admin > ApiTokens > Grant Token Via Api

**Request body:**

{object}
- `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `roleId`: (string) Selected role ID. Omit with roleType to inherit the calling role. (pattern: ^[A-Za-z0-9-]+$)
- `roleType`: (string) (enum: org, team)
- `expiresAt`: (string) (nullable) Must precede the calling credential expiry. Omit or use null for no expiry when the caller is unexpiring. (format: date-time)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required)
  - `token`: (string) (required)
  - `expiresAt`: (string) (required) (nullable) (format: date-time)

### API reference

POST /v1/tokens

POST /v1/teams/{teamId}/tokens

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"string"}' \
  "https://api.northflank.com/v1/tokens"
```

```javascript
const payload = {
  "name": "string"
}

const response = await fetch('https://api.northflank.com/v1/tokens', {
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

url = "https://api.northflank.com/v1/tokens"

payload = "{\"name\":\"string\"}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

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
  url := "https://api.northflank.com/v1/tokens"

  var jsonStr = []byte("{\"name\":\"string\"}")
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

200 OK: The created API token. Store the credential securely.

```json
{
  "data": {
    "id": "string",
    "token": "string",
    "expiresAt": "1970-01-01T00:00:00.000Z"
  }
}
```

### CLI reference

$ northflank create api-token

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "string"
}
```

#### Example Response

 The created API token. Store the credential securely.

```json
{
  "id": "string",
  "token": "string",
  "expiresAt": "1970-01-01T00:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.create.apiToken({
  data: {
    "name": "string"
  }
});
```

#### Example Response

 The created API token. Store the credential securely.

```json
{
  "data": {
    "id": "string",
    "token": "string",
    "expiresAt": "1970-01-01T00:00:00.000Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
