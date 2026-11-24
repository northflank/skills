# Get metrics for a resource

Source: https://northflank.com/docs/v1/api/team/metrics/get-metrics-for-a-resource.md

Query metrics for one service, job, addon, volume, cluster, node, or cluster pod. For a service, job, addon, or volume, set `targetType`, `projectId`, and `targetId`. For a cluster, node, or cluster pod, set `targetType` and `clusterId`. A node also requires `nodeName`; a cluster pod requires `podId`. Select metric IDs and a time range or single time. Available metrics and selectors depend on the target and `metricsSource`.

The response can include errors for individual metrics. If every selected metric query fails, the API returns HTTP 502.

#### Choose a target and source

Use `projectId` and `targetId` for a `service`, `job`, `addon`, or `volume`. You need observability permission for services, jobs, and addons, or read permission for a volume.

For BYOC targets, use `clusterId` instead of `projectId` and `targetId`. You need cluster-read permission in the owning team or organization.

| Source | Targets and selection | Metrics |
| --- | --- | --- |
| `runtime` (default) | Service, job, or addon runtime. Addon runtime includes database and pooler pods, not backup or restore operations. | Use the relevant group below. |
| `build` | Service or job. Omit `buildId` for all builds, or select one owned build. Do not supply pod, deployment, or run selectors. | `cpu`, `memory`, `networkIngress`, `networkEgress`, `podEphemeralUsage`, `podReadiness`, `logRate`, and the four public/private bandwidth rates. |
| `backup` | Addon. Supply `backupId` for one recorded dump backup. | `cpu`, `memory`, `podEphemeralUsage`, `podReadiness`, `logRate`, and the four public/private bandwidth rates. |
| `restore` | Addon. Supply `backupId` and the stored `restoreId` for one recorded dump restore. | The same metrics as `backup`. |

Backup and restore queries do not accept workload selectors (`podName`, `podNames`, `deploymentId`, `runId`, or `buildId`). An identifier does not change `metricsSource`. Set the source explicitly. Import operations are not supported.

For workload runtime queries, select all pods or one owned `podName`. `containerName` is a compatibility alias for `podName`, not a container selector. Do not send both fields.

Services also accept an owned `deploymentId`, including `latest`. Jobs also accept an owned `runId`. Do not combine `podName` with `deploymentId` or `runId`. `deploymentId` is service-only and `runId` is job-only.

Only service `podReadiness` accepts `podNames`. Repeat it for up to 40 distinct exact names. Do not combine it with other metrics, `podName`, or `deploymentId`.

#### Time ranges and returned values

Use `queryType=range` for a time range or `queryType=single` for one evaluation time. Both are supported unless a metric restriction below says otherwise.

For ranges, `duration` is an integer from 1 to 2592000 seconds (30 days). Use it alone, or with exactly one of `startTime` and `endTime`. Alternatively, supply both timestamps without `duration`. Omitted duration uses the default window. No range can exceed 30 days.

For single queries, `time` defaults to the request time. Only the four public/private byte totals accept and require `duration` for single queries. `startTime` and `endTime` do not select a single-query time.

All samples use `value`. Usage values are not percentages. Where supported, `limit` or `requested` is a separate nullable value. A missing limit does not mean zero. Most missing telemetry produces absent samples, not synthetic zeros. Readiness, replica counts, and ingress count buckets can contain null values for gaps.

The response reports the actual sampling step, calculation window, and aggregation. Rate windows differ from total-byte windows. A single CPU query uses a 20-second window. Most other single rates use 60 seconds. Range windows depend on the selected resolution. The exceptions below include bucket rates and node network totals.

#### Compute and health

| Metric | Unit and result |
| --- | --- |
| `cpu` | Millicores, by `podName` and `containerName`, with nullable `limit`. |
| `memory` | Bytes, by `podName` and `containerName`, with nullable `limit`. |
| `podEphemeralUsage` | Whole-pod bytes, by `podName`. No limit is returned. |
| `podReadiness` | Count: 0 or 1, or null for a gap, by `podName`. Range results describe readiness changes. Build results describe the builder container and use the actual pod name. |
| `replicaCount` | Count, with `replicaType` of `Desired` or `Ready`. Service runtime only, without pod, deployment, or run selectors. |
| `probeLatency` | Seconds, by `podName` and `probeType`. |
| `containerRestartsReason` | Number of observed restart-counter changes in the calculation window, with `podName` and the last termination `reason`. Not an exact restart count or a binary indicator. Values can exceed 1. |
| `logRate` | Count/s, by `podName`. A rate for both query types, not a total increase. Zero-rate series can be absent. |

CPU, memory, ephemeral usage, and readiness support workload runtime, builds, and the recorded addon operations listed above. Probe latency and restart reasons support service, job, and addon runtime only. They select main or main-service containers, not builds or addon operations. These health metrics do not accept volume or node targets. For the separate `clusterPod` target, see Cluster and node metrics.

A workload `logRate` query that matches more than 500 distinct pod names fails the entire request with HTTP 400. This also applies when the request selects other metrics. Narrow runtime queries with `podName`, service `deploymentId`, or job `runId`. For builds, select `buildId`. For ranges, reduce the time range. `podNames` is not supported for `logRate`.

##### GPU metrics

GPU metrics support service and job runtime only. Select all pods, one owned `podName`, a service `deploymentId` including `latest`, or an owned job `runId`. Builds, addon operations, addon and volume targets, BYOC targets, and `podNames` are not supported.

Every series identifies `podName` and `gpu`.

| Metrics | Unit and result |
| --- | --- |
| `gpuUtilization`, `gpuEncoderUtilization`, `gpuDecoderUtilization`, `gpuTensorActivity`, `gpuDramActivity` | Ratio, not percentage. |
| `gpuTemperature`, `gpuMemoryTemperature` | Celsius. |
| `gpuPowerUsage` | Watts. |
| `gpuFramebufferMemoryUsage` | Bytes with nullable capacity `limit`. |
| `gpuXidErrorCode` | Last numeric XID code, including zero, not an error count. `errCode` and `errMsg` preserve the reported strings, or empty strings when absent. |

#### Network metrics

| Metrics | Unit and scope |
| --- | --- |
| `networkIngress`, `networkEgress` | Total `eth0` traffic in bytes/s. Workload runtime and service/job builds, not addon operations. |
| `publicIngressBandwidth`, `publicEgressBandwidth`, `privateIngressBandwidth`, `privateEgressBandwidth` | Public/private traffic rates in bytes/s, by `podName`. Workload runtime, service/job builds, and one recorded addon dump backup or restore. Both query types return rates, not instant increases. |
| `publicIngressBytes`, `publicEgressBytes`, `privateIngressBytes`, `privateEgressBytes` | Byte increases over an explicit window, by `podName`. Single queries for service runtime only. Numeric `value`, without `limit`. |
| `publicIngressRequests` | Count/s, by `destinationService`. |
| `ingressRequestsStatusCodes` | Count/s, by `responseCode`. |
| `ingressRequestsCountStatusCodes` | Rounded count increases in time buckets, by `responseCode`. Range queries only. Missing buckets can be null. A bucket timestamp can precede `startTime` by less than one bucket. |

The three ingress request metrics require an unfiltered service runtime. Do not supply pod, deployment, or run selectors. Despite their names, they also include private ingress gateways.

For public/private bandwidth, all-build queries include owned builds with build identity in the telemetry, without requiring a retained pod list. A selected build requires retained build and pod records. Backup and restore rates require saved operation pod metadata. Flow telemetry and ownership labels must remain available at evaluation time. Missing labels can omit the end of a rate window. Pod names do not guarantee isolation between different pod UIDs that reuse a name.

For public/private byte totals, supply an integer `duration` from 1 to 2592000 seconds (30 days). The window ends at `time`, or the request time by default. Select the whole service or an owned `deploymentId`, including `latest`. Exact `podName` and `podNames` are not supported.

Byte totals use historical pod membership within that window. Missing ownership labels can omit traffic. Pod-name reuse can attribute traffic to a replacement pod. These totals do not guarantee strict pod UID isolation. Their aggregation is `increase` and their representation is `single`. In mixed requests, all metrics use the same evaluation time, but `duration` changes only the byte-total window.

#### Storage metrics

| Metrics | Unit and result |
| --- | --- |
| `volumeUsage` | Bytes with nullable capacity `limit`. |
| `volumeReadIOPS`, `volumeWriteIOPS` | Count/s. |
| `volumeReadThroughput`, `volumeWriteThroughput` | Bytes/s. |

All five support runtime queries for service, job, addon, and volume targets. They identify `pvcName` and describe whole volumes. Selecting a pod does not attribute the volume's usage or I/O to that pod alone.

Supported workload selection is service all/deployment/exact pod, job all/exact pod/owned run, or addon all/exact pod. `podNames` is not supported. Volume targets do not accept workload selectors or non-runtime sources.

Service all-pod and deployment queries depend on historical ownership and pod-to-volume membership during the query window. Missing labels or retention gaps can omit volumes. Job queries use owned retained runtime pod volume records that overlap the query window, not current attachments. Missing records or claims return no data. This includes direct-mounted CephFS claims on Kata when no volume record captures them. Volume performance metrics also require supported device and mount telemetry. CephFS performance data is not available through this device-based path.

#### Addon metrics

Database metrics require addon runtime and the matching database engine. Query all runtime pods or one owned `podName`. They do not support builds, backup/restore sources, deployment/run selectors, or `podNames`. All identify `podName`.

Metrics require enabled exporters and scraping. Missing telemetry returns empty series, not zeros. PgBouncer metrics also require an enabled PgBouncer exporter. Addons without it can return empty PgBouncer series even when PostgreSQL metrics are available. These API queries do not enable exporters.

##### Database and pooler metrics

| Engine | Metric IDs and units | Interpretation |
| --- | --- | --- |
| PostgreSQL | `postgresConnections`, `postgresLocks`, `postgresExclusiveLocks`: count. `postgresTransactionRate`: count/s. `postgresTransactionDuration`, `postgresReplicationDelay`: seconds. | Available for the `postgresql` provisioner, not the legacy `postgres` provisioner. Transaction duration describes active transaction age, not completed transaction latency. Exclusive locks count exclusive lock modes, not confirmed blockers or deadlocks. |
| PgBouncer on PostgreSQL | `pgBouncerClientConnections`, `pgBouncerServerConnections`: count. `pgBouncerThroughput`: count/s. `pgBouncerMaxWait`, `pgBouncerLatency`: milliseconds. | Client states are `active` and `waiting`. Their nullable `limit` repeats the same per-pod client quota, not separate quotas. Server states are `active`, `idle`, and `used`. Throughput separates `queries` and `transactions` with `operation`. Idle latency can be absent. |
| Redis | `redisConnections`, `redisKeys`, `redisSlowlogLength`: count. `redisCommandRate`: count/s. `redisLatency`: seconds. `addonRedisCacheHitRatio`: ratio. `redisProcessMemory`: bytes. | Latency is a cumulative average, not a recent-window average. Cache hit ratio can be absent when idle. |
| MySQL | `mysqlConnections`: count. `mysqlQueryRate`, `addonMysqlQpsRead`, `mysqlWriteCommandRate`, `mysqlSlowQueryRate`, `mysqlImmediateTableLockRate`: count/s. | `addonMysqlQpsRead` is total queries minus recorded write commands, not SELECT-only traffic. Immediate table locks count acquisitions without waiting, not waits or current locks. |
| MongoDB | `mongoDbConnections`, `mongoDbCollections`, `mongoDbQueueLength`: count. `mongoDbOperationRate`, `mongoDbDocumentOperationRate`: count/s. `mongoDbProcessMemory`: bytes. | Process memory describes resident memory. |
| RabbitMQ | `rabbitMQConnections`, `rabbitMQMessagesReady`, `rabbitMQMessagesUnacked`, `rabbitMQAlarms`: count. `rabbitMQPublishDeliveryRate`: count/s. `addonRabbitMQQueueConsumersUtilisation`: ratio. `rabbitMQProcessMemory`: bytes. | Publish/delivery rate combines published and delivered messages. Consumer utilization sums queue fractions and can exceed 1. Alarms identify `memory`, `diskSpace`, or `fileDescriptors` in `alarm`. The memory `limit` is a nullable alarm threshold, not a container limit. |

Database single-query rates use a 60-second window. Range rate windows depend on resolution and are at least 30 seconds. PgBouncer latency and other rate-derived ratios use their calculation windows, rather than a total over the requested range.

The canonical IDs `addonRedisCacheHitRatio`, `addonMysqlQpsRead`, and `addonRabbitMQQueueConsumersUtilisation` retain their `addon` prefix. Do not rename them.

##### Bucket metrics

Bucket metrics require a bucket addon runtime. Do not supply specific `podName`, `podNames`, `deploymentId`, `runId`, or `buildId` selectors.

| Metrics | Unit and dimensions |
| --- | --- |
| `bucketStoredBytes` | Bytes, with raw `bucketName` and `bucketType`. |
| `bucketObjectCount` | Count, with raw `bucketName` and `bucketType`. |
| `bucketIngressBandwidth`, `bucketEgressBandwidth` | Bytes/s, with raw `bucketName`. |
| `bucketRequestRate` | Count/s, with raw `bucketName` and `bucketClass`: `read`, `write`, `list`, `delete`, or `other`. |

All return numeric values without synthetic zeros. Range rate steps are at least 60 seconds, rounded up to whole minutes. The rate window equals the step. Single rates use the 60 seconds before the requested time, without delay compensation.

Traffic data is delayed by about five minutes. Storage data updates daily. A single query at the current time can therefore return no data. Select an earlier evaluation time when you need delayed traffic samples.

#### Cluster and node metrics

BYOC metrics require `metricsSource=runtime`, `clusterId`, and cluster-read permission. Do not use workload selectors. `cluster`, `node`, and `clusterPod` are separate targets.

| Target or control | Selection |
| --- | --- |
| `cluster` | All nodes, one literal `nodeName`, up to 40 distinct literal `nodeNames`, or `nodePoolId`. Do not combine node selectors. Pool membership follows the requested time window. Missing membership can return no data. |
| `node` | Requires `nodeName`. Do not combine it with `nodeNames` or `nodePoolId`. |
| `groupBy` | `namespace` or `pod`, only with `nodeCpuByGroup` or `nodeMemoryByGroup`. Defaults to pod grouping for an exact node, otherwise namespace grouping. |
| `clusterPod` | Requires the recorded Kubernetes pod UID in `podId`. No node selectors or `groupBy`. Queries are bounded by the recorded pod lifetime. |

`clusterPod` supports `cpu`, `memory`, `podEphemeralUsage`, `podReadiness`, `probeLatency`, `containerRestartsReason`, `logRate`, and the four public/private bandwidth rates. It does not support GPU metrics, byte totals, storage metrics, or replica counts. Pod-name reuse can still affect historical telemetry. `logRate` is available for Northflank project workloads. Cluster and system namespaces can have no log-rate data.

| Metrics | Unit and result |
| --- | --- |
| `nodeCpu` | Millicores with nullable total CPU capacity `limit`. |
| `nodeMemory` | Bytes with nullable total memory capacity `limit`. |
| `nodeResourceRequestsCpu`, `nodeResourceRequestsMemory` | Requested millicores or bytes, respectively, with nullable allocatable `limit`. Allocatable means resources available to workloads. |
| `nodeResourceRequestsCpuUsage`, `nodeResourceRequestsMemoryUsage` | Millicores or bytes. Raw usage `value` with nullable `requested`, not a percentage. |
| `nodeCpuByGroup`, `nodeMemoryByGroup` | Millicores or bytes, with `namespace` and optional `podName`. |
| `nodePodCount` | Count of pod records, not ready pods, with nullable allocatable pod `limit`. |
| `nodeCondition` | Count with `condition` and `status`. Cluster/pool views show adverse conditions. Exact-node views show true conditions. |
| `nodeCpuIOWait`, `nodeCpuPressure`, `nodeMemoryPressure`, `nodeIoPressure` | Raw ratios, not percentages. Pressure has `component=waiting`, and memory/I/O pressure also has `stalled`. |
| `nodeEphemeralStorageUsage` | Bytes with capacity `limit`. Samples without matching capacity are absent. |
| `nodeVolumeUsage` | Bytes with nullable capacity `limit`, by `namespace` and `pvcName`. Duplicate observations of the same volume are averaged, not added. |
| `nodeDiskReadThroughput`, `nodeDiskWriteThroughput` | Bytes/s, by `nodeName` and `device`. |
| `nodeDiskReadIops`, `nodeDiskWriteIops` | Count/s, by `nodeName` and `device`. |
| `nodeDiskUtilization` | Ratio, by `nodeName` and `device`. Loop devices are excluded from disk metrics, but other virtual devices can appear. |
| `nodeNetworkIngressBandwidth`, `nodeNetworkEgressBandwidth` | Bytes/s, by `nodeName`. Local and common virtual/container interfaces are excluded. |
| `nodeNetworkBytes` | Byte increases, by `nodeName` and `direction` (`rx` or `tx`), not lifetime totals. Single queries use one hour. Range windows equal the nonoverlapping step, at least 60 seconds. |
| `nodeCountByStatus` | Count by Ready `status`. Supports node and pool selection. Unknown status is excluded. |
| `coreDnsRequestRate`, `coreDnsP99Latency` | Count/s and seconds, respectively. Unfiltered `cluster` only. Requires scraped CoreDNS telemetry. |

Node metrics identify `nodeName` except grouped namespace/pod values, volume values, status counts, and CoreDNS metrics. Missing limits and requests remain null. No percentage is calculated. Node range steps adapt to the range and cluster size. Most single node rate windows use 60 seconds. Use the response timing fields for the actual windows.

**Query parameters:**

{object}
- `metricTypes`: (string) Metric ID. Repeat `metricTypes` to select up to 105 distinct IDs. Availability depends on the target, source, and selectors. See Compute and health, Network metrics, Storage metrics, Addon metrics, and Cluster and node metrics for units and restrictions. (enum: cpu, memory, networkIngress, networkEgress, podReadiness, replicaCount, probeLatency, containerRestartsReason, logRate, publicIngressBandwidth, publicEgressBandwidth, privateIngressBandwidth, privateEgressBandwidth, publicIngressBytes, publicEgressBytes, privateIngressBytes, privateEgressBytes, volumeUsage, podEphemeralUsage, volumeReadIOPS, volumeWriteIOPS, volumeReadThroughput, volumeWriteThroughput, publicIngressRequests, ingressRequestsStatusCodes, ingressRequestsCountStatusCodes, postgresConnections, postgresTransactionRate, postgresTransactionDuration, postgresReplicationDelay, postgresLocks, postgresExclusiveLocks, pgBouncerClientConnections, pgBouncerServerConnections, pgBouncerMaxWait, pgBouncerThroughput, pgBouncerLatency, redisConnections, redisLatency, redisCommandRate, redisKeys, redisSlowlogLength, addonRedisCacheHitRatio, redisProcessMemory, mysqlConnections, mysqlQueryRate, addonMysqlQpsRead, mysqlWriteCommandRate, mysqlSlowQueryRate, mysqlImmediateTableLockRate, mongoDbConnections, mongoDbOperationRate, mongoDbCollections, mongoDbDocumentOperationRate, mongoDbQueueLength, mongoDbProcessMemory, rabbitMQConnections, rabbitMQPublishDeliveryRate, rabbitMQMessagesReady, rabbitMQMessagesUnacked, addonRabbitMQQueueConsumersUtilisation, rabbitMQAlarms, rabbitMQProcessMemory, bucketStoredBytes, bucketObjectCount, bucketIngressBandwidth, bucketEgressBandwidth, bucketRequestRate, nodeCpu, nodeCpuIOWait, nodeCpuByGroup, nodeMemory, nodeMemoryByGroup, nodeResourceRequestsCpu, nodeResourceRequestsCpuUsage, nodeResourceRequestsMemory, nodeResourceRequestsMemoryUsage, nodePodCount, nodeCondition, nodeCpuPressure, nodeMemoryPressure, nodeIoPressure, nodeEphemeralStorageUsage, nodeVolumeUsage, nodeDiskReadThroughput, nodeDiskWriteThroughput, nodeDiskReadIops, nodeDiskWriteIops, nodeDiskUtilization, nodeNetworkIngressBandwidth, nodeNetworkEgressBandwidth, nodeNetworkBytes, nodeCountByStatus, coreDnsRequestRate, coreDnsP99Latency, gpuUtilization, gpuEncoderUtilization, gpuDecoderUtilization, gpuTensorActivity, gpuDramActivity, gpuTemperature, gpuMemoryTemperature, gpuPowerUsage, gpuFramebufferMemoryUsage, gpuXidErrorCode)
- `podName`: (string) Selects one pod, not a container within it. Defaults to all pods. containerName is accepted as a compatibility alias; do not send both names. (min length: 3) (max length: 64)
- `deploymentId`: (string) Limits metrics to a specific deployment
- `podNames`: (multiple options) Exact pod names. Repeat podNames to select up to 40 service pods for podReadiness. [array of] (string) (pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$) (min length: 3) (max length: 64) | (string) (pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$) (min length: 3) (max length: 64)
- `metricsSource`: (string) Source of the metrics to fetch. `runtime` supports service/job/addon probe latency, restart reasons and logRate. Probe latency and restart reasons select main or main-service containers, not builders or addon operations. `build` selects service/job build pods, including readiness of the builder container, logRate and four OBI bandwidth rates. `backup` and `restore` select one addon dump operation and support cpu, memory, podEphemeralUsage, podReadiness, logRate and four OBI bandwidth rates. (enum: runtime, build, backup, restore)
- `buildId`: (string) Selects metrics for a specific build. Requires `metricsSource=build`. (min length: 1) (max length: 128)
- `backupId`: (string) Public backup ID. Required for metricsSource=backup or restore. (min length: 1) (max length: 128)
- `restoreId`: (string) Stored restore ID. Required for metricsSource=restore, together with backupId. (pattern: ^[a-fA-F0-9]{24}$)
- `runId`: (string) Limits metrics to a specific job run id. (min length: 36) (max length: 36)
- `targetType`: (string) Target resource type. BYOC cluster/node targets use clusterId without projectId or targetId, with owning team/org cluster-read permission. node requires nodeName. cluster accepts nodeNames (up to 40) or nodePoolId. CoreDNS requires an unfiltered cluster. nodeCountByStatus supports node/pool selection. clusterPod requires the recorded Kubernetes pod UID in podId. Grouped CPU/memory accepts groupBy=namespace|pod. Node CPU uses millicores, memory/storage bytes, network/disk rates bytes/s, IOPS count/s and DNS latency seconds. Pressure and IO utilization are raw ratios. nodeNetworkBytes returns RX/TX byte increases; single uses one hour. BYOC request-usage returns value and nullable requested, not a percentage. Missing limits remain null. No source telemetry changes or UI migration are implied. (enum: service, job, addon, volume, cluster, node, clusterPod)
- `projectId`: (multiple options) Project ID. (min length: 1) (max length: 128)
- `targetId`: (multiple options) Service, job, addon or volume ID. (min length: 1) (max length: 128)
- `clusterId`: (string) Public BYOC cluster ID. (min length: 1) (max length: 128)
- `nodeName`: (string) Literal node name for targetType=node. (min length: 1) (max length: 253)
- `nodeNames`: [array of] Up to 40 literal node names within the cluster. (string) (min length: 1) (max length: 253)
- `nodePoolId`: (string) Public node pool ID. (min length: 1) (max length: 128)
- `podId`: (string) Recorded miscellaneous Kubernetes pod UID. (format: uuid)
- `groupBy`: (string) CPU/memory grouping for BYOC nodes. (enum: namespace, pod)
- `queryType`: (string) Use range for a time range or single for one evaluation time. Defaults to range. (enum: range, single)
- `duration`: (integer) Integer seconds, from 1 to 2592000 (30 days). For range, use duration alone, with exactly one of startTime and endTime, or supply both timestamps without duration. Without timestamps, the window normally ends now, but selected pods, job runs, and completed addon operations can use lifecycle bounds instead of duration. Supply a timestamp with duration for a fixed-length window. Otherwise, omitted duration uses the default window. The range cannot exceed 30 days. For single, duration is required only for OBI byte totals and is otherwise forbidden.
- `startTime`: (string) Range start time. Use with endTime, duration, or the default duration. Do not supply all three. Not used for single queries. (format: date-time)
- `endTime`: (string) Range end time. Use with startTime, duration, or the default duration. Do not supply all three. Not used for single queries. (format: date-time)
- `time`: (string) Single-query evaluation time. Defaults to the request time. Not used for range queries. (format: date-time)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `cpu`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: cpu)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: millicores)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
          - `containerName`: (string) (required) Kubernetes container name within the pod.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Configured limit in metricUnit. Zero means an explicitly unbounded limit. Null means no matching limit sample is available. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `memory`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: memory)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
          - `containerName`: (string) (required) Kubernetes container name within the pod.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Configured limit in metricUnit. Zero means an explicitly unbounded limit. Null means no matching limit sample is available. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `networkIngress`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: networkIngress)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `containerId`: (string) (required) Kubernetes pod name for runtime eth0 traffic, or build ID for build-source traffic.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `networkEgress`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: networkEgress)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `containerId`: (string) (required) Kubernetes pod name for runtime eth0 traffic, or build ID for build-source traffic.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `podReadiness`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: podReadiness)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (nullable) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `replicaCount`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: replicaCount)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `replicaType`: (string) (required) (enum: Desired, Ready)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (nullable) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `probeLatency`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: probeLatency)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: seconds)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `podName`: (string) (required)
          - `containerName`: (string)
          - `probeType`: (string) (required)
          - `reason`: (string)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `containerRestartsReason`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: containerRestartsReason)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `podName`: (string) (required)
          - `containerName`: (string)
          - `probeType`: (string)
          - `reason`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `logRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: logRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `podName`: (string) (required)
          - `containerName`: (string)
          - `probeType`: (string)
          - `reason`: (string)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `publicIngressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: publicIngressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `publicEgressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: publicEgressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `privateIngressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: privateIngressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `privateEgressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: privateEgressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `publicIngressBytes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: publicIngressBytes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: single)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `publicEgressBytes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: publicEgressBytes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: single)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `privateIngressBytes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: privateIngressBytes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: single)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `privateEgressBytes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: privateEgressBytes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: single)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `volumeUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: volumeUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `pvcName`: (string) (required) Persistent volume claim name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Volume capacity in bytes. Null means no matching capacity sample; zero is a reported capacity, not unlimited storage. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `podEphemeralUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: podEphemeralUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `volumeReadIOPS`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: volumeReadIOPS)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `pvcName`: (string) (required) Persistent volume claim name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `volumeWriteIOPS`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: volumeWriteIOPS)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `pvcName`: (string) (required) Persistent volume claim name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `volumeReadThroughput`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: volumeReadThroughput)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `pvcName`: (string) (required) Persistent volume claim name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `volumeWriteThroughput`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: volumeWriteThroughput)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `pvcName`: (string) (required) Persistent volume claim name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `publicIngressRequests`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: publicIngressRequests)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `destinationService`: (string) (required) Destination service host reported by the ingress gateway.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `ingressRequestsStatusCodes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: ingressRequestsStatusCodes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `responseCode`: (string) (required) HTTP response code reported by the ingress gateway.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `ingressRequestsCountStatusCodes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: ingressRequestsCountStatusCodes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `responseCode`: (string) (required) HTTP response code reported by the ingress gateway.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (nullable) (format: float)
            - `ts`: (string) (required) Evaluation time floored to an epoch-aligned bucket. Can precede the requested start by less than one bucket. Not the source scrape time. (format: date-time)
  - `postgresConnections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: postgresConnections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `postgresTransactionRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: postgresTransactionRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `postgresTransactionDuration`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: postgresTransactionDuration)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: seconds)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `postgresReplicationDelay`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: postgresReplicationDelay)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: seconds)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `postgresLocks`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: postgresLocks)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `postgresExclusiveLocks`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: postgresExclusiveLocks)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `pgBouncerClientConnections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: pgBouncerClientConnections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
          - `state`: (string) (required) (enum: active, waiting)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Shared per-pod maximum client count, repeated for each state, not a separate quota. Null means no matching limit sample is available. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `pgBouncerServerConnections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: pgBouncerServerConnections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
          - `state`: (string) (required) (enum: active, idle, used)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `pgBouncerMaxWait`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: pgBouncerMaxWait)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: milliseconds)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `pgBouncerThroughput`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: pgBouncerThroughput)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
          - `operation`: (string) (required) (enum: queries, transactions)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `pgBouncerLatency`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: pgBouncerLatency)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: milliseconds)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `redisConnections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: redisConnections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `redisLatency`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: redisLatency)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: seconds)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `redisCommandRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: redisCommandRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `redisKeys`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: redisKeys)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `redisSlowlogLength`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: redisSlowlogLength)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `addonRedisCacheHitRatio`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: addonRedisCacheHitRatio)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `redisProcessMemory`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: redisProcessMemory)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mysqlConnections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mysqlConnections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mysqlQueryRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mysqlQueryRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `addonMysqlQpsRead`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: addonMysqlQpsRead)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mysqlWriteCommandRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mysqlWriteCommandRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mysqlSlowQueryRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mysqlSlowQueryRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mysqlImmediateTableLockRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mysqlImmediateTableLockRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mongoDbConnections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mongoDbConnections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mongoDbOperationRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mongoDbOperationRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mongoDbCollections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mongoDbCollections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mongoDbDocumentOperationRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mongoDbDocumentOperationRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mongoDbQueueLength`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mongoDbQueueLength)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `mongoDbProcessMemory`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: mongoDbProcessMemory)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `rabbitMQConnections`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: rabbitMQConnections)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `rabbitMQPublishDeliveryRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: rabbitMQPublishDeliveryRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `rabbitMQMessagesReady`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: rabbitMQMessagesReady)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `rabbitMQMessagesUnacked`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: rabbitMQMessagesUnacked)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `addonRabbitMQQueueConsumersUtilisation`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: addonRabbitMQQueueConsumersUtilisation)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `rabbitMQAlarms`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: rabbitMQAlarms)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
          - `alarm`: (string) (required) (enum: memory, diskSpace, fileDescriptors)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `rabbitMQProcessMemory`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: rabbitMQProcessMemory)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required) Kubernetes pod name.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Memory alarm threshold in bytes. Null means no matching threshold sample; zero is the reported threshold. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `bucketStoredBytes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: bucketStoredBytes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `bucketName`: (string) (required) Raw bucket name reported by the provider.
          - `bucketType`: (string) (required) Raw bucket type reported by the provider.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `bucketObjectCount`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: bucketObjectCount)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `bucketName`: (string) (required) Raw bucket name reported by the provider.
          - `bucketType`: (string) (required) Raw bucket type reported by the provider.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `bucketIngressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: bucketIngressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `bucketName`: (string) (required) Raw bucket name reported by the provider.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `bucketEgressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: bucketEgressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `bucketName`: (string) (required) Raw bucket name reported by the provider.
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `bucketRequestRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: bucketRequestRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `bucketName`: (string) (required) Raw bucket name reported by the provider.
          - `bucketClass`: (string) (required) (enum: read, write, list, delete, other)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeCpu`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeCpu)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: millicores)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Reported capacity or allocatable resource in metricUnit. Null means no matching sample. Zero is a reported capacity, not an unlimited node. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeCpuIOWait`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeCpuIOWait)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeCpuByGroup`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeCpuByGroup)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: millicores)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string) (required)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeMemory`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeMemory)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Reported capacity or allocatable resource in metricUnit. Null means no matching sample. Zero is a reported capacity, not an unlimited node. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeMemoryByGroup`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeMemoryByGroup)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string) (required)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeResourceRequestsCpu`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeResourceRequestsCpu)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: millicores)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Reported capacity or allocatable resource in metricUnit. Null means no matching sample. Zero is a reported capacity, not an unlimited node. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeResourceRequestsCpuUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeResourceRequestsCpuUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: millicores)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `requested`: (number) (required) (nullable) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeResourceRequestsMemory`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeResourceRequestsMemory)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Reported capacity or allocatable resource in metricUnit. Null means no matching sample. Zero is a reported capacity, not an unlimited node. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeResourceRequestsMemoryUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeResourceRequestsMemoryUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `requested`: (number) (required) (nullable) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodePodCount`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodePodCount)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Reported capacity or allocatable resource in metricUnit. Null means no matching sample. Zero is a reported capacity, not an unlimited node. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeCondition`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeCondition)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string) (required)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeCpuPressure`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeCpuPressure)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string) (required)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeMemoryPressure`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeMemoryPressure)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string) (required)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeIoPressure`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeIoPressure)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string) (required)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeEphemeralStorageUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeEphemeralStorageUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Reported capacity or allocatable resource in metricUnit. Null means no matching sample. Zero is a reported capacity, not an unlimited node. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeVolumeUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeVolumeUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string)
          - `device`: (string)
          - `pvcName`: (string) (required)
          - `namespace`: (string) (required)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Reported capacity or allocatable resource in metricUnit. Null means no matching sample. Zero is a reported capacity, not an unlimited node. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeDiskReadThroughput`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeDiskReadThroughput)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string) (required)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeDiskWriteThroughput`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeDiskWriteThroughput)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string) (required)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeDiskReadIops`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeDiskReadIops)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string) (required)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeDiskWriteIops`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeDiskWriteIops)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string) (required)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeDiskUtilization`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeDiskUtilization)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string) (required)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeNetworkIngressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeNetworkIngressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeNetworkEgressBandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeNetworkEgressBandwidth)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeNetworkBytes`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeNetworkBytes)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string) (required)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (required) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `nodeCountByStatus`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: nodeCountByStatus)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string) (required)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `coreDnsRequestRate`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: coreDnsRequestRate)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: count/s)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `coreDnsP99Latency`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: coreDnsP99Latency)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: seconds)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object} (required)
          - `nodeName`: (string)
          - `device`: (string)
          - `pvcName`: (string)
          - `namespace`: (string)
          - `podName`: (string)
          - `status`: (string)
          - `condition`: (string)
          - `component`: (string)
          - `direction`: (string) (enum: rx, tx)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuUtilization`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuUtilization)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuEncoderUtilization`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuEncoderUtilization)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuDecoderUtilization`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuDecoderUtilization)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuTensorActivity`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuTensorActivity)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuDramActivity`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuDramActivity)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: ratio)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuTemperature`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuTemperature)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: celsius)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuMemoryTemperature`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuMemoryTemperature)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: celsius)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuPowerUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuPowerUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: watts)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuFramebufferMemoryUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuFramebufferMemoryUsage)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: bytes)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) Observed usage in metricUnit. Missing evaluations are absent, not zero. (format: float)
            - `limit`: (number) (required) (nullable) Framebuffer capacity in bytes. Null means no matching capacity sample; zero is a reported capacity. (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
  - `gpuXidErrorCode`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) (enum: gpuXidErrorCode)
      - `metricUnit`: (string) (required) Wire unit for every sample field. 1000 millicores equal one CPU core. Memory bytes are not display megabytes. (enum: code)
      - `start`: (string) (format: date-time)
      - `end`: (string) (format: date-time)
      - `stepSeconds`: (number) Effective query evaluation step in seconds, when used. (format: float)
      - `windowSeconds`: (number) Effective lookback or bucket window in seconds. Omitted when no window is used or source windows differ. (format: float)
      - `aggregation`: (string) (required) Time aggregation, before grouping, unit conversion, and limit normalization. Instant uses the latest available sample. (enum: rate, min, instant, increase)
      - `representation`: (string) (required) Samples on the evaluation grid, state changes with gap markers, a single result, or epoch-aligned count buckets. Missing buckets are null; missing evaluations can be absent. (enum: samples, changes, single, buckets)
    - `values`: [array of] (required) {object}
        - `metadata`: {object}
          - `podName`: (string) (required)
          - `gpu`: (string) (required)
          - `errCode`: (string) (required)
          - `errMsg`: (string) (required)
        - `data`: [array of] (required) {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) Query evaluation time, or a synthetic null-gap marker time. Not the source scrape time. (format: date-time)
- `errors`: {object}
  - `cpu`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `memory`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `networkIngress`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `networkEgress`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `podReadiness`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `replicaCount`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `probeLatency`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `containerRestartsReason`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `logRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `publicIngressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `publicEgressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `privateIngressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `privateEgressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `publicIngressBytes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `publicEgressBytes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `privateIngressBytes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `privateEgressBytes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `volumeUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `podEphemeralUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `volumeReadIOPS`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `volumeWriteIOPS`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `volumeReadThroughput`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `volumeWriteThroughput`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `publicIngressRequests`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `ingressRequestsStatusCodes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `ingressRequestsCountStatusCodes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `postgresConnections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `postgresTransactionRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `postgresTransactionDuration`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `postgresReplicationDelay`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `postgresLocks`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `postgresExclusiveLocks`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `pgBouncerClientConnections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `pgBouncerServerConnections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `pgBouncerMaxWait`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `pgBouncerThroughput`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `pgBouncerLatency`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `redisConnections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `redisLatency`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `redisCommandRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `redisKeys`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `redisSlowlogLength`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `addonRedisCacheHitRatio`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `redisProcessMemory`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mysqlConnections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mysqlQueryRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `addonMysqlQpsRead`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mysqlWriteCommandRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mysqlSlowQueryRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mysqlImmediateTableLockRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mongoDbConnections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mongoDbOperationRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mongoDbCollections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mongoDbDocumentOperationRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mongoDbQueueLength`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `mongoDbProcessMemory`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `rabbitMQConnections`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `rabbitMQPublishDeliveryRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `rabbitMQMessagesReady`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `rabbitMQMessagesUnacked`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `addonRabbitMQQueueConsumersUtilisation`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `rabbitMQAlarms`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `rabbitMQProcessMemory`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `bucketStoredBytes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `bucketObjectCount`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `bucketIngressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `bucketEgressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `bucketRequestRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeCpu`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeCpuIOWait`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeCpuByGroup`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeMemory`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeMemoryByGroup`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeResourceRequestsCpu`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeResourceRequestsCpuUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeResourceRequestsMemory`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeResourceRequestsMemoryUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodePodCount`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeCondition`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeCpuPressure`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeMemoryPressure`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeIoPressure`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeEphemeralStorageUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeVolumeUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeDiskReadThroughput`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeDiskWriteThroughput`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeDiskReadIops`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeDiskWriteIops`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeDiskUtilization`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeNetworkIngressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeNetworkEgressBandwidth`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeNetworkBytes`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `nodeCountByStatus`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `coreDnsRequestRate`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `coreDnsP99Latency`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuUtilization`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuEncoderUtilization`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuDecoderUtilization`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuTensorActivity`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuDramActivity`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuTemperature`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuMemoryTemperature`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuPowerUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuFramebufferMemoryUsage`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)
  - `gpuXidErrorCode`: {object}
    - `code`: (string) (required) (enum: upstream_error)
    - `message`: (string) (required)

### API reference

GET /v1/metrics

GET /v1/teams/{teamId}/metrics

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/metrics?targetType=service&projectId=default-project&targetId=example-service&metricsSource=runtime&metricTypes=cpu&metricTypes=memory&queryType=single"
```

```python
import requests

url = "https://api.northflank.com/v1/metrics?targetType=service&projectId=default-project&targetId=example-service&metricsSource=runtime&metricTypes=cpu&metricTypes=memory&queryType=single"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Target metrics and optional per-metric errors

```json
{
  "data": {
    "cpu": {
      "metricInfo": {
        "metricId": "cpu",
        "metricUnit": "millicores",
        "aggregation": "rate",
        "representation": "samples",
        "start": "2026-01-01T12:00:00.000Z",
        "end": "2026-01-01T12:01:00.000Z",
        "stepSeconds": 20,
        "windowSeconds": 60
      },
      "values": [
        {
          "metadata": {
            "podName": "api-669cc865b7-5458n",
            "containerName": "api"
          },
          "data": [
            {
              "value": 125,
              "limit": 500,
              "ts": "2026-01-01T12:00:00.000Z"
            },
            {
              "value": 100,
              "limit": null,
              "ts": "2026-01-01T12:00:20.000Z"
            }
          ]
        }
      ]
    },
    "podReadiness": {
      "metricInfo": {
        "metricId": "podReadiness",
        "metricUnit": "count",
        "aggregation": "min",
        "representation": "changes",
        "start": "2026-01-01T12:00:00.000Z",
        "end": "2026-01-01T12:01:00.000Z",
        "stepSeconds": 20
      },
      "values": [
        {
          "metadata": {
            "podName": "api-669cc865b7-5458n"
          },
          "data": [
            {
              "value": 1,
              "ts": "2026-01-01T12:00:00.000Z"
            },
            {
              "value": null,
              "ts": "2026-01-01T12:00:20.000Z"
            }
          ]
        }
      ]
    }
  }
}
```

#### Example Response

502 Bad Gateway: All selected metric queries failed

### CLI reference

$ northflank get metrics

Options:

- `--metricTypes <metricTypes>`: Metric ID. Repeat `metricTypes` to select up to 105 distinct IDs. Availability depends on the target, source, and selectors. See Compute and health, Network metrics, Storage metrics, Addon metrics, and Cluster and node metrics for units and restrictions.

- `--podName <podName>`: Selects one pod, not a container within it. Defaults to all pods. containerName is accepted as a compatibility alias; do not send both names.

- `--deploymentId <deploymentId>`: Limits metrics to a specific deployment

- `--podNames <podNames>`: Exact pod names. Repeat podNames to select up to 40 service pods for podReadiness.

- `--metricsSource <metricsSource>`: Source of the metrics to fetch. `runtime` supports service/job/addon probe latency, restart reasons and logRate. Probe latency and restart reasons select main or main-service containers, not builders or addon operations. `build` selects service/job build pods, including readiness of the builder container, logRate and four OBI bandwidth rates. `backup` and `restore` select one addon dump operation and support cpu, memory, podEphemeralUsage, podReadiness, logRate and four OBI bandwidth rates.

- `--buildId <buildId>`: Selects metrics for a specific build. Requires `metricsSource=build`.

- `--backupId <backupId>`: Public backup ID. Required for metricsSource=backup or restore.

- `--restoreId <restoreId>`: Stored restore ID. Required for metricsSource=restore, together with backupId.

- `--runId <runId>`: Limits metrics to a specific job run id.

- `--targetType <targetType>`: Target resource type. BYOC cluster/node targets use clusterId without projectId or targetId, with owning team/org cluster-read permission. node requires nodeName. cluster accepts nodeNames (up to 40) or nodePoolId. CoreDNS requires an unfiltered cluster. nodeCountByStatus supports node/pool selection. clusterPod requires the recorded Kubernetes pod UID in podId. Grouped CPU/memory accepts groupBy=namespace|pod. Node CPU uses millicores, memory/storage bytes, network/disk rates bytes/s, IOPS count/s and DNS latency seconds. Pressure and IO utilization are raw ratios. nodeNetworkBytes returns RX/TX byte increases; single uses one hour. BYOC request-usage returns value and nullable requested, not a percentage. Missing limits remain null. No source telemetry changes or UI migration are implied.

- `--projectId <projectId>`: Project ID.

- `--targetId <targetId>`: Service, job, addon or volume ID.

- `--clusterId <clusterId>`: Public BYOC cluster ID.

- `--nodeName <nodeName>`: Literal node name for targetType=node.

- `--nodeNames <nodeNames>`: Up to 40 literal node names within the cluster.

- `--nodePoolId <nodePoolId>`: Public node pool ID.

- `--podId <podId>`: Recorded miscellaneous Kubernetes pod UID.

- `--groupBy <groupBy>`: CPU/memory grouping for BYOC nodes.

- `--queryType <queryType>`: Use range for a time range or single for one evaluation time. Defaults to range.

- `--duration <duration>`: Integer seconds, from 1 to 2592000 (30 days). For range, use duration alone, with exactly one of startTime and endTime, or supply both timestamps without duration. Without timestamps, the window normally ends now, but selected pods, job runs, and completed addon operations can use lifecycle bounds instead of duration. Supply a timestamp with duration for a fixed-length window. Otherwise, omitted duration uses the default window. The range cannot exceed 30 days. For single, duration is required only for OBI byte totals and is otherwise forbidden.

- `--startTime <startTime>`: Range start time. Use with endTime, duration, or the default duration. Do not supply all three. Not used for single queries.

- `--endTime <endTime>`: Range end time. Use with startTime, duration, or the default duration. Do not supply all three. Not used for single queries.

- `--time <time>`: Single-query evaluation time. Defaults to the request time. Not used for range queries.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Target metrics and optional per-metric errors

```json
{
  "cpu": {
    "metricInfo": {
      "metricId": "cpu",
      "metricUnit": "millicores",
      "aggregation": "rate",
      "representation": "samples",
      "start": "2026-01-01T12:00:00.000Z",
      "end": "2026-01-01T12:01:00.000Z",
      "stepSeconds": 20,
      "windowSeconds": 60
    },
    "values": [
      {
        "metadata": {
          "podName": "api-669cc865b7-5458n",
          "containerName": "api"
        },
        "data": [
          {
            "value": 125,
            "limit": 500,
            "ts": "2026-01-01T12:00:00.000Z"
          },
          {
            "value": 100,
            "limit": null,
            "ts": "2026-01-01T12:00:20.000Z"
          }
        ]
      }
    ]
  },
  "podReadiness": {
    "metricInfo": {
      "metricId": "podReadiness",
      "metricUnit": "count",
      "aggregation": "min",
      "representation": "changes",
      "start": "2026-01-01T12:00:00.000Z",
      "end": "2026-01-01T12:01:00.000Z",
      "stepSeconds": 20
    },
    "values": [
      {
        "metadata": {
          "podName": "api-669cc865b7-5458n"
        },
        "data": [
          {
            "value": 1,
            "ts": "2026-01-01T12:00:00.000Z"
          },
          {
            "value": null,
            "ts": "2026-01-01T12:00:20.000Z"
          }
        ]
      }
    ]
  }
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.metrics({
  options: {
    "targetType": "service",
    "projectId": "default-project",
    "targetId": "example-service",
    "metricsSource": "runtime",
    "metricTypes": [
      "cpu",
      "memory"
    ],
    "queryType": "single"
  }
});
```

#### Example Response

 Target metrics and optional per-metric errors

```json
{
  "data": {
    "cpu": {
      "metricInfo": {
        "metricId": "cpu",
        "metricUnit": "millicores",
        "aggregation": "rate",
        "representation": "samples",
        "start": "2026-01-01T12:00:00.000Z",
        "end": "2026-01-01T12:01:00.000Z",
        "stepSeconds": 20,
        "windowSeconds": 60
      },
      "values": [
        {
          "metadata": {
            "podName": "api-669cc865b7-5458n",
            "containerName": "api"
          },
          "data": [
            {
              "value": 125,
              "limit": 500,
              "ts": "2026-01-01T12:00:00.000Z"
            },
            {
              "value": 100,
              "limit": null,
              "ts": "2026-01-01T12:00:20.000Z"
            }
          ]
        }
      ]
    },
    "podReadiness": {
      "metricInfo": {
        "metricId": "podReadiness",
        "metricUnit": "count",
        "aggregation": "min",
        "representation": "changes",
        "start": "2026-01-01T12:00:00.000Z",
        "end": "2026-01-01T12:01:00.000Z",
        "stepSeconds": 20
      },
      "values": [
        {
          "metadata": {
            "podName": "api-669cc865b7-5458n"
          },
          "data": [
            {
              "value": 1,
              "ts": "2026-01-01T12:00:00.000Z"
            },
            {
              "value": null,
              "ts": "2026-01-01T12:00:20.000Z"
            }
          ]
        }
      ]
    }
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

Python SDK 2.1.0 has no generated method for this endpoint. Use the API example for this request.
