# Get external addon

Source: https://northflank.com/docs/v1/api/project/external-addons/get-external-addon.md

Gets information about the given external addon

Required permission: Project > ExternalAddons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `externalAddonId`: (string) (required) ID of the external addon

**Response body:**

{object}
- `data`: {object}
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
      - `planetscale`: {object}
        - `integrationId`: (string) (required) Integration to use for this job. (pattern: ^((org|team)\/)?[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
    - `config`: {object}
    - `outputs`: {object}
    - `workloadIdentityId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `name`: (string) (required) (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)

### API reference

GET /v1/projects/{projectId}/external-addons/{externalAddonId}

GET /v1/teams/{teamId}/projects/{projectId}/external-addons/{externalAddonId}

#### Example Response

200 OK: Details about the external addon.

```json
{
  "data": {
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
}
```

### CLI reference

$ northflank get external-addon

Options:

- `--projectId <projectId>`: ID of the project

- `--externalAddonId <externalAddonId>`: ID of the external addon

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the external addon.

```json
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
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.externalAddon({
  parameters: {
    "projectId": "default-project",
    "externalAddonId": "my-s3-bucket"
  }
});
```

#### Example Response

 Details about the external addon.

```json
{
  "data": {
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

response = client.get.external_addon(
    external_addon_id="my-s3-bucket",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "spec": {
    "provider": {
      "aws": {
        "region": "eu-west-1",
        "integrationId": "string"
      },
      "google": {
        "region": "us-central1",
        "zone": "us-central1-c",
        "project": "string",
        "integrationId": "string"
      }
    },
    "resourceType": "s3",
    "config": {}
  },
  "name": "string"
}
```
