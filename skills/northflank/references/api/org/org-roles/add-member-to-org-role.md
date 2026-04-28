# Add member to org role

Source: https://northflank.com/docs/v1/api/org/org-roles/add-member-to-org-role.md

Adds a user to a platform role in the authenticated org.

Required permission: Organisation > Admin > Roles > Manage

**Path parameters:**

{object}
- `roleId`: (string) (required) ID of the org role

**Request body:**

{object}
- `userId`: (string) (required) ID of the user to add to this role. (pattern: ^[A-Za-z0-9-]+$)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/org-roles/{roleId}/members

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"userId":"john-doe"}' \
  https://api.northflank.com/v1/org-roles/{roleId}/members
```

```javascript
const payload = {
  "userId": "john-doe"
}

const response = await fetch('https://api.northflank.com/v1/org-roles/{roleId}/members', {
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

url = "https://api.northflank.com/v1/org-roles/{roleId}/members"

payload = {"userId":"john-doe"}
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
  url := "https://api.northflank.com/v1/org-roles/{roleId}/members"

  var jsonStr = []byte(`{"userId":"john-doe"}`)
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

$ northflank create org-role-member

Options:

- `--roleId <roleId>`: ID of the org role

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "userId": "john-doe"
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
await apiClient.create.orgRoleMember({
  parameters: {
    "roleId": "developer"
  },
  data: {
    "userId": "john-doe"
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
