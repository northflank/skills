# Collaborate

Generated from 5 application pages listed in `llms.txt`.

## Pages

- [Collaborate on Northflank](#collaborate-on-northflank)
- [Create and manage a team](#create-and-manage-a-team)
- [Delete teams and accounts](#delete-teams-and-accounts)
- [Create and manage an organisation](#create-and-manage-an-organisation)
- [Manage Git integrations](#manage-git-integrations)

## Collaborate on Northflank

Source: https://northflank.com/docs/v1/application/collaborate/collaborate-on-northflank.md

Build and deploy with your team on Northflank. Invite colleagues to your team, control access with roles and permissions, and manage multiple teams from one place.

Collaboration is free. You only pay for the resources your team uses.

### Collaborate on Northflank: How collaboration works

Northflank has three main parts for collaboration:

- **Teams:** Workspaces where you manage projects, integrations, and team members.

- **Organisations:** Manage multiple teams from one place with centralised billing, user management, security settings, and team oversight.

- **Access control:** Control what team members and applications can access and do across your teams and organisations using roles, permissions, and API tokens.

### Collaborate on Northflank: When to use teams vs organisations

You can start with a team and move it into an organisation later, so you don't need to create an organisation from the start.

**Use a team if:**

- You're working solo or with a small group.

- You want a simple workspace for your projects.

- Your work fits within a single team.

**Use an organisation if:**

- You manage multiple teams, such as teams for different departments or projects.

- You want to manage users and billing across multiple teams.

- You want to apply security settings across your teams.

- You want to manage users through your identity provider, such as with SSO.

### Collaborate on Northflank: Teams

A team is your workspace on Northflank. It contains your projects, integrations, and team members.

You can invite colleagues to your team and control what they can do with roles and permissions. You can also create separate teams for different groups or projects.

- [Create a team and invite members: Create a team and invite members to collaborate on projects.](collaborate.md#create-and-manage-a-team)
- [Manage Git integrations: Add accounts for Git services and restrict namespaces.](collaborate.md#manage-git-integrations)

### Collaborate on Northflank: Organisations

An organisation lets you manage multiple teams from one place. This is useful for larger groups or companies where different teams work on separate projects.

With an organisation, you can manage users, billing, and reporting across your teams, apply security settings such as SSO and MFA, and connect your identity provider to manage user access.

You can convert an existing team into an organisation from the team's settings. This lets you start with a team and add organisation-level management as your needs grow.

- [Create and manage an organisation on Northflank: Create and manage users, security, billing, and multiple teams with a Northflank organisation.](collaborate.md#create-and-manage-an-organisation)
- [Security on Northflank: Protect your infrastructure and data on Northflank with multi-factor authentication, securely injected secrets, network security, and role-based access control.](secure.md#security-on-northflank)

### Collaborate on Northflank: Access control

Use roles and permissions to control what team members can do across your teams and organisations. You can create custom roles with specific permissions and assign them to team members.

- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
- [Generate API tokens: Generate an API token to access your team and project.](secure.md#grant-api-access-generate-an-api-token)
- [Audit logs: Monitor and review events affecting your organisation, teams, projects, and resources.](observe.md#audit-logs)

## Create and manage a team

Source: https://northflank.com/docs/v1/application/collaborate/create-a-team.md

A team is your workspace on Northflank. It contains your projects, integrations, and team members.

You can start with a team and invite colleagues to work together. If you later need to manage multiple teams, you can convert your team into an organisation.

### Create and manage a team: Create a team

> [!note]
>
> [Click here](https://app.northflank.com/s/account/teams/new) to create a new team.

1. From your Northflank dashboard, press CMD+K or click the search icon.

2. Click **Create new**, then select **Team**.

3. Enter a name for your team.

4. Enter a contact and billing email.

5. Choose a plan.

6. Invite teammates if needed.

7. Click **Create team**.

Your team is now ready to use. You can invite members, connect your Git account, configure integrations, and create your first project.

> [!note]
>
> Team names must be unique. Standalone team names must be unique globally, while organisation team names must be unique within the organisation.

### Create and manage a team: Invite members to your team

You can invite colleagues from your team's Members page.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/settings/members/invite) to invite your teammates.

1. Open Members in your team.

2. Click Invite member.

3. Enter the email addresses of the people you want to invite.

4. Select a role for each teammate.

5. Send the invitations.

Invited users can join your team using the email invitation. If they do not have a Northflank account, they can create one when they accept the invitation.

You can change a member's role later from the Members page.

### Create and manage a team: Manage team security

#### Create and manage a team: Role-based access control

Use [RBAC roles](secure.md#use-role-based-access-control) to control what team members can access and do. You can create roles with specific permissions and assign them to team members from the RBAC roles page or the team members page.

#### Create and manage a team: API access

API token access is managed through [RBAC roles](secure.md#use-role-based-access-control). Assign the appropriate role to team members who need to create API tokens for team resources.

#### Create and manage a team: Restrict public infrastructure

You need permission to update team settings to change these policies. Organization restrictions also apply to the team and cannot be disabled in team settings.

| Policy | Effect |
| --- | --- |
| Prevent public BYOC load balancers | Requires new BYOC clusters to use private ingress only. Existing private-only clusters cannot enable public ingress. |

Enabling this policy does not remove public ingress from existing clusters. After you disable public ingress, you cannot re-enable it while the policy applies.

1. In your team, open Settings → General.

2. Enable the required policies.

3. Click Update.

See [public and VPC ingress](bring-your-own-cloud.md#configure-your-cluster-public-and-vpc-ingress) for cluster requirements and connectivity.

#### Create and manage a team: Encryption keys

Enterprise teams can [use their own KMS](secure.md#use-customer-managed-encryption-keys) to protect secrets stored by Northflank. Configure encryption in Settings → Encryption. Contact Northflank support to enable access. Configure each team separately, even when its organization uses envelope encryption.

#### Create and manage a team: Multifactor Authentication

You can require team members to use multifactor authentication (MFA) to access your team.

When MFA is required, team members must [set up an authenticator application for their Northflank account](secure.md#enable-single-sign-on-and-multi-factor-authentication-multi-factor-authentication) before they can access Northflank. They must also enter their one-time passcode each time they log in.

You can also set a maximum login session duration in hours. After the session expires, team members are logged out and must sign in again. If a user belongs to multiple teams with different session duration settings, the shortest duration is applied.

### Create and manage a team: Transfer ownership of a team

The team owner has full permissions and cannot be removed from the team by other members.

You can transfer team ownership to another team member from your team's Members page.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/settings/members) to access your member page.

1. In your team, open Members.

2. Click the transfer ownership icon () next to the member you want to transfer ownership to.

3. Click Transfer.

Ownership is transferred immediately to the selected team member.

### Create and manage a team: Convert a team to an organisation

If you already have a team, you can convert it to an organisation. Your existing team will become a team within the new organisation.

> [!note]
>
> You cannot convert a team into an organisation if you are already a member of an organisation.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/settings) to access your team settings page.

1. In your team, select General under Settings.

2. Under Organisation, click Convert to organisation.

3. Enter the organisation name.

4. Click Convert to organisation.

Your organisation is created with your existing team under it.

### Create and manage a team: Next steps

- [Link your Git account: Integrate your Git accounts with Northflank to start building and deploying your code.](getting-started.md#link-your-git-account)
- [Create a project: Create a project to contain your services, persistent data, secrets, and more.](getting-started.md#create-a-project)
- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
- [Create and manage an organisation on Northflank: Create and manage users, security, billing, and multiple teams with a Northflank organisation.](collaborate.md#create-and-manage-an-organisation)

## Delete teams and accounts

Source: https://northflank.com/docs/v1/application/collaborate/delete-teams-and-accounts.md

You can permanently delete teams, organisations, and user accounts from their respective settings pages. Deletion is irreversible.

You must be the **owner** to delete a team or organisation. Users can delete their own accounts. For SSO-provisioned accounts, organisation administrators can also deprovision users.

### Delete teams and accounts: Delete a team

To delete a team:

> [!note]
>
> [Click here](https://app.northflank.com/s/team/settings) to access your team settings page.

1. Navigate to [Team Settings](https://app.northflank.com/s/team/settings)

2. Scroll to the **Danger zone** section

3. Click **Delete team**

4. Confirm the deletion

5. Click **Confirm deletion**

All projects, services, databases, and resources within the team will be permanently deleted.

### Delete teams and accounts: Delete an organisation

To delete an organisation:

> [!note]
>
> [Click here](https://app.northflank.com/s/teamOrOrg/settings) to access your organisation settings page.

1. Navigate to [Organisation Settings](https://app.northflank.com/s/teamOrOrg/settings)

2. Scroll to the **Danger zone** section

3. Click **Delete organisation**

4. Confirm the deletion

5. Click **Confirm deletion**

All teams, billing information, and organisation data will be permanently deleted.

### Delete teams and accounts: Delete your user account

To delete your user account:

> [!note]
>
> [Click here](https://app.northflank.com/s/context/settings/profile) to access your account settings page.

1. Navigate to [Account Settings](https://app.northflank.com/s/context/settings/profile)

2. Scroll to the **Danger zone** section

3. Click **Delete account**

4. Confirm the deletion

5. Click **Confirm deletion**

Your account, all teams you own, and all associated data will be permanently deleted.

### Delete teams and accounts: Important warnings

**Deletion is permanent and irreversible**

Once deleted, you cannot recover:

- Projects, services, and databases

- Backups and data

- Billing history

- Team or organisation settings

- Custom domains and configurations

**Active resources**

Ensure all running services, databases, and workloads are stopped before deletion. Active resources may continue to incur charges until fully terminated.

**Team and organisation ownership**

If you're the only owner:

- Transfer ownership to another member before deletion, or

- Delete the team/organisation entirely

If there are other owners, they can continue managing the team/organisation after you leave.

### Delete teams and accounts: Before deleting

**Backup your data:**

- Export any important data from databases

- Save configuration files and templates

- Download logs and metrics if needed

**Review invoices and usage:**

- Any pending invoice will have to be paid

- Any remaining usage will be billed on account deletion

Ensure there are no remaining questions regarding billing before proceeding.

**Notify team members:**

- Inform team members if you're deleting a shared team or organisation

- Give them time to back up data they need

### Delete teams and accounts: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)

## Create and manage an organisation

Source: https://northflank.com/docs/v1/application/collaborate/manage-an-organisation.md

An organisation lets you manage multiple teams from one place. You can manage users and billing across teams, apply security settings, and control access to your organisation's resources.

You can create an organisation from your user dashboard, or convert an existing team into an organisation.

### Create and manage an organisation: Create an organisation

> [!note]
>
> [Click here](https://app.northflank.com/s/context/orgs/new) to create a new organisation.

1. From your Northflank dashboard, press CMD+K or click the search icon.

2. Click **Create new**, then select **Organisation**.

3. Enter a name for your organisation.

4. Enter a contact and billing email.

5. Choose a plan.

6. Invite teammates if needed.

7. Click **Create organisation**.

Your organisation is now ready to use. You can add teams, invite members, configure security, and manage billing from your organisation.

> [!note]
>
> You can also [schedule a call](https://cal.com/team/northflank/northflank-enterprise) to discuss onboarding your organisation and choosing the right plan for your needs.

### Create and manage an organisation: Convert a team to an organisation

If you already have a team, you can convert it to an organisation. Your existing team will become a team within the new organisation.

> [!note]
>
> You cannot convert a team into an organisation if you are already a member of an organisation.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/settings) to access your team settings page.

1. In your team, select General under Settings.

2. Under Organisation, click Convert to organisation.

3. Enter the organisation name.

4. Click Convert to organisation.

### Create and manage an organisation: Manage organisation security

#### Create and manage an organisation: Restrict teams and members

You need permission to manage organisation settings to use these controls on the organisation settings page:

- **Disable members joining external teams:** Organisation members cannot join teams that do not belong to the organisation.

- **Disable inviting external users to organisation teams:** Users who are not members of the organisation cannot be invited to its teams.

- **Use template draft system:** Teams in the organisation must use the template draft system instead of editing templates directly.

- **Disable team cluster creation**: Block new team-owned clusters. Existing clusters are not affected. Teams can still deploy onto organisation clusters with the required access.

- **Disable PaaS deployments:** Teams in the organisation cannot create projects in Northflank PaaS regions. Projects can only be created on BYOC clusters.

- **Disable PaaS registry:** Teams in the organisation cannot use the Northflank PaaS registry. Projects must use a self-hosted registry.

- **Restrict secret groups by default:** Changes the default value of the **Restrict secret group** option when a team in the organisation creates a new secret group. This does not enforce the restriction, and the setting can still be changed when creating the secret group. Existing secret groups are not affected.

#### Create and manage an organisation: Restrict public infrastructure

You need permission to manage organisation settings to change these policies. They apply across the organisation and its teams.

| Policy | Effect |
| --- | --- |
| Prevent public addon access | Blocks public access on new addons and prevents existing private addons from enabling public access. |
| Prevent public BYOC load balancers | Requires new BYOC clusters to use private ingress only. Existing private-only clusters cannot enable public ingress. |

Enabling these policies does not remove public access from existing addons or clusters. After you disable their public access, you cannot re-enable it while the relevant policy remains enabled.

1. In your organisation, select General under Settings.

2. Enable the required policies.

3. Select Update.

For connection requirements, see [VPC addon access](databases-and-persistence.md#access-a-database-expose-a-database-to-the-vpc) and [BYOC ingress](bring-your-own-cloud.md#configure-your-cluster-public-and-vpc-ingress).

#### Create and manage an organisation: Multifactor Authentication

You can enable **require MFA** from your organisation's security page to enforce multifactor authentication for your organisation members. Organisation members will be prompted to [set up an authenticator application for their Northflank account](secure.md#enable-single-sign-on-and-multi-factor-authentication-multi-factor-authentication) before they can access Northflank, and they will need to enter their one-time passcode on every log in attempt.

You can also set a maximum login session duration in hours, which will automatically log organisation members out and require them to re-authenticate after the time period.

#### Create and manage an organisation: Clear member login sessions

You can **clear member login sessions** from your organisation's security page to immediately log out all user accounts from your organisation.

#### Create and manage an organisation: Encryption keys

Enterprise organizations can [use their own KMS](secure.md#use-customer-managed-encryption-keys) to protect secrets stored by Northflank. Configure encryption in Settings → Encryption. Contact Northflank support to enable access. The configuration applies to the organization and does not automatically configure its teams.

### Create and manage an organisation: Create organisation roles

You can [manage user roles on an organisational level](secure.md#use-role-based-access-control-create-organisation-roles) to ensure compliance with your security policies, restrict users to specific teams, and grant organisational permissions.

### Create and manage an organisation: Manage organisation billing

You can add your payment method and tax ID for an organisation to [manage billing for all teams](billing.md#pricing-on-northflank) in the organisation.

As well monitoring spend by project and resource type, you can also monitor spend by team.

Invoices for each team's usage can be downloaded from the team billing page.

You can receive [organisation billing notifications](observe.md#configure-notification-integrations-organisation-notifications) through a notification integration.

### Create and manage an organisation: Configure single sign-on (SSO)

> [!note] Unlock SSO and directory sync
>
> Contact [support@northflank.com](mailto:support@northflank.com) or [schedule a meeting](https://cal.com/team/northflank/northflank-enterprise) to enable single sign-on and directory sync for your organisation.

You can connect your identity provider to Northflank so organisation members can sign in using single sign-on (SSO).

Northflank uses [WorkOS SSO](https://workos.com/single-sign-on) to connect your identity provider using SAML or OpenID Connect (OIDC).

> [!note]
>
> [Click here](https://app.northflank.com/s/context/settings/sso) to configure SSO.

1. In your organisation, select SSO under Settings.

2. Under Link your organisation, click Add domain and enter the domain associated with your organisation, such as `example.com`.

3. Add any other domains used by your organisation.

4. If needed, enable Allow port security SSO with external domains. This allows users with external domains in your identity provider to access services that have this option enabled.

5. Click Update.

6. Under SSO, click Set-up SSO.

7. Follow the instructions provided by WorkOS to connect your identity provider.

8. Refresh connections to make sure SSO is working.

Once SSO is configured, users from your identity provider can sign up and sign in to Northflank using your organisation's SSO.

Users can sign in using **Log in with Organisation Single Sign On** on the Northflank login page, or directly at [app.northflank.com/sso-login](https://app.northflank.com/sso-login).

Some identity providers also support signing in directly from your organisation's external dashboard.

By default, Northflank uses just-in-time (JIT) provisioning. A user's Northflank account is created when they sign in for the first time using SSO.

When a user signs in for the first time using your organisation's SSO, they automatically become a member of the organisation. They cannot create teams or resources outside the organisation or leave the organisation without deactivating their account.

You can update your SSO configuration by clicking **Configure SSO**. To disable SSO, click **Disable SSO**.

#### Create and manage an organisation: Configure SSO settings

After configuring SSO, you can control how users join your organisation.

- **SSO only:** Disables manual email invitations. Users must join through your organisation's SSO.

- **Require approval for SSO sign-ups:** Adds new SSO users to an approval queue until an organisation admin approves or rejects their request.

- **Restrict invites to domain:** Invites can only be sent to email addresses on the organisation’s domain. Requires at least one domain to be configured for this organisation.

> [!note]
>
> Do not enable **Require approval for SSO sign-ups** if you use directory sync to automatically provision organisation members.

#### Create and manage an organisation: Convert an existing account to SSO

You can convert an existing organisation member's Northflank account to an SSO account.

> [!note]
>
> [Click here](https://app.northflank.com/s/context/settings/members) to access your organisation's members page.

1. Open your organisation's **Members** page.

2. Select the member you want to convert.

3. Click **Convert to SSO**.

The member can then sign in to Northflank using your organisation's SSO instead of their username and password.

> [!warning]
>
> Converting an account to SSO cannot be undone. The member must also leave or delete any teams outside your organisation before their account can be converted.

### Create and manage an organisation: Sync your directory

You can connect your organisation's user directory to Northflank to automatically manage organisation members based on directory groups.

Northflank uses [WorkOS Directory Sync](https://workos.com/directory-sync) to connect your directory.

> [!note]
>
> You must configure [single sign-on](collaborate.md#create-and-manage-an-organisation-configure-single-sign-on-sso) before you can set up directory sync.

#### Create and manage an organisation: Set up directory sync

> [!note]
>
> [Click here](https://app.northflank.com/s/context/settings/sso) to configure directory sync.

1. In your organisation, select SSO under Settings.

2. Under Directory sync, click Set-up directory sync.

3. Follow the instructions provided by WorkOS to connect your user directory.

4. Refresh connections to make sure directory sync is working.

#### Create and manage an organisation: Configure directory sync settings

- **Automatically provision organisation members:** Automatically create Northflank accounts for users in your directory. You can restrict provisioning to specific directory groups.

- **Only sync users in specific directory groups:** Restrict automatic provisioning to selected directory groups, so only users in those groups are added to your organisation.

- **Sync roles with directory groups:** Automatically assign or remove Northflank roles based on a user's directory group membership.

### Create and manage an organisation: Next steps

- [Link your Git account: Integrate your Git accounts with Northflank to start building and deploying your code.](getting-started.md#link-your-git-account)
- [Create a project: Create a project to contain your services, persistent data, secrets, and more.](getting-started.md#create-a-project)
- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)

## Manage Git integrations

Source: https://northflank.com/docs/v1/application/collaborate/manage-git-integrations.md

Connect your Git accounts to Northflank so you can build and deploy from your repositories.

You can connect multiple accounts from GitHub, GitLab, Bitbucket, and other supported Git services. You can also connect a self-hosted Git service.

### Manage Git integrations: Add a Git account

You can connect a Git account to your team from the **Integrations** section in your team dashboard.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/integrations/vcs) to connect a Git account.

1. In your team dashboard, click **Integrations**.

2. Click **Git**.

3. Click **Link** next to the Git service you want to connect.

4. Follow the instructions for the Git service.

For GitHub, choose the user or organization account for the app installation. For [Cursor Origin](getting-started.md#link-your-git-account-link-cursor-origin), choose the Cursor namespace and its repository access. For GitLab, Bitbucket, and Azure DevOps OAuth connections, Northflank connects the account you are signed in to.

Once connected, you can use repositories from the account to build and deploy services on Northflank.

### Manage Git integrations: Add a self-hosted VCS

You can connect a Git provider hosted on your own infrastructure.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Permission to manage Git integrations in your Northflank team
> - An HTTPS root URL, such as `[https://git.example.com](https://git.example.com)`
> - Permission to create the provider's OAuth application or GitHub App
> - Network access for Northflank to read the provider API and clone repositories
> - Network access for the Git host to deliver webhooks to Northflank

Webhooks notify Northflank when repository events occur, so configured builds and workflows can run automatically.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/integrations/vcs) to add a self-hosted VCS.

1. Open your team's Integrations → Git providers page.

2. Select Add a self-hosted VCS.

3. Enter a name for the integration.

4. Enter your Git host's root URL under VCS provider URL.

Continue with your provider below. Once connected, you can [build from your repositories](build.md#build-code-from-a-git-repository) and [manage the integration](collaborate.md#manage-git-integrations-self-hosted-vcs-settings).

#### Manage Git integrations: Add a self-hosted GitLab instance

1. Select GitLab Enterprise Edition or Community Edition in Northflank.

2. Create an OAuth application on your GitLab host at `/-/user_settings/applications`. Administrators can also use `/admin/applications`.

3. Give the application the `api` scope.

4. Enable its Confidential control.

5. Set its redirect URI to the exact value shown in Northflank.

6. Enter its Application ID and Secret in Northflank.

7. Select Submit.

8. Authorize Northflank with the GitLab account that can access your repositories.

See [GitLab's OAuth application guide](https://docs.gitlab.com/integration/oauth_provider/) for more details.

#### Manage Git integrations: Add Gitea or Forgejo

Gitea and Forgejo use the same connection flow. Northflank requests read and write access to repositories, including webhooks and commit statuses. The linked account needs repository owner or administrator access to manage webhooks.

Before authorizing access, review the permission behavior for [Gitea](https://docs.gitea.com/development/oauth2-provider/) or [Forgejo](https://forgejo.org/docs/latest/user/authentication/oauth2-provider/).

1. Select Gitea / Forgejo in Northflank.

2. Create an OAuth2 application at `/user/settings/applications` on your Git host.

3. If the provider offers a client-type choice, select a confidential client.

4. Set its redirect URI to the exact value shown in Northflank.

5. Enter its OAuth client ID and OAuth client secret in Northflank.

6. Select Submit.

7. Authorize Northflank with the Git account that can access your repositories.

#### Manage Git integrations: Add GitHub Enterprise Server

You need permission to create and install a GitHub App for the selected user or organization. App creation and repository installation are separate steps.

The app requests read and write permissions. Before approving installation, review the requested access on GitHub.

1. Select GitHub Enterprise in Northflank.

2. Choose User or Organisation under GitHub App location type.

3. For Organisation, enter the organization name under Application namespace.

4. Select Submit to start GitHub App creation.

5. Complete app creation on your GitHub server.

6. Return to the Git integrations page in Northflank.

7. On your self-hosted integration, select Link to start app installation on GitHub.

8. Choose the repositories that the app can access.

9. Complete the installation.

### Manage Git integrations: Self-hosted VCS settings

Open Integrations → Git providers in your team dashboard. Select the configuration button  on your self-hosted provider.

To change the Git host address, edit VCS provider URL. Select Update self-hosted settings to save it.

For a verified integration, Edit application lets you replace its credentials. Changing Application ID requires the matching Client secret. Leave secret fields blank to keep their current values.

GitHub Enterprise also provides Webhook secret and PEM file, the GitHub App's private key.

> [!warning]
>
> Before changing the application ID or client secret, plan to relink all accounts that use this integration. Saving those credentials unlinks the existing accounts.

1. Select Edit application.

2. Enter the changed credentials for your provider.

3. Select Update self-hosted settings.

4. If you changed the application ID or client secret, relink the affected Git accounts.

#### Manage Git integrations: Troubleshoot a self-hosted connection

| Symptom | Action |
| --- | --- |
| OAuth authorization fails | Make sure that the redirect URI and application credentials match the values in Northflank. |
| GitHub App setup remains pending | Select Create GitHub App to resume setup. After creating the app, link the account to install it. |
| A repository is missing | Make sure that the linked account or app installation has access. Then refresh Connected repositories. |
| Automatic builds do not start | Inspect webhook delivery, repository permissions, and your [build rules](build.md#build-code-from-a-git-repository-build-specific-branches-or-pull-requests). |

For GitLab, Gitea, and Forgejo, the linked account page offers Repository webhooks controls to regenerate webhook tokens. GitHub Enterprise uses its GitHub App configuration instead.

### Manage Git integrations: Restrict repository access

You can restrict which repositories team members can access when connecting Git accounts to Northflank.

For GitHub and GitHub Enterprise Server, choose repository access when installing the GitHub App on a user or organization account.

For GitLab, self-hosted GitLab, and Bitbucket, you can restrict access to specific namespaces from the linked account's configuration in Northflank.

For Gitea and Forgejo, repository access follows the linked Git account's permissions. Northflank does not offer a namespace restriction control for these providers.

For [Cursor Origin](getting-started.md#link-your-git-account-manage-cursor-origin-access), choose all repositories or selected repositories during installation. Use Update installation to change access for the same Cursor namespace.

### Manage Git integrations: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
