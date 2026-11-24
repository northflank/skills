# List domains

Source: https://northflank.com/docs/v1/api/team/domains/list-domains.md

Lists available domains

Required permission: Account > Networking > Domains > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `domains`: [array of] (required) A list of domains registered to this account. {object} Details about a domain.
     - `name`: (string) (required) The domain name.
     - `status`: (string) (required) The status of the domain verification. (enum: pending, verified)
     - `hostname`: (string) (required) The hostname to add to your domain's DNS records as a TXT record to verify the domain.
     - `token`: (string) (required) The token to add as the content of the TXT record to verify the domain.
     - `options`: {object} Domain-level options for wildcard domains.
       - `minTlsProtocolVersion`: (string) Minimum TLS protocol version configured at the domain level. (enum: TLSV1_1, TLSV1_2, TLSV1_3)
       - `tlsMode`: (string) TLS mode configured at the domain level. (enum: default, passthrough)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/domains

GET /v1/teams/{teamId}/domains

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/domains?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/domains?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of domains registered to this account.

```json
{
  "data": {
    "domains": [
      {
        "name": "example.com",
        "status": "verified",
        "hostname": "nfverify1608026055",
        "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57"
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

$ northflank list domains

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of domains registered to this account.

```json
{
  "domains": [
    {
      "name": "example.com",
      "status": "verified",
      "hostname": "nfverify1608026055",
      "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.domains({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of domains registered to this account.

```json
{
  "data": {
    "domains": [
      {
        "name": "example.com",
        "status": "verified",
        "hostname": "nfverify1608026055",
        "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57"
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

response = client.list.domains(
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "domains": [
    {
      "name": "example.com",
      "status": "verified",
      "hostname": "nfverify1608026055",
      "token": "e596987b52855a4a773ef580ce2985d7746b37ce8b2a443d20fa27b913d8f57"
    }
  ]
}
```
