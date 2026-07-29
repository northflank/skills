# List workload identities

Source: https://northflank.com/docs/v1/api/team/integrations/list-workload-identities.md

Lists the workload identities saved to this account.

Required permission: Account > Cloud > WorkloadIdentities > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `workloadIdentities`: [array of] {object}
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
                 - `Action`: (multiple options) (string) | [array of] (string)
                 - `Resource`: (multiple options) (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
                 - `Condition`: {object} | [array of] {object}
                   - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
                   - `Effect`: (string) (required) (enum: Allow, Deny)
                   - `Action`: (multiple options) (string) | [array of] (string)
                   - `Resource`: (multiple options) (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
                   - `Condition`: {object}
           - `roleName`: (string) The name for the AWS IAM role to create. If not specified, a name is generated automatically. (pattern: ^[\w+=,.@\-]{1,64}$)
           - `rolePath`: (string) The path for the AWS IAM role to create. (pattern: ^\/?[\w+=,.@\-]+(?:\/[\w+=,.@\-]+)*\/?$)
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
       - `status`: (string) (required) The current install status of the workload identity. (enum: unapplied, outdated, installing, error, applied, deleting)
       - `updatedAt`: (string) time of update (format: date-time)
       - `errors`: [array of] (string)
     - `updatedAt`: (string) time of update (format: date-time)
     - `createdAt`: (string) time of creation (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/workload-identities

GET /v1/teams/{teamId}/workload-identities

#### Example Response

200 OK: A list of workload identities saved to this account.

```json
{
  "data": {
    "workloadIdentities": [
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
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list workload-identities

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of workload identities saved to this account.

```json
{
  "workloadIdentities": [
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
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.workloadIdentities({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of workload identities saved to this account.

```json
{
  "data": {
    "workloadIdentities": [
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
