# Delete log sink

Source: https://northflank.com/docs/v1/api/team/integrations/delete-log-sink.md

Deletes a log sink.

Required permission: Account > Observability > LogSinks > Delete

**Path parameters:**

{object}
- `logSinkId`: (string) (required) ID of the log sink

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/integrations/log-sinks/{logSinkId}

DELETE /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete log-sink

Options:

- `--logSinkId <logSinkId>`: ID of the log sink

- `--verbose `: Verbose output

- `--quiet `: No console output

- `--force `: Don't ask for confirmation

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
await apiClient.delete.logSink({
  parameters: {
    "logSinkId": "example-log-sink"
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

response = client.delete.log_sink(
    log_sink_id="example-log-sink",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
