# Get backup download link

Source: https://northflank.com/docs/v1/api/project/addons/get-backup-download-link.md

Generates a temporary download link for downloading the given backup.

Required permission: Project > Addons > General > Read Spec

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon
- `backupId`: (string) (required) ID of the backup

**Response body:**

{object}
- `data`: {object}
  - `downloadLink`: (string) (required) The url to download the backup from.

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/download-link

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/download-link

#### Example Response

200 OK: A download link to the given backup.

```json
{
  "data": {
    "downloadLink": "https://storage.googleapis.com/..."
  }
}
```

### CLI reference

$ northflank get addon backup download

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--backupId <backupId>`: ID of the backup

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A download link to the given backup.

```json
{
  "downloadLink": "https://storage.googleapis.com/..."
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.addon.backup.download({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon",
    "backupId": "example-backup"
  }
});
```

#### Example Response

 A download link to the given backup.

```json
{
  "data": {
    "downloadLink": "https://storage.googleapis.com/..."
  },
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

response = client.get.addon.backup.download(
    addon_id="example-addon",
    backup_id="example-backup",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "downloadLink": "https://storage.googleapis.com/..."
}
```
