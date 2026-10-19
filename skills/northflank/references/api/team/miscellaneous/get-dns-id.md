# Get DNS ID

Source: https://northflank.com/docs/v1/api/team/miscellaneous/get-dns-id.md

Returns the partially random string used when generating host names for the authenticated account.

Required permission: Project > Projects > Manage > Read

**Response body:**

{object}
- `data`: {object}
  - `dns`: (string) (required) The partially random string associated with the authenticated account, used for generating DNS entries.

### API reference

GET /v1/dns-id

GET /v1/teams/{teamId}/dns-id

#### Example Response

200 OK: Data about the DNS ID.

```json
{
  "data": {
    "dns": "exam-1234"
  }
}
```

### CLI reference

$ northflank get dns-id

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the DNS ID.

```json
{
  "dns": "exam-1234"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.dnsId({});
```

#### Example Response

 Data about the DNS ID.

```json
{
  "data": {
    "dns": "exam-1234"
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

response = client.get.dns_id()
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "dns": "exam-1234"
}
```
