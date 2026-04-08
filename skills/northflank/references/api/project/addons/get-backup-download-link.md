# Get backup download link

Source: https://northflank.com/docs/v1/api/project/addons/get-backup-download-link.md

Generates a temporary download link for downloading the given backup.

Required permission: Project > Addons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `backupId`: (string) (required) ID of the backup

**Response body:**

{object}
- `data`: {object}
  - `downloadLink`: (string) (required) The url to download the backup from.

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/download-link

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/download-link

#### Example Response

200 OK: A download link to the given backup.

```json
{
  "data": {
    "downloadLink": "https://storage.googleapis.com/..."
  }
}
```

### CLI reference

$ northflank get addon backup download

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--backupId <backupId>`: ID of the backup

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A download link to the given backup.

```json
{
  "downloadLink": "https://storage.googleapis.com/..."
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.backup.download({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "backupId": "example-backup"
  }
});
```

#### Example Response

 A download link to the given backup.

```json
{
  "data": {
    "downloadLink": "https://storage.googleapis.com/..."
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
