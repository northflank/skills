# Delete project secret

Source: https://northflank.com/docs/v1/api/project/secrets/delete-project-secret.md

Delete a project secret

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `secretId`: (string) (required) ID of the project secret

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/secrets/{secretId}

DELETE /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete secret

Options:

- `--projectId <projectId>`: ID of the project

- `--secretId <secretId>`: ID of the project secret

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
await apiClient.delete.secret({
  parameters: {
    "projectId": "default-project",
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

response = client.delete.secret(
    project_id="default-project",
    secret_id="example-secret",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
