# Get addon

Source: https://northflank.com/docs/v1/api/project/addons/get-addon.md

Gets information about the given addon

Required permission: Project > Addons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the addon.
  - `name`: (string) (required) Addon name.
  - `appId`: (string) (required) Full identifier for the addon.
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) A short description of the addon.
  - `createdAt`: (string) (required) The time the addon was created. (format: date-time)
  - `status`: (string) (required) The current state of the addon. (enum: preDeployment, triggerAllocation, allocating, postDeployment, running, paused, scaling, upgrading, resetting, backup, restore, failed, error, errorAllocating, deleting, deleted)
  - `spec`: {object}
    - `type`: (string) (required) The type of the addon
    - `config`: (multiple options) {object}
        - `versionTag`: (string) (required) The version of the addon running.
        - `lifecycleStatus`: (string) (required) The support status of the current addon version. (enum: active, deprecated, discontinued)
        - `deployment`: {object}
          - `replicas`: (integer) (required) The number of replicas running for this addon.
          - `storageClass`: (string) (required) The type of storage used by the addon.
          - `storageSize`: (number) (required) The size of the addon storage, in MB. (format: float)
          - `planId`: (string) (required) The deployment plan used by the addon.
          - `region`: (string) (required) The region where the addon is deployed.
        - `networking`: {object}
          - `tlsEnabled`: (boolean) (required) Whether this addon is provisioned with a TLS certificate.
          - `externalAccessEnabled`: (boolean) (required) Whether this addon is publicly accessible via the internet.
          - `ipPolicies`: [array of] {object}
              - `address`: (string) (required) An IP address used by this rule.
              - `action`: (string) (required) The action for this rule. (enum: DENY, ALLOW) | {object}
        - `templateValues`: (string) (required) The template values to be passed to the templating engine. | {object}
        - `region`: (string) The region where the bucket is provisioned.
    - `pendingActions`: [array of] {object}
        - `type`: (string) Type of the pending action
        - `createdAt`: (string) ISO timestamp of when the action was triggered (format: date-time)
  - `cluster`: {object}
    - `id`: (string) (required) The id of the cluster associated with this project.
    - `name`: (string) (required) The name of the cluster associated with this project.
    - `namespace`: (string) Namespace this resource is located within on the cluster.
    - `loadBalancers`: [array of] (string)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}

#### Example Response

200 OK: Details about the addon.

```json
{
  "data": {
    "id": "example-addon",
    "name": "Example Addon",
    "appId": "/example-user/default-project/example-addon",
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
          "ipPolicies": [
            {
              "address": "127.0.0.1",
              "action": "ALLOW"
            }
          ]
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
    }
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
  "name": "Example Addon",
  "appId": "/example-user/default-project/example-addon",
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
        "ipPolicies": [
          {
            "address": "127.0.0.1",
            "action": "ALLOW"
          }
        ]
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
  }
}
```

### JavaScript client reference

#### Example request

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
    "name": "Example Addon",
    "appId": "/example-user/default-project/example-addon",
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
          "ipPolicies": [
            {
              "address": "127.0.0.1",
              "action": "ALLOW"
            }
          ]
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
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
