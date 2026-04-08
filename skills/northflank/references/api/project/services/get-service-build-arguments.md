# Get service build arguments

Source: https://northflank.com/docs/v1/api/project/services/get-service-build-arguments.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /services/get-service instead](get-service.md)

Gets the build arguments of the given service. If the API key does not have the permission 'Project > Secrets > General > Read', secrets inherited from secret groups will not be displayed.

Required permission: Project > Secrets > Services > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

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

GET /v1/projects/{projectId}/services/{serviceId}/build-arguments

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-arguments

#### Example Response

200 OK: The build arguments for the service.

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

$ northflank get service build-arguments

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--show <show>`: Which secrets to display - if set to `this` only the group's secrets are displayed, if set to `inherited` only secrets from linked addons are displayed, if set to `all` or not provided, both are displayed.

- `--replaceTemplatedValues <replaceTemplatedValues>`: If templated secrets should be replaced with their inferred value rather than returned as template strings.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 The build arguments for the service.

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
await apiClient.get.service.buildArguments({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  options: {
    "show": "all",
    "replaceTemplatedValues": "true"
  }
});
```

#### Example Response

 The build arguments for the service.

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
