# Cordon cluster node

Source: https://northflank.com/docs/v1/api/org/cloud-providers/cordon-cluster-node.md

Cordon a node on the cluster to prevent new pods from scheduling on it.

Required permission: Account > Cloud > Clusters > Update

**Path parameters:**

{object}
- `clusterId`: (string) (required) ID of the cluster
- `nodeId`: (string) (required) ID of the node

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/cordon

POST /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/cordon

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank cordon cloud cluster node

Options:

- `--clusterId <clusterId>`: ID of the cluster

- `--nodeId <nodeId>`: ID of the node

- `--verbose `: Verbose output

- `--quiet `: No console output

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
await apiClient.cordon.cloud.cluster.node({
  parameters: {
    "clusterId": "gcp-cluster-1",
    "nodeId": "78861f8a-2fcf-4a3d-869c-434ec2e3f0c1"
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

response = client.cordon.cloud.cluster.node(
    cluster_id="gcp-cluster-1",
    node_id="78861f8a-2fcf-4a3d-869c-434ec2e3f0c1",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{}
```
