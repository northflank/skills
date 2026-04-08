# List plans

Source: https://northflank.com/docs/v1/api/miscellaneous/list-plans.md

Lists available billing plans

**Response body:**

{object}
- `data`: {object}
  - `plans`: [array of] {object}
     - `id`: (string) (required) The ID of the plan.
     - `name`: (string) (required) The name of the plan.
     - `currency`: (string) (required) The currency code of the currency used by this plan.
     - `amountPerMonth`: (number) (required) The approximate monthly (30 days) cost of the plan. (format: float)
     - `amountPerHour`: (number) (required) The hourly cost of the plan. (format: float)
     - `cpuResource`: (number) (required) The CPU resource of the plan, in vCPUs. (format: float)
     - `ramResource`: (number) (required) The memory resource of the plan, in megabytes (format: float)

### API reference

GET /v1/plans

#### Example Response

200 OK: A list of available plans.

```json
{
  "data": {
    "plans": [
      {
        "id": "nf-compute-20",
        "name": "nf-compute-20",
        "currency": "usd",
        "amountPerMonth": 4.4,
        "amountPerHour": 0.0061,
        "cpuResource": 0.2,
        "ramResource": 512
      }
    ]
  }
}
```

### CLI reference

$ northflank list plans

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of available plans.

```json
{
  "plans": [
    {
      "id": "nf-compute-20",
      "name": "nf-compute-20",
      "currency": "usd",
      "amountPerMonth": 4.4,
      "amountPerHour": 0.0061,
      "cpuResource": 0.2,
      "ramResource": 512
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.plans({});
```

#### Example Response

 A list of available plans.

```json
{
  "data": {
    "plans": [
      {
        "id": "nf-compute-20",
        "name": "nf-compute-20",
        "currency": "usd",
        "amountPerMonth": 4.4,
        "amountPerHour": 0.0061,
        "cpuResource": 0.2,
        "ramResource": 512
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
