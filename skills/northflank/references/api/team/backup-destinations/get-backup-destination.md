# Get backup destination

Source: https://northflank.com/docs/v1/api/team/backup-destinations/get-backup-destination.md

View a backup destination, including secrets.

Required permission: Account > BackupDestinations > General > Read

**Path parameters:**

{object}
- `backupDestinationId`: (string) (required) ID of the backup destination

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the backup destination. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `type`: (string) (required) Type of the backup destination. (enum: s3)
  - `prefix`: (string) (required) A prefix path to add to the bucket objects if not writing to / (pattern: ^([a-zA-Z0-9-_]+)\/$)
  - `credentials`: {object}
    - `accessKey`: (string) (required)
    - `secretKey`: (string) (required)
    - `bucketName`: (string) (required)
    - `region`: (string) (required)
    - `endpoint`: (string) (required) S3 destination including region, fe s3.us-west-2.amazonaws.com
  - `id`: (string) (required) Identifier for the backup destination
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

GET /v1/backup-destinations/{backupDestinationId}

GET /v1/teams/{teamId}/backup-destinations/{backupDestinationId}

#### Example Response

200 OK: Details of the backup destination.

```json
{
  "data": {
    "name": "Example Backup Destination",
    "id": "example-backup-destination"
  }
}
```

### CLI reference

$ northflank get backup-destination

Options:

- `--backupDestinationId <backupDestinationId>`: ID of the backup destination

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details of the backup destination.

```json
{
  "name": "Example Backup Destination",
  "id": "example-backup-destination"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.backupDestination({
  parameters: {
    "backupDestinationId": "example-destination"
  }
});
```

#### Example Response

 Details of the backup destination.

```json
{
  "data": {
    "name": "Example Backup Destination",
    "id": "example-backup-destination"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
