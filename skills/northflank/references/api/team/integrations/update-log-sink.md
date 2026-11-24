# Update log sink

Source: https://northflank.com/docs/v1/api/team/integrations/update-log-sink.md

Updates the settings for a log sink.

Required permission: Account > Observability > LogSinks > Update

**Path parameters:**

{object}
- `logSinkId`: (string) (required) ID of the log sink

**Request body:**

{object} Update a log sink using Loki
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Loki log sink.
  - `endpoint`: (string) The endpoint of the Loki log sink.
  - `auth`: {object} Object containing authentication data for the log sink.
    - `strategy`: (string) The authentication method. (enum: basic)
    - `user`: (string) The username for the log sink.
    - `password`: (string) The password for the log sink.

OR

{object} Update a log sink using Datadog
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Datadog log sink.
  - `default_api_key`: (string) The Datadog API key.
  - `region`: (string) The Datadog region. (enum: eu, us, us3, us5)

OR

{object} Update a log sink using Papertrail
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: (multiple options) (required) Papertrail Sink Schema. {object} Authenticate with a host/port
   - `authenticationStrategy`: (string) The authentication strategy. (enum: port)
   - `host`: (string) The host for the Papertrail log destination.
   - `port`: (number) The port for the Papertrail log destination. (format: float) | {object} Authenticate with a token.
   - `authenticationStrategy`: (string) The authentication strategy. (enum: token)
   - `uri`: (string) The uri for the Papertrail log destination.
   - `token`: (string) The HTTP Token for the Papertrail log destination.

OR

{object} Update a log sink using HTTP
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the HTTP log sink.
  - `uri`: (string) (required) Uri to send logs to.
  - `encoding`: {object} (required) Encoding options
    - `codec`: (string) Codec to encode logs in (enum: text, json)
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

{object} Update a log sink using AWS S3
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the AWS S3 log sink.
  - `endpoint`: (string) Endpoint for the AWS S3 or compatible API bucket.
  - `region`: (string) Region of the S3 bucket. (enum: eu-west-1, eu-west-2, eu-west-3, eu-central-1, eu-south-1, eu-north-1, us-west-1, us-west-2, us-east-1, us-east2)
  - `auth`: {object} Authentication object.
    - `accessKeyId`: (string) Access key id for the bucket.
    - `secretAccessKey`: (string) Secret access key for the bucket.
  - `bucket`: (string) Name of the S3 Bucket.
  - `compression`: (string) Log file compression method. (enum: gzip, none)

OR

{object} Update a log sink using Better Stack
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Better Stack log sink.
  - `token`: (string) Better Stack Source Token
  - `uri`: (string) Better stack ingestion host

OR

{object} Update a log sink using LogDNA
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the LogDNA log sink.
  - `api_key`: (string) Ingestion Key

OR

{object} Update a log sink using Logz.io
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Logz.io log sink.
  - `region`: (string) Your Logzio region code (enum: eu, uk, us, ca, au, nl, wa)
  - `token`: (string) The Log Shipping Token of the account you want to ship to

OR

{object} Update a log sink using Solar Winds
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Solar Winds log sink.
  - `api_key`: (string) Solar Winds API Key
  - `encoding`: {object}
    - `codec`: (string) Codec to encode logs in (enum: text, json)
  - `endpointType`: (string) Solar Winds endpoint type (enum: unitary, bulk)

OR

{object} Update a log sink using Honeycomb
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Honeycomb log sink.
  - `api_key`: (string) Honeycomb API Key
  - `dataset`: (string) Name of the dataset

OR

{object} Update a log sink using Axiom
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Axiom log sink.
  - `dataset`: (string) (required) Name of the data
  - `token`: (string) Axiom API token
  - `tokenType`: (string) Deprecated token type. (enum: personal, api)
  - `orgId`: (string) Deprecated Axiom organisation ID.
  - `region`: (string) Axiom edge deployment domain, without a scheme or path. (pattern: ^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.aws\.edge\.axiom\.co$)
  - `url`: (string) Custom Axiom endpoint. A URL with a path is used as-is.

OR

{object} Update a log sink using New Relic
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the New Relic log sink.
  - `accountId`: (string) New Relic Account ID
  - `licenseKey`: (string) New Relic License Key
  - `region`: (string) (enum: eu, us)

OR

{object} Update a log sink using Sentry
- `restricted`: (boolean) If `true`, only logs from the projects in `projects` will be sent to the log sink.
- `projects`: [array of] If `restricted` is `true`, only logs from these projects will be sent to the log sink. (string) The ID of a project. (pattern: ^[A-Za-z0-9-]+$)
- `options`: {object}
  - `useCustomLabels`: (boolean) If `true`, we will do additional parsing on your JSON formatted log lines and your extract custom labels
  - `forwardCdnLogs`: (boolean) Forward CDN logs from your workloads
  - `forwardIngressLogs`: (boolean) Forward ingress logs from your workloads
  - `forwardMeshLogs`: (boolean) Forward mesh logs from your workloads
- `resumeLogSink`: (boolean) If `true`, and the log sink is currently paused, the log sink will be resumed after updating.
- `sinkType`: (string) (required) The type of log sink to target (enum: loki, datadog_logs, papertrail, http, aws_s3, logdna, coralogix, betterStack, honeycomb, logzio, solarWinds, axiom, newRelic, sentry)
- `sinkData`: {object} (required) Details about the Sentry log sink.
  - `endpoint`: (string) The complete OTLP logs endpoint from your Sentry Client Keys configuration. (pattern: ^https:\/\/[\w.-]+\.sentry\.io\/)
  - `publicKey`: (string) The public key from your Sentry OTLP DSN (Client Keys (DSN) > OpenTelemetry).

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.

### API reference

POST /v1/integrations/log-sinks/{logSinkId}/settings

POST /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}/settings

#### Example request

Request body

Update a log sink using Loki

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"endpoint":"https://logs.example.com","auth":{"strategy":"basic","user":"admin","password":"password1234"}}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "endpoint": "https://logs.example.com",
    "auth": {
      "strategy": "basic",
      "user": "admin",
      "password": "password1234"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"endpoint\":\"https://logs.example.com\",\"auth\":{\"strategy\":\"basic\",\"user\":\"admin\",\"password\":\"password1234\"}}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"endpoint\":\"https://logs.example.com\",\"auth\":{\"strategy\":\"basic\",\"user\":\"admin\",\"password\":\"password1234\"}}}")
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

Update a log sink using Datadog

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"default_api_key":"abcdef12345678900000000000000000","region":"eu"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "default_api_key": "abcdef12345678900000000000000000",
    "region": "eu"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"default_api_key\":\"abcdef12345678900000000000000000\",\"region\":\"eu\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"default_api_key\":\"abcdef12345678900000000000000000\",\"region\":\"eu\"}}")
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

Update a log sink using Papertrail

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"authenticationStrategy":"port","host":"logs1.papertrailapp.com:","port":8000}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "authenticationStrategy": "port",
    "host": "logs1.papertrailapp.com:",
    "port": 8000
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"authenticationStrategy\":\"port\",\"host\":\"logs1.papertrailapp.com:\",\"port\":8000}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"authenticationStrategy\":\"port\",\"host\":\"logs1.papertrailapp.com:\",\"port\":8000}}")
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

Update a log sink using HTTP

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"uri":"my.log-collector.com","encoding":{"codec":"json"},"batch":{"maxEvents":"10","maxBytes":"1e+7"},"auth":{"strategy":"none"}}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
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

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"uri\":\"my.log-collector.com\",\"encoding\":{\"codec\":\"json\"},\"batch\":{\"maxEvents\":\"10\",\"maxBytes\":\"1e+7\"},\"auth\":{\"strategy\":\"none\"}}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"uri\":\"my.log-collector.com\",\"encoding\":{\"codec\":\"json\"},\"batch\":{\"maxEvents\":\"10\",\"maxBytes\":\"1e+7\"},\"auth\":{\"strategy\":\"none\"}}}")
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

Update a log sink using AWS S3

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"endpoint":"my.bucket.com","region":"eu-west-2","auth":{"accessKeyId":"PMSACIHNUIASDBWQDS","secretAccessKey":"HA1PLMNOEAEYUHAJQMSDUJQS"},"bucket":"northflank-logs","compression":"gzip"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
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

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"endpoint\":\"my.bucket.com\",\"region\":\"eu-west-2\",\"auth\":{\"accessKeyId\":\"PMSACIHNUIASDBWQDS\",\"secretAccessKey\":\"HA1PLMNOEAEYUHAJQMSDUJQS\"},\"bucket\":\"northflank-logs\",\"compression\":\"gzip\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"endpoint\":\"my.bucket.com\",\"region\":\"eu-west-2\",\"auth\":{\"accessKeyId\":\"PMSACIHNUIASDBWQDS\",\"secretAccessKey\":\"HA1PLMNOEAEYUHAJQMSDUJQS\"},\"bucket\":\"northflank-logs\",\"compression\":\"gzip\"}}")
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

Update a log sink using Better Stack

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"token":"vhnqrLygVQ5GnSQUTZamKvAq","uri":"abc123.eu-nbg-2.betterstackdata.com"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "token": "vhnqrLygVQ5GnSQUTZamKvAq",
    "uri": "abc123.eu-nbg-2.betterstackdata.com"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"token\":\"vhnqrLygVQ5GnSQUTZamKvAq\",\"uri\":\"abc123.eu-nbg-2.betterstackdata.com\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"token\":\"vhnqrLygVQ5GnSQUTZamKvAq\",\"uri\":\"abc123.eu-nbg-2.betterstackdata.com\"}}")
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

Update a log sink using LogDNA

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"api_key":"b1dd3feb585asd1a3e9edpo9kmn5e590hg9"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\"}}")
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

Update a log sink using Logz.io

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"region":"eu","token":"sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "region": "eu",
    "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"region\":\"eu\",\"token\":\"sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"region\":\"eu\",\"token\":\"sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa\"}}")
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

Update a log sink using Solar Winds

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"api_key":"Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc","encoding":{"codec":"json"}}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
    "encoding": {
      "codec": "json"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"api_key\":\"Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc\",\"encoding\":{\"codec\":\"json\"}}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"api_key\":\"Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc\",\"encoding\":{\"codec\":\"json\"}}}")
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

Update a log sink using Honeycomb

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"api_key":"b1dd3feb585asd1a3e9","dataset":"staging-logs"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9",
    "dataset": "staging-logs"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9\",\"dataset\":\"staging-logs\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"api_key\":\"b1dd3feb585asd1a3e9\",\"dataset\":\"staging-logs\"}}")
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

Update a log sink using Axiom

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"dataset":"staging","token":"b1dd3feb585asd1a3e9edpo9kmn5e590hg9","tokenType":"api","region":"eu-central-1.aws.edge.axiom.co"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "dataset": "staging",
    "token": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
    "tokenType": "api",
    "region": "eu-central-1.aws.edge.axiom.co"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"dataset\":\"staging\",\"token\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\",\"tokenType\":\"api\",\"region\":\"eu-central-1.aws.edge.axiom.co\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"dataset\":\"staging\",\"token\":\"b1dd3feb585asd1a3e9edpo9kmn5e590hg9\",\"tokenType\":\"api\",\"region\":\"eu-central-1.aws.edge.axiom.co\"}}")
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

Update a log sink using New Relic

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"accountId":"b1dd3feb585asd1a3e9","licenseKey":"b1dd3feb585asd1a3e9","region":"eu"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "accountId": "b1dd3feb585asd1a3e9",
    "licenseKey": "b1dd3feb585asd1a3e9",
    "region": "eu"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"accountId\":\"b1dd3feb585asd1a3e9\",\"licenseKey\":\"b1dd3feb585asd1a3e9\",\"region\":\"eu\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"accountId\":\"b1dd3feb585asd1a3e9\",\"licenseKey\":\"b1dd3feb585asd1a3e9\",\"region\":\"eu\"}}")
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

Update a log sink using Sentry

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"restricted":true,"projects":["default-project"],"options":{"useCustomLabels":true,"forwardCdnLogs":true,"forwardIngressLogs":true,"forwardMeshLogs":true},"resumeLogSink":false,"sinkType":"http","sinkData":{"endpoint":"https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs","publicKey":"5cac0d8cb9414d5c80eb8467f55d5352"}}' \
  "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"
```

```javascript
const payload = {
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "endpoint": "https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs",
    "publicKey": "5cac0d8cb9414d5c80eb8467f55d5352"
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings', {
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

url = "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

payload = "{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"endpoint\":\"https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs\",\"publicKey\":\"5cac0d8cb9414d5c80eb8467f55d5352\"}}".encode("utf-8")
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
  url := "https://api.northflank.com/v1/integrations/log-sinks/{logSinkId}/settings"

  var jsonStr = []byte("{\"restricted\":true,\"projects\":[\"default-project\"],\"options\":{\"useCustomLabels\":true,\"forwardCdnLogs\":true,\"forwardIngressLogs\":true,\"forwardMeshLogs\":true},\"resumeLogSink\":false,\"sinkType\":\"http\",\"sinkData\":{\"endpoint\":\"https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs\",\"publicKey\":\"5cac0d8cb9414d5c80eb8467f55d5352\"}}")
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

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank update log-sink

Options:

- `--logSinkId <logSinkId>`: ID of the log sink

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

Update a log sink using Loki

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "endpoint": "https://logs.example.com",
    "auth": {
      "strategy": "basic",
      "user": "admin",
      "password": "password1234"
    }
  }
}
```

OR

Update a log sink using Datadog

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "default_api_key": "abcdef12345678900000000000000000",
    "region": "eu"
  }
}
```

OR

Update a log sink using Papertrail

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "authenticationStrategy": "port",
    "host": "logs1.papertrailapp.com:",
    "port": 8000
  }
}
```

OR

Update a log sink using HTTP

```json
{
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
  "resumeLogSink": false,
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

Update a log sink using AWS S3

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
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

Update a log sink using Better Stack

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "token": "vhnqrLygVQ5GnSQUTZamKvAq",
    "uri": "abc123.eu-nbg-2.betterstackdata.com"
  }
}
```

OR

Update a log sink using LogDNA

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9"
  }
}
```

OR

Update a log sink using Logz.io

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "region": "eu",
    "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"
  }
}
```

OR

Update a log sink using Solar Winds

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
    "encoding": {
      "codec": "json"
    }
  }
}
```

OR

Update a log sink using Honeycomb

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "api_key": "b1dd3feb585asd1a3e9",
    "dataset": "staging-logs"
  }
}
```

OR

Update a log sink using Axiom

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "dataset": "staging",
    "token": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
    "tokenType": "api",
    "region": "eu-central-1.aws.edge.axiom.co"
  }
}
```

OR

Update a log sink using New Relic

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "accountId": "b1dd3feb585asd1a3e9",
    "licenseKey": "b1dd3feb585asd1a3e9",
    "region": "eu"
  }
}
```

OR

Update a log sink using Sentry

```json
{
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
  "resumeLogSink": false,
  "sinkType": "http",
  "sinkData": {
    "endpoint": "https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs",
    "publicKey": "5cac0d8cb9414d5c80eb8467f55d5352"
  }
}
```

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

Update a log sink using Loki

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "endpoint": "https://logs.example.com",
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

Update a log sink using Datadog

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "default_api_key": "abcdef12345678900000000000000000",
      "region": "eu"
    }
  }
});
```

OR

Update a log sink using Papertrail

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "authenticationStrategy": "port",
      "host": "logs1.papertrailapp.com:",
      "port": 8000
    }
  }
});
```

OR

Update a log sink using HTTP

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
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

Update a log sink using AWS S3

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
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

Update a log sink using Better Stack

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "token": "vhnqrLygVQ5GnSQUTZamKvAq",
      "uri": "abc123.eu-nbg-2.betterstackdata.com"
    }
  }
});
```

OR

Update a log sink using LogDNA

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9"
    }
  }
});
```

OR

Update a log sink using Logz.io

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "region": "eu",
      "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa"
    }
  }
});
```

OR

Update a log sink using Solar Winds

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
      "encoding": {
        "codec": "json"
      }
    }
  }
});
```

OR

Update a log sink using Honeycomb

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "api_key": "b1dd3feb585asd1a3e9",
      "dataset": "staging-logs"
    }
  }
});
```

OR

Update a log sink using Axiom

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
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

Update a log sink using New Relic

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "accountId": "b1dd3feb585asd1a3e9",
      "licenseKey": "b1dd3feb585asd1a3e9",
      "region": "eu"
    }
  }
});
```

OR

Update a log sink using Sentry

```javascript
await apiClient.update.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
  },
  data: {
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
    "resumeLogSink": false,
    "sinkType": "http",
    "sinkData": {
      "endpoint": "https://o459080.ingest.de.sentry.io/api/5523749/integration/otlp/v1/logs",
      "publicKey": "5cac0d8cb9414d5c80eb8467f55d5352"
    }
  }
});
```

#### Example Response

 The operation was performed successfully.

```json
{
  "data": {},
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

Update a log sink using Loki

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
        "sinkData": {
            "endpoint": "https://logs.example.com",
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

Update a log sink using Datadog

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
        "sinkData": {
            "default_api_key": "abcdef12345678900000000000000000",
            "region": "eu",
        },
    },
)
print(response.data)
```

OR

Update a log sink using Papertrail

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
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

Update a log sink using HTTP

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
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

Update a log sink using AWS S3

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
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

Update a log sink using Better Stack

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
        "sinkData": {
            "token": "vhnqrLygVQ5GnSQUTZamKvAq",
            "uri": "abc123.eu-nbg-2.betterstackdata.com",
        },
    },
)
print(response.data)
```

OR

Update a log sink using LogDNA

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
        "sinkData": {
            "api_key": "b1dd3feb585asd1a3e9edpo9kmn5e590hg9",
        },
    },
)
print(response.data)
```

OR

Update a log sink using Logz.io

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
        "sinkData": {
            "region": "eu",
            "token": "sNFijNFgNFoNFrMsNFbNFObNFcgNFqoa",
        },
    },
)
print(response.data)
```

OR

Update a log sink using Solar Winds

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
        "sinkData": {
            "api_key": "Tr8BIEmYx1fuM3_XRMwU3xXEFnD20p9NFkRIu1COrDqMCM4g86qWZgVdgs1Y7mzWtFMI0Zc",
            "encoding": {
                "codec": "json",
            },
        },
    },
)
print(response.data)
```

OR

Update a log sink using Honeycomb

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
        "sinkData": {
            "api_key": "b1dd3feb585asd1a3e9",
            "dataset": "staging-logs",
        },
    },
)
print(response.data)
```

OR

Update a log sink using Axiom

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
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

Update a log sink using New Relic

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
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

Update a log sink using Sentry

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.update.log_sink(
    log_sink_id="example-log-sink",
    data={
        "restricted": True,
        "projects": ["default-project"],
        "options": {
            "useCustomLabels": True,
            "forwardCdnLogs": True,
            "forwardIngressLogs": True,
            "forwardMeshLogs": True,
        },
        "resumeLogSink": False,
        "sinkType": "http",
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
{}
```
