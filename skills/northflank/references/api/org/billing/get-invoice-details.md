# Get invoice details

Source: https://northflank.com/docs/v1/api/org/billing/get-invoice-details.md

Get details about an invoice. If `timestamp` is passed in as a query parameter, this endpoint returns details about the invoice containing that timestamp. Otherwise, returns a preview invoice displaying billing data from after the most recent invoice.

Required permission: Account > Billing > General > Read

**Query parameters:**

{object}
- `timestamp`: (integer) Timestamp of an invoice. If passed in, this endpoint will return details about the invoice that time belongs to.

**Response body:**

{object}
- `data`: {object}
  - `period`: {object}
    - `start`: (number) (required) Unix timestamp of the start of the billing period. (format: float)
    - `end`: (number) (required) Unix timestamp of the end of the billing period. (format: float)
  - `paid`: (boolean) If `timestamp` is passed in, whether the invoice has been paid.
  - `byocUsage`: {object}
    - `price`: {object}
      - `total`: (number) (format: float)
  - `paasUsage`: {object}
    - `price`: {object}
      - `total`: (number) (format: float)
      - `cpu`: (number) (format: float)
      - `memory`: (number) (format: float)
      - `storage`: (number) (format: float)
    - `teams`: [array of] {object}
        - `id`: (string)
        - `name`: (string)
        - `usage`: {object}
          - `price`: {object}
            - `total`: (number) (format: float)
            - `cpu`: (number) (format: float)
            - `memory`: (number) (format: float)
            - `storage`: (number) (format: float)
          - `projects`: [array of] {object}
              - `id`: (string)
              - `price`: {object}
                - `total`: (number) (format: float)
                - `cpu`: (number) (format: float)
                - `memory`: (number) (format: float)
                - `storage`: (number) (format: float)
  - `lineItems`: [array of] {object}
     - `title`: (string)
     - `total`: (number) (format: float)
  - `subTotal`: (number) (format: float)
  - `discount`: (number) (format: float)
  - `tax`: {object}
    - `percent`: (number) (required) Percentage of subtotal to be applied as tax. (format: float)
    - `value`: (number) (required) Value of the tax on the invoice. (format: float)
  - `total`: (number) (format: float)

### API reference

GET /v1/billing/invoices/details

GET /v1/teams/{teamId}/billing/invoices/details

#### Example Response

200 OK: Details about an invoice.

```json
{
  "data": {
    "period": {
      "start": 1655823815,
      "end": 1655910214
    },
    "tax": {
      "percent": 20,
      "value": 200
    }
  }
}
```

### CLI reference

$ northflank get invoice details

Options:

- `--timestamp <timestamp>`: Timestamp of an invoice. If passed in, this endpoint will return details about the invoice that time belongs to.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about an invoice.

```json
{
  "period": {
    "start": 1655823815,
    "end": 1655910214
  },
  "tax": {
    "percent": 20,
    "value": 200
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.invoice.details({
  options: {
    "timestamp": 1657206215
  }
});
```

#### Example Response

 Details about an invoice.

```json
{
  "data": {
    "period": {
      "start": 1655823815,
      "end": 1655910214
    },
    "tax": {
      "percent": 20,
      "value": 200
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
