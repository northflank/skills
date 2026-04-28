---
name: northflank
description: Deploy, manage, and automate infrastructure on Northflank — a developer platform for building, deploying, and scaling services, jobs, databases, and release workflows on Kubernetes. Use when managing Northflank projects, services, jobs, addons (databases), secrets, domains, templates (IaC), environments, preview environments, pipelines, release flows, BYOC/BYOK clusters, GPU workloads, AI sandboxes, or interacting with the Northflank API/CLI/JS client. Covers REST API, CLI (`northflank` command), and JavaScript client (`@northflank/js-client`).
---

# Northflank

> **Note:** CLI examples in this file (and the other hand-maintained references) are checked against `northflank <verb> <noun> --help`, which only confirms that flags and subcommands exist — not that the command behaves as documented at runtime. Smoke-test before relying on a snippet in production.

Northflank is a developer platform for building, deploying, and scaling workloads on Kubernetes — on Northflank Cloud, your own cloud (BYOC), or your own clusters (BYOK). It handles build, deploy, release, auto-scaling, and disaster recovery across AWS, GCP, Azure, CoreWeave, and on-prem. Core primitives: **projects** (Kubernetes namespaces), **services** (stateless workloads), **add-ons** (managed databases), **jobs** (cron/manual), **secret groups**, **volumes**, and **templates** (IaC/GitOps). Everything in the UI is also available via the REST API, CLI, and JS client.

**Base API URL:** `https://api.northflank.com/v1/`  
**Auth:** `Authorization: Bearer <token>`  
**Rate limit:** 1000 req/hr (`x-ratelimit-remaining` header)

## Before You Start

Before writing any Northflank code, verify setup:

1. **CLI or JS client?** Pick the interface that matches who's doing the work:
   - **Prefer the CLI** when *you* (the agent) are operating on the user's Northflank account on their behalf — deploying a service, tailing logs, exec-ing into a container, forwarding a port, restarting a workload, inspecting state. The CLI uses the user's existing `northflank login` session, doesn't require an extra token in the environment, and keeps one-off operations auditable.
   - **Use the JS client (`@northflank/js-client`) or REST API** when the *user* is building a feature, product, or automation **on top of** Northflank — i.e. code that will run in their app, script, or service. That's when you want a programmatic SDK, typed responses, retries, and an `NF_API_TOKEN` baked into their deployment.
   - Rule of thumb: if the artefact of the task is "the operation happened," reach for the CLI. If the artefact is "code the user keeps and runs later," reach for the SDK.

2. **CLI installed?** Check `northflank --help`. If missing:
   ```bash
   npm install -g @northflank/cli
   # or
   yarn global add @northflank/cli
   ```

3. **JS client installed?** Check `package.json` for `@northflank/js-client`. If missing:
   ```bash
   npm install @northflank/js-client
   # or
   yarn add @northflank/js-client
   ```

4. **API token set?** Check the environment for `NF_API_TOKEN` (or equivalent). If not set, tell the user to create one from their team page: **Team page → Team settings (top right) → API → Tokens → Create API token**. They also need an API role with appropriate permissions under **Team settings → API → Roles**.

5. **Project ID known?** Most operations require a `projectId`. It's the slug of the project name (e.g. `"My Project"` → `my-project`). If using the CLI, set a default with `northflank context use project` or pass it explicitly. If using the JS client, list projects with `apiClient.list.projects({})`.

## Destructive Operations — Always Confirm First

**Critical:** Before performing any destructive operation on Northflank, stop and explicitly ask the user to confirm. Do not assume prior approval transfers across operations or sessions — confirm each one individually.

Destructive operations include, at minimum:

- `delete service` / `apiClient.delete.service` — irreversible; loses container state and any service-scoped configuration
- **`delete addon` / `apiClient.delete.addon`** — **EXTRA CARE**: addons hold persistent data (databases, queues, caches). Deletion is irreversible and **destroys all data** unless the user has a recent backup. Always confirm the addon name back to the user, ask whether a backup exists, and do not proceed without an explicit "yes, delete `<addon-id>`."
- `delete volume` — destroys persistent disk contents
- `delete project` — wipes the entire namespace and every resource in it
- `delete secret` — may break running workloads that depend on those keys
- `delete job` — removes the job and its run history
- `delete template` / running a template that destroys resources
- `delete domain` / `delete dns-record`
- `delete cluster` (BYOC/BYOK) — affects every workload on that cluster
- Any `patch` / `update` that **shrinks** persistent state (e.g. lowering replica count on an addon — Northflank rejects this anyway, but never attempt it as a workaround)
- Force-cancelling a running job, build, or pipeline that the user did not start

Confirmation rules:

1. State what you are about to delete, by exact ID, and what data/state goes with it.
2. For addons, additionally state: the addon type, its size, and a reminder that the data is unrecoverable without a backup.
3. Wait for an unambiguous "yes" / "delete" / "go ahead" tied to that specific resource. Treat "ok," silence, or generic agreement as insufficient.
4. If the user authorised one delete, do **not** chain into deleting related resources (e.g. "the service and its addon and its volume") without re-confirming each one.
5. Prefer reversible alternatives when they fit the user's goal: `pause service` instead of `delete service`, snapshot/backup an addon before deleting, etc.

## CLI Essentials

### Install, login, and pick a context

```bash
npm i -g @northflank/cli
northflank login
northflank context ls
northflank context use
northflank context use project
```

- `northflank login` creates a context and can open a browser to select or create a token.
- Use `northflank context use project|service|job` to set defaults so later commands can omit repeated IDs.
- Use `northflank command-overview` to see the command tree.

### Inspect resources

```bash
# Prompts for missing values interactively
northflank get service

# Explicit project and service
northflank get service --projectId <PROJECT_ID> --serviceId <SERVICE_ID>
```

The CLI is interactive by default. If IDs are omitted it will usually prompt for them.

### Execute commands in a running container

```bash
# Interactive shell session
northflank exec service

# One-off command
northflank exec service --cmd "ls -lah /app"

# Run as a specific user
northflank exec service --user root --cmd id
```

Use `northflank exec job` for jobs instead of services.

### Forward a private service or addon locally

```bash
sudo northflank forward service --projectId <PROJECT_ID> --serviceId <SERVICE_ID>
sudo northflank forward addon --projectId <PROJECT_ID> --addonId <ADDON_ID>

# If sudo path/context resolution causes issues
sudo --preserve-env=PATH,HOME bash -c 'northflank forward service --projectId <PROJECT_ID> --serviceId <SERVICE_ID>'
```

- Add `--skipHostnames` if rootless forwarding is acceptable and only IP/port access is needed.
- Use `northflank forward all --projectId <PROJECT_ID>` to open all project tunnels at once.

### Create resources from JSON or YAML

```bash
northflank create project --help
northflank create project --file ./project.yaml
```

CLI resource definitions follow the same shape as the API request bodies.

## JS Client Essentials

### Client setup

```js
import { ApiClient, ApiClientInMemoryContextProvider } from '@northflank/js-client';

const contextProvider = new ApiClientInMemoryContextProvider();
await contextProvider.addContext({
  name: 'default',
  token: process.env.NF_API_TOKEN,
});

// Pass true as second arg to throw on HTTP errors
const apiClient = new ApiClient(contextProvider, true);
```

All methods follow the pattern:
```
apiClient.{verb}.{resource}({ parameters, data, options })
```
- `parameters` — path params (e.g. `projectId`, `serviceId`)
- `data` — request body (for create/update)
- `options` — query params (for filtering, pagination)

### Create a deployment service (from image)

```js
const result = await apiClient.create.service.deployment({
  parameters: { projectId: 'my-project' },
  data: {
    name: 'my-api',
    billing: { deploymentPlan: 'nf-compute-10' },
    deployment: {
      instances: 1,
      external: { imagePath: 'nginx:latest' },
      docker: { configType: 'default' },
    },
    ports: [{ name: 'http', internalPort: 80, public: true, protocol: 'HTTP' }],
  },
});
const serviceId = result.data.id; // 'my-api'
```

Common plan sizes: `nf-compute-10` (0.1 vCPU/256MB), `nf-compute-50` (0.5/1GB), `nf-compute-100-2` (1/2GB), `nf-compute-200` (2/4GB). See [Compute & GPU Plans](#compute--gpu-plans) for the full table, GPU SKUs, and how to query the live list.

### Create a combined service (build + deploy from Git)

```js
await apiClient.create.service.combined({
  parameters: { projectId: 'my-project' },
  data: {
    name: 'my-app',
    billing: { deploymentPlan: 'nf-compute-50' },
    vcsData: {
      projectUrl: 'https://github.com/org/repo',
      projectType: 'github',
      projectBranch: 'main',
    },
    buildSettings: {
      dockerfile: {
        buildEngine: 'buildkit',
        dockerFilePath: '/Dockerfile',
        dockerWorkDir: '/',
      },
    },
    deployment: { instances: 1 },
    ports: [{ name: 'app', internalPort: 3000, public: true, protocol: 'HTTP' }],
  },
});
```

### Get / list services

```js
// List all services in a project
const { data } = await apiClient.list.services({ parameters: { projectId: 'my-project' } });
const services = data.services;

// Get a single service
const svc = await apiClient.get.service({
  parameters: { projectId: 'my-project', serviceId: 'my-api' },
});
// Deployment rollout state: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
// ('COMPLETED' = rolled out and serving, NOT "exited")
console.log(svc.data.status.deployment?.status);
// Build state (only present for combined/build services):
// 'QUEUED' | 'PENDING' | 'STARTING' | 'BUILDING' | 'SUCCESS' | 'FAILURE' | ...
console.log(svc.data.status.build?.status);
// Pause is a separate boolean — not encoded in either status above
console.log(svc.data.servicePaused);
```

### Execute a command in a service

```js
// Short-lived command — returns stdout/stderr/exitCode
const result = await apiClient.exec.execServiceCommand(
  { projectId: 'my-project', serviceId: 'my-api' },
  { command: ['ls', '-lah', '/app'] },
);
console.log(result.stdOut);
console.log(result.commandResult.exitCode); // 0 = success

// Long-running / interactive session
const { exec } = apiClient;
const session = await exec.execServiceSession(
  { projectId: 'my-project', serviceId: 'my-api' },
  { shell: 'bash' },
);
session.stdErr.on('data', (chunk) => console.error(chunk));
session.stdIn.write('echo hello\n');
const result2 = await session.waitForCommandResult();
```

For more command-execution details, see `references/api/execute-command.md`.

### Stream logs from a service

```js
const logsClient = await apiClient.get.service.logTail({
  parameters: { projectId: 'my-project', serviceId: 'my-api' },
  options: { lineLimit: 20 },
});

logsClient.on('logs-received', (lines) => {
  lines.forEach((l) => console.log(`[${l.ts.toISOString()}] ${l.log}`));
});
logsClient.on('error', console.error);
await logsClient.start();
// Call await logsClient.stop() when done
```

### Pause / resume / restart / delete a service

```js
const params = { parameters: { projectId: 'my-project', serviceId: 'my-api' } };

await apiClient.pause.service(params);    // stops billing, keeps config
await apiClient.resume.service(params);   // restarts from paused
await apiClient.restart.service(params);  // rolling restart (keeps running)
await apiClient.delete.service(params);   // permanent, irreversible
```

### Update a service (patch)

```js
// Update image or instance count
await apiClient.patch.service.deployment({
  parameters: { projectId: 'my-project', serviceId: 'my-api' },
  data: {
    deployment: {
      instances: 3,
      external: { imagePath: 'myregistry/myapp:v2' },
    },
  },
});
```

### Create an addon (database)

```js
const { data } = await apiClient.create.addon({
  parameters: { projectId: 'my-project' },
  data: {
    name: 'my-postgres',
    type: 'postgresql',    // postgresql | mongodb | mysql | redis | rabbitmq | minio | memcached
    version: '16',
    billing: {
      deploymentPlan: 'nf-compute-10',
      storage: 4096,       // MB
      replicas: 1,
    },
    tlsEnabled: true,
  },
});
const addonId = data.id; // 'my-postgres'
```

### Get addon credentials

```js
const creds = await apiClient.get.addon.credentials({
  parameters: { projectId: 'my-project', addonId: 'my-postgres' },
});
// creds.data.username, creds.data.password, creds.data.connectionString, etc.
console.log(creds.data.connectionString);
```

### Manage secret groups

Secret groups link add-on connection strings to service env vars, and/or hold arbitrary key-value secrets.

```js
// Create a secret group with a static env var and a linked addon credential
await apiClient.create.secret({
  parameters: { projectId: 'my-project' },
  data: {
    name: 'app-secrets',
    secretType: 'environment',   // 'environment' | 'build-arg' | 'global'
    priority: 10,
    data: {
      NODE_ENV: 'production',
      API_KEY: 'supersecret',
    },
    addonDependencies: [
      {
        addonId: 'my-postgres',
        keys: [
          { keyName: 'POSTGRES_URI', aliases: ['DATABASE_URL'] },
        ],
      },
    ],
    restrictions: {
      restricted: true,
      nfObjects: [{ id: 'my-api', type: 'service' }],
    },
  },
});

// List secrets in project
const { data } = await apiClient.list.secrets({ parameters: { projectId: 'my-project' } });

// Update a secret group (add/change key)
await apiClient.patch.secret({
  parameters: { projectId: 'my-project', secretId: 'app-secrets' },
  data: { data: { FEATURE_FLAG: 'true' } },
});
```

### Pagination

List endpoints return 50 items by default. Two options:

```js
// Fetch all pages automatically (multiple API calls)
const all = await apiClient.list.services.all({ parameters: { projectId: 'my-project' } });

// Manual next-page
const page1 = await apiClient.list.services({ parameters: { projectId: 'my-project' } });
if (page1.pagination?.hasNextPage) {
  const page2 = await page1.pagination.getNextPage();
}
```

### Error handling

```js
// Option 1: check result.error (client does NOT throw by default)
const result = await apiClient.get.service({ parameters: { projectId, serviceId } });
if (result.error) {
  console.error(result.error.status, result.error.message);
}

// Option 2: init client with throwOnError = true
const apiClient = new ApiClient(contextProvider, true);
try {
  await apiClient.get.service({ parameters: { projectId, serviceId } });
} catch (err) {
  console.error(err);
}
```

### Rate limit headers

```js
const { rawResponse } = await apiClient.get.service({ parameters: { projectId, serviceId } });
const remaining = rawResponse.headers.get('x-ratelimit-remaining');
const reset = rawResponse.headers.get('x-ratelimit-reset'); // seconds
```

## Compute & GPU Plans

Full live tables (every compute plan, GPU SKU, pricing, and per-region GPU availability) are auto-generated into [references/plans.md](references/plans.md) by `scripts/generate_references.js`. Re-run with `--force` to refresh after Northflank ships new SKUs or price changes. The underlying endpoints are public — no auth needed:

```bash
curl -s https://api.northflank.com/v1/plans   | jq '.data.plans[]   | {id, cpu: .cpuResource, ramMB: .ramResource, hr: .amountPerHour}'
curl -s https://api.northflank.com/v1/regions | jq '.data.regions[] | {id, gpus: (.gpuDevices // [] | map(.id))}'
```

JS client / CLI equivalents: `apiClient.list.plans({})` / `apiClient.list.regions({})` and `northflank list plans` / `northflank list regions`.

### Compute plan slugs

Format: `nf-compute-<cpu*100>-<ram_gb>` (newer, explicit) or `nf-compute-<cpu*100>` (legacy, RAM implied). Common picks:

- `nf-compute-10` — 0.1 vCPU / 256 MB (~$2.70/mo) — sidecars, light workers
- `nf-compute-50` — 0.5 vCPU / 1 GB (~$12/mo) — small APIs, cron jobs
- `nf-compute-200` — 2 vCPU / 4 GB (~$48/mo) — typical production service
- `nf-compute-400-16` — 4 vCPU / 16 GB (~$144/mo) — also valid as `buildPlan`

`buildPlan` only accepts plans with 4+ vCPU and defaults to `nf-compute-400-16` if omitted. See [references/plans.md](references/plans.md) for all 20 SKUs.

### GPU plan slugs

Format: `nf-gpu-<gpuType>-<count>g` (the `g` suffix is literal, not a unit). The plan bundles CPU/RAM around the GPU — you do **not** combine an `nf-compute-*` plan with a separate GPU. Worked example:

```js
data: {
  billing: { deploymentPlan: 'nf-gpu-a100-80-1g' },  // 1× A100 80GB
  deployment: {
    gpu: { enabled: true, gpuType: 'a100-80', gpuCount: 1 },
    // ...
  },
}
```

- `gpuType` is the model id (lowercase, no `nvidia-` prefix). Currently: `l4-24`, `a100-40`, `a100-80`, `h100-80`, `h200-141`, `b200-180`.
- `gpuCount` must be one of the model's `countOptions` (typically `1, 2, 4, 8`; H200 and B200 are 8-only). Invalid counts are rejected.
- The `gpu` block can sit under `deployment.gpu` or `billing.gpu`; Northflank's own templates use `deployment.gpu`.
- GPU billing is per GPU per hour, on top of the bundled compute. Pricing and per-region availability live in [references/plans.md](references/plans.md).

For BYOC clusters, GPU node types come from the cloud provider — query with `apiClient.list.cloudProviders.nodeTypes({ options: { hasGpu: true } })` and define custom resource plans (see `references/guides/bring-your-own-cloud.md#create-custom-resource-plans`). Timeslicing is supported on BYOC, not on managed cloud.

For Northflank-published GPU base images (PyTorch + CUDA + Jupyter pre-installed), pull from `europe-docker.pkg.dev/northflank/public/...` instead of building from raw `pytorch/pytorch:*`.

## Common Patterns

### Deploy and watch until healthy

```js
await apiClient.create.service.deployment({ parameters: { projectId }, data: { ...serviceSpec } });

// Poll until the deployment has rolled out
let status;
do {
  await new Promise((r) => setTimeout(r, 2000));
  const svc = await apiClient.get.service({ parameters: { projectId, serviceId: 'my-api' } });
  status = svc.data.status.deployment?.status;
  if (status === 'FAILED') throw new Error('Deployment failed');
} while (status !== 'COMPLETED');
```

### Auto-scaling configuration (in create/patch data)

```js
data: {
  deployment: {
    instances: 1,
    autoscaling: {
      horizontal: {
        enabled: true,
        minReplicas: 1,
        maxReplicas: 10,
        cpu: { enabled: true, thresholdPercentage: 70 },
        rps: { enabled: true, thresholdValue: 500 },
      },
    },
  },
}
```

### Run a template

```js
await apiClient.run.template({
  parameters: { templateId: 'my-template' },
  data: {
    arguments: {
      REGION: 'europe-west',
      IMAGE: 'myapp:latest',
    },
  },
});
```

### Create a cron job

```js
await apiClient.create.job({
  parameters: { projectId: 'my-project' },
  data: {
    name: 'db-migrate',
    billing: { deploymentPlan: 'nf-compute-10' },
    deployment: {
      external: { imagePath: 'myapp:latest' },
      docker: { configType: 'default' },
    },
    settings: {
      cron: { schedule: '0 2 * * *' },  // present = cron job
      concurrencyPolicy: 'Forbid',
    },
    runtimeEnvironment: { MIGRATE: 'true' },
  },
});

// Run it manually now
await apiClient.start.job.run({ parameters: { projectId: 'my-project', jobId: 'db-migrate' } });
```

## Gotchas

1. **IDs are slugified names** — `"My App"` becomes `my-api` (slug). Use IDs in API calls, not display names.
2. **Addon storage and replicas** can only increase, never decrease after creation.
3. **Secret groups with addon links** auto-update connection strings when add-ons rotate credentials or change.
4. **Port names** max 8 chars, must start with a letter.
5. **Rate limit is 1000/hr** — batch operations, check `x-ratelimit-remaining`.
6. **`put.*` methods use upsert semantics** — create if missing, update if present. Useful for idempotent IaC.
7. **Pause ≠ delete** — paused services stop billing for compute but keep config and volumes.
8. **`northflank exec --cmd "..."` swallows output without a TTY** — in CI, agent harnesses, or anything wrapped in `bash -c`, stdout/stderr are silently discarded. Wrap with `script -q /dev/null northflank exec ...` (macOS/BSD) or `script -qfc 'northflank exec ...' /dev/null` (Linux) to capture output.
9. **Service `status === "COMPLETED"` means "deployment rolled out", not "process exited"** — when polling `svc.data.status.deployment.status` (or top-level `status.status` in `northflank get service -o json`), `COMPLETED` indicates the container is up and serving. The natural reading is the opposite, so don't treat it as a terminal/finished state.

## Reference Cheat Sheet

| I want to... | Check here |
|---|---|
| Deploy a service from a pre-built image | `apiClient.create.service.deployment` / `northflank create service deployment` |
| Build and deploy a service from a Git repo | `apiClient.create.service.combined` / `northflank create service combined`; `references/guides/build.md` |
| Run a one-off command or shell session in a container | `apiClient.exec.execServiceCommand` / `northflank exec service`; `references/api/execute-command.md` |
| Tail or fetch logs from a service, job, or addon | `apiClient.get.service.logTail` / `northflank get service logs -f`; `references/api/log-tailing.md` |
| Forward a private service or addon port to localhost | `northflank forward service`; `references/api/forwarding.md` |
| Provision a managed database (Postgres, Redis, Mongo, MySQL…) | `apiClient.create.addon` / `northflank create addon`; `references/guides/databases-and-persistence.md` |
| Wire database credentials into a service via secret groups | `apiClient.create.secret` with `addonDependencies` / `northflank create secret`; `references/api/project/secrets/_index.md` |
| Create a cron or manual job | `apiClient.create.job` with `settings.cron` / `northflank create job cron|manual`; `references/api/project/jobs/_index.md` |
| Configure autoscaling, replicas, or resource sizing | `deployment.autoscaling.horizontal` field; `references/guides/scale.md` |
| Pick a compute or GPU plan (sizes, pricing, regions) | [references/plans.md](references/plans.md) — auto-generated from `/v1/plans` and `/v1/regions`; slug patterns in [Compute & GPU Plans](#compute--gpu-plans) |
| Set up CI/CD: pipelines, release flows, preview environments | `references/guides/release.md` |
| Define infrastructure as code (templates, GitOps, OpenTofu) | `apiClient.create.template` / `northflank create template`; `references/guides/infrastructure-as-code.md` |
| Add a custom domain with TLS, CDN, or path routing | `references/guides/domains.md`; `references/api/team/domains/_index.md` |
| Attach persistent storage / volumes to a service | `apiClient.create.volume` / `northflank create volume`; `references/api/project/volumes/_index.md` |
| Upload or download files into a running container | `northflank upload service file` / `download service file`; `references/api/copy-files.md` |
| Configure ports, network policies, egress IPs, Tailscale | `references/guides/network.md` |
| Set up log sinks, metrics, alerts, health checks | `references/guides/observe.md` |
| Run GPU workloads | `references/guides/gpu-workloads.md` |
| Spin up an AI sandbox / microVM | A sandbox is just a service — use `apiClient.create.service.deployment` / `northflank create service deployment` (no `sandbox` verb exists); `references/guides/sandboxes.md` |
| Deploy on your own cluster (BYOC/BYOK on AWS/GCP/Azure/CoreWeave) | `references/guides/bring-your-own-cloud.md` |
| Manage teams, RBAC, SSO/MFA, API tokens | `references/guides/secure.md`, `references/guides/collaborate.md` |
| Pause, resume, restart, or delete a resource | `apiClient.{pause,resume,restart,delete}.service` / `northflank {pause,resume,restart,delete} service` — re-read **Destructive Operations** before any delete |

## Reference Files

### Platform References
- [references/api-overview.md](references/api-overview.md) — REST API base URL, auth, pagination, endpoint tables
- [references/cli.md](references/cli.md) — CLI install, contexts, common commands, file transfer
- [references/js-client.md](references/js-client.md) — JS client quickstart and usage pointers
- [references/plans.md](references/plans.md) — auto-generated compute & GPU plans + region availability (live from `/v1/plans` and `/v1/regions`)

### API Endpoint References
- [references/api/_index.md](references/api/_index.md) — master index of all endpoints
- [references/api/use-the-cli.md](references/api/use-the-cli.md) — CLI install, login, contexts, and command model
- [references/api/use-the-api.md](references/api/use-the-api.md) — REST API usage guide
- [references/api/use-the-javascript-client.md](references/api/use-the-javascript-client.md) — JS client usage guide
- [references/api/project/services/_index.md](references/api/project/services/_index.md) — service endpoints
- [references/api/project/addons/_index.md](references/api/project/addons/_index.md) — addon endpoints
- [references/api/project/jobs/_index.md](references/api/project/jobs/_index.md) — job endpoints
- [references/api/project/secrets/_index.md](references/api/project/secrets/_index.md) — project secret endpoints
- [references/api/project/volumes/_index.md](references/api/project/volumes/_index.md) — volume endpoints
- [references/api/team/templates/_index.md](references/api/team/templates/_index.md) — template endpoints
- [references/api/team/domains/_index.md](references/api/team/domains/_index.md) — domain endpoints
- [references/api/team/projects/_index.md](references/api/team/projects/_index.md) — project endpoints
- [references/api/execute-command.md](references/api/execute-command.md) — exec command details
- [references/api/log-tailing.md](references/api/log-tailing.md) — log tailing details
- [references/api/forwarding.md](references/api/forwarding.md) — port-forwarding details
- [references/api/copy-files.md](references/api/copy-files.md) — file upload/download details
- [references/api/retrieve-metrics.md](references/api/retrieve-metrics.md) — metrics retrieval
- [references/api/introduction.md](references/api/introduction.md) — API/CLI/JS client overview

### How-To Guides
- [references/guides/_index.md](references/guides/_index.md) — index of all guide topics
- [references/guides/getting-started.md](references/guides/getting-started.md) — intro, first project, build & deploy, architecture patterns
- [references/guides/run.md](references/guides/run.md) — services, jobs, deployment sources, regions, SSH, container access
- [references/guides/build.md](references/guides/build.md) — Dockerfile, buildpacks, Git integration, build arguments
- [references/guides/scale.md](references/guides/scale.md) — instances, CPU/memory, storage, autoscaling
- [references/guides/release.md](references/guides/release.md) — CI/CD, pipelines, release flows, preview environments, environments
- [references/guides/databases-and-persistence.md](references/guides/databases-and-persistence.md) — addons, volumes, backups, HA, migration
- [references/guides/secure.md](references/guides/secure.md) — secrets, RBAC, SSO/MFA, API access, secret files
- [references/guides/network.md](references/guides/network.md) — ports, security policies, load balancers, egress IPs, Tailscale
- [references/guides/observe.md](references/guides/observe.md) — logs, metrics, health checks, alerts, log sinks, notifications
- [references/guides/infrastructure-as-code.md](references/guides/infrastructure-as-code.md) — templates, GitOps, template nodes, GitHub Actions, OpenTofu
- [references/guides/domains.md](references/guides/domains.md) — add/verify domains, TLS, CDN, path routing, registrar guides
- [references/guides/bring-your-own-cloud.md](references/guides/bring-your-own-cloud.md) — BYOC/BYOK setup for AWS, GCP, Azure, Civo, CoreWeave, OCI
- [references/guides/collaborate.md](references/guides/collaborate.md) — teams, organizations, RBAC, multi-tenancy models
- [references/guides/gpu-workloads.md](references/guides/gpu-workloads.md) — GPU deployment and optimization
- [references/guides/sandboxes.md](references/guides/sandboxes.md) — AI sandboxes, microVMs, GVisor, pre-warmed pools
- [references/guides/production-workloads.md](references/guides/production-workloads.md) — production readiness, operations, release
- [references/guides/billing.md](references/guides/billing.md) — payment, invoices, credits, pricing
- [references/guides/migrate-from-heroku.md](references/guides/migrate-from-heroku.md) — Heroku migration walkthrough
- [references/guides/overview.md](references/guides/overview.md) — high-level Northflank overview
