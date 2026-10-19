# Get addon credentials

Source: https://northflank.com/docs/v1/api/project/addons/get-addon-credentials.md

Returns the credentials for connecting to the given addon.

Required permission: Project > Addons > General > Read Spec

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Response body:**

{object}
- `data`: {object}
  - `secrets`: {object}
  - `envs`: {object}

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/credentials

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/credentials

#### Example Response

200 OK: Credentials for the addon.

```json
{
  "data": {
    "secrets": {
      "username": "1720747439245d49",
      "password": "f1ba286ee2465e80b0fd4af31276f3e33a"
    },
    "envs": {}
  }
}
```

### CLI reference

$ northflank get addon credentials

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Credentials for the addon.

```json
{
  "secrets": {
    "username": "1720747439245d49",
    "password": "f1ba286ee2465e80b0fd4af31276f3e33a"
  },
  "envs": {}
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.addon.credentials({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  }
});
```

#### Example Response

 Credentials for the addon.

```json
{
  "data": {
    "secrets": {
      "username": "1720747439245d49",
      "password": "f1ba286ee2465e80b0fd4af31276f3e33a"
    },
    "envs": {}
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

response = client.get.addon.credentials(
    addon_id="example-addon",
    project_id="default-project",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "secrets": {
    "username": "1720747439245d49",
    "password": "f1ba286ee2465e80b0fd4af31276f3e33a"
  },
  "envs": {}
}
```
