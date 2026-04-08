# Execute commands

Source: https://northflank.com/docs/v1/api/execute-command.md

You can execute commands within your service or job containers using the CLI, JavaScript client, or via the [Northflank application](../guides/run.md#access-running-containers-locally-execute-commands-in-a-container).

Executing a command will normally spawn a new shell process inside the container, giving you SSH-like access to the filesystem, environment, and processes. You can explicitly specify if no shell is needed when executing a command.

You can only access the shell and execute commands on a running service or job. You can specify the container to access, otherwise a running container will be selected at random.

Your commands will be executed in the container by the user specified in the Dockerfile used to build the image. If the Dockerfile does not specify a user, this will be the user set by the parent image (for example `root` for Alpine Linux). You can specify the default user in the Dockerfile with the `USER` instruction, for example `USER northflank`.

### Execute a command using the CLI

You can use `northflank exec`  to run commands within your service and job containers via the CLI.

`northflank exec service|job` will let you select your project and service or job dynamically and then start a shell session directly in your container, similar to an SSH connection.

A command can also be specified directly which allows you to run a command without a shell:

`northflank exec service|job --cmd "ls -lah"`

There are multiple options such as `instance`, `user` and others which allows you to customise how commands are executed. You can view options with the `northflank exec service|job --help` command.

> Note: `northflank exec service|job --cmd "..."` silently discards stdout/stderr when there's no TTY attached (CI runners, agent harnesses, anything wrapped in `bash -c`). Neither `--shell-cmd` nor `--verbose` changes this. To capture output non-interactively, wrap the call in `script -q /dev/null northflank exec service|job ...` on macOS/BSD or `script -qfc 'northflank exec service|job ...' /dev/null` on Linux.

#### Execute a command as a specific user

You can execute your command as a specific user within the container by passing the `--user <USER>` option, where `<USER>` is the name or uid of the user to execute the command as.

For example, both the following commands will execute the command `id` as the root user:

```bash
$ northflank exec service --user root --cmd id
uid=0(root) gid=0(root) groups=0(root)
$ northflank exec service --user 0 --cmd id
uid=0(root) gid=0(root) groups=0(root)
```

### Execute a command using the JavaScript client

You can directly execute commands in your Northflank services and jobs with the JavaScript client.

The client exposes the `exec` module, which provides functionality to run commands.

#### Simple, short-lived command

You can run simple, short-lived commands which do not print a continuous stream of data with the following methods.

Execute a command in a service:

```js
apiClient.exec.execServiceCommand({ projectId, serviceId }, { command: ['ls', '-lah'] })
```

Execute a command in a job:

```js
apiClient.exec.execJobCommand({ projectId, jobId }, { command: ['ls', '-lah'] })
```

##### Options

- command
  string | string[] requiredCommand to be run
- containerName
  string Container to run the command in. If not specified, a random container is used.
- shell
  string Run command in shell (e.g. `bash -c`). If not specified, several shells are attempted.
- user
  string | number Run command with specific user. If not specified, default user from image is used.
- group
  string | number Run command with specific group. If not specified, default group from image is used.

Both methods return a promise with the result of the command in the format:

```js
Promise<{
    commandResult: {
        exitCode: number;
        status: 'Success' | 'Failure' | 'Unknown';
        message?: string;
    };
    stdOut: string;
    stdErr: string;
}>
```

##### Execute a short-lived command as a specific user

You can execute your command as a specific user within the container by passing the `user` option, where the value is the name or uid of the user to execute the command as.

For example, both the following commands will execute the command `id` as the root user:

```javascript
apiClient.exec.execServiceCommand({ projectId, serviceId }, { command: 'id', user: 'root' })
apiClient.exec.execServiceCommand({ projectId, serviceId }, { command: 'id', user: 0 })
```

#### Complex, long-running commands

You can execute long-running commands which print a continuous stream of data with the following methods, where options is a non-required object that can pass the arguments listed below.

Create an execute command session in a service:

```js
await exec.execServiceSession({ projectId, serviceId }, { options });
```

Create an execute command session in a job:

```js
await exec.execJobSession({ projectId, jobId }, { options });
```

##### Options

- command
  string | string[] Command to be run
- containerName
  string Container to run the command in. If not specified, a random container is used.
- shell
  string Run command in shell (e.g. `bash -c`). If not specified, several shells are attempted.
- user
  string | number Run command with specific user. If not specified, default user from image is used.
- group
  string | number Run command with specific group. If not specified, default group from image is used.
- ttyRows
  number TTY height in number of rows.
- ttyColumns
  number TTY width in number of columns.

Session commands return a Promise of the ExecCommand class. This exposes a number of powerful functionalities to interact with the running command: `Promise<ExecCommandStandard>`.

You can write to and receive data from NodeJS-compatible streams for standard input, standard output and standard error.

For example:

```js
const execCommand = await exec.execServiceSession({ projectId: 'myproject', serviceId: 'myservice' });

execCommand.stdErr.on('data', (chunk) => console.log(chunk));
// Locally logs chunks of data from your remote service to the console

execCommand.stdIn.write('echo "hello world"');
// Executes on your remote service and prints 'hello world'
```

To wait for command completion, run `await execCommand.waitForCommandResult());`. This will return a command result with `exitCode` and `status`, similar to `execServiceCommand` .

##### Execute a long-running command as a specific user

You can create a command session as a specific user within the container by passing the `user` option, where the value is the name or uid of the user to execute the command as. Any commands passed to the write stream will be executed as the user.

For example, both the following will execute any commands written to the stream as the root user:

```javascript
const execCommand = await exec.execServiceSession({ projectId, serviceId }, { user: 'root' });
const execCommand = await exec.execServiceSession({ projectId, serviceId }, { user: 0 });
```
