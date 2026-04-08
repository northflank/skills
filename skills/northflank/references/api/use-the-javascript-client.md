# Use the JavaScript client

Source: https://northflank.com/docs/v1/api/use-the-javascript-client.md

The [Northflank JavaScript client](https://npmjs.com/@northflank/js-client) allows you to interact with Northflank via JavaScript code. The JavaScript client can be installed using either NPM or Yarn:

- `npm i @northflank/js-client`, or

- `yarn add @northflank/js-client`

### Authentication

You must authenticate the client using an API token. Team members can generate an API token in that team's settings, provided an [API role](../guides/secure.md#grant-api-access) has been created by a member with permissions.

You can then use this token in a context provider, as demonstrated below.

- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](../guides/secure.md#grant-api-access)
- [Generate API tokens: Generate an API token to access your team and project.](../guides/secure.md#grant-api-access-generate-an-api-token)

### Rate limits

The Northflank API has a default rate limit of 1000 requests per hour, which resets one hour after the first request is sent. You can contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) to request higher API limits.

The details for your rate limit are sent in the header for each response from the Northflank API, which can be accessed with the following keys:

| Account rate limit | Requests remaining | Time to reset (seconds) |
| --- | --- | --- |
| `x-ratelimit-limit` | `x-ratelimit-remaining` | `x-ratelimit-reset` |

You can access these keys from the `rawResponse` object returned by the JavaScript Client:

```javascript
const { data, rawResponse } = await NFClient.get.project({ parameters });

const { headers } = rawResponse;
const limit = headers.get('x-ratelimit-limit');
const remaining = headers.get('x-ratelimit-remaining');
const reset = headers.get('x-ratelimit-reset');
```

### Usage

Below is an example of basic usage: setting up the client using an API token, fetching a list of existing projects and then creating a new project.

```js
import { ApiClient, ApiClientInMemoryContextProvider} from '@northflank/js-client';

(async () => {
  // Create context to store credentials.
  const contextProvider = new ApiClientInMemoryContextProvider();
  await contextProvider.addContext({
      name: 'test-context',
      token: '<api-token>', // Use token retrieved from Northflank web interface: Account Settings > API > Tokens > Create API token.
  });

  // Initialize API client.
  const apiClient = new ApiClient(contextProvider);

  // Retrieve list of projects and log to console.
  const projects = (await apiClient.list.projects({})).data.projects;
  console.log(projects);

  // Create a new project.
  await apiClient.create.project({
    data: { name: 'test-project', region: 'europe-west', description: 'test project description' },
  });
})();
```

Calls using the JavaScript client take a combination of 3 parameters:

- `body` - a payload or resource definition, usually used when creating a resource,

- `parameters` - equivalent to path parameters on the API, and

- `options` - equivalent to query parameters on the API

Have a look at operations such as
[update service deployment](project/services/update-service-deployment.md),
[list builds](project/services/list-service-builds.md), and
[view secret](project/secrets/list-project-secrets.md)
for examples of the different options. You may need to switch to the 'JS client' tab on the right-hand side.

### Pagination

Paginated endpoints (those returning lists), return 50 elements by default. You can use the `all()` method to return all elements, this will use multiple API calls which count towards your rate limit. For example:

```javascript
const allResults = apiClient.list.projects.all({})
```

The pagination object for a response also includes a `getNextPage()` function, which will return the next set of elements. If there are no more elements to return then the function will not return any elements.

```javascript
const resFirstPage = await apiClient.list.projects({});
const nextPage = await resFirstPage.pagination?.getNextPage();
```

### Throwing errors on request failure

The `ApiClient` constructor also takes an optional second boolean argument, which if set to `true` will cause the client to throw an error if the request is met with a HTTP error code response.

### Responses

Responses are in JSON. The response object contains the following keys:

- {object} Response object.

- data
  {object} The data returned as a result of your query.

- pagination
  {object} Data about the endpoint pagination.

- hasNextPage
  boolean requiredIs there another page of results available?
- getNextPage
  function Return the next page of results, as a response object, if one exists.
- cursor
  string The cursor to manually access the next page of results.
- count
  number requiredThe number of results returned by this request.

- rawResponse
  {object} requiredAn object of node-fetch's Response class.

- request
  {object} requiredDetails of the request that you sent.

- url
  string
- method
  string
- headers
  any
- body
  any

- error
  {object} If your query results in an error, this object will include the error details.

- status
  number required
- message
  string required
- id
  string
- details
  any
