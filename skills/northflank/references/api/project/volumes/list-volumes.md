# List volumes

Source: https://northflank.com/docs/v1/api/project/volumes/list-volumes.md

Gets a list of volumes belonging to the project

Required permission: Project > Volumes > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: [array of] {object}
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
   - `status`: (string) (required) Status the volume is in on the cluster
   - `createdAt`: (string) (required) The timestamp the volume was created at (format: date-time)
   - `updatedAt`: (string) (required) The timestamp the volume was last updated at (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/volumes

GET /v1/teams/{teamId}/projects/{projectId}/volumes

#### Example Response

200 OK: The list of volumes.

```json
{
  "data": [
    {
      "id": "example-volume",
      "name": "Example Volume",
      "spec": {
        "storageClassName": "ssd",
        "storageSize": 6144
      },
      "attachedObjects": [
        {
          "id": "example-service",
          "type": "service"
        }
      ],
      "status": "BOUND",
      "createdAt": "2021-01-01 12:00:00.000Z",
      "updatedAt": "2021-01-01 12:00:00.000Z"
    }
  ],
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list volumes

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of volumes.

```json
[
  {
    "id": "example-volume",
    "name": "Example Volume",
    "spec": {
      "storageClassName": "ssd",
      "storageSize": 6144
    },
    "attachedObjects": [
      {
        "id": "example-service",
        "type": "service"
      }
    ],
    "status": "BOUND",
    "createdAt": "2021-01-01 12:00:00.000Z",
    "updatedAt": "2021-01-01 12:00:00.000Z"
  }
]
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.volumes({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 The list of volumes.

```json
{
  "data": [
    {
      "id": "example-volume",
      "name": "Example Volume",
      "spec": {
        "storageClassName": "ssd",
        "storageSize": 6144
      },
      "attachedObjects": [
        {
          "id": "example-service",
          "type": "service"
        }
      ],
      "status": "BOUND",
      "createdAt": "2021-01-01 12:00:00.000Z",
      "updatedAt": "2021-01-01 12:00:00.000Z"
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
