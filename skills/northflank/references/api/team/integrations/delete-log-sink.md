# Delete log sink

Source: https://northflank.com/docs/v1/api/team/integrations/delete-log-sink.md

Deletes a log sink.

Required permission: Account > Sinks > General > Delete

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
