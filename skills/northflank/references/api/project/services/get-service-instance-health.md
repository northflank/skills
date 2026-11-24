# Get service instance health

Source: https://northflank.com/docs/v1/api/project/services/get-service-instance-health.md

Current instance health and up to 50 recently terminated instances. Current state is observed now, even when a historical window is requested. Probe output is excluded.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Query parameters:**

{object}
- `duration`: (integer)
- `endTime`: (string) (format: date-time)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `observedAt`: (string) (nullable) (format: date-time)
  - `window`: {object}
    - `start`: (string) (nullable) (format: date-time)
    - `end`: (string) (nullable) (format: date-time)
  - `byoc`: (boolean)
  - `current`: {object}
    - `containers`: [array of] {object}
        - `name`: (string)
        - `status`: (string)
        - `terminated`: (boolean)
        - `deploymentId`: (string)
        - `buildId`: (string) (nullable)
        - `runId`: (string) (nullable)
        - `nodeName`: (string) (nullable)
        - `nodePool`: (string) (nullable)
        - `nodePoolUserId`: (string) (nullable)
        - `nodePoolProviderId`: (string) (nullable)
        - `createdAt`: (number) (format: float)
        - `updatedAt`: (number) (format: float)
        - `restartCount`: (number) (format: float)
        - `lastFailure`: (string) (nullable) (format: date-time)
        - `lastExitCode`: (number) (nullable) (format: float)
        - `lastFailureReason`: (string) (nullable)
        - `eviction`: {object}
          - `message`: (string) (nullable)
          - `lastFailure`: (string) (nullable) (format: date-time)
        - `containerReason`: (string) (nullable)
        - `conditions`: [array of] {object}
            - `type`: (string) (nullable)
            - `status`: (string) (nullable)
            - `reason`: (string) (nullable)
            - `message`: (string) (nullable)
            - `lastTransitionTime`: (string) (nullable) (format: date-time)
            - `lastProbeTime`: (string) (nullable) (format: date-time)
        - `probes`: [array of] {object}
            - `kind`: (string)
            - `state`: (string) (nullable)
            - `timestamp`: (string) (nullable) (format: date-time)
            - `type`: (string) (nullable)
            - `latency`: (number) (nullable) (format: float)
            - `httpStatus`: (number) (format: float)
            - `exitCode`: (number) (nullable) (format: float)
        - `history`: [array of] {object}
            - `status`: (string) (nullable)
            - `timestamp`: (string) (nullable) (format: date-time)
    - `hasMore`: (boolean)
  - `recent`: {object}
    - `containers`: [array of] {object}
        - `name`: (string)
        - `status`: (string)
        - `terminated`: (boolean)
        - `deploymentId`: (string)
        - `buildId`: (string) (nullable)
        - `runId`: (string) (nullable)
        - `nodeName`: (string) (nullable)
        - `nodePool`: (string) (nullable)
        - `nodePoolUserId`: (string) (nullable)
        - `nodePoolProviderId`: (string) (nullable)
        - `createdAt`: (number) (format: float)
        - `updatedAt`: (number) (format: float)
        - `restartCount`: (number) (format: float)
        - `lastFailure`: (string) (nullable) (format: date-time)
        - `lastExitCode`: (number) (nullable) (format: float)
        - `lastFailureReason`: (string) (nullable)
        - `eviction`: {object}
          - `message`: (string) (nullable)
          - `lastFailure`: (string) (nullable) (format: date-time)
        - `containerReason`: (string) (nullable)
        - `conditions`: [array of] {object}
            - `type`: (string) (nullable)
            - `status`: (string) (nullable)
            - `reason`: (string) (nullable)
            - `message`: (string) (nullable)
            - `lastTransitionTime`: (string) (nullable) (format: date-time)
            - `lastProbeTime`: (string) (nullable) (format: date-time)
        - `probes`: [array of] {object}
            - `kind`: (string)
            - `state`: (string) (nullable)
            - `timestamp`: (string) (nullable) (format: date-time)
            - `type`: (string) (nullable)
            - `latency`: (number) (nullable) (format: float)
            - `httpStatus`: (number) (format: float)
            - `exitCode`: (number) (nullable) (format: float)
        - `history`: [array of] {object}
            - `status`: (string) (nullable)
            - `timestamp`: (string) (nullable) (format: date-time)
    - `hasMore`: (boolean)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/health

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/health

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/health"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/health"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Bounded current and historical instance evidence.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank get service health

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--duration <duration>`: undefined

- `--endTime <endTime>`: undefined

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Bounded current and historical instance evidence.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.service.health({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 Bounded current and historical instance evidence.

```json
{
  "data": {},
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
