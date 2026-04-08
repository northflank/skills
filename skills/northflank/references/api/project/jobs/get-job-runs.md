# Get job runs

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-runs.md

Fetches run history for the given job

Required permission: Project > Jobs > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `runs`: [array of] {object}
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/runs

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runs

#### Example Response

200 OK: A list of runs for this job.

```json
{
  "data": {
    "runs": [
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
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank get job runs

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A list of runs for this job.

```json
{
  "runs": [
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
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.job.runs({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of runs for this job.

```json
{
  "data": {
    "runs": [
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
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
