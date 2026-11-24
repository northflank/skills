# Create log sink

Source: https://northflank.com/docs/v1/api/team/integrations/create-log-sink.md

Creates a new log sink.

Required permission: Account > Observability > LogSinks > Create

**Request body:**

{object} Create a log sink using Loki
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: loki)
- `sinkData`: {object} (required) Details about the Loki log sink.
  - `endpoint`: (string) (required) The endpoint of the Loki log sink.
  - `encoding`: {object} Encoding options
    - `codec`: (string) (required) Codec to encode logs in (enum: text, json)
  - `auth`: {object} Object containing authentication data for the log sink.
    - `strategy`: (string) The authentication strategy. (enum: basic)
    - `user`: (string) The username for the log sink.
    - `password`: (string) The password for the log sink.

OR

{object} Create a log sink using Datadog
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: datadog_logs)
- `sinkData`: {object} (required) Details about the Datadog log sink.
  - `default_api_key`: (string) (required) The Datadog API key.
  - `region`: (string) (required) The Datadog region. (enum: eu, us, us3, us5)

OR

{object} Create a log sink using Papertrail
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: papertrail)
- `sinkData`: (multiple options) (required) Papertrail Sink Schema. {object} Authenticate with a host/port
   - `authenticationStrategy`: (string) (required) The authentication strategy. (enum: port)
   - `host`: (string) (required) The host for the Papertrail log destination.
   - `port`: (number) (required) The port for the Papertrail log destination. (format: float) | {object} Authenticate with a token.
   - `authenticationStrategy`: (string) (required) The authentication strategy. (enum: token)
   - `uri`: (string) (required) The uri for the Papertrail log destination.
   - `token`: (string) (required) The HTTP Token for the Papertrail log destination.

OR

{object} Create a log sink using AWS S3
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: aws_s3)
- `sinkData`: {object} (required) Details about the AWS S3 log sink.
  - `endpoint`: (string) (required) Endpoint for the AWS S3 or compatible API bucket.
  - `region`: (string) (required) Region of the S3 bucket. (enum: eu-west-1, eu-west-2, eu-west-3, eu-central-1, eu-south-1, eu-north-1, us-west-1, us-west-2, us-east-1, us-east2)
  - `auth`: {object} Authentication object.
    - `accessKeyId`: (string) (required) Access key id for the bucket.
    - `secretAccessKey`: (string) (required) Secret access key for the bucket.
  - `bucket`: (string) (required) Name of the S3 Bucket.
  - `compression`: (string) (required) Log file compression method. (enum: gzip, none)

OR

{object} Create a log sink using HTTP
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: http)
- `sinkData`: {object} (required) Details about the HTTP log sink.
  - `uri`: (string) (required) Uri to send logs to.
  - `encoding`: {object} (required) Encoding options
    - `codec`: (string) (required) Codec to encode logs in (enum: text, json)
  - `batch`: {object}
    - `maxEvents`: (number) The max number of events in a batch before sending (format: float)
    - `maxBytes`: (number) The max size of a batch in bytes before sending (format: float)
  - `auth`: (multiple options) (required) Auth information. {object} No authentication strategy
     - `strategy`: (string) (required) No authentication strategy (enum: none) | {object} Authenticate with a basic http strategy.
     - `strategy`: (string) (required) Basic HTTP authentication strategy. (enum: basic)
     - `user`: (string) Username for basic http authentication.
     - `password`: (string) (required) Password for basic http authentication. | {object} Authenticate with a bearer token strategy.
     - `strategy`: (string) (required) Bearer token authentication strategy. (enum: bearer)
     - `token`: (string) (required) Token for bearer token authentication.
  - `framing`: {object}
    - `method`: (string) (enum: none, newline, length)

OR

{object} Create a log sink using LogDNA
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: logdna)
- `sinkData`: {object} (required) Details about the LogDNA log sink.
  - `api_key`: (string) (required) Ingestion Key

OR

{object} Create a log sink using Better Stack
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: betterStack)
- `sinkData`: {object} (required) Details about the Better Stack log sink.
  - `token`: (string) (required) Better Stack Source Token
  - `uri`: (string) (required) Better stack ingestion host

OR

{object} Create a log sink using Honeycomb
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: honeycomb)
- `sinkData`: {object} (required) Details about the Honeycomb log sink.
  - `api_key`: (string) (required) Honeycomb API Key
  - `dataset`: (string) (required) Name of the dataset

OR

{object} Create a log sink using Logz.io
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: logzio)
- `sinkData`: {object} (required) Details about the Logz.io log sink.
  - `region`: (string) (required) Your Logzio region code (enum: eu, uk, us, ca, au, nl, wa)
  - `token`: (string) (required) The Log Shipping Token of the account you want to ship to

OR

{object} Create a log sink using Solar Winds
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: solarWinds)
- `sinkData`: {object} (required) Details about the Solar Winds log sink.
  - `api_key`: (string) (required) Solar Winds API Key
  - `encoding`: {object}
    - `codec`: (string) (required) Codec to encode logs in (enum: text, json)
  - `endpointType`: (string) (required) Solar Winds endpoint type (enum: unitary, bulk)

OR

{object} Create a log sink using Axiom
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: axiom)
- `sinkData`: {object} (required) Details about the Axiom log sink.
  - `dataset`: (string) (required) Name of the data
  - `token`: (string) (required) Axiom API token
  - `tokenType`: (string) Deprecated token type. (enum: personal, api)
  - `orgId`: (string) Deprecated Axiom organisation ID.
  - `region`: (string) Axiom edge deployment domain, without a scheme or path. (pattern: ^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.aws\.edge\.axiom\.co$)
  - `url`: (string) Custom Axiom endpoint. A URL with a path is used as-is.

OR

{object} Create a log sink using New Relic
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: newRelic)
- `sinkData`: {object} (required) Details about the New Relic log sink.
  - `accountId`: (string) (required) New Relic Account ID
  - `licenseKey`: (string) (required) New Relic License Key
  - `region`: (string) (required) (enum: eu, us)

OR

{object} Create a log sink using Sentry
- `name`: (string) (required) Name of the log sink.
- `description`: (string) Description of the log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `restrictions`: {object} Configuration of restrictions.
  - `tags`: {object} Configuration of tag restriction settings.
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `sinkType`: (string) (required) The type of the log sink. (enum: sentry)
- `sinkData`: {object} (required) Details about the Sentry log sink.
  - `endpoint`: (string) (required) The complete OTLP logs endpoint from your Sentry Client Keys configuration. (pattern: ^https:\/\/[\w.-]+\.sentry\.io\/)
  - `publicKey`: (string) (required) The public key from your Sentry OTLP DSN (Client Keys (DSN) > OpenTelemetry).

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) The ID of the new log sink.

### API reference

POST /v1/integrations/log-sinks

POST /v1/teams/{teamId}/integrations/log-sinks

#### Example request

Request body

Create a log sink using Loki

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"loki","sinkData":{"endpoint":"https://logs.example.com","encoding":{"codec":"json"},"auth":{"strategy":"basic","user":"admin","password":"password1234"}}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "loki",
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

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"loki\",\"sinkData\":{\"endpoint\":\"https://logs.example.com\",\"encoding\":{\"codec\":\"json\"},\"auth\":{\"strategy\":\"basic\",\"user\":\"admin\",\"password\":\"password1234\"}}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"loki\",\"sinkData\":{\"endpoint\":\"https://logs.example.com\",\"encoding\":{\"codec\":\"json\"},\"auth\":{\"strategy\":\"basic\",\"user\":\"admin\",\"password\":\"password1234\"}}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Datadog

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"datadog_logs","sinkData":{"default_api_key":"abcdef12345678900000000000000000","region":"eu"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "datadog_logs",
  "sinkData": {
    "default_api_key": "abcdef12345678900000000000000000",
    "region": "eu"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"datadog_logs\",\"sinkData\":{\"default_api_key\":\"abcdef12345678900000000000000000\",\"region\":\"eu\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"datadog_logs\",\"sinkData\":{\"default_api_key\":\"abcdef12345678900000000000000000\",\"region\":\"eu\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Papertrail

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"papertrail","sinkData":{"authenticationStrategy":"port","host":"logs1.papertrailapp.com:","port":8000}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "papertrail",
  "sinkData": {
    "authenticationStrategy": "port",
    "host": "logs1.papertrailapp.com:",
    "port": 8000
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"papertrail\",\"sinkData\":{\"authenticationStrategy\":\"port\",\"host\":\"logs1.papertrailapp.com:\",\"port\":8000}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"papertrail\",\"sinkData\":{\"authenticationStrategy\":\"port\",\"host\":\"logs1.papertrailapp.com:\",\"port\":8000}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using AWS S3

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"aws_s3","sinkData":{"endpoint":"my.bucket.com","region":"eu-west-2","auth":{"accessKeyId":"PMSACIHNUIASDBWQDS","secretAccessKey":"HA1PLMNOEAEYUHAJQMSDUJQS"},"bucket":"northflank-logs","compression":"gzip"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "aws_s3",
  "sinkData": {
    "endpoint": "my.bucket.com",
    "region": "eu-west-2",
    "auth": {
      "accessKeyId": "PMSACIHNUIASDBWQDS",
      "secretAccessKey": "HA1PLMNOEAEYUHAJQMSDUJQS"
    },
    "bucket": "northflank-logs",
    "compression": "gzip"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"aws_s3\",\"sinkData\":{\"endpoint\":\"my.bucket.com\",\"region\":\"eu-west-2\",\"auth\":{\"accessKeyId\":\"PMSACIHNUIASDBWQDS\",\"secretAccessKey\":\"HA1PLMNOEAEYUHAJQMSDUJQS\"},\"bucket\":\"northflank-logs\",\"compression\":\"gzip\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"aws_s3\",\"sinkData\":{\"endpoint\":\"my.bucket.com\",\"region\":\"eu-west-2\",\"auth\":{\"accessKeyId\":\"PMSACIHNUIASDBWQDS\",\"secretAccessKey\":\"HA1PLMNOEAEYUHAJQMSDUJQS\"},\"bucket\":\"northflank-logs\",\"compression\":\"gzip\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using HTTP

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"http","sinkData":{"uri":"my.log-collector.com","encoding":{"codec":"json"},"batch":{"maxEvents":"10","maxBytes":"1e+7"},"auth":{"strategy":"none"}}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "http",
  "sinkData": {
    "uri": "my.log-collector.com",
    "encoding": {
      "codec": "json"
    },
    "batch": {
      "maxEvents": "10",
      "maxBytes": "1e+7"
    },
    "auth": {
      "strategy": "none"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"http\",\"sinkData\":{\"uri\":\"my.log-collector.com\",\"encoding\":{\"codec\":\"json\"},\"batch\":{\"maxEvents\":\"10\",\"maxBytes\":\"1e+7\"},\"auth\":{\"strategy\":\"none\"}}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"http\",\"sinkData\":{\"uri\":\"my.log-collector.com\",\"encoding\":{\"codec\":\"json\"},\"batch\":{\"maxEvents\":\"10\",\"maxBytes\":\"1e+7\"},\"auth\":{\"strategy\":\"none\"}}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using LogDNA

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"logdna","sinkData":{"api_key":"b1dd3feb585asd1a3e9edpo9kmn5e590hg9"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "logdna",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"logdna\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"logdna\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Better Stack

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"betterStack","sinkData":{"token":"vhnqrLygVQ5GnSQUTZamKvAq","uri":"abc123.eu-nbg-2.betterstackdata.com"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "betterStack",
  "sinkData": {
    "token": "vhnqrLygVQ5GnSQUTZamKvAq",
    "uri": "abc123.eu-nbg-2.betterstackdata.com"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"betterStack\",\"sinkData\":{\"token\":\"vhnqrLygVQ5GnSQUTZamKvAq\",\"uri\":\"abc123.eu-nbg-2.betterstackdata.com\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"betterStack\",\"sinkData\":{\"token\":\"vhnqrLygVQ5GnSQUTZamKvAq\",\"uri\":\"abc123.eu-nbg-2.betterstackdata.com\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Honeycomb

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"honeycomb","sinkData":{"api_key":"b1dd3feb585asd1a3e9","dataset":"staging-logs"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "honeycomb",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9",
    "dataset": "staging-logs"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"honeycomb\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9\",\"dataset\":\"staging-logs\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"honeycomb\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9\",\"dataset\":\"staging-logs\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Logz.io

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"logzio","sinkData":{"region":"eu","token":"sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "logzio",
  "sinkData": {
    "region": "eu",
    "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"logzio\",\"sinkData\":{\"region\":\"eu\",\"token\":\"sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"logzio\",\"sinkData\":{\"region\":\"eu\",\"token\":\"sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Solar Winds

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"solarWinds","sinkData":{"api_key":"Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc","encoding":{"codec":"json"},"endpointType":"unitary"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "solarWinds",
  "sinkData": {
    "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
    "encoding": {
      "codec": "json"
    },
    "endpointType": "unitary"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"solarWinds\",\"sinkData\":{\"api_key\":\"Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc\",\"encoding\":{\"codec\":\"json\"},\"endpointType\":\"unitary\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"solarWinds\",\"sinkData\":{\"api_key\":\"Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc\",\"encoding\":{\"codec\":\"json\"},\"endpointType\":\"unitary\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Axiom

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"axiom","sinkData":{"dataset":"staging","token":"b1dd3feb585asd1a3e9edpo9kmn5e590hg9","tokenType":"api","region":"eu-central-1.aws.edge.axiom.co"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "axiom",
  "sinkData": {
    "dataset": "staging",
    "token": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
    "tokenType": "api",
    "region": "eu-central-1.aws.edge.axiom.co"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"axiom\",\"sinkData\":{\"dataset\":\"staging\",\"token\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\",\"tokenType\":\"api\",\"region\":\"eu-central-1.aws.edge.axiom.co\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"axiom\",\"sinkData\":{\"dataset\":\"staging\",\"token\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\",\"tokenType\":\"api\",\"region\":\"eu-central-1.aws.edge.axiom.co\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using New Relic

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"newRelic","sinkData":{"accountId":"b1dd3feb585asd1a3e9","licenseKey":"b1dd3feb585asd1a3e9","region":"eu"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "newRelic",
  "sinkData": {
    "accountId": "b1dd3feb585asd1a3e9",
    "licenseKey": "b1dd3feb585asd1a3e9",
    "region": "eu"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"newRelic\",\"sinkData\":{\"accountId\":\"b1dd3feb585asd1a3e9\",\"licenseKey\":\"b1dd3feb585asd1a3e9\",\"region\":\"eu\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"newRelic\",\"sinkData\":{\"accountId\":\"b1dd3feb585asd1a3e9\",\"licenseKey\":\"b1dd3feb585asd1a3e9\",\"region\":\"eu\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

OR

Create a log sink using Sentry

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"example-log-sink","description":"This is an example log sink.","restricted":true,"projects":["default-project"],"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"sinkType":"sentry","sinkData":{"endpoint":"https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs","publicKey":"5cac0d8cb9414d5c80eb8467f55d5352"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks"
```

```javascript
const payload = {
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "sentry",
  "sinkData": {
    "endpoint": "https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs",
    "publicKey": "5cac0d8cb9414d5c80eb8467f55d5352"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/log-sinks"

payload = "{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"sentry\",\"sinkData\":{\"endpoint\":\"https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs\",\"publicKey\":\"5cac0d8cb9414d5c80eb8467f55d5352\"}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/integrations/log-sinks"

  var jsonStr = []byte("{\"name\":\"example-log-sink\",\"description\":\"This is an example log sink.\",\"restricted\":true,\"projects\":[\"default-project\"],\"restrictions\":{\"tags\":{\"enabled\":false,\"matchCondition\":\"or\"}},\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"sinkType\":\"sentry\",\"sinkData\":{\"endpoint\":\"https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs\",\"publicKey\":\"5cac0d8cb9414d5c80eb8467f55d5352\"}}")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

#### Example Response

200 OK: Details about a log sink.

```json
{
  "data": {
    "id": "example-log-sink"
  }
}
```

### CLI reference

$ northflank create log-sink

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

Create a log sink using Loki

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "loki",
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

OR

Create a log sink using Datadog

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "datadog_logs",
  "sinkData": {
    "default_api_key": "abcdef12345678900000000000000000",
    "region": "eu"
  }
}
```

OR

Create a log sink using Papertrail

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "papertrail",
  "sinkData": {
    "authenticationStrategy": "port",
    "host": "logs1.papertrailapp.com:",
    "port": 8000
  }
}
```

OR

Create a log sink using AWS S3

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "aws_s3",
  "sinkData": {
    "endpoint": "my.bucket.com",
    "region": "eu-west-2",
    "auth": {
      "accessKeyId": "PMSACIHNUIASDBWQDS",
      "secretAccessKey": "HA1PLMNOEAEYUHAJQMSDUJQS"
    },
    "bucket": "northflank-logs",
    "compression": "gzip"
  }
}
```

OR

Create a log sink using HTTP

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "http",
  "sinkData": {
    "uri": "my.log-collector.com",
    "encoding": {
      "codec": "json"
    },
    "batch": {
      "maxEvents": "10",
      "maxBytes": "1e+7"
    },
    "auth": {
      "strategy": "none"
    }
  }
}
```

OR

Create a log sink using LogDNA

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "logdna",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9"
  }
}
```

OR

Create a log sink using Better Stack

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "betterStack",
  "sinkData": {
    "token": "vhnqrLygVQ5GnSQUTZamKvAq",
    "uri": "abc123.eu-nbg-2.betterstackdata.com"
  }
}
```

OR

Create a log sink using Honeycomb

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "honeycomb",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9",
    "dataset": "staging-logs"
  }
}
```

OR

Create a log sink using Logz.io

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "logzio",
  "sinkData": {
    "region": "eu",
    "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"
  }
}
```

OR

Create a log sink using Solar Winds

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "solarWinds",
  "sinkData": {
    "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
    "encoding": {
      "codec": "json"
    },
    "endpointType": "unitary"
  }
}
```

OR

Create a log sink using Axiom

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "axiom",
  "sinkData": {
    "dataset": "staging",
    "token": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
    "tokenType": "api",
    "region": "eu-central-1.aws.edge.axiom.co"
  }
}
```

OR

Create a log sink using New Relic

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "newRelic",
  "sinkData": {
    "accountId": "b1dd3feb585asd1a3e9",
    "licenseKey": "b1dd3feb585asd1a3e9",
    "region": "eu"
  }
}
```

OR

Create a log sink using Sentry

```json
{
  "name": "example-log-sink",
  "description": "This is an example log sink.",
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "options": {
    "useCustomLabels": true,
    "forwardCdnLogs": true,
    "forwardIngressLogs": true,
    "forwardMeshLogs": true
  },
  "sinkType": "sentry",
  "sinkData": {
    "endpoint": "https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs",
    "publicKey": "5cac0d8cb9414d5c80eb8467f55d5352"
  }
}
```

#### Example Response

 Details about a log sink.

```json
{
  "id": "example-log-sink"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

Create a log sink using Loki

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "loki",
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
});
```

OR

Create a log sink using Datadog

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "datadog_logs",
    "sinkData": {
      "default_api_key": "abcdef12345678900000000000000000",
      "region": "eu"
    }
  }
});
```

OR

Create a log sink using Papertrail

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "papertrail",
    "sinkData": {
      "authenticationStrategy": "port",
      "host": "logs1.papertrailapp.com:",
      "port": 8000
    }
  }
});
```

OR

Create a log sink using AWS S3

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "aws_s3",
    "sinkData": {
      "endpoint": "my.bucket.com",
      "region": "eu-west-2",
      "auth": {
        "accessKeyId": "PMSACIHNUIASDBWQDS",
        "secretAccessKey": "HA1PLMNOEAEYUHAJQMSDUJQS"
      },
      "bucket": "northflank-logs",
      "compression": "gzip"
    }
  }
});
```

OR

Create a log sink using HTTP

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "http",
    "sinkData": {
      "uri": "my.log-collector.com",
      "encoding": {
        "codec": "json"
      },
      "batch": {
        "maxEvents": "10",
        "maxBytes": "1e+7"
      },
      "auth": {
        "strategy": "none"
      }
    }
  }
});
```

OR

Create a log sink using LogDNA

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "logdna",
    "sinkData": {
      "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9"
    }
  }
});
```

OR

Create a log sink using Better Stack

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "betterStack",
    "sinkData": {
      "token": "vhnqrLygVQ5GnSQUTZamKvAq",
      "uri": "abc123.eu-nbg-2.betterstackdata.com"
    }
  }
});
```

OR

Create a log sink using Honeycomb

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "honeycomb",
    "sinkData": {
      "api_key": "b1dd3feb585asd1a3e9",
      "dataset": "staging-logs"
    }
  }
});
```

OR

Create a log sink using Logz.io

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "logzio",
    "sinkData": {
      "region": "eu",
      "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"
    }
  }
});
```

OR

Create a log sink using Solar Winds

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "solarWinds",
    "sinkData": {
      "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
      "encoding": {
        "codec": "json"
      },
      "endpointType": "unitary"
    }
  }
});
```

OR

Create a log sink using Axiom

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "axiom",
    "sinkData": {
      "dataset": "staging",
      "token": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
      "tokenType": "api",
      "region": "eu-central-1.aws.edge.axiom.co"
    }
  }
});
```

OR

Create a log sink using New Relic

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "newRelic",
    "sinkData": {
      "accountId": "b1dd3feb585asd1a3e9",
      "licenseKey": "b1dd3feb585asd1a3e9",
      "region": "eu"
    }
  }
});
```

OR

Create a log sink using Sentry

```javascript
await apiClient.create.logSink({
  data: {
    "name": "example-log-sink",
    "description": "This is an example log sink.",
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "options": {
      "useCustomLabels": true,
      "forwardCdnLogs": true,
      "forwardIngressLogs": true,
      "forwardMeshLogs": true
    },
    "sinkType": "sentry",
    "sinkData": {
      "endpoint": "https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs",
      "publicKey": "5cac0d8cb9414d5c80eb8467f55d5352"
    }
  }
});
```

#### Example Response

 Details about a log sink.

```json
{
  "data": {
    "id": "example-log-sink"
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

Create a log sink using Loki

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "loki",
        "sinkData": {
            "endpoint": "https://logs.example.com",
            "encoding": {
                "codec": "json",
            },
            "auth": {
                "strategy": "basic",
                "user": "admin",
                "password": "password1234",
            },
        },
    },
)
print(response.data)
```

OR

Create a log sink using Datadog

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "datadog_logs",
        "sinkData": {
            "default_api_key": "abcdef12345678900000000000000000",
            "region": "eu",
        },
    },
)
print(response.data)
```

OR

Create a log sink using Papertrail

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "papertrail",
        "sinkData": {
            "authenticationStrategy": "port",
            "host": "logs1.papertrailapp.com:",
            "port": 8000,
        },
    },
)
print(response.data)
```

OR

Create a log sink using AWS S3

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "aws_s3",
        "sinkData": {
            "endpoint": "my.bucket.com",
            "region": "eu-west-2",
            "auth": {
                "accessKeyId": "PMSACIHNUIASDBWQDS",
                "secretAccessKey": "HA1PLMNOEAEYUHAJQMSDUJQS",
            },
            "bucket": "northflank-logs",
            "compression": "gzip",
        },
    },
)
print(response.data)
```

OR

Create a log sink using HTTP

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "http",
        "sinkData": {
            "uri": "my.log-collector.com",
            "encoding": {
                "codec": "json",
            },
            "batch": {
                "maxEvents": "10",
                "maxBytes": "1e+7",
            },
            "auth": {
                "strategy": "none",
            },
        },
    },
)
print(response.data)
```

OR

Create a log sink using LogDNA

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "logdna",
        "sinkData": {
            "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
        },
    },
)
print(response.data)
```

OR

Create a log sink using Better Stack

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "betterStack",
        "sinkData": {
            "token": "vhnqrLygVQ5GnSQUTZamKvAq",
            "uri": "abc123.eu-nbg-2.betterstackdata.com",
        },
    },
)
print(response.data)
```

OR

Create a log sink using Honeycomb

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "honeycomb",
        "sinkData": {
            "api_key": "b1dd3feb585asd1a3e9",
            "dataset": "staging-logs",
        },
    },
)
print(response.data)
```

OR

Create a log sink using Logz.io

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "logzio",
        "sinkData": {
            "region": "eu",
            "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa",
        },
    },
)
print(response.data)
```

OR

Create a log sink using Solar Winds

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "solarWinds",
        "sinkData": {
            "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
            "encoding": {
                "codec": "json",
            },
            "endpointType": "unitary",
        },
    },
)
print(response.data)
```

OR

Create a log sink using Axiom

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "axiom",
        "sinkData": {
            "dataset": "staging",
            "token": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
            "tokenType": "api",
            "region": "eu-central-1.aws.edge.axiom.co",
        },
    },
)
print(response.data)
```

OR

Create a log sink using New Relic

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "newRelic",
        "sinkData": {
            "accountId": "b1dd3feb585asd1a3e9",
            "licenseKey": "b1dd3feb585asd1a3e9",
            "region": "eu",
        },
    },
)
print(response.data)
```

OR

Create a log sink using Sentry

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.create.log_sink(
    data={
        "name": "example-log-sink",
        "description": "This is an example log sink.",
        "restricted": True,
        "projects": ["default-project"],
        "restrictions": {
            "tags": {
                "enabled": False,
                "matchCondition": "or",
            },
        },
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "sinkType": "sentry",
        "sinkData": {
            "endpoint": "https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs",
            "publicKey": "5cac0d8cb9414d5c80eb8467f55d5352",
        },
    },
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "example-log-sink"
}
```
