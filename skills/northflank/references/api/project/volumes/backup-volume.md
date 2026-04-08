# Backup volume

Source: https://northflank.com/docs/v1/api/project/volumes/backup-volume.md

Initiates a backup for a given volume

Required permission: Project > Volumes > Backups > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume

**Request body:**

{object}
- `name`: (string) (required) The name of the backup. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The description for the backup. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)

**Response body:**

{object}
- `data`: {object}
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

### API reference

POST /v1/projects/{projectId}/volumes/{volumeId}/backups

POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Backup","description":"Example backup description"}' \
  https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backups
```

```javascript
const payload = {
  "name": "Example Backup",
  "description": "Example backup description"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backups', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backups"

payload = {"name":"Example Backup","description":"Example backup description"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/volumes/{volumeId}/backups"

  var jsonStr = []byte(`{"name":"Example Backup","description":"Example backup description"}`)
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

200 OK: Details about the created volume backup.

```json
{
  "data": {
    "id": "example-backup"
  }
}
```

### CLI reference

$ northflank backup volume

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
  "name": "Example Backup",
  "description": "Example backup description"
}
```

#### Example Response

 Details about the created volume backup.

```json
{
  "id": "example-backup"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.backup.volume({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume"
  },
  data: {
    "name": "Example Backup",
    "description": "Example backup description"
  }
});
```

#### Example Response

 Details about the created volume backup.

```json
{
  "data": {
    "id": "example-backup"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
