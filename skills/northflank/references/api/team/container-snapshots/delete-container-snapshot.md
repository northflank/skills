# Delete container snapshot

Source: https://northflank.com/docs/v1/api/team/container-snapshots/delete-container-snapshot.md

Soft-deletes an unreferenced terminal container snapshot.

Required permission: Account > Platform > ContainerSnapshots > Delete

**Path parameters:**

{object}
- `snapshotId`: (string) (required) Container snapshot UUID

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

```javascript
await apiClient.delete.containerSnapshot({
  parameters: {}
});
```
