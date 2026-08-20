# Delete gradual rollout strategy

Source: https://northflank.com/docs/v1/api/team/rollout-strategies/delete-gradual-rollout-strategy.md

Deletes a gradual rollout strategy. Any services still using it are detached first, which redeploys them without the rollout. Because that redeploys services, this also requires service update permission. Fails if a rollout is in progress on any of those services.

Required permission: Account > Platform > GradualRollouts > Delete

**Path parameters:**

{object}
- `gradualRolloutStrategyId`: (string) (required) ID of the gradual rollout strategy

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/gradual-rollout-strategies/{gradualRolloutStrategyId}

DELETE /v1/teams/{teamId}/gradual-rollout-strategies/{gradualRolloutStrategyId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

403 Forbidden: The caller does not have permission to update services.

#### Example Response

409 Conflict: A rollout is in progress on one or more services using this strategy.

### CLI reference

$ northflank delete gradual-rollout-strategy

Options:

- `--gradualRolloutStrategyId <gradualRolloutStrategyId>`: ID of the gradual rollout strategy

- `--verbose `: Verbose output

- `--quiet `: No console output

- `--force `: Don't ask for confirmation

- `-o --output <format>`: Output formatting

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.delete.gradualRolloutStrategy({
  parameters: {
    "gradualRolloutStrategyId": "example-gradual-rollout-strategy"
  }
});
```

#### Example Response

 The operation was performed successfully.

```json
{
  "data": {},
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
