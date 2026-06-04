# Getting Started

Generated from 7 application pages listed in `llms.txt`.

## Pages

- [Add and verify a domain](#add-and-verify-a-domain)
- [Build and deploy your code](#build-and-deploy-your-code)
- [Create a project](#create-a-project)
- [Introduction to Northflank](#introduction-to-northflank)
- [Link your Git account](#link-your-git-account)
- [Set up a pipeline](#set-up-a-pipeline)
- [Set up environments](#set-up-environments)

## Add and verify a domain

Source: https://northflank.com/docs/v1/application/getting-started/add-a-and-verify-domain.md

You can add your own domains and subdomains to Northflank to use with your deployed service's public ports.

Domains and subdomains are verified on your Northflank account, so once added you can reassign them to any public port for any deployment on your account.

If you use OVH, Cloudflare, NS1, or Namecheap, check our [specific guides for these domain registrars](domains.md#domains-on-northflank-dns-providers).

### Add and verify a domain: Add a domain

You can add any domain (for example `one.yourdomain.com`) provided you have the ability to edit the DNS records.

1. [Click here](https://app.northflank.com/s/account/domains/new), or open the domains page in your account settings.

2. Click add domain, enter your domain name, and click add domain

3. You will now see the information required to verify your domain, including the `record name` and `record content`. You will need to add this to your DNS records as a text (TXT) record.

4. Open a new browser tab or window and navigate to your DNS provider

5. Log in to your control panel and find the DNS settings for your domain

6. Add a new text (TXT) record with the `record name` and `record content` specified in the entry you just generated for the domain on Northflank

7. Return to the Northflank domains page and select verify on the entry for your domain

8. Northflank will attempt to verify your domain - if not, check you have entered the record correctly and try again. If you need to, you can close the verification dialogue and come back to it later.

![A verified domain in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/add-a-domain-to-your-account/domain-verified.png)

### Add and verify a domain: Add a subdomain

You can add any subdomain provided you have the ability to edit the DNS records.

1. [Click here](https://app.northflank.com/s/account/domains/subdomains/new), or open the domains page in your account settings

2. Click add subdomain and select the root domain name you want to create a subdomain for

3. Enter the subdomain you want to use and click create subdomain

4. You will now see the information required to verify your domain, including the `record name` and `record content`. You will need to add this to your DNS records as a CNAME, ALIAS, or APEX record (depending on host).

  ![An unverified subdomain in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/add-a-domain-to-your-account/subdomain-unverified.png)

5. Open a new browser tab or window and navigate to your DNS provider

6. Log in to your control panel and find the DNS settings for your domain

7. Add a new CNAME record with the `record name` and `record content` specified in the entry you just generated for the subdomain on Northflank

8. Set the time to live (TTL) as recommended, or as low as you can to make your domain available as soon as possible

9. Return to the Northflank domains page and select verify on the entry for your subdomain

10. Northflank will attempt to verify your domain - if it doesn't verify, check you have entered the record correctly and try again. If you need to, you can close the verification dialogue and come back to it later.

### Add and verify a domain: Link a domain to a port

1. Open the ports & DNS page on the service that contains the port you want to link and click edit domains, or click link domains next to the port

2. Find the domain or subdomain you wish to associate with the service in the list

3. Select the port from drop-down list next to the subdomain you want to link

4. Click save changes

![Linking a domain to a port on a combined service in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/link-a-domain-to-a-port/custom-domain.png)

Northflank will automatically generate TLS certificates for your domain or subdomain and your domain should redirect to your specified port soon after saving. You can also manage the ports that your domains are linked to via your account's domains page in your account dashboard.

### Add and verify a domain: Learn more about domains on Northflank

- [Domains on Northflank: Manage your domains on Northflank, quickly and easily assigning them to your deployments.](domains.md#domains-on-northflank)
- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Use your apex domain: Use your apex (root) domain name with a Northflank service.](domains.md#add-a-domain-to-your-account-add-a-domain)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)

## Build and deploy your code

Source: https://northflank.com/docs/v1/application/getting-started/build-and-deploy-your-code.md

This walkthrough will take you through the steps to build and deploy your code in one simple service.

Combined services are a self-contained continuous integration and continuous delivery system.

It's as easy as choosing a branch from a Git repository to automatically build and deploy from.

Combined services cannot be added to a pipeline as they act as a self-contained pipeline. If you want to create a more complex workflow, the [set up a pipeline](getting-started.md#set-up-a-pipeline) walkthrough will take you through all the steps.

### Build and deploy your code: Create a combined service

All aspects of a combined service can be configured after creation - except the name.

1. [Click here](https://app.northflank.com/s/project/create/service), or choose service from the create new menu in the top right corner of the dashboard

2. Select combined

3. Basic information: select combined service and enter a name

4. Repository: select the repository from the drop-down list and choose the branch you want to build from

5. Build options: choose Dockerfile if you have a Dockerfile in your registry, or buildpack to automatically build your application. If your Dockerfile and/or build context are not root, specify the relative paths.

6. Environment variables (optional): you can set runtime variables and build arguments, or add [secret files](secure.md#upload-secret-files) in advanced

7. Networking (optional): Northflank will automatically detect and add ports exposed in your Dockerfile, or add a public port for buildpacks. You can create a service with no ports. Networking will be covered in more detail later in this walkthrough.

8. Resources: leave the resources as the default values for now, this walkthough will cover scaling later

9. Advanced (optional): you can configure health checks, a Docker CMD override, and add a persistent volume

10. Click create service

![Creating a combined service in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/build-and-deploy-your-code/create-combined-service.png)

### Build and deploy your code: Service dashboard

You will be taken to your new service's overview after creating it, you can find your service again by clicking on the services icon in the project menu on the left.

Your combined service will immediately start to build the latest commit to your branch.

Your combined service has CI/CD enabled by default and will automatically build and deploy the latest commits to your linked repository branch.

![A combined service overview in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/build-and-deploy-your-code/combined_service_overview.png)

#### Build and deploy your code: Combined service controls

The service header displays some useful details of the service at a glance:

- Public DNS

- Service region

- Git repository

- Repository branch

- Currently deployed commit hash

- Active containers and their status

You can manage your service using the controls found at the top of the dashboard:

- You can toggle CI (continuous integration) to enable or disable the automatic build of the latest commit to the repository, branch, or pull request.

- You can toggle CD (continuous delivery) to enable or disable the automatic deployment of new builds to your service. All instances will be redeployed with the new build. If you also have CI enabled, your service will automatically build and deploy the latest commits from your tracked branch.

- You can trigger a restart  to automatically replace the running containers with new instances. An old container will not be halted until its replacement is confirmed running.

- You can scale  the amount of instances up or down by entering the desired amount and saving.

- You can pause  to disable CI/CD and scale the service to 0 instances or resume

#### Build and deploy your code: Service overview

The service overview contains real-time information on:

- Recent builds by the service

- Latest commits to the linked repository branch

- Active containers and their status

- Any configured public and private ports

- Local access, which includes commands to connect to the service on your machine via the Northflank CLI

### Build and deploy your code: Configure your service

This walkthrough will take you through two commons tasks to configure a deployment: exposing a public port and increasing the resources available to your service.

#### Build and deploy your code: Add a public port

Northflank can automatically detect and configure ports exposed in your Dockerfile, however you may sometimes need to manually add or edit ports.

Your Dockerfile should expose the port(s) configured in your application/service. For example if you have an Express.js application configured to listen for requests on port 3000, your Dockerfile should include `EXPOSE 3000`.

1. Go to the ports & DNS page in your service

2. Click add port

3. Enter the port to expose (between 1 and 65,535)

4. Choose HTTP as the protocol (public ports only support HTTP/S)

5. Select publicly expose this port to the internet

6. Enter a name for the port (this will form part of the unique DNS generated by Northflank)

7. Save changes to start using the newly configured port

![The ports and DNS configuration page for a service in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/build-and-deploy-your-code/combined-service-port.png)

Northflank will automatically generate TLS certificates for your public ports using [Let's Encrypt](https://letsencrypt.org/).

If the website or service is inaccessible, check that the correct ports exposed by your application and Dockerfile.

#### Build and deploy your code: Increase your service's resources

The resources dedicated to your services will determine how they perform under load.

To build your code faster or run intensive applications you may need to increase the compute plan (CPU and memory) of your service.

If you expect or experience a high volume of traffic to your deployment, you should scale up the number of instances. Northflank will automatically load-balance incoming traffic to your instances to ensure maximum availability.

You can quickly scale the number of containers your deployment is running from the service header controls, but you can scale your service and increase other resources from the resources page.

1. Go the resources page in your service

2. Select a new compute plan with a combination of a higher share of a vCPU, or a dedicated CPU, and higher memory

3. Increase the number of instances

4. Update & restart your service to deploy more instances with the selected resources

![The resources page for a service in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/build-and-deploy-your-code/combined-service-resources.png)

If you’re trialling Northflank with a Developer Sandbox plan, you’ll need to [upgrade your plan](billing.md#pricing-on-northflank) to scale up your resources.

### Build and deploy your code: Next steps

Now you have built and run your first service on Northflank, made it available online via a public port, and increased the available resources and number of containers running your application.

Next you can learn about the other features and options available on your services, or learn how to create and manage development pipelines to enjoy a seamless devops experience.

- [Set up a pipeline: Manage your workflow and release your code in an intuitive pipeline.](getting-started.md#set-up-a-pipeline)
- [Add and verify domain: Add your domain name to your Northflank account and link it to a public port.](getting-started.md#add-and-verify-a-domain)
- [Configure health checks: Monitor the uptime and success of your deployed services and builds to ensure your code runs correctly and is always available.](observe.md#configure-health-checks)
- [View logs: View detailed, real-time logs from builds, deployments, and more.](observe.md#view-logs)
- [Deploy a database: Create a database to use with your Northflank deployments.](databases-and-persistence.md#deploy-a-database)
- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)

## Create a project

Source: https://northflank.com/docs/v1/application/getting-started/create-a-project.md

Projects allow you to group together different resources within Northflank.

Projects on Northflank contain services to build and deploy your code, databases, storage volumes, and secret groups which can create isolated networks with each other in the same project and can communicate without the need for public endpoints.

You can select the region for each of your projects, which determines where your services and data are hosted.

### Create a project: Select a billing plan

When creating your Northflank account you will be asked to select a billing plan. Your plan determines the resources available to you on Northflank’s managed cloud, as well as your own cloud providers.

You can select the Developer Sandbox to try the Northflank platform for free. You’ll be able to create one project with some services, jobs, and addons, as well as deploy one BYOC cluster. You can upgrade your plan at any time, keeping your existing resources.

Alternatively, you can start with the pay as you go plan to start using Northflank without restrictions straight away.

[See our pricing page for a detailed description of account plans.](https://northflank.com/pricing)

### Create a project: Create a project

Projects are specific to geographic regions, which determine where resources will be provisioned.

To create a new project:

1. [Click here](https://app.northflank.com/s/account/projects/new), or select project from the create new drop-down menu in the top right corner of the screen

2. Enter a project name (optional: choose a colour to help identify different projects)

3. Choose your [project region](getting-started.md#create-a-project-project-provider), this will determine where your project is hosted

4. Create your new project

![Creating a new project in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/create-a-project/create-project.png)

> [!note]
>
- The region cannot be changed after your project has been created
- A project cannot be transferred to other teams

Once your project has been created, you can start building and running your code, managing workflows in pipelines, and more.

![Creating a new project in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/create-a-project/empty-project-overview.png)

### Create a project: Project region

You can deploy your code to a specific region by [creating a project](getting-started.md#create-a-project) in that region. This allows jobs or services to be run closer to customers, your development team, or external service for better connectivity.

You cannot change the region of a project after it is created, and all resources deployed in that project will be deployed in that region. [Builds](build.md#build-your-code-on-northflank), unless [configured to run on your own cluster](bring-your-own-cloud.md#configure-your-cluster-select-build-infrastructure), are performed on Northflank build infrastructure outside your project.

Northflank currently supports the following regions:

| Region | API reference | Global region |
| --- | --- | --- |
| Africa South | `africa-south` | EMEA |
| Asia East | `asia-east` | Asia Pacific |
| Asia Northeast | `asia-northeast` | Asia Pacific |
| Asia Southeast | `asia-southeast` | Asia Pacific |
| Australia Southeast | `australia-southeast` | Asia Pacific |
| Canada Central | `canada-central` | Americas |
| Europe West | `europe-west` | EMEA |
| Europe West Frankfurt | `europe-west-frankfurt` | EMEA |
| Europe West Netherlands | `europe-west-netherlands` | EMEA |
| Europe West Zurich | `europe-west-zurich` | EMEA |
| Southamerica East | `southamerica-east` | Americas |
| US Central | `us-central` | Americas |
| US East Ohio | `us-east-ohio` | Americas |
| US East1 | `us-east1` | Americas |
| US West | `us-west` | Americas |
| US West California | `us-west-california` | Americas |

Contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) to register your interest for regions not listed above.

You can also [integrate with other cloud providers](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank) to deploy your own clusters, which will allow you to create projects hosted on your chosen cloud provider, in the regions they support.

### Create a project: Delete a project

You can delete a project from the project   menu in the header of your project, or from the  project settings page.

Deleting a project will trigger the deletion of all resources contained within it, including builds, deployments, jobs, addons, as well as configurations such as secret groups and release flows. The process is irreversible, so please ensure you have backed up any databases and configuration files you want to keep.

You will still be billed for all resources consumed up to the project's deletion.

### Create a project: Next steps

- [Build and deploy your code: Quickly and easily build and run code from a Git repository using a Dockerfile or buildpack.](getting-started.md#build-and-deploy-your-code)
- [Set up a pipeline: Manage your workflow and release your code in an intuitive pipeline.](getting-started.md#set-up-a-pipeline)
- [Add and verify domain: Add your domain name to your Northflank account and link it to a public port.](getting-started.md#add-and-verify-a-domain)

## Introduction to Northflank

Source: https://northflank.com/docs/v1/application/getting-started/introduction-to-northflank.md

Northflank is the full-stack cloud platform. Seamlessly build, deploy and scale your code, jobs and databases.

Northflank allows you to:

- Build and deploy code written in any language, using any framework, with a Dockerfile or a buildpack. Simply connect your account on a Git provider such as GitHub, GitLab, or Bitbucket.

- Automatically build and deploy every commit you make, or you can create rules for specific branches and pull requests.

- Deploy Docker images from external registries such as Docker Hub, Google Container Registry, or GitHub Packages container registry. Save your credentials to easily access private registries.

- Deploy addon databases & services such as MinIO and RabbitMQ in one click and connect these with your services to create fully stateful applications.

- Run your code on a schedule or as and when you need to with cron and manual jobs. A job can build and run any code from a repository — or use an existing Docker image from a public or private registry.

- Create team accounts at no extra cost, with all the features of user accounts. Work together seamlessly with the real-time user interface that shows you what your team members are doing. Granular role-based access control means you can securely give your developers access to exactly what they need.

- Work in real time. All actions, updates and changes are instantly reflected in the user interface, resulting in unparalleled developer experience.

- Set up dedicated development, staging and production environments with pipelines. When you are happy with a development build, simply promote it to another linked deployment service in the next stage with one click.

- Save groups of build and runtime variables to inherit in your deployments. Get connection details from addons and create dynamic variables using templating.

![The horizontal scaling form for a deployment in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/introduction-to-northflank/project-overview.png)

### Introduction to Northflank: Create your Northflank account

You can create an account and set up a personal team on Northflank for [free](billing.md#pricing-on-northflank-deploy-for-free), with limited resources. You can later upgrade this team or create a new one to fully utilise the Northflank platform.

> [!note]
> [Click here](https://app.northflank.com/signup) to create an account.
You can invite users to a team to [collaborate on Northflank](collaborate.md#create-a-team), at no extra cost.

If you would like to manage more users across multiple teams you can [create an organisation](collaborate.md#manage-an-organisation) to unlock enterprise features.

See our [pricing page](https://northflank.com/pricing) for more information on plans.

![Creating a team in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/create-a-team/create-team.png)

### Introduction to Northflank: Getting started

The getting started section contains walkthrough guides to get you up-and-running on Northflank. They follow the in-app onboarding achievements, which can be found under the rocket button  in the top-right of the application.

- [Link your Git account: Integrate your Git accounts with Northflank to start building and deploying your code.](getting-started.md#link-your-git-account)
- [Create a project: Create a project to contain your services, persistent data, secrets, and more.](getting-started.md#create-a-project)
- [Create a team and invite members: Create a team and invite members to collaborate on projects.](collaborate.md#create-a-team)
- [Build and deploy your code: Quickly and easily build and run code from a Git repository using a Dockerfile or buildpack.](getting-started.md#build-and-deploy-your-code)
- [Set up a pipeline: Manage your workflow and release your code in an intuitive pipeline.](getting-started.md#set-up-a-pipeline)
- [Add and verify domain: Add your domain name to your Northflank account and link it to a public port.](getting-started.md#add-and-verify-a-domain)

## Link your Git account

Source: https://northflank.com/docs/v1/application/getting-started/link-your-git-account.md

Northflank integrates with Git version control systems (VCS) such as GitHub, GitLab, Bitbucket and Azure DevOps in order to build and deploy code from your repositories.

You will be prompted to link a Git account when you create a team, or if your team no longer has access to any Git provider.

You can also link self-hosted instances of GitLab and GitHub Enterprise, as well as multiple accounts for GitHub, GitLab, Bitbucket and Azure DevOps.

You can manage Git integrations from your team dashboard.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/vcs) to link a Git account.

![The Git integration page in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/link-your-git-account/git-integration-page.png)

### Link your Git account: Link your GitHub account

GitHub integrates with Northflank through the GitHub app ecosystem.

When you connect your GitHub account you will be redirected to GitHub's login and application installation page.

#### Link your Git account: Link your GitHub account

1. Navigate to the Git integration page in your Northflank team

2. Click Link GitHub

3. Select the team or organisation you want to link

![Installing Northflank in GitHub](https://assets.northflank.com/documentation/v1/application/getting-started/link-your-git-account/github-install.jpg)

1. Choose the repositories that you wish to build and deploy on Northflank, or grant access to all the repositories on the account

![Authorising Northflank in GitHub](https://assets.northflank.com/documentation/v1/application/getting-started/link-your-git-account/github-authorize.jpg)

You will now be redirected back to Northflank and you will see your GitHub account name on the entry for GitHub. You can now begin building and deploying code from your GitHub repositories.

The GitHub app will automatically send Northflank webhooks for events on your repositories, which means commits to your monitored branches and pull requests can be built instantly.

You can unlink GitHub from your Northflank team, which will stop Northflank from building any future commits to your repositories.

#### Link your Git account: Edit installation

You can select a GitHub account on Northflank and click edit installation to change which repositories are available on Northflank.

If you need to re-link a GitHub account that already has the Northflank application installed, you must toggle between your repository restrictions settings to activate the save button on GitHub.

#### Link your Git account: Remove GitHub

To remove your team's access to your GitHub account, select the account and click unlink.

To remove Northflank from your GitHub team you must uninstall the Northflank app from your GitHub settings.

### Link your Git account: Link your GitLab account

You can connect your GitLab account with Northflank via OAuth or Personal Access Token (PAT). When you connect your GitLab account you will be redirected to GitLab to complete the verification steps. All repositories your GitLab account has access to, including repositories that you do not own, are accessible with the connection.

Personal Access Token (PAT) authentication is a feature-flagged option. If you don't see the PAT option, contact support to enable it for your team.

#### Link your Git account: Link your GitLab account

1. Navigate to the Git integration page in your Northflank team

2. Click Link GitLab

![Authorising Northflank in GitLab](https://assets.northflank.com/documentation/v1/application/getting-started/link-your-git-account/gitlab-install.jpg)

You will now be redirected back to Northflank and you will see your GitLab account name on the entry for GitLab. You will be prompted to select whether to restrict access to certain GitLab namespaces.

You can now begin building and deploying code from your GitLab repositories.

#### Link your Git account: Regenerate webhooks

Northflank makes an API request to create webhooks for your GitLab repositories to enable CI. You can regenerate the webhooks if the token is accidentally deleted or exposed.

#### Link your Git account: Link via Personal Access Token

If PAT authentication is enabled for your team, you can link GitLab using a Personal Access Token instead of OAuth.

1. Navigate to the Git integration page in your Northflank team

2. Click Link with PAT on the GitLab card

3. Enter your GitLab Personal Access Token

Your PAT must have the following scopes:

- api

- read_repository

Repository access is scoped to the permissions granted in your PAT. Your PAT must have access to all projects you want to use with Northflank.

#### Link your Git account: Remove GitLab

To remove your team's access to your GitLab account, select the account and click unlink.

To remove Northflank from your GitLab account, go to your GitLab preferences, open the applications page, and revoke the Northflank application's access.

### Link your Git account: Link your Bitbucket account

You can connect your Bitbucket account with Northflank via OAuth. When you connect your Bitbucket account you will be redirected to Bitbucket to complete the verification steps. All repositories your Bitbucket account has access to, including repositories that you do not own, are accessible with the connection.

1. Navigate to the Git integration page in your Northflank team

2. Click Link Bitbucket

![Authorising Northflank on Bitbucket](https://assets.northflank.com/documentation/v1/application/getting-started/link-your-git-account/bitbucket-install.jpg)

You will now be redirected back to Northflank and you will see your Bitbucket account name on the entry for Bitbucket. You will be prompted to select whether to restrict access to certain namespaces.

#### Link your Git account: Regenerate webhooks

Northflank makes an API request to create webhooks for your Bitbucket repositories to enable CI. You can regenerate the webhooks if the token is accidentally deleted or exposed.

#### Link your Git account: Remove BitBucket

To remove your team's access to your Bitbucket account, select the linked account and click unlink.

To completely remove Northflank from your Bitbucket account, go to Bitbucket personal settings, open the app authorizations page and revoke the Northflank application's access.

### Link your Git account: Link your Azure DevOps account

You can connect your Azure DevOps account with Northflank via OAuth or Personal Access Token (PAT). When you connect your Azure DevOps account you will be redirected to Azure DevOps to complete the verification steps. All repositories your Azure DevOps account has access to, including repositories that you do not own, are accessible with the connection.

Personal Access Token (PAT) authentication is a feature-flagged option. If you don't see the PAT option, contact support to enable it for your team.

#### Link your Git account: Link your Azure DevOps account

1. Navigate to the Git integration page in your Northflank team

2. Click Link Azure DevOps to be redirected to Azure DevOps and authorize Northflank access.

3. Log in with your Microsoft account and authorize the connection

You will now be redirected back to Northflank and you will see your Azure DevOps account name on the entry for Azure DevOps. You can now begin building and deploying code from your Azure DevOps repositories.

#### Link your Git account: Link via Personal Access Token

If PAT authentication is enabled for your team, you can link Azure DevOps using a Personal Access Token instead of OAuth.

1. Navigate to the Git integration page in your Northflank team

2. Click Link with PAT on the Azure DevOps card

3. Enter your Azure DevOps Personal Access Token

Your PAT must have the following scopes:

- Code (read)

- Build (read)

Repository access is scoped to the permissions granted in your PAT. Your PAT must have access to all organizations and repositories you want to use with Northflank.

#### Link your Git account: Remove Azure DevOps

To remove your team's access to your Azure DevOps account, select the account and click unlink.

### Link your Git account: Set team namespaces

On team accounts you may need to restrict access to certain namespaces on your linked Git accounts.

GitHub account restrictions are managed on GitHub by selecting which account/organisation to install the Northflank GitHub app on, and then granting access to specific repositories on that account.

Your linked GitLab and Bitbucket accounts can be restricted to certain namespaces by opening the settings on the respective entry. Select restricted and pick the contexts you want your team members to access. Remove a namespace from the list to revoke access. The namespaces available to your team will be displayed on the git integrations page in the section for the relevant service.
Remove a namespace from the list in the selected account to revoke access.

New namespaces can be created in your Gitlab and Bitbucket accounts by creating new projects.

#### Link your Git account: Restrict self-hosted VCS access

You can restrict access to the repositories in your self-hosted VCS by selecting specific owners within the self-hosted VCS's settings. Team members will be able to build and run from repositories belonging to the selected namespaces, if your account has access to them.

Unrestricted access means team members will be able to create services and jobs from every repository that the linked account can access.

### Link your Git account: Next steps

- [Create a project: Create a project to contain your services, persistent data, secrets, and more.](getting-started.md#create-a-project)
- [Build and deploy your code: Quickly and easily build and run code from a Git repository using a Dockerfile or buildpack.](getting-started.md#build-and-deploy-your-code)
- [Add a self-hosted VCS: Add your own self-hosted Git provider and build from its repositories.](collaborate.md#manage-git-integrations-add-a-self-hosted-vcs)
- [Save registry credentials: Save your credentials for a container registry to access private images.](run.md#save-registry-credentials)

## Set up a pipeline

Source: https://northflank.com/docs/v1/application/getting-started/set-up-a-pipeline.md

> [!note]
> Northflank recommends using [Environments](getting-started.md#set-up-environments) for CI/CD. Pipelines are still supported but may be deprecated in future.

Pipelines on Northflank allow you to create and manage complex continuous integration and continuous delivery (CI/CD) workflows.

By adding your project's resources to a pipeline and creating release flows for each stage, you can automate your releases from development through to production.

Pipelines and release flows allow you to manage building and deploying your code, backing up data and running migrations, promoting deployed images from one stage to the next, and more.

This guide will take you through creating a pipeline, a build service, and a deployment service, and then populating a pipeline stage and configuring a simple release flow to deploy code built on Northflank.

### Set up a pipeline: Create a pipeline

To create a pipeline:

1. [Click here](https://app.northflank.com/s/project/create/pipeline), or choose pipeline from the create new drop-down menu in the top right corner of the dashboard

2. Enter a name

3. Click create pipeline

### Set up a pipeline: Create a build service

You can configure most aspects of a build service after it is created - except the name.

1. [Click here](https://app.northflank.com/s/project/create/service), or open the create new menu in the top right corner of the dashboard and select service

2. Select build

3. Basic information: enter a name for your service

4. Repository: select the repository from the drop-down list and choose the branch you want to build from

5. Repository: enter your pull request and branch build rules, or leave blank to build all new commits. You can set multiple rules, and you can add rules for both pull requests and branches.

6. Build options: choose Dockerfile if you have a custom Dockerfile in your registry, or buildpack to automatically build your application. If your Dockerfile and/or build context are not root, specify the relative paths.

7. Environment variables (optional): you can set runtime variables and build arguments here, if required

8. Resources: set the compute plan to suit your build

9. Click create service

### Set up a pipeline: Create deployment services

You can configure most aspects of a deployment service after it is created - except the name.

1. [Click here](https://app.northflank.com/s/project/create/service), or open the create new menu in the top right corner of the dashboard and select service

2. Select deployment

3. Basic information: enter a name for your service

4. Deployment: select Northflank as the source, but do not link the build service

5. Environment variables (optional): you can set runtime variables and build arguments here, if required

6. Networking (optional): add any required public or private ports

7. Resources: set the compute plan and number of instances to suit your deployment

8. Advanced (optional): you can configure health checks and a Docker CMD override, if required

9. Click create service

### Set up a pipeline: Add resources to your pipeline

1. Select the pipeline you want to use from the project pipelines page

2. Click  add items to development

3. Find your deployment service, select it, and click add 1 item to add it to the stage. This will make it available in your release flow when you configure one.

![A pipeline in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-a-pipeline/pipeline.png)

You can add multiple deployment services, jobs, and addons to a pipeline stage.

Removing a deployment service from a pipeline will not unlink its build service or external image, nor pause the deployment service. You can edit or disable the deployment service itself from its own dashboard.

### Set up a pipeline: Add a release flow

Now you can create a release flow for the development stage of your pipeline, which you have populated with your deployment service.

1. Click  add release flow in the header for the development stage

2. Select  get started with visual editor

3. Click and drag a start build node into the sequential workflow

4. Click on the start build node to edit it. Select your build service for `service / job`, the `branch` you want to build, and leave the `commit` field blank to build the latest commit to the branch, or select a specific commit to build.

5. Enable wait for completion for the node. This option means that the next node will not run until this one has completed, in this instance the release flow will wait for the build to finish before running the next node. Save node to finish configuring the node.

6. Click and drag a deploy build node and drop it below the start build node. Click on it to configure the node.

7. Select the same `build service` as you used in the start build node, select the `build` by selecting the branch or PR you want to deploy from, and either `latest` or a specific build. Select your deployment service as the `target` and save node.

8. Exit the release flow editor by clicking the  close button in the top-right corner

![Editing a node in a release flow in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-a-pipeline/release-flow-edit-node.png)

### Set up a pipeline: Run a release flow

After you have configured a release flow for your pipeline stage, you can now run it and Northflank will execute the workflow as you have specified it.

1. Click  run in the header for the development stage

2. Add a name for the release and a description. This can be useful to track your releases, so you can quickly identify what is deployed to an environment and to roll back to a previous release if you need to.

3. Ignore the expandable menu with the name of your deployment service. In future, you can use this to override the default release flow configuration for one run only, so you can quickly run a release without needing to edit the whole template.

4. Click run and watch the release flow

![A release flow run in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-a-pipeline/release-flow-run-success.png)

### Set up a pipeline: Promote a deployed image

You can configure a release flow to promote images deployed in the preceding stage to the stage that contains the release flow. You can promote any image deployed to a deployment service or job, whether they are built on Northflank or deployed from an external container registry.

You can only select images from the previous pipeline stage to promote.

To deploy images from a previous stage:

1. Add your required deployment services and jobs to your staging or production stage

2. Open the release flow editor and add a promote deployment node

3. Edit the node and select the `origin`, which is a deployment service or job from the previous stage

4. Select `target`, which is the deployment service or job in the current stage that you want to deploy the image

5. Save release flow and  run it, the image(s) in your previous stage will be promoted to the current stage

![A release flow node to promote a deployment in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-a-pipeline/release-flow-promote-deployment.png)

### Set up a pipeline: Learn more about using pipelines and release flows on Northflank

- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Configure a release flow: Learn how to use the visual editor or code to configure a release flow.](release.md#configure-a-release-flow)
- [Run a release flow: Run a release flow and manage releases for your different environments.](release.md#run-and-manage-releases)
- [Set up a preview environment: Create templates in your pipelines to automatically generate temporary preview environments to view pull requests and branches.](release.md#set-up-a-preview-environment)
- [Roll back a release: Roll back a release to a previous version.](release.md#run-and-manage-releases-roll-back-a-release)
- [Manage CI/CD: Configure continuous integration and continuous delivery on your Northflank services.](release.md#manage-cicd)
- [Run migrations: Run database migrations and update your deployments simultaneously when you update your schema.](release.md#run-migrations)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)

## Set up environments

Source: https://northflank.com/docs/v1/application/getting-started/set-up-environments.md

Environments on Northflank allow you to automate your release process and preview changes in isolated environments.

By creating workflows, you can automate building and deploying your code, backing up databases, running migrations, and promoting deployments from development through to production. By creating preview blueprints, you can automatically provision complete environments when you push commits or open pull requests.

This guide will walk you through creating a build service, setting up preview environments for pull requests, and creating workflows to automate deployments across development stages.

![Environments in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/environments.png)

### Set up environments: Create a build service

Before you can deploy code, you need a build service to compile your source code into images. This build service will be shared across your workflows and preview environments, ensuring consistent builds across all deployment stages.

1. Navigate to [**Services**](https://app.northflank.com/s/project/services) in your project

2. Click **Create service** → **Build**

3. Under **Basic information** enter a service name

4. Under **Repository** select your repository from the dropdown

  - **Trigger mode**: Select **Build rules**

  - **Pull request build rules**: Leave empty (configured later in preview blueprint)

  - **Branch build rules**: Leave empty (configured later in preview blueprint)

5. Under **Build options** select **Dockerfile** if you have a custom Dockerfile or **Buildpack**

  - If your Dockerfile is not in the root directory, specify the relative paths

6. Under **Resources** choose a compute plan appropriate for your build workload

7. Under **Environment variables** add build arguments or runtime variables if required

8. Click **Create service**

### Set up environments: Create a preview blueprint

Preview blueprints automatically create isolated test environments when you open pull requests. Each preview environment gets its own services, databases, and unique URLs, allowing you to test changes before merging to your main branch.

1. Navigate to [**Environments**](https://app.northflank.com/s/project/environments) in your project

2. Click **Create preview blueprint**

3. Configure the blueprint:

  - **Name**: e.g. `pr-previews`

  - **Naming convention**: Select **Pull request ID**

  - Enable **Suffix** to append the pull request number to resource names

4. Click **Add trigger**

  - **Kind**: Select **Git pull request** or any option of your choice

  - **Repository**: Select the same repository used for the build service

5. Click **Continue** to open the visual editor

![Creating a preview blueprint in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/create-preview-blueprint.png)

### Set up environments: Configure the preview blueprint

The visual editor lets you build the workflow that creates your preview environment. You'll connect nodes together to define what gets deployed: starting with building your code, then deploying it to services, and optionally adding databases or other resources.

1. On the **Build on trigger** node, click **Deploy to service** to create a **Deployment service** node

2. Select the **Deployment service** node and configure:

  - **Basic information:** Enter a service name

  - **Environment variables:** Add runtime variables if required

  - **Networking:** Expose public or private ports

  - **Resources:** Select a compute plan

3. Click **Save preview blueprint**

Additional nodes can be added to the workflow, including databases, jobs, and volumes.

![Configuring a preview blueprint in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/configure-preview-blueprint.png)

### Set up environments: Run the preview blueprint

Test your preview blueprint by running it manually before relying on automatic Git triggers. This lets you verify the workflow creates preview environments correctly.

1. Click **Run** in the header

2. Under **Git trigger**, select a commit

3. Click **Create**

After the workflow completes:

- On the **Deployment service** click **View resource** to access the deployed instance

![Running a preview blueprint in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/run-preview-blueprint.png)

### Set up environments: Add environments

Environments organize your workflows by deployment stage. Each environment represents a stage in your release process, such as development, staging, or production, and contains the workflows that deploy to that stage.

1. Navigate to [**Environments**](https://app.northflank.com/s/project/environments) in your project

2. Click **Add environment**

3. Enter a name (e.g., `development`, `staging`, or `production`)

4. Click **Create**

The new environment appears as a column in the environments board view. You can create multiple environments to match your deployment stages.

![Adding environments in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/add-environments.png)

### Set up environments: Create a workflow

Workflows are automated release processes that execute when triggered manually or by Git events. Each workflow contains a series of steps (nodes) that build your code, deploy it to services, run database migrations, and perform other release tasks.

Create a workflow in an environment to automate deployments to that stage. For example, a production workflow might build from your main branch and deploy to production services, while a development workflow deploys feature branches to development services.

1. In the environment column, click **Workflow**

2. Enter a name (e.g., `Deploy to prod`)

3. Click **Add trigger** (optional):

  - **Kind**: Select **Git push**

  - **Repository**: Select your repository

  - **Branch rules**: Enter the branch name (e.g., `main` or `develop`) or `*` to trigger on every push to a branch

4. Click **Continue** to open the visual editor

![Creating a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/create-workflow.png)

### Set up environments: Configure the workflow

Build your deployment workflow by connecting nodes together. Each node performs a specific action: building code, deploying to services, backing up databases, or running migrations. Connect them in sequence to create your complete release process.

1. Select the **Start build** node and configure:

  - **Service / job**: Select your build service

  - **Branch**: Enter the branch name (e.g., `main`)

  - **Commit**: Leave blank to build the latest commit

2. Click **Save node**

3. On the **Start build** node, click **Deploy build**

4. Select the **Deploy build** node and configure:

  - **Target service/job**: Select or create a deployment service

5. Click **Save node**

6. Click **Save workflow**

Additional nodes can be added to the workflow, including databases, jobs, and volumes.

![Configuring a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/configure-workflow.png)

### Set up environments: Run the workflow

After you have configured the workflow, you can manually test run it and Northflank will execute the workflow as you have specified it.

1. Click **Run** in the header

2. Add a release name (optional):

  - Click **Add release name**

  - Enter a descriptive name for this release

3. Add a release description (optional):

  - Click **Add release description**

  - Enter details about what this release includes

4. Click **Create**

The workflow will execute and you can monitor its progress. If you configured Git triggers, the workflow will also run automatically when commits are pushed to the configured branch.

![Running a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/getting-started/set-up-environments/run-workflow.png)

### Set up environments: Use cron schedules (optional)

Workflows and preview blueprints can run automatically on a repeating schedule. This is useful for regular deployments (nightly builds), periodic maintenance tasks (database backups, cache warming), or refreshing test environments on a schedule.

To add a cron trigger:

1. Open your workflow or preview blueprint

2. Click the plus sign

3. Select **Cron schedule** from the **Kind** dropdown

4. Enter a cron expression in the **Schedule** field (times are UTC, minimum interval is 10 minutes)

Each workflow or preview blueprint can have one cron trigger.
