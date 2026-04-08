# Get service build

Source: https://northflank.com/docs/v1/api/project/services/get-service-build.md

Gets information about a build for the service

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service
- `buildId`: (string) (required) ID of the service build

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the build.
  - `branch`: (string) Name of the branch the built commit belongs to.
  - `pullRequestId`: (number) ID of the pull request the commit belongs to. (format: float)
  - `status`: (string) The status of the build. (enum: QUEUED, PENDING, UNSCHEDULABLE, STARTING, CLONING, BUILDING, UPLOADING, ABORTED, FAILURE, SUBMISSION_FAILURE, SUCCESS, CRASHED, IN_PROGRESS)
  - `sha`: (string) The sha of the built commit.
  - `registry`: {object}
    - `uri`: (string) URI of that can be used to pull the image from the registry
  - `concluded`: (boolean) Whether the build has finished.
  - `createdAt`: (string) Timestamp of the build initiation.
  - `success`: (boolean) Whether the build was successful.
  - `message`: (string) Description of the build status.
  - `buildConcludedAt`: (number) Timestamp of the build concluding. (format: float)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/build/{buildId}

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build/{buildId}

#### Example Response

200 OK: Returns data about the specified build.

```json
{
  "data": {
    "id": "joyous-view-6290",
    "branch": "main",
    "status": "SUCCESS",
    "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
    "concluded": true,
    "createdAt": "2021-07-28T15:55:38.296Z",
    "success": true,
    "message": "Image successfully built",
    "buildConcludedAt": 1606237973
  }
}
```

### CLI reference

$ northflank get service build

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--buildId <buildId>`: ID of the service build

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Returns data about the specified build.

```json
{
  "id": "joyous-view-6290",
  "branch": "main",
  "status": "SUCCESS",
  "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
  "concluded": true,
  "createdAt": "2021-07-28T15:55:38.296Z",
  "success": true,
  "message": "Image successfully built",
  "buildConcludedAt": 1606237973
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.build({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service",
    "buildId": "joyous-view-6290"
  }
});
```

#### Example Response

 Returns data about the specified build.

```json
{
  "data": {
    "id": "joyous-view-6290",
    "branch": "main",
    "status": "SUCCESS",
    "sha": "12c15e7ee25fd78f567ebf87f9178b8ad70025b3",
    "concluded": true,
    "createdAt": "2021-07-28T15:55:38.296Z",
    "success": true,
    "message": "Image successfully built",
    "buildConcludedAt": 1606237973
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
