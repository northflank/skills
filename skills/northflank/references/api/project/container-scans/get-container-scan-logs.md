# Get container scan logs

Source: https://northflank.com/docs/v1/api/project/container-scans/get-container-scan-logs.md

Get logs for a container scan job

Required permission: Project > Projects > Security > View Container Scan Reports

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `containerScanId`: (string) (required) ID of the container scan (format: uuid)

**Query parameters:**

{object}
- `queryType`: (string) `range` selects a log range and returns immediately. (enum: range)
- `startTime`: (string) Fetch logs generated after this timestamp. (format: date-time)
- `endTime`: (string) Fetch logs generated before this timestamp. (format: date-time)
- `duration`: (integer) Range duration in seconds. If set, only one of `startTime` or `endTime` can be set.
- `lineLimit`: (integer) Number of log lines to fetch.
- `direction`: (string) Ordering of log lines (enum: backward, forward)
- `textIncludes`: (string) Filter log lines to match this search string (min length: 1) (max length: 100)
- `textNotIncludes`: (string) Filter log lines to not match this search string (min length: 1) (max length: 100)
- `regexIncludes`: (string) Filter log lines to match this regular expression (min length: 1) (max length: 100)
- `regexNotIncludes`: (string) Filter log lines to not match this regular expression (min length: 1) (max length: 100)

**Response body:**

{object} Response object.
- `data`: [array of] (required) Result data. {object}
   - `containerId`: (string) (required)
   - `log`: (required)
   - `ts`: (string) (required) (format: date-time)

### API reference

GET /v1/projects/{projectId}/container-scans/{containerScanId}/logs

GET /v1/teams/{teamId}/projects/{projectId}/container-scans/{containerScanId}/logs

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/container-scans/{containerScanId}/logs?queryType=range&startTime=2023-02-16T14%3A00%3A00.000Z&endTime=2023-02-16T15%3A00%3A00.000Z&duration=600&lineLimit=250&direction=backward&textIncludes=myvalue&textNotIncludes=myvalue&regexIncludes=my.*value&regexNotIncludes=my.*value"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/container-scans/{containerScanId}/logs?queryType=range&startTime=2023-02-16T14%3A00%3A00.000Z&endTime=2023-02-16T15%3A00%3A00.000Z&duration=600&lineLimit=250&direction=backward&textIncludes=myvalue&textNotIncludes=myvalue&regexIncludes=my.*value&regexNotIncludes=my.*value"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: List of logs values

```json
{
  "data": [
    {
      "log": "stdout F This is a log line",
      "ts": "2023-03-21T15:01:17.310Z",
      "containerId": "string"
    }
  ]
}
```

### CLI reference

Looks like you aren‘t able to do that through the CLI yet.

### JavaScript client reference

Looks like you aren‘t able to do that through the JavaScript client yet.

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
