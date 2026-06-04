# Get job deployment

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-deployment.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /jobs/get-job instead](get-job.md)

Gets information about the deployment of the given job.

Required permission: Project > Jobs > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

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
     - `repository`: (string) (required) URL of the repository being deployed
     - `branch`: (string) (required) Branch of the repo being deployed
     - `buildId`: (string) (required) ID of the build currently deployed.
     - `buildSHA`: (string) (required) Commit SHA being deployed. `latest` means the latest commit is automatically being deployed.
     - `deployedSHA`: (string) Currently deployed commit SHA. If buildSHA is set to `latest`, this will show the SHA of the latest commit.
     - `nfObjectType`: (string) (required) Type of deployed entity (enum: service, job) | {object}
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

GET /v1/projects/{projectId}/jobs/{jobId}/deployment

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/deployment

#### Example Response

200 OK: Data about the job deployment.

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
      "repository": "https://github.com/northflank/gatsby-with-northflank",
      "branch": "master",
      "buildId": "incredible-land-3266",
      "buildSHA": "latest",
      "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616",
      "nfObjectType": "service"
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

$ northflank get job deployment

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Data about the job deployment.

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
    "repository": "https://github.com/northflank/gatsby-with-northflank",
    "branch": "master",
    "buildId": "incredible-land-3266",
    "buildSHA": "latest",
    "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616",
    "nfObjectType": "service"
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
await apiClient.get.job.deployment({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  }
});
```

#### Example Response

 Data about the job deployment.

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
      "repository": "https://github.com/northflank/gatsby-with-northflank",
      "branch": "master",
      "buildId": "incredible-land-3266",
      "buildSHA": "latest",
      "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616",
      "nfObjectType": "service"
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
