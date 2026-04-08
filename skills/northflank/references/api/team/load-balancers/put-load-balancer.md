# Put load balancer

Source: https://northflank.com/docs/v1/api/team/load-balancers/put-load-balancer.md

Creates or updates a load balancer

Required permission: Account > LoadBalancers > General > Create

**Request body:**

{object}
- `name`: (string) (required) The name of the load balancer. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The description of the load balancer. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `spec`: {object}
  - `type`: (string) (required) Protocol type for the load balancer (enum: tcp, udp)
  - `target`: {object}
    - `type`: (string) (required) Target type for the load balancer (enum: region, cluster)
    - `targetId`: (multiple options) (string) Target region name (pattern: ^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$) | (string) Target cluster internal ID (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
  - `ports`: [array of] {object}
     - `id`: (string) (required) Unique port identifier (pattern: ^port-\d+$)
     - `port`: (string) (required) Port number or range (single port, multiple comma-separated, or range with dash)
     - `backends`: [array of] {object}
         - `id`: (string) (required) Backend reference in format {projectId}/{nfObjectId} (pattern: ^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$)
         - `type`: (string) (required) Backend type (service or addon) (enum: service, addon)
         - `port`: (integer) (required) Backend port number
         - `weight`: (integer) Traffic weight for this backend

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the load balancer (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) The name of the load balancer. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `description`: (string) The description of the load balancer. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `spec`: {object}
    - `type`: (string) (required) Protocol type for the load balancer (enum: tcp, udp)
    - `target`: {object}
      - `type`: (string) (required) Target type for the load balancer (enum: region, cluster)
      - `targetId`: (multiple options) (string) Target region name (pattern: ^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$) | (string) Target cluster internal ID (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `ports`: [array of] {object}
        - `id`: (string) (required) Unique port identifier (pattern: ^port-\d+$)
        - `port`: (string) (required) Port number or range (single port, multiple comma-separated, or range with dash)
        - `backends`: [array of] {object}
            - `id`: (string) (required) Backend reference in format {projectId}/{nfObjectId} (pattern: ^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$)
            - `type`: (string) (required) Backend type (service or addon) (enum: service, addon)
            - `port`: (integer) (required) Backend port number
            - `weight`: (integer) Traffic weight for this backend
  - `state`: {object}
    - `endpoints`: [array of] (string)
    - `status`: (string) (required) Current status of the load balancer (enum: pending, provisioning, provisioned, error, deleting, deleted)
    - `lastTransitionTime`: (string) (required) Time of the last status transition (format: date-time)
  - `createdAt`: (string) (required) The time the load balancer was created. (format: date-time)
  - `updatedAt`: (string) (required) The time the load balancer was last updated. (format: date-time)

### API reference

PUT /v1/load-balancers

PUT /v1/teams/{teamId}/load-balancers

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"name":"my-load-balancer","description":"This is a new load balancer.","spec":{"type":"tcp","target":{"type":"region","targetId":"europe-west"},"ports":[{"id":"port-80","port":"80","backends":[{"id":"my-project/my-service","type":"service","port":3000,"weight":1}]}]}}' \
  https://api.northflank.com/v1/load-balancers
```

```javascript
const payload = {
  "name": "my-load-balancer",
  "description": "This is a new load balancer.",
  "spec": {
    "type": "tcp",
    "target": {
      "type": "region",
      "targetId": "europe-west"
    },
    "ports": [
      {
        "id": "port-80",
        "port": "80",
        "backends": [
          {
            "id": "my-project/my-service",
            "type": "service",
            "port": 3000,
            "weight": 1
          }
        ]
      }
    ]
  }
}

const response = await fetch('https://api.northflank.com/v1/load-balancers', {
  method: 'PUT',
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

url = "https://api.northflank.com/v1/load-balancers"

payload = {"name":"my-load-balancer","description":"This is a new load balancer.","spec":{"type":"tcp","target":{"type":"region","targetId":"europe-west"},"ports":[{"id":"port-80","port":"80","backends":[{"id":"my-project/my-service","type":"service","port":3000,"weight":1}]}]}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/load-balancers"

  var jsonStr = []byte(`{"name":"my-load-balancer","description":"This is a new load balancer.","spec":{"type":"tcp","target":{"type":"region","targetId":"europe-west"},"ports":[{"id":"port-80","port":"80","backends":[{"id":"my-project/my-service","type":"service","port":3000,"weight":1}]}]}}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details about the created or updated load balancer.

```json
{
  "data": {
    "id": "my-load-balancer",
    "name": "my-load-balancer",
    "description": "This is a new load balancer.",
    "spec": {
      "type": "tcp",
      "target": {
        "type": "region",
        "targetId": "europe-west"
      },
      "ports": [
        {
          "id": "port-80",
          "port": "80",
          "backends": [
            {
              "id": "my-project/my-service",
              "type": "service",
              "port": 3000,
              "weight": 1
            }
          ]
        }
      ]
    },
    "state": {
      "status": "provisioned"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  }
}
```

### CLI reference

$ northflank put load-balancer

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "my-load-balancer",
  "description": "This is a new load balancer.",
  "spec": {
    "type": "tcp",
    "target": {
      "type": "region",
      "targetId": "europe-west"
    },
    "ports": [
      {
        "id": "port-80",
        "port": "80",
        "backends": [
          {
            "id": "my-project/my-service",
            "type": "service",
            "port": 3000,
            "weight": 1
          }
        ]
      }
    ]
  }
}
```

#### Example Response

 Details about the created or updated load balancer.

```json
{
  "id": "my-load-balancer",
  "name": "my-load-balancer",
  "description": "This is a new load balancer.",
  "spec": {
    "type": "tcp",
    "target": {
      "type": "region",
      "targetId": "europe-west"
    },
    "ports": [
      {
        "id": "port-80",
        "port": "80",
        "backends": [
          {
            "id": "my-project/my-service",
            "type": "service",
            "port": 3000,
            "weight": 1
          }
        ]
      }
    ]
  },
  "state": {
    "status": "provisioned"
  },
  "createdAt": "2021-01-20T11:19:53.175Z",
  "updatedAt": "2021-01-20T11:19:53.175Z"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.put.loadBalancer({
  data: {
    "name": "my-load-balancer",
    "description": "This is a new load balancer.",
    "spec": {
      "type": "tcp",
      "target": {
        "type": "region",
        "targetId": "europe-west"
      },
      "ports": [
        {
          "id": "port-80",
          "port": "80",
          "backends": [
            {
              "id": "my-project/my-service",
              "type": "service",
              "port": 3000,
              "weight": 1
            }
          ]
        }
      ]
    }
  }
});
```

#### Example Response

 Details about the created or updated load balancer.

```json
{
  "data": {
    "id": "my-load-balancer",
    "name": "my-load-balancer",
    "description": "This is a new load balancer.",
    "spec": {
      "type": "tcp",
      "target": {
        "type": "region",
        "targetId": "europe-west"
      },
      "ports": [
        {
          "id": "port-80",
          "port": "80",
          "backends": [
            {
              "id": "my-project/my-service",
              "type": "service",
              "port": 3000,
              "weight": 1
            }
          ]
        }
      ]
    },
    "state": {
      "status": "provisioned"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "updatedAt": "2021-01-20T11:19:53.175Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
