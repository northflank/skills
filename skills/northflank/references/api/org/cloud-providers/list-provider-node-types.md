# List provider node types

Source: https://northflank.com/docs/v1/api/org/cloud-providers/list-provider-node-types.md

Lists supported cloud provider node types

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `provider`: (string) If provided, only returns items belonging to this cloud provider.
- `region`: (string) If provided, only returns items available in this region.
- `family`: (string) If provided, only returns items of this family.
- `maxGenerationAge`: (integer) If provided, only returns items with a generation age less than or equal to the number given.
- `hasGpu`: (boolean) If true, only returns items with GPUs. If false, only returns items without GPUs.

**Response body:**

{object}
- `data`: {object}
  - `providers`: [array of] {object}
     - `id`: (string) (required) The ID of the node type
     - `name`: (string) (required) The name of the node type
     - `resources`: {object}
       - `vcpu`: (integer) Number of vCPU of this node type
       - `memory`: (integer) Amount of memory capacity in GB of this node type
     - `family`: (string) (required) Family of the node type
     - `processorFamily`: (string) (required) Processor family of the node type
     - `workloadType`: (string) (required) Workload this node type is optimized for

### API reference

GET /v1/cloud-providers/node-types

#### Example Response

200 OK: A list of supported cloud provider node types.

```json
{
  "data": {
    "providers": [
      {
        "id": "n2-standard-8",
        "name": "n2-standard-8",
        "resources": {
          "vcpu": 8,
          "memory": 32
        },
        "family": "N",
        "processorFamily": "intel",
        "workloadType": "general-purpose"
      }
    ]
  }
}
```

### CLI reference

$ northflank list cloud node-types

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--provider <provider>`: If provided, only returns items belonging to this cloud provider.

- `--region <region>`: If provided, only returns items available in this region.

- `--family <family>`: If provided, only returns items of this family.

- `--maxGenerationAge <maxGenerationAge>`: If provided, only returns items with a generation age less than or equal to the number given.

- `--hasGpu <hasGpu>`: If true, only returns items with GPUs. If false, only returns items without GPUs.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of supported cloud provider node types.

```json
{
  "providers": [
    {
      "id": "n2-standard-8",
      "name": "n2-standard-8",
      "resources": {
        "vcpu": 8,
        "memory": 32
      },
      "family": "N",
      "processorFamily": "intel",
      "workloadType": "general-purpose"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.cloud.nodeTypes({
  options: {
    "per_page": 50,
    "page": 1,
    "provider": "gcp",
    "region": "europe-west-1",
    "family": "N",
    "maxGenerationAge": 0,
    "hasGpu": true
  }
});
```

#### Example Response

 A list of supported cloud provider node types.

```json
{
  "data": {
    "providers": [
      {
        "id": "n2-standard-8",
        "name": "n2-standard-8",
        "resources": {
          "vcpu": 8,
          "memory": 32
        },
        "family": "N",
        "processorFamily": "intel",
        "workloadType": "general-purpose"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
