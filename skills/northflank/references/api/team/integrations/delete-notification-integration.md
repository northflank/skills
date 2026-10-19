# Delete notification integration

Source: https://northflank.com/docs/v1/api/team/integrations/delete-notification-integration.md

Deletes a notification integration

Required permission: Account > Observability > Notifications > Delete

**Path parameters:**

{object}
- `notificationId`: (string) (required) ID of the notification integration

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/integrations/notifications/{notificationId}

DELETE /v1/teams/{teamId}/integrations/notifications/{notificationId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete notification

Options:

- `--notificationId <notificationId>`: ID of the notification integration

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
await apiClient.delete.notification({
  parameters: {
    "notificationId": "example-notification-id"
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

response = client.delete.notification(
    notification_id="example-notification-id",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
