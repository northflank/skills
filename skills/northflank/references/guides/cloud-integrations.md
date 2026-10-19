# Cloud Integrations

Generated from 4 application pages listed in `llms.txt`.

## Pages

- [Connect an AWS provider link](#connect-an-aws-provider-link)
- [Connect an Azure provider link](#connect-an-azure-provider-link)
- [Connect a Google Cloud provider link](#connect-a-google-cloud-provider-link)
- [Provider links](#provider-links)

## Connect an AWS provider link

Source: https://northflank.com/docs/v1/application/cloud-integrations/connect-aws.md

Connect an AWS account to Northflank through a provider link. Choose the features for your task before granting AWS permissions. Available features depend on the provider and your account.

Use the authentication instructions on this page for registry access, OpenTofu, workload identity, or cluster deployment. Connecting the account does not create a cluster. Cluster quotas apply only when you deploy clusters.

For an application that uses AWS resources, read [Connect an app to AWS](use-cases.md#connect-an-app-to-aws). For cluster deployment, use [Amazon Web Services on Northflank](bring-your-own-cloud.md#amazon-web-services-on-northflank).

Review [provider-link features](cloud-integrations.md#provider-links) before selecting an authentication method.

### Connect an AWS provider link: Generate and view required permissions

Select the features that your AWS integration needs. Northflank shows the corresponding permissions as a table and a policy that you can copy.

For ECR access, select Docker Registries. To push project builds, also select Docker Registry Push. The generated push policy includes permission to create ECR repositories.

For cluster deployment, select BYOC and any required features, such as BYOC - Custom VPC or BYOC - Static Egress. Registry-only integrations do not require these cluster features.

For a team, open Integrations → Cloud providers. For an organization, open Cloud → Provider links. Select your AWS integration and open its Edit tab.

New BYOC integrations use the latest AWS permissions policy. Existing integrations can retain an older policy. If you see AWS permission update recommended:

1. Apply the displayed Standard AWS policy to the IAM role or user for this integration.

2. Select Verify all permissions under Credentials.

3. Click Update to save the integration.

If you add features, apply the updated policy shown in Northflank before saving the integration. You can use Verify all permissions under Credentials to check an existing integration at any time.

The following policy is a cluster example with custom VPC and static egress permissions. Use the policy shown in Northflank for your current feature selection.

AWS policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Northflank",
      "Effect": "Allow",
      "Action": [
        "ec2:AllocateAddress",
        "ec2:AssociateRouteTable",
        "ec2:CreateLaunchTemplate",
        "ec2:CreateLaunchTemplateVersion",
        "ec2:CreateNatGateway",
        "ec2:CreateRoute",
        "ec2:CreateRouteTable",
        "ec2:CreateSubnet",
        "ec2:CreateTags",
        "ec2:DeleteLaunchTemplate",
        "ec2:DeleteLaunchTemplateVersions",
        "ec2:DeleteNatGateway",
        "ec2:DeleteRoute",
        "ec2:DeleteRouteTable",
        "ec2:DeleteSubnet",
        "ec2:DeleteTags",
        "ec2:DescribeAddresses",
        "ec2:DescribeLaunchTemplates",
        "ec2:DescribeLaunchTemplateVersions",
        "ec2:DescribeNatGateways",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
        "ec2:DisassociateRouteTable",
        "ec2:ModifyLaunchTemplate",
        "ec2:ReleaseAddress",
        "ec2:RunInstances",
        "eks:AssociateAccessPolicy",
        "eks:CreateAccessEntry",
        "eks:CreateAddon",
        "eks:CreateCluster",
        "eks:CreateNodegroup",
        "eks:DeleteAccessEntry",
        "eks:DeleteAddon",
        "eks:DeleteCluster",
        "eks:DeleteNodegroup",
        "eks:DescribeAccessEntry",
        "eks:DescribeAddon",
        "eks:DescribeCluster",
        "eks:DescribeNodegroup",
        "eks:DescribeUpdate",
        "eks:DisassociateAccessPolicy",
        "eks:ListAccessEntries",
        "eks:ListAccessPolicies",
        "eks:ListAddons",
        "eks:ListAssociatedAccessPolicies",
        "eks:ListClusters",
        "eks:ListIdentityProviderConfigs",
        "eks:ListInsights",
        "eks:ListNodegroups",
        "eks:ListTagsForResource",
        "eks:ListUpdates",
        "eks:TagResource",
        "eks:UntagResource",
        "eks:UpdateAccessEntry",
        "eks:UpdateAddon",
        "eks:UpdateClusterConfig",
        "eks:UpdateClusterVersion",
        "eks:UpdateNodegroupConfig",
        "eks:UpdateNodegroupVersion",
        "iam:AttachRolePolicy",
        "iam:CreateOpenIDConnectProvider",
        "iam:CreateRole",
        "iam:CreateServiceLinkedRole",
        "iam:DeleteOpenIDConnectProvider",
        "iam:DeleteRole",
        "iam:DeleteRolePolicy",
        "iam:DetachRolePolicy",
        "iam:GetOpenIDConnectProvider",
        "iam:GetRole",
        "iam:ListAttachedRolePolicies",
        "iam:PassRole",
        "iam:PutRolePolicy",
        "iam:SimulatePrincipalPolicy",
        "iam:TagOpenIDConnectProvider",
        "iam:TagRole"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

### Connect an AWS provider link: Add your account with a cross-account role

A cross-account role grants Northflank access to your AWS account through temporary credentials. Use this method when it is available for your selected features.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Permission to create [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html) and assign their policies in your AWS account
> - For cluster deployment: sufficient [quotas](bring-your-own-cloud.md#amazon-web-services-on-northflank-check-your-quotas) to deploy your cluster

For registry access, select Docker Registries and, for project builds, Docker Registry Push. You do not need to select BYOC unless this integration also manages clusters.

1. Open Integrations → Cloud providers. In an organization, use Cloud → Provider links.

2. Open the [AWS provider link form](https://app.northflank.com/s/account/cloud/integrations/new/aws).

3. Under Basic information, enter a Name. Select the features you need under Desired features.

4. In Credentials, select Cross-account role.

5. Select Copy Custom trust policy.

6. Open Roles in the [AWS IAM console](https://console.aws.amazon.com/iam/home).

7. Select Create role → Custom trust policy.

8. Paste the copied policy.

9. Name and save the role.

10. In Northflank, select Copy AWS inline policy under Required permissions.

11. Open the new role's Permissions tab in AWS.

12. Select Add permissions → Create inline policy.

13. Paste the copied policy into the JSON editor. Save the policy with a name.

14. In Northflank, enter the IAM role ARN under Credentials.

15. Select Create provider link.

You can now use the integration for its selected features. To deploy a cluster, continue to [create a cluster](bring-your-own-cloud.md#amazon-web-services-on-northflank-create-a-cluster).

You can update the integration's shared secret and role ARN.

> [!warning] Keep access to existing resources
>
> Keep access to existing resources when you change the role. Without that access, Northflank cannot manage those resources, and deleting clusters directly in AWS can leave unused resources.

### Connect an AWS provider link: Add your account with an IAM user

You can integrate AWS with an IAM user's access key and secret key. Prefer a [cross-account role](cloud-integrations.md#connect-an-aws-provider-link-add-your-account-with-a-cross-account-role) when it supports your selected features, because it uses temporary credentials.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Permission to create [IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html), manage their access keys, and assign policies in your AWS account
> - For cluster deployment: sufficient [quotas](bring-your-own-cloud.md#amazon-web-services-on-northflank-check-your-quotas) to deploy your cluster

For registry access, select Docker Registries and, for project builds, Docker Registry Push. You do not need to select BYOC unless this integration also manages clusters.

1. Open Integrations → Cloud providers. In an organization, use Cloud → Provider links.

2. Open the [AWS provider link form](https://app.northflank.com/s/account/cloud/integrations/new/aws).

3. Under Basic information, enter a Name. Select the features you need under Desired features.

4. In Credentials, select Access key.

5. Select Copy AWS inline policy under Required permissions.

6. Open Users in the [AWS IAM console](https://console.aws.amazon.com/iam/home).

7. Create and save a user without console access.

8. Open the user's Permissions tab.

9. Select Add permissions → Create inline policy.

10. Paste the copied policy into the JSON editor. Save the policy with a name.

11. Under Security credentials, select Create access key.

12. Select the Third-party service use case and continue.

13. Enter a description for the access key. Select Create access key.

14. In Northflank, enter the Access key and Secret key under Credentials.

15. Select Create provider link.

You can update the integration's credentials when required.

> [!warning] Keep access to existing resources
>
> Keep access to existing resources when you replace credentials. Without that access, Northflank cannot manage those resources, and deleting clusters directly in AWS can leave unused resources.

## Connect an Azure provider link

Source: https://northflank.com/docs/v1/application/cloud-integrations/connect-azure.md

Connect an Azure account to Northflank through a provider link. Choose the supported features for your task before granting Azure permissions.

Connecting the account does not create a cluster. For registry access, select the relevant registry features. Cluster permissions and quotas apply when you also deploy clusters.

Review [provider-link features](cloud-integrations.md#provider-links) for availability. For cluster deployment, use [Microsoft Azure on Northflank](bring-your-own-cloud.md#microsoft-azure-on-northflank).

### Connect an Azure provider link: Add your Azure account

Create a Microsoft Entra ID application to connect your Azure subscription to Northflank.

> [!note] Requirements
>
> You will need the following to get started:
>
> - Permission to register applications and create client secrets in Microsoft Entra ID
> - Permission to assign roles on the subscription, such as Owner or User Access Administrator
> - For cluster deployment: sufficient [quotas](bring-your-own-cloud.md#microsoft-azure-on-northflank-check-your-quotas) to deploy your cluster

If your tenant restricts application registration, Application Administrator or Cloud Application Administrator can provide the required application permissions.

#### Connect an Azure provider link: Start the integration in Northflank

1. Open Integrations → Cloud providers. In an organization, use Cloud → Provider links.

2. Open the [Azure provider link form](https://app.northflank.com/s/account/cloud/integrations/new/azure).

3. Under Basic information, enter a Name.

4. Select the features you need under Desired features.

For registry access, select Docker Registries and, for project builds, Docker Registry Push. Select BYOC only if this integration also manages clusters.

#### Connect an Azure provider link: Register an application in Entra ID

Copy each requested value into Credentials in Northflank as you complete these steps.

1. Open Microsoft Entra ID in the [Azure portal](https://portal.azure.com/).

2. Open App registrations and [register a new application](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

3. Copy the directory (tenant) ID and application (client) ID into Northflank.

4. Open the link for Managed application in local directory.

5. Copy the object ID from that application's properties into Northflank.

6. Return to the application registration and open Certificates & secrets.

7. Create a client secret and copy its value into Northflank.

Use the secret value, rather than its ID.

#### Connect an Azure provider link: Grant the application access to your subscription

The Northflank Azure integration requires the Contributor role on the connected subscription, including for registry use. Registry pull and push roles alone do not replace this integration requirement.

1. Open Subscriptions in Azure and select the subscription to connect.

2. Open Access control (IAM) and add a role assignment.

3. Select the [Contributor role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged#contributor).

4. Under Members, select User, group, or service principal.

5. Select your application's service principal and save the assignment.

6. For cluster deployment, open Resource providers and register `Microsoft.ContainerService`.

7. Copy the subscription ID into Subscription ID under Credentials in Northflank.

8. Select Create provider link.

For registry use, connect an existing Azure Container Registry in this subscription. The registry uses the `Microsoft.ContainerRegistry` resource provider. See [Azure resource provider registration](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-providers-and-types) if Azure reports a registration error.

For cluster deployment, continue to [quotas](bring-your-own-cloud.md#microsoft-azure-on-northflank-check-your-quotas) and [cluster creation](bring-your-own-cloud.md#microsoft-azure-on-northflank-create-a-cluster).

You can update the integration's credentials when required.

> [!warning] Keep access to existing resources
>
> Keep access to existing resources when you replace credentials. Without that access, Northflank cannot manage those resources, and deleting clusters directly in Azure can leave unused resources.

## Connect a Google Cloud provider link

Source: https://northflank.com/docs/v1/application/cloud-integrations/connect-google-cloud.md

Connect a Google Cloud account to Northflank through a provider link. Choose the features for your task before granting project permissions. Available features depend on the provider and your account.

Connecting the account does not create a cluster. Cluster quotas apply only when you deploy clusters. Review [provider-link features](cloud-integrations.md#provider-links) before selecting an authentication method.

For workload access to Google Cloud resources, read [Configure workload identity](bring-your-own-cloud.md#configure-workload-identity). For cluster deployment, use [Google Cloud on Northflank](bring-your-own-cloud.md#google-cloud-platform-on-northflank).

### Connect a Google Cloud provider link: Select or create your GCP project

You can use Northflank with an existing Google Cloud Platform project, or create a new one.

#### Connect a Google Cloud provider link: New GCP project setup

1. Open your [GCP console](https://console.cloud.google.com/) and create a new project, or select an existing one.

2. Make sure that [billing is enabled](https://cloud.google.com/billing/docs/how-to/modify-project).

3. Enable the [Cloud Resource Manager API](https://console.cloud.google.com/marketplace/product/google/cloudresourcemanager.googleapis.com).

4. If you deploy a cluster with Northflank, enable the [Kubernetes Engine API](https://console.cloud.google.com/marketplace/product/google/container.googleapis.com).

Registry access and workload identity do not require the Kubernetes Engine API.

### Connect a Google Cloud provider link: Required permissions

Select the integration features you need before assigning Google Cloud roles. Northflank shows the required roles and permissions for that selection.

For Docker Registries, grant Artifact Registry Reader (`roles/artifactregistry.reader`). For Docker Registry Push, also grant Artifact Registry Writer (`roles/artifactregistry.writer`). See Google's [Artifact Registry access guidance](https://cloud.google.com/artifact-registry/docs/access-control) for role details.

For BYOC cluster deployment, grant Service Account User (`roles/iam.serviceAccountUser`) and Kubernetes Engine Admin (`roles/container.admin`), or roles with equivalent permissions. Additional features, such as a custom VPC, require the permissions shown in Northflank. Registry-only integrations do not need these Kubernetes roles.

The list below covers the base cluster permissions. Use the current list in Northflank for your selected features.

Required GCP permissions

- `iam.serviceAccounts.actAs`
- `iam.serviceAccounts.get`
- `container.clusterRoleBindings.create`
- `container.clusterRoleBindings.delete`
- `container.clusterRoleBindings.get`
- `container.clusterRoleBindings.list`
- `container.clusterRoleBindings.update`
- `container.clusterRoles.bind`
- `container.clusterRoles.create`
- `container.clusterRoles.escalate`
- `container.clusterRoles.get`
- `container.clusterRoles.list`
- `container.clusterRoles.update`
- `container.clusters.create`
- `container.clusters.delete`
- `container.clusters.get`
- `container.clusters.getCredentials`
- `container.clusters.list`
- `container.clusters.update`
- `container.configMaps.create`
- `container.configMaps.get`
- `container.configMaps.list`
- `container.configMaps.update`
- `container.customResourceDefinitions.create`
- `container.customResourceDefinitions.get`
- `container.customResourceDefinitions.update`
- `container.daemonSets.create`
- `container.daemonSets.delete`
- `container.daemonSets.get`
- `container.daemonSets.list`
- `container.daemonSets.update`
- `container.deployments.create`
- `container.deployments.get`
- `container.deployments.list`
- `container.deployments.update`
- `container.horizontalPodAutoscalers.create`
- `container.horizontalPodAutoscalers.list`
- `container.horizontalPodAutoscalers.update`
- `container.mutatingWebhookConfigurations.create`
- `container.mutatingWebhookConfigurations.list`
- `container.mutatingWebhookConfigurations.update`
- `container.namespaces.create`
- `container.namespaces.get`
- `container.namespaces.update`
- `container.networkPolicies.create`
- `container.networkPolicies.get`
- `container.networkPolicies.update`
- `container.nodes.list`
- `container.operations.list`
- `container.persistentVolumeClaims.list`
- `container.podDisruptionBudgets.create`
- `container.podDisruptionBudgets.list`
- `container.podDisruptionBudgets.update`
- `container.pods.list`
- `container.pods.proxy`
- `container.podSecurityPolicies.create`
- `container.podSecurityPolicies.get`
- `container.podSecurityPolicies.update`
- `container.replicaSets.list`
- `container.resourceQuotas.create`
- `container.resourceQuotas.get`
- `container.resourceQuotas.update`
- `container.roleBindings.create`
- `container.roleBindings.get`
- `container.roleBindings.list`
- `container.roleBindings.update`
- `container.roles.bind`
- `container.roles.create`
- `container.roles.escalate`
- `container.roles.get`
- `container.roles.list`
- `container.roles.update`
- `container.runtimeClasses.list`
- `container.secrets.create`
- `container.secrets.get`
- `container.secrets.list`
- `container.secrets.update`
- `container.serviceAccounts.create`
- `container.serviceAccounts.delete`
- `container.serviceAccounts.get`
- `container.serviceAccounts.list`
- `container.serviceAccounts.update`
- `container.services.create`
- `container.services.get`
- `container.services.list`
- `container.services.update`
- `container.statefulSets.create`
- `container.statefulSets.get`
- `container.storageClasses.create`
- `container.storageClasses.get`
- `container.storageClasses.update`
- `container.thirdPartyObjects.create`
- `container.thirdPartyObjects.get`
- `container.thirdPartyObjects.list`
- `container.thirdPartyObjects.update`
- `container.validatingWebhookConfigurations.create`
- `container.validatingWebhookConfigurations.get`
- `container.validatingWebhookConfigurations.list`
- `container.validatingWebhookConfigurations.update`
- `container.volumeSnapshotClasses.create`
- `container.volumeSnapshotClasses.get`
- `container.volumeSnapshotClasses.update`

### Connect a Google Cloud provider link: Add your account with a cross-project service account

A cross-project service account lets Northflank access your Google Cloud project without a service account key that you manage. Northflank creates a service account, and you grant that account access to your project.

> [!note] Requirements
>
> You will need the following to get started:
>
> - A [Google Cloud project](cloud-integrations.md#connect-a-google-cloud-provider-link-select-or-create-your-gcp-project)
> - Permission to grant the [required roles](cloud-integrations.md#connect-a-google-cloud-provider-link-required-permissions) in that project
> - For cluster deployment: sufficient [quotas](bring-your-own-cloud.md#google-cloud-platform-on-northflank-check-your-quotas) to deploy your cluster

For Artifact Registry access, select Docker Registries and, for project builds, Docker Registry Push. Select BYOC only if this integration also manages clusters.

1. Open Integrations → Cloud providers. In an organization, use Cloud → Provider links.

2. Open the [GCP provider link form](https://app.northflank.com/s/account/cloud/integrations/new/gcp).

3. Under Basic information, enter a Name. Select the features you need under Desired features.

4. In Credentials, select Cross-project service account.

5. Enter your Google project ID.

6. Select Create provider link.

7. On the new provider link's Edit tab, copy the Service account email from Credentials.

8. Open the [IAM page](https://console.cloud.google.com/iam-admin/iam) in your Google Cloud project.

9. Select Grant access. Enter the copied email as the principal.

10. Assign the roles shown for your selected features in Northflank.

11. Save the assignment in Google Cloud.

12. In Northflank, select Verify all permissions under Credentials.

> [!note] After changing permissions
>
> Google Cloud can take time to apply new permissions. An operation can fail before those changes apply.

Wait for the updated permissions before you retry an operation.

After access is available, use the integration for your registry or [create a cluster](bring-your-own-cloud.md#google-cloud-platform-on-northflank-create-a-cluster).

### Connect a Google Cloud provider link: Add your account with a service key

You can integrate Google Cloud with a service account key. Use a [cross-project service account](cloud-integrations.md#connect-a-google-cloud-provider-link-add-your-account-with-a-cross-project-service-account) when it supports your selected features to avoid managing a long-lived key.

> [!note] Requirements
>
> You will need the following to get started:
>
> - A [Google Cloud project](cloud-integrations.md#connect-a-google-cloud-provider-link-select-or-create-your-gcp-project)
> - Permission to create service accounts and service account keys
> - Permission to grant the [required roles](cloud-integrations.md#connect-a-google-cloud-provider-link-required-permissions) in that project
> - For cluster deployment: sufficient [quotas](bring-your-own-cloud.md#google-cloud-platform-on-northflank-check-your-quotas) to deploy your cluster

For Artifact Registry access, select Docker Registries and, for project builds, Docker Registry Push. Select BYOC only if this integration also manages clusters.

1. Open Integrations → Cloud providers. In an organization, use Cloud → Provider links.

2. Open the [GCP provider link form](https://app.northflank.com/s/account/cloud/integrations/new/gcp).

3. Under Basic information, enter a Name. Select the features you need under Desired features.

4. In Credentials, select Service account key. Review the required roles.

5. Open IAM & Admin → Service Accounts in your Google Cloud project.

6. Create a service account with a name and description.

7. Assign the roles required for your selected features.

8. Open the service account's Keys tab. Create a JSON key.

9. Copy the downloaded JSON into Service account key (keyfile.json) in Northflank.

10. Make sure that Google project ID matches your project.

11. Select Create provider link.

> [!note] After changing permissions
>
> Google Cloud can take time to apply new permissions. An operation can fail before those changes apply.

Wait for the updated permissions before you retry an operation.

You can update the key and Google project ID in the integration.

> [!warning] Keep access to existing resources
>
> Keep access to existing resources when you change these values. If you change the project while it still contains Northflank clusters, Northflank cannot manage those clusters. Deleting clusters directly in Google Cloud can leave unused resources.

## Provider links

Source: https://northflank.com/docs/v1/application/cloud-integrations/provider-links.md

A provider link connects a cloud account to Northflank. Choose the features that you need, then grant the required permissions.

Provider links support tasks such as pulling images, creating external resources, and granting workloads access to cloud resources. These tasks do not require BYOC. To host workloads in your cloud, follow the [cluster guides](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

### Provider links: Connect your cloud account

Open Integrations → Cloud providers to connect an account. In an organization, use Cloud → Provider links. If you already have provider links, select Create provider link. Otherwise, select Add provider link beside your provider.

Under Basic information, enter a Name. Select your Provider and Desired features before you grant cloud permissions. Selecting a feature does not grant permissions or create cloud resources.

#### Provider links: Select integration features

Available features depend on the provider and your account. If a required feature is missing, contact Northflank support about availability.

| Purpose | Feature and next step |
| --- | --- |
| Deploy clusters | Select BYOC, then follow [your provider's cluster guide](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank). |
| Pull private images | Select Docker Registries, then [save registry credentials](run.md#save-registry-credentials-cloud-provider-registries). |
| Store project builds in your registry | Also select Docker Registry Push, then [configure a new project](build.md#use-custom-build-registry). |
| Provision external resources | Select OpenTofu, then [configure external infrastructure](infrastructure-as-code.md#manage-external-infrastructure). This also supports [managed external resources](databases-and-persistence.md#create-a-managed-external-addon) on AWS. |
| Grant workloads access to cloud resources | Select the relevant Workload Identity features, then [configure workload identity](bring-your-own-cloud.md#configure-workload-identity) for AWS or GCP. |

For provider authentication, follow the [AWS](cloud-integrations.md#connect-an-aws-provider-link-add-your-account-with-a-cross-account-role), [GCP](cloud-integrations.md#connect-a-google-cloud-provider-link-add-your-account-with-a-cross-project-service-account), or [Azure](cloud-integrations.md#connect-an-azure-provider-link-add-your-azure-account) authentication instructions. Select the features required for your task. You can leave BYOC unselected when you do not deploy clusters. Cluster quotas and Kubernetes permissions apply only when you also deploy clusters.

#### Provider links: Update an integration

To add features, open the provider link and select its Edit tab. Under Basic information, change Desired features. Grant the additional permissions in your cloud account. Select Update in Northflank. Keep the permissions that existing resources still need.

An organization can share integrations with teams and restrict which teams can use them. If a shared integration is missing, ask your organization administrator to review your team's access.
