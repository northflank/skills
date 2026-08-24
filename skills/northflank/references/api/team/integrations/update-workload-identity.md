# Update workload identity

Source: https://northflank.com/docs/v1/api/team/integrations/update-workload-identity.md

Updates a workload identity. For managed roles using automatic provider setup, installation of the cloud resources is triggered automatically unless `noInstall=true` is passed.

Required permission: Account > Cloud > WorkloadIdentities > Update

**Path parameters:**

{object}
- `workloadIdentityId`: (string) (required) ID of the workload identity

**Query parameters:**

{object}
- `noInstall`: (boolean) Skip automatic installation of cloud resources after create or update for managed roles. The workload identity will be left in the unapplied/outdated state.

**Request body:**

{object}
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `updatedAt`: (string) time of update (format: date-time)
- `createdAt`: (string) time of creation (format: date-time)
- `spec`: {object}
  - `provider`: (multiple options) {object}
     - `type`: (string) (required) (enum: aws)
     - `policyDocument`: {object}
       - `Version`: (string) (required) (enum: 2012-10-17, 2008-10-17)
       - `Statement`: (multiple options) {object}
           - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
           - `Effect`: (string) (required) (enum: Allow, Deny)
           - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
           - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
           - `Condition`: {object} | [array of] {object}
             - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
             - `Effect`: (string) (required) (enum: Allow, Deny)
             - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
             - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
             - `Condition`: {object}
     - `rolePath`: (string) The path for the AWS IAM role to create. (pattern: ^\/?[\w+=,.@-]+(?:\/[\w+=,.@-]+)*\/?$)
     - `arn`: (string)
     - `roleName`: (undefined) (required) | {object}
     - `type`: (string) (required) (enum: aws)
     - `policyDocument`: {object}
       - `Version`: (string) (required) (enum: 2012-10-17, 2008-10-17)
       - `Statement`: (multiple options) {object}
           - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
           - `Effect`: (string) (required) (enum: Allow, Deny)
           - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
           - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
           - `Condition`: {object} | [array of] {object}
             - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
             - `Effect`: (string) (required) (enum: Allow, Deny)
             - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
             - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
             - `Condition`: {object}
     - `roleName`: (string) The name for the AWS IAM role to create. If not specified, a name is generated automatically. (pattern: ^[\w+=,.@-]{1,64}$)
     - `arn`: (string)
     - `rolePath`: (undefined) (required) | {object}
     - `type`: (string) (required) (enum: aws)
     - `policyDocument`: {object}
       - `Version`: (string) (required) (enum: 2012-10-17, 2008-10-17)
       - `Statement`: (multiple options) {object}
           - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
           - `Effect`: (string) (required) (enum: Allow, Deny)
           - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
           - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
           - `Condition`: {object} | [array of] {object}
             - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
             - `Effect`: (string) (required) (enum: Allow, Deny)
             - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
             - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
             - `Condition`: {object}
     - `arn`: (string)
     - `roleName`: (undefined) (required)
     - `rolePath`: (undefined) (required) | (multiple options) {object}
      - `type`: (string) (required) (enum: aws)
      - `policyDocument`: {object}
        - `Version`: (string) (required) (enum: 2012-10-17, 2008-10-17)
        - `Statement`: (multiple options) {object}
            - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
            - `Effect`: (string) (required) (enum: Allow, Deny)
            - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
            - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
            - `Condition`: {object} | [array of] {object}
              - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
              - `Effect`: (string) (required) (enum: Allow, Deny)
              - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
              - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
              - `Condition`: {object}
      - `roleName`: (string) The name for the AWS IAM role to create. If not specified, a name is generated automatically. (pattern: ^[\w+=,.@-]{1,64}$)
      - `rolePath`: (string) The path for the AWS IAM role to create. (pattern: ^\/?[\w+=,.@-]+(?:\/[\w+=,.@-]+)*\/?$)
      - `arn`: (string) | {object}
      - `type`: (string) (required) (enum: aws)
      - `existingRoleArn`: (string) (required)
      - `arn`: (string) | {object}
      - `type`: (string) (required) (enum: gcp)
      - `permissions`: [array of] (string) (pattern: ^[a-zA-Z0-9.]+$)
      - `impersonationUrl`: (string)
      - `audience`: (string) | {object}
      - `type`: (string) (required) (enum: gcp)
      - `existingRoleAudience`: (string) (required)
      - `existingRoleImpersonationUrl`: (string) (required)
      - `impersonationUrl`: (string)
      - `audience`: (string)
  - `restrictions`: {object}
    - `projects`: {object}
      - `enabled`: (boolean) Whether restriction by project should be enabled.
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `tags`: {object}
      - `enabled`: (boolean) Whether restriction by tag should be enabled.
      - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the workload identity (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `spec`: {object}
    - `providerLinkId`: (string) (required) The internal ID of the BYOC provider integration to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `roleMode`: (string) (required) (enum: managed, existing)
    - `providerSetupMode`: (string) (enum: auto, manual)
    - `provider`: (multiple options) {object}
        - `type`: (string) (required) (enum: aws)
        - `policyDocument`: {object}
          - `Version`: (string) (required) (enum: 2012-10-17, 2008-10-17)
          - `Statement`: (multiple options) {object}
              - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
              - `Effect`: (string) (required) (enum: Allow, Deny)
              - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
              - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
              - `Condition`: {object} | [array of] {object}
                - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
                - `Effect`: (string) (required) (enum: Allow, Deny)
                - `Action`: (multiple options) (string) A single IAM action. | [array of] (string)
                - `Resource`: (multiple options) (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
                - `Condition`: {object}
        - `roleName`: (string) The name for the AWS IAM role to create. If not specified, a name is generated automatically. (pattern: ^[\w+=,.@-]{1,64}$)
        - `rolePath`: (string) The path for the AWS IAM role to create. (pattern: ^\/?[\w+=,.@-]+(?:\/[\w+=,.@-]+)*\/?$)
        - `arn`: (string) | {object}
        - `type`: (string) (required) (enum: aws)
        - `existingRoleArn`: (string) (required)
        - `arn`: (string) | {object}
        - `type`: (string) (required) (enum: gcp)
        - `permissions`: [array of] (string) (pattern: ^[a-zA-Z0-9.]+$)
        - `impersonationUrl`: (string)
        - `audience`: (string) | {object}
        - `type`: (string) (required) (enum: gcp)
        - `existingRoleAudience`: (string) (required)
        - `existingRoleImpersonationUrl`: (string) (required)
        - `impersonationUrl`: (string)
        - `audience`: (string)
    - `restrictions`: {object}
      - `projects`: {object}
        - `enabled`: (boolean) Whether restriction by project should be enabled.
        - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `tags`: {object}
        - `enabled`: (boolean) Whether restriction by tag should be enabled.
        - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
        - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
  - `state`: {object}
    - `status`: (string) (required) The current install status of the workload identity. (enum: unapplied, outdated, installing, updating, error, applied, deleting)
    - `updatedAt`: (string) time of update (format: date-time)
    - `errors`: [array of] (string)
  - `updatedAt`: (string) time of update (format: date-time)
  - `createdAt`: (string) time of creation (format: date-time)

### API reference

PATCH /v1/workload-identities/{workloadIdentityId}

PATCH /v1/teams/{teamId}/workload-identities/{workloadIdentityId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PATCH \
  --data '{"spec":{"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}}}}' \
  https://api.northflank.com/v1/workload-identities/{workloadIdentityId}
```

```javascript
const payload = {
  "spec": {
    "restrictions": {
      "projects": {
        "enabled": false
      },
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/workload-identities/{workloadIdentityId}', {
  method: 'PATCH',
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

url = "https://api.northflank.com/v1/workload-identities/{workloadIdentityId}"

payload = {"spec":{"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}}}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PATCH", url, headers = headers, json = payload)

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
  url := "https://api.northflank.com/v1/workload-identities/{workloadIdentityId}"

  var jsonStr = []byte(`{"spec":{"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}}}}`)
  req, err := http.NewRequest("PATCH", url, bytes.NewBuffer(jsonStr))
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

200 OK: Data about the workload identity.

```json
{
  "data": {
    "id": "example-workload-identity",
    "name": "Example Workload Identity",
    "spec": {
      "restrictions": {
        "projects": {
          "enabled": false
        },
        "tags": {
          "enabled": false,
          "matchCondition": "or"
        }
      }
    }
  }
}
```

### CLI reference

$ northflank update workload-identities

Options:

- `--workloadIdentityId <workloadIdentityId>`: ID of the workload identity

- `--noInstall <noInstall>`: Skip automatic installation of cloud resources after create or update for managed roles. The workload identity will be left in the unapplied/outdated state.

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "spec": {
    "restrictions": {
      "projects": {
        "enabled": false
      },
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    }
  }
}
```

#### Example Response

 Data about the workload identity.

```json
{
  "id": "example-workload-identity",
  "name": "Example Workload Identity",
  "spec": {
    "restrictions": {
      "projects": {
        "enabled": false
      },
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    }
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.workloadIdentities({
  parameters: {
    "workloadIdentityId": "example-workload-identity"
  },
  options: {},
  data: {
    "spec": {
      "restrictions": {
        "projects": {
          "enabled": false
        },
        "tags": {
          "enabled": false,
          "matchCondition": "or"
        }
      }
    }
  }
});
```

#### Example Response

 Data about the workload identity.

```json
{
  "data": {
    "id": "example-workload-identity",
    "name": "Example Workload Identity",
    "spec": {
      "restrictions": {
        "projects": {
          "enabled": false
        },
        "tags": {
          "enabled": false,
          "matchCondition": "or"
        }
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
