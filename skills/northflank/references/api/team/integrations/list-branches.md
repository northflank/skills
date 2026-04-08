# List branches

Source: https://northflank.com/docs/v1/api/team/integrations/list-branches.md

Gets a list of branches for the repo

Required permission: Account > Git > General > Read

**Path parameters:**

{object}
- `vcsService`: (string) (required) Version control provider of the repository
- `repositoryOwner`: (string) (required) Name of the owner of the repository
- `repositoryName`: (string) (required) Name of the repository

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `vcs_link_id`: (string) If provided, uses the given VCS link to access the repository's data.

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

GET /v1/integrations/vcs/repos/{vcsService}/{repositoryOwner}/{repositoryName}/branches

GET /v1/teams/{teamId}/integrations/vcs/repos/{vcsService}/{repositoryOwner}/{repositoryName}/branches

#### Example Response

200 OK: The list of branches.

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

$ northflank list branches

Options:

- `--vcsService <vcsService>`: Version control provider of the repository

- `--repositoryOwner <repositoryOwner>`: Name of the owner of the repository

- `--repositoryName <repositoryName>`: Name of the repository

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--vcs_link_id <vcs_link_id>`: If provided, uses the given VCS link to access the repository's data.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of branches.

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
await apiClient.list.branches({
  parameters: {
    "vcsService": "github",
    "repositoryOwner": "northflank-examples",
    "repositoryName": "next-js-example"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 The list of branches.

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
