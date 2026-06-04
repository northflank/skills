# Get usage

Source: https://northflank.com/docs/v1/api/org/billing/get-usage.md

Gets usage details for a given billing hour.

Required permission: Account > Billing > General > Read

**Path parameters:**

{object}
- `timestamp`: (string) (required) Unix timestamp of the billing hour

**Query parameters:**

{object}
- `teamId`: (string) The ID of the team to filter by.
- `projectId`: (string) The ID of the project to filter by.
- `resourceType`: (string) The resource type to filter by (e.g. service, job, addon, volume). (enum: job, service, addon, volume, opentofu-job, llm-model-deployment, external-addon)

**Response body:**

{object}
- `data`: {object}
  - `timestamp`: (number) The Unix timestamp of the billing hour. (format: float)
  - `paasUsage`: {object}
    - `price`: {object}
      - `total`: (number) The total PaaS price, in cents. (format: float)
      - `cpu`: (number) The CPU usage price, in cents. (format: float)
      - `memory`: (number) The memory usage price, in cents. (format: float)
      - `storage`: (number) The storage usage price, in cents. (format: float)
      - `gpu`: (number) The GPU usage price, in cents. (format: float)
    - `teams`: [array of] {object}
        - `id`: (string) Identifier for the team.
        - `name`: (string) The name of the team.
        - `price`: {object}
          - `total`: (number) The total PaaS price, in cents. (format: float)
          - `cpu`: (number) The CPU usage price, in cents. (format: float)
          - `memory`: (number) The memory usage price, in cents. (format: float)
          - `storage`: (number) The storage usage price, in cents. (format: float)
          - `gpu`: (number) The GPU usage price, in cents. (format: float)
        - `projects`: [array of] {object}
            - `id`: (string) Identifier for the project.
            - `name`: (string) The name of the project.
            - `price`: {object}
              - `total`: (number) The total PaaS price, in cents. (format: float)
              - `cpu`: (number) The CPU usage price, in cents. (format: float)
              - `memory`: (number) The memory usage price, in cents. (format: float)
              - `storage`: (number) The storage usage price, in cents. (format: float)
              - `gpu`: (number) The GPU usage price, in cents. (format: float)
            - `resourceTypes`: [array of] {object}
                - `resourceType`: (string) The type of the resource (service, job, addon, volume, etc.).
                - `price`: {object}
                  - `total`: (number) The total PaaS price, in cents. (format: float)
                  - `cpu`: (number) The CPU usage price, in cents. (format: float)
                  - `memory`: (number) The memory usage price, in cents. (format: float)
                  - `storage`: (number) The storage usage price, in cents. (format: float)
                  - `gpu`: (number) The GPU usage price, in cents. (format: float)
                - `resources`: [array of] {object}
                    - `id`: (string) Identifier for the resource.
                    - `name`: (string) The name of the resource.
                    - `price`: {object}
                      - `total`: (number) The total PaaS price, in cents. (format: float)
                      - `cpu`: (number) The CPU usage price, in cents. (format: float)
                      - `memory`: (number) The memory usage price, in cents. (format: float)
                      - `storage`: (number) The storage usage price, in cents. (format: float)
                      - `gpu`: (number) The GPU usage price, in cents. (format: float)
  - `byocUsage`: {object}
    - `price`: {object}
      - `total`: (number) The total BYOC price, in cents. (format: float)
      - `vcpu`: (number) The vCPU usage price, in cents. (format: float)
      - `memory`: (number) The memory usage price, in cents. (format: float)
      - `gpuMemory`: (number) The GPU memory usage price, in cents. (format: float)
      - `cluster`: (number) The cluster usage price, in cents. (format: float)

### API reference

GET /v1/billing/usage/{timestamp}

GET /v1/teams/{teamId}/billing/usage/{timestamp}

#### Example Response

200 OK: Hourly usage detail.

```json
undefined
```

### CLI reference

$ northflank get usage

Options:

- `--timestamp <timestamp>`: Unix timestamp of the billing hour

- `--teamId <teamId>`: The ID of the team to filter by.

- `--projectId <projectId>`: The ID of the project to filter by.

- `--resourceType <resourceType>`: The resource type to filter by (e.g. service, job, addon, volume).

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Hourly usage detail.

```json
undefined
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.usage({
  parameters: {
    "timestamp": "1655823815"
  },
  options: {}
});
```

#### Example Response

 Hourly usage detail.

```json
{
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
