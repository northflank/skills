# Project / Pipelines Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Abort release flow run** | `POST /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs/{runId}/abort`<br>`POST /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs/{runId}/abort` | [abort-release-flow-run.md](abort-release-flow-run.md) |
| **Delete preview environment** | `DELETE /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs/previews/{previewId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs/previews/{previewId}` | [delete-preview-environment.md](delete-preview-environment.md) |
| **Get pipeline** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}` | [get-pipeline.md](get-pipeline.md) |
| **Get preview template run** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs/{templateRunId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs/{templateRunId}` | [get-preview-template-run.md](get-preview-template-run.md) |
| **Get preview template** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs` | [get-preview-template.md](get-preview-template.md) |
| **Get release flow run details** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs/{runId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs/{runId}` | [get-release-flow-run-details.md](get-release-flow-run-details.md) |
| **Get release flow** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}` | [get-release-flow.md](get-release-flow.md) |
| **List pipelines** | `GET /v1/projects/{projectId}/pipelines`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines` | [list-pipelines.md](list-pipelines.md) |
| **List preview environments** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs/previews`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs/previews` | [list-preview-environments.md](list-preview-environments.md) |
| **List preview template runs** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs` | [list-preview-template-runs.md](list-preview-template-runs.md) |
| **List release flow runs** | `GET /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs` | [list-release-flow-runs.md](list-release-flow-runs.md) |
| **Run preview environment** | `POST /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs`<br>`POST /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs/runs` | [run-preview-environment.md](run-preview-environment.md) |
| **Run release flow** | `POST /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs`<br>`POST /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}/runs` | [run-release-flow.md](run-release-flow.md) |
| **Update preview template** | `POST /v1/projects/{projectId}/pipelines/{pipelineId}/preview-envs`<br>`POST /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/preview-envs` | [update-preview-template.md](update-preview-template.md) |
| **Update release flow** | `POST /v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}`<br>`POST /v1/teams/{teamId}/projects/{projectId}/pipelines/{pipelineId}/release-flows/{stage}` | [update-release-flow.md](update-release-flow.md) |
