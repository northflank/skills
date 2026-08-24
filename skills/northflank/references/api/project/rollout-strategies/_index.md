# Project / Rollout Strategies Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Get service rollout** | `GET /v1/projects/{projectId}/services/{serviceId}/rollout`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout` | [get-service-rollout.md](get-service-rollout.md) |
| **Promote service rollout** | `POST /v1/projects/{projectId}/services/{serviceId}/rollout/promote`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout/promote` | [promote-service-rollout.md](promote-service-rollout.md) |
| **Roll back service rollout** | `POST /v1/projects/{projectId}/services/{serviceId}/rollout/rollback`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout/rollback` | [roll-back-service-rollout.md](roll-back-service-rollout.md) |
| **Update service rollout configuration** | `POST /v1/projects/{projectId}/services/{serviceId}/rollout/configuration`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout/configuration` | [update-service-rollout-configuration.md](update-service-rollout-configuration.md) |
