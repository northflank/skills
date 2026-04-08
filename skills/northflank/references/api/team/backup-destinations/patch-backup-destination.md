# Patch backup destination

Source: https://northflank.com/docs/v1/api/team/backup-destinations/patch-backup-destination.md

Updates a backup destination.

Required permission: Account > BackupDestinations > General > Update

**Path parameters:**

{object}
- `backupDestinationId`: (string) (required) ID of the backup destination

**Request body:**

{object}
- `name`: (string) The name of the backup destination. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `credentials`: {object}
  - `accessKey`: (string) (required)
  - `secretKey`: (string) (required)
  - `bucketName`: (string) (required)
  - `region`: (string) (required)
  - `endpoint`: (string) (required) S3 destination including region, fe s3.us-west-2.amazonaws.com

**Response body:**

{object}
- `data`: {object}

### API reference

PATCH /v1/backup-destinations/{backupDestinationId}

PATCH /v1/teams/{teamId}/backup-destinations/{backupDestinationId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"name":"Example Backup Destination"}' \
  https://api.northflank.com/v1/backup-destinations/{backupDestinationId}
```

```javascript
const payload = {
  "name": "Example Backup Destination"
}

const response = await fetch('https://api.northflank.com/v1/backup-destinations/{backupDestinationId}', {
  method: 'PATCH',
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

url = "https://api.northflank.com/v1/backup-destinations/{backupDestinationId}"

payload = {"name":"Example Backup Destination"}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PATCH", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/backup-destinations/{backupDestinationId}"

  var jsonStr = []byte(`{"name":"Example Backup Destination"}`)
  req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonStr))
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

$ northflank patch backup-destination

Options:

- `--backupDestinationId <backupDestinationId>`: ID of the backup destination

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Backup Destination"
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
await apiClient.patch.backupDestination({
  parameters: {
    "backupDestinationId": "example-destination"
  },
  data: {
    "name": "Example Backup Destination"
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
