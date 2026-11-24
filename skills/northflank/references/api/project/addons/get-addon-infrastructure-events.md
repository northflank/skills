# Get addon infrastructure events

Source: https://northflank.com/docs/v1/api/project/addons/get-addon-infrastructure-events.md

Recorded workload and related BYOC node events in a bounded window. Requires the team infrastructure audit events permission. Node evidence is limited to this entity and observed workload nodes.

Required permission: Account > Admin > InfrastructureAuditEvents > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Query parameters:**

{object}
- `duration`: (integer)
- `endTime`: (string) (format: date-time)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `events`: [array of] {object}
     - `reason`: (string) (nullable)
     - `message`: (string) (nullable)
     - `level`: (string) (nullable)
     - `count`: (number) (format: float)
     - `firstTimestamp`: (string) (nullable)
     - `lastTimestamp`: (string) (nullable)
     - `resourceType`: (string) (nullable)
     - `group`: (string) (nullable)
     - `scope`: (string) (nullable)
     - `podName`: (string) (nullable)
     - `nodeName`: (string) (nullable)
     - `deploymentId`: (string)
     - `buildId`: (string)
  - `hasMore`: (boolean)
  - `nodeLookupTruncated`: (boolean)
  - `nodeCoverage`: (string)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/health/events

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/health/events

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/health/events"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}/health/events"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Up to 100 recorded infrastructure events.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank get addon health events

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--duration <duration>`: undefined

- `--endTime <endTime>`: undefined

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Up to 100 recorded infrastructure events.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.addon.health.events({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  }
});
```

#### Example Response

 Up to 100 recorded infrastructure events.

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
