# Get service pull requests

Source: https://northflank.com/docs/v1/api/project/services/get-service-pull-requests.md

Gets information about the pull-requests of the given service.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `pullRequests`: [array of] {object}
     - `id`: (integer) (required) ID number of the pull request.
     - `state`: (string) (required) Status of the pull request.
     - `title`: (string) (required) Title of the pull request.
     - `source`: (string) (required) Name of the branch the pull request is merging from.
     - `destination`: (string) (required) Name of the branch the pull request is being merged into.
     - `sha`: (string) (required) SHA of the most recent commit of the pull request.
     - `created_at`: (string) (required) The timestamp the pull request was opened. (format: date-time)
     - `updated_at`: (string) (required) The timestamp the pull request was last updated at. (format: date-time)
     - `html_url`: (string) (required)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/pull-requests

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/pull-requests

#### Example Response

200 OK: Data about the service's available pull requests.

```json
{
  "data": {
    "pullRequests": [
      {
        "id": 1,
        "state": "OPEN",
        "title": "Add new feature handling",
        "source": "feature/new-feature",
        "destination": "main",
        "sha": "4f101d8821aeb3e4f81f95f3e886a2759ba7b9db",
        "created_at": "2021-03-22T11:05:52.000Z",
        "updated_at": "2021-05-11T16:05:43.000Z"
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

$ northflank get service pull-requests

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the service's available pull requests.

```json
{
  "pullRequests": [
    {
      "id": 1,
      "state": "OPEN",
      "title": "Add new feature handling",
      "source": "feature/new-feature",
      "destination": "main",
      "sha": "4f101d8821aeb3e4f81f95f3e886a2759ba7b9db",
      "created_at": "2021-03-22T11:05:52.000Z",
      "updated_at": "2021-05-11T16:05:43.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.pullRequests({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 Data about the service's available pull requests.

```json
{
  "data": {
    "pullRequests": [
      {
        "id": 1,
        "state": "OPEN",
        "title": "Add new feature handling",
        "source": "feature/new-feature",
        "destination": "main",
        "sha": "4f101d8821aeb3e4f81f95f3e886a2759ba7b9db",
        "created_at": "2021-03-22T11:05:52.000Z",
        "updated_at": "2021-05-11T16:05:43.000Z"
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
