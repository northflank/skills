# Northflank JavaScript Client

A quick guide for using `@northflank/js-client`.

## Installation

```bash
npm install @northflank/js-client
# or
yarn add @northflank/js-client
```

## Authentication and Client Setup

Create the token from your team page:

- Team page
- Team settings (top right)
- `API` -> `Tokens`
- `Create API token`

```js
import { ApiClient, ApiClientInMemoryContextProvider } from '@northflank/js-client';

const contextProvider = new ApiClientInMemoryContextProvider();

await contextProvider.addContext({
  name: 'default',
  token: process.env.NF_API_TOKEN,
});

// Pass true to throw on HTTP error responses
const apiClient = new ApiClient(contextProvider, true);
```

## Request Shape

Most calls follow this pattern:

```js
apiClient.<action>.<resource>({ parameters, data, options })
```

- `parameters`: path parameters such as `projectId`, `serviceId`, `addonId`
- `data`: request body for create or update operations
- `options`: query parameters for filters and pagination

## Safe Starting Examples

List projects:

```js
const { data } = await apiClient.list.projects({});
console.log(data.projects);
```

List services in a project:

```js
const { data } = await apiClient.list.services({
  parameters: { projectId: 'my-project' },
});

console.log(data.services);
```

Create a deployment service from an image:

```js
await apiClient.create.service.deployment({
  parameters: { projectId: 'my-project' },
  data: {
    name: 'my-api',
    billing: { deploymentPlan: 'nf-compute-10' },
    deployment: {
      instances: 1,
      external: { imagePath: 'nginx:latest' },
      docker: { configType: 'default' },
    },
    ports: [
      { name: 'http', internalPort: 80, public: true, protocol: 'HTTP' },
    ],
  },
});
```

Execute a command in a service:

```js
const result = await apiClient.exec.execServiceCommand(
  { projectId: 'my-project', serviceId: 'my-api' },
  { command: ['ls', '-lah', '/app'] },
);

console.log(result.stdOut);
console.log(result.commandResult.exitCode);
```

## Where To Go Next

- `api/use-the-javascript-client.md` — JavaScript client usage guide
- `api/execute-command.md` — exec patterns for services and jobs
- `api/log-tailing.md` — log streaming with the JS client
- `api/_index.md` — API index; many endpoint pages include JS client snippets
- `../SKILL.md` — Northflank task guidance with additional JS client examples
