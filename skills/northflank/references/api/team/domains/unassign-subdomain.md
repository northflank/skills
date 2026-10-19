# Unassign subdomain

Source: https://northflank.com/docs/v1/api/team/domains/unassign-subdomain.md

Removes a subdomain from its assigned service

Required permission: Account > Networking > Subdomains > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Query parameters:**

{object}
- `unassignPaths`: (boolean) Unassign all associated subdomain paths from their respective services.

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/domains/{domain}/subdomains/{subdomain}/assign

DELETE /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/assign

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank unassign subdomain

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

- `--unassignPaths <unassignPaths>`: Unassign all associated subdomain paths from their respective services.

- `--verbose `: Verbose output

- `--quiet `: No console output

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
await apiClient.unassign.subdomain({
  parameters: {
    "domain": "example.com",
    "subdomain": "app"
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

response = client.unassign.subdomain(
    domain="example.com",
    subdomain="app",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
