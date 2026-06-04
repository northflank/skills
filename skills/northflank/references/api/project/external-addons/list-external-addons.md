# List external addons

Source: https://northflank.com/docs/v1/api/project/external-addons/list-external-addons.md

Gets a list of external addons belonging to the project

Required permission: Project > ExternalAddons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `resourceType`: (string) Filter by resource type (s3, rds)
- `status`: (string) Filter by status (creating, active, error, deleting, deleted)

**Response body:**

{object}
- `data`: {object}
  - `data`: {object}
    - `externalAddons`: [array of] {object}
        - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
        - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
        - `environmentId`: (string)
        - `spec`: {object}
          - `resourceType`: (string) (required) (enum: s3, rds, cloudSql, memorystore)
          - `provider`: {object}
            - `aws`: {object}
              - `region`: (string) (required)
              - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
            - `google`: {object}
              - `project`: (string) (required)
              - `region`: (string)
              - `zone`: (string)
              - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
            - `cloudflare`: {object}
              - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
            - `aiven`: {object}
              - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
            - `backblaze`: {object}
              - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
            - `azure`: {object}
              - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
            - `akamai`: {object}
              - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
          - `config`: {object}
          - `outputs`: {object}
          - `workloadIdentityId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
        - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `pagination`: {object}
      - `page`: (integer) (required) Current page number
      - `perPage`: (integer) (required) Items per page
      - `total`: (integer) (required) Total number of items
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/external-addons

GET /v1/teams/{teamId}/projects/{projectId}/external-addons

#### Example Response

200 OK: A list of external addons belonging to the project.

```json
{
  "data": {
    "data": {
      "externalAddons": [
        {
          "spec": {
            "provider": {
              "aws": {
                "region": "eu-west-1"
              },
              "google": {
                "region": "us-central1",
                "zone": "us-central1-c"
              }
            }
          }
        }
      ]
    }
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list external-addons

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--resourceType <resourceType>`: Filter by resource type (s3, rds)

- `--status <status>`: Filter by status (creating, active, error, deleting, deleted)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of external addons belonging to the project.

```json
{
  "data": {
    "externalAddons": [
      {
        "spec": {
          "provider": {
            "aws": {
              "region": "eu-west-1"
            },
            "google": {
              "region": "us-central1",
              "zone": "us-central1-c"
            }
          }
        }
      }
    ]
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.externalAddons({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "resourceType": "s3",
    "status": "active"
  }
});
```

#### Example Response

 A list of external addons belonging to the project.

```json
{
  "data": {
    "data": {
      "externalAddons": [
        {
          "spec": {
            "provider": {
              "aws": {
                "region": "eu-west-1"
              },
              "google": {
                "region": "us-central1",
                "zone": "us-central1-c"
              }
            }
          }
        }
      ]
    }
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
