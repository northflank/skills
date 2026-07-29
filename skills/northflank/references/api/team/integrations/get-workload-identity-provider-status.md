# Get workload identity provider status

Source: https://northflank.com/docs/v1/api/team/integrations/get-workload-identity-provider-status.md

Checks whether the OIDC/workload identity provider resources have been installed on the given cloud provider integration account.

Required permission: Account > Cloud > WorkloadIdentities > Read

**Path parameters:**

{object}
- `integrationId`: (string) (required) ID of the BYOC provider integration

**Response body:**

{object}
- `data`: {object}
  - `status`: (string) (required) The current installation status of the identity provider on the cloud account. (enum: installed, missing-ids, missing-remote, id-mismatch, permission-denied)

### API reference

GET /v1/cloud-providers/integrations/{integrationId}/workload-identity-provider

GET /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}/workload-identity-provider

#### Example Response

200 OK: The current installation status of the identity provider.

```json
undefined
```

### CLI reference

Looks like you aren‘t able to do that through the CLI yet.

### JavaScript client reference

Looks like you aren‘t able to do that through the JavaScript client yet.
