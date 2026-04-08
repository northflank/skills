# Observe

Generated from 10 application pages listed in `llms.txt`.

## Pages

- [Audit logs](#audit-logs)
- [Configure health checks](#configure-health-checks)
- [Configure log sinks](#configure-log-sinks)
- [Configure notification integrations](#configure-notification-integrations)
- [Monitor containers](#monitor-containers)
- [Observability on Northflank](#observability-on-northflank)
- [See builds](#see-builds)
- [Set infrastructure alerts](#set-infrastructure-alerts)
- [View logs](#view-logs)
- [View metrics](#view-metrics)

## Audit logs

Source: https://northflank.com/docs/v1/application/observe/audit-logs.md

Audit logs provide a record of events on your Northflank teams and organisation. They provide accountability and transparency, can help you identify issues with your workflow, and enable you to verify that actions were taken by the correct entities.

### Audit logs: Log content

The audit log contains a live feed of all events, according to the [scope](observe.md#audit-logs-log-scopes) of the log, which can also be [filtered](observe.md#audit-logs-filter-log).

Each log contains the [type of event](observe.md#audit-logs-event-types), the user that triggered it, the [event source](observe.md#audit-logs-event-sources), a timestamp, and any parent events. Differences are shown in individual event logs.

You can click a log to view it in more detail, or select the event, user, or source to filter by that value.

#### Audit logs: Affected resources

Events will list any resources affected by the event.

If the event changed the configuration of a resource the difference will be shown in code as the [template specification](infrastructure-as-code.md#write-a-template) for that resource, showing the previous and the updated states.

#### Audit logs: Child and parent events

An event log may contain a parent event. This allows you to trace the chain of triggers that caused the event.

Similarly, a log may have one or more child events, these are events triggered by this event.

For example, a `template.run` event may have the child events `projects.put` and `services.put` if the template run creates a project and service. Both `projects.put` and `services.put` will have the `template.run` event as a parent event.

### Audit logs: Event types

Event types are defined by their Northflank method, organised by resource type and method. For example, `services.create` is recorded for the creation of a service, and `services.update.secrets` when a service's secrets are updated.

Many events relate directly to those [exposed by the Northflank API](../api/introduction.md), while others relate to Northflank system methods that are only available through the Northflank application, or triggered by the Northflank system.

### Audit logs: Event triggers and origins

Events are recorded when:

- a member of the team or organisation performs an action on Northflank, such as scaling a service, running a template, or editing an RBAC role

- the Northflank system performs an action related to your resources, team, or organisation, such as running a scheduled backup for an addon or regenerating a subdomain's certificate

- an event on a Git service triggers an action via webhook, such as running a release flow or updating a template with GitOps enabled

Indirectly triggered events will show the parent event that caused them. A deployment in a job with CD enabled, triggered by a new build, will display the build as the parent event. If the job is configured to run when a new image is deployed, the job run event will show both the build and deployment as parent events.

Events from the follow origins are recorded in the audit log:

- Northflank UI

- Northflank API/CLI

- Template runs

- Release flow template runs

- Preview environment template runs

- Version control

- Northflank system

### Audit logs: Log scopes

Audit logs are available, in descending order of scope, for the following:

#### Audit logs: Organisation audit log

You can access the audit log for an organisation from the organisation menu. It will display events from all teams in the organisation, as well as organisation events.

#### Audit logs: Team audit log

You can access the audit log for a team from the team menu. It will display events from all projects in the team, as well as team events.

#### Audit logs: Project audit log

You can access the audit log for a project from the project header. It will display events from all resources in the project, as well as project events.

#### Audit logs: Resource audit log

You can access the audit log for a resource from the resource menu. It will display all events affecting the resource.

Resource audit logs are available for services, job, and addons.

### Audit logs: Filter log

You can filter audit logs by the following criteria:

| Filter | Function |
| --- | --- |
| After | Show events created after a certain date and time |
| Before | Show events created before a certain date and time |
| Event type | Filter events by [type of event](observe.md#audit-logs-event-types) |
| Trigger | Filter events based on [what triggered them](observe.md#audit-logs-event-triggers-and-origins): user, Git, or Northflank system |
| User | Show events triggered by the selected user |
| Origin | Filter events by [event origin](observe.md#audit-logs-event-triggers-and-origins) |
| Team | Show events triggered by selected team |
| Project | Filter events by project |
| Resource type | Filter events by selected resource type |
| Resource ID | Filter events by given resource ID |

The project filter is only available on organisation and team audit logs, while resource type, and resource ID filters are only available on organisation, team, and project audit logs.

### Audit logs: Next steps

- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Expose a deployment's port: Configure ports and security for your deployments.](network.md#configure-ports)

## Configure health checks

Source: https://northflank.com/docs/v1/application/observe/configure-health-checks.md

Health checks allow you to configure tests to ensure maximum availability of your services. These health checks can be configured so that incoming traffic is only routed to available and healthy containers, and that containers which fail health checks are automatically terminated and restarted.

Without configured health checks Northflank will still try to warn about containers with failing processes, but as long as the container is able to run it will not be automatically restarted if there is an issue. You must ensure that your health checks are correctly configured for the code you are deploying, as incorrectly configured health checks may stop containers from receiving traffic, or terminate containers before they have a chance to become healthy, rendering your service unavailable.

The code deployed to your service or job must be [configured to respond on the path](observe.md#configure-health-checks-set-up-a-probe-endpoint), or successfully run the given command, set in the health check.

Health checks can be viewed and added on the health checks page of any service or job, excluding build services. Addons have pre-configured health checks.

![Creating a readiness probe for a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/configure-health-checks/readiness-probe.png)

### Configure health checks: Types of health check

You can configure up to three health checks for a service or job, one of each probe type. You may only require one probe, or you may need to configure a combination of probes to ensure your containers are tested properly.

##### Configure health checks: Liveness probe

A liveness probe will regularly test a given endpoint of a service, or run the specified command, to make sure a container is available and healthy. If the check fails the container will be marked for termination and a new container will be initialised.

##### Configure health checks: Readiness probe

You can add a readiness probe to test if a container is ready to receive traffic. Network requests will not be sent to the container until the check passes and the probe will continue to run throughout the life of the container. If it fails at any point, the container will be removed from the load balancer and no longer serve traffic, avoiding dropped requests.

##### Configure health checks: Startup probe

Startup probes delay any configured readiness and liveness probes until the startup probe succeeds. You can configure a startup probe for applications that take a long time to become ready after the container is started, or that have a varying startup time. Startup probes enable you to use a different endpoint or command, and different initial delays from your other probes, and can help you create efficient health checks to test your containers at the right times, so failing containers can be replaced as soon as possible. If the check fails the container will be marked for termination and a new container will be initialised.

### Configure health checks: Health check protocols

Probes can either check a HTTP endpoint, a TCP endpoint, or run a command in the container.

The protocol you should use depends on the service or application you want to test. For example, you may want to configure a HTTP probe for a web application, and a TCP or CMD probe for a microservice that doesn't serve HTTP requests.

##### Configure health checks: HTTP

HTTP probes will send a GET request which passes if the response has a status code greater than or equal to 200 and less than 400. The path should be defined relative to the root of the service, for example `/healthz` to check the endpoint `localhost:[port]/healthz`.

##### Configure health checks: TCP

TCP probes will test whether a connection can be made and gracefully terminated at the specified port.

##### Configure health checks: CMD

CMD probes will execute the specified command inside the container which passes if command exits with a status code of 0. The CMD is executed in the container and passes if the command succeeds, for example `/bin/sh -c "cat /tmp/healthz"`.

### Configure health checks: Create a health check

You can create a new health check from the health checks page of a combined or deployment service, or any job. You can also add a health check when creating a service or job in the advanced section.

Click add health check and select the type of health check you want to create. Only one of each type of health check can be added per service.

Choose which protocol to test the container by: HTTP, TCP, or CMD. If using HTTP, enter the endpoint to test, if using CMD, enter the command to run.

Use the dropdown menu to select the port to test (for HTTP and TCP), or enter it manually. The port must be exposed by your application, but does not need to be exposed in Northflank port configuration, as the request is made inside the container.

Click save changes to create or update the health checks, or add health check to add another.

> [!note] Advanced configuration
> You can also configure the following options by expanding the advanced menu in a health check:

- Initial delay: set the time (in seconds) to wait from container initialization before making the first check
- Interval: set the time (in seconds) to wait between checks
- Timeout: set the time (in seconds) to wait for a response from the container
- Max failures: specify the maximum number of attempts to check the container before failing.
- Success threshold: set the number of successful checks required for a readiness probe to pass

### Configure health checks: Set up a probe endpoint

Health check probes can be as simple as testing a HTTP endpoint that is configured to return a 200 OK response. This could be a designated path (for example `/healthz`), or the site root (`/`).

For example, a healthcheck endpoint in Express.js could look something like this:

```javascript
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});
```

A more complex readiness probe might test a connection to a database before returning an OK response. The example below uses a hypothetical`testConnection` method on a database module (`db`) that would check your database is accessible.

```javascript
app.get('/healthz', (req, res) => {
  const database = db.testConnection();
  if (database === 'OK') {
    res.status(200).send('OK');
  } else {
      res.status(500).send('Database connection failed');
  }
});
```

Probes using a command to test for healthiness execute the given command inside the container, and pass if the exit code is ok (returns `0`). For example, you could configure your application to create a file by running a shell script when it initialises (`touch /tmp/healthz`). Your startup probe can then check this file exists to confirm your application has initialised (`cat /tmp/healthz`).

TCP probes only require a port to be exposed by your container.

Below is an example of three configured health checks, from a [Northflank template]().

```json
    "healthChecks": [
      {
        "protocol": "HTTP",
        "type": "livenessProbe",
        "port": 80,
        "path": "/healthz",
        "initialDelaySeconds": 10,
        "periodSeconds": 60,
        "timeoutSeconds": 3,
        "failureThreshold": 2,
        "successThreshold": 1
      },
      {
        "protocol": "TCP",
        "type": "readinessProbe",
        "port": 80,
        "initialDelaySeconds": 10,
        "periodSeconds": 10,
        "timeoutSeconds": 3,
        "failureThreshold": 2,
        "successThreshold": 1
      },
      {
        "protocol": "CMD",
        "type": "startupProbe",
        "cmd": "cat /tmp/healthy",
        "initialDelaySeconds": 5,
        "periodSeconds": 30,
        "timeoutSeconds": 10,
        "failureThreshold": 3,
        "successThreshold": 1
      }
    ],
```

### Configure health checks: Monitor a health check

Individual container health checks can be viewed in:

- a combined or deployment service by selecting an entry from the [list of containers for a deployment](observe.md#monitor-containers-observe-deployments), on the observe page
- an addon by selecting an entry from the containers list
- a job by selecting an entry from the list of containers for a job run

The health check page displays each configured health check sorted by type, with the details of the result (such as latency and response), and the last time the status of the health check changed.
You can only view health checks for individual containers. Health checks for builds simply show the build status.

The list of containers will also include a column with the number of passing health checks.

### Configure health checks: Learn more

- [More about health checks: Health checks use Kubernetes probes to test containers. Learn more about them here.](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

## Configure log sinks

Source: https://northflank.com/docs/v1/application/observe/configure-log-sinks.md

You can integrate your preferred log aggregators and observability platforms with your Northflank account.

Log sinks allow you to forward logs from containers in specific projects, or your whole account, allowing you to unify and process logs from your entire operation. You can improve your observability with the features of your preferred log service; analyze and visualise metrics, perform searches, set up real-time alerts, and meet your log auditing requirements.

You can also integrate with your own logging solutions by sending logs to a custom HTTP endpoint or an Amazon S3 bucket.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/log-sinks) to view your account logs sinks page.

![Creating a HTTP log sink integration in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/configure-log-sinks/configure-http-sink.png)

### Configure log sinks: Supported services

Northflank currently supports the following services and endpoints for log sinks:

- [Datadog](https://datadoghq.com/)

- [Loki](https://github.com/grafana/loki)

- [Papertrail](https://papertrail.com/)

- [Mezmo (formerly LogDNA)](https://mezmo.com/)

- [Better Stack (formerly Logtail)](https://betterstack.com/logs)

- [Honeycomb](https://honeycomb.io/logs/)

- [Logz.io](https://logz.io)

- [New Relic](https://newrelic.com)

- [Axiom](https://axiom.co)

- [AWS S3](https://aws.amazon.com/s3/?nc2=h_ql_prod_st_s3)

- HTTP (custom endpoint)

### Configure log sinks: Log encoding

By default, logs will be sent as plain text, some log sinks allow you to send logs as JSON instead.

#### Configure log sinks: Text

Text logs are sent as a single string containing only the log message itself in the format:

`<timestamp: [yyyy-MM-dd’T’HH:mm:ss.SSSSSSSSS’Z’]> <stream [stdout | stderr]> <log line>`.

For example:

```text
2022-09-12T09:21:40.817924799Z stdout F Mon Sep 12 09:21:40 UTC 2022: Log item 138051
```

#### Configure log sinks: JSON

JSON logs are sent as an array of objects, with each object representing a single log entry:

```JSON
  {
    [
      {
        "entity":"<entity_id>",
        "host":"Northflank",
        "message":"<datetime with timezone> <log message>",
        "path":"/",
        "pod":"<service_name>-<pod_id>",
        "project":"<project_name>",
        "service":"<service_name>",
        "source":"Northflank",
        "source_type":"http",
        "timestamp":"<datetime with timezone>",
        "type":"<service|job|addon>"
      },
      {...},
      {...}
    ]
  }
```

### Configure log sinks: Custom label parsing

Northflank supports custom label parsing for the following services:

- [Datadog](observe.md#configure-log-sinks-create-a-datadog-log-sink)

- [Better Stack](observe.md#configure-log-sinks-create-a-better-stack-log-sink)

- [Logz.io](observe.md#configure-log-sinks-create-a-logzio-log-sink)

- [Honeycomb](observe.md#configure-log-sinks-create-a-honeycomb-log-sink)

- [Mezmo](observe.md#configure-log-sinks-create-a-mezmo-log-sink)

- [New Relic](observe.md#configure-log-sinks-create-a-new-relic-log-sink)

- [Axiom](observe.md#configure-log-sinks-create-an-axiom-log-sink)

You can enable custom label parsing under advanced options when you create or update a log sink integration.

Custom label parsing scans JSON formatted log lines for additional non-protected keys (keys that are not `message`, `ts`, or `msg`) and supplies them to the sink with your log line. We recommend using the message key for your log line message.

You can generate these custom keys in your application and query them in your log provider to gain better insights into your services.

#### Configure log sinks: A log sent without custom label parsing

```JSON
{
  message: "{"message":"my JSON log line", "custom-key":"test", "level":"INFO"}",
  timestamp: 2023-08-31T16:53:00
}

```

#### Configure log sinks: A log sent with custom label parsing

```JSON
{
  message: "my JSON log line",
  timestamp: 2023-08-31T16:53:00,
  custom-key: "test",
  level: "INFO"
}
```

### Configure log sinks: Create a log sink

Log sinks can be created on your user or team account in your account settings.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/log-sinks) to view your account's log sinks page.
To add a new log sink, select the type of log sink you want and follow the specific instructions below for each type.

You can pause and resume your log sinks as required after they have been created, update the authentication details, and change the projects they target.

#### Configure log sinks: Forward logs only from selected projects

By default, Northflank will forward logs from all running containers in all projects within your team. You can enable make log sink target selected projects under advanced options and select specific projects to forward logs from. Only containers running in the selected projects will have their logs forwarded.

If you are creating a log sink on a team account and your role is restricted to specific projects, you will only be able to create log sinks targeting the projects you have access to.

#### Configure log sinks: Forward network logs

Northflank will only send runtime logs, produced by your running containers, by default.

You can choose to forward logs from CDNs and the network mesh as well in the advanced options section.

##### Configure log sinks: CDN logs

Northflank will forward logs from any [CDN services](domains.md#use-a-cdn) used in your team or selected projects.

##### Configure log sinks: Mesh logs

Northflank will forward logs from the Northflank network mesh relevant to resources in your team or selected projects.

#### Configure log sinks: Validation log

When you create or update a log sink a validation log is sent to the endpoint to ensure the credentials entered are correct. This validation log will be stored in your sink and takes the following format:

```JSON
{
  "app-name": "log-forwarder",
  "host": "Northflank",
  "message": "Validating log sink credentials",
  "severity": "info",
  "date": "<datetime with timezone>"
}
```

### Configure log sinks: Create a Datadog log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/datadog_logs), or select the Datadog sink type in your new Northflank log sink

2. Select the region your Datadog account exists in by [identifying it from the URL](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site) that you use to access it:

| Region | Site |
| --- | --- |
| EU1 | datadoghq.eu |
| US1 | datadoghq.com |
| US3 | us3.datadoghq.com |
| US5 | us5.datadoghq.com |
| US1-FED | ddog-gov.com |

1. Navigate to organisation settings, open API keys, and create a new key. Make sure your account has at least the standard role, or a custom role with [permissions to write logs](https://docs.datadoghq.com/logs/guide/logs-rbac/?tab=ui).

2. Copy the API key and paste it into the field in Northflank

3. Select your project restrictions, if any, and add log sink

4. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create a Loki log sink

You can send your logs to a self-hosted instance of Loki, or to a Loki instance hosted on [Grafana cloud](https://grafana.com/products/cloud/).

#### Configure log sinks: Grafana cloud

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/loki), or select the Loki sink type in your new Northflank log sink

2. Navigate to your Grafana Cloud Dashboard and select your Grafana Cloud Stack, or [create a new one](https://grafana.com/docs/grafana-cloud/account-management/cloud-stacks/create-update-stacks/#create-a-new-stack)

3. Create a new Access Policy with the `logs write` scope only. Create a token for the access policy and save it somewhere secure.

4. On the Grafana Stack dashboard view the details for Loki and note your URL and username

5. Go to Northflank and enter the information from your Loki configuration: URL, username, and enter your token as the password

6. Choose the [encoding method](observe.md#configure-log-sinks-log-encoding) for the logs: `text` (default) or `JSON`

7. Select your project restrictions, if any, and add log sink

8. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

#### Configure log sinks: Self-hosted

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/loki), or select the Loki sink type in your new Northflank log sink

2. Enter the URL of your Loki deployment (HTTPS)

3. Enter the username and password you set when configuring your Loki instance

4. Choose the [encoding method](observe.md#configure-log-sinks-log-encoding) for the logs: `text` (default) or `JSON`

5. Select your project restrictions, if any, and add log sink

6. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create a Papertrail log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/papertrail), or select the Papertrail sink type in your new Northflank log sink

2. Navigate to your Papertrail settings and open log destinations

3. Create log destination, allow it to `accept logs from unrecognised systems`, and leave `delete systems with no events` enabled

4. Choose to accept connections via `port` (recommended) or `token` (HTTPS). Leave `TLS encryption` enabled for TCP, and `plain text` enabled for UDP for `port` connections.

5. On Northflank select the authentication method you chose when creating your log destination

  - For `port` enter the URL and port generated for your log destination, for example `logs5.papertrailapp.com:12345`

  - For `token` enter both the `endpoint` and `token` generated for your log destination

6. Choose the [encoding method](observe.md#configure-log-sinks-log-encoding) for the logs: `text` (default) or `JSON`

7. Select your project restrictions, if any, and add log sink

8. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create a Mezmo log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/logdna), or select the Mezmo (formerly LogDNA) sink type in your new Northflank log sink

2. In Mezmo, open  settings, navigate to the API keys page under organisation

3. Generate a new ingestion key and copy the value

4. Return to Northflank and paste the ingestion key into the API key field

5. Select your project restrictions, if any, and add log sink

6. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create a Better Stack log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/logtail), or select the Better Stack sink type in your new Northflank log sink

2. In your Better Stack account select the Logs & Metrics service, navigate to sources and connect source

3. Name your source, select `HTTP` as the platform, and create source

4. Copy the source token, return to Northflank, and enter it into the `source token` field for your new log sink

5. Select your project restrictions, if any, and add log sink

6. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create a Honeycomb log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/honeycomb), or select the Honeycomb sink type in your new Northflank log sink

2. In Honeycomb navigate to environments and manage environments

3. View API keys for the environment you want to use with Northflank and copy the API key value

4. Return to Northflank and paste the API key value into the form

5. Enter the name of your dataset, if it doesn't already exist in Honeycomb it will be created for you

6. Select your project restrictions, if any, and add log sink

7. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

> [!note]
>
- You must be a Honeycomb team owner to create and manage API keys
- Your API key must have `send events` and `create datasets` permissions

### Configure log sinks: Create a Logz.io log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/logzio), or select the Logz.io sink type in your new Northflank log sink

2. In Logz.io open your settings and select the manage tokens page

3. Open data shipping tokens and copy the default token, or create a new one

4. Return to Northflank and paste the API token into the form

5. If the `listener URL` displayed on the data shipping tokens page is different from the default `listener.logz.io`, copy it and replace the `listener URL` in the Northflank form

6. Select your project restrictions, if any, and add log sink

7. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create a New Relic log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/newRelic), or select the New Relic sink type in your new Northflank log sink

2. In your New Relic account select your user from the bottom-left and open the API keys page

3. Find an existing `Ingest - License` key, or create a new one, and copy the `account ID` into the Northflank form

4. Return to New Relic, select copy key from the drop-down menu , and paste the key into the `license key` field on Northflank

5. Select the region your New Relic account was created in, which can be found in the URL when viewing your New Relic account (for example `one.eu.newrelic.com`)

6. Select your project restrictions, if any, and add log sink

7. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create an Axiom log sink

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/axiom), or select the Axiom sink type in your new Northflank log sink

2. In your Axiom account select the organisation you want to use and open the datasets page. Select an existing dataset, or create a new one, and enter the name of the dataset into the Northflank form.

3. Open your Axiom settings  page, select API tokens from the settings menu, and click new API token

4. Give your new API token a name and make sure it has `ingest` permissions. You can also choose to restrict it to a specific Axiom dataset. You can alternatively use an existing token by selecting it and clicking regenerate token.

5. Copy the token, return to Northflank, and enter it into the `token` field for your new log sink

6. Select your project restrictions, if any, and add log sink

7. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

### Configure log sinks: Create an AWS S3 or compatible API log sink

You can create an S3 sink hosted by Amazon Web Services, or another implementation of S3 storage. The following instructions are to integrate S3 hosted by AWS, for other implementations the exact details may differ.

Logs sent to S3 buckets are automatically segmented into directories to help identify and find them, by project, resource type, and resource name. For example:

| Project | Resource category | Resource |
| --- | --- | --- |
| my-project/ | service/ | my-service-1/ |
| my-project/ | service/ | my-service-2/ |
| my-project/ | addon/ | mongo-db/ |
| my-project/ | job/ | db-cleanup-cron/ |

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/aws_s3), or select the AWS S3 sink type in your new Northflank log sink

2. Go to your [AWS console](https://console.aws.amazon.com/) and select S3 from the storage section in the services menu

3. Create a new bucket, or select an existing one, and enter the name of the bucket in Northflank

4. Enter the service endpoint, for example `s3.eu-west-1.amazonaws.com` for a bucket in the `EU-West-1` region

5. Enter the region for your bucket, as indicated in the endpoint

6. Open the [IAM console](https://console.aws.amazon.com/iam/) and create a new IAM user with the necessary permissions, or a role containing the necessary permissions

7. Copy the `access key ID` and `access key secret` to Northflank directly, and/or save them somewhere secure (you will not be able to view them again)

8. Choose whether to send uncompressed plaintext logs, or logs compressed with gzip to your bucket

9. Select your project restrictions, if any, and add log sink

10. You should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

> [!note]
>
- Northflank will create a folder to store logs each day, with the format `date=YYYY-MM-DD`
- Each log file will be named with a Unix timestamp in seconds, followed by a UUID: `[timestamp]-[UUID].[file-extension]`
- Logs will have the file extension `.log` if uncompressed, or `.log.gzip` for compressed logs
- Logs will be sent in batches no greater than 32.7KB, or every second while logs are being generated

### Configure log sinks: Create a HTTP log sink

You can configure a custom HTTP endpoint to receive your logs from Northflank.

1. [Click here](https://app.northflank.com/s/account/integrations/log-sinks/new/http), or select HTTP

2. Enter the URL of your log sink

3. Select your authentication strategy: `basic authentication` or `bearer token`

- Enter your username and password to authenticate using basic authentication

- Enter your token to authenticate using bearer token

1. Choose the encoding method for the logs: `text` or `JSON`

2. Change batch options, if required

3. Select your project restrictions, if any, and add log sink

4. Your HTTPS endpoint should receive a [validation log entry](observe.md#configure-log-sinks-create-a-log-sink) to confirm your credentials are valid, and logs will now be sent to the sink

#### Configure log sinks: Authentication strategy

You can secure your endpoint by only accepting requests with either basic authentication or a bearer token. For security your endpoint should require HTTPS, otherwise credentials and logs will be transmitted unencrypted.

- Basic authentication: basic auth requires a password, and optionally a username. This will be encoded using base64 before being sent in the header as `Authorization: "Basic <encoded credentials>"`

- Bearer token: your bearer token will be encoded using base64 and sent in the header of the request as `Authorization: "Bearer <encoded token>"`

#### Configure log sinks: Log encoding

Your endpoint will receive logs from Northflank in either [text or JSON format](observe.md#configure-log-sinks-log-encoding).

Text logs will be sent with the header `Content-Type: text/plain` and the body will consist of a string containing the log line. JSON logs will be sent with the header `Content-Type: application/json` and the body will consist of a JSON object containing an array of log lines.

#### Configure log sinks: Batch options

You can set a maximum size for each batch of logs to be sent to your endpoint. You can reduce or increase the size of batches depending on how much your endpoint can process in a single request.

Batches can be capped by the number of events and size in bytes. Max events will group a number of log entries together, max size will send the batch as soon as it reaches that size (based on the uncompressed size). Max size accepts values as integers (`3000000`) or with exponential notation (`3e+6`).

#### Configure log sinks: Response

Your endpoint should return a 2xx response code.

### Configure log sinks: Next steps

- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)

## Configure notification integrations

Source: https://northflank.com/docs/v1/application/observe/configure-notification-integrations.md

You can create integrations with external services like Slack and Discord to receive alerts when specified events, such as backups, job runs, or billing events occur on the Northflank platform.

You can also configure notifications to be sent to a webhook URL to create your own integrations and workflows.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/notifications) to view your account notifications page.

#### Configure notification integrations: Infrastructure alerts

You can select [infrastructure alerts](observe.md#set-infrastructure-alerts) to be sent to your notification integration. These alerts trigger notifications when certain your running containers crashes, have high CPU and memory usage, or when volumes have limited space available.

You can configure how often infrastructure alerts are generated on the alerts page in your account settings.

#### Configure notification integrations: Types of notification integrations

- [Slack](observe.md#configure-notification-integrations-slack): send formatted notifications to a Slack channel or user

- [Discord](observe.md#configure-notification-integrations-discord): send formatted notifications to a Discord channel

- [Teams](observe.md#configure-notification-integrations-teams): send formatted notifications to a Microsoft teams channel

- [Webhook](observe.md#configure-notification-integrations-webhooks): send notifications to a HTTP endpoint for processing

![Creating a webhook notification integration in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/configure-notification-integrations/create-webhook-notification-integration.png)

### Configure notification integrations: Filter events

You can filter events by type and by project.

Select the type of events you want to be notified about when creating or editing the integration. You can receive alerts for different events in various categories, such as a new build starting or a new job run beginning.

You can also receive notifications for specific projects. Enable the handle events only from specific projects and select one or more projects you want to receive notifications for.

### Configure notification integrations: Slack notifications

You can create or update a [Slack](https://slack.com/) integration from the notifications page in your account/team settings. You may need to be an owner of the workspace to grant the Northflank notifications application access.

1. Select the Slack integration type and the types of event you want to receive notifications about. Enable handle events only from specific projects if you want to restrict the integration to selected projects.

2. Click create notification integration to be taken to the Slack integration page. Ensure the correct workspace is selected and select a channel, user, or group to send notifications to and click allow.

Your selected Slack channel should now receive the configured alerts whenever an event triggers them.

You can edit the events that will send a notification to your Slack channel, or restrict/unrestrict alerts to certain projects. If the integration is removed from your Slack channel, or you want to change the channel that will receive alerts, you can reinstall it.

### Configure notification integrations: Discord notifications

You can create or update a [Discord](https://discord.com/) integration from the notifications page in your account/team settings. You need to have the `manage webhooks` permissions on the server that you want to send notifications.

1. Select the Discord integration type and the types of event you want to receive notifications about. Enable handle events only from specific projects if you want to restrict the integration to selected projects.

2. In Discord, either edit channel or select integrations and view webhooks from server settings. Select new webhook and give it a recognisable name, like `Northflank notifications bot` or `Northflank project X`, and select the channel it will post notifications in. You can also add an avatar, such as your own team/project logo.

3. Click copy webhook URL, return to Northflank, and paste it in the `webhook URL` field in the Northflank form

4. Click create notification integration, and your Discord channel should receive a notification to confirm the integration

Your channel will now receive the configured alerts whenever an event triggers them.

You can edit the events that will send a notification to your Discord channel, or restrict/unrestrict alerts to certain projects. If the webhook is deleted in Discord, or you want to change the channel it posts to, create a new webhook and update the webhook URL in the Northflank integration.

### Configure notification integrations: Teams notifications

You can create or update a [Teams](https://www.microsoft.com/en-gb/microsoft-teams/group-chat-software) integration from the notifications page in your account settings. You will require permission in the workspace to manage connectors.

1. Select the Teams integration type and the types of event you want to receive notifications about. Enable `handle events only from specific projects` if you want to restrict the integration to selected projects.

2. Open the channel you want to send notifications to in Microsoft Teams, click the options menu  and select `connectors`

3. Search for and add the [Incoming Webhook](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) connector, then configure it

4. Copy the generated webhook URL and paste it into the `webhook URL` field in the Northflank form and then click create notification integration

Your channel will now receive the configured alerts whenever an event triggers them.

You can edit the events that will send a notification to your Teams channel, or restrict/unrestrict alerts to certain projects. If the connector is deleted in Teams, or you want to change the channel it posts to, create a new connector and update the webhook URL in the Northflank integration.

### Configure notification integrations: Webhook notifications

You can create a webhook notification integration to send events to a HTTP endpoint for processing. This can be a powerful tool for automating workflows involving Northflank, especially when combined with the [Northflank API](https://northflank.com/docs/v1/api).

You can create or update a webhook integration from the notifications page in your account/team settings.

Select the webhook integration type and enter your webhook URL, and your secret (if required). You can update these later.

You can select the types of event you want to receive notifications about and choose to only receive notifications about events in specific projects, if required.

> [!note]
> You could use a webhook notification integration to alert your app:

- That a job has failed, so your app can create a ticket in your bug tracking software
- That a backup has succeeded, so your app can download the backup via the Northflank API and store it in an off-site backup system

#### Configure notification integrations: Webhook secrets

You can add a secret to your webhook to ensure the request originated from your Northflank notification integration.

Either generate a secret yourself, or generate one on Northflank using the random secret generator  in the form field.

You can then add this secret to your webhook endpoint application. If your workload is deployed on Northflank, you can add it either as a [runtime variable](secure.md#inject-secrets) or in a [secret file](secure.md#upload-secret-files).

The secret will be sent to your endpoint as the `X-Northflank-Notification-Integration-Token` header. You can compare the value in the header to your secret to confirm the webhook request is legitimate.

#### Configure notification integrations: Request format

Notifications are sent to webhooks as `POST` requests containing the following:

##### Configure notification integrations: Headers

- `X-Northflank-Notification-Integration-Id` - ID of the notification integration that the request originated from

- `X-Northflank-Notification-Integration-Name` - Name of the notification integration that the request originated from

- `X-Northflank-Notification-Integration-Token` - Secret associated with the notification integration that the request originated from.

- `X-Northflank-Notification-Integration-Event-Id` - ID of the event contained within the request

- `X-Northflank-Notification-Integration-Event-Type` - Type of event contained within the request, e.g. `build:start`

##### Configure notification integrations: Body

Requests contain a JSON encoded body containing the following properties:

- `event` - The type of the event, e.g. `build:start`

- `data` - An object containing data related to the event

The following is an example of the data you may receive in the body of the request when a build is started:

```json
{
  "event": "build:start",
  "data": {
    "build": {
      "id": "social-hour-1312",
      "branch": "master",
      "pullRequestId": null,
      "status": "STARTING",
      "sha": "ca624abed0d5ba0ad6e6fe28c396196b81f0200d",
      "concluded": false,
      "createdAt": "2022-01-19T09:04:40.916Z"
    },
    "service": {
      "id": "website",
      "name": "Website"
    },
    "project": {
      "id": "personal-blog",
      "name": "Personal Blog"
    },
    "user": {
      "id": "thomas"
    }
  }
}
```

#### Configure notification integrations: Error handling

To indicate a webhook has successfully handled a notification it should respond to the request with a `2xx` status code.

If a webhook does not respond with a `2xx` status code the associated notification integration will be marked as failing and the notification will be resent a limited number of times until it is handled successfully or the limit is reached.

Webhooks that continuously fail to handle notifications successfully will be automatically disabled.

##### Configure notification integrations: Recent events

You can find a list of all requests sent to your webhook and their current status when viewing the webhook notification integration.

Click on a specific request to see the request headers and body, as well as a list of the responses received and their status code.

Failing webhooks will be automatically resent several times, and you can also manually resend a webhook request from the event page.

You can expand a response to see the webhook URL, response headers and response body.

#### Configure notification integrations: Example webhook handler

The following is an example of a webserver, written using [Express](https://expressjs.com/), that handles notifications sent via a webhook:

```js
// This example uses Express to setup a webserver to receive webhooks.
const express = require('express');
const app = express();
app.use(express.json());

// Setup an endpoint to receive webhooks.
app.post('/webhook', (request, response) => {
  // Check the request originated from Northflank and reject any that do not.
  const receivedSecret = request.get('X-Northflank-Notification-Integration-Token');
  const actualSecret = process.env.NOTIFICATION_INTEGRATION_SECRET;

  if (receivedSecret !== actualSecret) {
    response.sendStatus(401);
    return;
  }

  // Handle the different events.
  const { event, data } = request.body;

  switch (event) {
    case 'build:start':
      const { project, service, build } = data;
      console.log({ project, service, build });
      // Then define and call a method to handle the event.
      // handleBuildStarted(project, service, build);
      break;

    // ... handle other events.
    default:
      console.log(`Unhandled event ${event}.`);
  }

  // Flag the notification as being handled successfully.
  response.sendStatus(200);
});

// Start the webserver.
app.listen(3000, () => console.log('Running on port 3000.'));
```

### Configure notification integrations: Next steps

- [Infrastructure alerts: Set infrastructure alerts to let you and your team know when there is an issue with your applications or addons.](observe.md#set-infrastructure-alerts)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [Monitor containers: Monitor the health and resource usage of deployments, and view detailed logs and metrics for individual container.](observe.md#monitor-containers)

## Monitor containers

Source: https://northflank.com/docs/v1/application/observe/monitor-containers.md

You can monitor containers and replicas for deployments, jobs, and addons.

Your project dashboard shows an overview of your project's resources and their statuses.

Deployments contain an observe page with combined metrics for all containers, as well as visible alerts for containers with issues.

You can click through on containers to view live, detailed [logs](observe.md#view-logs) and [metrics](observe.md#view-metrics), the status of [health checks](observe.md#configure-health-checks), and gain [shell access](run.md#access-running-containers-locally) (to running service or job containers).

![Viewing the project overview showing services, job, and addon statuses in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/monitor-containers/project-overview.png)

#### Monitor containers: Container statuses

Staging: the container is scheduled for deployment
Starting: the container is being deployed
Running: the container is running
Crashing: the process is crashing
Terminating: the container is scheduled to stop running
Terminated: the container has been stopped
Failed: the container has stopped because of an error

### Monitor containers: Observe deployments

You can access the observe page on deployment and combined services to see an overview of combined metrics for all running containers in the service and metadata for the deployed image. The observe page also has a list of containers, grouped by deployment.

You will be notified of any containers that require immediate intervention in a triage window.

![Viewing the observe page for a service in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/monitor-containers/deployment-observe-page.png)

#### Monitor containers: Service metrics

The overall section contains aggregated metrics for all containers deployed in the service. Metrics are live, calculated over a rolling window of 60 seconds, and include:

- CPU: vCPU usage in [millicore](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu)

- Memory: RAM usage in GiB

- Logs: number of log lines generated by containers

##### Monitor containers: Network usage

You can view combined network usage for your containers, and select whether to group them by public and private networking, or by bandwidth and requests. You can also adjust the period of time to display data for, from the past 1 hour to the previous week.

Public network statistics include traffic to and from external sources, which reach your service via your service's [public endpoints](network.md#configure-ports-public-ports).

Private network statistics include traffic to and from sources from within the same project via your service's [private ports](network.md#configure-ports-private-ports), from other Northflank projects through [multi-project networking](network.md#enable-multi-project-networking), [Tailscale devices](network.md#use-tailscale), and [securely-forwarded ports](../api/forwarding.md).

Network metrics include:

- Public bandwidth: includes traffic to external sources

- Private bandwidth: includes traffic to services with in the project, or other private networks

- Public ingress: inbound requests from the internet reaching your service via any publicly exposed endpoints

- Private ingress: inbound requests to your service's private endpoints

- Private egress: outbound requests from your service to internal and external endpoints

#### Monitor containers: Deployments

The deployments list contains a history of deployments to the service. Each time a new build or image is deployed or the service is redeployed, a new deployment entry will be created. New deployments can be triggered manually, by updating environment variable, via a template or release flow, or if CD is enabled and a new image is built.

Each deployment has a unique identifier, generated from the service name, and you can view combined logs and metrics for all containers related to the current deployment. Deployments also contain the reason and user responsible for the new deployment.

Deployments have a list of active and terminated containers. You can click on container to view [logs](observe.md#view-logs), [metrics](observe.md#view-metrics), [health checks](observe.md#configure-health-checks), and [shell access](run.md#access-running-containers-locally-execute-commands-in-a-container) for an individual container.

#### Monitor containers: Triage

If one or more containers are reporting issues, such as failing health checks or crashing, you will be alerted in the triage window. This contains a list of containers that require intervention to bring them into a healthy state.

### Monitor containers: View addon replicas

You can view addon replicas on the containers page of your addon, which displays a list of active and terminated replicas and their statuses.

You can click through to a replica to view logs, metrics, and the health checks.

### Monitor containers: View job runs

You can view the status of job runs in the project overview, the job overview, and from the runs page of a job.

You can click through to a run on the runs page to see more detailed information, including:

- Status

- Active runs

- Failed runs

- Elapsed time

You can change the [retry limit and time limit](run.md#run-an-image-once-or-on-a-schedule-set-the-retry-and-time-limit) of a job if your runs are failing to complete in time, or need multiple retries to succeed.

Each job run also has a list of active and completed containers which have been deployed to run the job. You can click through to a container to view logs, metrics, health checks, and access the shell (for running containers).

### Monitor containers: Next steps

- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [View metrics: View detailed, real-time metrics from builds, deployments, and more.](observe.md#view-metrics)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)

## Observability on Northflank

Source: https://northflank.com/docs/v1/application/observe/observability-on-northflank.md

Northflank provides observability tooling to monitor and ensure your applications and microservices are available.

### Observability on Northflank: Logs and metrics

You can view live and historical logs and metrics for builds, deployments, jobs, and addons.

You can configure health checks for deployments and jobs to ensure your applications are available to serve traffic, and that containers can be automatically replaced if they are in an unhealthy state.

You can also integrate external log aggregators to analyze and retain logs from your Northflank workloads.

Organisations can use audit logs to track actions taken on Northflank and ensure compliance.

- [See previous builds: See previous builds, their status, and view detailed logs and metrics for each build.](observe.md#see-builds)
- [Monitor containers: Monitor the health and resource usage of deployments, and view detailed logs and metrics for individual container.](observe.md#monitor-containers)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [View metrics: View detailed, real-time metrics from builds, deployments, and more.](observe.md#view-metrics)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [Configure log sinks: Integrate third-party logging and observability services with Northflank.](observe.md#configure-log-sinks)
- [Audit logs: Monitor and review events affecting your organisation, teams, projects, and resources.](observe.md#audit-logs)

### Observability on Northflank: Alerts and notifications

You can configure infrastructure alerts to monitor usage and be informed of any issues with your resources. These are delivered via a notification integration with other service providers, or via custom webhooks.

- [Infrastructure alerts: Set infrastructure alerts to let you and your team know when there is an issue with your applications or addons.](observe.md#set-infrastructure-alerts)
- [Discord notifications: Send notifications to Discord channels with Discord webhook integrations.](observe.md#configure-notification-integrations-discord-notifications)
- [Slack notifications: Send notifications to Slack channels, groups, or users.](observe.md#configure-notification-integrations-slack-notifications)
- [Teams notifications: Send notifications to Microsoft Teams channels.](observe.md#configure-notification-integrations-teams-notifications)
- [Webhook notifications: Build your own integrations with custom Northflank webhooks.](observe.md#configure-notification-integrations-webhook-notifications)
- [Monitor spending: Monitor your current resource usage across services.](billing.md#monitor-spending)
- [Configure billing alerts: Set up alerts to notify you if your spend exceeds a specified amount.](billing.md#monitor-spending-set-up-billing-alerts)

## See builds

Source: https://northflank.com/docs/v1/application/observe/see-builds.md

You can find a list of [builds](build.md#build-code-from-a-git-repository-build-from-a-repository) on combined and build services, and [jobs](run.md#run-an-image-once-or-on-a-schedule) that deploy from a repository. The overview for your service will display the latest builds, and you can navigate to the builds page for a full history of builds.

Each listed build includes information including the branch, commit hash, and duration of the build, as well as buttons to start a new build, abort a build in progress, or deploy a specific build (in a combined service or job).

When a build is successful it is pushed to the [Northflank container registry](build.md#pull-images-from-northflank), ready to be deployed. The new build will be automatically deployed to any linked services with [CD configured](release.md#manage-cicd).

You can click through on each build to view live detailed [logs](observe.md#view-logs) and [metrics](observe.md#view-metrics).

You can also [build the image again](build.md#build-code-from-a-git-repository) and pull the image from the [Northflank container registry](build.md#pull-images-from-northflank) from the individual build view.

![Viewing a list of builds on a build service in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/see-builds/build-list.png)

#### See builds: Build statuses

Pending: the build is queued to start
Starting: the build process is starting
Cloning: the repository is being cloned
Building: the build is in progress
Uploading: the build was successful, and the image is being uploaded to Northflank
Successful: the build was completed, and the image is available on Northflank
Aborted: the build was cancelled by the user
Failed: the build could not be completed

### See builds: Next steps

- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [View metrics: View detailed, real-time metrics from builds, deployments, and more.](observe.md#view-metrics)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [Increase CPU and memory: Power-up your services by adding memory and moving from shared to dedicated CPU usage.](scale.md#scale-cpu-and-memory)
- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Pull an image from Northflank: Pull images built on Northflank locally, or use built images as the base image in your Dockerfile.](build.md#pull-images-from-northflank)

## Set infrastructure alerts

Source: https://northflank.com/docs/v1/application/observe/set-infrastructure-alerts.md

You can use infrastructure alerts to let you and your team know when there is an issue with your applications or addons.

Alert settings are configured on an account-wide basis, and can then be used in [notification integrations](observe.md#configure-notification-integrations) to send alerts to webhooks or other platforms.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/alerts) to view your account's infrastructure alerts configuration page.

![Configuring infrastructure alerts in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/set-infrastructure-alerts/infrastructure-alerts-page.png)

### Set infrastructure alerts: Types of infrastructure alerts

#### Set infrastructure alerts: Container alerts

| Notification type | Explanation |
| --- | --- |
| Container crash | Alerts trigger when a container crashes. This could be caused by a bad exit code, out of [memory](scale.md#scale-cpu-and-memory) error, or continual restarts (for services) |
| Container eviction | Alerts trigger when a container is evicted, which happens if it runs out of [ephemeral storage](scale.md#increase-storage-scale-ephemeral-storage). This occurs when a container image is too large, or tries to write more data than the disk can hold. |
| CPU usage spike | Alerts trigger when a container's CPU usage reaches 90% or more for a short period of time |
| CPU sustained usage | Alerts trigger when a container's CPU usage remains at 90% or more for 5 minutes |
| Memory usage spike | Alerts trigger when a container's memory usage reaches 90% or more for a short period of time |
| Memory sustained usage | Alerts trigger when a container's memory usage remains at 90% or more for 5 minutes |

#### Set infrastructure alerts: Volume alerts

You can configure volume alerts to let you know when storage for a service or addon reaches 75% or 90% capacity. However, it's recommended that you [increase the storage](databases-and-persistence.md#scale-a-database-scale-storage) available to an addon when it exceeds 50% capacity.

Platform volumes refer to any [persistent volumes](databases-and-persistence.md#add-a-persistent-volume) attached to your workloads (separate from the ephemeral storage assigned to your containers), and addon volumes refer to the [storage assigned to an addon](databases-and-persistence.md#scale-a-database-scale-storage).

#### Set infrastructure alerts: Cluster alerts

You can configure cluster alerts to let you know of issues with your [clusters on other cloud providers](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

### Set infrastructure alerts: Configure infrastructure alerts

You can set a limit on how often you will receive a notification for each type of infrastructure alert from the alerts page in your account settings.

The time window for each alert means only one notification per resource will be sent in that timeframe, even if it occurs multiple times. You should configure these thresholds based on your own workloads and requirements, so that you can be aware of issues without being overwhelmed by notifications.

For example, if your container crashed alert threshold was set to 30 minutes, and you had 3 containers that crashed every 5 minutes, you would get 3 alerts every 30 minutes. However, if you set the threshold to 10 minutes, you would receive 9 alerts in the same time period.

### Set infrastructure alerts: Receive infrastructure alerts

To receive infrastructure alerts you can [configure a notification integration](observe.md#configure-notification-integrations), which will send each event generated by your alerts via the chosen integration.

You can add infrastructure alerts to existing or new notification integrations, and specify which alerts will be sent to your integration.

You can also filter the alerts you receive to come from resources in specific projects by [setting this in the notification integration](observe.md#configure-notification-integrations-filter-events).

### Set infrastructure alerts: Next steps

- [Receive notifications: Create notification integrations to be alerted when selected events occur in your account.](observe.md#configure-notification-integrations)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [Monitor containers: Monitor the health and resource usage of deployments, and view detailed logs and metrics for individual container.](observe.md#monitor-containers)
- [Use the Northflank API: Learn how to create and manage projects on Northflank programmatically using the REST API.](../api/use-the-api.md)

## View logs

Source: https://northflank.com/docs/v1/application/observe/view-logs.md

Northflank provides access to live and historical logs from builds, running and terminated containers, addons, and job runs.

Logs allow you to review builds and examine running containers to ensure your code is performant and without errors. You can also configure [log sinks](observe.md#configure-log-sinks) to send logs from your projects to aggregators and observability platforms.

Logs can be viewed for all containers in a deployment on the [observe page](observe.md#monitor-containers), or you can select an individual container or build in a Northflank service. You can also [tail logs using the Northflank API, CLI, and JavaScript client](../api/log-tailing.md).

![Viewing build logs from a build in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/view-logs/build-logs.png)

### View logs: View logs

You can view live logs as soon as a build or container is started. Live tailing provides a live feed of the latest log entries, scrolling to the bottom of the logs will load older logs.

Individual container logs can be viewed in:

- a combined or deployment service by selecting an entry from the [list of containers for a deployment](observe.md#monitor-containers-observe-deployments), on the observe page
- an addon by selecting an entry from the containers list
- a job by selecting an entry from the list of containers for a job run

Build logs can be viewed in:

- a combined or build service by selecting an entry from the builds list
- a job that builds from a repository by selecting an entry from the builds list

Viewing logs across all containers or builds in a service will show logs from:

- running and terminated containers deployed in a service
- CI tracking build progress across parallel builds
- parallel job runs triggered via cron schedule or API trigger
- database masters and replicas
- terminated or running containers (up to 30 days of retention)

Viewing logs from all containers may take a moment to load.

You can use the drop-down menu  next to the instance name to select another container to view, or choose to view logs from all containers combined.

The instance header contains contextual information about the build or instance selected. You can open the dropdown menu  to view more details.

### View logs: Search logs

You can open the search menu by clicking search in the top-right of the log window.

You can search log entries by text or regular expression, inclusive or exclusive of the search terms by toggling the options in the search bar. Clicking search  or hitting return will display only the logs matching the query.

##### View logs: Search options

- `==` find logs entries that match the entered query

- `!=` hide log entries that match the entered query

- `ABC` search as plain text

- `(.*)` search using regex

##### View logs: Example queries

- Searching `example phrase` with `==` and `ABC` selected will return all log entries that contain the text `example phrase`

- Searching `warning|error` with `!=` and `(.*)` selected will return all log entries that don't contain the text `warning` or `error`

- Searching `^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$` with `==` and `(.*)` selected will return all log entries containing a pattern that matches an IP address (e.g. `192.168.0.1`)

### View logs: Time range

By default, logs are shown with live tailing. Live tailing provides a live feed of the latest 100 log entries, scrolling to the bottom of the logs will load the next 100 entries.

You can view logs from a specific time range using the dropdown menu, restring the displayed logs to previous hours or days, or a custom time range. Selecting a custom time range will pause live tailing.

You can also reverse the direction so the logs are displayed with the newest entries appearing at the bottom of the log window , or the newest entries appearing at the top of the log window  (default).

### View logs: View mesh logs

Northflank will only display logs from your container's runtime by default. You can also view mesh logs, which include log entries from the Northflank network mesh relevant to the container or containers you are viewing.

You can enable mesh logs from the container logs view, which will populate the log viewer with mesh log entries. You can also disable runtime logs to view only mesh logs.

### View logs: Next steps

- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Expose a deployment's port: Configure ports and security for your deployments.](network.md#configure-ports)

## View metrics

Source: https://northflank.com/docs/v1/application/observe/view-metrics.md

Northflank provides access to metrics from builds, deployments, addons, and job runs.

These metrics allow you to analyse builds and deployments to ensure your code is performant and without errors.

Metrics can be viewed for all containers in a deployment on the [observe page](observe.md#monitor-containers), or you can select an individual container or build in a Northflank service. You can also [retrieve metrics using the Northflank API, CLI, and JavaScript client](../api/retrieve-metrics.md).

![Viewing metrics for all containers of a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/observe/view-metrics/metrics-view.png)

### View metrics: View metrics

Metrics are collected and displayed on a 15-second scale up until the container's termination. The metrics view live-tails the previous 30 minutes of data by default, you can select another time interval to view, or enter a custom range to see metrics from a precise period.

You can adjust the position of each graph according to your personal preference by moving them right  or left .

You can hover over a graph to view more detailed for the metric, for example specific bandwidth values or the different status codes returned for requests.

Individual container metrics can be viewed in:

- a combined or deployment service by selecting an entry from the [list of containers for a deployment](observe.md#monitor-containers-observe-deployments), on the observe page
- an addon by selecting an entry from the containers list
- a job by selecting an entry from the list of containers for a job run

Build metrics can be viewed in:

- a combined or build service by selecting an entry from the builds list
- a job that builds from a repository by selecting an entry from the builds list

Viewing metrics across all containers or builds in a service will show logs from:

- running and terminated containers deployed in a service
- CI tracking build progress across parallel builds
- parallel job runs triggered via cron schedule or API trigger
- database masters and replicas

Viewing metrics from all containers may take a moment to load.

You can use the drop-down menu  next to the instance name to select another container to view, or choose to view logs from all containers combined.

The instance header contains contextual information about the build or instance selected. You can open the dropdown menu  to view more details.

### View metrics: Types of metric

The metrics view includes graphs related to container performance and demand. These metrics can help you investigate various issues with your services. For example, if you see a lot of 5xx responses you may have a problem in your application, or the server may be overloaded if you also see a spike in network requests.

#### View metrics: Resources

You can view the CPU and memory usage for containers, which can help you identify bottlenecks or issues with your code. For example, you may notice CPU and memory usage spiking with increased traffic, which means you could increase the resources available to your containers, add more instances, or enable autoscaling to resolve it.

If your CPU and memory usage continues to increase, despite increasing the resources, it may indicate a problem with your code.

The volume capacity graph shows the usage of any persistent volumes associated with a service or addon. Only services with a persistent volume will display this graph, and addons will show the volume usage for the selected replica.

#### View metrics: Networking

Networking metrics are available for containers which consist of public and private requests and bandwidth, by ingress and egress. Bandwidth metrics and requests by status code are aggregated from all containers, ingress and egress requests values are for individual containers.

Public network statistics include traffic to and from external sources, which reach your service via your service's [public endpoints](network.md#configure-ports-public-ports).

Private network statistics include traffic to and from sources from within the same project via your service's [private ports](network.md#configure-ports-private-ports), from other Northflank projects through [multi-project networking](network.md#enable-multi-project-networking), [Tailscale devices](network.md#use-tailscale), and [securely-forwarded ports](../api/forwarding.md).

#### View metrics: Logs

Log lines displays the number of logs generated per second, aggregated from all containers.

### View metrics: Next steps

- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [Scale your services: Increase the resources available to your services, and the number of instances to deploy.](scale.md#scale-on-northflank)
- [Expose a deployment's port: Configure ports and security for your deployments.](network.md#configure-ports)
