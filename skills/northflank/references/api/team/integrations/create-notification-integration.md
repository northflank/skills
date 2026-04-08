# Create notification integration

Source: https://northflank.com/docs/v1/api/team/integrations/create-notification-integration.md

Create a new notification integration.

Required permission: Account > Team > Notifications > Manage

**Path parameters:**

{object}
- `notificationId`: (string) (required) ID of the notification integration

**Request body:**

{object}
- `name`: (string) (required) The name of the notification integration. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `type`: (string) (required) The provider to send webhooks to. `RAW_WEBHOOK` allows you to send webhooks to a url of your choice, or you can choose a specific provider. (enum: RAW_WEBHOOK, DISCORD, TEAMS, TEAMS_WORKFLOWS)
- `webhook`: (string) (required) The URL where webhooks will be sent.
- `secret`: (string) An optional secret that will be sent in the webhook header for verification. Supports `RAW_WEBHOOK` only.
- `restricted`: (boolean) Should notifications be sent only for specific projects?
- `restrictions`: {object}
  - `tags`: {object}
    - `enabled`: (boolean) Whether restriction by tag should be enabled.
    - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `projects`: [array of] (string) (pattern: ^[A-Za-z0-9-]+$)
- `events`: {object}
  - `trigger:service:autoscaling:event`: (boolean)
  - `trigger:service:deployment:status-update`: (boolean)
  - `trigger:project:tailscale-regen-failure`: (boolean)
  - `trigger:addon-backup:start`: (boolean)
  - `trigger:addon-backup:success`: (boolean)
  - `trigger:addon-backup:failure`: (boolean)
  - `trigger:addon-backup:abort`: (boolean)
  - `trigger:build:start`: (boolean)
  - `trigger:build:success`: (boolean)
  - `trigger:build:failure`: (boolean)
  - `trigger:build:abort`: (boolean)
  - `trigger:job-run:start`: (boolean)
  - `trigger:job-run:success`: (boolean)
  - `trigger:job-run:failure`: (boolean)
  - `trigger:job-run:abort`: (boolean)
  - `trigger:job-run:terminate`: (boolean)
  - `trigger:release-flow-template-run:start`: (boolean)
  - `trigger:release-flow-template-run:update`: (boolean)
  - `trigger:release-flow-template-run:success`: (boolean)
  - `trigger:release-flow-template-run:failure`: (boolean)
  - `trigger:release-flow-template-run:aborted`: (boolean)
  - `trigger:template-run:queued`: (boolean)
  - `trigger:template-run:start`: (boolean)
  - `trigger:template-run:update`: (boolean)
  - `trigger:template-run:success`: (boolean)
  - `trigger:template-run:failure`: (boolean)
  - `trigger:resource:certificate-success`: (boolean)
  - `trigger:resource:certificate-final-failure`: (boolean)
  - `trigger:cdn:action-success`: (boolean)
  - `trigger:cdn:action-failure`: (boolean)
  - `trigger:cdn:action-delay`: (boolean)
  - `trigger:log-sink:paused`: (boolean)
  - `trigger:billing:billing-alert-exceeded`: (boolean)
  - `trigger:billing:invoice-payment-action-required`: (boolean)
  - `trigger:billing:invoice-payment-failed`: (boolean)
  - `trigger:billing:invoice-paid`: (boolean)
  - `trigger:billing:invoice-carried-over`: (boolean)
  - `trigger:infrastructure:service:container-crash`: (boolean)
  - `trigger:infrastructure:service:container-eviction`: (boolean)
  - `trigger:infrastructure:build:container-eviction`: (boolean)
  - `trigger:infrastructure:addon:container-crash`: (boolean)
  - `trigger:infrastructure:addon:container-eviction`: (boolean)
  - `trigger:infrastructure:job:container-crash`: (boolean)
  - `trigger:infrastructure:job:container-eviction`: (boolean)
  - `trigger:infrastructure:build:container-cpuSpike90`: (boolean)
  - `trigger:infrastructure:build:container-cpuSustained90`: (boolean)
  - `trigger:infrastructure:service:container-cpuSpike90`: (boolean)
  - `trigger:infrastructure:service:container-cpuSustained90`: (boolean)
  - `trigger:infrastructure:job:container-cpuSpike90`: (boolean)
  - `trigger:infrastructure:job:container-cpuSustained90`: (boolean)
  - `trigger:infrastructure:addon:container-cpuSpike90`: (boolean)
  - `trigger:infrastructure:addon:container-cpuSustained90`: (boolean)
  - `trigger:infrastructure:build:container-memorySpike90`: (boolean)
  - `trigger:infrastructure:build:container-memorySustained90`: (boolean)
  - `trigger:infrastructure:service:container-memorySpike90`: (boolean)
  - `trigger:infrastructure:service:container-memorySustained90`: (boolean)
  - `trigger:infrastructure:job:container-memorySpike90`: (boolean)
  - `trigger:infrastructure:job:container-memorySustained90`: (boolean)
  - `trigger:infrastructure:addon-volume:usage-75-exceeded`: (boolean)
  - `trigger:infrastructure:addon-volume:usage-90-exceeded`: (boolean)
  - `trigger:infrastructure:platform-volume:usage-75-exceeded`: (boolean)
  - `trigger:infrastructure:platform-volume:usage-90-exceeded`: (boolean)
  - `trigger:infrastructure:byoc:cluster:error`: (boolean)
  - `trigger:infrastructure:byoc:node-pool:error`: (boolean)
  - `trigger:infrastructure:byoc:scheduling:error`: (boolean)
  - `trigger:infrastructure:byoc:volume:error`: (boolean)
  - `trigger:infrastructure:byoc:volume:attach`: (boolean)

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the notification integration. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `id`: (string) (required) The ID of the notification integration.
  - `type`: (string) (required) The provider to send webhooks to. `RAW_WEBHOOK` allows you to send webhooks to a url of your choice, or you can choose a specific provider. (enum: RAW_WEBHOOK, SLACK, DISCORD, TEAMS, TEAMS_WORKFLOWS)
  - `webhook`: (string) (required) The URL where webhooks will be sent.
  - `createdAt`: (string) (required) Creation date (format: date-time)
  - `updatedAt`: (string) (required) Last update date (format: date-time)
  - `status`: {object}
    - `disabled`: (boolean) Is the webhook currently disabled?
    - `reason`: (boolean) Why the webhook was disabled.
    - `timeOfFirstFailedRequest`: (string) The timestamp of the first failed webhook request. (format: date-time)
    - `numberOfFailedRequests`: (number) The number of failed webhook requests. (format: float)
  - `restricted`: (boolean) (required) Should notifications be sent only for specific projects?
  - `projects`: [array of] (string) (pattern: ^[A-Za-z0-9-]+$)
  - `events`: {object}
    - `trigger:service:autoscaling:event`: (boolean)
    - `trigger:service:deployment:status-update`: (boolean)
    - `trigger:project:tailscale-regen-failure`: (boolean)
    - `trigger:addon-backup:start`: (boolean)
    - `trigger:addon-backup:success`: (boolean)
    - `trigger:addon-backup:failure`: (boolean)
    - `trigger:addon-backup:abort`: (boolean)
    - `trigger:build:start`: (boolean)
    - `trigger:build:success`: (boolean)
    - `trigger:build:failure`: (boolean)
    - `trigger:build:abort`: (boolean)
    - `trigger:job-run:start`: (boolean)
    - `trigger:job-run:success`: (boolean)
    - `trigger:job-run:failure`: (boolean)
    - `trigger:job-run:abort`: (boolean)
    - `trigger:job-run:terminate`: (boolean)
    - `trigger:release-flow-template-run:start`: (boolean)
    - `trigger:release-flow-template-run:update`: (boolean)
    - `trigger:release-flow-template-run:success`: (boolean)
    - `trigger:release-flow-template-run:failure`: (boolean)
    - `trigger:release-flow-template-run:aborted`: (boolean)
    - `trigger:template-run:queued`: (boolean)
    - `trigger:template-run:start`: (boolean)
    - `trigger:template-run:update`: (boolean)
    - `trigger:template-run:success`: (boolean)
    - `trigger:template-run:failure`: (boolean)
    - `trigger:resource:certificate-success`: (boolean)
    - `trigger:resource:certificate-final-failure`: (boolean)
    - `trigger:cdn:action-success`: (boolean)
    - `trigger:cdn:action-failure`: (boolean)
    - `trigger:cdn:action-delay`: (boolean)
    - `trigger:log-sink:paused`: (boolean)
    - `trigger:billing:billing-alert-exceeded`: (boolean)
    - `trigger:billing:invoice-payment-action-required`: (boolean)
    - `trigger:billing:invoice-payment-failed`: (boolean)
    - `trigger:billing:invoice-paid`: (boolean)
    - `trigger:billing:invoice-carried-over`: (boolean)
    - `trigger:infrastructure:service:container-crash`: (boolean)
    - `trigger:infrastructure:service:container-eviction`: (boolean)
    - `trigger:infrastructure:build:container-eviction`: (boolean)
    - `trigger:infrastructure:addon:container-crash`: (boolean)
    - `trigger:infrastructure:addon:container-eviction`: (boolean)
    - `trigger:infrastructure:job:container-crash`: (boolean)
    - `trigger:infrastructure:job:container-eviction`: (boolean)
    - `trigger:infrastructure:build:container-cpuSpike90`: (boolean)
    - `trigger:infrastructure:build:container-cpuSustained90`: (boolean)
    - `trigger:infrastructure:service:container-cpuSpike90`: (boolean)
    - `trigger:infrastructure:service:container-cpuSustained90`: (boolean)
    - `trigger:infrastructure:job:container-cpuSpike90`: (boolean)
    - `trigger:infrastructure:job:container-cpuSustained90`: (boolean)
    - `trigger:infrastructure:addon:container-cpuSpike90`: (boolean)
    - `trigger:infrastructure:addon:container-cpuSustained90`: (boolean)
    - `trigger:infrastructure:build:container-memorySpike90`: (boolean)
    - `trigger:infrastructure:build:container-memorySustained90`: (boolean)
    - `trigger:infrastructure:service:container-memorySpike90`: (boolean)
    - `trigger:infrastructure:service:container-memorySustained90`: (boolean)
    - `trigger:infrastructure:job:container-memorySpike90`: (boolean)
    - `trigger:infrastructure:job:container-memorySustained90`: (boolean)
    - `trigger:infrastructure:addon-volume:usage-75-exceeded`: (boolean)
    - `trigger:infrastructure:addon-volume:usage-90-exceeded`: (boolean)
    - `trigger:infrastructure:platform-volume:usage-75-exceeded`: (boolean)
    - `trigger:infrastructure:platform-volume:usage-90-exceeded`: (boolean)
    - `trigger:infrastructure:byoc:cluster:error`: (boolean)
    - `trigger:infrastructure:byoc:node-pool:error`: (boolean)
    - `trigger:infrastructure:byoc:scheduling:error`: (boolean)
    - `trigger:infrastructure:byoc:volume:error`: (boolean)
    - `trigger:infrastructure:byoc:volume:attach`: (boolean)

### API reference

POST /v1/integrations/notifications

POST /v1/teams/{teamId}/integrations/notifications

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Notification","type":"RAW_WEBHOOK","webhook":"https://example.com/webhooks","restricted":true,"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"projects":["default-project"],"events":{"trigger:service:autoscaling:event":true,"trigger:service:deployment:status-update":true,"trigger:project:tailscale-regen-failure":true,"trigger:addon-backup:start":true,"trigger:addon-backup:success":true,"trigger:addon-backup:failure":true,"trigger:addon-backup:abort":true,"trigger:build:start":true,"trigger:build:success":true,"trigger:build:failure":true,"trigger:build:abort":true,"trigger:job-run:start":true,"trigger:job-run:success":true,"trigger:job-run:failure":true,"trigger:job-run:abort":true,"trigger:job-run:terminate":true,"trigger:release-flow-template-run:start":true,"trigger:release-flow-template-run:update":true,"trigger:release-flow-template-run:success":true,"trigger:release-flow-template-run:failure":true,"trigger:release-flow-template-run:aborted":true,"trigger:template-run:queued":true,"trigger:template-run:start":true,"trigger:template-run:update":true,"trigger:template-run:success":true,"trigger:template-run:failure":true,"trigger:resource:certificate-success":true,"trigger:resource:certificate-final-failure":true,"trigger:cdn:action-success":true,"trigger:cdn:action-failure":true,"trigger:cdn:action-delay":true,"trigger:log-sink:paused":true,"trigger:billing:billing-alert-exceeded":true,"trigger:billing:invoice-payment-action-required":true,"trigger:billing:invoice-payment-failed":true,"trigger:billing:invoice-paid":true,"trigger:billing:invoice-carried-over":true,"trigger:infrastructure:service:container-crash":true,"trigger:infrastructure:service:container-eviction":true,"trigger:infrastructure:build:container-eviction":true,"trigger:infrastructure:addon:container-crash":true,"trigger:infrastructure:addon:container-eviction":true,"trigger:infrastructure:job:container-crash":true,"trigger:infrastructure:job:container-eviction":true,"trigger:infrastructure:build:container-cpuSpike90":true,"trigger:infrastructure:build:container-cpuSustained90":true,"trigger:infrastructure:service:container-cpuSpike90":true,"trigger:infrastructure:service:container-cpuSustained90":true,"trigger:infrastructure:job:container-cpuSpike90":true,"trigger:infrastructure:job:container-cpuSustained90":true,"trigger:infrastructure:addon:container-cpuSpike90":true,"trigger:infrastructure:addon:container-cpuSustained90":true,"trigger:infrastructure:build:container-memorySpike90":true,"trigger:infrastructure:build:container-memorySustained90":true,"trigger:infrastructure:service:container-memorySpike90":true,"trigger:infrastructure:service:container-memorySustained90":true,"trigger:infrastructure:job:container-memorySpike90":true,"trigger:infrastructure:job:container-memorySustained90":true,"trigger:infrastructure:addon-volume:usage-75-exceeded":true,"trigger:infrastructure:addon-volume:usage-90-exceeded":true,"trigger:infrastructure:platform-volume:usage-75-exceeded":true,"trigger:infrastructure:platform-volume:usage-90-exceeded":true,"trigger:infrastructure:byoc:cluster:error":true,"trigger:infrastructure:byoc:node-pool:error":true,"trigger:infrastructure:byoc:scheduling:error":true,"trigger:infrastructure:byoc:volume:error":true,"trigger:infrastructure:byoc:volume:attach":true}}' \
  https://api.northflank.com/v1/integrations/notifications
```

```javascript
const payload = {
  "name": "Example Notification",
  "type": "RAW_WEBHOOK",
  "webhook": "https://example.com/webhooks",
  "restricted": true,
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "projects": [
    "default-project"
  ],
  "events": {
    "trigger:service:autoscaling:event": true,
    "trigger:service:deployment:status-update": true,
    "trigger:project:tailscale-regen-failure": true,
    "trigger:addon-backup:start": true,
    "trigger:addon-backup:success": true,
    "trigger:addon-backup:failure": true,
    "trigger:addon-backup:abort": true,
    "trigger:build:start": true,
    "trigger:build:success": true,
    "trigger:build:failure": true,
    "trigger:build:abort": true,
    "trigger:job-run:start": true,
    "trigger:job-run:success": true,
    "trigger:job-run:failure": true,
    "trigger:job-run:abort": true,
    "trigger:job-run:terminate": true,
    "trigger:release-flow-template-run:start": true,
    "trigger:release-flow-template-run:update": true,
    "trigger:release-flow-template-run:success": true,
    "trigger:release-flow-template-run:failure": true,
    "trigger:release-flow-template-run:aborted": true,
    "trigger:template-run:queued": true,
    "trigger:template-run:start": true,
    "trigger:template-run:update": true,
    "trigger:template-run:success": true,
    "trigger:template-run:failure": true,
    "trigger:resource:certificate-success": true,
    "trigger:resource:certificate-final-failure": true,
    "trigger:cdn:action-success": true,
    "trigger:cdn:action-failure": true,
    "trigger:cdn:action-delay": true,
    "trigger:log-sink:paused": true,
    "trigger:billing:billing-alert-exceeded": true,
    "trigger:billing:invoice-payment-action-required": true,
    "trigger:billing:invoice-payment-failed": true,
    "trigger:billing:invoice-paid": true,
    "trigger:billing:invoice-carried-over": true,
    "trigger:infrastructure:service:container-crash": true,
    "trigger:infrastructure:service:container-eviction": true,
    "trigger:infrastructure:build:container-eviction": true,
    "trigger:infrastructure:addon:container-crash": true,
    "trigger:infrastructure:addon:container-eviction": true,
    "trigger:infrastructure:job:container-crash": true,
    "trigger:infrastructure:job:container-eviction": true,
    "trigger:infrastructure:build:container-cpuSpike90": true,
    "trigger:infrastructure:build:container-cpuSustained90": true,
    "trigger:infrastructure:service:container-cpuSpike90": true,
    "trigger:infrastructure:service:container-cpuSustained90": true,
    "trigger:infrastructure:job:container-cpuSpike90": true,
    "trigger:infrastructure:job:container-cpuSustained90": true,
    "trigger:infrastructure:addon:container-cpuSpike90": true,
    "trigger:infrastructure:addon:container-cpuSustained90": true,
    "trigger:infrastructure:build:container-memorySpike90": true,
    "trigger:infrastructure:build:container-memorySustained90": true,
    "trigger:infrastructure:service:container-memorySpike90": true,
    "trigger:infrastructure:service:container-memorySustained90": true,
    "trigger:infrastructure:job:container-memorySpike90": true,
    "trigger:infrastructure:job:container-memorySustained90": true,
    "trigger:infrastructure:addon-volume:usage-75-exceeded": true,
    "trigger:infrastructure:addon-volume:usage-90-exceeded": true,
    "trigger:infrastructure:platform-volume:usage-75-exceeded": true,
    "trigger:infrastructure:platform-volume:usage-90-exceeded": true,
    "trigger:infrastructure:byoc:cluster:error": true,
    "trigger:infrastructure:byoc:node-pool:error": true,
    "trigger:infrastructure:byoc:scheduling:error": true,
    "trigger:infrastructure:byoc:volume:error": true,
    "trigger:infrastructure:byoc:volume:attach": true
  }
}

const response = await fetch('https://api.northflank.com/v1/integrations/notifications', {
  method: 'POST',
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

url = "https://api.northflank.com/v1/integrations/notifications"

payload = {"name":"Example Notification","type":"RAW_WEBHOOK","webhook":"https://example.com/webhooks","restricted":true,"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"projects":["default-project"],"events":{"trigger:service:autoscaling:event":true,"trigger:service:deployment:status-update":true,"trigger:project:tailscale-regen-failure":true,"trigger:addon-backup:start":true,"trigger:addon-backup:success":true,"trigger:addon-backup:failure":true,"trigger:addon-backup:abort":true,"trigger:build:start":true,"trigger:build:success":true,"trigger:build:failure":true,"trigger:build:abort":true,"trigger:job-run:start":true,"trigger:job-run:success":true,"trigger:job-run:failure":true,"trigger:job-run:abort":true,"trigger:job-run:terminate":true,"trigger:release-flow-template-run:start":true,"trigger:release-flow-template-run:update":true,"trigger:release-flow-template-run:success":true,"trigger:release-flow-template-run:failure":true,"trigger:release-flow-template-run:aborted":true,"trigger:template-run:queued":true,"trigger:template-run:start":true,"trigger:template-run:update":true,"trigger:template-run:success":true,"trigger:template-run:failure":true,"trigger:resource:certificate-success":true,"trigger:resource:certificate-final-failure":true,"trigger:cdn:action-success":true,"trigger:cdn:action-failure":true,"trigger:cdn:action-delay":true,"trigger:log-sink:paused":true,"trigger:billing:billing-alert-exceeded":true,"trigger:billing:invoice-payment-action-required":true,"trigger:billing:invoice-payment-failed":true,"trigger:billing:invoice-paid":true,"trigger:billing:invoice-carried-over":true,"trigger:infrastructure:service:container-crash":true,"trigger:infrastructure:service:container-eviction":true,"trigger:infrastructure:build:container-eviction":true,"trigger:infrastructure:addon:container-crash":true,"trigger:infrastructure:addon:container-eviction":true,"trigger:infrastructure:job:container-crash":true,"trigger:infrastructure:job:container-eviction":true,"trigger:infrastructure:build:container-cpuSpike90":true,"trigger:infrastructure:build:container-cpuSustained90":true,"trigger:infrastructure:service:container-cpuSpike90":true,"trigger:infrastructure:service:container-cpuSustained90":true,"trigger:infrastructure:job:container-cpuSpike90":true,"trigger:infrastructure:job:container-cpuSustained90":true,"trigger:infrastructure:addon:container-cpuSpike90":true,"trigger:infrastructure:addon:container-cpuSustained90":true,"trigger:infrastructure:build:container-memorySpike90":true,"trigger:infrastructure:build:container-memorySustained90":true,"trigger:infrastructure:service:container-memorySpike90":true,"trigger:infrastructure:service:container-memorySustained90":true,"trigger:infrastructure:job:container-memorySpike90":true,"trigger:infrastructure:job:container-memorySustained90":true,"trigger:infrastructure:addon-volume:usage-75-exceeded":true,"trigger:infrastructure:addon-volume:usage-90-exceeded":true,"trigger:infrastructure:platform-volume:usage-75-exceeded":true,"trigger:infrastructure:platform-volume:usage-90-exceeded":true,"trigger:infrastructure:byoc:cluster:error":true,"trigger:infrastructure:byoc:node-pool:error":true,"trigger:infrastructure:byoc:scheduling:error":true,"trigger:infrastructure:byoc:volume:error":true,"trigger:infrastructure:byoc:volume:attach":true}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/integrations/notifications"

  var jsonStr = []byte(`{"name":"Example Notification","type":"RAW_WEBHOOK","webhook":"https://example.com/webhooks","restricted":true,"restrictions":{"tags":{"enabled":false,"matchCondition":"or"}},"projects":["default-project"],"events":{"trigger:service:autoscaling:event":true,"trigger:service:deployment:status-update":true,"trigger:project:tailscale-regen-failure":true,"trigger:addon-backup:start":true,"trigger:addon-backup:success":true,"trigger:addon-backup:failure":true,"trigger:addon-backup:abort":true,"trigger:build:start":true,"trigger:build:success":true,"trigger:build:failure":true,"trigger:build:abort":true,"trigger:job-run:start":true,"trigger:job-run:success":true,"trigger:job-run:failure":true,"trigger:job-run:abort":true,"trigger:job-run:terminate":true,"trigger:release-flow-template-run:start":true,"trigger:release-flow-template-run:update":true,"trigger:release-flow-template-run:success":true,"trigger:release-flow-template-run:failure":true,"trigger:release-flow-template-run:aborted":true,"trigger:template-run:queued":true,"trigger:template-run:start":true,"trigger:template-run:update":true,"trigger:template-run:success":true,"trigger:template-run:failure":true,"trigger:resource:certificate-success":true,"trigger:resource:certificate-final-failure":true,"trigger:cdn:action-success":true,"trigger:cdn:action-failure":true,"trigger:cdn:action-delay":true,"trigger:log-sink:paused":true,"trigger:billing:billing-alert-exceeded":true,"trigger:billing:invoice-payment-action-required":true,"trigger:billing:invoice-payment-failed":true,"trigger:billing:invoice-paid":true,"trigger:billing:invoice-carried-over":true,"trigger:infrastructure:service:container-crash":true,"trigger:infrastructure:service:container-eviction":true,"trigger:infrastructure:build:container-eviction":true,"trigger:infrastructure:addon:container-crash":true,"trigger:infrastructure:addon:container-eviction":true,"trigger:infrastructure:job:container-crash":true,"trigger:infrastructure:job:container-eviction":true,"trigger:infrastructure:build:container-cpuSpike90":true,"trigger:infrastructure:build:container-cpuSustained90":true,"trigger:infrastructure:service:container-cpuSpike90":true,"trigger:infrastructure:service:container-cpuSustained90":true,"trigger:infrastructure:job:container-cpuSpike90":true,"trigger:infrastructure:job:container-cpuSustained90":true,"trigger:infrastructure:addon:container-cpuSpike90":true,"trigger:infrastructure:addon:container-cpuSustained90":true,"trigger:infrastructure:build:container-memorySpike90":true,"trigger:infrastructure:build:container-memorySustained90":true,"trigger:infrastructure:service:container-memorySpike90":true,"trigger:infrastructure:service:container-memorySustained90":true,"trigger:infrastructure:job:container-memorySpike90":true,"trigger:infrastructure:job:container-memorySustained90":true,"trigger:infrastructure:addon-volume:usage-75-exceeded":true,"trigger:infrastructure:addon-volume:usage-90-exceeded":true,"trigger:infrastructure:platform-volume:usage-75-exceeded":true,"trigger:infrastructure:platform-volume:usage-90-exceeded":true,"trigger:infrastructure:byoc:cluster:error":true,"trigger:infrastructure:byoc:node-pool:error":true,"trigger:infrastructure:byoc:scheduling:error":true,"trigger:infrastructure:byoc:volume:error":true,"trigger:infrastructure:byoc:volume:attach":true}}`)
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
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

200 OK: Details of a notification integration

```json
{
  "data": {
    "name": "Example Notification",
    "id": "example-notification",
    "type": "RAW_WEBHOOK",
    "webhook": "https://example.com/webhooks",
    "createdAt": "2023-09-12T16:39:44.166Z\"",
    "updatedAt": "2023-09-12T16:39:44.166Z\"",
    "status": {
      "disabled": false
    },
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "events": {
      "trigger:service:autoscaling:event": true,
      "trigger:service:deployment:status-update": true,
      "trigger:project:tailscale-regen-failure": true,
      "trigger:addon-backup:start": true,
      "trigger:addon-backup:success": true,
      "trigger:addon-backup:failure": true,
      "trigger:addon-backup:abort": true,
      "trigger:build:start": true,
      "trigger:build:success": true,
      "trigger:build:failure": true,
      "trigger:build:abort": true,
      "trigger:job-run:start": true,
      "trigger:job-run:success": true,
      "trigger:job-run:failure": true,
      "trigger:job-run:abort": true,
      "trigger:job-run:terminate": true,
      "trigger:release-flow-template-run:start": true,
      "trigger:release-flow-template-run:update": true,
      "trigger:release-flow-template-run:success": true,
      "trigger:release-flow-template-run:failure": true,
      "trigger:release-flow-template-run:aborted": true,
      "trigger:template-run:queued": true,
      "trigger:template-run:start": true,
      "trigger:template-run:update": true,
      "trigger:template-run:success": true,
      "trigger:template-run:failure": true,
      "trigger:resource:certificate-success": true,
      "trigger:resource:certificate-final-failure": true,
      "trigger:cdn:action-success": true,
      "trigger:cdn:action-failure": true,
      "trigger:cdn:action-delay": true,
      "trigger:log-sink:paused": true,
      "trigger:billing:billing-alert-exceeded": true,
      "trigger:billing:invoice-payment-action-required": true,
      "trigger:billing:invoice-payment-failed": true,
      "trigger:billing:invoice-paid": true,
      "trigger:billing:invoice-carried-over": true,
      "trigger:infrastructure:service:container-crash": true,
      "trigger:infrastructure:service:container-eviction": true,
      "trigger:infrastructure:build:container-eviction": true,
      "trigger:infrastructure:addon:container-crash": true,
      "trigger:infrastructure:addon:container-eviction": true,
      "trigger:infrastructure:job:container-crash": true,
      "trigger:infrastructure:job:container-eviction": true,
      "trigger:infrastructure:build:container-cpuSpike90": true,
      "trigger:infrastructure:build:container-cpuSustained90": true,
      "trigger:infrastructure:service:container-cpuSpike90": true,
      "trigger:infrastructure:service:container-cpuSustained90": true,
      "trigger:infrastructure:job:container-cpuSpike90": true,
      "trigger:infrastructure:job:container-cpuSustained90": true,
      "trigger:infrastructure:addon:container-cpuSpike90": true,
      "trigger:infrastructure:addon:container-cpuSustained90": true,
      "trigger:infrastructure:build:container-memorySpike90": true,
      "trigger:infrastructure:build:container-memorySustained90": true,
      "trigger:infrastructure:service:container-memorySpike90": true,
      "trigger:infrastructure:service:container-memorySustained90": true,
      "trigger:infrastructure:job:container-memorySpike90": true,
      "trigger:infrastructure:job:container-memorySustained90": true,
      "trigger:infrastructure:addon-volume:usage-75-exceeded": true,
      "trigger:infrastructure:addon-volume:usage-90-exceeded": true,
      "trigger:infrastructure:platform-volume:usage-75-exceeded": true,
      "trigger:infrastructure:platform-volume:usage-90-exceeded": true,
      "trigger:infrastructure:byoc:cluster:error": true,
      "trigger:infrastructure:byoc:node-pool:error": true,
      "trigger:infrastructure:byoc:scheduling:error": true,
      "trigger:infrastructure:byoc:volume:error": true,
      "trigger:infrastructure:byoc:volume:attach": true
    }
  }
}
```

### CLI reference

$ northflank create notification

Options:

- `--notificationId <notificationId>`: ID of the notification integration

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Notification",
  "type": "RAW_WEBHOOK",
  "webhook": "https://example.com/webhooks",
  "restricted": true,
  "restrictions": {
    "tags": {
      "enabled": false,
      "matchCondition": "or"
    }
  },
  "projects": [
    "default-project"
  ],
  "events": {
    "trigger:service:autoscaling:event": true,
    "trigger:service:deployment:status-update": true,
    "trigger:project:tailscale-regen-failure": true,
    "trigger:addon-backup:start": true,
    "trigger:addon-backup:success": true,
    "trigger:addon-backup:failure": true,
    "trigger:addon-backup:abort": true,
    "trigger:build:start": true,
    "trigger:build:success": true,
    "trigger:build:failure": true,
    "trigger:build:abort": true,
    "trigger:job-run:start": true,
    "trigger:job-run:success": true,
    "trigger:job-run:failure": true,
    "trigger:job-run:abort": true,
    "trigger:job-run:terminate": true,
    "trigger:release-flow-template-run:start": true,
    "trigger:release-flow-template-run:update": true,
    "trigger:release-flow-template-run:success": true,
    "trigger:release-flow-template-run:failure": true,
    "trigger:release-flow-template-run:aborted": true,
    "trigger:template-run:queued": true,
    "trigger:template-run:start": true,
    "trigger:template-run:update": true,
    "trigger:template-run:success": true,
    "trigger:template-run:failure": true,
    "trigger:resource:certificate-success": true,
    "trigger:resource:certificate-final-failure": true,
    "trigger:cdn:action-success": true,
    "trigger:cdn:action-failure": true,
    "trigger:cdn:action-delay": true,
    "trigger:log-sink:paused": true,
    "trigger:billing:billing-alert-exceeded": true,
    "trigger:billing:invoice-payment-action-required": true,
    "trigger:billing:invoice-payment-failed": true,
    "trigger:billing:invoice-paid": true,
    "trigger:billing:invoice-carried-over": true,
    "trigger:infrastructure:service:container-crash": true,
    "trigger:infrastructure:service:container-eviction": true,
    "trigger:infrastructure:build:container-eviction": true,
    "trigger:infrastructure:addon:container-crash": true,
    "trigger:infrastructure:addon:container-eviction": true,
    "trigger:infrastructure:job:container-crash": true,
    "trigger:infrastructure:job:container-eviction": true,
    "trigger:infrastructure:build:container-cpuSpike90": true,
    "trigger:infrastructure:build:container-cpuSustained90": true,
    "trigger:infrastructure:service:container-cpuSpike90": true,
    "trigger:infrastructure:service:container-cpuSustained90": true,
    "trigger:infrastructure:job:container-cpuSpike90": true,
    "trigger:infrastructure:job:container-cpuSustained90": true,
    "trigger:infrastructure:addon:container-cpuSpike90": true,
    "trigger:infrastructure:addon:container-cpuSustained90": true,
    "trigger:infrastructure:build:container-memorySpike90": true,
    "trigger:infrastructure:build:container-memorySustained90": true,
    "trigger:infrastructure:service:container-memorySpike90": true,
    "trigger:infrastructure:service:container-memorySustained90": true,
    "trigger:infrastructure:job:container-memorySpike90": true,
    "trigger:infrastructure:job:container-memorySustained90": true,
    "trigger:infrastructure:addon-volume:usage-75-exceeded": true,
    "trigger:infrastructure:addon-volume:usage-90-exceeded": true,
    "trigger:infrastructure:platform-volume:usage-75-exceeded": true,
    "trigger:infrastructure:platform-volume:usage-90-exceeded": true,
    "trigger:infrastructure:byoc:cluster:error": true,
    "trigger:infrastructure:byoc:node-pool:error": true,
    "trigger:infrastructure:byoc:scheduling:error": true,
    "trigger:infrastructure:byoc:volume:error": true,
    "trigger:infrastructure:byoc:volume:attach": true
  }
}
```

#### Example Response

 Details of a notification integration

```json
{
  "name": "Example Notification",
  "id": "example-notification",
  "type": "RAW_WEBHOOK",
  "webhook": "https://example.com/webhooks",
  "createdAt": "2023-09-12T16:39:44.166Z\"",
  "updatedAt": "2023-09-12T16:39:44.166Z\"",
  "status": {
    "disabled": false
  },
  "restricted": true,
  "projects": [
    "default-project"
  ],
  "events": {
    "trigger:service:autoscaling:event": true,
    "trigger:service:deployment:status-update": true,
    "trigger:project:tailscale-regen-failure": true,
    "trigger:addon-backup:start": true,
    "trigger:addon-backup:success": true,
    "trigger:addon-backup:failure": true,
    "trigger:addon-backup:abort": true,
    "trigger:build:start": true,
    "trigger:build:success": true,
    "trigger:build:failure": true,
    "trigger:build:abort": true,
    "trigger:job-run:start": true,
    "trigger:job-run:success": true,
    "trigger:job-run:failure": true,
    "trigger:job-run:abort": true,
    "trigger:job-run:terminate": true,
    "trigger:release-flow-template-run:start": true,
    "trigger:release-flow-template-run:update": true,
    "trigger:release-flow-template-run:success": true,
    "trigger:release-flow-template-run:failure": true,
    "trigger:release-flow-template-run:aborted": true,
    "trigger:template-run:queued": true,
    "trigger:template-run:start": true,
    "trigger:template-run:update": true,
    "trigger:template-run:success": true,
    "trigger:template-run:failure": true,
    "trigger:resource:certificate-success": true,
    "trigger:resource:certificate-final-failure": true,
    "trigger:cdn:action-success": true,
    "trigger:cdn:action-failure": true,
    "trigger:cdn:action-delay": true,
    "trigger:log-sink:paused": true,
    "trigger:billing:billing-alert-exceeded": true,
    "trigger:billing:invoice-payment-action-required": true,
    "trigger:billing:invoice-payment-failed": true,
    "trigger:billing:invoice-paid": true,
    "trigger:billing:invoice-carried-over": true,
    "trigger:infrastructure:service:container-crash": true,
    "trigger:infrastructure:service:container-eviction": true,
    "trigger:infrastructure:build:container-eviction": true,
    "trigger:infrastructure:addon:container-crash": true,
    "trigger:infrastructure:addon:container-eviction": true,
    "trigger:infrastructure:job:container-crash": true,
    "trigger:infrastructure:job:container-eviction": true,
    "trigger:infrastructure:build:container-cpuSpike90": true,
    "trigger:infrastructure:build:container-cpuSustained90": true,
    "trigger:infrastructure:service:container-cpuSpike90": true,
    "trigger:infrastructure:service:container-cpuSustained90": true,
    "trigger:infrastructure:job:container-cpuSpike90": true,
    "trigger:infrastructure:job:container-cpuSustained90": true,
    "trigger:infrastructure:addon:container-cpuSpike90": true,
    "trigger:infrastructure:addon:container-cpuSustained90": true,
    "trigger:infrastructure:build:container-memorySpike90": true,
    "trigger:infrastructure:build:container-memorySustained90": true,
    "trigger:infrastructure:service:container-memorySpike90": true,
    "trigger:infrastructure:service:container-memorySustained90": true,
    "trigger:infrastructure:job:container-memorySpike90": true,
    "trigger:infrastructure:job:container-memorySustained90": true,
    "trigger:infrastructure:addon-volume:usage-75-exceeded": true,
    "trigger:infrastructure:addon-volume:usage-90-exceeded": true,
    "trigger:infrastructure:platform-volume:usage-75-exceeded": true,
    "trigger:infrastructure:platform-volume:usage-90-exceeded": true,
    "trigger:infrastructure:byoc:cluster:error": true,
    "trigger:infrastructure:byoc:node-pool:error": true,
    "trigger:infrastructure:byoc:scheduling:error": true,
    "trigger:infrastructure:byoc:volume:error": true,
    "trigger:infrastructure:byoc:volume:attach": true
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.notification({
  parameters: {
    "notificationId": "example-notification-id"
  },
  data: {
    "name": "Example Notification",
    "type": "RAW_WEBHOOK",
    "webhook": "https://example.com/webhooks",
    "restricted": true,
    "restrictions": {
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "projects": [
      "default-project"
    ],
    "events": {
      "trigger:service:autoscaling:event": true,
      "trigger:service:deployment:status-update": true,
      "trigger:project:tailscale-regen-failure": true,
      "trigger:addon-backup:start": true,
      "trigger:addon-backup:success": true,
      "trigger:addon-backup:failure": true,
      "trigger:addon-backup:abort": true,
      "trigger:build:start": true,
      "trigger:build:success": true,
      "trigger:build:failure": true,
      "trigger:build:abort": true,
      "trigger:job-run:start": true,
      "trigger:job-run:success": true,
      "trigger:job-run:failure": true,
      "trigger:job-run:abort": true,
      "trigger:job-run:terminate": true,
      "trigger:release-flow-template-run:start": true,
      "trigger:release-flow-template-run:update": true,
      "trigger:release-flow-template-run:success": true,
      "trigger:release-flow-template-run:failure": true,
      "trigger:release-flow-template-run:aborted": true,
      "trigger:template-run:queued": true,
      "trigger:template-run:start": true,
      "trigger:template-run:update": true,
      "trigger:template-run:success": true,
      "trigger:template-run:failure": true,
      "trigger:resource:certificate-success": true,
      "trigger:resource:certificate-final-failure": true,
      "trigger:cdn:action-success": true,
      "trigger:cdn:action-failure": true,
      "trigger:cdn:action-delay": true,
      "trigger:log-sink:paused": true,
      "trigger:billing:billing-alert-exceeded": true,
      "trigger:billing:invoice-payment-action-required": true,
      "trigger:billing:invoice-payment-failed": true,
      "trigger:billing:invoice-paid": true,
      "trigger:billing:invoice-carried-over": true,
      "trigger:infrastructure:service:container-crash": true,
      "trigger:infrastructure:service:container-eviction": true,
      "trigger:infrastructure:build:container-eviction": true,
      "trigger:infrastructure:addon:container-crash": true,
      "trigger:infrastructure:addon:container-eviction": true,
      "trigger:infrastructure:job:container-crash": true,
      "trigger:infrastructure:job:container-eviction": true,
      "trigger:infrastructure:build:container-cpuSpike90": true,
      "trigger:infrastructure:build:container-cpuSustained90": true,
      "trigger:infrastructure:service:container-cpuSpike90": true,
      "trigger:infrastructure:service:container-cpuSustained90": true,
      "trigger:infrastructure:job:container-cpuSpike90": true,
      "trigger:infrastructure:job:container-cpuSustained90": true,
      "trigger:infrastructure:addon:container-cpuSpike90": true,
      "trigger:infrastructure:addon:container-cpuSustained90": true,
      "trigger:infrastructure:build:container-memorySpike90": true,
      "trigger:infrastructure:build:container-memorySustained90": true,
      "trigger:infrastructure:service:container-memorySpike90": true,
      "trigger:infrastructure:service:container-memorySustained90": true,
      "trigger:infrastructure:job:container-memorySpike90": true,
      "trigger:infrastructure:job:container-memorySustained90": true,
      "trigger:infrastructure:addon-volume:usage-75-exceeded": true,
      "trigger:infrastructure:addon-volume:usage-90-exceeded": true,
      "trigger:infrastructure:platform-volume:usage-75-exceeded": true,
      "trigger:infrastructure:platform-volume:usage-90-exceeded": true,
      "trigger:infrastructure:byoc:cluster:error": true,
      "trigger:infrastructure:byoc:node-pool:error": true,
      "trigger:infrastructure:byoc:scheduling:error": true,
      "trigger:infrastructure:byoc:volume:error": true,
      "trigger:infrastructure:byoc:volume:attach": true
    }
  }
});
```

#### Example Response

 Details of a notification integration

```json
{
  "data": {
    "name": "Example Notification",
    "id": "example-notification",
    "type": "RAW_WEBHOOK",
    "webhook": "https://example.com/webhooks",
    "createdAt": "2023-09-12T16:39:44.166Z\"",
    "updatedAt": "2023-09-12T16:39:44.166Z\"",
    "status": {
      "disabled": false
    },
    "restricted": true,
    "projects": [
      "default-project"
    ],
    "events": {
      "trigger:service:autoscaling:event": true,
      "trigger:service:deployment:status-update": true,
      "trigger:project:tailscale-regen-failure": true,
      "trigger:addon-backup:start": true,
      "trigger:addon-backup:success": true,
      "trigger:addon-backup:failure": true,
      "trigger:addon-backup:abort": true,
      "trigger:build:start": true,
      "trigger:build:success": true,
      "trigger:build:failure": true,
      "trigger:build:abort": true,
      "trigger:job-run:start": true,
      "trigger:job-run:success": true,
      "trigger:job-run:failure": true,
      "trigger:job-run:abort": true,
      "trigger:job-run:terminate": true,
      "trigger:release-flow-template-run:start": true,
      "trigger:release-flow-template-run:update": true,
      "trigger:release-flow-template-run:success": true,
      "trigger:release-flow-template-run:failure": true,
      "trigger:release-flow-template-run:aborted": true,
      "trigger:template-run:queued": true,
      "trigger:template-run:start": true,
      "trigger:template-run:update": true,
      "trigger:template-run:success": true,
      "trigger:template-run:failure": true,
      "trigger:resource:certificate-success": true,
      "trigger:resource:certificate-final-failure": true,
      "trigger:cdn:action-success": true,
      "trigger:cdn:action-failure": true,
      "trigger:cdn:action-delay": true,
      "trigger:log-sink:paused": true,
      "trigger:billing:billing-alert-exceeded": true,
      "trigger:billing:invoice-payment-action-required": true,
      "trigger:billing:invoice-payment-failed": true,
      "trigger:billing:invoice-paid": true,
      "trigger:billing:invoice-carried-over": true,
      "trigger:infrastructure:service:container-crash": true,
      "trigger:infrastructure:service:container-eviction": true,
      "trigger:infrastructure:build:container-eviction": true,
      "trigger:infrastructure:addon:container-crash": true,
      "trigger:infrastructure:addon:container-eviction": true,
      "trigger:infrastructure:job:container-crash": true,
      "trigger:infrastructure:job:container-eviction": true,
      "trigger:infrastructure:build:container-cpuSpike90": true,
      "trigger:infrastructure:build:container-cpuSustained90": true,
      "trigger:infrastructure:service:container-cpuSpike90": true,
      "trigger:infrastructure:service:container-cpuSustained90": true,
      "trigger:infrastructure:job:container-cpuSpike90": true,
      "trigger:infrastructure:job:container-cpuSustained90": true,
      "trigger:infrastructure:addon:container-cpuSpike90": true,
      "trigger:infrastructure:addon:container-cpuSustained90": true,
      "trigger:infrastructure:build:container-memorySpike90": true,
      "trigger:infrastructure:build:container-memorySustained90": true,
      "trigger:infrastructure:service:container-memorySpike90": true,
      "trigger:infrastructure:service:container-memorySustained90": true,
      "trigger:infrastructure:job:container-memorySpike90": true,
      "trigger:infrastructure:job:container-memorySustained90": true,
      "trigger:infrastructure:addon-volume:usage-75-exceeded": true,
      "trigger:infrastructure:addon-volume:usage-90-exceeded": true,
      "trigger:infrastructure:platform-volume:usage-75-exceeded": true,
      "trigger:infrastructure:platform-volume:usage-90-exceeded": true,
      "trigger:infrastructure:byoc:cluster:error": true,
      "trigger:infrastructure:byoc:node-pool:error": true,
      "trigger:infrastructure:byoc:scheduling:error": true,
      "trigger:infrastructure:byoc:volume:error": true,
      "trigger:infrastructure:byoc:volume:attach": true
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
