# Get project secret addon link details

Source: https://northflank.com/docs/v1/api/project/secrets/get-project-secret-addon-link-details.md

Get details about a given addon link.

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `secretId`: (string) (required) ID of the project secret
- `addonId`: (string) (required) ID of the addon

**Response body:**

{object}
- `data`: {object}
  - `secretName`: (string) (required) The name of the secret group
  - `secretId`: (string) (required) Identifier for the secret group
  - `addonName`: (string) (required) The name of the linked addon
  - `addonId`: (string) (required) The ID of the linked addon
  - `addonType`: (string) (required) The addon type of the linked addon
  - `linked`: (boolean) (required) Is this addon currently linked to this secret group?
  - `linkedKeys`: [array of] {object}
     - `keyName`: (string) (required) The name of the key to link. (pattern: [a-zA-Z]+)
     - `aliases`: [array of] (string) The name of the alias. Keys may only contain letters, numbers, hyphens, forward slashes and dots. (pattern: ^[a-zA-Z0-9_./-]*$)
     - `defaultKey`: (string) (required)
  - `availableKeys`: [array of] (string)

### API reference

GET /v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}

GET /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/addons/{addonId}

#### Example Response

200 OK: Details about the link between the project secret and addon.

```json
{
  "data": {
    "secretName": "Example secret group",
    "secretId": "example-secret-group",
    "addonName": "Example Addon",
    "addonId": "example-addon",
    "addonType": "mongodb",
    "linked": true,
    "linkedKeys": [
      {
        "keyName": "USERNAME",
        "aliases": [
          "MONGO_USERNAME"
        ],
        "defaultKey": "NF_EXAMPLE-ADDON_USERNAME"
      }
    ],
    "availableKeys": [
      "username"
    ]
  }
}
```

### CLI reference

$ northflank get secret-link

Options:

- `--projectId <projectId>`: ID of the project

- `--secretId <secretId>`: ID of the project secret

- `--addonId <addonId>`: ID of the addon

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the link between the project secret and addon.

```json
{
  "secretName": "Example secret group",
  "secretId": "example-secret-group",
  "addonName": "Example Addon",
  "addonId": "example-addon",
  "addonType": "mongodb",
  "linked": true,
  "linkedKeys": [
    {
      "keyName": "USERNAME",
      "aliases": [
        "MONGO_USERNAME"
      ],
      "defaultKey": "NF_EXAMPLE-ADDON_USERNAME"
    }
  ],
  "availableKeys": [
    "username"
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.secretLink({
  parameters: {
    "projectId": "default-project",
    "secretId": "example-secret",
    "addonId": "example-addon"
  }
});
```

#### Example Response

 Details about the link between the project secret and addon.

```json
{
  "data": {
    "secretName": "Example secret group",
    "secretId": "example-secret-group",
    "addonName": "Example Addon",
    "addonId": "example-addon",
    "addonType": "mongodb",
    "linked": true,
    "linkedKeys": [
      {
        "keyName": "USERNAME",
        "aliases": [
          "MONGO_USERNAME"
        ],
        "defaultKey": "NF_EXAMPLE-ADDON_USERNAME"
      }
    ],
    "availableKeys": [
      "username"
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
