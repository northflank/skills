# Put security policy

Source: https://northflank.com/docs/v1/api/org/security-policies/put-security-policy.md

Creates or replaces a policy identified by its name-derived ID. Requires both create and update permissions, including when creating. Supply the complete spec and all authentication values. Omitted optional configuration is reset; deleting policies cannot be replaced. Organization warning acknowledgements contain only code, winningDefaultPolicyId and shadowedEnforcedPolicyIds from current 409 warnings.

Required permission: Account > Networking > SecurityPolicies > Create

**Request body:**

(multiple options) {object}
 - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
 - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
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
         - `reason`: (string) (max length: 500) | {object}
 - `name`: (string) (required) (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
 - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
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
 - `warningAcknowledgements`: [array of] {object}
    - `code`: (string) (required) (enum: defaultOverrodeEnforced)
    - `winningDefaultPolicyId`: (string) (required)
    - `shadowedEnforcedPolicyIds`: [array of] (required) (string)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
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

### API reference

PUT /v1/security-policies

PUT /v1/teams/{teamId}/security-policies

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"spec":{"securityPolicies":{"orPolicies":{"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}},"enabled":false,"priority":0,"paths":[{"path":"string","matchMode":"exact"}],"accessMode":"protected","targets":{"projects":{"mode":"all","ids":[]},"workloads":{"mode":"all","items":[]},"tags":{"enabled":false,"items":[],"matchCondition":"or"}},"exclusions":{"projects":[],"workloads":[]}},"name":"string"}' \
  "https://api.northflank.com/v1/security-policies"
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
  },
  "name": "string"
}

const response = await fetch('https://api.northflank.com/v1/security-policies', {
  method: 'PUT',
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

url = "https://api.northflank.com/v1/security-policies"

payload = "{\"spec\":{\"securityPolicies\":{\"orPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]},\"requiredPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]}},\"enabled\":false,\"priority\":0,\"paths\":[{\"path\":\"string\",\"matchMode\":\"exact\"}],\"accessMode\":\"protected\",\"targets\":{\"projects\":{\"mode\":\"all\",\"ids\":[]},\"workloads\":{\"mode\":\"all\",\"items\":[]},\"tags\":{\"enabled\":false,\"items\":[],\"matchCondition\":\"or\"}},\"exclusions\":{\"projects\":[],\"workloads\":[]}},\"name\":\"string\"}".encode("utf-8")
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, data = payload)

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
  url := "https://api.northflank.com/v1/security-policies"

  var jsonStr = []byte("{\"spec\":{\"securityPolicies\":{\"orPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]},\"requiredPolicies\":{\"headers\":[{\"regexMode\":false,\"name\":\"headerName\",\"value\":\"headerValue\"}]}},\"enabled\":false,\"priority\":0,\"paths\":[{\"path\":\"string\",\"matchMode\":\"exact\"}],\"accessMode\":\"protected\",\"targets\":{\"projects\":{\"mode\":\"all\",\"ids\":[]},\"workloads\":{\"mode\":\"all\",\"items\":[]},\"tags\":{\"enabled\":false,\"items\":[],\"matchCondition\":\"or\"}},\"exclusions\":{\"projects\":[],\"workloads\":[]}},\"name\":\"string\"}")
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
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

200 OK: The created or replaced policy with authentication values redacted.

```json
{
  "data": {
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
}
```

### CLI reference

$ northflank put security-policy

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
  },
  "name": "string"
}
```

#### Example Response

 The created or replaced policy with authentication values redacted.

```json
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
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.put.securityPolicy({
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
    },
    "name": "string"
  }
});
```

#### Example Response

 The created or replaced policy with authentication values redacted.

```json
{
  "data": {
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
