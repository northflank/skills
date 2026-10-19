# Delete AI model

Source: https://northflank.com/docs/v1/api/project/ai-models/delete-ai-model.md

Delete an AI model

Required permission: Project > AiModels > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `llmModelDeploymentId`: (string) (required) ID of the AI model

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/llm-model-deployments/{llmModelDeploymentId}

DELETE /v1/teams/{teamId}/projects/{projectId}/llm-model-deployments/{llmModelDeploymentId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete llm-model-deployment

Options:

- `--projectId <projectId>`: ID of the project

- `--llmModelDeploymentId <llmModelDeploymentId>`: ID of the AI model

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
await apiClient.delete.llmModelDeployment({
  parameters: {
    "projectId": "default-project",
    "llmModelDeploymentId": "deepseek-v3-deployment"
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

response = client.delete.llm_model_deployment(
    llm_model_deployment_id="deepseek-v3-deployment",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
