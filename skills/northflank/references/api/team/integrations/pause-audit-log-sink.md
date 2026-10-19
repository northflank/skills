# Pause audit log sink

Source: https://northflank.com/docs/v1/api/team/integrations/pause-audit-log-sink.md

Pauses exports for the audit log sink.

Required permission: Account > Admin > AuditLogSinks > Update

**Path parameters:**

{object}
- `sinkId`: (string) (required) ID of the audit log sink

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/integrations/audit-log-sinks/{sinkId}/pause

POST /v1/teams/{teamId}/integrations/audit-log-sinks/{sinkId}/pause

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank pause audit-log-sink

Options:

- `--sinkId <sinkId>`: ID of the audit log sink

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.pause.auditLogSink({
  parameters: {
    "sinkId": "compliance-bucket"
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

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.pause.audit_log_sink(
    sink_id="compliance-bucket",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
