# List directory group members

Source: https://northflank.com/docs/v1/api/org/org-roles/list-directory-group-members.md

Lists the users who are members of the org via a specific Directory Sync group.

Required permission: Organisation > Admin > Members > Read

**Path parameters:**

{object}
- `groupId`: (string) (required) ID of the directory group

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `members`: [array of] {object}
     - `id`: (string) (required) ID (username) of the directory member.
     - `name`: (string) Display name from the member profile.
     - `emails`: [array of] (string) (format: email)
     - `lastLoginTime`: (string) The time the member last logged in. (format: date-time)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/directory-groups/{groupId}/members

#### Example Response

200 OK: A list of members in the directory group.

```json
{
  "data": {
    "members": [
      {
        "id": "john-doe",
        "name": "John Doe",
        "lastLoginTime": "2021-01-20T11:19:53.175Z"
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

$ northflank list org-directory-group-members

Options:

- `--groupId <groupId>`: ID of the directory group

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of members in the directory group.

```json
{
  "members": [
    {
      "id": "john-doe",
      "name": "John Doe",
      "lastLoginTime": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.orgDirectoryGroupMembers({
  parameters: {
    "groupId": "directory_group_1234567890ABCDEFGHIJKLMNOP"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of members in the directory group.

```json
{
  "data": {
    "members": [
      {
        "id": "john-doe",
        "name": "John Doe",
        "lastLoginTime": "2021-01-20T11:19:53.175Z"
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

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.org_directory_group_members(
    group_id="directory_group_1234567890ABCDEFGHIJKLMNOP",
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "members": [
    {
      "id": "john-doe",
      "name": "John Doe",
      "emails": [
        "john@example.com"
      ],
      "lastLoginTime": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```
