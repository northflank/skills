# List project secrets

Source: https://northflank.com/docs/v1/api/project/secrets/list-project-secrets.md

Gets a list of project secrets belonging to the project

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `secrets`: [array of] {object}
     - `id`: (string) (required) Identifier for the secret group
     - `projectId`: (string) (required) ID of the project that the secret group belongs to
     - `name`: (string) (required) Secret group name
     - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) A short description of the secret group
     - `type`: (string) (required) The permission type of the secret group. (enum: secret, config)
     - `secretType`: (string) (required) The type of the secret group (enum: environment-arguments, environment, arguments)
     - `priority`: (integer) (required) The priority with which different secret groups will be merged
     - `restrictions`: {object}
       - `restricted`: (boolean) Whether the secret is restricted to specific resources. If this is `true`, only resources listed in `nfObjects` or with a tag listed in `tags` will have access to these secrets. Otherwise, all resources in the project will be able to access it.
       - `nfObjects`: [array of] {object}
           - `id`: (string) (required) ID of the entity the secret is restricted to. (pattern: ^[A-Za-z0-9-]+$)
           - `type`: (string) (required) Type of the entity the secret is restricted to. (enum: service, job)
       - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
       - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/secrets

GET /v1/teams/{teamId}/projects/{projectId}/secrets

#### Example Response

200 OK: The list of secrets.

```json
{
  "data": {
    "secrets": [
      {
        "id": "example-secret-group",
        "projectId": "default-project",
        "name": "Example secret group",
        "description": "This is the secret group description",
        "type": "secret",
        "secretType": "environment",
        "priority": 10,
        "restrictions": {
          "restricted": true,
          "nfObjects": [
            {
              "id": "example-service",
              "type": "service"
            }
          ],
          "tagMatchCondition": "or"
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

$ northflank list secrets

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of secrets.

```json
{
  "secrets": [
    {
      "id": "example-secret-group",
      "projectId": "default-project",
      "name": "Example secret group",
      "description": "This is the secret group description",
      "type": "secret",
      "secretType": "environment",
      "priority": 10,
      "restrictions": {
        "restricted": true,
        "nfObjects": [
          {
            "id": "example-service",
            "type": "service"
          }
        ],
        "tagMatchCondition": "or"
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.secrets({
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

 The list of secrets.

```json
{
  "data": {
    "secrets": [
      {
        "id": "example-secret-group",
        "projectId": "default-project",
        "name": "Example secret group",
        "description": "This is the secret group description",
        "type": "secret",
        "secretType": "environment",
        "priority": 10,
        "restrictions": {
          "restricted": true,
          "nfObjects": [
            {
              "id": "example-service",
              "type": "service"
            }
          ],
          "tagMatchCondition": "or"
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
