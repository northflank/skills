# Get domain certificate

Source: https://northflank.com/docs/v1/api/team/domains/get-domain-certificate.md

Retrieve certificate data for a domain to verify its contents.

Required permission: Account > Networking > Domains > Read

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

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.get.domain_certificate(
    domain="example.com",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "certificateChain": "string",
  "certificate": "string",
  "issuerCertificate": "string",
  "privateKey": "string"
}
```
