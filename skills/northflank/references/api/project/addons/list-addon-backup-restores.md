# List addon backup restores

Source: https://northflank.com/docs/v1/api/project/addons/list-addon-backup-restores.md

Gets a list of restores for the given backup.

Required permission: Project > Addons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `backupId`: (string) (required) ID of the backup

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `sourceProjectId`: (string) Specify the source projectId when referring to a global backup.
- `sourceAddonId`: (string) Specify the source addonId when referring to a global backup.

**Response body:**

{object}
- `data`: {object}
  - `restores`: [array of] {object}
     - `id`: (string) (required) The identifier for the backup.
     - `status`: (string) (required) The current status of the backup. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
     - `restoreTimestamp`: (string) (required) The time the backup was initiated. (format: date-time)
     - `completedAt`: (string) The time the restore was completed. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/restores

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/restores

#### Example Response

200 OK: A list of restores for the given backup.

```json
{
  "data": {
    "restores": [
      {
        "id": "668596c647fed81696a8a82c",
        "status": "completed",
        "restoreTimestamp": "2021-01-20T11:19:54.494Z",
        "completedAt": "2021-01-20T11:19:54.494Z"
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

$ northflank get addon backup restores

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--backupId <backupId>`: ID of the backup

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--sourceProjectId <sourceProjectId>`: Specify the source projectId when referring to a global backup.

- `--sourceAddonId <sourceAddonId>`: Specify the source addonId when referring to a global backup.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A list of restores for the given backup.

```json
{
  "restores": [
    {
      "id": "668596c647fed81696a8a82c",
      "status": "completed",
      "restoreTimestamp": "2021-01-20T11:19:54.494Z",
      "completedAt": "2021-01-20T11:19:54.494Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.backup.restores({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "backupId": "example-backup"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of restores for the given backup.

```json
{
  "data": {
    "restores": [
      {
        "id": "668596c647fed81696a8a82c",
        "status": "completed",
        "restoreTimestamp": "2021-01-20T11:19:54.494Z",
        "completedAt": "2021-01-20T11:19:54.494Z"
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
