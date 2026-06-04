# List clusters

Source: https://northflank.com/docs/v1/api/org/cloud-providers/list-clusters.md

Lists clusters for the authenticated user or team.

Required permission: Account > Cloud > Clusters > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `clusters`: [array of] {object}
     - `id`: (string) (required) The ID of cluster
     - `name`: (string) (required) The name of the cluster. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 20)
     - `entityType`: (string) (enum: org, team)
     - `description`: (string) The description of the cluster. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `provider`: (string) (required) Cloud provider to be used for the selected resource (enum: aws, azure, civo, gcp, oci, cloudflare, coreweave, aiven, backblaze, akamai, byok)
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
               - `suggestedOptions`: [array of] (integer)
             - `platform`: {object}
               - `supportedResources`: [array of] (string) (enum: addon, volume, build-cache)
       - `snapshotClasses`: [array of] {object}
           - `id`: (string) (required)
           - `name`: (string) (required)
           - `description`: (string)
           - `kubernetesName`: (string) (required)
     - `nodePools`: (multiple options) [array of] {object}
           - `id`: (string) (required) ID of existing node pool. Must be passed when modifying existing node pools. Not relevant for new node pools (pattern: (^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)|(^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$)) (min length: 3) (max length: 63)
           - `nodeType`: (string) (required) Machine type to be used by the node pool.
           - `oci`: {object}
             - `ocpu`: (integer) (required)
             - `memory`: (integer) (required)
           - `gcp`: {object}
             - `enablePrivateNodes`: (boolean) Set this flag to disable public IP assignment for nodes in this node pool.
           - `azure`: {object}
             - `systemPool`: (boolean) When 'provider' is 'azure', at least one system node pool is required per cluster.
             - `enablePublicNodeIp`: (boolean) When 'provider' is 'azure', set this flag to use public node IPs.
             - `vnetSubnetId`: (string) ID of the vnet subnet to use.
           - `aws`: {object}
             - `launchTemplate`: {object}
               - `id`: (string) (required) ID of the launch template to use.
               - `version`: (integer) (required) Version of the launch template that should be used.
           - `nodeCount`: (integer) (required) Number of nodes to the node pool should be provisioned with.
           - `autoscaling`: {object}
             - `enabled`: (boolean)
             - `min`: (integer)
             - `max`: (integer)
           - `computeResources`: {object}
             - `gpu`: {object}
               - `type`: (string) (required) GPU type associated with the node pool. (pattern: [a-z0-9])
               - `resources`: {object}
                 - `memoryInfo`: {object}
                   - `sizeInGiB`: (number) Memory amount of the GPU in Gib. (format: float)
               - `count`: (integer) (required) Number of GPUs per node.
               - `timeslicing`: {object}
                 - `enabled`: (boolean) Whether or not to enable time-slicing on the GPU.
                 - `numSlices`: (number) Sets the amount of slices per GPU, e.g. how many pods may be scheduled concurrently on each GPU. (format: float)
           - `preemptible`: (boolean) Configures node pool with preemptible / spot instances if enabled.
           - `diskType`: (string) The disk type to use.
           - `diskSize`: (integer) (required) Disk size in GB
           - `availabilityZones`: [array of] (string)
           - `subnets`: [array of] (string) Subnets id.
           - `scheduling`: {object}
             - `allowJobs`: (boolean) Allow jobs to schedule to this node pool
             - `onlyGpuJobs`: (boolean) Restrict job scheduling to jobs which have GPU resources configured. Only relevant for GPU node pools.
             - `allowServices`: (boolean) Allow services to schedule to this node pool
             - `onlyGpuServices`: (boolean) Restrict service scheduling to services which have GPU resources configured. Only relevant for GPU node pools.
             - `allowAddons`: (boolean) Allow addons to schedule to this node pool
             - `allowBuilds`: (boolean) Allow builds to schedule to this node pool
             - `onlyGpuBuilds`: (boolean) Restrict build scheduling to builds which have GPU resources configured. Only relevant for GPU node pools.
             - `allowCeph`: (boolean) Allow the placement of Ceph pods
           - `labels`: {object} | [array of] {object}
           - `id`: (string) (required) ID of the node pool. Must be passed when modifying existing node pools. Not relevant for new node pools (pattern: (^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)|(^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$)) (min length: 3) (max length: 63)
           - `providerId`: (string) (required) ID which identifies kubernetes nodes as belonging to this pool. (pattern: (^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)|(^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$)) (min length: 3) (max length: 63)
           - `computeResources`: {object}
             - `gpu`: {object}
               - `supported`: (boolean) Whether this node pool consists of GPU nodes .
               - `type`: (string) GPU type associated with the node pool. (pattern: [a-z0-9])
               - `resources`: {object}
                 - `memoryInfo`: {object}
                   - `sizeInGiB`: (number) Memory amount of the GPU in Gib. (format: float)
               - `mig`: {object}
                 - `enabled`: (boolean) Whether or not to enable Multi-Instance GPU (MIG).
                 - `partitions`: [array of] (string)
               - `timeslicing`: {object}
                 - `enabled`: (boolean) Whether or not to enable time-slicing on the GPU.
                 - `numSlices`: (number) Sets the amount of slices per GPU, e.g. how many pods may be scheduled concurrently on each GPU. (format: float)
               - `count`: (integer) Number of GPUs per node.
           - `defaultPool`: (boolean) Fallback pool to which nodes which do not match any defined node pool are assigned. Exactly one default pool is required.
           - `preemptible`: (boolean) Configures node pool with preemptible / spot instances if enabled.
           - `scheduling`: {object}
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
           - `labels`: {object}
     - `settings`: {object}
       - `builds`: {object}
         - `mode`: (string) (enum: paas, internal, build-cluster)
         - `plan`: (string) Plan to use for builds if they are run on the cluster (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
         - `clusterId`: (string) Cluster to use for scheduling builds (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
         - `caching`: {object}
           - `allow`: (boolean) Whether to allow local disk based caching for builds.
           - `storageClassName`: (string) Storage class used by default for local disk based caching.
       - `registry`: {object}
         - `mode`: (string) (enum: paas, self-hosted)
         - `registryId`: (string) Credentials to use for storing of images. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
       - `logging`: (multiple options) {object}
           - `mode`: (string) (enum: paas) | {object}
           - `mode`: (string) (required) (enum: loki)
           - `loki`: {object}
             - `storageType`: (string) (required) (enum: s3)
             - `s3Region`: (string) (required)
             - `s3BucketName`: (string) (required) | {object}
           - `mode`: (string) (required) (enum: loki)
           - `loki`: {object}
             - `storageType`: (string) (required) (enum: gcs)
             - `gcsBucketName`: (string) (required)
             - `gcpIntegrationId`: (string) (required) (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
       - `networking`: {object}
         - `overlayNetwork`: (boolean) Whether overlay networking is enabled for this cluster.
         - `overlayCIDR`: (string) CIDR range for the overlay network. (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
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
         - `workloads`: {object}
           - `runtimeClass`: (string) (enum: none, gvisor, kata-clh, kata-qemu)
         - `builds`: {object}
           - `runtimeClass`: (string) (enum: none, gvisor, kata-clh, kata-qemu)
         - `sandboxing`: {object}
           - `installGvisor`: (boolean)
           - `installMicroVm`: (boolean)
           - `defaultSandbox`: {object}
             - `builds`: (string) (enum: none, gvisor, kata-clh, kata-qemu)
             - `jobs`: (string) (enum: none, gvisor, kata-clh, kata-qemu)
             - `services`: (string) (enum: none, gvisor, kata-clh, kata-qemu)
             - `addons`: (string) (enum: none, gvisor, kata-clh, kata-qemu)
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
       - `requestModifiers`: {object}
         - `services`: {object}
           - `cpu`: (number) (required) (format: float)
           - `memory`: (number) (required) (format: float)
         - `jobs`: {object}
           - `cpu`: (number) (required) (format: float)
           - `memory`: (number) (required) (format: float)
         - `builds`: {object}
           - `cpu`: (number) (required) (format: float)
           - `memory`: (number) (required) (format: float)
         - `addons`: {object}
           - `cpu`: (number) (required) (format: float)
           - `memory`: (number) (required) (format: float)
       - `skipInstall`: (boolean)
     - `restrictions`: {object}
       - `enabled`: (boolean) (required) Enable or disable BYOC restrictions for this entity
       - `teams`: [array of] {object}
           - `teamId`: (string) (required) The ID of the team that has access to this BYOC cluster
     - `gcp`: {object}
       - `networking`: {object}
         - `network`: (string)
         - `subnetwork`: (string)
       - `enableAuthorizedIpRanges`: (boolean)
       - `authorizedIpRanges`: [array of] (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
       - `projectId`: (string) GCP Project ID (pattern: ^[a-z][a-z0-9-]{4,28}[a-z0-9]$)
     - `aws`: {object}
       - `enablePublicAccessCidrs`: (boolean)
       - `publicAccessCidrs`: [array of] (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
       - `subnetConfiguration`: {object}
         - `mode`: (string) (required) The mode of the AWS subnet configuration (enum: default-subnets-for-azs, explicit-subnets)
         - `vpcId`: (string) Id of the VPC
         - `subnets`: [array of] (string)
       - `vpcEgress`: (boolean) If egress traffic from the cluster should come from a single static egress IP.
     - `oci`: {object}
       - `vcnConfiguration`: {object}
         - `vcnId`: (string) (required)
         - `subnetIdForKubernetesApi`: (string) (required)
         - `subnetIdsForServiceLBs`: [array of] (string)
     - `azure`: {object}
       - `networking`: {object}
         - `vnetConfiguration`: {object}
           - `mode`: (string) (required) The vnet mode to use for this cluster. Use this to switch between creation of a new vnet per cluster or specifying a custom vnet. (enum: create-default, custom-vnet)
           - `vnetId`: (string) Azure vnetId that should be used for this cluster. By default a new vnet will be created.
         - `networkPluginMode`: (string) Optional setting to configure overlay mode on Azure. (enum: overlay)
       - `enableAuthorizedIpRanges`: (boolean)
       - `authorizedIpRanges`: [array of] (string) (pattern: ^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$)
     - `coreweave`: {object}
       - `zone`: (string) (required) AZ of the cluster
       - `network`: {object}
         - `networkMode`: (string) (required) (enum: create-default, custom)
         - `vpcId`: (string)
         - `customPrefixNames`: {object}
           - `podCidrName`: (string) (required)
           - `serviceCidrName`: (string) (required)
           - `internalLbCidrNames`: [array of] (string)
     - `byok`: {object}
       - `nodePoolProviderIdLabel`: (string) (required)
     - `coordinates`: {object}
       - `latitude`: (number) (required) (format: float)
       - `longitude`: (number) (required) (format: float)
     - `dns`: (string) Auto-generated dns identifier for this cluster.
     - `updatedAt`: (string) (required) The time the cluster was last updated. (format: date-time)
     - `createdAt`: (string) (required) The time the cluster was created. (format: date-time)
     - `deletionRequested`: (boolean) (required) Indicates if provider resource deletion has been requested.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/cloud-providers/clusters

GET /v1/teams/{teamId}/cloud-providers/clusters

#### Example Response

200 OK: A list of clusters for the authenticated user

```json
{
  "data": {
    "clusters": [
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
              "eu-west-1a"
            ]
          }
        },
        "dns": "xxxxxxxxxx",
        "updatedAt": "2021-01-20T11:19:53.175Z",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "deletionRequested": false
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list cloud clusters

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of clusters for the authenticated user

```json
{
  "clusters": [
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
            "eu-west-1a"
          ]
        }
      },
      "dns": "xxxxxxxxxx",
      "updatedAt": "2021-01-20T11:19:53.175Z",
      "createdAt": "2021-01-20T11:19:53.175Z",
      "deletionRequested": false
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.cloud.clusters({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of clusters for the authenticated user

```json
{
  "data": {
    "clusters": [
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
              "eu-west-1a"
            ]
          }
        },
        "dns": "xxxxxxxxxx",
        "updatedAt": "2021-01-20T11:19:53.175Z",
        "createdAt": "2021-01-20T11:19:53.175Z",
        "deletionRequested": false
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
