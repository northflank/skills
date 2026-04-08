# Delete team role

Source: https://northflank.com/docs/v1/api/team/team-roles/delete-team-role.md

Deletes a platform role from a team.

Required permission: Account > Admin > Roles > Manage

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team
- `roleId`: (string) (required) ID of the team role

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/teams/{teamId}/roles/{roleId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete team-role

Options:

- `--teamId <teamId>`: ID of the team

- `--roleId <roleId>`: ID of the team role

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
await apiClient.delete.teamRole({
  parameters: {
    "teamId": "my-team",
    "roleId": "developer"
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
