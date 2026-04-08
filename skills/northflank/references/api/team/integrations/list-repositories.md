# List repositories

Source: https://northflank.com/docs/v1/api/team/integrations/list-repositories.md

Gets a list of repositories accessible to this account

Required permission: Account > Git > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `vcs_service`: (string) If provided, only returns repositories belonging to this version control provider. (enum: bitbucket, gitlab, github, self-hosted, azure)
- `self_hosted_vcs_id`: (string) If provided, only returns repositories belonging to this self-hosted version control provider.
- `account_login`: (string) If provided, only returns repositories that can be accessed by the linked version control account with this name.
- `vcs_link_id`: (string) If provided, only returns repositories belong to that VCS link.

**Response body:**

{object}
- `data`: {object}
  - `repos`: [array of] {object}
     - `vcsService`: (string) (required) Version control provider of the repository. (enum: bitbucket, gitlab, github, self-hosted, azure)
     - `selfHostedVcsId`: (string) If `vcsService` is `self-hosted`, the ID of the self-hosted provider.
     - `id`: (string) (required) The ID of the repository from the version control provider. This is always returned from the Northflank API as a string for consistency across providers. This value is the numerical ID of a GitHub repository, the numerical ID of a GitLab project, or the UUID of a Bitbucket repository.
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
        "name": "gatsby-with-northflank",
        "full_name": "northflank/gatsby-with-northflank",
        "url": "https://github.com/northflank/gatsby-with-northflank",
        "owner": {
          "login": "northflank"
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
      "name": "gatsby-with-northflank",
      "full_name": "northflank/gatsby-with-northflank",
      "url": "https://github.com/northflank/gatsby-with-northflank",
      "owner": {
        "login": "northflank"
      },
      "accountLogin": "example-user"
    }
  ]
}
```

### JavaScript client reference

#### Example request

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
        "name": "gatsby-with-northflank",
        "full_name": "northflank/gatsby-with-northflank",
        "url": "https://github.com/northflank/gatsby-with-northflank",
        "owner": {
          "login": "northflank"
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
