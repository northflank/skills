# Get service build arguments details

Source: https://northflank.com/docs/v1/api/project/services/get-service-build-arguments-details.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /services/get-service instead](get-service.md)

Get details about the build arguments accessible by the given service. Also requires the permission 'Project > Secrets > General > Read'

Required permission: Project > Secrets > Services > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}
  - `buildArguments`: {object}
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
  - `buildFiles`: {object}
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

GET /v1/projects/{projectId}/services/{serviceId}/build-arguments/details

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/build-arguments/details

#### Example Response

200 OK: Details of the build arguments of the service.

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

$ northflank get service build-argument-details

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details of the build arguments of the service.

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
await apiClient.get.service.buildArgumentDetails({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 Details of the build arguments of the service.

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
