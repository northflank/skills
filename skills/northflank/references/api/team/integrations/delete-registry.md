# Delete registry

Source: https://northflank.com/docs/v1/api/team/integrations/delete-registry.md

Deletes a set of registry credential data.

Required permission: Account > Cloud > Registries > Delete

**Path parameters:**

{object}
- `credentialId`: (string) (required) ID of the registry credential

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/integrations/registries/{credentialId}

DELETE /v1/teams/{teamId}/integrations/registries/{credentialId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete registry-credentials

Options:

- `--credentialId <credentialId>`: ID of the registry credential

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
await apiClient.delete.registryCredentials({
  parameters: {
    "credentialId": "example-credentials"
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

response = client.delete.registry_credentials(
    credential_id="example-credentials",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
