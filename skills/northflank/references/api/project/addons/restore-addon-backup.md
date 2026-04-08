# Restore addon backup

Source: https://northflank.com/docs/v1/api/project/addons/restore-addon-backup.md

Restores the given addon to the given backup state.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `backupId`: (string) (required) ID of the backup

**Query parameters:**

{object}
- `sourceProjectId`: (string) Specify the source projectId when referring to a global backup.
- `sourceAddonId`: (string) Specify the source addonId when referring to a global backup.

**Response body:**

{object}
- `data`: {object}
  - `restoreId`: (string) (required) The ID of the initiated restore.

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/restore

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/restore

#### Example Response

200 OK: Details about the backup restore.

```json
{
  "data": {
    "restoreId": "1611305397038"
  }
}
```

### CLI reference

$ northflank restore addon backup

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--backupId <backupId>`: ID of the backup

- `--sourceProjectId <sourceProjectId>`: Specify the source projectId when referring to a global backup.

- `--sourceAddonId <sourceAddonId>`: Specify the source addonId when referring to a global backup.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the backup restore.

```json
{
  "restoreId": "1611305397038"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.restore.addon.backup({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "backupId": "example-backup"
  },
  options: {}
});
```

#### Example Response

 Details about the backup restore.

```json
{
  "data": {
    "restoreId": "1611305397038"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
