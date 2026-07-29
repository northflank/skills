# List team members

Source: https://northflank.com/docs/v1/api/team/team-members/list-team-members.md

Gets a list of members belonging to a team.

Required permission: Account > Admin > Members > Read

**Path parameters:**

{object}
- `teamId`: (string) (required) ID of the team

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page.

**Response body:**

{object}
- `data`: {object}
  - `members`: [array of] {object}
     - `id`: (string) (required) ID (username) of the team member. For users who are not finalized this ID may change on finalisation.
     - `name`: (string) Display name from the member profile.
     - `emails`: [array of] {object}
         - `address`: (string) (required) (format: email)
         - `verified`: (boolean) (required)
     - `joinedAt`: (string) The time the member joined the team. (format: date-time)
     - `lastLoginTime`: (string) The time the member last logged in. (format: date-time)
     - `finalized`: (boolean) Whether the account has been fully set up by the user.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/teams/{teamId}/members

#### Example Response

200 OK: A list of members in the team.

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

$ northflank list team-members

Options:

- `--teamId <teamId>`: ID of the team

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of members in the team.

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
      "lastLoginTime": "2021-01-20T11:19:53.175Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.list.teamMembers({
  parameters: {
    "teamId": "my-team"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of members in the team.

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
