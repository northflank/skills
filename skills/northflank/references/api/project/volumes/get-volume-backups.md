# Get volume backups

Source: https://northflank.com/docs/v1/api/project/volumes/get-volume-backups.md

Get list of backups associated with a volume

Required permission: Project > Volumes > Backups > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: [array of] {object}
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/volumes/{volumeId}/backups

GET /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups

#### Example Response

200 OK: The list of volume backups.

```json
{
  "data": [
    {
      "id": "example-backup"
    }
  ],
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank get volume backups

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The list of volume backups.

```json
[
  {
    "id": "example-backup"
  }
]
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.volume.backups({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 The list of volume backups.

```json
{
  "data": [
    {
      "id": "example-backup"
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
