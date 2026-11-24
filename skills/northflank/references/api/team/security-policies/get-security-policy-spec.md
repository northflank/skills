# Get security policy spec

Source: https://northflank.com/docs/v1/api/team/security-policies/get-security-policy-spec.md

Gets editable name, description and complete spec, including Basic Auth passwords and authentication header values. Requires readSpec permission.

Required permission: Account > Networking > SecurityPolicies > Read Spec

**Path parameters:**

{object}
- `securityPolicyId`: (string) (required) ID of the security policy

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
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
             - `addresses`: [array of] (required) (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$)
             - `action`: (string) (required) (enum: ALLOW, DENY)
         - `headers`: [array of] List of header authentication settings. Every header must be present and match the expected value, either exactly or as a regular expression when regexMode is set. (multiple options) {object} Matches the header value as an exact string.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required) | {object} Matches the header value as a regular expression. Only available when enabled for your account.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required)
         - `credentials`: [array of] {object}
             - `username`: (string) (required) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
             - `password`: (string) (required)
             - `type`: (string) (required) (enum: basic-auth)
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
             - `addresses`: [array of] (required) (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$)
             - `action`: (string) (required) (enum: ALLOW, DENY)
         - `headers`: [array of] List of header authentication settings. Every header must be present and match the expected value, either exactly or as a regular expression when regexMode is set. (multiple options) {object} Matches the header value as an exact string.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required) | {object} Matches the header value as a regular expression. Only available when enabled for your account.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required)
         - `credentials`: [array of] {object}
             - `username`: (string) (required) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
             - `password`: (string) (required)
             - `type`: (string) (required) (enum: basic-auth)
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
             - `addresses`: [array of] (required) (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$)
             - `action`: (string) (required) (enum: ALLOW, DENY)
         - `headers`: [array of] List of header authentication settings. Every header must be present and match the expected value, either exactly or as a regular expression when regexMode is set. (multiple options) {object} Matches the header value as an exact string.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required) | {object} Matches the header value as a regular expression. Only available when enabled for your account.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required)
         - `credentials`: [array of] {object}
             - `username`: (string) (required) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
             - `password`: (string) (required)
             - `type`: (string) (required) (enum: basic-auth)
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
             - `addresses`: [array of] (required) (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$)
             - `action`: (string) (required) (enum: ALLOW, DENY)
         - `headers`: [array of] List of header authentication settings. Every header must be present and match the expected value, either exactly or as a regular expression when regexMode is set. (multiple options) {object} Matches the header value as an exact string.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required) | {object} Matches the header value as a regular expression. Only available when enabled for your account.
               - `regexMode`: (boolean)
               - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
               - `value`: (string) (required)
         - `credentials`: [array of] {object}
             - `username`: (string) (required) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
             - `password`: (string) (required)
             - `type`: (string) (required) (enum: basic-auth)
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

### API reference

GET /v1/security-policies/{securityPolicyId}/spec

GET /v1/teams/{teamId}/security-policies/{securityPolicyId}/spec

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/security-policies/{securityPolicyId}/spec"
```

```python
import requests

url = "https://api.northflank.com/v1/security-policies/{securityPolicyId}/spec"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Editable configuration including authentication values.

```json
{
  "data": {
    "spec": {
      "securityPolicies": {
        "orPolicies": {
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ]
        },
        "requiredPolicies": {
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ]
        }
      },
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
    "name": "string"
  }
}
```

### CLI reference

$ northflank get security-policy spec

Options:

- `--securityPolicyId <securityPolicyId>`: ID of the security policy

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Editable configuration including authentication values.

```json
{
  "spec": {
    "securityPolicies": {
      "orPolicies": {
        "headers": [
          {
            "regexMode": false,
            "name": "headerName",
            "value": "headerValue"
          }
        ]
      },
      "requiredPolicies": {
        "headers": [
          {
            "regexMode": false,
            "name": "headerName",
            "value": "headerValue"
          }
        ]
      }
    },
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
  "name": "string"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.securityPolicy.spec({
  parameters: {
    "securityPolicyId": "internal-access"
  }
});
```

#### Example Response

 Editable configuration including authentication values.

```json
{
  "data": {
    "spec": {
      "securityPolicies": {
        "orPolicies": {
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ]
        },
        "requiredPolicies": {
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ]
        }
      },
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
    "name": "string"
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
