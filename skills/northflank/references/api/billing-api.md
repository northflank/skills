# Billing API

Source: https://northflank.com/docs/v1/api/billing-api.md

The Billing API provides read-only access to invoices, usage, and credit balances for the billing customer associated with your API token. Use it to build spending reports, reconcile invoices, monitor usage, or show a billing breakdown in your own tools.

The API is available at `https://api.northflank.com/v1`. The API token must have permission to view billing. See [API authentication](use-the-api.md#authentication) to create and use an API token.

```bash
curl -s \
  -H "Authorization: Bearer $NF_TOKEN" \
  "https://api.northflank.com/v1/billing/invoices?perPage=20"
```

#### Available endpoints

| Method | Endpoint | Use it to |
| --- | --- | --- |
| `GET` | `/billing/invoices` | List finalized invoices, newest first. |
| `GET` | `/billing/invoices/{invoiceId}` | Retrieve an invoice and drill into its spend. |
| `GET` | `/billing/usage` | List hourly, daily, monthly, or total usage and spend. |
| `GET` | `/billing/usage/{timestamp}` | Retrieve one billing hour and drill into its spend. |
| `GET` | `/billing/credit-balance` | Retrieve spendable credits and their sources. |

`invoiceId` is the `id` returned by the invoice list. `timestamp` is the Unix timestamp returned by the usage list.

#### How billing data is represented

Billing data is represented as category totals and a drillable hierarchy. All monetary values are decimal amounts in the response's `currency`, not minor units such as cents. For example, `69.22` represents 69.22 units of that currency.

- `paas` is Northflank-hosted spend. It includes price and usage figures and can be broken down by team, project, resource type, and individual resource.

- `byoc` is Bring Your Own Cloud spend. It is aggregated at the billing-customer level. Invoice detail and unfiltered hourly usage detail responses also include `byoc.clusters[]`, which allocates that spend and usage to each BYOC cluster for reporting. It is not an additional charge.

- `egressIp` and `loadBalancer` are metered network spend, also aggregated at the billing-customer level.

- For usage responses, `total` is the charge across the categories included in that response. Invoice totals also include non-usage charges and account for discounts and tax. Use the returned total instead of adding rounded component prices.

Usage values are quantities, not currency. For example, PaaS usage includes vCPU-hours, memory GiB-hours, storage GiB-hours, and GPU-hours.

Most price totals are rounded to two decimal places. Component prices, BYOC cluster allocations, and usage values can retain more precision so that small hourly charges are not lost through rounding.

#### Invoices and payment status

Invoices include the billing period, currency, PaaS and other category totals, tax and discounts where applicable. The `status` describes where the invoice is in its payment lifecycle:

| Status | Meaning |
| --- | --- |
| `draft` | The invoice is still being prepared and can change before it is finalized. |
| `open` | The invoice is finalized and awaiting payment. It can remain open while payment is in progress or requires additional authentication. |
| `payment_failed` | A payment attempt failed. The invoice remains unpaid and requires payment to be resolved. |
| `paid` | The invoice has been paid in full. |
| `uncollectible` | The invoice is not expected to be collected. |
| `void` | The invoice has been cancelled and no payment is due. |

#### Token scope

An organisation token can read billing data for the organisation's billing customer. A team token always returns data scoped to that team when the team is billed through an organisation. These scoped responses include a `scope` object and omit billing-customer totals that cannot be attributed to one team, such as BYOC and metered network spend.

For a team with its own billing customer, the team and billing-customer scopes are the same, so the team can read its complete billing data.

Credit balances belong to the billing customer and cannot be divided between teams. A team token reading billing through an organisation receives `403` from `GET /billing/credit-balance`. A team with its own billing customer can use that endpoint.

Use the [Northflank API specification](https://api.northflank.com/v1/swagger-html) for the complete response schemas.

### Query billing data

The Billing API has two query patterns: cursor-paginated histories and filtered, nested drill-downs. Choose the endpoint based on the question you need to answer.

| Question | Recommended request |
| --- | --- |
| What did this customer spend over a period? | `GET /billing/usage?granularity=total&startTime=...&endTime=...` |
| How has spend changed over time? | `GET /billing/usage?granularity=day` or `granularity=month` |
| What did one team, project, or resource type spend? | `GET /billing/usage` with `teamId`, `projectId`, or `resourceType` |
| Which resources made up an invoice or hour? | `GET /billing/invoices/{invoiceId}` or `GET /billing/usage/{timestamp}`, then drill down with filters |
| How much credit can be spent now? | `GET /billing/credit-balance` |

#### Find identifiers for billing filters

Billing filters use `uid`, a permanent 24-character hexadecimal identifier. Use the team's `uid` for `teamId` and the project's `uid` for `projectId`. The resource API's `id`, such as `production`, is a different identifier used in request paths.

Use a token with permission to read the teams or projects that you need:

| API token | Request | Identifier to copy |
| --- | --- | --- |
| Organization | `GET /teams` | `data.teams[].uid` for the billing `teamId` filter |
| Team | `GET /projects` | `data.projects[].uid` for the billing `projectId` filter |
| Organization | `GET /teams/{teamId}/projects` | `data.projects[].uid` for the billing `projectId` filter |

In `/teams/{teamId}/projects`, replace `{teamId}` with the team's `id` from `GET /teams`, not its `uid`. Team and project detail responses also return `data.uid`.

For example, if a project's `uid` is `6a4fe0430b00ac5d35e452c3`, filter its usage with:

```bash
curl -s \
  -H "Authorization: Bearer $NF_TOKEN" \
  "https://api.northflank.com/v1/billing/usage?projectId=6a4fe0430b00ac5d35e452c3"
```

A team token already limits billing to its team and cannot supply `teamId`. Billing breakdowns return these same identifiers as `id` for teams, projects, and individual resources. Service, job, addon, harness, and volume list and detail responses expose `uid` so you can match resources to billing entries. Billing supports `resourceType`, but no individual-resource ID filter.

#### Query usage by time range

Usage requests accept Unix timestamps in seconds. `startTime` is inclusive and `endTime` is exclusive.

```bash
curl -s \
  -H "Authorization: Bearer $NF_TOKEN" \
  "https://api.northflank.com/v1/billing/usage?startTime=1751328000&endTime=1754006400&granularity=day"
```

`granularity` controls each returned entry:

- `hour` is the default and returns raw billing hours.

- `day` groups usage into UTC calendar days.

- `month` groups usage into UTC calendar months.

- `total` returns one aggregate for the requested window. It requires both `startTime` and `endTime`, which can span up to 366 days. Sum consecutive windows for a longer period.

Day and month responses include `window.start` and `window.end` to describe the UTC bucket range on that page. When a range is not supplied, those granularities page backward from the current time through the account's usage history.

To return only a portion of PaaS spend, add one of these filters:

- `teamId`

- `projectId`

- `resourceType`: `job`, `service`, `harness`, `addon`, or `volume`

`teamId` and `projectId` take the resource's `uuid`, not its human-readable `id`. Use [`GET /teams`](org/teams/list-teams.md) and read `data.teams[].uuid` to find a team UUID. Use [`GET /projects`](team/projects/list-projects.md) and read `data.projects[].uuid` to find a project UUID. Both values are 24-character hexadecimal identifiers.

For filtered usage lists, `paas` and `total` represent the selected slice. `byoc`, `egressIp`, and `loadBalancer` are omitted because they are billing-customer totals and cannot be attributed to a team, project, or resource type.

#### Page through invoice and usage lists

`GET /billing/invoices` and `GET /billing/usage` use cursor pagination. Set `perPage` to 1–100, then pass the response's `pagination.cursor` to the next request until `pagination.hasNextPage` is `false`.

```bash
curl -s \
  -H "Authorization: Bearer $NF_TOKEN" \
  "https://api.northflank.com/v1/billing/invoices?perPage=50&cursor=$CURSOR"
```

For `granularity=hour` and `granularity=day`, usage defaults to 50 entries and permits up to 100 entries per page. For `granularity=month`, usage defaults to 12 entries and permits at most 12 entries per page. The usage response sets `pagination.unit` to `hours`, `days`, `months`, or `total` so you can identify what the page count represents.

#### Drill into PaaS spend

Invoice and usage-detail endpoints return a nested PaaS hierarchy. The deepest selected level is paginated, using the matching level-prefixed query parameters.

| Filters on the request | Returned breakdown | Paginate with |
| --- | --- | --- |
| No filters for an organisation token | `paas.teams[]` | `teamsPage`, `teamsPerPage` |
| Token limited to one team | `paas.teams[].projects[]` | `projectsPage`, `projectsPerPage` |
| `teamId` | `paas.teams[].projects[]` | `projectsPage`, `projectsPerPage` |
| `resourceType` | matching projects and resource groups | `projectsPage`, `projectsPerPage` |
| `projectId` | `paas.teams[].projects[].resources[].items[]` | `resourcesPage`, `resourcesPerPage` |
| `projectId` and `resourceType` | matching resources in that project | `resourcesPage`, `resourcesPerPage` |

The following abbreviated response fragments show the PaaS breakdown for each filter combination. Invoice-level totals and other response fields are omitted for clarity.

##### No filters

```json
{
  "data": {
    "paas": {
      "teams": [
        {
          "id": "6a4fe0120b00ac5d35e452c2"
        }
      ]
    }
  },
  "pagination": {
    "unit": "teams"
  }
}
```

##### `teamId`

```json
{
  "data": {
    "paas": {
      "teams": [
        {
          "id": "6a4fe0120b00ac5d35e452c2",
          "projects": [
            {
              "id": "6a4fe0430b00ac5d35e452c3"
            }
          ]
        }
      ]
    }
  },
  "pagination": {
    "unit": "projects"
  }
}
```

##### `resourceType`

```json
{
  "data": {
    "paas": {
      "teams": [
        {
          "projects": [
            {
              "id": "6a4fe0430b00ac5d35e452c3",
              "resources": [
                {
                  "resourceType": "service",
                  "items": []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "pagination": {
    "unit": "projects"
  }
}
```

##### `projectId`

```json
{
  "data": {
    "paas": {
      "teams": [
        {
          "projects": [
            {
              "id": "6a4fe0430b00ac5d35e452c3",
              "resources": [
                {
                  "resourceType": "service",
                  "items": [
                    {
                      "id": "6a4fe0740b00ac5d35e452c4"
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
    "unit": "resources"
  }
}
```

##### `projectId` and `resourceType`

```json
{
  "data": {
    "paas": {
      "teams": [
        {
          "projects": [
            {
              "id": "6a4fe0430b00ac5d35e452c3",
              "resources": [
                {
                  "resourceType": "service",
                  "items": [
                    {
                      "id": "6a4fe0740b00ac5d35e452c4"
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
    "unit": "resources"
  }
}
```

For example, retrieve an invoice's PaaS breakdown for one project:

```bash
curl -s \
  -H "Authorization: Bearer $NF_TOKEN" \
  "https://api.northflank.com/v1/billing/invoices/$INVOICE_ID?projectId=$PROJECT_UUID&resourcesPerPage=100"
```

Use only the pagination parameters for the active level. Each level has a default page size of 50 and a maximum of 100. The response's `pagination.unit` identifies the paginated level.

Price rollups above the paginated level always cover the complete period or hour. Only the array at the paginated level is a page.

Organisation callers can filter the PaaS breakdown in invoice and usage-detail responses while retaining billing-customer invoice totals. For an hourly usage detail, a filter narrows the nested breakdown; use the usage list with the same filter when you need a filtered hourly or time-range total.

Invoice detail responses and unfiltered hourly usage detail responses include `byoc.clusters[]` when BYOC data is available. Each entry allocates the billing customer's BYOC spend and usage to a cluster for reporting. This breakdown is separate from the PaaS hierarchy and has no BYOC cluster filter or pagination parameters. An hourly response with a PaaS filter omits `byoc`, including `byoc.clusters`.

A token that can read only one team is already constrained to that team and cannot send `teamId`. Its breakdown begins at projects, including when no other filter is supplied, so use `projectsPage` and `projectsPerPage`. Customer-level categories are omitted only when the team is billed through an organisation.

#### Read available credits

`GET /billing/credit-balance` returns the account currency, spendable credit, and its sources:

```json
{
  "data": {
    "currency": "usd",
    "total": {
      "available": 250,
      "pending": 10
    },
    "grants": {
      "available": 50,
      "pending": 10
    },
    "customerBalance": {
      "amount": 200
    },
    "lastSyncedAt": "2026-08-27T12:00:00Z"
  }
}
```

`total.available` is the credit that can be spent now across both sources. `grants` are credit grants, including credit purchases. `customerBalance.amount` is a signed balance adjustment: a positive amount is credit, while a negative amount is owed and appears through unpaid invoices rather than reducing `total.available`.

### Endpoint reference

All Billing API endpoints are read-only `GET` requests. Include your API token in the `Authorization: Bearer` header. Responses are wrapped in a top-level `data` object.

The examples use an organisation-level caller and illustrative amounts. For a team token reading billing through an organisation, invoice lists include `data.invoices[].scope`. Usage lists and detail responses include `data.scope`. These responses omit customer-level fields, including BYOC and network spend, invoice totals, and line items.

#### List invoices

`GET /billing/invoices`

Lists finalized invoices in reverse chronological order.

| Query parameter | Description |
| --- | --- |
| `perPage` | Number of invoices to return. Default `50`, maximum `100`. |
| `cursor` | Cursor from the preceding response. Omit for the first page. |

The response contains `data.invoices`, where each invoice includes `id`, `period`, `currency`, `status`, `paas`, and applicable billing totals. Follow `pagination.cursor` while `pagination.hasNextPage` is `true`.

```json
{
  "data": {
    "invoices": [
      {
        "id": "835994C3-14310",
        "period": {
          "start": 1751328000,
          "end": 1754006400
        },
        "currency": "usd",
        "status": "paid",
        "subTotal": 158.9,
        "total": 158.9,
        "paas": {
          "price": {
            "total": 69.22,
            "cpu": 20.25,
            "memory": 24.1875,
            "storage": 4.7825,
            "gpu": 20
          },
          "usage": {
            "vcpuHours": 120,
            "memoryGiBHours": 480,
            "storageGiBHours": 168,
            "gpuSpotHours": 0,
            "gpuOnDemandHours": 2,
            "build": {
              "vcpuHours": 20,
              "memoryGiBHours": 80
            },
            "run": {
              "vcpuHours": 100,
              "memoryGiBHours": 400
            }
          }
        },
        "byoc": {
          "price": {
            "total": 80.46,
            "vcpu": 0,
            "memory": 10.1775,
            "gpuMemory": 0,
            "cluster": 70.27777777777777
          },
          "usage": {
            "vcpuHours": 14444,
            "memoryGiBHours": 68609,
            "clusterHours": 667,
            "gpuMemoryGiBHours": 0
          }
        },
        "egressIp": {
          "price": {
            "total": 4.61
          },
          "usage": {
            "hours": 168
          }
        },
        "loadBalancer": {
          "price": {
            "total": 4.61
          },
          "usage": {
            "hours": 168
          }
        }
      }
    ]
  },
  "pagination": {
    "hasNextPage": true,
    "cursor": "6a4fdfef0b00ac5d35e452c1",
    "count": 1
  }
}
```

#### Get an invoice

`GET /billing/invoices/{invoiceId}`

Returns an invoice's billing totals and PaaS breakdown. `invoiceId` is the invoice `id` from the invoice list. When BYOC data is available, `byoc.clusters[]` also reports the allocated BYOC price and usage for each cluster. It is a reporting allocation, not an additional charge.

| Query parameter | Description |
| --- | --- |
| `teamId` | Restrict the PaaS breakdown to one team. |
| `projectId` | Restrict the PaaS breakdown to one project. |
| `resourceType` | Restrict the PaaS breakdown to `job`, `service`, `harness`, `addon`, or `volume`. |
| `teamsPage`, `teamsPerPage` | Page teams for an organisation token with no drill-down filter. |
| `projectsPage`, `projectsPerPage` | Page projects after a `teamId` or `resourceType` filter, or for a token limited to one team. |
| `resourcesPage`, `resourcesPerPage` | Page resources after a `projectId` filter. |

The pagination level depends on the active filters. See [Query billing data](billing-api.md#query-billing-data) for the breakdown hierarchy and parameter rules.

This example shows the deepest PaaS hierarchy, returned when a `resourceType` filter is supplied. For an organisation token without a drill-down filter, `paas.teams` does not include `projects` or `resources`.

```json
{
  "data": {
    "id": "835994C3-14310",
    "period": {
      "start": 1751328000,
      "end": 1754006400
    },
    "currency": "usd",
    "status": "paid",
    "paas": {
      "price": {
        "total": 69.22,
        "cpu": 20.25,
        "memory": 24.1875,
        "storage": 4.7825,
        "gpu": 20
      },
      "usage": {
        "vcpuHours": 120,
        "memoryGiBHours": 480,
        "storageGiBHours": 168,
        "gpuSpotHours": 0,
        "gpuOnDemandHours": 2,
        "build": {
          "vcpuHours": 20,
          "memoryGiBHours": 80
        },
        "run": {
          "vcpuHours": 100,
          "memoryGiBHours": 400
        }
      },
      "teams": [
        {
          "id": "6a4fe0120b00ac5d35e452c2",
          "name": "Payments",
          "price": {
            "total": 69.22,
            "cpu": 20.25,
            "memory": 24.1875,
            "storage": 4.7825,
            "gpu": 20
          },
          "usage": {
            "vcpuHours": 120,
            "memoryGiBHours": 480,
            "storageGiBHours": 168,
            "gpuSpotHours": 0,
            "gpuOnDemandHours": 2,
            "build": {
              "vcpuHours": 20,
              "memoryGiBHours": 80
            },
            "run": {
              "vcpuHours": 100,
              "memoryGiBHours": 400
            }
          },
          "projects": [
            {
              "id": "6a4fe0430b00ac5d35e452c3",
              "name": "production",
              "price": {
                "total": 69.22,
                "cpu": 20.25,
                "memory": 24.1875,
                "storage": 4.7825,
                "gpu": 20
              },
              "usage": {
                "vcpuHours": 120,
                "memoryGiBHours": 480,
                "storageGiBHours": 168,
                "gpuSpotHours": 0,
                "gpuOnDemandHours": 2,
                "build": {
                  "vcpuHours": 20,
                  "memoryGiBHours": 80
                },
                "run": {
                  "vcpuHours": 100,
                  "memoryGiBHours": 400
                }
              },
              "resources": [
                {
                  "resourceType": "service",
                  "price": {
                    "total": 69.22,
                    "cpu": 20.25,
                    "memory": 24.1875,
                    "storage": 4.7825,
                    "gpu": 20
                  },
                  "usage": {
                    "vcpuHours": 120,
                    "memoryGiBHours": 480,
                    "storageGiBHours": 168,
                    "gpuSpotHours": 0,
                    "gpuOnDemandHours": 2,
                    "build": {
                      "vcpuHours": 20,
                      "memoryGiBHours": 80
                    },
                    "run": {
                      "vcpuHours": 100,
                      "memoryGiBHours": 400
                    }
                  },
                  "items": [
                    {
                      "id": "6a4fe0740b00ac5d35e452c4",
                      "name": "api",
                      "price": {
                        "total": 69.22,
                        "cpu": 20.25,
                        "memory": 24.1875,
                        "storage": 4.7825,
                        "gpu": 20
                      },
                      "usage": {
                        "vcpuHours": 120,
                        "memoryGiBHours": 480,
                        "storageGiBHours": 168,
                        "gpuSpotHours": 0,
                        "gpuOnDemandHours": 2,
                        "build": {
                          "vcpuHours": 20,
                          "memoryGiBHours": 80
                        },
                        "run": {
                          "vcpuHours": 100,
                          "memoryGiBHours": 400
                        }
                      },
                      "duration": 2678400
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "byoc": {
      "price": {
        "total": 80.46,
        "vcpu": 0,
        "memory": 10.1775,
        "gpuMemory": 0,
        "cluster": 70.27777777777777
      },
      "usage": {
        "vcpuHours": 14444,
        "memoryGiBHours": 68609,
        "clusterHours": 667,
        "gpuMemoryGiBHours": 0
      },
      "clusters": [
        {
          "id": "6a4fe1870b00ac5d35e452d7",
          "name": "production",
          "price": {
            "total": 46.45527777777777,
            "vcpu": 0,
            "memory": 6.1775,
            "gpuMemory": 0,
            "cluster": 40.27777777777777
          },
          "usage": {
            "vcpuHours": 10000,
            "memoryGiBHours": 47000,
            "clusterHours": 400,
            "gpuMemoryGiBHours": 0
          }
        },
        {
          "id": "6a4fe1a20b00ac5d35e452d8",
          "name": "staging",
          "price": {
            "total": 34,
            "vcpu": 0,
            "memory": 4,
            "gpuMemory": 0,
            "cluster": 30
          },
          "usage": {
            "vcpuHours": 4444,
            "memoryGiBHours": 21609,
            "clusterHours": 267,
            "gpuMemoryGiBHours": 0
          }
        }
      ]
    },
    "egressIp": {
      "price": {
        "total": 4.61
      },
      "usage": {
        "hours": 168
      }
    },
    "loadBalancer": {
      "price": {
        "total": 4.61
      },
      "usage": {
        "hours": 168
      }
    },
    "lineItems": [
      {
        "title": "PaaS usage",
        "total": 69.22
      },
      {
        "title": "BYOC usage",
        "total": 80.46
      },
      {
        "title": "Infrastructure Commitment",
        "base": 80,
        "proration": -10.78,
        "total": 69.22
      }
    ],
    "subTotal": 228.12,
    "discounts": {
      "total": 5
    },
    "tax": {
      "percent": 20,
      "amount": 44.62
    },
    "total": 267.74
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1,
    "unit": "projects"
  }
}
```

#### List usage

`GET /billing/usage`

Lists usage entries, newest first. It returns hourly entries by default and can aggregate them into daily, monthly, or total spend.

| Query parameter | Description |
| --- | --- |
| `perPage` | Number of entries or buckets to return. Default `50`, maximum `100`. For `granularity=month`, the default and maximum are both `12`. |
| `cursor` | Cursor from the preceding response. Omit for the first page. |
| `startTime` | Inclusive Unix timestamp in seconds. |
| `endTime` | Exclusive Unix timestamp in seconds. Requires `startTime` and must be later than it. |
| `granularity` | `hour` (default), `day`, `month`, or `total`. |
| `teamId` | Restrict the PaaS usage and spend to one team. |
| `projectId` | Restrict the PaaS usage and spend to one project. |
| `resourceType` | Restrict the PaaS usage and spend to `job`, `service`, `harness`, `addon`, or `volume`. |

The response contains `data.granularity` and `data.usage`. Each entry includes its `timestamp`, `currency`, `total`, and PaaS price and usage. Unfiltered entries also include customer-level BYOC and network categories when available. To retrieve the BYOC cluster breakdown, use the invoice detail or hourly usage detail endpoint.

`granularity=total` requires both time parameters and supports a maximum 366-day window. Use day or month granularity, or combine consecutive total windows, for longer reporting periods.

```json
{
  "data": {
    "granularity": "day",
    "window": {
      "start": 1751414400,
      "end": 1751500800
    },
    "usage": [
      {
        "timestamp": 1751414400,
        "currency": "usd",
        "total": 1.72,
        "paas": {
          "price": {
            "total": 1.2,
            "cpu": 0.4,
            "memory": 0.4,
            "storage": 0.2,
            "gpu": 0.2
          },
          "usage": {
            "vcpuHours": 2.4,
            "memoryGiBHours": 9.6,
            "storageGiBHours": 4.8,
            "gpuSpotHours": 0,
            "gpuOnDemandHours": 0.1,
            "build": {
              "vcpuHours": 0.4,
              "memoryGiBHours": 1.6
            },
            "run": {
              "vcpuHours": 2,
              "memoryGiBHours": 8
            }
          }
        },
        "byoc": {
          "price": {
            "total": 0.3,
            "vcpu": 0,
            "memory": 0.05,
            "gpuMemory": 0,
            "cluster": 0.25
          },
          "usage": {
            "vcpuHours": 0,
            "memoryGiBHours": 24,
            "clusterHours": 24,
            "gpuMemoryGiBHours": 0
          }
        },
        "egressIp": {
          "price": {
            "total": 0.11
          },
          "usage": {
            "hours": 24
          }
        },
        "loadBalancer": {
          "price": {
            "total": 0.11
          },
          "usage": {
            "hours": 24
          }
        }
      }
    ]
  },
  "pagination": {
    "hasNextPage": true,
    "cursor": "1751414400",
    "count": 1,
    "unit": "days"
  }
}
```

#### Get usage for one hour

`GET /billing/usage/{timestamp}`

Returns the billing data and PaaS breakdown for one hour. Use a timestamp from an `hour`-granularity usage list; timestamps from daily, monthly, or total results identify aggregates, not a single hour.

It accepts the same drill-down and level-prefixed pagination parameters as `GET /billing/invoices/{invoiceId}`:

| Query parameter | Description |
| --- | --- |
| `teamId` | Restrict the displayed PaaS breakdown to one team. |
| `projectId` | Restrict the displayed PaaS breakdown to one project. |
| `resourceType` | Restrict the displayed PaaS breakdown to one type or a comma-separated list of different types with no spaces. Supported values are `job`, `service`, `harness`, `addon`, and `volume`. |
| `teamsPage`, `teamsPerPage` | Page the team breakdown for an organisation token with no drill-down filter. |
| `projectsPage`, `projectsPerPage` | Page the project breakdown after a `teamId` or `resourceType` filter, or for a token limited to one team. |
| `resourcesPage`, `resourcesPerPage` | Page the resource breakdown. |

To return several resource types, pass them as a comma-separated `resourceType` value:

```text
GET /billing/usage/1751414400?resourceType=service,job
```

When an organisation caller filters this endpoint, the nested PaaS hierarchy is narrowed but the top-level PaaS amount remains the customer's amount for that hour. Use `GET /billing/usage` with the same filters when you need the spend total for just that slice.

This response example uses `resourceType=service` to show the full PaaS hierarchy. The filter omits customer-level fields, including `byoc` and `byoc.clusters`.

```json
{
  "data": {
    "timestamp": 1751414400,
    "currency": "usd",
    "total": 69.22,
    "paas": {
      "price": {
        "total": 69.22,
        "cpu": 20.25,
        "memory": 24.1875,
        "storage": 4.7825,
        "gpu": 20
      },
      "usage": {
        "vcpuHours": 120,
        "memoryGiBHours": 480,
        "storageGiBHours": 168,
        "gpuSpotHours": 0,
        "gpuOnDemandHours": 2,
        "build": {
          "vcpuHours": 20,
          "memoryGiBHours": 80
        },
        "run": {
          "vcpuHours": 100,
          "memoryGiBHours": 400
        }
      },
      "teams": [
        {
          "id": "6a4fe0120b00ac5d35e452c2",
          "name": "Payments",
          "price": {
            "total": 69.22,
            "cpu": 20.25,
            "memory": 24.1875,
            "storage": 4.7825,
            "gpu": 20
          },
          "usage": {
            "vcpuHours": 120,
            "memoryGiBHours": 480,
            "storageGiBHours": 168,
            "gpuSpotHours": 0,
            "gpuOnDemandHours": 2,
            "build": {
              "vcpuHours": 20,
              "memoryGiBHours": 80
            },
            "run": {
              "vcpuHours": 100,
              "memoryGiBHours": 400
            }
          },
          "projects": [
            {
              "id": "6a4fe0430b00ac5d35e452c3",
              "name": "production",
              "price": {
                "total": 69.22,
                "cpu": 20.25,
                "memory": 24.1875,
                "storage": 4.7825,
                "gpu": 20
              },
              "usage": {
                "vcpuHours": 120,
                "memoryGiBHours": 480,
                "storageGiBHours": 168,
                "gpuSpotHours": 0,
                "gpuOnDemandHours": 2,
                "build": {
                  "vcpuHours": 20,
                  "memoryGiBHours": 80
                },
                "run": {
                  "vcpuHours": 100,
                  "memoryGiBHours": 400
                }
              },
              "resources": [
                {
                  "resourceType": "service",
                  "price": {
                    "total": 69.22,
                    "cpu": 20.25,
                    "memory": 24.1875,
                    "storage": 4.7825,
                    "gpu": 20
                  },
                  "usage": {
                    "vcpuHours": 120,
                    "memoryGiBHours": 480,
                    "storageGiBHours": 168,
                    "gpuSpotHours": 0,
                    "gpuOnDemandHours": 2,
                    "build": {
                      "vcpuHours": 20,
                      "memoryGiBHours": 80
                    },
                    "run": {
                      "vcpuHours": 100,
                      "memoryGiBHours": 400
                    }
                  },
                  "items": [
                    {
                      "id": "6a4fe0740b00ac5d35e452c4",
                      "name": "api",
                      "price": {
                        "total": 69.22,
                        "cpu": 20.25,
                        "memory": 24.1875,
                        "storage": 4.7825,
                        "gpu": 20
                      },
                      "usage": {
                        "vcpuHours": 120,
                        "memoryGiBHours": 480,
                        "storageGiBHours": 168,
                        "gpuSpotHours": 0,
                        "gpuOnDemandHours": 2,
                        "build": {
                          "vcpuHours": 20,
                          "memoryGiBHours": 80
                        },
                        "run": {
                          "vcpuHours": 100,
                          "memoryGiBHours": 400
                        }
                      },
                      "duration": 3600
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
    "unit": "projects"
  }
}
```

An unfiltered customer-level response includes the BYOC cluster breakdown. The following response fragment shows its shape:

```json
{
  "data": {
    "timestamp": 1751414400,
    "byoc": {
      "price": {
        "total": 0.02,
        "vcpu": 0,
        "memory": 0.005,
        "gpuMemory": 0,
        "cluster": 0.015
      },
      "usage": {
        "vcpuHours": 0,
        "memoryGiBHours": 2,
        "clusterHours": 2,
        "gpuMemoryGiBHours": 0
      },
      "clusters": [
        {
          "id": "6a4fe1870b00ac5d35e452d7",
          "name": "production",
          "price": {
            "total": 0.013,
            "vcpu": 0,
            "memory": 0.003,
            "gpuMemory": 0,
            "cluster": 0.01
          },
          "usage": {
            "vcpuHours": 0,
            "memoryGiBHours": 1,
            "clusterHours": 1,
            "gpuMemoryGiBHours": 0
          }
        },
        {
          "id": "6a4fe1a20b00ac5d35e452d8",
          "name": "staging",
          "price": {
            "total": 0.007,
            "vcpu": 0,
            "memory": 0.002,
            "gpuMemory": 0,
            "cluster": 0.005
          },
          "usage": {
            "vcpuHours": 0,
            "memoryGiBHours": 1,
            "clusterHours": 1,
            "gpuMemoryGiBHours": 0
          }
        }
      ]
    }
  }
}
```

#### Get credit balance

`GET /billing/credit-balance`

This endpoint takes no query parameters. It returns the following fields:

| Response field | Description |
| --- | --- |
| `currency` | Currency for all returned amounts. |
| `total.available` | Spendable credit available now. |
| `total.pending` | Credit granted but not yet available. |
| `grants` | Available and pending credit-grant balances. |
| `customerBalance.amount` | Signed customer balance adjustment. Positive is credit; negative is an amount owed. |
| `lastSyncedAt` | When the balance was last synchronized with the billing provider. |

```json
{
  "data": {
    "currency": "usd",
    "total": {
      "available": 250,
      "pending": 10
    },
    "grants": {
      "available": 50,
      "pending": 10
    },
    "customerBalance": {
      "amount": 200
    },
    "lastSyncedAt": "2026-08-27T12:00:00Z"
  }
}
```

It is not available to a team token reading billing through an organisation: that request returns `403`, because credit belongs to the billing customer rather than an individual team.

#### Errors and empty results

The API returns `400` for invalid or incompatible query parameters, such as an unsupported pagination parameter for the selected drill-down level. It returns `404` when an invoice, billing hour, team, or project is not part of the billing customer.

An existing team or project with no spend for the selected period returns `200` with an empty PaaS breakdown.
