# List preview template runs

Source: https://northflank.com/docs/v1/api/project/pipelines/list-preview-template-runs.md

Get a list of preview template runs

Required permission: Account > Templates > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `pipelineId`: (string) (required) ID of the pipeline

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `status`: (string) Filter by template status. (enum: pending, running, success, failure, aborted, aborting, queued, unknown, skipped, waiting, retrying, async_wait, approval_wait)
- `concluded`: (boolean) Filter by whether the template is concluded.

**Response body:**

{object}
- `data`: {object}
  - `previewTemplateRuns`: [array of] {object}
     - `apiVersion`: (string) (required) The version of the Northflank API to run the template against. (enum: v1.2)
     - `options`: {object}
       - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
       - `nameFormat`: (string) The format of the automatically generated preview name. This is a parsed ref string.
       - `prefixName`: (boolean) If true, the preview name will default to the front of the resource name.
       - `useBranchContents`: (boolean) If true, and gitops is enabled, the preview will run based on the contents of the branch that triggered it, rather than the set branch.
       - `schedule`: {object}
         - `mon`: {object}
           - `startTime`: (integer)
           - `endTime`: (integer)
         - `tue`: {object}
           - `startTime`: (integer)
           - `endTime`: (integer)
         - `wed`: {object}
           - `startTime`: (integer)
           - `endTime`: (integer)
         - `thu`: {object}
           - `startTime`: (integer)
           - `endTime`: (integer)
         - `fri`: {object}
           - `startTime`: (integer)
           - `endTime`: (integer)
         - `sat`: {object}
           - `startTime`: (integer)
           - `endTime`: (integer)
         - `sun`: {object}
           - `startTime`: (integer)
           - `endTime`: (integer)
       - `expiry`: {object}
         - `previewLifetime`: (integer) If set, preview environments will be automatically deleted after this many minutes since their last update.
         - `resetOnUpdate`: (boolean) If `true`, the expiry time for an existing preview will be reset when it is ran again.
     - `id`: (string) (required) Identifier for the template run
     - `templateId`: (string) (required) Identifier for the template
     - `status`: (string) (required) Status of the template run (enum: pending, running, success, failure)
     - `createdAt`: (string) time of creation (format: date-time)
     - `updatedAt`: (string) time of update (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs

GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs

#### Example Response

200 OK: A list of preview template runs.

```json
{
  "data": {
    "previewTemplateRuns": [
      {
        "apiVersion": "v1.2",
        "options": {
          "concurrencyPolicy": "allow"
        },
        "id": "3dd592f6-ce63-45ee-acf8-13dc5ec5235c",
        "templateId": "example-template",
        "status": "pending"
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

$ northflank list preview-template-runs

Options:

- `--projectId <projectId>`: ID of the project

- `--pipelineId <pipelineId>`: ID of the pipeline

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--status <status>`: Filter by template status.

- `--concluded <concluded>`: Filter by whether the template is concluded.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of preview template runs.

```json
{
  "previewTemplateRuns": [
    {
      "apiVersion": "v1.2",
      "options": {
        "concurrencyPolicy": "allow"
      },
      "id": "3dd592f6-ce63-45ee-acf8-13dc5ec5235c",
      "templateId": "example-template",
      "status": "pending"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.previewTemplateRuns({
  parameters: {
    "projectId": "default-project",
    "pipelineId": "example-pipeline"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "status": "success"
  }
});
```

#### Example Response

 A list of preview template runs.

```json
{
  "data": {
    "previewTemplateRuns": [
      {
        "apiVersion": "v1.2",
        "options": {
          "concurrencyPolicy": "allow"
        },
        "id": "3dd592f6-ce63-45ee-acf8-13dc5ec5235c",
        "templateId": "example-template",
        "status": "pending"
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
