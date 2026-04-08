# Get service health checks

Source: https://northflank.com/docs/v1/api/project/services/get-service-health-checks.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /services/get-service instead](get-service.md)

Lists the health checks for the given service.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}
  - `healthChecks`: [array of] {object}
     - `protocol`: (string) (required) The protocol to access the health check with. (enum: HTTP, CMD, TCP)
     - `type`: (string) (required) The type of health check. (enum: livenessProbe, readinessProbe)
     - `path`: (string) The path of the health check endpoint.
     - `cmd`: (undefined) The command to run for the health check.
     - `httpPort`: (undefined) HTTP port number for the health check endpoint.
     - `tcpSocketPort`: (undefined) TCP port number for the health check endpoint.
     - `initialDelaySeconds`: (integer) (required) Initial delay, in seconds, before the health check is first run.
     - `periodSeconds`: (integer) (required) The time between each check, in seconds.
     - `timeoutSeconds`: (integer) (required) The time to wait for a response before marking the health check as a failure.
     - `failureThreshold`: (integer) (required) The maximum number of allowed failures.
     - `successThreshold`: (undefined) The number of successes required to mark the health check as a success.

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/health-checks

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/health-checks

#### Example Response

200 OK: Details about the health checks for the service.

```json
{
  "data": {
    "healthChecks": [
      {
        "protocol": "HTTP",
        "type": "readinessProbe",
        "path": "/health-check",
        "httpPort": 3000,
        "initialDelaySeconds": 10,
        "periodSeconds": 60,
        "timeoutSeconds": 1,
        "failureThreshold": 3,
        "successThreshold": 1
      }
    ]
  }
}
```

### CLI reference

$ northflank get service health-checks

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the health checks for the service.

```json
{
  "healthChecks": [
    {
      "protocol": "HTTP",
      "type": "readinessProbe",
      "path": "/health-check",
      "httpPort": 3000,
      "initialDelaySeconds": 10,
      "periodSeconds": 60,
      "timeoutSeconds": 1,
      "failureThreshold": 3,
      "successThreshold": 1
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.healthChecks({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 Details about the health checks for the service.

```json
{
  "data": {
    "healthChecks": [
      {
        "protocol": "HTTP",
        "type": "readinessProbe",
        "path": "/health-check",
        "httpPort": 3000,
        "initialDelaySeconds": 10,
        "periodSeconds": 60,
        "timeoutSeconds": 1,
        "failureThreshold": 3,
        "successThreshold": 1
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
