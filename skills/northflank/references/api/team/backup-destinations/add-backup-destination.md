# Add backup destination

Source: https://northflank.com/docs/v1/api/team/backup-destinations/add-backup-destination.md

Adds a new backup destination to this account.

Required permission: Account > BackupDestinations > General > Create

**Request body:**

{object}
- `name`: (string) (required) The name of the backup destination. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `type`: (string) (required) Type of the backup destination. (enum: s3)
- `prefix`: (string) (required) A prefix path to add to the bucket objects if not writing to / (pattern: ^([a-zA-Z0-9-_]+)\/$)
- `credentials`: {object}
  - `accessKey`: (string) (required)
  - `secretKey`: (string) (required)
  - `bucketName`: (string) (required)
  - `region`: (string) (required)
  - `endpoint`: (string) (required) S3 destination including region, fe s3.us-west-2.amazonaws.com

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the backup destination. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `type`: (string) (required) Type of the backup destination. (enum: s3)
  - `prefix`: (string) (required) A prefix path to add to the bucket objects if not writing to / (pattern: ^([a-zA-Z0-9-_]+)\/$)
  - `credentials`: {object}
    - `accessKey`: (string) (required)
    - `secretKey`: (string) (required)
    - `bucketName`: (string) (required)
    - `region`: (string) (required)
    - `endpoint`: (string) (required) S3 destination including region, fe s3.us-west-2.amazonaws.com
  - `id`: (string) (required) Identifier for the backup destination
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

POST /v1/backup-destinations

POST /v1/teams/{teamId}/backup-destinations

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Backup Destination"}' \
  https://api.northflank.com/v1/backup-destinations
```

```javascript
const payload = {
  "name": "Example Backup Destination"
}

const response = await fetch('https://api.northflank.com/v1/backup-destinations', {
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

url = "https://api.northflank.com/v1/backup-destinations"

payload = {"name":"Example Backup Destination"}
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
  url := "https://api.northflank.com/v1/backup-destinations"

  var jsonStr = []byte(`{"name":"Example Backup Destination"}`)
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

200 OK: Data about the newly created backup destination.

```json
{
  "data": {
    "name": "Example Backup Destination",
    "id": "example-backup-destination"
  }
}
```

### CLI reference

$ northflank add backup-destination

Options:

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

 Data about the newly created backup destination.

```json
{
  "name": "Example Backup Destination",
  "id": "example-backup-destination"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.add.backupDestination({
  data: {
    "name": "Example Backup Destination"
  }
});
```

#### Example Response

 Data about the newly created backup destination.

```json
{
  "data": {
    "name": "Example Backup Destination",
    "id": "example-backup-destination"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
