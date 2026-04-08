# Collaborate

Generated from 5 application pages listed in `llms.txt`.

## Pages

- [Collaborate on Northflank](#collaborate-on-northflank)
- [Create a team](#create-a-team)
- [Delete teams and accounts](#delete-teams-and-accounts)
- [Manage an organisation](#manage-an-organisation)
- [Manage Git integrations](#manage-git-integrations)

## Collaborate on Northflank

Source: https://northflank.com/docs/v1/application/collaborate/collaborate-on-northflank.md

Collaborative working is built into Northflank, at no extra cost. All of your resources are contained in teams which you can work in solo, or invite colleagues to join you.

### Collaborate on Northflank: Teams

Teams contain your Northflank projects, and include your integrated domains, Git accounts and image registries, and more.

You can work securely using role-based access control and API tokens to grant the correct access and permissions to colleagues and applications.

### Collaborate on Northflank: Organisations

Organisations allow you to manage multiple teams with centralised control over billing and reporting, user management, and security.

- [Create a team and invite members: Create a team and invite members to collaborate on projects.](collaborate.md#create-a-team)
- [Manage your organisation on Northflank: Manage users, security, billing, and multiple teams with a Northflank organisation.](collaborate.md#manage-an-organisation)
- [Manage Git integrations: Add accounts for Git services and restrict namespaces.](collaborate.md#manage-git-integrations)
- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
- [Manage template versions on Northflank: Use the template drafts system to review, accept, or reject proposed changes to your team's Northflank templates.](infrastructure-as-code.md#manage-template-versions)
- [Audit logs: Monitor and review events affecting your organisation, teams, projects, and resources.](observe.md#audit-logs)

## Create a team

Source: https://northflank.com/docs/v1/application/collaborate/create-a-team.md

Your team contains your account settings, integrations, and projects.

![A team dashboard in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/create-a-team/team-dashboard.png)

To create a new team select team from the create new menu, or create team from your account dashboard. Enter a team name, select a billing plan, and enter a contact email. You can also invite people to the new team via email.

> [!note] Organisations
> You can also create and manage teams with  [an organisation](https://northflank.com/docs/collaborate/manage-an-organisation). This allows you to manage users and access across teams, and integrate your user directory and other enterprise features.

Your team name must be unique and will be used to refer to resources in your team projects, and used to generate Northflank DNS entries for your deployment's [public ports](network.md#configure-ports-public-ports). Your team email address will receive important notifications and billing information.

After verifying your team email you can link a Git account, configure integrations and settings, and create a new project.

Any resources consumed by your team will be billed to the team, and only the payment method linked to the team account will be charged.

> [!note]
> [Click here](https://app.northflank.com/s/account/teams/new) to create a new team.

![Creating a team in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/create-a-team/create-team.png)

### Create a team: Invite members to your team

You can invite members to your team from the members page under your team's account settings.

You can invite one or more users to join your team by their email address. If they do not already have a Northflank account they will be prompted to create one, but they do not need to add payment information to use the team account.

You can set roles for invited users, and modify them on the members page afterwards. If a user has not yet accepted their invitation to join the team they will appear in the invited members section.

### Create a team: Manage team security

#### Create a team: Role-based access control

You can limit the access team members have to resources and actions by configuring and assigning [RBAC roles](secure.md#use-role-based-access-control). Roles can be created on the RBAC roles page, and assigned when editing the role, or from the team members page.

#### Create a team: API access

To allow team members to create API tokens to access team resources, you must first create an [API token role](secure.md#grant-api-access). Team members can then create API tokens for their accounts using these roles, and you can specify which team members have access to an API role.

#### Create a team: Multifactor Authentication

You can enable require MFA to enforce multifactor authentication for your team members. Team members will be prompted to [set up an authenticator application for their Northflank account](secure.md#enable-single-sign-on-and-multi-factor-authentication-multi-factor-authentication) before they can access Northflank, and they will need to enter their one-time passcode on every log in attempt.

You can also set a maximum login session duration in hours, which will automatically log team members out and require them to re-authenticate after the time period.

### Create a team: Transfer ownership of a team

The team owner has full permissions in a team and cannot be removed by other members, even if they have [permissions to manage team members](secure.md#use-role-based-access-control). The owner also cannot leave the team without transferring ownership to another member.

To change ownership of a team the current owner must navigate to the members page and transfer  ownership to another member.

### Create a team: Next steps

- [Link your Git account: Integrate your Git accounts with Northflank to start building and deploying your code.](getting-started.md#link-your-git-account)
- [Create a project: Create a project to contain your services, persistent data, secrets, and more.](getting-started.md#create-a-project)
- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)
- [Manage your organisation on Northflank: Manage users, security, billing, and multiple teams with a Northflank organisation.](collaborate.md#manage-an-organisation)

## Delete teams and accounts

Source: https://northflank.com/docs/v1/application/collaborate/delete-teams-and-accounts.md

You can permanently delete teams, organizations, and user accounts from their settings pages. Deletion is irreversible and removes all associated data.

To delete a team, organization, or user account, you must be the **owner**. Other team members or organization members cannot delete these entities.

### Delete teams and accounts: Delete a team

To delete a team:

1. Navigate to [Team Settings](https://app.northflank.com/s/team/settings)

2. Scroll to the **Danger zone** section

3. Click **Delete team**

4. Confirm the deletion

5. Click **Confirm deletion**

All projects, services, databases, and resources within the team will be permanently deleted.

### Delete teams and accounts: Delete an organization

To delete an organization:

1. Navigate to [Organization Settings](https://app.northflank.com/s/teamOrOrg/settings)

2. Scroll to the **Danger zone** section

3. Click **Delete organization**

4. Confirm the deletion

5. Click **Confirm deletion**

All teams, billing information, and organization data will be permanently deleted.

### Delete teams and accounts: Delete your user account

To delete your user account:

1. Navigate to [Account Settings](https://app.northflank.com/s/account/settings/profile)

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

- Team or organization settings

- Custom domains and configurations

**Active resources**

Ensure all running services, databases, and workloads are stopped before deletion. Active resources may continue to incur charges until fully terminated.

**Team and organization ownership**

If you're the only owner:

- Transfer ownership to another member before deletion, or

- Delete the team/organization entirely

If there are other owners, they can continue managing the team/organization after you leave.

### Delete teams and accounts: Before deleting

**Backup your data:**

- Export any important data from databases

- Save configuration files and templates

- Download logs and metrics if needed

**Review invoices or usage:**

- Any pending invoice will have to be paid

- Any remaining usage will be billed on account deletion

Ensure there are no remaining questions regarding billing before proceeding.

**Notify team members:**

- Inform team members if you're deleting a shared team or organization

- Give them time to backup data they need

### Delete teams and accounts: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)

## Manage an organisation

Source: https://northflank.com/docs/v1/application/collaborate/manage-an-organisation.md

Organisations on Northflank allow you to manage multiple teams. You can provision and manage users by syncing your user directory, add your own single sign-on (SSO) identity provider, and configure security for your organisation.

![Viewing an organisation's dashboard in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/manage-an-organisation/org-dashboard.png)

> [!note]
> [Click here](https://cal.com/team/northflank/northflank-enterprise) to schedule a call about on-boarding your organisation to Northflank.

### Manage an organisation: Create an organisation

You can create an organisation in the Northflank application from your user dashboard's organisations page.

You can also [schedule a call](https://cal.com/team/northflank/northflank-enterprise) to discuss on-boarding your organisation to Northflank, and selecting the right plan for your needs.

![Creating an organisation in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/manage-an-organisation/create-organisation.png)

### Manage an organisation: Manage organisation security

#### Manage an organisation: Restrict teams and members

In your organisation settings you can:

- prevent members of your organisation from joining teams on Northflank that do not belong to your organisation

- prevent users that are not members of your organisation from being added to organisation teams

- restrict organisation invites to email addresses at your linked domains (if you have [configured single sign-on](collaborate.md#manage-an-organisation-configure-single-sign-on))

![Editing an organisation's settings in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/manage-an-organisation/org-settings.png)

#### Manage an organisation: Multifactor Authentication

You can enable require MFA from your organisation's security page to enforce multifactor authentication for your organisation members. Organisation members will be prompted to [set up an authenticator application for their Northflank account](secure.md#enable-single-sign-on-and-multi-factor-authentication-multi-factor-authentication) before they can access Northflank, and they will need to enter their one-time passcode on every log in attempt.

You can also set a maximum login session duration in hours, which will automatically log organisation members out and require them to re-authenticate after the time period.

#### Manage an organisation: Clear member login sessions

You can clear member login sessions from your organisation's security page to immediately log out all user accounts from your organisation.

### Manage an organisation: Create organisation roles

You can [manage user roles on an organisational level](secure.md#use-role-based-access-control-create-organisation-roles) to ensure compliance with your security policies, restrict users to specific teams, and grant organisational permissions.

![Creating an organisational role in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/manage-an-organisation/org-role.png)

### Manage an organisation: Manage organisation billing

You can add your payment method and tax ID for an organisation to [manage billing for all teams](billing.md#pricing-on-northflank) in the organisation.

As well monitoring spend by project and resource type, you can also monitor spend by team.

Invoices for each team's usage can be downloaded from the team billing page.

![Viewing an organisation's billing page in the Northflank application](https://assets.northflank.com/documentation/v1/application/collaborate/manage-an-organisation/org-billing.png)

### Manage an organisation: Configure single sign-on (SSO)

You can link your existing authentication with Northflank to allow your users to sign in using SSO.

Northflank uses [WorkOS SSO](https://workos.com/single-sign-on) to integrate Northflank with your identity provider using SAML and OpenID Connect (OIDC).

To enable single sign-on, follow these steps:

- While viewing an organisation, navigate to Settings.

- Under Single Sign On, enter one or more domain names associated with your organisation, e.g. `example.com`. You should input all the domain names that are associated with the email addresses of organisation members.

- Optionally, you can Allow port security SSO with external domains. This does not affect organisation members signing into Northflank, but can allow users with external domains in your identity provider to access services, if enabled for that service.

- Then, you can Set-up SSO. This will redirect you to the single sign-on setup, provided via WorkOS. Follow the instructions on the pages provided. At the end of the setup, you will be prompted to test the connection. When this test succeeds, your identity provider will be linked to Northflank.

Users from your identity provider can now sign up and log in to Northflank. To avoid logging in via a non-SSO account, users should log in via the Log in with Organisation Single Sign On option on the login page, or navigate to [[https://app.northflank.com/sso-login](https://app.northflank.com/sso-login)](https://app.northflank.com/sso-login).

Some identity providers also support directly logging in via your organisation’s external dashboard.

By default, accounts are created via JIT (Just In Time) provisioning - accounts are not created automatically and will instead be created when a user signs in for the first time.

When a user logs in to Northflank for the first time via SSO, they will automatically be a member of the organisation. Additionally, these users cannot create teams or resources that do not belong to the organisation, and cannot leave the organisation without deactivating the account.

To reconfigure the settings provided during setup, click the Configure SSO button. To disable Single Sign-On, click Disable SSO.

#### Manage an organisation: Converting an existing account

A team member with an account that was not created through SSO must continue to log in via username and password. However, an organisation admin can convert their existing account to a SSO account. On the Members page, select the user you wish to convert to SSO. In the top right, click the Convert to SSO button. The user can then log in to Northflank via SSO, and their account will no longer be able to be accessed via username and password.

> [!warning]
> Converting an account to SSO is a destructive action and cannot be reversed. If a user is a member of any teams
outside of their organisation, they will not be able to be converted to an SSO account - they should leave or delete
any teams they are a part of that do not belong to the organisation.

#### Manage an organisation: Configuring SSO Settings

After linking your identity provider you can also select how users can be invited to teams in your organisation:

- Select SSO only to disable manual invites. This will prevent users in the organisation from inviting users by email address. Users will only be able to sign up via your SSO.

- Enable require approval for any SSO sign-ups. When a user creates an account using SSO they will be added to a queue until their request is confirmed or rejected. This conflicts with automatically [provisioning users with directory sync](collaborate.md#manage-an-organisation-sync-your-directory), and cannot/should not be enabled at the same time.

> [!note] Unlock SSO and directory sync
> Contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) or [schedule a meeting](https://cal.com/team/northflank/northflank-enterprise) to enable single sign-on and directory sync for your organisation.

### Manage an organisation: Sync your directory

You can sync your user directory with Northflank to update users on Northflank based on their directory groups.

You can enable Automatically provision organisation members to automatically provision organisation users on Northflank. You can restrict automatic provisioning to selected directory groups, so only users for teams using Northflank are automatically created.

Roles can be synced with directory groups to enable you to assign and remove roles from users by updating their directory groups.

Northflank uses [WorkOS Directory Sync](https://workos.com/directory-sync) to integrate Northflank with your directory. You must have enabled [single sign-on](collaborate.md#manage-an-organisation-configure-single-sign-on) to use directory sync.

### Manage an organisation: Next steps

- [Link your Git account: Integrate your Git accounts with Northflank to start building and deploying your code.](getting-started.md#link-your-git-account)
- [Create a project: Create a project to contain your services, persistent data, secrets, and more.](getting-started.md#create-a-project)
- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [Configure role-based access control: Grant granular permissions and manage users with roles for teams and organisations.](secure.md#use-role-based-access-control)
- [Grant API access: Create API roles to grant access to the Northflank API, with granular permissions.](secure.md#grant-api-access)

## Manage Git integrations

Source: https://northflank.com/docs/v1/application/collaborate/manage-git-integrations.md

Teams can link multiple accounts per Git service and self-hosted VCS.

> [!note]
> [Click here](https://app.northflank.com/s/account/integrations/vcs) to view your Git namespaces.

![The Git integrations page on a team account in the Northflank application, showing a self-hosted VCS](https://assets.northflank.com/documentation/v1/application/collaborate/manage-git-integrations/team-git-page.png)

### Manage Git integrations: Add a Git account

To add a Git account to your team account, navigate to the Git section under integrations in the team dashboard and click  link on the relevant service. For GitHub you will be asked which account to link, for all other services the currently-logged-in account will be added.
Team users must have the manage Git permission on one of their assigned roles to add or remove accounts.

### Manage Git integrations: Add a self-hosted VCS

To add a self-hosted VCS navigate to the Git section, underneath integrations on the team settings page, click 'add a self-hosted VCS' and select the type of VCS you would like to integrate. Follow the application specific instructions to integrate your self-hosted VCS. You can choose how team members can access the repositories on the self-hosted VCS after adding it to Northflank.

#### Manage Git integrations: Add a self-hosted GitLab instance

Navigate to your GitLab service and create a new OAuth application at `[YOUR URL]/profile/applications` or `[YOUR URL]/admin/applications` if you are an administrator. Give the application the `api` scope and set the `Redirect URI` as specified on Northflank.

On Northflank enter the root domain of your self-hosted GitLab, e.g. `gitlab.yourdomain.com`, the `application ID` and the `secret` from the OAuth application.

### Manage Git integrations: Self-hosted VCS settings

Settings for a self-hosted VCS can be configured by navigating to the team account's Git integrations page and clicking the options button  on the card for the self-hosted VCS.

##### Manage Git integrations: Personal & team use

Select personal use to allow team members to use the self-hosted VCS to build and run from the repositories on this service in their user account's projects as well as in team projects. Team members will need to link their account on the VCS service to Northflank in their own user account settings.

Select team use only to only allow team members to build and run from the repositories on this service in team projects.

##### Manage Git integrations: Application configuration

You can update the `VCS provider URL`, `application ID` and `secret` from the OAuth application.

### Manage Git integrations: Restrict namespaces

On team accounts you may need to restrict access to certain namespaces on your linked Git accounts.

GitHub account restrictions are managed on GitHub by selecting which account/organisation to install the Northflank GitHub app on, and then granting access to specific repositories on that account.

Your linked GitLab and Bitbucket accounts can be restricted to certain namespaces by opening the settings on the respective entry. Select restricted and pick the contexts you want your team members to access. Remove a namespace from the list to revoke access. The namespaces available to your team will be displayed on the git integrations page in the section for the relevant service.
Remove a namespace from the list in the selected account to revoke access.

New namespaces can be created in your Gitlab and Bitbucket accounts by creating new projects.

#### Manage Git integrations: Restrict self-hosted VCS access

You can restrict access to the repositories in your self-hosted VCS by selecting specific owners within the self-hosted VCS's settings. Team members will be able to build and run from repositories belonging to the selected namespaces, if your account has access to them.

Unrestricted access means team members will be able to create services and jobs from every repository that the linked account can access.

### Manage Git integrations: Next steps

- [Build from a Git repository: Start building from your linked Git repositories in minutes.](build.md#build-code-from-a-git-repository)
- [Run an image continuously: Deploy a built image as a continuously-running service.](run.md#run-an-image-continuously)
