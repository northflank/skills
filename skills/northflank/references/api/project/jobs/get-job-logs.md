# Get job logs

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-logs.md

Get logs for a job

Required permission: Project > Jobs > Deployment > View Instance Logs

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Query parameters:**

{object}
- `runId`: (string) Limits metrics to a specific job run id.
- `type`: (string) Type of log. Multiple log types can be selected by specifying the query parameter repeatedly. (enum: cdn, mesh, ingress, runtime, build, backup, restore)
- `containerName`: (string) Limits logs to a specific container.
- `queryType`: (string) `range` selects a log range and returns immediately. (enum: range)
- `startTime`: (string) Fetch logs generated after this timestamp.
- `endTime`: (string) Fetch logs generated before this timestamp.
- `duration`: (integer) Range duration in seconds. If set, only one of `startTime` or `endTime` can be set.
- `lineLimit`: (number) Number of log lines to fetch.
- `direction`: (string) Ordering of log lines (enum: backward, forward)
- `textIncludes`: (string) Filter log lines to match this search string
- `textNotIncludes`: (string) Filter log lines to not match this search string
- `regexIncludes`: (string) Filter log lines to match this regular expression
- `regexNotIncludes`: (string) Filter log lines to not match this regular expression

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

- `--containerName <containerName>`: Limits logs to a specific container.

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

```javascript
await apiClient.get.job.logs({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  options: {
    "runId": "93ec9390-b9bd-47f0-9bd1-b5983c42a6f2",
    "containerName": "my-container-67d6d748c5-kgvwh",
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
