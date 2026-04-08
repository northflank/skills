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
- `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `mounts`: [array of] {object}
   - `volumeMountPath`: (string) Optionally specify the path inside this volume that should be mounted (pattern: ^((?!\.\.).)*$)
   - `containerMountPath`: (string) (required) Specify the path into which the volume should be mounted (pattern: ^((?!:).)*$)
- `spec`: {object}
  - `accessMode`: (string) (required) Access mode of the volume. Only `ReadWriteOnce` is generally available. (enum: ReadWriteOnce, ReadWriteMany)
  - `storageClassName`: (string) The type of the storage.
  - `storageSize`: (integer) (required) The size of the storage, in megabytes. Configurable sizes depend on the storage class.
- `source`: {object}
  - `type`: (string) (required) (enum: volume, backup)
  - `sourceId`: (string) (required) The ID of the source object (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `owningObject`: {object}
  - `id`: (string) (required) The id of object to attach this volume to. (pattern: ^[A-Za-z0-9-]+$)
  - `type`: (string) (required) The type of the object to attach this volume to. (enum: service, job)
- `attachedObjects`: [array of] {object}
   - `id`: (string) (required) The id of object to attach this volume to. (pattern: ^[A-Za-z0-9-]+$)
   - `type`: (string) (required) The type of the object to attach this volume to. (enum: service, job)

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
  - `status`: (string) (required) Status the volume is in on the cluster
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
  --data '{"name":"Example Volume","mounts":[{"volumeMountPath":"","containerMountPath":"/container"}],"spec":{"storageClassName":"ssd","storageSize":6144},"attachedObjects":[{"id":"example-service","type":"service"}]}' \
  https://api.northflank.com/v1/projects/{projectId}/volumes
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
    "storageClassName": "ssd",
    "storageSize": 6144
  },
  "attachedObjects": [
    {
      "id": "example-service",
      "type": "service"
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

payload = {"name":"Example Volume","mounts":[{"volumeMountPath":"","containerMountPath":"/container"}],"spec":{"storageClassName":"ssd","storageSize":6144},"attachedObjects":[{"id":"example-service","type":"service"}]}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, json = payload)

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

  var jsonStr = []byte(`{"name":"Example Volume","mounts":[{"volumeMountPath":"","containerMountPath":"/container"}],"spec":{"storageClassName":"ssd","storageSize":6144},"attachedObjects":[{"id":"example-service","type":"service"}]}`)
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
    "storageClassName": "ssd",
    "storageSize": 6144
  },
  "attachedObjects": [
    {
      "id": "example-service",
      "type": "service"
    }
  ]
}
```

#### Example Response

 Details about the newly created volume.

```json
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
```

### JavaScript client reference

#### Example request

Request body

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
      "storageClassName": "ssd",
      "storageSize": 6144
    },
    "attachedObjects": [
      {
        "id": "example-service",
        "type": "service"
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
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
