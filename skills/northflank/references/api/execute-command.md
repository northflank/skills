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

There are multiple options such as `instance`, `user` and others which allow you to customise how commands are executed. You can view options with the `northflank exec service|job --help` command.

#### Modes

`northflank exec service|job` runs in one of three modes depending on the flags you pass:

- **Interactive shell** — `northflank exec service`. With no `--cmd`, an interactive session with stdin and TTY is opened. If `--shell-cmd` is not set, a list of standard shells is attempted in turn.

- **Single command, no shell** — `northflank exec service --cmd 'date'`. The command is executed directly inside the container without a shell, so shell features like pipes, redirects, globs, and `$VAR` expansion are not available.

- **Single command, custom shell** — `northflank exec service --cmd 'ls -l /usr' --shell-cmd 'bash -c'`. The command is passed to the specified shell, so shell expressions are evaluated.

#### Options

| Option | Description |
| --- | --- |
| `--project`, `--projectId [NAME]` | Project to exec into. |
| `--service`, `--serviceId [NAME]` | Service to exec into. (`--job`, `--jobId` for jobs.) |
| `--instance`, `--instanceName [NAME]` | Instance to exec into. If omitted, a random running instance is chosen. |
| `--cmd`, `--command [COMMAND]` | Command to execute. If `--shell-cmd` is set, the command runs in that shell; otherwise it runs without a shell. If omitted, an interactive session with stdin and TTY is opened. |
| `--shell-cmd [SHELL-CMD]` | Run the command with the given shell (e.g. `bash`, `sh`, `bash -c`). With no `--cmd` and no `--shell-cmd`, the CLI attempts several standard shells. With `--cmd` and no `--shell-cmd`, the command runs without a shell. |
| `--user [USER]` | Run the command as this user (name or uid). |
| `--group [GROUP]` | Run the command with this group (name or gid). |
| `--noDefaults` | Don't use context default values; either set options explicitly or be prompted. |
| `--skipValidation` | Skip client-side validation of input fields. |
| `--verbose` | Verbose output. |
| `--quiet` | No console output. |

#### Execute a command as a specific user

You can execute your command as a specific user within the container by passing the `--user <USER>` option, where `<USER>` is the name or uid of the user to execute the command as.

For example, both the following commands will execute the command `id` as the root user:

```bash
$ northflank exec service --user root --cmd id
uid=0(root) gid=0(root) groups=0(root)
$ northflank exec service --user 0 --cmd id
uid=0(root) gid=0(root) groups=0(root)
```

#### Capturing output in non-interactive environments

`northflank exec service|job --cmd '...'` is designed for an interactive terminal. When stdout is not a TTY — for example in CI pipelines, automation harnesses, coding agents (such as Claude Code, OpenCode, etc), or under `bash -c '...'` — the remote command's stdout and stderr can be silently discarded. Neither `--shell-cmd` nor `--verbose` changes this. If you need to capture output programmatically, allocate a pseudo-TTY using `script(1)`:

```bash
# macOS / BSD
script -q /dev/null northflank exec service --cmd 'ls -lah /workspace'

# Linux (util-linux)
script -qfc 'northflank exec service --cmd "ls -lah /workspace"' /dev/null
```

If you are scripting against Northflank from Node.js, prefer the [JavaScript client's exec API](https://northflank.com/docs/v1/api/execute-command-js-client), which returns stdout and stderr as readable streams without needing a PTY shim.

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
