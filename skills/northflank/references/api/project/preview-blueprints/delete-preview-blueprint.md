# Delete preview blueprint

Source: https://northflank.com/docs/v1/api/project/preview-blueprints/delete-preview-blueprint.md

Delete a preview blueprint

Required permission: Project > PreviewBlueprints > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `previewBlueprintId`: (string) (required) ID of the preview blueprint

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}

DELETE /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete preview-blueprint

Options:

- `--projectId <projectId>`: ID of the project

- `--previewBlueprintId <previewBlueprintId>`: ID of the preview blueprint

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
await apiClient.delete.previewBlueprint({
  parameters: {
    "projectId": "default-project",
    "previewBlueprintId": "development"
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

response = client.delete.preview_blueprint(
    preview_blueprint_id="development",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
