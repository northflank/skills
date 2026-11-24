# Get backup destination

Source: https://northflank.com/docs/v1/api/team/backup-destinations/get-backup-destination.md

View a backup destination, including secrets.

Required permission: Account > Platform > BackupDestinations > Read

**Path parameters:**

{object}
- `backupDestinationId`: (string) (required) ID of the backup destination

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `name`: (string) (required) The name of the backup destination. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `type`: (string) (required) Type of the backup destination. (enum: s3)
  - `usage`: (string) (required) The backup workload that can use this destination. (enum: globalBackups, containerSnapshots)
  - `prefix`: (string) (required) A prefix path to add to the bucket objects if not writing to / (pattern: ^([a-zA-Z0-9-_]+)\/$)
  - `credentials`: {object} (required) Credentials used for the backup destination.
    - `authMode`: (string) Whether the destination authenticates with static AWS credentials or a workload identity. (enum: staticCreds, workloadIdentity)
    - `workloadIdentityId`: (multiple options) ID of the workload identity used to authenticate with the S3 destination. (string) ID of the workload identity used to authenticate with the S3 destination. | (string) ID of the workload identity used to authenticate with the S3 destination.
    - `accessKey`: (multiple options) Access key used to authenticate with the S3 destination. (string) Access key used to authenticate with the S3 destination.
    - `secretKey`: (multiple options) Secret key used to authenticate with the S3 destination. (string) Secret key used to authenticate with the S3 destination.
    - `bucketName`: (string) (required)
    - `region`: (string) (required)
    - `endpoint`: (string) (required) S3 destination including region, fe s3.us-west-2.amazonaws.com
    - `enableObjectLock`: (boolean) Enable S3 Object Lock (WORM) for this destination. Immutable after creation. Bucket must have Object Lock enabled.
    - `objectLockRetentionDays`: (integer) Retention period in days for object-locked blobs. Required if enableObjectLock is true. Immutable after creation.
  - `id`: (string) (required) Identifier for the backup destination
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

GET /v1/backup-destinations/{backupDestinationId}

GET /v1/teams/{teamId}/backup-destinations/{backupDestinationId}

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/backup-destinations/{backupDestinationId}"
```

```python
import requests

url = "https://api.northflank.com/v1/backup-destinations/{backupDestinationId}"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: Details of the backup destination.

```json
{
  "data": {
    "name": "Example Backup Destination",
    "id": "example-backup-destination",
    "type": "s3",
    "usage": "globalBackups",
    "prefix": "example/",
    "credentials": {
      "bucketName": "string",
      "region": "string",
      "endpoint": "string"
    }
  }
}
```

### CLI reference

$ northflank get backup-destination

Options:

- `--backupDestinationId <backupDestinationId>`: ID of the backup destination

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details of the backup destination.

```json
{
  "name": "Example Backup Destination",
  "id": "example-backup-destination",
  "type": "s3",
  "usage": "globalBackups",
  "prefix": "example/",
  "credentials": {
    "bucketName": "string",
    "region": "string",
    "endpoint": "string"
  }
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.get.backupDestination({
  parameters: {
    "backupDestinationId": "example-destination"
  }
});
```

#### Example Response

 Details of the backup destination.

```json
{
  "data": {
    "name": "Example Backup Destination",
    "id": "example-backup-destination",
    "type": "s3",
    "usage": "globalBackups",
    "prefix": "example/",
    "credentials": {
      "bucketName": "string",
      "region": "string",
      "endpoint": "string"
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

response = client.get.backup_destination(
    backup_destination_id="example-destination",
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "name": "Example Backup Destination",
  "id": "example-backup-destination",
  "type": "s3",
  "usage": "globalBackups",
  "prefix": "example/",
  "credentials": {
    "bucketName": "string",
    "region": "string",
    "endpoint": "string"
  }
}
```
