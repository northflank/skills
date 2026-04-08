# List provider regions

Source: https://northflank.com/docs/v1/api/org/cloud-providers/list-provider-regions.md

Lists supported cloud provider regions

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `provider`: (string) If provided, only returns items belonging to this cloud provider.

**Response body:**

{object}
- `data`: {object}
  - `providers`: [array of] {object}
     - `id`: (string) (required) The ID of the region
     - `name`: (string) (required) The name of the region
     - `availabilityZones`: [array of] {object}
         - `id`: (string) (required) The id of the availability zone
         - `name`: (string) (required) The name of the availability zone

### API reference

GET /v1/cloud-providers/regions

#### Example Response

200 OK: A list of supported cloud provider regions.

```json
{
  "data": {
    "providers": [
      {
        "id": "europe-west1",
        "name": "europe-west1",
        "availabilityZones": [
          {
            "id": "europe-west1-b",
            "name": "europe-west1-b"
          }
        ]
      }
    ]
  }
}
```

### CLI reference

$ northflank list cloud regions

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--provider <provider>`: If provided, only returns items belonging to this cloud provider.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of supported cloud provider regions.

```json
{
  "providers": [
    {
      "id": "europe-west1",
      "name": "europe-west1",
      "availabilityZones": [
        {
          "id": "europe-west1-b",
          "name": "europe-west1-b"
        }
      ]
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.cloud.regions({
  options: {
    "per_page": 50,
    "page": 1,
    "provider": "gcp"
  }
});
```

#### Example Response

 A list of supported cloud provider regions.

```json
{
  "data": {
    "providers": [
      {
        "id": "europe-west1",
        "name": "europe-west1",
        "availabilityZones": [
          {
            "id": "europe-west1-b",
            "name": "europe-west1-b"
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
