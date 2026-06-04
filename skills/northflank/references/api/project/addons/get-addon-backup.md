# Get addon backup

Source: https://northflank.com/docs/v1/api/project/addons/get-addon-backup.md

Gets details about a given backup.

Required permission: Project > Addons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `backupId`: (string) (required) ID of the backup

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) The identifier for the backup.
  - `name`: (string) (required) The name of the backup.
  - `uid`: (string) (required) The unique id of the backup.
  - `status`: (string) (required) The current status of the backup. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
  - `createdAt`: (string) (required) The time the backup was initiated.
  - `completedAt`: (string) The time the backup was completed.
  - `config`: {object}
    - `source`: {object}
      - `type`: (string) The type of backup. (enum: fileUpload, liveInstance, snapshot, externalDump, sameAddon)
    - `size`: (string) (required) The size of the backup, in bytes
    - `addonVersion`: (string) The version of the addon at the time of the backup. If the backup type is `snapshot`, the addon will be restored to this version when the backup is restored.
  - `lastRestore`: {object}
    - `restoreTimestamp`: (string) (required) The time the backup was initiated. (format: date-time)
    - `status`: (string) (required) The current status of the restore. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
    - `completedAt`: (string) The time the restore was completed. (format: date-time)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}

#### Example Response

200 OK: Details about the given backup.

```json
{
  "data": {
    "id": "example-backup",
    "name": "Example Backup",
    "uid": "88283b31-06f3-4857-b75f-f807bd7a52af",
    "status": "completed",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "completedAt": "2021-01-20T11:19:54.494Z",
    "config": {
      "source": {
        "type": "snapshot"
      },
      "size": "1234",
      "addonVersion": "4.4.8"
    },
    "lastRestore": {
      "restoreTimestamp": "2021-01-20T11:19:54.494Z",
      "status": "completed",
      "completedAt": "2021-01-20T11:19:54.494Z"
    }
  }
}
```

### CLI reference

$ northflank get addon backup

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--backupId <backupId>`: ID of the backup

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the given backup.

```json
{
  "id": "example-backup",
  "name": "Example Backup",
  "uid": "88283b31-06f3-4857-b75f-f807bd7a52af",
  "status": "completed",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "completedAt": "2021-01-20T11:19:54.494Z",
  "config": {
    "source": {
      "type": "snapshot"
    },
    "size": "1234",
    "addonVersion": "4.4.8"
  },
  "lastRestore": {
    "restoreTimestamp": "2021-01-20T11:19:54.494Z",
    "status": "completed",
    "completedAt": "2021-01-20T11:19:54.494Z"
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.backup({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "backupId": "example-backup"
  }
});
```

#### Example Response

 Details about the given backup.

```json
{
  "data": {
    "id": "example-backup",
    "name": "Example Backup",
    "uid": "88283b31-06f3-4857-b75f-f807bd7a52af",
    "status": "completed",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "completedAt": "2021-01-20T11:19:54.494Z",
    "config": {
      "source": {
        "type": "snapshot"
      },
      "size": "1234",
      "addonVersion": "4.4.8"
    },
    "lastRestore": {
      "restoreTimestamp": "2021-01-20T11:19:54.494Z",
      "status": "completed",
      "completedAt": "2021-01-20T11:19:54.494Z"
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
