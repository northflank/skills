# Delete volume

Source: https://northflank.com/docs/v1/api/project/volumes/delete-volume.md

Deletes this volume and its associated data.

Required permission: Project > Volumes > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/volumes/{volumeId}

DELETE /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete volume

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

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
await apiClient.delete.volume({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume"
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

response = client.delete.volume(
    project_id="default-project",
    volume_id="example-volume",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
