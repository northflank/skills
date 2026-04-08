# List log sinks

Source: https://northflank.com/docs/v1/api/team/integrations/list-log-sinks.md

Gets a list of log sinks added to this account.

Required permission: Account > Sinks > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `logSinks`: [array of] {object}
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/integrations/log-sinks

GET /v1/teams/{teamId}/integrations/log-sinks

#### Example Response

200 OK: The list of log sinks.

```json
{
  "data": {
    "logSinks": [
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
        "updatedAt": "2022-06-14 15:10:42.842Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list log-sinks

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of log sinks.

```json
{
  "logSinks": [
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
      "updatedAt": "2022-06-14 15:10:42.842Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.logSinks({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 The list of log sinks.

```json
{
  "data": {
    "logSinks": [
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
        "updatedAt": "2022-06-14 15:10:42.842Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
