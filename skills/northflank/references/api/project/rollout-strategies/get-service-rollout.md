# Get service rollout

Source: https://northflank.com/docs/v1/api/project/rollout-strategies/get-service-rollout.md

Gets the active gradual rollout of the given service, including the traffic configuration, the stable and canary deployments, and previous traffic configurations.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}
  - `strategyId`: (string) (required) ID of the gradual rollout strategy this rollout was created from. Null if the strategy has since been deleted.
  - `type`: (string) (required) Type of the gradual rollout strategy. (enum: canary)
  - `promoted`: (boolean) (required) Whether the canary has been promoted to stable. A promoted rollout serves all traffic from the canary deployment and can no longer be reconfigured.
  - `createdAt`: (string) (required) Time the rollout started. (format: date-time)
  - `updatedAt`: (string) (required) Time the rollout was last changed. (format: date-time)
  - `options`: {object}
    - `triggers`: {object}
      - `releaseFromTemplate`: (boolean)
      - `releaseFromReleaseFlow`: (boolean)
      - `releaseFromCD`: (boolean)
      - `releaseFromUI`: (boolean)
      - `releaseFromApi`: (boolean)
    - `blockDeploymentOnActiveRollout`: (boolean) Whether new deployments are blocked while this rollout is in progress.
  - `details`: {object}
    - `canaryStrategy`: (string) (required) How traffic is split between the stable and canary deployments. (enum: percentage, header)
    - `config`: (multiple options) {object}
        - `canaryPercentage`: (integer) (required) Percentage of traffic to route to the canary deployment. Must sum to 100 with stablePercentage.
        - `stablePercentage`: (integer) (required) Percentage of traffic to route to the stable deployment. Must sum to 100 with canaryPercentage. | {object}
        - `canaryHeader`: {object}
          - `headerName`: (string) (required)
          - `headerValue`: (string) (required)
        - `stableHeader`: {object}
          - `headerName`: (string) (required)
          - `headerValue`: (string) (required)
  - `stableDeployment`: {object}
    - `id`: (string) (required) Identifier of the deployment. Use this as the rollback target.
    - `name`: (string) Display name of the deployment. Null until the first pod of the deployment has been observed.
    - `createdAt`: (string) (required) Time the deployment was created. (format: date-time)
    - `active`: (boolean) Whether the deployment is currently serving traffic. During a gradual rollout both the stable and the canary deployment are active.
    - `releaseType`: (string) Current role of the deployment in the gradual rollout. This is mutable: promoting a canary deployment changes its release type to `stable`, so it does not record how the deployment was originally created. Absent for services that do not use a gradual rollout strategy. (enum: stable, canary)
    - `image`: {object}
      - `imagePath`: (string) Full path of the deployed image.
      - `image`: (string) Name of the deployed image.
      - `tag`: (string) Tag of the deployed image.
      - `sha`: (string) Digest of the deployed image.
    - `commit`: {object}
      - `sha`: (string) Commit the deployed image was built from.
      - `message`: (string) Commit message.
      - `author`: (string) Login of the commit author.
      - `date`: (multiple options) (string) | (string) (format: date-time)
    - `instances`: (number) Number of instances the deployment was created with. (format: float)
    - `reason`: {object}
      - `id`: (string) Why the deployment was created.
      - `user`: {object}
        - `name`: (string) Name of the acting user.
        - `email`: (string) Email of the acting user.
  - `canaryDeployment`: {object}
    - `id`: (string) (required) Identifier of the deployment. Use this as the rollback target.
    - `name`: (string) Display name of the deployment. Null until the first pod of the deployment has been observed.
    - `createdAt`: (string) (required) Time the deployment was created. (format: date-time)
    - `active`: (boolean) Whether the deployment is currently serving traffic. During a gradual rollout both the stable and the canary deployment are active.
    - `releaseType`: (string) Current role of the deployment in the gradual rollout. This is mutable: promoting a canary deployment changes its release type to `stable`, so it does not record how the deployment was originally created. Absent for services that do not use a gradual rollout strategy. (enum: stable, canary)
    - `image`: {object}
      - `imagePath`: (string) Full path of the deployed image.
      - `image`: (string) Name of the deployed image.
      - `tag`: (string) Tag of the deployed image.
      - `sha`: (string) Digest of the deployed image.
    - `commit`: {object}
      - `sha`: (string) Commit the deployed image was built from.
      - `message`: (string) Commit message.
      - `author`: (string) Login of the commit author.
      - `date`: (multiple options) (string) | (string) (format: date-time)
    - `instances`: (number) Number of instances the deployment was created with. (format: float)
    - `reason`: {object}
      - `id`: (string) Why the deployment was created.
      - `user`: {object}
        - `name`: (string) Name of the acting user.
        - `email`: (string) Email of the acting user.
  - `history`: [array of] {object}
     - `config`: (multiple options) {object}
         - `canaryPercentage`: (integer) (required) Percentage of traffic to route to the canary deployment. Must sum to 100 with stablePercentage.
         - `stablePercentage`: (integer) (required) Percentage of traffic to route to the stable deployment. Must sum to 100 with canaryPercentage. | {object}
         - `canaryHeader`: {object}
           - `headerName`: (string) (required)
           - `headerValue`: (string) (required)
         - `stableHeader`: {object}
           - `headerName`: (string) (required)
           - `headerValue`: (string) (required)
     - `updatedAt`: (string) (required) Time the split was applied. (format: date-time)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/rollout

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/rollout

#### Example Response

200 OK: The active rollout of the service.

```json
{
  "data": {
    "strategyId": "example-gradual-rollout-strategy",
    "type": "canary",
    "promoted": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z",
    "details": {
      "canaryStrategy": "percentage",
      "config": {
        "canaryPercentage": 20,
        "stablePercentage": 80
      }
    },
    "stableDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "canaryDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "history": [
      {
        "config": {
          "canaryPercentage": 20,
          "stablePercentage": 80
        },
        "updatedAt": "2024-01-15T10:45:00.000Z"
      }
    ]
  }
}
```

#### Example Response

404 Not Found: The service does not have an active gradual rollout.

### CLI reference

$ northflank get service rollout

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The active rollout of the service.

```json
{
  "strategyId": "example-gradual-rollout-strategy",
  "type": "canary",
  "promoted": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z",
  "details": {
    "canaryStrategy": "percentage",
    "config": {
      "canaryPercentage": 20,
      "stablePercentage": 80
    }
  },
  "stableDeployment": {
    "id": "6560a1b2c3d4e5f6a7b8c9d0",
    "name": "example-service-7d9f8b6c5d",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "active": true,
    "releaseType": "canary",
    "image": {
      "imagePath": "nginx:latest",
      "image": "nginx",
      "tag": "latest",
      "sha": "sha256:9c8f8d"
    },
    "commit": {
      "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      "message": "fix: handle empty payload",
      "author": "octocat"
    },
    "instances": 2,
    "reason": {
      "id": "service-updated",
      "user": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  },
  "canaryDeployment": {
    "id": "6560a1b2c3d4e5f6a7b8c9d0",
    "name": "example-service-7d9f8b6c5d",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "active": true,
    "releaseType": "canary",
    "image": {
      "imagePath": "nginx:latest",
      "image": "nginx",
      "tag": "latest",
      "sha": "sha256:9c8f8d"
    },
    "commit": {
      "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      "message": "fix: handle empty payload",
      "author": "octocat"
    },
    "instances": 2,
    "reason": {
      "id": "service-updated",
      "user": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  },
  "history": [
    {
      "config": {
        "canaryPercentage": 20,
        "stablePercentage": 80
      },
      "updatedAt": "2024-01-15T10:45:00.000Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.rollout({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 The active rollout of the service.

```json
{
  "data": {
    "strategyId": "example-gradual-rollout-strategy",
    "type": "canary",
    "promoted": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z",
    "details": {
      "canaryStrategy": "percentage",
      "config": {
        "canaryPercentage": 20,
        "stablePercentage": 80
      }
    },
    "stableDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "canaryDeployment": {
      "id": "6560a1b2c3d4e5f6a7b8c9d0",
      "name": "example-service-7d9f8b6c5d",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "active": true,
      "releaseType": "canary",
      "image": {
        "imagePath": "nginx:latest",
        "image": "nginx",
        "tag": "latest",
        "sha": "sha256:9c8f8d"
      },
      "commit": {
        "sha": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
        "message": "fix: handle empty payload",
        "author": "octocat"
      },
      "instances": 2,
      "reason": {
        "id": "service-updated",
        "user": {
          "name": "Jane Doe",
          "email": "jane@example.com"
        }
      }
    },
    "history": [
      {
        "config": {
          "canaryPercentage": 20,
          "stablePercentage": 80
        },
        "updatedAt": "2024-01-15T10:45:00.000Z"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
