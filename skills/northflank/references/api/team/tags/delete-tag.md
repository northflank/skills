# Delete tag

Source: https://northflank.com/docs/v1/api/team/tags/delete-tag.md

Delete a resource tag.

Required permission: Account > Platform > Tags > Delete

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

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.delete.tag(
    resource_tag_id="example-tag",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
