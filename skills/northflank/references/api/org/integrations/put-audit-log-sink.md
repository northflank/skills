# Put audit log sink

Source: https://northflank.com/docs/v1/api/org/integrations/put-audit-log-sink.md

Creates or fully replaces an audit log sink.

Required permission: Account > Admin > AuditLogSinks > Create

**Path parameters:**

{object}
- `sinkId`: (string) (required) ID of the audit log sink

**Request body:**

{object}
- `name`: (string) (required) Name of the audit log sink.
- `description`: (string) Description of the audit log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `sinkType`: (string) (required) The type of the audit log sink. (enum: aws_s3)
- `sinkData`: (multiple options) {object}
   - `endpoint`: (string) (required) Endpoint for the AWS S3 or compatible API bucket.
   - `region`: (string) (required) Region of the S3 bucket.
   - `bucket`: (string) (required) Name of the S3 bucket.
   - `pathPrefix`: (string) Optional path prefix inside the bucket where objects are written.
   - `compression`: (string) (required) Compression method applied to exported audit log batches. (enum: gzip, none)
   - `auth`: {object}
     - `accessKeyId`: (string) (required) Access key id for the bucket.
     - `secretAccessKey`: (string) (required) Secret access key for the bucket.
- `includeSpec`: (boolean) When true, exported events include the enriched `before` and `after` spec of the audited resource. Secrets are always stripped from specs before export. Set to false to export only event headers (action, actor, scope).

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

PUT /v1/integrations/audit-log-sinks/{sinkId}

PUT /v1/teams/{teamId}/integrations/audit-log-sinks/{sinkId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"name":"compliance-bucket","description":"Forwards audit logs to the compliance S3 bucket.","sinkType":"aws_s3","sinkData":{"endpoint":"s3.amazonaws.com","region":"eu-west-2","bucket":"northflank-audit-logs","pathPrefix":"audit-logs/","compression":"gzip","auth":{"accessKeyId":"AKIAIOSFODNN7EXAMPLE","secretAccessKey":"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"}},"includeSpec":false}' \
  https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}
```

```javascript
const payload = {
  "name": "compliance-bucket",
  "description": "Forwards audit logs to the compliance S3 bucket.",
  "sinkType": "aws_s3",
  "sinkData": {
    "endpoint": "s3.amazonaws.com",
    "region": "eu-west-2",
    "bucket": "northflank-audit-logs",
    "pathPrefix": "audit-logs/",
    "compression": "gzip",
    "auth": {
      "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
      "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    }
  },
  "includeSpec": false
}

const response = await fetch('https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}', {
  method: 'PUT',
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

payload = {"name":"compliance-bucket","description":"Forwards audit logs to the compliance S3 bucket.","sinkType":"aws_s3","sinkData":{"endpoint":"s3.amazonaws.com","region":"eu-west-2","bucket":"northflank-audit-logs","pathPrefix":"audit-logs/","compression":"gzip","auth":{"accessKeyId":"AKIAIOSFODNN7EXAMPLE","secretAccessKey":"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"}},"includeSpec":false}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

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

  var jsonStr = []byte(`{"name":"compliance-bucket","description":"Forwards audit logs to the compliance S3 bucket.","sinkType":"aws_s3","sinkData":{"endpoint":"s3.amazonaws.com","region":"eu-west-2","bucket":"northflank-audit-logs","pathPrefix":"audit-logs/","compression":"gzip","auth":{"accessKeyId":"AKIAIOSFODNN7EXAMPLE","secretAccessKey":"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"}},"includeSpec":false}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details about the created or replaced sink.

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

$ northflank put audit-log-sink

Options:

- `--sinkId <sinkId>`: ID of the audit log sink

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "compliance-bucket",
  "description": "Forwards audit logs to the compliance S3 bucket.",
  "sinkType": "aws_s3",
  "sinkData": {
    "endpoint": "s3.amazonaws.com",
    "region": "eu-west-2",
    "bucket": "northflank-audit-logs",
    "pathPrefix": "audit-logs/",
    "compression": "gzip",
    "auth": {
      "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
      "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    }
  },
  "includeSpec": false
}
```

#### Example Response

 Details about the created or replaced sink.

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
await apiClient.put.auditLogSink({
  parameters: {
    "sinkId": "compliance-bucket"
  },
  data: {
    "name": "compliance-bucket",
    "description": "Forwards audit logs to the compliance S3 bucket.",
    "sinkType": "aws_s3",
    "sinkData": {
      "endpoint": "s3.amazonaws.com",
      "region": "eu-west-2",
      "bucket": "northflank-audit-logs",
      "pathPrefix": "audit-logs/",
      "compression": "gzip",
      "auth": {
        "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
        "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
      }
    },
    "includeSpec": false
  }
});
```

#### Example Response

 Details about the created or replaced sink.

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

response = client.put.audit_log_sink(
    sink_id="compliance-bucket",
    data={
        "name": "compliance-bucket",
        "description": "Forwards audit logs to the compliance S3 bucket.",
        "sinkType": "aws_s3",
        "sinkData": {
            "endpoint": "s3.amazonaws.com",
            "region": "eu-west-2",
            "bucket": "northflank-audit-logs",
            "pathPrefix": "audit-logs/",
            "compression": "gzip",
            "auth": {
                "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
                "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
            },
        },
        "includeSpec": False,
    },
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
