# Get tag

Source: https://northflank.com/docs/v1/api/team/tags/get-tag.md

View details for a given resource tag.

Required permission: Account > Tags > General > Read

**Path parameters:**

{object}
- `resourceTagId`: (string) (required) ID of the tag

**Response body:**

{object}
- `data`: {object}
  - `useSpotNodes`: (boolean) Schedule workloads to spot nodes
  - `useOnDemandNodes`: (boolean) Also allow workloads to schedule to on demand nodes. Only relevant if you want workloads to schedule across both spot and on demand nodes
  - `nodeAffinities`: [array of] {object}
     - `preference`: (boolean)
     - `weight`: (number) The node affinity weight. Required when `preference` is `true`. (format: float)
     - `matchExpressions`: [array of] {object}
         - `key`: (string) (required)
         - `operator`: (string) (required) (enum: In, NotIn)
         - `values`: [array of] (string)
  - `sandboxing`: {object}
    - `builds`: {object}
      - `enabled`: (boolean) (required) Enables runtime scheduling constraints for builds
      - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for builds (enum: none, gvisor, kata-clh, kata-qemu)
    - `services`: {object}
      - `enabled`: (boolean) (required) Enables runtime scheduling constraints for services
      - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for services (enum: none, gvisor, kata-clh, kata-qemu)
    - `addons`: {object}
      - `enabled`: (boolean) (required) Enables runtime scheduling constraints for addons
      - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for addons (enum: none, gvisor, kata-clh, kata-qemu)
    - `jobs`: {object}
      - `enabled`: (boolean) (required) Enables runtime scheduling constraints for jobs
      - `runtimeClass`: (multiple options) (string) Defines which runtime scheduling constraints apply for jobs (enum: none, gvisor, kata-clh, kata-qemu)
  - `color`: (string) (pattern: ^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `id`: (string) (required) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `createdAt`: (string) time of creation (format: date-time)

### API reference

GET /v1/tags/{resourceTagId}

GET /v1/teams/{teamId}/tags/{resourceTagId}

#### Example Response

200 OK: Data about the resource tag.

```json
{
  "data": {
    "useSpotNodes": false,
    "useOnDemandNodes": false,
    "sandboxing": {
      "builds": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "services": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "addons": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "jobs": {
        "enabled": false,
        "runtimeClass": "gvisor"
      }
    },
    "color": "#57637A",
    "name": "Example Tag",
    "id": "example-tag",
    "createdAt": "2000-01-01T12:00:00.000Z"
  }
}
```

### CLI reference

$ northflank get tag

Options:

- `--resourceTagId <resourceTagId>`: ID of the tag

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the resource tag.

```json
{
  "useSpotNodes": false,
  "useOnDemandNodes": false,
  "sandboxing": {
    "builds": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "services": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "addons": {
      "enabled": false,
      "runtimeClass": "gvisor"
    },
    "jobs": {
      "enabled": false,
      "runtimeClass": "gvisor"
    }
  },
  "color": "#57637A",
  "name": "Example Tag",
  "id": "example-tag",
  "createdAt": "2000-01-01T12:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.tag({
  parameters: {
    "resourceTagId": "example-tag"
  }
});
```

#### Example Response

 Data about the resource tag.

```json
{
  "data": {
    "useSpotNodes": false,
    "useOnDemandNodes": false,
    "sandboxing": {
      "builds": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "services": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "addons": {
        "enabled": false,
        "runtimeClass": "gvisor"
      },
      "jobs": {
        "enabled": false,
        "runtimeClass": "gvisor"
      }
    },
    "color": "#57637A",
    "name": "Example Tag",
    "id": "example-tag",
    "createdAt": "2000-01-01T12:00:00.000Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
