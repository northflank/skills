# List egress IPs

Source: https://northflank.com/docs/v1/api/team/egress-ips/list-egress-ips.md

Gets a list of egress IPs belonging to the team

Required permission: Account > EgressIps > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `egressIps`: [array of] {object}
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
     - `id`: (string) (required) ID of the egress IP (pattern: ^[A-Za-z0-9-]+$)
     - `createdAt`: (string) (required) The time the egress IP was created. (format: date-time)
     - `updatedAt`: (string) (required) The time the egress IP was last updated. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/egress-ips

GET /v1/teams/{teamId}/egress-ips

#### Example Response

200 OK: A list of egress IPs belonging to the team.

```json
{
  "data": {
    "egressIps": [
      {
        "name": "my-egress-ip",
        "description": "This is a new egress IP.",
        "spec": {
          "provisioningMode": "shared",
          "region": "europe-west",
          "mode": "include"
        },
        "id": "my-egress-ip",
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

$ northflank list egress-ips

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of egress IPs belonging to the team.

```json
{
  "egressIps": [
    {
      "name": "my-egress-ip",
      "description": "This is a new egress IP.",
      "spec": {
        "provisioningMode": "shared",
        "region": "europe-west",
        "mode": "include"
      },
      "id": "my-egress-ip",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "updatedAt": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.egressIps({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of egress IPs belonging to the team.

```json
{
  "data": {
    "egressIps": [
      {
        "name": "my-egress-ip",
        "description": "This is a new egress IP.",
        "spec": {
          "provisioningMode": "shared",
          "region": "europe-west",
          "mode": "include"
        },
        "id": "my-egress-ip",
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
