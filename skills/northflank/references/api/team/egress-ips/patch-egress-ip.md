# Patch egress IP

Source: https://northflank.com/docs/v1/api/team/egress-ips/patch-egress-ip.md

Updates an egress IP

Required permission: Account > EgressIps > General > Update

**Path parameters:**

{object}
- `egressIpId`: (string) (required) ID of the egress IP

**Request body:**

{object}
- `name`: (string) The name of the egress IP. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The description of the egress IP. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `spec`: {object}
  - `provisioningMode`: (string) (required) Provisioning mode for the egress IP: shared (uses pre-provisioned infrastructure) or dedicated (enum: shared, dedicated)
  - `region`: (string) (required) Target region name (pattern: ^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$)
  - `mode`: (string) Mode: include (only these projects/resources use this egress IP) or exclude (all except these use this egress IP) (enum: include, exclude)
  - `rules`: [array of] {object}
     - `id`: (string) (required) Project internal ID
     - `restrictions`: {object}
       - `enabled`: (boolean) (required) Whether restrictions scoping the rule to specific resources should be applied.
       - `resources`: [array of] {object}
           - `type`: (string) (required) Resource type (enum: service, job)
           - `id`: (string) (required) Resource internal ID

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the egress IP (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) The name of the egress IP. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `description`: (string) The description of the egress IP. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `spec`: {object}
    - `provisioningMode`: (string) (required) Provisioning mode for the egress IP: shared (uses pre-provisioned infrastructure) or dedicated (enum: shared, dedicated)
    - `region`: (string) (required) Target region name (pattern: ^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$)
    - `mode`: (string) Mode: include (only these projects/resources use this egress IP) or exclude (all except these use this egress IP) (enum: include, exclude)
    - `rules`: [array of] {object}
        - `id`: (string) (required) Project internal ID
        - `restrictions`: {object}
          - `enabled`: (boolean) (required) Whether restrictions scoping the rule to specific resources should be applied.
          - `resources`: [array of] {object}
              - `type`: (string) (required) Resource type (enum: service, job)
              - `id`: (string) (required) Resource internal ID
  - `state`: {object}
    - `ipAddress`: (string) Assigned public IP address
    - `status`: (string) (required) Current status of the egress IP (enum: staging, loading, active, error, deleting, deleted)
    - `lastTransitionTime`: (string) (required) Time of the last status transition (format: date-time)
  - `createdAt`: (string) (required) The time the egress IP was created. (format: date-time)
  - `updatedAt`: (string) (required) The time the egress IP was last updated. (format: date-time)

### API reference

PATCH /v1/egress-ips/{egressIpId}

PATCH /v1/teams/{teamId}/egress-ips/{egressIpId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"name":"my-egress-ip","description":"This is a new egress IP.","spec":{"provisioningMode":"shared","region":"europe-west","mode":"include"}}' \
  https://api.northflank.com/v1/egress-ips/{egressIpId}
```

```javascript
const payload = {
  "name": "my-egress-ip",
  "description": "This is a new egress IP.",
  "spec": {
    "provisioningMode": "shared",
    "region": "europe-west",
    "mode": "include"
  }
}

const response = await fetch('https://api.northflank.com/v1/egress-ips/{egressIpId}', {
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

url = "https://api.northflank.com/v1/egress-ips/{egressIpId}"

payload = {"name":"my-egress-ip","description":"This is a new egress IP.","spec":{"provisioningMode":"shared","region":"europe-west","mode":"include"}}
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
  url := "https://api.northflank.com/v1/egress-ips/{egressIpId}"

  var jsonStr = []byte(`{"name":"my-egress-ip","description":"This is a new egress IP.","spec":{"provisioningMode":"shared","region":"europe-west","mode":"include"}}`)
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

200 OK: Details about the updated egress IP.

```json
{
  "data": {
    "id": "my-egress-ip",
    "name": "my-egress-ip",
    "description": "This is a new egress IP.",
    "spec": {
      "provisioningMode": "shared",
      "region": "europe-west",
      "mode": "include"
    },
    "state": {
      "ipAddress": "34.105.225.71",
      "status": "active"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  }
}
```

### CLI reference

$ northflank patch egress-ip

Options:

- `--egressIpId <egressIpId>`: ID of the egress IP

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "my-egress-ip",
  "description": "This is a new egress IP.",
  "spec": {
    "provisioningMode": "shared",
    "region": "europe-west",
    "mode": "include"
  }
}
```

#### Example Response

 Details about the updated egress IP.

```json
{
  "id": "my-egress-ip",
  "name": "my-egress-ip",
  "description": "This is a new egress IP.",
  "spec": {
    "provisioningMode": "shared",
    "region": "europe-west",
    "mode": "include"
  },
  "state": {
    "ipAddress": "34.105.225.71",
    "status": "active"
  },
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.patch.egressIp({
  parameters: {
    "egressIpId": "my-egress-ip"
  },
  data: {
    "name": "my-egress-ip",
    "description": "This is a new egress IP.",
    "spec": {
      "provisioningMode": "shared",
      "region": "europe-west",
      "mode": "include"
    }
  }
});
```

#### Example Response

 Details about the updated egress IP.

```json
{
  "data": {
    "id": "my-egress-ip",
    "name": "my-egress-ip",
    "description": "This is a new egress IP.",
    "spec": {
      "provisioningMode": "shared",
      "region": "europe-west",
      "mode": "include"
    },
    "state": {
      "ipAddress": "34.105.225.71",
      "status": "active"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
