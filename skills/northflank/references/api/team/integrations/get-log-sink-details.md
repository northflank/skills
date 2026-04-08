# Get log sink details

Source: https://northflank.com/docs/v1/api/team/integrations/get-log-sink-details.md

Gets details about a given log sink.

Required permission: Account > Sinks > General > Read

**Path parameters:**

{object}
- `logSinkId`: (string) (required) ID of the log sink

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) Name of the log sink.
  - `id`: (string) (required) Identifier for the Log Sink
  - `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `restricted`: (boolean) (required) If `true`, only logs from the projects in `projects` will be sent to the log sink.
  - `projects`: [array of] (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
  - `status`: (string) (required) Current status of the log sink (enum: paused, running, failing, creating)
  - `options`: {object}
    - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
    - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
    - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
    - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
  - `sinkType`: (string) (required) The type of the log sink. (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic)
  - `createdAt`: (string) (required) Timestamp of when the log sink was created. (format: date-time)
  - `updatedAt`: (string) (required) Timestamp of when the log sink was last updated. (format: date-time)
  - `sinkData`: (multiple options) {object}
     - `endpoint`: (string) (required) The endpoint of the Loki log sink.
     - `encoding`: {object}
       - `codec`: (string) (required) Codec to encode logs in (enum: text, json)
     - `auth`: {object}
       - `strategy`: (string) The authentication strategy. (enum: basic)
       - `user`: (string) The username for the log sink.
       - `password`: (string) The password for the log sink. | {object}
     - `default_api_key`: (string) (required) The Datadog API key.
     - `region`: (string) (required) The Datadog region. (enum: eu, us, us3, us5) | (multiple options) {object}
      - `authenticationStrategy`: (string) (required) The authentication strategy. (enum: port)
      - `host`: (string) (required) The host for the Papertrail log destination.
      - `port`: (number) (required) The port for the Papertrail log destination. (format: float) | {object}
      - `authenticationStrategy`: (string) (required) The authentication strategy. (enum: token)
      - `uri`: (string) (required) The uri for the Papertrail log destination.
      - `token`: (string) (required) The HTTP Token for the Papertrail log destination. | {object}
     - `endpoint`: (string) (required) Endpoint for the AWS S3 or compatible API bucket.
     - `region`: (string) (required) Region of the S3 bucket. (enum: eu-west-1, eu-west-2, eu-west-3, eu-central-1, eu-south-1, eu-north-1, us-west-1, us-west-2, us-east-1, us-east2)
     - `auth`: {object}
       - `accessKeyId`: (string) (required) Access key id for the bucket.
       - `secretAccessKey`: (string) (required) Secret access key for the bucket.
     - `bucket`: (string) (required) Name of the S3 Bucket.
     - `compression`: (string) (required) Log file compression method. (enum: gzip, none) | {object}
     - `uri`: (string) (required) Uri to send logs to.
     - `encoding`: {object}
       - `codec`: (string) (required) Codec to encode logs in (enum: text, json)
     - `batch`: {object}
       - `maxEvents`: (number) The max number of events in a batch before sending (format: float)
       - `maxBytes`: (number) The max size of a batch in bytes before sending (format: float)
     - `auth`: (multiple options) {object}
         - `strategy`: (string) (required) No authentication strategy (enum: none) | {object}
         - `strategy`: (string) (required) Basic HTTP authentication strategy. (enum: basic)
         - `user`: (string) Username for basic http authentication.
         - `password`: (string) (required) Password for basic http authentication. | {object}
         - `strategy`: (string) (required) Bearer token authentication strategy. (enum: bearer)
         - `token`: (string) Token for bearer token authentication.
     - `framing`: {object}
       - `method`: (string) (enum: none, newline, length) | {object}
     - `api_key`: (string) (required) Ingestion Key | {object}
     - `token`: (string) (required) Better Stack Source Token
     - `uri`: (string) (required) Better stack ingestion host | {object}
     - `api_key`: (string) (required) Honeycomb API Key
     - `dataset`: (string) (required) Name of the dataset | {object}
     - `region`: (string) (required) Your Logzio region code (enum: eu, uk, us, ca, au, nl, wa)
     - `token`: (string) (required) The Log Shipping Token of the account you want to ship to | {object}
     - `api_key`: (string) (required) Solar Winds API Key
     - `encoding`: {object}
       - `codec`: (string) (required) Codec to encode logs in (enum: text, json)
     - `endpointType`: (string) (required) Solar Winds endpoint type (enum: unitary, bulk) | {object}
     - `dataset`: (string) (required) Name of the data
     - `token`: (string) (required) Axiom API/Personal token
     - `tokenType`: (string) (required) Using a personal token (enum: personal, api)
     - `orgId`: (string) The ID of the organisation, required if using a personal token
     - `url`: (string) The Axiom url to use. Only change if self hosting axiom. | {object}
     - `accountId`: (string) (required) New Relic Account ID
     - `licenseKey`: (string) (required) New Relic License Key
     - `region`: (string) (required) (enum: eu, us)

### API reference

GET /v1/integrations/log-sinks/{logSinkId}

GET /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}

#### Example Response

200 OK: Details about a log sink.

```json
{
  "data": {
    "name": "example-log-sink",
    "id": "example-project",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "http",
    "createdAt": "2022-06-14 15:10:42.842Z",
    "updatedAt": "2022-06-14 15:10:42.842Z",
    "sinkData": {
      "endpoint": "https://logs.example.com",
      "encoding": {
        "codec": "json"
      },
      "auth": {
        "strategy": "basic",
        "user": "admin",
        "password": "password1234"
      }
    }
  }
}
```

### CLI reference

$ northflank get log-sink

Options:

- `--logSinkId <logSinkId>`: ID of the log sink

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about a log sink.

```json
{
  "name": "example-log-sink",
  "id": "example-project",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "http",
  "createdAt": "2022-06-14 15:10:42.842Z",
  "updatedAt": "2022-06-14 15:10:42.842Z",
  "sinkData": {
    "endpoint": "https://logs.example.com",
    "encoding": {
      "codec": "json"
    },
    "auth": {
      "strategy": "basic",
      "user": "admin",
      "password": "password1234"
    }
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  }
});
```

#### Example Response

 Details about a log sink.

```json
{
  "data": {
    "name": "example-log-sink",
    "id": "example-project",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "http",
    "createdAt": "2022-06-14 15:10:42.842Z",
    "updatedAt": "2022-06-14 15:10:42.842Z",
    "sinkData": {
      "endpoint": "https://logs.example.com",
      "encoding": {
        "codec": "json"
      },
      "auth": {
        "strategy": "basic",
        "user": "admin",
        "password": "password1234"
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
