# Get job infrastructure events

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-infrastructure-events.md

Recorded workload and related BYOC node events in a bounded window. Requires the team infrastructure audit events permission. Node evidence is limited to this entity and observed workload nodes.

Required permission: Account > Admin > InfrastructureAuditEvents > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Query parameters:**

{object}
- `duration`: (integer)
- `endTime`: (string) (format: date-time)
- `runId`: (string) (format: uuid)

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

GET /v1/projects/{projectId}/jobs/{jobId}/health/events

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/health/events

#### Example Response

200 OK: Up to 100 recorded infrastructure events.

```json
undefined
```

### CLI reference

$ northflank get job health events

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--duration <duration>`: undefined

- `--endTime <endTime>`: undefined

- `--runId <runId>`: undefined

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
await apiClient.get.job.health.events({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
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
