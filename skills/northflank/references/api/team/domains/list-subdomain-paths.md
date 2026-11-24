# List subdomain paths

Source: https://northflank.com/docs/v1/api/team/domains/list-subdomain-paths.md

List paths for a given subdomain.

Required permission: Account > Networking > SubdomainPaths > Read

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `paths`: [array of] (required) A list of paths created for the given subdomain. {object} Details about a subdomain path.
     - `subdomain`: (string) (required) The domain the path should be created for. (pattern: ^\*|^@$|^([0-9a-z]([0-9a-z-]*[0-9a-z])?\.)*[0-9a-z]([0-9a-z-]*[0-9a-z])?$)
     - `mode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix, exact, regex)
     - `uri`: (string) (required) URI of the subdomain path. Interpreted according to the selected path mode
     - `options`: {object}
       - `priority`: (integer) In case of uri conflicts, the route with the higher priority will take precedence
       - `ignoreUriCase`: (boolean) Allows case insensitive matching for 'prefix' and 'exact' modes
       - `rewrite`: (multiple options) Settings determining if a path should be rewritten. Either a uri or regex have to be specified. {object} Rewrite with URI
           - `uri`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$) | {object} Rewrite with regex
           - `regex`: {object}
             - `match`: (string) (required) Regex match for the given path
             - `rewrite`: (string) (required) Regex rewrite for the given matched path
       - `timeout`: (string) Customised request timeout for the given path. By default no timeout is set. (pattern: ^[1-9][0-9]*(s|ms)$)
       - `headers`: {object} Settings allowing addition, re-write and removal of request as well as response headers.
         - `request`: {object}
           - `set`: {object}
           - `add`: {object}
           - `remove`: [array of] (string) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
         - `response`: {object}
           - `set`: {object}
           - `add`: {object}
           - `remove`: [array of] (string) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
       - `corsPolicy`: {object} Settings allowing for customization of CORS policies.
         - `enabled`: (boolean) (required)
         - `allowOrigins`: [array of] {object}
             - `mode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix, exact, regex)
             - `origin`: (string) Origin definition.
         - `allowMethods`: [array of] (string) (enum: GET, POST, PUT, PATCH, DELETE, OPTIONS, TRACE, CONNECT, HEAD)
         - `allowCredentials`: (boolean)
         - `allowHeaders`: [array of] (string)
         - `maxAge`: (string) (pattern: ^[1-9][0-9]*(s|m|h)$)
       - `retries`: {object} Settings allowing for customization of retries.
         - `enabled`: (boolean) (required)
         - `attempts`: (integer) (required)
         - `perTryTimeout`: (string) Timeout per attempt. By default uses the path level timeout. (pattern: ^[1-9][0-9]*(s|ms)$)
         - `retryOn`: [array of] Configure the cases in which the retry should be triggered. (string) (enum: 5xx, gateway-error, reset, connect-failure, envoy-ratelimited, retriable-4xx, refused-stream, retriable-status-codes, retriable-headers, cancelled, deadline-exceeded, internal, resource-exhausted, unavailable)
     - `name`: (string) The full URL including subdomain and path URI.
     - `createdAt`: (string) time of creation (format: date-time)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/domains/{domain}/subdomains/{subdomain}/paths

GET /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}/paths

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths"
```

```python
import requests

url = "https://api.northflank.com/v1/domains/{domain}/subdomains/{subdomain}/paths"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

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
            ],
            "enabled": false
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
          ],
          "enabled": false
        }
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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
            ],
            "enabled": false
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.subdomain.path(
    domain="example.com",
    subdomain="app",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

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
          ],
          "enabled": false
        }
      }
    }
  ]
}
```
