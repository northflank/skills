# Get volume

Source: https://northflank.com/docs/v1/api/project/volumes/get-volume.md

Retrieve a volume

Required permission: Project > Volumes > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the volume
  - `name`: (string) (required) Volume name
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `spec`: {object}
    - `accessMode`: (string) (required) Access mode of the volume. Only `ReadWriteOnce` is generally available. (enum: ReadWriteOnce, ReadWriteMany)
    - `storageClassName`: (string) The type of the storage.
    - `storageSize`: (integer) (required) The size of the storage, in megabytes. Configurable sizes depend on the storage class.
  - `attachedObjects`: [array of] {object}
     - `id`: (string) (required) The id of object to attach this volume to. (pattern: ^[A-Za-z0-9-]+$)
     - `type`: (string) (required) The type of the object to attach this volume to. (enum: service, job)
  - `backupSchedules`: [array of] {object}
     - `scheduling`: {object}
       - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
       - `minute`: [array of] (integer) A minute when the backup should be performed.
       - `hour`: [array of] (integer) An hour when the backup should be performed, in 24 hour format.
       - `day`: [array of] (integer) A day of the week when the backup should be performed, where `0` represents Monday and `6` represents Sunday.
     - `retentionTime`: (integer) (required) The time the backup is retained for, in days.
  - `status`: (string) (required) Status the volume is in on the cluster
  - `createdAt`: (string) (required) The timestamp the volume was created at (format: date-time)
  - `updatedAt`: (string) (required) The timestamp the volume was last updated at (format: date-time)

### API reference

GET /v1/projects/{projectId}/volumes/{volumeId}

GET /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}

#### Example Response

200 OK: Details about the specified Volume.

```json
{
  "data": {
    "id": "example-volume",
    "name": "Example Volume",
    "spec": {
      "storageClassName": "nvme",
      "storageSize": 6144
    },
    "attachedObjects": [
      {
        "id": "example-service",
        "type": "service"
      }
    ],
    "backupSchedules": [
      {
        "scheduling": {
          "interval": "weekly",
          "minute": [
            30
          ],
          "hour": [
            18
          ],
          "day": [
            4
          ]
        },
        "retentionTime": 7
      }
    ],
    "status": "BOUND",
    "createdAt": "2021-01-01 12:00:00.000Z",
    "updatedAt": "2021-01-01 12:00:00.000Z"
  }
}
```

### CLI reference

$ northflank get volume

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the specified Volume.

```json
{
  "id": "example-volume",
  "name": "Example Volume",
  "spec": {
    "storageClassName": "nvme",
    "storageSize": 6144
  },
  "attachedObjects": [
    {
      "id": "example-service",
      "type": "service"
    }
  ],
  "backupSchedules": [
    {
      "scheduling": {
        "interval": "weekly",
        "minute": [
          30
        ],
        "hour": [
          18
        ],
        "day": [
          4
        ]
      },
      "retentionTime": 7
    }
  ],
  "status": "BOUND",
  "createdAt": "2021-01-01 12:00:00.000Z",
  "updatedAt": "2021-01-01 12:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.volume({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume"
  }
});
```

#### Example Response

 Details about the specified Volume.

```json
{
  "data": {
    "id": "example-volume",
    "name": "Example Volume",
    "spec": {
      "storageClassName": "nvme",
      "storageSize": 6144
    },
    "attachedObjects": [
      {
        "id": "example-service",
        "type": "service"
      }
    ],
    "backupSchedules": [
      {
        "scheduling": {
          "interval": "weekly",
          "minute": [
            30
          ],
          "hour": [
            18
          ],
          "day": [
            4
          ]
        },
        "retentionTime": 7
      }
    ],
    "status": "BOUND",
    "createdAt": "2021-01-01 12:00:00.000Z",
    "updatedAt": "2021-01-01 12:00:00.000Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
