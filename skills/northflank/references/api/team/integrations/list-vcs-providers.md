# List VCS providers

Source: https://northflank.com/docs/v1/api/team/integrations/list-vcs-providers.md

Lists linked version control providers

Required permission: Account > Git > General > Read

**Response body:**

{object}
- `data`: {object}
  - `vcsAccountLinks`: [array of] {object}
     - `vcsService`: (string) (required) The type of version control provider the account is linked to. (enum: bitbucket, gitlab, github, self-hosted, azure)
     - `email`: (string) (required) The email of the account linked with this provider.
     - `login`: (string) (required) The username of the account linked with this provider.
     - `name`: (string) The name of the version control provider. Only returned for self-hosted links.
     - `vcsUrl`: (string) The url of the version control provider. Only returned for self-hosted links.
     - `vcsType`: (string) The type of the self-hosted vcs provider. Only returned for self-hosted links. (enum: gitlab-ee, github-ghe)
     - `internalId`: (string) The ID of the self-hosted vcs provider. Only returned for self-hosted links.
     - `entityName`: (string) The name of the team the self-hosted vcs belongs to. Only returned for self-hosted links.

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
        "email": "email@example.com",
        "login": "vcs-user",
        "name": "Self-hosted VCS",
        "vcsUrl": "https://git.example.com",
        "vcsType": "gitlab-ee",
        "internalId": "example-team/self-hosted-vcs",
        "entityName": "Example Team"
      }
    ]
  }
}
```

### CLI reference

$ northflank list vcs

Options:

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
      "email": "email@example.com",
      "login": "vcs-user",
      "name": "Self-hosted VCS",
      "vcsUrl": "https://git.example.com",
      "vcsType": "gitlab-ee",
      "internalId": "example-team/self-hosted-vcs",
      "entityName": "Example Team"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.vcs({});
```

#### Example Response

 Details about the version control providers available for use.

```json
{
  "data": {
    "vcsAccountLinks": [
      {
        "vcsService": "self-hosted",
        "email": "email@example.com",
        "login": "vcs-user",
        "name": "Self-hosted VCS",
        "vcsUrl": "https://git.example.com",
        "vcsType": "gitlab-ee",
        "internalId": "example-team/self-hosted-vcs",
        "entityName": "Example Team"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
