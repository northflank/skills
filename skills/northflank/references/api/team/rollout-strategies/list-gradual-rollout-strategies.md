# List gradual rollout strategies

Source: https://northflank.com/docs/v1/api/team/rollout-strategies/list-gradual-rollout-strategies.md

Lists the gradual rollout strategies belonging to the team, newest first.

Required permission: Account > Platform > GradualRollouts > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `strategies`: [array of] {object}
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/gradual-rollout-strategies

GET /v1/teams/{teamId}/gradual-rollout-strategies

#### Example Response

200 OK: A list of gradual rollout strategies.

```json
{
  "data": {
    "strategies": [
      {
        "id": "example-identifier",
        "name": "example-name",
        "type": "canary"
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

$ northflank list gradual-rollout-strategies

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of gradual rollout strategies.

```json
{
  "strategies": [
    {
      "id": "example-identifier",
      "name": "example-name",
      "type": "canary"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.gradualRolloutStrategies({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of gradual rollout strategies.

```json
{
  "data": {
    "strategies": [
      {
        "id": "example-identifier",
        "name": "example-name",
        "type": "canary"
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
