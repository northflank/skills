# Unlink addon from project secret

Source: https://northflank.com/docs/v1/api/project/secrets/unlink-addon-from-project-secret.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Unlinks an addon from the project secret.

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `secretId`: (string) (required) ID of the project secret
- `addonId`: (string) (required) ID of the addon

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}

DELETE /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/addons/{addonId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete secret-link

Options:

- `--projectId <projectId>`: ID of the project

- `--secretId <secretId>`: ID of the project secret

- `--addonId <addonId>`: ID of the addon

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
await apiClient.delete.secretLink({
  parameters: {
    "projectId": "default-project",
    "secretId": "example-secret",
    "addonId": "example-addon"
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
