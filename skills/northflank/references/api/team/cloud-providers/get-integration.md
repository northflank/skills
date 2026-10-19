# Get integration

Source: https://northflank.com/docs/v1/api/team/cloud-providers/get-integration.md

Get information about the given integration

Required permission: Account > Cloud > Integrations > Read

**Path parameters:**

{object}
- `integrationId`: (string) (required) ID of the provider integration

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) ID of the integration (pattern: ^[A-Za-z0-9-]+$)
  - `name`: (string) (required) The name of the cloud provider integration. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `description`: (string) The description of the integration. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `provider`: (string) (required) Cloud provider to be used for the selected resource (enum: aws, aws-eusc, azure, civo, gcp, oci, cloudflare, coreweave, nebius, aiven, backblaze, akamai, planetscale, byok)
  - `features`: [array of] (string) The type of provider integration. (enum: byoc, byoc-static-egress, byoc-custom-launch-templates, byoc-custom-vpc, byoc-logs, cloudfront, route53, registry-pull, registry-push, opentofu, workload-identity, workload-identity-managed)
  - `restrictions`: {object}
    - `enabled`: (boolean) (required) Enable or disable BYOC restrictions for this entity
    - `teams`: [array of] {object}
        - `teamId`: (string) (required) The ID of the team that has access to this BYOC cluster
  - `byok`: {object}
    - `connectionMode`: (string) Whether Kubernetes API access is direct or through a Northflank connector. (enum: direct, connector)
    - `requireVerification`: (multiple options) (boolean)
  - `credentials`: {object}
    - `accessKey`: (string) AWS access key.
    - `roleArn`: (string) AWS IAM role ARN.
    - `externalId`: (string) AWS shared secret (external id).
    - `tenantId`: (string) Directory (tenant) ID
    - `clientId`: (string) Application (client) ID
    - `objectId`: (string) Object ID
    - `subscriptionId`: (string) Azure Subscription ID
    - `serviceAccountEmail`: (string)
    - `region`: (string) OCI Authentication Region
    - `tenancyId`: (string) OCI Tenancy ID
    - `userId`: (string) User ID
    - `fingerprint`: (string) Fingerprint
    - `compartmentId`: (string) OCI Compartment ID
    - `serviceAccountId`: (string) Nebius service account ID
    - `publicKeyId`: (string) Nebius authorized public key ID
    - `email`: (string) Email address for Cloudflare global API key. (format: email)
    - `applicationKeyId`: (string) Backblaze Application Key ID
    - `host`: (string) Akamai Host
    - `serviceTokenId`: (string) PlanetScale Service Token ID
    - `kubeconfig`: (string) Kubeconfig
  - `aws`: {object}
    - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
    - `permissionVersions`: {object}
      - `byoc`: (integer) Selected BYOC policy version. (enum: 1, 2, 3)
    - `permissionCheckLevel`: (string) (enum: enabled, disabled, ignore-implicit-deny-by-organization)
  - `gcp`: {object}
    - `projectId`: (string) (required) GCP Project ID
    - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
    - `serviceAccountEmail`: (string) Service account email that will be used for cross account access.
  - `cloudflare`: {object}
    - `credentialType`: (string) The type of api key (enum: apiToken, originCAKey, globalApiKey)
  - `registryCredentialRefresh`: {object}
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

### API reference

GET /v1/cloud-providers/integrations/{integrationId}

GET /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}

#### Example Response

200 OK: Details about the given integration.

```json
{
  "data": {
    "id": "example-integration",
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
      "authenticationMode": "accessKey"
    },
    "cloudflare": {
      "credentialType": "apiToken"
    },
    "createdAt": "2021-01-20T11:19:53.175Z"
  }
}
```

### CLI reference

$ northflank get cloud integration

Options:

- `--integrationId <integrationId>`: ID of the provider integration

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the given integration.

```json
{
  "id": "example-integration",
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
    "authenticationMode": "accessKey"
  },
  "cloudflare": {
    "credentialType": "apiToken"
  },
  "createdAt": "2021-01-20T11:19:53.175Z"
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.cloud.integration({
  parameters: {
    "integrationId": "gcp-integration-1"
  }
});
```

#### Example Response

 Details about the given integration.

```json
{
  "data": {
    "id": "example-integration",
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
      "authenticationMode": "accessKey"
    },
    "cloudflare": {
      "credentialType": "apiToken"
    },
    "createdAt": "2021-01-20T11:19:53.175Z"
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

response = client.get.cloud.integration(
    integration_id="gcp-integration-1",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "example-integration",
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
  "createdAt": "2021-01-20T11:19:53.175Z",
  "credentials": {},
  "registryCredentialRefresh": {
    "status": "healthy",
    "affectedCredentialCount": 0
  }
}
```
