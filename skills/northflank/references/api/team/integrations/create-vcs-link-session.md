# Create VCS link session

Source: https://northflank.com/docs/v1/api/team/integrations/create-vcs-link-session.md

Starts a CLI-driven flow to link a version control account. Returns a URL to open in a browser to authorize the link, and a session id to poll for completion.

Required permission: Account > Git > General > Manage

**Request body:**

{object}
- `vcsService`: (string) Version control provider to link. Supported values are `github`, `gitlab`, and feature-gated `origin`. Defaults to `github`. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the link session, used to poll for completion.
  - `authorizeUrl`: (string) (required) URL to open in a browser to authorize the version control link. Carries only a one-time link code — never the API token.

### API reference

POST /v1/integrations/vcs/link-sessions

POST /v1/teams/{teamId}/integrations/vcs/link-sessions

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"vcsService":"github"}' \
  https://api.northflank.com/v1/integrations/vcs/link-sessions
```

```javascript
const payload = {
  "vcsService": "github"
}

const response = await fetch('https://api.northflank.com/v1/integrations/vcs/link-sessions', {
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

url = "https://api.northflank.com/v1/integrations/vcs/link-sessions"

payload = {"vcsService":"github"}
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
  url := "https://api.northflank.com/v1/integrations/vcs/link-sessions"

  var jsonStr = []byte(`{"vcsService":"github"}`)
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

200 OK: The link session id and browser authorize URL.

```json
{
  "data": {
    "id": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "authorizeUrl": "https://app.northflank.com/api/integrations/git/state-bridge?linkCode=..."
  }
}
```

### CLI reference

Looks like you aren‘t able to do that through the CLI yet.

### JavaScript client reference

Looks like you aren‘t able to do that through the JavaScript client yet.
