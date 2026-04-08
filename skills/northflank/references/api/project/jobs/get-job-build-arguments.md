# Get job build arguments

Source: https://northflank.com/docs/v1/api/project/jobs/get-job-build-arguments.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /jobs/get-job instead](get-job.md)

Gets the build arguments of the given job. If the API key does not have the permission 'Project > Secrets > General > Read', secrets inherited from secret groups will not be displayed.

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
  - `buildArguments`: {object}
  - `buildFiles`: {object}

### API reference

GET /v1/projects/{projectId}/jobs/{jobId}/build-arguments

GET /v1/teams/{teamId}/projects/{projectId}/jobs/{jobId}/build-arguments

#### Example Response

200 OK: The build arguments for the job.

```json
{
  "data": {
    "buildArguments": {
      "ARGUMENT_1": "abcdef",
      "ARGUMENT_2": "12345"
    },
    "buildFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  }
}
```

### CLI reference

$ northflank get job build-arguments

Options:

- `--projectId <projectId>`: ID of the project

- `--jobId <jobId>`: ID of the job

- `--show <show>`: Which secrets to display - if set to `this` only the group's secrets are displayed, if set to `inherited` only secrets from linked addons are displayed, if set to `all` or not provided, both are displayed.

- `--replaceTemplatedValues <replaceTemplatedValues>`: If templated secrets should be replaced with their inferred value rather than returned as template strings.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The build arguments for the job.

```json
{
  "buildArguments": {
    "ARGUMENT_1": "abcdef",
    "ARGUMENT_2": "12345"
  },
  "buildFiles": {
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
await apiClient.get.job.buildArguments({
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

 The build arguments for the job.

```json
{
  "data": {
    "buildArguments": {
      "ARGUMENT_1": "abcdef",
      "ARGUMENT_2": "12345"
    },
    "buildFiles": {
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
