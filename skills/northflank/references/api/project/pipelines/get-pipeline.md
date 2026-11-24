# Get pipeline

Source: https://northflank.com/docs/v1/api/project/pipelines/get-pipeline.md

Get details about a pipeline

Required permission: Project > Pipelines > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `pipelineId`: (string) (required) ID of the pipeline

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `name`: (multiple options) (required) The name of the pipeline. (string) The name of the pipeline. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39) | (string) A string containing one or more references that resolve to the name of the pipeline. (pattern: .*\${.*}.*)
  - `description`: (multiple options) A description of the pipeline. (string) A description of the pipeline. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200) | (string) A string containing one or more references that resolve to a description of the pipeline. (pattern: .*\${.*}.*)
  - `preview`: {object}
  - `stages`: [array of]
  - `nfObjects`: [array of] A list of services, jobs and addons to include in the pipeline. {object}
     - `id`: (multiple options) (required) The ID of the service, job or addon to include in the pipeline. (string) The ID of the service, job or addon to include in the pipeline. (pattern: ^[A-Za-z0-9-]+$) | (string) A string containing one or more references that resolve to the ID of the service, job or addon to include in the pipeline. (pattern: .*\${.*}.*)
     - `type`: (string) (required) The type of the resource to include in the pipeline. (enum: service, job, addon)
     - `stage`: (string) (required) The stage in the pipeline to include the resource. (enum: Development, Staging, Production)

### API reference

GET /v1/projects/{projectId}/pipelines/{pipelineId}

GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/pipelines/{pipelineId}"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/pipelines/{pipelineId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

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

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.get.pipeline(
    pipeline_id="example-pipeline",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

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
