# Get credit balance

Source: https://northflank.com/docs/v1/api/team/billing/get-credit-balance.md

Gets the credit available to the account, by origin.

Required permission: Organisation > Admin > Billing > Read

**Response body:**

{object}
- `data`: {object}
  - `currency`: (string) The currency code.
  - `total`: {object}
    - `available`: (number) Credit available to spend now, across both sources. A Stripe balance the customer owes does not reduce this — it surfaces as an unpaid invoice instead. (format: float)
    - `pending`: (number) Credit granted but not yet available. Only credit grants have a pending state. (format: float)
  - `grants`: {object}
    - `available`: (number) Credit-grant balance available to spend now. (format: float)
    - `pending`: (number) Credit granted but not yet available. (format: float)
  - `customerBalance`: {object}
    - `amount`: (number) A balance adjustment applied directly against the customer, e.g. a manually issued credit. Positive is credit in the customer's favour; negative is an amount owed. Only the credit direction counts toward `total.available`. (format: float)
  - `lastSyncedAt`: (string) When the credit balance was last synchronized with Stripe. (format: date-time)

### API reference

GET /v1/billing/credit-balance

GET /v1/teams/{teamId}/billing/credit-balance

#### Example Response

200 OK: The account credit balance.

```json
{
  "data": {
    "currency": "usd"
  }
}
```

### CLI reference

$ northflank get credit-balance

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The account credit balance.

```json
{
  "currency": "usd"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.creditBalance({});
```

#### Example Response

 The account credit balance.

```json
{
  "data": {
    "currency": "usd"
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

response = client.get.credit_balance()
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "currency": "usd"
}
```
