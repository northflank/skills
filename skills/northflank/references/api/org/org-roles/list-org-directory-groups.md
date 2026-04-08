# List org directory groups

Source: https://northflank.com/docs/v1/api/org/org-roles/list-org-directory-groups.md

Lists the Directory Sync directory groups for the authenticated org.

Required permission: Organisation > Admin > Roles > Read

**Response body:**

{object}
- `data`: {object}
  - `directoryGroups`: [array of] {object}
     - `id`: (string) (required) ID of the directory group.
     - `name`: (string) (required) Display name of the directory group.
     - `idpId`: (string) (required) ID of the linked group from the Identity Provider (IdP).
     - `createdAt`: (string) (required) (format: date-time)
     - `updatedAt`: (string) (required) (format: date-time)

### API reference

GET /v1/directory-groups

#### Example Response

200 OK: A list of directory groups for the org.

```json
{
  "data": {
    "directoryGroups": [
      {
        "id": "directory_group_1234567890ABCDEFGHIJKLMNOP"
      }
    ]
  }
}
```

### CLI reference

$ northflank get org-directory-groups

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 A list of directory groups for the org.

```json
{
  "directoryGroups": [
    {
      "id": "directory_group_1234567890ABCDEFGHIJKLMNOP"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.orgDirectoryGroups({});
```

#### Example Response

 A list of directory groups for the org.

```json
{
  "data": {
    "directoryGroups": [
      {
        "id": "directory_group_1234567890ABCDEFGHIJKLMNOP"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
