# Delete tag

Source: https://northflank.com/docs/v1/api/team/tags/delete-tag.md

Delete a resource tag.

Required permission: Account > Tags > General > Delete

**Path parameters:**

{object}
- `resourceTagId`: (string) (required) ID of the tag

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/tags/{resourceTagId}

DELETE /v1/teams/{teamId}/tags/{resourceTagId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete tag

Options:

- `--resourceTagId <resourceTagId>`: ID of the tag

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
await apiClient.delete.tag({
  parameters: {
    "resourceTagId": "example-tag"
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
