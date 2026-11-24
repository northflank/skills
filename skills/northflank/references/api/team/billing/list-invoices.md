# List invoices

Source: https://northflank.com/docs/v1/api/team/billing/list-invoices.md

Lists finalized invoices.

Required permission: Organisation > Admin > Billing > Read

**Query parameters:**

{object}
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)
- `perPage`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `removeLegacyFields`: (boolean) For a billing entity temporarily receiving the legacy billing API contract, return the current contract instead. Use the current query parameters with this option.

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `invoices`: [array of] {object}
     - `id`: (string) Identifier for the invoice.
     - `period`: {object}
       - `start`: (number) The start of the billing period, as a Unix timestamp. (format: float)
       - `end`: (number) The end of the billing period, as a Unix timestamp. (format: float)
     - `currency`: (string) The currency code.
     - `status`: (string) The invoice payment status, as reported by Stripe. `open` is finalized and awaiting payment — including while a payment is in flight or awaiting authentication — `uncollectible` has been written off, and `void` has been cancelled. `payment_failed` is only reported for invoices with no Stripe status to defer to. (enum: draft, open, payment_failed, paid, uncollectible, void)
     - `total`: (number) The total cost of the invoice, including tax. Omitted for a team-scoped caller. (format: float)
     - `subTotal`: (number) The subtotal before tax and discounts. Omitted for a team-scoped caller. (format: float)
     - `scope`: {object} Present when the response is narrowed to the caller's own entity.
       - `entityType`: (string) The entity the response is limited to. (enum: team)
       - `entityId`: (string) Identifier of that entity.
     - `paas`: {object} The PaaS price and usage totals for the period. Customer-level, except for a team-scoped caller, where it is that team's own slice — PaaS is the one category with a per-team tier, so it is reported rather than withheld. Drill into it per project and resource on the invoice detail endpoint.
       - `price`: {object}
         - `total`: (number) The total PaaS price, rounded to 2 decimal places. (format: float)
         - `cpu`: (number) The CPU usage price. (format: float)
         - `memory`: (number) The memory usage price. (format: float)
         - `storage`: (number) The storage usage price. (format: float)
         - `gpu`: (number) The GPU usage price. (format: float)
       - `usage`: {object}
         - `vcpuHours`: (number) vCPU hours consumed. (format: float)
         - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
         - `storageGiBHours`: (number) Storage GiB-hours consumed. (format: float)
         - `gpuSpotHours`: (number) Spot GPU hours consumed. (format: float)
         - `gpuOnDemandHours`: (number) On-demand GPU hours consumed. (format: float)
         - `build`: {object} The share of the usage attributable to builds.
           - `vcpuHours`: (number) (format: float)
           - `memoryGiBHours`: (number) (format: float)
           - `duration`: (number) Seconds attributable to builds. (format: float)
         - `run`: {object} The share of the usage attributable to running workloads.
           - `vcpuHours`: (number) (format: float)
           - `memoryGiBHours`: (number) (format: float)
           - `duration`: (number) Seconds attributable to running workloads. (format: float)
     - `byoc`: {object} The customer-level BYOC price and usage totals for the period. Omitted for a team-scoped caller: BYOC is aggregated to the customer and has no per-team tier.
       - `price`: {object} The customer-level BYOC price total. Always reflects the full customer total, regardless of drill-down filters.
         - `total`: (number) The total BYOC price, rounded to 2 decimal places. (format: float)
         - `vcpu`: (number) The vCPU usage price. (format: float)
         - `memory`: (number) The memory usage price. (format: float)
         - `gpuMemory`: (number) The GPU memory usage price. (format: float)
         - `cluster`: (number) The cluster usage price. (format: float)
       - `usage`: {object} Customer-level BYOC usage hours.
         - `vcpuHours`: (number) vCPU hours consumed. (format: float)
         - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
         - `clusterHours`: (number) Cluster hours consumed. (format: float)
         - `gpuMemoryGiBHours`: (number) GPU memory GiB-hours consumed. (format: float)
     - `egressIp`: {object} Egress IP spend for the period. Omitted for a team-scoped caller.
       - `price`: {object}
         - `total`: (number) The total price, rounded to 2 decimal places. (format: float)
       - `usage`: {object}
         - `hours`: (number) Hours consumed. (format: float)
     - `loadBalancer`: {object} Load balancer spend for the period. Omitted for a team-scoped caller.
       - `price`: {object}
         - `total`: (number) The total price, rounded to 2 decimal places. (format: float)
       - `usage`: {object}
         - `hours`: (number) Hours consumed. (format: float)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/billing/invoices

GET /v1/teams/{teamId}/billing/invoices

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/billing/invoices?perPage=50&removeLegacyFields=true"
```

```python
import requests

url = "https://api.northflank.com/v1/billing/invoices?perPage=50&removeLegacyFields=true"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of invoices.

```json
{
  "data": {
    "invoices": [
      {
        "currency": "usd",
        "status": "paid",
        "paas": {
          "price": {
            "total": 69.22
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

$ northflank list invoices

Options:

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--perPage <perPage>`: The number of results to display per request. Maximum of 100 results per page.

- `--removeLegacyFields <removeLegacyFields>`: For a billing entity temporarily receiving the legacy billing API contract, return the current contract instead. Use the current query parameters with this option.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of invoices.

```json
{
  "invoices": [
    {
      "currency": "usd",
      "status": "paid",
      "paas": {
        "price": {
          "total": 69.22
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
await apiClient.list.invoices({
  options: {
    "perPage": 50,
    "removeLegacyFields": true
  }
});
```

#### Example Response

 A list of invoices.

```json
{
  "data": {
    "invoices": [
      {
        "currency": "usd",
        "status": "paid",
        "paas": {
          "price": {
            "total": 69.22
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

response = client.list.invoices(
    per_page=50,
    remove_legacy_fields=True,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "invoices": [
    {
      "currency": "usd",
      "status": "paid",
      "paas": {
        "price": {
          "total": 69.22
        }
      }
    }
  ]
}
```
