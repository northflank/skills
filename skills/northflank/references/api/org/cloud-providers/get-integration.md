# Get integration

Source: https://northflank.com/docs/v1/api/org/cloud-providers/get-integration.md

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
  - `provider`: (string) (required) Cloud provider to be used for the selected resource (enum: aws, azure, civo, gcp, oci, cloudflare, coreweave, aiven, backblaze, akamai, byok)
  - `features`: [array of] (string) The type of provider integration. (enum: byoc, byoc-static-egress, byoc-custom-launch-templates, byoc-custom-vpc, byoc-logs, cloudfront, route53, registry-pull, registry-push, opentofu, workload-identity)
  - `restrictions`: {object}
    - `enabled`: (boolean) (required) Enable or disable BYOC restrictions for this entity
    - `teams`: [array of] {object}
        - `teamId`: (string) (required) The ID of the team that has access to this BYOC cluster
  - `credentials`: {object}
    - `keyfileJson`: (string) Contents of a GCP key file.
    - `accessKey`: (string) AWS access key.
    - `secretKey`: (string) AWS secret key.
    - `roleArn`: (string) AWS IAM role ARN.
    - `externalId`: (string) AWS shared secret (external id).
    - `apiKey`: (string) API key.
    - `email`: (string) Email address for Cloudflare global API key. (format: email)
    - `tenantId`: (string) Directory (tenant) ID
    - `clientId`: (string) Application (client) ID
    - `objectId`: (string) Object ID
    - `secret`: (string) Secret
    - `subscriptionId`: (string) Azure Subscription ID
    - `region`: (string) OCI Authentication Region
    - `tenancyId`: (string) OCI Tenancy ID
    - `userId`: (string) User ID
    - `fingerprint`: (string) Fingerprint
    - `privateKey`: (string) OCI Private Key
    - `passphrase`: (string) Passphrase
    - `compartmentId`: (string) OCI Compartment ID
    - `kubeconfig`: (string) Kubeconfig
    - `applicationKeyId`: (string) Backblaze Application Key ID
    - `applicationKey`: (string) Backblaze Application Key
    - `host`: (string) Akamai Host
    - `accessToken`: (string) Akamai Access Token
    - `clientToken`: (string) Akamai Client Token
    - `clientSecret`: (string) Akamai Client Secret
  - `aws`: {object}
    - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
    - `permissionCheckLevel`: (string) (enum: enabled, disabled, ignore-implicit-deny-by-organization)
  - `gcp`: {object}
    - `projectId`: (string) (required) GCP Project ID
    - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
    - `serviceAccountEmail`: (string) Service account email that will be used for cross account access.
  - `cloudflare`: {object}
    - `credentialType`: (string) The type of api key (enum: apiToken, originCAKey, globalApiKey)
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
