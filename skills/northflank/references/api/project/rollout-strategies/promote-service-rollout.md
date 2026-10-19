# Promote service rollout

Source: https://northflank.com/docs/v1/api/project/rollout-strategies/promote-service-rollout.md

Promotes the canary deployment of the active gradual rollout to stable, routing all traffic to it. This is idempotent: promoting an already promoted rollout succeeds without changing anything.

Required permission: Project > Services > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/rollout/promote

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout/promote

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

404 Not Found: The service does not have an active gradual rollout.

#### Example Response

409 Conflict: The canary deployment has not finished deploying successfully.

### CLI reference

$ northflank promote service rollout

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

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
await apiClient.promote.service.rollout({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
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

response = client.promote.service.rollout(
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
