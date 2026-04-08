# Project / Addons Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Abort backup restore** | `POST /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort-restore` | [abort-backup-restore.md](abort-backup-restore.md) |
| **Abort backup** | `POST /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/abort` | [abort-backup.md](abort-backup.md) |
| **Backup addon** | `POST /v1/projects/{projectId}/addons/{addonId}/backups`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups` | [backup-addon.md](backup-addon.md) |
| **Create addon backup schedule** | `POST /v1/projects/{projectId}/addons/{addonId}/backup-schedules`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backup-schedules` | [create-addon-backup-schedule.md](create-addon-backup-schedule.md) |
| **Create addon** | `POST /v1/projects/{projectId}/addons`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons` | [create-addon.md](create-addon.md) |
| **Delete addon backup schedule** | `DELETE /v1/projects/{projectId}/addons/{addonId}/backup-schedules/{scheduleId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backup-schedules/{scheduleId}` | [delete-addon-backup-schedule.md](delete-addon-backup-schedule.md) |
| **Delete addon backup** | `DELETE /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}` | [delete-addon-backup.md](delete-addon-backup.md) |
| **Delete addon** | `DELETE /v1/projects/{projectId}/addons/{addonId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}` | [delete-addon.md](delete-addon.md) |
| **Get addon backup logs** | `GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/logs` | [get-addon-backup-logs.md](get-addon-backup-logs.md) |
| **Get addon backup schedules** | `GET /v1/projects/{projectId}/addons/{addonId}/backup-schedules`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backup-schedules` | [get-addon-backup-schedules.md](get-addon-backup-schedules.md) |
| **Get addon backup** | `GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}` | [get-addon-backup.md](get-addon-backup.md) |
| **Get addon credentials** | `GET /v1/projects/{projectId}/addons/{addonId}/credentials`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/credentials` | [get-addon-credentials.md](get-addon-credentials.md) |
| **Get addon logs** | `GET /v1/projects/{projectId}/addons/{addonId}/logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/logs` | [get-addon-logs.md](get-addon-logs.md) |
| **Get addon metrics** | `GET /v1/projects/{projectId}/addons/{addonId}/metrics`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/metrics` | [get-addon-metrics.md](get-addon-metrics.md) |
| **Get addon restore logs** | `GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/restores/{restoreId}/logs`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/restores/{restoreId}/logs` | [get-addon-restore-logs.md](get-addon-restore-logs.md) |
| **Get addon version details** | `GET /v1/projects/{projectId}/addons/{addonId}/version`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/version` | [get-addon-version-details.md](get-addon-version-details.md) |
| **Get addon** | `GET /v1/projects/{projectId}/addons/{addonId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}` | [get-addon.md](get-addon.md) |
| **Get backup download link** | `GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/download-link`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/download-link` | [get-backup-download-link.md](get-backup-download-link.md) |
| **Import addon backup** | `POST /v1/projects/{projectId}/addons/{addonId}/import` | [import-addon-backup.md](import-addon-backup.md) |
| **List addon backup restores** | `GET /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/restores`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/restores` | [list-addon-backup-restores.md](list-addon-backup-restores.md) |
| **List addon backups** | `GET /v1/projects/{projectId}/addons/{addonId}/backups`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups` | [list-addon-backups.md](list-addon-backups.md) |
| **List addon containers** | `GET /v1/projects/{projectId}/addons/{addonId}/containers`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/containers` | [list-addon-containers.md](list-addon-containers.md) |
| **List addon restores** | `GET /v1/projects/{projectId}/addons/{addonId}/restores`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/restores` | [list-addon-restores.md](list-addon-restores.md) |
| **List addons** | `GET /v1/projects/{projectId}/addons`<br>`GET /v1/teams/{teamId}/projects/{projectId}/addons` | [list-addons.md](list-addons.md) |
| **Patch addon** | `PATCH /v1/projects/{projectId}/addons/{addonId}`<br>`PATCH /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}` | [patch-addon.md](patch-addon.md) |
| **Pause addon** | `POST /v1/projects/{projectId}/addons/{addonId}/pause`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/pause` | [pause-addon.md](pause-addon.md) |
| **Put addon** | `PUT /v1/projects/{projectId}/addons`<br>`PUT /v1/teams/{teamId}/projects/{projectId}/addons` | [put-addon.md](put-addon.md) |
| **Reset addon** | `POST /v1/projects/{projectId}/addons/{addonId}/reset`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/reset` | [reset-addon.md](reset-addon.md) |
| **Restart addon** | `POST /v1/projects/{projectId}/addons/{addonId}/restart`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/restart` | [restart-addon.md](restart-addon.md) |
| **Restore addon backup** | `POST /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/restore`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/restore` | [restore-addon-backup.md](restore-addon-backup.md) |
| **Resume addon** | `POST /v1/projects/{projectId}/addons/{addonId}/resume`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/resume` | [resume-addon.md](resume-addon.md) |
| **Retain backup** | `POST /v1/projects/{projectId}/addons/{addonId}/backups/{backupId}/retain`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/backups/{backupId}/retain` | [retain-backup.md](retain-backup.md) |
| **Scale addon resources** | `POST /v1/projects/{projectId}/addons/{addonId}/scale`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/scale` | [scale-addon-resources.md](scale-addon-resources.md) |
| **Update addon network settings** | `POST /v1/projects/{projectId}/addons/{addonId}/network-settings`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/network-settings` | [update-addon-network-settings.md](update-addon-network-settings.md) |
| **Update addon security rules** | `POST /v1/projects/{projectId}/addons/{addonId}/security`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/security` | [update-addon-security-rules.md](update-addon-security-rules.md) |
| **Upgrade addon version** | `POST /v1/projects/{projectId}/addons/{addonId}/version`<br>`POST /v1/teams/{teamId}/projects/{projectId}/addons/{addonId}/version` | [upgrade-addon-version.md](upgrade-addon-version.md) |
