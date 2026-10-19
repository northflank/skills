# Trigger global secret dependents

Source: https://northflank.com/docs/v1/api/team/secrets/trigger-global-secret-dependents.md

Runs the templates configured under the global secret’s dependents (when enabled).

Required permission: Account > Templates > General > Run

**Path parameters:**

{object}
- `secretId`: (string) (required) ID of the secret

**Query parameters:**

{object}
- `idempotencyKey`: (string) Deduplicates dependent template runs when the same request is retried. (max length: 128)

**Response body:**

{object}
- `data`: {object}
  - `batchId`: (string) (required) (max length: 128)
  - `accepted`: (integer) (required)
  - `succeeded`: (integer) (required)
  - `failed`: (integer) (required)
  - `skipped`: (integer) (required)
  - `deduplicated`: (integer) (required)
  - `items`: [array of] {object}
     - `templateInternalId`: (string) (required) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `status`: (string) (required) (enum: succeeded, failed, skipped, deduplicated)
     - `templateRunId`: (string)

### API reference

POST /v1/secrets/{secretId}/trigger-dependents

POST /v1/teams/{teamId}/secrets/{secretId}/trigger-dependents

#### Example Response

200 OK: The result of triggering the configured dependent templates.

```json
undefined
```

### CLI reference

$ northflank trigger global-secret dependents

Options:

- `--secretId <secretId>`: ID of the secret

- `--idempotencyKey <idempotencyKey>`: Deduplicates dependent template runs when the same request is retried.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The result of triggering the configured dependent templates.

```json
undefined
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.trigger.globalSecret.dependents({
  parameters: {
    "secretId": "example-secret"
  }
});
```

#### Example Response

 The result of triggering the configured dependent templates.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.trigger.global_secret.dependents(
    secret_id="example-secret",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "batchId": "string",
  "accepted": 0,
  "succeeded": 0,
  "failed": 0,
  "skipped": 0,
  "deduplicated": 0,
  "items": []
}
```
