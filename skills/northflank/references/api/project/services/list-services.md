# List services

Source: https://northflank.com/docs/v1/api/project/services/list-services.md

Gets a list of services belonging to the project

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `services`: [array of] {object}
     - `id`: (string) (required) Identifier for the service
     - `uid`: (string) (required) Permanent identifier for the resource. Unlike `id`, it never changes and is never reused. (min length: 24) (max length: 24)
     - `appId`: (string) (required) Full identifier used for service deployment
     - `projectId`: (string) (required) ID of the project the service belongs to.
     - `stageId`: (string) ID of the environment the service belongs to.
     - `name`: (string) (required) Service name
     - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) A short description of the service
     - `serviceType`: (string) (required) Type of the service (combined, build or deployment) (enum: combined, build, deployment)
     - `disabledCI`: (boolean) (required) Whether Continuous Integration is disabled
     - `disabledCD`: (boolean) (required) Whether Continuous Deployment is disabled
     - `status`: {object}
       - `build`: {object}
         - `status`: (string) (required) The current status of the build. (enum: QUEUED, PENDING, UNSCHEDULABLE, STARTING, CLONING, BUILDING, UPLOADING, ABORTED, FAILURE, SUBMISSION_FAILURE, SUCCESS, CRASHED, IN_PROGRESS)
         - `lastTransitionTime`: (string) The timestamp of when the build reached this status. (format: date-time)
       - `deployment`: {object}
         - `status`: (string) (required) The current status of the deployment. (enum: PENDING, IN_PROGRESS, COMPLETED, FAILED)
         - `reason`: (string) (required) The reason the current deployment was started. (enum: SCALING, DEPLOYING)
         - `lastTransitionTime`: (string) The timestamp of when the deployment reached this status. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/services

GET /v1/teams/{teamId}/projects/{projectId}/services

#### Example Response

200 OK: The list of services

```json
{
  "data": {
    "services": [
      {
        "id": "example-service",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-service",
        "projectId": "default-project",
        "stageId": "staging",
        "name": "Example Service",
        "description": "This is the service description",
        "serviceType": "combined",
        "disabledCI": false,
        "disabledCD": false,
        "status": {
          "build": {
            "status": "SUCCESS",
            "lastTransitionTime": "2021-11-29T11:47:16.624Z"
          },
          "deployment": {
            "status": "COMPLETED",
            "reason": "DEPLOYING",
            "lastTransitionTime": "2021-11-29T11:47:16.624Z"
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

$ northflank list services

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 The list of services

```json
{
  "services": [
    {
      "id": "example-service",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-service",
      "projectId": "default-project",
      "stageId": "staging",
      "name": "Example Service",
      "description": "This is the service description",
      "serviceType": "combined",
      "disabledCI": false,
      "disabledCD": false,
      "status": {
        "build": {
          "status": "SUCCESS",
          "lastTransitionTime": "2021-11-29T11:47:16.624Z"
        },
        "deployment": {
          "status": "COMPLETED",
          "reason": "DEPLOYING",
          "lastTransitionTime": "2021-11-29T11:47:16.624Z"
        }
      }
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.services({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 The list of services

```json
{
  "data": {
    "services": [
      {
        "id": "example-service",
        "uid": "68f0aa1b9c4e2d7f11a3b402",
        "appId": "/example-user/default-project/example-service",
        "projectId": "default-project",
        "stageId": "staging",
        "name": "Example Service",
        "description": "This is the service description",
        "serviceType": "combined",
        "disabledCI": false,
        "disabledCD": false,
        "status": {
          "build": {
            "status": "SUCCESS",
            "lastTransitionTime": "2021-11-29T11:47:16.624Z"
          },
          "deployment": {
            "status": "COMPLETED",
            "reason": "DEPLOYING",
            "lastTransitionTime": "2021-11-29T11:47:16.624Z"
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.services(
    project_id="default-project",
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "services": [
    {
      "id": "example-service",
      "uid": "68f0aa1b9c4e2d7f11a3b402",
      "appId": "/example-user/default-project/example-service",
      "projectId": "default-project",
      "stageId": "staging",
      "name": "Example Service",
      "description": "This is the service description",
      "serviceType": "combined",
      "disabledCI": false,
      "disabledCD": false,
      "status": {
        "build": {
          "status": "SUCCESS",
          "lastTransitionTime": "2021-11-29T11:47:16.624Z"
        },
        "deployment": {
          "status": "COMPLETED",
          "reason": "DEPLOYING",
          "lastTransitionTime": "2021-11-29T11:47:16.624Z"
        }
      },
      "tags": []
    }
  ]
}
```
