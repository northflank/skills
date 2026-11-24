# Rotate addon secrets

Source: https://northflank.com/docs/v1/api/project/addons/rotate-addon-secrets.md

Starts a secret rotation for the given addon. MySQL keeps usernames unchanged and defaults to user-facing passwords only; mode=full also rotates internal passwords and restarts the addon during rotation and finalisation. Both MySQL modes retain old passwords until finalised. RabbitMQ also defaults to user-facing, rotating account usernames and passwords only. RabbitMQ mode=full also rotates the Erlang cookie and pauses the entire addon, causing downtime and interrupted connections. The addon can remain paused if rotation fails. Both RabbitMQ modes keep old accounts valid until finalisation. Retries retain the saved rotation mode. New credentials are created with the same permissions; the old credentials remain valid until the rotation is finalised. Redis instead performs a full restart and completes in one step: old credentials are revoked and clients must reconnect with the new password. Redeploy linked services yourself. Redis without persistence is not supported. Redis Sentinel requires at least three replicas. MinIO also restarts all nodes and completes in one step: only the secret key changes, while the access key, users and access keys stay valid. Console sessions, temporary credentials and presigned URLs signed with the old secret key stop working. Restoring a backup taken before the rotation restores the old secret key.

Required permission: Project > Addons > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object}
- `mode`: (string) MySQL and RabbitMQ: defaults to user-facing. MySQL full rotation also changes internal passwords and restarts the addon during rotation and finalisation. RabbitMQ user-facing rotation changes account usernames and passwords only. RabbitMQ full rotation also changes the Erlang cookie and pauses the entire addon, causing downtime and interrupted connections. The addon can remain paused on failure. Both modes keep old account credentials valid until finalisation. RabbitMQ finalisation does not pause the addon again. (enum: user-facing, full)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.

### API reference

POST /v1/projects/{projectId}/addons/{addonId}/secret-rotation

POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/secret-rotation

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{}' \
  "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/secret-rotation"
```

```javascript
const payload = {}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/secret-rotation', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/secret-rotation"

payload = "{}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/secret-rotation"

  var jsonStr = []byte("{}")
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

$ northflank start addon secret-rotation

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{}
```

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.start.addon.secretRotation({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  data: {}
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.start.addon.secret_rotation(
    addon_id="example-addon",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
