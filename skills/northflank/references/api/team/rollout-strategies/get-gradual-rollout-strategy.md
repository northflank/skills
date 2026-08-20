# Get gradual rollout strategy

Source: https://northflank.com/docs/v1/api/team/rollout-strategies/get-gradual-rollout-strategy.md

Gets details of the given gradual rollout strategy.

Required permission: Account > Platform > GradualRollouts > Read

**Path parameters:**

{object}
- `gradualRolloutStrategyId`: (string) (required) ID of the gradual rollout strategy

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the gradual rollout strategy
  - `name`: (string) (required) Name of the gradual rollout strategy
  - `type`: (string) (required) Type of the gradual rollout strategy (enum: canary)
  - `options`: {object}
    - `triggers`: {object}
      - `releaseFromTemplate`: (boolean)
      - `releaseFromReleaseFlow`: (boolean)
      - `releaseFromCD`: (boolean)
      - `releaseFromUI`: (boolean)
      - `releaseFromApi`: (boolean)
    - `blockDeploymentOnActiveRollout`: (boolean)
  - `details`: {object}
    - `canaryStrategy`: (string) (required) (enum: percentage, header)
    - `config`: (multiple options) {object}
        - `canaryPercentage`: (integer) (required)
        - `stablePercentage`: (integer) (required) | {object}
        - `stableHeader`: {object}
          - `headerName`: (string) (required) (min length: 1)
          - `headerValue`: (string) (required) (min length: 1)
        - `canaryHeader`: {object}
          - `headerName`: (string) (required) (min length: 1)
          - `headerValue`: (string) (required) (min length: 1)

### API reference

GET /v1/gradual-rollout-strategies/{gradualRolloutStrategyId}

GET /v1/teams/{teamId}/gradual-rollout-strategies/{gradualRolloutStrategyId}

#### Example Response

200 OK: Details about the gradual rollout strategy.

```json
{
  "data": {
    "id": "example-identifier",
    "name": "example-name",
    "type": "canary"
  }
}
```

### CLI reference

$ northflank get gradual-rollout-strategy

Options:

- `--gradualRolloutStrategyId <gradualRolloutStrategyId>`: ID of the gradual rollout strategy

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the gradual rollout strategy.

```json
{
  "id": "example-identifier",
  "name": "example-name",
  "type": "canary"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.gradualRolloutStrategy({
  parameters: {
    "gradualRolloutStrategyId": "example-gradual-rollout-strategy"
  }
});
```

#### Example Response

 Details about the gradual rollout strategy.

```json
{
  "data": {
    "id": "example-identifier",
    "name": "example-name",
    "type": "canary"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
