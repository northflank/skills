# Install workload identity provider

Source: https://northflank.com/docs/v1/api/team/integrations/install-workload-identity-provider.md

Triggers installation of the OIDC provider or workload identity pool resources on the given cloud provider integration account. This is required once per cloud account before creating managed workload identities.

Required permission: Account > Cloud > WorkloadIdentities > Update

**Path parameters:**

{object}
- `integrationId`: (string) (required) ID of the BYOC provider integration

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/cloud-providers/integrations/{integrationId}/workload-identity-provider/install

POST /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}/workload-identity-provider/install

#### Example Response

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

Looks like you aren‘t able to do that through the CLI yet.

### JavaScript client reference

Looks like you aren‘t able to do that through the JavaScript client yet.
