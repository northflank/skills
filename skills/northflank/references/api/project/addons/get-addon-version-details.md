# Get addon version details

Source: https://northflank.com/docs/v1/api/project/addons/get-addon-version-details.md

Gets details about the current addon version including available upgrades and upgrade history.

Required permission: Project > Addons > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `addonId`: (string) (required) ID of the addon

**Response body:**

{object}
- `data`: {object}
  - `version`: (string) (required) The version of the addon running.
  - `upgradeTo`: [array of] {object}
     - `version`: (string) (required) The version of the addon to upgrade to.
     - `type`: (string) (required) Whether the version is a major or minor version. (enum: major, minor, patch)
  - `lifecycleStatus`: (string) (required) The support status of the current addon version. (enum: active, deprecated, discontinued)
  - `discontinuedBy`: (string) The date that the current addon version will be discontinued.
  - `upgradeHistory`: [array of] {object}
     - `upgradeId`: (string) (required) The unique identifier of the addon upgrade.
     - `status`: {object}
       - `status`: (string) (required) The status of the addon upgrade. (enum: scheduled, in-progress, completed, aborting, aborted, failed, not-supported)
     - `createdAt`: (string) (required) The time the upgrade was initiated. (format: date-time)
     - `upgradeType`: (string) (required) Whether the version updated to is a major or minor version. (enum: major, minor, patch)
     - `previousVersion`: (string) (required) The version upgraded from.
     - `newVersion`: (string) (required) The version upgraded to.
     - `completedAt`: (string) The time the upgrade was completed. (format: date-time)

### API reference

GET /v1/projects/{projectId}/addons/{addonId}/version

GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/version

#### Example Response

200 OK: Details about the current version of the addon.

```json
{
  "data": {
    "version": "4.2.14",
    "upgradeTo": [
      {
        "version": "4.2.15",
        "type": "minor"
      }
    ],
    "lifecycleStatus": "deprecated",
    "discontinuedBy": "01.08.2021",
    "upgradeHistory": [
      {
        "upgradeId": "611d0da52cd838bbdeec4792",
        "status": {
          "status": "completed"
        },
        "createdAt": "2021-08-18 13:39:49.475Z",
        "upgradeType": "minor",
        "previousVersion": "4.2.14",
        "newVersion": "4.2.15",
        "completedAt": "2021-08-18T13:40:51.685Z"
      }
    ]
  }
}
```

### CLI reference

$ northflank get addon version

Options:

- `--projectId <projectId>`: ID of the project

- `--addonId <addonId>`: ID of the addon

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the current version of the addon.

```json
{
  "version": "4.2.14",
  "upgradeTo": [
    {
      "version": "4.2.15",
      "type": "minor"
    }
  ],
  "lifecycleStatus": "deprecated",
  "discontinuedBy": "01.08.2021",
  "upgradeHistory": [
    {
      "upgradeId": "611d0da52cd838bbdeec4792",
      "status": {
        "status": "completed"
      },
      "createdAt": "2021-08-18 13:39:49.475Z",
      "upgradeType": "minor",
      "previousVersion": "4.2.14",
      "newVersion": "4.2.15",
      "completedAt": "2021-08-18T13:40:51.685Z"
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.addon.version({
  parameters: {
    "projectId": "default-project",
    "addonId": "example-addon"
  }
});
```

#### Example Response

 Details about the current version of the addon.

```json
{
  "data": {
    "version": "4.2.14",
    "upgradeTo": [
      {
        "version": "4.2.15",
        "type": "minor"
      }
    ],
    "lifecycleStatus": "deprecated",
    "discontinuedBy": "01.08.2021",
    "upgradeHistory": [
      {
        "upgradeId": "611d0da52cd838bbdeec4792",
        "status": {
          "status": "completed"
        },
        "createdAt": "2021-08-18 13:39:49.475Z",
        "upgradeType": "minor",
        "previousVersion": "4.2.14",
        "newVersion": "4.2.15",
        "completedAt": "2021-08-18T13:40:51.685Z"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
