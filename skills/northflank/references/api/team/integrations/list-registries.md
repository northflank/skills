# List registries

Source: https://northflank.com/docs/v1/api/team/integrations/list-registries.md

Lists the container registry credentials saved to this account. Does not display secrets.

Required permission: Account > Credentials > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `credentials`: [array of] {object}
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
       - `scope`: {object}
         - `pull`: (boolean) Whether the credentials can pull images.
         - `push`: (boolean) Whether the credentials can push images.
     - `updatedAt`: (string) time of update (format: date-time)
     - `createdAt`: (string) time of creation (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/integrations/registries

GET /v1/teams/{teamId}/integrations/registries

#### Example Response

200 OK: A list of registry credentials saved to this account.

```json
{
  "data": {
    "credentials": [
      {
        "id": "example-credentials",
        "name": "Example Docker Credentials"
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

$ northflank list registry-credentials

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of registry credentials saved to this account.

```json
{
  "credentials": [
    {
      "id": "example-credentials",
      "name": "Example Docker Credentials"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.registryCredentials({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of registry credentials saved to this account.

```json
{
  "data": {
    "credentials": [
      {
        "id": "example-credentials",
        "name": "Example Docker Credentials"
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
