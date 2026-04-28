# Remove member from org role

Source: https://northflank.com/docs/v1/api/org/org-roles/remove-member-from-org-role.md

Removes a user from a platform role in the authenticated org.

Required permission: Organisation > Admin > Roles > Manage

**Path parameters:**

{object}
- `roleId`: (string) (required) ID of the org role
- `memberId`: (string) (required) ID of the org member.

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/org-roles/{roleId}/members/{memberId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete org-role-member

Options:

- `--roleId <roleId>`: ID of the org role

- `--memberId <memberId>`: ID of the org member.

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
await apiClient.delete.orgRoleMember({
  parameters: {
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
