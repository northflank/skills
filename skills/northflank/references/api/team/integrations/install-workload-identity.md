# Install workload identity

Source: https://northflank.com/docs/v1/api/team/integrations/install-workload-identity.md

Triggers installation of the managed cloud resources (IAM role/policy) for a workload identity. For identities using an existing role, this validates and records the role details.

Required permission: Account > Cloud > WorkloadIdentities > Update

**Path parameters:**

{object}
- `workloadIdentityId`: (string) (required) ID of the workload identity

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) ID of the workload identity (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `priority`: (integer) The priority used to select a workload identity for each provider.
  - `spec`: (multiple options) (required) {object}
     - `providerLinkId`: (string) (required) The internal ID of the BYOC provider integration to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `roleMode`: (string) (required) (enum: managed, existing)
     - `providerSetupMode`: (string) (enum: auto, manual)
     - `provider`: (multiple options) (required) The cloud provider configuration for this workload identity. {object} An AWS role managed by Northflank, created from the given IAM policy document.
         - `type`: (string) (required) (enum: aws)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds for service, job and harness delivery. Omit to use the platform default (normally 24 hours, capped at 1 hour for OpenAI, Anthropic and generic OIDC).
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `policyDocument`: {object} (required) The AWS IAM policy document.
           - `Version`: (string) (required) (enum: 2012-10-17, 2008-10-17)
           - `Statement`: (multiple options) (required) The policy statement(s) of the IAM policy document. {object} A single policy statement.
               - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
               - `Effect`: (string) (required) (enum: Allow, Deny)
               - `Action`: (multiple options) (required) The IAM action(s) the statement applies to. (string) A single IAM action. | [array of] A list of IAM actions. (string)
               - `Resource`: (multiple options) (required) The resource ARN(s) the statement applies to. (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] A list of resource ARNs. (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
               - `Condition`: {object} | [array of] A list of policy statements. {object}
                 - `Sid`: (string) (pattern: ^[a-zA-Z0-9]*$)
                 - `Effect`: (string) (required) (enum: Allow, Deny)
                 - `Action`: (multiple options) (required) The IAM action(s) the statement applies to. (string) A single IAM action. | [array of] A list of IAM actions. (string)
                 - `Resource`: (multiple options) (required) The resource ARN(s) the statement applies to. (string) A single resource ARN. (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$) | [array of] A list of resource ARNs. (string) (pattern: ^(\*|arn:[a-zA-Z0-9:*/\-?_+=,.@]+)$)
                 - `Condition`: {object}
         - `roleName`: (string) The name for the AWS IAM role to create. If not specified, a name is generated automatically. (pattern: ^[\w+=,.@-]{1,64}$)
         - `rolePath`: (string) The path for the AWS IAM role to create. (pattern: ^\/?[\w+=,.@-]+(?:\/[\w+=,.@-]+)*\/?$)
         - `arn`: (string) | {object} An existing AWS IAM role, referenced by its ARN.
         - `type`: (string) (required) (enum: aws)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds for service, job and harness delivery. Omit to use the platform default (normally 24 hours, capped at 1 hour for OpenAI, Anthropic and generic OIDC).
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `existingRoleArn`: (string) (required)
         - `arn`: (string) | {object} A GCP service account managed by Northflank, granted the given list of permissions.
         - `type`: (string) (required) (enum: gcp)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds for service, job and harness delivery. Omit to use the platform default (normally 24 hours, capped at 1 hour for OpenAI, Anthropic and generic OIDC).
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `permissions`: [array of] (required) A list of GCP permissions to assign to this workload identity. (string) (pattern: ^[a-zA-Z0-9.]+$)
         - `impersonationUrl`: (string)
         - `audience`: (string) | {object} An existing GCP service account, referenced by its audience and impersonation URL.
         - `type`: (string) (required) (enum: gcp)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds for service, job and harness delivery. Omit to use the platform default (normally 24 hours, capped at 1 hour for OpenAI, Anthropic and generic OIDC).
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `existingRoleAudience`: (string) (required)
         - `existingRoleImpersonationUrl`: (string) (required)
         - `impersonationUrl`: (string)
         - `audience`: (string) | {object} An Azure user-assigned managed identity with scoped role assignments.
         - `type`: (string) (required) (enum: azure)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds for service, job and harness delivery. Omit to use the platform default (normally 24 hours, capped at 1 hour for OpenAI, Anthropic and generic OIDC).
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `resourceGroupName`: (string) (required) (pattern: ^[A-Za-z0-9_().-]{0,89}[A-Za-z0-9_()-]$)
         - `location`: (string) (required) (pattern: ^[a-z0-9]+$)
         - `roleAssignments`: [array of] (required) {object}
             - `scope`: (string) (required) (pattern: ^\/[sS][uU][bB][sS][cC][rR][iI][pP][tT][iI][oO][nN][sS]\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(?:\/[rR][eE][sS][oO][uU][rR][cC][eE][gG][rR][oO][uU][pP][sS]\/[A-Za-z0-9_().-]{0,89}[A-Za-z0-9_()-](?:\/[pP][rR][oO][vV][iI][dD][eE][rR][sS]\/[A-Za-z0-9_()-][A-Za-z0-9_.()-]*(?:\/[A-Za-z0-9_()-][A-Za-z0-9_.()-]*)+)?)?$)
             - `roleDefinitionId`: (string) (required) (pattern: ^\/[sS][uU][bB][sS][cC][rR][iI][pP][tT][iI][oO][nN][sS]\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/[pP][rR][oO][vV][iI][dD][eE][rR][sS]\/[mM][iI][cC][rR][oO][sS][oO][fF][tT]\.[aA][uU][tT][hH][oO][rR][iI][zZ][aA][tT][iI][oO][nN]\/[rR][oO][lL][eE][dD][eE][fF][iI][nN][iI][tT][iI][oO][nN][sS]\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$)
         - `clientId`: (string) (format: uuid)
         - `tenantId`: (string) (format: uuid) | {object} An existing Azure user-assigned managed identity with manually configured federation.
         - `type`: (string) (required) (enum: azure)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds for service, job and harness delivery. Omit to use the platform default (normally 24 hours, capped at 1 hour for OpenAI, Anthropic and generic OIDC).
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `existingIdentityResourceId`: (string) (required) (pattern: ^\/[sS][uU][bB][sS][cC][rR][iI][pP][tT][iI][oO][nN][sS]\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/[rR][eE][sS][oO][uU][rR][cC][eE][gG][rR][oO][uU][pP][sS]\/[A-Za-z0-9_().-]{0,89}[A-Za-z0-9_()-]\/[pP][rR][oO][vV][iI][dD][eE][rR][sS]\/[mM][iI][cC][rR][oO][sS][oO][fF][tT]\.[mM][aA][nN][aA][gG][eE][dD][iI][dD][eE][nN][tT][iI][tT][yY]\/[uU][sS][eE][rR][aA][sS][sS][iI][gG][nN][eE][dD][iI][dD][eE][nN][tT][iI][tT][iI][eE][sS]\/[A-Za-z0-9][A-Za-z0-9_-]{2,127}$)
         - `clientId`: (string) (format: uuid)
         - `tenantId`: (string) (format: uuid)
     - `restrictions`: {object} (required) Configuration of restrictions.
       - `projects`: {object} Configuration of project restriction settings.
         - `enabled`: (boolean) Whether restriction by project should be enabled.
         - `items`: [array of] An array of previously defined projects. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
       - `tags`: {object} Configuration of tag restriction settings.
         - `enabled`: (boolean) Whether restriction by tag should be enabled.
         - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
         - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
       - `workloadTypes`: {object} Which workload types can receive this identity. Omit to allow all types.
         - `enabled`: (boolean) (required)
         - `items`: [array of] (required) (string) (enum: service, job, harness) | {object}
     - `provider`: {object} (required) Team-scoped Northflank API access using an existing team or organisation role.
       - `type`: (string) (required) (enum: northflank)
       - `scope`: (string) (required) Restrict access to the workload’s project, or use the role’s scope within this team. Role project restrictions always apply. (enum: own-project, role)
       - `roleId`: (string) (required) Team or organisation role granting Northflank API access within this team. (min length: 24) (max length: 24)
     - `restrictions`: {object} (required) Configuration of restrictions.
       - `projects`: {object} Configuration of project restriction settings.
         - `enabled`: (boolean) Whether restriction by project should be enabled.
         - `items`: [array of] An array of previously defined projects. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
       - `tags`: {object} Configuration of tag restriction settings.
         - `enabled`: (boolean) Whether restriction by tag should be enabled.
         - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
         - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
       - `workloadTypes`: {object} Which workload types can receive this identity. Omit to allow all types.
         - `enabled`: (boolean) (required)
         - `items`: [array of] (required) (string) (enum: service, job, harness) | {object}
     - `provider`: (multiple options) (required) {object}
         - `type`: (string) (required) (enum: openai)
         - `audience`: (string) (required) (max length: 2048)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds. Maximum 1 hour; omit to use the platform default capped at 1 hour.
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `serviceAccountId`: (string) (required) (pattern: ^[A-Za-z0-9_-]+$) (max length: 200)
         - `identityProviderId`: (string) (required) (pattern: ^[A-Za-z0-9_-]+$) (max length: 200) | {object}
         - `type`: (string) (required) (enum: anthropic)
         - `audience`: (string) (required) (max length: 2048)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds. Maximum 1 hour; omit to use the platform default capped at 1 hour.
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
         - `serviceAccountId`: (string) (required) (pattern: ^[A-Za-z0-9_-]+$) (max length: 200)
         - `federationRuleId`: (string) (required) (pattern: ^[A-Za-z0-9_-]+$) (max length: 200)
         - `organizationId`: (string) (required) (format: uuid)
         - `workspaceId`: (string) (required) (pattern: ^[A-Za-z0-9_-]+$) (max length: 200) | {object} A customer-configured OIDC trust using a Northflank-issued JWT.
         - `type`: (string) (required) (enum: oidc)
         - `audience`: (string) (required) (max length: 2048)
         - `tokenTtlSeconds`: (integer) OIDC subject token lifetime in seconds. Maximum 1 hour; omit to use the platform default capped at 1 hour.
         - `subject`: (multiple options) OIDC subject for workload delivery. Defaults to the entity ID. Project mode requires explicit projects; static values are prefixed with the entity ID. {object}
             - `type`: (string) (required) (enum: entity) | {object}
             - `type`: (string) (required) (enum: project) | {object}
             - `type`: (string) (required) (enum: static)
             - `value`: (string) (required) (pattern: ^[A-Za-z0-9][A-Za-z0-9._:-]*$) (max length: 100)
     - `restrictions`: {object} (required) Configuration of restrictions.
       - `projects`: {object} Configuration of project restriction settings.
         - `enabled`: (boolean) Whether restriction by project should be enabled.
         - `items`: [array of] An array of previously defined projects. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
       - `tags`: {object} Configuration of tag restriction settings.
         - `enabled`: (boolean) Whether restriction by tag should be enabled.
         - `items`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
         - `matchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
       - `workloadTypes`: {object} Which workload types can receive this identity. Omit to allow all types.
         - `enabled`: (boolean) (required)
         - `items`: [array of] (required) (string) (enum: service, job, harness)
  - `state`: {object} The current state of the workload identity.
    - `status`: (string) (required) The current install status of the workload identity. (enum: unapplied, outdated, installing, updating, error, applied, deleting)
    - `updatedAt`: (string) time of update (format: date-time)
    - `errors`: [array of] Any errors encountered during installation. (string)
  - `updatedAt`: (string) time of update (format: date-time)
  - `createdAt`: (string) time of creation (format: date-time)

### API reference

POST /v1/workload-identities/{workloadIdentityId}/install

POST /v1/teams/{teamId}/workload-identities/{workloadIdentityId}/install

#### Example Response

200 OK: Data about the workload identity after triggering installation.

```json
{
  "data": {
    "id": "example-workload-identity",
    "name": "Example Workload Identity",
    "priority": 10,
    "spec": {
      "restrictions": {
        "projects": {
          "enabled": false
        },
        "tags": {
          "enabled": false,
          "matchCondition": "or"
        }
      },
      "providerLinkId": "string",
      "roleMode": "managed",
      "provider": {
        "type": "aws",
        "policyDocument": {
          "Version": "2012-10-17",
          "Statement": {
            "Effect": "Allow",
            "Action": "string",
            "Resource": "*"
          }
        }
      }
    }
  }
}
```

### CLI reference

Looks like you aren‘t able to do that through the CLI yet.

### JavaScript client reference

Looks like you aren‘t able to do that through the JavaScript client yet.

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
