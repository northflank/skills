# List integrations

Source: https://northflank.com/docs/v1/api/team/cloud-providers/list-integrations.md

Lists integrations for the authenticated user or team.

Required permission: Account > Cloud > Integrations > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `integrations`: [array of] (required) An array of integrations. {object} An integration object.
     - `name`: (string) (required) The name of the cloud provider integration. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
     - `description`: (string) The description of the integration. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `provider`: (string) (required) Cloud provider to be used for the selected resource (enum: aws, aws-eusc, azure, civo, gcp, oci, cloudflare, coreweave, nebius, aiven, backblaze, akamai, planetscale, openai, anthropic, byok)
     - `features`: [array of] (string) The type of provider integration. (enum: byoc, byoc-static-egress, byoc-custom-launch-templates, byoc-custom-vpc, byoc-logs, cloudfront, route53, registry-pull, registry-push, opentofu, workload-identity, workload-identity-managed)
     - `restrictions`: {object} BYOC restrictions configuration for controlling team access
       - `enabled`: (boolean) (required) Enable or disable BYOC restrictions for this entity
       - `teams`: [array of] List of teams that have access to this BYOC cluster {object}
           - `teamId`: (string) (required) The ID of the team that has access to this BYOC cluster
     - `byok`: {object}
       - `connectionMode`: (string) Whether Kubernetes API access is direct or through a Northflank connector. (enum: direct, connector)
       - `requireVerification`: (multiple options) Require explicit confirmation of the connector cluster before allowing access. (boolean)
     - `aws`: {object} AWS specific data. Required when `provider` is `aws` or `aws-eusc`.
       - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
       - `permissionVersions`: {object}
         - `byoc`: (integer) Selected BYOC policy version. (enum: 1, 2, 3)
       - `permissionCheckLevel`: (string) (enum: enabled, disabled, ignore-implicit-deny-by-organization)
       - `accountId`: (string) Verified AWS account ID for this integration. (pattern: ^\d{12}$)
     - `gcp`: {object} GCP specific data. Required when `provider` is `gcp`.
       - `projectId`: (string) (required) GCP Project ID
       - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
     - `cloudflare`: {object} Cloudflare specific data. Required when `provider` is `cloudflare`.
       - `credentialType`: (string) The type of api key (enum: apiToken, originCAKey, globalApiKey)
     - `id`: (string) (required) ID of the integration (pattern: ^[A-Za-z0-9-]+$)
     - `registryCredentialRefresh`: {object} (required) Status of automatic registry credential token refreshes for this integration.
       - `status`: (string) (required) (enum: healthy, degraded, suspended)
       - `affectedCredentialCount`: (integer) (required)
       - `updatedAt`: (string) (format: date-time)
       - `retryDelay`: (integer) Delay in milliseconds before the next refresh attempt.
       - `nextAttemptAt`: (string) (format: date-time)
       - `lastError`: {object}
         - `credentialId`: (string) (required) (pattern: ^[A-Za-z0-9-]+$)
         - `failureCount`: (integer) (required)
         - `type`: (string) (required)
         - `message`: (string) (required)
         - `providerCode`: (string)
         - `occurredAt`: (string) (required) (format: date-time)
     - `createdAt`: (string) (required) The time the integration was created. (format: date-time)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/cloud-providers/integrations

GET /v1/teams/{teamId}/cloud-providers/integrations

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/cloud-providers/integrations?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/cloud-providers/integrations?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of integrations for the authenticated user

```json
{
  "data": {
    "integrations": [
      {
        "name": "Example Integration",
        "description": "This is a new cloud provider integration.",
        "provider": "gcp",
        "features": [
          "byoc"
        ],
        "aws": {
          "authenticationMode": "accessKey"
        },
        "gcp": {
          "authenticationMode": "accessKey",
          "projectId": "string"
        },
        "cloudflare": {
          "credentialType": "apiToken"
        },
        "id": "example-integration",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "registryCredentialRefresh": {
          "status": "healthy",
          "affectedCredentialCount": 0
        }
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

$ northflank list cloud integrations

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of integrations for the authenticated user

```json
{
  "integrations": [
    {
      "name": "Example Integration",
      "description": "This is a new cloud provider integration.",
      "provider": "gcp",
      "features": [
        "byoc"
      ],
      "aws": {
        "authenticationMode": "accessKey"
      },
      "gcp": {
        "authenticationMode": "accessKey",
        "projectId": "string"
      },
      "cloudflare": {
        "credentialType": "apiToken"
      },
      "id": "example-integration",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "registryCredentialRefresh": {
        "status": "healthy",
        "affectedCredentialCount": 0
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.cloud.integrations({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of integrations for the authenticated user

```json
{
  "data": {
    "integrations": [
      {
        "name": "Example Integration",
        "description": "This is a new cloud provider integration.",
        "provider": "gcp",
        "features": [
          "byoc"
        ],
        "aws": {
          "authenticationMode": "accessKey"
        },
        "gcp": {
          "authenticationMode": "accessKey",
          "projectId": "string"
        },
        "cloudflare": {
          "credentialType": "apiToken"
        },
        "id": "example-integration",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "registryCredentialRefresh": {
          "status": "healthy",
          "affectedCredentialCount": 0
        }
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.cloud.integrations(
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "integrations": [
    {
      "name": "Example Integration",
      "description": "This is a new cloud provider integration.",
      "provider": "gcp",
      "features": [
        "byoc"
      ],
      "aws": {
        "authenticationMode": "accessKey"
      },
      "gcp": {
        "authenticationMode": "accessKey",
        "projectId": "string"
      },
      "cloudflare": {
        "credentialType": "apiToken"
      },
      "id": "example-integration",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "registryCredentialRefresh": {
        "status": "healthy",
        "affectedCredentialCount": 0
      }
    }
  ]
}
```
