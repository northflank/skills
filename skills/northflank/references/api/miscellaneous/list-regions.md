# List regions

Source: https://northflank.com/docs/v1/api/miscellaneous/list-regions.md

Lists available project regions

**Response body:**

{object}
- `data`: {object}
  - `regions`: [array of] {object}
     - `id`: (string) (required) The ID of the region.
     - `name`: (string) (required) The name of the region.
     - `regionName`: (string) (required) The name of the group this region belongs to.
     - `provider`: {object}
       - `id`: (string) (required)
       - `region`: (string) (required)
     - `gpuDevices`: [array of] {object}
         - `id`: (string) (required) The ID of the GPU device.
         - `name`: (string) (required) The name of the GPU device.
         - `manufacturer`: (string) (required) The manufacturer of the GPU.
         - `memoryInfo`: {object}
           - `sizeInMiB`: (number) (required) The size of the GPU memory in MiB. (format: float)
         - `countOptions`: [array of] (number) (format: float)
         - `pricing`: {object}
           - `onDemand`: (number) (required) The price per hour for on-demand usage, in US¢. (format: float)

### API reference

GET /v1/regions

#### Example Response

200 OK: A list of available regions.

```json
{
  "data": {
    "regions": [
      {
        "id": "europe-west",
        "name": "Europe - West",
        "regionName": "EMEA",
        "gpuDevices": [
          {
            "id": "h100-80",
            "name": "H100",
            "manufacturer": "NVIDIA",
            "memoryInfo": {
              "sizeInMiB": 81920
            },
            "pricing": {
              "onDemand": 274
            }
          }
        ]
      }
    ]
  }
}
```

### CLI reference

$ northflank list regions

Options:

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of available regions.

```json
{
  "regions": [
    {
      "id": "europe-west",
      "name": "Europe - West",
      "regionName": "EMEA",
      "gpuDevices": [
        {
          "id": "h100-80",
          "name": "H100",
          "manufacturer": "NVIDIA",
          "memoryInfo": {
            "sizeInMiB": 81920
          },
          "pricing": {
            "onDemand": 274
          }
        }
      ]
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.regions({});
```

#### Example Response

 A list of available regions.

```json
{
  "data": {
    "regions": [
      {
        "id": "europe-west",
        "name": "Europe - West",
        "regionName": "EMEA",
        "gpuDevices": [
          {
            "id": "h100-80",
            "name": "H100",
            "manufacturer": "NVIDIA",
            "memoryInfo": {
              "sizeInMiB": 81920
            },
            "pricing": {
              "onDemand": 274
            }
          }
        ]
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
