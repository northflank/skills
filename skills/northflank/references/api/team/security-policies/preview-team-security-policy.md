# Preview team security policy

Source: https://northflank.com/docs/v1/api/team/security-policies/preview-team-security-policy.md

Evaluates a team policy as enabled without saving it. Organization REST preview is not available; organization tokens must select a team through the team-scoped path. Service details are limited to readable projects. Aggregate counts may include inaccessible services; outcome counts sample at most 2,000 matches and compilationErrorCount describes the returned page. Body page/perPage paginate services; pagination.count is the total visible match count. Authentication values are redacted. Existing policies may retain passwords using empty strings.

Required permission: Account > Networking > SecurityPolicies > Read

**Request body:**

{object}
- `policyInternalId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `spec`: {object} (required)
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
        - `reason`: (string) (max length: 500)
- `page`: (integer)
- `perPage`: (integer)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `matchedCount`: (integer) (required)
  - `inaccessibleCount`: (integer) (required)
  - `excludedCount`: (integer) (required)
  - `unsupportedCount`: (integer) (required)
  - `compilationErrorCount`: (integer) (required)
  - `wouldApplyCount`: (integer) (required)
  - `shadowedCount`: (integer) (required)
  - `conflictCount`: (integer) (required)
  - `outcomesSampled`: (boolean) (required)
  - `services`: [array of] (required) {object}
     - `projectId`: (string) (required) (min length: 24) (max length: 24)
     - `projectInternalId`: (string) (required)
     - `serviceId`: (string) (required) (min length: 24) (max length: 24)
     - `serviceInternalId`: (string) (required)
     - `serviceType`: (string) (required) (enum: combined, deployment)
     - `result`: (string) (required) (enum: wins, shadowed, conflict)
     - `winningPathCount`: (integer) (required)
     - `shadowedPathCount`: (integer) (required)
     - `noPublicHttpPort`: (boolean) (required)
     - `compilationError`: (boolean) (required)
     - `conflict`: {object}
       - `priority`: (integer) (required)
       - `policyInternalIds`: [array of] (required) (string)
     - `compilationIssues`: [array of] {object}
         - `portName`: (string) (required)
         - `paths`: [array of] (required) {object}
             - `path`: (string) (required)
             - `routingMode`: (string) (required) (enum: exact, prefix, regex)
             - `priority`: (integer)
         - `reason`: (string) (required) (enum: compiledPathEntryLimit, effectiveConfigurationTooLarge, priorityTie)
         - `policyInternalIds`: [array of] (string)
         - `policyIds`: [array of] (string) (min length: 24) (max length: 24)
     - `usage`: [array of] {object}
         - `portName`: (string) (required)
         - `compiledPathEntries`: (integer) (required)
         - `encodedBytes`: (integer) (required)
     - `teamCandidates`: [array of] (required) {object}
         - `policyId`: (string) (required) (min length: 24) (max length: 24)
         - `policyInternalId`: (string) (required)
         - `paths`: [array of] (required) {object}
             - `path`: (string) (required) (min length: 1)
             - `matchMode`: (string) (required) (enum: exact, pathPrefix)
         - `accessMode`: (string) (required) (enum: protected, unprotected)
         - `priority`: (integer) (required)
     - `organizationCandidates`: [array of] (required) {object}
         - `policyId`: (string) (required) (min length: 24) (max length: 24)
         - `policyInternalId`: (string) (required)
         - `paths`: [array of] (required) {object}
             - `path`: (string) (required) (min length: 1)
             - `matchMode`: (string) (required) (enum: exact, pathPrefix)
         - `accessMode`: (string) (required) (enum: protected, unprotected)
         - `organizationPriority`: (integer) (required)
         - `inheritanceMode`: (string) (required) (enum: enforced, default)
     - `effectivePorts`: [array of] (required) {object}
         - `portName`: (string) (required)
         - `pathRegions`: [array of] (required) {object}
             - `paths`: [array of] (required) {object}
                 - `path`: (string) (required)
                 - `routingMode`: (string) (required) (enum: exact, prefix, regex)
             - `accessMode`: (string) (required) (enum: protected, unprotected)
             - `source`: {object}
               - `sourceType`: (string) (required) (enum: organization, team, service, system)
               - `sourceEntityId`: (string) (required) (min length: 24) (max length: 24)
               - `policyId`: (string) (min length: 24) (max length: 24)
               - `policyInternalId`: (string)
             - `shadowed`: [array of] {object}
                 - `sourceType`: (string) (required) (enum: organization, team, service, system)
                 - `sourceEntityId`: (string) (required) (min length: 24) (max length: 24)
                 - `policyId`: (string) (min length: 24) (max length: 24)
                 - `policyInternalId`: (string)
                 - `reason`: (string) (required) (enum: lowerPriority, organizationEnforced, teamReplacedOrganizationDefault, defaultOverrodeEnforced, excluded, serviceFallbackShadowed, protectionReduction, compilerFailClosed)
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
     - `protectionReductions`: [array of] (required) {object}
         - `portName`: (string) (required)
         - `paths`: [array of] (required) {object}
             - `path`: (string) (required)
             - `routingMode`: (string) (required) (enum: exact, prefix, regex)
         - `source`: {object}
           - `sourceType`: (string) (required) (enum: organization, team, service, system)
           - `sourceEntityId`: (string) (required) (min length: 24) (max length: 24)
           - `policyId`: (string) (min length: 24) (max length: 24)
           - `policyInternalId`: (string)
  - `pagination`: {object} (required)
    - `page`: (integer) (required)
    - `perPage`: (integer) (required)
    - `count`: (integer) (required)

### API reference

POST /v1/security-policies/preview

POST /v1/teams/{teamId}/security-policies/preview

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"spec":{"securityPolicies":{"orPolicies":{"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}},"enabled":false,"priority":0,"paths":[{"path":"string","matchMode":"exact"}],"accessMode":"protected","targets":{"projects":{"mode":"all","ids":[]},"workloads":{"mode":"all","items":[]},"tags":{"enabled":false,"items":[],"matchCondition":"or"}},"exclusions":{"projects":[],"workloads":[]}}}' \
  "https://api.northflank.com/v1/security-policies/preview"
```

```javascript
const payload = {
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
  }
}

const response = await fetch('https://api.northflank.com/v1/security-policies/preview', {
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

url = "https://api.northflank.com/v1/security-policies/preview"

payload = "{\"spec\":{\"securityPolicies\":{\"orPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]},\"requiredPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]}},\"enabled\":false,\"priority\":0,\"paths\":[{\"path\":\"string\",\"matchMode\":\"exact\"}],\"accessMode\":\"protected\",\"targets\":{\"projects\":{\"mode\":\"all\",\"ids\":[]},\"workloads\":{\"mode\":\"all\",\"items\":[]},\"tags\":{\"enabled\":false,\"items\":[],\"matchCondition\":\"or\"}},\"exclusions\":{\"projects\":[],\"workloads\":[]}}}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, data = payload)

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
  url := "https://api.northflank.com/v1/security-policies/preview"

  var jsonStr = []byte("{\"spec\":{\"securityPolicies\":{\"orPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]},\"requiredPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]}},\"enabled\":false,\"priority\":0,\"paths\":[{\"path\":\"string\",\"matchMode\":\"exact\"}],\"accessMode\":\"protected\",\"targets\":{\"projects\":{\"mode\":\"all\",\"ids\":[]},\"workloads\":{\"mode\":\"all\",\"items\":[]},\"tags\":{\"enabled\":false,\"items\":[],\"matchCondition\":\"or\"}},\"exclusions\":{\"projects\":[],\"workloads\":[]}}}")
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

200 OK: Team policy preview with redacted authentication values.

```json
{
  "data": {
    "matchedCount": 0,
    "inaccessibleCount": 0,
    "excludedCount": 0,
    "unsupportedCount": 0,
    "compilationErrorCount": 0,
    "wouldApplyCount": 0,
    "shadowedCount": 0,
    "conflictCount": 0,
    "outcomesSampled": false,
    "services": [],
    "pagination": {
      "page": 1,
      "perPage": 1,
      "count": 0
    }
  }
}
```

### CLI reference

$ northflank preview security-policy

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

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
  }
}
```

#### Example Response

 Team policy preview with redacted authentication values.

```json
{
  "matchedCount": 0,
  "inaccessibleCount": 0,
  "excludedCount": 0,
  "unsupportedCount": 0,
  "compilationErrorCount": 0,
  "wouldApplyCount": 0,
  "shadowedCount": 0,
  "conflictCount": 0,
  "outcomesSampled": false,
  "services": [],
  "pagination": {
    "page": 1,
    "perPage": 1,
    "count": 0
  }
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.preview.securityPolicy({
  data: {
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
    }
  }
});
```

#### Example Response

 Team policy preview with redacted authentication values.

```json
{
  "data": {
    "matchedCount": 0,
    "inaccessibleCount": 0,
    "excludedCount": 0,
    "unsupportedCount": 0,
    "compilationErrorCount": 0,
    "wouldApplyCount": 0,
    "shadowedCount": 0,
    "conflictCount": 0,
    "outcomesSampled": false,
    "services": [],
    "pagination": {
      "page": 1,
      "perPage": 1,
      "count": 0
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

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
