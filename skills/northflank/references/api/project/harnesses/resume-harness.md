# Resume harness

Source: https://northflank.com/docs/v1/api/project/harnesses/resume-harness.md

Resumes the given harness, restoring its deployment.

Required permission: Project > Harnesses > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `harnessId`: (string) (required) ID of the harness

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/harnesses/{harnessId}/resume

POST /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}/resume

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

409 Conflict: The harness could not be resumed as it is not paused.

### CLI reference

$ northflank resume harness

Options:

- `--projectId <projectId>`: ID of the project

- `--harnessId <harnessId>`: ID of the harness

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
await apiClient.resume.harness({
  parameters: {
    "projectId": "default-project",
    "harnessId": "example-harness"
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

response = client.resume.harness(
    harness_id="example-harness",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
