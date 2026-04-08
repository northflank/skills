# Get SSH identity

Source: https://northflank.com/docs/v1/api/team/integrations/get-ssh-identity.md

Views SSH identity data including public keys.

Required permission: Account > Ssh > General > Read

**Path parameters:**

{object}
- `identityId`: (string) (required) ID of the SSH identity

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the ssh identity (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `sshPublicKeys`: [array of] {object}
     - `key`: (string) (required) The SSH public key.
  - `restrictions`: {object}
    - `projects`: {object}
      - `enabled`: (boolean) Whether restriction by project should be enabled.
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `tags`: {object}
      - `enabled`: (boolean) Whether restriction by tag should be enabled.
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
  - `updatedAt`: (string) time of update (format: date-time)
  - `createdAt`: (string) time of creation (format: date-time)

### API reference

GET /v1/integrations/ssh-identities/{identityId}

GET /v1/teams/{teamId}/integrations/ssh-identities/{identityId}

#### Example Response

200 OK: Data about the SSH identity.

```json
{
  "data": {
    "id": "example-identity",
    "name": "Example SSH Identity",
    "sshPublicKeys": [
      {
        "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
      }
    ],
    "restrictions": {
      "projects": {
        "enabled": false
      },
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    }
  }
}
```

### CLI reference

$ northflank get ssh-identities

Options:

- `--identityId <identityId>`: ID of the SSH identity

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the SSH identity.

```json
{
  "id": "example-identity",
  "name": "Example SSH Identity",
  "sshPublicKeys": [
    {
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
    }
  ],
  "restrictions": {
    "projects": {
      "enabled": false
    },
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.sshIdentities({
  parameters: {
    "identityId": "example-ssh-identity"
  }
});
```

#### Example Response

 Data about the SSH identity.

```json
{
  "data": {
    "id": "example-identity",
    "name": "Example SSH Identity",
    "sshPublicKeys": [
      {
        "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
      }
    ],
    "restrictions": {
      "projects": {
        "enabled": false
      },
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
