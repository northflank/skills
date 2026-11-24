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
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: [array of] (required) Result data. {object} A volume object
   - `id`: (string) (required) Identifier for the volume
   - `uid`: (string) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
   - `name`: (string) (required) Volume name
   - `tags`: [array of] (required) An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `spec`: {object} (required) Example storage schema
     - `accessMode`: (string) (required) Access mode of the volume. `ReadWriteOnce` volumes attach to one workload at a time. `ReadWriteMany` volumes can attach to multiple workloads and are required for GPU workloads on Northflank-managed clusters. (enum: ReadWriteOnce, ReadWriteMany)
     - `storageClassName`: (string) The storage class of the volume. Defaults to `nvme` for `ReadWriteOnce` volumes and `nf-multi-rw` for `ReadWriteMany` volumes. Available storage classes depend on the region.
     - `storageSize`: (integer) (required) The size of the storage, in megabytes. Configurable sizes depend on the storage class.
   - `attachedObjects`: [array of] List of objects this volume is attached to. {object} The object to attach this volume to.
      - `id`: (string) (required) The id of object to attach this volume to. (pattern: ^[A-Za-z0-9-]+$)
      - `type`: (string) (required) The type of the object to attach this volume to. (enum: service, job)
   - `backupSchedules`: [array of] {object}
      - `scheduling`: {object} (required) Schedule for the backup.
        - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
        - `minute`: [array of] (required) An array of minutes when the backup should be performed. (integer) A minute when the backup should be performed.
        - `hour`: [array of] An array of hours in 24 hour format when the backup should be performed. At these hours, a backup will be performed at each of the minutes provided in the `minute` field. Required for `daily` and `weekly` intervals and unavailable for `hourly` intervals. (integer) An hour when the backup should be performed, in 24 hour format.
        - `day`: [array of] An array of days of the week when the backup should be performed, where `0` represents Sunday and `6` represents Saturday. On these days, a backup will be performed at each of the minutes provided in the `minute` field whenever it is an hour from the `hour` field. Required for `weekly` intervals and unavailable for `hourly` and `daily` intervals. (integer) A day of the week when the backup should be performed, where `0` represents Sunday and `6` represents Saturday.
      - `retentionTime`: (integer) (required) The time the backup is retained for, in days.
   - `status`: (string) (required) Status the volume is in on the cluster
   - `migration`: {object} Clone migration phase, separate from the volume binding status.
     - `status`: (string) (required) (enum: PENDING, SNAPSHOTTING, RESTORING, RELOCATING, ATTACHING, COMPLETED, FAILED)
   - `createdAt`: (string) (required) The timestamp the volume was created at (format: date-time)
   - `updatedAt`: (string) (required) The timestamp the volume was last updated at (format: date-time)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/volumes

GET /v1/teams/{teamId}/projects/{projectId}/volumes

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/volumes?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/volumes?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: The list of volumes.

```json
{
  "data": [
    {
      "id": "example-volume",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "name": "Example Volume",
      "spec": {
        "storageClassName": "nvme",
        "storageSize": 6144,
        "accessMode": "ReadWriteOnce"
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
      "updatedAt": "2021-01-01 12:00:00.000Z",
      "tags": []
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
    "uid": "68f0aa1b9c4e2d7f11a3b402",
    "name": "Example Volume",
    "spec": {
      "storageClassName": "nvme",
      "storageSize": 6144,
      "accessMode": "ReadWriteOnce"
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
    "updatedAt": "2021-01-01 12:00:00.000Z",
    "tags": []
  }
]
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "name": "Example Volume",
      "spec": {
        "storageClassName": "nvme",
        "storageSize": 6144,
        "accessMode": "ReadWriteOnce"
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
      "updatedAt": "2021-01-01 12:00:00.000Z",
      "tags": []
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.volumes(
    project_id="default-project",
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
[
  {
    "id": "example-volume",
    "uid": "68f0aa1b9c4e2d7f11a3b402",
    "name": "Example Volume",
    "spec": {
      "storageClassName": "nvme",
      "storageSize": 6144,
      "accessMode": "ReadWriteOnce"
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
    "updatedAt": "2021-01-01 12:00:00.000Z",
    "tags": []
  }
]
```
