# List provider permissions

Source: https://northflank.com/docs/v1/api/team/cloud-providers/list-provider-permissions.md

Lists required cloud provider permissions for the selected integration features

**Query parameters:**

{object}
- `provider`: (string) Cloud provider to retrieve required permissions for. (enum: aws, aws-eusc, gcp)
- `features`: [array of] Selected integration features to retrieve required permissions for. (string) The type of provider integration. (enum: byoc, byoc-static-egress, byoc-custom-launch-templates, byoc-custom-vpc, byoc-logs, cloudfront, route53, registry-pull, registry-push, opentofu, workload-identity, workload-identity-managed)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `permissions`: [array of] (required) Permissions required for the selected integration features. (string)
  - `roles`: [array of] Cloud provider roles covering the required permissions (GCP only). {object}
     - `id`: (string) (required) Cloud provider role ID.
     - `name`: (string) (required) Cloud provider role name.
     - `description`: (string) (required) Cloud provider role description.
     - `permissions`: [array of] (required) Required permissions covered by this role. (string)

### API reference

GET /v1/cloud-providers/permissions

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/cloud-providers/permissions?provider=aws&features=byoc"
```

```python
import requests

url = "https://api.northflank.com/v1/cloud-providers/permissions?provider=aws&features=byoc"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of required cloud provider permissions.

```json
{
  "data": {
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
