# Enable Northflank-managed envelope encryption

Source: https://northflank.com/docs/v1/api/org/encryption-configurations/enable-northflank-managed-envelope-encryption.md

Opts into Northflank-managed envelope encryption for new writes without supplying a customer KMS configuration. Repeated requests are a no-op once enabled. Existing data is unchanged; DEKs created after opt-in can later be migrated to a customer KMS. If a customer configuration is active, deactivate it to switch to Northflank-managed envelope encryption; no separate opt-in request is needed. Requires customer-managed keys to be enabled.

Required permission: Account > Admin > Encryption > Manage

**Response body:**

{object}
- `data`: {object}
  - `encryptionMode`: (string) (required) Encryption used for new writes after opt-in. (enum: northflank-envelope)
  - `changed`: (boolean) (required) False when Northflank-managed envelope encryption was already active.

### API reference

POST /v1/encryption/northflank-managed/activate

POST /v1/teams/{teamId}/encryption/northflank-managed/activate

#### Example Response

200 OK: Northflank-managed envelope encryption enabled.

```json
undefined
```

#### Example Response

400 Bad Request: Northflank-managed key validation failed.

#### Example Response

409 Conflict: A customer encryption configuration is active, or the configuration changed concurrently. Deactivating an active customer configuration switches to Northflank-managed envelope encryption without a separate opt-in request.

### CLI reference

$ northflank activate encryption northflank-managed

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Northflank-managed envelope encryption enabled.

```json
undefined
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.activate.encryption.northflankManaged({});
```

#### Example Response

 Northflank-managed envelope encryption enabled.

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

response = client.activate.encryption.northflank_managed()
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "encryptionMode": "northflank-envelope",
  "changed": false
}
```
