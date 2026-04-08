# Get domain

Source: https://northflank.com/docs/v1/api/team/domains/get-domain.md

Gets details about domain

Required permission: Account > Domains > General > Read

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The domain name.
  - `status`: (string) (required) The status of the domain verification. (enum: pending, verified)
  - `hostname`: (string) The hostname to add to your domain's DNS records as a TXT record to verify the domain.
  - `token`: (string) The token to add as the content of the TXT record to verify the domain.
  - `redirect`: {object}
    - `mode`: (string) (required) Domain redirect mode.
    - `target`: {object}
      - `record`: (string) Expected CNAME target of the wildcard redirect.
  - `certificates`: {object}
    - `mode`: (string) (required) Domain certificate mode.
    - `dcvRecord`: (string) DCV CNAME record used to provision wildcard certificates.
    - `dcvTarget`: {object}
      - `record`: (string) Expected CNAME target of the dcvRecord.
    - `status`: {object}
      - `expiryDate`: (string) Expiry date of the current certificate. (format: date-time)
  - `subdomains`: [array of] {object}
     - `name`: (string) (required) The subdomain added, or -default for the empty subdomain.
     - `fullName`: (string) (required) The full domain including the subdomain.

### API reference

GET /v1/domains/{domain}

GET /v1/teams/{teamId}/domains/{domain}

#### Example Response

200 OK: Details about the given domain.

```json
{
  "data": {
    "name": "example.com",
    "status": "pending",
    "hostname": "nfverify1608026055",
    "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57",
    "redirect": {
      "mode": "default"
    },
    "certificates": {
      "mode": "default"
    },
    "subdomains": [
      {
        "name": "app",
        "fullName": "app.example.com"
      }
    ]
  }
}
```

### CLI reference

$ northflank get domain

Options:

- `--domain <domain>`: Name of the domain

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the given domain.

```json
{
  "name": "example.com",
  "status": "pending",
  "hostname": "nfverify1608026055",
  "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57",
  "redirect": {
    "mode": "default"
  },
  "certificates": {
    "mode": "default"
  },
  "subdomains": [
    {
      "name": "app",
      "fullName": "app.example.com"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.domain({
  parameters: {
    "domain": "example.com"
  }
});
```

#### Example Response

 Details about the given domain.

```json
{
  "data": {
    "name": "example.com",
    "status": "pending",
    "hostname": "nfverify1608026055",
    "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57",
    "redirect": {
      "mode": "default"
    },
    "certificates": {
      "mode": "default"
    },
    "subdomains": [
      {
        "name": "app",
        "fullName": "app.example.com"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
