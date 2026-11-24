# List regions

Source: https://northflank.com/docs/v1/api/miscellaneous/miscellaneous/list-regions.md

Lists available project regions

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `regions`: [array of] (required) An array of regions {object} A region object
     - `id`: (string) (required) The ID of the region.
     - `name`: (string) (required) The name of the region.
     - `regionName`: (string) (required) The name of the group this region belongs to.
     - `provider`: {object}
       - `id`: (string) (required)
       - `region`: (string) (required)
     - `gpuDevices`: [array of] (required) The list of GPUs available in this region. {object}
         - `id`: (string) (required) The ID of the GPU device.
         - `name`: (string) (required) The name of the GPU device.
         - `manufacturer`: (string) (required) The manufacturer of the GPU.
         - `memoryInfo`: {object}
           - `sizeInMiB`: (number) (required) The size of the GPU memory in MiB. (format: float)
         - `countOptions`: [array of] (required) The list of available configurations for GPU count. (number) (format: float)
         - `pricing`: {object} (required)
           - `onDemand`: (number) (required) The price per hour for on-demand usage, in US¢. (format: float)

### API reference

GET /v1/regions

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/regions"
```

```python
import requests

url = "https://api.northflank.com/v1/regions"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

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
            "countOptions": [
              1,
              2,
              4,
              8
            ],
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
          "countOptions": [
            1,
            2,
            4,
            8
          ],
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
            "countOptions": [
              1,
              2,
              4,
              8
            ],
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.regions()
print(response.data)
```

#### Example Response

 Example value of response.data:

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
          "countOptions": [
            1,
            2,
            4,
            8
          ],
          "pricing": {
            "onDemand": 274
          }
        }
      ]
    }
  ]
}
```
