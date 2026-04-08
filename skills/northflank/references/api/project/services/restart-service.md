# Restart service

Source: https://northflank.com/docs/v1/api/project/services/restart-service.md

Restarts the given service.

Required permission: Project > Services > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/restart

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/restart

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank restart service

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.restart.service({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
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
