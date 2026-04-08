# Get addon backup schedules

Source: https://northflank.com/docs/v1/api/project/addons/get-addon-backup-schedules.md

Gets details about an addon's backup schedules

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
  - `schedules`: [array of] {object}
     - `id`: (string) (required) ID of the schedule.
     - `backupType`: (string) (required) The type of backup being performed. (enum: dump, snapshot)
     - `backupCompressionType`: (string) The compression algorithm of the backup. Only applicable for dump backups. Defaults to `gz`. (enum: gz, zstd)
     - `additionalDestinations`: [array of] {object}
         - `destinationId`: (string) (required) Additional custom back up destination that should be used to store the snapshot. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
         - `retentionTime`: (integer) Retention time of the additional back up in days.
         - `type`: (string) (required) The type of backup destination to use (enum: custom)
     - `customDestinationId`: (string) Custom backup destination in which the dump back up should be stored. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `scheduling`: {object}
       - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
       - `minute`: [array of] (integer) A minute when the backup should be performed.
       - `hour`: [array of] (integer) An hour when the backup should be performed, in 24 hour format.
       - `day`: [array of] (integer) A day of the week when the backup should be performed, where `0` represents Monday and `6` represents Sunday.
     - `retentionTime`: (integer) (required) The time the backup is retained for, in days.
     - `createdAt`: (string) (required) The timestamp the backup schedule was created. (format: date-time)
     - `updatedAt`: (string) (required) The timestamp the backup schedule was last updated. (format: date-time)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/backup-schedules

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backup-schedules

#### Example Response

200 OK: Details about the given addon's backup schedules.

```json
{
  "data": {
    "schedules": [
      {
        "id": "62cc20b90956ab62a58e8474",
        "backupType": "snapshot",
        "backupCompressionType": "gz",
        "additionalDestinations": [
          {
            "destinationId": "example-backup-destination",
            "retentionTime": 7,
            "type": "custom"
          }
        ],
        "customDestinationId": "example-backup-destination",
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
        "retentionTime": 7,
        "createdAt": "2022-07-11T13:08:09.626Z",
        "updatedAt": "2022-07-11T13:08:09.626Z"
      }
    ]
  }
}
```

### CLI reference

$ northflank get addon backup-schedules

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

 Details about the given addon's backup schedules.

```json
{
  "schedules": [
    {
      "id": "62cc20b90956ab62a58e8474",
      "backupType": "snapshot",
      "backupCompressionType": "gz",
      "additionalDestinations": [
        {
          "destinationId": "example-backup-destination",
          "retentionTime": 7,
          "type": "custom"
        }
      ],
      "customDestinationId": "example-backup-destination",
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
      "retentionTime": 7,
      "createdAt": "2022-07-11T13:08:09.626Z",
      "updatedAt": "2022-07-11T13:08:09.626Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.backupSchedules({
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

 Details about the given addon's backup schedules.

```json
{
  "data": {
    "schedules": [
      {
        "id": "62cc20b90956ab62a58e8474",
        "backupType": "snapshot",
        "backupCompressionType": "gz",
        "additionalDestinations": [
          {
            "destinationId": "example-backup-destination",
            "retentionTime": 7,
            "type": "custom"
          }
        ],
        "customDestinationId": "example-backup-destination",
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
        "retentionTime": 7,
        "createdAt": "2022-07-11T13:08:09.626Z",
        "updatedAt": "2022-07-11T13:08:09.626Z"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
