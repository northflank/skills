# Upgrade addon version

Source: https://northflank.com/docs/v1/api/project/addons/upgrade-addon-version.md

Upgrades the addon to a new version.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object}
- `version`: (string) (required) The version to upgrade the addon to.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/version

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/version

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"version":"4.2.15"}' \
  https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/version
```

```javascript
const payload = {
  "version": "4.2.15"
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/version', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/version"

payload = {"version":"4.2.15"}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/version"

  var jsonStr = []byte(`{"version":"4.2.15"}`)
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

$ northflank update addon version

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
  "version": "4.2.15"
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
await apiClient.update.addon.version({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {
    "version": "4.2.15"
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
