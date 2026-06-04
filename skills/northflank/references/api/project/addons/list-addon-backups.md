# List addon backups

Source: https://northflank.com/docs/v1/api/project/addons/list-addon-backups.md

Returns a list of backups for the given addon.

Required permission: Project > Addons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `backups`: [array of] {object}
     - `id`: (string) (required) The identifier for the backup.
     - `name`: (string) (required) The name of the backup.
     - `uid`: (string) (required) The unique id of the backup.
     - `status`: (string) (required) The current status of the backup. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
     - `createdAt`: (string) (required) The time the backup was initiated.
     - `completedAt`: (string) (required) The time the backup was completed.
     - `config`: {object}
       - `source`: {object}
         - `type`: (string) The type of backup. (enum: fileUpload, liveInstance, snapshot, externalDump, sameAddon)
       - `size`: (string) (required) The size of the backup, in bytes
       - `compressionType`: (string) The compression algorithm of the backup. Only applicable for dump backups. Defaults to `gz`. (enum: gz, zstd)
       - `additionalDestinations`: [array of] {object}
           - `destinationId`: (string) (required) Additional custom back up destination that should be used to store the snapshot. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
           - `retentionTime`: (integer) Retention time of the additional back up in days.
           - `type`: (string) (required) The type of backup destination to use (enum: custom)
       - `addonVersion`: (string) The version of the addon at the time of the backup. If the backup type is `snapshot`, the addon will be restored to this version when the backup is restored.
     - `customDestinationId`: (string) Custom backup destination in which the dump back up should be stored. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/backups

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups

#### Example Response

200 OK: A list of backups for the addon.

```json
{
  "data": {
    "backups": [
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
          "compressionType": "gz",
          "additionalDestinations": [
            {
              "destinationId": "example-backup-destination",
              "retentionTime": 7,
              "type": "custom"
            }
          ],
          "addonVersion": "4.4.8"
        },
        "customDestinationId": "example-backup-destination"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank get addon backups

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A list of backups for the addon.

```json
{
  "backups": [
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
        "compressionType": "gz",
        "additionalDestinations": [
          {
            "destinationId": "example-backup-destination",
            "retentionTime": 7,
            "type": "custom"
          }
        ],
        "addonVersion": "4.4.8"
      },
      "customDestinationId": "example-backup-destination"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.backups({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of backups for the addon.

```json
{
  "data": {
    "backups": [
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
          "compressionType": "gz",
          "additionalDestinations": [
            {
              "destinationId": "example-backup-destination",
              "retentionTime": 7,
              "type": "custom"
            }
          ],
          "addonVersion": "4.4.8"
        },
        "customDestinationId": "example-backup-destination"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
