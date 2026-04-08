# Scale

Generated from 5 application pages listed in `llms.txt`.

## Pages

- [Autoscale deployments](#autoscale-deployments)
- [Increase storage](#increase-storage)
- [Scale CPU and memory](#scale-cpu-and-memory)
- [Scale instances](#scale-instances)
- [Scale on Northflank](#scale-on-northflank)

## Autoscale deployments

Source: https://northflank.com/docs/v1/application/scale/autoscale-deployments.md

You can configure autoscaling to automatically respond to increases in activity on your deployments, and ensure you have the resources needed to process your traffic even at peak times.

Horizontal autoscaling allows your services to automatically scale up the number of instances for your deployment. The Northflank load-balancer will evenly distribute incoming traffic between different instances of a deployment.

### Autoscale deployments: Configure horizontal autoscaling

To enable autoscaling, expand advanced resource options in your deployment's resource page, or in the resources section when creating your deployment. This is available in combined and deployment services.

![The horizontal scaling form for a deployment in the Northflank application](https://assets.northflank.com/documentation/v1/application/scale/autoscale-deployments/horizontal-autoscaling.png)

Select enable horizontal autoscaling to turn on autoscaling for the deployment and view the configuration options:

- Minimum instances: set the minimum number of instances the deployment will scale down to. This should be set to the number of instances that can comfortably handle your deployment's normal level of activity.

- Maximum instances: set the maximum instances the deployment can scale up to, to limit your spend

- Scale on CPU threshold: enable and enter the value (% of CPU in use) to trigger scaling when your instances pass the threshold

- Scale on memory threshold: enable and enter the value (% of memory in use) to trigger scaling when your instances pass the threshold

- Scale on RPS (requests per second): enable and enter the value (number of requests per second) to trigger scaling when your instances pass the threshold

You can trigger autoscaling on either CPU or memory usage, RPS, or all. You can monitor the metrics for your containers in the [Northflank application](observe.md#view-metrics), or by using the [Northflank API](../api/retrieve-metrics.md) to decide upon the best thresholds to set for your services. If your usage spikes quite quickly, and/or your application takes some time to initialise, you may want to set lower thresholds so that new containers are available before the existing ones reach capacity.

#### Autoscale deployments: Custom metric autoscaling

If your application has autoscaling requirements based on metrics which are not supported by the platform (e.g. queue latency, tcp opened connections) you have the option to expose your own custom metrics via a Prometheus endpoint within your deployment.

To configure autoscaling on your own custom metrics the following data has to be configured in the autoscaling section of your service:

- The Prometheus endpoint and port exposed by the application have to be specified

- The metric name, metric type (Gauge or Counter) and the scaling threshold value have to be specified

> [!note]
> The metrics exposed by your application have to comply with the Prometheus metric structure

![The horizontal scaling form using custom metrics in the Northflank application](https://assets.northflank.com/documentation/v1/application/scale/autoscale-deployments/custom-metric-horizontal-autoscaling.png)

The metric type defines how the values returned by the Prometheus endpoint will be interpreted.

- Gauge: The value will be treated as is (useful for e.g. queue size)

- Counter: Applies a rate() query on the value to measure the rate of change (useful for e.g. message processing rate)

In both cases the resulting value will be averaged across all running pods.

#### Autoscale deployments: Horizontal autoscaling behaviour

Your deployment will be checked every 15 seconds to calculate whether to trigger autoscaling. The average usage across all your instances is taken for each metric. If you are using more than one metric your deployment will be scaled to the highest number of required instances from any metric.

The required number of instances is calculated using this formula: `requiredInstances = ceil[currentInstances * ( currentMetricValue / desiredMetricValue )]`.

When scaling up, autoscaling will not be triggered again until the new containers are in the [running state](observe.md#monitor-containers), which prevents the creation of too many new instances.

Downscaling compares all the checks at 15-second intervals from a moving 5-minute window to ensure capacity is not reduced too quickly based on short-term drops in activity. For example, if a deployment is scaled to 5 instances and checks in the 5-minute window calculate that the deployment can be scaled down to either 1, 3, or 4 instances, then the deployment will be scaled down to 4 instances. If at any point a check returns a higher number of required instances, the deployment will immediately be scaled up.

### Autoscale deployments: Next steps

- [Monitor containers: Monitor the health and resource usage of deployments, and view detailed logs and metrics for individual container.](observe.md#monitor-containers)
- [View metrics: View detailed, real-time metrics from builds, deployments, and more.](observe.md#view-metrics)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)

## Increase storage

Source: https://northflank.com/docs/v1/application/scale/increase-storage.md

Your runtime instances have access to 1GB of ephemeral storage by default to allow your workloads to download and process data.

Ephemeral storage will be erased when the container is restarted or terminated, and the data lost. Ephemeral storage is allocated to each running container, and cannot be shared between multiple containers.

Ephemeral storage is available in combined services, deployment services, and jobs.

### Increase storage: Scale ephemeral storage

You can increase the ephemeral storage available to containers by expanding advanced resource options in the resources section. Ephemeral storage is available for builds, deployments, and jobs. Any data written to ephemeral storage will be lost when the container is terminated.

If a container attempts to create a file larger than the ephemeral storage assigned to it, it may be evicted. This will trigger a restart for deployments.

The ephemeral storage limits do not apply to paths where a [persistent volume is mounted](scale.md#increase-storage-add-persistent-storage).

Running deployments will be restarted with the new amount of storage.

![Increasing the ephemeral storage available to a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/scale/increase-storage/add-ephemeral.png)

### Increase storage: Add persistent storage

You can make persistent storage available to deployments with a wide range of managed [databases](databases-and-persistence.md#deploy-a-database), which you can deploy easily and scale horizontally and vertically.

For other use cases you can also attach a [persistent volume](databases-and-persistence.md#add-a-persistent-volume) to a runtime instance.

### Increase storage: Next steps

- [Deploy a database: Create a database to use with your Northflank deployments.](databases-and-persistence.md#deploy-a-database)
- [Add a persistent volume: Add persistent volumes to your deployments.](databases-and-persistence.md#add-a-persistent-volume)
- [Scale instances: Easily increase or decrease the amount of instances to run depending on demand for your service.](scale.md#scale-instances)
- [Increase CPU and memory: Power-up your services by adding memory and moving from shared to dedicated CPU usage.](scale.md#scale-cpu-and-memory)

## Scale CPU and memory

Source: https://northflank.com/docs/v1/application/scale/scale-cpu-and-memory.md

You can increase the proportion of CPU and memory dedicated to a service on the resources page, available for all Northflank services.

Increasing the CPU share, or assigning one or multiple CPUs, and memory size can be useful if builds are taking a long time or if your service is handling intensive tasks.

![Selecting the compute plan for a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/scale/scale-cpu-and-memory-resources/scale-compute.png)

See [Northflank pricing plans](https://northflank.com/pricing) for CPU and memory resources.

### Scale CPU and memory: Increase Docker SHM size

You can configure the amount of available memory-backed disk space available to `/dev/shm` from the resources page of combined services, deployment services, and jobs. The default SHM size assigned to containers is 64MB.

Using `/dev/shm/` can significantly increase performance over using `/tmp` for I/O intensive processes.

Writing to `/dev/shm` will incur memory usage of the container. With insufficient container resources this may lead to out-of-memory conditions and crash your container.

### Scale CPU and memory: Next steps

- [Scale instances: Easily increase or decrease the amount of instances to run depending on demand for your service.](scale.md#scale-instances)
- [Increase storage: Increase the persistent storage available for your replicas.](scale.md#increase-storage)
- [Enable autoscaling: Increase availability and reduce cost by automatically responding to changes in usage of your deployments.](scale.md#autoscale-deployments)

## Scale instances

Source: https://northflank.com/docs/v1/application/scale/scale-instances.md

You can increase or decrease the number of running instances of your deployed services to meet demand.

The Northflank load-balancer will automatically ensure an even distribution of traffic to each running instance, avoiding containers that are initialising, terminating, or failing.

Each instance created will have the same resources (compute power, memory and storage) as configured in the service.

Scaling a database or addon will create additional replicas of the database or storage to increase availability, however this works differently depending on the type of database/addon.

![Scaling the number of instances for a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/scale/scale-replicas-instances/scale-instances.png)

### Scale instances: Scale a service

You can increase or decrease the number of instances from the service overview using the  scaling button in the header, or from the resources page.

Each instance will have the same resources as is configured for the service and Northflank will begin sending traffic to the new containers when they enter a healthy state.

Scaling a service to 0 instances will make it unavailable. If you leave [CI](release.md#manage-cicd) enabled the service will still build the latest commit to the linked repository, if you leave [CD](release.md#manage-cicd) enabled it will also deploy that latest build when scaled up again.

### Scale instances: Set the grace period for containers

You can set the grace period (in seconds) allowed for a container to complete its shutdown phase in combined services, deployment services, and jobs. The grace period defines the maximum amount of time between a container receiving a SIGKILL after being sent a SIGTERM. By default, the grace period is 30 seconds.

You may want to increase this if your application includes processes which require being shutdown gracefully, and are terminated prematurely by SIGKILL.

The container may terminate earlier if the workload finishes executing before the grace period expires.

### Scale instances: Next steps

- [Scale a database: Increase the storage size, number of replicas, and the available CPU and memory to improve availability and performance.](databases-and-persistence.md#scale-a-database)
- [Increase CPU and memory: Power-up your services by adding memory and moving from shared to dedicated CPU usage.](scale.md#scale-cpu-and-memory)
- [Increase storage: Increase the persistent storage available for your replicas.](scale.md#increase-storage)
- [Enable autoscaling: Increase availability and reduce cost by automatically responding to changes in usage of your deployments.](scale.md#autoscale-deployments)

## Scale on Northflank

Source: https://northflank.com/docs/v1/application/scale/scale-on-northflank.md

You can scale your resources on Northflank horizontally and vertically. Increase the resources available to individual instances, or increase the amount of instances for your deployments.

Check the [metrics](observe.md#view-metrics) for your addon replicas, builds, and deployments in order to identify bottlenecks which may be impacting your resources.

See [Northflank pricing plans](https://northflank.com/pricing) for compute plans available on Northflank's managed cloud, as well as storage and network egress costs.

### Scale on Northflank: Scale instances

You can increase the available vCPU and memory allocated to each instance of a service.

- [Scale instances: Easily increase or decrease the amount of instances to run depending on demand for your service.](scale.md#scale-instances)

### Scale on Northflank: Scale compute

You can scale vertically by increasing the available vCPU and memory allocated to each instance of a deployment.

You can select a compute plan for Northflank services, builds, jobs, databases, and other addons.

- [Increase CPU and memory: Power-up your services by adding memory and moving from shared to dedicated CPU usage.](scale.md#scale-cpu-and-memory)

### Scale on Northflank: Scale storage

You can scale horizontally and vertically on Northflank with no unexpected spend.

You can increase the number of instances running each deployment, or replicas of your databases, and increase the available computing power, memory, and storage space allocated to each instance.

You can also configure autoscaling to handle spikes in activity - never suffer from a loss of service from high traffic or intense workloads, while avoiding the cost of permanently running the number of instances required at your peak usage.

You can check the [metrics](observe.md#view-metrics) for your builds or running instances in order to identify bottlenecks which may be impacting your service.

- [Increase storage: Increase the persistent storage available for your replicas.](scale.md#increase-storage)

### Scale on Northflank: Use autoscaling

You can configure autoscaling to handle spikes in activity for your continuous deployments.

This can help you avoid a loss of service from high traffic or unexpected spikes in usage, without the cost of permanently running the number of instances required at peak usage.

- [Enable autoscaling: Increase availability and reduce cost by automatically responding to changes in usage of your deployments.](scale.md#autoscale-deployments)

### Scale on Northflank: Scale using infrastructure as code

You can configure service and addon resources within a template, and update your infrastructure by running a template or pushing to git.

- [Infrastructure as code: Automate workflows, share deployments, and automate complex tasks using Northflank templates.](infrastructure-as-code.md#infrastructure-as-code-on-northflank)

### Scale on Northflank: Scale your own cloud

You can add and scale node pools of different node types, and enable autoscaling for clusters deployed in your own cloud account. You can also create custom plans for your team to deploy workloads with vCPU and memory resources that you specify.

- [Bring your own cloud to Northflank: Use all the features of the Northflank platform on other cloud hosting providers, with control over your own infrastructure.](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Create custom resource plans: Create custom plans for your team to deploy workloads and build code on your own clusters.](bring-your-own-cloud.md#create-custom-resource-plans)
