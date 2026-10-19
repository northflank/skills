# Delete container snapshot

Source: https://northflank.com/docs/v1/api/team/container-snapshots/delete-container-snapshot.md

Soft-deletes an unreferenced terminal container snapshot.

Required permission: Account > Platform > ContainerSnapshots > Delete

**Path parameters:**

{object}
- `snapshotId`: (string) (required) Container snapshot UUID (format: uuid)

### API reference

DELETE /v1/container-snapshots/{snapshotId}

DELETE /v1/teams/{teamId}/container-snapshots/{snapshotId}

#### Example Response

204 No Content: The container snapshot is no longer accessible.

#### Example Response

409 Conflict: The container snapshot is active or still referenced.

### CLI reference

$ northflank delete container-snapshot

Options:

- `--snapshotId <snapshotId>`: Container snapshot UUID

- `--verbose `: Verbose output

- `--quiet `: No console output

- `--force `: Don't ask for confirmation

- `-o --output <format>`: Output formatting

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.delete.containerSnapshot({
  parameters: {
    "snapshotId": "00000000-0000-4000-8000-000000000000"
  }
});
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.delete.container_snapshot(
    snapshot_id="00000000-0000-4000-8000-000000000000",
)
print(response.data)
```
