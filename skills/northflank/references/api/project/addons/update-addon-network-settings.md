# Update addon network settings

Source: https://northflank.com/docs/v1/api/project/addons/update-addon-network-settings.md

Updates the network settings for the addon.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object}
- `tlsEnabled`: (boolean) If `true`, a TLS certificate will be provisioned for the addon.
- `externalAccessEnabled`: (boolean) If `true`, the addon will be given a public URL and will be accessible from the internet. `tlsEnabled` must be `true` to set this as `true`.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/network-settings

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/network-settings

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"tlsEnabled":true,"externalAccessEnabled":true}' \
  https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/network-settings
```

```javascript
const payload = {
  "tlsEnabled": true,
  "externalAccessEnabled": true
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/network-settings', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/network-settings"

payload = {"tlsEnabled":true,"externalAccessEnabled":true}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/network-settings"

  var jsonStr = []byte(`{"tlsEnabled":true,"externalAccessEnabled":true}`)
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

$ northflank update addon network-settings

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
  "tlsEnabled": true,
  "externalAccessEnabled": true
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
await apiClient.update.addon.networkSettings({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {
    "tlsEnabled": true,
    "externalAccessEnabled": true
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
