# Get pipeline

Source: https://northflank.com/docs/v1/api/project/pipelines/get-pipeline.md

Get details about a pipeline

Required permission: Project > Pipelines > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `pipelineId`: (string) (required) ID of the pipeline

**Response body:**

{object}
- `data`: {object}
  - `name`: (multiple options) (string) The name of the pipeline. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39) | (string) A string containing one or more references that resolve to the name of the pipeline. (pattern: .*\${.*}.*)
  - `description`: (multiple options) (string) A description of the pipeline. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200) | (string) A string containing one or more references that resolve to a description of the pipeline. (pattern: .*\${.*}.*)
  - `preview`: {object}
  - `stages`: [array of] (undefined)
  - `nfObjects`: [array of] {object}
     - `id`: (multiple options) (string) The ID of the service, job or addon to include in the pipeline. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the service, job or addon to include in the pipeline. (pattern: .*\${.*}.*)
     - `type`: (string) (required) The type of the resource to include in the pipeline. (enum: service, job, addon)
     - `stage`: (string) (required) The stage in the pipeline to include the resource. (enum: Development, Staging, Production)

### API reference

GET /v1/projects/{projectId}/pipelines/{pipelineId}

GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}

#### Example Response

200 OK: Details about a pipeline.

```json
{
  "data": {
    "name": "example-pipeline",
    "nfObjects": [
      {
        "id": "example-service",
        "type": "service",
        "stage": "Production"
      }
    ]
  }
}
```

### CLI reference

$ northflank get pipeline

Options:

- `--projectId <projectId>`: ID of the project

- `--pipelineId <pipelineId>`: ID of the pipeline

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about a pipeline.

```json
{
  "name": "example-pipeline",
  "nfObjects": [
    {
      "id": "example-service",
      "type": "service",
      "stage": "Production"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.pipeline({
  parameters: {
    "projectId": "default-project",
    "pipelineId": "example-pipeline"
  }
});
```

#### Example Response

 Details about a pipeline.

```json
{
  "data": {
    "name": "example-pipeline",
    "nfObjects": [
      {
        "id": "example-service",
        "type": "service",
        "stage": "Production"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
