# List usage

Source: https://northflank.com/docs/v1/api/org/billing/list-usage.md

Lists hourly usage entries.

Required permission: Account > Billing > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `startTime`: (integer) The Unix timestamp to start from (inclusive).
- `endTime`: (integer) The Unix timestamp to end at (exclusive). Requires startTime.

**Response body:**

{object}
- `data`: {object}
  - `usage`: [array of] {object}
     - `timestamp`: (number) The Unix timestamp of the billing hour. (format: float)
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/billing/usage

GET /v1/teams/{teamId}/billing/usage

#### Example Response

200 OK: A list of hourly usage entries.

```json
{
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list usage

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--startTime <startTime>`: The Unix timestamp to start from (inclusive).

- `--endTime <endTime>`: The Unix timestamp to end at (exclusive). Requires startTime.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of hourly usage entries.

```json
undefined
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.usage({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of hourly usage entries.

```json
{
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
