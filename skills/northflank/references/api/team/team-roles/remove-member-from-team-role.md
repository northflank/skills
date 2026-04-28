# Remove member from team role

Source: https://northflank.com/docs/v1/api/team/team-roles/remove-member-from-team-role.md

Removes a user from a platform role in a team.

Required permission: Account > Admin > Roles > Manage

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team
- `roleId`: (string) (required) ID of the team role
- `memberId`: (string) (required) ID of the team member.

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/teams/{teamId}/roles/{roleId}/members/{memberId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete team-role-member

Options:

- `--teamId <teamId>`: ID of the team

- `--roleId <roleId>`: ID of the team role

- `--memberId <memberId>`: ID of the team member.

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
await apiClient.delete.teamRoleMember({
  parameters: {
    "teamId": "my-team",
    "roleId": "developer",
    "memberId": "john-doe"
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
