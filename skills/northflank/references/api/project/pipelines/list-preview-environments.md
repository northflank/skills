# List preview environments

Source: https://northflank.com/docs/v1/api/project/pipelines/list-preview-environments.md

Get a list of active preview environments for a template

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

**Response body:**

{object}
- `data`: {object}
  - `previewEnvironments`: [array of] {object}
     - `id`: (string) (required) Identifier for the preview template environment
     - `vcsData`: {object}
       - `repoUrl`: (string) (required)
     - `paused`: (boolean) Whether the preview environment has been paused.
     - `createdAt`: (string) time of creation (format: date-time)
     - `updatedAt`: (string) time of update (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs/previews

GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs/previews

#### Example Response

200 OK: A list of preview environments for the template.

```json
{
  "data": {
    "previewEnvironments": [
      {
        "id": "clean-step",
        "paused": false
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

$ northflank list pipeline-template-previews

Options:

- `--projectId <projectId>`: ID of the project

- `--pipelineId <pipelineId>`: ID of the pipeline

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of preview environments for the template.

```json
{
  "previewEnvironments": [
    {
      "id": "clean-step",
      "paused": false
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.pipelineTemplatePreviews({
  parameters: {
    "projectId": "default-project",
    "pipelineId": "example-pipeline"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of preview environments for the template.

```json
{
  "data": {
    "previewEnvironments": [
      {
        "id": "clean-step",
        "paused": false
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
