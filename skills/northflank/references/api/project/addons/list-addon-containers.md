# List addon containers

Source: https://northflank.com/docs/v1/api/project/addons/list-addon-containers.md

Gets a list of containers for the given addon.

Required permission: Project > Addons > Deployment > View Instances

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `containers`: [array of] {object}
     - `name`: (string) (required) The name of the container.
     - `createdAt`: (integer) (required) The timestamp the container was created.
     - `status`: (string) (required) The current status of the container. (enum: TASK_RUNNING, TASK_STARTING, TASK_STAGING, TASK_KILLING, TASK_KILLED, TASK_FAILED, TASK_FINISHED)
     - `nodeName`: (string) BYOC only: the name of the node the container was scheduled to
     - `nodePoolUserId`: (string) BYOC only: the user facing ID of the node pool that the container was scheduled to
     - `nodePoolProviderId`: (string) BYOC only: the provider facing ID of the node pool that the container was scheduled to
     - `host`: (string) BYOC only: the host address of the node the container was scheduled to
     - `ipAddresses`: [array of] (string)
     - `updatedAt`: (integer) (required) The timestamp the container was last updated.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/containers

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/containers

#### Example Response

200 OK: Details about the addon's containers.

```json
{
  "data": {
    "containers": [
      {
        "name": "example-service-78b4d4459d-sbtn8",
        "createdAt": 1611241087,
        "status": "TASK_RUNNING",
        "updatedAt": 1611241087
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

$ northflank get addon containers

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the addon's containers.

```json
{
  "containers": [
    {
      "name": "example-service-78b4d4459d-sbtn8",
      "createdAt": 1611241087,
      "status": "TASK_RUNNING",
      "updatedAt": 1611241087
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.containers({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 Details about the addon's containers.

```json
{
  "data": {
    "containers": [
      {
        "name": "example-service-78b4d4459d-sbtn8",
        "createdAt": 1611241087,
        "status": "TASK_RUNNING",
        "updatedAt": 1611241087
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
