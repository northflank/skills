# Get image

Source: https://northflank.com/docs/v1/api/project/images/get-image.md

Gets a build or imported image version

Required permission: Project > Images > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `imageId`: (string) (required) Object ID of the image version

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) (min length: 24) (max length: 24)
  - `name`: (string) (required)
  - `tag`: (string) (required)
  - `source`: (multiple options) (required) {object}
     - `type`: (string) (required) (enum: build)
     - `buildId`: (string) (required) (min length: 24) (max length: 24)
     - `nfObjectId`: (string) (required) (min length: 24) (max length: 24)
     - `nfObjectType`: (string) (required) (enum: service, job)
     - `branch`: (string) (required) | {object}
     - `type`: (string) (required) (enum: imported)
     - `from`: (string) (required) (enum: ui, external, registry)
  - `group`: (multiple options) (string)
  - `ready`: (boolean) (required)
  - `status`: (string) (required) (enum: AWAITING_UPLOAD, IMPORTING, VALIDATING, READY, FAILURE, EXPIRED)
  - `createdAt`: (string) (required) (format: date-time)
  - `publishedAt`: (string) (format: date-time)
  - `digest`: (string) (pattern: ^sha256:[a-f0-9]{64}$)
  - `supportedArchitectures`: [array of] (string) (enum: linux/amd64, linux/arm64)
  - `imageSizeBytes`: (integer)
  - `validationError`: (string)
  - `reservationExpiresAt`: (string) (format: date-time)
  - `git`: {object}
    - `provider`: (string) (required)
    - `repo`: (string) (required)
    - `branch`: (string) (required)
    - `commit`: (string) (required)

### API reference

GET /v1/projects/{projectId}/images/{imageId}

GET /v1/teams/{teamId}/projects/{projectId}/images/{imageId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/images/{imageId}"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/images/{imageId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details about the image version.

```json
{
  "data": {
    "id": "stringaaaaaaaaaaaaaaaaaa",
    "name": "string",
    "tag": "string",
    "source": {
      "type": "build",
      "buildId": "stringaaaaaaaaaaaaaaaaaa",
      "nfObjectId": "stringaaaaaaaaaaaaaaaaaa",
      "nfObjectType": "service",
      "branch": "string"
    },
    "ready": false,
    "status": "AWAITING_UPLOAD",
    "createdAt": "1970-01-01T00:00:00.000Z"
  }
}
```

### CLI reference

$ northflank get image

Options:

- `--projectId <projectId>`: ID of the project

- `--imageId <imageId>`: Object ID of the image version

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the image version.

```json
{
  "id": "stringaaaaaaaaaaaaaaaaaa",
  "name": "string",
  "tag": "string",
  "source": {
    "type": "build",
    "buildId": "stringaaaaaaaaaaaaaaaaaa",
    "nfObjectId": "stringaaaaaaaaaaaaaaaaaa",
    "nfObjectType": "service",
    "branch": "string"
  },
  "ready": false,
  "status": "AWAITING_UPLOAD",
  "createdAt": "1970-01-01T00:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.image({
  parameters: {
    "projectId": "default-project",
    "imageId": "string"
  }
});
```

#### Example Response

 Details about the image version.

```json
{
  "data": {
    "id": "stringaaaaaaaaaaaaaaaaaa",
    "name": "string",
    "tag": "string",
    "source": {
      "type": "build",
      "buildId": "stringaaaaaaaaaaaaaaaaaa",
      "nfObjectId": "stringaaaaaaaaaaaaaaaaaa",
      "nfObjectType": "service",
      "branch": "string"
    },
    "ready": false,
    "status": "AWAITING_UPLOAD",
    "createdAt": "1970-01-01T00:00:00.000Z"
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

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
