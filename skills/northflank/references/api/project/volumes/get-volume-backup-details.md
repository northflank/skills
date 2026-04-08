# Get volume backup details

Source: https://northflank.com/docs/v1/api/project/volumes/get-volume-backup-details.md

Get details for a specific volume backup

Required permission: Project > Volumes > Backups > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume
- `backupId`: (string) (required) ID of the backup

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the backup
  - `name`: (string) (required)
  - `description`: (string)
  - `status`: (string) (required)
  - `spec`: {object}
    - `storageSize`: (integer)
  - `source`: {object}
    - `type`: (string)
    - `sourceObject`: {object}
      - `id`: (string)
      - `spec`: {object}
        - `accessMode`: (string)
        - `storageSize`: (integer)
        - `storageClassName`: (string)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

GET /v1/projects/{projectId}/volumes/{volumeId}/backups/{backupId}

GET /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups/{backupId}

#### Example Response

200 OK: Details about the specified volume backup.

```json
{
  "data": {
    "id": "example-backup"
  }
}
```

### CLI reference

$ northflank get volume backup

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

- `--backupId <backupId>`: ID of the backup

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the specified volume backup.

```json
{
  "id": "example-backup"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.volume.backup({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume",
    "backupId": "example-backup"
  }
});
```

#### Example Response

 Details about the specified volume backup.

```json
{
  "data": {
    "id": "example-backup"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
