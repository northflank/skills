# List security policies

Source: https://northflank.com/docs/v1/api/team/security-policies/list-security-policies.md

Lists policies for the team or organization in creation order. Pagination count is the number of policies on this page. Authentication values are redacted.

Required permission: Account > Networking > SecurityPolicies > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `securityPolicies`: [array of] (required) {object}
     - `id`: (string) (required) (pattern: ^[A-Za-z0-9-]+$)
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
     - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `entityType`: (string) (required) (enum: team, org)
     - `spec`: (multiple options) (required) {object}
         - `enabled`: (boolean) (required)
         - `priority`: (integer) (required)
         - `paths`: [array of] (required) {object}
             - `path`: (string) (required) (min length: 1)
             - `matchMode`: (string) (required) (enum: exact, pathPrefix)
         - `accessMode`: (string) (required) (enum: protected, unprotected)
         - `securityPolicies`: {object}
           - `orPolicies`: {object}
             - `ip`: [array of] {object}
                 - `addresses`: [array of] (required) (string)
                 - `action`: (string) (required) (enum: ALLOW, DENY)
             - `headers`: [array of] {object}
                 - `name`: (string) (required)
                 - `regexMode`: (boolean)
                 - `valueConfigured`: (boolean) (required)
             - `credentials`: [array of] {object}
                 - `username`: (string) (required)
                 - `type`: (string) (required) (enum: basic-auth)
                 - `passwordConfigured`: (boolean) (required)
             - `sso`: {object}
               - `organizationId`: (string) (required)
               - `directoryGroupIds`: [array of] (required) (string)
               - `allowAnyOrgUsers`: (boolean)
               - `validateInternalTraffic`: (boolean)
               - `setCookieOnRootDomain`: (boolean)
               - `noindexRedirect`: (boolean)
               - `allowInternalTrafficViaPublicDns`: (boolean)
           - `requiredPolicies`: {object}
             - `ip`: [array of] {object}
                 - `addresses`: [array of] (required) (string)
                 - `action`: (string) (required) (enum: ALLOW, DENY)
             - `headers`: [array of] {object}
                 - `name`: (string) (required)
                 - `regexMode`: (boolean)
                 - `valueConfigured`: (boolean) (required)
             - `credentials`: [array of] {object}
                 - `username`: (string) (required)
                 - `type`: (string) (required) (enum: basic-auth)
                 - `passwordConfigured`: (boolean) (required)
             - `sso`: {object}
               - `organizationId`: (string) (required)
               - `directoryGroupIds`: [array of] (required) (string)
               - `allowAnyOrgUsers`: (boolean)
               - `validateInternalTraffic`: (boolean)
               - `setCookieOnRootDomain`: (boolean)
               - `noindexRedirect`: (boolean)
               - `allowInternalTrafficViaPublicDns`: (boolean)
         - `targets`: {object} (required)
           - `projects`: {object} (required)
             - `mode`: (string) (required) (enum: all, selected)
             - `ids`: [array of] (required) (string)
           - `workloads`: {object} (required)
             - `mode`: (string) (required) (enum: all, selected)
             - `items`: [array of] (required) {object}
                 - `projectId`: (string) (required)
                 - `serviceId`: (string) (required)
           - `tags`: {object} (required)
             - `enabled`: (boolean) (required)
             - `items`: [array of] (required) (string)
             - `matchCondition`: (string) (required) (enum: or, and)
         - `exclusions`: {object} (required)
           - `projects`: [array of] (required) (string)
           - `workloads`: [array of] (required) {object}
               - `projectId`: (string) (required)
               - `serviceId`: (string) (required)
               - `reason`: (string) (max length: 500) | {object}
         - `enabled`: (boolean) (required)
         - `priority`: (integer) (required)
         - `paths`: [array of] (required) {object}
             - `path`: (string) (required) (min length: 1)
             - `matchMode`: (string) (required) (enum: exact, pathPrefix)
         - `accessMode`: (string) (required) (enum: protected, unprotected)
         - `securityPolicies`: {object}
           - `orPolicies`: {object}
             - `ip`: [array of] {object}
                 - `addresses`: [array of] (required) (string)
                 - `action`: (string) (required) (enum: ALLOW, DENY)
             - `headers`: [array of] {object}
                 - `name`: (string) (required)
                 - `regexMode`: (boolean)
                 - `valueConfigured`: (boolean) (required)
             - `credentials`: [array of] {object}
                 - `username`: (string) (required)
                 - `type`: (string) (required) (enum: basic-auth)
                 - `passwordConfigured`: (boolean) (required)
             - `sso`: {object}
               - `organizationId`: (string) (required)
               - `directoryGroupIds`: [array of] (required) (string)
               - `allowAnyOrgUsers`: (boolean)
               - `validateInternalTraffic`: (boolean)
               - `setCookieOnRootDomain`: (boolean)
               - `noindexRedirect`: (boolean)
               - `allowInternalTrafficViaPublicDns`: (boolean)
           - `requiredPolicies`: {object}
             - `ip`: [array of] {object}
                 - `addresses`: [array of] (required) (string)
                 - `action`: (string) (required) (enum: ALLOW, DENY)
             - `headers`: [array of] {object}
                 - `name`: (string) (required)
                 - `regexMode`: (boolean)
                 - `valueConfigured`: (boolean) (required)
             - `credentials`: [array of] {object}
                 - `username`: (string) (required)
                 - `type`: (string) (required) (enum: basic-auth)
                 - `passwordConfigured`: (boolean) (required)
             - `sso`: {object}
               - `organizationId`: (string) (required)
               - `directoryGroupIds`: [array of] (required) (string)
               - `allowAnyOrgUsers`: (boolean)
               - `validateInternalTraffic`: (boolean)
               - `setCookieOnRootDomain`: (boolean)
               - `noindexRedirect`: (boolean)
               - `allowInternalTrafficViaPublicDns`: (boolean)
         - `targets`: {object} (required)
           - `teams`: {object} (required)
             - `mode`: (string) (required) (enum: allManaged, selected)
             - `ids`: [array of] (required) (string)
           - `projects`: {object} (required)
             - `mode`: (string) (required) (enum: all, selected)
             - `items`: [array of] (required) {object}
                 - `teamId`: (string) (required)
                 - `projectId`: (string) (required)
           - `tags`: {object} (required)
             - `enabled`: (boolean) (required)
             - `items`: [array of] (required) (string)
             - `matchCondition`: (string) (required) (enum: or, and)
         - `exclusions`: {object} (required)
           - `teams`: [array of] (required) (string)
           - `projects`: [array of] (required) {object}
               - `teamId`: (string) (required)
               - `projectId`: (string) (required)
         - `inheritanceMode`: (string) (required) (enum: enforced, default)
     - `lifecycleStatus`: (string) (required) (enum: created, pending, error, deleting, deletion_error)
     - `createdAt`: (string) (required) (format: date-time)
     - `updatedAt`: (string) (required) (format: date-time)
     - `state`: {object}
       - `lastSyncAttemptAt`: (string) (format: date-time)
       - `lastSyncedAt`: (string) (format: date-time)
       - `counts`: {object}
         - `matched`: (integer) (required)
         - `excluded`: (integer) (required)
         - `unsupported`: (integer) (required)
         - `pending`: (integer) (required)
         - `inSync`: (integer) (required)
         - `error`: (integer) (required)
       - `warnings`: [array of] {object}
           - `code`: (string) (required) (enum: defaultOverrodeEnforced)
           - `winningDefaultPolicyId`: (string) (required)
           - `shadowedEnforcedPolicyIds`: [array of] (required) (string)
           - `affectedCount`: (integer) (required)
           - `risk`: (string) (required) (enum: nestedDelegation, broadeningDelegation)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/security-policies

GET /v1/teams/{teamId}/security-policies

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/security-policies?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/security-policies?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A page of security policies.

```json
{
  "data": {
    "securityPolicies": [
      {
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "id": "string",
        "name": "string",
        "entityType": "team",
        "spec": {
          "enabled": false,
          "priority": 0,
          "paths": [
            {
              "path": "string",
              "matchMode": "exact"
            }
          ],
          "accessMode": "protected",
          "targets": {
            "projects": {
              "mode": "all",
              "ids": []
            },
            "workloads": {
              "mode": "all",
              "items": []
            },
            "tags": {
              "enabled": false,
              "items": [],
              "matchCondition": "or"
            }
          },
          "exclusions": {
            "projects": [],
            "workloads": []
          }
        },
        "lifecycleStatus": "created",
        "createdAt": "1970-01-01T00:00:00.000Z",
        "updatedAt": "1970-01-01T00:00:00.000Z"
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

$ northflank list security-policies

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A page of security policies.

```json
{
  "securityPolicies": [
    {
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "id": "string",
      "name": "string",
      "entityType": "team",
      "spec": {
        "enabled": false,
        "priority": 0,
        "paths": [
          {
            "path": "string",
            "matchMode": "exact"
          }
        ],
        "accessMode": "protected",
        "targets": {
          "projects": {
            "mode": "all",
            "ids": []
          },
          "workloads": {
            "mode": "all",
            "items": []
          },
          "tags": {
            "enabled": false,
            "items": [],
            "matchCondition": "or"
          }
        },
        "exclusions": {
          "projects": [],
          "workloads": []
        }
      },
      "lifecycleStatus": "created",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.securityPolicies({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A page of security policies.

```json
{
  "data": {
    "securityPolicies": [
      {
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "id": "string",
        "name": "string",
        "entityType": "team",
        "spec": {
          "enabled": false,
          "priority": 0,
          "paths": [
            {
              "path": "string",
              "matchMode": "exact"
            }
          ],
          "accessMode": "protected",
          "targets": {
            "projects": {
              "mode": "all",
              "ids": []
            },
            "workloads": {
              "mode": "all",
              "items": []
            },
            "tags": {
              "enabled": false,
              "items": [],
              "matchCondition": "or"
            }
          },
          "exclusions": {
            "projects": [],
            "workloads": []
          }
        },
        "lifecycleStatus": "created",
        "createdAt": "1970-01-01T00:00:00.000Z",
        "updatedAt": "1970-01-01T00:00:00.000Z"
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
