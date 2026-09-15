# Get subdomain

Source: https://northflank.com/docs/v1/api/team/domains/get-subdomain.md

Gets details about the given subdomain

Required permission: Account > Networking > Subdomains > Read

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain
- `subdomain`: (string) (required) Name of the subdomain

**Response body:**

{object}
- `data`: {object}
  - `recordType`: (string) (required) The record type to use for the DNS record to verify the subdomain - always CNAME for subdomains.
  - `name`: (string) (required) The subdomain.
  - `fullName`: (string) (required) The full domain name with subdomain
  - `content`: (string) (required) The content to set the DNS record to
  - `verified`: (boolean) (required) Whether the subdomain has been verified successfully and can be used.
  - `loadBalancer`: (string) Name of the load balancer linked to this subdomain, if any.
  - `clusterLoadBalancer`: (string) Cluster load balancer the subdomain resolves on, as set by `loadBalancer` on create and update. Distinct from `loadBalancer` above, which names a linked load balancer object. (enum: public, vpc)
  - `certificate`: {object}
    - `inProgress`: (boolean) Whether a certificate is in the process of being generated
    - `expiryDate`: (string) Expiry date of the current certificate (format: date-time)
    - `refreshDare`: (string) Refresh date of the current certificate (format: date-time)
  - `certificateValidationMethod`: (string) How the subdomain's TLS certificate is validated and issued. (enum: http, dcv, imported)
  - `dcvRecord`: {object}
    - `record`: (string) (required) CNAME record used for DCV delegation.
    - `target`: (string) (required) Expected target of the DCV CNAME record.
  - `options`: {object}
    - `tlsMode`: (string) Desired TLS mode for the subdomain. (enum: default, passthrough)
    - `minTlsProtocolVersion`: (string) Minimum TLS protocol version for the subdomain. Only applicable for non-wildcard subdomains. (enum: TLSV1_1, TLSV1_2, TLSV1_3)
    - `autoVerify`: (boolean) The domain will be automatically verified on creation. Only configurable if the relevant feature flag is enabled for you account.
    - `aliasDomains`: [array of] (string)
  - `routingMode`: (string) The routing mode for the subdomain. (enum: paths, geoRouting, loadBalancerSubdomain)
  - `geoRouting`: {object}
    - `strategy`: (string) The geo routing strategy. (enum: continent, closest)
    - `rules`: [array of] {object}
        - `continents`: [array of] (string) (enum: NA, SA, EU, AF, AS, OC, AN)
        - `backend`: {object}
          - `id`: (string) (required) Backend reference in format {projectInternalId}/{serviceInternalId} (pattern: ^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$)
          - `port`: (string) (required) Port name on the backend service
    - `defaultBackend`: {object}
      - `id`: (string) (required) Backend reference in format {projectInternalId}/{serviceInternalId} (pattern: ^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$)
      - `port`: (string) (required) Port name on the backend service
  - `cdn`: {object}
    - `northflank`: {object}
      - `enabled`: (boolean)
      - `status`: (string)
      - `options`: {object}
        - `service`: {object}
          - `forceTlsEnableHsts`: (boolean)
          - `hstsDuration`: (number) HSTS duration. Required when `forceTlsEnableHsts` is `true`. (format: float)
          - `staleIfError`: (boolean)
          - `staleIfErrorTtl`: (number) (format: float)
          - `defaultTtl`: (number) (format: float)
          - `passThrough`: (boolean)
          - `bypassCredentialedRequests`: (boolean)
        - `logging`: {object}
          - `enabled`: (boolean)
        - `http3`: {object}
          - `enabled`: (boolean)
        - `websockets`: {object}
          - `enabled`: (boolean)
        - `ddosProtection`: {object}
          - `enabled`: (boolean)
        - `compression`: {object}
          - `enabled`: (boolean)
          - `mode`: (string) Compression options. Required when `enabled` is `true`. (enum: gzip, brotli)
        - `vclSnippets`: [array of] {object}
            - `id`: (string)
            - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
            - `type`: (string) (required) (enum: init, recv, hash, hit, miss, pass, fetch, error, deliver, log, none)
            - `dynamic`: (string) (required) (enum: 0, 1)
            - `priority`: (multiple options) (number) (format: float)
            - `content`: (string) (required)
        - `cacheSettings`: [array of] {object}
            - `id`: (string)
            - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
            - `action`: (string) (enum: pass, cache, restart)
            - `cacheCondition`: (string) (max length: 512)
            - `staleTtl`: (number) (required) (format: float)
            - `ttl`: (number) (required) (format: float)
      - `deployedAt`: (string) (format: date-time)

### API reference

GET /v1/domains/{domain}/subdomains/{subdomain}

GET /v1/teams/{teamId}/domains/{domain}/subdomains/{subdomain}

#### Example Response

200 OK: Details about the subdomain.

```json
{
  "data": {
    "recordType": "CNAME",
    "name": "site",
    "fullName": "site.example.com",
    "content": "site.example.com.user-1234.dns.northflank.app",
    "verified": true,
    "loadBalancer": "my-load-balancer",
    "clusterLoadBalancer": "public",
    "geoRouting": {
      "rules": [
        {
          "backend": {
            "id": "my-project/my-service",
            "port": "http"
          }
        }
      ],
      "defaultBackend": {
        "id": "my-project/my-service",
        "port": "http"
      }
    }
  }
}
```

### CLI reference

$ northflank get subdomain

Options:

- `--domain <domain>`: Name of the domain

- `--subdomain <subdomain>`: Name of the subdomain

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the subdomain.

```json
{
  "recordType": "CNAME",
  "name": "site",
  "fullName": "site.example.com",
  "content": "site.example.com.user-1234.dns.northflank.app",
  "verified": true,
  "loadBalancer": "my-load-balancer",
  "clusterLoadBalancer": "public",
  "geoRouting": {
    "rules": [
      {
        "backend": {
          "id": "my-project/my-service",
          "port": "http"
        }
      }
    ],
    "defaultBackend": {
      "id": "my-project/my-service",
      "port": "http"
    }
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.subdomain({
  parameters: {
    "domain": "example.com",
    "subdomain": "app"
  }
});
```

#### Example Response

 Details about the subdomain.

```json
{
  "data": {
    "recordType": "CNAME",
    "name": "site",
    "fullName": "site.example.com",
    "content": "site.example.com.user-1234.dns.northflank.app",
    "verified": true,
    "loadBalancer": "my-load-balancer",
    "clusterLoadBalancer": "public",
    "geoRouting": {
      "rules": [
        {
          "backend": {
            "id": "my-project/my-service",
            "port": "http"
          }
        }
      ],
      "defaultBackend": {
        "id": "my-project/my-service",
        "port": "http"
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
