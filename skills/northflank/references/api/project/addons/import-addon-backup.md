# Import addon backup

Source: https://northflank.com/docs/v1/api/project/addons/import-addon-backup.md

Imports a database from an external archive or existing live database.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object}
- `name`: (string) The name of the backup. If not provided, a default name will be generated containing the current date. (pattern: ^[a-zA-Z0-9]+((-|\s|\/|:)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 39)
- `connectionString`: (string) (required) A database connection string.
- `importAllDatabases`: (boolean) Detect and import all databases. If false, attempts to import only the database specified in the connection string
- `compressionType`: (string) The compression algorithm for storing the imported file. Defaults to `gz`. (enum: gz, zstd)
- `customDestinationId`: (string) Custom destination to store the imported backup in. If not specified, backup is stored in Northflank-managed destination. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

OR

{object}
- `name`: (string) The name of the backup. If not provided, a default name will be generated containing the current date. (pattern: ^[a-zA-Z0-9]+((-|\s|\/|:)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 39)
- `importUrl`: (string) (required) A url pointing to an existing backup stored as a GNU zip (.gz) file.
- `customDestinationId`: (string) Custom destination to store the imported backup in. If not specified, backup is stored in Northflank-managed destination. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/import

#### Example request

Request body

Import using a connection string. The database will be imported from the live database located at the connection string's location.

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Backup","connectionString":"mongodb://mongodb0.example.com:27017","compressionType":"gz"}' \
  https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import
```

```javascript
const payload = {
  "name": "Example Backup",
  "connectionString": "mongodb://mongodb0.example.com:27017",
  "compressionType": "gz"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"

payload = {"name":"Example Backup","connectionString":"mongodb://mongodb0.example.com:27017","compressionType":"gz"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"

  var jsonStr = []byte(`{"name":"Example Backup","connectionString":"mongodb://mongodb0.example.com:27017","compressionType":"gz"}`)
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

OR

Import using an external archive. The database will be imported from an existing backup.

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Backup","importUrl":"https://example.com/backup.db.gz"}' \
  https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import
```

```javascript
const payload = {
  "name": "Example Backup",
  "importUrl": "https://example.com/backup.db.gz"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"

payload = {"name":"Example Backup","importUrl":"https://example.com/backup.db.gz"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"

  var jsonStr = []byte(`{"name":"Example Backup","importUrl":"https://example.com/backup.db.gz"}`)
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

200 OK: success

### CLI reference

$ northflank import addon backup

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

Import using a connection string. The database will be imported from the live database located at the connection string's location.

```json
{
  "name": "Example Backup",
  "connectionString": "mongodb://mongodb0.example.com:27017",
  "compressionType": "gz"
}
```

OR

Import using an external archive. The database will be imported from an existing backup.

```json
{
  "name": "Example Backup",
  "importUrl": "https://example.com/backup.db.gz"
}
```

### JavaScript client reference

#### Example request

Request body

Import using a connection string. The database will be imported from the live database located at the connection string's location.

```javascript
await apiClient.import.addon.backup({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {
    "name": "Example Backup",
    "connectionString": "mongodb://mongodb0.example.com:27017",
    "compressionType": "gz"
  }
});
```

OR

Import using an external archive. The database will be imported from an existing backup.

```javascript
await apiClient.import.addon.backup({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {
    "name": "Example Backup",
    "importUrl": "https://example.com/backup.db.gz"
  }
});
```
