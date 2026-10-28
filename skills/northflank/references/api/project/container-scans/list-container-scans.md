# List container scans

Source: https://northflank.com/docs/v1/api/project/container-scans/list-container-scans.md

Lists container scans for the project, newest first.

Required permission: Project > Projects > Security > View Container Scan Reports

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (format: uuid)

**Response body:**

{object}
- `data`: {object}
  - `containerScans`: [array of] {object}
     - `id`: (string) (required) (format: uuid)
     - `buildId`: (string) (required)
     - `serviceId`: (string) (required)
     - `createdAt`: (string) (required) (format: date-time)
     - `status`: (string) (required) (enum: creating, pending, completed, failed)
     - `error`: {object}
       - `phase`: (string) (required) (enum: launch, scan, timeout)
       - `message`: (string) (required)
       - `at`: (string) (required) (format: date-time)
       - `exitCode`: (integer)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/container-scans

GET /v1/teams/{teamId}/projects/{projectId}/container-scans

#### Example Response

200 OK: A list of container scans.

```json
{
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list container-scans

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of container scans.

```json
undefined
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.containerScans({
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

 A list of container scans.

```json
{
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

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
