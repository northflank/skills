# Delete external addon

Source: https://northflank.com/docs/v1/api/project/external-addons/delete-external-addon.md

Deletes an external addon and destroys the associated cloud resource

Required permission: Project > ExternalAddons > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `externalAddonId`: (string) (required) ID of the external addon

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/external-addons/{externalAddonId}

DELETE /v1/teams/{teamId}/projects/{projectId}/external-addons/{externalAddonId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete external-addon

Options:

- `--projectId <projectId>`: ID of the project

- `--externalAddonId <externalAddonId>`: ID of the external addon

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
await apiClient.delete.externalAddon({
  parameters: {
    "projectId": "default-project",
    "externalAddonId": "my-s3-bucket"
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
