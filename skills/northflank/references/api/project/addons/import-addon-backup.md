# Import addon backup

Source: https://northflank.com/docs/v1/api/project/addons/import-addon-backup.md

Imports a database from an external archive or existing live database.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object} Import using a connection string. The database will be imported from the live database located at the connection string's location.
- `name`: (string) The name of the backup. If not provided, a default name will be generated containing the current date. (pattern: ^[a-zA-Z0-9]+((-|\s|\/|:)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 39)
- `connectionString`: (string) (required) A database connection string.
- `importAllDatabases`: (boolean) Detect and import all databases. If false, attempts to import only the database specified in the connection string
- `compressionType`: (string) The compression algorithm for storing the imported file. Defaults to `gz`. (enum: gz, zstd)
- `customDestinationId`: (string) Custom destination to store the imported backup in. If not specified, backup is stored in Northflank-managed destination. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

OR

{object} Import using an external archive. The database will be imported from an existing backup.
- `name`: (string) The name of the backup. If not provided, a default name will be generated containing the current date. (pattern: ^[a-zA-Z0-9]+((-|\s|\/|:)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 39)
- `importUrl`: (string) (required) A url pointing to an existing backup stored as a GNU zip (.gz) file.
- `customDestinationId`: (string) Custom destination to store the imported backup in. If not specified, backup is stored in Northflank-managed destination. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/import

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/import

#### Example request

Request body

live

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Backup","connectionString":"mongodb://mongodb0.example.com:27017"}' \
  "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"
```

```javascript
const payload = {
  "name": "Example Backup",
  "connectionString": "mongodb://mongodb0.example.com:27017"
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

payload = "{\"name\":\"Example Backup\",\"connectionString\":\"mongodb://mongodb0.example.com:27017\"}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"

  var jsonStr = []byte("{\"name\":\"Example Backup\",\"connectionString\":\"mongodb://mongodb0.example.com:27017\"}")
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

url

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Backup","importUrl":"https://example.com/backup.db.gz"}' \
  "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"
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

payload = "{\"name\":\"Example Backup\",\"importUrl\":\"https://example.com/backup.db.gz\"}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/import"

  var jsonStr = []byte("{\"name\":\"Example Backup\",\"importUrl\":\"https://example.com/backup.db.gz\"}")
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

live

```json
{
  "name": "Example Backup",
  "connectionString": "mongodb://mongodb0.example.com:27017"
}
```

OR

url

```json
{
  "name": "Example Backup",
  "importUrl": "https://example.com/backup.db.gz"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

live

```javascript
await apiClient.import.addon.backup({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {
    "name": "Example Backup",
    "connectionString": "mongodb://mongodb0.example.com:27017"
  }
});
```

OR

url

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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

live

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.import_.addon.backup(
    addon_id="example-addon",
    project_id="default-project",
    data={
        "name": "Example Backup",
        "connectionString": "mongodb://mongodb0.example.com:27017",
    },
)
print(response.data)
```

OR

url

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.import_.addon.backup(
    addon_id="example-addon",
    project_id="default-project",
    data={
        "name": "Example Backup",
        "importUrl": "https://example.com/backup.db.gz",
    },
)
print(response.data)
```
