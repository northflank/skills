# Team / Integrations Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Add registry** | `POST /v1/integrations/registries`<br>`POST /v1/teams/{teamId}/integrations/registries` | [add-registry.md](add-registry.md) |
| **Add SSH identity** | `POST /v1/integrations/ssh-identities`<br>`POST /v1/teams/{teamId}/integrations/ssh-identities` | [add-ssh-identity.md](add-ssh-identity.md) |
| **Check repository access** | `POST /v1/integrations/vcs/repo-access`<br>`POST /v1/teams/{teamId}/integrations/vcs/repo-access` | [check-repository-access.md](check-repository-access.md) |
| **Create log sink** | `POST /v1/integrations/log-sinks`<br>`POST /v1/teams/{teamId}/integrations/log-sinks` | [create-log-sink.md](create-log-sink.md) |
| **Create notification integration** | `POST /v1/integrations/notifications`<br>`POST /v1/teams/{teamId}/integrations/notifications` | [create-notification-integration.md](create-notification-integration.md) |
| **Create or update SSH identity** | `PUT /v1/integrations/ssh-identities/{identityId}`<br>`PUT /v1/teams/{teamId}/integrations/ssh-identities/{identityId}` | [create-or-update-ssh-identity.md](create-or-update-ssh-identity.md) |
| **Create VCS link session** | `POST /v1/integrations/vcs/link-sessions`<br>`POST /v1/teams/{teamId}/integrations/vcs/link-sessions` | [create-vcs-link-session.md](create-vcs-link-session.md) |
| **Create workload identity** | `POST /v1/workload-identities`<br>`POST /v1/teams/{teamId}/workload-identities` | [create-workload-identity.md](create-workload-identity.md) |
| **Delete log sink** | `DELETE /v1/integrations/log-sinks/{logSinkId}`<br>`DELETE /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}` | [delete-log-sink.md](delete-log-sink.md) |
| **Delete notification integration** | `DELETE /v1/integrations/notifications/{notificationId}`<br>`DELETE /v1/teams/{teamId}/integrations/notifications/{notificationId}` | [delete-notification-integration.md](delete-notification-integration.md) |
| **Delete registry** | `DELETE /v1/integrations/registries/{credentialId}`<br>`DELETE /v1/teams/{teamId}/integrations/registries/{credentialId}` | [delete-registry.md](delete-registry.md) |
| **Delete SSH identity** | `DELETE /v1/integrations/ssh-identities/{identityId}`<br>`DELETE /v1/teams/{teamId}/integrations/ssh-identities/{identityId}` | [delete-ssh-identity.md](delete-ssh-identity.md) |
| **Delete workload identity** | `DELETE /v1/workload-identities/{workloadIdentityId}`<br>`DELETE /v1/teams/{teamId}/workload-identities/{workloadIdentityId}` | [delete-workload-identity.md](delete-workload-identity.md) |
| **Generate VCS token** | `POST /v1/integrations/vcs/custom/{customVCSId}/token/{vcsLinkId}`<br>`POST /v1/teams/{teamId}/integrations/vcs/custom/{customVCSId}/token/{vcsLinkId}` | [generate-vcs-token.md](generate-vcs-token.md) |
| **Get log sink details** | `GET /v1/integrations/log-sinks/{logSinkId}`<br>`GET /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}` | [get-log-sink-details.md](get-log-sink-details.md) |
| **Get notification integration** | `GET /v1/integrations/notifications/{notificationId}`<br>`GET /v1/teams/{teamId}/integrations/notifications/{notificationId}` | [get-notification-integration.md](get-notification-integration.md) |
| **Get registry** | `GET /v1/integrations/registries/{credentialId}`<br>`GET /v1/teams/{teamId}/integrations/registries/{credentialId}` | [get-registry.md](get-registry.md) |
| **Get SSH identity** | `GET /v1/integrations/ssh-identities/{identityId}`<br>`GET /v1/teams/{teamId}/integrations/ssh-identities/{identityId}` | [get-ssh-identity.md](get-ssh-identity.md) |
| **Get VCS link session** | `GET /v1/integrations/vcs/link-sessions/{linkSessionId}`<br>`GET /v1/teams/{teamId}/integrations/vcs/link-sessions/{linkSessionId}` | [get-vcs-link-session.md](get-vcs-link-session.md) |
| **Get workload identity provider status** | `GET /v1/cloud-providers/integrations/{integrationId}/workload-identity-provider`<br>`GET /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}/workload-identity-provider` | [get-workload-identity-provider-status.md](get-workload-identity-provider-status.md) |
| **Get workload identity** | `GET /v1/workload-identities/{workloadIdentityId}`<br>`GET /v1/teams/{teamId}/workload-identities/{workloadIdentityId}` | [get-workload-identity.md](get-workload-identity.md) |
| **Install workload identity provider** | `POST /v1/cloud-providers/integrations/{integrationId}/workload-identity-provider/install`<br>`POST /v1/teams/{teamId}/cloud-providers/integrations/{integrationId}/workload-identity-provider/install` | [install-workload-identity-provider.md](install-workload-identity-provider.md) |
| **Install workload identity** | `POST /v1/workload-identities/{workloadIdentityId}/install`<br>`POST /v1/teams/{teamId}/workload-identities/{workloadIdentityId}/install` | [install-workload-identity.md](install-workload-identity.md) |
| **List branches** | `GET /v1/integrations/vcs/repos/{vcsService}/{repositoryOwner}/{repositoryName}/branches`<br>`GET /v1/teams/{teamId}/integrations/vcs/repos/{vcsService}/{repositoryOwner}/{repositoryName}/branches` | [list-branches.md](list-branches.md) |
| **List log sinks** | `GET /v1/integrations/log-sinks`<br>`GET /v1/teams/{teamId}/integrations/log-sinks` | [list-log-sinks.md](list-log-sinks.md) |
| **List notification integrations** | `GET /v1/integrations/notifications`<br>`GET /v1/teams/{teamId}/integrations/notifications` | [list-notification-integrations.md](list-notification-integrations.md) |
| **List registries** | `GET /v1/integrations/registries`<br>`GET /v1/teams/{teamId}/integrations/registries` | [list-registries.md](list-registries.md) |
| **List repositories** | `GET /v1/integrations/vcs/repos`<br>`GET /v1/teams/{teamId}/integrations/vcs/repos` | [list-repositories.md](list-repositories.md) |
| **List SSH identities** | `GET /v1/integrations/ssh-identities`<br>`GET /v1/teams/{teamId}/integrations/ssh-identities` | [list-ssh-identities.md](list-ssh-identities.md) |
| **List VCS providers** | `GET /v1/integrations/vcs`<br>`GET /v1/teams/{teamId}/integrations/vcs` | [list-vcs-providers.md](list-vcs-providers.md) |
| **List workload identities** | `GET /v1/workload-identities`<br>`GET /v1/teams/{teamId}/workload-identities` | [list-workload-identities.md](list-workload-identities.md) |
| **Pause log sink** | `POST /v1/integrations/log-sinks/{logSinkId}/pause`<br>`POST /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}/pause` | [pause-log-sink.md](pause-log-sink.md) |
| **Resume log sink** | `POST /v1/integrations/log-sinks/{logSinkId}/resume`<br>`POST /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}/resume` | [resume-log-sink.md](resume-log-sink.md) |
| **Update log sink** | `POST /v1/integrations/log-sinks/{logSinkId}/settings`<br>`POST /v1/teams/{teamId}/integrations/log-sinks/{logSinkId}/settings` | [update-log-sink.md](update-log-sink.md) |
| **Update notification integration** | `POST /v1/integrations/notifications/{notificationId}`<br>`POST /v1/teams/{teamId}/integrations/notifications/{notificationId}` | [update-notification-integration.md](update-notification-integration.md) |
| **Update registry** | `PATCH /v1/integrations/registries/{credentialId}`<br>`PATCH /v1/teams/{teamId}/integrations/registries/{credentialId}` | [update-registry.md](update-registry.md) |
| **Update SSH identity** | `PATCH /v1/integrations/ssh-identities/{identityId}`<br>`PATCH /v1/teams/{teamId}/integrations/ssh-identities/{identityId}` | [update-ssh-identity.md](update-ssh-identity.md) |
| **Update workload identity** | `PATCH /v1/workload-identities/{workloadIdentityId}`<br>`PATCH /v1/teams/{teamId}/workload-identities/{workloadIdentityId}` | [update-workload-identity.md](update-workload-identity.md) |
