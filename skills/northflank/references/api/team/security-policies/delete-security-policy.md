# Delete security policy

Source: https://northflank.com/docs/v1/api/team/security-policies/delete-security-policy.md

Requests asynchronous removal of the policy and its applied controls. Deleting and deletion_error policies remain visible until removal completes. Repeated requests preserve the existing deletion request.

Required permission: Account > Networking > SecurityPolicies > Delete

**Path parameters:**

{object}
- `securityPolicyId`: (string) (required) ID of the security policy

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.

### API reference

DELETE /v1/security-policies/{securityPolicyId}

DELETE /v1/teams/{teamId}/security-policies/{securityPolicyId}

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank delete security-policy

Options:

- `--securityPolicyId <securityPolicyId>`: ID of the security policy

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
await apiClient.delete.securityPolicy({
  parameters: {
    "securityPolicyId": "internal-access"
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

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
