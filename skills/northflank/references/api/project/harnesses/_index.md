# Project / Harnesses Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Create harness** | `POST /v1/projects/{projectId}/harnesses`<br>`POST /v1/teams/{teamId}/projects/{projectId}/harnesses` | [create-harness.md](create-harness.md) |
| **Delete harness** | `DELETE /v1/projects/{projectId}/harnesses/{harnessId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}` | [delete-harness.md](delete-harness.md) |
| **Get harness logs** | `GET /v1/projects/{projectId}/harnesses/{harnessId}/logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}/logs` | [get-harness-logs.md](get-harness-logs.md) |
| **Get harness** | `GET /v1/projects/{projectId}/harnesses/{harnessId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}` | [get-harness.md](get-harness.md) |
| **List harnesses** | `GET /v1/projects/{projectId}/harnesses`<br>`GET /v1/teams/{teamId}/projects/{projectId}/harnesses` | [list-harnesses.md](list-harnesses.md) |
| **Patch harness** | `PATCH /v1/projects/{projectId}/harnesses/{harnessId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}` | [patch-harness.md](patch-harness.md) |
| **Pause harness** | `POST /v1/projects/{projectId}/harnesses/{harnessId}/pause`<br>`POST /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}/pause` | [pause-harness.md](pause-harness.md) |
| **Put harness** | `PUT /v1/projects/{projectId}/harnesses`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/harnesses` | [put-harness.md](put-harness.md) |
| **Restart harness** | `POST /v1/projects/{projectId}/harnesses/{harnessId}/restart`<br>`POST /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}/restart` | [restart-harness.md](restart-harness.md) |
| **Resume harness** | `POST /v1/projects/{projectId}/harnesses/{harnessId}/resume`<br>`POST /v1/teams/{teamId}/projects/{projectId}/harnesses/{harnessId}/resume` | [resume-harness.md](resume-harness.md) |
