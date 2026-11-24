# Get audit log sink details

Source: https://northflank.com/docs/v1/api/org/integrations/get-audit-log-sink-details.md

Gets details about a given audit log sink. Secrets are redacted.

Required permission: Account > Admin > AuditLogSinks > Read

**Path parameters:**

{object}
- `sinkId`: (string) (required) ID of the audit log sink

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) Identifier for the audit log sink.
  - `name`: (string) (required) Name of the audit log sink.
  - `description`: (string) Description of the audit log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `sinkType`: (string) (required) The type of the audit log sink. (enum: aws_s3)
  - `includeSpec`: (boolean) (required) Whether exported events include the enriched `before`/`after` spec or only headers.
  - `status`: (string) (required) Current status of the audit log sink. (enum: paused, running, failing, creating)
  - `createdAt`: (string) (required) Timestamp of when the audit log sink was created. (format: date-time)
  - `updatedAt`: (string) (required) Timestamp of when the audit log sink was last updated. (format: date-time)
  - `sinkData`: {object} (required) Configuration of the destination. Secrets are omitted.
    - `endpoint`: (string) (required)
    - `region`: (string) (required)
    - `bucket`: (string) (required)
    - `pathPrefix`: (string)
    - `compression`: (string) (required) (enum: gzip, none)
    - `auth`: {object} (required) Authentication object (secret omitted).
      - `accessKeyId`: (string) (required)

### API reference

GET /v1/integrations/audit-log-sinks/{sinkId}

GET /v1/teams/{teamId}/integrations/audit-log-sinks/{sinkId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}"
```

```python
import requests

url = "https://api.northflank.com/v1/integrations/audit-log-sinks/{sinkId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details about an audit log sink.

```json
{
  "data": {
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
}
```

### CLI reference

$ northflank get audit-log-sink

Options:

- `--sinkId <sinkId>`: ID of the audit log sink

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about an audit log sink.

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

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.auditLogSink({
  parameters: {
    "sinkId": "compliance-bucket"
  }
});
```

#### Example Response

 Details about an audit log sink.

```json
{
  "data": {
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

response = client.get.audit_log_sink(
    sink_id="compliance-bucket",
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
