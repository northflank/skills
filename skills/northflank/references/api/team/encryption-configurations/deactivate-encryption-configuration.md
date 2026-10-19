# Deactivate encryption configuration

Source: https://northflank.com/docs/v1/api/team/encryption-configurations/deactivate-encryption-configuration.md

Switches new encryption to Northflank-managed envelope encryption. Retains the old configuration for decryption and does not migrate existing data. Only the active configuration can be deactivated; repeated requests fail once it is inactive. Requires customer-managed keys to be enabled.

Required permission: Account > Admin > Encryption > Manage

**Path parameters:**

{object}
- `encryptionConfigurationId`: (string) (required) Name-derived ID of the encryption configuration.

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

POST /v1/encryption/configurations/{encryptionConfigurationId}/deactivate

POST /v1/teams/{teamId}/encryption/configurations/{encryptionConfigurationId}/deactivate

#### Example Response

200 OK: Retained encryption configuration after deactivation.

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

$ northflank deactivate encryption configuration

Options:

- `--encryptionConfigurationId <encryptionConfigurationId>`: Name-derived ID of the encryption configuration.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Retained encryption configuration after deactivation.

```json
{
  "id": "production-kms"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.deactivate.encryption.configuration({
  parameters: {
    "encryptionConfigurationId": "production-kms"
  }
});
```

#### Example Response

 Retained encryption configuration after deactivation.

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

response = client.deactivate.encryption.configuration(
    encryption_configuration_id="production-kms",
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
