# Delete domain

Source: https://northflank.com/docs/v1/api/team/domains/delete-domain.md

Deletes a domain and each of its registered subdomains.

Required permission: Account > Networking > Domains > Delete

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/domains/{domain}

DELETE /v1/teams/{teamId}/domains/{domain}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete domain

Options:

- `--domain <domain>`: Name of the domain

- `--verbose `: Verbose output

- `--quiet `: No console output

- `--force `: Don't ask for confirmation

- `-o --output <format>`: Output formatting

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.delete.domain({
  parameters: {
    "domain": "example.com"
  }
});
```

#### Example Response

 The operation was performed successfully.

```json
{
  "data": {},
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

response = client.delete.domain(
    domain="example.com",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
