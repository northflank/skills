# Get service branches

Source: https://northflank.com/docs/v1/api/project/services/get-service-branches.md

Gets information about the branches of the given service.

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
  - `branches`: [array of] {object}
     - `name`: (string) (required) Name of the branch.
     - `id`: (string) (required)
     - `commit`: {object}
       - `sha`: (string) (required) SHA identifier of the commit.
       - `author`: {object}
         - `login`: (string) (required) The login of the commit author.
       - `message`: (string) Commit message of the commit.
       - `date`: (string) Timestamp of the commit. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/branches

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/branches

#### Example Response

200 OK: Data about the service's available branches.

```json
{
  "data": {
    "branches": [
      {
        "name": "main",
        "id": "MDM6UmVmMzA0MDU5MzM0OnJlZnMvaGVhZHMvbWFpbg=",
        "commit": {
          "sha": "f8aca180e989be62cba71db629d2ede05f2d10c4",
          "author": {
            "login": "northflank"
          },
          "message": "Initial commit",
          "date": "2021-09-17T14:04:39.000Z"
        }
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

$ northflank get service branches

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

 Data about the service's available branches.

```json
{
  "branches": [
    {
      "name": "main",
      "id": "MDM6UmVmMzA0MDU5MzM0OnJlZnMvaGVhZHMvbWFpbg=",
      "commit": {
        "sha": "f8aca180e989be62cba71db629d2ede05f2d10c4",
        "author": {
          "login": "northflank"
        },
        "message": "Initial commit",
        "date": "2021-09-17T14:04:39.000Z"
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.branches({
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

 Data about the service's available branches.

```json
{
  "data": {
    "branches": [
      {
        "name": "main",
        "id": "MDM6UmVmMzA0MDU5MzM0OnJlZnMvaGVhZHMvbWFpbg=",
        "commit": {
          "sha": "f8aca180e989be62cba71db629d2ede05f2d10c4",
          "author": {
            "login": "northflank"
          },
          "message": "Initial commit",
          "date": "2021-09-17T14:04:39.000Z"
        }
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
