# List backup destinations

Source: https://northflank.com/docs/v1/api/team/backup-destinations/list-backup-destinations.md

Lists the backup destinations saved to this account. Does not display secrets.

Required permission: Account > Platform > BackupDestinations > Read

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object}
- `data`: {object}
  - `backupDestinations`: [array of] {object}
     - `name`: (string) (required) The name of the backup destination. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
     - `type`: (string) (required) Type of the backup destination. (enum: s3)
     - `usage`: (string) (required) The backup workload that can use this destination. (enum: globalBackups, containerSnapshots)
     - `prefix`: (string) (required) A prefix path to add to the bucket objects if not writing to / (pattern: ^([a-zA-Z0-9-_]+)\/$)
     - `credentials`: {object}
       - `authMode`: (string) Whether the destination authenticates with static AWS credentials or a workload identity. (enum: staticCreds, workloadIdentity)
       - `workloadIdentityId`: (multiple options) (string) ID of the workload identity used to authenticate with the S3 destination. | (string) ID of the workload identity used to authenticate with the S3 destination.
       - `accessKey`: (multiple options) (string) Access key used to authenticate with the S3 destination.
       - `secretKey`: (multiple options) (string) Secret key used to authenticate with the S3 destination.
       - `bucketName`: (string) (required)
       - `region`: (string) (required)
       - `endpoint`: (string) (required) S3 destination including region, fe s3.us-west-2.amazonaws.com
       - `enableObjectLock`: (boolean) Enable S3 Object Lock (WORM) for this destination. Immutable after creation. Bucket must have Object Lock enabled.
       - `objectLockRetentionDays`: (integer) Retention period in days for object-locked blobs. Required if enableObjectLock is true. Immutable after creation.
- `pagination`: {object}
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/backup-destinations

GET /v1/teams/{teamId}/backup-destinations

#### Example Response

200 OK: A list of backup destination saved to this account.

```json
{
  "data": {
    "backupDestinations": [
      {
        "name": "Example Backup Destination"
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

$ northflank list backup-destinations

Options:

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of backup destination saved to this account.

```json
{
  "backupDestinations": [
    {
      "name": "Example Backup Destination"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.backupDestinations({
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of backup destination saved to this account.

```json
{
  "data": {
    "backupDestinations": [
      {
        "name": "Example Backup Destination"
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

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.backup_destinations(
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "backupDestinations": [
    {
      "name": "Example Backup Destination",
      "type": "s3",
      "usage": "globalBackups",
      "prefix": "example/",
      "credentials": {
        "bucketName": "string",
        "region": "string",
        "endpoint": "string"
      }
    }
  ]
}
```
