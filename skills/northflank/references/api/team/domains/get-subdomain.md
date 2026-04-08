# Get subdomain

Source: https://northflank.com/docs/v1/api/team/domains/get-subdomain.md

Gets details about the given subdomain

Required permission: Account > Subdomains > General > Read

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
  - `certificate`: {object}
    - `inProgress`: (boolean) Whether a certificate is in the process of being generated
    - `expiryDate`: (string) Expiry date of the current certificate (format: date-time)
    - `refreshDare`: (string) Refresh date of the current certificate (format: date-time)
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
        - `logging`: {object}
          - `enabled`: (boolean)
        - `http3`: {object}
          - `enabled`: (boolean)
        - `websockets`: {object}
          - `enabled`: (boolean)
        - `compression`: {object}
          - `enabled`: (boolean)
          - `mode`: (string) Compression options. Required when `enabled` is `true`. (enum: gzip, brotli)
        - `vclSnippets`: [array of] {object}
            - `id`: (string)
            - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
            - `type`: (string) (required) (enum: init, recv, hash, hit, miss, pass, fetch, error, deliver, log, none)
            - `dynamic`: (string) (required) (enum: 0, 1)
            - `priority`: (number) (required) (format: float)
            - `content`: (string) (required)
        - `cacheSettings`: [array of] {object}
            - `id`: (string)
            - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
            - `action`: (string) (enum: pass, cache, restart)
            - `cacheCondition`: (string)
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
    "verified": true
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
  "verified": true
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
    "verified": true
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
