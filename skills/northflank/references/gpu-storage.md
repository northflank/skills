# Managed GPU storage and request errors

Use this reference for managed GPU service, job, or sandbox requests. BYOC uses its own node capacity and custom resource plans.

## Match the GPU plan and configuration

Set `deployment.gpu.enabled: true`. Put `gpuType` and `gpuCount` under `deployment.gpu.configuration`. Set `billing.deploymentPlan` to `nf-gpu-<gpuType>-<gpuCount>g`, replacing underscores with hyphens in the plan ID. Keep the original GPU type in `deployment.gpu.configuration.gpuType`. Check the target region's `gpuDevices[].countOptions` through `GET /v1/regions`.

If a plan mismatch error names an expected plan, use that exact plan. A CPU plan or another GPU plan with identical CPU/RAM does not match.

## Ephemeral storage defaults

Ephemeral storage is temporary disk space. `deployment.storage.ephemeralStorage.storageSize` is optional for managed GPU workloads. The API sets it to the allocation per GPU multiplied by `gpuCount`, overriding supplied values. GPU type or count changes recalculate the allocation. Values use MiB.

| GPU type | Allocation per GPU (MiB) |
| --- | --- |
| `h100-80` | 512000 |
| `rtx_pro_6000-96` | 1228800 |
| `a100-40`, `a100-80`, `l4-24` | 256000 |
| `h200-141`, `b200-180` | 1280000 |

H100 with eight GPUs requires `nf-gpu-h100-80-8g` and receives `storageSize: 4096000`. RTX PRO 6000 with eight GPUs requires `nf-gpu-rtx-pro-6000-96-8g` and receives `storageSize: 9830400`.

Omit ephemeral storage on API versions with automatic GPU allocation. Older API versions can require these values explicitly. Do not derive ephemeral storage from GPU memory, system RAM, or `shmSize`.

## Recover from an error

On older API versions, if the error says `exceeds maximum ephemeral storage capacity` or `does not meet the minimum ephemeral storage`, set the exact allocation. Both smaller and larger values fail on those versions. Older errors label these numbers as `MB`; the API field uses MiB.

If the error says runtime ephemeral storage exceeds the project allowance, first check GPU enablement, nested configuration, and the plan. Do not lower GPU storage to the CPU quota or request a quota increase before checking the request. CPU requests use account/project quotas.

Shared memory (`deployment.storage.shmSize`) uses system RAM and is optional. For managed GPU workloads, the API defaults it to system RAM per GPU multiplied by `gpuCount`. Smaller explicit values are preserved and values above that limit are capped. Changing the GPU type or count reapplies this rule to the existing value. CPU and BYOC workloads retain the 64 MiB default. Shared memory, GPU memory, ephemeral storage, and persistent volume size are separate resources.

If the corrected request still fails, report the error, region, GPU type/count, plan ID, and storage size to support. Do not include credentials or keep retrying the unchanged request.

See [GPU storage in the docs](https://northflank.com/docs/v1/application/billing/resource-plans-and-quotas#gpu-storage) and [GPU examples](https://northflank.com/docs/v1/application/sandboxes/examples#create-a-gpu-sandbox).
