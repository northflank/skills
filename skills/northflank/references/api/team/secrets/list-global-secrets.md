# List global secrets

Source: https://northflank.com/docs/v1/api/team/secrets/list-global-secrets.md

Gets a list of global secrets

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `secrets`: [array of] {object}
     - `id`: (string) (required) Identifier for the global secret
     - `name`: (string) (required) Global secret name
     - `description`: (string) A short description of the global secret
     - `type`: (string) (required) The permission type of the global secret. (enum: secret, config)
     - `createdAt`: (string) (required) The time the global secret was created. (format: date-time)
     - `updatedAt`: (string) (required) The time the global secret was last updated. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/secrets

GET /v1/teams/{teamId}/secrets

#### Example Response

200 OK: The list of secrets.

```json
{
  "data": {
    "secrets": [
      {
        "id": "example-secret",
        "name": "Example Secret",
        "description": "This is the global secret description",
        "type": "secret",
        "createdAt": "2020-01-01T12:00:00.000Z",
        "updatedAt": "2020-01-01T12:00:00.000Z"
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

$ northflank list global-secrets

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of secrets.

```json
{
  "secrets": [
    {
      "id": "example-secret",
      "name": "Example Secret",
      "description": "This is the global secret description",
      "type": "secret",
      "createdAt": "2020-01-01T12:00:00.000Z",
      "updatedAt": "2020-01-01T12:00:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.globalSecrets({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 The list of secrets.

```json
{
  "data": {
    "secrets": [
      {
        "id": "example-secret",
        "name": "Example Secret",
        "description": "This is the global secret description",
        "type": "secret",
        "createdAt": "2020-01-01T12:00:00.000Z",
        "updatedAt": "2020-01-01T12:00:00.000Z"
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
