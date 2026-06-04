# List invoices

Source: https://northflank.com/docs/v1/api/org/billing/list-invoices.md

Lists finalized invoices.

Required permission: Account > Billing > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `invoices`: [array of] {object}
     - `id`: (string) Identifier for the invoice.
     - `period`: {object}
       - `start`: (number) The start of the billing period, as a Unix timestamp. (format: float)
       - `end`: (number) The end of the billing period, as a Unix timestamp. (format: float)
     - `currency`: (string) The currency code.
     - `paasUsage`: {object}
       - `price`: {object}
         - `total`: (number) The total PaaS price, in cents. (format: float)
         - `cpu`: (number) The CPU usage price, in cents. (format: float)
         - `memory`: (number) The memory usage price, in cents. (format: float)
         - `storage`: (number) The storage usage price, in cents. (format: float)
         - `gpu`: (number) The GPU usage price, in cents. (format: float)
     - `byocUsage`: {object}
       - `price`: {object}
         - `total`: (number) The total BYOC price, in cents. (format: float)
         - `vcpu`: (number) The vCPU usage price, in cents. (format: float)
         - `memory`: (number) The memory usage price, in cents. (format: float)
         - `gpuMemory`: (number) The GPU memory usage price, in cents. (format: float)
         - `cluster`: (number) The cluster usage price, in cents. (format: float)
     - `total`: (number) The total cost of the invoice, including tax, in cents. (format: float)
     - `subTotal`: (number) The subtotal before tax and discounts, in cents. (format: float)
     - `paid`: (boolean) Whether the invoice has been paid.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/billing/invoices

GET /v1/teams/{teamId}/billing/invoices

#### Example Response

200 OK: A list of invoices.

```json
{
  "data": {
    "invoices": [
      {
        "currency": "usd"
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

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of invoices.

```json
{
  "invoices": [
    {
      "currency": "usd"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.invoices({
  options: {
    "per_page": 50,
    "page": 1
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
        "currency": "usd"
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
