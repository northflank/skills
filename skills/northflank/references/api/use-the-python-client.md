# Use the Python client

Source: https://northflank.com/docs/v1/api/use-the-python-client.md

The Northflank Python client lets you manage Northflank resources from Python. This guide and the Python client reference examples use SDK version `2.1.0`.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Python 3.9–3.14 and pip.
> - A Northflank API token with permission to access the resources that you use.
> - An existing project with permission to list services, for the examples below.

Install the client:

```shell
python -m pip install northflank
```

To use the same version as these examples, install `northflank==2.1.0`.

Before upgrading from SDK 2.0.0, read the SDK changelog. Version 2.1.0 changes some method names, billing pagination arguments, and generated types.

### Authentication

1. [Generate an API token](../guides/secure.md#grant-api-access-generate-an-api-token) with the permissions that your application needs.

2. Set the `NORTHFLANK_API_TOKEN` environment variable in the environment that runs your Python application.

3. Initialize the client. It reads the token from the environment:

```python
from northflank import ApiClient

client = ApiClient()
```

The client also accepts `NF_API_TOKEN`. If both variables are set, `NORTHFLANK_API_TOKEN` takes priority. An explicit `api_token` argument takes priority over either environment variable.

Keep your token in an environment variable or secret store. Do not commit it to source control.

Use the same authentication setup for team-scoped and organization-scoped tokens. For team and project requests with an organization-scoped token, pass `team_id`. See [Organization API access](use-the-api.md#organization-api-access) for route selection and permissions.

### Usage

Replace `my-project` with your project ID. The following example lists up to 20 services and prints their names:

```python
from northflank import ApiClient

client = ApiClient()
response = client.list.services(project_id="my-project", per_page=20)

for service in response.data["services"]:
    print(service["name"])
```

Pass arguments by name, such as `project_id="my-project"`. Path and query arguments use Python names, such as `project_id` and `per_page`. Pass a request body as a dictionary in `data`. Its keys retain their API spelling, such as `deploymentPlan` or `internalPort`.

The client includes type information for method arguments, request bodies, and response data. Editors and type checkers can use this information to identify invalid arguments.

Method names use underscores between words, such as `runtime_environment`. Python keywords have a trailing underscore, such as `client.import_`.

Select the Python Client tab on an endpoint reference page for its method and arguments. Each reference example initializes the client from your API token environment variable. Some methods require `data={}` even when the request body has no fields.

For command execution and logs, use the dedicated helpers in the SDK. See the SDK command execution examples and log examples.

### Responses and errors

Each call returns an `ApiCallResponse` with these fields:

| Field | Contents |
| --- | --- |
| `data` | The response data for the endpoint. |
| `status` | The HTTP status code. |
| `headers` | The response headers, including API rate limits. |
| `error` | An `ApiCallError` for an HTTP error, or `None`. |
| `pagination` | Page information and methods for a paginated response, or `None`. |
| `request` | The request URL, method, headers, and body. |
| `raw_text` | The response body as text, when available. |

By default, the client raises `ApiCallError` for a response outside the HTTP `2xx` success range. Catch the error to handle the status and message:

```python
from northflank import ApiCallError

try:
    response = client.get.service(
        project_id="my-project",
        service_id="my-service",
    )
except ApiCallError as error:
    print(error.status, error.message)
```

To receive HTTP errors in `response.error`, initialize the client with `throw_on_http_error=False`. Configuration and network errors can still raise exceptions.

```python
from northflank import ApiClient

client = ApiClient(throw_on_http_error=False)
response = client.get.service(project_id="my-project", service_id="my-service")

if response.error is not None:
    print(response.error.status, response.error.message)
else:
    print(response.data)
```

Use `response.headers` to read the [API rate limit headers](use-the-api.md#rate-limits). Avoid logging `response.request`, because its headers can contain your API token.

### Pagination

Paginated endpoints return one page of results per call. Use `.all()` to collect all pages in one response:

```python
response = client.list.services.all(project_id="my-project", per_page=20)
print(response.data["services"])
```

Each page requires a separate API request and counts towards your rate limit. For large result sets, fetch pages individually to limit memory use. Use `pagination.has_next_page` before requesting the next page:

```python
page = client.list.services(project_id="my-project", per_page=20)
print(page.data["services"])

if page.pagination is not None and page.pagination.has_next_page:
    next_page = page.pagination.get_next_page()
    print(next_page.data["services"])
```

This example reads at most two pages. Continue from the next page's `pagination` value when you need more results.

### Asynchronous calls

Use `AsyncApiClient` for asynchronous calls, which let your application perform other work while it waits for a response. It uses the same method names and arguments as `ApiClient`. Await each call inside an asynchronous function:

```python
import asyncio

from northflank import AsyncApiClient

async def main():
    client = AsyncApiClient()
    response = await client.list.services(project_id="my-project", per_page=20)
    print(response.data["services"])

asyncio.run(main())
```

To collect all pages, use `await client.list.services.all(project_id="my-project")`. If `response.pagination` is not `None` and `response.pagination.has_next_page` is `True`, fetch the next page with `await response.pagination.aget_next_page()`.
