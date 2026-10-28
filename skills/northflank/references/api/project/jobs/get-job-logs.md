# Get job logs

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-logs.md

Get logs for a job

Required permission: Project > Jobs > Deployment > View Observability

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Query parameters:**

{object}
- `runId`: (string) Limits metrics to a specific job run id. (min length: 36) (max length: 36)
- `type`: (string) Type of log. Multiple log types can be selected by specifying the query parameter repeatedly. (enum: cdn, mesh, ingress, runtime, build, backup, restore)
- `containerName`: (multiple options) [array of] (string) (min length: 3) (max length: 64) | (string) (min length: 3) (max length: 64)
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

{object}
- `data`: [array of] {object}
   - `containerId`: (string) (required)
   - `log`: (undefined) (required)
   - `ts`: (string) (required) (format: date-time)

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/logs

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/logs

#### Example Response

200 OK: List of logs values

```json
{
  "data": [
    {
      "log": "stdout F This is a log line",
      "ts": "2023-03-21T15:01:17.310Z"
    }
  ]
}
```

### CLI reference

$ northflank get job logs

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--runId <runId>`: Limits metrics to a specific job run id.

- `--type <type>`: Type of log. Multiple log types can be selected by specifying the query parameter repeatedly.

- `--containerName <containerName>`: Limits logs to specific container(s). Multiple containers can be selected by specifying the query parameter repeatedly.

- `--queryType <queryType>`: `range` selects a log range and returns immediately.

- `--startTime <startTime>`: Fetch logs generated after this timestamp.

- `--endTime <endTime>`: Fetch logs generated before this timestamp.

- `--duration <duration>`: Range duration in seconds. If set, only one of `startTime` or `endTime` can be set.

- `--lineLimit <lineLimit>`: Number of log lines to fetch.

- `--direction <direction>`: Ordering of log lines

- `--textIncludes <textIncludes>`: Filter log lines to match this search string

- `--textNotIncludes <textNotIncludes>`: Filter log lines to not match this search string

- `--regexIncludes <regexIncludes>`: Filter log lines to match this regular expression

- `--regexNotIncludes <regexNotIncludes>`: Filter log lines to not match this regular expression

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 List of logs values

```json
[
  {
    "log": "stdout F This is a log line",
    "ts": "2023-03-21T15:01:17.310Z"
  }
]
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.job.logs({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  options: {
    "runId": "93ec9390-b9bd-47f0-9bd1-b5983c42a6f2",
    "containerName": [],
    "queryType": "range",
    "startTime": "2023-02-16T14:00:00.000Z",
    "endTime": "2023-02-16T15:00:00.000Z",
    "duration": 600,
    "lineLimit": 250,
    "direction": "backward",
    "textIncludes": "myvalue",
    "textNotIncludes": "myvalue",
    "regexIncludes": "my.*value",
    "regexNotIncludes": "my.*value"
  }
});
```

#### Example Response

 List of logs values

```json
{
  "data": [
    {
      "log": "stdout F This is a log line",
      "ts": "2023-03-21T15:01:17.310Z"
    }
  ],
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
