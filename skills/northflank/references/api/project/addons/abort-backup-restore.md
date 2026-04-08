# Abort backup restore

Source: https://northflank.com/docs/v1/api/project/addons/abort-backup-restore.md

Aborts an in-progress backup restore.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `backupId`: (string) (required) ID of the backup

**Query parameters:**

{object}
- `sourceProjectId`: (string) Specify the source projectId when referring to a global backup.
- `sourceAddonId`: (string) Specify the source addonId when referring to a global backup.

**Request body:**

{object}
- `restoreId`: (string) (required) ID of the restore to abort.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restoreId":"66845073ce75649ad18635f0"}' \
  https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore
```

```javascript
const payload = {
  "restoreId": "66845073ce75649ad18635f0"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore"

payload = {"restoreId":"66845073ce75649ad18635f0"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore"

  var jsonStr = []byte(`{"restoreId":"66845073ce75649ad18635f0"}`)
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

$ northflank abort addon restore

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--backupId <backupId>`: ID of the backup

- `--sourceProjectId <sourceProjectId>`: Specify the source projectId when referring to a global backup.

- `--sourceAddonId <sourceAddonId>`: Specify the source addonId when referring to a global backup.

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "restoreId": "66845073ce75649ad18635f0"
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
await apiClient.abort.addon.restore({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "backupId": "example-backup"
  },
  options: {},
  data: {
    "restoreId": "66845073ce75649ad18635f0"
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
