# Northflank API Overview

## Base URL and Authentication

- **Base URL:** `https://api.northflank.com/v1/`
- **Auth:** `Authorization: Bearer <token>` — generate in team or account settings
- **Content-Type:** `application/json`
- **Rate limit:** 1000 requests/hr; headers: `x-ratelimit-limit`, `x-ratelimit-remaining`, `x-ratelimit-reset`
- **OpenAPI spec:** `https://api.northflank.com/v1/swagger-json`

## Token Generation

1. Open your team page, then go to Team Settings -> API -> Tokens -> Create API token
2. Make sure an API role exists under Team Settings -> API -> Roles with the required permissions
3. Use in CLI: `northflank login -t <token>`

## URL Structure

All endpoints are nested under `/v1/`. Resources scoped to teams use `/v1/teams/{teamId}/...`. Most project resources use `/v1/projects/{projectId}/...`.

## IDs

Service and resource IDs are slug-ified names. For example, "My App" becomes "my-app".

## Pagination

- Query params: `per_page` (max 100), `page`, `cursor`
- Default page size: 50
- Responses include `pagination: { hasNextPage, cursor, count }`

## Response Format

### Success

```json
{
  "data": { ... },
  "pagination": {
    "hasNextPage": false,
    "cursor": "abc123",
    "count": 10
  }
}
```

### Error

```json
{
  "error": {
    "status": 404,
    "message": "Not found",
    "id": "...",
    "details": {}
  }
}
```

## Endpoint Reference

### Projects

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects` | Create project |
| GET | `/v1/projects` | List projects |
| GET | `/v1/projects/{projectId}` | Get project |
| PUT | `/v1/projects/{projectId}` | Update project |
| DELETE | `/v1/projects/{projectId}` | Delete project |

Create project body:
```json
{
  "name": "My Project",
  "description": "Description",
  "color": "#EF233C",
  "region": "europe-west"
}
```

For BYOC clusters, use `"clusterId": "<cluster-id>"` instead of `region`.

### Services

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/services/combined` | Create combined service |
| POST | `/v1/projects/{projectId}/services/deployment` | Create deployment service |
| POST | `/v1/projects/{projectId}/services/build` | Create build service |
| GET | `/v1/projects/{projectId}/services` | List services |
| GET | `/v1/projects/{projectId}/services/{serviceId}` | Get service |
| PATCH | `/v1/projects/{projectId}/services/{serviceType}/{serviceId}` | Patch service |
| PUT | `/v1/projects/{projectId}/services/{serviceType}/{serviceId}` | Put service |
| DELETE | `/v1/projects/{projectId}/services/{serviceId}` | Delete service |
| POST | `/v1/projects/{projectId}/services/{serviceId}/build` | Start build |
| POST | `/v1/projects/{projectId}/services/{serviceId}/deployment` | Update deployment |
| GET | `/v1/projects/{projectId}/services/{serviceId}/deployment` | Get deployment |
| POST | `/v1/projects/{projectId}/services/{serviceId}/scale` | Scale service |
| POST | `/v1/projects/{projectId}/services/{serviceId}/pause` | Pause service |
| POST | `/v1/projects/{projectId}/services/{serviceId}/resume` | Resume service |
| POST | `/v1/projects/{projectId}/services/{serviceId}/restart` | Restart service |
| GET | `/v1/projects/{projectId}/services/{serviceId}/logs` | Get logs |
| GET | `/v1/projects/{projectId}/services/{serviceId}/metrics` | Get metrics |
| GET | `/v1/projects/{projectId}/services/{serviceId}/ports` | Get ports |
| POST | `/v1/projects/{projectId}/services/{serviceId}/ports` | Update ports |
| GET | `/v1/projects/{projectId}/services/{serviceId}/build-arguments` | Get build args |
| POST | `/v1/projects/{projectId}/services/{serviceId}/build-arguments` | Set build args |
| GET | `/v1/projects/{projectId}/services/{serviceId}/runtime-environment` | Get env vars |
| POST | `/v1/projects/{projectId}/services/{serviceId}/runtime-environment` | Set env vars |

### Jobs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/jobs/manual` | Create manual job |
| POST | `/v1/projects/{projectId}/jobs/cron` | Create cron job |
| GET | `/v1/projects/{projectId}/jobs` | List jobs |
| GET | `/v1/projects/{projectId}/jobs/{jobId}` | Get job |
| POST | `/v1/projects/{projectId}/jobs/{jobId}/run` | Run job |
| POST | `/v1/projects/{projectId}/jobs/{jobId}/build` | Start job build |
| DELETE | `/v1/projects/{projectId}/jobs/{jobId}` | Delete job |
| PATCH | `/v1/projects/{projectId}/jobs/{jobType}/{jobId}` | Patch job |

### Addons (Databases)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/addons` | Create addon |
| GET | `/v1/projects/{projectId}/addons` | List addons |
| GET | `/v1/projects/{projectId}/addons/{addonId}` | Get addon |
| GET | `/v1/projects/{projectId}/addons/{addonId}/credentials` | Get credentials |
| DELETE | `/v1/projects/{projectId}/addons/{addonId}` | Delete addon |
| POST | `/v1/projects/{projectId}/addons/{addonId}/pause` | Pause addon |
| POST | `/v1/projects/{projectId}/addons/{addonId}/resume` | Resume addon |
| POST | `/v1/projects/{projectId}/addons/{addonId}/restart` | Restart addon |
| POST | `/v1/projects/{projectId}/addons/{addonId}/reset` | Reset addon |
| POST | `/v1/projects/{projectId}/addons/{addonId}/scale` | Scale resources |
| POST | `/v1/projects/{projectId}/addons/{addonId}/backup` | Create backup |
| POST | `/v1/projects/{projectId}/addons/{addonId}/backup/{backupId}/restore` | Restore backup |
| GET | `/v1/projects/{projectId}/addons/{addonId}/backups` | List backups |
| POST | `/v1/projects/{projectId}/addons/{addonId}/network` | Update network settings |
| POST | `/v1/projects/{projectId}/addons/{addonId}/security-rules` | Update security rules |
| POST | `/v1/projects/{projectId}/addons/{addonId}/upgrade` | Upgrade version |

### Secrets

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/secrets` | Create secret group |
| GET | `/v1/projects/{projectId}/secrets` | List secret groups |
| GET | `/v1/projects/{projectId}/secrets/{secretId}` | Get secret group |
| PUT | `/v1/projects/{projectId}/secrets/{secretId}` | Update secret group |
| PATCH | `/v1/projects/{projectId}/secrets/{secretId}` | Patch secret group |
| DELETE | `/v1/projects/{projectId}/secrets/{secretId}` | Delete secret group |

Global secrets (team-level):

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/secrets` | Create global secret |
| GET | `/v1/secrets` | List global secrets |
| GET | `/v1/secrets/{secretId}` | Get global secret |

### Domains

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/domains` | Create domain |
| GET | `/v1/domains` | List domains |
| GET | `/v1/domains/{domainId}` | Get domain |
| DELETE | `/v1/domains/{domainId}` | Delete domain |
| POST | `/v1/domains/{domainId}/verify` | Verify domain |
| POST | `/v1/domains/{domainId}/subdomains` | Add subdomain |
| POST | `/v1/domains/{domainId}/subdomains/{subdomainId}/assign` | Assign to service |
| POST | `/v1/domains/{domainId}/subdomains/{subdomainId}/unassign` | Unassign |
| POST | `/v1/domains/{domainId}/subdomains/{subdomainId}/cdn/enable` | Enable CDN |
| POST | `/v1/domains/{domainId}/subdomains/{subdomainId}/cdn/disable` | Disable CDN |
| POST | `/v1/domains/{domainId}/subdomains/{subdomainId}/paths` | Add path |
| POST | `/v1/domains/{domainId}/subdomains/{subdomainId}/paths/{pathId}/assign` | Assign path |

### Templates

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/templates` | Create template |
| GET | `/v1/templates` | List templates |
| GET | `/v1/templates/{templateId}` | Get template |
| PUT | `/v1/templates/{templateId}` | Update template |
| DELETE | `/v1/templates/{templateId}` | Delete template |
| POST | `/v1/templates/{templateId}/run` | Run template |
| GET | `/v1/templates/{templateId}/runs` | List runs |
| GET | `/v1/templates/{templateId}/runs/{runId}` | Get run details |

### Pipelines

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/projects/{projectId}/pipelines` | List pipelines |
| GET | `/v1/projects/{projectId}/pipelines/{pipelineId}` | Get pipeline |
| POST | `/v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{flowId}/run` | Run release flow |
| GET | `/v1/projects/{projectId}/pipelines/{pipelineId}/release-flows/{flowId}/runs` | List flow runs |

### Volumes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/volumes` | Create volume |
| GET | `/v1/projects/{projectId}/volumes` | List volumes |
| POST | `/v1/projects/{projectId}/volumes/{volumeId}/attach` | Attach to service |
| POST | `/v1/projects/{projectId}/volumes/{volumeId}/detach` | Detach |
| POST | `/v1/projects/{projectId}/volumes/{volumeId}/backup` | Backup volume |

### Load Balancers

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/load-balancers` | Create load balancer |
| GET | `/v1/load-balancers` | List load balancers |
| GET | `/v1/load-balancers/{loadBalancerId}` | Get load balancer |
| DELETE | `/v1/load-balancers/{loadBalancerId}` | Delete load balancer |

### Cloud Providers (BYOC)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/cloud-providers/integrations` | Create integration |
| GET | `/v1/cloud-providers/integrations` | List integrations |
| POST | `/v1/cloud-providers/clusters` | Create cluster |
| GET | `/v1/cloud-providers/clusters` | List clusters |
| GET | `/v1/cloud-providers/clusters/{clusterId}` | Get cluster |
| DELETE | `/v1/cloud-providers/clusters/{clusterId}` | Delete cluster |
| GET | `/v1/cloud-providers/clusters/{clusterId}/nodes` | List nodes |

### Integrations

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/registries` | Add container registry |
| GET | `/v1/registries` | List registries |
| POST | `/v1/log-sinks` | Create log sink |
| GET | `/v1/log-sinks` | List log sinks |
| POST | `/v1/notification-integrations` | Create notification |
| GET | `/v1/notification-integrations` | List notifications |

### Preview Blueprints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/preview-blueprints` | Create preview blueprint |
| GET | `/v1/projects/{projectId}/preview-blueprints` | List preview blueprints |
| POST | `/v1/projects/{projectId}/preview-blueprints/{blueprintId}/run` | Run preview blueprint |

### Workflows

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/workflows` | Create workflow |
| GET | `/v1/projects/{projectId}/workflows` | List workflows |
| POST | `/v1/projects/{projectId}/workflows/{workflowId}/run` | Run workflow |

### AI Models

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/ai-models` | Create AI model |
| GET | `/v1/projects/{projectId}/ai-models` | List AI models |

### External Addons

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/projects/{projectId}/external-addons` | Create external addon |
| GET | `/v1/projects/{projectId}/external-addons` | List external addons |

### Tags

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/tags` | Create tag |
| GET | `/v1/tags` | List tags |

### Egress IPs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/egress-ips` | Create egress IP |
| GET | `/v1/egress-ips` | List egress IPs |

### Backup Destinations

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/backup-destinations` | Create backup destination |
| GET | `/v1/backup-destinations` | List backup destinations |

### Rollout Strategies

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/rollout-strategies` | Create rollout strategy |
| GET | `/v1/rollout-strategies` | List rollout strategies |

### Org Roles

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/org-roles` | Create org role |
| GET | `/v1/org-roles` | List org roles |

### Teams

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/teams` | Create team |
| GET | `/v1/teams` | List teams |

### Billing

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/billing/invoices` | List invoices |

### Miscellaneous

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/plans` | List available plans |
| GET | `/v1/regions` | List available regions |
| GET | `/v1/metrics` | Get metrics |
| GET | `/v1/dns-id` | Get team DNS ID |

## JavaScript Client Quick Reference

```js
import { ApiClient, ApiClientInMemoryContextProvider } from '@northflank/js-client';

const contextProvider = new ApiClientInMemoryContextProvider();
await contextProvider.addContext({ name: 'default', token: '<API_TOKEN>' });
const apiClient = new ApiClient(contextProvider);

// List projects
const { data } = await apiClient.list.projects({});

// Create service
await apiClient.create.service.combined({
  parameters: { projectId: 'my-project' },
  data: { name: 'My App', ... }
});

// Paginate all results
const all = await apiClient.list.projects.all({});
```

The JS client mirrors the API structure: `apiClient.<action>.<resource>({ parameters, data, options })`.

For JavaScript client usage docs, see `api/use-the-javascript-client.md`.
