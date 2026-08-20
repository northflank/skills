# Delete team

Source: https://northflank.com/docs/v1/api/org/teams/delete-team.md

Deletes a team belonging to the authenticated org.

Required permission: Organisation > Team > General > Delete

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/teams/{teamId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

#### Example Response

409 Conflict: The team couldn't be deleted as it has dependencies that have not been deleted.

### CLI reference

$ northflank delete team

Options:

- `--teamId <teamId>`: ID of the team

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
await apiClient.delete.team({
  parameters: {
    "teamId": "my-team"
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
