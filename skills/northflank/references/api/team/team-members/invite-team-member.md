# Invite team member

Source: https://northflank.com/docs/v1/api/team/team-members/invite-team-member.md

Invites a user to a team.

Required permission: Account > Admin > Members > Manage

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team

**Request body:**

{object}
- `email`: (string) (required) Email of the user to invite. (pattern: ^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)
- `roles`: [array of] (string) (pattern: ^[A-Za-z0-9-]+$)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/teams/{teamId}/members

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"email":"user@example.com"}' \
  https://api.northflank.com/v1/teams/{teamId}/members
```

```javascript
const payload = {
  "email": "user@example.com"
}

const response = await fetch('https://api.northflank.com/v1/teams/{teamId}/members', {
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

url = "https://api.northflank.com/v1/teams/{teamId}/members"

payload = {"email":"user@example.com"}
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
  url := "https://api.northflank.com/v1/teams/{teamId}/members"

  var jsonStr = []byte(`{"email":"user@example.com"}`)
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

$ northflank create team-member-invite

Options:

- `--teamId <teamId>`: ID of the team

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "email": "user@example.com"
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
await apiClient.create.teamMemberInvite({
  parameters: {
    "teamId": "my-team"
  },
  data: {
    "email": "user@example.com"
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
