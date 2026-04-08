# List destinations backups

Source: https://northflank.com/docs/v1/api/team/backup-destinations/list-destinations-backups.md

Lists the backups associated with a backup destinations.

Required permission: Account > BackupDestinations > General > Read

**Path parameters:**

{object}
- `backupDestinationId`: (string) (required) ID of the backup destination

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: [array of] {object}
   - `id`: (string) (required) The identifier for the backup.
   - `name`: (string) (required) The name of the backup.
   - `status`: (string) (required) The current status of the backup. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
   - `project`: {object}
     - `id`: (string) ID of the project this backup was taken for
     - `name`: (string) Name of the project this backup was taken for
   - `addon`: {object}
     - `id`: (string) ID of the addon this backup was taken for
     - `name`: (string) Name of the addon this backup was taken for
   - `config`: {object}
     - `addonVersion`: (string) The version of the addon at the time of the backup. The addon will be restored to this version when the backup is restored.
     - `addonType`: (string) The type of the addon this backup was taken for.
     - `source`: {object}
       - `type`: (string) The type of backup. (enum: global)
     - `size`: (string) (required) The size of the backup, in bytes
   - `schedules`: [array of] {object}
      - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
      - `minute`: [array of] (integer) A minute when the backup should be performed.
      - `hour`: [array of] (integer) An hour when the backup should be performed, in 24 hour format.
      - `day`: [array of] (integer) A day of the week when the backup should be performed, where `0` represents Monday and `6` represents Sunday.
   - `expiredBy`: (number) (required) The time the backup will expiry. (format: float)
   - `createdAt`: (string) (required) The time the backup was initiated.
   - `completedAt`: (string) (required) The time the backup was completed.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/backup-destinations/{backupDestinationId}/backups

GET /v1/teams/{teamId}/backup-destinations/{backupDestinationId}/backups

#### Example Response

200 OK: A list of backups saved to this backup destination.

```json
{
  "data": [
    {
      "id": "example-backup",
      "name": "Example Backup",
      "status": "completed",
      "project": {
        "id": "example-project",
        "name": "Example Project"
      },
      "addon": {
        "id": "example-addon",
        "name": "Example Addon"
      },
      "config": {
        "addonVersion": "4.4.8",
        "addonType": "mongodb",
        "source": {
          "type": "global"
        },
        "size": "1234"
      },
      "schedules": [
        {
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
        }
      ],
      "expiredBy": "1729232400000.0",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "completedAt": "2021-01-20T11:19:54.494Z"
    }
  ],
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list backup-destinations-backups

Options:

- `--backupDestinationId <backupDestinationId>`: ID of the backup destination

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of backups saved to this backup destination.

```json
[
  {
    "id": "example-backup",
    "name": "Example Backup",
    "status": "completed",
    "project": {
      "id": "example-project",
      "name": "Example Project"
    },
    "addon": {
      "id": "example-addon",
      "name": "Example Addon"
    },
    "config": {
      "addonVersion": "4.4.8",
      "addonType": "mongodb",
      "source": {
        "type": "global"
      },
      "size": "1234"
    },
    "schedules": [
      {
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
      }
    ],
    "expiredBy": "1729232400000.0",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "completedAt": "2021-01-20T11:19:54.494Z"
  }
]
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.backupDestinationsBackups({
  parameters: {
    "backupDestinationId": "example-destination"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of backups saved to this backup destination.

```json
{
  "data": [
    {
      "id": "example-backup",
      "name": "Example Backup",
      "status": "completed",
      "project": {
        "id": "example-project",
        "name": "Example Project"
      },
      "addon": {
        "id": "example-addon",
        "name": "Example Addon"
      },
      "config": {
        "addonVersion": "4.4.8",
        "addonType": "mongodb",
        "source": {
          "type": "global"
        },
        "size": "1234"
      },
      "schedules": [
        {
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
        }
      ],
      "expiredBy": "1729232400000.0",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "completedAt": "2021-01-20T11:19:54.494Z"
    }
  ],
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
