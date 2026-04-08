# Pause log sink

Source: https://northflank.com/docs/v1/api/team/integrations/pause-log-sink.md

Pauses a given log sink.

Required permission: Account > Sinks > General > Update

**Path parameters:**

{object}
- `logSinkId`: (string) (required) ID of the log sink

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/integrations/log-sinks/{logSinkId}/pause

POST /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}/pause

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank pause log-sink

Options:

- `--logSinkId <logSinkId>`: ID of the log sink

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

```javascript
await apiClient.pause.logSink({
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
