# Delete global secret

Source: https://northflank.com/docs/v1/api/team/secrets/delete-global-secret.md

Delete a global secret

**Path parameters:**

{object}
- `secretId`: (string) (required) ID of the secret

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/secrets/{secretId}

DELETE /v1/teams/{teamId}/secrets/{secretId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete global-secret

Options:

- `--secretId <secretId>`: ID of the secret

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
await apiClient.delete.globalSecret({
  parameters: {
    "secretId": "example-secret"
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

response = client.delete.global_secret(
    secret_id="example-secret",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
