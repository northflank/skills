# Get project

Source: https://northflank.com/docs/v1/api/team/projects/get-project.md

Get information about the given project

Required permission: Project > Projects > Manage > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the project.
  - `name`: (string) (required) The name of the project.
  - `description`: (string) A short description of the project.
  - `deployment`: {object}
    - `region`: (string) (required) The region where the project's services, jobs and addons are deployed in.
  - `createdAt`: (string) (required) The time the project was created. (format: date-time)
  - `services`: [array of] {object}
     - `id`: (string) (required) Identifier for the service.
     - `appId`: (string) (required) Full identifier used for service deployment
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
     - `appId`: (string) (required) Full identifier used for deployment
     - `name`: (string) (required) The name of the job.
     - `description`: (string) A short description of the job.
     - `jobType`: (string) (required) Type of the job (manual or cron) (enum: manual, cron)
  - `addons`: [array of] {object}
     - `id`: (string) (required) Identifier for the addon.
     - `appId`: (string) (required) Full identifier used for deployment
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

200 OK: Details about the given project.

```json
{
  "data": {
    "id": "default-project",
    "name": "Default Project",
    "description": "The project description",
    "deployment": {
      "region": "europe-west"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "services": [
      {
        "id": "example-service",
        "appId": "/example-user/default-project/example-service",
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
        "appId": "/example-user/default-project/example-job",
        "name": "Example Job",
        "description": "This is the job description",
        "jobType": "cron"
      }
    ],
    "addons": [
      {
        "id": "example-addon",
        "appId": "/example-user/default-project/example-addon",
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

 Details about the given project.

```json
{
  "id": "default-project",
  "name": "Default Project",
  "description": "The project description",
  "deployment": {
    "region": "europe-west"
  },
  "createdAt": "2021-01-20T11:19:53.175Z",
  "services": [
    {
      "id": "example-service",
      "appId": "/example-user/default-project/example-service",
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
      "appId": "/example-user/default-project/example-job",
      "name": "Example Job",
      "description": "This is the job description",
      "jobType": "cron"
    }
  ],
  "addons": [
    {
      "id": "example-addon",
      "appId": "/example-user/default-project/example-addon",
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

```javascript
await apiClient.get.project({
  parameters: {
    "projectId": "default-project"
  }
});
```

#### Example Response

 Details about the given project.

```json
{
  "data": {
    "id": "default-project",
    "name": "Default Project",
    "description": "The project description",
    "deployment": {
      "region": "europe-west"
    },
    "createdAt": "2021-01-20T11:19:53.175Z",
    "services": [
      {
        "id": "example-service",
        "appId": "/example-user/default-project/example-service",
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
        "appId": "/example-user/default-project/example-job",
        "name": "Example Job",
        "description": "This is the job description",
        "jobType": "cron"
      }
    ],
    "addons": [
      {
        "id": "example-addon",
        "appId": "/example-user/default-project/example-addon",
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
