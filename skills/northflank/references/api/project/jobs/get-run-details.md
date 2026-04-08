# Get run details

Source: https://northflank.com/docs/v1/api/project/jobs/get-run-details.md

Returns data about the given job run

Required permission: Project > Jobs > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job
- `runId`: (string) (required) ID of the job run

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) The ID of the job run
  - `active`: (integer) (required) Whether the run is currently in progress (enum: 0, 1)
  - `backoffLimit`: (integer) (required) The number of attempts to retry this job run before it is marked as failed.
  - `completions`: (integer) (required) The number of times this job run has concluded successfully or with an error.
  - `concluded`: (boolean) (required) Has the job run finished?
  - `failed`: (integer) (required) Whether this job run failed to complete successfully (enum: 0, 1)
  - `runName`: (string) (required) The name of the job run
  - `status`: (string) (required) A string representing the status of the job. Either SUCCESS, RUNNING or FAILED (enum: SUCCESS, RUNNING, FAILED)
  - `succeeded`: (integer) (required) Whether this job run completed successfully (enum: 0, 1)
  - `startedAt`: (string) (required) The timestamp when the job run started.
  - `concludedAt`: (string) (required) The timestamp when the job run concluded.

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/runs/{runId}

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runs/{runId}

#### Example Response

200 OK: Details about the given job run.

```json
{
  "data": {
    "id": "d34582a4-35bd-4c71-8e7c-e36999b88723",
    "active": 0,
    "backoffLimit": 0,
    "completions": 1,
    "concluded": true,
    "failed": 0,
    "runName": "example-job-5fcf67bc56e1913e21d49504",
    "status": "SUCCESS",
    "succeeded": 0,
    "startedAt": "2020-12-08T11:47:08Z",
    "concludedAt": "2020-12-08T11:52:08Z"
  }
}
```

### CLI reference

$ northflank get job run

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--runId <runId>`: ID of the job run

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the given job run.

```json
{
  "id": "d34582a4-35bd-4c71-8e7c-e36999b88723",
  "active": 0,
  "backoffLimit": 0,
  "completions": 1,
  "concluded": true,
  "failed": 0,
  "runName": "example-job-5fcf67bc56e1913e21d49504",
  "status": "SUCCESS",
  "succeeded": 0,
  "startedAt": "2020-12-08T11:47:08Z",
  "concludedAt": "2020-12-08T11:52:08Z"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.job.run({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job",
    "runId": "d34582a4-35bd-4c71-8e7c-e36999b88723"
  }
});
```

#### Example Response

 Details about the given job run.

```json
{
  "data": {
    "id": "d34582a4-35bd-4c71-8e7c-e36999b88723",
    "active": 0,
    "backoffLimit": 0,
    "completions": 1,
    "concluded": true,
    "failed": 0,
    "runName": "example-job-5fcf67bc56e1913e21d49504",
    "status": "SUCCESS",
    "succeeded": 0,
    "startedAt": "2020-12-08T11:47:08Z",
    "concludedAt": "2020-12-08T11:52:08Z"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
