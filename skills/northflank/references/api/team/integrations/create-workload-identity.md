# Create workload identity

Source: https://northflank.com/docs/v1/api/team/integrations/create-workload-identity.md

Creates a new workload identity on this account. For managed roles using automatic provider setup, installation of the cloud resources is triggered automatically unless `noInstall=true` is passed.

Required permission: Account > Cloud > WorkloadIdentities > Create

**Query parameters:**

{object}
- `noInstall`: (boolean) Skip automatic installation of cloud resources after create or update for managed roles. The workload identity will be left in the unapplied/outdated state.

**Request body:**

{object}
- `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `priority`: (integer) The priority used to select a workload identity for each provider.
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
- `updatedAt`: (string) time of update (format: date-time)
- `createdAt`: (string) time of creation (format: date-time)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the workload identity (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `priority`: (integer) The priority used to select a workload identity for each provider.
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

POST /v1/workload-identities

POST /v1/teams/{teamId}/workload-identities

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Workload Identity","priority":10,"spec":{"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}},"providerLinkId":"string","roleMode":"managed","provider":{"type":"aws","policyDocument":{"Version":"2012-10-17","Statement":{"Effect":"Allow","Action":"string","Resource":"*"}}}}}' \
  https://api.northflank.com/v1/workload-identities
```

```javascript
const payload = {
  "name": "Example Workload Identity",
  "priority": 10,
  "spec": {
    "restrictions": {
      "projects": {
        "enabled": false
      },
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "providerLinkId": "string",
    "roleMode": "managed",
    "provider": {
      "type": "aws",
      "policyDocument": {
        "Version": "2012-10-17",
        "Statement": {
          "Effect": "Allow",
          "Action": "string",
          "Resource": "*"
        }
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/workload-identities', {
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

url = "https://api.northflank.com/v1/workload-identities"

payload = {"name":"Example Workload Identity","priority":10,"spec":{"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}},"providerLinkId":"string","roleMode":"managed","provider":{"type":"aws","policyDocument":{"Version":"2012-10-17","Statement":{"Effect":"Allow","Action":"string","Resource":"*"}}}}}
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
  url := "https://api.northflank.com/v1/workload-identities"

  var jsonStr = []byte(`{"name":"Example Workload Identity","priority":10,"spec":{"restrictions":{"projects":{"enabled":false},"tags":{"enabled":false,"matchCondition":"or"}},"providerLinkId":"string","roleMode":"managed","provider":{"type":"aws","policyDocument":{"Version":"2012-10-17","Statement":{"Effect":"Allow","Action":"string","Resource":"*"}}}}}`)
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

200 OK: Data about the newly created workload identity.

```json
{
  "data": {
    "id": "example-workload-identity",
    "name": "Example Workload Identity",
    "priority": 10,
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

$ northflank create workload-identities

Options:

- `--noInstall <noInstall>`: Skip automatic installation of cloud resources after create or update for managed roles. The workload identity will be left in the unapplied/outdated state.

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Workload Identity",
  "priority": 10,
  "spec": {
    "restrictions": {
      "projects": {
        "enabled": false
      },
      "tags": {
        "enabled": false,
        "matchCondition": "or"
      }
    },
    "providerLinkId": "string",
    "roleMode": "managed",
    "provider": {
      "type": "aws",
      "policyDocument": {
        "Version": "2012-10-17",
        "Statement": {
          "Effect": "Allow",
          "Action": "string",
          "Resource": "*"
        }
      }
    }
  }
}
```

#### Example Response

 Data about the newly created workload identity.

```json
{
  "id": "example-workload-identity",
  "name": "Example Workload Identity",
  "priority": 10,
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
await apiClient.create.workloadIdentities({
  options: {},
  data: {
    "name": "Example Workload Identity",
    "priority": 10,
    "spec": {
      "restrictions": {
        "projects": {
          "enabled": false
        },
        "tags": {
          "enabled": false,
          "matchCondition": "or"
        }
      },
      "providerLinkId": "string",
      "roleMode": "managed",
      "provider": {
        "type": "aws",
        "policyDocument": {
          "Version": "2012-10-17",
          "Statement": {
            "Effect": "Allow",
            "Action": "string",
            "Resource": "*"
          }
        }
      }
    }
  }
});
```

#### Example Response

 Data about the newly created workload identity.

```json
{
  "data": {
    "id": "example-workload-identity",
    "name": "Example Workload Identity",
    "priority": 10,
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
