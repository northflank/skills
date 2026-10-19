# Secure

Generated from 11 application pages listed in `llms.txt`.

## Pages

- [Connect a KMS provider](#connect-a-kms-provider)
- [Grant API access](#grant-api-access)
- [Inject secrets](#inject-secrets)
- [Use customer-managed encryption keys](#use-customer-managed-encryption-keys)
- [Manage global secrets](#manage-global-secrets)
- [Manage secret groups](#manage-secret-groups)
- [Reference global secrets](#reference-global-secrets)
- [Security on Northflank](#security-on-northflank)
- [Enable single sign-on and multi-factor authentication](#enable-single-sign-on-and-multi-factor-authentication)
- [Upload secret files](#upload-secret-files)
- [Use role-based access control](#use-role-based-access-control)

## Connect a KMS provider

Source: https://northflank.com/docs/v1/application/secure/connect-a-kms-provider.md

Connect AWS KMS, GCP Cloud KMS, Azure Key Vault, or HashiCorp Vault Transit to use customer-managed encryption on Northflank.

> [!note] Requirements
>
> You will need the following to get started:
>
> - An enterprise account with envelope encryption enabled by Northflank support
> - Read and Create [encryption permissions](secure.md#use-customer-managed-encryption-keys-prerequisites) for your team or organization, plus Manage permission to activate the configuration
> - The key and provider permissions listed in your provider's instructions below

Before setup, review your [responsibilities for key availability](secure.md#use-customer-managed-encryption-keys-your-responsibilities-for-key-availability). To learn about data keys, see [how your secrets are encrypted](secure.md#use-customer-managed-encryption-keys-how-your-secrets-are-encrypted).

### Connect a KMS provider: Open the configuration form

> [!note]
>
> [Click here](https://app.northflank.com/s/teamOrOrg/settings/encryption) to set up your KMS connection.

1. Open Settings → Encryption for your team or organization.

2. Click Add encryption configuration. If configurations already exist, click Create encryption configuration above All configurations.

3. Under Basic information, enter a unique Name and an optional Description.

4. Select a Provider.

Continue with the instructions below for your provider.

### Connect a KMS provider: Use AWS KMS

> [!note] Requirements
>
> You will need the following to get started:
>
> - An enabled [symmetric encryption KMS key](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html) in your AWS account
> - Permission to create an IAM role or IAM user and assign its policies
> - Permission to grant that role or user access to the KMS key

We recommend using a cross-account role to avoid storing long-lived AWS credentials in Northflank.

The IAM role or user that Northflank uses to access your key needs `kms:Encrypt`, `kms:Decrypt`, `kms:GenerateDataKey`, and `kms:DescribeKey` permissions. The [KMS key policy](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html) must also permit access, either directly or through IAM policies.

> [!warning] Keep aliases pointing to the same key
>
> If you use a key alias, keep it pointing to the same KMS key. Changing its target prevents Northflank from decrypting older secrets, even if the original key remains enabled. To switch keys, use a new encryption configuration. Ask [Northflank support to migrate existing data](secure.md#use-customer-managed-encryption-keys-rotate-keys-and-migrate-data).

#### Connect a KMS provider: Connect with a cross-account role

Open the [configuration form](secure.md#connect-a-kms-provider-open-the-configuration-form) with AWS KMS selected. Then follow these steps:

1. In Northflank, select Cross-account role under Credentials.

2. Enter an External ID, or click the Generate icon beside the field.

3. Click Copy Custom trust policy.

4. In AWS IAM, open Roles → Create role → Custom trust policy.

5. Paste the copied trust policy.

6. Name and save the role.

7. In Northflank, enter the role's IAM role ARN.

8. Enter the key's Region under Key location.

9. Enter the full key ARN in Key ID (id, ARN, or alias).

10. Click Copy IAM policy.

11. In AWS, add the copied policy as an inline policy on the role.

12. Make sure that the KMS key policy permits this role to use the key.

13. In Northflank, click Validate.

14. Wait for Validation successful before you click Create encryption configuration.

The key field also accepts a key ID or alias. If you use either, replace placeholders in the copied IAM policy with the actual key ARN before saving it. The policy resource must identify the key.

#### Connect a KMS provider: Connect with access keys

Open the [configuration form](secure.md#connect-a-kms-provider-open-the-configuration-form) with AWS KMS selected. Then follow these steps:

1. In AWS, create an IAM user and an access key for that user.

2. In Northflank, select Access key under Credentials.

3. Enter the Access key and Secret key.

4. Enter the key's Region under Key location.

5. Enter the full key ARN in Key ID (id, ARN, or alias).

6. Click Copy IAM policy.

7. In AWS, add the copied policy as an inline policy on the IAM user.

8. Make sure that the KMS key policy permits this user to use the key.

9. In Northflank, click Validate.

10. Wait for Validation successful before you click Create encryption configuration.

For either authentication method, continue to [verify and activate the configuration](secure.md#use-customer-managed-encryption-keys-verify-and-activate-a-configuration).

### Connect a KMS provider: Use GCP Cloud KMS

> [!note] Requirements
>
> You will need the following to get started:
>
> - A Google Cloud project with Cloud KMS enabled
> - A key ring containing an enabled [symmetric encryption key](https://docs.cloud.google.com/kms/docs/create-key)
> - Permission to grant a service account access to that key

We recommend Cross-project service account to avoid storing long-lived GCP credentials in Northflank.

The service account that Northflank uses needs the [Cloud KMS CryptoKey Encrypter/Decrypter role](https://docs.cloud.google.com/kms/docs/iam) (`roles/cloudkms.cryptoKeyEncrypterDecrypter`) on your key.

The Location field defaults to `global`. If your key ring uses another location, enter that location instead.

#### Connect a KMS provider: Connect with a cross-project service account

Open the [configuration form](secure.md#connect-a-kms-provider-open-the-configuration-form) with GCP Cloud KMS selected. Then follow these steps:

1. In Northflank, select Cross-project service account under Credentials.

2. Enter your Project ID and Location under Key location.

3. Enter your Key ring and Crypto key names.

4. Click Create encryption configuration. Northflank creates the configuration and opens its details page.

5. Copy the Email under Service account.

6. Click Open Cloud KMS in the GCP console.

7. In Google Cloud, open the key's permissions.

8. Add the copied service account email as a principal.

9. Assign the Cloud KMS CryptoKey Encrypter/Decrypter role.

10. Save the assignment.

11. In Northflank, [verify and activate the configuration](secure.md#use-customer-managed-encryption-keys-verify-and-activate-a-configuration).

The creation form does not show Validate because Northflank creates the service account when you create the encryption configuration. You must then grant the service account access to your key. The details page also provides a gcloud CLI tab with a command to grant access.

> [!note] Allow permissions to apply
>
> If verification fails after you grant access, make sure that the role applies
> to the correct service account and key. Allow time for Google Cloud to apply
> the permission change before retrying.

#### Connect a KMS provider: Connect with a service account key

This method also requires permission to create a service account and a JSON key.

Open the [configuration form](secure.md#connect-a-kms-provider-open-the-configuration-form) with GCP Cloud KMS selected. Then follow these steps:

1. In Google Cloud, create a service account for Northflank.

2. Grant that account the Cloud KMS CryptoKey Encrypter/Decrypter role on your key.

3. Create and download a JSON key for the service account.

4. In Northflank, select Service account key under Credentials.

5. Add the JSON contents to Service account key (keyfile.json).

6. Enter your Project ID and Location under Key location.

7. Enter your Key ring and Crypto key names.

8. Click Validate.

9. Wait for Validation successful before you click Create encryption configuration.

10. Continue to [verify and activate the configuration](secure.md#use-customer-managed-encryption-keys-verify-and-activate-a-configuration).

### Connect a KMS provider: Use Azure Key Vault

> [!note] Requirements
>
> You will need the following to get started:
>
> - A public Azure cloud [Key Vault with an RSA key](https://learn.microsoft.com/en-us/azure/key-vault/keys/quick-create-portal) that supports `RSA-OAEP-256`
> - [Network rules](https://learn.microsoft.com/en-us/azure/key-vault/general/network-security) that allow Northflank to connect to the vault
> - Permission to register an application and create a client secret in Microsoft Entra ID
> - Permission to grant that application access to your key
> - Azure sovereign clouds and Managed HSM are not supported.

The [Key Vault Crypto Service Encryption User role](https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide) grants key metadata access and wrapping operations. If your vault uses access policies, grant `wrapKey` and `unwrapKey`. A versionless key URL also requires `get`.

| Key identifier URL | Behavior |
| --- | --- |
| `https://example-vault.vault.azure.net/keys/northflank` | A versionless URL lets new DEK wrapping follow key rotation. |
| `https://example-vault.vault.azure.net/keys/northflank/<version>` | A versioned URL keeps new DEK wrapping on the specified version. Replace `<version>` with the actual version. |

Enable purge protection for production vaults. Follow the [key-availability guidance](secure.md#use-customer-managed-encryption-keys-your-responsibilities-for-key-availability) for previous key versions.

Open the [configuration form](secure.md#connect-a-kms-provider-open-the-configuration-form) with Azure Key Vault selected. Then follow these steps:

1. In Microsoft Entra ID, [register an application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) for Northflank.

2. Create a client secret for the application.

3. In Azure Key Vault, grant its service principal the key access described above.

4. In Northflank, enter the directory ID in Tenant ID and the application ID in Client ID.

5. Enter the client secret value, not its identifier, in Secret.

6. Enter the Key identifier URL under Key location.

7. Click Validate.

8. Wait for Validation successful before you click Create encryption configuration.

9. Continue to [verify and activate the configuration](secure.md#use-customer-managed-encryption-keys-verify-and-activate-a-configuration).

### Connect a KMS provider: Use HashiCorp Vault Transit

> [!note] Requirements
>
> You will need the following to get started:
>
> - A Vault server reachable by Northflank over HTTPS
> - An enabled [Transit secrets engine](https://developer.hashicorp.com/vault/docs/secrets/transit)
> - A key for encryption and data-key generation with key derivation disabled
> - A token with the required Transit permissions

Vault Transit performs encryption operations with a named key. Northflank uses it to wrap DEKs. This differs from a Vault KV integration, which stores secret values in Vault.

The token needs the `update` capability on these paths. Replace `transit` with your mount path and `northflank` with your key name:

```hcl
path "transit/encrypt/northflank" {
  capabilities = ["update"]
}
path "transit/decrypt/northflank" {
  capabilities = ["update"]
}
path "transit/datakey/plaintext/northflank" {
  capabilities = ["update"]
}
```

Open the [configuration form](secure.md#connect-a-kms-provider-open-the-configuration-form) with HashiCorp Vault Transit selected. Then follow these steps in Northflank:

1. Under Connection, enter the HTTPS Address of your Vault server.

2. Enter your Token.

3. If your Vault uses a namespace, enter it in Namespace (optional).

4. Under Key location, enter Mount path (optional), or leave it blank for `transit`.

5. Enter the Key name.

6. Use the displayed Vault policy to make sure that your token has the required permissions.

7. Click Validate.

8. After Validation successful appears, click Create encryption configuration.

9. Continue to [verify and activate the configuration](secure.md#use-customer-managed-encryption-keys-verify-and-activate-a-configuration).

Keep the token valid and replace it before it expires.

## Grant API access

Source: https://northflank.com/docs/v1/application/secure/grant-api-access.md

> [!important]
>
> Never share tokens or commit them to repositories. Store tokens securely in environment variables or secrets management systems.

Generate API tokens from RBAC roles for programmatic access to the Northflank API. Tokens authenticate users or programs to the API using [JSON Web Tokens (JWT).](https://jwt.io/introduction)

API tokens inherit permissions from the RBAC role they're generated from. Manage permissions by editing RBAC roles, not individual tokens.

### Grant API access: Generate an API token

Generate API tokens from RBAC roles in your team or organisation.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/api/tokens) to create an API token.

1. Open API tokens in your team or organization.

2. Click Create API token

3. Configure the token:

  - Name: Descriptive identifier for the token

  - Description: A short description of the token

  - Associated RBAC role: Select an RBAC role (determines token permissions)

  - Token lifetime: Select a lifetime, or No expiry when available

4. Click Create API token

5. Copy the token immediately (shown only once and cannot be retrieved later)

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

Open API tokens in your team or organization to revoke a token. Revoked tokens are invalidated immediately and cannot be restored.

Deleting an RBAC role revokes all tokens generated from that role.

### Grant API access: Generate tokens from organisation roles

The CLI `northflank login` flow supports generating tokens from organisation roles for cross-team access.

For team and project requests with an organization-scoped token, include the target team ID. See [Organization API access](../api/use-the-api.md#organization-api-access).

### Grant API access: Next steps

- [Create a team and invite members: Create a team and invite members to collaborate on projects.](collaborate.md#create-and-manage-a-team)
- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)

## Inject secrets

Source: https://northflank.com/docs/v1/application/secure/inject-secrets.md

You can define build arguments and runtime variables to be injected at build or runtime respectively for services and jobs. You can set [build arguments](build.md#inject-build-arguments) and [environment variables](run.md#inject-runtime-variables) in individual resources, or [create a secret group](secure.md#manage-secret-groups) so that multiple resources in a project can inherit the same secrets.

The editor for both allows you to view arguments and variables, edit them in a table as key-value pairs, or in JSON or ENV format.

If you are working in a team, or edit the variables in another tab, you will be notified that the values have changed and can either view a difference editor or discard your changes. The difference editor will update the remote values in real-time so you can be sure of any variables you may overwrite.

> [!note] Priority
>
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

## Use customer-managed encryption keys

Source: https://northflank.com/docs/v1/application/secure/manage-encryption.md

Protect your secrets on Northflank with an encryption key stored in your own key management service (KMS). You control the key and its permissions, and the key stays outside Northflank.

> [!note] Enterprise availability
>
> Encryption key management is available to enterprise accounts. Contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) or [schedule a meeting](https://cal.com/team/northflank/northflank-enterprise) to enable access for your team or organization.

> [!note]
>
> [Click here](https://app.northflank.com/s/teamOrOrg/settings/encryption) to manage encryption for your team or organization.

### Use customer-managed encryption keys: What encryption protects

Northflank stores your secrets encrypted at rest in its internal database and decrypts them when needed. This protection covers all secrets stored in that database. Examples include:

- Build and runtime values and files, including those in secret groups and global secrets

- Platform-generated secrets, such as addon connection strings

- Integration credentials, including BYOC credentials

By default, Northflank uses its own keys to encrypt these secrets. With customer-managed encryption keys (CMEK), you can use your own key to protect secrets owned by a team or organization. Your key stays in your KMS. Enabling CMEK applies to new encrypted writes and does not automatically re-encrypt existing secrets.

An organization's customer-managed key does not automatically apply to its teams. Each team manages its encryption separately.

Customer-managed encryption does not cover volumes, other workload storage, your application data, addon databases, or backups.

### Use customer-managed encryption keys: Encryption modes

Northflank supports three encryption modes for new encrypted writes:

| Mode | Key management |
| --- | --- |
| Northflank-managed encryption | Northflank manages the encryption key. This is the default mode. |
| Northflank-managed envelope encryption | Use Northflank-managed keys for new envelope-encrypted data. No customer KMS is required. Support can later migrate that data to your KMS. |
| Customer-managed encryption | Your encryption key stays in your KMS. [Set up customer-managed encryption](secure.md#use-customer-managed-encryption-keys-set-up-customer-managed-encryption). |

The Current encryption panel shows the mode for new encrypted writes.

Enabling or changing a mode applies to new encrypted writes, including updates that save encrypted values. It does not automatically convert existing data. Contact support to [migrate existing envelope-encrypted data](secure.md#use-customer-managed-encryption-keys-rotate-keys-and-migrate-data).

### Use customer-managed encryption keys: How your secrets are encrypted

Northflank uses envelope encryption to support customer-managed encryption keys (CMEK). It uses two types of keys: a data encryption key (DEK) encrypts your secrets, and a key encryption key (KEK) encrypts, or wraps, the DEK.

With customer-managed encryption, your KMS holds the KEK and wraps and unwraps DEKs. The KEK stays in your KMS, and your secrets are never sent to it. With Northflank-managed envelope encryption, Northflank holds the KEK.

To read a secret with customer-managed encryption, Northflank asks your KMS to unwrap the DEK, then uses it to decrypt the secret. Without access to the KEK, the stored data cannot be decrypted.

Northflank can temporarily cache unwrapped DEKs in memory and reuse them across secrets without contacting your KMS each time. As a result, KMS audit logs do not provide a complete record of secret reads. You can adjust this behavior through the [DEK reuse and caching](secure.md#use-customer-managed-encryption-keys-advanced-options) options.

### Use customer-managed encryption keys: Your responsibilities for key availability

With customer-managed encryption, you control your KMS key and Northflank's
access to it. Northflank does not keep a copy of the key.

> [!warning] You are responsible for keeping keys available
>
> - Keep your key, required key versions, and the credentials Northflank uses
>   to reach it available for as long as data depends on them.
> - If Northflank loses access to your KMS or to the key, operations that need
>   the affected secrets fail until access is restored.
> - If the key material is permanently deleted, the data it protects is
>   unrecoverable. Northflank cannot restore it.
> - Activating or deactivating a configuration does not remove these
>   dependencies.
> - You can ask Northflank support to [migrate encrypted data to another key](secure.md#use-customer-managed-encryption-keys-rotate-keys-and-migrate-data). Keep previous keys available until support confirms that migration is complete.

### Use customer-managed encryption keys: Prerequisites

> [!note] Requirements
>
> You will need the following to get started:
>
> - An enterprise account with envelope encryption enabled by Northflank support
> - Access to the team or organization whose encryption you will manage
> - The encryption permissions required for your task

Use [role-based access control](secure.md#use-role-based-access-control) to grant encryption permissions separately for teams and organizations. You need Read to view encryption configurations and status. You also need Create to add encryption configurations. Manage lets you edit, activate, or deactivate configurations. It also lets you enable Northflank-managed envelope encryption. Read is still required to use these controls in the UI.

Select your team or organization before you open Settings → Encryption.

### Use customer-managed encryption keys: Set up customer-managed encryption

Each encryption configuration contains the credentials and key location for one KMS provider.

Before you start, review the [prerequisites](secure.md#use-customer-managed-encryption-keys-prerequisites) and your [responsibilities for key availability](secure.md#use-customer-managed-encryption-keys-your-responsibilities-for-key-availability).

To create a new encryption configuration:

1. Open Settings → Encryption for your team or organization.

2. Click Add encryption configuration. If configurations already exist, click Create encryption configuration above All configurations.

3. Under Basic information, enter a unique Name and an optional Description.

4. Select a Provider.

5. Follow the setup instructions for your provider in [Connect a KMS provider](secure.md#connect-a-kms-provider).

| Provider | Authentication |
| --- | --- |
| [AWS KMS](secure.md#connect-a-kms-provider-use-aws-kms) | [Cross-account role](secure.md#connect-a-kms-provider-connect-with-a-cross-account-role) or [access keys](secure.md#connect-a-kms-provider-connect-with-access-keys) |
| [GCP Cloud KMS](secure.md#connect-a-kms-provider-use-gcp-cloud-kms) | [Cross-project service account](secure.md#connect-a-kms-provider-connect-with-a-cross-project-service-account) or [service-account JSON key](secure.md#connect-a-kms-provider-connect-with-a-service-account-key) |
| [Azure Key Vault](secure.md#connect-a-kms-provider-use-azure-key-vault) | Microsoft Entra ID application credentials |
| [HashiCorp Vault Transit](secure.md#connect-a-kms-provider-use-hashicorp-vault-transit) | Vault token |

You can leave Advanced options blank to use the [defaults](secure.md#use-customer-managed-encryption-keys-advanced-options).

Creation opens the configuration details with status Pending activation. Saving a configuration does not enable it. Complete the [activation procedure](secure.md#use-customer-managed-encryption-keys-verify-and-activate-a-configuration) when you are ready to use it.

### Use customer-managed encryption keys: Verify and activate a configuration

Activating an encryption configuration affects only new encrypted writes. Review your [responsibilities for key availability](secure.md#use-customer-managed-encryption-keys-your-responsibilities-for-key-availability) before you continue.

To activate a configuration:

1. Open the configuration from Settings → Encryption.

2. Click Verify.

3. Wait for Verification successful.

4. Click Set as active configuration.

5. Read and select each acknowledgement about key availability, permanent key loss, and existing data.

6. Click Set as active configuration in the dialog.

7. Wait for the configuration to show Active.

Activation checks KMS access once more, then switches new encrypted writes to this configuration. Only one configuration is active at a time. Activation does not change how existing secrets are encrypted. Previously active configurations must remain available to decrypt them. To move existing data to the new key, [contact Northflank support](secure.md#use-customer-managed-encryption-keys-rotate-keys-and-migrate-data).

You can use Verify again to test whether your KMS is accessible and can wrap and unwrap data keys. This does not test whether previously wrapped data keys can still be unwrapped.

### Use customer-managed encryption keys: Enable Northflank-managed envelope encryption

If you plan to use your own KMS later, you can start with Northflank-managed envelope encryption for new and updated secrets. [Northflank support](https://northflank.com/contact) can [migrate this data](secure.md#use-customer-managed-encryption-keys-rotate-keys-and-migrate-data) to use your key when you are ready.

To enable it:

1. Open Settings → Encryption for your team or organization.

2. Under Key management options, click Enable envelope encryption.

3. Wait for Current encryption to show Northflank-managed envelope encryption.

Once enabled, the page no longer offers the opt-in action. If an encryption configuration is active, [deactivating it](secure.md#use-customer-managed-encryption-keys-deactivate-a-configuration) switches new encrypted writes to Northflank-managed envelope encryption.

### Use customer-managed encryption keys: Edit settings and update credentials

Use Edit settings to update credentials or change the key location for an encryption configuration. You cannot change the provider.

> [!note] Activated configurations must keep the same key
>
> After first activation, new credentials and key locations must retain access
> to the same key, even after deactivation. To use a different key or provider,
> create and activate a new encryption configuration.

Northflank does not display stored secret values, so credential fields start empty when you edit a configuration.

You cannot change the GCP authentication method in the edit form. GCP cross-project configurations keep their generated service account and need no credentials. For these configurations, you can edit only the key location.

To make changes to an encryption configuration:

1. Open the configuration from Settings → Encryption.

2. Click Edit settings.

3. If your configuration uses credentials that you supply, re-enter them.

4. To change the key location, enter the new location.

5. If available, click Validate to test the new settings without saving.

6. Click Save settings.

7. Optionally, click Verify on the details page to test the saved configuration.

When you save changes after first activation, Northflank tests KMS access and makes sure that the configuration still points to the same key.

To change DEK rotation or caching, use [Advanced options](secure.md#use-customer-managed-encryption-keys-advanced-options) on the details page.

### Use customer-managed encryption keys: Deactivate a configuration

Deactivation stops Northflank from using the active encryption configuration for new encrypted writes. These writes will use Northflank-managed envelope encryption instead.

Previously active encryption configurations must remain valid so Northflank can decrypt existing data. Keep their keys and credentials available, as described in your [responsibilities for key availability](secure.md#use-customer-managed-encryption-keys-your-responsibilities-for-key-availability).

To deactivate the active encryption configuration:

1. Open the active configuration from Settings → Encryption.

2. Click Deactivate.

3. Read and select each acknowledgement about new writes, key availability, and existing data.

4. Click Deactivate in the dialog.

5. Return to the encryption page.

6. Wait for Current encryption to show Northflank-managed envelope encryption.

The previous configuration remains in the list. Its [status and data-key count](secure.md#use-customer-managed-encryption-keys-status-and-usage) describe its remaining use. For migration, see [Rotate keys and migrate data](secure.md#use-customer-managed-encryption-keys-rotate-keys-and-migrate-data).

### Use customer-managed encryption keys: Status and usage

The All configurations table shows each customer-managed configuration and its status:

| Status | Meaning |
| --- | --- |
| Active | Northflank uses this configuration for new encrypted writes and to decrypt data that depends on it. |
| Decrypt-only | The configuration was previously active and retains stored data keys. It no longer encrypts new data but is required for decryption. |
| Pending activation | The configuration was never activated. It does not encrypt or decrypt secret data. |
| Not in use | The configuration was previously active and currently has no stored data keys. It no longer encrypts new data. |

The Retained for decryption notice links to inactive configurations that still hold data keys.

The Data keys count measures stored DEKs, not individual secrets. Multiple secrets can share a DEK. The count can remain unchanged after you delete a secret. It excludes Northflank-managed configurations and data under default encryption.

Follow the [key-availability guidance](secure.md#use-customer-managed-encryption-keys-your-responsibilities-for-key-availability) before you retire a key.

### Use customer-managed encryption keys: Advanced options

The Advanced options section controls DEK reuse and caching for an encryption configuration.

You can configure the following options. Blank fields use the listed defaults:

| Control | Default | Behavior |
| --- | --- | --- |
| Maximum DEK encryption uses | 1,000 | Threshold for replacing a DEK used for encryption. |
| Maximum DEK lifetime (minutes) | 60 | How long a DEK remains eligible to encrypt new data. |
| DEK cache TTL (seconds) | 300 | How long decrypted DEKs are cached in memory for reading data. |

The lifetime does not delete a key or expire its encrypted data. A DEK that no longer encrypts new data can still decrypt existing data.

To change these values:

1. Open the configuration from Settings → Encryption.

2. Under Advanced options, enter whole numbers in the displayed units, or clear a field to restore its default.

3. Click Save options.

Lower reuse limits and shorter cache periods can increase KMS requests, latency, and provider costs.

### Use customer-managed encryption keys: Rotate keys and migrate data

Configure key rotation in your KMS according to your policy. Rotation does not migrate existing data. Keep previous key versions available while data still depends on them.

For Azure, a versionless key URL follows rotation for new DEK wrapping. A versioned URL remains pinned to its specified version.

To switch to a different key or KMS provider, [create and activate a new encryption configuration](secure.md#use-customer-managed-encryption-keys-set-up-customer-managed-encryption). The new configuration applies only to new encrypted writes.

To move existing envelope-encrypted data to the new key, [contact Northflank support](https://northflank.com/contact). Northflank support can also migrate data to or from Northflank-managed envelope encryption.

Follow the [key-availability guidance](secure.md#use-customer-managed-encryption-keys-your-responsibilities-for-key-availability) throughout the migration. Keep previous keys available until Northflank support confirms that migration is complete.

### Use customer-managed encryption keys: Revoke KMS access

To stop using an encryption configuration for new writes, [deactivate it](secure.md#use-customer-managed-encryption-keys-deactivate-a-configuration).

To block Northflank from decrypting existing secrets, revoke its access to the key in your KMS. Operations that require access to that key fail until access is restored.

Cached data keys can still decrypt secrets until their [cache TTL](secure.md#use-customer-managed-encryption-keys-advanced-options) expires, up to five minutes by default.

Revocation does not remove secrets already delivered to workloads.

> [!warning] Permanent key deletion
>
> If you permanently delete key material that your secrets still depend on,
> those secrets are unrecoverable. Northflank cannot restore them.

## Manage global secrets

Source: https://northflank.com/docs/v1/application/secure/manage-global-secrets.md

Global secrets are team-level resources that store configuration data, values, and files that can be referenced across multiple templates and services. Unlike secret groups which are project-scoped, global secrets are accessible at the team level.

To create or modify a global secret, navigate to the [secrets page](https://app.northflank.com/s/account/global-secrets) from your team menu.

Enter values as JSON-structured objects, or upload secret files, which will be accessible in your templates.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/global-secrets) to view your global secrets.

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

Enterprise accounts can [use their own KMS](secure.md#use-customer-managed-encryption-keys) to protect secret-group values and files stored by Northflank.

To create or modify a group of secrets, open the secrets page from the project menu.

Enter the secrets as key value pairs, in JSON format, or import from a `.env` file.

You can also [link addons](databases-and-persistence.md#connect-database-secrets-to-workloads) to the secret group, or [upload secret files](secure.md#upload-secret-files), which will be inherited like manually-added secrets.

> [!warning] Updating secret groups with the API or CLI
>
> Sending `secrets.variables` or `secrets.files` in an API or CLI update replaces all of the variables or files in the secret group, including with a `PATCH` request. To change one variable, read the secret group, merge your change, and send the complete set back. See [update resources safely](../api/use-the-api.md#update-resources-safely).

After creating or editing a secret group you can click restart dependents  to redeploy all services and jobs that inherit the secrets with the new values.

> [!note]
>
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

Use Group settings to restrict a secret group to services, jobs, tags, or [environments](release.md#set-up-environments) within the project.

The [group scope](secure.md#manage-secret-groups-secret-group-scope) controls whether workloads receive build arguments, runtime variables, or both.

| Restrictions | Workloads that receive the group's values |
| --- | --- |
| Disabled | All applicable services and jobs in the project |
| Enabled, with no selections | None |
| Selected services or jobs | Those resources |
| Selected tags | Resources that match the tag rule |
| Selected environments | Services and jobs assigned to those environments |
| Combined selections | Resources that match any resource, tag, or environment selection |

#### Manage secret groups: Restrict by tag

You can grant access to resources with [selected tags](release.md#tag-workloads-and-resources). By default, a resource needs any selected tag. Enable Force matching all tags to require every selected tag.

This control applies only to tag matching. Explicitly selected resources and resources in selected environments receive the values independently.

#### Manage secret groups: Restrict by environment

Select existing environments in the same project, such as staging or production.

> [!important]
>
> To restrict access to selected environments only, clear the service, job, and tag selections. Other selections grant access independently.

1. Open the secret group's Group settings page.

2. Enable Restrict secret group.

3. Select environments under Apply secrets to specific environments.

4. Select Update settings.

For example, selecting `staging` and the `api` tag grants access to staging workloads and production workloads tagged `api`.

Deleting a selected environment removes it from the restrictions. Other matching criteria still grant access.

Saving the group configuration does not restart workloads. Restart services or start new job runs to apply updated runtime variables.

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
- [Manage team security: Enforce multi-factor authentication and configure RBAC and API access for your team members.](collaborate.md#create-and-manage-a-team-manage-team-security)
- [Create and manage an organisation on Northflank: Create and manage users, security, billing, and multiple teams with a Northflank organisation.](collaborate.md#create-and-manage-an-organisation)

### Security on Northflank: Access control

When working in teams or organisations, it is important to only grant the permissions and access strictly necessary for the job, whether that's a team member or external application. Create roles with granular permissions for team members and API tokens.

- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
- [Generate API tokens: Generate an API token to access your team and project.](secure.md#grant-api-access-generate-an-api-token)

### Security on Northflank: Secret management

Secrets should remain encrypted and restricted. Northflank can securely store secrets in services, secret groups, and argument overrides for templates. Secret values should never be committed to a repository or saved in a template body.

Enterprise accounts can [use their own KMS](secure.md#use-customer-managed-encryption-keys) to control the encryption key that protects secrets stored by Northflank. Contact Northflank support to enable access.

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
>
> You will still need to enter your one-time password when using single sign-on if you have multi-factor authentication enabled.

### Enable single sign-on and multi-factor authentication: Multi-factor authentication

You can enable multi-factor authentication (MFA) from your account settings page for additional security. When enabled, you will also need to enter a one-time password (OTP) from an authenticator application every time you log in to your account, both by password or single sign-on.

Use your authenticator application to scan the QR code, or manually enter the secret to add your Northflank account. On Northflank, enter the one-time password generated by your authenticator application and your account password, then click enable OTP.

> [!important]
>
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
>
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
>
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

If you have [enabled directory sync](collaborate.md#create-and-manage-an-organisation-sync-your-directory), you can select directory groups to associate with the role. Users in the directory groups will be assigned the role, and the role will be removed from users if they are removed from the directory group.

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

- [Create a team and invite members: Create a team and invite members to collaborate on projects.](collaborate.md#create-and-manage-a-team)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
