# Retrieve metrics

Source: https://northflank.com/docs/v1/api/retrieve-metrics.md

You can access the metrics for your services, jobs, and addons using the Northflank [API](use-the-api.md), [CLI](use-the-cli.md), and [JavaScript client](use-the-javascript-client.md).

You can view metrics for containers for deployed services and addons, and from builds. You can include the following options, or query parameters:

- You can specify the metrics to return, otherwise a request will return only the default metric, CPU usage

- A request will return metrics for all active containers associated with a resource by default, or you can specify a container ID to query

- Metrics can be retrieved either for a single point in time (default), or for a time range by specifying either the start and end times, or duration, or a combination of both. You can also retrieve metrics for a single specific time.

You can read more detailed specifications for each endpoint in their respective entries:

- [Get service metrics](project/services/get-service-metrics.md)

- [Get service build metrics](project/services/get-service-build-metrics.md)

- [Get job metrics](project/jobs/get-job-metrics.md)

- [Get job build metrics](project/jobs/get-job-build-metrics.md)

- [Get addon metrics](project/addons/get-addon-metrics.md)

### View metrics using the API

A query to the metrics API endpoint for a service, job, or addon, will return a JSON object containing the requested types of metric.

Each metric type will contain information about the metrics returned (`metricInfo`), and an array of `values`. The `values` array consists of objects for each container requested, which hold an array (`data`) of values and timestamps for the requested time range. Each object in `values` also includes a `metadata` object with the `containerID`.

By default, the past 20 minutes (1200 seconds) of metrics will be returned for the CPU usage of each available container.

You can request different types of metric, metrics from a specific container, or metrics from a specific time range by supplying the relevant query parameters.

### View metrics using the CLI

You can view metrics using the Northflank CLI with the following commands:

- `northflank get service metrics` to view metrics of a list of containers for a service

- `northflank get service build-metrics` to view metrics of a service build container, or metrics for all builds

- `northflank get addon metrics` to view metrics of a list of replicas for an addon

- `northflank get job metrics` to view metrics of a list of containers for a job run

- `northflank get job build-metrics` to view metrics of a job build container, or metrics for all builds

You can use the `--metricsType` flag multiple times to specify which metrics to view, only CPU metrics will be returned by default.

Each command will open an interactive menu to select the project and resource to view metrics for, unless you have a default project and service set. You can also specify the project and resource using the `--project` and `--service`, `--addon` and `--addon` flags to specify a resource to view. You can also use `--container` and provide a container ID to view metrics for a specific container, otherwise metrics for all containers will be returned.

![Container metrics from a single point in time in the Northflank CLI](https://assets.northflank.com/documentation/v1/api/metrics/metrics-cli-single.png)

Returning metrics from a time range will display the results as a graph, rather than text.

![Container metrics from a time range displayed as a graph in the Northflank CLI](https://assets.northflank.com/documentation/v1/api/metrics/metrics-cli-graph.png)

### View metrics using the JavaScript client

You can retrieve metrics of a service, job, or addon using the Northflank JavaScript client. Requests are made asynchronously using the `get.{resource-type}.metrics` and `get.{resource-type}.buildMetrics` methods exposed by the client. For example, `apiClient.get.addon.metrics` would return metrics for a specified addon, and `apiClient.get.service.buildMetrics` would return build metrics for the specified service.

You must provide parameters for the `projectId` and either the `serviceId`, `jobId`, or `addonId`. For example:

```javascript
await apiClient.get.service.metrics({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  options: {
    "startTime": "2023-02-16T14:00:00.000Z",
    "duration": 600
  }
});
```

The promise will resolve to an object in the same format as the API response.
