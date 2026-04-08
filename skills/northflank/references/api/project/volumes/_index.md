# Project / Volumes Endpoints

Generated from the API pages listed in `https://northflank.com/docs/llms.txt`.

## Pages

| Page | API Reference | File |
|------|---------------|------|
| **Attach volume** | `POST /v1/projects/{projectId}/volumes/{volumeId}/attach`<br>`POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/attach` | [attach-volume.md](attach-volume.md) |
| **Backup volume** | `POST /v1/projects/{projectId}/volumes/{volumeId}/backups`<br>`POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups` | [backup-volume.md](backup-volume.md) |
| **Create volume** | `POST /v1/projects/{projectId}/volumes`<br>`POST /v1/teams/{teamId}/projects/{projectId}/volumes` | [create-volume.md](create-volume.md) |
| **Delete volume backup** | `DELETE /v1/projects/{projectId}/volumes/{volumeId}/backups/{backupId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups/{backupId}` | [delete-volume-backup.md](delete-volume-backup.md) |
| **Delete volume** | `DELETE /v1/projects/{projectId}/volumes/{volumeId}`<br>`DELETE /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}` | [delete-volume.md](delete-volume.md) |
| **Detach volume** | `POST /v1/projects/{projectId}/volumes/{volumeId}/detach`<br>`POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/detach` | [detach-volume.md](detach-volume.md) |
| **Get volume backup details** | `GET /v1/projects/{projectId}/volumes/{volumeId}/backups/{backupId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups/{backupId}` | [get-volume-backup-details.md](get-volume-backup-details.md) |
| **Get volume backups** | `GET /v1/projects/{projectId}/volumes/{volumeId}/backups`<br>`GET /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}/backups` | [get-volume-backups.md](get-volume-backups.md) |
| **Get volume** | `GET /v1/projects/{projectId}/volumes/{volumeId}`<br>`GET /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}` | [get-volume.md](get-volume.md) |
| **List volumes** | `GET /v1/projects/{projectId}/volumes`<br>`GET /v1/teams/{teamId}/projects/{projectId}/volumes` | [list-volumes.md](list-volumes.md) |
| **Update volume** | `POST /v1/projects/{projectId}/volumes/{volumeId}`<br>`POST /v1/teams/{teamId}/projects/{projectId}/volumes/{volumeId}` | [update-volume.md](update-volume.md) |
