# List job builds

Source: https://northflank.com/docs/v1/api/project/jobs/list-job-builds.md

Lists builds for the given job.

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
  - `builds`: [array of] {object}
     - `id`: (string) (required) ID of the build.
     - `branch`: (string) Name of the branch the built commit belongs to.
     - `pullRequestId`: (number) ID of the pull request the commit belongs to. (format: float)
     - `status`: (string) The status of the build. (enum: QUEUED, PENDING, UNSCHEDULABLE, STARTING, CLONING, BUILDING, UPLOADING, ABORTED, FAILURE, SUBMISSION_FAILURE, SUCCESS, CRASHED, IN_PROGRESS)
     - `sha`: (string) The sha of the built commit.
     - `registry`: {object}
       - `uri`: (string) URI of that can be used to pull the image from the registry
     - `concluded`: (boolean) Whether the build has finished.
     - `createdAt`: (string) Timestamp of the build initiation.
     - `success`: (boolean) Whether the build was successful.
     - `message`: (string) Description of the build status.
     - `buildConcludedAt`: (number) Timestamp of the build concluding. (format: float)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/build

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build

#### Example Response

200 OK: Returns a list of builds for the given job.

```json
{
  "data": {
    "builds": [
      {
        "id": "joyous-view-6290",
        "branch": "main",
        "status": "SUCCESS",
        "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
        "concluded": true,
        "createdAt": "2021-07-28T15:55:38.296Z",
        "success": true,
        "message": "Image successfully built",
        "buildConcludedAt": 1606237973
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

$ northflank get job builds

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

 Returns a list of builds for the given job.

```json
{
  "builds": [
    {
      "id": "joyous-view-6290",
      "branch": "main",
      "status": "SUCCESS",
      "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
      "concluded": true,
      "createdAt": "2021-07-28T15:55:38.296Z",
      "success": true,
      "message": "Image successfully built",
      "buildConcludedAt": 1606237973
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.job.builds({
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

 Returns a list of builds for the given job.

```json
{
  "data": {
    "builds": [
      {
        "id": "joyous-view-6290",
        "branch": "main",
        "status": "SUCCESS",
        "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
        "concluded": true,
        "createdAt": "2021-07-28T15:55:38.296Z",
        "success": true,
        "message": "Image successfully built",
        "buildConcludedAt": 1606237973
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
