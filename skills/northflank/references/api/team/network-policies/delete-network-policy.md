# Delete network policy

Source: https://northflank.com/docs/v1/api/team/network-policies/delete-network-policy.md

Deletes a network policy and removes all associated CNPs from the cluster.

Required permission: Account > Networking > NetworkPolicies > Delete

**Path parameters:**

{object}
- `networkPolicyId`: (string) (required) ID of the network policy

### API reference

DELETE /v1/network-policies/{networkPolicyId}

DELETE /v1/teams/{teamId}/network-policies/{networkPolicyId}

#### Example Response

200 OK: success

### CLI reference

$ northflank delete network-policy

Options:

- `--networkPolicyId <networkPolicyId>`: ID of the network policy

- `--verbose `: Verbose output

- `--quiet `: No console output

- `--force `: Don't ask for confirmation

- `-o --output <format>`: Output formatting

### JavaScript client reference

#### Example request

```javascript
await apiClient.delete.networkPolicy({
  parameters: {
    "networkPolicyId": "my-network-policy"
  }
});
```
