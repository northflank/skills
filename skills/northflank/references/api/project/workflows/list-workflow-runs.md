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
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `runs`: [array of] {object}
     - `id`: (string) (required) Identifier of the run.
     - `name`: (string) Optional name of the run.
     - `description`: (string) Optional description of the run.
     - `apiVersion`: (string) Template API version.
     - `templateId`: (string) Identifier of the template, when available.
     - `environmentId`: (string) Identifier of the preview environment, when available.
     - `status`: (string) (required) Status of the template run (enum: pending, running, success, failure, aborted, aborting, queued, unknown, skipped, waiting, retrying, async_wait, approval_wait)
     - `concluded`: (boolean) (required) Whether execution has concluded.
     - `startedAt`: (string) When execution started. (format: date-time)
     - `concludedAt`: (string) When execution concluded. (format: date-time)
     - `createdAt`: (string) (required) When the run was created. (format: date-time)
     - `updatedAt`: (string) (required) When the run was last updated. (format: date-time)
     - `detailsHidden`: (boolean) (required) Run details include available public results. Sensitive inputs and results are omitted.
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/workflows/{workflowId}/runs

GET /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}/runs

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}/runs?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/workflows/{workflowId}/runs?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of runs for this workflow.

```json
{
  "data": {
    "runs": [
      {
        "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
        "name": "Production deployment",
        "description": "Deploy the latest release.",
        "status": "success",
        "concluded": true,
        "startedAt": "2026-01-01T12:00:00.000Z",
        "concludedAt": "2026-01-01T12:01:00.000Z",
        "createdAt": "2026-01-01T12:00:00.000Z",
        "updatedAt": "2026-01-01T12:01:00.000Z",
        "detailsHidden": false
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
      "name": "Production deployment",
      "description": "Deploy the latest release.",
      "status": "success",
      "concluded": true,
      "startedAt": "2026-01-01T12:00:00.000Z",
      "concludedAt": "2026-01-01T12:01:00.000Z",
      "createdAt": "2026-01-01T12:00:00.000Z",
      "updatedAt": "2026-01-01T12:01:00.000Z",
      "detailsHidden": false
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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
        "name": "Production deployment",
        "description": "Deploy the latest release.",
        "status": "success",
        "concluded": true,
        "startedAt": "2026-01-01T12:00:00.000Z",
        "concludedAt": "2026-01-01T12:01:00.000Z",
        "createdAt": "2026-01-01T12:00:00.000Z",
        "updatedAt": "2026-01-01T12:01:00.000Z",
        "detailsHidden": false
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.workflow_runs(
    project_id="default-project",
    workflow_id="development",
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "runs": [
    {
      "id": "110ddb52-bdcd-482d-8ac2-05ba580afe2f",
      "name": "Production deployment",
      "description": "Deploy the latest release.",
      "status": "success",
      "concluded": true,
      "startedAt": "2026-01-01T12:00:00.000Z",
      "concludedAt": "2026-01-01T12:01:00.000Z",
      "createdAt": "2026-01-01T12:00:00.000Z",
      "updatedAt": "2026-01-01T12:01:00.000Z",
      "detailsHidden": false
    }
  ]
}
```
