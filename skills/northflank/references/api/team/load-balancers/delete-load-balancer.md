# Delete load balancer

Source: https://northflank.com/docs/v1/api/team/load-balancers/delete-load-balancer.md

Deletes the given load balancer.

Required permission: Account > Networking > LoadBalancers > Delete

**Path parameters:**

{object}
- `loadBalancerId`: (string) (required) ID of the load balancer

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/load-balancers/{loadBalancerId}

DELETE /v1/teams/{teamId}/load-balancers/{loadBalancerId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete load-balancer

Options:

- `--loadBalancerId <loadBalancerId>`: ID of the load balancer

- `--verbose `: Verbose output

- `--quiet `: No console output

- `--force `: Don't ask for confirmation

- `-o --output <format>`: Output formatting

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.delete.loadBalancer({
  parameters: {
    "loadBalancerId": "my-load-balancer"
  }
});
```

#### Example Response

 The operation was performed successfully.

```json
{
  "data": {},
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

response = client.delete.load_balancer(
    load_balancer_id="my-load-balancer",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
