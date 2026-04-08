# Remove team member

Source: https://northflank.com/docs/v1/api/team/team-members/remove-team-member.md

Removes a member from a team.

Required permission: Account > Admin > Members > Manage

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team
- `memberId`: (string) (required) ID of the team member (user ID)

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/teams/{teamId}/members/{memberId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete team-member

Options:

- `--teamId <teamId>`: ID of the team

- `--memberId <memberId>`: ID of the team member (user ID)

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
await apiClient.delete.teamMember({
  parameters: {
    "teamId": "my-team",
    "memberId": "abc123def456abc123def456"
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
