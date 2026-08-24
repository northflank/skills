# Project / Secrets Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Create project secret** | `POST /v1/projects/{projectId}/secrets`<br>`POST /v1/teams/{teamId}/projects/{projectId}/secrets` | [create-project-secret.md](create-project-secret.md) |
| **Delete project secret** | `DELETE /v1/projects/{projectId}/secrets/{secretId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}` | [delete-project-secret.md](delete-project-secret.md) |
| **Get project secret addon link details** | `GET /v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/addons/{addonId}` | [get-project-secret-addon-link-details.md](get-project-secret-addon-link-details.md) |
| **Get project secret details** | `GET /v1/projects/{projectId}/secrets/{secretId}/details`<br>`GET /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/details` | [get-project-secret-details.md](get-project-secret-details.md) |
| **Get project secret** | `GET /v1/projects/{projectId}/secrets/{secretId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}` | [get-project-secret.md](get-project-secret.md) |
| **List project secrets** | `GET /v1/projects/{projectId}/secrets`<br>`GET /v1/teams/{teamId}/projects/{projectId}/secrets` | [list-project-secrets.md](list-project-secrets.md) |
| **Patch project secret** | `PATCH /v1/projects/{projectId}/secrets/{secretId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}` | [patch-project-secret.md](patch-project-secret.md) |
| **Put project secret** | `PUT /v1/projects/{projectId}/secrets`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/secrets` | [put-project-secret.md](put-project-secret.md) |
| **Unlink addon from project secret** | `DELETE /v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/addons/{addonId}` | [unlink-addon-from-project-secret.md](unlink-addon-from-project-secret.md) |
| **Update project secret addon link** | `POST /v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}`<br>`POST /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/addons/{addonId}` | [update-project-secret-addon-link.md](update-project-secret-addon-link.md) |
| **Update project secret** | `POST /v1/projects/{projectId}/secrets/{secretId}`<br>`POST /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}` | [update-project-secret.md](update-project-secret.md) |
