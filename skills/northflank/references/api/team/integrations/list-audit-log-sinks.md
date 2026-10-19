# List audit log sinks

Source: https://northflank.com/docs/v1/api/team/integrations/list-audit-log-sinks.md

Gets a list of audit log sinks defined on this entity.

Required permission: Account > Admin > AuditLogSinks > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `auditLogSinks`: [array of] {object}
     - `id`: (string) (required) Identifier for the audit log sink.
     - `name`: (string) (required) Name of the audit log sink.
     - `description`: (string) Description of the audit log sink. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `sinkType`: (string) (required) The type of the audit log sink. (enum: aws_s3)
     - `includeSpec`: (boolean) (required) Whether exported events include the enriched `before`/`after` spec or only headers.
     - `status`: (string) (required) Current status of the audit log sink. (enum: paused, running, failing, creating)
     - `createdAt`: (string) (required) Timestamp of when the audit log sink was created. (format: date-time)
     - `updatedAt`: (string) (required) Timestamp of when the audit log sink was last updated. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/integrations/audit-log-sinks

GET /v1/teams/{teamId}/integrations/audit-log-sinks

#### Example Response

200 OK: The list of audit log sinks.

```json
{
  "data": {
    "auditLogSinks": [
      {
        "id": "compliance-bucket",
        "name": "compliance-bucket",
        "description": "Forwards audit logs to the compliance S3 bucket.",
        "sinkType": "aws_s3",
        "includeSpec": false,
        "createdAt": "2026-05-11T12:00:00.000Z",
        "updatedAt": "2026-05-11T12:00:00.000Z"
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

$ northflank list audit-log-sinks

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of audit log sinks.

```json
{
  "auditLogSinks": [
    {
      "id": "compliance-bucket",
      "name": "compliance-bucket",
      "description": "Forwards audit logs to the compliance S3 bucket.",
      "sinkType": "aws_s3",
      "includeSpec": false,
      "createdAt": "2026-05-11T12:00:00.000Z",
      "updatedAt": "2026-05-11T12:00:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.auditLogSinks({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 The list of audit log sinks.

```json
{
  "data": {
    "auditLogSinks": [
      {
        "id": "compliance-bucket",
        "name": "compliance-bucket",
        "description": "Forwards audit logs to the compliance S3 bucket.",
        "sinkType": "aws_s3",
        "includeSpec": false,
        "createdAt": "2026-05-11T12:00:00.000Z",
        "updatedAt": "2026-05-11T12:00:00.000Z"
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.audit_log_sinks(
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "auditLogSinks": [
    {
      "id": "compliance-bucket",
      "name": "compliance-bucket",
      "description": "Forwards audit logs to the compliance S3 bucket.",
      "sinkType": "aws_s3",
      "includeSpec": false,
      "createdAt": "2026-05-11T12:00:00.000Z",
      "updatedAt": "2026-05-11T12:00:00.000Z",
      "status": "paused"
    }
  ]
}
```
