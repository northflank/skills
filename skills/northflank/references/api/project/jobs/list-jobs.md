# List jobs

Source: https://northflank.com/docs/v1/api/project/jobs/list-jobs.md

Gets a list of jobs belonging to the project

Required permission: Project > Jobs > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `jobs`: [array of] {object}
     - `id`: (string) (required) Identifier for the job
     - `projectId`: (string) (required) ID of the project that the job belongs to
     - `appId`: (string) (required) Full identifier used for job deployment
     - `name`: (string) (required) Job name
     - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) A short description of the job
     - `jobType`: (string) (required) Type of the job (manual or cron) (enum: manual, cron)
     - `disabledCI`: (boolean) (required) Whether Continuous Integration is disabled
     - `disabledCD`: (boolean) (required) Whether Continuous Deployment is disabled
     - `suspended`: (boolean) Cron specific. Whether or not the job's automatic scheduling is suspended
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/jobs

GET /v1/teams/{teamId}/projects/{projectId}/jobs

#### Example Response

200 OK: A list of jobs belonging to the project.

```json
{
  "data": {
    "jobs": [
      {
        "id": "example-job",
        "projectId": "default-project",
        "appId": "/example-user/default-project/example-job",
        "name": "Example Job",
        "description": "This is the job description",
        "jobType": "cron",
        "disabledCI": false,
        "disabledCD": false,
        "suspended": false
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

$ northflank list jobs

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of jobs belonging to the project.

```json
{
  "jobs": [
    {
      "id": "example-job",
      "projectId": "default-project",
      "appId": "/example-user/default-project/example-job",
      "name": "Example Job",
      "description": "This is the job description",
      "jobType": "cron",
      "disabledCI": false,
      "disabledCD": false,
      "suspended": false
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.jobs({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of jobs belonging to the project.

```json
{
  "data": {
    "jobs": [
      {
        "id": "example-job",
        "projectId": "default-project",
        "appId": "/example-user/default-project/example-job",
        "name": "Example Job",
        "description": "This is the job description",
        "jobType": "cron",
        "disabledCI": false,
        "disabledCD": false,
        "suspended": false
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
