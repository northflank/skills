# Get service deployment

Source: https://northflank.com/docs/v1/api/project/services/get-service-deployment.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /services/get-service instead](get-service.md)

Gets information about the deployment of the given service.

Required permission: Project > Services > Deployment > View Instances

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: (multiple options) {object}
   - `region`: (string) Region where this service is deployed and/or built
   - `instances`: (integer) Number of instances/replicas running
   - `docker`: {object}
     - `configType`: (string) (required) Override configuration which is used at runtime. (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
     - `customEntrypoint`: (string) The CMD to run instead of the default if entrypoint override is enabled.
     - `customCommand`: (string) The CMD to run instead of the default if CMD override is enabled.
   - `buildpack`: {object}
     - `configType`: (string) (required) Type of buildpack run configuration. (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
     - `customProcess`: (string) Custom process which should be run.
     - `customEntrypoint`: (string) Custom entrypoint which should be run.
     - `customCommand`: (string) Custom command which should be run.
   - `storage`: {object}
     - `ephemeralStorage`: {object}
       - `storageSize`: (number) (required) Ephemeral storage per container in MB (format: float)
     - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
   - `internal`: {object}
     - `appId`: (string) (required) Full identifier of deployed entity
     - `nfObjectId`: (string) (required) ID of deployed entity
     - `nfObjectType`: (string) (required) Type of deployed entity (enum: service)
     - `repository`: (string) (required) URL of the repository being deployed
     - `branch`: (string) (required) Branch of the repo being deployed
     - `buildId`: (string) (required) ID of the build currently deployed.
     - `buildSHA`: (string) (required) Commit SHA being deployed. `latest` means the latest commit is automatically being deployed.
     - `deployedSHA`: (string) Currently deployed commit SHA. If buildSHA is set to `latest`, this will show the SHA of the latest commit. | {object}
   - `region`: (string) Region where this service is deployed and/or built
   - `instances`: (integer) Number of instances/replicas running
   - `docker`: {object}
     - `configType`: (string) (required) Override configuration which is used at runtime. (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
     - `customEntrypoint`: (string) The CMD to run instead of the default if entrypoint override is enabled.
     - `customCommand`: (string) The CMD to run instead of the default if CMD override is enabled.
   - `buildpack`: {object}
     - `configType`: (string) (required) Type of buildpack run configuration. (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
     - `customProcess`: (string) Custom process which should be run.
     - `customEntrypoint`: (string) Custom entrypoint which should be run.
     - `customCommand`: (string) Custom command which should be run.
   - `storage`: {object}
     - `ephemeralStorage`: {object}
       - `storageSize`: (number) (required) Ephemeral storage per container in MB (format: float)
     - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
   - `external`: {object}
     - `imagePath`: (string) (required) Path of the external image excluding the hostname
     - `registryProvider`: (string) (required) Registry provider hosting the external image (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)
     - `privateImage`: (boolean) (required) Does the image require authentication

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/deployment

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/deployment

#### Example Response

200 OK: Data about the service deployment.

```json
{
  "data": {
    "region": "europe-west",
    "instances": 1,
    "docker": {
      "configType": "default",
      "customCommand": "nginx -g"
    },
    "buildpack": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "internal": {
      "appId": "/example-user/default-project/example-service",
      "nfObjectId": "example-service",
      "nfObjectType": "service",
      "repository": "https://github.com/northflank/gatsby-with-northflank",
      "branch": "master",
      "buildId": "incredible-land-3266",
      "buildSHA": "latest",
      "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616"
    }
  }
}
```

OR

```json
{
  "data": {
    "region": "europe-west",
    "instances": 1,
    "docker": {
      "configType": "default",
      "customCommand": "nginx -g"
    },
    "buildpack": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "external": {
      "imagePath": "nginx:latest",
      "registryProvider": "dockerhub",
      "privateImage": false
    }
  }
}
```

### CLI reference

$ northflank get service deployment

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the service deployment.

```json
{
  "region": "europe-west",
  "instances": 1,
  "docker": {
    "configType": "default",
    "customCommand": "nginx -g"
  },
  "buildpack": {
    "configType": "default"
  },
  "storage": {
    "ephemeralStorage": {
      "storageSize": 1024
    }
  },
  "internal": {
    "appId": "/example-user/default-project/example-service",
    "nfObjectId": "example-service",
    "nfObjectType": "service",
    "repository": "https://github.com/northflank/gatsby-with-northflank",
    "branch": "master",
    "buildId": "incredible-land-3266",
    "buildSHA": "latest",
    "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616"
  }
}
```

OR

```json
{
  "region": "europe-west",
  "instances": 1,
  "docker": {
    "configType": "default",
    "customCommand": "nginx -g"
  },
  "buildpack": {
    "configType": "default"
  },
  "storage": {
    "ephemeralStorage": {
      "storageSize": 1024
    }
  },
  "external": {
    "imagePath": "nginx:latest",
    "registryProvider": "dockerhub",
    "privateImage": false
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.deployment({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 Data about the service deployment.

```json
{
  "data": {
    "region": "europe-west",
    "instances": 1,
    "docker": {
      "configType": "default",
      "customCommand": "nginx -g"
    },
    "buildpack": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "internal": {
      "appId": "/example-user/default-project/example-service",
      "nfObjectId": "example-service",
      "nfObjectType": "service",
      "repository": "https://github.com/northflank/gatsby-with-northflank",
      "branch": "master",
      "buildId": "incredible-land-3266",
      "buildSHA": "latest",
      "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616"
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
    "region": "europe-west",
    "instances": 1,
    "docker": {
      "configType": "default",
      "customCommand": "nginx -g"
    },
    "buildpack": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "external": {
      "imagePath": "nginx:latest",
      "registryProvider": "dockerhub",
      "privateImage": false
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
