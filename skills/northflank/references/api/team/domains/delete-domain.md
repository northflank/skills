# Delete domain

Source: https://northflank.com/docs/v1/api/team/domains/delete-domain.md

Deletes a domain and each of its registered subdomains.

Required permission: Account > Domains > General > Delete

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
