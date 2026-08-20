# List service deployments

Source: https://northflank.com/docs/v1/api/project/services/list-service-deployments.md

Lists the deployments of the given service, newest first. For services using a gradual rollout strategy each deployment also reports the release type it was created as.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `releaseType`: (string) Only return deployments whose current gradual rollout release type matches. Release type tracks the current role rather than how the deployment was created, so promoting a canary moves it out of the `canary` results and into `stable`. Deployments of services that do not use a gradual rollout strategy have no release type and are excluded when this is set. (enum: stable, canary)

**Response body:**

{object}
- `data`: {object}
  - `deployments`: [array of] {object}
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
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/deployments

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/deployments

#### Example Response

200 OK: A list of deployments.

```json
{
  "data": {
    "deployments": [
      {
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

$ northflank list service deployments

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--releaseType <releaseType>`: Only return deployments whose current gradual rollout release type matches. Release type tracks the current role rather than how the deployment was created, so promoting a canary moves it out of the `canary` results and into `stable`. Deployments of services that do not use a gradual rollout strategy have no release type and are excluded when this is set.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of deployments.

```json
{
  "deployments": [
    {
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
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.service.deployments({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "releaseType": "canary"
  }
});
```

#### Example Response

 A list of deployments.

```json
{
  "data": {
    "deployments": [
      {
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
