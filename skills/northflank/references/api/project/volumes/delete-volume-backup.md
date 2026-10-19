# Delete volume backup

Source: https://northflank.com/docs/v1/api/project/volumes/delete-volume-backup.md

Delete the volume backup

Required permission: Project > Volumes > Backups > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `volumeId`: (string) (required) ID of the volume
- `backupId`: (string) (required) ID of the backup

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/volumes/{volumeId}/backups/{backupId}

DELETE /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups/{backupId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete volume backup

Options:

- `--projectId <projectId>`: ID of the project

- `--volumeId <volumeId>`: ID of the volume

- `--backupId <backupId>`: ID of the backup

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
await apiClient.delete.volume.backup({
  parameters: {
    "projectId": "default-project",
    "volumeId": "example-volume",
    "backupId": "example-backup"
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

response = client.delete.volume.backup(
    backup_id="example-backup",
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
