# List subdomain paths

Source: https://northflank.com/docs/v1/api/team/domains/list-subdomain-paths.md

List paths for a given subdomain.

Required permission: Account > SubdomainPaths > General > Read

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Response body:**

{object}
- `data`: {object}
  - `paths`: [array of] {object}
     - `subdomain`: (string) (required) The domain the path should be created for. (pattern: ^\*|^@$|^([0-9a-z]([0-9a-z\-]*[0-9a-z])?\.)*[0-9a-z]([0-9a-z\-]*[0-9a-z])?$)
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/domains/{domain}/subdomains/{subdomain}/paths

GET /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/paths

#### Example Response

200 OK: A list of paths for the given subdomain.

```json
{
  "data": {
    "paths": [
      {
        "subdomain": "site.example.com",
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
        }
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

$ northflank list subdomain path

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of paths for the given subdomain.

```json
{
  "paths": [
    {
      "subdomain": "site.example.com",
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
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.subdomain.path({
  parameters: {
    "domain": "example.com",
    "subdomain": "app"
  }
});
```

#### Example Response

 A list of paths for the given subdomain.

```json
{
  "data": {
    "paths": [
      {
        "subdomain": "site.example.com",
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
        }
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
