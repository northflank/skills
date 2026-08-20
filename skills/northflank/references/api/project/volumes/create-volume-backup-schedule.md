# Create volume backup schedule

Source: https://northflank.com/docs/v1/api/project/volumes/create-volume-backup-schedule.md

Create a new snapshot backup schedule for a volume.

Required permission: Project > Volumes > Backups > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume

**Request body:**

{object}
- `scheduling`: {object}
  - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
  - `minute`: [array of] (integer) A minute when the backup should be performed.
  - `hour`: [array of] (integer) An hour when the backup should be performed, in 24 hour format.
  - `day`: [array of] (integer) A day of the week when the backup should be performed, where `0` represents Monday and `6` represents Sunday.
- `retentionTime`: (integer) (required) The time the backup is retained for, in days.

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the schedule.

### API reference

POST /v1/projects/{projectId}/volumes/{volumeId}/backup-schedules

POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backup-schedules

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"retentionTime":7}' \
  https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backup-schedules
```

```javascript
const payload = {
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

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backup-schedules', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backup-schedules"

payload = {"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"retentionTime":7}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backup-schedules"

  var jsonStr = []byte(`{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"retentionTime":7}`)
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

200 OK: Details about the created backup schedule.

```json
{
  "data": {
    "id": "62cc20b90956ab62a58e8474"
  }
}
```

### CLI reference

$ northflank create volume backup-schedule

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
```

#### Example Response

 Details about the created backup schedule.

```json
{
  "id": "62cc20b90956ab62a58e8474"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.volume.backupSchedule({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume"
  },
  data: {
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
});
```

#### Example Response

 Details about the created backup schedule.

```json
{
  "data": {
    "id": "62cc20b90956ab62a58e8474"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
