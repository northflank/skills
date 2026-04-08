# List templates

Source: https://northflank.com/docs/v1/api/team/templates/list-templates.md

Get a list of templates

Required permission: Account > Templates > General > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `templates`: [array of] {object}
     - `name`: (string) (required) Name of the template. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) Description of the template. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `apiVersion`: (string) (required) The version of the Northflank API to run the template against. (enum: v1.2)
     - `options`: {object}
       - `autorun`: (boolean) If true, the template will run automatically whenever a change is made to it.
       - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
     - `id`: (string) (required) Identifier for the template
     - `concurrencyPolicy`: (string) Defines the concurrency behaviour of the template with respect to parallel runs. (enum: allow, queue, forbid, latest, replace)
     - `createdAt`: (string) time of creation (format: date-time)
     - `updatedAt`: (string) time of update (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/templates

GET /v1/teams/{teamId}/templates

#### Example Response

200 OK: A list of templates.

```json
{
  "data": {
    "templates": [
      {
        "name": "Example Template",
        "description": "This is a sample template.",
        "apiVersion": "v1.2",
        "options": {
          "autorun": false,
          "concurrencyPolicy": "allow"
        },
        "id": "example-template",
        "concurrencyPolicy": "allow"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list templates

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of templates.

```json
{
  "templates": [
    {
      "name": "Example Template",
      "description": "This is a sample template.",
      "apiVersion": "v1.2",
      "options": {
        "autorun": false,
        "concurrencyPolicy": "allow"
      },
      "id": "example-template",
      "concurrencyPolicy": "allow"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.templates({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of templates.

```json
{
  "data": {
    "templates": [
      {
        "name": "Example Template",
        "description": "This is a sample template.",
        "apiVersion": "v1.2",
        "options": {
          "autorun": false,
          "concurrencyPolicy": "allow"
        },
        "id": "example-template",
        "concurrencyPolicy": "allow"
      }
    ]
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
