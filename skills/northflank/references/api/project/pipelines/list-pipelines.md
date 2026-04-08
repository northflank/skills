# List pipelines

Source: https://northflank.com/docs/v1/api/project/pipelines/list-pipelines.md

Lists all pipelines for a project

Required permission: Project > Pipelines > General > Read

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
  - `pipelines`: [array of] {object}
     - `name`: (multiple options) (string) The name of the pipeline. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39) | (string) A string containing one or more references that resolve to the name of the pipeline. (pattern: .*\${.*}.*)
     - `description`: (multiple options) (string) A description of the pipeline. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200) | (string) A string containing one or more references that resolve to a description of the pipeline. (pattern: .*\${.*}.*)
     - `id`: (string) (required) Identifier for the pipeline
     - `createdAt`: (string) time of creation (format: date-time)
     - `updatedAt`: (string) time of update (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/pipelines

GET /v1/teams/{teamId}/projects/{projectId}/pipelines

#### Example Response

200 OK: A list of pipelines belong to the project.

```json
{
  "data": {
    "pipelines": [
      {
        "name": "example-pipeline",
        "id": "example-pipeline"
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

$ northflank list pipelines

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of pipelines belong to the project.

```json
{
  "pipelines": [
    {
      "name": "example-pipeline",
      "id": "example-pipeline"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.pipelines({
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

 A list of pipelines belong to the project.

```json
{
  "data": {
    "pipelines": [
      {
        "name": "example-pipeline",
        "id": "example-pipeline"
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
