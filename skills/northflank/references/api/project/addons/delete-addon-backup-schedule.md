# Delete addon backup schedule

Source: https://northflank.com/docs/v1/api/project/addons/delete-addon-backup-schedule.md

Deletes a backup schedule for an addon.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `scheduleId`: (string) (required) ID of the backup schedule

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/addons/{addonId}/backup-schedules/{scheduleId}

DELETE /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backup-schedules/{scheduleId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete addon backup-schedule

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--scheduleId <scheduleId>`: ID of the backup schedule

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
await apiClient.delete.addon.backupSchedule({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "scheduleId": "62d5729ab8593e3e33b65105"
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
