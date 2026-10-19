# Verify encryption configuration

Source: https://northflank.com/docs/v1/api/org/encryption-configurations/verify-encryption-configuration.md

Checks stored KMS settings without changing the configuration. A completed check returns ok=false on KMS failure. Legacy Vault configurations return ok=true without a KMS check.

Required permission: Account > Admin > Encryption > Read

**Path parameters:**

{object}
- `encryptionConfigurationId`: (string) (required) Name-derived ID of the encryption configuration.

**Response body:**

{object}
- `data`: {object}
  - `ok`: (boolean) (required)
  - `keyRef`: (string) KMS key reference, when available.
  - `error`: (string) A safe validation failure summary.

### API reference

POST /v1/encryption/configurations/{encryptionConfigurationId}/verify

POST /v1/teams/{teamId}/encryption/configurations/{encryptionConfigurationId}/verify

#### Example Response

200 OK: Stored configuration verification result.

```json
undefined
```

### CLI reference

$ northflank verify encryption configuration

Options:

- `--encryptionConfigurationId <encryptionConfigurationId>`: Name-derived ID of the encryption configuration.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Stored configuration verification result.

```json
undefined
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.verify.encryption.configuration({
  parameters: {
    "encryptionConfigurationId": "production-kms"
  }
});
```

#### Example Response

 Stored configuration verification result.

```json
{
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

response = client.verify.encryption.configuration(
    encryption_configuration_id="production-kms",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "ok": false
}
```
