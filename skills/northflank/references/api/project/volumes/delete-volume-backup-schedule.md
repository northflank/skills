# Delete volume backup schedule

Source: https://northflank.com/docs/v1/api/project/volumes/delete-volume-backup-schedule.md

Deletes a snapshot backup schedule for a volume.

Required permission: Project > Volumes > Backups > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume
- `scheduleId`: (string) (required) ID of the backup schedule

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/volumes/{volumeId}/backup-schedules/{scheduleId}

DELETE /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backup-schedules/{scheduleId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete volume backup-schedule

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

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
await apiClient.delete.volume.backupSchedule({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume",
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
