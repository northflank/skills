# Get egress IP

Source: https://northflank.com/docs/v1/api/team/egress-ips/get-egress-ip.md

Gets information about the given egress IP

Required permission: Account > EgressIps > General > Read

**Path parameters:**

{object}
- `egressIpId`: (string) (required) ID of the egress IP

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

GET /v1/egress-ips/{egressIpId}

GET /v1/teams/{teamId}/egress-ips/{egressIpId}

#### Example Response

200 OK: Details about the egress IP.

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

$ northflank get egress-ip

Options:

- `--egressIpId <egressIpId>`: ID of the egress IP

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the egress IP.

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

```javascript
await apiClient.get.egressIp({
  parameters: {
    "egressIpId": "my-egress-ip"
  }
});
```

#### Example Response

 Details about the egress IP.

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
