# Verify subdomain

Source: https://northflank.com/docs/v1/api/team/domains/verify-subdomain.md

Gets details about the given subdomain

Required permission: Account > Subdomains > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/subdomains/{subdomain}/verify

POST /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/verify

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

400 Bad Request: Failed to verify the subdomain.

### CLI reference

$ northflank verify subdomain

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

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

```javascript
await apiClient.verify.subdomain({
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
