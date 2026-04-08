# List invoices

Source: https://northflank.com/docs/v1/api/team/billing/list-invoices.md

Get a list of past invoices

Required permission: Account > Billing > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `invoices`: {object}
    - `period`: {object}
      - `start`: (number) (required) Unix timestamp of the start of the billing period. (format: float)
      - `end`: (number) (required) Unix timestamp of the end of the billing period. (format: float)
    - `total`: (number) (required) Total cost of the invoice, in cents, including tax. (format: float)
    - `paid`: (boolean) If `timestamp` is passed in, whether the invoice has been paid.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/billing/invoices

GET /v1/teams/{teamId}/billing/invoices

#### Example Response

200 OK: Details about an invoice.

```json
{
  "data": {
    "invoices": {
      "period": {
        "start": 1655823815,
        "end": 1655910214
      },
      "total": 1200
    }
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

 Details about an invoice.

```json
{
  "invoices": {
    "period": {
      "start": 1655823815,
      "end": 1655910214
    },
    "total": 1200
  }
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

 Details about an invoice.

```json
{
  "data": {
    "invoices": {
      "period": {
        "start": 1655823815,
        "end": 1655910214
      },
      "total": 1200
    }
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
