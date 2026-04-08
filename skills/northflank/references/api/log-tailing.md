# Log tailing

Source: https://northflank.com/docs/v1/api/log-tailing.md

You can stream live logs from your services, jobs, and addons using the log tailing feature in the Northflank [JavaScript client](use-the-javascript-client.md) and the [Northflank CLI](use-the-cli.md). Both methods use WebSockets to stream the requested logs from your resources.

You can receive logs from containers for deployed services and addons, or build logs from builds. Much like [viewing logs in the Northflank application](../guides/observe.md#view-logs), you can live tail all logs or filter them based on various parameters.

To fetch logs without live tailing, you can use the standard `get.logs` and `get.buildLogs` methods, for example [get logs](project/services/get-service-logs.md) and [get build logs](project/services/get-service-build-logs.md) for services.

When you start a live log tailing session it will by default return the 10 most recent log lines from the previous 30 minutes. You can change these parameters to include more log lines from the previous period, or retrieve logs from an earlier start time. After retrieving the previous logs, the session will then begin returning log lines live, as they are generated.

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
