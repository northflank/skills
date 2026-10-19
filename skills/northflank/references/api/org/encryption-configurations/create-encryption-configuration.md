# Create encryption configuration

Source: https://northflank.com/docs/v1/api/org/encryption-configurations/create-encryption-configuration.md

Creates an inactive configuration after validating KMS access. GCP cross-project creation defers that check and returns a generated service-account email: grant it KMS access before activation. Requires customer-managed keys to be enabled.

Required permission: Account > Admin > Encryption > Create

**Request body:**

{object}
- `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `envelope`: (multiple options) {object}
   - `provider`: (undefined) (required) (enum: gcp)
   - `projectId`: (string) (required) (pattern: ^[a-z][a-z0-9-]{4,28}[a-z0-9]$)
   - `location`: (string) (required) (pattern: ^[a-z0-9-]+$) (max length: 63)
   - `keyRing`: (string) (required) (pattern: ^[A-Za-z0-9_-]+$) (max length: 63)
   - `cryptoKey`: (string) (required) (pattern: ^[A-Za-z0-9_-]+$) (max length: 63)
   - `credentials`: {object}
     - `keyfileJson`: (string)
   - `options`: {object}
     - `maxUses`: (integer)
     - `maxAgeMs`: (integer)
     - `cacheTtlSeconds`: (integer) | {object}
   - `provider`: (undefined) (required) (enum: aws)
   - `region`: (string) (required)
   - `keyId`: (string) (required)
   - `credentials`: {object}
     - `accessKey`: (string)
     - `secretKey`: (string)
     - `roleArn`: (string)
     - `externalId`: (string)
   - `options`: {object}
     - `maxUses`: (integer)
     - `maxAgeMs`: (integer)
     - `cacheTtlSeconds`: (integer) | {object}
   - `provider`: (undefined) (required) (enum: azure)
   - `keyId`: (string) (required) (pattern: ^[^?#@\s\\%]+$) (max length: 2048)
   - `credentials`: {object}
     - `tenantId`: (string) (required)
     - `clientId`: (string) (required)
     - `secret`: (string) (required)
   - `options`: {object}
     - `maxUses`: (integer)
     - `maxAgeMs`: (integer)
     - `cacheTtlSeconds`: (integer) | {object}
   - `provider`: (undefined) (required) (enum: vault-transit)
   - `address`: (string) (required) (pattern: ^[^?#@\s\\%]+$) (max length: 2048)
   - `mountPath`: (string) (pattern: ^[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+)*$) (max length: 256)
   - `namespace`: (string) (pattern: ^[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+)*$) (max length: 256)
   - `keyName`: (string) (required) (pattern: ^(?!\.+$)[A-Za-z0-9_.-]+$) (max length: 256)
   - `credentials`: {object}
     - `token`: (string) (required) (max length: 4096)
   - `options`: {object}
     - `maxUses`: (integer)
     - `maxAgeMs`: (integer)
     - `cacheTtlSeconds`: (integer)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) The name-derived ID of the encryption configuration.
  - `name`: (string) (required)
  - `description`: (string)
  - `createdAt`: (string) (required) (format: date-time)
  - `active`: (boolean) (required)
  - `firstActivatedAt`: (string) Time of first activation; absent for unused configurations. (format: date-time)
  - `envelope`: (multiple options) {object}
     - `provider`: (string) (required) (enum: aws)
     - `region`: (string) (required)
     - `keyId`: (string) (required)
     - `externalId`: (string) External ID used for cross-account role assumption.
     - `options`: {object}
       - `maxUses`: (integer) Maximum encryption uses per data key.
       - `maxAgeMs`: (integer) Maximum data-key lifetime in milliseconds.
       - `cacheTtlSeconds`: (integer) Decrypted data-key cache TTL in seconds. | {object}
     - `provider`: (string) (required) (enum: gcp)
     - `projectId`: (string) (required)
     - `location`: (string) (required)
     - `keyRing`: (string) (required)
     - `cryptoKey`: (string) (required)
     - `serviceAccountEmail`: (string) Northflank-generated identity to grant access to the KMS key.
     - `keyfileServiceAccountEmail`: (string) Service-account email from the supplied key file.
     - `options`: {object}
       - `maxUses`: (integer) Maximum encryption uses per data key.
       - `maxAgeMs`: (integer) Maximum data-key lifetime in milliseconds.
       - `cacheTtlSeconds`: (integer) Decrypted data-key cache TTL in seconds. | {object}
     - `provider`: (string) (required) (enum: azure)
     - `keyId`: (string) (required)
     - `options`: {object}
       - `maxUses`: (integer) Maximum encryption uses per data key.
       - `maxAgeMs`: (integer) Maximum data-key lifetime in milliseconds.
       - `cacheTtlSeconds`: (integer) Decrypted data-key cache TTL in seconds. | {object}
     - `provider`: (string) (required) (enum: vault-transit)
     - `address`: (string) (required)
     - `mountPath`: (string)
     - `namespace`: (string)
     - `keyName`: (string) (required)
     - `options`: {object}
       - `maxUses`: (integer) Maximum encryption uses per data key.
       - `maxAgeMs`: (integer) Maximum data-key lifetime in milliseconds.
       - `cacheTtlSeconds`: (integer) Decrypted data-key cache TTL in seconds.
  - `vault`: {object}
    - `version`: (string) (required)

### API reference

POST /v1/encryption/configurations

POST /v1/teams/{teamId}/encryption/configurations

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"string","envelope":{"provider":"gcp","projectId":"string","location":"string","keyRing":"string","cryptoKey":"string"}}' \
  https://api.northflank.com/v1/encryption/configurations
```

```javascript
const payload = {
  "name": "string",
  "envelope": {
    "provider": "gcp",
    "projectId": "string",
    "location": "string",
    "keyRing": "string",
    "cryptoKey": "string"
  }
}

const response = await fetch('https://api.northflank.com/v1/encryption/configurations', {
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

url = "https://api.northflank.com/v1/encryption/configurations"

payload = {"name":"string","envelope":{"provider":"gcp","projectId":"string","location":"string","keyRing":"string","cryptoKey":"string"}}
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
  url := "https://api.northflank.com/v1/encryption/configurations"

  var jsonStr = []byte(`{"name":"string","envelope":{"provider":"gcp","projectId":"string","location":"string","keyRing":"string","cryptoKey":"string"}}`)
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

200 OK: Created configuration without credentials.

```json
{
  "data": {
    "id": "production-kms"
  }
}
```

#### Example Response

400 Bad Request: Invalid configuration or failed KMS check.

#### Example Response

409 Conflict: An encryption configuration with this name already exists.

### CLI reference

$ northflank create encryption configuration

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "string",
  "envelope": {
    "provider": "gcp",
    "projectId": "string",
    "location": "string",
    "keyRing": "string",
    "cryptoKey": "string"
  }
}
```

#### Example Response

 Created configuration without credentials.

```json
{
  "id": "production-kms"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.create.encryption.configuration({
  data: {
    "name": "string",
    "envelope": {
      "provider": "gcp",
      "projectId": "string",
      "location": "string",
      "keyRing": "string",
      "cryptoKey": "string"
    }
  }
});
```

#### Example Response

 Created configuration without credentials.

```json
{
  "data": {
    "id": "production-kms"
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

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.encryption.configuration(
    data={
        "name": "string",
        "envelope": {
            "provider": "gcp",
            "projectId": "string",
            "location": "string",
            "keyRing": "string",
            "cryptoKey": "string",
        },
    },
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "production-kms",
  "name": "string",
  "createdAt": "1970-01-01T00:00:00.000Z",
  "active": false
}
```
