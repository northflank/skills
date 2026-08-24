# Pause harness

Source: https://northflank.com/docs/v1/api/project/harnesses/pause-harness.md

Pauses the given harness, scaling its deployment to zero.

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

POST /v1/projects/{projectId}/harnesses/{harnessId}/pause

POST /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}/pause

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

409 Conflict: The harness could not be paused as it is already paused.

### CLI reference

$ northflank pause harness

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
await apiClient.pause.harness({
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
