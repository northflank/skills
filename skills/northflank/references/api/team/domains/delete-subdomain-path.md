# Delete subdomain path

Source: https://northflank.com/docs/v1/api/team/domains/delete-subdomain-path.md

Delete a path.

Required permission: Account > SubdomainPaths > General > Update

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain
- `subdomainPath`: (string) (required) Name of the path

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}

DELETE /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete subdomain path

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

- `--subdomainPath <subdomainPath>`: Name of the path

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
await apiClient.delete.subdomain.path({
  parameters: {
    "domain": "example.com",
    "subdomain": "app",
    "subdomainPath": "/"
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
