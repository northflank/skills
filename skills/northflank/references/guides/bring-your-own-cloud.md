# Bring Your Own Cloud

Generated from 15 application pages listed in `llms.txt`.

## Pages

- [Amazon Web Services on Northflank](#amazon-web-services-on-northflank)
- [Microsoft Azure on Northflank](#microsoft-azure-on-northflank)
- [BYOC and BYOK requirements](#byoc-and-byok-requirements)
- [Civo on Northflank](#civo-on-northflank)
- [Configure static egress IPs](#configure-static-egress-ips)
- [Configure workload identity](#configure-workload-identity)
- [Configure your cluster](#configure-your-cluster)
- [CoreWeave on Northflank](#coreweave-on-northflank)
- [Create custom resource plans](#create-custom-resource-plans)
- [Deploy and scale node pools](#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster](#deploy-workloads-to-your-cluster)
- [Google Cloud Platform on Northflank](#google-cloud-platform-on-northflank)
- [Manage your cluster](#manage-your-cluster)
- [Oracle Cloud Infrastructure on Northflank](#oracle-cloud-infrastructure-on-northflank)
- [Use other cloud providers with Northflank](#use-other-cloud-providers-with-northflank)

## Amazon Web Services on Northflank

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/aws-on-northflank.md

You can integrate your Amazon Web Services account to create and manage clusters using Northflank.

To add your AWS account navigate to the clusters page in your account settings and create a new integration.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/integrations/new/aws) to create a new AWS integration.
You can create an integration using a [cross-account role](bring-your-own-cloud.md#amazon-web-services-on-northflank-add-your-account-with-a-cross-account-role) (recommended), or with an [IAM user](bring-your-own-cloud.md#amazon-web-services-on-northflank-add-your-account-with-an-iam-user) (legacy method).

After integrating your account, you can [create a new cluster](bring-your-own-cloud.md#amazon-web-services-on-northflank-create-a-cluster).

### Amazon Web Services on Northflank: Generate and view required permissions

When you create your AWS account integration you can select the features you want to use with Northflank, such as custom VPC and static egress. Additional features may require extra permissions.

After selecting the features you want to use you can review the required permissions in a table, or the entire inline policy as JSON, and copy it to your clipboard.

You can check existing integrations have all the necessary permissions by opening an integration from your team's clusters page and clicking verify all permissions.

You can view the inline policy required for Northflank to set up a cluster on AWS with a custom VPC and static egress below.

AWS inline policy

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
        "ec2:CreateNatGateway",
        "ec2:CreateRoute",
        "ec2:CreateRouteTable",
        "ec2:CreateSubnet",
        "ec2:CreateTags",
        "ec2:DeleteNatGateway",
        "ec2:DeleteRoute",
        "ec2:DeleteRouteTable",
        "ec2:DeleteSubnet",
        "ec2:DescribeAddresses",
        "ec2:DescribeNatGateways",
        "ec2:DescribeRouteTables",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
        "ec2:DisassociateRouteTable",
        "ec2:ReleaseAddress",
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

### Amazon Web Services on Northflank: Add your account with a cross-account role

It is recommended that you use a cross-account role to integrate your AWS account with Northflank. This method is more secure, as Northflank doesn't store a long-term secret but rather requests a new token every time account access is required.

> [!note] Requirements
> You will need the following to get started:

- permission to create new [roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies-cross-account-resource-access.html) in your AWS account
- sufficient [quotas](bring-your-own-cloud.md#amazon-web-services-on-northflank-check-your-quotas) to deploy your cluster

To integrate AWS with a cross-account role:

1. Navigate to your Northflank account settings and open the clusters page

2. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/aws) and select Amazon Web Services as the provider

3. Select Amazon Web Services as the provider and choose the features you want to use with Northflank. Select cross account role as the credential method and copy the custom trust policy.

4. Open your [AWS IAM console](https://console.aws.amazon.com/iam/home) and open the roles page

5. Create a new role, select custom trust policy and paste in the trust policy from Northflank. Skip the remaining steps, name and save the role.

6. Return to Northflank and review the permissions required for your integration. Copy the AWS inline policy and return to your AWS console.

7. Find your new AWS IAM role in the list on the roles page, open it, click add permissions, and select create inline policy. Paste in and save the inline policy you copied from Northflank.

8. Copy the IAM role ARN to Northflank and create the integration

You can now configure and deploy new clusters in your AWS account. You can update your integration with a new shared secret and IAM role ARN. If this role does not have permission to manage existing clusters, you will be unable to edit those clusters and deleting them via AWS may leave orphaned resources.

### Amazon Web Services on Northflank: Add your account with an IAM user

You can add your account to Northflank by providing the access and secret keys for an IAM user. This is a legacy method, it is recommended that you instead integrate using a [cross-account role](bring-your-own-cloud.md#amazon-web-services-on-northflank-add-your-amazon-account-with-a-cross-account-role).

> [!note] Requirements
> You will need the following to get started:

- permission to create new [IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) in your AWS account
- sufficient [quotas](bring-your-own-cloud.md#amazon-web-services-on-northflank-check-your-quotas) to deploy your cluster

To add your AWS account to Northflank with an IAM user:

1. Navigate to your Northflank account settings and open the clusters page

2. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/aws)

3. Select Amazon Web Services as the provider and choose the features you want to use with Northflank

4. Review the required permissions and copy the AWS inline policy

5. Open your [AWS IAM console](https://console.aws.amazon.com/iam/home), open the users page and create a new user without console access. Skip the remaining steps and save the user.

6. In the new user click add permissions and select create inline policy. Paste in and save the inline policy you copied from Northflank.

7. Open security credentials in your new user and click create access key. Select the `third-party service` use case and click next. Enter a description that will help you recognise your key (e.g. `Northflank BYOC`) and create access key.

8. Enter the `access key` and `secret key` for the user you created into the Northflank integration form and create the integration

You can edit the integration at any time to update the secrets, if required. If the new secrets do not have permission to manage existing clusters, you will be unable to edit those clusters and deleting them via AWS may leave orphaned resources.

### Amazon Web Services on Northflank: Check your quotas

To successfully deploy a cluster on AWS using Northflank you must have the required resources available to your account for your desired region.

[Check the node types](bring-your-own-cloud.md#deploy-and-scale-node-pools-select-node-type) you wish to deploy and ensure your cluster has access to the relevant resources. The specific quotas for each provider may differ, you will need to ensure you have sufficient quotas for your required node type, vCPU, and disk type for your desired regions.

You can change your [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) by selecting the relevant region in the console and navigating to the service quotas page. You may need to [opt-in to a region](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html) first. Choose the relevant AWS service from the dashboard, or search for it on the AWS services page, then search for the relevant resource quotas to increase.

For example, to increase the number of node pools you can deploy on AWS using the `m5.large` node type select the relevant region in the console, search for and open the AWS service `Amazon Elastic Compute Cloud (Amazon EC2)`, search for `Running On-Demand Standard (A, C, D, H, I, M, R, T, Z) instances` and click request quota increase.

### Amazon Web Services on Northflank: Create a cluster

To add a new cluster, navigate to the clusters page in your account settings and click create cluster.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/new/aws) to create a new AWS cluster.

![Create a new cluster in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/create-a-kubernetes-cluster-with-Northflank/create-cluster.png)

Enter a name for the cluster and select AWS as the cloud provider. Choose your integration credentials and select the region to deploy in.

#### Amazon Web Services on Northflank: Select a Virtual Private Cloud

When you create a cluster you can select which [Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) to use. The VPC defines public and private networks in your clusters, allowing access to other AWS services and the internet.

The [default VPC](https://docs.aws.amazon.com/vpc/latest/userguide/work-with-default-vpc.html) includes public subnets for each availability zone, and its components cannot be modified. You should not use the default VPC for production deployments.

For production deployments you should [use a custom VPC](bring-your-own-cloud.md#amazon-web-services-on-northflank-use-a-custom-vpc) to deploy into a private node pool with no public access, or to access other services in your AWS account. Separate VPCs are defined for each [region](bring-your-own-cloud.md#amazon-web-services-on-northflank-check-your-quotas).

You can select which subnets (and therefore availability zones) will host the control plane components for your cluster, this has no impact on the subnets that you can select for node pools. You should select between 2 and 4 subnets for the cluster's control plane.

#### Amazon Web Services on Northflank: Configure node pools

You can now configure the node pools for your cluster. Node pools can also be added, deleted, and updated after creating your cluster. Click add node pool to add another pool.

> [!note] Minimum cluster requirements
> Each cluster requires at least one node pool, and a combined minimum of 4 vCPU and 8GB memory across all node pools.

The number of pods that can be scheduled on each node is determined by networking and node scheduling limits.

##### Amazon Web Services on Northflank: Cluster networking limits

The AWS Load Balancer only allows a maximum of 500 targets per availability zone. This total includes each node pool deployed to the availability zone for that cluster.

To help avoid issues with networking capacity you should create node pools with fewer, larger nodes rather than lots of smaller nodes.

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for more information on configuring nodes and node pools.

#### Amazon Web Services on Northflank: Configure advanced options

After adding your initial node pools you can configure advanced options for the cluster, such as build infrastructure, resource request modifiers, and volume deletion options.

When you create the cluster Northflank will begin installing system components in node pools according to their capacity. This may take up to 20 minutes.

### Amazon Web Services on Northflank: Use a custom VPC

When you create a new cluster you can select a custom VPC that you have defined in your account and selected region. You can create and manage your VPCs in the [AWS console](https://console.aws.amazon.com/vpcconsole/). You must create a subnet in each availability zone that you want to use, and your VPC must include at least one public subnet.

> [!note]
> Learn more about [Amazon EKS networking requirements for VPC and subnets](https://docs.aws.amazon.com/eks/latest/userguide/network-reqs.html).

#### Amazon Web Services on Northflank: Subnets

Public subnets must be associated with an internet gateway, and private subnets require a NAT gateway for egress. You can use a single NAT for multiple private subnets, but this may become a bottleneck for high-traffic applications. Workloads deployed to a node pool with a private subnet will be able to communicate with other resources in your VPC and initiate internet connections via the NAT gateway, but will not be exposed to unsolicited ingress requests. [Read more about connecting your VPC here](https://docs.aws.amazon.com/vpc/latest/userguide/extend-intro.html).

#### Amazon Web Services on Northflank: Security

You can enable the control plane IP allow list option to block all except Northflank’s egress IP from accessing the cluster’s Kubernetes API endpoint.

#### Amazon Web Services on Northflank: IP addresses

Subnets need to have sufficient available IPs for pods and load balancers. Northflank requires at least 32 available IPs for public subnets that will host load balancers. Private subnets which will host node pools require a minimum of 64 available IPs, we strongly recommend to allocate much more (CIDR range /22, /21, or /20) depending on the number of workloads you expect to run. The default CIDR ranges provided by Amazon when configuring a subnet should be sufficient for most use-cases.

Default VPC configuration
The default subnets in the default VPC are public, i.e. nodes will be assigned a public IP. In default VPC mode, subnets for the cluster and node pools are selected by availability zone. Northflank will use the default subnet for the selected availability zone.

- You should select between 2 and 4 availability zones for your cluster’s control plane.
- You can create node pools across 2 or more availability zones for high-availability of workloads.
- You should enable the control plane IP allow list option to block all bar Northflank’s egress IP from accessing the cluster’s Kubernetes API endpoint.

Custom VPC example

##### Amazon Web Services on Northflank: VPC setup

- IPv4 CIDR block: 10.0.0.0/16
- No IPv6 CIDR block
- Use 3 or more availability zones
- Add 3 public subnets, one for each availability zone; ensure “auto-assign public IP” is enabled; a /20 CIDR block is recommended
- Add an internet gateway and associate it with the public subnets via route tables
- Add 3 private subnets, one for each availability zone; a /20 CIDR block is recommended
- Add 1 NAT gateway per availability zone (if you want to reduce cost, you can also use just one NAT for the entire VPC)
- Associate each private subnet with a corresponding NAT via route tables
- Enable DNS hostnames
- Enable DNS resolution

##### Amazon Web Services on Northflank: Northflank cluster creation

- Select 3 private subnets for your cluster’s control plane
- Create node pools on private subnets.
- Create 2 or more node pools across multiple (private) subnets for high-availability of workloads.
- Enable the control plane IP allow list option to block all bar Northflank’s egress IP from accessing the cluster’s Kubernetes API endpoint.

#### Amazon Web Services on Northflank: Cluster subnet selection

You can select which subnets (and therefore availability zones) will host the control plane components for your cluster, this has no impact on the subnets that you can select for node pools. You should select between 2 and 4 subnets for the cluster's control plane.

Your VPC must have one public subnet to allow Northflank to manage the cluster, although you are recommended to have at least two public subnets in different availability zones. You do not need to select a public subnet for the cluster.

### Amazon Web Services on Northflank: Enable egress via a static IP

If you are using the default VPC you can enable static egress to route the cluster’s outgoing traffic through a static IP. This is useful if you use external services that only accept requests from specified IP addresses.

If you are using a custom VPC, you must set up your own static egress IP for your cluster in AWS.

### Amazon Web Services on Northflank: Deploy to private nodes

You can use Northflank to deploy workloads to nodes in private subnets. This prevents public ingress requests to these workloads, they will only be able to receive traffic from resources in your VPC and from external sources where your workloads have initiated the request.

You will need to create a cluster with a [custom VPC](bring-your-own-cloud.md#amazon-web-services-on-northflank-create-a-cluster) that has private subnets configured on it, then select an availability zone with a private subnet when you create a new node pool.

You can then [create a project on your cluster](bring-your-own-cloud.md#deploy-workloads-to-your-cluster), and use [node pool labels and Northflank tags](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-deploy-workloads-to-specific-node-pools) to schedule workloads to your private nodes.

### Amazon Web Services on Northflank: Use AWS Launch Templates

Northflank supports the use of [AWS Launch Templates](https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html) to specify cluster resources. You can use Launch Templates to take advantage of [capacity blocks for ML training](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-blocks.html), which allow you to reserve GPU nodes for a specific time period at a known price, up to 8 weeks in advance.

You can select a Launch Template when creating a node pool in an AWS cluster on Northflank. The specifications in the Launch Template will override some of the options selected for the node pool in Northflank.

#### Amazon Web Services on Northflank: Configure Northflank permissions

You must give Northflank permissions to use Launch Templates in your AWS integration. You can create a new integration, or update permissions for an existing integration by adding Custom Launch Templates to desired features.

For an existing integration, update your IAM role by copying the new AWS inline policy then verify all permissions in Northflank. For a new integration, follow the instructions as normal.

AWS Launch Templates permissions

```
ec2:DescribeLaunchTemplateVersions
ec2:DescribeLaunchTemplates
ec2:RunInstances
```

#### Amazon Web Services on Northflank: Create a Launch Template

Launch templates are region-specific, you must create a Launch Template in the same region as your AWS cluster. You can create a Launch Template in your [EC2 dashboard in the AWS console](https://console.aws.amazon.com/ec2/), from the Launch Templates page under instances.

Set a name and (optionally) a description, but do not select an Amazon Machine Image.

You can then select an instance type. This is optional, if selected it will override the instance type that you specify for a node pool on Northflank. If you are using a capacity block, the instance type must match the reserved instances.

![Selecting an instance for an AWS Launch Template in the AWS console](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/aws-on-northflank/aws-launch-template-instances.png)

You must define at least one volume in the Launch Template, which will override the disk specified for a node pool on Northflank. Add a new volume under storage, set the [device name](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/device_naming.html), for example `/dev/xvda`. Choose the disk size and select yes for delete on termination. You can configure other options, such as disk encryption, as required.

![Adding a volume in an AWS Launch Template in the AWS console](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/aws-on-northflank/aws-launch-template-storage.png)

Next, select a purchasing option. Choose Capacity Blocks and enter your [capacity reservation targeted ID](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/capacity-reservations-create.html).

![Choosing a Capacity Block for an AWS Launch Template in the AWS console](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/aws-on-northflank/aws-launch-template-capacity-blocks.png)

Do not configure the machine image, subnets, shutdown behaviour or IAM profile in the Launch Template, as these are handled by Northflank. Finally, save your Launch template.

Configuring resources not mentioned in this guide in a Launch Template may cause issues scheduling and managing nodes with Northflank. Learn more about [Launch Template configuration](https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html), or contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) to discuss other use cases.

#### Amazon Web Services on Northflank: Use a Launch Template

To use a Launch Template, select an existing AWS cluster on Northflank, or [create a new one](bring-your-own-cloud.md#amazon-web-services-on-northflank-create-a-cluster). Configure the cluster as normal with a node pools for system components, and any other required node pools.

Create a new node pool and [configure it as normal](https://northflank.com/docs/v1/application/deploy-and-scale-node-pools), selecting the node type, disk size, availability zone. Expand the advanced section and update the scheduling rules, if required. In the advanced section, select your Launch Template and version (updating the Launch Template will create a new version).

![Creating a node pool with an AWS Launch Template in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/aws-on-northflank/node-pool-launch-template.png)

When you create your cluster, or add the new node pool, the Launch Template will override any configured fields.

If you are using a capacity block nodes will not join the node pool until the date and time of the capacity reservation. At the end of the reservation period nodes will be removed from the node pool, you may want to gracefully terminate workloads before this happens. If your cluster has no other node pools with nodes that these workloads can schedule on, they will remain unscheduled until the required capacity is added.

### Amazon Web Services on Northflank: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## Microsoft Azure on Northflank

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/azure-on-northflank.md

You can integrate your Microsoft Azure account to create and manage clusters using Northflank.

To add your Azure account navigate to the clusters page in your account settings and create a new integration.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/integrations/new/azure) to create a new Azure integration.
After integrating your account, you can [create a new cluster](bring-your-own-cloud.md#microsoft-azure-on-northflank-create-a-cluster).

### Microsoft Azure on Northflank: Add your Azure account

It is recommended that you create a new Azure Active Directory application to integrate with Northflank:

1. Navigate to your Northflank account settings and open the clusters page

2. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/azure) and select Azure as the provider

3. Open [Azure Portal](https://portal.azure.com/) and navigate to [Azure Entra ID](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/Overview)

4. [Register a new application](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) with Azure AD from the add menu, or from the app registrations page. Copy the directory (tenant) ID and the application (client) ID to the Northflank form.

5. In your new application click the link for `managed application in local directory` (your application's name) and copy the application's object ID from properties to Northflank.

6. Go back to your application overview and open the certificates and secrets page. Create a new client secret, and copy the secret value (not the secret ID) to Northflank.

7. Navigate to [subscriptions](https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade) and select an existing subscription, or create a new one. For security, the subscription you use with Northflank should have only the necessary permissions allocated to it.

8. Open access control (IAM) and add a new role assignment to the subscription. Select the [contributor role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor) from privileged administrator roles.

9. Open the members page in the new role and assign access to `user, group, or service principle`. Select members and add your Active Directory application. You may need to start typing the name of your application for it to appear in the member selection menu.

10. Open resource providers in your subscription, search for and select the provider `Microsoft.ContainerService`. Click register to add the provider to the subscription.

11. Copy the subscription ID to Northflank and create the integration

You can now configure and deploy new clusters in your Azure account.

You can edit the integration at any time to update the secrets, if required. If the new secrets do not have permission to manage existing clusters, you will be unable to edit those clusters and deleting them via Azure Active Directory may leave orphaned resources.

### Microsoft Azure on Northflank: Check your quotas

To successfully deploy a cluster on Azure using Northflank you must have the required resources available to your account for your desired region.

[Check the node types](bring-your-own-cloud.md#deploy-and-scale-node-pools-select-node-type) you wish to deploy and ensure your cluster has access to the relevant resources. The specific quotas for each provider may differ, you will need to ensure you have sufficient quotas for your required node type, vCPU, and disk type for your desired regions.

Check and edit your [Azure subscription quotas](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits) from the usage + quotas page of the relevant subscription. You can filter the quotas by provider as well as region.

For example, to increase the number of node pools you can deploy on Azure using the `Standard_D2ds_v5` node type you should select the resource provider `compute`, filter quotas by your cluster's region, select `Standard DDSv5 Family vCPUs` from the list, and request a quota increase. This will also automatically increase your `Total Regional vCPUs` quota, if the request is successful.

### Microsoft Azure on Northflank: Create a cluster

To add a new cluster, navigate to the clusters page in your account settings and click create cluster.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/new/azure) to create a new Azure cluster.

![Create a new cluster in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/create-a-kubernetes-cluster-with-Northflank/create-cluster.png)

Enter a name for the cluster and select Azure as the cloud provider. Choose your integration credentials and select the region to deploy in.

#### Microsoft Azure on Northflank: Configure node pools

You can now configure the node pools for your cluster. Node pools can also be added, deleted, and updated after creating your cluster. Click add node pool to add another pool.

> [!note] Azure system node pool
> Each cluster requires at least one node pool, and a combined minimum of 4 vCPU and 8GB memory across all node pools.
One node pool must be assigned as the system node pool to schedule non-user workloads. For best performance you should assign it more than one node and disable autoscaling.

Each node can schedule up to 250 pods (minus system pods). The actual number of pods per node will usually be limited by resource requests and [request modifiers](bring-your-own-cloud.md#configure-your-cluster-configure-resources) for smaller nodes.

##### Microsoft Azure on Northflank: Cluster networking limits

The number of workloads that can be deployed to an AKS cluster is limited by the available number of pod and service IP addresses, allocated by CIDR block.

AKS clusters allocate a CIDR block of `/16` for pods and services, which means you can deploy thousands of services and pods to your cluster without facing networking constraints.

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for more information on configuring nodes and node pools.

#### Microsoft Azure on Northflank: Configure advanced options

After adding your initial node pools you can configure advanced options for the cluster, such as build infrastructure and resource request modifiers.

When you create the cluster Northflank will begin installing system components in node pools according to their capacity. This may take up to 20 minutes.

### Microsoft Azure on Northflank: Deploy to private nodes

On Azure AKS nodes are private by default, and will not allow public ingress requests.

Northflank installs a load balancer to provide public ingress only via the ports you configure on the Northflank platform.

### Microsoft Azure on Northflank: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## BYOC and BYOK requirements

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/byoc-and-byok-requirements.md

Before connecting your own cloud infrastructure or importing an existing Kubernetes cluster to Northflank, ensure your setup meets the following requirements.

### BYOC and BYOK requirements: BYOC vs BYOK

**BYOC (Bring Your Own Cloud)**: Northflank provisions and manages a new Kubernetes cluster in your cloud account (AWS, GCP, Azure, etc.).

**BYOK (Bring Your Own Kubernetes)**: You import an existing Kubernetes cluster to be managed by Northflank.

### BYOC and BYOK requirements: Resource requirements

#### BYOC and BYOK requirements: BYOC minimum requirements

| Resource | Per node | Per cluster |
| --- | --- | --- |
| Nodes | - | 1 node minimum |
| vCPUs | 4 vCPUs | 12 vCPUs |
| Memory | 8 GB | 24 GB |
| Ephemeral storage | 100 GB (recommended) | - |

#### BYOC and BYOK requirements: BYOK minimum requirements

| Resource | Per node | Per cluster |
| --- | --- | --- |
| Nodes | - | **3 nodes minimum** |
| vCPUs | 4 vCPUs | 12 vCPUs |
| Memory | 8 GB | 24 GB |
| Ephemeral storage | 100 GB (recommended) | - |

#### BYOC and BYOK requirements: Optimization recommendations

**Node sizing**: Prefer fewer larger nodes over many smaller nodes. Some system components must run on every node, so larger nodes minimize the relative per-node overhead, leaving more capacity for your workloads.

**Storage ratio**: Maintain at least 5 GB of ephemeral storage per vCPU for optimal performance.

### BYOC and BYOK requirements: BYOK requirements

If you're importing an existing Kubernetes cluster (BYOK), your cluster must have these components pre-installed and meet additional requirements.

#### BYOC and BYOK requirements: Required system components

Your cluster must have these components already installed:

| Component | Requirement | Notes |
| --- | --- | --- |
| CNI plugin | Cilium | Required for networking |
| CSI driver | Any compatible driver | Required for persistent volumes and stateful workloads |
| CoreDNS | Installed at `kube-system/coredns` | Existing installation may be replaced/reconfigured during import |

**Note on Kube-DNS**: If you're currently using Kube-DNS instead of CoreDNS, contact Northflank support before importing your cluster.

#### BYOC and BYOK requirements: L4 load balancer support

Your Kubernetes installation must be able to provision external, public IPs for Kubernetes `Service` resources of type `LoadBalancer`.

**Requirements:**

- Must provision L4 load balancers by default

- If your provider requires specific annotations on `Service` resources to provision L4 load balancers, contact Northflank support for assistance

#### BYOC and BYOK requirements: Component conflicts

Ensure the following components are **NOT** pre-installed on your cluster (except CoreDNS), as they will be installed during the import process:

- Istio

- Envoy Gateway

- Prometheus

- Promtail

- Grafana

- RuntimeClass resources (except those required by your provider)

If these components exist before import, the installation process may fail due to conflicting resources.

### BYOC and BYOK requirements: Import process and installation

During the BYOK import process, Northflank installs several system components:

**Networking:**

- CoreDNS + configuration

- Istio service mesh

- Envoy Gateway

**Logging and metrics:**

- Prometheus

- Promtail

- Grafana

**Runtime:**

- RuntimeClass resources

These components are essential for Northflank to manage your cluster and provide observability, networking, and runtime capabilities.

### BYOC and BYOK requirements: Important warnings

#### BYOC and BYOK requirements: Use a new cluster for BYOK import

We strongly recommend using a new, dedicated cluster for BYOK import. Do NOT import clusters that:

- Are running production workloads

- Host important or business-critical applications

- Are shared with other systems or teams

**Potential risks:**

- The installation might fail and leave the cluster in an unhealthy state

- There is currently no full deinstallation process

- Existing configurations may be overwritten or modified

**If something goes wrong:**
If the import fails or your cluster becomes unhealthy, you may need to redeploy a fresh cluster.

### BYOC and BYOK requirements: Getting help

Contact Northflank support if:

- You have questions about the installation process

- Your Kubernetes provider doesn't meet some requirements

- Your provider requires customization (e.g., specific annotations, non-standard configurations)

- You need assistance during or after the import process

- Your cluster uses Kube-DNS instead of CoreDNS

### BYOC and BYOK requirements: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## Civo on Northflank

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/civo-on-northflank.md

To add your Civo account to Northflank, navigate to the clusters page in your account settings and create a new integration.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/integrations/new/civo) to create a new Civo integration.
You must have [sufficient resource quotas](bring-your-own-cloud.md#civo-on-northflank-check-your-quotas) available in your Civo account to deploy a cluster using Northflank.

### Civo on Northflank: Add your Civo account to Northflank

1. Navigate to your Northflank account settings and open the clusters page

2. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/civo) and select Civo as the provider

3. Open your Civo dashboard and navigate to the [security page](https://dashboard.civo.com/security) in your profile, under settings

4. Copy your [Civo API key](https://www.civo.com/docs/account/api-keys) into the Northflank integration form and create the integration

You can now configure and deploy new clusters in your Civo account.

You can edit the integration at any time to update the API key, if required. You should not install any applications from the Civo marketplace to Northflank-managed clusters.

> [!note]
>
- Disk snapshots for addon backups are not currently available on Civo clusters.
- Spot instances are not available on Civo clusters.

### Civo on Northflank: Check your quotas

To successfully deploy a cluster on Civo using Northflank you must have the required resources available to your account. Civo quotas are account-wide rather than region-specific.

You can view your account quota in your Civo settings on the [quota page](https://dashboard.civo.com/quota), and request quota increases from this page. Provisioning Northflank clusters will require sufficient quotas for `instances`, `CPUs`, `RAM`, `Disk`, and `Volumes`.

Learn more on the [Civo documentation on quotas](https://www.civo.com/docs/account/quota).

### Civo on Northflank: Create a cluster

To add a new cluster, navigate to the clusters page in your account settings and click create cluster.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/new/civo) to create a new Civo cluster.

![Create a new cluster in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/create-a-kubernetes-cluster-with-Northflank/create-cluster.png)

Enter a name for the cluster and select Civo as the cloud provider. Choose your integration credentials and select the region to deploy in.

#### Civo on Northflank: Configure node pools

You can now configure the node pools for your cluster. Node pools can also be added, deleted, and updated after creating your cluster. Click add node pool to add another pool.

> [!note] Minimum cluster requirements
> Each cluster requires at least one node pool, and a combined minimum of 4 vCPU and 8GB memory across all node pools.

Each node can schedule up to 256 pods (minus system pods). The actual number of pods per node will usually be limited by resource requests and [request modifiers](bring-your-own-cloud.md#configure-your-cluster-configure-resources) for smaller nodes.

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for more information on configuring nodes and node pools.

Spot instances are not available on Civo.

#### Civo on Northflank: Configure advanced options

After adding your initial node pools you can configure advanced options for the cluster, such as build infrastructure and resource request modifiers.

When you create the cluster Northflank will begin installing system components in node pools according to their capacity. This may take up to 20 minutes.

### Civo on Northflank: Deploy to private nodes

Northflank deploys your Civo cluster using the default network and firewall. All nodes on Civo clusters will have public internet ingress and egress available.

### Civo on Northflank: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## Configure static egress IPs

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/configure-static-egress-ips.md

> [!note] Using BYOC or managed cloud?
>

- **Using BYOC clusters?** You're in the right place.

- **Using Northflank's managed cloud?** See [Configure egress IPs for PaaS](network.md#configure-egress-ips).

Static egress IPs allow you to configure fixed IP addresses for outbound traffic from pods on private subnets in your BYOC cluster. This is useful when you need to whitelist your cluster's IP in third-party services, meet security requirements, or configure firewall rules for external API access.

This guide covers manual configuration of static egress IPs for AWS and GCP BYOC clusters.

### Configure static egress IPs: AWS setup

#### Configure static egress IPs: Option 1: Using an existing VPC

If you have an existing VPC, follow these steps to configure static egress IPs.

##### Configure static egress IPs: 1. Allocate an Elastic IP

1. Navigate to the [AWS EC2 Console - Elastic IPs](https://console.aws.amazon.com/vpcconsole/home#AllocateAddress)

2. Click **Allocate Elastic IP address**

3. Select **Amazon's pool of IPv4 addresses**

4. Click **Allocate**

5. Note the allocated IP address

##### Configure static egress IPs: 2. Create a private subnet

The private subnet will host your EKS pods and route egress traffic through a NAT gateway. Use a sufficiently large CIDR range as each pod receives an IP from this subnet.

1. Navigate to the [AWS VPC Console - Subnets](https://console.aws.amazon.com/vpcconsole/home#CreateSubnet:)

2. Click **Create subnet**

3. Select your VPC

4. Configure the subnet:

  - **Name**: e.g., `northflank-private-subnet`

  - **Availability Zone**: Choose an AZ

  - **IPv4 CIDR block**: Use at least a `/20` range (4,094 available addresses)

5. Click **Create subnet**

6. After creation, select the subnet and verify **Auto-assign public IPv4 address** is **disabled**

##### Configure static egress IPs: 3. Ensure you have a public subnet

Your VPC needs a public subnet to host the NAT gateway.

1. Navigate to the [AWS VPC Console - Subnets](https://console.aws.amazon.com/vpcconsole/home#CreateSubnet:)

2. Check if you have a public subnet. Using the same Availability Zone as your private subnet is recommended for optimal routing, but optional.

3. Select an existing public subnet (or create a new one for better separation of concerns):

  - Click **Create subnet**

  - Select your VPC

  - Configure:

    - **Name**: e.g., `northflank-public-subnet`

    - **Availability Zone**: Same AZ as private subnet (recommended)

    - **IPv4 CIDR block**: e.g., `10.0.0.0/24`

  - Click **Create subnet**

4. After creation, select the subnet and verify **Auto-assign public IPv4 address** is **enabled**

##### Configure static egress IPs: 4. Configure internet gateway

1. Navigate to the [AWS VPC Console - Internet Gateways](https://console.aws.amazon.com/vpcconsole/home)

2. If your VPC doesn't have an internet gateway:

  - Click **Create internet gateway**

  - Provide a name

  - Click **Create**

  - Select the gateway and click **Actions** → **Attach to VPC**

  - Select your VPC and attach

3. Verify the public subnet's route table:

  - Navigate to [Route Tables](https://console.aws.amazon.com/vpcconsole/home:)

  - Find the route table associated with your public subnet

  - Ensure it has a route: `0.0.0.0/0` → Internet Gateway

##### Configure static egress IPs: 5. Create a NAT gateway

1. Navigate to the [AWS VPC Console - NAT Gateways](https://console.aws.amazon.com/vpcconsole/home#CreateNatGateway)

2. Click **Create NAT gateway**

3. Configure:

  - **Name**: e.g., `northflank-nat-gateway`

  - **Subnet**: Select the **public subnet** from step 3

  - **Connectivity type**: **Public**

  - **Elastic IP allocation ID**: Select the Elastic IP from step 1

4. Click **Create NAT gateway**

##### Configure static egress IPs: 6. Create a route table

1. Navigate to the [AWS VPC Console - Route Tables](https://console.aws.amazon.com/vpcconsole/home#CreateRouteTable:)

2. Click **Create route table**

3. Configure:

  - **Name**: e.g., `northflank-private-route-table`

  - **VPC**: Select your VPC

4. Click **Create**

5. After creation, select the route table:

  - Click **Routes** tab → **Edit routes**

  - Add a route: `0.0.0.0/0` → NAT Gateway (select the NAT from step 5)

  - Save routes

6. Click **Subnet associations** tab → **Edit subnet associations**

7. Select the **private subnet** from step 2

8. Save associations

#### Configure static egress IPs: Option 2: Creating a new VPC

If you're creating a new VPC:

1. Use the [AWS VPC creation wizard](https://console.aws.amazon.com/vpcconsole/home)

2. Select **VPC and more**

3. Configure to include:

  - At least one **private subnet**

  - **NAT Gateway** in a public subnet

4. The wizard will automatically configure routing

5. Note the private subnet ID for use in Northflank

#### Configure static egress IPs: Configure Northflank cluster

Once your AWS networking is configured:

1. Create a new AWS BYOC cluster in Northflank

2. Select **Custom VPC** mode

3. For each node pool that should use the static egress IP:

  - Select the **private subnet** you created

4. Deploy the cluster

All egress traffic from pods in the private subnet will route through the NAT gateway using your static Elastic IP.

### Configure static egress IPs: GCP setup

#### Configure static egress IPs: 1. Select a VPC

We recommend using your default VPC, which is pre-configured with the necessary networking settings.

If using a custom VPC, additional configuration (firewall rules, networking settings) may be required beyond this guide. See [GCP VPC documentation](https://cloud.google.com/vpc/docs/vpc) for details.

#### Configure static egress IPs: 2. Enable Cloud NAT

1. Navigate to the [GCP Cloud NAT Console](https://console.cloud.google.com/net-services/nat/list)

2. Click **Create Cloud NAT gateway**

3. Configure:

  - **Gateway name**: e.g., `northflank-nat`

  - **VPC network**: Select your VPC (default or custom)

  - **Region**: Select the region where your cluster will run

  - **Cloud Router**: Create a new router or select an existing one

  - **NAT mapping**: Select the subnet you want to use

  - **NAT IP addresses**: Select **Manual** and choose or create external static IP addresses

4. Click **Create**

The static IP addresses you selected will be used for all egress traffic from the specified subnet.

#### Configure static egress IPs: 3. Configure Northflank cluster

When creating a new GCP BYOC cluster:

1. If using a custom VPC:

  - Select **Custom VPC** option

  - Choose your VPC and subnet

2. For node pools that should use the static egress IP:

  - Enable **Private node IPs**

  - Ensure the node pool is assigned to the subnet configured with Cloud NAT

All egress traffic from nodes with private IPs will route through Cloud NAT with your static IP addresses.

### Configure static egress IPs: Azure setup

By default, Azure assigns a dynamically managed public IP to your cluster's load balancer. This IP can change during cluster upgrades or load balancer reconciliation, which can cause issues if external services whitelist your egress IP.

You can configure a static egress IP through the load balancer or a NAT gateway.

#### Configure static egress IPs: Option 1: Load balancer approach

##### Configure static egress IPs: 1. Find the infrastructure resource group

1. Navigate to your cluster in the **Azure AKS Console**

2. Find your cluster (named `nf-{cluster-name}`) and select it

3. Navigate to **Settings** → **Properties** in the sidebar

4. Note the **Infrastructure resource group** name (format: `MC_nf-{cluster-name}-{cluster-name}-{region}`)

##### Configure static egress IPs: 2. Create a new static public IP

1. Navigate to **Public IP addresses** in the Azure Portal

2. Click **Create**

3. Configure the public IP:

  - **Resource group**: Select the resource group from the previous step

  - **Region**: Same region as your cluster

  - **Name**: Provide a meaningful name

  - **IP version**: IPv4

  - **SKU**: Standard

  - **Availability zone**: Zone-redundant

  - **Tier**: Regional

  - **Assignment**: Static

  - **Routing preference**: Microsoft network

4. Click **Review + create** → **Create**

5. Note the **Resource ID** of the new IP address

##### Configure static egress IPs: 3. Assign the new IP to your cluster

**Option A (recommended): Azure CLI**

```bash
az aks update \
  --resource-group nf-{cluster-name} \
  --name nf-{cluster-name} \
  --load-balancer-outbound-ips <resource-id-of-new-ip>
```

**Option B: Azure Portal**

Changes made through the portal may be reverted during cluster maintenance operations.

1. Navigate to the infrastructure resource group

2. Open the load balancer resource (named `kubernetes`)

3. Navigate to **Settings** → **Frontend IP configuration**

4. Click **Add**

5. Configure:

  - **Name**: Provide a name for the frontend configuration

  - **IP version**: IPv4

  - **Type**: IP address

  - **Public IP address**: Select the IP created in step 2

6. Click **Save**

7. Navigate to **Settings** → **Outbound rules**

8. Click **aksOutboundRule**

9. In the **Frontend IP address** dropdown:

  - Deselect the existing IP address

  - Select your new frontend configuration

10. Click **Save**

##### Configure static egress IPs: 4. Release the old IP (optional)

1. Navigate to **Settings** → **Frontend IP configuration**

2. Note the name of the original IP address

3. Delete the original frontend IP configuration

4. Navigate to **Public IP addresses** in the Azure Portal

5. Find the original IP address and select it

6. Click **Delete**

#### Configure static egress IPs: Option 2: Use NAT Gateway (recommended for production)

NAT Gateway provides better SNAT port availability and stable egress IPs by design. This approach incurs additional Azure costs for the NAT gateway.

##### Configure static egress IPs: 1. Find the infrastructure resource group

Follow the same steps as Option 1, step 1.

##### Configure static egress IPs: 2. Create a static public IP

Follow the same steps as Option 1, step 2.

##### Configure static egress IPs: 3. Create a NAT gateway

1. Navigate to the infrastructure resource group in the Azure Portal

2. Click **Create** and search for **NAT Gateway**

3. Configure the NAT gateway:

  - **Resource group**: Select the infrastructure resource group

  - **Region**: Same region as your cluster

  - **Name**: Provide a meaningful name

4. On the **Outbound IP** tab:

  - Click **Public IP addresses**

  - Add the static IP created in step 2

5. On the **Subnet** tab:

  - **Virtual network**: Select your cluster's virtual network (typically named `aks-vnet-*`)

  - **Subnet**: Select the subnet your node pools use (typically named `aks-subnet`)

6. Click **Review + create** → **Create**

> [!note] Configure Northflank cluster
> Ensure your node pools are not configured with **Use public node IPs** (disabled by default). Any node pools that have public IPs enabled will route egress traffic through their own IP and not the static IP. Recreate them with public IPs disabled to ensure they use the new static egress IP.

### Configure static egress IPs: Verify your setup

To verify your static egress IP is working:

1. Deploy a test service to your cluster with an image that has `curl` available (e.g., `alpine/curl:latest`)

2. Once the service is running, exec into the workload using:

  - **Northflank UI**: Navigate to the service → **Terminal** tab

  - **Northflank CLI**: Run `northflank exec <service-name>`

3. Run the following command to check your egress IP:

```bash
   curl api.ipify.org
```

1. Compare the returned IP address with your configured static IP:

  - **AWS**: Should match your Elastic IP from step 1

  - **GCP**: Should match one of the external static IPs configured in Cloud NAT

If the IPs match, your static egress configuration is working correctly.

### Configure static egress IPs: Troubleshooting

#### Configure static egress IPs: AWS

**Traffic not routing through static IP:**

- Verify the private subnet is associated with the correct route table

- Check that the route table has `0.0.0.0/0` pointing to the NAT gateway

- Confirm node pools are deployed to the private subnet

**NAT gateway not working:**

- Ensure the NAT gateway is in a **public** subnet

- Verify the public subnet's route table has `0.0.0.0/0` pointing to the internet gateway

- Check that the Elastic IP is properly attached to the NAT gateway

#### Configure static egress IPs: GCP

**Egress traffic using different IPs:**

- Verify Cloud NAT is configured for the correct VPC and subnet

- Ensure node pools have **private node IPs** enabled

- Check that the subnet matches the one configured in Cloud NAT

#### Configure static egress IPs: Azure

**New IP not being used:**

- Verify the new frontend IP configuration is selected in **aksOutboundRule**

- For NAT Gateway: Check the NAT gateway is attached to the correct subnet with the static IP assigned

### Configure static egress IPs: Next steps

- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Tag your workloads and resources: Create tags to assign to your Northflank workloads and resources to help keep track of them.](release.md#tag-workloads-and-resources)
- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)

## Configure workload identity

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/configure-workload-identity.md

Workload identity allows your services and jobs to securely access resources in your AWS or GCP account without managing credentials manually. Northflank assumes a role in your cloud account using OIDC (OpenID Connect), automatically injecting credentials that cloud SDKs recognize.

### Configure workload identity: How it works

When you configure workload identity:

1. Select a cloud provider integration (AWS or GCP)

2. Northflank installs an OIDC provider in your cloud account (if not already installed)

3. You define permissions for the workload identity

4. You configure which projects and tags can use the identity

5. Northflank automatically injects credentials into matching workloads

6. Credentials are refreshed before expiration

Your workloads can then access cloud resources (S3 buckets, Cloud Storage, databases, etc.) without hardcoded credentials.

### Configure workload identity: Create a workload identity

To create a workload identity:

1. Navigate to [**Cloud** → **Workload identities**](https://app.northflank.com/s/team/cloud/workload-identities/new)

#### Configure workload identity: Basic information

1. **Name**: Provide a name for the workload identity (e.g., `s3-access`)

2. **Description**: (Optional) Describe what this identity is used for

3. **Provider**: Select the cloud provider (AWS or GCP)

#### Configure workload identity: Integration

1. **Credential name**: Select your cloud provider integration

2. **Provider setup**: Choose how to set up the OIDC provider

  - **Automatic** (recommended): Northflank installs the required resources

  - **Manual**: You create the IAM OpenID Connect identity provider yourself using the Provider URL and Audience shown. This is useful when your credentials lack permission to manage IAM infrastructure.

When using Manual setup, click **Verify** after creating the resources in your cloud account. Verify may fail if credentials lack read permissions, but the workload identity can still work if configured correctly.

#### Configure workload identity: Scope

Configure which project can use this identity. By default, the identity is not available to any project.

**Project restriction:**

- Enable to restrict to specific projects

- Select which projects can use this identity

- Disable to allow all projects

**Tag restriction:**

- Enable to restrict by workload tags

- Add tags that workloads must have

- Toggle **Force matching all tags** to require workloads to have ALL specified tags (not just one)

- Disable to allow all workloads

**Note:** Project and tag restrictions work together with AND logic. Workloads must satisfy both configured restrictions (if enabled) to use the identity.

#### Configure workload identity: Permission details

1. **Role mode**: Choose how to configure the IAM role

  - **Managed role** (recommended): Northflank creates and manages the IAM role

  - **Existing role**: Use a pre-existing IAM role from your cloud account

**For Managed role:**

**AWS:**

Provide an IAM policy document:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

**GCP:**

Provide a list of permissions:

```
storage.objects.get
storage.objects.create
storage.buckets.list
```

**For Existing role:**

Create an IAM role in your cloud account with the trust policy shown in the UI, then enter the role ARN or name and click **Verify**.

#### Configure workload identity: Create and install

Click **Create and install** to:

- Create the workload identity in Northflank

- Install the OIDC provider in your cloud account (if this is the first identity for this integration)

- Create the IAM role with the specified permissions

Or click **Create** to save the configuration without installing.

### Configure workload identity: Update workload identity

To change permissions for an existing workload identity:

1. Navigate to [**Cloud** → **Workload identities**](https://app.northflank.com/s/team/cloud/workload-identities)

2. Select the workload identity

3. Update the permission details

4. Choose how to save:

  - Click **Update** to save changes without applying them immediately

  - Click **Update and install** to save and apply changes immediately

**When to use "Update and install":**

- Required when you change permissions (IAM policy document or permissions list)

- Not needed when only changing project or tag restrictions

When you update and install, Northflank creates or updates these resources in your cloud environment:

- IAM role

- IAM role policy

**Note:** If you only click **Update** after changing permissions, changes are saved but not applied to workloads until you install later.

### Configure workload identity: View active workload identities

To see which workload identities are being used by a service or job:

1. Navigate to your service or job

2. Click **Workload identities** in the sidebar

The page displays:

- Active workload identity name and description

- Cloud provider (e.g., Amazon Web Services, Google Cloud Platform)

- Provider integration link

- Creation date

**Note:** If multiple workload identities match a workload (via project and tag rules), only one identity per cloud provider will be used. Northflank selects the first one alphabetically by name. For example, if both `aws-prod` and `aws-s3-access` match, `aws-prod` will be used.

#### Configure workload identity: Injected credentials

When a workload identity is active, Northflank automatically injects:

**Managed environment variables:**

- `AWS_ROLE_ARN` - The IAM role ARN (for AWS)

- `AWS_WEB_IDENTITY_TOKEN_FILE` - Path to the token file (for AWS)

- (GCP equivalents for Google Cloud)

**Managed files:**

- `/awstoken` - Web identity token file

Official cloud SDKs automatically detect and use these credentials. If you're connecting to cloud providers through other means, you can read these injected values directly.

### Configure workload identity: Example: S3 access from a service

This example shows a complete workflow for giving a service access to an S3 bucket.

**Setup:**

1. Navigate to **Cloud** → **Workload identities** → **Create new workload identity**

2. Configure:

  - **Name**: `s3-bucket-access`

  - **Provider**: AWS

  - **Integration**: Select your AWS integration

  - **Project restriction**: Enable and select your project

3. In **Permission details**, add this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": [
        "arn:aws:s3:::my-app-bucket",
        "arn:aws:s3:::my-app-bucket/*"
      ]
    }
  ]
}
```

1. Click **Create and install**

**Application code:**

The AWS SDK automatically uses the injected credentials:

```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

s3.getObject({
  Bucket: 'my-app-bucket',
  Key: 'file.txt'
}, (err, data) => {
  console.log(data.Body.toString());
});
```

No credential configuration needed - it just works.

### Configure workload identity: Best practices

**Scope configuration:**

- Use project restrictions for team-level access control

- Use tag restrictions for workload-specific access

- Enable "Force matching all tags" when you need to be more restrictive on workload selection

**Updating permissions:**

- Use **Update and install** to apply permission changes immediately

- Changes saved with **Update** alone won't affect workloads until installed

### Configure workload identity: Troubleshooting

**Workload identity not showing in service:**

Verify both project and tag restrictions are properly configured:

- Check **Project restriction** is either disabled OR includes your project

- Check **Tag restriction** is either disabled OR matches your workload's tags

- If both are enabled, the workload must satisfy BOTH rules

- If "Force matching all tags" is enabled, the workload must have ALL specified tags

### Configure workload identity: Next steps

- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Manage your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#manage-your-cluster)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Create custom resource plans: Create custom plans for your team to deploy workloads and build code on your own clusters.](bring-your-own-cloud.md#create-custom-resource-plans)

## Configure your cluster

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/configure-your-cluster.md

You can configure how Northflank will manage volume deletion, builds, and resources requests for your cluster.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters) to view your clusters.

### Configure your cluster: Select build infrastructure

You can configure the build infrastructure for the clusters you create, which allows you to define where all builds in projects on that cluster will take place, and what compute resources will be granted to builds (build plans).

This option can be found under advanced when creating a cluster, or in settings on the details page for existing clusters.

#### Configure your cluster: Select a build cluster

You can select another cluster that you have provisioned specifically for builds, and the cluster you are currently configuring will then deploy all build workloads to the build cluster. All builds will use the build plan configured on the target build cluster.

This gives you the flexibility to:

- ensure build workloads have capacity to be scheduled and completed by using a pooled build cluster, separate from your deployment clusters

- ensure your deployments and jobs are not delayed by build workloads

- select spot instances to reduce costs

- use another cloud provider and different node types, if required

#### Configure your cluster: Build using the Northflank platform as a service

You can select this option to build using Northflank's platform as a service, [paying only for the usage](billing.md#pricing-on-northflank-usage-based-billing-paas) of compute resources. Specific build plans can be selected in each service or job.

#### Configure your cluster: Build on the same cluster

You can choose to build and deploy on the same cluster, and select the specific build plan for all builds to use. The selected build plan will override build plans selected by users in their services and jobs created on that cluster. You should ensure that your node pools have sufficient resources and nodes to provision both deployments and build workloads.

### Configure your cluster: Configure resources

You can configure the minimum resources requested by pods on a cluster by changing the request modifiers under advanced when creating a cluster, or in settings on the details page for existing clusters.

A pod's main runtime container requests resources from a node according to the selected compute or build plan for a service, job, or addon. The request modifiers reduce the resources specified in the plan by a percentage, so a request modifier of `0.7` will request 70% of the resource defined in the plan. This defines the minimum resources that will be requested by a po from a node, but the pod can use the full amount of resources specified in the plan if there is available capacity on a node. The resources available to the pod will be throttled to the minimum request, as calculated by the pod's plan and the request modifiers, if the available resources are reduced by other pods deployed to the node. Sidecar containers will consume resources within the same pod as the main runtime container, and system pods will reduce resources available on the node.

Reducing the request modifiers allows you to over-provision a node with containers, which can optimise your costs if your workload's average requirements are expected to be smaller than the resources of the selected plan. For example, you could provision a node with 10 vCPUs and use compute plans that request 2 vCPUs for deployment services, which would mean that 5 containers could be deployed on a node (ignoring overheads). By setting the service CPU request modifier to `0.5` the same node could now deploy up to 10 containers for the deployment service, with each container throttled to less than 2 vCPU as more workloads are deployed on the node, until they reach a minimum of 1 vCPU for each container.

> [!note]
>
- Workloads will be increasingly throttled as the node reaches full CPU utilisation and as additional pods are deployed. Consider how much CPU and memory your workloads will require when configuring request modifiers to avoid situations where nodes become oversaturated.
- An excessively aggressive memory request modifier can lead to memory usage exceeding the node memory. This will cause the node to experience out of memory (OOM) errors and workloads will become unavailable. This can also potentially cause cascading failures across nodes.

Request modifiers affect all container deployments on the cluster, and will reduce the resources requested by all compute and build plans by the same percentage. Changing the request modifiers for addons on an existing cluster will restart any addons on the cluster.

> [!note] Custom resource plans
> You can create [resource plans](bring-your-own-cloud.md#create-custom-resource-plans) for your team to deploy workloads with custom vCPU and memory requests and limits.

### Configure your cluster: Set volume deletion preferences

By default, Northflank will delete all volumes and volume snapshots (from addon backups) when you delete a cluster.

If you want to retain these volumes you can expand the advanced menu and uncheck them, or uncheck them in the settings on an existing cluster, on the cluster details page.

Please note that you will still be billed by your cloud provider for any volumes left after cluster deletion. You should always delete your Northflank-created clusters through the Northflank interface to avoid orphaned resources.

### Configure your cluster: Next steps

- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Manage your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#manage-your-cluster)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Create custom resource plans: Create custom plans for your team to deploy workloads and build code on your own clusters.](bring-your-own-cloud.md#create-custom-resource-plans)

## CoreWeave on Northflank

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/coreweave-on-northflank.md

You can integrate your CoreWeave account to create and manage clusters using Northflank.

> [!note]
>
- Spot instances are not available on CoreWeave clusters.
- Builds with local cache are not supported on CoreWeave clusters.

### CoreWeave on Northflank: Add your CoreWeave account to Northflank

Navigate to `Cloud → Provider links → Create provider link` and select CoreWeave as the provider. Or use the direct link:

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/integrations/new/coreweave) to create a new CoreWeave integration.
Copy your CoreWeave access token into the `API key` field and create the provider link. If you don't have a CoreWeave access token, you can create it in the [CoreWeave console](https://console.coreweave.com/tokens).

![Create a new provider link](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/coreweave/integration-new.png)

You can now configure and deploy new clusters in your CoreWeave account.

Note: You can edit the integration at any time to update the API key, if required.

### CoreWeave on Northflank: Check your quotas

To successfully deploy a cluster on CoreWeave using Northflank you must have the required resources available to your account.

You can view your account quota and request new quota from the [CoreWeave console](https://console.coreweave.com/organization/quotas). In order to provision a cluster, you will require a cluster resource and the desired number of instances available in your desired zone.

Learn more on the [CoreWeave documentation on quotas](https://docs.coreweave.com/docs/products/cks/clusters/quotas).

### CoreWeave on Northflank: Create a cluster

Navigate to `Cloud → Clusters → Create cluster` and select CoreWeave as the provider. Or use the direct link:

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/new/coreweave) to create a new CoreWeave cluster.
Enter a name for the cluster or generate one randomly. Choose your integration credentials. Select the region and the zone to deploy in.

![Create a new cluster](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/coreweave/cluster-new.png)

#### CoreWeave on Northflank: Network configuration

Choose `New VPC` if you would like a new VPC with default settings to be created for your cluster.

Choose `Re-use VPC` if you have an existing VPC that you would like to place the new cluster in. Choose one of the available VPCs for your chosen zone from the drop-down selector, and then choose the prefixes to use for pods, services, and load balancers from the VPCs available prefixes. Load balancers can use multiple prefixes. The same prefix cannot be used more than once and prefixes cannot overlap.

![Re-use an existing VPC](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/coreweave/cluster-vpc.png)

#### CoreWeave on Northflank: Node pool configuration

You can now configure the node pools for your cluster. Node pools can also be added, deleted, and updated after creating your cluster. Click add node pool to add another pool. Node types which are not available in your chosen zone will be grayed out in the selection box.

![Create a nodepool for your cluster](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/coreweave/cluster-nodepool.png)

> [!note] Minimum cluster requirements
> Each cluster requires at least one node pool, and a combined minimum of 4 vCPU and 8GB memory across all node pools.

Each node can schedule up to 256 pods (minus system pods). The actual number of pods per node will usually be limited by resource requests and [request modifiers](bring-your-own-cloud.md#configure-your-cluster-configure-resources) for smaller nodes.

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for more information on configuring nodes and node pools.

CoreWeave:

- Does not support spot instances.

- Does not support autoscaling.

- Does not support choosing the node's disk size and type. Instead, each node comes with a predefined disk (usually a few TBs).

#### CoreWeave on Northflank: Configure advanced options

After adding your initial node pools, you can configure advanced options for the cluster, such as build infrastructure and resource request modifiers.

When you create the cluster, Northflank will begin installing system components in the node pools according to their capacity. Provisioning a node pool can take up to 20-30 minutes.

### CoreWeave on Northflank: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## Create custom resource plans

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/create-custom-resource-plans.md

You can create custom resource plans for your team to use on clusters in your [own cloud provider accounts](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

These plans allow you to define your own CPU and memory limits for builds and deployments. Plan limits represent the maximum CPU and memory a container will be able to use on the node it is deployed on. CPU is defined in vCPU, with 1 vCPU corresponding to 1000 [millicore](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu). Memory is defined in MB.

You can create plans that can be used with builds only, deployments only, or both builds and deployments. You may want to create build plans with higher resource limits to build quickly, but not allow persistent deployments to be deployed with these resource limits.

You can combine custom plans with [node pool labels and tags](bring-your-own-cloud.md#deploy-workloads-to-your-cluster) to manage which node pools your workloads are deployed to.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/custom-plans/new) to create a new custom plan.

### Create custom resource plans: Northflank resource configuration

You can select the Northflank configuration type to set CPU and memory limits only in your custom plan.

Resource requests will be determined by the configuration of the cluster that workloads with this plan are deployed to. They will request the percentage of the limit set in the plan according to the [request modifiers on the cluster](bring-your-own-cloud.md#configure-your-cluster-configure-resources).

### Create custom resource plans: Kubernetes resource configuration

You can select the Kubernetes configuration type to set both requests and limits in your custom plan.

The request defines the minimum resources a workload requires to deploy to a node, while the limit sets the maximum resources a workload will potentially use if there is available capacity on a node.

You can enable unbounded CPU to remove the CPU limit, and workloads using the plan will be able to use as much vCPU that they require, up to the maximum available capacity on the node. This could exhaust the capacity of specific node pools, or your entire cluster, if you have many unbounded workloads deployed simultaneously and/or persistently.

### Create custom resource plans: Next steps

- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Tag your workloads and resources: Create tags to assign to your Northflank workloads and resources to help keep track of them.](release.md#tag-workloads-and-resources)
- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)

## Deploy and scale node pools

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/deploy-and-scale-node-pools.md

You can add, configure, scale, and delete node pools on the node pools page in your cluster overview.

Click add node pool to add another pool, and  to delete a node pool. Each cluster requires at least one node pool.

You should increase your nodes or add a node pool if your services are failing to progress from the `staging` state, which indicates your cluster is at capacity. You can either increase the number of nodes in a pool, or add another node pool if the capacity of your node pools is exceeded. As each node in a pool is identical, adding another pool will allow you to add nodes of a different type, with autoscaling, spot instances, or larger disk sizes.

You are recommended to provision a cluster with a node size that strikes a balance of node redundancy and resource efficiency, while taking into account your workload's specific requirements. Too few nodes make workloads susceptible to downtime due to node failures and replacements, while too many small nodes are less cost-effective as they incur a larger system overhead. Large numbers of smaller nodes may also cause scheduling issues in your cluster, as there are networking constraints on each cloud provider as to how many Kubernetes services and pods can be provisioned in a node pool.

Check the relevant page for integrating your cloud provider on Northflank to learn more about provider-specific considerations.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters) to view your clusters.

![Creating new node pools in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/create-a-kubernetes-cluster-with-Northflank/create-node-pools.png)

### Deploy and scale node pools: Select node type

The types of node available depend on your selected cloud provider, and you must have sufficient resource quota available to deploy the desired type and quantity of nodes. Refer to the documentation for your cloud provider to select a type of node with sufficient resources for your workloads.

#### Deploy and scale node pools: Node type and capacity

If you try to deploy a workload which has a compute plan that exceeds the resource configuration of your nodes, the workload will not be able to schedule. Equally, if you have nodes of the required size but these nodes lack capacity for your workload, then the workload will not schedule until a node becomes available.

For example, a deployment service with a selected compute plan of 4 vCPU will not be provisioned if the largest available node on your cluster is only 2 vCPU.

### Deploy and scale node pools: Select node disk

You can select the size of disk to assign to each node in the pool. Each node will use a disk of the specified size as ephemeral storage for workloads, cached image layers, and container logs.

You should choose a disk size based on your estimated requirements for ephemeral storage usage. Disk read/write speeds generally increase with the size of the volume, that is, smaller volumes will have slower read/write speeds and larger volumes will have faster read/write speeds.

There are cloud provider specific limits on how many persistent volumes can be attached to nodes, which vary by node type.

> [!note] Persistent volumes and addon disks
> Persistent volumes and addon volumes are set via network attached disks, and are unrelated to the disk size and type configured for node pools.

### Deploy and scale node pools: Choose availability zone

You must select an availability zone (AZ) for your node pool to be deployed. Availability zones differ according to your cloud provider, cluster region, and selected node type. Not all availability zones in a region may support your chosen node type.

Availability zones represent different facilities within the region of your cluster. You may want to provision multiple node pools in different availability zones to ensure workloads can be scheduled if there is an issue with one availability zone. You might also select a specific availability zone so that your workloads are deployed in the same location as external services, which will reduce latency and network egress costs.

### Deploy and scale node pools: Set node count and autoscaling

You can define the number of nodes to be created and managed by the node pool, the node count can be updated after creation. Each node in the pool will be created with the resources defined by the selected node type and disk.

If you reduce the node count for a node pool with workloads deployed to it then any workloads on the nodes selected for removal will be terminated. You should ensure you have sufficient capacity for your workloads on the node pool you are scaling down, or on other node pools with suitable node types. Northflank will attempt to schedule these workloads to other available nodes, however without sufficient capacity your terminated workloads will not be able to schedule.

#### Deploy and scale node pools: Autoscaling

You can enable autoscaling to allow the cluster to automatically increase and decrease the number of nodes in the pool based on workload demand. Define a minimum and maximum number of nodes to ensure consistent availability, and to cap usage. Autoscaling can help prevent issues from attempting to run too many workloads for a set number of nodes, but will also mean your billing from your cloud provider will vary if more nodes are deployed.

### Deploy and scale node pools: Use spot instances

You can enable spot instances for a node pool to run workloads at a reduced cost on your chosen cloud provider, but these instances may be restarted at short notice. You may encounter issues provisioning node pools if the amount of available spot instances in a region or availability zone on a cloud provider is reduced.

Spot instances can be a good option to reduce costs for development and testing workloads, but you should ensure production applications can be interrupted and resumed without issue to take advantage of cheaper computing in off-peak hours. Otherwise, your production workloads should not be deployed with spot instances.

### Deploy and scale node pools: Set scheduling rules

You can allow or disallow different workloads from being scheduled on a node pool in the advanced menu when creating or updating a node pool. This allows you to deploy on node pools with an optimal configuration for a specific type of workload.

You can set scheduling rules for services, jobs, addons, and builds for each node pool. You can also select whether to restrict the [scheduling of GPU workloads](https://northflank.com/docs/v1/application/run/run-gpu-workloads#deploy-a-cluster-and-a-gpu-node-pool) for jobs and services on GPU-enabled nodes.

### Deploy and scale node pools: Add labels

You can add labels to your node pools to create tags with node affinity rules

You can add labels to new node pools, but they cannot be modified after creation.

Navigate to your [cluster](bring-your-own-cloud.md#manage-your-cluster) and add a new node pool with your desired configuration.

Expand the advanced section and enter as many labels as required, as a name-value pair. This allows you to create rules across different node pools and clusters by testing against values for a specific label.

See [deploy workloads to your cluster](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-deploy-workloads-to-specific-node-pools) for more information.

### Deploy and scale node pools: Next steps

- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)
- [Manage your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#manage-your-cluster)
- [Observe your Kubernetes cluster: Monitor your Kubernetes clusters, node pools, and nodes on other cloud providers using Northflank.](bring-your-own-cloud.md#manage-your-cluster-monitor-your-cluster)

## Deploy workloads to your cluster

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/deploy-workloads-to-your-cluster.md

You can deploy your workloads to your cluster by [creating a project](getting-started.md#create-a-project), selecting bring your own cloud, and choosing a cluster from your team.

Any services, jobs, addons, and volumes created in this project will be deployed to the selected cluster. Workloads will be automatically scheduled to nodes based on type, load, and capacity.

> [!note]
> [Click here](https://app.northflank.com/s/account/projects/new) to create a new project.
When you deploy resources to a project on your cluster Northflank will attempt to schedule the workload to a node pool that meets the requirements of the workload. The node pool a workload will be scheduled to can depend on:

- node capacity

- spot/on-demand nodes

- scheduling rules

- node affinity rules

- zonal redundancy requirements

- GPU requirement

If you have configured a workload with conflicting rules, or your cluster lacks capacity in suitable node pools, your workloads will fail to deploy. To fix this you can [scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools-set-scheduling-rules), change the scheduling rules for a node pool, remove or update tags with [conflicting affinity rules](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-create-node-affinity-rules), or [change the requested resources](scale.md#scale-on-northflank) for your workload.

### Deploy workloads to your cluster: Deploy workloads to specific node pools

You can use [tags](release.md#tag-workloads-and-resources) to manage the deployment of workloads on your own cloud-hosted clusters.

You can mark workloads to prefer to be deployed using spot/preemptible instances, or create your own node pool affinities to deploy workloads on specific node pools.

Node pool labels and node pool affinities allow you to create deployment strategies based on the configured resources and availability zones for your node pools. For example, you may want to ensure that some workloads are deployed with more resources, or you may need to deploy workloads in a specific availability zone.

### Deploy workloads to your cluster: Use spot instances

You can [tag workloads](release.md#tag-workloads-and-resources-provision-by-tag) to deploy them on spot (preemptible) nodes, which means they will first try to deploy on node pools that have [spot instances enabled](bring-your-own-cloud.md#deploy-and-scale-node-pools-use-spot-instances).

If there is no capacity on your node pools that use spot instances then these workloads will deploy on on-demand node pools.

Workloads without a tag that enables deployment on spot instances will never be deployed on node pools that use spot instances.

### Deploy workloads to your cluster: Create node affinity rules

You can add labels to your node pools to [create tags](release.md#tag-workloads-and-resources) with node affinity rules. Node affinity rules can be used in addition to [spot node rules](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-use-spot-instances).

You can create multiple node affinity rules for a tag, each with multiple match expressions. This allows you to configure a combination of mandatory and preferential affinity rules for the same workloads.

If a workload's node affinity rules require it to be deployed on a node pool with no availability, it will not be deployed until there is availability on the required node pool. Availability can be increased by removing other workloads, [scaling up the number of nodes](bring-your-own-cloud.md#deploy-and-scale-node-pools-set-node-count-and-autoscaling) in the pool, or adding a new node pool with matching labels.

> [!warning]
> You can create conflicting rules that prevent the deployment of workloads. If you create mandatory match expression rules that do not correspond to any labels on your node pools, a workload with the tag will never be deployed.
If an addon is created with rules that prevent it from being deployed, it must be deleted.

#### Deploy workloads to your cluster: Label a node pool

You can add labels when you create a node pool, node pool labels cannot be modified after creation.

Navigate to your cluster and add a new node pool with your desired configuration.

Expand the advanced section and enter as many labels as required, as name-value pairs. This allows you to create rules across different node pools and clusters by testing against values for a specific label.

You can create labels to make sure your workloads are deployed in specific availability zones, or to node pools with specific resources (for example `resourceType: highCpu` or `availabilityZone: 1a`).

Save your new cluster or click update node pools to deploy the new node pool(s) with your labels.

![Creating node pool labels in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/deploy-your-workloads-to-specific-node-pools/node-pool-label.png)

#### Deploy workloads to your cluster: Deploy workloads according to node affinity rules

To use your node pool labels to manage your deployments you must [tag your workloads](release.md#tag-workloads-and-resources-provision-by-tag). You must have created appropriate affinity rules in the tag to match or disallow scheduling to the desired nodes.

### Deploy workloads to your cluster: Use zonal redundancy for high availability

You can enable zonal redundancy to ensure a resource is scheduled across multiple availability zones. In the event that one availability zone becomes unavailable, your resource will continue to run on node pools in other availability zones. You must have deployed [node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools-choose-availability-zone) in multiple availability zones to use zonal redundancy.

#### Deploy workloads to your cluster: Zonal redundancy for services

Zonal redundancy is configured in the advanced resources section in deployment and combined services. You can configure this during creation, and modify it for existing services.

You can select from the following types of redundancy:

| Type | Description |
| --- | --- |
| Disabled (default) | The workload will be scheduled based on node pool capacity and any configured affinity rules |
| Preferred | The workload will be scheduled in different availability zones if there is capacity. If there is only capacity in one availability zone, all instances for the workload will be scheduled there. |
| Required | You can choose the number of zones that must be available for a workload to schedule on. If the specified number of zones is not available in your cluster, the workload will not schedule. |

Node pools must also meet the requirements for node type and any affinity rules for a workload to schedule. If a service is scaled to 1 instance, it will not be affected by zonal redundancy rules.

#### Deploy workloads to your cluster: Zonal redundancy for addons

You can configure [zonal redundancy](databases-and-persistence.md#configure-addons-for-high-availability) for an addon during creation. This cannot be changed after creation as the persistent disk is tied to the availability zone, so zonal redundancy can only be disabled or enabled for addons:

| Type | Description |
| --- | --- |
| Disabled (default) | The addon's replicas will be scheduled based on node pool capacity and any configured affinity rules |
| Required | You can choose the number of zones that must be available for an addon to schedule replicas on. If the specified number of zones is not available in your cluster, the addon will not deploy until they become available. |

### Deploy workloads to your cluster: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Create node pools with spot instances: Use spot instances to reduce costs for non-critical workloads.](bring-your-own-cloud.md#deploy-and-scale-node-pools-use-spot-instances)
- [Tag your workloads and resources: Create tags to assign to your Northflank workloads and resources to help keep track of them.](release.md#tag-workloads-and-resources)
- [Create a project: Create a project to contain your services, persistent data, secrets, and more.](getting-started.md#create-a-project)

## Google Cloud Platform on Northflank

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/gcp-on-northflank.md

You can integrate your Google Cloud Platform account to create and manage clusters using Northflank.

To add your GCP account navigate to the clusters page in your account settings and create a new integration.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/integrations/new/gcp) to create a new GCP integration.
You can create an integration using a [cross-project service account](bring-your-own-cloud.md#google-cloud-platform-on-northflank-add-your-account-with-a-cross-project-service-account) (recommended), or using a [service key](bring-your-own-cloud.md#google-cloud-platform-on-northflank-add-your-account-with-a-service-key) (legacy method).

After integrating your account, you can [create a new cluster](bring-your-own-cloud.md#google-cloud-platform-on-northflank-create-a-cluster).

### Google Cloud Platform on Northflank: Select or create your GCP project

You can use Northflank with an existing Google Cloud Platform project, or create a new one.

#### Google Cloud Platform on Northflank: New GCP project setup

1. Open your [GCP console](https://console.cloud.google.com/) and create a new project, or select an existing one.

2. Ensure [billing is enabled](https://cloud.google.com/billing/docs/how-to/modify-project)

3. Enable the [Kubernetes Engine API](https://console.cloud.google.com/marketplace/product/google/container.googleapis.com) and [Cloud Resource Manager API](https://console.cloud.google.com/marketplace/product/google/cloudresourcemanager.googleapis.com)

### Google Cloud Platform on Northflank: Required permissions

The standard Google roles [`roles/iam.serviceAccountUser` (Service Account User)](https://cloud.google.com/iam/docs/understanding-roles#service-accounts-roles) and [`roles/container.admin` (Kubernetes Engine Admin)](https://cloud.google.com/iam/docs/understanding-roles#kubernetes-engine-roles) contain all the required permissions to integrate your GCP account.

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

### Google Cloud Platform on Northflank: Add your account with a cross-project service account

You can integrate your Google Cloud Platform account using a cross-project service account. Northflank will create a new service account in Google Cloud Platform which you can then grant access to your GCP project.

> [!note] Requirements
> You will need the following to get started:

- a [GCP project](bring-your-own-cloud.md#google-cloud-platform-on-northflank-select-or-create-your-gcp-project)
- access to roles with the [necessary permissions](bring-your-own-cloud.md#google-cloud-platform-on-northflank-required-permissions) for your account
- sufficient [quotas](bring-your-own-cloud.md#google-cloud-platform-on-northflank-check-your-quotas) to deploy your cluster

1. Navigate to your Northflank account settings and open the clusters page

2. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/gcp) and select Google Cloud Platform as the provider

3. Name the integration, enter your [Google Project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects), and click create

4. Copy the Northflank service account email from the credentials section

5. Go to the [IAM page](https://console.cloud.google.com/iam-admin/iam) in your GCP console

6. Click Grant Access and add the Northflank service account email as a principal

7. Select `Service Account User` and `Kubernetes Engine Admin` as roles, or add roles with the [equivalent permissions](bring-your-own-cloud.md#google-cloud-platform-on-northflank-required-permissions-to-integrate-your-google-cloud-platform-account)

8. Save and return to Northflank to verify the permissions

### Google Cloud Platform on Northflank: Add your account with a service key

You can add your account to Northflank by providing the service key for an IAM user. This is a legacy method, it is recommended that you instead integrate using a [cross-project service account](bring-your-own-cloud.md#google-cloud-platform-on-northflank-add-your-google-cloud-platform-account-with-a-cross-project-service-account).

> [!note] Requirements
> You will need the following to get started:

- a [GCP project](bring-your-own-cloud.md#google-cloud-platform-on-northflank-select-or-create-your-gcp-project)
- access to roles with the [necessary permissions](bring-your-own-cloud.md#google-cloud-platform-on-northflank-required-permissions) for your account
- sufficient [quotas](bring-your-own-cloud.md#google-cloud-platform-on-northflank-check-your-quotas) to deploy your cluster

You should create a new service account to integrate with Northflank using a service key.

1. Navigate to the service accounts page in IAM and admin in your Google Cloud Platform project

2. Create a new service account:

  1. Add a name and description, click create and continue

  2. Add roles with the [required permissions](bring-your-own-cloud.md#google-cloud-platform-on-northflank-required-permissions-to-integrate-your-google-cloud-platform-account)

  3. Select the new service account and go to the keys page. Create a new key and download the key file with the type `JSON`

3. Navigate to your Northflank account settings and open the clusters page

4. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/gcp) and select Google Cloud Platform as the provider

5. Copy and paste the contents of your `keyfile.json` and create the integration

You can now configure and deploy new clusters in your GCP account.

You can edit the integration at any time to update the `keyfile.json` and Google project ID, if required. If you change the Google project while there are still Northflank clusters on it, you will be unable to manage those clusters and deleting them via Google may leave orphaned resources.

> [!note]
> If you have recently added or changed permissions for your service user account they may take some time to propagate throughout Google.

### Google Cloud Platform on Northflank: Check your quotas

To successfully deploy a cluster on GCP using Northflank you must have the required resources available to your account for your desired region.

[Check the node types](bring-your-own-cloud.md#deploy-and-scale-node-pools-select-node-type) you wish to deploy and ensure your account has sufficient quotas for your required node type, vCPU, and disk type for your desired regions.

You can manage your [Google quota settings](https://cloud.google.com/docs/quota_detail/view_manage) from your [quotas page](https://console.cloud.google.com/iam-admin/quotas) on the IAM and admin page of your Google Cloud project. You can filter the list by resource and region.

For example, to increase the number of node pools you can deploy on Google Cloud using the `n2-standard-4` node type in the region `europe-west2`, filter the quota list with `region:europe-west2` and `n2_cpus`, select the quota from the list, and click edit quotas.

### Google Cloud Platform on Northflank: Create a cluster

To add a new cluster, navigate to the clusters page in your account settings and click create cluster.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/new/gcp) to create a new GCP cluster.

![Create a new cluster in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/create-a-kubernetes-cluster-with-Northflank/create-cluster.png)

Enter a name for the cluster and select GCP as the cloud provider. Choose your integration credentials and select the region to deploy in.

The Google project ID field will be automatically filled based on the provided credentials.

#### Google Cloud Platform on Northflank: Configure node pools

You can now configure the node pools for your cluster. Node pools can also be added, deleted, and updated after creating your cluster. Click add node pool to add another pool.

> [!note] Minimum cluster requirements
> Each cluster requires at least one node pool, and a combined minimum of 4 vCPU and 8GB memory across all node pools.

Each node can schedule up to 256 pods (minus system pods). The actual number of pods per node will usually be limited by resource requests and [request modifiers](bring-your-own-cloud.md#configure-your-cluster-configure-resources) for smaller nodes.

##### Google Cloud Platform on Northflank: Cluster networking limits

The number of workloads that can be deployed to a GCP cluster is limited by the available number of pod and service IP addresses, allocated by CIDR block.

Northflank configures GCP clusters with a CIDR block of `/14` for pods and a CIDR block of `/20` for services, which means you will be able to deploy up to 4000 services, jobs, and addons to your cluster before facing networking constraints.

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for more information on configuring nodes and node pools.

#### Google Cloud Platform on Northflank: Configure advanced options

After adding your initial node pools you can configure advanced options for the cluster, such as build infrastructure and resource request modifiers.

When you create the cluster Northflank will begin installing system components in node pools according to their capacity. This may take up to 20 minutes.

### Google Cloud Platform on Northflank: Deploy to private nodes

GCP currently provides no way to provision private nodes. All nodes on GCP clusters will have public internet ingress and egress available.

### Google Cloud Platform on Northflank: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## Manage your cluster

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/manage-your-cluster.md

You can monitor and manage your cluster from the clusters page in your account settings. The total number of clusters and resources provisioned in your cloud provider accounts is displayed at the top of your clusters page.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters) to view your clusters.

![Viewing the details of a cluster in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/manage-and-use-your-kubernetes-cluster-with-Northflank/cluster-details.png)

> [!warning]
> You should not edit or delete Northflank nodes or clusters via your cloud provider's interface. Doing so may leave orphaned resources which you could still be billed for by your cloud provider.

### Manage your cluster: Deploy on your cluster

To begin using your chosen cloud provider on Northflank [create a new project](getting-started.md#create-a-project) and select your cluster as the provider. Learn more in [deploy workloads to your cluster](bring-your-own-cloud.md#deploy-workloads-to-your-cluster) and [run GPU workloads in your cluster](https://northflank.com/docs/v1/application/run/run-gpu-workloads).

### Manage your cluster: Monitor your cluster

You can view the status of each cluster in your team on Northflank. Click through to a cluster for the following observability and management tools:

- Details: see details of the cluster such as region, Kubernetes version, and subnets, as well as cluster configuration options including build infrastructure and resource request modifiers

- Observe: contains metrics for the cluster, with breakdowns by node pool and node

- Node pools: view and edit your node pool configurations

- Components: see the status of the Northflank platform components

- Cluster history: review the history of the cluster state, for example to check when an update took place and how long it took

- Projects: a list of projects deployed on the cluster

#### Manage your cluster: Observe cluster usage

The observe page of a cluster shows an overview of all cluster resources with combined usage metrics for vCPU, memory, number of pods, and network usage.

You can see each node pool deployed to the cluster, with the node pool ID and node type. Each node pool also lists the nodes deployed in it, and the used resources (`vCPU`, `Memory`) compared to the requested resources  (`rCPU`, `rMem`) for each node.

You can also show deleted node pools, and [cordon and drain node pools](bring-your-own-cloud.md#manage-your-cluster-cordon-and-drain-node-pools).

![Viewing the metrics and deployed nodes of a cluster in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/manage-and-use-your-kubernetes-cluster-with-Northflank/cluster-observe.png)

#### Manage your cluster: Configure alerts

You can configure [infrastructure alerts](observe.md#set-infrastructure-alerts) to send notifications to your [integrated channels](observe.md#configure-notification-integrations). These can alert you to problems with your cluster, node pools, or scheduling pods.

### Manage your cluster: View cluster deployments

You can view workloads deployed on your cluster from the cluster's project page, which will list all projects deployed to your cluster.

You can also open a team's project view and sort by provider.

> [!note]
> [Click here](https://app.northflank.com/s/account/projects) to view your team's projects.

### Manage your cluster: Scale nodes and node pools

You can add, scale, and delete node pools on the node pools page in your cluster overview.

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for more information on configuring nodes and node pools.

### Manage your cluster: Cordon and drain node pools

You can cordon, drain, and uncordon node pools on your cluster's [observe page](bring-your-own-cloud.md#manage-your-cluster-monitor-your-cluster) by opening the menu  on a node pool. You can use these to gracefully migrate workloads to another node pool, for example to upgrade node type or move availability zone, or if you are experiencing issues with a node pool you can prevent workloads from being scheduled to it until the problem is resolved.

#### Manage your cluster: Cordon

Cordoning a node pool will prevent new workloads from being scheduled to the nodes. Existing workloads will continue running until they are terminated, and will then be deployed to another node pool if they are rescheduled.

#### Manage your cluster: Uncordon

Uncordon removes the cordon from the node pool and allows workloads to be scheduled to the nodes.

#### Manage your cluster: Drain

Draining a node pool will send a signal to gracefully terminate all workloads on the node pool. Workloads will respect the [user-configured grace period](scale.md#scale-instances-set-the-grace-period-for-containers) if one is set.

> [!note] Migrating addons and volumes
> If you are moving addons from one node pool to another, the new node pool must be in the same availability zone so that the workload can deploy where the disk is located. This also applies to services deployed with a persistent volume.

### Manage your cluster: Upgrade Kubernetes

Kubernetes upgrades are managed by Northflank with no user intervention required, using our advanced upgrade system.

Upgrades to Kubernetes aim to minimise downtime, as workloads are redeployed according to your configuration for services and addons.

A Kubernetes upgrade follows the steps:

1. The master control plane is upgraded

2. Existing node pools are duplicated

3. Workloads are redeployed onto the new node pools in accordance with your configured redeployment strategy

4. Old node pools are terminated and the upgrade is complete

If you would like to discuss setting maintenance windows for your clusters, contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com).

### Manage your cluster: Delete a cluster

You can delete a cluster from the cluster's overview by using the  delete button. This will remove the entire cluster and associated resources from your cloud provider account. You must delete all projects hosted on the cluster first.

### Manage your cluster: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Infrastructure alerts: Set infrastructure alerts to let you and your team know when there is an issue with your applications or addons.](observe.md#set-infrastructure-alerts)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## Oracle Cloud Infrastructure on Northflank

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/oci-on-northflank.md

To add your Oracle Cloud Infrastructure account to Northflank, navigate to the clusters page in your account settings and create a new integration. OCI integrations are on a regional basis, you will have to create a separate integration for each OCI region you want to deploy clusters in.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/integrations/new/oci) to create a new OCI integration.

### Oracle Cloud Infrastructure on Northflank: Add your account to Northflank

> [!note] Oracle Cloud Infrastructure resources
> You may find it useful to refer to the following OCI documentation while following this guide:

- [Set up a tenancy and compartment](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/settinguptenancy.htm)
- [Add a user](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/addingusers.htm)
- [Find tenancy and user OCID, add a key pair](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm)

To add your OCI account to Northflank:

1. Navigate to your Northflank account settings and open the clusters page

2. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/oci) and select Oracle as the provider

3. Choose the region that the integration should provide access to

4. Open your [OCI Console](https://cloud.oracle.com), open your profile menu and click tenancy. Copy the OCID for your tenancy to Northflank.

5. Create a new user or select an existing user. They must be in an IAM group that grants them the necessary permissions to create and manage OCI resources, and have access to the compartment that you will use with the integration.

6. If you're using your own user, open your profile menu and click my profile. If you're using another (system) user open the navigation menu, select identity & security and click users, under identity. Select the user from the list.

7. Copy the user's OCID into the Northflank form for the user ID

8. You will need to generate an API signing key pair to use with your OCI user account and Northflank

  1. Generate a key pair in your OCI Console and download your private key, store this somewhere secure. Alternatively you can upload a key you have generated yourself.

  2. Copy the fingerprint of the key, displayed in the OCI Console, to Northflank

  3. Copy your private key to Northflank, or upload the `.pem` file containing your key

  4. Enter your passphrase (optional), if you generated the key with one (recommended)

9. Enter the ID of the compartment that new clusters using this integration will be created in

10. Click create integration

You can now configure and deploy new clusters in your OCI account, in the region specified in the integration.

You can edit the integration at any time to update the secrets, if required. If the new secrets do not have permission to manage existing clusters, you will be unable to edit those clusters and deleting them via OCI may leave orphaned resources.

### Oracle Cloud Infrastructure on Northflank: Check your quotas

To successfully deploy a cluster on OCI using Northflank you must have the required resources available to your account.

Your OCI integration will have [Service Limits](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/servicelimits.htm) set by Oracle and [Compartment Quotas](https://docs.oracle.com/en-us/iaas/Content/Quotas/Concepts/resourcequotas.htm) set by account administrators. OCI Service Limits are regional.

You will only be able to see the [Compute Shapes](https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm) available to your account in the selected region for your cluster.

[Check the node types](bring-your-own-cloud.md#deploy-and-scale-node-pools-select-node-type) you wish to deploy and ensure your account has the sufficient quotas.

### Oracle Cloud Infrastructure on Northflank: Create a cluster

To add a new cluster, navigate to the clusters page in your account settings and click create cluster.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters/new/oci) to create a new OCI cluster.

![Create a new cluster in the Northflank application](https://assets.northflank.com/documentation/v1/application/bring-your-own-cloud/create-a-kubernetes-cluster-with-Northflank/create-cluster.png)

Enter a name for the cluster and select OCI as the cloud provider. Choose your integration credentials and select the region to deploy in.

#### Oracle Cloud Infrastructure on Northflank: Select a VCN

You must select the [Virtual Cloud Network](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingVCNs.htm) that your cluster will use. You can create a VCN with OCI's automatic configuration, or [specify your own networking resources](bring-your-own-cloud.md#oracle-cloud-infrastructure-on-northflank-deploy-to-private-nodes).

Select the subnets for the load balancer and the Kubernetes API you want to use for the cluster. These subnets will host the control plane components for your cluster and have no impact on the subnets that you can select for node pools.

> [!important]
> You must select public subnets for the load balancer and Kubernetes API for Northflank to be able to manage your cluster.

#### Oracle Cloud Infrastructure on Northflank: Configure node pools

You can now configure the node pools for your cluster. Node pools can also be added, deleted, and updated after creating your cluster. Click add node pool to add another pool.

> [!note] Minimum cluster requirements
> Each cluster requires at least one node pool, and a combined minimum of 4 vCPU and 8GB memory across all node pools.

Each node can schedule up to 256 pods (minus system pods). The actual number of pods per node will usually be limited by resource requests and [request modifiers](bring-your-own-cloud.md#configure-your-cluster-configure-resources) for smaller nodes.

See [deploy and scale node pools](bring-your-own-cloud.md#deploy-and-scale-node-pools) for more information on configuring nodes and node pools.

#### Oracle Cloud Infrastructure on Northflank: Configure advanced options

After adding your initial node pools you can configure advanced options for the cluster, such as build infrastructure and resource request modifiers.

When you create the cluster Northflank will begin installing system components in node pools according to their capacity. This may take up to 20 minutes.

### Oracle Cloud Infrastructure on Northflank: Deploy to private nodes

You can [create a Virtual Cloud Network](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/create_vcn.htm) with [subnets](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/create_subnet.htm) that have no public internet access. You must still create and use public subnets for your load balancer and Kubernetes API subnets.

You will need to create a cluster with a [custom VCN](bring-your-own-cloud.md#oracle-cloud-infrastructure-on-northflank-create-a-cluster) that has private subnets configured on it, then select a private subnet when you create a new node pool.

You can then [create a project on your cluster](bring-your-own-cloud.md#deploy-workloads-to-your-cluster), and use [node pool labels and Northflank tags](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-deploy-workloads-to-specific-node-pools) to schedule workloads to your private nodes.

### Oracle Cloud Infrastructure on Northflank: Next steps

- [Configure your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#configure-your-cluster)
- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)

## Use other cloud providers with Northflank

Source: https://northflank.com/docs/v1/application/bring-your-own-cloud/use-other-cloud-providers-with-northflank.md

You can bring your own cloud to use all the features of the Northflank platform on other cloud hosting providers.

Connect your account with Northflank to create and manage Kubernetes clusters in your own cloud account, and gain complete control of your infrastructure, data storage, security, and auditing.

You will use your existing billing relationship with your cloud provider for all resources consumed by your clusters. See [cloud provider billing](https://northflank.com/docs/v1/application/billing/cloud-provider-billing) for more information.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/clusters) to start deploying into your cloud account.

### Use other cloud providers with Northflank: Integrate your cloud account and a deploy cluster

After creating an integration with your chosen cloud provider you can deploy clusters into your cloud account.

You can create integrations with the following providers:

| Provider | Engine | Available Nodes and Regions |
| --- | --- | --- |
| [ Google Cloud Platform](https://cloud.google.com/gcp) | [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) | [View on Northflank](https://northflank.com/cloud/gcp) |
| [ Amazon Web Services](https://aws.amazon.com/) | [Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) | [View on Northflank](https://northflank.com/cloud/aws) |
| [ Azure](https://azure.microsoft.com/en-gb/) | [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/) | [View on Northflank](https://northflank.com/cloud/azure) |
| [ Civo](https://www.civo.com) | [Civo Kubernetes](https://www.civo.com/kubernetes) | [View on Northflank](https://northflank.com/cloud/civo) |
| [ Oracle](https://www.oracle.com/) | [Oracle Kubernetes Engine (OKE)](https://www.oracle.com/cloud/cloud-native/kubernetes-engine/) | [View on Northflank](https://northflank.com/cloud/oci) |
| CoreWeave | CoreWeave Kubernetes Service (CKS) | [View on Northflank](https://northflank.com/cloud/coreweave) |

- [Integrate your Google account: Integrate your Google Cloud Platform account to create and manage Kubernetes clusters on GCP with Northflank.](bring-your-own-cloud.md#google-cloud-platform-on-northflank)
- [Integrate your Amazon account: Integrate your Amazon Web Services account to create and manage Kubernetes clusters on AWS with Northflank.](bring-your-own-cloud.md#amazon-web-services-on-northflank)
- [Integrate your Azure account: Integrate your Microsoft Azure account to create and manage Kubernetes clusters on Azure with Northflank.](bring-your-own-cloud.md#microsoft-azure-on-northflank)
- [Integrate your Civo account: Integrate your Civo account to create and manage Kubernetes clusters on Civo with Northflank.](bring-your-own-cloud.md#civo-on-northflank)
- [Integrate your Oracle account: Integrate your Oracle Cloud Infrastructure account to create and manage Kubernetes clusters on OCI with Northflank.](bring-your-own-cloud.md#oracle-cloud-infrastructure-on-northflank)

### Use other cloud providers with Northflank: Configure your cluster

Configure your cluster to handle builds and deployments according to your requirements.

- [Select your cluster's build infrastructure: Build on your cluster, on Northflank's managed cloud, or choose a separate build cluster.](bring-your-own-cloud.md#configure-your-cluster-select-build-infrastructure)
- [Manage your request modifiers: You can tune the minimum resources requested by pods deployed to your cluster to balance performance and node usage.](bring-your-own-cloud.md#configure-your-cluster-configure-resources)
- [Retain cluster volumes: Choose to keep volumes and volume backups when you delete a cluster.](bring-your-own-cloud.md#configure-your-cluster-set-volume-deletion-preferences)
- [Create custom resource plans: Create custom plans for your team to deploy workloads and build code on your own clusters.](bring-your-own-cloud.md#create-custom-resource-plans)

### Use other cloud providers with Northflank: Deploy and scale node pools

Deploy and scale node pools of different node types in as many availability zones as you require and configure scheduling rules and autoscaling to optimise node usage.

- [Deploy node pools: Configure and deploy node pools on a Kubernetes cluster with Northflank.](bring-your-own-cloud.md#deploy-and-scale-node-pools)
- [Scale node pools: Set your node count manually, or configure autoscaling to manage demand and optimise costs.](bring-your-own-cloud.md#deploy-and-scale-node-pools-set-node-count-and-autoscaling)
- [Create node pools with spot instances: Use spot instances to reduce costs for non-critical workloads.](bring-your-own-cloud.md#deploy-and-scale-node-pools-use-spot-instances)
- [Schedule workloads to specific node pools: Allow or disallow different types of workloads from being scheduled on a node pool.](bring-your-own-cloud.md#deploy-and-scale-node-pools-set-scheduling-rules)

### Use other cloud providers with Northflank: Deploy workloads to your cluster

Let Northflank automatically assign workloads to node pools with capacity, or use affinity rules to deploy workloads to specific node pools to projects deployed in your cluster.

Configure node pools to use spot instances to reduce cost, or deploy across multiple availability zones for high availability.

- [Deploy workloads to your cluster: Deploy services, jobs, and addons to your own cluster, and configure workloads to schedule on specific node pools.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster)
- [Run GPU workloads: Deploy GPU workloads on Northflank for AI, machine learning, HPC workloads, and other tasks.](gpu-workloads.md#gpus-on-northflank)
- [Deploy workloads to spot instances: Tag workloads to deploy them to spot instances.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-use-spot-instances)
- [Deploy workloads with high availability: Schedule a resource with zonal redundancy for high availability applications.](bring-your-own-cloud.md#deploy-workloads-to-your-cluster-use-zonal-redundancy-for-high-availability)

### Use other cloud providers with Northflank: Monitor and manage your cluster

Monitor your cluster's usage, health, and deployed workloads.

- [Manage your Kubernetes cluster: Manage your clusters on other cloud providers using Northflank.](bring-your-own-cloud.md#manage-your-cluster)
- [Observe your Kubernetes cluster: Monitor your Kubernetes clusters, node pools, and nodes on other cloud providers using Northflank.](bring-your-own-cloud.md#manage-your-cluster-monitor-your-cluster)
- [Cordon and drain nodes: Cordon and drain node pools to manage and migrate workloads.](bring-your-own-cloud.md#manage-your-cluster-cordon-and-drain-node-pools)
- [Cloud provider billing: Monitor your spend for using Northflank in your own cloud provider accounts.](billing.md#pricing-on-northflank-bring-your-own-cloud)
