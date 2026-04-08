# List cluster nodes

Source: https://northflank.com/docs/v1/api/team/cloud-providers/list-cluster-nodes.md

Get a list of nodes for the given cluster

Required permission: Account > Cloud > Clusters > Read

**Path parameters:**

{object}
- `clusterId`: (string) (required) ID of the cluster

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `status`: (string) Filter the node list by state of the nodes. (enum: RUNNING, DELETED)

**Response body:**

{object}
- `data`: {object}
  - `nodes`: [array of] {object}
     - `nodeId`: (string) The id of the node.
     - `nodeName`: (string) The name of the node.
     - `nodePool`: (string) The node pool the node is a part of.
     - `status`: (string) The status of the node.
     - `zone`: (string) The zone the node is running in.
     - `region`: (string) The region the node is running in.
     - `instanceType`: (string) The type of the node.
     - `createdAt`: (string) (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/cloud-providers/clusters/{clusterId}/nodes

GET /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}/nodes

#### Example Response

200 OK: List of nodes for the given cluster.

```json
{
  "data": {
    "nodes": [
      {
        "nodeId": "87a11ea9-3493-40d3-9f50-280c1d7c77a3",
        "nodeName": "gke-nf-example-cluster-nf-951dfaf6-a70a-7697bc0d-n771",
        "nodePool": "nf-951dfaf6-a70a-4550-bab6-b5364d5da20c",
        "status": "RUNNING",
        "zone": "us-central1-c",
        "region": "us-central1",
        "instanceType": "n2-standard-4",
        "createdAt": "2000-01-01T12:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list cloud cluster nodes

Options:

- `--clusterId <clusterId>`: ID of the cluster

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--status <status>`: Filter the node list by state of the nodes.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 List of nodes for the given cluster.

```json
{
  "nodes": [
    {
      "nodeId": "87a11ea9-3493-40d3-9f50-280c1d7c77a3",
      "nodeName": "gke-nf-example-cluster-nf-951dfaf6-a70a-7697bc0d-n771",
      "nodePool": "nf-951dfaf6-a70a-4550-bab6-b5364d5da20c",
      "status": "RUNNING",
      "zone": "us-central1-c",
      "region": "us-central1",
      "instanceType": "n2-standard-4",
      "createdAt": "2000-01-01T12:00:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.cloud.cluster.nodes({
  parameters: {
    "clusterId": "gcp-cluster-1"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "status": "RUNNING"
  }
});
```

#### Example Response

 List of nodes for the given cluster.

```json
{
  "data": {
    "nodes": [
      {
        "nodeId": "87a11ea9-3493-40d3-9f50-280c1d7c77a3",
        "nodeName": "gke-nf-example-cluster-nf-951dfaf6-a70a-7697bc0d-n771",
        "nodePool": "nf-951dfaf6-a70a-4550-bab6-b5364d5da20c",
        "status": "RUNNING",
        "zone": "us-central1-c",
        "region": "us-central1",
        "instanceType": "n2-standard-4",
        "createdAt": "2000-01-01T12:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
