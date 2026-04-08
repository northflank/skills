# Delete backup destination

Source: https://northflank.com/docs/v1/api/team/backup-destinations/delete-backup-destination.md

Delete a backup destination.

Required permission: Account > BackupDestinations > General > Delete

**Path parameters:**

{object}
- `backupDestinationId`: (string) (required) ID of the backup destination

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/backup-destinations/{backupDestinationId}

DELETE /v1/teams/{teamId}/backup-destinations/{backupDestinationId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete backup-destination

Options:

- `--backupDestinationId <backupDestinationId>`: ID of the backup destination

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
await apiClient.delete.backupDestination({
  parameters: {
    "backupDestinationId": "example-destination"
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
