# Delete service

Source: https://northflank.com/docs/v1/api/project/services/delete-service.md

Deletes the given service.

Required permission: Project > Services > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Query parameters:**

{object}
- `delete_child_objects`: (boolean) If true, platform volumes owned by or attached to this service are also deleted. Per-replica statefulSet volumes are service-owned and always deleted with the service.

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/services/{serviceId}

DELETE /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete service

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--delete_child_objects <delete_child_objects>`: If true, platform volumes owned by or attached to this service are also deleted. Per-replica statefulSet volumes are service-owned and always deleted with the service.

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
await apiClient.delete.service({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
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
