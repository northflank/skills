# Delete subdomain

Source: https://northflank.com/docs/v1/api/team/domains/delete-subdomain.md

Removes a subdomain from a domain.

Required permission: Account > Subdomains > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/domains/{domain}/subdomains/{subdomain}

DELETE /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

400 Bad Request: The default (empty) subdomain cannot be deleted.

#### Example Response

404 Not Found: The subdomain does not exist.

### CLI reference

$ northflank delete subdomain

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

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

```javascript
await apiClient.delete.subdomain({
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
