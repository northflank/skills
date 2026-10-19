# Get usage

Source: https://northflank.com/docs/v1/api/org/billing/get-usage.md

Gets usage details for a given billing hour.

Required permission: Organisation > Admin > Billing > Read

**Path parameters:**

{object}
- `timestamp`: (string) (required) Unix timestamp of the billing hour

**Query parameters:**

{object}
- `teamId`: (string) The ID of the team to filter by. Not accepted from a token that can only read one team — a team billed in its own right, or a team token reading an org's billing — since those responses already cover that team and no other, and start at the project level without it. (min length: 24) (max length: 24)
- `projectId`: (string) The ID of the project to filter by. (min length: 24) (max length: 24)
- `resourceType`: (string) A resource type, or a comma-separated list of resource types to filter by (e.g. service,job,addon).
- `removeLegacyFields`: (boolean) For a billing entity temporarily receiving the legacy billing API contract, return the current contract instead. Use the current query parameters with this option.
- `teamsPage`: (integer) The page number of teams to access.
- `teamsPerPage`: (integer) The number of teams to return per page. Maximum of 100.
- `projectsPage`: (integer) The page number of projects to access.
- `projectsPerPage`: (integer) The number of projects to return per page. Maximum of 100.
- `resourcesPage`: (integer) The page number of resources to access.
- `resourcesPerPage`: (integer) The number of resources to return per page. Maximum of 100.

**Response body:**

{object}
- `data`: {object}
  - `timestamp`: (number) The Unix timestamp of the billing hour. (format: float)
  - `currency`: (string) The currency code.
  - `total`: (number) Total spend for this hour, across every category it reports. Summed before rounding, so it can differ from adding the categories below by a sub-cent amount. It tracks `paas.price`, so a `teamId`/`projectId`/`resourceType` filter does NOT reduce it — the filter narrows the breakdown under `paas.teams[]` while `paas.price` stays the hour's full PaaS total, and only the customer-level categories drop out. For a team-scoped caller it is that team's own spend, since no customer-level figures are reported at all. (The `/usage` list differs: a filter there replaces the PaaS figure with the filtered slice.) (format: float)
  - `scope`: {object}
    - `entityType`: (string) The entity the response is limited to. (enum: team)
    - `entityId`: (string) Identifier of that entity.
  - `paas`: {object}
    - `price`: {object}
      - `total`: (number) The total PaaS price, rounded to 2 decimal places. (format: float)
      - `cpu`: (number) The CPU usage price. (format: float)
      - `memory`: (number) The memory usage price. (format: float)
      - `storage`: (number) The storage usage price. (format: float)
      - `gpu`: (number) The GPU usage price. (format: float)
    - `usage`: {object}
      - `vcpuHours`: (number) vCPU hours consumed. (format: float)
      - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
      - `storageGiBHours`: (number) Storage GiB-hours consumed. (format: float)
      - `gpuSpotHours`: (number) Spot GPU hours consumed. (format: float)
      - `gpuOnDemandHours`: (number) On-demand GPU hours consumed. (format: float)
      - `build`: {object}
        - `vcpuHours`: (number) (format: float)
        - `memoryGiBHours`: (number) (format: float)
        - `duration`: (number) Seconds attributable to builds. (format: float)
      - `run`: {object}
        - `vcpuHours`: (number) (format: float)
        - `memoryGiBHours`: (number) (format: float)
        - `duration`: (number) Seconds attributable to running workloads. (format: float)
    - `teams`: [array of] {object}
        - `id`: (string) Identifier for the team.
        - `name`: (string) The name of the team.
        - `price`: {object}
          - `total`: (number) The total PaaS price, rounded to 2 decimal places. (format: float)
          - `cpu`: (number) The CPU usage price. (format: float)
          - `memory`: (number) The memory usage price. (format: float)
          - `storage`: (number) The storage usage price. (format: float)
          - `gpu`: (number) The GPU usage price. (format: float)
        - `usage`: {object}
          - `vcpuHours`: (number) vCPU hours consumed. (format: float)
          - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
          - `storageGiBHours`: (number) Storage GiB-hours consumed. (format: float)
          - `gpuSpotHours`: (number) Spot GPU hours consumed. (format: float)
          - `gpuOnDemandHours`: (number) On-demand GPU hours consumed. (format: float)
          - `build`: {object}
            - `vcpuHours`: (number) (format: float)
            - `memoryGiBHours`: (number) (format: float)
            - `duration`: (number) Seconds attributable to builds. (format: float)
          - `run`: {object}
            - `vcpuHours`: (number) (format: float)
            - `memoryGiBHours`: (number) (format: float)
            - `duration`: (number) Seconds attributable to running workloads. (format: float)
        - `projects`: [array of] {object}
            - `id`: (string) Identifier for the project.
            - `name`: (string) The name of the project.
            - `price`: {object}
              - `total`: (number) The total PaaS price, rounded to 2 decimal places. (format: float)
              - `cpu`: (number) The CPU usage price. (format: float)
              - `memory`: (number) The memory usage price. (format: float)
              - `storage`: (number) The storage usage price. (format: float)
              - `gpu`: (number) The GPU usage price. (format: float)
            - `usage`: {object}
              - `vcpuHours`: (number) vCPU hours consumed. (format: float)
              - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
              - `storageGiBHours`: (number) Storage GiB-hours consumed. (format: float)
              - `gpuSpotHours`: (number) Spot GPU hours consumed. (format: float)
              - `gpuOnDemandHours`: (number) On-demand GPU hours consumed. (format: float)
              - `build`: {object}
                - `vcpuHours`: (number) (format: float)
                - `memoryGiBHours`: (number) (format: float)
                - `duration`: (number) Seconds attributable to builds. (format: float)
              - `run`: {object}
                - `vcpuHours`: (number) (format: float)
                - `memoryGiBHours`: (number) (format: float)
                - `duration`: (number) Seconds attributable to running workloads. (format: float)
            - `resources`: [array of] {object}
                - `resourceType`: (string) The type of the resource (service, job, harness, addon, volume, etc.).
                - `price`: {object}
                  - `total`: (number) The total PaaS price, rounded to 2 decimal places. (format: float)
                  - `cpu`: (number) The CPU usage price. (format: float)
                  - `memory`: (number) The memory usage price. (format: float)
                  - `storage`: (number) The storage usage price. (format: float)
                  - `gpu`: (number) The GPU usage price. (format: float)
                - `usage`: {object}
                  - `vcpuHours`: (number) vCPU hours consumed. (format: float)
                  - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
                  - `storageGiBHours`: (number) Storage GiB-hours consumed. (format: float)
                  - `gpuSpotHours`: (number) Spot GPU hours consumed. (format: float)
                  - `gpuOnDemandHours`: (number) On-demand GPU hours consumed. (format: float)
                  - `build`: {object}
                    - `vcpuHours`: (number) (format: float)
                    - `memoryGiBHours`: (number) (format: float)
                    - `duration`: (number) Seconds attributable to builds. (format: float)
                  - `run`: {object}
                    - `vcpuHours`: (number) (format: float)
                    - `memoryGiBHours`: (number) (format: float)
                    - `duration`: (number) Seconds attributable to running workloads. (format: float)
                - `items`: [array of] {object}
                    - `id`: (string) Identifier for the resource.
                    - `name`: (string) The name of the resource.
                    - `price`: {object}
                      - `total`: (number) The total PaaS price, rounded to 2 decimal places. (format: float)
                      - `cpu`: (number) The CPU usage price. (format: float)
                      - `memory`: (number) The memory usage price. (format: float)
                      - `storage`: (number) The storage usage price. (format: float)
                      - `gpu`: (number) The GPU usage price. (format: float)
                    - `usage`: {object}
                      - `vcpuHours`: (number) vCPU hours consumed. (format: float)
                      - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
                      - `storageGiBHours`: (number) Storage GiB-hours consumed. (format: float)
                      - `gpuSpotHours`: (number) Spot GPU hours consumed. (format: float)
                      - `gpuOnDemandHours`: (number) On-demand GPU hours consumed. (format: float)
                      - `build`: {object}
                        - `vcpuHours`: (number) (format: float)
                        - `memoryGiBHours`: (number) (format: float)
                        - `duration`: (number) Seconds attributable to builds. (format: float)
                      - `run`: {object}
                        - `vcpuHours`: (number) (format: float)
                        - `memoryGiBHours`: (number) (format: float)
                        - `duration`: (number) Seconds attributable to running workloads. (format: float)
                    - `duration`: (number) Seconds the resource was billed for. (format: float)
  - `byoc`: {object}
    - `price`: {object}
      - `total`: (number) The total BYOC price, rounded to 2 decimal places. (format: float)
      - `vcpu`: (number) The vCPU usage price. (format: float)
      - `memory`: (number) The memory usage price. (format: float)
      - `gpuMemory`: (number) The GPU memory usage price. (format: float)
      - `cluster`: (number) The cluster usage price. (format: float)
    - `usage`: {object}
      - `vcpuHours`: (number) vCPU hours consumed. (format: float)
      - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
      - `clusterHours`: (number) Cluster hours consumed. (format: float)
      - `gpuMemoryGiBHours`: (number) GPU memory GiB-hours consumed. (format: float)
    - `clusters`: [array of] {object}
        - `id`: (string) Identifier for the cluster.
        - `name`: (string) The cluster name.
        - `price`: {object}
          - `vcpu`: (number) The vCPU usage price. (format: float)
          - `memory`: (number) The memory usage price. (format: float)
          - `gpuMemory`: (number) The GPU memory usage price. (format: float)
          - `cluster`: (number) The cluster usage price. (format: float)
          - `total`: (number) The allocated cluster BYOC price. Kept unrounded so cluster totals reconcile with the customer BYOC total. (format: float)
        - `usage`: {object}
          - `vcpuHours`: (number) vCPU hours consumed. (format: float)
          - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
          - `clusterHours`: (number) Cluster hours consumed. (format: float)
          - `gpuMemoryGiBHours`: (number) GPU memory GiB-hours consumed. (format: float)
  - `egressIp`: {object}
    - `price`: {object}
      - `total`: (number) The total price, rounded to 2 decimal places. (format: float)
    - `usage`: {object}
      - `hours`: (number) Hours consumed. (format: float)
  - `loadBalancer`: {object}
    - `price`: {object}
      - `total`: (number) The total price, rounded to 2 decimal places. (format: float)
    - `usage`: {object}
      - `hours`: (number) Hours consumed. (format: float)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)
  - `unit`: (string) What this page counts. (enum: teams, projects, resources, hours, days, months, total)

### API reference

GET /v1/billing/usage/{timestamp}

GET /v1/teams/{teamId}/billing/usage/{timestamp}

#### Example Response

200 OK: Hourly usage detail.

```json
{
  "data": {
    "currency": "usd",
    "total": 69.22,
    "paas": {
      "price": {
        "total": 69.22
      },
      "teams": [
        {
          "price": {
            "total": 69.22
          },
          "projects": [
            {
              "price": {
                "total": 69.22
              },
              "resources": [
                {
                  "price": {
                    "total": 69.22
                  },
                  "items": [
                    {
                      "price": {
                        "total": 69.22
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1,
    "unit": "days"
  }
}
```

### CLI reference

$ northflank get usage

Options:

- `--timestamp <timestamp>`: Unix timestamp of the billing hour

- `--teamId <teamId>`: The ID of the team to filter by. Not accepted from a token that can only read one team — a team billed in its own right, or a team token reading an org's billing — since those responses already cover that team and no other, and start at the project level without it.

- `--projectId <projectId>`: The ID of the project to filter by.

- `--resourceType <resourceType>`: A resource type, or a comma-separated list of resource types to filter by (e.g. service,job,addon).

- `--removeLegacyFields <removeLegacyFields>`: For a billing entity temporarily receiving the legacy billing API contract, return the current contract instead. Use the current query parameters with this option.

- `--teamsPage <teamsPage>`: The page number of teams to access.

- `--teamsPerPage <teamsPerPage>`: The number of teams to return per page. Maximum of 100.

- `--projectsPage <projectsPage>`: The page number of projects to access.

- `--projectsPerPage <projectsPerPage>`: The number of projects to return per page. Maximum of 100.

- `--resourcesPage <resourcesPage>`: The page number of resources to access.

- `--resourcesPerPage <resourcesPerPage>`: The number of resources to return per page. Maximum of 100.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Hourly usage detail.

```json
{
  "currency": "usd",
  "total": 69.22,
  "paas": {
    "price": {
      "total": 69.22
    },
    "teams": [
      {
        "price": {
          "total": 69.22
        },
        "projects": [
          {
            "price": {
              "total": 69.22
            },
            "resources": [
              {
                "price": {
                  "total": 69.22
                },
                "items": [
                  {
                    "price": {
                      "total": 69.22
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.usage({
  parameters: {
    "timestamp": "1655823815"
  },
  options: {
    "resourceType": "service,job,addon",
    "removeLegacyFields": true,
    "teamsPage": 1,
    "teamsPerPage": 50,
    "projectsPage": 1,
    "projectsPerPage": 50,
    "resourcesPage": 1,
    "resourcesPerPage": 50
  }
});
```

#### Example Response

 Hourly usage detail.

```json
{
  "data": {
    "currency": "usd",
    "total": 69.22,
    "paas": {
      "price": {
        "total": 69.22
      },
      "teams": [
        {
          "price": {
            "total": 69.22
          },
          "projects": [
            {
              "price": {
                "total": 69.22
              },
              "resources": [
                {
                  "price": {
                    "total": 69.22
                  },
                  "items": [
                    {
                      "price": {
                        "total": 69.22
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1,
    "unit": "days"
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

response = client.get.usage(
    timestamp="1655823815",
    projects_page=1,
    projects_per_page=50,
    remove_legacy_fields=True,
    resource_type="service,job,addon",
    resources_page=1,
    resources_per_page=50,
    teams_page=1,
    teams_per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "currency": "usd",
  "total": 69.22,
  "paas": {
    "price": {
      "total": 69.22
    },
    "teams": [
      {
        "price": {
          "total": 69.22
        },
        "projects": [
          {
            "price": {
              "total": 69.22
            },
            "resources": [
              {
                "price": {
                  "total": 69.22
                },
                "items": [
                  {
                    "price": {
                      "total": 69.22
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```
