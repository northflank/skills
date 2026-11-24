# Create volume

Source: https://northflank.com/docs/v1/api/project/volumes/create-volume.md

Creates a volume with the specified payload

Required permission: Project > Volumes > General > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `name`: (string) (required) The name of the volume. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `tags`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `mounts`: [array of] (required) Array of mounts, containerMountPaths must be unique {object}
   - `volumeMountPath`: (string) Optionally specify the path inside this volume that should be mounted (pattern: ^((?!\.\.).)*$)
   - `containerMountPath`: (string) (required) Specify the path into which the volume should be mounted (pattern: ^((?!:).)*$)
- `spec`: {object} (required) Example storage schema
  - `accessMode`: (string) (required) Access mode of the volume. `ReadWriteOnce` volumes attach to one workload at a time. `ReadWriteMany` volumes can attach to multiple workloads and are required for GPU workloads on Northflank-managed clusters. (enum: ReadWriteOnce, ReadWriteMany)
  - `storageClassName`: (string) The storage class of the volume. Defaults to `nvme` for `ReadWriteOnce` volumes and `nf-multi-rw` for `ReadWriteMany` volumes. Available storage classes depend on the region.
  - `storageSize`: (integer) (required) The size of the storage, in megabytes. Configurable sizes depend on the storage class.
- `source`: {object}
  - `type`: (string) (required) (enum: volume, backup)
  - `sourceId`: (string) (required) Reference to the source object. For a volume source: "<volumeId>". For a backup source, prefer the backup UUID. Legacy "<volumeId>/<backupId>" and "<projectId>/<volumeId>/<backupId>" references remain supported.
- `owningObject`: {object} DEPRECATED: The object to attach this volume to.
  - `id`: (string) (required) The id of object to attach this volume to. (pattern: ^[A-Za-z0-9-]+$)
  - `type`: (string) (required) The type of the object to attach this volume to. (enum: service, job)
- `attachedObjects`: [array of] Array of objects this volume is attached to. {object} The object to attach this volume to.
   - `id`: (string) (required) The id of object to attach this volume to. (pattern: ^[A-Za-z0-9-]+$)
   - `type`: (string) (required) The type of the object to attach this volume to. (enum: service, job)
- `backupSchedules`: [array of] Backup schedules for the volume. Snapshot-only. {object}
   - `scheduling`: {object} (required) Schedule for the backup.
     - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
     - `minute`: [array of] (required) An array of minutes when the backup should be performed. (integer) A minute when the backup should be performed.
     - `hour`: [array of] An array of hours in 24 hour format when the backup should be performed. At these hours, a backup will be performed at each of the minutes provided in the `minute` field. Required for `daily` and `weekly` intervals and unavailable for `hourly` intervals. (integer) An hour when the backup should be performed, in 24 hour format.
     - `day`: [array of] An array of days of the week when the backup should be performed, where `0` represents Sunday and `6` represents Saturday. On these days, a backup will be performed at each of the minutes provided in the `minute` field whenever it is an hour from the `hour` field. Required for `weekly` intervals and unavailable for `hourly` and `daily` intervals. (integer) A day of the week when the backup should be performed, where `0` represents Sunday and `6` represents Saturday.
   - `retentionTime`: (integer) (required) The time the backup is retained for, in days.

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
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

### API reference

POST /v1/projects/{projectId}/volumes

POST /v1/teams/{teamId}/projects/{projectId}/volumes

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Volume","mounts":[{"volumeMountPath":"","containerMountPath":"/container"}],"spec":{"storageClassName":"nvme","storageSize":6144,"accessMode":"ReadWriteOnce"},"source":{"sourceId":"6d542e24-5d9f-4ecf-80a5-e80724b9133e","type":"volume"},"attachedObjects":[{"id":"example-service","type":"service"}],"backupSchedules":[{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"retentionTime":7}]}' \
  "https://api.northflank.com/v1/projects/{projectId}/volumes"
```

```javascript
const payload = {
  "name": "Example Volume",
  "mounts": [
    {
      "volumeMountPath": "",
      "containerMountPath": "/container"
    }
  ],
  "spec": {
    "storageClassName": "nvme",
    "storageSize": 6144,
    "accessMode": "ReadWriteOnce"
  },
  "source": {
    "sourceId": "6d542e24-5d9f-4ecf-80a5-e80724b9133e",
    "type": "volume"
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
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/volumes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/volumes"

payload = "{\"name\":\"Example Volume\",\"mounts\":[{\"volumeMountPath\":\"\",\"containerMountPath\":\"/container\"}],\"spec\":{\"storageClassName\":\"nvme\",\"storageSize\":6144,\"accessMode\":\"ReadWriteOnce\"},\"source\":{\"sourceId\":\"6d542e24-5d9f-4ecf-80a5-e80724b9133e\",\"type\":\"volume\"},\"attachedObjects\":[{\"id\":\"example-service\",\"type\":\"service\"}],\"backupSchedules\":[{\"scheduling\":{\"interval\":\"weekly\",\"minute\":[30],\"hour\":[18],\"day\":[4]},\"retentionTime\":7}]}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/projects/{projectId}/volumes"

  var jsonStr = []byte("{\"name\":\"Example Volume\",\"mounts\":[{\"volumeMountPath\":\"\",\"containerMountPath\":\"/container\"}],\"spec\":{\"storageClassName\":\"nvme\",\"storageSize\":6144,\"accessMode\":\"ReadWriteOnce\"},\"source\":{\"sourceId\":\"6d542e24-5d9f-4ecf-80a5-e80724b9133e\",\"type\":\"volume\"},\"attachedObjects\":[{\"id\":\"example-service\",\"type\":\"service\"}],\"backupSchedules\":[{\"scheduling\":{\"interval\":\"weekly\",\"minute\":[30],\"hour\":[18],\"day\":[4]},\"retentionTime\":7}]}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

#### Example Response

200 OK: Details about the newly created volume.

```json
{
  "data": {
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
}
```

#### Example Response

409 Conflict: There is already a volume with the same derived identifier

### CLI reference

$ northflank create volume

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Volume",
  "mounts": [
    {
      "volumeMountPath": "",
      "containerMountPath": "/container"
    }
  ],
  "spec": {
    "storageClassName": "nvme",
    "storageSize": 6144,
    "accessMode": "ReadWriteOnce"
  },
  "source": {
    "sourceId": "6d542e24-5d9f-4ecf-80a5-e80724b9133e",
    "type": "volume"
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
  ]
}
```

#### Example Response

 Details about the newly created volume.

```json
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
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.create.volume({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "name": "Example Volume",
    "mounts": [
      {
        "volumeMountPath": "",
        "containerMountPath": "/container"
      }
    ],
    "spec": {
      "storageClassName": "nvme",
      "storageSize": 6144,
      "accessMode": "ReadWriteOnce"
    },
    "source": {
      "sourceId": "6d542e24-5d9f-4ecf-80a5-e80724b9133e",
      "type": "volume"
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
    ]
  }
});
```

#### Example Response

 Details about the newly created volume.

```json
{
  "data": {
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

response = client.create.volume(
    project_id="default-project",
    data={
        "name": "Example Volume",
        "mounts": [{
            "volumeMountPath": "",
            "containerMountPath": "/container",
        }],
        "spec": {
            "storageClassName": "nvme",
            "storageSize": 6144,
            "accessMode": "ReadWriteOnce",
        },
        "source": {
            "sourceId": "6d542e24-5d9f-4ecf-80a5-e80724b9133e",
            "type": "volume",
        },
        "attachedObjects": [{
            "id": "example-service",
            "type": "service",
        }],
        "backupSchedules": [{
            "scheduling": {
                "interval": "weekly",
                "minute": [30],
                "hour": [18],
                "day": [4],
            },
            "retentionTime": 7,
        }],
    },
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
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
```
