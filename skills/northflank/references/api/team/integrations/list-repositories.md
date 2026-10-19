# List repositories

Source: https://northflank.com/docs/v1/api/team/integrations/list-repositories.md

Gets a list of repositories accessible to this account

Required permission: Account > Git > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)
- `vcs_service`: (string) If provided, only returns repositories belonging to this version control provider. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
- `self_hosted_vcs_id`: (string) If provided, only returns repositories belonging to this self-hosted version control provider.
- `account_login`: (string) If provided, only returns repositories that can be accessed by the linked version control account with this name.
- `vcs_link_id`: (string) If provided, only returns repositories belong to that VCS link. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `repos`: [array of] {object}
     - `vcsService`: (string) (required) Version control provider of the repository. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
     - `selfHostedVcsId`: (string) If `vcsService` is `self-hosted`, the ID of the self-hosted provider.
     - `id`: (string) (required) The repository identifier assigned by the version control provider. Northflank always returns it as a string.
     - `name`: (string) (required) The name of the repository.
     - `full_name`: (string) (required) The full name of the repository.
     - `url`: (string) (required) The url of the repository.
     - `owner`: {object}
       - `login`: (string) (required) The login of the repository owner.
     - `accountLogin`: (string) (required) The login of the linked version control account that can access this repository.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/integrations/vcs/repos

GET /v1/teams/{teamId}/integrations/vcs/repos

#### Example Response

200 OK: The list of repos.

```json
{
  "data": {
    "repos": [
      {
        "vcsService": "github",
        "id": "123456789",
        "name": "project",
        "full_name": "example/project",
        "url": "https://github.com/example/project",
        "owner": {
          "login": "example"
        },
        "accountLogin": "example-user"
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

$ northflank list repos

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--vcs_service <vcs_service>`: If provided, only returns repositories belonging to this version control provider.

- `--self_hosted_vcs_id <self_hosted_vcs_id>`: If provided, only returns repositories belonging to this self-hosted version control provider.

- `--account_login <account_login>`: If provided, only returns repositories that can be accessed by the linked version control account with this name.

- `--vcs_link_id <vcs_link_id>`: If provided, only returns repositories belong to that VCS link.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of repos.

```json
{
  "repos": [
    {
      "vcsService": "github",
      "id": "123456789",
      "name": "project",
      "full_name": "example/project",
      "url": "https://github.com/example/project",
      "owner": {
        "login": "example"
      },
      "accountLogin": "example-user"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.repos({
  options: {
    "per_page": 50,
    "page": 1,
    "vcs_service": "github",
    "account_login": "example-user"
  }
});
```

#### Example Response

 The list of repos.

```json
{
  "data": {
    "repos": [
      {
        "vcsService": "github",
        "id": "123456789",
        "name": "project",
        "full_name": "example/project",
        "url": "https://github.com/example/project",
        "owner": {
          "login": "example"
        },
        "accountLogin": "example-user"
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.repos(
    account_login="example-user",
    page=1,
    per_page=50,
    vcs_service="github",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "repos": [
    {
      "vcsService": "github",
      "id": "123456789",
      "name": "project",
      "full_name": "example/project",
      "url": "https://github.com/example/project",
      "owner": {
        "login": "example"
      },
      "accountLogin": "example-user"
    }
  ]
}
```
