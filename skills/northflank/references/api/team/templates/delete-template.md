# Delete template

Source: https://northflank.com/docs/v1/api/team/templates/delete-template.md

Delete a template

Required permission: Account > Templates > General > Delete

**Path parameters:**

{object}
- `templateId`: (string) (required) ID of the template

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/templates/{templateId}

DELETE /v1/teams/{teamId}/templates/{templateId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete template

Options:

- `--templateId <templateId>`: ID of the template

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
await apiClient.delete.template({
  parameters: {
    "templateId": "example-template"
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
