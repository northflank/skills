# Sandboxes

Generated from 5 application pages listed in `llms.txt`.

## Pages

- [Configure and manage sandboxes](#configure-and-manage-sandboxes)
- [Examples](#examples)
- [Quickstart](#quickstart)
- [Sandboxes in your own cloud](#sandboxes-in-your-own-cloud)
- [Sandboxes on Northflank cloud](#sandboxes-on-northflank-cloud)

## Configure and manage sandboxes

Source: https://northflank.com/docs/v1/application/sandboxes/configure-and-manage-sandboxes.md

Manage the lifecycle of a running sandbox: pause it to stop compute charges, resume it, resize it, copy files in and out, watch what it is doing, and delete it when you are finished.

Every example on this page assumes you have an initialised `apiClient` and a `sandboxId`. See the [quickstart](sandboxes.md#quickstart) if you do not.

### Configure and manage sandboxes: Pause and resume a sandbox

Pausing stops compute billing and ends any running processes and terminal sessions. Configuration is kept, and data on an attached volume survives.

> [!warning] Pausing deletes ephemeral data
>
> Before pausing, copy files that you need to keep to an attached volume. Anything written only to ephemeral storage is lost when the sandbox pauses. See [create a sandbox with persistent storage](sandboxes.md#examples-create-a-sandbox-with-persistent-storage).

Northflank has dedicated pause and resume endpoints, which are the calls to reach for:

JavaScriptPython
```javascript
await apiClient.pause.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
});
```

```python
client.pause.service(project_id="your-project-id", service_id=sandbox_id)

# Pausing settles asynchronously, so wait for the service to report the
# paused state before resuming it, or the resume can race the pause.
client.helpers.wait_for_service_paused(
    project_id="your-project-id", service_id=sandbox_id
)
```

Scaling to zero instances has the same billing effect and is useful when you are already adjusting scale, but `pause` states the intent and is what the dashboard and CLI use.

#### Configure and manage sandboxes: Resume

Resume takes a body, which can be empty. Pass overrides in it if you want to change settings as the sandbox comes back up, then wait for it to report `COMPLETED`:

JavaScriptPython
```javascript
// Resuming a sandbox that is not paused returns an error, so check the
// status first if you are unsure of its state.
await apiClient.resume.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  data: {},
});

async function waitForReady() {
  while (true) {
    const svc = await apiClient.get.service({
      parameters: {
        projectId: 'your-project-id',
        serviceId: sandboxId,
      },
    });

    const status = svc.data?.status?.deployment?.status;
    if (status === 'COMPLETED') return;
    if (status === 'FAILED') throw new Error('Sandbox failed to resume');

    await new Promise((r) => setTimeout(r, 1000));
  }
}

await waitForReady();
```

```python
# Resuming a sandbox that is not paused returns an error, so check the
# status first if you are unsure of its state.
client.resume.service(
    project_id="your-project-id",
    service_id=sandbox_id,
    data={},
)

client.helpers.wait_for_service_ready(
    project_id="your-project-id", service_id=sandbox_id
)
```

Files on an attached volume come back exactly as they were. Ephemeral storage starts empty.

### Configure and manage sandboxes: Scale resources

Change the CPU and memory available to a sandbox by scaling it to a different deployment plan. The scale endpoint takes `deploymentPlan`, `instances`, and `storage`, so you can change allocation and instance count in one call.

JavaScriptPython
```javascript
await apiClient.scale.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  data: {
    // The sandbox restarts to pick up the new plan, so expect a brief
    // interruption rather than a live resize.
    deploymentPlan: 'nf-compute-400',
  },
});
```

```python
client.scale.service(
    project_id="your-project-id",
    service_id=sandbox_id,
    # The sandbox restarts to pick up the new plan, so expect a brief
    # interruption rather than a live resize.
    data={"deploymentPlan": "nf-compute-400"},
)
```

Scaling is the call that changes a plan. The update deployment endpoint changes the deployment source, such as the image or Docker configuration, and does not accept billing fields.

See [resource plans](sandboxes.md#sandboxes-on-northflank-cloud-resource-plans).

### Configure and manage sandboxes: Copy files to and from a sandbox

Copy files and directories between your machine and a running sandbox. Both SDKs stream the transfer over the same exec connection used to run commands, so the sandbox image needs `tar` on its `PATH`.

JavaScriptPython
```javascript
await apiClient.upload.service.files(
  {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  {
    localPath: './script.py',
    remotePath: '/workspace',
  }
);

await apiClient.download.service.files(
  {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  {
    localPath: './results',
    remotePath: '/workspace/results',
  }
);
```

```python
# A local file with no remote_path lands in the container's working
# directory under its own name. A remote_path with a file extension
# renames it at the destination.
client.files.upload(
    project_id="your-project-id",
    service_id=sandbox_id,
    local_path="./script.py",
    remote_path="/workspace",
)

# Returns a CopyResult with direction, is_directory, source, and target.
result = client.files.download(
    project_id="your-project-id",
    service_id=sandbox_id,
    remote_path="/workspace/results",
    local_path="./results",
)

print(result.target)
```

Directories are copied recursively. A missing local path on upload, or a missing remote path on download, fails before any data is transferred. Both calls take a `timeout` in seconds, which defaults to 300 in Python.

Pulling large artefacts is usually faster from inside the sandbox. Exec a `curl` or `git clone` against the source rather than routing the bytes through your own machine.

See [copy files](../api/copy-files.md) for the CLI equivalent.

### Configure and manage sandboxes: View sandbox logs

Stream output from a running sandbox.

JavaScriptPython
```javascript
const parameters = {
  projectId: 'your-project-id',
  serviceId: sandboxId,
};
const options = { lineLimit: 100 };

const logsClient = await apiClient.get.service.logTail({ parameters, options });

logsClient.on('logs-received', (logLines) => {
  logLines.forEach((l) => console.log(l.log));
});

logsClient.on('error', (error) => console.log('error', error));

// Lines arrive batched, either at 32.7kb or once per second.
// Call await logsClient.stop() to close the connection.
await logsClient.start();
```

```python
# A context manager, so the connection always closes.
with client.logs.tail_service_logs(
    project_id="your-project-id",
    service_id=sandbox_id,
    recv_timeout=30.0,
) as tail:
    for line in tail:
        print(line.ts, line.log)
```

#### Configure and manage sandboxes: Fetch a recent range

The Python SDK also fetches a fixed range without holding a connection open. It returns `LogLine` objects with `ts`, `log`, and `container_id`:

```python
lines = client.logs.fetch_service_logs(
    project_id="your-project-id",
    service_id=sandbox_id,
    line_limit=100,
    direction="backward",
    # text_includes="error" filters server-side, which is much cheaper
    # than pulling everything and filtering locally.
)

for line in lines:
    print(line.ts, line.log)
```

See [log tailing](../api/log-tailing.md) for the full set of options and events.

### Configure and manage sandboxes: Monitor resource usage

Check CPU, memory, and network usage for a sandbox with `get.service.metrics`.

JavaScriptPython
```javascript
const metrics = await apiClient.get.service.metrics({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  options: {
    // ISO timestamp plus a duration in seconds. This covers the last hour.
    startTime: new Date(Date.now() - 3600_000).toISOString(),
    duration: 3600,
  },
});

console.log(metrics.data);
```

```python
from datetime import datetime, timedelta, timezone

metrics = client.get.service.metrics(
    project_id="your-project-id",
    service_id=sandbox_id,
    query_type="range",
    # METRIC_TYPES is exported from northflank with every valid name.
    metric_types=["cpu", "memory"],
    # Accepts native datetime objects. This covers the last hour.
    start_time=datetime.now(timezone.utc) - timedelta(hours=1),
)

print(metrics.data)
```

See [metrics](../api/retrieve-metrics.md) for the response shape, and [observability on Northflank](observe.md#observability-on-northflank) for dashboards and alerting.

### Configure and manage sandboxes: Delete a sandbox

> [!warning] Deletion cannot be undone
>
> Deleting a sandbox destroys the service. Deleting its volume destroys the data on it permanently, with no way to recover it. Copy out anything you need first.

Delete the service to remove the sandbox.

JavaScriptPython
```javascript
await apiClient.delete.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
});
```

```python
client.delete.service(project_id="your-project-id", service_id=sandbox_id)
```

#### Configure and manage sandboxes: Delete an attached volume

A volume is a separate resource and outlives the sandbox it was attached to. A volume cannot be deleted while it is still attached, so detach it first, delete the service, then delete the volume.

JavaScriptPython
```javascript
await apiClient.detach.volume({
  parameters: {
    projectId: 'your-project-id',
    volumeId: volumeId,
  },
  data: {
    nfObject: { id: sandboxId, type: 'service' },
  },
});

await apiClient.delete.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
});

// Detaching settles asynchronously, so this can return 409 while it is
// still in progress. Wait a few seconds and retry. 404 or 410 means the
// volume is already gone.
await apiClient.delete.volume({
  parameters: {
    projectId: 'your-project-id',
    volumeId: volumeId,
  },
});
```

```python
client.detach.volume(
    project_id="your-project-id",
    volume_id=volume_id,
    data={"nfObject": {"id": sandbox_id, "type": "service"}},
)

client.delete.service(project_id="your-project-id", service_id=sandbox_id)

# Detaching settles asynchronously, so this can return 409 while it is
# still in progress. Wait a few seconds and retry. 404 or 410 means the
# volume is already gone.
client.delete.volume(project_id="your-project-id", volume_id=volume_id)
```

If you only want to stop paying for compute, [pause the sandbox](sandboxes.md#configure-and-manage-sandboxes-pause-and-resume-a-sandbox) instead of deleting it.

### Configure and manage sandboxes: Next steps

- [Sandbox examples: Deep dives into GPUs, volumes, exposed ports, and coding agents.](sandboxes.md#examples)
- [Sandboxes on Northflank cloud: Resource plans, GPU plans, regions, and billing on managed infrastructure.](sandboxes.md#sandboxes-on-northflank-cloud)
- [Sandboxes in your own cloud: Run sandboxes on your own AWS, GCP, Azure, or other cloud infrastructure.](sandboxes.md#sandboxes-in-your-own-cloud)

## Examples

Source: https://northflank.com/docs/v1/application/sandboxes/examples.md

Worked examples for common sandbox patterns: persistent storage, GPUs, exposed ports, and coding agents.

Each example builds on the [quickstart](sandboxes.md#quickstart) and assumes you already have an initialised `apiClient` and a project ID.

### Examples: Create a sandbox with persistent storage

Ephemeral storage is wiped whenever a sandbox restarts or pauses. Attach a volume when you need files to survive.

Create the volume first, then attach it as the service is created. Volumes are attached at creation time through `createOptions.volumesToAttach`.

JavaScriptPython
```javascript
const storageSandboxId = `sandbox-${crypto.randomUUID().split('-')[4]}`;
const volumeName = `data-${storageSandboxId}`;

await apiClient.create.volume({
  parameters: {
    projectId: 'your-project-id',
  },
  data: {
    name: volumeName,
    mounts: [
      {
        containerMountPath: '/workspace',
      },
    ],
    spec: {
      accessMode: 'ReadWriteMany',
      storageClassName: 'nf-multi-rw',
      storageSize: 10240, // 10 GiB
    },
  },
});

await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-project-id',
  },
  data: {
    name: storageSandboxId,
    billing: {
      deploymentPlan: 'nf-compute-200',
    },
    deployment: {
      instances: 1,
      docker: {
        configType: 'customCommand',
        customCommand: 'sleep infinity',
      },
      external: {
        imagePath: 'ubuntu:22.04',
      },
      storage: {
        ephemeralStorage: {
          storageSize: 2048,
        },
      },
    },
    createOptions: {
      volumesToAttach: [volumeName],
    },
  },
});
```

```python
import uuid

storage_sandbox_id = f"sandbox-{uuid.uuid4().hex[:8]}"
volume_name = f"data-{storage_sandbox_id}"

volume = client.create.volume(
    project_id="your-project-id",
    data={
        "name": volume_name,
        "mounts": [{"containerMountPath": "/workspace"}],
        "spec": {
            "accessMode": "ReadWriteMany",
            "storageClassName": "nf-multi-rw",
            "storageSize": 10240,  # 10 GiB
        },
    },
)

# Read the id back rather than assuming it matches the name you asked
# for. Use this id to attach, detach, or delete the volume.
volume_id = (volume.data or {}).get("id") or volume_name

client.create.service.deployment(
    project_id="your-project-id",
    data={
        "name": storage_sandbox_id,
        "billing": {"deploymentPlan": "nf-compute-200"},
        "deployment": {
            "instances": 1,
            "docker": {
                "configType": "customEntrypointCustomCommand",
                "customEntrypoint": "/bin/bash",
                "customCommand": "-c 'sleep infinity'",
            },
            "external": {"imagePath": "ubuntu:22.04"},
            "storage": {"ephemeralStorage": {"storageSize": 2048}},
        },
        "createOptions": {"volumesToAttach": [volume_id]},
    },
)
```

Files written to `/workspace` now survive pause and resume. A volume is billed for as long as it exists, including while the sandbox is paused.

See [add a volume](databases-and-persistence.md#add-a-persistent-volume) for access modes and storage classes.

### Examples: Create a GPU sandbox

Create a Jupyter PyTorch sandbox with one or eight H100 or RTX PRO 6000 GPUs. The examples use `us-central`, which supports these configurations. See [GPU plans and regions](billing.md#compute-plans-and-quota-gpu-regions) before choosing another region.

Your account needs [GPU access](billing.md#credits-gpu-access). GPU sandboxes on Northflank cloud use gVisor isolation automatically.

Choose a configuration below. The plan ID, GPU type, and GPU count must match. The API sets ephemeral storage automatically from the GPU type and count.

Shared memory (`shmSize`) is optional. If omitted, the API sets it to the GPU plan's system RAM. Smaller explicit values are preserved. Values above that limit are capped. These examples request 32 GiB for PyTorch. See [GPU storage defaults](billing.md#compute-plans-and-quota-gpu-storage) for allocation details.

JavaScriptPython
```javascript
import { randomUUID } from 'node:crypto';
import {
  ApiClient,
  ApiClientInMemoryContextProvider,
} from '@northflank/js-client';

const contextProvider = new ApiClientInMemoryContextProvider();
await contextProvider.addContext({
  name: 'default',
  token: process.env.NORTHFLANK_API_TOKEN,
});
const apiClient = new ApiClient(contextProvider, {
  throwErrorOnHttpErrorCode: true,
});

const gpuConfigs = {
  h100_1x: {
    deploymentPlan: 'nf-gpu-h100-80-1g',
    gpuType: 'h100-80',
    gpuCount: 1,
  },
  h100_8x: {
    deploymentPlan: 'nf-gpu-h100-80-8g',
    gpuType: 'h100-80',
    gpuCount: 8,
  },
  rtxPro6000_1x: {
    deploymentPlan: 'nf-gpu-rtx-pro-6000-96-1g',
    gpuType: 'rtx_pro_6000-96',
    gpuCount: 1,
  },
  rtxPro6000_8x: {
    deploymentPlan: 'nf-gpu-rtx-pro-6000-96-8g',
    gpuType: 'rtx_pro_6000-96',
    gpuCount: 8,
  },
};
const gpu = gpuConfigs.h100_1x;

const project = await apiClient.create.project({
  data: {
    name: `gpu-${randomUUID().slice(0, 8)}`,
    region: 'us-central',
  },
});
const projectId = project.data.id;

const sandbox = await apiClient.create.service.deployment({
  parameters: { projectId },
  data: {
    name: `jupyter-${randomUUID().slice(0, 8)}`,
    billing: { deploymentPlan: gpu.deploymentPlan },
    deployment: {
      instances: 1,
      external: {
        imagePath: 'quay.io/jupyter/pytorch-notebook:cuda12-2026-02-09',
      },
      docker: { configType: 'default' },
      gpu: {
        enabled: true,
        configuration: {
          gpuType: gpu.gpuType,
          gpuCount: gpu.gpuCount,
          timesliced: false,
        },
      },
      storage: {
        shmSize: 32768,
      },
    },
    ports: [
      { name: 'app', internalPort: 8888, public: true, protocol: 'HTTP' },
    ],
  },
});
console.log({ projectId, sandboxId: sandbox.data.id });
```

```python
import uuid

# Use the authenticated client from the quickstart.
gpu_configs = {
    "h100_1x": ("h100-80", 1),
    "h100_8x": ("h100-80", 8),
    "rtxPro6000_1x": ("rtx_pro_6000-96", 1),
    "rtxPro6000_8x": ("rtx_pro_6000-96", 8),
}
gpu_type, gpu_count = gpu_configs["h100_1x"]
plan_id = f"nf-gpu-{gpu_type}-{gpu_count}g".replace("_", "-")

project = client.create.project(
    data={"name": f"gpu-{uuid.uuid4().hex[:8]}", "region": "us-central"}
)
project_id = project.data["id"]

client.create.service.deployment(
    project_id=project_id,
    data={
        "name": f"jupyter-{uuid.uuid4().hex[:8]}",
        "billing": {"deploymentPlan": plan_id},
        "deployment": {
            "instances": 1,
            "external": {
                "imagePath": "quay.io/jupyter/pytorch-notebook:cuda12-2026-02-09"
            },
            "docker": {"configType": "default"},
            "gpu": {
                "enabled": True,
                "configuration": {
                    "gpuType": gpu_type,
                    "gpuCount": gpu_count,
                    "timesliced": False,
                },
            },
            "storage": {
                "shmSize": 32768,
            },
        },
        "ports": [
            {"name": "app", "internalPort": 8888, "public": True, "protocol": "HTTP"}
        ],
    },
)
```

Wait for the sandbox to run. Open the public URL for port `app`, then use the Jupyter token shown in the container logs.

Pause the sandbox when you finish to stop GPU usage charges. Ephemeral files do not survive container replacement. Attach a persistent volume for files that must survive replacement. The [next example](sandboxes.md#examples-gpu-sandbox-with-persistent-storage) stores model weights.

### Examples: GPU sandbox with persistent storage

Serve [Qwen3.5-4B](https://huggingface.co/Qwen/Qwen3.5-4B) with SGLang on one H100. Store downloaded model weights on a persistent volume so they survive sandbox replacement.

Use an authenticated client from the [quickstart](sandboxes.md#quickstart) and a project in `us-central`. The project needs GPU access and at least 100 GiB of volume allowance. See [GPU plans and regions](billing.md#compute-plans-and-quota-gpu-plans) for other configurations.

Set `MODEL_API_KEY` in your local environment before running the example. SGLang requires this key for requests to the public endpoint. The example pins the CUDA 12 SGLang image. See [SGLang installation](https://docs.sglang.io/docs/get-started/install) for image requirements.

Ephemeral storage is automatic. The examples explicitly request 32 GiB of shared memory for SGLang. If you omit `shmSize`, the API sets it to the GPU plan's system RAM. Smaller explicit values are preserved. Values above that limit are capped. The persistent volume size is separate from both values.

JavaScriptPython
```javascript
import { randomUUID } from 'node:crypto';

const projectId = 'your-gpu-project-id';
const modelApiKey = process.env.MODEL_API_KEY;
if (!modelApiKey) {
  throw new Error('Set MODEL_API_KEY before creating the sandbox');
}

const sandboxId = `sglang-${randomUUID().slice(0, 8)}`;
const volumeName = `models-${sandboxId}`;

await apiClient.create.volume({
  parameters: { projectId },
  data: {
    name: volumeName,
    spec: {
      accessMode: 'ReadWriteMany',
      storageClassName: 'nf-multi-rw',
      storageSize: 102400,
    },
    mounts: [{ containerMountPath: '/root/.cache/huggingface' }],
  },
});

await apiClient.create.service.deployment({
  parameters: { projectId },
  data: {
    name: sandboxId,
    billing: { deploymentPlan: 'nf-gpu-h100-80-1g' },
    runtimeEnvironment: { MODEL_API_KEY: modelApiKey },
    deployment: {
      instances: 1,
      external: { imagePath: 'lmsysorg/sglang:v0.5.19-cu129' },
      docker: {
        configType: 'customEntrypointCustomCommand',
        customEntrypoint: '/bin/sh',
        customCommand: `-c 'exec python3 -m sglang.launch_server --model-path Qwen/Qwen3.5-4B --host 0.0.0.0 --port 30000 --context-length 8192 --api-key "$MODEL_API_KEY"'`,
      },
      gpu: {
        enabled: true,
        configuration: {
          gpuType: 'h100-80',
          gpuCount: 1,
          timesliced: false,
        },
      },
      storage: {
        shmSize: 32768,
      },
    },
    ports: [
      {
        name: 'api',
        internalPort: 30000,
        public: true,
        protocol: 'HTTP',
      },
    ],
    createOptions: { volumesToAttach: [volumeName] },
  },
});
```

```python
import os
import uuid

project_id = "your-gpu-project-id"
model_api_key = os.environ["MODEL_API_KEY"]
sandbox_id = f"sglang-{uuid.uuid4().hex[:8]}"
volume_name = f"models-{sandbox_id}"

client.create.volume(
    project_id=project_id,
    data={
        "name": volume_name,
        "spec": {
            "accessMode": "ReadWriteMany",
            "storageClassName": "nf-multi-rw",
            "storageSize": 102400,
        },
        "mounts": [{"containerMountPath": "/root/.cache/huggingface"}],
    },
)

client.create.service.deployment(
    project_id=project_id,
    data={
        "name": sandbox_id,
        "billing": {"deploymentPlan": "nf-gpu-h100-80-1g"},
        "runtimeEnvironment": {"MODEL_API_KEY": model_api_key},
        "deployment": {
            "instances": 1,
            "external": {"imagePath": "lmsysorg/sglang:v0.5.19-cu129"},
            "docker": {
                "configType": "customEntrypointCustomCommand",
                "customEntrypoint": "/bin/sh",
                "customCommand": (
                    "-c 'exec python3 -m sglang.launch_server "
                    "--model-path Qwen/Qwen3.5-4B --host 0.0.0.0 --port 30000 "
                    '--context-length 8192 --api-key "$MODEL_API_KEY"\''
                ),
            },
            "gpu": {
                "enabled": True,
                "configuration": {
                    "gpuType": "h100-80",
                    "gpuCount": 1,
                    "timesliced": False,
                },
            },
            "storage": {
                "shmSize": 32768,
            },
        },
        "ports": [
            {"name": "api", "internalPort": 30000, "public": True, "protocol": "HTTP"}
        ],
        "createOptions": {"volumesToAttach": [volume_name]},
    },
)
```

Wait until SGLang finishes downloading and loading the model. Read the container logs for startup progress. Set `SGLANG_URL` to the public URL for port `api`, then send a request. This request disables thinking mode so the model returns a short answer:

```shell
curl --fail "$SGLANG_URL/v1/chat/completions" \
  -H "Authorization: Bearer $MODEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"Qwen/Qwen3.5-4B","messages":[{"role":"user","content":"Explain what a GPU does in one sentence."}],"max_tokens":128,"chat_template_kwargs":{"enable_thinking":false}}'
```

To use RTX PRO 6000, change the plan to `nf-gpu-rtx-pro-6000-96-1g` and the GPU type to `rtx_pro_6000-96`. The API selects its ephemeral storage allocation automatically. To use eight GPUs, select the matching eight-GPU configuration from the [Jupyter example](sandboxes.md#examples-create-a-gpu-sandbox). For a model that supports eight-way tensor parallelism, add `--tp 8` to split it across eight GPUs. Larger models need enough volume space for their weights.

Pause the sandbox between runs to stop GPU usage charges. The volume remains billed while the sandbox is paused. Keep the volume attached when you resume or recreate the sandbox to reuse the downloaded weights.

### Examples: Expose a web server

If your sandbox runs a web server or any other network service, expose a port to make it reachable. Northflank provisions a public DNS name automatically for publicly exposed ports.

JavaScriptPython
```javascript
// Replaces the whole port list rather than appending, so include
// every port you want to keep.
await apiClient.update.service.ports({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  data: {
    ports: [
      {
        name: 'http',
        internalPort: 8080,
        public: true,
        protocol: 'HTTP',
      },
    ],
  },
});

// Retrieve the public DNS
const ports = await apiClient.get.service.ports({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
});

const publicUrl = ports.data.ports.find((p) => p.internalPort === 8080)?.dns;
console.log('Public URL:', publicUrl);
```

```python
# Replaces the whole port list rather than appending, so include
# every port you want to keep.
client.update.service.ports(
    project_id="your-project-id",
    service_id=sandbox_id,
    data={
        "ports": [
            {
                "name": "http",
                "internalPort": 8080,
                "public": True,
                "protocol": "HTTP",
            }
        ]
    },
)

svc = client.get.service(project_id="your-project-id", service_id=sandbox_id)

for port in (svc.data or {}).get("ports") or []:
    print(port["name"], port["internalPort"], port.get("dns") or "pending DNS")
```

You can also expose a port at creation time by passing the same `ports` list in the create payload, which avoids a second call.

Set `public: false` if the port should only be reachable by other services in the same project. The `protocol` field accepts `HTTP`, `HTTP/2`, `TCP`, and `UDP`.

You can also attach your own domain to a publicly exposed port. See [add a domain](domains.md#add-a-domain-to-your-account).

### Examples: Run a coding agent in a sandbox

A sandbox makes a good runtime for a coding agent: the agent can install packages, run builds, and execute whatever it writes, without any of it touching your machine.

Pass the agent's credentials as runtime variables rather than baking them into the image.

JavaScriptPython
```javascript
await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-project-id',
  },
  data: {
    name: `claude-agent-${crypto.randomUUID().split('-')[4]}`,
    billing: {
      deploymentPlan: 'nf-compute-200',
    },
    deployment: {
      instances: 1,
      external: {
        imagePath: 'ubuntu:22.04',
      },
      docker: {
        configType: 'customCommand',
        customCommand: 'sleep infinity',
      },
      storage: {
        ephemeralStorage: {
          storageSize: 2048,
        },
      },
    },
    runtimeEnvironment: {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    },
  },
});
```

```python
import os
import uuid

sandbox_id = f"claude-agent-{uuid.uuid4().hex[:8]}"

client.create.service.deployment(
    project_id="your-project-id",
    data={
        "name": sandbox_id,
        "billing": {"deploymentPlan": "nf-compute-200"},
        "deployment": {
            "instances": 1,
            "external": {"imagePath": "ubuntu:22.04"},
            "docker": {
                "configType": "customEntrypointCustomCommand",
                "customEntrypoint": "/bin/bash",
                "customCommand": "-c 'sleep infinity'",
            },
            "storage": {"ephemeralStorage": {"storageSize": 2048}},
        },
        "runtimeEnvironment": {
            "ANTHROPIC_API_KEY": os.environ["ANTHROPIC_API_KEY"],
        },
    },
)
```

Drive the agent with [exec sessions](../api/execute-command.md), and attach a volume if its work should survive a restart.

For a managed alternative that handles agent authentication, repository connection, and local SSH access for you, see [Cloud Harness](cloud-harness.md#quickstart).

Store real credentials in a [secret group](secure.md#inject-secrets) rather than reading them from your shell environment.

### Examples: Next steps

- [Configure and manage sandboxes: Pause, resume, scale, monitor, and delete your sandboxes.](sandboxes.md#configure-and-manage-sandboxes)
- [Sandboxes on Northflank cloud: Resource plans, GPU plans, regions, and billing on managed infrastructure.](sandboxes.md#sandboxes-on-northflank-cloud)
- [Sandboxes in your own cloud: Run sandboxes on your own AWS, GCP, Azure, or other cloud infrastructure.](sandboxes.md#sandboxes-in-your-own-cloud)

## Quickstart

Source: https://northflank.com/docs/v1/application/sandboxes/quickstart.md

Sandboxes let you run untrusted code (LLM-generated code, user submissions, AI agents, CI/CD pipelines) in isolated environments. Each sandbox is a Linux environment running against its own kernel rather than the host's. That closes the gap ordinary containers leave open: containers share the host kernel, so a kernel-level escape reaches the host. You get true isolation at container speed, and sandboxes boot in under a second.

On Northflank, sandboxes run on Northflank cloud or on your own infrastructure. You create them, run commands, access files, and destroy them programmatically with the JavaScript or Python SDK.

Isolation comes from microVMs for CPU workloads and gVisor for GPU workloads on Northflank cloud. On your own cloud, you select the runtime through cluster defaults or workload tags.

This guide takes you from an API token to a running sandbox you can execute commands in.

### Quickstart: Set up your environment

Start by creating an API token, a project, and an SDK client.

#### Quickstart: Generate an API token

> [!note]
>
> [Click here](https://app.northflank.com/s/account/settings/api/tokens/new) to create an API token.

#### Quickstart: Create a project

> [!note]
>
> [Click here](https://app.northflank.com/s/account/projects/new) to create a project.

Create a project on Northflank Cloud or select a BYOC cluster and note the project ID. Every call in this guide needs it. See [create a project](getting-started.md#create-a-project) for the full walkthrough.

#### Quickstart: Install an SDK

JavaScriptPython
```bash
npm install @northflank/js-client
```

```bash
pip install northflank
```

#### Quickstart: Initialize the SDK

Create an `ApiClient` with your API token.

JavaScriptPython
```javascript
import {
  ApiClient,
  ApiClientInMemoryContextProvider,
} from "@northflank/js-client";

const contextProvider = new ApiClientInMemoryContextProvider();
await contextProvider.addContext({
  name: "context",
  token: process.env.NORTHFLANK_TOKEN,
});

const apiClient = new ApiClient(contextProvider, {
  throwErrorOnHttpErrorCode: true,
});
```

```python
import os

from northflank import ApiClient

client = ApiClient(api_token=os.environ["NF_API_TOKEN"])
```

### Quickstart: Create a sandbox

Deploy a container image as a deployment service. A service is Northflank's unit for a running workload, and each sandbox is one, which is why the calls below are service calls. The `sandboxId` is used as both the service name and the identifier in later calls.

JavaScriptPython
```javascript
const sandboxId = `sandbox-${crypto.randomUUID().split('-')[4]}`;

await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-project-id',
  },
  data: {
    name: sandboxId,
    billing: {
      // Sets CPU and memory. nf-compute-200 is 2 vCPU, 4GB RAM.
      deploymentPlan: 'nf-compute-200',
    },
    deployment: {
      instances: 1,
      docker: {
        // Base images exit immediately, so override the entrypoint with a
        // long-running command (or tail -f /dev/null) to keep the
        // container up to exec into.
        // Accepts: default, customEntrypoint, customCommand,
        // customEntrypointCustomCommand.
        configType: 'customEntrypointCustomCommand',
        customEntrypoint: '/bin/bash',
        customCommand: "-c 'sleep infinity'",
      },
      external: {
        // Any public or private container image.
        imagePath: 'ubuntu:22.04',
      },
      storage: {
        ephemeralStorage: {
          storageSize: 2048,
        },
      },
    },
    runtimeEnvironment: {
      // Injected into the container at runtime.
      MY_VAR: 'hello-world',
    },
  },
});
```

```python
import uuid

sandbox_id = f"sandbox-{uuid.uuid4().hex[:8]}"

client.create.service.deployment(
    project_id="your-project-id",
    data={
        "name": sandbox_id,
        # deploymentPlan sets CPU and memory. nf-compute-200 is 2 vCPU, 4GB RAM.
        "billing": {"deploymentPlan": "nf-compute-200"},
        "deployment": {
            "instances": 1,
            # Base images exit immediately, so override the entrypoint with a
            # long-running command (or tail -f /dev/null) to keep the
            # container up to exec into.
            # Accepts: default, customEntrypoint, customCommand,
            # customEntrypointCustomCommand.
            "docker": {
                "configType": "customEntrypointCustomCommand",
                "customEntrypoint": "/bin/bash",
                "customCommand": "-c 'sleep infinity'",
            },
            # Any public or private container image.
            "external": {"imagePath": "ubuntu:22.04"},
            "storage": {"ephemeralStorage": {"storageSize": 2048}},
        },
        # Injected into the container at runtime.
        "runtimeEnvironment": {"MY_VAR": "hello-world"},
    },
)
```

### Quickstart: Start the sandbox

Scale the service to one instance to boot it, then poll until its deployment status reaches `COMPLETED`.

JavaScriptPython
```javascript
await apiClient.scale.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  data: {
    instances: 1,
  },
});

async function waitForReady() {
  while (true) {
    const svc = await apiClient.get.service({
      parameters: {
        projectId: 'your-project-id',
        serviceId: sandboxId,
      },
    });

    const status = svc.data?.status?.deployment?.status;
    // COMPLETED means the deployment rolled out and the container is
    // running. It does not mean the process has exited.
    if (status === 'COMPLETED') return;
    if (status === 'FAILED') throw new Error('Sandbox deployment failed');

    await new Promise((r) => setTimeout(r, 1000));
  }
}

await waitForReady();
```

```python
client.scale.service(
    project_id="your-project-id",
    service_id=sandbox_id,
    data={"instances": 1},
)

# Polls get.service until the deployment status is COMPLETED, then returns
# the service object. Raises TimeoutError if timeout_s elapses first, or
# RuntimeError if the deployment reports FAILED.
# COMPLETED means the deployment rolled out and the container is running.
# It does not mean the process has exited.
client.helpers.wait_for_service_ready(
    project_id="your-project-id",
    service_id=sandbox_id,
    timeout_s=300,
    poll_interval_s=1,
)
```

Sandboxes boot in under a second, so the wait normally returns on its first or second poll.

### Quickstart: Run commands in the sandbox

Run commands inside the running sandbox.

JavaScriptPython
```javascript
const handle = await apiClient.exec.execServiceSession(
  {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  {
    // shell picks the interpreter. Use bash -c for pipes, redirects, or
    // chained commands. Without it the command runs directly.
    shell: 'bash -c',
    command: "echo 'Hello from sandbox!' && ls /",
  }
);

const stdoutChunks = [];
const stderrChunks = [];

// Attach listeners before awaiting the result, or early output is missed.
handle.stdOut.on('data', (data) => stdoutChunks.push(data.toString()));
handle.stdErr.on('data', (data) => stderrChunks.push(data.toString()));

const result = await handle.waitForCommandResult();

console.log('Exit code:', result.exitCode);
console.log('Stdout:', stdoutChunks.join(''));
console.log('Stderr:', stderrChunks.join(''));
```

```python
# Blocks until the command exits, returning an ExecResult with
# exit_code, stdout, stderr and status. result.ok means exit_code == 0.
result = client.exec.run_service_command(
    project_id="your-project-id",
    service_id=sandbox_id,
    command="echo 'Hello from sandbox!' && ls /",
    # shell picks the interpreter. Use bash -c for pipes, redirects, or
    # chained commands. Without it the command runs directly.
    shell="/bin/bash -c",
)

print("Exit code:", result.exit_code)
print("Stdout:", result.stdout)
print("Stderr:", result.stderr)
```

#### Quickstart: Interactive sessions

When you need to write to the process's stdin and read its output as it streams, open a session instead. In Python, `open_service_session` is a context manager so the WebSocket always closes:

```python
with client.exec.open_service_session(
    project_id="your-project-id", service_id=sandbox_id, command="cat"
) as session:
    session.resize(rows=40, columns=120)
    session.send("hello\n")
    # Read the output a send produces before closing stdin; calling
    # send_eof immediately after a send can race the proxy.
    for chunk in session:          # chunk.stream is "stdout" or "stderr"
        print(chunk.data, end="")
        if "hello" in chunk.data:
            break
    session.send_eof()             # close stdin
    result = session.wait()        # ExecResult once the process exits
```

See [execute commands](../api/execute-command.md) for streaming, TTY handling, and the equivalent CLI commands.

### Quickstart: Next steps

- [Sandbox examples: Deep dives into GPUs, volumes, exposed ports, and coding agents.](sandboxes.md#examples)
- [Configure and manage sandboxes: Pause, resume, scale, monitor, and delete your sandboxes.](sandboxes.md#configure-and-manage-sandboxes)
- [Sandboxes on Northflank cloud: Resource plans, GPU plans, regions, and billing on managed infrastructure.](sandboxes.md#sandboxes-on-northflank-cloud)
- [Sandboxes in your own cloud: Run sandboxes on your own AWS, GCP, Azure, or other cloud infrastructure.](sandboxes.md#sandboxes-in-your-own-cloud)

## Sandboxes in your own cloud

Source: https://northflank.com/docs/v1/application/sandboxes/sandboxes-in-your-own-cloud.md

Run sandboxes on your own AWS, GCP, Azure, or other cloud account. Your data and compute stay inside your infrastructure, and you pay your cloud provider directly for the underlying resources.

Deploying a sandbox is identical to Northflank cloud once the cluster is set up. The differences are that you choose the isolation runtime yourself rather than getting it automatically, plus the resource plans available to you and the storage classes you can use.

### Sandboxes in your own cloud: Before you start

Running sandboxes in your own cloud requires four things in place before you deploy anything:

1. A Northflank cluster in your cloud account, with sandbox security installed. See [use other cloud providers with Northflank](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

2. A runtime class selected for your workloads, either as the cluster default or through a tag.

3. Node pools whose instance types support the runtime you chose.

4. A Northflank project linked to that cluster.

> [!note] MicroVM support
>
> MicroVM isolation needs hardware support. Runtime availability varies by provider and region. On AWS, microVM node pools require bare-metal instances or eligible non-metal instances with nested virtualization enabled. See the [microVM requirements](bring-your-own-cloud.md#use-aws-launch-templates-enable-microvm-support).

### Sandboxes in your own cloud: Configure your cluster for sandboxes

Connect your cloud provider and deploy a cluster. Sandbox isolation is configured on the cluster, not on individual node pools.

In your cluster's Security settings, open Sandboxing and enable Install sandbox security. This installs both the microVM (Kata Containers) and gVisor runtimes on the cluster.

![Configuring sandbox security in a cluster's security settings in the Northflank application](https://assets.northflank.com/documentation/v1/application/sandboxes/deploy-sandboxes-in-your-cloud/sandbox-technology.png)

Then choose the runtime that the cluster uses by default:

- Workload runtime class applies to services, jobs, and addons.

- Build runtime class applies to builds.

> [!warning] Isolation is not automatic
>
> Unlike Northflank cloud, installing the runtimes does not sandbox anything on
> its own. A workload is sandboxed only when a runtime class selects one, either
> from the cluster default above or from a
> [tag](release.md#tag-workloads-and-resources)
> applied to that workload. With the runtime class set to `none`,
> workloads run as ordinary containers on sandbox-capable nodes.

Nodes must be bare metal or support nested virtualisation to run microVM workloads. gVisor runs anywhere microVMs are not supported, so a cluster can mix both. To keep sandboxed workloads on particular nodes, label those node pools and apply a matching [node affinity rule](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-create-node-affinity-rules).

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for pool configuration, and [configure your cluster](bring-your-own-cloud.md#configure-your-cluster) for cluster-wide settings.

- [Bring your own cloud to Northflank: Use all the features of the Northflank platform on other cloud hosting providers, with control over your own infrastructure.](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank)

### Sandboxes in your own cloud: Create a project for your cluster

Create a Northflank project that targets your cluster. Sandboxes deployed into it run on your own infrastructure.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/projects/new) to create a project.

1. Enter a project name.

2. Under deployment target, select your own cluster rather than Northflank cloud.

3. Create the project and note its ID.

A project's cluster cannot be changed after creation. See [create a project](getting-started.md#create-a-project) for the full walkthrough.

### Sandboxes in your own cloud: Create a sandbox in your cluster

Once your project points at your cluster, deploying a sandbox is the same as on Northflank cloud. The create payload carries no isolation setting: the runtime comes from your cluster default or from a tag on the workload, and the nodes it is scheduled to must support that runtime.

JavaScriptPython
```javascript
const sandboxId = `sandbox-${crypto.randomUUID().split('-')[4]}`;

await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-byoc-project-id',
  },
  data: {
    name: sandboxId,
    billing: {
      deploymentPlan: 'nf-compute-200',
    },
    deployment: {
      instances: 1,
      docker: {
        configType: 'customCommand',
        customCommand: 'sleep infinity',
      },
      external: {
        imagePath: 'ubuntu:22.04',
      },
      storage: {
        ephemeralStorage: {
          storageSize: 2048,
        },
      },
    },
  },
});
```

```python
import uuid

sandbox_id = f"sandbox-{uuid.uuid4().hex[:8]}"

client.create.service.deployment(
    project_id="your-byoc-project-id",
    data={
        "name": sandbox_id,
        "billing": {"deploymentPlan": "nf-compute-200"},
        "deployment": {
            "instances": 1,
            "docker": {
                "configType": "customEntrypointCustomCommand",
                "customEntrypoint": "/bin/bash",
                "customCommand": "-c 'sleep infinity'",
            },
            "external": {"imagePath": "ubuntu:22.04"},
            "storage": {"ephemeralStorage": {"storageSize": 2048}},
        },
    },
)
```

Pausing, resuming, exec, logs, and metrics all work the same way. See [configure and manage sandboxes](sandboxes.md#configure-and-manage-sandboxes).

If your cluster has GPU node pools, create a GPU sandbox with the same payload shown in [GPU sandboxes](sandboxes.md#examples-create-a-gpu-sandbox). See [deploy GPUs in your own cloud](gpu-workloads.md#deploy-gpus-in-your-own-cloud) for driver and node pool setup.

### Sandboxes in your own cloud: Custom resource plans

On your own cloud you are not restricted to Northflank's standard plans. Define custom resource plans with the exact vCPU and memory your node types provide, then use the custom plan's identifier as the `deploymentPlan` when creating a sandbox.

This matters most when your instance types do not line up neatly with the standard plans, and you would otherwise waste a large share of each node.

See [create custom resource plans](bring-your-own-cloud.md#create-custom-resource-plans).

### Sandboxes in your own cloud: Persistent volumes

Volumes in your own cloud are provisioned through your cluster's storage classes rather than Northflank's. Set `storageClassName` to a class that exists in your cluster, and make sure a provisioner for it is running.

JavaScriptPython
```javascript
const volumeName = `data-${sandboxId}`;

await apiClient.create.volume({
  parameters: {
    projectId: 'your-byoc-project-id',
  },
  data: {
    name: volumeName,
    mounts: [
      {
        containerMountPath: '/workspace',
      },
    ],
    spec: {
      // ReadWriteMany needs a storage class that supports shared access.
      // Use ReadWriteOnce if your provisioner does not.
      accessMode: 'ReadWriteMany',
      storageClassName: 'your-storage-class',
      storageSize: 10240,
    },
  },
});
```

```python
volume_name = f"data-{sandbox_id}"

client.create.volume(
    project_id="your-byoc-project-id",
    data={
        "name": volume_name,
        "mounts": [{"containerMountPath": "/workspace"}],
        "spec": {
            # ReadWriteMany needs a storage class that supports shared access.
            # Use ReadWriteOnce if your provisioner does not.
            "accessMode": "ReadWriteMany",
            "storageClassName": "your-storage-class",
            "storageSize": 10240,
        },
    },
)
```

Storage is billed by your cloud provider, not by Northflank.

### Sandboxes in your own cloud: Next steps

- [Configure and manage sandboxes: Pause, resume, scale, monitor, and delete your sandboxes.](sandboxes.md#configure-and-manage-sandboxes)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)
- [Sandboxes on Northflank cloud: Resource plans, GPU plans, regions, and billing on managed infrastructure.](sandboxes.md#sandboxes-on-northflank-cloud)

## Sandboxes on Northflank cloud

Source: https://northflank.com/docs/v1/application/sandboxes/sandboxes-on-northflank-cloud.md

Deploy sandboxes on Northflank's managed infrastructure with isolation enabled by default. CPU sandboxes run in microVMs and GPU sandboxes run under gVisor, with no configuration needed either way. Boot times stay under a second.

This page covers what is specific to Northflank cloud: resource plans, GPU plans, regions, and billing. For the end-to-end walkthrough, start with the [quickstart](sandboxes.md#quickstart).

### Sandboxes on Northflank cloud: Before you start

Isolation on Northflank cloud is automatic. CPU sandboxes run in microVMs, and GPU sandboxes run under gVisor. You do not select a runtime, and there is nothing to configure.

GPU sandboxes have an extra requirement: the project must sit in a GPU-enabled region, such as `asia-southeast`. You choose a region when you create a project and you cannot move a project afterwards, so pick a GPU-enabled region up front if you plan to run GPU workloads.

> [!warning] Region is fixed at creation
>
> A project's region cannot be changed after the project is created. To move a sandbox to a different region, create a new project in that region and redeploy.

### Sandboxes on Northflank cloud: Create a project

Sandboxes run in projects. A project deployed to Northflank's managed cloud gets sandbox isolation automatically.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/projects/new) to create a project.

1. In the Northflank dashboard, click Create Project.

2. Enter a project name.

3. Choose Northflank Cloud as the deployment target.

4. Select a [region](run.md#deploy-to-a-region). Pick a GPU-enabled one if you plan to run GPU sandboxes, because this cannot be changed later.

5. Click Create project.

Note the project ID. You pass it as a parameter in every API call that follows.

See [create a project](getting-started.md#create-a-project) for the full walkthrough.

### Sandboxes on Northflank cloud: Create a sandbox on Northflank cloud

Projects on Northflank cloud are created from your team dashboard. Any sandbox you deploy into one of those projects runs on Northflank's managed infrastructure automatically, with no extra configuration.

JavaScriptPython
```javascript
const sandboxId = `sandbox-${crypto.randomUUID().split('-')[4]}`;

await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-northflank-project-id',
  },
  data: {
    name: sandboxId,
    billing: {
      deploymentPlan: 'nf-compute-200',
    },
    deployment: {
      instances: 1,
      docker: {
        configType: 'customCommand',
        customCommand: 'sleep infinity',
      },
      external: {
        imagePath: 'ubuntu:22.04',
      },
      storage: {
        ephemeralStorage: {
          storageSize: 2048,
        },
      },
    },
  },
});
```

```python
import uuid

sandbox_id = f"sandbox-{uuid.uuid4().hex[:8]}"

client.create.service.deployment(
    project_id="your-northflank-project-id",
    data={
        "name": sandbox_id,
        "billing": {"deploymentPlan": "nf-compute-200"},
        "deployment": {
            "instances": 1,
            "docker": {
                "configType": "customEntrypointCustomCommand",
                "customEntrypoint": "/bin/bash",
                "customCommand": "-c 'sleep infinity'",
            },
            "external": {"imagePath": "ubuntu:22.04"},
            "storage": {"ephemeralStorage": {"storageSize": 2048}},
        },
    },
)
```

See [create a project](getting-started.md#create-a-project) if you do not have a project yet.

### Sandboxes on Northflank cloud: Resource plans

The `billing.deploymentPlan` field sets how much CPU and memory a sandbox gets. Northflank cloud offers standard plans from `nf-compute-10` at the small end up to `nf-compute-2000`, with `nf-compute-200` a reasonable starting point for most sandboxes.

[See the pricing page](https://northflank.com/pricing) for the vCPU, memory, and cost of each plan.

You can also list the plans available to your account, with their CPU and memory, using `list.plans`.

Change a plan at any time by scaling the service. The sandbox restarts with the new allocation, and anything held only in ephemeral storage is lost:

JavaScriptPython
```javascript
await apiClient.scale.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  data: {
    deploymentPlan: 'nf-compute-400',
  },
});
```

```python
client.scale.service(
    project_id="your-project-id",
    service_id=sandbox_id,
    data={"deploymentPlan": "nf-compute-400"},
)
```

On your own cloud you are not limited to these plans. See [create custom resource plans](bring-your-own-cloud.md#create-custom-resource-plans).

### Sandboxes on Northflank cloud: GPU sandboxes and plans

GPU sandboxes provide GPU acceleration on Northflank cloud. Create the project in a region that supports your GPU type and count. Then select the matching GPU resource plan for the sandbox.

GPU sandboxes use gVisor isolation automatically. GPU plans include CPU and system RAM. Set `deployment.gpu.enabled` to `true` and set the matching type and count in `deployment.gpu.configuration`.

See [GPU plans and regions](billing.md#compute-plans-and-quota-gpu-plans) for plan IDs and supported configurations. Your account needs [GPU access](billing.md#credits-gpu-access).

The [GPU sandbox example](sandboxes.md#examples-create-a-gpu-sandbox) creates a project and a Jupyter sandbox. Choose one or eight H100 or RTX PRO 6000 GPUs, with compatible ephemeral storage and shared memory.

For model serving, use the [SGLang example with persistent storage](sandboxes.md#examples-gpu-sandbox-with-persistent-storage).

### Sandboxes on Northflank cloud: Billing

Northflank cloud bills compute per second of runtime. Pausing a sandbox scales it to zero instances, which stops compute charges. Volumes attached to a paused sandbox continue to be billed, because the data is still stored.

- Compute is charged per second against the resource plan you selected.

- Volumes are charged per GB per month, whether the sandbox is running or paused.

- Ephemeral storage is included in the compute charge.

Short-lived sandboxes are cheap to run precisely because of per-second billing: a sandbox that exists for 40 seconds is billed for 40 seconds.

[See the pricing page](https://northflank.com/pricing) for current rates, and [monitor spending](billing.md#monitor-spending) to set up billing alerts before costs surprise you.

### Sandboxes on Northflank cloud: Next steps

- [Configure and manage sandboxes: Pause, resume, scale, monitor, and delete your sandboxes.](sandboxes.md#configure-and-manage-sandboxes)
- [Sandbox examples: Deep dives into GPUs, volumes, exposed ports, and coding agents.](sandboxes.md#examples)
- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)
- [Sandboxes in your own cloud: Run sandboxes on your own AWS, GCP, Azure, or other cloud infrastructure.](sandboxes.md#sandboxes-in-your-own-cloud)
