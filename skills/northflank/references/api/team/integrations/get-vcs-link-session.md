# Get VCS link session

Source: https://northflank.com/docs/v1/api/team/integrations/get-vcs-link-session.md

Gets the status of a version control link session, for polling until completion.

Required permission: Account > Git > General > Manage

**Path parameters:**

{object}
- `linkSessionId`: (string) (required) ID of the version control link session

**Response body:**

{object}
- `data`: {object}
  - `status`: (string) (required) Current status of the link session. (enum: pending, completed, failed)
  - `vcsLinkId`: (string) ID of the created version control link. Present when `status` is `completed`.
  - `error`: (string) Reason the link failed. Present when `status` is `failed`.

### API reference

GET /v1/integrations/vcs/link-sessions/{linkSessionId}

GET /v1/teams/{teamId}/integrations/vcs/link-sessions/{linkSessionId}

#### Example Response

200 OK: The status of the link session.

```json
{
  "data": {
    "status": "pending",
    "vcsLinkId": "63ebb6ce2ccc6c7affdbf253",
    "error": "Failed to link version control account"
  }
}
```

### CLI reference

Looks like you aren‘t able to do that through the CLI yet.

### JavaScript client reference

Looks like you aren‘t able to do that through the JavaScript client yet.
