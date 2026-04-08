# Project / Workflows Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Abort workflow run** | `POST /v1/projects/{projectId}/workflows/{workflowId}/runs/{runId}/abort`<br>`POST /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}/runs/{runId}/abort` | [abort-workflow-run.md](abort-workflow-run.md) |
| **Create workflow** | `POST /v1/projects/{projectId}/workflows`<br>`POST /v1/teams/{teamId}/projects/{projectId}/workflows` | [create-workflow.md](create-workflow.md) |
| **Get workflow run details** | `GET /v1/projects/{projectId}/workflows/{workflowId}/runs/{runId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}/runs/{runId}` | [get-workflow-run-details.md](get-workflow-run-details.md) |
| **Get workflow** | `GET /v1/projects/{projectId}/workflows/{workflowId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}` | [get-workflow.md](get-workflow.md) |
| **List workflow runs** | `GET /v1/projects/{projectId}/workflows/{workflowId}/runs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}/runs` | [list-workflow-runs.md](list-workflow-runs.md) |
| **List workflows** | `GET /v1/projects/{projectId}/workflows`<br>`GET /v1/teams/{teamId}/projects/{projectId}/workflows` | [list-workflows.md](list-workflows.md) |
| **Run workflow** | `POST /v1/projects/{projectId}/workflows/{workflowId}/runs`<br>`POST /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}/runs` | [run-workflow.md](run-workflow.md) |
| **Update workflow** | `POST /v1/projects/{projectId}/workflows/{workflowId}`<br>`POST /v1/teams/{teamId}/projects/{projectId}/workflows/{workflowId}` | [update-workflow.md](update-workflow.md) |
