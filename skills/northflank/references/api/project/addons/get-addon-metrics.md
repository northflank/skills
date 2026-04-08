# Get addon metrics

Source: https://northflank.com/docs/v1/api/project/addons/get-addon-metrics.md

Get metrics for an addon

Required permission: Project > Addons > Deployment > View Instance Metrics

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Query parameters:**

{object}
- `containerName`: (string) Limits metrics to a specific container.
- `queryType`: (string) Selects metrics for specified timestamp. (enum: range, single)
- `metricTypes`: (string) Type of metric. Multiple metric types can be selected by specifying the query parameter repeatedly. (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
- `startTime`: (string) Fetch metrics generated after this timestamp. Only valid for queryType: `range`.
- `endTime`: (string) Fetch metrics generated before this timestamp. Only valid for queryType: `range`.
- `duration`: (integer) Range duration in seconds. If set, only one of `startTime` or `endTime` can be set.
- `time`: (string) Fetch metrics at this timestamp. If not provided will use current time. Only valid for queryType: `single`.

**Response body:**

{object}
- `data`: {object}
  - `cpu`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `memory`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `networkIngress`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `networkEgress`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `tcpConnectionsOpen`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `diskUsage`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `requests`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `http4xxResponses`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `http5xxResponses`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `bandwidth`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)
  - `bandwidthVolume`: {object}
    - `metricInfo`: {object}
      - `metricId`: (string) (required) Type of metric to fetch (enum: cpu, memory, networkIngress, networkEgress, tcpConnectionsOpen, diskUsage, requests, http4xxResponses, http5xxResponses, bandwidth, bandwidthVolume)
      - `metricUnit`: (string) (required) (enum: pct, vCPU, mb, kbps, rps, count)
      - `metricResolution`: (number) (format: float)
    - `values`: [array of] {object}
        - `metadata`: {object}
          - `containerId`: (string) (required)
          - `volumeId`: (string)
        - `data`: [array of] {object}
            - `value`: (number) (required) (format: float)
            - `ts`: (string) (required) (format: date-time)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/metrics

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/metrics

#### Example Response

200 OK: List of metrics values

```json
{
  "data": {
    "cpu": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "memory": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "networkIngress": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "networkEgress": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "tcpConnectionsOpen": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "diskUsage": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "requests": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "http4xxResponses": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "http5xxResponses": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "bandwidth": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "bandwidthVolume": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    }
  }
}
```

### CLI reference

$ northflank get addon metrics

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--containerName <containerName>`: Limits metrics to a specific container.

- `--queryType <queryType>`: Selects metrics for specified timestamp.

- `--metricTypes <metricTypes>`: Type of metric. Multiple metric types can be selected by specifying the query parameter repeatedly.

- `--startTime <startTime>`: Fetch metrics generated after this timestamp. Only valid for queryType: `range`.

- `--endTime <endTime>`: Fetch metrics generated before this timestamp. Only valid for queryType: `range`.

- `--duration <duration>`: Range duration in seconds. If set, only one of `startTime` or `endTime` can be set.

- `--time <time>`: Fetch metrics at this timestamp. If not provided will use current time. Only valid for queryType: `single`.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 List of metrics values

```json
{
  "cpu": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "memory": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "networkIngress": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "networkEgress": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "tcpConnectionsOpen": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "diskUsage": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "requests": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "http4xxResponses": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "http5xxResponses": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "bandwidth": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  },
  "bandwidthVolume": {
    "metricInfo": {
      "metricUnit": "pct",
      "metricResolution": 10
    },
    "values": [
      {
        "metadata": {
          "containerId": "nginx-669cc865b7-5458n",
          "volumeId": "data-volume-1"
        },
        "data": [
          {
            "value": 0.5,
            "ts": "2023-03-21T15:01:17.310Z"
          }
        ]
      }
    ]
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.metrics({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  },
  options: {
    "startTime": "2023-02-16T14:00:00.000Z",
    "endTime": "2023-02-16T15:00:00.000Z",
    "duration": 600,
    "time": "2023-02-16T14:00:00.000Z"
  }
});
```

#### Example Response

 List of metrics values

```json
{
  "data": {
    "cpu": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "memory": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "networkIngress": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "networkEgress": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "tcpConnectionsOpen": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "diskUsage": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "requests": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "http4xxResponses": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "http5xxResponses": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "bandwidth": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    },
    "bandwidthVolume": {
      "metricInfo": {
        "metricUnit": "pct",
        "metricResolution": 10
      },
      "values": [
        {
          "metadata": {
            "containerId": "nginx-669cc865b7-5458n",
            "volumeId": "data-volume-1"
          },
          "data": [
            {
              "value": 0.5,
              "ts": "2023-03-21T15:01:17.310Z"
            }
          ]
        }
      ]
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
