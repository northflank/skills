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
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `members`: [array of] (required) An array of team members. {object} A team member object.
     - `id`: (string) (required) (nullable) ID (username) of the team member. For users who are not finalized this ID may change on finalisation.
     - `name`: (string) Display name from the member profile.
     - `emails`: [array of] Email addresses of the member. {object}
         - `address`: (string) (required) (format: email)
         - `verified`: (boolean) (required)
     - `joinedAt`: (string) The time the member joined the team. (format: date-time)
     - `lastLoginTime`: (string) The time the member last logged in. (format: date-time)
     - `finalized`: (boolean) Whether the account has been fully set up by the user.
     - `uid`: (string) (required) Permanent UID of the team member. (min length: 24) (max length: 24)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/teams/{teamId}/members

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/teams/{teamId}/members?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/teams/{teamId}/members?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

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
        "lastLoginTime": "2021-01-20T11:19:53.175Z",
        "uid": "68f0aa1b9c4e2d7f11a3b402"
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
      "lastLoginTime": "2021-01-20T11:19:53.175Z",
      "uid": "68f0aa1b9c4e2d7f11a3b402"
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
        "lastLoginTime": "2021-01-20T11:19:53.175Z",
        "uid": "68f0aa1b9c4e2d7f11a3b402"
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

response = client.list.team_members(
    team_id="my-team",
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
        {
          "address": "john@example.com",
          "verified": true
        }
      ],
      "joinedAt": "2021-01-20T11:19:53.175Z",
      "lastLoginTime": "2021-01-20T11:19:53.175Z",
      "uid": "68f0aa1b9c4e2d7f11a3b402"
    }
  ]
}
```
