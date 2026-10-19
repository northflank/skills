# Get service infrastructure events

Source: https://northflank.com/docs/v1/api/project/services/get-service-infrastructure-events.md

Recorded workload and related BYOC node events in a bounded window. Requires the team infrastructure audit events permission. Node evidence is limited to this entity and observed workload nodes.

Required permission: Account > Admin > InfrastructureAuditEvents > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Query parameters:**

{object}
- `duration`: (integer)
- `endTime`: (string) (format: date-time)

**Response body:**

{object}
- `data`: {object}
  - `events`: [array of] {object}
     - `reason`: (string)
     - `message`: (string)
     - `level`: (string)
     - `count`: (number) (format: float)
     - `firstTimestamp`: (string)
     - `lastTimestamp`: (string)
     - `resourceType`: (string)
     - `group`: (string)
     - `scope`: (string)
     - `podName`: (string)
     - `nodeName`: (string)
     - `deploymentId`: (string)
     - `buildId`: (string)
  - `hasMore`: (boolean)
  - `nodeLookupTruncated`: (boolean)
  - `nodeCoverage`: (string)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/health/events

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/health/events

#### Example Response

200 OK: Up to 100 recorded infrastructure events.

```json
undefined
```

### CLI reference

$ northflank get service health events

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--duration <duration>`: undefined

- `--endTime <endTime>`: undefined

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Up to 100 recorded infrastructure events.

```json
undefined
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.service.health.events({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 Up to 100 recorded infrastructure events.

```json
{
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
