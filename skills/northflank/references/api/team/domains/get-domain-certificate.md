# Get domain certificate

Source: https://northflank.com/docs/v1/api/team/domains/get-domain-certificate.md

Retrieve certificate data for a domain to verify its contents.

Required permission: Account > Domains > General > Read

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Response body:**

{object}
- `data`: {object}
  - `certificateChain`: (string) (required) Certificate chain. May consist of one or more certificates.
  - `certificate`: (string) (required) Certificate extracted from the certificate chain.
  - `issuerCertificate`: (string) (required) Issuer certificate extracted from the certificate chain.
  - `privateKey`: (string) (required) Certificate private key.

### API reference

GET /v1/domains/{domain}/certificate

GET /v1/teams/{teamId}/domains/{domain}/certificate

#### Example Response

200 OK: Details about the domain certificate.

```json
undefined
```

### CLI reference

$ northflank get domain-certificate

Options:

- `--domain <domain>`: Name of the domain

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the domain certificate.

```json
undefined
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.domainCertificate({
  parameters: {
    "domain": "example.com"
  }
});
```

#### Example Response

 Details about the domain certificate.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
