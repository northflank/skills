# List usage

Source: https://northflank.com/docs/v1/api/org/billing/list-usage.md

Lists usage entries at hourly, daily, monthly, or total granularity.

Required permission: Organisation > Admin > Billing > Read

**Query parameters:**

{object}
- `teamId`: (string) The ID of the team to filter by. Not accepted from a token that can only read one team — a team billed in its own right, or a team token reading an org's billing — since those responses already cover that team and no other, and start at the project level without it. (min length: 24) (max length: 24)
- `projectId`: (string) A project ID, or a comma-separated list of project IDs.
- `resourceType`: (string) A resource type, or a comma-separated list of resource types to filter by (e.g. service,job,addon).
- `removeLegacyFields`: (boolean) For a billing entity temporarily receiving the legacy billing API contract, return the current contract instead. Use the current query parameters with this option.
- `cursor`: (multiple options) The cursor returned from the previous page of results — a Unix timestamp: the last emitted hour for `granularity=hour`, the last emitted bucket otherwise. Pass it back as returned rather than constructing one. (string) (min length: 24) (max length: 24) | (string) (pattern: ^\d+$)
- `perPage`: (integer) The number of results to display per request. Maximum of 100 normally, 24 when `breakdown=true`, or 12 when `granularity=month` — a monthly page covers far more billing hours than the other granularities. Defaults to 12 for `granularity=month`, 24 for other breakdown requests, and 50 otherwise.
- `startTime`: (integer) The Unix timestamp to start from (inclusive).
- `endTime`: (integer) The Unix timestamp to end at (exclusive). Requires startTime.
- `granularity`: (string) The size of each returned entry. `hour` (default) returns raw billing hours. `day` and `month` roll hours into UTC calendar buckets and page over those buckets with `perPage` + `cursor`, walking back to the start of the account's usage history when no `startTime` is given. `total` sums the whole window into one entry, so it reads every hour at once and requires both `startTime` and `endTime`, no more than 366 days apart. (enum: total, hour, day, month)
- `breakdown`: (boolean) Include the PaaS team, project, resource type and resource hierarchy for each hourly or monthly entry. Only supported with granularity=hour or granularity=month, and caps perPage at 24 (or 12 for monthly entries).
- `projectsCursor`: (string) The cursor returned from the previous breakdown project page. Use it with breakdown=true. (min length: 24) (max length: 24)
- `projectsPerPage`: (integer) The number of projects selected for each usage entry when breakdown=true. With an explicit projectId list, it is the maximum allowed list size. Maximum of 100.
- `fields`: (string) Set to usage to omit price and monetary total fields from the response. (enum: usage)
- `order`: (string) The timeline order. Defaults to desc (newest first). (enum: asc, desc)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `granularity`: (string) The granularity each entry represents. (enum: total, hour, day, month)
  - `window`: {object} The span the entries on this page cover, on bucket boundaries — not the full range paging will reach. Returned for the bucketed granularities, and omitted by a page past the end of the usage history, which covers no buckets.
    - `start`: (number) The oldest returned bucket's start, inclusive, as a Unix timestamp. (format: float)
    - `end`: (number) The newest returned bucket's end, exclusive, as a Unix timestamp. (format: float)
  - `scope`: {object} Present when the response is narrowed to the caller's own entity.
    - `entityType`: (string) The entity the response is limited to. (enum: team)
    - `entityId`: (string) Identifier of that entity.
  - `breakdownPagination`: {object} (required) The shared project page used by every hourly or monthly entry when breakdown=true. Omitted when an explicit projectId filter selects the projects.
    - `hasNextPage`: (boolean) (required) Is there another page of results available?
    - `cursor`: (string) The cursor to access the next page of results.
    - `count`: (number) (required) The number of results returned by this request. (format: float)
    - `unit`: (string) What this page counts. (enum: teams, projects, resources, hours, days, months, total)
  - `usage`: [array of] An array of usage entries in the requested order. {object}
     - `timestamp`: (number) The Unix timestamp of the entry. Hourly entries use the end of their represented period; day and month entries use the start of their UTC bucket. (format: float)
     - `period`: {object} The time span represented by this entry. Hourly entries end at timestamp; day and month entries use UTC calendar boundaries, clamped to the requested time range.
       - `start`: (number) The inclusive start of the usage entry, as a Unix timestamp. (format: float)
       - `end`: (number) The exclusive end of the usage entry, as a Unix timestamp. (format: float)
     - `currency`: (string) The currency code.
     - `total`: (number) Total spend for this entry, across every category it reports. Omitted when fields=usage. Summed before rounding, so it can differ from adding the categories below by a sub-cent amount. When a team, project or resourceType filter is active — or for a team-scoped caller — the customer-level categories are absent, so this is the spend in that scope rather than what the period cost the customer. (format: float)
     - `paas`: {object} The PaaS usage for this entry. Price is omitted when fields=usage.
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
         - `build`: {object} The share of the usage attributable to builds.
           - `vcpuHours`: (number) (format: float)
           - `memoryGiBHours`: (number) (format: float)
           - `duration`: (number) Seconds attributable to builds. (format: float)
         - `run`: {object} The share of the usage attributable to running workloads.
           - `vcpuHours`: (number) (format: float)
           - `memoryGiBHours`: (number) (format: float)
           - `duration`: (number) Seconds attributable to running workloads. (format: float)
       - `teams`: [array of] PaaS hierarchy, present when breakdown=true for hourly or monthly entries. {object}
           - `id`: (string) Identifier for the team.
           - `name`: (string) The name of the team.
           - `price`: {object} The team's PaaS price. When a projectId or resourceType filter is applied, this reflects only the filtered slice (e.g. one project, or selected resource types across the team).
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
             - `build`: {object} The share of the usage attributable to builds.
               - `vcpuHours`: (number) (format: float)
               - `memoryGiBHours`: (number) (format: float)
               - `duration`: (number) Seconds attributable to builds. (format: float)
             - `run`: {object} The share of the usage attributable to running workloads.
               - `vcpuHours`: (number) (format: float)
               - `memoryGiBHours`: (number) (format: float)
               - `duration`: (number) Seconds attributable to running workloads. (format: float)
           - `projects`: [array of] An array of projects for this team. Present when a teamId, projectId or resourceType filter is applied, or when a usage-list request uses breakdown=true. {object}
               - `id`: (string) Identifier for the project.
               - `name`: (string) The name of the project.
               - `price`: {object} The project's PaaS price. When a resourceType filter is applied, this reflects only the selected resource type or types' spend within the project.
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
                 - `build`: {object} The share of the usage attributable to builds.
                   - `vcpuHours`: (number) (format: float)
                   - `memoryGiBHours`: (number) (format: float)
                   - `duration`: (number) Seconds attributable to builds. (format: float)
                 - `run`: {object} The share of the usage attributable to running workloads.
                   - `vcpuHours`: (number) (format: float)
                   - `memoryGiBHours`: (number) (format: float)
                   - `duration`: (number) Seconds attributable to running workloads. (format: float)
               - `resources`: [array of] Resources grouped by type. Present when a projectId or resourceType filter is applied, or when a usage-list request uses breakdown=true. {object}
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
                     - `build`: {object} The share of the usage attributable to builds.
                       - `vcpuHours`: (number) (format: float)
                       - `memoryGiBHours`: (number) (format: float)
                       - `duration`: (number) Seconds attributable to builds. (format: float)
                     - `run`: {object} The share of the usage attributable to running workloads.
                       - `vcpuHours`: (number) (format: float)
                       - `memoryGiBHours`: (number) (format: float)
                       - `duration`: (number) Seconds attributable to running workloads. (format: float)
                   - `items`: [array of] The resources of this type. {object}
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
                         - `build`: {object} The share of the usage attributable to builds.
                           - `vcpuHours`: (number) (format: float)
                           - `memoryGiBHours`: (number) (format: float)
                           - `duration`: (number) Seconds attributable to builds. (format: float)
                         - `run`: {object} The share of the usage attributable to running workloads.
                           - `vcpuHours`: (number) (format: float)
                           - `memoryGiBHours`: (number) (format: float)
                           - `duration`: (number) Seconds attributable to running workloads. (format: float)
                       - `duration`: (number) Seconds the resource was billed for. (format: float)
     - `byoc`: {object} Customer-level BYOC usage. Omitted when a team, project or resourceType filter is active, or for a team-scoped caller.
       - `price`: {object} The customer-level BYOC price total. Always reflects the full customer total, regardless of drill-down filters.
         - `total`: (number) The total BYOC price, rounded to 2 decimal places. (format: float)
         - `vcpu`: (number) The vCPU usage price. (format: float)
         - `memory`: (number) The memory usage price. (format: float)
         - `gpuMemory`: (number) The GPU memory usage price. (format: float)
         - `cluster`: (number) The cluster usage price. (format: float)
       - `usage`: {object} Customer-level BYOC usage hours.
         - `vcpuHours`: (number) vCPU hours consumed. (format: float)
         - `memoryGiBHours`: (number) Memory GiB-hours consumed. (format: float)
         - `clusterHours`: (number) Cluster hours consumed. (format: float)
         - `gpuMemoryGiBHours`: (number) GPU memory GiB-hours consumed. (format: float)
     - `egressIp`: {object} Egress IP spend. Customer-level, so omitted when a team, project or resourceType filter is active, or for a team-scoped caller.
       - `price`: {object}
         - `total`: (number) The total price, rounded to 2 decimal places. (format: float)
       - `usage`: {object}
         - `hours`: (number) Hours consumed. (format: float)
     - `loadBalancer`: {object} Load balancer spend. Customer-level, so omitted when a team, project or resourceType filter is active, or for a team-scoped caller.
       - `price`: {object}
         - `total`: (number) The total price, rounded to 2 decimal places. (format: float)
       - `usage`: {object}
         - `hours`: (number) Hours consumed. (format: float)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)
  - `unit`: (string) What this page counts. (enum: teams, projects, resources, hours, days, months, total)

### API reference

GET /v1/billing/usage

GET /v1/teams/{teamId}/billing/usage

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/billing/usage?projectId=507f1f77bcf86cd799439011%2C507f1f77bcf86cd799439012&resourceType=service%2Cjob%2Caddon&removeLegacyFields=true&perPage=50&granularity=hour&breakdown=true&projectsPerPage=100&fields=usage&order=asc"
```

```python
import requests

url = "https://api.northflank.com/v1/billing/usage?projectId=507f1f77bcf86cd799439011%2C507f1f77bcf86cd799439012&resourceType=service%2Cjob%2Caddon&removeLegacyFields=true&perPage=50&granularity=hour&breakdown=true&projectsPerPage=100&fields=usage&order=asc"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of usage entries.

```json
{
  "data": {
    "breakdownPagination": {
      "hasNextPage": false,
      "count": 1,
      "unit": "days"
    },
    "usage": [
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
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1,
    "unit": "days"
  }
}
```

### CLI reference

$ northflank list usage

Options:

- `--teamId <teamId>`: The ID of the team to filter by. Not accepted from a token that can only read one team — a team billed in its own right, or a team token reading an org's billing — since those responses already cover that team and no other, and start at the project level without it.

- `--projectId <projectId>`: A project ID, or a comma-separated list of project IDs.

- `--resourceType <resourceType>`: A resource type, or a comma-separated list of resource types to filter by (e.g. service,job,addon).

- `--removeLegacyFields <removeLegacyFields>`: For a billing entity temporarily receiving the legacy billing API contract, return the current contract instead. Use the current query parameters with this option.

- `--cursor <cursor>`: The cursor returned from the previous page of results — a Unix timestamp: the last emitted hour for `granularity=hour`, the last emitted bucket otherwise. Pass it back as returned rather than constructing one.

- `--perPage <perPage>`: The number of results to display per request. Maximum of 100 normally, 24 when `breakdown=true`, or 12 when `granularity=month` — a monthly page covers far more billing hours than the other granularities. Defaults to 12 for `granularity=month`, 24 for other breakdown requests, and 50 otherwise.

- `--startTime <startTime>`: The Unix timestamp to start from (inclusive).

- `--endTime <endTime>`: The Unix timestamp to end at (exclusive). Requires startTime.

- `--granularity <granularity>`: The size of each returned entry. `hour` (default) returns raw billing hours. `day` and `month` roll hours into UTC calendar buckets and page over those buckets with `perPage` + `cursor`, walking back to the start of the account's usage history when no `startTime` is given. `total` sums the whole window into one entry, so it reads every hour at once and requires both `startTime` and `endTime`, no more than 366 days apart.

- `--breakdown <breakdown>`: Include the PaaS team, project, resource type and resource hierarchy for each hourly or monthly entry. Only supported with granularity=hour or granularity=month, and caps perPage at 24 (or 12 for monthly entries).

- `--projectsCursor <projectsCursor>`: The cursor returned from the previous breakdown project page. Use it with breakdown=true.

- `--projectsPerPage <projectsPerPage>`: The number of projects selected for each usage entry when breakdown=true. With an explicit projectId list, it is the maximum allowed list size. Maximum of 100.

- `--fields <fields>`: Set to usage to omit price and monetary total fields from the response.

- `--order <order>`: The timeline order. Defaults to desc (newest first).

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of usage entries.

```json
{
  "breakdownPagination": {
    "hasNextPage": false,
    "count": 1,
    "unit": "days"
  },
  "usage": [
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
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.usage({
  options: {
    "projectId": "507f1f77bcf86cd799439011,507f1f77bcf86cd799439012",
    "resourceType": "service,job,addon",
    "removeLegacyFields": true,
    "perPage": 50,
    "granularity": "hour",
    "breakdown": true,
    "projectsPerPage": 100,
    "fields": "usage",
    "order": "asc"
  }
});
```

#### Example Response

 A list of usage entries.

```json
{
  "data": {
    "breakdownPagination": {
      "hasNextPage": false,
      "count": 1,
      "unit": "days"
    },
    "usage": [
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
    ]
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

response = client.list.usage(
    granularity="hour",
    per_page=50,
    project_id="507f1f77bcf86cd799439011,507f1f77bcf86cd799439012",
    remove_legacy_fields=True,
    resource_type="service,job,addon",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "breakdownPagination": {
    "hasNextPage": false,
    "count": 1,
    "unit": "days"
  },
  "usage": [
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
  ]
}
```
