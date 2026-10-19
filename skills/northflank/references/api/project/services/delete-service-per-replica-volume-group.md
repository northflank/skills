# Delete service per-replica volume group

Source: https://northflank.com/docs/v1/api/project/services/delete-service-per-replica-volume-group.md

Fully deletes a removed per-replica statefulSet volume for the given service: all of its orphaned PVCs and the volume definition. The volume must first be removed from the service.

Required permission: Project > Services > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service
- `volumeId`: (string) (required) ID of the per-replica volume

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/services/{serviceId}/per-replica-volumes/volume/{volumeId}

DELETE /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/per-replica-volumes/volume/{volumeId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete service per-replica-volume-group

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--volumeId <volumeId>`: ID of the per-replica volume

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
await apiClient.delete.service.perReplicaVolumeGroup({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service",
    "volumeId": "data"
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

response = client.delete.service.per_replica_volume_group(
    project_id="default-project",
    service_id="example-service",
    volume_id="data",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
