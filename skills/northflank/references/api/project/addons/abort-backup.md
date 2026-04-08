# Abort backup

Source: https://northflank.com/docs/v1/api/project/addons/abort-backup.md

Aborts the in progress backup.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `backupId`: (string) (required) ID of the backup

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank abort addon backup

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--backupId <backupId>`: ID of the backup

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
await apiClient.abort.addon.backup({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "backupId": "example-backup"
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
