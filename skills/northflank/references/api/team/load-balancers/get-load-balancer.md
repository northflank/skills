# Get load balancer

Source: https://northflank.com/docs/v1/api/team/load-balancers/get-load-balancer.md

Gets information about the given load balancer

Required permission: Account > LoadBalancers > General > Read

**Path parameters:**

{object}
- `loadBalancerId`: (string) (required) ID of the load balancer

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

GET /v1/load-balancers/{loadBalancerId}

GET /v1/teams/{teamId}/load-balancers/{loadBalancerId}

#### Example Response

200 OK: Details about the load balancer.

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

$ northflank get load-balancer

Options:

- `--loadBalancerId <loadBalancerId>`: ID of the load balancer

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the load balancer.

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

```javascript
await apiClient.get.loadBalancer({
  parameters: {
    "loadBalancerId": "my-load-balancer"
  }
});
```

#### Example Response

 Details about the load balancer.

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
