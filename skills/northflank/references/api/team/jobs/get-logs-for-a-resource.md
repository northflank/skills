# Get logs for a resource

Source: https://northflank.com/docs/v1/api/team/jobs/get-logs-for-a-resource.md

Get logs for any Northflank resource, selected via query parameters: a service, job, or harness (`serviceId`/`jobId`/`harnessId` with `projectId`), an addon including its backups and restores (`addonId` with optional `backupId`/`restoreId`), an OpenTofu job (`opentofuJobId`), a container scan (`containerScanId` with `projectId`), or an unmanaged cluster pod (`clusterId` with `podName`). `logSource` selects between runtime, build, backup and restore logs.

**Query parameters:**

{object}
- `projectId`: (string) ID of the project the targeted resource belongs to. Required when targeting a service, job, harness, addon or container scan.
- `clusterId`: (string) ID of the cluster to fetch unmanaged pod logs from. Requires podName and cannot be combined with resource IDs. Does not support deploymentId. The only accepted type is runtime (including repeated values), which does not filter the pod logs.
- `podName`: (string) Name of the pod to fetch logs of. Required when targeting a cluster. Overrides containerName. Not supported for build logs, OpenTofu jobs or container scans.
- `serviceId`: (string) ID of the service to target.
- `jobId`: (string) ID of the job to target.
- `harnessId`: (string) ID of the harness to target.
- `addonId`: (string) ID of the addon to target.
- `containerScanId`: (string) ID of the container scan to target within projectId. Supports runtime logs and time/text filters. Only neutral type=runtime and containerName=all values are accepted, including repeated values. Does not support podName, deploymentId, buildId or runId.
- `backupId`: (string) ID of the addon backup to target. Requires `addonId`.
- `restoreId`: (string) ID of the addon backup restore to target. Requires `backupId`.
- `opentofuJobId`: (string) ID of the OpenTofu job to target. Does not support podName, containerName selectors, deploymentId or type filters.
- `logSource`: (string) Source of the logs to fetch. Defaults to `runtime`, or to the source implied by `backupId`/`restoreId`. `build` is available for services and jobs, `backup` and `restore` for addons. Use `buildId` to select a build; build logs do not support pod or container selectors. (enum: runtime, build, backup, restore)
- `type`: (string) Type of log. Multiple log types can be selected by specifying the query parameter repeatedly. (enum: cdn, mesh, ingress, runtime, build, backup, restore)
- `containerName`: (multiple options) [array of] (string) (min length: 3) (max length: 64) | (string) (min length: 3) (max length: 64)
- `deploymentId`: (string) Limit runtime logs to a specific deployment of a service or harness. Not supported for build logs, cluster pods, OpenTofu jobs or container scans.
- `buildId`: (string) Selects logs for specific build.
- `runId`: (string) Limits metrics to a specific job run id. (min length: 36) (max length: 36)
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

GET /v1/logs

GET /v1/teams/{teamId}/logs

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

$ northflank get logs

Options:

- `--projectId <projectId>`: ID of the project the targeted resource belongs to. Required when targeting a service, job, harness, addon or container scan.

- `--clusterId <clusterId>`: ID of the cluster to fetch unmanaged pod logs from. Requires podName and cannot be combined with resource IDs. Does not support deploymentId. The only accepted type is runtime (including repeated values), which does not filter the pod logs.

- `--podName <podName>`: Name of the pod to fetch logs of. Required when targeting a cluster. Overrides containerName. Not supported for build logs, OpenTofu jobs or container scans.

- `--serviceId <serviceId>`: ID of the service to target.

- `--jobId <jobId>`: ID of the job to target.

- `--harnessId <harnessId>`: ID of the harness to target.

- `--addonId <addonId>`: ID of the addon to target.

- `--containerScanId <containerScanId>`: ID of the container scan to target within projectId. Supports runtime logs and time/text filters. Only neutral type=runtime and containerName=all values are accepted, including repeated values. Does not support podName, deploymentId, buildId or runId.

- `--backupId <backupId>`: ID of the addon backup to target. Requires `addonId`.

- `--restoreId <restoreId>`: ID of the addon backup restore to target. Requires `backupId`.

- `--opentofuJobId <opentofuJobId>`: ID of the OpenTofu job to target. Does not support podName, containerName selectors, deploymentId or type filters.

- `--logSource <logSource>`: Source of the logs to fetch. Defaults to `runtime`, or to the source implied by `backupId`/`restoreId`. `build` is available for services and jobs, `backup` and `restore` for addons. Use `buildId` to select a build; build logs do not support pod or container selectors.

- `--type <type>`: Type of log. Multiple log types can be selected by specifying the query parameter repeatedly.

- `--containerName <containerName>`: Limits logs to specific container(s). Repeat the parameter to select multiple containers. Build logs, OpenTofu jobs and container scans only accept the neutral value `all`.

- `--deploymentId <deploymentId>`: Limit runtime logs to a specific deployment of a service or harness. Not supported for build logs, cluster pods, OpenTofu jobs or container scans.

- `--buildId <buildId>`: Selects logs for specific build.

- `--runId <runId>`: Limits metrics to a specific job run id.

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
await apiClient.get.logs({
  options: {
    "projectId": "default-project",
    "clusterId": "my-cluster",
    "podName": "acme-6b97845ff4-cwkj4",
    "serviceId": "site-api",
    "jobId": "daily-report",
    "harnessId": "my-harness",
    "addonId": "main-database",
    "containerScanId": "my-scan",
    "backupId": "backup-123",
    "restoreId": "64a7b2f0d1e4c53f9a8b1c2d",
    "opentofuJobId": "64a7b2f0d1e4c53f9a8b1c2d",
    "logSource": "runtime",
    "containerName": [],
    "deploymentId": "latest",
    "buildId": "fantastic-build-2345",
    "runId": "93ec9390-b9bd-47f0-9bd1-b5983c42a6f2",
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
