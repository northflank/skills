# Build

Generated from 10 application pages listed in `llms.txt`.

## Pages

- [Build code from a Git repository](#build-code-from-a-git-repository)
- [Build code from a self-hosted VCS](#build-code-from-a-self-hosted-vcs)
- [Build with a Dockerfile](#build-with-a-dockerfile)
- [Build with buildpacks](#build-with-buildpacks)
- [Build your code on Northflank](#build-your-code-on-northflank)
- [GitHub Enterprise support](#github-enterprise-support)
- [Inject build arguments](#inject-build-arguments)
- [Pull images from Northflank](#pull-images-from-northflank)
- [Share builds across projects](#share-builds-across-projects)
- [Use custom build registry](#use-custom-build-registry)

## Build code from a Git repository

Source: https://northflank.com/docs/v1/application/build/build-code-from-a-git-repository.md

Northflank offers different methods for building code from a Git repository:

- You can manually or automatically build commits on specified branches or pull requests from a linked Git repository using a build service

- You can build and deploy commits on a branch from a linked Git repository with continuous integration and delivery in a combined service

- You can build commits on a branch from a linked Git repository manually or on a regular schedule using a job

Enabling CI will allow you to automatically build code when a new commit is pushed to a linked branch from your repository, or specific branches and/or pull requests. Built code can then be continuously deployed and added to a pipeline to create complex workflows.

You'll need an account on a Git provider that is [linked to Northflank](getting-started.md#link-your-git-account) to get started.

> [!note]
> [Click here](https://app.northflank.com/s/project/create/service) to create a build or combined service.

### Build code from a Git repository: Build from a repository

To build and run code from one branch on a repository you can use:

- a combined service

- a build service linked to a deployment service

- a cron or manual job

Create a new service or job, select the repository you want to build from, then select the branch.

Once created your service will build an image for every new commit to the branches or pull requests it is monitoring, as long as CI is enabled.

### Build code from a Git repository: Manually trigger a build

You can manually trigger a build by navigating to the branch or pull request to build from and selecting a commit to build.

You can find the list of branches and pull requests in the build service menu, or by clicking the build button  in the build service header.

Northflank will begin building your commit, which may take several minutes. You can monitor the progress from the builds page and click through to view the logs for the build.

![Starting a new build in the Northflank application](https://assets.northflank.com/documentation/v1/application/build/build-code-from-a-git-repository/build-service-new-build.png)

### Build code from a Git repository: Build specific branches or pull requests

You can use a build service to build and run code from specific branches and/or pull request branches by specifying build rules when creating a build service. You can edit the build rules of an existing build service on the build options page.

A build service will not build any branches or pull request branches without specified build rules. By default, a build service will build from all pull request branches (`*`) and the `master` branch.

Pull request rules match the name of a branch, and not the name of the pull request itself. For example, if you create a pull request rule for `patch/*`, a build will be triggered when a pull request is opened for any branch matching this regex. However, creating a pull request with a title that matches `patch/*` for a branch that does not match this regex will not trigger a build.

Example build rules:

| Regex | Result |
| --- | --- |
| `*` | Builds every branch or pull request branch |
| `master` | Builds the branch or pull request branch called *master* |
| `feature/*` | Builds every branch or pull request branch starting with *release/* |
| `feature/test` | Builds only the branch or pull request branch *feature/test* |

### Build code from a Git repository: Build a specific repository directory

If you have a single repository with multiple microservices, or your repository is structured so that your build context is not the root, you can specify the build context when creating or editing your services.

By default, the build context is root (`/`), which makes all files in your repository available during the build. You can specify the set of files to be used in the build process by referring to a specific path relative to the root of your repository, such as `/app` or `/app/src`. If you change your build context to a non-root path, it will make all directories and files outside that path unavailable during the build. For example, setting your build context to `/app/src` will make both `/setup.sh` and `/app/config` unavailable in your builds.

You can combine the build context with [path rules](build.md#build-code-from-a-git-repository-trigger-a-build-on-changes-to-specific-files-or-directories) to create services that only build specific services or jobs in a monorepo.

![Build options in the Northflank application](https://assets.northflank.com/documentation/v1/application/build/build-code-from-a-git-repository/build-options.png)

### Build code from a Git repository: Trigger a build on changes to specific files or directories

You can use path rules to either ignore or only monitor specified files or directories in a repository. This allows you to [trigger builds with CI](release.md#manage-cicd) only when specific files within a repository are changed, or ignore changes to files that don't necessitate a new build. You can combine this with the [build context](build.md#build-code-from-a-git-repository-build-a-specific-repository-directory) to create services or jobs that only update when the relevant code is changed.

Path rules can be useful, for example, to stop changes to documentation files such as `README.md` from triggering a new build, or to only trigger a build when the required microservice or job code from a monorepo is modified.

You can add path rules to a service or job that builds from a repository. You can add or modify path rules in the build options section of a service or job, under advanced build settings.

#### Build code from a Git repository: Ignore or allow

You can toggle the path rules to either ignore or allow the specified paths.

You can use an ignore list to stop commits that modify certain files or directories from triggering a new build.

You can use an allow list to trigger a build only when the specified files or directories are changed.

#### Build code from a Git repository: Path rules syntax

Path rules are written the same way as a [.gitignore file](https://git-scm.com/docs/gitignore), for example:

```
README.md               # all README.md files
node_modules/           # all files and subdirectories in the node_modules directory
*.foo                   # all files ending in .foo
**/bar                  # all directories in the repository named 'bar'
!important/file.foo     # not important/file.foo
```

### Build code from a Git repository: Skip CI with commit messages

You can enable and add commit message ignore flags in the build options section of a service or job under advanced build settings.

When enabled it will stop CI from being triggered if a commit message contains a matching flag even if it matches other build triggers.

- If you push a commit with a message that contains one of the ignore flags you have added a build will not be triggered for that commit

- If you push multiple commits at once a build will not be triggered if any of the commits contain an ignore flag in their commit message

- If your service is configured to build from a pull request that PR will not be built if the HEAD commit contains an ignore flag in its commit message

Ignore flags can be added as strings, with each flag on a separate line. The default flags are enclosed in brackets to match the format of other common CI tools, but you can add flags without brackets.

##### Build code from a Git repository: Default ignore flags

The following ignore flags are automatically enabled, but you can remove them or add your own.

```
[skip ci]
[ci skip]
[no ci]
[skip nf]
[nf skip]
[northflank skip]
[skip northflank]
```

### Build code from a Git repository: Cache layers

You can enable layer caching with [Dockerfile](build.md#build-with-a-dockerfile-layer-caching) and [buildpack](build.md#build-with-buildpacks-layer-caching) builds to cache and reuse build images to speed up subsequent builds.

### Build code from a Git repository: Next steps

- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
- [Run an image once or on a schedule: Run an image manually or on a cron schedule.](run.md#run-an-image-once-or-on-a-schedule)
- [Inject build arguments: Pass secrets and configuration settings to your builds.](build.md#inject-build-arguments)
- [Build a repository using a Dockerfile: Configure your application build process using a Dockerfile.](build.md#build-with-a-dockerfile)
- [Build a repository using Buildpacks: Build your application automatically using Buildpack stacks.](build.md#build-with-buildpacks)
- [Trigger a build on changes to specific files or directories: Add path rules to monitor or ignore specific files and directories in a repository for continuous integration build triggers.](build.md#build-code-from-a-git-repository-trigger-a-build-on-changes-to-specific-files-or-directories)

## Build code from a self-hosted VCS

Source: https://northflank.com/docs/v1/application/build/build-code-from-a-self-hosted-vcs.md

Teams can add their own self-hosted version control systems (VCS) to Northflank and build from repositories as with any other Git provider linked to the account.

Northflank currently supports GitLab Enterprise/Community Edition.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/vcs) to link a git service.

### Build code from a self-hosted VCS: Add a self-hosted VCS

To add a self-hosted VCS navigate to the Git section, underneath integrations on the team settings page, click 'add a self-hosted VCS' and select the type of VCS you would like to integrate. Follow the application specific instructions to integrate your self-hosted VCS. You can choose how team members can access the repositories on the self-hosted VCS after adding it to Northflank.

#### Build code from a self-hosted VCS: Add a self-hosted GitLab instance

Navigate to your GitLab service and create a new OAuth application at `[YOUR URL]/profile/applications` or `[YOUR URL]/admin/applications` if you are an administrator. Give the application the `api` scope and set the `Redirect URI` as specified on Northflank.

On Northflank enter the root domain of your self-hosted GitLab, e.g. `gitlab.yourdomain.com`, the `application ID` and the `secret` from the OAuth application.

### Build code from a self-hosted VCS: Learn more

Read more about [managing self-hosted VCS services](collaborate.md#manage-git-integrations-self-hosted-vcs-settings).

- [Add a self-hosted VCS: Add your own self-hosted Git provider and build from its repositories.](collaborate.md#manage-git-integrations-add-a-self-hosted-vcs)
- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)

## Build with a Dockerfile

Source: https://northflank.com/docs/v1/application/build/build-with-a-dockerfile.md

You can build your projects on Northflank by supplying a Dockerfile in your repository.

A custom Dockerfile gives you full control over each step of the build process, including things like build arguments and custom base images. You must specify the location of the Dockerfile in your repository and the build context (root by default).

Select Dockerfile as the build type when creating your service, or change an existing service from the build options page.

See Docker's guide on [writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) and the [Dockerfile reference](https://docs.docker.com/engine/reference/builder/) for more information.

![Docker build options in the Northflank application](https://assets.northflank.com/documentation/v1/application/build/build-with-a-dockerfile/build-options-dockerfile.png)

### Build with a Dockerfile: Dockerfile location

If you have a single repository with multiple services, or your repository is structured so that your Dockerfile is not in the root, you can specify its location when creating or editing your services.

You can specify the location of the Dockerfile relative to the root of the repository. For example root: `/Dockerfile`, or in a subdirectory: `/directory/subdirectory/Dockerfile`.

You can use a Dockerfile outside the build context, but commands in your Dockerfile are relative to the build context. If your build context is set to `/app/src`, the Docker command `COPY . /src` will copy all files from `/app/src` to the `/src` directory in your container.

Learn more about the [Dockerfile](https://docs.docker.com/engine/reference/builder/).

### Build with a Dockerfile: Build engine

Choose between BuildKit (default) or Kaniko under advanced build settings. You may want to choose another build engine if you experience any issues with reliability.

### Build with a Dockerfile: Docker ignore

You should always include a `.dockerignore` file in your repository, in order to reduce the final image size by excluding everything unnecessary.

For example to ignore the git folder and `.env` files you would add the following to `.dockerignore`:

```
.git
*.env
```

### Build with a Dockerfile: Layer caching

You can create a more efficient Dockerfile that will build faster on subsequent builds by taking advantage of layer caching.

For this example, we'll look at the build stage from Northflank's [AngularJS template Dockerfile](https://github.com/northflank-examples/angular-js-example/blob/master/Dockerfile).

The first time the image is built Northflank will run all the build steps in the Dockerfile and write each layer to the image registry. For each subsequent build it checks whether the files for that layer have changed. If there are no changes, the existing layers will be used to complete the build.

In this example the build step `COPY package*.json ./` is nearer the start of the Dockerfile as its files are likely to change less frequently. This means it can be cached and used for future builds where the contents of `package*.json` remain unchanged:

```dockerfile
FROM node:lts-alpine as build-stage     # layer unchanged, use cache
WORKDIR /app                            # layer unchanged, use cache
COPY package*.json ./                   # layer unchanged, use cache
RUN npm install                         # layer unchanged, use cache
COPY . .                                # layer changed, run again
RUN npm run build                       # previous layer changed, run again
```

If you add another dependency to `package.json`, all layers after it must be rebuilt:

```dockerfile
FROM node:lts-alpine as build-stage     # layer unchanged, use cache
WORKDIR /app                            # layer unchanged, use cache
COPY package*.json ./                   # layer changed, run again
RUN npm install                         # previous layer changed, run again
COPY . .                                # previous layer changed, run again
RUN npm run build                       # previous layer changed, run again
```

The above example covers the Dockerfile-based build engines (BuildKit and Kaniko). The buildpack build backend can also benefit from caching. If caching is enabled, the build engine will try to cache and reuse build dependencies from previous builds.

Learn more in the [Docker documentation](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache).

### Build with a Dockerfile: Target build stage

If your Dockerfile contains multiple build stages you can specify the target stage by entering its name here.

For example, for a Dockerfile with the following stages:

```dockerfile
FROM debian AS build-env
# ...

FROM alpine AS production-env
# ...
```

Specifying the target stage as `build-env` will build an image using the commands up until, but not including the `production-env` stage.

Learn more in the [Docker documentation](https://docs.docker.com/engine/reference/commandline/build/#specifying-target-build-stage---target).

### Build with a Dockerfile: Docker build credentials

You can access private images from external container registries in your Docker build process by applying the relevant [registry credentials](run.md#save-registry-credentials-root) in the build settings. You can add or update build credentials for any resource that builds from a Git repository and uses a Dockerfile, under the advanced build setting section in build options.

You can use multiple container registries, but only one credential per container registry can be selected.

After applying the credentials you can use private images in the Dockerfile for the build, in the format `FROM <container-registry>/<account>/<image>:<tag>`.

### Build with a Dockerfile: Clone git folder or full repository

When you build an image Northflank performs a shallow clone of your git repository by default, as only the most recent commit is required in the build process. The `.git` folder is also excluded by default.

If you require the `.git` folder in your build, you can include it in the build environment by selecting include .git folder in the build options section of a service or job, under advanced build settings.

If you require the entire git history to be available, you can also enable full clone. This may significantly increase the time it takes to build larger repositories with extensive histories.

### Build with a Dockerfile: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Inject build arguments: Pass secrets and configuration settings to your builds.](build.md#inject-build-arguments)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
- [Run an image once or on a schedule: Run an image manually or on a cron schedule.](run.md#run-an-image-once-or-on-a-schedule)

## Build with buildpacks

Source: https://northflank.com/docs/v1/application/build/build-with-buildpacks.md

You can build your projects on Northflank using [buildpacks](https://buildpacks.io/docs/). This does not require you to supply a Dockerfile as a buildpack will try to automatically determine how to build your project. You must specify the build context (root by default).

Select buildpack as the build type when creating your service, or change an existing service from the build options page.

You can select from a list of popular buildpacks under advanced build settings if you require support for other languages. Check the provider's documentation for more information on base images and language versions.

![Buildpack stack options in the Northflank application](https://assets.northflank.com/documentation/v1/application/build/build-with-buildpacks/build-options-buildpack.png)

### Build with buildpacks: Buildpack stacks on Northflank

| Buildpack stack | Base image | Supported languages |
| --- | --- | --- |
| [heroku/builder:24](https://github.com/heroku/builder) 1 | Ubuntu 24.04 | Go, Java, Node.js, PHP, Python, Ruby, Scala, .NET |
| [heroku/builder:22](https://github.com/heroku/builder) 1 | Ubuntu 22.04 | Go, Java, Node.js, PHP, Python, Ruby, Scala, .NET |
| [paketobuildpacks/builder-jammy-full:latest](https://paketo.io/docs/reference/builders-reference/) | Ubuntu 22.04 | PHP, Java, Node.js, Go, Python, .NET Core, Ruby, NGINX, HTTPD |
| [paketobuildpacks/builder-jammy-base:latest](https://paketo.io/docs/reference/builders-reference/) | Ubuntu 22.04 | Java, Node.js, Go, Python, .NET Core, Ruby, NGINX |
| [paketobuildpacks/builder-jammy-tiny:latest](https://paketo.io/docs/reference/builders-reference/) | Ubuntu 22.04 | Go, Java |
| [gcr.io/buildpacks/builder:google-22](https://cloud.google.com/docs/buildpacks/builders) | Ubuntu 22.04 | Node.js, Python, Go, Java, .NET, PHP, Ruby |
| [cnbs/sample-builder:alpine](https://github.com/buildpacks/samples/tree/master/builders/alpine) 2 | Alpine 3.10 | Java, Kotlin |
| [cnbs/sample-builder:bionic](https://github.com/buildpacks/samples/tree/master/builders/bionic) 2 | Ubuntu 18.04 | Java, Kotlin, Ruby |
| [heroku/builder-classic:22](https://github.com/heroku/builder) 1 (deprecated) | Ubuntu 22.04 | Go, Java, Node.js, PHP, Python, Ruby, Scala, Clojure |
| [gcr.io/buildpacks/builder:v1](https://github.com/GoogleCloudPlatform/buildpacks) (deprecated) | Ubuntu 18.04 | Node.js, Python, Go, Java, Ruby |
| [paketobuildpacks/builder:tiny](https://paketo.io/docs/concepts/builders/#tiny) (deprecated) | Ubuntu 18.04 | Java, Go |
| [paketobuildpacks/builder:base](https://paketo.io/docs/concepts/builders/#base) (deprecated) | Ubuntu 18.04 | Java, Node.js, Go, .NET Core, Ruby, NGINX |
| [paketobuildpacks/builder:full](https://paketo.io/docs/concepts/builders/#full) (deprecated) | Ubuntu 18.04 | PHP, Java, Node.js, Go, .NET Core, Ruby, NGINX, HTTPD |

> [!note]
>
1. Heroku builder stacks are compatible with the [Cloud Native Buildpacks](https://buildpacks.io/) specification
2. Cloud Native Buildpack stack samples are not recommended for use in production.

### Build with buildpacks: Custom buildpack group

You can use multiple buildpacks together to provide support for more complex builds. For example, you might use one buildpack to install Java, and another buildpack to use Maven to build your application. The builder will run through all the buildpacks to identify the correct ones to use in the build.

You can specify buildpacks in one of the following formats:

| Source | Format | Example | Notes |
| --- | --- | --- | --- |
| URL | `https://<host>/<path>` | `https://buildpack-registry.heroku.com/cnb/heroku/nodejs` | Needs to resolve to a tar.gz file |
| Github URL | `https://<host>/<path>` | `https://github.com/heroku/heroku-buildpack-nodejs.git` | May further specify a tag, branch or commit ID using the format `https://<host>/<repo>#<tag/branch/commit-id>` |
| Image | `[docker://][<host>]/<path>[:<tag>]` | `docker://docker.io/heroku/procfile-cnb:latest` | Can use `@digest` instead of `:<tag>` |
| CNB registry resource | `urn:cnb:registry[:<id>[@<version>]]` | `urn:cnb:registry:heroku/nodejs` |  |

If a string does not include a scheme prefix (ex. `docker://`) the buildpack type can be inferred from the format:

- If it looks like a Docker ref, it will be treated as a `docker://` URI

- If it looks like a buildpack Registry ID, it will be treated as a `urn:cnb:registry` URI

### Build with buildpacks: Layer caching

You can make buildpack builds more efficient and faster on subsequent builds by enabling caching. If enabled, the build engine will cache and reuse build dependencies from previous builds.

Learn more in the [buildpack documentation](https://buildpacks.io/docs/buildpack-author-guide/create-buildpack/caching/).

### Build with buildpacks: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Inject build arguments: Pass secrets and configuration settings to your builds.](build.md#inject-build-arguments)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
- [Run an image once or on a schedule: Run an image manually or on a cron schedule.](run.md#run-an-image-once-or-on-a-schedule)

## Build your code on Northflank

Source: https://northflank.com/docs/v1/application/build/build-your-code-on-northflank.md

At the heart of Northflank is your ability to build your code from Git repositories with a Dockerfile.

Northflank builds Docker container images from your repositories, which can then be easily deployed and scaled on our platform.

When building from Git you can enable continuous integration (CI) to automatically build new commits to the repository, or to specific branches or pull requests.

To build and run an image in one self-contained service you can use [a combined service](run.md#run-an-image-continuously-build-and-run-an-image-in-one-service).

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Add a self-hosted VCS: Add your own self-hosted Git provider and build from its repositories.](collaborate.md#manage-git-integrations-add-a-self-hosted-vcs)
- [Build a repository using a Dockerfile: Configure your application build process using a Dockerfile.](build.md#build-with-a-dockerfile)
- [Build a repository using Buildpacks: Build your application automatically using Buildpack stacks.](build.md#build-with-buildpacks)
- [Build a specific directory: Specify the build context to build only specific directories from your repository.](build.md#build-code-from-a-git-repository-build-a-specific-repository-directory)
- [Trigger a build on changes to specific files or directories: Add path rules to monitor or ignore specific files and directories in a repository for continuous integration build triggers.](build.md#build-code-from-a-git-repository-trigger-a-build-on-changes-to-specific-files-or-directories)
- [Skip CI builds with commit messages: Add strings to your commit messages that will stop Northflank CI from automatically building commits pushed to your repository.](build.md#build-code-from-a-git-repository-skip-ci-with-commit-messages)
- [Inject build arguments: Pass secrets and configuration settings to your builds.](build.md#inject-build-arguments)
- [Pull an image from Northflank: Pull images built on Northflank locally, or use built images as the base image in your Dockerfile.](build.md#pull-images-from-northflank)

## GitHub Enterprise support

Source: https://northflank.com/docs/v1/application/build/github-enterprise-support.md

GitHub Enterprise (GHE) is supported on Northflank as a self-hosted version control system. You can set up a GHE instance and link it to your Northflank team to build and deploy code from your self-hosted repositories.

This feature is feature-flagged and available as part of the self-hosted VCS integration. For general self-hosted VCS setup, see [build code from a self-hosted VCS](https://northflank.com/docs/v1/application/build-code-from-a-self-hosted-vcs).

### GitHub Enterprise support: Set up GitHub Enterprise

1. In your Northflank team, navigate to **Team** → **Integrations**

2. Click **Add a self-hosted VCS**

3. Under **Basic info**, enter a name for the integration

4. Select **GitHub Enterprise** from the **VCS type** dropdown

5. Under **Connection details**, enter your GHE instance URL (e.g., `https://example.ghe.com`). HTTPS is required.

6. Select your **GitHub App location type**:

  - **User account**: App will be created on your personal account

  - **Organization**: App will be created on a GitHub Organization

7. If you selected Organization, enter the **Application namespace** (the organization slug from your GHE URL)

8. Click **Submit**

You will be redirected to your GHE instance to authorize the GitHub App. Northflank will retrieve and store the app details automatically.

### GitHub Enterprise support: Link your GHE instance

1. In your Northflank team, navigate to **Team** → **Integrations**

2. Find your newly created GHE instance in the integrations list

3. Click **Link** on the GHE card

4. Go through the linking steps (follow prompts to authorize access)

The GHE instance is now linked to your Northflank team and you can build code from your repositories.

### GitHub Enterprise support: Link additional organizations

To connect more GitHub organizations to the same GHE instance:

1. Navigate to **Team** → **Integrations**

2. Click on your GHE integration to open its settings

3. Click **Link**

4. Go through the linking steps for the new organization

Each organization is linked independently but uses the same GHE instance configuration.

### GitHub Enterprise support: Use GHE repositories in builds

Once linked, you can select GHE repositories when creating build services or jobs. Select your GHE instance from the version control provider list and choose your repository and branch.

### GitHub Enterprise support: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)

## Inject build arguments

Source: https://northflank.com/docs/v1/application/build/inject-build-arguments.md

You can set [Build arguments (ARG)](https://docs.docker.com/engine/reference/builder/#arg) to be passed to the Docker container at build-time. You can set build arguments in individual resources, or [create a secret group](secure.md#manage-secret-groups) so that multiple resources in a project can inherit the same secrets.

You can also upload [secret files](build.md#inject-build-arguments-add-a-secret-file-to-a-build) to make certificates, configuration files, and other data available in your builds.

![Build arguments editor in the Northflank application](https://assets.northflank.com/documentation/v1/application/build/inject-build-arguments/build-arguments.png)

Although unlikely, some buildpacks may override your build arguments.

You can set build arguments (`ARG`) to be passed to the Docker container at build-time in jobs, build services, and combined services.

Your build arguments will be passed to the Dockerfile on build via the `--build-arg` flag. They do not persist in the built image and are set as key-value pairs.

For example, a variable set as `PACKAGES=npm-cache` can be accessed in the Dockerfile by declaring the ARG. Variables must be declared in the Dockerfile with ARG before being accessed. Arguments will only be in scope for the build section where they are declared.

```dockerfile
FROM alpine as base
ARG PACKAGES
RUN echo "Using: ${PACKAGES}"
# PACKAGES available

FROM base as stage1
RUN echo "Using: ${PACKAGES}"
# PACKAGES not available

FROM base as stage2
ARG PACKAGES
RUN echo "Using: ${PACKAGES}"
# PACKAGES available
```

To set build arguments for a single resource, navigate to the build arguments page in your resource and select an editor mode. You may be prompted to enter your password.

#### Inject build arguments: Persist build arguments in the runtime environment

If you want to access a build argument value in the runtime environment, declare it as an runtime variable (`ENV`) in the Dockerfile with the value of the build argument. You should not pass secrets to your runtime environment in this way, as it will be visible to anyone with the image.

```dockerfile
FROM alpine as production
ARG PACKAGES
ENV PACKAGES=${PACKAGES}
# PACKAGES available in build and runtime
```

![Setting build arguments in the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/inject-secrets/build-arguments.png)

Learn more about build arguments and the [Docker ARG command](https://docs.docker.com/engine/reference/builder/#arg).

### Inject build arguments: Add a secret file to a build

You can include secret files which can be accessed during the build process. This can be useful to provide certificates, secrets, or configuration files that must be accessed during the build process, but which should not be included in your repository.

To add a secret file, paste or upload the content in the secret file editor on the environment page of a build service, combined service, or a job that builds from a repository. You can also upload secret files to [secret groups](secure.md#manage-secret-groups) to make them available to multiple resources in the same project.

Secret files in builds are injected relative to the repository root, unlike secret files in deployed containers which are injected relative to the build root.

Secret files in builds also cannot overwrite files in the repository, for example a repository with `data/config.json` would fail to build if you added a secret file with the path `/data/config.json`.

If you reference a secret file in your Dockerfile it is relative to the build context, not the container root. This also means that the secret file path needs to take the build context into account when you add the file to Northflank.

If you want to access a secret file while using the build context `/frontend` the file path must be set to `/frontend/data/config.json`. You can make the file available under this path by specifying `COPY ./data/config.json .` in the Dockerfile.

The table below gives examples of how a path would be set and accessed in various contexts:

| Secret file mount path | Build context | Secret file relative to build context | Dockerfile COPY example | File location in build after `WORKDIR app; COPY ${file} .` |
| --- | --- | --- | --- | --- |
| `/secrets/my-secret` | `/` | `./secrets/my-secret` | `COPY ./secrets/my-secret .` | `/app/my-secret` |
| `/secrets/my-secret` | `/frontend` | `secret outside of build context` | `secret outside of build context` | `secret outside of build context` |
| `/frontend/secrets/my-secret` | `/frontend` | `./secrets/my-secret` | `COPY ./secrets/my-secret .` | `/app/my-secret` |

### Inject build arguments: Learn more

- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)

## Pull images from Northflank

Source: https://northflank.com/docs/v1/application/build/pull-images-from-Northflank.md

Whenever you build a repository on Northflank the resulting image is stored in the Northflank container repository, ready to be deployed.

You can log in to the Northflank container registry to pull and run images locally, or use built images as the [base image](https://docs.docker.com/engine/reference/builder/#from) in your Dockerfile. This can be useful if, for example, you are building from a monorepo and want to share a base image to reduce build times for different projects within it.

A reference to an image in the Northflank CR takes the format:

`registry.northflank.com/<projectId>/<serviceId>:<buildId>`

- `projectId` is ID of the project your image was built in

- `serviceId` is the service or job used to build your image

- `buildId` can either be the Northflank-generated name for the build, the Git commit SHA, or `latest` to use the most recent build

### Pull images from Northflank: Pull and run an image from Northflank

You can pull Docker images that have been built on Northflank using the [Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/).

Create an [API token](https://northflank.com/docs/v1/application/secure/manage-api-tokens) or copy an existing one, and log in to the Northflank registry using Docker:

`docker login -u [USERNAME] -p [API_TOKEN] https://registry.northflank.com/`

You can find the relevant commands to pull and run the Docker image for a build by navigating to the builds page on a build service, combined service, or a job that builds from a git repository. Find the successful build in the list and click on it to open the logs and metrics view. In the top-right corner click the pull docker image button to view instructions and commands for that specific build.

You can then use this Docker pull command to pull your image from the Northflank registry:

`docker pull registry.northflank.com/<projectId>/<serviceId>:<buildId>`

The image can be run with the command:

`docker run -it registry.northflank.com/<projectId>/<serviceId>:<buildId>`

![A build log in the Northflank application showing the pull Docker image button](https://assets.northflank.com/documentation/v1/application/build/pull-images-from-northflank/build-logs-pull-image.png)

### Pull images from Northflank: Use a built image as a base image

You can use an image built on Northflank as your base image for a [multi-stage build](https://docs.docker.com/build/building/multi-stage/).

Find the URL for your image by following the steps to [pull an image](build.md#pull-images-from-northflank-pull-and-run-an-image-from-northflank).

You can then use the image in your Dockerfile to build on Northflank, and also locally as long as you have pulled the image using Docker. You can supply the URL directly, or by using [build arguments](build.md#inject-build-arguments) (recommended).

```dockerfile
ARG PROJECT_ID
ARG SERVICE_ID
ARG BUILD_ID

# method one
FROM registry.northflank.com/${PROJECT_ID}/${SERVICE_ID}:${BUILD_ID}

# method two: named build image
FROM registry.northflank.com/${PROJECT_ID}/${SERVICE_ID}:${BUILD_ID} as builder
```

### Pull images from Northflank: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Build a repository using a Dockerfile: Configure your application build process using a Dockerfile.](build.md#build-with-a-dockerfile)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)

## Share builds across projects

Source: https://northflank.com/docs/v1/application/build/share-builds-across-projects.md

Cross-project builds let you reference a build service from any project in your team or organization. A single build service can produce images consumed by deployment services and jobs across multiple projects.

Use this to organize resources so one build service powers multiple environments. For example, a shared CI build in a `builds` project can deploy to separate `staging`, `qa`, and `production` projects.

### Share builds across projects: Enable cross-project access

Build services require explicit configuration to allow cross-project references. By default, a build service can only be referenced within its own project.

1. Navigate to your build service.

2. Click **Build options**.

3. Scroll to **Advanced build settings**.

4. Under **Cross project access**, enable **Share build access to other projects**.

5. Select which projects can reference this build service (optional):

  - By default, all projects in your team can reference this build service

  - To restrict access, add specific project IDs to allow only those projects

  - Enable **Use as exclusion rule** to allow all projects except the ones listed

6. Click **Update build options**.

Once enabled, the build service can be referenced from deployment services, jobs, and workflows in the allowed projects.

### Share builds across projects: Reference a shared build

After enabling cross-project access, you can reference the build service from deployment services through the UI or programmatically in templates and workflows.

#### Share builds across projects: Link to a deployment service in the UI

1. Create a new deployment service

2. Under **Deployment**, select **Northflank** as the deployment source

3. The **Link build service** section appears

4. Under **Build service**, select the project and build service you want to deploy

5. Select **Branch** to deploy from

6. Click **Create service**

The deployment service will now use builds from the selected cross-project build service.

#### Share builds across projects: Use in templates and workflows

Cross-project build references work in templates, workflows, and preview blueprints.

Reference a build service using its ID, prefixed with the project ID:

```
<project-id>/<build-service-id>
```

If the build service is in the same project, omit the project ID prefix:

```
<build-service-id>
```

For a deployment service node consuming a cross-project build:

```json
{
  "kind": "DeploymentService",
  "spec": {
    "type": "deployment",
    "internal": {
      "id": "builds-project/shared-build-service",
      "branch": "main",
      "buildSHA": "latest"
    }
  }
}
```

### Share builds across projects: Access control

Build services can only be referenced by projects in the same team. Access can be controlled on the build service level by allowing access from all or specific projects.

### Share builds across projects: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Build a repository using a Dockerfile: Configure your application build process using a Dockerfile.](build.md#build-with-a-dockerfile)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)

## Use custom build registry

Source: https://northflank.com/docs/v1/application/build/use-custom-build-registry.md

Use your cloud provider's Docker registry to store build images instead of Northflank's managed registry. Supported providers are Azure, AWS, and GCP.

This can only be configured when creating a new project.

### Use custom build registry: Prerequisites

Your BYOC provider integration must have these features enabled:

- **Docker Registries**: Allows pulling images from your registry

- **Docker Registry Push**: Allows pushing built images to your registry

If these features are not enabled, you cannot create a custom registry integration.

### Use custom build registry: Add a custom Docker registry

1. Navigate to **Integrations** in your team settings

2. Click **Registries** → **Add registry**

3. Enter a registry name and select your container registry provider (Azure, AWS, or GCP)

4. Select an existing BYOC integration or create a new one for Azure, AWS, or GCP

5. Enter the provider-specific registry settings:

  - **GCP**: Registry URL and project ID

  - **AWS**: Registry URL and region

  - **Azure**: Registry URL and resource group

6. Under **Select the permissions you want to grant to this registry**, enable **Push access (write images)**

7. Click **Add registry**

The registry is now available for use in new projects.

### Use custom build registry: Use in a project

1. Create a new project

2. Under **Advanced options**, expand **Docker Registry settings**

3. Set **Registry Mode** to **Self Hosted**

4. Under **Registry**, select your custom registry integration

5. Click **Create project**

All builds in this project will now push images to your custom registry.

### Use custom build registry: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Inject build arguments: Pass secrets and configuration settings to your builds.](build.md#inject-build-arguments)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
- [Run an image once or on a schedule: Run an image manually or on a cron schedule.](run.md#run-an-image-once-or-on-a-schedule)
