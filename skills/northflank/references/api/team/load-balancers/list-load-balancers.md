# List load balancers

Source: https://northflank.com/docs/v1/api/team/load-balancers/list-load-balancers.md

Gets a list of load balancers belonging to the team

Required permission: Account > LoadBalancers > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `loadBalancers`: [array of] {object}
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
     - `id`: (string) (required) ID of the load balancer (pattern: ^[A-Za-z0-9-]+$)
     - `createdAt`: (string) (required) The time the load balancer was created. (format: date-time)
     - `updatedAt`: (string) (required) The time the load balancer was last updated. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/load-balancers

GET /v1/teams/{teamId}/load-balancers

#### Example Response

200 OK: A list of load balancers belonging to the team.

```json
{
  "data": {
    "loadBalancers": [
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
        },
        "id": "my-load-balancer",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "updatedAt": "2021-01-20T11:19:53.175Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list load-balancers

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of load balancers belonging to the team.

```json
{
  "loadBalancers": [
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
      },
      "id": "my-load-balancer",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "updatedAt": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.loadBalancers({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of load balancers belonging to the team.

```json
{
  "data": {
    "loadBalancers": [
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
        },
        "id": "my-load-balancer",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "updatedAt": "2021-01-20T11:19:53.175Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
