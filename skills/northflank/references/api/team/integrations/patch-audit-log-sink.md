# Patch audit log sink

Source: https://northflank.com/docs/v1/api/team/integrations/patch-audit-log-sink.md

Partially updates an audit log sink. Fields not included in the payload retain their existing values.

Required permission: Account > Admin > AuditLogSinks > Update

**Path parameters:**

{object}
- `sinkId`: (string) (required) ID of the audit log sink

**Request body:**

{object}
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `sinkData`: {object}
  - `endpoint`: (string)
  - `region`: (string)
  - `bucket`: (string)
  - `pathPrefix`: (string)
  - `compression`: (string) (enum: gzip, none)
  - `auth`: {object}
    - `accessKeyId`: (string)
    - `secretAccessKey`: (string)
- `includeSpec`: (boolean)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the audit log sink.
  - `name`: (string) (required) Name of the audit log sink.
  - `description`: (string) Description of the audit log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `sinkType`: (string) (required) The type of the audit log sink. (enum: aws_s3)
  - `includeSpec`: (boolean) (required) Whether exported events include the enriched `before`/`after` spec or only headers.
  - `status`: (string) (required) Current status of the audit log sink. (enum: paused, running, failing, creating)
  - `createdAt`: (string) (required) Timestamp of when the audit log sink was created. (format: date-time)
  - `updatedAt`: (string) (required) Timestamp of when the audit log sink was last updated. (format: date-time)
  - `sinkData`: {object}
    - `endpoint`: (string) (required)
    - `region`: (string) (required)
    - `bucket`: (string) (required)
    - `pathPrefix`: (string)
    - `compression`: (string) (required) (enum: gzip, none)
    - `auth`: {object}
      - `accessKeyId`: (string) (required)

### API reference

PATCH /v1/integrations/audit-log-sinks/{sinkId}

PATCH /v1/teams/{teamId}/integrations/audit-log-sinks/{sinkId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{}' \
  https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}
```

```javascript
const payload = {}

const response = await fetch('https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}', {
  method: 'PATCH',
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

url = "https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}"

payload = {}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PATCH", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}"

  var jsonStr = []byte(`{}`)
  req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details about the updated sink.

```json
{
  "data": {
    "id": "compliance-bucket",
    "name": "compliance-bucket",
    "description": "Forwards audit logs to the compliance S3 bucket.",
    "sinkType": "aws_s3",
    "includeSpec": false,
    "createdAt": "2026-05-11T12:00:00.000Z",
    "updatedAt": "2026-05-11T12:00:00.000Z"
  }
}
```

### CLI reference

$ northflank patch audit-log-sink

Options:

- `--sinkId <sinkId>`: ID of the audit log sink

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{}
```

#### Example Response

 Details about the updated sink.

```json
{
  "id": "compliance-bucket",
  "name": "compliance-bucket",
  "description": "Forwards audit logs to the compliance S3 bucket.",
  "sinkType": "aws_s3",
  "includeSpec": false,
  "createdAt": "2026-05-11T12:00:00.000Z",
  "updatedAt": "2026-05-11T12:00:00.000Z"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.patch.auditLogSink({
  parameters: {
    "sinkId": "compliance-bucket"
  },
  data: {}
});
```

#### Example Response

 Details about the updated sink.

```json
{
  "data": {
    "id": "compliance-bucket",
    "name": "compliance-bucket",
    "description": "Forwards audit logs to the compliance S3 bucket.",
    "sinkType": "aws_s3",
    "includeSpec": false,
    "createdAt": "2026-05-11T12:00:00.000Z",
    "updatedAt": "2026-05-11T12:00:00.000Z"
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

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.patch.audit_log_sink(
    sink_id="compliance-bucket",
    data={},
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "compliance-bucket",
  "name": "compliance-bucket",
  "description": "Forwards audit logs to the compliance S3 bucket.",
  "sinkType": "aws_s3",
  "includeSpec": false,
  "createdAt": "2026-05-11T12:00:00.000Z",
  "updatedAt": "2026-05-11T12:00:00.000Z",
  "status": "paused",
  "sinkData": {
    "endpoint": "string",
    "region": "string",
    "bucket": "string",
    "compression": "gzip",
    "auth": {
      "accessKeyId": "string"
    }
  }
}
```
