# List container snapshots

Source: https://northflank.com/docs/v1/api/team/container-snapshots/list-container-snapshots.md

Gets container snapshots belonging to the team.

Required permission: Account > Platform > ContainerSnapshots > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The snapshot UUID cursor returned from the previous page.
- `projectId`: (string) Filter snapshots by source project ID.
- `serviceId`: (string) Filter snapshots by source service ID.
- `state`: (string) Filter snapshots by state. (enum: scheduled, accepted, running, succeeded, failed, cancelled)
- `trigger`: (string) Filter snapshots by trigger. (enum: manual, containerTermination)

**Response body:**

{object}
- `data`: {object}
  - `containerSnapshots`: [array of] {object}
     - `id`: (string) (required) (format: uuid)
     - `trigger`: (string) (required) (enum: manual, containerTermination)
     - `state`: (string) (required) (enum: scheduled, accepted, running, succeeded, failed, cancelled)
     - `source`: {object}
       - `projectId`: (string) (required)
       - `nfObject`: {object}
         - `id`: (string) (required)
         - `type`: (string) (required) (enum: job, service, harness, addon, volume, opentofu-job, llm-model-deployment, external-addon)
     - `target`: {object}
       - `podName`: (string) (required)
     - `compatibility`: {object}
       - `runtime`: (string) (required) (enum: kata)
       - `architecture`: (string) (required) (enum: x86, arm)
       - `baseImageDigest`: (string) (pattern: ^sha256:[0-9a-f]{64}$)
     - `parentSnapshotId`: (string) (format: uuid)
     - `inUse`: (boolean) (required)
     - `result`: {object}
       - `sizeBytes`: (integer) (required)
     - `error`: {object}
       - `code`: (string) (required)
       - `message`: (string) (required)
       - `retryable`: (boolean) (required)
     - `requestedAt`: (string) (format: date-time)
     - `deadline`: (string) (format: date-time)
     - `lastTransitionTime`: (string) (required) (format: date-time)
     - `startedAt`: (string) (format: date-time)
     - `completedAt`: (string) (format: date-time)
     - `createdAt`: (string) (required) (format: date-time)
     - `updatedAt`: (string) (required) (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/container-snapshots

GET /v1/teams/{teamId}/container-snapshots

#### Example Response

200 OK: A list of container snapshots.

```json
{
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list container-snapshots

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The snapshot UUID cursor returned from the previous page.

- `--projectId <projectId>`: Filter snapshots by source project ID.

- `--serviceId <serviceId>`: Filter snapshots by source service ID.

- `--state <state>`: Filter snapshots by state.

- `--trigger <trigger>`: Filter snapshots by trigger.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of container snapshots.

```json
undefined
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.containerSnapshots({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of container snapshots.

```json
{
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
