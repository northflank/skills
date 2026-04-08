# Copy files

Source: https://northflank.com/docs/v1/api/copy-files.md

Northflank allows you to download resources from your running workloads (services or jobs) and upload resources from your local machine to workloads.

File and directory copy is available via the [Northflank CLI](use-the-cli.md) or [JavaScript client](use-the-javascript-client.md) and enables you to copy single files or entire directories.

### Copy files using the CLI

You can easily transfer files and directories using the [Northflank CLI](use-the-cli.md).

- To upload a single file to a running service:

```bash
northflank upload service file --projectId [project-name] --service [service-name] --localPath test.txt --remotePath test-file.txt
```

- To upload a directory to a running service:

```bash
northflank upload service file --projectId [project-name] --service [service-name] --localPath my-directory/ --remotePath /home/my-directory
```

- To download a directory from a running service:

```bash
northflank download service file --projectId [project-name] --service [service-name] --localPath my-directory --remotePath /home/my-directory
```

For jobs, the analog commands can be used: `northflank [download|upload] job file <args>`

> [!note]
> If the target directory does not exist, it will be created.
Some arguments are optional in specific scenarios:

- For downloads, the `--localPath` argument can be omitted. In this case the current working directory from which the CLI is started is used to stored the downloaded files.

- For uploads, the `--remotePath` argument can be omitted. In this case the default home directory of the container user is used to stored the downloaded files.

Refer to the command help for a full view of all allowed CLI arguments:

`northflank upload service file --help`

### Copy files with the JavaScript client

The [JavaScript client](use-the-javascript-client.md) provides functionality which allows copying file and directories programmatically.
To copy files, the JS client exposes upload and download modules which expect a localPath and a remotePath:

```js
const res = await apiClient.upload.service.files({ projectId, serviceId }, { localPath, remotePath, });
```

```js
const res = await apiClient.download.service.files({ projectId, serviceId }, { localPath, remotePath, });
```

Both commands can be used for services and jobs.
