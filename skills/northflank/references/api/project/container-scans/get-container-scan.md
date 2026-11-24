# Get container scan

Source: https://northflank.com/docs/v1/api/project/container-scans/get-container-scan.md

Gets the status and available results for a container scan.

Required permission: Project > Projects > Security > View Container Scan Reports

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `containerScanId`: (string) (required) ID of the container scan (format: uuid)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) (format: uuid)
  - `buildId`: (string) (required)
  - `serviceId`: (string) (required)
  - `createdAt`: (string) (required) (format: date-time)
  - `status`: (string) (required) (enum: creating, pending, completed, failed)
  - `error`: {object}
    - `phase`: (string) (required) (enum: launch, scan, timeout)
    - `message`: (string) (required)
    - `at`: (string) (required) (format: date-time)
    - `exitCode`: (integer)
  - `result`: {object}
    - `status`: {object}
    - `vulnerabilityDetails`: {object}
      - `scan`: {object}
        - `secretInstances`: [array of] {object}
            - `common`: {object}
            - `path`: (string)
            - `severity`: (string)
        - `scanVulnerabilitiesResponse`: {object}
          - `vulnerabilitiesGroups`: [array of] {object}
          - `techTags`: {object}

### API reference

GET /v1/projects/{projectId}/container-scans/{containerScanId}

GET /v1/teams/{teamId}/projects/{projectId}/container-scans/{containerScanId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/container-scans/{containerScanId}"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/container-scans/{containerScanId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: The container scan and its available results.

```json
{
  "data": {
    "id": "00000000-0000-4000-8000-000000000000",
    "buildId": "string",
    "serviceId": "string",
    "createdAt": "1970-01-01T00:00:00.000Z",
    "status": "creating"
  }
}
```

### CLI reference

$ northflank get container-scan

Options:

- `--projectId <projectId>`: ID of the project

- `--containerScanId <containerScanId>`: ID of the container scan

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The container scan and its available results.

```json
{
  "id": "00000000-0000-4000-8000-000000000000",
  "buildId": "string",
  "serviceId": "string",
  "createdAt": "1970-01-01T00:00:00.000Z",
  "status": "creating"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.containerScan({
  parameters: {
    "projectId": "default-project",
    "containerScanId": "110ddb52-bdcd-482d-8ac2-05ba580afe2f"
  }
});
```

#### Example Response

 The container scan and its available results.

```json
{
  "data": {
    "id": "00000000-0000-4000-8000-000000000000",
    "buildId": "string",
    "serviceId": "string",
    "createdAt": "1970-01-01T00:00:00.000Z",
    "status": "creating"
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
