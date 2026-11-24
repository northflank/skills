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
      - `enabled`: (boolean)
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `restrictionMode`: (string) (enum: in, notIn)
    - `tags`: {object}
      - `enabled`: (boolean)
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `matchCondition`: (string) (enum: or, and)
  - `egress`: {object}
    - `denyAll`: (boolean)
    - `allowTo`: (multiple options) External destinations that egress traffic is allowed to: IP addresses, CIDR ranges, or hostnames. A hostname allows TCP port 443, a single TCP port with `hostname:port`, or all TCP ports with `hostname:*`. [array of] (nullable) Must be empty or null, as destinations cannot be assigned when all traffic is denied  (string) (min length: 1)
    - `allowToTags`: (multiple options) Tags of workloads that egress traffic is allowed to [array of] (nullable) Must be empty or null, as tags cannot be assigned when all traffic is denied  (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `allowToProjects`: (multiple options) Projects that egress traffic is allowed to [array of] (nullable) Must be empty or null, as projects cannot be assigned when all traffic is denied  (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `ingress`: {object}
    - `denyAll`: (boolean)
    - `allowFromTags`: (multiple options) Tags of workloads that ingress traffic is allowed from [array of] (nullable) Must be empty or null, as tags cannot be assigned when all traffic is denied  (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `allowFromProjects`: (multiple options) Projects that ingress traffic is allowed from [array of] (nullable) Must be empty or null, as projects cannot be assigned when all traffic is denied  (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `loadBalancerIngress`: {object} (nullable) Controls client ingress to selected load balancers.
    - `targets`: [array of] (required) Load balancer internal IDs this ingress rule applies to. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `mode`: (string) (required) Whether the listed source ranges are allowed or denied. (enum: allowList, denyList)
    - `cidrs`: [array of] (required) Source IP addresses and CIDR ranges. (string)
  - `egressSecretInjection`: [array of] {object}
     - `name`: (string) (required) (pattern: ^[a-z0-9]([a-z0-9-]*[a-z0-9])?$) (max length: 63)
     - `header`: (string) (required) (pattern: ^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$) (max length: 256)
     - `hosts`: [array of] (required) (string) (max length: 253)
     - `value`: (string) Omit or provide an empty value to preserve the existing secret value.

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
  "https://api.northflank.com/v1/network-policies/{networkPolicyId}"
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

payload = "{\"name\":\"restrict-api-ingress\",\"description\":\"Restrict ingress to the api service.\"}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PATCH", url, headers = headers, data = payload)

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

  var jsonStr = []byte("{\"name\":\"restrict-api-ingress\",\"description\":\"Restrict ingress to the api service.\"}")
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

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.patch.network_policy(
    network_policy_id="my-network-policy",
    data={
        "name": "restrict-api-ingress",
        "description": "Restrict ingress to the api service.",
    },
)
print(response.data)
```
