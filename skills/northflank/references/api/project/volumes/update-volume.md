# Update volume

Source: https://northflank.com/docs/v1/api/project/volumes/update-volume.md

Update volume mounts and storage size

Required permission: Project > Volumes > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume

**Request body:**

{object}
- `mounts`: [array of] {object}
   - `volumeMountPath`: (string) Optionally specify the path inside this volume that should be mounted (pattern: ^((?!\.\.).)*$)
   - `containerMountPath`: (string) (required) Specify the path into which the volume should be mounted (pattern: ^((?!:).)*$)
- `spec`: {object}
  - `storageSize`: (integer) The size of the storage, in megabytes. Configurable sizes depend on the storage class.
- `backupSchedules`: [array of] {object}
   - `scheduling`: {object}
     - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
     - `minute`: [array of] (integer) A minute when the backup should be performed.
     - `hour`: [array of] (integer) An hour when the backup should be performed, in 24 hour format.
     - `day`: [array of] (integer) A day of the week when the backup should be performed, where `0` represents Monday and `6` represents Sunday.
   - `retentionTime`: (integer) (required) The time the backup is retained for, in days.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/volumes/{volumeId}

POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"mounts":[{"volumeMountPath":"","containerMountPath":"/container"}],"spec":{"storageSize":6144},"backupSchedules":[{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"retentionTime":7}]}' \
  https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}
```

```javascript
const payload = {
  "mounts": [
    {
      "volumeMountPath": "",
      "containerMountPath": "/container"
    }
  ],
  "spec": {
    "storageSize": 6144
  },
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

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}"

payload = {"mounts":[{"volumeMountPath":"","containerMountPath":"/container"}],"spec":{"storageSize":6144},"backupSchedules":[{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"retentionTime":7}]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}"

  var jsonStr = []byte(`{"mounts":[{"volumeMountPath":"","containerMountPath":"/container"}],"spec":{"storageSize":6144},"backupSchedules":[{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"retentionTime":7}]}`)
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

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank update volume

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "mounts": [
    {
      "volumeMountPath": "",
      "containerMountPath": "/container"
    }
  ],
  "spec": {
    "storageSize": 6144
  },
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

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.volume({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume"
  },
  data: {
    "mounts": [
      {
        "volumeMountPath": "",
        "containerMountPath": "/container"
      }
    ],
    "spec": {
      "storageSize": 6144
    },
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

 The operation was performed successfully.

```json
{
  "data": {},
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
