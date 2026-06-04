# Sandboxes

Generated from 3 application pages listed in `llms.txt`.

## Pages

- [Deploy sandboxes in your cloud](#deploy-sandboxes-in-your-cloud)
- [Deploy sandboxes on Northflank cloud](#deploy-sandboxes-on-northflank-cloud)
- [Sandboxes on Northflank](#sandboxes-on-northflank)

## Deploy sandboxes in your cloud

Source: https://northflank.com/docs/v1/application/sandboxes/deploy-sandboxes-in-your-cloud.md

Deploy sandboxes with microVM isolation in your own cloud account. MicroVM isolation is enabled by default for workloads deployed to microVM-enabled node pools.

### Deploy sandboxes in your cloud: Integrate your cloud

Connect your cloud provider and deploy a BYOC cluster with sandboxed node pools. Select a sandbox technology during setup to provide strong isolation for each workload.

![Selecting sandbox technology when configuring node pools in the Northflank application](https://assets.northflank.com/documentation/v1/application/sandboxes/deploy-sandboxes-in-your-cloud/sandbox-technology.png)

Runtime availability depends on your cloud provider and region.

- [Bring your own cloud to Northflank: Use all the features of the Northflank platform on other cloud hosting providers, with control over your own infrastructure.](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank)

### Deploy sandboxes in your cloud: Deploy workloads

After deploying your cluster, create a project and select your cluster. Workloads deployed to microVM-enabled node pools run with microVM isolation enabled by default.

Attach volumes to preserve data across restarts and pauses. Control workload placement using tags and affinity rules.

- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Build and deploy your code: Quickly and easily build and run code from a Git repository using a Dockerfile or buildpack.](getting-started.md#build-and-deploy-your-code)
- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)

### Deploy sandboxes in your cloud: Next steps

- [Deploy a sandbox on Northflank cloud: Create sandboxes on managed infrastructure with microVM isolation enabled.](sandboxes.md#deploy-sandboxes-on-northflank-cloud)

## Deploy sandboxes on Northflank cloud

Source: https://northflank.com/docs/v1/application/sandboxes/deploy-sandboxes-on-northflank.md

Deploy sandboxes with microVM isolation on Northflank's managed cloud. Boot times under 1 second with VM-level isolation for running untrusted code.

### Deploy sandboxes on Northflank cloud: Create a project

Sandboxes run in projects deployed to Northflank's managed cloud. MicroVM isolation is enabled by default.

> [!note]
> [Click here](https://app.northflank.com/s/account/projects/new) to create a project.

1. Navigate to the Northflank dashboard and click **Create Project**

2. Enter a project name

3. Choose **Northflank Cloud** as the deployment target

4. Select a region

5. Click **Create project**

Your sandboxes will run in the selected region on Northflank's managed infrastructure with microVM isolation enabled by default.

Learn more about creating projects in the [Create a project](getting-started.md#create-a-project) guide.

### Deploy sandboxes on Northflank cloud: Deploy sandbox workloads

Deploy workloads in your project with microVM isolation enabled by default. Each workload runs in its own microVM with a dedicated kernel, providing strong isolation.

Attach volumes to preserve data across restarts and pauses. Scale to zero to pause compute billing while keeping storage intact.

- [Build and deploy your code: Quickly and easily build and run code from a Git repository using a Dockerfile or buildpack.](getting-started.md#build-and-deploy-your-code)
- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)

### Deploy sandboxes on Northflank cloud: Next steps

- [Deploy a sandbox in your own cloud: Create sandboxes in your own cloud with microVM isolation enabled.](sandboxes.md#deploy-sandboxes-in-your-cloud)

## Sandboxes on Northflank

Source: https://northflank.com/docs/v1/application/sandboxes/sandboxes-on-northflank.md

Northflank sandboxes are microVM-backed containers that provide VM-level isolation with container performance. They boot in under 1 second and prevent container escape, making them ideal for running untrusted code like LLM-generated code, user-submitted code, AI agents, and CI/CD pipelines.

Sandboxes use microVM-based virtualization and user-space kernel isolation to prevent breakout attacks while maintaining near-native performance. Each container runs in its own isolated environment with a separate kernel instance.

For reference and ease of understanding, in Northflank terms, a sandbox is a service, so when we talk about a service, that is the equivalent of a sandbox.

### Sandboxes on Northflank: Create sandboxes with the SDK

This guide shows how to create and manage sandboxes programmatically using the Northflank JavaScript SDK.

### Sandboxes on Northflank: Generate an API token

> [!note]
> [Click here](https://app.northflank.com/s/account/settings/api/tokens/new) to create an API token.

### Sandboxes on Northflank: Create a project

> [!note]
> [Click here](https://app.northflank.com/s/account/projects/new) to create a project.
Create a project on Northflank Cloud or select a BYOC cluster. Note the project ID, you will pass it as a parameter in every API call that follows.

### Sandboxes on Northflank: Install and initialize the SDK

Install the Northflank SDK and authenticate with your API token. The client has typed methods for every API endpoint and helpers for exec and streaming. See the [SDK documentation](../api/use-the-javascript-client.md) for more.

```bash
$ npm install @northflank/js-client
```

Create an `ApiClient` instance with your API token. The context provider manages authentication, and `throwErrorOnHttpErrorCode` ensures failed requests throw rather than returning silently.

```typescript
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

### Sandboxes on Northflank: Starting an ephemeral sandbox

Deploy a container image as a deployment service. Each sandbox maps to a single Northflank service, and the `sandboxId` is used as both the service name and the identifier in subsequent calls.

Base images like `ubuntu:22.04` exit immediately on start, so the container needs a long-running command (`sleep infinity` / `tail -f /dev/null`) to stay up long enough to exec into.

```typescript
const sandboxId = `sandbox-${crypto.randomUUID().split('-')[4]}`;

await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-project-id',
  },
  data: {
    name: sandboxId,
    billing: {
      deploymentPlan: 'nf-compute-200', // 2 vCPU, 4GB RAM
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
    runtimeEnvironment: {
      MY_VAR: 'hello-world',
    },
  },
});
```

The `deploymentPlan` controls CPU and memory allocation. Use `external.imagePath` to pull any public or private container image. Environment variables passed via `runtimeEnvironment` are injected into the container at runtime.

See the [JavaScript client reference](../api/use-the-javascript-client.md) for the full service payload schema.

### Sandboxes on Northflank: Create sandbox with volume for persistence

Skip this step if your sandbox does not need persistent storage. Volumes preserve data across restarts and pauses, so anything written to the mount path survives a scale to zero.

The recommended approach is to create the volume beforehand and attach it at service creation time using `createOptions.volumesToAttach`. This mounts the volume directly when the service starts:

```typescript
const volumeName = `data-${sandboxId}`;

// Create the volume first
await apiClient.create.volume({
  parameters: {
    projectId: "your-project-id",
  },
  data: {
    name: volumeName,
    mounts: [
      {
        containerMountPath: "/workspace",
      },
    ],
    spec: {
      accessMode: "ReadWriteMany",
      storageClassName: "nf-multi-rw",
      storageSize: 10240, // 10 GiB
    },
  },
});

// Create the service and attach the volume
await apiClient.create.service.deployment({
  parameters: {
    projectId: "your-project-id",
  },
  data: {
    name: sandboxId,
    billing: {
      deploymentPlan: "nf-compute-200",
    },
    deployment: {
      instances: 1,
      docker: {
        configType: "customCommand",
        customCommand: "sleep infinity",
      },
      external: {
        imagePath: "ubuntu:22.04",
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
    runtimeEnvironment: {
      MY_VAR: "hello-world",
    },
  },
});
```

See the [JavaScript client reference](../api/use-the-javascript-client.md) for the full volume payload schema.

### Sandboxes on Northflank: Start the sandbox

Scale the service to 1 instance to boot the sandbox. Since deployments are asynchronous, poll the service status until it reaches `COMPLETED` (running) or `FAILED`. Note: `COMPLETED` here means "deployment rolled out successfully" — i.e. the container is running — not "the process has exited".

```typescript
await apiClient.scale.service({
  parameters: {
    projectId: "your-project-id",
    serviceId: sandboxId,
  },
  data: {
    instances: 1,
  },
});

// Poll until the service is running
async function waitForReady() {
  while (true) {
    const svc = await apiClient.get.service({
      parameters: {
        projectId: "your-project-id",
        serviceId: sandboxId,
      },
    });

    const status = svc.data?.status?.deployment?.status;
    if (status === "COMPLETED") return;
    if (status === "FAILED") throw new Error("Sandbox deployment failed");

    await new Promise((r) => setTimeout(r, 1000));
  }
}

await waitForReady();
```

The `waitForReady` helper is a simple polling loop. In production you may want to add a timeout or use exponential backoff.

### Sandboxes on Northflank: Execute commands inside the sandbox

Run commands inside the sandbox using the exec API. This opens a session into the running container and returns stdout and stderr as Node.js readable streams.

```typescript
const handle = await apiClient.exec.execServiceSession(
  {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  {
    shell: 'bash -c',
    command: "echo 'Hello from the sandbox!' && ls /workspace",
  }
);

const stdoutChunks = [];
const stderrChunks = [];

handle.stdOut.on('data', (data) => stdoutChunks.push(data.toString()));
handle.stdErr.on('data', (data) => stderrChunks.push(data.toString()));

const result = await handle.waitForCommandResult();

console.log('Exit code:', result.exitCode);
console.log('Stdout:', stdoutChunks.join(''));
console.log('Stderr:', stderrChunks.join(''));
```

The `shell` option controls which shell interprets the command. Use `bash -c` for shell expressions with pipes, redirects, or chained commands. The `waitForCommandResult` promise resolves once the command exits, returning the exit code.

### Sandboxes on Northflank: Expose public port for HTTPS, WebSockets, GRPC

If your sandbox runs a web server or any network service, expose a port to make it reachable over the internet. Northflank provisions a public DNS name automatically.

```typescript
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

Set `public: false` if the port should only be reachable by other services within the same project. The `protocol` field supports `HTTP`, `HTTP2`, `TCP`, and `UDP`.

### Sandboxes on Northflank: Create a GPU sandbox

Sandboxes support GPU-enabled workloads for machine learning, AI inference, and compute-intensive tasks. GPU plans bundle CPU and RAM matched to the GPU model using the format `nf-gpu-<model>-<count>g`.

#### Sandboxes on Northflank: On Northflank cloud

GPU workloads on Northflank cloud use gVisor isolation by default. Projects must be in a GPU-enabled region like `asia-southeast`.

##### Sandboxes on Northflank: Starting an ephemeral GPU sandbox

Deploy a GPU service without persistent storage. Anything written inside the container is lost when it restarts or scales to zero.

```typescript
const sandboxId = `jupyter-${crypto.randomUUID().split('-')[4]}`;

await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-project-id', // must be in GPU-enabled region
  },
  data: {
    name: sandboxId,
    billing: {
      deploymentPlan: 'nf-gpu-a100-80-1g', // 1x A100 80GB GPU
    },
    deployment: {
      instances: 1,
      external: {
        imagePath: 'quay.io/jupyter/pytorch-notebook:cuda12-2026-02-09',
      },
      docker: {
        configType: 'default',
      },
      gpu: {
        enabled: true,
        configuration: {
          gpuType: 'a100-80',
          gpuCount: 1,
          timesliced: false,
        },
      },
      storage: {
        ephemeralStorage: {
          storageSize: 256000,
        },
        shmSize: 174080, // must match host RAM for GPU type
      },
    },
    ports: [
      {
        name: 'app',
        internalPort: 8888,
        public: true,
        protocol: 'HTTP',
      },
    ],
  },
});
```

The `shmSize` value should match the host RAM for your GPU instance type. For A100-80 instances, use 174080 MB.

##### Sandboxes on Northflank: Create GPU sandbox with volume for persistence

For workloads that need to preserve notebooks, datasets, or model weights across restarts and pauses, create the volume first and attach it at service creation time using `createOptions.volumesToAttach`:

```typescript
const sandboxId = `jupyter-${crypto.randomUUID().split('-')[4]}`;
const volumeName = `data-${sandboxId}`;

// Create the volume first
await apiClient.create.volume({
  parameters: {
    projectId: 'your-project-id',
  },
  data: {
    name: volumeName,
    spec: {
      accessMode: 'ReadWriteMany',
      storageClassName: 'nf-multi-rw',
      storageSize: 102400, // 100 GB
    },
    mounts: [
      { containerMountPath: '/home/jovyan' },
      { containerMountPath: '/workspace' },
    ],
  },
});

// Create the GPU service and attach the volume
await apiClient.create.service.deployment({
  parameters: {
    projectId: 'your-project-id', // must be in GPU-enabled region
  },
  data: {
    name: sandboxId,
    billing: {
      deploymentPlan: 'nf-gpu-a100-80-1g', // 1x A100 80GB GPU
    },
    deployment: {
      instances: 1,
      external: {
        imagePath: 'quay.io/jupyter/pytorch-notebook:cuda12-2026-02-09',
      },
      docker: {
        configType: 'default',
      },
      gpu: {
        enabled: true,
        configuration: {
          gpuType: 'a100-80',
          gpuCount: 1,
          timesliced: false,
        },
      },
      storage: {
        ephemeralStorage: {
          storageSize: 256000,
        },
        shmSize: 174080, // must match host RAM for GPU type
      },
    },
    ports: [
      {
        name: 'app',
        internalPort: 8888,
        public: true,
        protocol: 'HTTP',
      },
    ],
    createOptions: {
      volumesToAttach: [volumeName],
    },
  },
});
```

#### Sandboxes on Northflank: On BYOC cluster

Configure your cluster with sandbox security and a GPU node pool. See [Deploy GPUs in your own cloud](gpu-workloads.md#deploy-gpus-in-your-own-cloud) for setup steps.

Once configured, use the same deployment code from the Northflank Cloud examples above. The service will automatically deploy to your GPU node pool with the configured isolation.

### Sandboxes on Northflank: Pause or destroy the sandbox

Pause a sandbox by scaling to zero to stop compute billing while keeping the volume and service configuration intact. Resume later by scaling back to 1.

To permanently remove a sandbox, delete the service and its volume separately.

```typescript
// Pause: scales to 0, volume data persists
await apiClient.scale.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
  data: {
    instances: 0,
  },
});

// Destroy: removes the service entirely
await apiClient.delete.service({
  parameters: {
    projectId: 'your-project-id',
    serviceId: sandboxId,
  },
});

// Delete the volume (if one was created)
await apiClient.delete.volume({
  parameters: {
    projectId: 'your-project-id',
    volumeId: volumeId,
  },
});
```

When paused, you are only billed for volume storage. Deleting the volume is irreversible and all persisted data will be lost.

### Sandboxes on Northflank: Next steps

- [Deploy a sandbox on Northflank cloud: Create sandboxes on managed infrastructure with microVM isolation enabled.](sandboxes.md#deploy-sandboxes-on-northflank-cloud)
- [Deploy a sandbox in your own cloud: Create sandboxes in your own cloud with microVM isolation enabled.](sandboxes.md#deploy-sandboxes-in-your-cloud)
