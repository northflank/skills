# Delete job

Source: https://northflank.com/docs/v1/api/project/jobs/delete-job.md

Deletes the given job.

Required permission: Project > Jobs > General > Delete

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/jobs/{jobId}

DELETE /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete job

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

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
await apiClient.delete.job({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
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
