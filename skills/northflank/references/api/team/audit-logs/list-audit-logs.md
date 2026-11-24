# List audit logs

Source: https://northflank.com/docs/v1/api/team/audit-logs/list-audit-logs.md

Lists stored audit events for the authorized organization or team. Organization scope includes child team events. Filters use stored identifiers so deleted resources remain queryable. Set `includeSpec` to return decrypted before and after resource specifications when the caller has audit log specification access. Specifications can contain secret values. Cursor pagination supports browsing, not durable export.

Required permission: Account > Admin > AuditLogs > Read

**Query parameters:**

{object}
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)
- `per_page`: (integer) The number of results to return. When `includeSpec` is true, the default and maximum are 20.
- `includeSpec`: (boolean) Include decrypted before and after resource specifications. This can expose secret values and requires audit log specification access.
- `after`: (string) Include events created at or after this ISO-8601 timestamp. (format: date-time)
- `before`: (string) Include events created at or before this ISO-8601 timestamp. (format: date-time)
- `event`: (string) Stored audit event name. Repeat `event` to select up to 50 distinct event names. (min length: 1) (max length: 256)
- `apiTokenUid`: (string) Stored API token UID. (min length: 24) (max length: 24)
- `sourceWorkloadUid`: (string) Stored source workload UID. (min length: 24) (max length: 24)
- `teamUid`: (string) Stored child team UID. This filter is available only for organization scope. (min length: 24) (max length: 24)
- `projectUid`: (string) Stored project UID. (min length: 24) (max length: 24)
- `resourceType`: (string) Stored resource type. (min length: 1) (max length: 256)
- `resourceUid`: (string) Stored resource UID. (min length: 24) (max length: 24)
- `resourceId`: (string) Stored resource ID. This filter requires `resourceType`. (min length: 1) (max length: 256)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `auditLogs`: [array of] (required) Audit events in newest-first cursor order. {object} Public audit log list item.
     - `uid`: (string) (required) Audit event UID. (min length: 24) (max length: 24)
     - `event`: (string) Stored audit event name when available.
     - `createdAt`: (string) (required) Time when the audit event was created. (format: date-time)
     - `updatedAt`: (string) (required) Time when the audit event was last updated. (format: date-time)
     - `operationCompletedAt`: (string) Time when the audited operation completed. (format: date-time)
     - `origin`: (string) Stored audit event origin.
     - `trigger`: (string) Stored audit event trigger.
     - `pending`: (boolean) (required) Whether the audited operation is pending.
     - `success`: (boolean) Whether the audited operation succeeded.
     - `finalizationStatus`: (string) Completeness of audit event finalization. (enum: pending, complete, incomplete)
     - `stateCapture`: {object} Completeness of the stored before and after state.
       - `before`: (string) (enum: pending, complete, incomplete, skipped, notCaptured)
       - `after`: (string) (enum: pending, complete, incomplete, skipped, notCaptured)
     - `caller`: {object} Stored caller identifiers. Values are not resolved from live identity records.
       - `uid`: (string) Stored root caller UID. (min length: 24) (max length: 24)
       - `id`: (string) Stored user-facing caller ID when available.
       - `email`: (string) Stored caller email when available.
       - `apiToken`: {object} Stored API token snapshot for the request.
         - `uid`: (string) (required) Stored API token UID. (min length: 24) (max length: 24)
         - `id`: (string) Stored user-facing API token ID when available.
     - `scope`: {object} (required) Stored scope of the audit event.
       - `entityUid`: (string) Stored entity UID. (min length: 24) (max length: 24)
       - `entityType`: (string) Stored entity type.
       - `organizationUid`: (string) Stored organization UID. (min length: 24) (max length: 24)
       - `projectUid`: (string) Stored project UID. (min length: 24) (max length: 24)
       - `sourceWorkloadUid`: (string) Stored source workload UID. (min length: 24) (max length: 24)
       - `sourceWorkloadType`: (string) Stored source workload type.
     - `resources`: [array of] (required) Deduplicated stored resource references without specifications. {object} Stored resource reference. Resource specifications are not returned.
         - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
         - `id`: (string) Stored resource ID.
         - `type`: (string) Stored resource type.
     - `before`: [array of] Stored resource states before the event. Returned only when `includeSpec` is true. {object} Stored resource state with its decrypted specification when available.
         - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
         - `id`: (string) Stored resource ID.
         - `type`: (string) Stored resource type.
         - `spec`: {object} Stored decrypted resource specification.
         - `specSanitization`: (string) Protection that the audit store applied to the specification. (enum: schema_encrypted, secrets_excluded)
         - `specSanitizationVersion`: (integer) Stored specification protection version.
     - `after`: [array of] Stored resource states after the event. Returned only when `includeSpec` is true. {object} Stored resource state with its decrypted specification when available.
         - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
         - `id`: (string) Stored resource ID.
         - `type`: (string) Stored resource type.
         - `spec`: {object} Stored decrypted resource specification.
         - `specSanitization`: (string) Protection that the audit store applied to the specification. (enum: schema_encrypted, secrets_excluded)
         - `specSanitizationVersion`: (integer) Stored specification protection version.
     - `parentUids`: [array of] (required) Stored parent audit event UIDs. (string) (min length: 24) (max length: 24)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/audit-logs

GET /v1/teams/{teamId}/audit-logs

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/audit-logs?per_page=50"
```

```python
import requests

url = "https://api.northflank.com/v1/audit-logs?per_page=50"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: The list of audit events.

```json
{
  "data": {
    "auditLogs": [
      {
        "resources": [
          {
            "uid": "68f0aa1b9c4e2d7f11a3b402"
          }
        ],
        "before": [
          {
            "uid": "68f0aa1b9c4e2d7f11a3b402"
          }
        ],
        "after": [
          {
            "uid": "68f0aa1b9c4e2d7f11a3b402"
          }
        ],
        "uid": "stringaaaaaaaaaaaaaaaaaa",
        "createdAt": "1970-01-01T00:00:00.000Z",
        "updatedAt": "1970-01-01T00:00:00.000Z",
        "pending": false,
        "scope": {},
        "parentUids": []
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

$ northflank get audit-logs

Options:

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--per_page <per_page>`: The number of results to return. When `includeSpec` is true, the default and maximum are 20.

- `--includeSpec <includeSpec>`: Include decrypted before and after resource specifications. This can expose secret values and requires audit log specification access.

- `--after <after>`: Include events created at or after this ISO-8601 timestamp.

- `--before <before>`: Include events created at or before this ISO-8601 timestamp.

- `--event <event>`: Stored audit event name. Repeat `event` to select up to 50 distinct event names.

- `--apiTokenUid <apiTokenUid>`: Stored API token UID.

- `--sourceWorkloadUid <sourceWorkloadUid>`: Stored source workload UID.

- `--teamUid <teamUid>`: Stored child team UID. This filter is available only for organization scope.

- `--projectUid <projectUid>`: Stored project UID.

- `--resourceType <resourceType>`: Stored resource type.

- `--resourceUid <resourceUid>`: Stored resource UID.

- `--resourceId <resourceId>`: Stored resource ID. This filter requires `resourceType`.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The list of audit events.

```json
{
  "auditLogs": [
    {
      "resources": [
        {
          "uid": "68f0aa1b9c4e2d7f11a3b402"
        }
      ],
      "before": [
        {
          "uid": "68f0aa1b9c4e2d7f11a3b402"
        }
      ],
      "after": [
        {
          "uid": "68f0aa1b9c4e2d7f11a3b402"
        }
      ],
      "uid": "stringaaaaaaaaaaaaaaaaaa",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z",
      "pending": false,
      "scope": {},
      "parentUids": []
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.auditLogs({
  options: {
    "per_page": 50
  }
});
```

#### Example Response

 The list of audit events.

```json
{
  "data": {
    "auditLogs": [
      {
        "resources": [
          {
            "uid": "68f0aa1b9c4e2d7f11a3b402"
          }
        ],
        "before": [
          {
            "uid": "68f0aa1b9c4e2d7f11a3b402"
          }
        ],
        "after": [
          {
            "uid": "68f0aa1b9c4e2d7f11a3b402"
          }
        ],
        "uid": "stringaaaaaaaaaaaaaaaaaa",
        "createdAt": "1970-01-01T00:00:00.000Z",
        "updatedAt": "1970-01-01T00:00:00.000Z",
        "pending": false,
        "scope": {},
        "parentUids": []
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
