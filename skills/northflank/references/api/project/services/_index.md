# Project / Services Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Abort service build** | `DELETE /v1/projects/{projectId}/services/{serviceId}/build/{buildId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build/{buildId}` | [abort-service-build.md](abort-service-build.md) |
| **Clear the build cache of a service** | `DELETE /v1/projects/{projectId}/services/{serviceId}/build-cache`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-cache` | [clear-the-build-cache-of-a-service.md](clear-the-build-cache-of-a-service.md) |
| **Create build service** | `POST /v1/projects/{projectId}/services/build`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/build` | [create-build-service.md](create-build-service.md) |
| **Create combined service** | `POST /v1/projects/{projectId}/services/combined`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/combined` | [create-combined-service.md](create-combined-service.md) |
| **Create deployment service** | `POST /v1/projects/{projectId}/services/deployment`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/deployment` | [create-deployment-service.md](create-deployment-service.md) |
| **Delete service** | `DELETE /v1/projects/{projectId}/services/{serviceId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}` | [delete-service.md](delete-service.md) |
| **Edit service build arguments** | `POST /v1/projects/{projectId}/services/{serviceId}/build-arguments`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-arguments` | [edit-service-build-arguments.md](edit-service-build-arguments.md) |
| **Edit service runtime environment** | `POST /v1/projects/{projectId}/services/{serviceId}/runtime-environment`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/runtime-environment` | [edit-service-runtime-environment.md](edit-service-runtime-environment.md) |
| **Get service branches** | `GET /v1/projects/{projectId}/services/{serviceId}/branches`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/branches` | [get-service-branches.md](get-service-branches.md) |
| **Get service build arguments details** | `GET /v1/projects/{projectId}/services/{serviceId}/build-arguments/details`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-arguments/details` | [get-service-build-arguments-details.md](get-service-build-arguments-details.md) |
| **Get service build arguments** | `GET /v1/projects/{projectId}/services/{serviceId}/build-arguments`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-arguments` | [get-service-build-arguments.md](get-service-build-arguments.md) |
| **Get service build logs** | `GET /v1/projects/{projectId}/services/{serviceId}/build-logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-logs` | [get-service-build-logs.md](get-service-build-logs.md) |
| **Get service build metrics** | `GET /v1/projects/{projectId}/services/{serviceId}/build-metrics`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-metrics` | [get-service-build-metrics.md](get-service-build-metrics.md) |
| **Get service build** | `GET /v1/projects/{projectId}/services/{serviceId}/build/{buildId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build/{buildId}` | [get-service-build.md](get-service-build.md) |
| **Get service deployment** | `GET /v1/projects/{projectId}/services/{serviceId}/deployment`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/deployment` | [get-service-deployment.md](get-service-deployment.md) |
| **Get service health checks** | `GET /v1/projects/{projectId}/services/{serviceId}/health-checks`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/health-checks` | [get-service-health-checks.md](get-service-health-checks.md) |
| **Get service logs** | `GET /v1/projects/{projectId}/services/{serviceId}/logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/logs` | [get-service-logs.md](get-service-logs.md) |
| **Get service metrics** | `GET /v1/projects/{projectId}/services/{serviceId}/metrics`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/metrics` | [get-service-metrics.md](get-service-metrics.md) |
| **Get service ports** | `GET /v1/projects/{projectId}/services/{serviceId}/ports`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/ports` | [get-service-ports.md](get-service-ports.md) |
| **Get service pull requests** | `GET /v1/projects/{projectId}/services/{serviceId}/pull-requests`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/pull-requests` | [get-service-pull-requests.md](get-service-pull-requests.md) |
| **Get service runtime environment details** | `GET /v1/projects/{projectId}/services/{serviceId}/runtime-environment/details`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/runtime-environment/details` | [get-service-runtime-environment-details.md](get-service-runtime-environment-details.md) |
| **Get service runtime environment** | `GET /v1/projects/{projectId}/services/{serviceId}/runtime-environment`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/runtime-environment` | [get-service-runtime-environment.md](get-service-runtime-environment.md) |
| **Get service** | `GET /v1/projects/{projectId}/services/{serviceId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}` | [get-service.md](get-service.md) |
| **List service builds** | `GET /v1/projects/{projectId}/services/{serviceId}/build`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build` | [list-service-builds.md](list-service-builds.md) |
| **List service containers** | `GET /v1/projects/{projectId}/services/{serviceId}/containers`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/containers` | [list-service-containers.md](list-service-containers.md) |
| **List services** | `GET /v1/projects/{projectId}/services`<br>`GET /v1/teams/{teamId}/projects/{projectId}/services` | [list-services.md](list-services.md) |
| **Patch build service** | `PATCH /v1/projects/{projectId}/services/build/{serviceId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/services/build/{serviceId}` | [patch-build-service.md](patch-build-service.md) |
| **Patch combined service** | `PATCH /v1/projects/{projectId}/services/combined/{serviceId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/services/combined/{serviceId}` | [patch-combined-service.md](patch-combined-service.md) |
| **Patch deployment service** | `PATCH /v1/projects/{projectId}/services/deployment/{serviceId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/services/deployment/{serviceId}` | [patch-deployment-service.md](patch-deployment-service.md) |
| **Pause service** | `POST /v1/projects/{projectId}/services/{serviceId}/pause`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/pause` | [pause-service.md](pause-service.md) |
| **Put build service** | `PUT /v1/projects/{projectId}/services/build`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/services/build` | [put-build-service.md](put-build-service.md) |
| **Put combined service** | `PUT /v1/projects/{projectId}/services/combined`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/services/combined` | [put-combined-service.md](put-combined-service.md) |
| **Put deployment service** | `PUT /v1/projects/{projectId}/services/deployment`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/services/deployment` | [put-deployment-service.md](put-deployment-service.md) |
| **Restart service** | `POST /v1/projects/{projectId}/services/{serviceId}/restart`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/restart` | [restart-service.md](restart-service.md) |
| **Resume service** | `POST /v1/projects/{projectId}/services/{serviceId}/resume`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/resume` | [resume-service.md](resume-service.md) |
| **Scale service** | `POST /v1/projects/{projectId}/services/{serviceId}/scale`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/scale` | [scale-service.md](scale-service.md) |
| **Start service build** | `POST /v1/projects/{projectId}/services/{serviceId}/build`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build` | [start-service-build.md](start-service-build.md) |
| **Update service build options** | `POST /v1/projects/{projectId}/services/{serviceId}/build-options`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-options` | [update-service-build-options.md](update-service-build-options.md) |
| **Update service build source** | `POST /v1/projects/{projectId}/services/{serviceId}/build-source`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-source` | [update-service-build-source.md](update-service-build-source.md) |
| **Update service deployment** | `POST /v1/projects/{projectId}/services/{serviceId}/deployment`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/deployment` | [update-service-deployment.md](update-service-deployment.md) |
| **Update service health checks** | `POST /v1/projects/{projectId}/services/{serviceId}/health-checks`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/health-checks` | [update-service-health-checks.md](update-service-health-checks.md) |
| **Update service ports** | `POST /v1/projects/{projectId}/services/{serviceId}/ports`<br>`POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/ports` | [update-service-ports.md](update-service-ports.md) |
