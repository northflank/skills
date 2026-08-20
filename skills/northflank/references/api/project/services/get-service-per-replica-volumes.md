# Get service per-replica volumes

Source: https://northflank.com/docs/v1/api/project/services/get-service-per-replica-volumes.md

Lists the per-replica statefulSet volumes for the given service.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}
  - `volumes`: [array of] {object}
     - `id`: (string) (required) The user-facing slug of the volume definition, or null when the definition has already been purged but a retained PVC is still being reported.
     - `slug`: (string) Best-effort display slug for a purged (definitionMissing) group, recovered from the PVC labels so the group keeps its original name. Equal to `id` when the definition exists.
     - `definitionMissing`: (boolean) (required) True when the volume definition no longer exists. Its retained PVCs remain individually deletable, but the group DELETE endpoint cannot target the missing definition.
     - `pendingDelete`: (boolean) (required) True if the volume has been removed from the service and only its retained orphaned PVCs remain. When definitionMissing is false, the group can be fully deleted via the group DELETE endpoint; definition-missing groups are reclaimed by background cleanup.
     - `cleanupPending`: (boolean) (required) True when the group's definition is already purged and the background reaper owns removing the retained PVCs — no manual delete is possible (its replicas report deletable: false).
     - `replicas`: [array of] {object}
         - `ordinal`: (number) (required) The statefulSet replica ordinal this PVC belongs to. (format: float)
         - `pvcName`: (string) (required) The name of the per-replica PVC.
         - `deletable`: (boolean) (required) True if the PVC can be deleted now via the per-replica DELETE endpoint: it is orphaned (its volume was removed or its ordinal is scaled down) AND its volume definition still exists. Bound PVCs are refused with 409; claims of a purged volume are false (see group cleanupPending).

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/per-replica-volumes

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/per-replica-volumes

#### Example Response

200 OK: The list of per-replica volumes for the service.

```json
undefined
```

### CLI reference

$ northflank get service per-replica-volumes

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The list of per-replica volumes for the service.

```json
undefined
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.perReplicaVolumes({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 The list of per-replica volumes for the service.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
