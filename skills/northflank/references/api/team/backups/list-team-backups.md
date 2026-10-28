# List team backups

Source: https://northflank.com/docs/v1/api/team/backups/list-team-backups.md

Lists backups across projects for the required addon or volume resource type, newest first. Filters are combined; comma-separated values match any listed value. Includes retained backups of deleted addons. Each request returns one resource type; filters specific to the other type are rejected. Cursor pagination is recommended; use the returned ObjectId cursor rather than a backup ID or UUID.

Required permission: Account > Platform > Backups > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)
- `resourceType`: (string) Return addon backups or volume backups. Exactly one resource type is required. (enum: addon, volume)
- `volumeId`: (string) Volume ID or comma-separated volume IDs, matched across the selected projects. (max length: 10100)
- `projectId`: (string) Project ID or comma-separated project IDs. Matches addon backup metadata or existing project records for volumes, including soft-deleted projects and reused IDs. (max length: 10100)
- `addonId`: (string) Addon ID or comma-separated addon IDs. Matches stored IDs across selected projects, or the whole team when projectId is omitted, including IDs reused after deletion. (max length: 10100)
- `addonType`: (string) Filter by addon type. (max length: 100)
- `backupType`: (string) Backup type or comma-separated backup types: sameAddon, snapshot, global, externalDump, fileUpload, liveInstance. (max length: 10100)
- `status`: (multiple options) (string) (max length: 10100)
- `customDestinationId`: (string) Filter by primary custom destination ID. Only current destinations are resolved. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `after`: (string) Include backups created at or after this ISO-8601 timestamp. (format: date-time)
- `before`: (string) Include backups created at or before this ISO-8601 timestamp. (format: date-time)
- `search`: (string) Case-insensitive literal substring of the backup name or ID. (max length: 100)

**Response body:**

{object}
- `data`: {object}
  - `backups`: [array of] (multiple options) {object}
      - `resourceType`: (string) (required) (enum: addon)
      - `id`: (string) (required) The backup ID.
      - `uid`: (string) The backup UUID, when available. (format: uuid)
      - `name`: (string) (required) The backup name.
      - `status`: (string) (required) (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
      - `createdAt`: (string) (required) (format: date-time)
      - `completedAt`: (string) (format: date-time)
      - `project`: {object}
        - `id`: (string) Stored resource ID.
        - `name`: (string) Stored resource name.
      - `addon`: {object}
        - `id`: (string) Stored resource ID.
        - `name`: (string) Stored resource name.
      - `customDestinationId`: (string) Primary custom destination ID, when its public ID is available. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `config`: {object}
        - `source`: {object}
          - `type`: (string) (required) (enum: sameAddon, snapshot, global, externalDump, fileUpload, liveInstance)
        - `addonType`: (string)
        - `addonVersion`: (string)
        - `size`: (string) Final backup size in bytes, when available.
        - `compressionType`: (string) (enum: zstd, gz, none)
        - `additionalDestinations`: [array of] (multiple options) {object}
              - `type`: (string) (required) (enum: custom)
              - `destinationId`: (string) (required) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
              - `retentionTime`: (integer) The time the backup is retained for, in days. | {object}
              - `type`: (string) (required) (enum: default) | {object}
      - `id`: (string) (required) Identifier for the backup
      - `uid`: (string) Stable identifier for using this backup as a volume source (format: uuid)
      - `name`: (string) (required)
      - `description`: (string)
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
      - `resourceType`: (string) (required) (enum: volume)
      - `status`: (string) (required) (enum: DELETED, PENDING, IN_PROGRESS, FAILED, READY)
      - `project`: {object}
        - `id`: (string) Stored resource ID.
        - `name`: (string) Stored resource name.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/backups

GET /v1/teams/{teamId}/backups

#### Example Response

200 OK: A list of backups belonging to the team.

```json
{
  "data": {
    "backups": [
      {
        "config": {
          "additionalDestinations": [
            {
              "retentionTime": 7
            }
          ]
        }
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

$ northflank list backups

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--resourceType <resourceType>`: Return addon backups or volume backups. Exactly one resource type is required.

- `--volumeId <volumeId>`: Volume ID or comma-separated volume IDs, matched across the selected projects.

- `--projectId <projectId>`: Project ID or comma-separated project IDs. Matches addon backup metadata or existing project records for volumes, including soft-deleted projects and reused IDs.

- `--addonId <addonId>`: Addon ID or comma-separated addon IDs. Matches stored IDs across selected projects, or the whole team when projectId is omitted, including IDs reused after deletion.

- `--addonType <addonType>`: Filter by addon type.

- `--backupType <backupType>`: Backup type or comma-separated backup types: sameAddon, snapshot, global, externalDump, fileUpload, liveInstance.

- `--status <status>`: Status or comma-separated statuses. Addons: scheduled, in-progress, completed, aborting, aborted, failed, not-supported. Volumes: DELETED, PENDING, IN_PROGRESS, FAILED, READY. Deleted backups are excluded.

- `--customDestinationId <customDestinationId>`: Filter by primary custom destination ID. Only current destinations are resolved.

- `--after <after>`: Include backups created at or after this ISO-8601 timestamp.

- `--before <before>`: Include backups created at or before this ISO-8601 timestamp.

- `--search <search>`: Case-insensitive literal substring of the backup name or ID.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of backups belonging to the team.

```json
{
  "backups": [
    {
      "config": {
        "additionalDestinations": [
          {
            "retentionTime": 7
          }
        ]
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.backups({
  options: {
    "per_page": 50,
    "page": 1,
    "projectId": "production,staging",
    "addonId": "postgres,redis",
    "addonType": "postgresql",
    "backupType": "snapshot,global",
    "customDestinationId": "example-destination",
    "search": "daily"
  }
});
```

#### Example Response

 A list of backups belonging to the team.

```json
{
  "data": {
    "backups": [
      {
        "config": {
          "additionalDestinations": [
            {
              "retentionTime": 7
            }
          ]
        }
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
