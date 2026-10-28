# List VCS providers

Source: https://northflank.com/docs/v1/api/team/integrations/list-vcs-providers.md

Lists linked version control providers

Required permission: Account > Git > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `vcsAccountLinks`: [array of] {object}
     - `vcsService`: (string) (required) The type of version control provider the account is linked to. (enum: bitbucket, gitlab, github, self-hosted, azure, origin)
     - `email`: (multiple options) (undefined) | (undefined)
     - `login`: (string) (required) The username of the account linked with this provider.
     - `vcsLinkId`: (string) (required) The ID of this linked version control account. Pass this value as `vcsLinkId` when creating a harness or service from this account.
     - `alias`: (string) A user-defined alias for the linked version control account, if set.
     - `name`: (string) The name of the version control provider. Only returned for self-hosted links.
     - `vcsUrl`: (string) The url of the version control provider. Only returned for self-hosted links.
     - `vcsType`: (string) The type of the self-hosted vcs provider. Only returned for self-hosted links. (enum: gitlab-ee, github-ghe, gitea)
     - `internalId`: (string) The ID of the self-hosted vcs provider. Only returned for self-hosted links.
     - `entityName`: (string) The name of the team the self-hosted vcs belongs to. Only returned for self-hosted links.
     - `originTargetSlug`: (string) The Cursor Origin installation target slug.
     - `originRepoSelectionMode`: (string) Whether the Origin installation grants all or selected repositories. (enum: all, selected)
     - `originScopes`: [array of] (string)
     - `originMissingScopes`: [array of] (string)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/integrations/vcs

GET /v1/teams/{teamId}/integrations/vcs

#### Example Response

200 OK: Details about the version control providers available for use.

```json
{
  "data": {
    "vcsAccountLinks": [
      {
        "vcsService": "self-hosted",
        "login": "vcs-user",
        "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
        "alias": "my-github",
        "name": "Self-hosted VCS",
        "vcsUrl": "https://git.example.com",
        "vcsType": "gitlab-ee",
        "internalId": "example-team/self-hosted-vcs",
        "entityName": "Example Team",
        "originTargetSlug": "example-team"
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

$ northflank list vcs

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 Details about the version control providers available for use.

```json
{
  "vcsAccountLinks": [
    {
      "vcsService": "self-hosted",
      "login": "vcs-user",
      "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
      "alias": "my-github",
      "name": "Self-hosted VCS",
      "vcsUrl": "https://git.example.com",
      "vcsType": "gitlab-ee",
      "internalId": "example-team/self-hosted-vcs",
      "entityName": "Example Team",
      "originTargetSlug": "example-team"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.vcs({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 Details about the version control providers available for use.

```json
{
  "data": {
    "vcsAccountLinks": [
      {
        "vcsService": "self-hosted",
        "login": "vcs-user",
        "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
        "alias": "my-github",
        "name": "Self-hosted VCS",
        "vcsUrl": "https://git.example.com",
        "vcsType": "gitlab-ee",
        "internalId": "example-team/self-hosted-vcs",
        "entityName": "Example Team",
        "originTargetSlug": "example-team"
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

response = client.list.vcs()
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "vcsAccountLinks": [
    {
      "vcsService": "self-hosted",
      "email": "email@example.com",
      "login": "vcs-user",
      "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
      "alias": "my-github",
      "name": "Self-hosted VCS",
      "vcsUrl": "https://git.example.com",
      "vcsType": "gitlab-ee",
      "internalId": "example-team/self-hosted-vcs",
      "entityName": "Example Team",
      "originTargetSlug": "example-team"
    }
  ]
}
```
