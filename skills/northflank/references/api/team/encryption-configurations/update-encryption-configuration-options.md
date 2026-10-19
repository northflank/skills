# Update encryption configuration options

Source: https://northflank.com/docs/v1/api/team/encryption-configurations/update-encryption-configuration-options.md

Replaces all DEK rotation and cache overrides. Omitted values revert to platform defaults; send options={} to reset all overrides. Values must satisfy platform bounds. Requires customer-managed keys to be enabled.

Required permission: Account > Admin > Encryption > Manage

**Path parameters:**

{object}
- `encryptionConfigurationId`: (string) (required) Name-derived ID of the encryption configuration.

**Request body:**

{object}
- `options`: {object}
  - `maxUses`: (integer) Maximum encryption uses per data key.
  - `maxAgeMs`: (integer) Maximum data-key lifetime in milliseconds.
  - `cacheTtlSeconds`: (integer) Decrypted data-key cache TTL in seconds.

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

PUT /v1/encryption/configurations/{encryptionConfigurationId}/options

PUT /v1/teams/{teamId}/encryption/configurations/{encryptionConfigurationId}/options

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"options":{}}' \
  https://api.northflank.com/v1/encryption/configurations/{encryptionConfigurationId}/options
```

```javascript
const payload = {
  "options": {}
}

const response = await fetch('https://api.northflank.com/v1/encryption/configurations/{encryptionConfigurationId}/options', {
  method: 'PUT',
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

url = "https://api.northflank.com/v1/encryption/configurations/{encryptionConfigurationId}/options"

payload = {"options":{}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/encryption/configurations/{encryptionConfigurationId}/options"

  var jsonStr = []byte(`{"options":{}}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

200 OK: Updated configuration without credentials.

```json
{
  "data": {
    "id": "production-kms"
  }
}
```

#### Example Response

400 Bad Request: Invalid configuration, failed KMS check, or unsupported state transition.

#### Example Response

404 Not Found: Encryption configuration not found in this team or organization.

#### Example Response

409 Conflict: Concurrent configuration change. Read the current state before retrying.

### CLI reference

$ northflank update encryption configuration options

Options:

- `--encryptionConfigurationId <encryptionConfigurationId>`: Name-derived ID of the encryption configuration.

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

 Updated configuration without credentials.

```json
{
  "id": "production-kms"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.update.encryption.configuration.options({
  parameters: {
    "encryptionConfigurationId": "production-kms"
  },
  data: {
    "options": {}
  }
});
```

#### Example Response

 Updated configuration without credentials.

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

response = client.update.encryption.configuration.options(
    encryption_configuration_id="production-kms",
    data={
        "options": {},
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
