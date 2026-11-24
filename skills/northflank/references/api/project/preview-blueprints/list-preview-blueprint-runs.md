# List preview blueprint runs

Source: https://northflank.com/docs/v1/api/project/preview-blueprints/list-preview-blueprint-runs.md

Lists runs of a previewBlueprint

Required permission: Project > PreviewBlueprints > Runs > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `previewBlueprintId`: (string) (required) ID of the preview blueprint

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)
- `status`: (string) Filter by template status. (enum: pending, running, success, failure, aborted, aborting, queued, unknown, skipped, waiting, retrying, async_wait, approval_wait)
- `concluded`: (boolean) Filter by whether the template is concluded.

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

GET /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs

GET /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs?per_page=50&page=1&status=success"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs?per_page=50&page=1&status=success"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of runs for this preview blueprint.

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

$ northflank list preview-blueprint-runs

Options:

- `--projectId <projectId>`: ID of the project

- `--previewBlueprintId <previewBlueprintId>`: ID of the preview blueprint

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--status <status>`: Filter by template status.

- `--concluded <concluded>`: Filter by whether the template is concluded.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of runs for this preview blueprint.

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
await apiClient.list.previewBlueprintRuns({
  parameters: {
    "projectId": "default-project",
    "previewBlueprintId": "development"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "status": "success"
  }
});
```

#### Example Response

 A list of runs for this preview blueprint.

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

response = client.list.preview_blueprint_runs(
    preview_blueprint_id="development",
    project_id="default-project",
    page=1,
    per_page=50,
    status="success",
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
