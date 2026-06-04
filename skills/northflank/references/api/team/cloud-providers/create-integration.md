# Create integration

Source: https://northflank.com/docs/v1/api/team/cloud-providers/create-integration.md

Creates a new integration.

Required permission: Account > Cloud > Integrations > Create

**Request body:**

{object}
- `name`: (string) (required) The name of the cloud provider integration. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
- `description`: (string) The description of the integration. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `provider`: (string) (required) Cloud provider to be used for the selected resource (enum: aws, azure, civo, gcp, oci, cloudflare, coreweave, aiven, backblaze, akamai, byok)
- `features`: [array of] (string) The type of provider integration. (enum: byoc, byoc-static-egress, byoc-custom-launch-templates, byoc-custom-vpc, byoc-logs, cloudfront, route53, registry-pull, registry-push, opentofu, workload-identity)
- `restrictions`: {object}
  - `enabled`: (boolean) (required) Enable or disable BYOC restrictions for this entity
  - `teams`: [array of] {object}
     - `teamId`: (string) (required) The ID of the team that has access to this BYOC cluster (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 45)
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
- `cloudflare`: {object}
  - `credentialType`: (string) The type of api key (enum: apiToken, originCAKey, globalApiKey)

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

POST /v1/cloud-providers/integrations

POST /v1/teams/{teamId}/cloud-providers/integrations

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Integration","description":"This is a new cloud provider integration.","provider":"gcp","features":["byoc"],"aws":{"authenticationMode":"accessKey"},"gcp":{"authenticationMode":"accessKey"},"cloudflare":{"credentialType":"apiToken"}}' \
  https://api.northflank.com/v1/cloud-providers/integrations
```

```javascript
const payload = {
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
  }
}

const response = await fetch('https://api.northflank.com/v1/cloud-providers/integrations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/cloud-providers/integrations"

payload = {"name":"Example Integration","description":"This is a new cloud provider integration.","provider":"gcp","features":["byoc"],"aws":{"authenticationMode":"accessKey"},"gcp":{"authenticationMode":"accessKey"},"cloudflare":{"credentialType":"apiToken"}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, json = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/cloud-providers/integrations"

  var jsonStr = []byte(`{"name":"Example Integration","description":"This is a new cloud provider integration.","provider":"gcp","features":["byoc"],"aws":{"authenticationMode":"accessKey"},"gcp":{"authenticationMode":"accessKey"},"cloudflare":{"credentialType":"apiToken"}}`)
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

#### Example Response

200 OK: Details about the created integration.

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

$ northflank create cloud integration

Options:

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
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
  }
}
```

#### Example Response

 Details about the created integration.

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

Request body

```javascript
await apiClient.create.cloud.integration({
  data: {
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
    }
  }
});
```

#### Example Response

 Details about the created integration.

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
