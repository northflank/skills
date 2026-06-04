# Backup addon

Source: https://northflank.com/docs/v1/api/project/addons/backup-addon.md

Initiates a backup for the given addon

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object}
- `name`: (string) The name of the backup. If not provided, a default name will be generated containing the current date. (pattern: ^[a-zA-Z0-9]+((-|\s|\/|:)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 39)
- `backupType`: (string) The type of backup to perform. Defaults to `snapshot`. (enum: dump, snapshot)
- `compressionType`: (string) The compression algorithm of the backup. Only applicable for dump backups. Defaults to `gz`. (enum: gz, zstd)
- `customDestinationId`: (string) Custom destination to store the backup in. Only applicable for dump backups. If not specified, backup is stored in Northflank-managed destination. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `additionalDestinations`: [array of] {object}
   - `destinationId`: (string) (required) Additional custom back up destination that should be used to store the snapshot. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `retentionTime`: (integer) Retention time of the additional back up in days.
   - `type`: (string) (required) The type of backup destination to use (enum: custom)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) The identifier for the backup.
  - `name`: (string) (required) The name of the backup.
  - `uid`: (string) (required) The unique id of the backup.
  - `status`: (string) (required) The current status of the backup. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
  - `createdAt`: (string) (required) The time the backup was initiated.
  - `completedAt`: (string) The time the backup was completed.
  - `config`: {object}
    - `source`: {object}
      - `type`: (string) The type of backup. (enum: fileUpload, liveInstance, snapshot, externalDump, sameAddon)
    - `size`: (string) (required) The size of the backup, in bytes
    - `addonVersion`: (string) The version of the addon at the time of the backup. If the backup type is `snapshot`, the addon will be restored to this version when the backup is restored.
  - `lastRestore`: {object}
    - `restoreTimestamp`: (string) (required) The time the backup was initiated. (format: date-time)
    - `status`: (string) (required) The current status of the restore. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
    - `completedAt`: (string) The time the restore was completed. (format: date-time)

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/backups

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Backup","backupType":"snapshot","compressionType":"gz","additionalDestinations":[{"destinationId":"example-backup-destination","retentionTime":7,"type":"custom"}]}' \
  https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups
```

```javascript
const payload = {
  "name": "Example Backup",
  "backupType": "snapshot",
  "compressionType": "gz",
  "additionalDestinations": [
    {
      "destinationId": "example-backup-destination",
      "retentionTime": 7,
      "type": "custom"
    }
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups"

payload = {"name":"Example Backup","backupType":"snapshot","compressionType":"gz","additionalDestinations":[{"destinationId":"example-backup-destination","retentionTime":7,"type":"custom"}]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups"

  var jsonStr = []byte(`{"name":"Example Backup","backupType":"snapshot","compressionType":"gz","additionalDestinations":[{"destinationId":"example-backup-destination","retentionTime":7,"type":"custom"}]}`)
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

200 OK: Details about the newly created backup.

```json
{
  "data": {
    "id": "example-backup",
    "name": "Example Backup",
    "uid": "88283b31-06f3-4857-b75f-f807bd7a52af",
    "status": "completed",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "completedAt": "2021-01-20T11:19:54.494Z",
    "config": {
      "source": {
        "type": "snapshot"
      },
      "size": "1234",
      "addonVersion": "4.4.8"
    },
    "lastRestore": {
      "restoreTimestamp": "2021-01-20T11:19:54.494Z",
      "status": "completed",
      "completedAt": "2021-01-20T11:19:54.494Z"
    }
  }
}
```

### CLI reference

$ northflank backup addon

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Backup",
  "backupType": "snapshot",
  "compressionType": "gz",
  "additionalDestinations": [
    {
      "destinationId": "example-backup-destination",
      "retentionTime": 7,
      "type": "custom"
    }
  ]
}
```

#### Example Response

 Details about the newly created backup.

```json
{
  "id": "example-backup",
  "name": "Example Backup",
  "uid": "88283b31-06f3-4857-b75f-f807bd7a52af",
  "status": "completed",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "completedAt": "2021-01-20T11:19:54.494Z",
  "config": {
    "source": {
      "type": "snapshot"
    },
    "size": "1234",
    "addonVersion": "4.4.8"
  },
  "lastRestore": {
    "restoreTimestamp": "2021-01-20T11:19:54.494Z",
    "status": "completed",
    "completedAt": "2021-01-20T11:19:54.494Z"
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.backup.addon({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {
    "name": "Example Backup",
    "backupType": "snapshot",
    "compressionType": "gz",
    "additionalDestinations": [
      {
        "destinationId": "example-backup-destination",
        "retentionTime": 7,
        "type": "custom"
      }
    ]
  }
});
```

#### Example Response

 Details about the newly created backup.

```json
{
  "data": {
    "id": "example-backup",
    "name": "Example Backup",
    "uid": "88283b31-06f3-4857-b75f-f807bd7a52af",
    "status": "completed",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "completedAt": "2021-01-20T11:19:54.494Z",
    "config": {
      "source": {
        "type": "snapshot"
      },
      "size": "1234",
      "addonVersion": "4.4.8"
    },
    "lastRestore": {
      "restoreTimestamp": "2021-01-20T11:19:54.494Z",
      "status": "completed",
      "completedAt": "2021-01-20T11:19:54.494Z"
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
