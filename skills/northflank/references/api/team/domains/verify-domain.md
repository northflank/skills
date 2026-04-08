# Verify domain

Source: https://northflank.com/docs/v1/api/team/domains/verify-domain.md

Attempts to verify the domain

Required permission: Account > Domains > General > Create

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/domains/{domain}/verify

POST /v1/teams/{teamId}/domains/{domain}/verify

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

400 Bad Request: Failed to verify the domain.

### CLI reference

$ northflank verify domain

Options:

- `--domain <domain>`: Name of the domain

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
await apiClient.verify.domain({
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
