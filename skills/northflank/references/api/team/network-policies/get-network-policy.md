# Get network policy

Source: https://northflank.com/docs/v1/api/team/network-policies/get-network-policy.md

Get details of a network policy.

Required permission: Account > Networking > NetworkPolicies > Read

**Path parameters:**

{object}
- `networkPolicyId`: (string) (required) ID of the network policy

### API reference

GET /v1/network-policies/{networkPolicyId}

GET /v1/teams/{teamId}/network-policies/{networkPolicyId}

#### Example Response

200 OK: success

### CLI reference

$ northflank get network-policy

Options:

- `--networkPolicyId <networkPolicyId>`: ID of the network policy

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.networkPolicy({
  parameters: {
    "networkPolicyId": "my-network-policy"
  }
});
```
