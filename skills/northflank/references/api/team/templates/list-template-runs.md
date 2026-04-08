# List template runs

Source: https://northflank.com/docs/v1/api/team/templates/list-template-runs.md

Get a list of template runs

Required permission: Account > Templates > General > Read

**Path parameters:**

{object}
- `templateId`: (string) (required) ID of the template

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
  - `templateRuns`: [array of] {object}
     - `name`: (string) (required) Name of the template. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) Description of the template. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `apiVersion`: (string) (required) The version of the Northflank API to run the template against. (enum: v1.2)
     - `options`: {object}
       - `autorun`: (boolean) If true, the template will run automatically whenever a change is made to it.
       - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
     - `id`: (string) (required) Identifier for the template run
     - `templateId`: (string) (required) Identifier for the template
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

GET /v1/templates/{templateId}/runs

GET /v1/teams/{teamId}/templates/{templateId}/runs

#### Example Response

200 OK: A list of template runs.

```json
{
  "data": {
    "templateRuns": [
      {
        "name": "Example Template",
        "description": "This is a sample template.",
        "apiVersion": "v1.2",
        "options": {
          "autorun": false,
          "concurrencyPolicy": "allow"
        },
        "id": "3dd592f6-ce63-45ee-acf8-13dc5ec5235c",
        "templateId": "example-template",
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

$ northflank list template-runs

Options:

- `--templateId <templateId>`: ID of the template

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--status <status>`: Filter by template status.

- `--concluded <concluded>`: Filter by whether the template is concluded.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of template runs.

```json
{
  "templateRuns": [
    {
      "name": "Example Template",
      "description": "This is a sample template.",
      "apiVersion": "v1.2",
      "options": {
        "autorun": false,
        "concurrencyPolicy": "allow"
      },
      "id": "3dd592f6-ce63-45ee-acf8-13dc5ec5235c",
      "templateId": "example-template",
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
await apiClient.list.templateRuns({
  parameters: {
    "templateId": "example-template"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "status": "success"
  }
});
```

#### Example Response

 A list of template runs.

```json
{
  "data": {
    "templateRuns": [
      {
        "name": "Example Template",
        "description": "This is a sample template.",
        "apiVersion": "v1.2",
        "options": {
          "autorun": false,
          "concurrencyPolicy": "allow"
        },
        "id": "3dd592f6-ce63-45ee-acf8-13dc5ec5235c",
        "templateId": "example-template",
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
