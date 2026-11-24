# Get encryption configuration usage

Source: https://northflank.com/docs/v1/api/team/encryption-configurations/get-encryption-configuration-usage.md

Returns wrapped-DEK counts for customer-visible configurations. Old keys must remain accessible while referenced. This does not count legacy non-envelope ciphertext.

Required permission: Account > Admin > Encryption > Read

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `usage`: {object} (required) Wrapped-DEK counts by configuration ID. Non-zero counts require retaining access to the old key; zero is not proof that legacy encrypted data is unused.

### API reference

GET /v1/encryption/usage

GET /v1/teams/{teamId}/encryption/usage

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/encryption/usage"
```

```python
import requests

url = "https://api.northflank.com/v1/encryption/usage"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Wrapped-DEK counts by configuration ID.

```json
{
  "data": {
    "usage": {}
  }
}
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
{
  "usage": {}
}
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
  "data": {
    "usage": {}
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
