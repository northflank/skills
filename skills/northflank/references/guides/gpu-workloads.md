# GPU Workloads

Generated from 4 application pages listed in `llms.txt`.

## Pages

- [Configure and optimise workloads for GPUs](#configure-and-optimise-workloads-for-gpus)
- [Deploy GPUs in your own cloud](#deploy-gpus-in-your-own-cloud)
- [Deploy GPUs on Northflank's managed cloud](#deploy-gpus-on-northflanks-managed-cloud)
- [GPUs on Northflank](#gpus-on-northflank)

## Configure and optimise workloads for GPUs

Source: https://northflank.com/docs/v1/application/gpu-workloads/configure-and-optimise-workloads-for-gpus.md

You can deploy a range of pre-built Docker images to run applications and services that can take advantage of GPU acceleration, or build and deploy your own applications.

Often, workloads that require GPUs will also have greater requirements for CPU, memory, and storage, and you will also need to ensure that your Docker image and application frameworks are compatible with the GPUs you want to use.

### Configure and optimise workloads for GPUs: Configure applications to use GPUs

Check your application or library's documentation to ensure it is correctly configured to utilise the GPU. You may have to install specific ROCm versions of your packages for AMD GPUs.

Below are examples for [PyTorch](https://pytorch.org) and [TensorFlow](https://www.tensorflow.org) to access a single GPU.

#### Configure and optimise workloads for GPUs: PyTorch

```python
import torch
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = MyModel().to(device)
```

#### Configure and optimise workloads for GPUs: TensorFlow

```python
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
```

If you are building with libraries such as PyTorch or TensorFlow, you must ensure that you install package versions that are compatible with the CUDA or ROCm version specified by your base image.

### Configure and optimise workloads for GPUs: Build with GPU-optimised images

You can directly deploy Docker images to Northflank optimised for your selected GPU, or use them as base images for your Docker builds. This helps ensure that you're using platform versions optimised for your GPU, as well as the library versions in your application.

For example you could use `nvidia/cuda:12.8.0-cudnn-runtime-ubuntu22.04` to specify a CUDA version to use in your base image, or `pytorch/pytorch:2.6.0-cuda11.8-cudnn9-devel` which includes the PyTorch libraries as well as the specific CUDA platform and cuDNN library.

### Configure and optimise workloads for GPUs: Recommended platform versions

| GPU model | Recommended versions |
| --- | --- |
| NVIDIA L4 | CUDA 12.0+ |
| NVIDIA A100 | CUDA 11.0–12.4 |
| NVIDIA A10G | CUDA 11.1–12.3 |
| NVIDIA M60 | CUDA 7.5–10.2 |
| AMD Radeon Pro V520 | OpenCL 2.2 |
| NVIDIA T4 | CUDA 10.0–12.2 |
| NVIDIA V100 | CUDA 9.0–12.2 |
| NVIDIA K80 | CUDA 7.5–11.1 (deprecated) |
| NVIDIA H100 | CUDA 12.0+ |
| Habana Gaudi HL-205 | SynapseAI |
| NVIDIA A10 | CUDA 11.1–12.3 |
| AMD Radeon Instinct MI25 | ROCm 2.x–5.x |
| NVIDIA L40S | CUDA 12.0+ |
| NVIDIA H200 | CUDA 12.0+ |
| NVIDIA P100 | CUDA 8.0–11.4 |
| AMD MI300X / Instinct MI300X | ROCm 6.0+ |

### Configure and optimise workloads for GPUs: Right-size resources

While GPU workloads offload the heavy processing to the GPU, you will need to [allocate sufficient vCPU, memory](scale.md#scale-cpu-and-memory), and ephemeral storage to services and jobs to handle large amounts of data or file sizes.

When dealing with large datasets or AI models you may encounter crashes due to insufficient ephemeral storage as your container tries to use it for temporary disk storage. You can increase the ephemeral storage for your services and jobs, but you should also save models, checkpoints, and data to persistent volumes to reduce ephemeral disk usage.

You can check the [metrics, logs, and health](observe.md#monitor-containers) for your containers to pinpoint bottlenecks and diagnose crashes.

If you're deploying on your own cloud, you can [create custom plans](bring-your-own-cloud.md#create-custom-resource-plans) to make best use of the high vCPU and memory of GPU nodes.

### Configure and optimise workloads for GPUs: Persist models and training data

Your services and jobs are stateless, and will not persist any changes or downloads between restarts. You can add volumes to persist data, so you don’t have to repeatedly download models and datasets, and you can save model checkpoints .

You can [mount persistent volumes](databases-and-persistence.md#add-a-persistent-volume) for your applications at the default paths for model caches, for example:

| Framework/image | Default model/data path | Purpose |
| --- | --- | --- |
| **vLLM** | `/root/.cache/huggingface` | Hugging Face model and tokenizer cache |
| **Ollama** | `/root/.ollama` | Model downloads |
| **Jupyter Notebook** | `/home/jovyan` | Notebook data |

You should refer to your application or library's documentation to find the default paths, or environment variable keys to override the default directories for downloads.

#### Configure and optimise workloads for GPUs: Use external storage

You can also configure your application to use external storage to persist models, datasets, configuration, and other data outside your service and job containers.

This allows you to scale your instances up while persisting data, and to share data between different services and jobs.

You can deploy [databases](databases-and-persistence.md#stateful-workloads-on-northflank) as well as [MinIO, an S3-compatible datastore](databases-and-persistence.md#deploy-minio®-on-northflank) and implement the relevant SDKs/libraries in your application.

### Configure and optimise workloads for GPUs: Next steps

- [Deploy a GPU project on Northflank: Deploy a GPU-enabled project on Northflank's managed cloud.](gpu-workloads.md#deploy-gpus-on-northflanks-managed-cloud-deploy-a-gpu-enabled-project)
- [Deploy GPU workloads in your own cloud: Deploy GPU nodes and workloads in your own cloud provider account.](gpu-workloads.md#deploy-gpus-in-your-own-cloud)

## Deploy GPUs in your own cloud

Source: https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-in-your-own-cloud.md

You can run GPU workloads in your own cloud account using Northflank.

To get started you'll need a [cloud account](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank) integrated with your team, on a provider that supports the GPUs you want to use. You can check the [GPUs available on Northflank here](https://northflank.com/cloud/gpus).

### Deploy GPUs in your own cloud: Deploy a cluster and a GPU node pool

To run GPU workloads you must have GPU-enabled node-types available. You can deploy GPU node pools on an existing cluster, or create a new one. The GPU nodes you want to use must be available in the region that your cluster is deployed in.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/cluster/new) to deploy a new cluster.
You should [create one node pool](bring-your-own-cloud.md#deploy-and-scale-node-pools) of non-GPU nodes with at least 4 vCPU and 8GB memory to provision Northflank system components.

Next, create a node pool and select the type of GPU node you want to deploy. Most GPU node types are listed as accelerator optimised and you can type this category into the node type dropdown to filter nodes, or search by node type name.

#### Deploy GPUs in your own cloud: Timeslicing

The number of GPUs available to each node varies by node type. Without timeslicing, one GPU process can use a single GPU at a time.

You can enable timeslicing to allow multiple workloads to schedule on an available GPU on a node, which has benefits and drawbacks [detailed below](gpu-workloads.md#deploy-gpus-in-your-own-cloud-allow-multiple-workloads-to-use-a-gpu-with-timeslicing). You can specify the number of slices to allow per GPU.

#### Deploy GPUs in your own cloud: Scheduling rules

In addition to [standard scheduling rules](bring-your-own-cloud.md#deploy-and-scale-node-pools-set-scheduling-rules) you can choose whether to allow non-GPU workloads to provision to GPU node pools. By default, GPU node pools are restricted to GPU workloads; you can make use of any available capacity on nodes by disabling this restriction in advanced settings. However, if your GPU nodes are filled to capacity with non-GPU workloads, GPU workloads will be unable to schedule.

![Creating a node pool with GPU nodes on a cloud provider in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/run-gpu-workloads-in-your-cluster/configuring-gpu-node-pool.png)

### Deploy GPUs in your own cloud: Configure workloads to deploy on GPU nodes

#### Deploy GPUs in your own cloud: Create a project on your cluster

GPU deployment options will only appear in a service or job if the project you create it in uses a cluster with GPU nodes.

You can create a new project, select bring your own cloud, and then choose your cluster with GPU node pools.

#### Deploy GPUs in your own cloud: Deploy a service or job with GPU access

You can enable GPU deployment in advanced resource options in the resources section when you create a new service or job, or update an existing one.

Select the type of GPU to deploy the workload to, and the number of GPUs to use. The options available depend on the node types in your cluster.

You can also choose whether to allow the workload to use a node pool with [timeslicing](gpu-workloads.md#deploy-gpus-in-your-own-cloud-allow-multiple-workloads-to-use-a-gpu-with-timeslicing) enabled.

If no nodes of the chosen type are available, or no nodes that match the workload's timeslicing preference, your workload will not schedule until capacity becomes available on a matching node. You can gain more capacity either by [scaling up existing node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools), creating new ones, or scaling down other workloads using the relevant node type.

![Enabling a resource to use GPU nodes on a cloud provider in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/run-gpu-workloads-in-your-cluster/configuring-gpu-workload-resources.png)

### Deploy GPUs in your own cloud: Allow multiple workloads to use a GPU with timeslicing

Without timeslicing each GPU workload will be allocated to one GPU, and the node will only be able to schedule as many workloads as there are GPUs on the node.

You can enable timeslicing to enable multiple GPU workloads to schedule per GPU, and set the number of slices to allow on each GPU. The number of slices defines how many workloads can share GPU execution time per GPU on the node.

| GPUs per node | Node count | Timeslicing enabled (number of slices) | GPU workloads that can be scheduled |
| --- | --- | --- | --- |
| 1 | 1 | No (1) | 1 |
| 1 | 1 | Yes (10) | 10 |
| 4 | 3 | No (1) | 12 |
| 4 | 3 | Yes (10) | 120 |

Each workload is guaranteed the same amount of GPU execution time, but there is no guarantee on GPU memory allocation per workload. Each workload scheduled will try to use as much GPU resources as possible, which depends on the number of GPU workloads that are deployed to the node and the resources each workload requests. Workloads schedule processes on the GPU and each workload may schedule multiple processes on a GPU. This means the number of processes running on a GPU and the number of workloads scheduled per GPU are not a one-to-one ratio.

> [!important]
> Timesliced workloads are not fault or memory isolated. For example, if one workload on a time-sliced GPU crashes due to a memory error, all workloads sharing the GPU will crash.

### Deploy GPUs in your own cloud: GPU workload scheduling

When you deploy a GPU workload, Northflank will attempt to schedule it to a node that matches the selected GPU. You must also have capacity available for the configured [compute plan](scale.md#scale-cpu-and-memory) and [ephemeral and persistent storage](scale.md#increase-storage).

Workloads can only be deployed to a [spot node](bring-your-own-cloud.md#deploy-and-scale-node-pools-use-spot-instances) if they have been assigned a [spot tag](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-use-spot-instances).

You can use [labels and tags](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-create-node-affinity-rules) to further refine which node pools your workloads can be deployed to.

### Deploy GPUs in your own cloud: Next steps

- [Schedule workloads to specific node pools: Allow or disallow different types of workloads from being scheduled on a node pool.](bring-your-own-cloud.md#deploy-and-scale-node-pools-set-scheduling-rules)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Configure applications to use GPUs: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-configure-applications-to-use-gpus)
- [Build with GPU-optimised images: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-build-with-gpu-optimised-images)
- [Right-size resources for GPU workloads: Scale CPU, memory, and ephemeral storage to handle GPU workloads.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-right-size-resources)
- [Persist models and data: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-persist-models-and-training-data)

## Deploy GPUs on Northflank's managed cloud

Source: https://northflank.com/docs/v1/application/gpu-workloads/deploy-gpus-on-northflank-cloud.md

You can run GPU workloads on Northflank's managed cloud.

This allows you to use GPU acceleration for your applications and services and only pay for the resources consumed. To deploy GPU workloads on Northflank you must create a GPU-enabled project.

You can deploy combined and deployment services and jobs with GPU access. Northflank GPUs do not currently support timeslicing.

Check the [pricing page](https://northflank.com/pricing) to find out more about GPU pricing.

### Deploy GPUs on Northflank's managed cloud: Deploy a GPU-enabled project

To deploy GPU workloads on Northflank's managed cloud, you'll first need to [create a new project](https://app.northflank.com/s/account/projects/new) in a GPU-enabled region.

Select your desired region from the list under GPU, and create your project as normal. Any services or jobs deployed in this project will have a GPU option available in resources.

Different regions may have different availability of specific GPU models.

### Deploy GPUs on Northflank's managed cloud: Deploy a GPU workload on Northflank

To deploy workloads with GPU access, [create a new service or job](https://app.northflank.com/s/project/create/service) as normal, or navigate to the resources page of an existing service or job.

Select an available GPU from the drop-down list as well as the number of GPUs to deploy with. Each instance of a service will have access to the number of GPU models selected.

| GPU Count | Instances deployed | GPUs per instance | Total GPUs in the service |
| --- | --- | --- | --- |
| 1 | 1 | 1 | 1 |
| 4 | 1 | 4 | 4 |
| 8 | 2 | 8 | 16 |

You may need to configure your workload to make use of GPU hardware, or multiple GPUs.

### Deploy GPUs on Northflank's managed cloud: Next steps

- [Configure applications to use GPUs: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-configure-applications-to-use-gpus)
- [Build with GPU-optimised images: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-build-with-gpu-optimised-images)
- [Right-size resources for GPU workloads: Scale CPU, memory, and ephemeral storage to handle GPU workloads.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-right-size-resources)
- [Persist models and data: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-persist-models-and-training-data)

## GPUs on Northflank

Source: https://northflank.com/docs/v1/application/gpu-workloads/gpus-on-northflank.md

You can deploy services and run jobs on Northflank with GPU access, using Northflank's managed cloud or in your own cloud account.

This lets you run GPU workloads for AI, ML, data analysis, simulations, graphics rendering, and other tasks which require high-performance computing on Northflank.

### GPUs on Northflank: Deploy GPUs on Northflank's managed cloud

You can create GPU-enabled projects on Northflank's managed cloud and only pay for the resources consumed, so you can deploy workloads with access powerful GPUs without having to configure your own Kubernetes clusters.

- [Deploy a GPU project on Northflank: Deploy a GPU-enabled project on Northflank's managed cloud.](gpu-workloads.md#deploy-gpus-on-northflanks-managed-cloud-deploy-a-gpu-enabled-project)
- [Deploy a GPU workload on Northflank's managed cloud: Deploy a GPU-enabled workload on Northflank's managed cloud.](gpu-workloads.md#deploy-gpus-on-northflanks-managed-cloud-deploy-a-gpu-workload-on-northflank)

### GPUs on Northflank: Deploy GPUs in your own cloud

You can deploy and manage GPU-enabled nodes on [other cloud providers](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank) using Northflank. This allows you to retain control of your infrastructure and existing billing relationships, while using Northflank to deploy GPU workloads.

Any Northflank projects deployed to your cluster will be able to make use of the GPU-enabled nodes.

- [Deploy GPU node pools: Deploy node pools with GPU nodes on a Kubernetes cluster with Northflank.](gpu-workloads.md#deploy-gpus-in-your-own-cloud-deploy-a-cluster-and-a-gpu-node-pool)
- [Configure workloads to deploy on GPU nodes: Create a project on your own cluster with GPU nodes and configure workloads to deploy to it.](gpu-workloads.md#deploy-gpus-in-your-own-cloud-configure-workloads-to-deploy-on-gpu-nodes)
- [Allow multiple workloads to use a GPU with timeslicing: You can enable timeslicing to enable multiple GPU workloads to schedule per GPU, and set the number of slices to allow on each GPU.](gpu-workloads.md#deploy-gpus-in-your-own-cloud-allow-multiple-workloads-to-use-a-gpu-with-timeslicing)
- [Schedule GPU workloads to specific nodes: Ensure that your GPU workloads can be scheduled on your cluster.](gpu-workloads.md#deploy-gpus-in-your-own-cloud-gpu-workload-scheduling)

### GPUs on Northflank: Configure and deploy GPU workloads

Generally your GPU workloads will not require any extra configuration to run on Northflank, and you can select a GPU model for your service or job when creating or updating a service.

You will need to build with, or deploy, images compatible with the GPU model you wish to use, and you will need to correctly configure your deployed applications to make use of available GPUs.

- [Configure applications to use GPUs: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-configure-applications-to-use-gpus)
- [Build with GPU-optimised images: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-build-with-gpu-optimised-images)
- [Right-size resources for GPU workloads: Scale CPU, memory, and ephemeral storage to handle GPU workloads.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-right-size-resources)
- [Persist models and data: You can directly deploy or build your applications with Docker images that are optimised for your desired GPU model and AI/ML libraries.](gpu-workloads.md#configure-and-optimise-workloads-for-gpus-persist-models-and-training-data)
