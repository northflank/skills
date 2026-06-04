# List tags

Source: https://northflank.com/docs/v1/api/team/tags/list-tags.md

List the resource tags for this entity.

Required permission: Account > Tags > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `tags`: [array of] {object}
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/tags

GET /v1/teams/{teamId}/tags

#### Example Response

200 OK: A list of tags for this entity.

```json
{
  "data": {
    "tags": [
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
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list tags

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of tags for this entity.

```json
{
  "tags": [
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
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.tags({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of tags for this entity.

```json
{
  "data": {
    "tags": [
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
