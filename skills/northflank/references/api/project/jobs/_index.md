# Project / Jobs Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Abort job build** | `DELETE /v1/projects/{projectId}/jobs/{jobId}/build/{buildId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build/{buildId}` | [abort-job-build.md](abort-job-build.md) |
| **Abort job run** | `DELETE /v1/projects/{projectId}/jobs/{jobId}/runs/{runId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runs/{runId}` | [abort-job-run.md](abort-job-run.md) |
| **Create cron job** | `POST /v1/projects/{projectId}/jobs/cron`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/cron` | [create-cron-job.md](create-cron-job.md) |
| **Create job** | `POST /v1/projects/{projectId}/jobs`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs` | [create-job.md](create-job.md) |
| **Create manual job** | `POST /v1/projects/{projectId}/jobs/manual`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/manual` | [create-manual-job.md](create-manual-job.md) |
| **Delete job** | `DELETE /v1/projects/{projectId}/jobs/{jobId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}` | [delete-job.md](delete-job.md) |
| **Edit job build arguments** | `POST /v1/projects/{projectId}/jobs/{jobId}/build-arguments`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-arguments` | [edit-job-build-arguments.md](edit-job-build-arguments.md) |
| **Edit job runtime environment** | `POST /v1/projects/{projectId}/jobs/{jobId}/runtime-environment`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runtime-environment` | [edit-job-runtime-environment.md](edit-job-runtime-environment.md) |
| **Get job branches** | `GET /v1/projects/{projectId}/jobs/{jobId}/branches`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/branches` | [get-job-branches.md](get-job-branches.md) |
| **Get job build argument details** | `GET /v1/projects/{projectId}/jobs/{jobId}/build-arguments/details`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-arguments/details` | [get-job-build-argument-details.md](get-job-build-argument-details.md) |
| **Get job build arguments** | `GET /v1/projects/{projectId}/jobs/{jobId}/build-arguments`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-arguments` | [get-job-build-arguments.md](get-job-build-arguments.md) |
| **Get job build logs** | `GET /v1/projects/{projectId}/jobs/{jobId}/build-logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-logs` | [get-job-build-logs.md](get-job-build-logs.md) |
| **Get job build metrics** | `GET /v1/projects/{projectId}/jobs/{jobId}/build-metrics`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-metrics` | [get-job-build-metrics.md](get-job-build-metrics.md) |
| **Get job build** | `GET /v1/projects/{projectId}/jobs/{jobId}/build/{buildId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build/{buildId}` | [get-job-build.md](get-job-build.md) |
| **Get job deployment** | `GET /v1/projects/{projectId}/jobs/{jobId}/deployment`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/deployment` | [get-job-deployment.md](get-job-deployment.md) |
| **Get job health checks** | `GET /v1/projects/{projectId}/jobs/{jobId}/health-checks`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/health-checks` | [get-job-health-checks.md](get-job-health-checks.md) |
| **Get job logs** | `GET /v1/projects/{projectId}/jobs/{jobId}/logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/logs` | [get-job-logs.md](get-job-logs.md) |
| **Get job metrics** | `GET /v1/projects/{projectId}/jobs/{jobId}/metrics`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/metrics` | [get-job-metrics.md](get-job-metrics.md) |
| **Get job pull requests** | `GET /v1/projects/{projectId}/jobs/{jobId}/pull-requests`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/pull-requests` | [get-job-pull-requests.md](get-job-pull-requests.md) |
| **Get job runs** | `GET /v1/projects/{projectId}/jobs/{jobId}/runs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runs` | [get-job-runs.md](get-job-runs.md) |
| **Get job runtime environment details** | `GET /v1/projects/{projectId}/jobs/{jobId}/runtime-environment/details`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runtime-environment/details` | [get-job-runtime-environment-details.md](get-job-runtime-environment-details.md) |
| **Get job runtime environment** | `GET /v1/projects/{projectId}/jobs/{jobId}/runtime-environment`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runtime-environment` | [get-job-runtime-environment.md](get-job-runtime-environment.md) |
| **Get job** | `GET /v1/projects/{projectId}/jobs/{jobId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}` | [get-job.md](get-job.md) |
| **Get run details** | `GET /v1/projects/{projectId}/jobs/{jobId}/runs/{runId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runs/{runId}` | [get-run-details.md](get-run-details.md) |
| **List job builds** | `GET /v1/projects/{projectId}/jobs/{jobId}/build`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build` | [list-job-builds.md](list-job-builds.md) |
| **List job containers** | `GET /v1/projects/{projectId}/jobs/{jobId}/containers`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/containers` | [list-job-containers.md](list-job-containers.md) |
| **List jobs** | `GET /v1/projects/{projectId}/jobs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/jobs` | [list-jobs.md](list-jobs.md) |
| **Patch cron job** | `PATCH /v1/projects/{projectId}/jobs/cron/{jobId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/jobs/cron/{jobId}` | [patch-cron-job.md](patch-cron-job.md) |
| **Patch job** | `PATCH /v1/projects/{projectId}/jobs/{jobId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}` | [patch-job.md](patch-job.md) |
| **Patch manual job** | `PATCH /v1/projects/{projectId}/jobs/manual/{jobId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/jobs/manual/{jobId}` | [patch-manual-job.md](patch-manual-job.md) |
| **Pause job** | `POST /v1/projects/{projectId}/jobs/{jobId}/pause`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/pause` | [pause-job.md](pause-job.md) |
| **Put cron job** | `PUT /v1/projects/{projectId}/jobs/cron`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/jobs/cron` | [put-cron-job.md](put-cron-job.md) |
| **Put job** | `PUT /v1/projects/{projectId}/jobs`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/jobs` | [put-job.md](put-job.md) |
| **Put manual job** | `PUT /v1/projects/{projectId}/jobs/manual`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/jobs/manual` | [put-manual-job.md](put-manual-job.md) |
| **Resume job** | `POST /v1/projects/{projectId}/jobs/{jobId}/resume`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/resume` | [resume-job.md](resume-job.md) |
| **Run job** | `POST /v1/projects/{projectId}/jobs/{jobId}/runs`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runs` | [run-job.md](run-job.md) |
| **Scale job** | `POST /v1/projects/{projectId}/jobs/{jobId}/scale`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/scale` | [scale-job.md](scale-job.md) |
| **Start job build** | `POST /v1/projects/{projectId}/jobs/{jobId}/build`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build` | [start-job-build.md](start-job-build.md) |
| **Suspend job** | `POST /v1/projects/{projectId}/jobs/{jobId}/suspend`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/suspend` | [suspend-job.md](suspend-job.md) |
| **Update job build options** | `POST /v1/projects/{projectId}/jobs/{jobId}/build-options`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-options` | [update-job-build-options.md](update-job-build-options.md) |
| **Update job build source** | `POST /v1/projects/{projectId}/jobs/{jobId}/build-source`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-source` | [update-job-build-source.md](update-job-build-source.md) |
| **Update job deployment** | `POST /v1/projects/{projectId}/jobs/{jobId}/deployment`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/deployment` | [update-job-deployment.md](update-job-deployment.md) |
| **Update job health checks** | `POST /v1/projects/{projectId}/jobs/{jobId}/health-checks`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/health-checks` | [update-job-health-checks.md](update-job-health-checks.md) |
| **Update job settings** | `POST /v1/projects/{projectId}/jobs/{jobId}/settings`<br>`POST /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/settings` | [update-job-settings.md](update-job-settings.md) |
