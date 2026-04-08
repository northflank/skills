# Delete org role

Source: https://northflank.com/docs/v1/api/org/org-roles/delete-org-role.md

Deletes a platform role from the authenticated org.

Required permission: Organisation > Admin > Roles > Manage

**Path parameters:**

{object}
- `roleId`: (string) (required) ID of the org role

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/org-roles/{roleId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete org-role

Options:

- `--roleId <roleId>`: ID of the org role

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
await apiClient.delete.orgRole({
  parameters: {
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
