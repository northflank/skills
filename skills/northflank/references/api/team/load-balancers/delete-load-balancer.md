# Delete load balancer

Source: https://northflank.com/docs/v1/api/team/load-balancers/delete-load-balancer.md

Deletes the given load balancer.

Required permission: Account > LoadBalancers > General > Delete

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
