# Get subdomain path

Source: https://northflank.com/docs/v1/api/team/domains/get-subdomain-path.md

Get subdomain path details.

Required permission: Account > SubdomainPaths > General > Read

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain
- `subdomainPath`: (string) (required) Name of the path

**Response body:**

{object}
- `data`: {object}
  - `mode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix, exact, regex)
  - `uri`: (string) (required) URI of the subdomain path. Interpreted according to the selected path mode
  - `options`: {object}
    - `priority`: (integer) In case of uri conflicts, the route with the higher priority will take precedence
    - `ignoreUriCase`: (boolean) Allows case insensitive matching for 'prefix' and 'exact' modes
    - `rewrite`: (multiple options) {object}
        - `uri`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$) | {object}
        - `regex`: {object}
          - `match`: (string) (required) Regex match for the given path
          - `rewrite`: (string) (required) Regex rewrite for the given matched path
    - `timeout`: (string) Customised request timeout for the given path. By default no timeout is set. (pattern: ^[1-9][0-9]*(s|ms)$)
    - `headers`: {object}
      - `request`: {object}
        - `set`: {object}
        - `add`: {object}
        - `remove`: [array of] (string) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
      - `response`: {object}
        - `set`: {object}
        - `add`: {object}
        - `remove`: [array of] (string) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
    - `corsPolicy`: {object}
      - `enabled`: (boolean) (required)
      - `allowOrigins`: [array of] {object}
          - `mode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix, exact, regex)
          - `origin`: (string) Origin definition.
      - `allowMethods`: [array of] (string) (enum: GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE, CONNECT, HEAD)
      - `allowCredentials`: (boolean)
      - `allowHeaders`: [array of] (string)
      - `maxAge`: (string) (pattern: ^[1-9][0-9]*(s|m|h)$)
    - `retries`: {object}
      - `enabled`: (boolean) (required)
      - `attempts`: (integer) (required)
      - `perTryTimeout`: (string) Timeout per attempt. By default uses the path level timeout. (pattern: ^[1-9][0-9]*(s|ms)$)
      - `retryOn`: [array of] (string) (enum: 5xx, gateway-error, reset, connect-failure, envoy-ratelimited, retriable-4xx, refused-stream, retriable-status-codes, retriable-headers, cancelled, deadline-exceeded, internal, resource-exhausted, unavailable)
  - `name`: (string) The full URL including subdomain and path URI.
  - `createdAt`: (string) time of creation (format: date-time)
  - `assignment`: {object}
    - `project`: (string) (required) The ID of the service to assign the subdomain path to. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
    - `service`: (string) (required) The ID of the project the service belongs to. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
    - `port`: (string) (required) The name of the port that will be assigned to the subdomain path.

### API reference

GET /v1/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}

GET /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/paths/{subdomainPath}

#### Example Response

200 OK: Details about subdomain path.

```json
{
  "data": {
    "mode": "prefix",
    "uri": "/",
    "options": {
      "priority": 0,
      "corsPolicy": {
        "allowOrigins": [
          {
            "mode": "prefix",
            "origin": "https://example.com"
          }
        ]
      }
    },
    "assignment": {
      "project": "default-project",
      "service": "example-service",
      "port": "p01"
    }
  }
}
```

#### Example Response

404 Not Found: Path not found.

### CLI reference

$ northflank get subdomain path

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

- `--subdomainPath <subdomainPath>`: Name of the path

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about subdomain path.

```json
{
  "mode": "prefix",
  "uri": "/",
  "options": {
    "priority": 0,
    "corsPolicy": {
      "allowOrigins": [
        {
          "mode": "prefix",
          "origin": "https://example.com"
        }
      ]
    }
  },
  "assignment": {
    "project": "default-project",
    "service": "example-service",
    "port": "p01"
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.subdomain.path({
  parameters: {
    "domain": "example.com",
    "subdomain": "app",
    "subdomainPath": "/"
  }
});
```

#### Example Response

 Details about subdomain path.

```json
{
  "data": {
    "mode": "prefix",
    "uri": "/",
    "options": {
      "priority": 0,
      "corsPolicy": {
        "allowOrigins": [
          {
            "mode": "prefix",
            "origin": "https://example.com"
          }
        ]
      }
    },
    "assignment": {
      "project": "default-project",
      "service": "example-service",
      "port": "p01"
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
