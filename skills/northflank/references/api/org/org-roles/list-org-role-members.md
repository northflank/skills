# List org role members

Source: https://northflank.com/docs/v1/api/org/org-roles/list-org-role-members.md

Gets a list of members assigned to a platform role in the authenticated org.

Required permission: Organisation > Admin > Roles > Read

**Path parameters:**

{object}
- `roleId`: (string) (required) ID of the org role

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.
- `type`: (string) Filter members by how they were added, directly or implicitly via directory group membership. (enum: explicit, implicit)
- `userIds`: (undefined) Filter members by user ID. Specify the parameter multiple times to filter by multiple user IDs.

**Response body:**

{object}
- `data`: {object}
  - `members`: [array of] {object}
     - `id`: (string) (required) ID (username) of the org member. For users who are not finalized this ID may change on finalisation. (pattern: ^[A-Za-z0-9-]+$)
     - `name`: (string) Display name from the member profile.
     - `emails`: [array of] {object}
         - `address`: (string)
         - `verified`: (boolean)
     - `joinedAt`: (string) The time the member joined the org. (format: date-time)
     - `finalized`: (boolean) (required) Whether the account has been fully set up by the user.
     - `type`: (string) (required) How the member was added to the role. `explicit` means manually added; `implicit` means provisioned via Directory Sync. (enum: explicit, implicit)
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/org-roles/{roleId}/members

#### Example Response

200 OK: A list of members in the org role.

```json
{
  "data": {
    "members": [
      {
        "id": "john-doe",
        "name": "John Doe",
        "emails": [
          {
            "address": "john@example.com",
            "verified": true
          }
        ],
        "joinedAt": "2021-01-20T11:19:53.175Z",
        "type": "explicit"
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

$ northflank list org-role-members

Options:

- `--roleId <roleId>`: ID of the org role

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--type <type>`: Filter members by how they were added, directly or implicitly via directory group membership.

- `--userIds <userIds>`: Filter members by user ID. Specify the parameter multiple times to filter by multiple user IDs.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of members in the org role.

```json
{
  "members": [
    {
      "id": "john-doe",
      "name": "John Doe",
      "emails": [
        {
          "address": "john@example.com",
          "verified": true
        }
      ],
      "joinedAt": "2021-01-20T11:19:53.175Z",
      "type": "explicit"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.orgRoleMembers({
  parameters: {
    "roleId": "developer"
  },
  options: {
    "per_page": 50,
    "page": 1,
    "type": "explicit",
    "userIds": "john-doe"
  }
});
```

#### Example Response

 A list of members in the org role.

```json
{
  "data": {
    "members": [
      {
        "id": "john-doe",
        "name": "John Doe",
        "emails": [
          {
            "address": "john@example.com",
            "verified": true
          }
        ],
        "joinedAt": "2021-01-20T11:19:53.175Z",
        "type": "explicit"
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
