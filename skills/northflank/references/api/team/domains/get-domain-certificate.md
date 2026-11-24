# Get domain certificate

Source: https://northflank.com/docs/v1/api/team/domains/get-domain-certificate.md

Retrieve wildcard certificate data, including its private key, for a domain.

Required permission: Account > Networking > Domains > Read Certificate Private Key

**Path parameters:**

{object}
- `domain`: (string) (required) Name of the domain

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `certificateChain`: (string) (required) Certificate chain. May consist of one or more certificates.
  - `certificate`: (string) (required) Certificate extracted from the certificate chain.
  - `issuerCertificate`: (string) (required) Issuer certificate extracted from the certificate chain.
  - `privateKey`: (string) (required) Certificate private key.

### API reference

GET /v1/domains/{domain}/certificate

GET /v1/teams/{teamId}/domains/{domain}/certificate

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/domains/{domain}/certificate"
```

```python
import requests

url = "https://api.northflank.com/v1/domains/{domain}/certificate"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details about the domain certificate.

```json
{
  "data": {
    "certificateChain": "string",
    "certificate": "string",
    "issuerCertificate": "string",
    "privateKey": "string"
  }
}
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
{
  "certificateChain": "string",
  "certificate": "string",
  "issuerCertificate": "string",
  "privateKey": "string"
}
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
  "data": {
    "certificateChain": "string",
    "certificate": "string",
    "issuerCertificate": "string",
    "privateKey": "string"
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
