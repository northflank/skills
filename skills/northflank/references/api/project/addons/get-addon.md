# Get addon

Source: https://northflank.com/docs/v1/api/project/addons/get-addon.md

Gets information about the given addon

Required permission: Project > Addons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `id`: (string) (required) Identifier for the addon.
  - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
  - `name`: (string) (required) Addon name.
  - `appId`: (string) (required) Full identifier for the addon.
  - `stageId`: (string) ID of the environment the addon belongs to.
  - `tags`: [array of] (required) An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) A short description of the addon.
  - `createdAt`: (string) (required) The time the addon was created. (format: date-time)
  - `status`: (string) (required) The current state of the addon. (enum: preDeployment, triggerAllocation, allocating, postDeployment, running, paused, scaling, upgrading, resetting, backup, restore, failed, error, errorAllocating, deleting, deleted)
  - `spec`: {object} (required) Details about the addon's specifications.
    - `type`: (string) (required) The type of the addon
    - `config`: (multiple options) (required) Details about the addon configuration. {object} Details about the config of the Northflank-managed addon.
        - `versionTag`: (string) (required) The version of the addon running.
        - `lifecycleStatus`: (string) (required) The support status of the current addon version. (enum: active, deprecated, discontinued)
        - `deployment`: {object} (required) Details about the addon deployment.
          - `podDisruptionBudget`: {object} Requested pod disruption protection. MySQL HA protection is mandatory.
            - `enabled`: (boolean) (required)
          - `replicas`: (integer) (required) The number of replicas running for this addon.
          - `storageClass`: (string) The type of storage used by the addon.
          - `storageSize`: (number) The size of the addon storage, in MB. (format: float)
          - `planId`: (string) (required) The deployment plan used by the addon.
          - `region`: (string) (required) The region where the addon is deployed.
        - `networking`: {object} (required) Details about the addon networking settings.
          - `tlsEnabled`: (boolean) (required) Whether this addon is provisioned with a TLS certificate.
          - `externalAccessEnabled`: (boolean) (required) Whether this addon is publicly accessible via the internet.
          - `vpcAccessible`: (boolean) Whether this addon is exposed on the cluster's private (VPC) load balancer.
          - `ipPolicies`: [array of] An array of IP policy rules. {object} Data about an IP policy rule.
              - `address`: (string) (required) An IP address used by this rule.
              - `action`: (string) (required) The action for this rule. (enum: DENY, ALLOW)
        - `typeSpecificSettings`: {object} Type-specific settings. Only present when at least one setting is set.
          - `memcachedAuthenticationEnabled`: (boolean) Memcached only: Whether SASL authentication is enabled. Cannot be changed after creation.
          - `postgresqlSupabaseMode`: (boolean) PostgreSQL only: Whether Supabase mode is enabled (loads supabase extensions and supautils). Set at creation, cannot be changed afterwards.
          - `postgresqlEdbRelease`: (string) Selected EDB release channel. (enum: stable, beta, nightly)
          - `postgresqlEdbMode`: (boolean) PostgreSQL only: Whether EDB mode is enabled (loads the EDB extension set). Set at creation, cannot be changed afterwards.
        - `secretRotation`: {object} Status of an in-progress secret rotation, if any.
          - `mode`: (string) (enum: user-facing, full)
          - `startedAt`: (string) The time the secret rotation was started. (format: date-time)
          - `completedAt`: (string) The time the secret rotation reached a terminal state. (format: date-time)
          - `inProgress`: (boolean) Whether secret rotation is pending or in progress. Redis revokes old credentials during its restart and completes automatically; other addons keep old credentials valid until finalised.
          - `status`: (string) The current status of the secret rotation. (enum: scheduled, rotating, rotated, finalising, completed, failed, finalise-failed)
          - `reason`: (string) What triggered the rotation. Defaults to a user-triggered rotate. (enum: user, restore, fork-auto-finalise) | {object} Details about the config of the custom addon.
        - `templateValues`: (string) The template values to be passed to the templating engine. Omitted without addon readSpec permission.
        - `templateValuesRedacted`: (boolean) Present when template values are withheld due to missing addon readSpec permission. | {object} Details about the config of the managed bucket addon.
        - `secretRotation`: {object} Status of an in-progress secret rotation, if any.
          - `mode`: (string) (enum: user-facing, full)
          - `startedAt`: (string) The time the secret rotation was started. (format: date-time)
          - `completedAt`: (string) The time the secret rotation reached a terminal state. (format: date-time)
          - `inProgress`: (boolean) Whether secret rotation is pending or in progress. Redis revokes old credentials during its restart and completes automatically; other addons keep old credentials valid until finalised.
          - `status`: (string) The current status of the secret rotation. (enum: scheduled, rotating, rotated, finalising, completed, failed, finalise-failed)
          - `reason`: (string) What triggered the rotation. Defaults to a user-triggered rotate. (enum: user, restore, fork-auto-finalise)
        - `region`: (string) The region where the bucket is provisioned.
    - `pendingActions`: [array of] (required) List of actions which are queued to be processed on this addon. {object}
        - `type`: (string) Type of the pending action
        - `createdAt`: (string) ISO timestamp of when the action was triggered (format: date-time)
  - `cluster`: {object} (required) Cluster information
    - `id`: (string) (required) The id of the cluster associated with this project.
    - `name`: (string) (required) The name of the cluster associated with this project.
    - `namespace`: (string) Namespace this resource is located within on the cluster.
    - `loadBalancers`: [array of] Load balancer DNS for the cluster. (string)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/addons/{addonId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details about the addon.

```json
{
  "data": {
    "id": "example-addon",
    "uid": "68f0aa1b9c4e2d7f11a3b402",
    "name": "Example Addon",
    "appId": "/example-user/default-project/example-addon",
    "stageId": "staging",
    "description": "This is the addon description",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "status": "running",
    "spec": {
      "type": "mongodb",
      "config": {
        "versionTag": "4.2.14",
        "lifecycleStatus": "active",
        "deployment": {
          "replicas": 1,
          "storageClass": "nvme",
          "storageSize": 6144,
          "planId": "nf-compute-20",
          "region": "europe-west"
        },
        "networking": {
          "tlsEnabled": true,
          "externalAccessEnabled": true,
          "vpcAccessible": false,
          "ipPolicies": [
            {
              "address": "127.0.0.1",
              "action": "ALLOW"
            }
          ]
        },
        "typeSpecificSettings": {
          "memcachedAuthenticationEnabled": false,
          "postgresqlSupabaseMode": true,
          "postgresqlEdbMode": true
        },
        "secretRotation": {
          "startedAt": "2026-01-20T11:19:53.175Z",
          "completedAt": "2026-01-20T11:24:02.881Z",
          "status": "rotated",
          "reason": "user"
        }
      },
      "pendingActions": [
        {
          "type": "backup",
          "createdAt": "2026-03-13T15:50:56.219Z"
        }
      ]
    },
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    },
    "tags": []
  }
}
```

### CLI reference

$ northflank get addon

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the addon.

```json
{
  "id": "example-addon",
  "uid": "68f0aa1b9c4e2d7f11a3b402",
  "name": "Example Addon",
  "appId": "/example-user/default-project/example-addon",
  "stageId": "staging",
  "description": "This is the addon description",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "status": "running",
  "spec": {
    "type": "mongodb",
    "config": {
      "versionTag": "4.2.14",
      "lifecycleStatus": "active",
      "deployment": {
        "replicas": 1,
        "storageClass": "nvme",
        "storageSize": 6144,
        "planId": "nf-compute-20",
        "region": "europe-west"
      },
      "networking": {
        "tlsEnabled": true,
        "externalAccessEnabled": true,
        "vpcAccessible": false,
        "ipPolicies": [
          {
            "address": "127.0.0.1",
            "action": "ALLOW"
          }
        ]
      },
      "typeSpecificSettings": {
        "memcachedAuthenticationEnabled": false,
        "postgresqlSupabaseMode": true,
        "postgresqlEdbMode": true
      },
      "secretRotation": {
        "startedAt": "2026-01-20T11:19:53.175Z",
        "completedAt": "2026-01-20T11:24:02.881Z",
        "status": "rotated",
        "reason": "user"
      }
    },
    "pendingActions": [
      {
        "type": "backup",
        "createdAt": "2026-03-13T15:50:56.219Z"
      }
    ]
  },
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  },
  "tags": []
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.addon({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  }
});
```

#### Example Response

 Details about the addon.

```json
{
  "data": {
    "id": "example-addon",
    "uid": "68f0aa1b9c4e2d7f11a3b402",
    "name": "Example Addon",
    "appId": "/example-user/default-project/example-addon",
    "stageId": "staging",
    "description": "This is the addon description",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "status": "running",
    "spec": {
      "type": "mongodb",
      "config": {
        "versionTag": "4.2.14",
        "lifecycleStatus": "active",
        "deployment": {
          "replicas": 1,
          "storageClass": "nvme",
          "storageSize": 6144,
          "planId": "nf-compute-20",
          "region": "europe-west"
        },
        "networking": {
          "tlsEnabled": true,
          "externalAccessEnabled": true,
          "vpcAccessible": false,
          "ipPolicies": [
            {
              "address": "127.0.0.1",
              "action": "ALLOW"
            }
          ]
        },
        "typeSpecificSettings": {
          "memcachedAuthenticationEnabled": false,
          "postgresqlSupabaseMode": true,
          "postgresqlEdbMode": true
        },
        "secretRotation": {
          "startedAt": "2026-01-20T11:19:53.175Z",
          "completedAt": "2026-01-20T11:24:02.881Z",
          "status": "rotated",
          "reason": "user"
        }
      },
      "pendingActions": [
        {
          "type": "backup",
          "createdAt": "2026-03-13T15:50:56.219Z"
        }
      ]
    },
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    },
    "tags": []
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

response = client.get.addon(
    addon_id="example-addon",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "id": "example-addon",
  "uid": "68f0aa1b9c4e2d7f11a3b402",
  "name": "Example Addon",
  "appId": "/example-user/default-project/example-addon",
  "stageId": "staging",
  "description": "This is the addon description",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "status": "running",
  "spec": {
    "type": "mongodb",
    "config": {
      "versionTag": "4.2.14",
      "lifecycleStatus": "active",
      "deployment": {
        "replicas": 1,
        "storageClass": "nvme",
        "storageSize": 6144,
        "planId": "nf-compute-20",
        "region": "europe-west"
      },
      "networking": {
        "tlsEnabled": true,
        "externalAccessEnabled": true,
        "vpcAccessible": false,
        "ipPolicies": [
          {
            "address": "127.0.0.1",
            "action": "ALLOW"
          }
        ]
      },
      "typeSpecificSettings": {
        "memcachedAuthenticationEnabled": false,
        "postgresqlSupabaseMode": true,
        "postgresqlEdbMode": true
      },
      "secretRotation": {
        "startedAt": "2026-01-20T11:19:53.175Z",
        "completedAt": "2026-01-20T11:24:02.881Z",
        "status": "rotated",
        "reason": "user"
      }
    },
    "pendingActions": [
      {
        "type": "backup",
        "createdAt": "2026-03-13T15:50:56.219Z"
      }
    ]
  },
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  },
  "tags": []
}
```
