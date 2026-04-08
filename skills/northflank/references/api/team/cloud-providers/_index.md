# Team / Cloud Providers Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Cordon cluster node** | `POST /v1/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/cordon`<br>`POST /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/cordon` | [cordon-cluster-node.md](cordon-cluster-node.md) |
| **Create cluster** | `POST /v1/cloud-providers/clusters`<br>`POST /v1/teams/{teamId}/cloud-providers/clusters` | [create-cluster.md](create-cluster.md) |
| **Create integration** | `POST /v1/cloud-providers/integrations`<br>`POST /v1/teams/{teamId}/cloud-providers/integrations` | [create-integration.md](create-integration.md) |
| **Delete cluster** | `DELETE /v1/cloud-providers/clusters/{clusterId}`<br>`DELETE /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}` | [delete-cluster.md](delete-cluster.md) |
| **Delete integration** | `DELETE /v1/cloud-providers/integrations/{integrationId}`<br>`DELETE /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}` | [delete-integration.md](delete-integration.md) |
| **Drain cluster node** | `POST /v1/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/drain`<br>`POST /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/drain` | [drain-cluster-node.md](drain-cluster-node.md) |
| **Get cluster** | `GET /v1/cloud-providers/clusters/{clusterId}`<br>`GET /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}` | [get-cluster.md](get-cluster.md) |
| **Get integration** | `GET /v1/cloud-providers/integrations/{integrationId}`<br>`GET /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}` | [get-integration.md](get-integration.md) |
| **List cluster nodes** | `GET /v1/cloud-providers/clusters/{clusterId}/nodes`<br>`GET /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}/nodes` | [list-cluster-nodes.md](list-cluster-nodes.md) |
| **List clusters** | `GET /v1/cloud-providers/clusters`<br>`GET /v1/teams/{teamId}/cloud-providers/clusters` | [list-clusters.md](list-clusters.md) |
| **List integrations** | `GET /v1/cloud-providers/integrations`<br>`GET /v1/teams/{teamId}/cloud-providers/integrations` | [list-integrations.md](list-integrations.md) |
| **List provider node types** | `GET /v1/cloud-providers/node-types` | [list-provider-node-types.md](list-provider-node-types.md) |
| **List provider regions** | `GET /v1/cloud-providers/regions` | [list-provider-regions.md](list-provider-regions.md) |
| **Patch cluster** | `PATCH /v1/cloud-providers/clusters/{clusterId}`<br>`PATCH /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}` | [patch-cluster.md](patch-cluster.md) |
| **Patch integration** | `PATCH /v1/cloud-providers/integrations/{integrationId}`<br>`PATCH /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}` | [patch-integration.md](patch-integration.md) |
| **Put cluster** | `PUT /v1/cloud-providers/clusters`<br>`PUT /v1/teams/{teamId}/cloud-providers/clusters` | [put-cluster.md](put-cluster.md) |
| **Put integration** | `PUT /v1/cloud-providers/integrations`<br>`PUT /v1/teams/{teamId}/cloud-providers/integrations` | [put-integration.md](put-integration.md) |
| **Uncordon cluster node** | `POST /v1/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/uncordon`<br>`POST /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}/nodes/{nodeId}/uncordon` | [uncordon-cluster-node.md](uncordon-cluster-node.md) |
