# Get workload identity

Source: https://northflank.com/docs/v1/api/team/integrations/get-workload-identity.md

Retrieves a workload identity by ID.

Required permission: Account > Cloud > WorkloadIdentities > Read

**Path parameters:**

{object}
- `workloadIdentityId`: (string) (required) ID of the workload identity

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the workload identity (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `priority`: (integer) The priority used to select a workload identity for each provider.
  - `spec`: (multiple options) {object}
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
       - `workloadTypes`: {object}
         - `enabled`: (boolean) (required)
         - `items`: [array of] (string) (enum: service, job, harness) | {object}
     - `provider`: {object}
       - `type`: (string) (required) (enum: northflank)
       - `scope`: (string) (required) Restrict access to the workload’s project, or use the role’s scope within this team. Role project restrictions always apply. (enum: own-project, role)
       - `roleId`: (string) (required) Team or organisation role granting Northflank API access within this team. (min length: 24) (max length: 24)
     - `restrictions`: {object}
       - `projects`: {object}
         - `enabled`: (boolean) Whether restriction by project should be enabled.
         - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
       - `tags`: {object}
         - `enabled`: (boolean) Whether restriction by tag should be enabled.
         - `items`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
         - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
       - `workloadTypes`: {object}
         - `enabled`: (boolean) (required)
         - `items`: [array of] (string) (enum: service, job, harness)
  - `state`: {object}
    - `status`: (string) (required) The current install status of the workload identity. (enum: unapplied, outdated, installing, updating, error, applied, deleting)
    - `updatedAt`: (string) time of update (format: date-time)
    - `errors`: [array of] (string)
  - `updatedAt`: (string) time of update (format: date-time)
  - `createdAt`: (string) time of creation (format: date-time)

### API reference

GET /v1/workload-identities/{workloadIdentityId}

GET /v1/teams/{teamId}/workload-identities/{workloadIdentityId}

#### Example Response

200 OK: Data about the workload identity.

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

$ northflank get workload-identities

Options:

- `--workloadIdentityId <workloadIdentityId>`: ID of the workload identity

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the workload identity.

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

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.workloadIdentities({
  parameters: {
    "workloadIdentityId": "example-workload-identity"
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.get.workload_identities(
    workload_identity_id="example-workload-identity",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

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
