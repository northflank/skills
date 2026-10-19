# List encryption configurations

Source: https://northflank.com/docs/v1/api/team/encryption-configurations/list-encryption-configurations.md

Lists customer-visible encryption configurations and the current encryption mode for the authenticated team or organization, including retained and legacy Vault configurations. Credentials and internal Northflank-managed configurations are never returned.

Required permission: Account > Admin > Encryption > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `encryptionConfigurations`: [array of] {object}
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
  - `encryptionMode`: (string) (required) Encryption used for new writes: legacy Northflank default, Northflank-managed envelope, or a customer-managed configuration. Customer-managed includes envelope KMS and legacy Vault configurations; legacy Vault data cannot be migrated through DEK migration. (enum: default, northflank-envelope, customer-managed)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/encryption/configurations

GET /v1/teams/{teamId}/encryption/configurations

#### Example Response

200 OK: Encryption configurations.

```json
{
  "data": {
    "encryptionConfigurations": [
      {
        "id": "production-kms"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list encryption configurations

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 Encryption configurations.

```json
{
  "encryptionConfigurations": [
    {
      "id": "production-kms"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.encryption.configurations({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 Encryption configurations.

```json
{
  "data": {
    "encryptionConfigurations": [
      {
        "id": "production-kms"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
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

response = client.list.encryption.configurations(
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "encryptionConfigurations": [
    {
      "id": "production-kms",
      "name": "string",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "active": false
    }
  ],
  "encryptionMode": "default"
}
```
