# Create org role

Source: https://northflank.com/docs/v1/api/org/org-roles/create-org-role.md

Creates a new platform role for the authenticated org.

Required permission: Organisation > Admin > Roles > Manage

**Request body:**

{object}
- `name`: (string) (required) The name of the role.
- `description`: (string) A description of the role. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `permissions`: {object}
  - `teamScope`: [array of] (string)
  - `projectScope`: [array of] (string)
  - `orgScope`: [array of] (string)
- `restrictions`: {object}
  - `enabled`: (boolean) (required)
  - `teams`: [array of] {object}
     - `teamId`: (string) (required) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
     - `restrictions`: {object}
       - `enabled`: (boolean) (required)
       - `projects`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
       - `restrictionMode`: (string) (enum: in, notIn)
- `directoryGroups`: [array of] (string) The ID of the linked directory group.

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the role. (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) Display name of the role.
  - `description`: (string) Description of the role.
  - `restrictions`: {object}
    - `enabled`: (boolean) (required)
    - `teams`: [array of] {object}
        - `teamId`: (string) (required) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
        - `restrictions`: {object}
          - `enabled`: (boolean) (required)
          - `projects`: [array of] (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
          - `restrictionMode`: (string) (enum: in, notIn)
  - `directoryGroups`: [array of] (string) The ID of the linked directory group.
  - `createdAt`: (string) Creation time. (format: date-time)
  - `updatedAt`: (string) Last updated. (format: date-time)
  - `permissions`: {object}
    - `teamScope`: [array of] (string)
    - `projectScope`: [array of] (string)
    - `orgScope`: [array of] (string)

### API reference

POST /v1/org-roles

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Developer","description":"Role for developers."}' \
  https://api.northflank.com/v1/org-roles
```

```javascript
const payload = {
  "name": "Developer",
  "description": "Role for developers."
}

const response = await fetch('https://api.northflank.com/v1/org-roles', {
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

url = "https://api.northflank.com/v1/org-roles"

payload = {"name":"Developer","description":"Role for developers."}
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
  url := "https://api.northflank.com/v1/org-roles"

  var jsonStr = []byte(`{"name":"Developer","description":"Role for developers."}`)
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

200 OK: Details about the newly created org role.

```json
{
  "data": {
    "id": "developer",
    "name": "Developer",
    "description": "Role for developers.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  }
}
```

### CLI reference

$ northflank create org-role

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Developer",
  "description": "Role for developers."
}
```

#### Example Response

 Details about the newly created org role.

```json
{
  "id": "developer",
  "name": "Developer",
  "description": "Role for developers.",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.orgRole({
  data: {
    "name": "Developer",
    "description": "Role for developers."
  }
});
```

#### Example Response

 Details about the newly created org role.

```json
{
  "data": {
    "id": "developer",
    "name": "Developer",
    "description": "Role for developers.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
