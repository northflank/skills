# Forwarding

Source: https://northflank.com/docs/v1/api/forwarding.md

Forwarding on Northflank allows you to access ports on your running workloads without the need to expose them publicly to the internet. Forwarding means you can securely interact with your deployed services, databases, and other addons when developing locally.

You can proxy multiple ports for each service and addon, bind traffic to local IP addresses, and automate local DNS to replicate production endpoints.

A service must be running and have at least [one port configured](project/services/update-service-ports.md). You can access private HTTP, TCP, and UDP ports using forwarding.

Databases and other addons may also be [configured to use TLS](project/addons/update-addon-network-settings.md) for internal and, if enabled, external connections.

[Learn more about networking on Northflank](../guides/network.md#networking-on-northflank).

### Access a service, database, or addon locally using the CLI

You can forward a service, database or other addon for local access using the [Northflank CLI](use-the-cli.md).

You can view and copy the command to connect to a specific resource from the local access section in the application overview, or use the following commands:

- To forward a specific service:

`sudo northflank forward service --projectId [project-name] --serviceId [service-name]`

- To forward a specific database or addon:

`sudo northflank forward addon --projectId [project-name] --addonId [addon-name]`

- To forward all ports in a project:

`sudo northflank forward all --projectId [project-name]`
You can now access the resource locally. If your application requires secrets or connection details from an [addon](../guides/databases-and-persistence.md#connect-database-secrets-to-workloads) or [secret group](../guides/secure.md#inject-secrets), you can add these to a local `.env` file to make them available in your environment.

#### Forward without root privileges

The default forward command must be run with `sudo` in order to write the DNS hostname to the hosts file, which makes your service or addon available locally via the Northflank-generated domain.

If you prefer or need to forward Northflank services and addons without root privileges, you can run the command with the option `--skipHostnames` appended. This will allow you to access the resource locally, but it will only be accessible via the IP address and port returned in the CLI.

![Forwarding a service using the skipHostnames option with the Northflank CLI](https://assets.northflank.com/documentation/v1/api/forwarding/forwarding-skiphostnames.png)

### Forwarding in the JavaScript client

The JavaScript client provides functionality which allows opening port forwarding tunnels programmatically. This makes it possible to temporarily connect to private services and addons from anywhere.

The JS client exposes the `forwarding` module, which is responsible for handling port forwarding functionality. It provides three different methods to make use of port forwarding:

- `apiClient.forwarding.forwardService({ projectId, serviceId })`: forwards ports of the specified service

- `apiClient.forwarding.forwardAddon({ projectId, addonId })`: forwards ports of the specified addon

- `apiClient.forwarding.forwardProject({ projectId })`: forwards ports of all services and addons in the specified project

All three methods return an array of objects providing connection details of the forwarded resource(s). The format is shown below:

```typescript
type PortForwardingResult = {
  data?: {
    type: 'addon' | 'service';
    projectId: string;
    id: string;
    address: string;
    port: number;
    portName?: string;
    protocol?: 'HTTP' | 'TCP' | 'UDP';
    hostnames: string[];
  };
  error?: {
    message: string;
  };
};
```

When the connection is no longer needed, using `apiClient.forwarding.stop()` will close all port tunnels. If you need to close a specific tunnel, you can use one of the following options:

- `apiClient.forwarding.stopServiceForwarding({ serviceId, projectId })`

- `apiClient.forwarding.stopAddonForwarding({ addonId, projectId })`

- `apiClient.forwarding.stopProjectForwarding({ projectId })`

Alternatively, the JS client also provides methods which handle closing the connection automatically by providing the handler function as an argument:

```typescript
apiClient.forwarding.withServiceForwarding({ serviceId, projectId }, async (forwardingInfo) => {
  // Do something with connection details
  console.log(forwardingInfo)
});
```

You can also use

- `apiClient.forwarding.withAddonForwarding()` and

- `apiClient.forwarding.withProjectForwarding()`

#### Including hostnames

By default, a forwarded resource will provide an IP address that you can use to connect to it. If you also require the resources DNS hostname (the same that will be available in the Northflank UI) to use for the connection, the JS client supports this by writing to your hosts file.

For this to work, your code needs to be run with root/admin privileges and the `ipOnly` flag needs to be set to `false` when calling the forward method, for example:

- `apiClient.forwarding.forwardService({ projectId, serviceId }, false)` or

- `apiClient.forwarding.withServiceForwarding({ serviceId, projectId }, async (forwardingInfo) => { ... }, false)`

#### Example

This code snippet gives a basic example of forwarding and connecting to a MySQL addon, performing a query, and then closing the tunnel:

```typescript
const forwardingInfo = await apiClient.forwarding.forwardAddon({
  projectId,
  addonId
});

const connectionConfig = {
  port: forwardingInfo[0].data?.port,
  host: forwardingInfo[0].data?.address,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connection = await mysql.createConnection(connectionConfig);

await connection.connect();

const results = await connection.query("SHOW TABLES;");

await connection.end();

await apiClient.forwarding.stop();
```
