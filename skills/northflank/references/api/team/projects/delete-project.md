# Delete project

Source: https://northflank.com/docs/v1/api/team/projects/delete-project.md

Delete the given project. Fails if the project isn't empty.

Required permission: Project > Projects > Manage > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `delete_child_objects`: (boolean) If true, resources belonging to this project will be deleted. Otherwise, an error will be returned if the project is not empty.

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}

DELETE /v1/teams/{teamId}/projects/{projectId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

409 Conflict: The project couldn't be deleted as it has dependencies that have not been deleted

### CLI reference

$ northflank delete project

Options:

- `--projectId <projectId>`: ID of the project

- `--delete_child_objects <delete_child_objects>`: If true, resources belonging to this project will be deleted. Otherwise, an error will be returned if the project is not empty.

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
await apiClient.delete.project({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "delete_child_objects": false
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

response = client.delete.project(
    project_id="default-project",
    delete_child_objects=False,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
