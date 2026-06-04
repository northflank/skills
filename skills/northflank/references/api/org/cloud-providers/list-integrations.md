# List integrations

Source: https://northflank.com/docs/v1/api/org/cloud-providers/list-integrations.md

Lists integrations for the authenticated user or team.

Required permission: Account > Cloud > Integrations > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `integrations`: [array of] {object}
     - `name`: (string) (required) The name of the cloud provider integration. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
     - `description`: (string) The description of the integration. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `provider`: (string) (required) Cloud provider to be used for the selected resource (enum: aws, azure, civo, gcp, oci, cloudflare, coreweave, aiven, backblaze, akamai, byok)
     - `features`: [array of] (string) The type of provider integration. (enum: byoc, byoc-static-egress, byoc-custom-launch-templates, byoc-custom-vpc, byoc-logs, cloudfront, route53, registry-pull, registry-push, opentofu, workload-identity)
     - `restrictions`: {object}
       - `enabled`: (boolean) (required) Enable or disable BYOC restrictions for this entity
       - `teams`: [array of] {object}
           - `teamId`: (string) (required) The ID of the team that has access to this BYOC cluster
     - `aws`: {object}
       - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
       - `permissionCheckLevel`: (string) (enum: enabled, disabled, ignore-implicit-deny-by-organization)
     - `gcp`: {object}
       - `projectId`: (string) (required) GCP Project ID
       - `authenticationMode`: (string) The provider authentication mode to use for this integration. (enum: accessKey, crossAccountRole)
     - `cloudflare`: {object}
       - `credentialType`: (string) The type of api key (enum: apiToken, originCAKey, globalApiKey)
     - `id`: (string) (required) ID of the integration (pattern: ^[A-Za-z0-9-]+$)
     - `createdAt`: (string) (required) The time the integration was created. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/cloud-providers/integrations

GET /v1/teams/{teamId}/cloud-providers/integrations

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
          "authenticationMode": "accessKey"
        },
        "cloudflare": {
          "credentialType": "apiToken"
        },
        "id": "example-integration",
        "createdAt": "2021-01-20T11:19:53.175Z"
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
        "authenticationMode": "accessKey"
      },
      "cloudflare": {
        "credentialType": "apiToken"
      },
      "id": "example-integration",
      "createdAt": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

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
          "authenticationMode": "accessKey"
        },
        "cloudflare": {
          "credentialType": "apiToken"
        },
        "id": "example-integration",
        "createdAt": "2021-01-20T11:19:53.175Z"
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
