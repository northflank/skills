# Delete integration

Source: https://northflank.com/docs/v1/api/org/cloud-providers/delete-integration.md

Delete the given integration. Fails if the integration is associated with existing clusters.

Required permission: Account > Cloud > Integrations > Delete

**Path parameters:**

{object}
- `integrationId`: (string) (required) ID of the provider integration

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/cloud-providers/integrations/{integrationId}

DELETE /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

409 Conflict: The integration couldn't be deleted as it has dependencies that have not been deleted

### CLI reference

$ northflank delete cloud integration

Options:

- `--integrationId <integrationId>`: ID of the provider integration

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
await apiClient.delete.cloud.integration({
  parameters: {
    "integrationId": "gcp-integration-1"
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

response = client.delete.cloud.integration(
    integration_id="gcp-integration-1",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
