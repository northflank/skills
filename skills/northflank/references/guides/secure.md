# Secure

Generated from 9 application pages listed in `llms.txt`.

## Pages

- [Grant API access](#grant-api-access)
- [Inject secrets](#inject-secrets)
- [Manage global secrets](#manage-global-secrets)
- [Manage secret groups](#manage-secret-groups)
- [Reference global secrets](#reference-global-secrets)
- [Security on Northflank](#security-on-northflank)
- [Enable single sign-on and multi-factor authentication](#enable-single-sign-on-and-multi-factor-authentication)
- [Upload secret files](#upload-secret-files)
- [Use role-based access control](#use-role-based-access-control)

## Grant API access

Source: https://northflank.com/docs/v1/application/secure/grant-api-access.md

> [!important]
> Never share tokens or commit them to repositories. Store tokens securely in environment variables or secrets management systems.

Generate API tokens from RBAC roles for programmatic access to the Northflank API. Tokens authenticate users or programs to the API using [JSON Web Tokens (JWT).](https://jwt.io/introduction)

API tokens inherit permissions from the RBAC role they're generated from. Manage permissions by editing RBAC roles, not individual tokens.

### Grant API access: Generate an API token

Generate API tokens from RBAC roles in your team or organisation.

> [!note]
> [Click here](https://app.northflank.com/s/account/api/tokens) to create an API token.

1. Navigate to **Team Settings** → **API** → **Tokens**

2. Click **Create API Token**

3. Configure the token:

  - **Name**: Descriptive identifier for the token

  - **Description**: A short description of the token

  - **Associated RBAC Role**: Select an RBAC role (determines token permissions)

  - **Token lifetime**: Set expiration time or leave blank for no expiry

4. Click **Create API Token**

5. **Copy the token immediately** (shown only once and cannot be retrieved later)

6. Store the token securely (password manager, secrets vault)

Tokens are listed across the team or organisation, but the token secret is only visible at the time of creation.

### Grant API access: Token features

- **Expiry**: Tokens can be configured to expire automatically. Set expiry on creation to limit token lifetime.

- **Last used**: Tokens display their last used time, helping identify inactive or compromised tokens.

- **Audit logs** (Enterprise): Tokens have their own audit log feed. Audit log items reference specific tokens for tracking API activity.

- **View on creation only**: Token secrets are only visible once on creation. Save tokens immediately or regenerate if lost.

### Grant API access: Manage permissions

To update token permissions, edit the RBAC role the token was generated from. Permission changes apply immediately to all tokens using that role.

See the [Use role-based access control](secure.md#use-role-based-access-control) guide for managing roles and permissions.

### Grant API access: Revoke tokens

Revoke tokens from **Team Settings → API → Tokens**. Revoked tokens are invalidated immediately and cannot be restored.

Deleting an RBAC role revokes all tokens generated from that role.

### Grant API access: Generate tokens from organisation roles

The CLI `northflank login` flow supports generating tokens from organisation roles for cross-team access.

### Grant API access: Next steps

- [Create a team and invite members: Create a team and invite members to collaborate on projects.](collaborate.md#create-a-team)
- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)

## Inject secrets

Source: https://northflank.com/docs/v1/application/secure/inject-secrets.md

You can define build arguments and runtime variables to be injected at build or runtime respectively for services and jobs. You can set [build arguments](build.md#inject-build-arguments) and [environment variables](run.md#inject-runtime-variables) in individual resources, or [create a secret group](secure.md#manage-secret-groups) so that multiple resources in a project can inherit the same secrets.

The editor for both allows you to view arguments and variables, edit them in a table as key-value pairs, or in JSON or ENV format.

If you are working in a team, or edit the variables in another tab, you will be notified that the values have changed and can either view a difference editor or discard your changes. The difference editor will update the remote values in real-time so you can be sure of any variables you may overwrite.

> [!note] Priority
> Build arguments and environment variables set directly in a service or job will always override variables with the same name inherited from secret groups.

To enter or edit environment variables using JSON use the following format:

```JSON
{
    "KEY_1": "value1",
    "KEY_2": "value2"
}
```

To upload or edit a `.env` file use the following format:

```ENV
KEY_1=value1
KEY_2=value2
```

### Inject secrets: Build arguments

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

#### Inject secrets: Persist build arguments in the runtime environment

If you want to access a build argument value in the runtime environment, declare it as an runtime variable (`ENV`) in the Dockerfile with the value of the build argument. You should not pass secrets to your runtime environment in this way, as it will be visible to anyone with the image.

```dockerfile
FROM alpine as production
ARG PACKAGES
ENV PACKAGES=${PACKAGES}
# PACKAGES available in build and runtime
```

![Setting build arguments in the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/inject-secrets/build-arguments.png)

Learn more about build arguments and the [Docker ARG command](https://docs.docker.com/engine/reference/builder/#arg).

### Inject secrets: Runtime variables

You can set runtime variables (`ENV`) in to be passed to the Docker container at runtime. Secrets can be saved and used within a project in [secret groups](secure.md#manage-secret-groups).

To set runtime variables for a single resource, navigate to the environment page in your resource and select an editor mode. You may be prompted to enter your password.

![Setting environment variables in the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/inject-secrets/environment-variables.png)

Learn more about runtime variables and the [Docker ENV command](https://docs.docker.com/engine/reference/builder/#env).

### Inject secrets: Access environment variables in your code

Your runtime variables can be accessed via the process environment, for example in a Node environment a variable set as `ENV_VALUE=Northflank` can be accessed within the container by referring to `process.env.ENV_VALUE`.

| Runtime environment | Environment variable accessor | Required import |
| --- | --- | --- |
| Node | `process.env.ENV_KEY` | none |
| Deno | `Deno.env.get("ENV_KEY")` | none |
| Bun | `Bun.env.ENV_KEY` OR `process.env.ENV_KEY` | none |
| Python | `os.environ.get("ENV_KEY")` | `import os` |
| Java | `System.getenv("ENV_KEY")` | none |
| Kotlin | `System.getenv("ENV_KEY")` | none |
| Ruby on Rails | `ENV["ENV_KEY"]` | none |
| Rust | `env::var("ENV_KEY")` | `use std::env` |
| Go | `os.Getenv("ENV_KEY")` | `import ( "os" )` |
| C# / .NET | `Environment.GetEnvironmentVariable("ENV_KEY")` | `using System;` |
| C++ | `std::getenv("ENV_KEY")` | `#include <cstdlib>` |
| C | `getenv("ENV_KEY")` | `#include <stdlib.h>` |
| PHP | `getenv("ENV_KEY")` | none |
| Lua | `os.getenv("ENV_KEY")` | none |
| Shell / Bash | `${ENV_KEY}` | none |
| PowerShell | `$Env:ENV_KEY` OR `[Environment]::GetEnvironmentVariable('ENV_KEY')` | none |

### Inject secrets: Access Northflank injected secrets

Northflank injects build arguments and runtime variables into build and runtime workloads by default. You can access these values (as strings) [using their key via the environment](secure.md#inject-secrets-runtime-variables) in your build and runtime workloads, or [in your Dockerfile](secure.md#inject-secrets-build-arguments) by specifying the key as an `ARG`.

| Build argument key | Values | Example |
| --- | --- | --- |
| `NF_GIT_SHA` | The git commit hash that is being built | `c7d1f7f0e95116dce9cdfe126edcf782f6de8712` |
| `NF_GIT_BRANCH` | The git branch of the current build | `main` |
| `NF_PREVIOUS_BUILD_GIT_SHA` | The git commit hash of the previous build attempted by the build service | `f12a3fd2738de900f36c8043cf48c29242bff8fe` |

| Environment variable key | Values | Example |
| --- | --- | --- |
| `NF_HOSTS` | A comma-separated string of Northflank generated DNS entries from your public ports for the deployment, combined with any custom DNS entries assigned to your public ports | `port1--my-service--my-project--user-1bfg.code.run,port2--my-service--my-project--user-1bfg.code.run,testing.example.com` |
| `NF_HOSTS_CUSTOM` | A comma-separated string of your custom DNS entries assigned to public ports on the deployment | `testing.example.com` |
| `NF_OBJECT_ID` | The Northflank ID for the deployment, generated from your original deployment name | `my-service` |
| `NF_PROJECT_ID` | The Northflank ID for the project, generated from your original project name | `my-project` |
| `NF_DEPLOYMENT_SHA` | The git commit hash of the deployed build | `c7d1f7f0e95116dce9cdfe126edcf782f6de8712` |
| `NF_DEPLOYMENT_REPO` | The git repo of the deployed build | `https://gitservice.com/my-username/my-code-repo` |
| `NF_DEPLOYMENT_BRANCH` | The git branch of the deployed build | `main` |

### Inject secrets: Dynamic templating

Build arguments and runtime variables can be constructed using dynamic templating. This allows you to create new variables from multiple sources, including previously defined variables and inherited secrets from [addons](databases-and-persistence.md#stateful-workloads-on-northflank).

You can create build arguments or runtime variables using template literals (`${VARIABLE_NAME}`) in all editors (table, JSON, and env). Autocomplete is available in every editor, simply begin typing the template literal syntax (`${`) and a list of available variables will be displayed in a tooltip. You can hover over a variable reference to check its value.

You cannot refer to build arguments in runtime variables, or runtime variables in build arguments. However, if a variable is inherited from a secret group set to build & runtime, you can refer to it in both.

For example if `VARIABLE_NAME` with a value of `hello` is previously defined, or inherited by a service from a group, a new variable defined as `${VARIABLE_NAME} world` will have the value `hello world`.

### Inject secrets: Functions

You can use the `randomSecret` function in your secrets as an argument, for example `${fn.randomSecret(32)}`.

If you use this function in a build argument, runtime variable, or when creating a secret group, the function will be evaluated when you save it. This means the result will be securely stored as a secret rather than the function call itself, and the generated value will remain the same unless it is manually changed.

| Function | Arguments | Description |
| --- | --- | --- |
| randomSecret | length: `number`, encoding: `string: 'base64' or 'hex'` | Returns a random base64 secret of the given `length`, and an optional `encoding` argument, either 'base64' (default) or 'hex'. |

### Inject secrets: Next steps

- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)

## Manage global secrets

Source: https://northflank.com/docs/v1/application/secure/manage-global-secrets.md

Global secrets are team-level resources that store configuration data, values, and files that can be referenced across multiple templates and services. Unlike secret groups which are project-scoped, global secrets are accessible at the team level.

To create or modify a global secret, navigate to the [secrets page](http://app.northflank.com/s/account/global-secrets) from your team menu.

Enter values as JSON-structured objects, or upload secret files, which will be accessible in your templates.

> [!note]
> [Click here](http://app.northflank.com/s/account/global-secrets) to view your global secrets.

### Manage global secrets: Global secret type

You can set the type for a global secret as either `secret` or `configuration` values. This is useful when working with teams if you need to control access to certain secrets, but allow team members to view or edit other configuration.

[RBAC permissions](secure.md#use-role-based-access-control) can be configured separately for the two types of global secrets. This allows you to, for example, create a role that has full access to config values, but access only to secret keys and not their values.

| Feature | Secret type | Config type |
| --- | --- | --- |
| Access control | Restricted | Broader team access |
| [GitOps support](infrastructure-as-code.md#gitops-on-northflank) | Not supported | Supported |
| Typical use cases | API keys, passwords, credentials | Feature flags, endpoints, non-sensitive settings |

The secret type cannot be edited from the settings page of a global secret.

### Manage global secrets: Global secret values

Global secrets store JSON structured objects that support nesting and arrays. This allows you to organize related configuration hierarchically.

```json
{
  "database": {
    "host": "db.example.com",
    "port": 5432,
    "credentials": {
      "username": "admin",
      "password": "secure-password"
    }
  },
  "allowedIPs": [
    "127.0.0.1",
    "192.168.1.0/24"
  ]
}
```

You can access nested values in templates using dot notation: `database.credentials.username`

### Manage global secrets: Global secret files

You can upload files to a global secret. Each file requires an identifier, path, content, and encoding.

The identifier is used to reference the file in templates.

### Manage global secrets: GitOps support

Global secrets of type `Configuration` support GitOps workflows. This allows you to version control your configuration and automatically sync from Git repositories.

To enable GitOps for a Configuration, create a global secret with type "Configuration", enable GitOps in the settings, and connect your Git repository.

Secret type global secrets do not support GitOps for security reasons.

### Manage global secrets: Dynamic templating

You can use [dynamic templating](secure.md#inject-secrets-dynamic-templating) within global secret values to reference other values in the same secret.

For example:

```json
{
  "baseUrl": "https://api.example.com",
  "users": "${baseUrl}/users",
  "posts": "${baseUrl}/posts"
}
```

### Manage global secrets: Functions

You can use the `randomSecret` [function](secure.md#inject-secrets-functions) when creating global secret values. The function will be evaluated when you save the secret, and the generated value will be stored securely.

```json
{
  "apiKey": "${fn.randomSecret(32)}",
  "secretToken": "${fn.randomSecret(64, 'hex')}"
}
```

### Manage global secrets: Next steps

- [Reference global secrets: Reference global secrets in your template definitions to inject configuration and sensitive data.](secure.md#reference-global-secrets)

## Manage secret groups

Source: https://northflank.com/docs/v1/application/secure/manage-secret-groups.md

Secret groups contain collections of runtime variables or build arguments that will be inherited by services and jobs in a project.

To create or modify a group of secrets, open the secrets page from the project menu.

Enter the secrets as key value pairs, in JSON format, or import from a `.env` file.

You can also [link addons](databases-and-persistence.md#connect-database-secrets-to-workloads) to the secret group, or [upload secret files](secure.md#upload-secret-files), which will be inherited like manually-added secrets.

After creating or editing a secret group you can click restart dependents   to redeploy all services and jobs that inherit the secrets with the new values.

> [!note]
> [Click here](https://app.northflank.com/s/project/secrets) to view your project secret groups.

![Configuring a secret group in the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/manage-secret-groups/secret-group-settings.png)

### Manage secret groups: Secret group type

You can set the type for a secret group as either secret values or configuration values. This is useful when working with colleagues if you need to control access to certain secrets, but allow team members to view or edit other values inherited by services and jobs.

[RBAC permissions](secure.md#use-role-based-access-control) can be configured separately for the two types of secret group. This allows you to, for example, create a role that has full access to configuration groups, but access only to secret group keys and not their values.

The group type can be edited from the group settings page of a secret group.

### Manage secret groups: Secret group scope

You can create a group of either [runtime variables](secure.md#inject-secrets-runtime-variables), [build arguments](secure.md#inject-secrets-build-arguments), or both.

The scope will define when your secrets are inherited by services and jobs: at build time, runtime, or both. The group scope can be edited from the group settings page of a secret group.

### Manage secret groups: Restrict secrets

You can restrict these secrets to specific services or jobs within your project from the group settings page of a secret group.

Secrets from an unrestricted group will be inherited by all services or jobs within the project that use the type of secret set in the group. Secrets that have been restricted to specific services or jobs will only be inherited by the selected services and jobs that use the type of secret set in the group.

#### Manage secret groups: Restrict by tag

You can also make secret groups available to resources with [selected tags](release.md#tag-workloads-and-resources), in addition to specific services and jobs. You can combine restrictions to specific resources with restrictions by tag, so that both the selected resources and resources with the chosen tags will inherit secrets from the group.

### Manage secret groups: Group priority

The priority of a secret group determines the value of which group is used if multiple secrets contain the same key. The group priority can be edited from the group settings page of a secret group.

You can set the priority of a group as any integer between `0` and `100`. The secret group with a higher priority will take precedence.

For example if the priority for Group A is `50` and the priority of Group B is `20`, the values of Group A will be used for any conflicting keys between the groups:

| Secret group A (priority `50`) | Secret group B (priority `20`) | Secret group value used |
| --- | --- | --- |
| `KEY_1` | `KEY_1` | Group A |
| `KEY_2` | `KEY_2` | Group A |
|  | `KEY_3` | Group B |

Build arguments and environment variables set directly in a service or job will always override variables with the same name inherited from secret groups.

### Manage secret groups: Dynamic templating

You can use [dynamic templating](secure.md#inject-secrets-dynamic-templating) to create new variables from variables previously defined in the secret group.

### Manage secret groups: Next steps

- [Manage global secrets: Create and manage team-level secrets and configuration data that can be referenced across multiple templates and projects.](secure.md#manage-global-secrets)
- [Reference global secrets: Reference global secrets in your template definitions to inject configuration and sensitive data.](secure.md#reference-global-secrets)

## Reference global secrets

Source: https://northflank.com/docs/v1/application/secure/reference-global-secrets.md

Global secrets can be referenced directly in your template definitions to inject configuration and sensitive data. You can choose when secrets are resolved: at template execution time or at container runtime.

### Reference global secrets: Syntax

**Template-time resolution** (`${}`):

```
${secrets.<SECRET_ID>.values.<KEY_PATH>}
${secrets.<SECRET_ID>.files.<FILE_ID>.path}
```

Values are replaced when the template runs and appear in template run logs.

**Runtime resolution** (`${{}}`):

```
${{secrets.<SECRET_ID>.values.<KEY_PATH>}}
${{secrets.<SECRET_ID>.files.<FILE_ID>.path}}
```

Values are resolved when containers start and do NOT appear in template run logs. Use this for sensitive data.

### Reference global secrets: Accessing values

Use dot notation to access nested values:

```json
{
  "runtimeEnvironment": {
    "DATABASE_HOST": "${secrets.db-config.values.DB_HOST}",
    "DATABASE_PORT": "${secrets.db-config.values.DB_PORT}",
    "DATABASE_PASSWORD": "${{secrets.db-config.values.DB_PASSWORD}}"
  }
}
```

Arrays can be referenced directly:

```json
{
  "ports": [{
    "security": {
      "policies": [{
        "addresses": "${secrets.network.values.allowedIPs}",
        "action": "ALLOW"
      }]
    }
  }]
}
```

### Reference global secrets: Accessing files

Reference files using their identifier (not path):

```json
{
  "runtimeFiles": {
    "/etc/ssl/cert.pem": {
      "data": "${secrets.ssl-certs.files.cert.data}",
      "encoding": "utf-8"
    },
    "/etc/ssl/key.pem": {
      "data": "${{secrets.ssl-certs.files.key.data}}",
      "encoding": "utf-8"
    }
  }
}
```

### Reference global secrets: Secret inheritance

The [Secret Inheritance node](infrastructure-as-code.md#template-nodes-secret-inheritance) allows you to merge multiple global secrets in a specific order within your template. This enables layered configurations by combining base settings with overrides.

#### Reference global secrets: How it works

Add a Secret Inheritance node to your template:

```json
{
  "kind": "SecretInheritance",
  "ref": "merged-config",
  "spec": {
    "secrets": [
      "base-secrets"
      "club-secrets"
      ],
    "requiredKeys": [
      "API_KEY",
      "DATABASE_HOST"
      ]
  }
}
```

Secrets are merged in order, with the last secret taking precedence for conflicting keys. Objects are deeply merged, while arrays and primitives are replaced.

#### Reference global secrets: Accessing merged data

```json
{
  "runtimeEnvironment": {
    "API_KEY": "${{refs.merged-config.values.API_KEY}}",
    "DB_HOST": "${refs.merged-config.values.DATABASE_HOST}"
  }
}
```

#### Reference global secrets: Required validation

Specify `requiredKeys` and `requiredFiles` to enforce that critical configuration is present in the merged result. The template run will fail if any required items are missing.

### Reference global secrets: Visual editor considerations

When using the visual template editor, file encoding fields may be removed on save. Use the code editor for custom encoding values or dynamic file paths.

### Reference global secrets: Next steps

- [Tag your workloads and resources: Create tags to assign to your Northflank workloads and resources to help keep track of them.](release.md#tag-workloads-and-resources)
- [Link connection details to group: Use your database in your application by linking it to a secret group.](databases-and-persistence.md#connect-database-secrets-to-workloads)

## Security on Northflank

Source: https://northflank.com/docs/v1/application/secure/security-on-northflank.md

Northflank has many security features to ensure that your services can run and communicate securely, that your data remains safe, and allow you to grant granular permissions to access and modify your projects, services, and teams via the Northflank API.

These features are only effective combined with best practices. Below are common areas of concern for security, and the relevant Northflank features you can use to reduce risk.

### Security on Northflank: Account security

You can enable single sign-on to authenticate to Northflank using another service. It is recommended that you add multi-factor authentication to your Northflank account. Teams can enforce members to use multi-factor authentication, and organisations can use directory sync to manage members and their permissions.

- [Sign-on security: Log-in using single sign-on authentication, and add multi-factor authentication to your account.](secure.md#enable-single-sign-on-and-multi-factor-authentication)
- [Manage team security: Enforce multi-factor authentication and configure RBAC and API access for your team members.](collaborate.md#create-a-team-manage-team-security)
- [Manage your organisation on Northflank: Manage users, security, billing, and multiple teams with a Northflank organisation.](collaborate.md#manage-an-organisation)

### Security on Northflank: Access control

When working in teams or organisations, it is important to only grant the permissions and access strictly necessary for the job, whether that's a team member or external application. Create roles with granular permissions for team members and API tokens.

- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
- [Generate API tokens: Generate an API token to access your team and project.](secure.md#grant-api-access-generate-an-api-token)

### Security on Northflank: Secret management

Secrets should remain encrypted and restricted. Northflank can securely store secrets in services, secret groups, and argument overrides for templates. Secret values should never be committed to a repository or saved in a template body.

- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Upload a secret file: Add secret files that will be mounted in your container.](secure.md#upload-secret-files)
- [Link connection details to group: Use your database in your application by linking it to a secret group.](databases-and-persistence.md#connect-database-secrets-to-workloads)

### Security on Northflank: Network security

Restrict access by basic authentication or IP policy, or securely forward services without exposing them to the internet.

- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)
- [Set IP policies: Allow or deny access to services based on IP addresses.](network.md#add-security-policies-for-ports-set-ip-policies)
- [Forward deployments and databases: Forward deployments and databases to your local machine for development.](../api/forwarding.md)

## Enable single sign-on and multi-factor authentication

Source: https://northflank.com/docs/v1/application/secure/single-sign-on-multi-factor-authentication.md

You can log in to Northflank by either username and password, or by authenticating using Google, GitHub, GitLab, or Bitbucket OAuth.

You can also add multi-factor authentication to your account to provide another layer of security.

![Single-sign on and multi-factor authentication configuration n the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/single-sign-on-multi-factor-authentication/account_sso.png)

### Enable single sign-on and multi-factor authentication: Single sign-on

Northflank currently supports single sign-on with Google, GitHub, GitLab, and Bitbucket accounts.

You can either create your account with single sign-on (OAuth), or enable single sign-on for an existing account.

To enable single sign-on from your account settings page, toggle the services you want to sign on with. Your Northflank email address must match the primary address of the OAuth service you want to use.

When creating an account with another service ensure you are logged in to the account you want to use. You will then be able to create a Northflank account.

You will be asked to log in, if you are not already signed in to an account on the service you want to use, and you will be asked to allow Northflank OAuth to identify you using their OAuth service.

You can now log in to Northflank by authenticating with your selected OAuth services, instead of entering the account's username and password.

> [!note]
> You will still need to enter your one-time password when using single sign-on if you have multi-factor authentication enabled.

### Enable single sign-on and multi-factor authentication: Multi-factor authentication

You can enable multi-factor authentication (MFA) from your account settings page for additional security. When enabled, you will also need to enter a one-time password (OTP) from an authenticator application every time you log in to your account, both by password or single sign-on.

Use your authenticator application to scan the QR code, or manually enter the secret to add your Northflank account. On Northflank, enter the one-time password generated by your authenticator application and your account password, then click enable OTP.

> [!important]
> Make sure you copy your recovery code somewhere safe and secure. If you ever lose access to your authenticator application, you must use your recovery code to access your account.

#### Enable single sign-on and multi-factor authentication: Log in with recovery code

If you have lost access to your authenticator application, attempt to log in as normal. When you are asked for your one-time password, select lost access to authenticator app. Enter your username, password, and recovery code, and reset & log in. You will need to re-enable multi-factor authentication.

#### Enable single sign-on and multi-factor authentication: Disable multi-factor authentication

To disable MFA, navigate to your account settings page, select disable OTP, and enter your account password to confirm.

#### Enable single sign-on and multi-factor authentication: Team multi-factor authentication

Team administrators can check if team members have multi-factor authentication enabled from the members page in team settings. The `2FA` column will display a green tick if a member has configured multi-factor authentication, and a red cross if they have not.

### Enable single sign-on and multi-factor authentication: Next steps

- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)

## Upload secret files

Source: https://northflank.com/docs/v1/application/secure/upload-secret-files.md

You can upload secret files to mount within your containers. They can be used to:

- make configuration files available within your services, jobs and builds

- create text based configuration files like `.json`, `.html`, `.css`, `.yaml`

- add certificate files or complex secrets that cannot be handled by environment variables

- create manifest files with build or runtime variable configuration

Secret files are equivalent to [Kubernetes' ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Docker file volumes](https://docs.docker.com/storage/volumes/).

Each secret file must have a unique path where it will be mounted, and some file content. You can use [dynamic templating](secure.md#inject-secrets-dynamic-templating) (in the format `${ENV_KEY}`) to substitute environment variables into your secret files.

Secret files are encrypted at rest and injected at runtime or build time.

> [!note] Secret file permissions
> Secret files will be owned by the user and group `root` in your container. You may need to add a shell script to change the [ownership or permissions](run.md#run-as-a-different-user-change-file-ownership-and-permissions).

### Upload secret files: Add a secret file

You can add a secret file to a service or job from the environment or build arguments pages, to add a file to be available at runtime or build respectively.

Click add file to manually enter the file content, or upload from your local filesystem. Enter the mount path, where your file will be located in the container filesystem, and either repeat to add more files or save changes.

You can also add secret files in the same way to a [secret group](secure.md#manage-secret-groups), which will be made available in any services or jobs that inherit from that secret group.

![Uploading a secret file in the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/upload-secret-files/secret-file-editor.png)

#### Upload secret files: Access secret files in builds

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

### Upload secret files: Edit a secret file

You can  edit or  delete existing secret files by finding them in the relevant service, job, or secret group.

### Upload secret files: Next steps

- [Inject secrets: Set build arguments and inject runtime variables into running deployments.](secure.md#inject-secrets)
- [Manage groups of secrets: Create and manage groups of secrets that can be inherited throughout an entire project or by specific services and jobs.](secure.md#manage-secret-groups)
- [Execute files in a container: Make files and directories in your containers executable.](run.md#run-as-a-different-user-change-file-ownership-and-permissions)

## Use role-based access control

Source: https://northflank.com/docs/v1/application/secure/use-role-based-access-control.md

You can manage the permissions of your team members using role-based access control (RBAC). These roles define the resources that your team members can view and edit in the Northflank UI and via the API.

RBAC roles control both UI and API access. API tokens are generated from RBAC roles and inherit their permissions.

Roles can be given specific permissions based on CRUD operations for the different Northflank resources such as projects, services, jobs, pipelines and addons. Roles can also be restricted to certain projects, and be given permissions to manage aspects of the team itself.

You can use an organisation to create and manage roles across teams, and to manage organisation permissions.

> [!note]
> [Click here](https://app.northflank.com/s/account/roles) to view or create roles for your team.

### Use role-based access control: Default roles

##### Use role-based access control: Owner

When you create a team you are given the role of `owner` which grants all permissions across the entire team account. The owner cannot be removed from the team, you must transfer the owner role to another user before leaving the team.

##### Use role-based access control: Admin

The default `admin` role grants a user full permissions across the team to create, read, update, and delete resources and modify team settings. You should check and modify the permissions granted by the `admin` role when you create your team.

##### Use role-based access control: Default

When you invite a user to a team they are automatically assigned the `default` role which permits limited access to create, read, and update resources, but not to delete them, and only access to view team settings. You should check and modify the permissions granted by the `default` role when you create your team.

### Use role-based access control: Permission indicators

Permissions are marked with indicators that show their access level and capabilities:

| Indicator | Description |
| --- | --- |
| **No tag** | Permission available for both UI and API |
| **UI** | UI-only permission |
| **API** | API-only permission |
| **⚠️** | Sensitive permission that requires careful review before assigning. Examples include permissions that grant access to secrets. |

Permissions can have multiple indicators. For example, a permission with both **UI** and **⚠️** is UI-only and is a sensitive permission.

### Use role-based access control: Create and edit roles

The team `owner` and any role with permissions, such as the `admin` role, can create and modify roles in the team's account settings.

You can select members to be assigned to the role immediately, or grant the role to members later.

![Creating a role for a team in the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/use-role-based-access-control/edit-rbac-role.png)

### Use role-based access control: Restrict roles

Project restrictions limit a role’s permissions to specific projects.

You can use exclusion rules to remove access to specific projects rather than granting access to specific projects. This switches from an "in" to "notIn" rule. Enable `Use as exclusion rule` when configuring project restrictions.

### Use role-based access control: Assign roles

Roles can be assigned to team members by editing the role in the team's account settings and selecting members from the drop-down list. Roles can be removed from members by deleting them from the list.

You can also add and remove roles from a member from the members page in the team's account settings and opening the role selector for that member. You can add and remove roles from invited users that have not yet been added to the team here as well.

### Use role-based access control: Create organisation roles

You can manage user roles on an organisational level to ensure compliance with your security policies.

#### Use role-based access control: Directory groups

If you have [enabled directory sync](collaborate.md#manage-an-organisation-sync-your-directory), you can select directory groups to associate with the role. Users in the directory groups will be assigned the role, and the role will be removed from users if they are removed from the directory group.

#### Use role-based access control: Organisation permissions

You can grant roles permissions to create and manage teams, and to manage organisational settings.

#### Use role-based access control: Team and project restrictions

Restricting the role to specific teams will allow organisation users with the role to only view and interact with the teams their roles grant them permission for, with the corresponding team permissions for those roles.

You can also further restrict roles to specific projects within teams, by expanding the entry for selected teams.

![Restricting an organisation role to certain projects within selected teams in the Northflank application](https://assets.northflank.com/documentation/v1/application/secure/use-role-based-access-control/organisation-roles-project-restrictions.png)

#### Use role-based access control: Team permissions

You can configure the permissions that the role grants users to manage team configuration and resources, such as team members, domains, and cloud provider integrations.

#### Use role-based access control: Project permissions

You can configure the project-level permissions that users with this role have, which will apply in the teams that the role has access to. This allows you to manage project permissions on the organisational level, rather than through individual team roles.

### Use role-based access control: Next steps

- [Create a team and invite members: Create a team and invite members to collaborate on projects.](collaborate.md#create-a-team)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
