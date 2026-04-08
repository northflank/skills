# Project / Preview Blueprints Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Abort preview blueprint run** | `POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs/{runId}/abort`<br>`POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs/{runId}/abort` | [abort-preview-blueprint-run.md](abort-preview-blueprint-run.md) |
| **Create preview blueprint** | `POST /v1/projects/{projectId}/preview-blueprints`<br>`POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints` | [create-preview-blueprint.md](create-preview-blueprint.md) |
| **Delete preview blueprint** | `DELETE /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}` | [delete-preview-blueprint.md](delete-preview-blueprint.md) |
| **Delete preview environment** | `DELETE /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}` | [delete-preview-environment.md](delete-preview-environment.md) |
| **Get preview blueprint run details** | `GET /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs/{runId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs/{runId}` | [get-preview-blueprint-run-details.md](get-preview-blueprint-run-details.md) |
| **Get preview blueprint** | `GET /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}` | [get-preview-blueprint.md](get-preview-blueprint.md) |
| **List preview blueprint runs** | `GET /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs` | [list-preview-blueprint-runs.md](list-preview-blueprint-runs.md) |
| **List preview blueprints** | `GET /v1/projects/{projectId}/preview-blueprints`<br>`GET /v1/teams/{teamId}/projects/{projectId}/preview-blueprints` | [list-preview-blueprints.md](list-preview-blueprints.md) |
| **List preview environments** | `GET /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews`<br>`GET /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews` | [list-preview-environments.md](list-preview-environments.md) |
| **Pause preview environment** | `POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}/pause`<br>`POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}/pause` | [pause-preview-environment.md](pause-preview-environment.md) |
| **Reset preview environment expiry** | `POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}/reset`<br>`POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}/reset` | [reset-preview-environment-expiry.md](reset-preview-environment-expiry.md) |
| **Resume preview environment** | `POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}/resume`<br>`POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/previews/{previewId}/resume` | [resume-preview-environment.md](resume-preview-environment.md) |
| **Run preview blueprint** | `POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs`<br>`POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}/runs` | [run-preview-blueprint.md](run-preview-blueprint.md) |
| **Update preview blueprint** | `POST /v1/projects/{projectId}/preview-blueprints/{previewBlueprintId}`<br>`POST /v1/teams/{teamId}/projects/{projectId}/preview-blueprints/{previewBlueprintId}` | [update-preview-blueprint.md](update-preview-blueprint.md) |
