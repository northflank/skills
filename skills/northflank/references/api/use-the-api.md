# Use the API

Source: https://northflank.com/docs/v1/api/use-the-api.md

The Northflank API allows you to interact with every Northflank feature and all your resources using HTTP requests.

The API is available at [https://api.northflank.com/v1/](https://api.northflank.com/v1/). Before using the API you'll need to [sign up](https://app.northflank.com/signup), and if you're using Northflank with others, [create a team](../guides/collaborate.md#create-and-manage-a-team). You'll also need to [link a Git service](../guides/getting-started.md#link-your-git-account) (if you want to build code from your private Git repositories).

You can find the required permissions, path and object parameters, and examples requests and responses for all API endpoints, categorised by the type of resource or task, in the menu under API reference. You can also find the API parameters for your existing Northflank resources in the Northflank application by opening the options menu  in your resource header and selecting `view specification`.

Requests and responses are both in JSON. Requests should include the header:

```
Content-Type: application/json
```

### API specification and schemas

You can access Northflank's OpenAPI specification and schemas via the following endpoints:

- [https://api.northflank.com/v1/swagger-json](https://api.northflank.com/v1/swagger-json)

- [https://api.northflank.com/v1/swagger-html](https://api.northflank.com/v1/swagger-html)

### Authentication

Access to most endpoints is restricted and authenticated via a bearer token. Users can [generate a personal API token](../guides/secure.md#grant-api-access) in their account settings in the [Northflank application](https://app.northflank.com). Team members can generate an API token in that team's settings, provided an [API role](../guides/secure.md#grant-api-access) has been created by a member with permissions.

The API token must then be included in the Authorization header for the request:

```
Authorization: Bearer [YOUR AUTH TOKEN]
```

- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](../guides/secure.md#grant-api-access)

### Token scope and request routes

A token's scope determines whether it acts within one team or across an organization. Both token types use the same `Authorization: Bearer` header.

For team and project operations, choose the route that matches your token:

| Token scope | Route | When to include the team ID |
| --- | --- | --- |
| Team | `/v1/projects/{projectId}/services` | The token already identifies its team. You can use the shorter route. |
| Organization | `/v1/teams/{teamId}/projects/{projectId}/services` | Include the target team ID for team and project operations. |

The team prefix selects the target team. It does not grant access. The team must belong to the token's organization and be permitted by its role and team restrictions. A team-scoped token can also use the prefixed route, but only for its own team.

#### Organization API access

An organization-scoped token can access teams in its organization and endpoints that manage the organization itself. The token's role must permit each operation. Team restrictions can limit which teams it can access.

[Generate a token from an organization role](../guides/secure.md#grant-api-access-generate-tokens-from-organisation-roles). The CLI `northflank login` flow supports these tokens. A token generated for one team does not grant organization-wide access.

Set `NORTHFLANK_API_TOKEN` to your organization token. Use [List teams](org/teams/list-teams.md) to find the target team ID:

```bash
curl --request GET \
  --url https://api.northflank.com/v1/teams \
  --header "Authorization: Bearer $NORTHFLANK_API_TOKEN"
```

Use `data.teams[].id` in the `/v1/teams/{teamId}/` prefix. Resource routes use the team's `id`, rather than its permanent `uid`.

For organization-wide operations, use the route on the endpoint page without a target-team prefix. For example, `GET /v1/teams` requires an organization-scoped token. For resources within a team, use the prefixed route from the table above.

SDK examples use the shorter route when both routes are available. For an organization token, add the team argument below. You do not need a different SDK client or authentication setup.

#### SDK arguments

Both SDKs accept team-scoped and organization-scoped tokens through the same authentication setup. For team and project calls with an organization-scoped token, supply the target team on each call. The REST clients do not add this team ID from the token.

These examples assume that you initialized the client with your API token.

The JavaScript client uses `parameters.teamId`:

```js
const response = await apiClient.list.services({
  parameters: {
    teamId: "my-team",
    projectId: "my-project",
  },
});
```

The Python client uses `team_id`:

```python
response = client.list.services(
    team_id="my-team",
    project_id="my-project",
)
```

Supplying the team argument selects the prefixed route. Omitting it selects the shorter route.

If a team or project request returns `403` with `Organisation-scoped tokens can only be used with a {teamId} parameter.`, add the target team ID to the route or SDK call. The token must also have permission for that operation.

### Rate limits

The Northflank API has a default rate limit of 1000 requests per hour, which resets one hour after the first request is sent. You can contact [support@northflank.com](mailto:support@northflank.com) to request higher API limits.

The details for your rate limit are sent in the header for each response from the Northflank API, which can be accessed with the following keys:

| Account rate limit | Requests remaining | Time to reset (seconds) |
| --- | --- | --- |
| `x-ratelimit-limit` | `x-ratelimit-remaining` | `x-ratelimit-reset` |

### Getting started with the API

Below are some examples, in JavaScript, of some common tasks that can be achieved using the API.

### Create a project

You can create a new project with a [POST request to the `v1/projects`](team/projects/create-project.md) endpoint.

The request body should contain the project `name`, `description`, `color`, and `region`. Alternatively, if you're deploying to [your own cluster](../guides/bring-your-own-cloud.md#use-other-cloud-providers-with-northflank), you can supply the `clusterId` instead of the region.

```javascript
const payload = {
    "name": "API example project",
    "description": "This is a new project.",
    "color": "#EF233C",
    "region": "europe-west"
}

const response = await fetch('https://api.northflank.com/v1/projects', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
    },
    body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

The response to a successful request contains the ID of the project.

You can check that your project has been created by listing all the projects on your account with a [GET request to the `v1/projects`](team/projects/list-projects.md) endpoint, or get details for the specific project by sending a [GET request to the endpoint `/v1/projects/{projectId}`](team/projects/get-project.md) with the project ID.

### Build your code

You can build code from a Git repository on Northflank by creating a combined service (which builds and deploys your code in one service), creating a job that builds and runs code, or by creating a build service.

In this example we're going to create a build service, which can then provide builds for deployments and jobs, and build a Node.js Express server from a [public Git repository](https://github.com/northflank-examples/node-express-example).

#### Create a build service

You can create a new build service by sending a [POST request to the `/v1/projects/{projectId}/services/build`](project/services/create-build-service.md) endpoint, supplying the project ID you want to create the build service in.

```javascript
const payload = {
  "name": "Build service",
  "billing": {
    "buildPlan": "nf-compute-400-16"
  },
  "vcsData": {
    "projectUrl": "https://github.com/northflank-examples/node-express-example",
    "projectType": "github"
  },
  "buildSettings": {
    "dockerfile": {
      "buildEngine": "kaniko",
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/"
    }
  },
  "buildConfiguration": {
    "prRestrictions": [
      "*"
    ],
    "branchRestrictions": [
      "master"
    ],
    "ciIgnoreFlags": [
      "[skip ci]",
      "[ci skip]",
      "[no ci]",
      "[skip nf]",
      "[nf skip]",
      "[northflank skip]",
      "[skip northflank]"
    ],
    "ciIgnoreFlagsEnabled": false,
    "isAllowList": false
  }
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/services/build`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
    },
    body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

> [!note]
>
> Build services are billed with `billing.buildPlan`, not `billing.deploymentPlan`. The `buildPlan` field only accepts plans with 4 or more vCPUs, and defaults to `nf-compute-400-16` if omitted. Creating a build service does not trigger an initial build — you must call the start build endpoint explicitly, as shown below.

The response for a successful request includes the ID of the service, and all other configuration details for the service.

You can check the configuration for your service by sending a [GET request to the `/v1/projects/{projectId}/services/{serviceId}` endpoint](project/services/get-service.md), with the relevant project and service IDs.

#### Start a build

With a build service created you can now trigger new builds with a [POST request to the `/v1/projects/{projectId}/services/{serviceId}/build` endpoint](project/services/start-service-build.md), replacing the `projectId` and `serviceId` with the relevant IDs for your project and build service.

This example starts a build of the latest commit to the `master` branch of the repository linked to the service. You can also supply a `pullRequestId` instead, which will build the latest commit to the branch of the pull request. If you include the `sha` of a specific commit, the service will build that specific commit from the branch.

The `branch` and `pullRequestId` parameters can only be passed to a build service. You can use the `sha` parameter to trigger builds of specific commits for combined service and jobs, or leave the request body empty to build the latest commit to the linked branch.

You can also pass an `overrides` object to supply build arguments for that build only.

```javascript
const payload = {
  "branch": "master"
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/services/${serviceId}/build`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

The response for a successful request includes the ID for the build (a randomly-generated slug), the time the build was created, the status of the build, and more.

You can check the status of a build with a [GET request to the endpoint `/v1/projects/{projectId}/services/{serviceId}/build/{buildId}`](project/services/get-service-build.md), using the relevant project, service, and build IDs.

### Deploy your code

You can deploy images built on Northflank or images from container registries using a deployment service. The examples below show how to create a deployment with no image deployed and then update the deployment configuration for that service. You can alternatively include the image specification in the `deployment` object (`internal` for Northflank-built images or `external` for images from a container registry) when creating the deployment service.

#### Create a deployment service

You can create a new deployment service with a [POST request to the `/v1/projects/{projectId}/services/deployment` endpoint](project/services/create-deployment-service.md), supplying the project ID you want to create the deployment service in.

```javascript
const payload = {
  "name": "Deployment service",
  "billing": {
    "deploymentPlan": "nf-compute-10"
  },
  "deployment": {
    "instances": 1,
    "docker": {
      "configType": "default"
    },
    "buildpack": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    }
  },
  "healthChecks": [],
  "autoscaling": {}
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/services/deployment`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

The response for a successful request includes the ID of the service, and all other configuration details for the service.

You can check the configuration for your service by sending a [GET request to the `/v1/projects/{projectId}/services/{serviceId}` endpoint](project/services/get-service.md), with the relevant project and service IDs.

#### Deploy your build

You can deploy a built image from a Northflank build service by sending a [POST request to the `/v1/projects/{projectId}/services/{serviceId}/deployment` endpoint](project/services/update-service-deployment.md) and including the `internal` object, which contains the ID of the build service to deploy from, the branch to use, and the commit SHA of the built commit to deploy. You can either provide a specific commit SHA, or use `latest` to deploy the most recent built commit.

If you supply a specific commit hash (`buildSHA`) but it has not been built by the build service, attempting to update the deployment with it will return an error. However, if you provide `latest` as the `buildSHA` and have no build available for the branch, the deployment service will be updated but no instances will be deployed until a build is available. It's recommended in your workflow to check a build exists before updating your deployment service.

You can also include a `docker` or `buildpack` object to change the runtime configuration, or only include one of these objects to update the configuration without changing the deployed image.

```javascript
const payload = {
  "internal": {
    "id": `${buildServiceId}`,
    "branch": "master",
    "buildSHA": "latest"
  }
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/services/${serviceId}/deployment`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

The response for a successful request will be an empty `data` object.

#### Deploy an image

You can deploy an image from a Docker container registry in the same method as deploying an image built on Northflank. However, this time the payload contains an `external` object with the path of the image, as well as the ID of the [required saved credentials](team/integrations/add-registry.md) if the image is private.

The example below deploys the latest Nginx image from the DockerHub library. Northflank will default to the DockerHub library if a full path to a container registry and username is not provided. [Learn more about deploying from a container registry here](../guides/run.md#run-an-image-from-a-container-registry-image-paths).

```javascript
const payload = {
  "external": {
    "imagePath": "nginx:latest"
  },
  "docker": {
    "configType": "default"
  }
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/services/${serviceId}/deployment`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

The response for a successful request will be an empty `data` object.

### Run a job

You can create and trigger job runs using the API. You can create either a cron job or a manual job depending on the endpoint you use. A cron job can run on a schedule and be triggered manually, while a manual job will not run unless triggered via the application, an API call, or a template or release flow run. Job can run images from an external container registry, images build by a Northflank build service, or jobs can build and deploy images from a Git repository.

#### Create a manual job

You can create a new manual job with a [POST request to the `/v1/projects/{projectId}/jobs/manual` endpoint](project/jobs/create-manual-job.md), supplying the ID of the project you want to create the job in. The payload below deploys an example job that will produce logs for 10 seconds and return a successful exit code (`0`).

```javascript
const payload = {
  "name": "Manual job",
  "billing": {
    "deploymentPlan": "nf-compute-20"
  },
  "backoffLimit": 0,
  "runOnSourceChange": "never",
  "activeDeadlineSeconds": 600,
  "deployment": {
    "docker": {
      "configType": "default"
    },
    "buildpack": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    },
    "vcs": {
      "projectUrl": "https://github.com/northflank-examples/mock-job",
      "projectType": "github",
      "projectBranch": "main"
    }
  },
  "buildSettings": {
    "dockerfile": {
      "buildEngine": "kaniko",
      "dockerFilePath": "/Dockerfile",
      "dockerWorkDir": "/"
    }
  },
  "healthChecks": []
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/jobs/manual`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
    },
    body: JSON.stringify(payload)
})

const json = await response.json();
console.log(json);
```

The response for a successful request includes the ID of the job and other configuration details including the `jobType`, `deployment` details, and other job settings.

You can check the configuration for your job by sending a [GET request to the `/v1/projects/{projectId}/jobs/{jobId}` endpoint](project/jobs/get-job.md), with the relevant project and job IDs.

#### Run a job

You can trigger a job run with a [POST request to the `/v1/projects/{projectId}/jobs/{jobId}/runs` endpoint](project/jobs/run-job.md).

You can send an empty payload to run a job with the existing configuration, or override the environment variables (`runtimeEnvironment`), resources (`billing`), and deployment configuration (`deployment`).

```javascript
const payload = {}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/jobs/${jobId}/runs`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
    },
    body: JSON.stringify(payload)
})

const json = await response.json();
console.log(json);
```

The response for a successful request will be an object containing the ID of the job run, and the name of the job run.

You can retrieve details about a job run by sending a [GET request to the `/v1/projects/{projectId}/jobs/{jobId}/runs/{runId}` endpoint](project/jobs/get-run-details.md), supplying the project, job, and run IDs. The response will include the status and success of the run, the time it started, and the time it concluded.

### Backup a database

You can deploy databases and other addons, and manage them using the API, including triggering backups. You can only back up a running addon.

#### Create an addon

You can create a new addon with a [POST request to the `/v1/projects/{projectId}/addons` endpoint](project/addons/create-addon.md), supplying the project ID you want to create the addon in. The addon to be created is defined by the `type`, and you can specify a `version` to be deployed, or use `latest` for the most recent available version.

```javascript
const payload = {
    "name": "database",
    "description": "",
    "type": "mongodb",
    "version": "latest",
    "billing": {
        "deploymentPlan": "nf-compute-50",
        "storageClass": "nvme",
        "storage": 6144,
        "replicas": 1
    },
    "tlsEnabled": false,
    "externalAccessEnabled": false,
    "ipPolicies": [],
    "pitrEnabled": false,
    "typeSpecificSettings": {}
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/addons`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
    },
    body: JSON.stringify(payload)
})

const json = await response.json();
console.log(json);
```

> [!note]
>
> Set `version` to a specific version string (for example `16.4`) or a latest selector (for example `16-latest`), or use `latest` for the most recent available version. A major-version-only value such as `16` may be rejected. Each addon type also enforces a minimum `storage` size that varies by type — for example, Redis requires at least 4096 MB.

The response for a successful request includes the ID of the addon, and other configuration details for the addon, including the `type` and `version`.

You can check the configuration for your addon by sending a [GET request to the `/v1/projects/{projectId}/addons/{addonId}` endpoint](project/addons/get-addon.md), with the relevant project and addon IDs.

#### Run a backup

You can trigger a backup for an addon with a [POST request to the `/v1/projects/${projectId}/addons/${addonId}/backups` endpoint](project/addons/backup-addon.md). If the addon isn't running, the backup will be scheduled and will begin as soon as the addon is restarted and in the running state.

You can include a name for the backup and specify the backup type, either `snapshot` or `dump`. The `dump` native backup method is not available on all addons, [you can check which addons support the native backup dump method here](../guides/databases-and-persistence.md#deploy-a-database-available-databases). You can also leave the payload empty and a default name will be generated for the backup, and `snapshot` will be used as the default backup method.

```javascript
const payload = {
    "name": `Example backup ${Date.now()}`,
    "backupType": "snapshot"
}

const response = await fetch(`https://api.northflank.com/v1/projects/${projectId}/addons/${addonId}/backups`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
    },
    body: JSON.stringify(payload)
})

const json = await response.json();
console.log(json);
```

The response for a successful request will be an object containing the backup ID, status, and time it was created, as well as other details.

You can retrieve details about a backup by sending a [GET request to the `/v1/projects/{projectId}/addons/{addonId}/backups/{backupId}` endpoint](project/addons/get-addon-backup.md), supplying the project, addon, and backup IDs. The response will include the status, and, if completed, the completion time and size. If the backup has been used to restore the addon, it will also include a `lastRestore` object containing the details.

### Update resources safely

Most resources can be changed with a `PATCH` request, and some also have `POST` endpoints for individual settings. **Neither merges the contents of a map or an array.** If you send `secrets.variables`, `runtimeEnvironment`, `runtimeFiles` or `ports`, Northflank replaces the whole value with what you sent. Fields you leave out of the request are not changed.

This applies to the API, the CLI (`northflank patch ...`, `northflank update ...`) and the JavaScript client.

#### Update a secret group

The table shows what happens to a secret group that contains the variables `A`, `B` and `C`.

| Request body | Result |
| --- | --- |
| `{ "description": "New description" }` | Only the description changes. Variables and files are untouched. |
| `{ "secrets": { "variables": { "D": "4" } } }` | The variables become `D` only. `A`, `B` and `C` are deleted. Files are untouched. |
| `{ "secrets": { "files": { "/b.txt": { "data": "aGk=" } } } }` | The files become `/b.txt` only. Variables are untouched. |
| `{ "restrictions": { "tagMatchCondition": "or" } }` | Only that restriction field changes. Other restriction fields are kept. |
| `{ "data": { "D": "4" } }` | Nothing changes, and the request still succeeds. Fields that the endpoint does not recognise are ignored. |

[Patch project secret](project/secrets/patch-project-secret.md) and [Update project secret](project/secrets/update-project-secret.md) behave in the same way for these fields. [Put project secret](project/secrets/put-project-secret.md) creates or updates a secret group by the `name` in the request body, and resets omitted fields such as `description` and `restrictions` to their defaults.

To add or change a single variable, read the secret group, merge your change into the existing variables, and send the complete set back.

```javascript
const base = `https://api.northflank.com/v1/projects/${projectId}/secrets/${secretId}`;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

// 1. Read the current variables
const current = await fetch(base, { headers }).then((res) => res.json());
const variables = current.data.secrets.variables;

// 2. Merge your change and send the complete set back
await fetch(base, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
        secrets: { variables: { ...variables, FEATURE_FLAG: 'true' } }
    })
});

// 3. Read the secret group again and check that every key is still present
```

> [!warning] Back up before you change many secrets
>
> A removed variable cannot be restored from Northflank. Before you run a script that rewrites secret groups, save the current variable names and values somewhere safe. After each update, read the secret group back and compare the keys.

#### Update a service

[Patch deployment service](project/services/patch-deployment-service.md), [Patch combined service](project/services/patch-combined-service.md) and [Patch build service](project/services/patch-build-service.md) follow the same rule for maps and arrays.

| Field in the request | Result |
| --- | --- |
| `runtimeEnvironment` | Replaces all runtime variables. Include every variable you want to keep. |
| `runtimeFiles` | Replaces all runtime files. |
| `ports` | Replaces the whole list of ports. |
| `deployment` | Merged field by field. Sending `deployment.external.imagePath` keeps `deployment.instances`. |
| Any other top-level field you omit | Unchanged. |

The `POST` endpoints for a single setting, such as [Update service ports](project/services/update-service-ports.md), replace that setting in the same way. Use the [scale service](project/services/scale-service.md) endpoint to change the number of instances.

To avoid losing variables that several services share, store them in a [secret group](../guides/secure.md#manage-secret-groups) instead of setting them on each service.

#### Use the CLI

The CLI sends the same requests as the API. Pass the body with `--input` or `--file`.

```bash
northflank get secret --project my-project --secret app-secrets --output json

northflank patch secret --project my-project --secret app-secrets \
  --input '{"secrets":{"variables":{"A":"1","B":"2","C":"3","FEATURE_FLAG":"true"}}}'
```

### Use Northflank Skills with the API

Northflank Skills provide AI coding agents with Northflank-specific knowledge for deploying, operating, and automating workloads on the platform.

They help agents understand Northflank primitives such as services, jobs, add-ons, preview environments, release workflows, sandboxes, GPU workloads, templates, and the API/CLI.

Skills can be used with agentic coding tools like Claude Code, Codex, and Cursor to create, configure, deploy, and troubleshoot applications on Northflank using the right platform concepts and commands.

> [!note]
>
> [Click here](https://github.com/northflank/skills) to explore Northflank Skills on GitHub.

### Next steps

These examples provide a brief introduction to managing your Northflank projects with the Northflank API. Explore the API reference to find all the API endpoints, associated methods, and expected parameters and responses to manage your projects and certain account features.

You can also interact with Northflank using the JavaScript client and CLI.

- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](use-the-cli.md)
- [Use the Northflank JavaScript client: Learn how to create and manage projects on Northflank programmatically using the JavaScript client.](use-the-javascript-client.md)
- [Forward deployments and databases: Forward deployments and databases to your local machine for development.](forwarding.md)
- [Execute commands in your workloads: Access the shell for your running workloads or send commands to execute using the UI, CLI, API, or JavaScript client.](execute-command.md)
