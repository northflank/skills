# Get container snapshot

Source: https://northflank.com/docs/v1/api/team/container-snapshots/get-container-snapshot.md

Gets a container snapshot.

Required permission: Account > Platform > ContainerSnapshots > Read

**Path parameters:**

{object}
- `snapshotId`: (string) (required) Container snapshot UUID

**Response body:**

{object}
- `data`: {object}
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

### API reference

GET /v1/container-snapshots/{snapshotId}

GET /v1/teams/{teamId}/container-snapshots/{snapshotId}

#### Example Response

200 OK: Container snapshot details.

```json
undefined
```

### CLI reference

$ northflank get container-snapshot

Options:

- `--snapshotId <snapshotId>`: Container snapshot UUID

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Container snapshot details.

```json
undefined
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.containerSnapshot({
  parameters: {}
});
```

#### Example Response

 Container snapshot details.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
