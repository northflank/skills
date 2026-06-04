# Put addon

Source: https://northflank.com/docs/v1/api/project/addons/put-addon.md

Creates or updates an addon

Required permission: Project > Addons > General > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

(multiple options) {object}
 - `name`: (string) (required) The name of the addon. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
 - `description`: (string) A description of the addon. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
 - `projectId`: (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$)
 - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
 - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
 - `type`: (string) (required) The identifier for the type of addon. Addon types can be found at the Get Addon Types endpoint.
 - `infrastructure`: {object}
   - `architecture`: (string) (enum: x86, arm)
 - `version`: (string) (required) The version of the addon type to use. If set to `latest`, the addon will be created with the most recent addon version. If set to a major version appended with `-latest`, e.g. e.g. `14-latest` or `14.5-latest`, the addon will be created with the most recent minor/patch version belonging to that major version.
 - `billing`: {object}
   - `deploymentPlan`: (string) (required) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `storageClass`: (string) The type of storage. Only configurable if the relevant feature flag is enabled for you account (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
   - `storage`: (integer) (required) The size of the addon storage, in megabytes.
   - `replicas`: (integer) (required) The number of addon replicas to run.
   - `zonalRedundancy`: {object}
     - `type`: (string) Defines scheduling behaviour across different zones within the same region. (enum: required, disabled)
     - `minZones`: (integer) Defines how many zones are required and will prevent containers from additional scheduling into existing zones. (Only relevant if type is set to "required")
 - `source`: (multiple options) {object}
    - `projectId`: (string) ID of the project of the source addon. Only required if not the same as target addon (pattern: ^[A-Za-z0-9-]+$)
    - `addonId`: (string) (required) ID of the addon to fork. (pattern: ^[A-Za-z0-9-]+$)
    - `backupId`: (string) (required) ID of a backup belonging to that addon to use for the fork. (pattern: ^[A-Za-z0-9-]+$) | {object}
    - `backupUid`: (string) (required) Uid of the backup (format: uuid)
 - `tlsEnabled`: (boolean) Enables access to the addon via TLS (if supported by the addon type).
 - `externalAccessEnabled`: (boolean) Enables external access to the addon via TLS (if supported by the addon type).
 - `ipPolicies`: [array of] {object}
    - `addresses`: [array of] (string) An IP address used by this rule
    - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
 - `typeSpecificSettings`: {object}
   - `redisMaxMemoryPolicy`: (string) Redis only: Key eviction policy at memory pressure. (enum: noeviction, allkeys-lru, allkeys-lfu, volatile-lru, volatile-lfu, allkeys-random, volatile-random, volatile-ttl, volatile-lrm, allkeys-lrm)
   - `redisSentinelEnabled`: (boolean) Redis only: Deploy Redis with Sentinel high availability. Default: false
   - `postgresqlWalLevel`: (string) PostgreSQL only: Configure wal_level setting. (enum: replica, logical)
   - `postgresqlSupabaseMode`: (boolean) PostgreSQL only: Enable Supabase mode.
   - `postgresqlConnectionPoolerEnabled`: (boolean) PostgreSQL only: Run connection pooler in front of postgres instance.
   - `postgresqlConnectionPoolerReplicas`: (integer) PostgreSQL only: Number of connection pooler instances in case connection pooler is enabled.
   - `postgresqlReadConnectionPoolerEnabled`: (boolean) PostgreSQL only: Run connection pooler in front of read-only postgres instance.
   - `postgresqlReadConnectionPoolerReplicas`: (integer) PostgreSQL only: Number of read-only connection pooler replicas in case read-only connection pooler is enabled.
   - `postgresqlImportMode`: (boolean) PostgreSQL only: Configure PostgreSQL for higher import speed. Not recommended for production workloads.
   - `mysqlHaModeEnabled`: (boolean) MySQL only: Run MySQL in HA configuration with auto-failover and connection poolers.
   - `mysqlRouterReplicas`: (integer) MysqlHA only: Number of connection router replicas in case connection router is enabled.
 - `customCredentials`: {object}
   - `dbName`: (string) Custom database name. Not supported for all addon types.
 - `backupSchedules`: [array of] {object}
    - `scheduling`: {object}
      - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
      - `minute`: [array of] (integer) A minute when the backup should be performed.
      - `hour`: [array of] (integer) An hour when the backup should be performed, in 24 hour format.
      - `day`: [array of] (integer) A day of the week when the backup should be performed, where `0` represents Monday and `6` represents Sunday.
    - `backupType`: (string) (required) The type of the backup to be performed. (enum: dump, snapshot)
    - `customDestinationId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `additionalDestinations`: [array of] {object}
        - `destinationId`: (string) (required) Additional custom back up destination that should be used to store the snapshot. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
        - `retentionTime`: (integer) Retention time of the additional back up in days.
        - `type`: (string) (required) The type of backup destination to use (enum: custom)
    - `compressionType`: (string) The compression algorithm of the backup. Only applicable for dump backups. Defaults to `gz`. (enum: gz, zstd)
    - `retentionTime`: (integer) (required) The time the backup is retained for, in days.
 - `metadata`: {object}
   - `labels`: {object}
   - `annotations`: {object} | {object}
 - `name`: (string) (required) The name of the addon. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
 - `description`: (string) A description of the addon. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
 - `projectId`: (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$)
 - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
 - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
 - `type`: (string) (required) The identifier for the type of addon. Addon types can be found at the Get Addon Types endpoint.
 - `infrastructure`: {object}
   - `architecture`: (string) (enum: x86, arm)
 - `templateValues`: {object} | {object}
 - `name`: (string) (required) The name of the addon. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
 - `description`: (string) A description of the addon. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
 - `projectId`: (string) ID of parent project (pattern: ^[A-Za-z0-9-]+$)
 - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
 - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
 - `type`: (string) (required) The identifier for the type of addon. Addon types can be found at the Get Addon Types endpoint.
 - `infrastructure`: {object}
   - `architecture`: (string) (enum: x86, arm)
 - `region`: (string) The AWS region identifier for the bucket location.

**Response body:**

{object}
- `data`: (multiple options) {object}
   - `name`: (string) (required) The name of the addon. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
   - `description`: (string) A description of the addon. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
   - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `type`: (string) (required) The identifier for the type of addon. Addon types can be found at the Get Addon Types endpoint.
   - `infrastructure`: {object}
     - `architecture`: (string) (enum: x86, arm)
   - `version`: (string) (required) The version of the addon type to use. If set to `latest`, the addon will be created with the most recent addon version. If set to a major version appended with `-latest`, e.g. `14-latest` or `14.5-latest`, the addon will be created with the most recent minor/patch version belonging to that major version.
   - `billing`: {object}
     - `deploymentPlan`: (string) (required) The ID of the deployment plan to use. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `storageClass`: (string) The type of storage. Only configurable if the relevant feature flag is enabled for you account (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
     - `storage`: (integer) (required) The size of the addon storage, in megabytes.
     - `replicas`: (integer) (required) The number of addon replicas to run.
     - `zonalRedundancy`: {object}
       - `type`: (string) Defines scheduling behaviour across different zones within the same region. (enum: required, disabled)
       - `minZones`: (integer) Defines how many zones are required and will prevent containers from additional scheduling into existing zones. (Only relevant if type is set to "required")
   - `source`: (multiple options) {object}
      - `projectId`: (string) ID of the project of the source addon. Only required if not the same as target addon (pattern: ^[A-Za-z0-9-]+$)
      - `addonId`: (string) (required) ID of the addon to fork. (pattern: ^[A-Za-z0-9-]+$)
      - `backupId`: (string) (required) ID of a backup belonging to that addon to use for the fork. (pattern: ^[A-Za-z0-9-]+$) | {object}
      - `backupUid`: (string) (required) Uid of the backup (format: uuid)
   - `tlsEnabled`: (boolean) Enables access to the addon via TLS (if supported by the addon type).
   - `externalAccessEnabled`: (boolean) Enables external access to the addon via TLS (if supported by the addon type).
   - `ipPolicies`: [array of] {object}
      - `addresses`: [array of] (string) An IP address used by this rule
      - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
   - `typeSpecificSettings`: {object}
     - `redisMaxMemoryPolicy`: (string) Redis only: Key eviction policy at memory pressure. (enum: noeviction, allkeys-lru, allkeys-lfu, volatile-lru, volatile-lfu, allkeys-random, volatile-random, volatile-ttl, volatile-lrm, allkeys-lrm)
     - `redisSentinelEnabled`: (boolean) Redis only: Deploy Redis with Sentinel high availability. Default: false
     - `postgresqlWalLevel`: (string) PostgreSQL only: Configure wal_level setting. (enum: replica, logical)
     - `postgresqlSupabaseMode`: (boolean) PostgreSQL only: Enable Supabase mode.
     - `postgresqlConnectionPoolerEnabled`: (boolean) PostgreSQL only: Run connection pooler in front of postgres instance.
     - `postgresqlConnectionPoolerReplicas`: (integer) PostgreSQL only: Number of connection pooler replicas in case connection pooler is enabled.
     - `postgresqlReadConnectionPoolerEnabled`: (boolean) PostgreSQL only: Run connection pooler in front of read-only postgres instance.
     - `postgresqlReadConnectionPoolerReplicas`: (integer) PostgreSQL only: Number of read-only connection pooler replicas in case read-only connection pooler is enabled.
     - `postgresqlImportMode`: (boolean) PostgreSQL only: Configure PostgreSQL for higher import speed. Not recommended for production workloads.
     - `mysqlHaModeEnabled`: (boolean) MySQL only: Run MySQL in HA configuration with auto-failover and connection poolers.
     - `mysqlRouterReplicas`: (integer) MysqlHA only: Number of connection router replicas in case connection router is enabled.
   - `customCredentials`: {object}
     - `dbName`: (string) Custom database name. Not supported for all addon types.
   - `backupSchedules`: [array of] {object}
      - `scheduling`: {object}
        - `interval`: (string) (required) The interval between backups. Each addon can only have one backup schedule of each interval for each backup type. (enum: hourly, daily, weekly)
        - `minute`: [array of] (integer) A minute when the backup should be performed.
        - `hour`: [array of] (integer) An hour when the backup should be performed, in 24 hour format.
        - `day`: [array of] (integer) A day of the week when the backup should be performed, where `0` represents Monday and `6` represents Sunday.
      - `backupType`: (string) (required) The type of the backup to be performed. (enum: dump, snapshot)
      - `customDestinationId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
      - `additionalDestinations`: [array of] {object}
          - `destinationId`: (string) (required) Additional custom back up destination that should be used to store the snapshot. (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
          - `retentionTime`: (integer) Retention time of the additional back up in days.
          - `type`: (string) (required) The type of backup destination to use (enum: custom)
      - `compressionType`: (string) The compression algorithm of the backup. Only applicable for dump backups. Defaults to `gz`. (enum: gz, zstd)
      - `retentionTime`: (integer) (required) The time the backup is retained for, in days.
   - `metadata`: {object}
     - `labels`: {object}
     - `annotations`: {object}
   - `id`: (string) (required) Identifier for the addon.
   - `appId`: (string) (required) Full identifier used for deployment
   - `status`: (string) (required) The current state of the addon. (enum: preDeployment, triggerAllocation, allocating, postDeployment, running, paused, scaling, upgrading, resetting, backup, restore, failed, error, errorAllocating, deleting, deleted)
   - `cluster`: {object}
     - `id`: (string) (required) The id of the cluster associated with this project.
     - `name`: (string) (required) The name of the cluster associated with this project.
     - `namespace`: (string) Namespace this resource is located within on the cluster.
     - `loadBalancers`: [array of] (string)
   - `createdAt`: (string) time of creation (format: date-time)
   - `updatedAt`: (string) time of update (format: date-time) | {object}
   - `name`: (string) (required) The name of the addon. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
   - `description`: (string) A description of the addon. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
   - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `type`: (string) (required) The identifier for the type of addon. Addon types can be found at the Get Addon Types endpoint.
   - `infrastructure`: {object}
     - `architecture`: (string) (enum: x86, arm)
   - `templateValues`: {object}
   - `id`: (string) (required) Identifier for the addon.
   - `appId`: (string) (required) Full identifier used for deployment
   - `status`: (string) (required) The current state of the addon. (enum: preDeployment, triggerAllocation, allocating, postDeployment, running, paused, scaling, upgrading, resetting, backup, restore, failed, error, errorAllocating, deleting, deleted)
   - `cluster`: {object}
     - `id`: (string) (required) The id of the cluster associated with this project.
     - `name`: (string) (required) The name of the cluster associated with this project.
     - `namespace`: (string) Namespace this resource is located within on the cluster.
     - `loadBalancers`: [array of] (string)
   - `createdAt`: (string) time of creation (format: date-time)
   - `updatedAt`: (string) time of update (format: date-time) | {object}
   - `name`: (string) (required) The name of the addon. (pattern: ^[a-zA-Z]((-|\s)?[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
   - `description`: (string) A description of the addon. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
   - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
   - `type`: (string) (required) The identifier for the type of addon. Addon types can be found at the Get Addon Types endpoint.
   - `infrastructure`: {object}
     - `architecture`: (string) (enum: x86, arm)
   - `region`: (string) The AWS region identifier for the bucket location.
   - `id`: (string) (required) Identifier for the addon.
   - `appId`: (string) (required) Full identifier used for deployment
   - `status`: (string) (required) The current state of the addon. (enum: preDeployment, triggerAllocation, allocating, postDeployment, running, paused, scaling, upgrading, resetting, backup, restore, failed, error, errorAllocating, deleting, deleted)
   - `cluster`: {object}
     - `id`: (string) (required) The id of the cluster associated with this project.
     - `name`: (string) (required) The name of the cluster associated with this project.
     - `namespace`: (string) Namespace this resource is located within on the cluster.
     - `loadBalancers`: [array of] (string)
   - `createdAt`: (string) time of creation (format: date-time)
   - `updatedAt`: (string) time of update (format: date-time)

### API reference

PUT /v1/projects/{projectId}/addons

PUT /v1/teams/{teamId}/projects/{projectId}/addons

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request PUT \
  --data '{"name":"Example Addon","description":"An addon description","projectId":"example-project","type":"postgresql","version":"latest","billing":{"deploymentPlan":"nf-compute-20","storageClass":"nvme","storage":6144,"replicas":1},"source":{"projectId":"existing-project","addonId":"existing-addon","backupId":"existing-backup"},"ipPolicies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"backupSchedules":[{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"backupType":"snapshot","additionalDestinations":[{"destinationId":"example-backup-destination","retentionTime":7,"type":"custom"}],"compressionType":"gz","retentionTime":7}]}' \
  https://api.northflank.com/v1/projects/{projectId}/addons
```

```javascript
const payload = {
  "name": "Example Addon",
  "description": "An addon description",
  "projectId": "example-project",
  "type": "postgresql",
  "version": "latest",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "storageClass": "nvme",
    "storage": 6144,
    "replicas": 1
  },
  "source": {
    "projectId": "existing-project",
    "addonId": "existing-addon",
    "backupId": "existing-backup"
  },
  "ipPolicies": [
    {
      "addresses": [
        "127.0.0.1"
      ],
      "action": "DENY"
    }
  ],
  "backupSchedules": [
    {
      "scheduling": {
        "interval": "weekly",
        "minute": [
          30
        ],
        "hour": [
          18
        ],
        "day": [
          4
        ]
      },
      "backupType": "snapshot",
      "additionalDestinations": [
        {
          "destinationId": "example-backup-destination",
          "retentionTime": 7,
          "type": "custom"
        }
      ],
      "compressionType": "gz",
      "retentionTime": 7
    }
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/addons', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/addons"

payload = {"name":"Example Addon","description":"An addon description","projectId":"example-project","type":"postgresql","version":"latest","billing":{"deploymentPlan":"nf-compute-20","storageClass":"nvme","storage":6144,"replicas":1},"source":{"projectId":"existing-project","addonId":"existing-addon","backupId":"existing-backup"},"ipPolicies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"backupSchedules":[{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"backupType":"snapshot","additionalDestinations":[{"destinationId":"example-backup-destination","retentionTime":7,"type":"custom"}],"compressionType":"gz","retentionTime":7}]}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("PUT", url, headers = headers, json = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/projects/{projectId}/addons"

  var jsonStr = []byte(`{"name":"Example Addon","description":"An addon description","projectId":"example-project","type":"postgresql","version":"latest","billing":{"deploymentPlan":"nf-compute-20","storageClass":"nvme","storage":6144,"replicas":1},"source":{"projectId":"existing-project","addonId":"existing-addon","backupId":"existing-backup"},"ipPolicies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"backupSchedules":[{"scheduling":{"interval":"weekly","minute":[30],"hour":[18],"day":[4]},"backupType":"snapshot","additionalDestinations":[{"destinationId":"example-backup-destination","retentionTime":7,"type":"custom"}],"compressionType":"gz","retentionTime":7}]}`)
  req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

#### Example Response

200 OK: Details about the created or updated addon.

```json
{
  "data": {
    "name": "Example Addon",
    "description": "An addon description",
    "type": "postgresql",
    "version": "latest",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "storageClass": "nvme",
      "storage": 6144,
      "replicas": 1
    },
    "source": {
      "projectId": "existing-project",
      "addonId": "existing-addon",
      "backupId": "existing-backup"
    },
    "ipPolicies": [
      {
        "addresses": [
          "127.0.0.1"
        ],
        "action": "DENY"
      }
    ],
    "backupSchedules": [
      {
        "scheduling": {
          "interval": "weekly",
          "minute": [
            30
          ],
          "hour": [
            18
          ],
          "day": [
            4
          ]
        },
        "backupType": "snapshot",
        "additionalDestinations": [
          {
            "destinationId": "example-backup-destination",
            "retentionTime": 7,
            "type": "custom"
          }
        ],
        "compressionType": "gz",
        "retentionTime": 7
      }
    ],
    "id": "example-addon",
    "appId": "/example-user/default-project/example-addon",
    "status": "running",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  }
}
```

OR

```json
{
  "data": {
    "name": "Example Addon",
    "description": "An addon description",
    "type": "postgresql",
    "templateValues": "{\"replicas\": 2}",
    "id": "example-addon",
    "appId": "/example-user/default-project/example-addon",
    "status": "running",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  }
}
```

OR

```json
{
  "data": {
    "name": "Example Addon",
    "description": "An addon description",
    "type": "postgresql",
    "region": "eu-west-2",
    "id": "example-addon",
    "appId": "/example-user/default-project/example-addon",
    "status": "running",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  }
}
```

### CLI reference

$ northflank put addon

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Addon",
  "description": "An addon description",
  "projectId": "example-project",
  "type": "postgresql",
  "version": "latest",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "storageClass": "nvme",
    "storage": 6144,
    "replicas": 1
  },
  "source": {
    "projectId": "existing-project",
    "addonId": "existing-addon",
    "backupId": "existing-backup"
  },
  "ipPolicies": [
    {
      "addresses": [
        "127.0.0.1"
      ],
      "action": "DENY"
    }
  ],
  "backupSchedules": [
    {
      "scheduling": {
        "interval": "weekly",
        "minute": [
          30
        ],
        "hour": [
          18
        ],
        "day": [
          4
        ]
      },
      "backupType": "snapshot",
      "additionalDestinations": [
        {
          "destinationId": "example-backup-destination",
          "retentionTime": 7,
          "type": "custom"
        }
      ],
      "compressionType": "gz",
      "retentionTime": 7
    }
  ]
}
```

#### Example Response

 Details about the created or updated addon.

```json
{
  "name": "Example Addon",
  "description": "An addon description",
  "type": "postgresql",
  "version": "latest",
  "billing": {
    "deploymentPlan": "nf-compute-20",
    "storageClass": "nvme",
    "storage": 6144,
    "replicas": 1
  },
  "source": {
    "projectId": "existing-project",
    "addonId": "existing-addon",
    "backupId": "existing-backup"
  },
  "ipPolicies": [
    {
      "addresses": [
        "127.0.0.1"
      ],
      "action": "DENY"
    }
  ],
  "backupSchedules": [
    {
      "scheduling": {
        "interval": "weekly",
        "minute": [
          30
        ],
        "hour": [
          18
        ],
        "day": [
          4
        ]
      },
      "backupType": "snapshot",
      "additionalDestinations": [
        {
          "destinationId": "example-backup-destination",
          "retentionTime": 7,
          "type": "custom"
        }
      ],
      "compressionType": "gz",
      "retentionTime": 7
    }
  ],
  "id": "example-addon",
  "appId": "/example-user/default-project/example-addon",
  "status": "running",
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  }
}
```

OR

```json
{
  "name": "Example Addon",
  "description": "An addon description",
  "type": "postgresql",
  "templateValues": "{\"replicas\": 2}",
  "id": "example-addon",
  "appId": "/example-user/default-project/example-addon",
  "status": "running",
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  }
}
```

OR

```json
{
  "name": "Example Addon",
  "description": "An addon description",
  "type": "postgresql",
  "region": "eu-west-2",
  "id": "example-addon",
  "appId": "/example-user/default-project/example-addon",
  "status": "running",
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.put.addon({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "name": "Example Addon",
    "description": "An addon description",
    "projectId": "example-project",
    "type": "postgresql",
    "version": "latest",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "storageClass": "nvme",
      "storage": 6144,
      "replicas": 1
    },
    "source": {
      "projectId": "existing-project",
      "addonId": "existing-addon",
      "backupId": "existing-backup"
    },
    "ipPolicies": [
      {
        "addresses": [
          "127.0.0.1"
        ],
        "action": "DENY"
      }
    ],
    "backupSchedules": [
      {
        "scheduling": {
          "interval": "weekly",
          "minute": [
            30
          ],
          "hour": [
            18
          ],
          "day": [
            4
          ]
        },
        "backupType": "snapshot",
        "additionalDestinations": [
          {
            "destinationId": "example-backup-destination",
            "retentionTime": 7,
            "type": "custom"
          }
        ],
        "compressionType": "gz",
        "retentionTime": 7
      }
    ]
  }
});
```

#### Example Response

 Details about the created or updated addon.

```json
{
  "data": {
    "name": "Example Addon",
    "description": "An addon description",
    "type": "postgresql",
    "version": "latest",
    "billing": {
      "deploymentPlan": "nf-compute-20",
      "storageClass": "nvme",
      "storage": 6144,
      "replicas": 1
    },
    "source": {
      "projectId": "existing-project",
      "addonId": "existing-addon",
      "backupId": "existing-backup"
    },
    "ipPolicies": [
      {
        "addresses": [
          "127.0.0.1"
        ],
        "action": "DENY"
      }
    ],
    "backupSchedules": [
      {
        "scheduling": {
          "interval": "weekly",
          "minute": [
            30
          ],
          "hour": [
            18
          ],
          "day": [
            4
          ]
        },
        "backupType": "snapshot",
        "additionalDestinations": [
          {
            "destinationId": "example-backup-destination",
            "retentionTime": 7,
            "type": "custom"
          }
        ],
        "compressionType": "gz",
        "retentionTime": 7
      }
    ],
    "id": "example-addon",
    "appId": "/example-user/default-project/example-addon",
    "status": "running",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

OR

```json
{
  "data": {
    "name": "Example Addon",
    "description": "An addon description",
    "type": "postgresql",
    "templateValues": "{\"replicas\": 2}",
    "id": "example-addon",
    "appId": "/example-user/default-project/example-addon",
    "status": "running",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

OR

```json
{
  "data": {
    "name": "Example Addon",
    "description": "An addon description",
    "type": "postgresql",
    "region": "eu-west-2",
    "id": "example-addon",
    "appId": "/example-user/default-project/example-addon",
    "status": "running",
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
