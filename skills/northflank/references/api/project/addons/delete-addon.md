# Delete addon

Source: https://northflank.com/docs/v1/api/project/addons/delete-addon.md

Deletes the given addon.

Required permission: Project > Addons > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/addons/{addonId}

DELETE /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete addon

Options:

- `--projectId <projectId>`: ID of the project

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
await apiClient.delete.addon({
  parameters: {
    "projectId": "default-project",
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
