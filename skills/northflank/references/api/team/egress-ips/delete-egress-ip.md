# Delete egress IP

Source: https://northflank.com/docs/v1/api/team/egress-ips/delete-egress-ip.md

Deletes the given egress IP.

Required permission: Account > Networking > EgressIps > Delete

**Path parameters:**

{object}
- `egressIpId`: (string) (required) ID of the egress IP

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/egress-ips/{egressIpId}

DELETE /v1/teams/{teamId}/egress-ips/{egressIpId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete egress-ip

Options:

- `--egressIpId <egressIpId>`: ID of the egress IP

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
await apiClient.delete.egressIp({
  parameters: {
    "egressIpId": "my-egress-ip"
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

response = client.delete.egress_ip(
    egress_ip_id="my-egress-ip",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
