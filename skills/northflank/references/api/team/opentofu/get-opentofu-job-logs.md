# Get OpenTofu job logs

Source: https://northflank.com/docs/v1/api/team/opentofu/get-opentofu-job-logs.md

Get logs for an OpenTofu job

Required permission: Account > Templates > Runs > Read

**Path parameters:**

{object}
- `opentofuJobId`: (string) (required) ID of the opentofu job

**Query parameters:**

{object}
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

GET /v1/opentofu-jobs/{opentofuJobId}/logs

GET /v1/teams/{teamId}/opentofu-jobs/{opentofuJobId}/logs

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

$ northflank get opentofu-job logs

Options:

- `--opentofuJobId <opentofuJobId>`: ID of the opentofu job

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
await apiClient.get.opentofuJob.logs({
  parameters: {
    "opentofuJobId": "example-job"
  },
  options: {
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
