# Log tailing

Source: https://northflank.com/docs/v1/api/log-tailing.md

Use the [logs endpoint](log-tailing.md#get-logs-through-one-endpoint) to retrieve a log range over HTTP or stream live logs over WebSockets. You can also stream service, job, and addon logs with the [JavaScript client](use-the-javascript-client.md) or [Northflank CLI](use-the-cli.md).

Live log streams return the 10 most recent lines from the previous 30 minutes by default, followed by new lines as they arrive. You can change the initial line count and time range.

### Get logs through one endpoint

Retrieve logs for a service, job, or another resource with `GET /v1/logs`. Include the resource IDs as query parameters and use an API token with permission to read its logs.

The HTTP and WebSocket examples below use a [team-scoped API token](use-the-api.md#token-scope-and-request-routes). With an organization-scoped token, use `/v1/teams/{teamId}/logs` and replace `{teamId}` with the target team ID.

Choose one target from this table. Do not combine target IDs from different rows.

| Target | Required query parameters | Supported `logSource` values |
| --- | --- | --- |
| Service | `projectId`, `serviceId` | `runtime`, `build` |
| Job | `projectId`, `jobId` | `runtime`, `build` |
| Harness | `projectId`, `harnessId` | `runtime` |
| Addon | `projectId`, `addonId` | `runtime`, `backup`, `restore` |
| Container scan | `projectId`, `containerScanId` | `runtime` |
| OpenTofu job | `opentofuJobId` | `runtime` |
| Unmanaged cluster pod | `clusterId`, `podName` | `runtime` |

Omit `projectId` for OpenTofu jobs and cluster pods. Container scan logs require permission to view scan reports. Scans from service builds also require permission to view service observability.

To read harness logs with an API token, the harness must use Team privacy. API tokens cannot access private harness logs, even for the creator. See [harness privacy](../guides/cloud-harness.md#configure-and-manage-cloud-harnesses-choose-privacy).

For addon backup logs, include `backupId`. For restore logs, include both `backupId` and `restoreId`. These IDs select `backup` or `restore` automatically. Otherwise, `logSource` defaults to `runtime`. An explicit `logSource` must match the selected IDs.

For build logs, set `logSource=build`. Add `buildId` to select a specific build. For a specific job run, include `jobId` and `runId`.

#### Retrieve a log range

HTTP requests use `queryType=range` by default.

Set `NORTHFLANK_API_TOKEN` to an [API token](use-the-api.md#authentication) with access to the target. Replace the project and service IDs with your own values. This example retrieves up to 100 service log lines that contain `error` from the last 10 minutes:

```shell
curl --get 'https://api.northflank.com/v1/logs' \
  --header "Authorization: Bearer $NORTHFLANK_API_TOKEN" \
  --data-urlencode 'projectId=default-project' \
  --data-urlencode 'serviceId=site-api' \
  --data-urlencode 'duration=600' \
  --data-urlencode 'lineLimit=100' \
  --data-urlencode 'textIncludes=error'
```

The response contains log entries in `data` and pagination information in `pagination`. Each entry includes `containerId`, `log`, and `ts`.

Use these filters to limit the results:

| Filter | Behavior |
| --- | --- |
| `startTime`, `endTime` | Select logs after or before an ISO 8601 timestamp, such as `2026-10-18T14:00:00Z`. |
| `duration` | Select a time range in seconds. Combine it with at most one of `startTime` and `endTime`. |
| `lineLimit` | Request up to 1,000 lines. Range requests default to 250 lines. |
| `direction` | Order range results `backward` (the default) or `forward`. |
| `textIncludes`, `textNotIncludes` | Include or exclude lines that contain the given text. |
| `regexIncludes`, `regexNotIncludes` | Include or exclude lines that match a regular expression. |

#### Stream live logs

To stream logs, open a WebSocket connection to `wss://api.northflank.com/v1/logs` with `queryType=tail` and the same target parameters. For example:

```text
wss://api.northflank.com/v1/logs?projectId=default-project&serviceId=site-api&queryType=tail&lineLimit=10
```

After the connection opens, send this initialization message. Replace `<API_TOKEN>` with your token:

```json
{
  "type": "init",
  "data": {
    "auth": {
      "type": "apiToken",
      "apiToken": "<API_TOKEN>"
    }
  }
}
```

A successful initialization returns an `init` message with `data.auth` set to `successful`. Log batches arrive in `log-lines` messages.

Tail requests default to 10 initial lines. Use `startTime`, `duration`, and text filters to limit the stream. `endTime` and `direction` apply to range requests only. An ordinary HTTP request with `queryType=tail` does not open a stream.

#### Resource-specific filters

For supported runtime targets, use `podName` or `containerName` to select instances. Repeat `containerName` to select several instances. `podName` takes precedence over `containerName`.

`type` filters log categories where supported. It does not replace `logSource`.

For build logs, OpenTofu jobs, and container scans, omit `containerName` or use `all`. These targets do not accept `podName`.

| Target or source | Restrictions |
| --- | --- |
| Service or harness runtime logs | Use `deploymentId` to select a deployment. |
| Build logs | Use `buildId`. Do not use `deploymentId`. |
| OpenTofu job | Do not use `deploymentId` or `type`. |
| Container scan | Do not use `deploymentId`, `buildId`, or `runId`. Only `type=runtime` is accepted. |
| Cluster pod | `podName` is required. Do not use `deploymentId`. Only `type=runtime` is accepted. |

### Tail logs using the JavaScript client

The Northflank Javascript client allows you to call methods, based on the resource and log type, which return a `LogsClient` object.

#### Methods

```javascript
apiClient.get.service.buildLogTail({ parameters, options });
apiClient.get.service.logTail({ parameters, options });
apiClient.get.job.logTail({ parameters, options });
apiClient.get.job.buildLogTail({ parameters, options })
apiClient.get.addon.logTail({ parameters, options });
```

The `logTail` methods return logs from running deployment containers, and the `buildLogTail` methods return logs from build containers.

The method calls take two arguments, the required object `parameters` and an optional `options` object. The `parameters` object specifies the project and resource to return logs from, and the `options` object contains filters to return logs from specific containers or builds, time ranges, or log lines that match, or do not match, certain strings or regex patterns.

- parameters
  {object} requiredSpecifies the required project and resource IDs to return logs from. Only one of `serviceId`, `jobId`, or `addonId` can be included in a request.

- projectId
  string requiredThe ID of the project that contains the resource to return logs from.
- serviceId
  string The ID of the service to return logs from.
- jobId
  string The ID of the job to return logs from.
- addonId
  string The ID of the addon to return logs from.

- options
  {object} Object containing optional filters for logs to be returned. Only one text or regex filter can be included.

- containerName
  string The ID of a specific container to return logs from, otherwise logs from all containers will be returned.
- runId
  string The ID of the job run to return logs from, if not specified logs from all runs will be returned.
- buildId
  string The ID of the build to return logs from, if not specified logs from all builds will be returned.
- lineLimit
  string The maximum number of log lines to return from the specified time range before live tailing logs, default 10.
- startTime
  Date Initial logs starting from this time, not more than line limit are returned. Default: now-30 minutes.
- textIncludes
  string Only returns log lines containing the specified string. Only one text or regex filter can be used on a single query.
- textNotIncludes
  string Only returns log lines that do not contain the specified string. Only one text or regex filter can be used on a single query.
- regexIncludes
  string Only returns log lines matching the specified regex. Only one text or regex filter can be used on a single query.
- regexNotIncludes
  string Only returns log lines that do not match the specified regex. Only one text or regex filter can be used on a single query.

To fetch logs without streaming, use `get.logs` or `get.buildLogs`. For services, see [get logs](project/services/get-service-logs.md) and [get build logs](project/services/get-service-build-logs.md).

#### LogsClient

Each method call returns a `LogsClient`, configured with the given parameters and options, which emits the events `logs-received`, `error`, `open`, and `close`, and exposes the async `start` and `stop` methods.

Logs are returned by the `LogsClient` batched in arrays. A batch is sent if it reaches 32.7kb or every second, whichever limit is reached first. Each log line in the array is an object which contains the following properties:

- LogLine
  {object} Contains a single log line response.

- containerId
  string The ID of the container that returned the log line.
- log
  any The content of the log line.
- ts
  Date The timestamp of the log.

#### Example

Below is an example implementation to stream logs from a service, after [initialising the JavaScript client](use-the-javascript-client.md#usage). This example will return the most recent 5 log lines from a service, and wait until a log line containing `END LOGS` is received to close the connection.

```javascript
const parameters = { projectId: "<my-project>", serviceId: "<deployment-service>" };
const options = { lineLimit: 5 };

// Create a new LogsClient object with the given parameters and options.
const logsClient = await apiClient.get.service.logTail({ parameters, options });

// On the 'logs-received' event process the log
logsClient.on('logs-received', async (logLines) => {
    // Print out each log line's details from the batch of logs received
    logLines.forEach((l) => {
        console.log(`Received log "${l.log}" from ${l.containerId} at ${l.ts.toTimeString()}`)
    });

    // Monitor for a specific string using regex and close the connection once received.
    const endLine = logLines.find(l => l.log.match(/END LOGS/));
    if (endLine) {
        await logsClient.stop();
    };
});

// Handle the error, open, and close events.
logsClient.on('error', (error) => console.log('error', error));

logsClient.on('open', () => console.log('open'));

logsClient.on('close', () => console.log('close'));

// Start the LogsClient to open a connection and begin receiving logs.
await logsClient.start();
```

### Tail logs using the CLI

The Northflank CLI can be used to open a log tailing session which prints logs continuously. You can add the `-f` or `--tail` flag to the standard get logs command for a resource to live tail logs.

You can open a session to live tail a deployment's logs using the following command:

`northflank get service|job|addon logs -f`

Similarly, you can live tail build logs using the following command:

`northflank get service|job build-logs -f`

The CLI command has the following options:

| Option | Description |
| --- | --- |
| --project --projectId [projectId] | The ID of the project that contains the resource to return logs from |
| --service --serviceId [serviceId] | Service to get logs from |
| --job --jobId [jobId] | Job to get logs from |
| --addon --addonId [addonId] | Addon to get logs from |
| --build --buildId [buildId] | Build to get logs from |
| --run --runId [runId] | ID of a job run to get logs from |
| --container --containerId [containerId] | Container to exec into (logs from all containers will be shown if not specified) |
| -f, --tail | Tail will stream logs in real-time. Session will be kept open |
| -l, --lineLimit [limit] | Number of lines to return |
| --startTime [timestamp] | Get logs generated after this time, example: 2020-02-02T02:02:02Z (date string) or 1580608922 (unix timestamp) |
| --textIncludes [text] | Filter log lines to include this text |
| --textNotIncludes [text] | Filter log lines to not include this text |
| --regexIncludes [regex] | Filter log lines to match this regular expression |
| --regexNotIncludes [regex] | Filter log lines to not match this regular expression |
| --noDefaults | Don't use context default values, explicitly use options or ask. (default: false) |
| -o, --output [output] | Output formatting. Will use advanced formatting by default. (choices: "format", "json", "yaml") |

When you run the command with the `-l` or `--lineLimit` option, the most recent specified number of log lines from the given `--startTime` will be returned before live tailing begins.

#### Formatting

You can use the `-o` or `--output` flag to specify the format of the logs received in the console.

The `format` and `json` options will return logs in batches of JSON objects in an array. The `format` option returns printed JSON with highlights, while `json` returns pure JSON.

```javascript
[ { containerId: 'deployment-service-734b0d6fe-x97pq',
log: '2023-04-13T08:18:13.944190216Z stdout F TEST',
ts: 2023-04-13T08:18:13.950Z },
{ containerId: 'deployment-service-734b0d6fe-x97pq',
log: '2023-04-13T08:18:14.570410388Z stdout F TEST',
ts: 2023-04-13T08:18:14.701Z },
{ containerId: 'deployment-service-734b0d6fe-x97pq',
log: '2023-04-13T08:18:15.039314832Z stdout F TEST',
ts: 2023-04-13T08:18:15.202Z }, ]
[ { containerId: 'deployment-service-734b0d6fe-x97pq',
    log: '2023-04-13T08:22:07.056818563Z stdout F TEST',
    ts: 2023-04-13T08:22:07.217Z } ]
```

The `yaml` option returns logs as plain YAML:

```yaml
- containerId: deployment-service-734b0d6fe-x97pq
  log: '2023-04-13T08:24:57.405065103Z stdout F TEST'
  ts: 2023-04-13T08:24:57.644Z
- containerId: deployment-service-734b0d6fe-x97pq
  log: '2023-04-13T08:24:58.08643362Z stdout F TEST'
  ts: 2023-04-13T08:24:58.145Z
- containerId: deployment-service-734b0d6fe-x97pq
  log: '2023-04-13T08:24:58.852389498Z stdout F TEST'
  ts: 2023-04-13T08:24:58.895Z
```
