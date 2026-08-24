# Restart harness

Source: https://northflank.com/docs/v1/api/project/harnesses/restart-harness.md

Restarts the given harness.

Required permission: Project > Harnesses > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `harnessId`: (string) (required) ID of the harness

**Query parameters:**

{object}
- `acknowledgeActiveSessions`: (boolean)

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/harnesses/{harnessId}/restart

POST /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}/restart

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank restart harness

Options:

- `--projectId <projectId>`: ID of the project

- `--harnessId <harnessId>`: ID of the harness

- `--acknowledgeActiveSessions <acknowledgeActiveSessions>`: undefined

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
await apiClient.restart.harness({
  parameters: {
    "projectId": "default-project",
    "harnessId": "example-harness"
  },
  options: {}
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
