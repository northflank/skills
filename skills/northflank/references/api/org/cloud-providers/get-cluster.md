# Get cluster

Source: https://northflank.com/docs/v1/api/org/cloud-providers/get-cluster.md

Get information about the given cluster

Required permission: Account > Cloud > Clusters > Read

**Path parameters:**

{object}
- `clusterId`: (string) (required) ID of the cluster

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) The ID of cluster
  - `name`: (string) (required) The name of the cluster. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 20)
  - `entityType`: (string) (enum: org, team)
  - `description`: (string) The description of the cluster. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `provider`: (string) (required) Cloud provider to be used for the selected resource (enum: aws, aws-eusc, azure, civo, gcp, oci, cloudflare, coreweave, nebius, aiven, backblaze, akamai, planetscale, openai, anthropic, byok)
  - `region`: (string) Region of the cluster. Can only be updated for BYOK clusters.
  - `status`: {object}
    - `state`: {object}
      - `state`: (string) (required) Current state of the cluster.
      - `transitionTime`: (string) Time of the last state transition. (format: date-time)
      - `reason`: (string) The reason, given the cluster is in an error state.
  - `kubernetesVersion`: (string) Deprecated: This field is no longer used, the version is now set by the platform.
  - `integrationId`: (string) Existing integration to use for this cluster. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
  - `storage`: {object}
    - `storageClasses`: [array of] {object}
        - `id`: (string) (required)
        - `name`: (string) (required)
        - `description`: (string)
        - `type`: (string) (enum: storage-class, snapshot-class)
        - `kubernetesName`: (string) (required)
        - `defaultSnapshotClass`: (string)
        - `options`: {object}
          - `capabilities`: {object}
            - `expansion`: (boolean) Increasing volume size after provisioning.
            - `snapshot`: (boolean) Point in time snapshotting of volumes.
          - `accessModes`: {object}
            - `ReadWriteOnce`: (boolean) Access mode where a volume is exclusively attached to a single pod at a time.
            - `ReadWriteMany`: (boolean) Access mode where a volume can be attached to multiple single pods at a time for read and write operations.
          - `storageSize`: {object}
            - `minValidSize`: (integer) Enforces a minimum storage size per addon or volume.
            - `maxValidSize`: (integer) Enforces a maximum storage size per addon or volume.
            - `suggestedOptions`: [array of] Specific storage size options to suggest in the UI. (integer)
          - `platform`: {object}
            - `supportedResources`: [array of] (string) (enum: addon, volume, build-cache)
    - `snapshotClasses`: [array of] {object}
        - `id`: (string) (required)
        - `name`: (string) (required)
        - `description`: (string)
        - `kubernetesName`: (string) (required)
  - `nodePools`: (multiple options) (required) An array of node pools for BYOC or BYOK. [array of] An array of node pools for BYOC. {object} Node pool configuration for BYOC clusters
      - `id`: (string) (required) ID of existing node pool. Must be passed when modifying existing node pools. Not relevant for new node pools (pattern: (^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)|(^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$)) (min length: 3) (max length: 63)
      - `nodeType`: (string) (required) Machine type to be used by the node pool.
      - `oci`: {object} OCI instance specific settings. Must respect ratios as determined by the selected node type.
        - `ocpu`: (integer) (required)
        - `memory`: (integer) (required)
      - `gcp`: {object} GCP specific settings.
        - `enablePrivateNodes`: (boolean) Set this flag to disable public IP assignment for nodes in this node pool.
      - `azure`: {object} Azure specific settings.
        - `systemPool`: (boolean) When 'provider' is 'azure', at least one system node pool is required per cluster.
        - `enablePublicNodeIp`: (boolean) When 'provider' is 'azure', set this flag to use public node IPs.
        - `vnetSubnetId`: (string) ID of the vnet subnet to use.
      - `aws`: {object} AWS specific node pool settings.
        - `launchTemplate`: {object} Specify a launch template to use for this node pool. When using a launch template, the disk size selection on the node pool level will be ignored.
          - `id`: (string) (required) ID of the launch template to use.
          - `version`: (integer) (required) Version of the launch template that should be used.
        - `rootVolume`: {object} Custom performance for the gp3 root volume. Requires AWS BYOC policy v3 or later. Omit to use automatic defaults.
          - `iops`: (integer) Provisioned IOPS for the gp3 root volume. Immutable after creation.
          - `throughput`: (integer) Provisioned throughput in MiB/s for the gp3 root volume. Immutable after creation.
        - `useLocalDisks`: (boolean) Use local disks for container images and ephemeral storage of workloads. Omit to enable automatically on eligible new pools. Enabling requires AWS BYOC policy v3 or later. This setting cannot change after creation.
      - `nebius`: {object} Nebius specific node pool settings.
        - `enablePublicNodeIps`: (boolean) Set this flag to assign public IPs to nodes in this node pool.
        - `osVersion`: (string) OS image version for nodes in this node pool.
        - `gpuDriverVersion`: (string) GPU driver version for nodes in this node pool.
        - `gpuClusterId`: (string) Nebius GPU cluster to attach the node pool to.
      - `nodeCount`: (integer) (required) Number of nodes to the node pool should be provisioned with.
      - `autoscaling`: {object} (nullable) Auto scaling settings to use for the node pool. Requires that the cloud provider supports this feature.
        - `enabled`: (boolean) Whether autoscaling is enabled for the node pool.
        - `min`: (integer) The minimum number of nodes the node pool can be scaled down to.
        - `max`: (integer) The maximum number of nodes the node pool can be scaled up to.
      - `computeResources`: {object}
        - `gpu`: {object}
          - `type`: (string) (required) GPU type associated with the node pool. (pattern: [a-z0-9])
          - `resources`: {object} (required)
            - `memoryInfo`: {object}
              - `sizeInGiB`: (number) Memory amount of the GPU in Gib. (format: float)
          - `count`: (integer) (required) Number of GPUs per node.
          - `timeslicing`: {object} Time-slicing configuration object.
            - `enabled`: (boolean) Whether or not to enable time-slicing on the GPU.
            - `numSlices`: (number) Sets the amount of slices per GPU, e.g. how many pods may be scheduled concurrently on each GPU. (format: float)
      - `preemptible`: (boolean) Configures node pool with preemptible / spot instances if enabled.
      - `diskType`: (string) The disk type to use.
      - `diskSize`: (integer) (required) Disk size in GB
      - `availabilityZones`: [array of] Zones in which the node pool should be provisioned. (string)
      - `subnets`: [array of] Subnets in which the node pool should be provisioned. Required if provider is `oci`. (string)
      - `scheduling`: {object} Define basic workload scheduling restrictions for this node pool
        - `allowJobs`: (boolean) Allow jobs to schedule to this node pool
        - `onlyGpuJobs`: (boolean) Restrict job scheduling to jobs which have GPU resources configured. Only relevant for GPU node pools.
        - `allowServices`: (boolean) Allow services to schedule to this node pool
        - `onlyGpuServices`: (boolean) Restrict service scheduling to services which have GPU resources configured. Only relevant for GPU node pools.
        - `allowAddons`: (boolean) Allow addons to schedule to this node pool
        - `allowBuilds`: (boolean) Allow builds to schedule to this node pool
        - `onlyGpuBuilds`: (boolean) Restrict build scheduling to builds which have GPU resources configured. Only relevant for GPU node pools.
        - `allowCeph`: (boolean) Allow the placement of Ceph pods
      - `labels`: {object} Set of label keys and values that can be used for advanced scheduling in combination with resource tag scheduling rules. | [array of] An array of node pools for BYOK. {object} Node pool configuration for BYOK clusters
      - `id`: (string) (required) ID of the node pool. Must be passed when modifying existing node pools. Not relevant for new node pools (pattern: (^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)|(^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$)) (min length: 3) (max length: 63)
      - `providerId`: (string) (required) ID which identifies kubernetes nodes as belonging to this pool. (pattern: (^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)|(^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$)) (min length: 3) (max length: 63)
      - `computeResources`: {object}
        - `gpu`: {object}
          - `supported`: (boolean) Whether this node pool consists of GPU nodes .
          - `type`: (string) GPU type associated with the node pool. (pattern: [a-z0-9])
          - `resources`: {object}
            - `memoryInfo`: {object}
              - `sizeInGiB`: (number) Memory amount of the GPU in Gib. (format: float)
          - `mig`: {object} Multi-Instance GPU (MIG). configuration object.
            - `enabled`: (boolean) Whether or not to enable Multi-Instance GPU (MIG).
            - `partitions`: [array of] The partitions to configure on the GPU. (string)
          - `timeslicing`: {object} Time-slicing configuration object.
            - `enabled`: (boolean) Whether or not to enable time-slicing on the GPU.
            - `numSlices`: (number) Sets the amount of slices per GPU, e.g. how many pods may be scheduled concurrently on each GPU. (format: float)
          - `count`: (integer) Number of GPUs per node.
      - `defaultPool`: (boolean) Fallback pool to which nodes which do not match any defined node pool are assigned. Exactly one default pool is required.
      - `preemptible`: (boolean) Configures node pool with preemptible / spot instances if enabled.
      - `scheduling`: {object} Define basic workload scheduling restrictions for this node pool
        - `allowJobs`: (boolean) Allow jobs to schedule to this node pool
        - `onlyGpuJobs`: (boolean) Restrict job scheduling to jobs which have GPU resources configured. Only relevant for GPU node pools.
        - `allowServices`: (boolean) Allow services to schedule to this node pool
        - `onlyGpuServices`: (boolean) Restrict service scheduling to services which have GPU resources configured. Only relevant for GPU node pools.
        - `allowAddons`: (boolean) Allow addons to schedule to this node pool
        - `allowBuilds`: (boolean) Allow builds to schedule to this node pool
        - `onlyGpuBuilds`: (boolean) Restrict build scheduling to builds which have GPU resources configured. Only relevant for GPU node pools.
        - `allowCeph`: (boolean) Allow the placement of Ceph pods
      - `platform`: {object}
        - `architecture`: (string) Platform architecture of the underlying node type. (enum: amd64, arm64)
      - `labels`: {object} Set of label keys and values that can be used for advanced scheduling in combination with resource tag scheduling rules.
  - `settings`: {object}
    - `builds`: {object}
      - `mode`: (string) Determines where builds are run: on Northflank infrastructure (paas), on this cluster (internal) or on a dedicated build cluster (build-cluster). (enum: paas, internal, build-cluster)
      - `plan`: (string) Plan to use for builds if they are run on the cluster (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
      - `clusterId`: (string) Cluster to use for scheduling builds (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
      - `caching`: {object} Cache settings for builds
        - `allow`: (boolean) Whether to allow local disk based caching for builds.
        - `storageClassName`: (string) Storage class used by default for local disk based caching.
    - `registry`: {object}
      - `mode`: (string) Determines where built images are stored: in the Northflank registry (paas) or in a self-hosted registry. (enum: paas, self-hosted)
      - `registryId`: (string) Credentials to use for storing of images. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `logging`: (multiple options) Logging settings {object} Logging via PaaS.
        - `mode`: (string) The logging mode. `paas` stores logs on Northflank infrastructure. (enum: paas) | {object} Logging via Loki (S3 storage).
        - `mode`: (string) (required) The logging mode. `loki` stores logs in your own storage via Loki. (enum: loki)
        - `loki`: {object}
          - `storageType`: (string) (required) (enum: s3)
          - `s3BucketName`: (string) (required) Name of the S3 bucket used for Loki log storage.
          - `s3AccessKey`: (string) (required) Access key for the S3 bucket used for Loki log storage.
          - `s3SecretKey`: (string) (required) Secret key for the S3 bucket used for Loki log storage.
          - `s3Region`: (string) (required) Region of the S3 bucket used for Loki log storage. | {object} Logging via Loki (GCS storage).
        - `mode`: (string) (required) The logging mode. `loki` stores logs in your own storage via Loki. (enum: loki)
        - `loki`: {object}
          - `storageType`: (string) (required) (enum: gcs)
          - `gcsBucketName`: (string) (required) Name of the GCS bucket used for Loki log storage.
          - `gcpIntegrationId`: (string) (required) ID of the GCP integration used to access the GCS bucket. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `networking`: {object}
      - `overlayNetwork`: (boolean) Whether overlay networking is enabled for this cluster.
      - `overlayCIDR`: (string) CIDR range for the overlay network. (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
      - `istio`: {object}
        - `enablePublicLoadBalancer`: (boolean) Whether the cluster runs a public ingress load balancer. Defaults to true.
        - `enablePrivateLoadBalancer`: (boolean) Whether the cluster runs a VPC ingress load balancer. Defaults to false; BYOK exposure is customer-controlled.
        - `privateLoadBalancerAwsSecurityGroupId`: (string) (nullable) Customer-managed frontend security group for a private AWS NLB managed by the AWS Load Balancer Controller. (pattern: ^sg-(?:[a-f0-9]{8}|[a-f0-9]{17})$)
        - `publicLoadBalancer`: {object} Customer configuration for a BYOK ingress Service. Immutable after first assignment; exposure is controlled by the customer.
          - `serviceAnnotations`: {object}
          - `loadBalancerClass`: (string) (pattern: ^(?:(?=[^/]{1,253}\/)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\/)?[a-zA-Z0-9](?:[a-zA-Z0-9_.-]{0,61}[a-zA-Z0-9])?(?![\s\S]))
        - `privateLoadBalancer`: {object} Customer configuration for a BYOK ingress Service. Immutable after first assignment; exposure is controlled by the customer.
          - `serviceAnnotations`: {object}
          - `loadBalancerClass`: (string) (pattern: ^(?:(?=[^/]{1,253}\/)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\/)?[a-zA-Z0-9](?:[a-zA-Z0-9_.-]{0,61}[a-zA-Z0-9])?(?![\s\S]))
    - `vanityDomains`: {object}
      - `apps`: {object}
        - `zoneName`: (string) (required)
        - `integrationId`: (string) (required)
      - `customDomains`: {object}
        - `zoneName`: (string) (required)
        - `integrationId`: (string) (required)
      - `loadBalancers`: {object}
        - `zoneName`: (string) (required)
        - `integrationId`: (string) (required)
    - `infrastructure`: {object}
      - `workloads`: {object} DEPRECATED: This field will be removed in the near future.
        - `runtimeClass`: (string) Defines which runtime scheduling constraints apply for workloads (enum: none, gvisor, kata-clh, kata-qemu)
      - `builds`: {object} DEPRECATED: This field will be removed in the near future.
        - `runtimeClass`: (string) Defines which runtime scheduling constraints apply for builds (enum: none, gvisor, kata-clh, kata-qemu)
      - `sandboxing`: {object}
        - `installGvisor`: (boolean)
        - `installMicroVm`: (boolean)
        - `defaultSandbox`: {object}
          - `builds`: (string) Default runtime class used for builds if none is configured (enum: none, gvisor, kata-clh, kata-qemu)
          - `jobs`: (string) Default runtime class used for jobs if none is configured (enum: none, gvisor, kata-clh, kata-qemu)
          - `services`: (string) Default runtime class used for services if none is configured (enum: none, gvisor, kata-clh, kata-qemu)
          - `addons`: (string) Default runtime class used for addons if none is configured (enum: none, gvisor, kata-clh, kata-qemu)
      - `installKata`: (boolean) DEPRECATED: This field will be removed in the near future.
      - `installGvisor`: (boolean) DEPRECATED: This field will be removed in the near future.
      - `cleanupVolumes`: (boolean)
      - `cleanupSnapshots`: (boolean)
      - `cephStorageProvider`: {object}
        - `enabled`: (boolean)
        - `resources`: {object}
          - `cpu`: (number) Configure the CPU resources per Ceph replica (format: float)
          - `memory`: (number) Configure the memory resources per Ceph replica (format: float)
          - `storage`: (number) Configure the data disk size per Ceph replica (format: float)
        - `enableMultiReadWriteStorage`: (boolean) Configure Ceph to be enable use of multi read write storage for persistent volumes on the cluster.
        - `enableSingleReadWriteStorage`: (boolean) Configure Ceph to be used as default storage class for single read write storage. This will replace the default storage of the cloud provider.
        - `enableErasureCoding`: (boolean) Configure Ceph to be set up with erasure coding. This will be less fault tolerant but more cost effective.
        - `enableTopologyAwareScheduling`: (boolean) Configure Ceph to be set up with topology aware scheduling, enforcing deployment across multiple zones.
    - `requestModifiers`: {object} Allows customising request modifier values.
      - `services`: {object} Request modifiers for services
        - `cpu`: (number) (required) (format: float)
        - `memory`: (number) (required) (format: float)
      - `jobs`: {object} Request modifiers for jobs
        - `cpu`: (number) (required) (format: float)
        - `memory`: (number) (required) (format: float)
      - `builds`: {object} Request modifiers for builds
        - `cpu`: (number) (required) (format: float)
        - `memory`: (number) (required) (format: float)
      - `addons`: {object} Request modifiers for addons
        - `cpu`: (number) (required) (format: float)
        - `memory`: (number) (required) (format: float)
  - `restrictions`: {object} BYOC restrictions configuration for controlling team access
    - `enabled`: (boolean) (required) Enable or disable BYOC restrictions for this entity
    - `teams`: [array of] List of teams that have access to this BYOC cluster {object}
        - `teamId`: (string) (required) The ID of the team that has access to this BYOC cluster (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 45)
  - `gcp`: {object} GCP specific data. Required when `provider` is `gcp`
    - `networking`: {object}
      - `network`: (string) Name of the GCP network the cluster should be created in. By default a new network will be created.
      - `subnetwork`: (string) Name of the GCP subnetwork the cluster should be created in. By default a new subnetwork will be created.
    - `enableAuthorizedIpRanges`: (boolean) Whether access to the Kubernetes API server should be restricted to authorized IP ranges.
    - `authorizedIpRanges`: [array of] IP ranges that are authorized to access the Kubernetes API server. (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
    - `projectId`: (string) GCP Project ID (pattern: ^[a-z][a-z0-9-]{4,28}[a-z0-9]$)
  - `aws`: {object} AWS specific data. Required when `provider` is `aws` or `aws-eusc`.
    - `enablePublicAccessCidrs`: (boolean) Whether access to the public Kubernetes API endpoint should be restricted to specific CIDR ranges.
    - `publicAccessCidrs`: [array of] CIDR ranges that are allowed to access the public Kubernetes API endpoint. (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
    - `subnetConfiguration`: {object}
      - `mode`: (string) (required) The mode of the AWS subnet configuration (enum: default-subnets-for-azs, explicit-subnets)
      - `vpcId`: (string) Id of the VPC
      - `subnets`: [array of] (required) List of subnets the cluster should be created for. At least 2 must be specified. (string)
    - `vpcEgress`: (boolean) If egress traffic from the cluster should come from a single static egress IP.
  - `oci`: {object} OCI specific data. Required when `provider` is `oci`.
    - `vcnConfiguration`: {object} (required)
      - `vcnId`: (string) (required) ID of the OCI VCN the cluster should be created in.
      - `subnetIdForKubernetesApi`: (string) (required) ID of the subnet to use for the Kubernetes API endpoint.
      - `subnetIdsForServiceLBs`: [array of] (required) IDs of the subnets to use for service load balancers. (string)
  - `azure`: {object} Azure specific data. Required when `provider` is `azure`.
    - `networking`: {object}
      - `vnetConfiguration`: {object}
        - `mode`: (string) (required) The vnet mode to use for this cluster. Use this to switch between creation of a new vnet per cluster or specifying a custom vnet. (enum: create-default, custom-vnet)
        - `vnetId`: (string) Azure vnetId that should be used for this cluster. By default a new vnet will be created.
      - `networkPluginMode`: (string) Optional setting to configure overlay mode on Azure. (enum: overlay)
    - `enableAuthorizedIpRanges`: (boolean) Whether access to the Kubernetes API server should be restricted to authorized IP ranges.
    - `authorizedIpRanges`: [array of] IP ranges that are authorized to access the Kubernetes API server. (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
  - `coreweave`: {object} CoreWeave specific data. Required when `provider` is `coreweave`.
    - `zone`: (string) (required) AZ of the cluster
    - `network`: {object} Network settings
      - `networkMode`: (string) (required) The network mode to use for this cluster. Use this to switch between the default network configuration and a custom VPC. (enum: create-default, custom)
      - `vpcId`: (string) ID of the CoreWeave VPC to use for this cluster.
      - `customPrefixNames`: {object}
        - `podCidrName`: (string) (required) Name of the VPC prefix to use for the pod CIDR.
        - `serviceCidrName`: (string) (required) Name of the VPC prefix to use for the service CIDR.
        - `internalLbCidrNames`: [array of] (required) Names of the VPC prefixes to use for internal load balancer CIDRs. (string)
  - `nebius`: {object} Nebius specific data. Required when `provider` is `nebius`.
    - `projectId`: (string) (required) Nebius project ID to place the cluster in.
    - `subnetId`: (string) (required) Nebius VPC subnet ID for the cluster.
  - `byok`: {object} BYOK specific data. Required when `provider` is `byok`.
    - `nodePoolProviderIdLabel`: (string) (required) The node label used to identify which provider node pool a node belongs to.
  - `coordinates`: {object} Geographic coordinates of the cluster. Optional, used for CDN geo-routing. Only applicable when `provider` is `byok`.
    - `latitude`: (number) (required) (format: float)
    - `longitude`: (number) (required) (format: float)
  - `dns`: (string) Auto-generated dns identifier for this cluster.
  - `updatedAt`: (string) (required) The time the cluster was last updated. (format: date-time)
  - `createdAt`: (string) (required) The time the cluster was created. (format: date-time)
  - `deletionRequested`: (boolean) (required) Indicates if provider resource deletion has been requested.

### API reference

GET /v1/cloud-providers/clusters/{clusterId}

GET /v1/teams/{teamId}/cloud-providers/clusters/{clusterId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/cloud-providers/clusters/{clusterId}"
```

```python
import requests

url = "https://api.northflank.com/v1/cloud-providers/clusters/{clusterId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details about the given cluster.

```json
{
  "data": {
    "id": "gcp-cluster-1",
    "name": "GCP Cluster 1",
    "entityType": "team",
    "description": "This is a new cluster.",
    "provider": "gcp",
    "region": "europe-west2",
    "status": {
      "state": {
        "state": "running"
      }
    },
    "kubernetesVersion": "1.30",
    "integrationId": "gcp-integration",
    "nodePools": [
      {
        "id": "6aa96121-0345-43ad-bade-af36d540c222",
        "nodeType": "n2-standard-8",
        "nodeCount": 3,
        "autoscaling": {
          "enabled": true,
          "min": 0,
          "max": 10
        },
        "computeResources": {
          "gpu": {
            "type": "h100",
            "resources": {
              "memoryInfo": {
                "sizeInGiB": 80
              }
            },
            "count": 1
          }
        },
        "preemptible": false,
        "diskSize": 100
      }
    ],
    "settings": {
      "builds": {
        "plan": "nf-compute-200"
      },
      "registry": {
        "registryId": "my-registry-credentials"
      },
      "requestModifiers": {
        "services": {
          "cpu": 0.5,
          "memory": 0.8
        },
        "jobs": {
          "cpu": 0.5,
          "memory": 0.8
        },
        "builds": {
          "cpu": 0.2,
          "memory": 0.5
        },
        "addons": {
          "cpu": 0.5,
          "memory": 0.8
        }
      }
    },
    "aws": {
      "subnetConfiguration": {
        "subnets": [
          "eu-west-1a",
          "eu-west-1a"
        ],
        "mode": "default-subnets-for-azs"
      }
    },
    "dns": "xxxxxxxxxx",
    "updatedAt": "2021-01-20T11:19:53.175Z",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "deletionRequested": false
  }
}
```

### CLI reference

$ northflank get cloud cluster

Options:

- `--clusterId <clusterId>`: ID of the cluster

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the given cluster.

```json
{
  "id": "gcp-cluster-1",
  "name": "GCP Cluster 1",
  "entityType": "team",
  "description": "This is a new cluster.",
  "provider": "gcp",
  "region": "europe-west2",
  "status": {
    "state": {
      "state": "running"
    }
  },
  "kubernetesVersion": "1.30",
  "integrationId": "gcp-integration",
  "nodePools": [
    {
      "id": "6aa96121-0345-43ad-bade-af36d540c222",
      "nodeType": "n2-standard-8",
      "nodeCount": 3,
      "autoscaling": {
        "enabled": true,
        "min": 0,
        "max": 10
      },
      "computeResources": {
        "gpu": {
          "type": "h100",
          "resources": {
            "memoryInfo": {
              "sizeInGiB": 80
            }
          },
          "count": 1
        }
      },
      "preemptible": false,
      "diskSize": 100
    }
  ],
  "settings": {
    "builds": {
      "plan": "nf-compute-200"
    },
    "registry": {
      "registryId": "my-registry-credentials"
    },
    "requestModifiers": {
      "services": {
        "cpu": 0.5,
        "memory": 0.8
      },
      "jobs": {
        "cpu": 0.5,
        "memory": 0.8
      },
      "builds": {
        "cpu": 0.2,
        "memory": 0.5
      },
      "addons": {
        "cpu": 0.5,
        "memory": 0.8
      }
    }
  },
  "aws": {
    "subnetConfiguration": {
      "subnets": [
        "eu-west-1a",
        "eu-west-1a"
      ],
      "mode": "default-subnets-for-azs"
    }
  },
  "dns": "xxxxxxxxxx",
  "updatedAt": "2021-01-20T11:19:53.175Z",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "deletionRequested": false
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.cloud.cluster({
  parameters: {
    "clusterId": "gcp-cluster-1"
  }
});
```

#### Example Response

 Details about the given cluster.

```json
{
  "data": {
    "id": "gcp-cluster-1",
    "name": "GCP Cluster 1",
    "entityType": "team",
    "description": "This is a new cluster.",
    "provider": "gcp",
    "region": "europe-west2",
    "status": {
      "state": {
        "state": "running"
      }
    },
    "kubernetesVersion": "1.30",
    "integrationId": "gcp-integration",
    "nodePools": [
      {
        "id": "6aa96121-0345-43ad-bade-af36d540c222",
        "nodeType": "n2-standard-8",
        "nodeCount": 3,
        "autoscaling": {
          "enabled": true,
          "min": 0,
          "max": 10
        },
        "computeResources": {
          "gpu": {
            "type": "h100",
            "resources": {
              "memoryInfo": {
                "sizeInGiB": 80
              }
            },
            "count": 1
          }
        },
        "preemptible": false,
        "diskSize": 100
      }
    ],
    "settings": {
      "builds": {
        "plan": "nf-compute-200"
      },
      "registry": {
        "registryId": "my-registry-credentials"
      },
      "requestModifiers": {
        "services": {
          "cpu": 0.5,
          "memory": 0.8
        },
        "jobs": {
          "cpu": 0.5,
          "memory": 0.8
        },
        "builds": {
          "cpu": 0.2,
          "memory": 0.5
        },
        "addons": {
          "cpu": 0.5,
          "memory": 0.8
        }
      }
    },
    "aws": {
      "subnetConfiguration": {
        "subnets": [
          "eu-west-1a",
          "eu-west-1a"
        ],
        "mode": "default-subnets-for-azs"
      }
    },
    "dns": "xxxxxxxxxx",
    "updatedAt": "2021-01-20T11:19:53.175Z",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "deletionRequested": false
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.get.cloud.cluster(
    cluster_id="gcp-cluster-1",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "gcp-cluster-1",
  "name": "GCP Cluster 1",
  "entityType": "team",
  "description": "This is a new cluster.",
  "provider": "gcp",
  "region": "europe-west2",
  "status": {
    "state": {
      "state": "running"
    }
  },
  "kubernetesVersion": "1.30",
  "integrationId": "gcp-integration",
  "nodePools": [
    {
      "id": "6aa96121-0345-43ad-bade-af36d540c222",
      "nodeType": "n2-standard-8",
      "nodeCount": 3,
      "autoscaling": {
        "enabled": true,
        "min": 0,
        "max": 10
      },
      "computeResources": {
        "gpu": {
          "type": "h100",
          "resources": {
            "memoryInfo": {
              "sizeInGiB": 80
            }
          },
          "count": 1
        }
      },
      "preemptible": false,
      "diskSize": 100
    }
  ],
  "settings": {
    "builds": {
      "plan": "nf-compute-200"
    },
    "registry": {
      "registryId": "my-registry-credentials"
    },
    "requestModifiers": {
      "services": {
        "cpu": 0.5,
        "memory": 0.8
      },
      "jobs": {
        "cpu": 0.5,
        "memory": 0.8
      },
      "builds": {
        "cpu": 0.2,
        "memory": 0.5
      },
      "addons": {
        "cpu": 0.5,
        "memory": 0.8
      }
    }
  },
  "aws": {
    "subnetConfiguration": {
      "subnets": [
        "eu-west-1a",
        "eu-west-1a"
      ],
      "mode": "default-subnets-for-azs"
    }
  },
  "dns": "xxxxxxxxxx",
  "updatedAt": "2021-01-20T11:19:53.175Z",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "deletionRequested": false
}
```
