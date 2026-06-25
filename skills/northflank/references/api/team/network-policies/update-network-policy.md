# Update network policy

Source: https://northflank.com/docs/v1/api/team/network-policies/update-network-policy.md

Updates an existing network policy.

Required permission: Account > Networking > NetworkPolicies > Update

**Path parameters:**

{object}
- `networkPolicyId`: (string) (required) ID of the network policy

**Request body:**

{object}
- `name`: (string) The name of the network policy. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The description of the network policy. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `spec`: {object}
  - `restrictions`: {object}
    - `projects`: {object}
      - `enabled`: (boolean) (required)
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `restrictionMode`: (string) (enum: in, notIn)
    - `tags`: {object}
      - `enabled`: (boolean) (required)
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `matchCondition`: (string) (required) (enum: or, and)
  - `egress`: {object}
    - `denyAll`: (boolean)
    - `allowTo`: [array of] (string) (min length: 1)
    - `allowToTags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `allowToProjects`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `ingress`: {object}
    - `denyAll`: (boolean)
    - `allowFromTags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `allowFromProjects`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

### API reference

PATCH /v1/network-policies/{networkPolicyId}

PATCH /v1/teams/{teamId}/network-policies/{networkPolicyId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"name":"restrict-api-ingress","description":"Restrict ingress to the api service."}' \
  https://api.northflank.com/v1/network-policies/{networkPolicyId}
```

```javascript
const payload = {
  "name": "restrict-api-ingress",
  "description": "Restrict ingress to the api service."
}

const response = await fetch('https://api.northflank.com/v1/network-policies/{networkPolicyId}', {
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

url = "https://api.northflank.com/v1/network-policies/{networkPolicyId}"

payload = {"name":"restrict-api-ingress","description":"Restrict ingress to the api service."}
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
  url := "https://api.northflank.com/v1/network-policies/{networkPolicyId}"

  var jsonStr = []byte(`{"name":"restrict-api-ingress","description":"Restrict ingress to the api service."}`)
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

200 OK: success

### CLI reference

$ northflank patch network-policy

Options:

- `--networkPolicyId <networkPolicyId>`: ID of the network policy

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "restrict-api-ingress",
  "description": "Restrict ingress to the api service."
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.patch.networkPolicy({
  parameters: {
    "networkPolicyId": "my-network-policy"
  },
  data: {
    "name": "restrict-api-ingress",
    "description": "Restrict ingress to the api service."
  }
});
```
