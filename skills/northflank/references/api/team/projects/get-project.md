# Get project

Source: https://northflank.com/docs/v1/api/team/projects/get-project.md

Get information about the given project.

Required permission: Project > Projects > Manage > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Response body:**

{object}
- `data`: {object}
  - `lifecycleStatus`: (string) (required) Status of resource on the platform (enum: pending_initialization, creating, created, creation_failed, upgrading, upgrade_failed, migration_pending, migrating, migration_failed, deleting, deletion_failed, deleted, cluster_deleted, initializing, tearing_down, teardown_failed)
  - `id`: (string) (required) Identifier for the project.
  - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
  - `name`: (string) (required) The name of the project.
  - `description`: (string) A short description of the project.
  - `deployment`: {object}
    - `region`: (string) (required) The region where the project's services, jobs and addons are deployed in.
  - `createdAt`: (string) (required) The time the project was created. (format: date-time)
  - `services`: [array of] {object}
     - `id`: (string) (required) Identifier for the service.
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `appId`: (string) (required) Full identifier used for service deployment
     - `stageId`: (string) ID of the environment the resource belongs to.
     - `name`: (string) (required) The name of the service.
     - `description`: (string) A short description of the service.
     - `serviceType`: (string) (required) Type of the service (combined, build or deployment) (enum: combined, build, deployment)
  - `customRegistry`: {object}
    - `enabled`: (boolean) (required) Whether the project has a custom registry.
    - `configuration`: {object}
      - `credentialId`: (string)
      - `provider`: (string) (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)
  - `jobs`: [array of] {object}
     - `id`: (string) (required) Identifier for the job.
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `appId`: (string) (required) Full identifier used for deployment
     - `stageId`: (string) ID of the environment the resource belongs to.
     - `name`: (string) (required) The name of the job.
     - `description`: (string) A short description of the job.
     - `jobType`: (string) (required) Type of the job (manual or cron) (enum: manual, cron)
  - `addons`: [array of] {object}
     - `id`: (string) (required) Identifier for the addon.
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `appId`: (string) (required) Full identifier used for deployment
     - `stageId`: (string) ID of the environment the resource belongs to.
     - `name`: (string) (required) The name of the addon.
     - `description`: (string) A short description of the addon.
     - `spec`: {object}
       - `type`: (string) (required) The type of the addon
  - `cluster`: {object}
    - `id`: (string) (required) The id of the cluster associated with this project.
    - `name`: (string) (required) The name of the cluster associated with this project.
    - `namespace`: (string) Namespace this resource is located within on the cluster.
    - `loadBalancers`: [array of] (string)

### API reference

GET /v1/projects/{projectId}

GET /v1/teams/{teamId}/projects/{projectId}

#### Example Response

200 OK: Project details.

```json
{
  "data": {
    "lifecycleStatus": "creating",
    "id": "default-project",
    "uid": "68f0aa1b9c4e2d7f11a3b402",
    "name": "Default Project",
    "description": "The project description",
    "deployment": {
      "region": "europe-west"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "services": [
      {
        "id": "example-service",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-service",
        "stageId": "staging",
        "name": "Example Service",
        "description": "This is the service description",
        "serviceType": "combined"
      }
    ],
    "customRegistry": {
      "enabled": false
    },
    "jobs": [
      {
        "id": "example-job",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-job",
        "stageId": "staging",
        "name": "Example Job",
        "description": "This is the job description",
        "jobType": "cron"
      }
    ],
    "addons": [
      {
        "id": "example-addon",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-addon",
        "stageId": "staging",
        "name": "Example Addon",
        "description": "This is the addon description",
        "spec": {
          "type": "mongodb"
        }
      }
    ],
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

$ northflank get project

Options:

- `--projectId <projectId>`: ID of the project

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Project details.

```json
{
  "lifecycleStatus": "creating",
  "id": "default-project",
  "uid": "68f0aa1b9c4e2d7f11a3b402",
  "name": "Default Project",
  "description": "The project description",
  "deployment": {
    "region": "europe-west"
  },
  "createdAt": "2021-01-20T11:19:53.175Z",
  "services": [
    {
      "id": "example-service",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-service",
      "stageId": "staging",
      "name": "Example Service",
      "description": "This is the service description",
      "serviceType": "combined"
    }
  ],
  "customRegistry": {
    "enabled": false
  },
  "jobs": [
    {
      "id": "example-job",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-job",
      "stageId": "staging",
      "name": "Example Job",
      "description": "This is the job description",
      "jobType": "cron"
    }
  ],
  "addons": [
    {
      "id": "example-addon",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-addon",
      "stageId": "staging",
      "name": "Example Addon",
      "description": "This is the addon description",
      "spec": {
        "type": "mongodb"
      }
    }
  ],
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

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.project({
  parameters: {
    "projectId": "default-project"
  }
});
```

#### Example Response

 Project details.

```json
{
  "data": {
    "lifecycleStatus": "creating",
    "id": "default-project",
    "uid": "68f0aa1b9c4e2d7f11a3b402",
    "name": "Default Project",
    "description": "The project description",
    "deployment": {
      "region": "europe-west"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "services": [
      {
        "id": "example-service",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-service",
        "stageId": "staging",
        "name": "Example Service",
        "description": "This is the service description",
        "serviceType": "combined"
      }
    ],
    "customRegistry": {
      "enabled": false
    },
    "jobs": [
      {
        "id": "example-job",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-job",
        "stageId": "staging",
        "name": "Example Job",
        "description": "This is the job description",
        "jobType": "cron"
      }
    ],
    "addons": [
      {
        "id": "example-addon",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-addon",
        "stageId": "staging",
        "name": "Example Addon",
        "description": "This is the addon description",
        "spec": {
          "type": "mongodb"
        }
      }
    ],
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.get.project(
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "lifecycleStatus": "creating",
  "id": "default-project",
  "uid": "68f0aa1b9c4e2d7f11a3b402",
  "name": "Default Project",
  "description": "The project description",
  "deployment": {
    "region": "europe-west"
  },
  "createdAt": "2021-01-20T11:19:53.175Z",
  "services": [
    {
      "id": "example-service",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-service",
      "stageId": "staging",
      "name": "Example Service",
      "description": "This is the service description",
      "serviceType": "combined"
    }
  ],
  "customRegistry": {
    "enabled": false
  },
  "jobs": [
    {
      "id": "example-job",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-job",
      "stageId": "staging",
      "name": "Example Job",
      "description": "This is the job description",
      "jobType": "cron"
    }
  ],
  "addons": [
    {
      "id": "example-addon",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-addon",
      "stageId": "staging",
      "name": "Example Addon",
      "description": "This is the addon description",
      "spec": {
        "type": "mongodb"
      }
    }
  ],
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
