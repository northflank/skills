# Get job build argument details

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-build-argument-details.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /project/jobs/get-job instead](get-job.md)

Get details about the build arguments accessible by the given job. Also requires the permission 'Project > Secrets > General > Read'

Required permission: Project > Secrets > Jobs > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `buildArguments`: {object} (required) Details about all the secrets accessible by the service.
    - `MY_VARIABLE_NAME`: {object} A stored secret and details about it and its value. This can have the name of any saved secret.
      - `value`: (required) The value of the secret.
      - `inheritedFrom`: (string) The ID of the secret group the secret is inherited from, if applicable.
      - `addonId`: (string) The ID of the addon the secret is inherited from, if applicable.
      - `priority`: (integer) The priority of the secret group the secret is inherited from, if applicable.
      - `overriding`: [array of] (required) An array containing data about other places the secret has been inherited from, but that are not being used as a secret with the same key exists with a higher priority. {object} Data about an overridden secret.
          - `value`: (required) The value of the secret.
          - `inheritedFrom`: (string) (required) The ID of the secret group the secret is inherited from.
          - `addonId`: (string) The ID of the addon the secret is inherited from, if applicable.
          - `priority`: (integer) (required) The priority of the secret group the secret is inherited from.
  - `buildFiles`: {object} (required) Details about all the secrets accessible by the service.
    - `/dir/fileName`: {object} A stored secret and details about it and its value. This can have the name of any saved secret.
      - `value`: {object} (required) The value of the secret.
        - `data`: (string) base64 encoded string of the file contents
        - `encoding`: (string) Original encoding of the file
      - `inheritedFrom`: (string) The ID of the secret group the secret is inherited from, if applicable.
      - `priority`: (integer) The priority of the secret group the secret is inherited from, if applicable.
      - `overriding`: [array of] (required) An array containing data about other places the file has been inherited from, but that are not being used as a secret with the same file path exists with a higher priority. {object} Data about an overridden secret.
          - `value`: (required) The value of the secret.
          - `inheritedFrom`: (string) (required) The ID of the secret group the secret is inherited from.
          - `priority`: (integer) (required) The priority of the secret group the secret is inherited from.

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/build-arguments/details

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-arguments/details

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build-arguments/details"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/jobs/{jobId}/build-arguments/details"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details of the build arguments of the job.

```json
{
  "data": {
    "buildArguments": {
      "MY_VARIABLE_NAME": {
        "value": "abcdef123456",
        "inheritedFrom": "example-secret",
        "addonId": "example-addon",
        "priority": 10,
        "overriding": [
          {
            "value": "ffffffffffff",
            "inheritedFrom": "secret-2",
            "addonId": "addon-2",
            "priority": 0
          }
        ]
      }
    },
    "buildFiles": {
      "/dir/fileName": {
        "value": {
          "/dir/fileName": {
            "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
            "encoding": "utf-8"
          }
        },
        "inheritedFrom": "example-secret",
        "priority": 10,
        "overriding": [
          {
            "value": "ffffffffffff",
            "inheritedFrom": "secret-2",
            "priority": 0
          }
        ]
      }
    }
  }
}
```

### CLI reference

$ northflank get job build-argument-details

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details of the build arguments of the job.

```json
{
  "buildArguments": {
    "MY_VARIABLE_NAME": {
      "value": "abcdef123456",
      "inheritedFrom": "example-secret",
      "addonId": "example-addon",
      "priority": 10,
      "overriding": [
        {
          "value": "ffffffffffff",
          "inheritedFrom": "secret-2",
          "addonId": "addon-2",
          "priority": 0
        }
      ]
    }
  },
  "buildFiles": {
    "/dir/fileName": {
      "value": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      },
      "inheritedFrom": "example-secret",
      "priority": 10,
      "overriding": [
        {
          "value": "ffffffffffff",
          "inheritedFrom": "secret-2",
          "priority": 0
        }
      ]
    }
  }
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.job.buildArgumentDetails({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  }
});
```

#### Example Response

 Details of the build arguments of the job.

```json
{
  "data": {
    "buildArguments": {
      "MY_VARIABLE_NAME": {
        "value": "abcdef123456",
        "inheritedFrom": "example-secret",
        "addonId": "example-addon",
        "priority": 10,
        "overriding": [
          {
            "value": "ffffffffffff",
            "inheritedFrom": "secret-2",
            "addonId": "addon-2",
            "priority": 0
          }
        ]
      }
    },
    "buildFiles": {
      "/dir/fileName": {
        "value": {
          "/dir/fileName": {
            "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
            "encoding": "utf-8"
          }
        },
        "inheritedFrom": "example-secret",
        "priority": 10,
        "overriding": [
          {
            "value": "ffffffffffff",
            "inheritedFrom": "secret-2",
            "priority": 0
          }
        ]
      }
    }
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

response = client.get.job.build_argument_details(
    job_id="example-job",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "buildArguments": {
    "MY_VARIABLE_NAME": {
      "value": "abcdef123456",
      "inheritedFrom": "example-secret",
      "addonId": "example-addon",
      "priority": 10,
      "overriding": [
        {
          "value": "ffffffffffff",
          "inheritedFrom": "secret-2",
          "addonId": "addon-2",
          "priority": 0
        }
      ]
    }
  },
  "buildFiles": {
    "/dir/fileName": {
      "value": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      },
      "inheritedFrom": "example-secret",
      "priority": 10,
      "overriding": [
        {
          "value": "ffffffffffff",
          "inheritedFrom": "secret-2",
          "priority": 0
        }
      ]
    }
  }
}
```
