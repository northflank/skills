# Delete cluster

Source: https://northflank.com/docs/v1/api/team/cloud-providers/delete-cluster.md

Delete the given cluster. Fails if the cluster has associated projects.

Required permission: Account > Cloud > Clusters > Delete

**Path parameters:**

{object}
- `clusterId`: (string) (required) ID of the cluster

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/cloud-providers/clusters/{clusterId}

DELETE /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

409 Conflict: The cluster couldn't be deleted as it has dependencies that have not been deleted

### CLI reference

$ northflank delete cloud cluster

Options:

- `--clusterId <clusterId>`: ID of the cluster

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

```javascript
await apiClient.delete.cloud.cluster({
  parameters: {
    "clusterId": "gcp-cluster-1"
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
