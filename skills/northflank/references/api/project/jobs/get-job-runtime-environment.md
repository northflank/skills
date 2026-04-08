# Get job runtime environment

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-runtime-environment.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /jobs/get-job instead](get-job.md)

Returns the runtime environment for the given job. If the API key does not have the permission 'Project > Secrets > General > Read', secrets inherited from secret groups will not be displayed.

Required permission: Project > Secrets > Jobs > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `jobId`: (string) (required) ID of the job

**Query parameters:**

{object}
- `show`: (string) Which secrets to display - if set to `this` only the group's secrets are displayed, if set to `inherited` only secrets from linked addons are displayed, if set to `all` or not provided, both are displayed. (enum: this, inherited, all)
- `replaceTemplatedValues`: (string) If templated secrets should be replaced with their inferred value rather than returned as template strings. (enum: true)

**Response body:**

{object}
- `data`: {object}
  - `runtimeEnvironment`: {object}
  - `runtimeFiles`: {object}

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/runtime-environment

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/runtime-environment

#### Example Response

200 OK: The runtime environment of the job.

```json
{
  "data": {
    "runtimeEnvironment": {
      "VARIABLE_1": "abcdef",
      "VARIABLE_2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  }
}
```

### CLI reference

$ northflank get job runtime-environment

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--show <show>`: Which secrets to display - if set to `this` only the group's secrets are displayed, if set to `inherited` only secrets from linked addons are displayed, if set to `all` or not provided, both are displayed.

- `--replaceTemplatedValues <replaceTemplatedValues>`: If templated secrets should be replaced with their inferred value rather than returned as template strings.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The runtime environment of the job.

```json
{
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.job.runtimeEnvironment({
  parameters: {
    "projectId": "default-project",
    "jobId": "example-job"
  },
  options: {
    "show": "all",
    "replaceTemplatedValues": "true"
  }
});
```

#### Example Response

 The runtime environment of the job.

```json
{
  "data": {
    "runtimeEnvironment": {
      "VARIABLE_1": "abcdef",
      "VARIABLE_2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
