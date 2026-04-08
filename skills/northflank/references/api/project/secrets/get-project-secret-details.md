# Get project secret details

Source: https://northflank.com/docs/v1/api/project/secrets/get-project-secret-details.md

View a project secret with details about its linked addons

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `secretId`: (string) (required) ID of the project secret

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the secret group
  - `name`: (string) (required) Secret group name
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) A short description of the secret group
  - `type`: (string) (required) The permission type of the secret group. (enum: secret, config)
  - `secretType`: (string) (required) The type of the created secret group (enum: environment-arguments, environment, arguments)
  - `projectId`: (string) (required) ID of the project that the secret group belongs to
  - `priority`: (integer) (required) The priority with which different secret groups will be merged
  - `restrictions`: {object}
    - `restricted`: (boolean) Whether the secret is restricted to specific resources. If this is `true`, only resources listed in `nfObjects` or with a tag listed in `tags` will have access to these secrets. Otherwise, all resources in the project will be able to access it.
    - `nfObjects`: [array of] {object}
        - `id`: (string) (required) ID of the entity the secret is restricted to. (pattern: ^[A-Za-z0-9-]+$)
        - `type`: (string) (required) Type of the entity the secret is restricted to. (enum: service, job)
    - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
  - `createdAt`: (string) (required) The timestamp when the secret group was created at (format: date-time)
  - `updatedAt`: (string) (required) The timestamp the secret group was last updated at (format: date-time)
  - `secrets`: {object}
  - `addonSecrets`: [array of] {object}
     - `id`: (string) (required) The ID of the linked addon
     - `name`: (string) (required) The name of the linked addon
     - `addonType`: (string) (required) The addon type of the linked addon
     - `version`: (string) (required) The version of the linked addon
     - `variables`: {object}

### API reference

GET /v1/projects/{projectId}/secrets/{secretId}/details

GET /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/details

#### Example Response

200 OK: The secret with details about its linked addons.

```json
{
  "data": {
    "id": "example-secret-group",
    "name": "Example secret group",
    "description": "This is the secret group description",
    "type": "secret",
    "secretType": "environment",
    "projectId": "default-project",
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
    },
    "createdAt": "2021-01-01 12:00:00.000Z",
    "updatedAt": "2021-01-01 12:00:00.000Z",
    "secrets": {
      "variables": {
        "a_key": "a_secret",
        "b_key": "b_secret"
      },
      "files": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      }
    },
    "addonSecrets": [
      {
        "id": "example-addon",
        "name": "Example Addon",
        "addonType": "mongodb",
        "version": "4.4.1",
        "variables": {
          "NF_MONGO_USERNAME": "0000000000000000",
          "NF_MONGO_PASSWORD": "00000000000000000000000000000000"
        }
      }
    ]
  }
}
```

### CLI reference

$ northflank get secret-details

Options:

- `--projectId <projectId>`: ID of the project

- `--secretId <secretId>`: ID of the project secret

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The secret with details about its linked addons.

```json
{
  "id": "example-secret-group",
  "name": "Example secret group",
  "description": "This is the secret group description",
  "type": "secret",
  "secretType": "environment",
  "projectId": "default-project",
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
  },
  "createdAt": "2021-01-01 12:00:00.000Z",
  "updatedAt": "2021-01-01 12:00:00.000Z",
  "secrets": {
    "variables": {
      "a_key": "a_secret",
      "b_key": "b_secret"
    },
    "files": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  },
  "addonSecrets": [
    {
      "id": "example-addon",
      "name": "Example Addon",
      "addonType": "mongodb",
      "version": "4.4.1",
      "variables": {
        "NF_MONGO_USERNAME": "0000000000000000",
        "NF_MONGO_PASSWORD": "00000000000000000000000000000000"
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.secretDetails({
  parameters: {
    "projectId": "default-project",
    "secretId": "example-secret"
  }
});
```

#### Example Response

 The secret with details about its linked addons.

```json
{
  "data": {
    "id": "example-secret-group",
    "name": "Example secret group",
    "description": "This is the secret group description",
    "type": "secret",
    "secretType": "environment",
    "projectId": "default-project",
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
    },
    "createdAt": "2021-01-01 12:00:00.000Z",
    "updatedAt": "2021-01-01 12:00:00.000Z",
    "secrets": {
      "variables": {
        "a_key": "a_secret",
        "b_key": "b_secret"
      },
      "files": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      }
    },
    "addonSecrets": [
      {
        "id": "example-addon",
        "name": "Example Addon",
        "addonType": "mongodb",
        "version": "4.4.1",
        "variables": {
          "NF_MONGO_USERNAME": "0000000000000000",
          "NF_MONGO_PASSWORD": "00000000000000000000000000000000"
        }
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
