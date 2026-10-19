# Get invoice

Source: https://northflank.com/docs/v1/api/team/billing/get-invoice.md

Gets details about a given invoice.

Required permission: Organisation > Admin > Billing > Read

**Path parameters:**

{object}
- `invoiceId`: (string) (required) ID of the invoice

**Query parameters:**

{object}
- `teamId`: (string) The ID of the team to filter by. Not accepted from a token that can only read one team — a team billed in its own right, or a team token reading an org's billing — since those responses already cover that team and no other, and start at the project level without it. (min length: 24) (max length: 24)
- `projectId`: (string) The ID of the project to filter by. (min length: 24) (max length: 24)
- `resourceType`: (string) The resource type to filter by (e.g. service, job, harness, addon, volume). (enum: job, service, harness, addon, volume)
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
  - `id`: (string) (required) Identifier for the invoice.
  - `period`: {object}
    - `start`: (number) The start of the billing period, as a Unix timestamp. (format: float)
    - `end`: (number) The end of the billing period, as a Unix timestamp. (format: float)
  - `currency`: (string) The currency code.
  - `status`: (string) The invoice payment status, as reported by Stripe. `open` is finalized and awaiting payment — including while a payment is in flight or awaiting authentication — `uncollectible` has been written off, and `void` has been cancelled. `payment_failed` is only reported for invoices with no Stripe status to defer to. (enum: draft, open, payment_failed, paid, uncollectible, void)
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
  - `lineItems`: [array of] {object}
     - `title`: (string) What the line is for.
     - `base`: (number) The charge before proration. Present only when a proration applies. (format: float)
     - `proration`: (number) The prorated adjustment, negative for unused time. Present only when a proration applies. (format: float)
     - `total`: (number) The cost of the line, including any proration. (format: float)
  - `subTotal`: (number) The subtotal before tax and discounts. (format: float)
  - `discounts`: {object}
    - `total`: (number) The total discount amount. (format: float)
  - `tax`: {object}
    - `percent`: (number) The tax percentage. (format: float)
    - `amount`: (number) The tax amount. (format: float)
  - `total`: (number) The total cost of the invoice, including tax. (format: float)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)
  - `unit`: (string) What this page counts. (enum: teams, projects, resources, hours, days, months, total)

### API reference

GET /v1/billing/invoices/{invoiceId}

GET /v1/teams/{teamId}/billing/invoices/{invoiceId}

#### Example Response

200 OK: Invoice details.

```json
{
  "data": {
    "currency": "usd",
    "status": "paid",
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
    },
    "lineItems": [
      {
        "title": "Infrastructure Commitment"
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

$ northflank get invoice

Options:

- `--invoiceId <invoiceId>`: ID of the invoice

- `--teamId <teamId>`: The ID of the team to filter by. Not accepted from a token that can only read one team — a team billed in its own right, or a team token reading an org's billing — since those responses already cover that team and no other, and start at the project level without it.

- `--projectId <projectId>`: The ID of the project to filter by.

- `--resourceType <resourceType>`: The resource type to filter by (e.g. service, job, harness, addon, volume).

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

 Invoice details.

```json
{
  "currency": "usd",
  "status": "paid",
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
  },
  "lineItems": [
    {
      "title": "Infrastructure Commitment"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.invoice({
  parameters: {
    "invoiceId": "835994C3-14310"
  },
  options: {
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

 Invoice details.

```json
{
  "data": {
    "currency": "usd",
    "status": "paid",
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
    },
    "lineItems": [
      {
        "title": "Infrastructure Commitment"
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

response = client.get.invoice(
    invoice_id="835994C3-14310",
    projects_page=1,
    projects_per_page=50,
    remove_legacy_fields=True,
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
  "status": "paid",
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
  },
  "lineItems": [
    {
      "title": "Infrastructure Commitment"
    }
  ],
  "id": "string",
  "period": {}
}
```
