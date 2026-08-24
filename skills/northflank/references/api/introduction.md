# Introduction

Source: https://northflank.com/docs/v1/api/introduction.md

Seamlessly build, deploy and scale your code, jobs and databases. Operate your infrastructure in real-time with Northflank’s API, CLI & JavaScript client.

### Getting started

- [Use the Northflank API: Learn how to create and manage projects on Northflank programmatically using the REST API.](use-the-api.md)
- [Use the Northflank CLI: Learn how to create and manage projects on Northflank using the command line client.](use-the-cli.md)
- [Use the Northflank JavaScript client: Learn how to create and manage projects on Northflank programmatically using the JavaScript client.](use-the-javascript-client.md)

### What you can do with the Northflank API

Deploy a website or microservice
[Create a new deployment](project/services/create-deployment-service.md) in seconds from an image built on Northflank or an external container registry.
Trigger a job run
[Run a job](project/jobs/run-job.md) with a simple API call. [Build a new image](project/jobs/start-job-build.md) for the job or update the [environment variables](project/jobs/edit-job-runtime-environment.md) before running.
Build via command line
[Trigger a build](project/services/start-service-build.md) of any commit to a repository via the command line and [deploy it](project/services/update-service-deployment.md).
Create a database and connect immediately
[Create a database addon](project/addons/create-addon.md) and [retrieve the credentials](project/addons/get-addon-credentials.md) to begin using it as soon as it's spun up.
Manage secrets
[Add](project/secrets/create-project-secret.md) groups of build arguments and runtime variables to securely manage secrets for your services. [Link](project/secrets/update-project-secret-addon-link.md) credentials from a database or storage addon for immediate and easy access in your project.
Build a managed hosting platform for your OSS or SaaS
Build your own hosting platform on top of Northflank. Include as many Northflank features and options as you want while implementing your own UI, RBAC, billing, or any other features you require. Create, update, and delete [projects](team/projects/create-project.md), [services](project/services/create-combined-service.md), [configurations](project/secrets/create-project-secret.md), and everything else on behalf of your users.
And much, much more...
Northflank is a developer tools sandbox where you can unleash your potential. Programmatically combine features to build whatever you can imagine!
