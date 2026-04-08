# Delete gradual rollout strategy

Source: https://northflank.com/docs/v1/api/team/rollout-strategies/delete-gradual-rollout-strategy.md

Deletes a gradual rollout strategy.

Required permission: Account > GradualRollouts > General > Delete

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
