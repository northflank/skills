# Get job runtime environment details

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-runtime-environment-details.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /jobs/get-job instead](get-job.md)

Get details about the runtime environment accessible by the given job. Also requires the permission 'Project > Secrets > General > Read'

Required permission: Project > Secrets > Jobs > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Response body:**

{object}
- `data`: {object}
  - `runtimeEnvironment`: {object}
    - `MY_VARIABLE_NAME`: {object}
      - `value`: (undefined) (required) The value of the secret.
      - `inheritedFrom`: (string) The ID of the secret group the secret is inherited from, if applicable.
      - `addonId`: (string) The ID of the addon the secret is inherited from, if applicable.
      - `priority`: (integer) The priority of the secret group the secret is inherited from, if applicable.
      - `overriding`: [array of] {object}
          - `value`: (undefined) (required) The value of the secret.
          - `inheritedFrom`: (string) (required) The ID of the secret group the secret is inherited from.
          - `addonId`: (string) The ID of the addon the secret is inherited from, if applicable.
          - `priority`: (integer) (required) The priority of the secret group the secret is inherited from.
  - `runtimeFiles`: {object}
    - `/dir/fileName`: {object}
      - `value`: {object}
        - `data`: (string) base64 encoded string of the file contents
        - `encoding`: (string) Original encoding of the file
      - `inheritedFrom`: (string) The ID of the secret group the secret is inherited from, if applicable.
      - `priority`: (integer) The priority of the secret group the secret is inherited from, if applicable.
      - `overriding`: [array of] {object}
          - `value`: (undefined) (required) The value of the secret.
          - `inheritedFrom`: (string) (required) The ID of the secret group the secret is inherited from.
          - `priority`: (integer) (required) The priority of the secret group the secret is inherited from.

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/runtime-environment/details

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runtime-environment/details

#### Example Response

200 OK: Details of the runtime environment of the job.

```json
{
  "data": {
    "runtimeEnvironment": {
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
    "runtimeFiles": {
      "/dir/fileName": {
        "value": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
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

$ northflank get job runtime-environment-details

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details of the runtime environment of the job.

```json
{
  "runtimeEnvironment": {
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
  "runtimeFiles": {
    "/dir/fileName": {
      "value": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
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

```javascript
await apiClient.get.job.runtimeEnvironmentDetails({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  }
});
```

#### Example Response

 Details of the runtime environment of the job.

```json
{
  "data": {
    "runtimeEnvironment": {
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
    "runtimeFiles": {
      "/dir/fileName": {
        "value": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
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
