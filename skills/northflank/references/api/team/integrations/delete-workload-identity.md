# Delete workload identity

Source: https://northflank.com/docs/v1/api/team/integrations/delete-workload-identity.md

Deletes a workload identity.

Required permission: Account > Cloud > WorkloadIdentities > Delete

**Path parameters:**

{object}
- `workloadIdentityId`: (string) (required) ID of the workload identity

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/workload-identities/{workloadIdentityId}

DELETE /v1/teams/{teamId}/workload-identities/{workloadIdentityId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete workload-identities

Options:

- `--workloadIdentityId <workloadIdentityId>`: ID of the workload identity

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
await apiClient.delete.workloadIdentities({
  parameters: {
    "workloadIdentityId": "example-workload-identity"
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

response = client.delete.workload_identities(
    workload_identity_id="example-workload-identity",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
