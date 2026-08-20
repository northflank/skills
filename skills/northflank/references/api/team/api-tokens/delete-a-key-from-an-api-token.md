# Delete a key from an API token

Source: https://northflank.com/docs/v1/api/team/api-tokens/delete-a-key-from-an-api-token.md

Removes a key from an API token.

Required permission: Account > Admin > ApiTokens > Update

**Path parameters:**

{object}
- `tokenId`: (string) (required) ID of the API token
- `keyId`: (string) (required) UUID of the API token key

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/tokens/{tokenId}/keys/{keyId}

DELETE /v1/teams/{teamId}/tokens/{tokenId}/keys/{keyId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete api-token-key

Options:

- `--tokenId <tokenId>`: ID of the API token

- `--keyId <keyId>`: UUID of the API token key

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
await apiClient.delete.apiTokenKey({
  parameters: {
    "tokenId": "my-api-token",
    "keyId": "550e8400-e29b-41d4-a716-446655440000"
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
