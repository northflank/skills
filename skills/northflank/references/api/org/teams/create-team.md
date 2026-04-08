# Create team

Source: https://northflank.com/docs/v1/api/org/teams/create-team.md

Creates a new team belonging to the authenticated org.

Required permission: Organisation > Team > General > Create

**Request body:**

{object}
- `name`: (string) (required) The name of the team. (pattern: ^[a-zA-Z](('[a-zA-Z])?(-|\s)?[a-zA-Z0-9]+(('[a-zA-Z])?(-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 45)
- `description`: (string) A description of the team. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `email`: (string) (required) The billing email address for the team. (pattern: ^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the team. (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) Display name of the team.
  - `description`: (string) Description of the team.
  - `createdAt`: (string) (required) The time the team was created. (format: date-time)
  - `updatedAt`: (string) The time the team was last updated. (format: date-time)

### API reference

POST /v1/teams

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"My Team","description":"This is my team.","email":"billing@example.com"}' \
  https://api.northflank.com/v1/teams
```

```javascript
const payload = {
  "name": "My Team",
  "description": "This is my team.",
  "email": "billing@example.com"
}

const response = await fetch('https://api.northflank.com/v1/teams', {
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

url = "https://api.northflank.com/v1/teams"

payload = {"name":"My Team","description":"This is my team.","email":"billing@example.com"}
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
  url := "https://api.northflank.com/v1/teams"

  var jsonStr = []byte(`{"name":"My Team","description":"This is my team.","email":"billing@example.com"}`)
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

200 OK: Details about the newly created team.

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

$ northflank create team

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "My Team",
  "description": "This is my team.",
  "email": "billing@example.com"
}
```

#### Example Response

 Details about the newly created team.

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
await apiClient.create.team({
  data: {
    "name": "My Team",
    "description": "This is my team.",
    "email": "billing@example.com"
  }
});
```

#### Example Response

 Details about the newly created team.

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
