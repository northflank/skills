# Delete SSH identity

Source: https://northflank.com/docs/v1/api/team/integrations/delete-ssh-identity.md

Deletes an SSH identity.

Required permission: Account > Platform > Ssh > Delete

**Path parameters:**

{object}
- `identityId`: (string) (required) ID of the SSH identity

**Response body:**

{object}
- `data`: {object}

### API reference

DELETE /v1/integrations/ssh-identities/{identityId}

DELETE /v1/teams/{teamId}/integrations/ssh-identities/{identityId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete ssh-identities

Options:

- `--identityId <identityId>`: ID of the SSH identity

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
await apiClient.delete.sshIdentities({
  parameters: {
    "identityId": "example-ssh-identity"
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

response = client.delete.ssh_identities(
    identity_id="example-ssh-identity",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
