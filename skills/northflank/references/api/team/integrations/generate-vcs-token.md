# Generate VCS token

Source: https://northflank.com/docs/v1/api/team/integrations/generate-vcs-token.md

Generate a token for a specific VCS link.

Required permission: Account > Git > Tokens > Read

**Path parameters:**

{object}
- `customVCSId`: (string) (required) ID of the custom VCS
- `vcsLinkId`: (string) (required) ID of the version control link

**Query parameters:**

{object}
- `force_refresh`: (boolean)

**Response body:**

{object}
- `data`: {object}
  - `vcsService`: (string) (required) VCS provider the token belongs to. (enum: bitbucket, gitlab, github, self-hosted, azure)
  - `installationId`: (integer) Installation ID of the GitHub installation the token belongs to (GitHub only)
  - `installationToken`: (string) Installation token (GitHub only).
  - `token`: (string) (required) OAuth token.

### API reference

POST /v1/integrations/vcs/custom/{customVCSId}/token/{vcsLinkId}

POST /v1/teams/{teamId}/integrations/vcs/custom/{customVCSId}/token/{vcsLinkId}

#### Example Response

200 OK: A version control access token for the provided link.

```json
{
  "data": {
    "vcsService": "github",
    "installationId": 1234567,
    "installationToken": "ghs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "token": "ghu_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

### CLI reference

$ northflank create custom-vcs token

Options:

- `--customVCSId <customVCSId>`: ID of the custom VCS

- `--vcsLinkId <vcsLinkId>`: ID of the version control link

- `--force_refresh <force_refresh>`: undefined

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A version control access token for the provided link.

```json
{
  "vcsService": "github",
  "installationId": 1234567,
  "installationToken": "ghs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "token": "ghu_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.create.customVcs.token({
  parameters: {
    "customVCSId": "cdb3d41f-0dd8-49ad-92d5-7544c98c490b",
    "vcsLinkId": "63ebb6ce2ccc6c7affdbf253"
  },
  options: {}
});
```

#### Example Response

 A version control access token for the provided link.

```json
{
  "data": {
    "vcsService": "github",
    "installationId": 1234567,
    "installationToken": "ghs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "token": "ghu_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
