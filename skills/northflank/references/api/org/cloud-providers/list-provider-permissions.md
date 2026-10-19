# List provider permissions

Source: https://northflank.com/docs/v1/api/org/cloud-providers/list-provider-permissions.md

Lists required cloud provider permissions for the selected integration features

**Query parameters:**

{object}
- `provider`: (string) Cloud provider to retrieve required permissions for. (enum: aws, aws-eusc, gcp)
- `features`: [array of] (string) The type of provider integration. (enum: byoc, byoc-static-egress, byoc-custom-launch-templates, byoc-custom-vpc, byoc-logs, cloudfront, route53, registry-pull, registry-push, opentofu, workload-identity, workload-identity-managed)

**Response body:**

{object}
- `data`: {object}
  - `permissions`: [array of] (string)
  - `roles`: [array of] {object}
     - `id`: (string) (required) Cloud provider role ID.
     - `name`: (string) (required) Cloud provider role name.
     - `description`: (string) (required) Cloud provider role description.
     - `permissions`: [array of] (string)

### API reference

GET /v1/cloud-providers/permissions

#### Example Response

200 OK: A list of required cloud provider permissions.

```json
{
  "data": {
    "roles": [
      {
        "id": "roles/container.admin",
        "name": "Kubernetes Engine Admin",
        "description": "Provides administrative access to Kubernetes clusters."
      }
    ]
  }
}
```

### CLI reference

$ northflank list cloud permissions

Options:

- `--provider <provider>`: Cloud provider to retrieve required permissions for.

- `--features <features>`: Selected integration features to retrieve required permissions for.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of required cloud provider permissions.

```json
{
  "roles": [
    {
      "id": "roles/container.admin",
      "name": "Kubernetes Engine Admin",
      "description": "Provides administrative access to Kubernetes clusters."
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.cloud.permissions({
  options: {
    "provider": "aws",
    "features": [
      "byoc"
    ]
  }
});
```

#### Example Response

 A list of required cloud provider permissions.

```json
{
  "data": {
    "roles": [
      {
        "id": "roles/container.admin",
        "name": "Kubernetes Engine Admin",
        "description": "Provides administrative access to Kubernetes clusters."
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.cloud.permissions(
    features=["byoc"],
    provider="aws",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "permissions": [
    "eks:CreateCluster"
  ],
  "roles": [
    {
      "id": "roles/container.admin",
      "name": "Kubernetes Engine Admin",
      "description": "Provides administrative access to Kubernetes clusters.",
      "permissions": [
        "container.clusters.create"
      ]
    }
  ]
}
```
