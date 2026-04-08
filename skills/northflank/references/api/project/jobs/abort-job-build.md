# Abort job build

Source: https://northflank.com/docs/v1/api/project/jobs/abort-job-build.md

Aborts the given job build

Required permission: Project > Jobs > Deployment > Deploy Build

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job
- `buildId`: (string) (required) ID of the job build

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/projects/{projectId}/jobs/{jobId}/build/{buildId}

DELETE /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build/{buildId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank abort job build

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--buildId <buildId>`: ID of the job build

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
await apiClient.abort.job.build({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job",
    "buildId": "joyous-view-6290"
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
