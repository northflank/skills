# Check repository access

Source: https://northflank.com/docs/v1/api/team/integrations/check-repository-access.md

Checks whether a git repository is publicly reachable or accessible via one of your linked version control accounts, before creating a resource that would clone it.

Required permission: Account > Git > General > Read

**Request body:**

{object}
- `projectUrl`: (string) (required) HTTPS URL of the git repository to check access for.
- `projectType`: (string) (required) The version control provider the repository belongs to. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
- `projectBranch`: (string) Optional branch to check.
- `vcsLinkId`: (string) If provided, only checks access via this specific linked account. (min length: 24) (max length: 24)
- `accountLogin`: (string) If provided, only checks access via the linked account with this login.
- `selfHostedVcsId`: (string) If `projectType` is `self-hosted`, the ID of the self-hosted VCS provider.

**Response body:**

{object}
- `data`: {object}
  - `publicRepo`: (boolean) (required) Whether the repository is publicly reachable without a linked account.
  - `accessible`: (boolean) (required) Whether the repository can be accessed — publicly or via a linked account.
  - `vcsLinkId`: (string) The linked account that can access the repository. Present when `reason` is `linked-account`.
  - `accountLogin`: (string) Login of the linked account that can access the repository. Present when `reason` is `linked-account`.
  - `reason`: (string) (required) Why the repository is (in)accessible: `public` (reachable anonymously), `linked-account` (a linked account can access it), `no-linked-access` (no linked account can access it), or `not-found` (the repository URL does not resolve). (enum: public, linked-account, no-linked-access, not-found)

### API reference

POST /v1/integrations/vcs/repo-access

POST /v1/teams/{teamId}/integrations/vcs/repo-access

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"projectUrl":"https://github.com/northflank-examples/next-js-example","projectType":"github","projectBranch":"main","accountLogin":"example-user"}' \
  https://api.northflank.com/v1/integrations/vcs/repo-access
```

```javascript
const payload = {
  "projectUrl": "https://github.com/northflank-examples/next-js-example",
  "projectType": "github",
  "projectBranch": "main",
  "accountLogin": "example-user"
}

const response = await fetch('https://api.northflank.com/v1/integrations/vcs/repo-access', {
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

url = "https://api.northflank.com/v1/integrations/vcs/repo-access"

payload = {"projectUrl":"https://github.com/northflank-examples/next-js-example","projectType":"github","projectBranch":"main","accountLogin":"example-user"}
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
  url := "https://api.northflank.com/v1/integrations/vcs/repo-access"

  var jsonStr = []byte(`{"projectUrl":"https://github.com/northflank-examples/next-js-example","projectType":"github","projectBranch":"main","accountLogin":"example-user"}`)
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

200 OK: The access status of the repository.

```json
{
  "data": {
    "publicRepo": false,
    "accessible": true,
    "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
    "accountLogin": "example-user",
    "reason": "linked-account"
  }
}
```

### CLI reference

Looks like you aren‘t able to do that through the CLI yet.

### JavaScript client reference

Looks like you aren‘t able to do that through the JavaScript client yet.
