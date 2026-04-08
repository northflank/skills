# Update team

Source: https://northflank.com/docs/v1/api/org/teams/update-team.md

Updates the description of a team belonging to the authenticated org.

Required permission: Organisation > Team > General > Update

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team

**Request body:**

{object}
- `description`: (string) A description of the team. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the team. (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) Display name of the team.
  - `description`: (string) Description of the team.
  - `createdAt`: (string) (required) The time the team was created. (format: date-time)
  - `updatedAt`: (string) The time the team was last updated. (format: date-time)

### API reference

PATCH /v1/teams/{teamId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"description":"This is my team."}' \
  https://api.northflank.com/v1/teams/{teamId}
```

```javascript
const payload = {
  "description": "This is my team."
}

const response = await fetch('https://api.northflank.com/v1/teams/{teamId}', {
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

url = "https://api.northflank.com/v1/teams/{teamId}"

payload = {"description":"This is my team."}
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
  url := "https://api.northflank.com/v1/teams/{teamId}"

  var jsonStr = []byte(`{"description":"This is my team."}`)
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

200 OK: Details about the updated team.

```json
{
  "data": {
    "id": "my-team",
    "name": "My Team",
    "description": "This is my team.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  }
}
```

### CLI reference

$ northflank patch team

Options:

- `--teamId <teamId>`: ID of the team

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "description": "This is my team."
}
```

#### Example Response

 Details about the updated team.

```json
{
  "id": "my-team",
  "name": "My Team",
  "description": "This is my team.",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.patch.team({
  parameters: {
    "teamId": "my-team"
  },
  data: {
    "description": "This is my team."
  }
});
```

#### Example Response

 Details about the updated team.

```json
{
  "data": {
    "id": "my-team",
    "name": "My Team",
    "description": "This is my team.",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
