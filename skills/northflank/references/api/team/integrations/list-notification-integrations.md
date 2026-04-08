# List notification integrations

Source: https://northflank.com/docs/v1/api/team/integrations/list-notification-integrations.md

Lists notification integrations for the authenticated user or team.

Required permission: Account > Team > Notifications > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `notificationIntegrations`: [array of] {object}
     - `name`: (string) (required) The name of the notification integration. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
     - `id`: (string) (required) The ID of the notification integration.
     - `type`: (string) (required) The provider to send webhooks to. `RAW_WEBHOOK` allows you to send webhooks to a url of your choice, or you can choose a specific provider. (enum: RAW_WEBHOOK, SLACK, DISCORD, TEAMS, TEAMS_WORKFLOWS)
     - `webhook`: (string) (required) The URL where webhooks will be sent.
     - `status`: {object}
       - `disabled`: (boolean) Is the webhook currently disabled?
       - `reason`: (boolean) Why the webhook was disabled.
     - `createdAt`: (string) (required) Creation date (format: date-time)
     - `updatedAt`: (string) (required) Last update date (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/integrations/notifications

GET /v1/teams/{teamId}/integrations/notifications

#### Example Response

200 OK: A list of notification integrations for the authenticated user or team

```json
{
  "data": {
    "notificationIntegrations": [
      {
        "name": "Example Notification",
        "id": "example-notification",
        "type": "RAW_WEBHOOK",
        "webhook": "https://example.com/webhooks",
        "status": {
          "disabled": false
        },
        "createdAt": "2023-09-12T16:39:44.166Z\"",
        "updatedAt": "2023-09-12T16:39:44.166Z\""
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

$ northflank list notifications

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of notification integrations for the authenticated user or team

```json
{
  "notificationIntegrations": [
    {
      "name": "Example Notification",
      "id": "example-notification",
      "type": "RAW_WEBHOOK",
      "webhook": "https://example.com/webhooks",
      "status": {
        "disabled": false
      },
      "createdAt": "2023-09-12T16:39:44.166Z\"",
      "updatedAt": "2023-09-12T16:39:44.166Z\""
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.notifications({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of notification integrations for the authenticated user or team

```json
{
  "data": {
    "notificationIntegrations": [
      {
        "name": "Example Notification",
        "id": "example-notification",
        "type": "RAW_WEBHOOK",
        "webhook": "https://example.com/webhooks",
        "status": {
          "disabled": false
        },
        "createdAt": "2023-09-12T16:39:44.166Z\"",
        "updatedAt": "2023-09-12T16:39:44.166Z\""
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
