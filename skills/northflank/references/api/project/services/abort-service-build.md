# Abort service build

Source: https://northflank.com/docs/v1/api/project/services/abort-service-build.md

Aborts the given service build

Required permission: Project > Services > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service
- `buildId`: (string) (required) ID of the service build

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/services/{serviceId}/build/{buildId}

DELETE /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build/{buildId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank abort service build

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--buildId <buildId>`: ID of the service build

- `--verbose `: Verbose output

- `--quiet `: No console output

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
await apiClient.abort.service.build({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service",
    "buildId": "joyous-view-6290"
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

response = client.abort.service.build(
    build_id="joyous-view-6290",
    project_id="default-project",
    service_id="example-service",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
