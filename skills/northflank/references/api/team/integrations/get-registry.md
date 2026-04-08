# Get registry

Source: https://northflank.com/docs/v1/api/team/integrations/get-registry.md

Views a set of registry credential data.

Required permission: Account > Credentials > General > Read Encrypted

**Path parameters:**

{object}
- `credentialId`: (string) (required) ID of the registry credential

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the docker credentials (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) The name of the docker credentials. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `provider`: (string) (required) The provider of the docker registry. (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)
  - `registryUrl`: (string) The URL of the docker registry.
  - `aws`: {object}
    - `region`: (string) The region of the docker registry.
  - `gcp`: {object}
    - `projectId`: (string) The project ID of the GCP docker registry.
  - `azure`: {object}
    - `resourceGroup`: (string) The resource group of the Azure docker registry.
  - `integrationId`: (string) Integration to use for this registry. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
  - `credentials`: {object}
    - `username`: (string) Username for the docker registry. Required when `integrationId` is provided.
    - `password`: (string) Password for the docker registry. Required when `integrationId` is provided.
    - `scope`: {object}
      - `pull`: (boolean) Whether the credentials can pull images.
      - `push`: (boolean) Whether the credentials can push images.
  - `restrictions`: {object}
    - `restricted`: (boolean) (required) Whether access to this credential is restricted.
    - `projects`: [array of] (string)
  - `updatedAt`: (string) time of update (format: date-time)
  - `createdAt`: (string) time of creation (format: date-time)

### API reference

GET /v1/integrations/registries/{credentialId}

GET /v1/teams/{teamId}/integrations/registries/{credentialId}

#### Example Response

200 OK: Data about the registry credentials.

```json
{
  "data": {
    "id": "example-credentials",
    "name": "Example Docker Credentials"
  }
}
```

### CLI reference

$ northflank get registry-credentials

Options:

- `--credentialId <credentialId>`: ID of the registry credential

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the registry credentials.

```json
{
  "id": "example-credentials",
  "name": "Example Docker Credentials"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.registryCredentials({
  parameters: {
    "credentialId": "example-credentials"
  }
});
```

#### Example Response

 Data about the registry credentials.

```json
{
  "data": {
    "id": "example-credentials",
    "name": "Example Docker Credentials"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
