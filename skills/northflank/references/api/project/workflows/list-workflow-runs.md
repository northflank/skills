# List workflow runs

Source: https://northflank.com/docs/v1/api/project/workflows/list-workflow-runs.md

Lists runs of a workflow

Required permission: Project > Workflows > Runs > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `workflowId`: (string) (required) ID of the workflow

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `runs`: [array of] {object}
     - `id`: (string) (required) ID of the workflow run
     - `name`: (string) Optional name for the workflow run
     - `description`: (string) Optional description for the workflow run
     - `status`: (string) (required) Status of the template run (enum: pending, running, success, failure, aborted, aborting, queued, unknown, skipped, waiting, retrying, async_wait, approval_wait)
     - `startedAt`: (string) Timestamp the run started at. (format: date-time)
     - `concluded`: (boolean) (required) Whether the run has concluded (aborted, success, failed)
     - `concludedAt`: (string) Timestamp the run concluded at. (format: date-time)
     - `createdAt`: (string) (required) Timestamp the run was created at. (format: date-time)
     - `updatedAt`: (string) (required) Timestamp the run was last updated at. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/workflows/{workflowId}/runs

GET /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}/runs

#### Example Response

200 OK: A list of runs for this workflow.

```json
{
  "data": {
    "runs": [
      {
        "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
        "name": "Example run",
        "description": "This is an example description",
        "status": "success",
        "startedAt": "2021-01-01 12:01:00.000Z",
        "concluded": true,
        "concludedAt": "2021-01-01 12:10:00.000Z",
        "createdAt": "2021-01-01 12:00:00.000Z",
        "updatedAt": "2021-01-01 12:00:00.000Z"
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

$ northflank list workflow-runs

Options:

- `--projectId <projectId>`: ID of the project

- `--workflowId <workflowId>`: ID of the workflow

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of runs for this workflow.

```json
{
  "runs": [
    {
      "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
      "name": "Example run",
      "description": "This is an example description",
      "status": "success",
      "startedAt": "2021-01-01 12:01:00.000Z",
      "concluded": true,
      "concludedAt": "2021-01-01 12:10:00.000Z",
      "createdAt": "2021-01-01 12:00:00.000Z",
      "updatedAt": "2021-01-01 12:00:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.workflowRuns({
  parameters: {
    "projectId": "default-project",
    "workflowId": "development"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of runs for this workflow.

```json
{
  "data": {
    "runs": [
      {
        "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
        "name": "Example run",
        "description": "This is an example description",
        "status": "success",
        "startedAt": "2021-01-01 12:01:00.000Z",
        "concluded": true,
        "concludedAt": "2021-01-01 12:10:00.000Z",
        "createdAt": "2021-01-01 12:00:00.000Z",
        "updatedAt": "2021-01-01 12:00:00.000Z"
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
