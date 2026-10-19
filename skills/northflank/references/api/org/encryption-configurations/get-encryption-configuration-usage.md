# Get encryption configuration usage

Source: https://northflank.com/docs/v1/api/org/encryption-configurations/get-encryption-configuration-usage.md

Returns wrapped-DEK counts for customer-visible configurations. Old keys must remain accessible while referenced. This does not count legacy non-envelope ciphertext.

Required permission: Account > Admin > Encryption > Read

**Response body:**

{object}
- `data`: {object}
  - `usage`: {object}

### API reference

GET /v1/encryption/usage

GET /v1/teams/{teamId}/encryption/usage

#### Example Response

200 OK: Wrapped-DEK counts by configuration ID.

```json
undefined
```

### CLI reference

$ northflank get encryption configurations usage

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Wrapped-DEK counts by configuration ID.

```json
undefined
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.encryption.configurations.usage({});
```

#### Example Response

 Wrapped-DEK counts by configuration ID.

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

response = client.get.encryption.configurations.usage()
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "usage": {}
}
```
