# Delete service per-replica volume PVC

Source: https://northflank.com/docs/v1/api/project/services/delete-service-per-replica-volume-pvc.md

Deletes one orphaned per-replica statefulSet volume PVC — a scaled-down ordinal, or a replica of a removed volume. Replicas still bound to a running instance are refused with 409.

Required permission: Project > Services > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service
- `volumeId`: (string) (required) ID of the per-replica volume
- `ordinal`: (string) (required) StatefulSet replica ordinal the PVC belongs to

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/services/{serviceId}/per-replica-volumes/volume/{volumeId}/replica/{ordinal}

DELETE /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/per-replica-volumes/volume/{volumeId}/replica/{ordinal}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete service per-replica-volume

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--volumeId <volumeId>`: ID of the per-replica volume

- `--ordinal <ordinal>`: StatefulSet replica ordinal the PVC belongs to

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
await apiClient.delete.service.perReplicaVolume({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service",
    "volumeId": "data",
    "ordinal": "2"
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
