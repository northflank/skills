# Get global secret

Source: https://northflank.com/docs/v1/api/team/secrets/get-global-secret.md

Get a global secret including its contents

**Path parameters:**

{object}
- `secretId`: (string) (required) ID of the secret

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `secrets`: {object}
    - `values`: {object}
    - `files`: {object}
  - `type`: (string) (required) The permission type of the global secret. (enum: secret, config)
  - `gitops`: {object}
    - `vcsService`: (string) (required) The VCS provider to use. (enum: bitbucket, gitlab, github, self-hosted, azure)
    - `selfHostedVcsId`: (string) If projectType is self-hosted, the ID of the self-hosted vcs to use. (pattern: ^([A-Za-z0-9-]+)|([0-9a-f]{24})$)
    - `accountLogin`: (string) By default, if you have multiple version control accounts of the same provider linked, Northflank will pick a linked account that has access to the repository. If `accountLogin` is provided, Northflank will instead use your linked account with that login name.
    - `vcsLinkId`: (string) Legacy key. Please used accountLogin instead.
    - `repoUrl`: (string) (required) URL of the Git repo to sync the file with. (pattern: ^(https:\/\/)?((www(\.[a-zA-Z0-9\-]{2,})+\.)?[a-zA-Z0-9\-]{2,})(\.([a-zA-Z0-9\-]{2,}))+(\/([a-zA-Z0-9\-._]{2,}))+?$)
    - `branch`: (string) (required) The name of the branch to use.
    - `filePath`: (string) (required) The file path in the repository. If using an existing file, it should be in JSON format. (pattern: ^\/([a-zA-Z0-9-._]+\/)*[a-zA-Z0-9-._]+$)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

GET /v1/secrets/{secretId}

GET /v1/teams/{teamId}/secrets/{secretId}

#### Example Response

200 OK: Details about the given secret.

```json
{
  "data": {
    "type": "secret",
    "gitops": {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "branch": "main",
      "filePath": "/Dockerfile"
    }
  }
}
```

### CLI reference

$ northflank get global-secret

Options:

- `--secretId <secretId>`: ID of the secret

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the given secret.

```json
{
  "type": "secret",
  "gitops": {
    "vcsService": "github",
    "accountLogin": "github-user",
    "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
    "branch": "main",
    "filePath": "/Dockerfile"
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.globalSecret({
  parameters: {
    "secretId": "example-secret"
  }
});
```

#### Example Response

 Details about the given secret.

```json
{
  "data": {
    "type": "secret",
    "gitops": {
      "vcsService": "github",
      "accountLogin": "github-user",
      "repoUrl": "https://github.com/northflank-examples/remix-postgres-redis-demo",
      "branch": "main",
      "filePath": "/Dockerfile"
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
