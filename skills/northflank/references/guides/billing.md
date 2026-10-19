# Billing

Generated from 10 application pages listed in `llms.txt`.

## Pages

- [Add a card](#add-a-card)
- [Add invoice email](#add-invoice-email)
- [Billing thresholds](#billing-thresholds)
- [Credits](#credits)
- [Monitor spending](#monitor-spending)
- [Pay an invoice](#pay-an-invoice)
- [Pricing on Northflank](#pricing-on-northflank)
- [Compute Plans and Quota](#compute-plans-and-quota)
- [Add your tax ID](#add-your-tax-id)
- [View invoices](#view-invoices)

## Add a card

Source: https://northflank.com/docs/v1/application/billing/add-a-card.md

You can add multiple payment cards to your profile and select one of them as your default.

Open Billing → Payment methods in your team or organization to manage payment cards. Select Add new card to add a card.

Click the target icon next to a card to make it the default. Northflank will automatically charge the default card for any future invoices.

You cannot remove your default card, you must add and select another method as the default to remove a payment method.

Your card will not be charged until you create and use paid services.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing/methods/add-card) to add a payment card.

### Add a card: Next steps

- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)

## Add invoice email

Source: https://northflank.com/docs/v1/application/billing/add-invoice-email.md

You can assign multiple email addresses to receive Northflank invoices and any configured billing alerts.

You can manage your invoice email addresses from the **Billing** page.

To add a new email address:

1. Go to the `Invoice delivery and display` section.

2. Click `Add an email`.

3. Enter the email you want to receive invoices and alerts.

**Tip:** You can add multiple addresses, and all of them will receive your billing notifications.

![Invoice delivery email section in the Northflank application](https://assets.northflank.com/documentation/v1/application/billing/add-invoice-email/email-invoice.png)

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing) to view your invoice delivery emails.

### Add invoice email: Next steps

- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)

## Billing thresholds

Source: https://northflank.com/docs/v1/application/billing/billing-thresholds.md

Billing thresholds trigger automatic billing when your usage reaches predefined spending limits, giving you better control over cash flow and preventing large monthly bills.
New accounts start with a $50 billing threshold by default.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing/billing-limit/edit) to view or change your billing thresholds.

When your combined Northflank platform usage and BYOC usage reaches your threshold amount, Northflank automatically creates an invoice for your current usage period, applies any available credits to cover the invoice, charges your payment method for the remaining balance, and resets your billing cycle to start tracking toward the next threshold.

You may receive multiple invoices per month if you hit your threshold multiple times.

#### Billing thresholds: Setting your billing threshold

Available threshold options:

- $50 (default for new accounts)

- $100

- $250

- $500

You can only set a threshold up to the maximum amount of credits you have previously purchased.

![Billing threshold amount selection showing available options](https://assets.northflank.com/documentation/v1/application/billing/billing-thresholds/billing-threshold-configure.png)

If you prefer traditional monthly billing without thresholds, contact [support](https://northflank.com/support) to disable threshold billing on your account.

### Billing thresholds: Suspension

Northflank platform services are suspended when threshold invoices cannot be paid, and you can restore them by paying outstanding invoices or purchasing credits. GPU workloads are blocked immediately when your credits cannot cover your current spending, requiring you to purchase credits to restore access.

#### Billing thresholds: Account status

| Status | Message |
| --- | --- |
| **Approaching Threshold** | "You're approaching your billing threshold. Ensure you have a working payment method or add credits to keep your services running." |
| **PaaS Suspended** | "CPU deployments are disabled due to insufficient credits. Please purchase credits to re-enable CPU workloads." |
| **GPU Suspended** | "GPU deployments are disabled due to insufficient credits. Please purchase credits to enable GPU deployments." |

### Billing thresholds: Next steps

- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [Monitor spending: Monitor your current resource usage across services.](billing.md#monitor-spending)
- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Configure billing alerts: Set up alerts to notify you if your spend exceeds a specified amount.](billing.md#monitor-spending-set-up-billing-alerts)

## Credits

Source: https://northflank.com/docs/v1/application/billing/credits.md

Credits are prepaid balances that automatically cover usage charges when invoices are generated. Purchase credits to manage cash flow, unlock GPU deployments, and ensure payment coverage for your services.

Credits remain in your account until invoices are created. When billing thresholds are reached or at month-end, credits automatically apply to cover invoice charges. Any remaining amount after credit coverage is charged to your payment method.

![Credit purchase amount selection dropdown in billing interface](https://assets.northflank.com/documentation/v1/application/billing/credits/credit-purchase-dropdown.png)

Buy credits from your billing page. There are some limits to keep in mind:

- **Minimum purchase**: $50

- **Maximum purchase**: $10,000

- **Active credits**: You can have up to 10 unused credits at once

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing/credits/purchase) to buy credits.

### Credits: GPU access

GPU workloads require a $50+ credit purchase to unlock access.

Once unlocked through credit purchase, GPU access remains permanently enabled on your account.

**Important for GPU workloads:**

- GPU services stop immediately when credits run out

- Maintain larger credit buffers to avoid service interruptions

### Credits: Next steps

- [Billing thresholds: Set automatic billing thresholds to maintain service availability when credits run low.](billing.md#billing-thresholds)
- [Monitor spending: Monitor your current resource usage across services.](billing.md#monitor-spending)
- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Configure billing alerts: Set up alerts to notify you if your spend exceeds a specified amount.](billing.md#monitor-spending-set-up-billing-alerts)

## Monitor spending

Source: https://northflank.com/docs/v1/application/billing/monitor-spending.md

You can view current usage by service, project, or account, which gives a breakdown of resource usage and costs for the current billing cycle.

The usage breakdown is calculated from the end of the last billing period to the current date and is updated on an hourly basis.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing) to view your account billing.

If your team is [managed by an organisation](collaborate.md#create-and-manage-an-organisation-manage-organisation-billing), you may have limited ability to view and update your billing details in the team account.

### Monitor spending: View account billing

To view current usage by account, open Billing → Usage in your team or organization.

Select a view under Breakdown to group your spend.

#### Monitor spending: Category

Select Overview to view spend by category:

- Northflank platform usage, such as runtime, storage, and networking

- Bring your own cloud (BYOC) usage

- Recurring commitments such as organisation or enterprise plans

- Any other costs

#### Monitor spending: Project

Select By project to view spend by project. Each project can be expanded to view services, jobs, and addons, which can also be expanded to view individual resources.

You can order this view alphabetically or by cost, and filter by amount.

#### Monitor spending: Resource Type

Select By resource type to view spend by resource type:

- Addons

- Services

- Volumes

- Jobs

Each type can be expanded to view individual resources.

#### Monitor spending: Team

In an organization, select By team to view spend by team. Each team can be expanded to view projects, resource types, and individual resources.

### Monitor spending: View project billing

To view project usage, open Settings → Billing in the project sidebar.

The current usage, broken down by resource type, will be displayed. You can expand each entry for a list of associated resources, including their duration and cost.

You can also find a list of past invoices that the project has been included in.

![Project billing information on the project settings page in the Northflank application](https://assets.northflank.com/documentation/v1/application/billing/monitor-spending/project-billing.png)

### Monitor spending: View resource billing

To view your current usage for a resource, including services, jobs and addons, navigate to the billing page on the resource you want to check.

The current usage, broken down by build time, runtime, and storage will be displayed, showing duration and cost.

You can also find a list of past invoices that the resource has been included in.

![The resource billing page in the Northflank application](https://assets.northflank.com/documentation/v1/application/billing/monitor-spending/resource-billing.png)

### Monitor spending: Set up billing alerts

You can create billing alerts on your account or team billing page.

If your total monthly spend exceeds the set threshold(s), you will be notified on the registered email address for your account or team, and by any other [notification integrations](observe.md#configure-notification-integrations) you have set up and configured to receive billing alerts.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing/create-billing-alert) to create a billing alert.

### Monitor spending: Add an invoice email address

You can assign multiple emails to receive invoices and billing alerts.

For details and to add an email address, see the [Add Invoice Email](billing.md#add-invoice-email).

### Monitor spending: Next steps

- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)

## Pay an invoice

Source: https://northflank.com/docs/v1/application/billing/pay-an-invoice.md

Northflank automatically charges your default payment method at the end of your monthly billing cycle, on the date specified on the billing page.

If the transaction fails for any reason, the relevant invoice will be marked as unpaid. You will need to act promptly and manually complete the payment to avoid a pause in service provision.

All services on your account will be paused after 7 days if the invoice remains unpaid, and you will not be able to create and new services. Any databases or storage volumes on your account will be deleted after this period.

![A list of invoices in the Northflank application](https://assets.northflank.com/documentation/v1/application/billing/view-invoices/invoice-list.png)

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing/invoices) to view your invoices.

### Pay an invoice: Add an invoice email address

You can assign multiple emails to receive invoices and billing alerts.

For details and to add an email address, see the [Add Invoice Email](billing.md#add-invoice-email).

### Pay an invoice: Pay an overdue invoice

To pay an overdue invoice, navigate to the billing page in your account settings.

Find the overdue invoice in the list and click on it to follow the steps to complete the transaction manually.

If your payment has expired, or otherwise been cancelled or blocked, you will need to add a new payment method.

### Pay an invoice: Next steps

- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)

## Pricing on Northflank

Source: https://northflank.com/docs/v1/application/billing/pricing-on-northflank.md

Northflank offers transparent, usage-based billing, so you can scale both horizontally and vertically with no unexpected costs. Authorised users can manage billing from the account dashboard at any time to configure alerts, update plan selection, change payment method, or get up-to-date details on current and historical resource usage. For detailed information about our different plans, please [visit our pricing page](https://northflank.com/pricing).

Please note: all users must add a payment method to start creating resources on Northflank, regardless of plan selection. This is to verify user identity, and prevent malicious usage of the platform. However, with our easily configurable [billing alerts](billing.md#monitor-spending-set-up-billing-alerts) - you don’t need to worry about surprise bills.

You can manage billing for multiple teams using [organisations](collaborate.md#create-and-manage-an-organisation).

Create [a bespoke plan with our team](https://cal.com/team/northflank/northflank-enterprise) to meet your requirements, and [enable SSO and directory sync](collaborate.md#create-and-manage-an-organisation-configure-single-sign-on-sso) for organisations.

### Pricing on Northflank: Deploy for free

You can test out Northflank with our Developer Sandbox plan. This free plan allows you to deploy:

- 2 services

- 2 jobs

- 1 addon

- Up to 1 BYOC cluster

Our free tier is a great way to explore the platform, spin up hobby projects, or test new ideas. However, it should not be used for production applications.

Please note, if you choose to bring your own cloud (BYOC), you will still incur charges from your cloud provider.

For a complete breakdown of Northflank’s different plans, please refer to our [pricing page](https://northflank.com/pricing).

### Pricing on Northflank: Change your billing plan

You will be prompted to select a plan when creating your team or organisation.

To change your plan, open Billing → Plans in your team or organization. You can also [open the plans page](https://app.northflank.com/s/account/billing/plans) and select your team.

If you want to downgrade your plan, your team cannot contain more resources than your desired plan supports.

[View Northflank's plans and costs for resources, storage, and networking.](https://northflank.com/pricing)
See [resource plans and quotas](billing.md#compute-plans-and-quota) for compute plan IDs, GPU plans, and supported GPU counts by region.

### Pricing on Northflank: Usage-based billing on Northflank's managed cloud

Use Northflank's secure and scalable infrastructure to the fullest, and access all the platform's features while only paying for the resources you actually use.

Your running services and volumes will be prorated to the second of usage, and all costs clearly displayed by service, project, and account so there's no surprises at the end of your monthly billing cycle.

You can quickly and easily scale up or down resources and available instances for your build services, deployments, and storage to meet your needs at any given time.

Your quotas for resources available to your account depends on your [billing plan](billing.md#pricing-on-northflank-change-your-billing-plan).

### Pricing on Northflank: Bring your own cloud

You can use your existing billing relationships with cloud providers (including commitments or credits) for infrastructure costs by [deploying into your own cloud provider accounts](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

Northflank will charge a flat fee for each cluster, vCPU, and GB of memory deployed using the platform, as well as any variable costs for network egress and storage on Northflank's infrastructure.

See [infrastructure pricing](https://northflank.com/pricing#plans) for bring your own cloud fees and compare costs with Northflank’s managed cloud, and use the pricing calculator to estimate your monthly spend.

You can view the total number of clusters, vCPU, and memory provisioned in your cloud providers on your clusters page. Your BYOC usage will be displayed on your billing page, with your monthly spend broken down in your current usage and invoices.

You can trial deploying into your own cloud account on Northflank's Developer Sandbox plan and upgrade your plan for unlimited usage.

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing/plans) to select a plan to run workloads on your preferred cloud provider.

### Pricing on Northflank: Next steps

- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [Monitor spending: Monitor your current resource usage across services.](billing.md#monitor-spending)
- [Configure billing alerts: Set up alerts to notify you if your spend exceeds a specified amount.](billing.md#monitor-spending-set-up-billing-alerts)
- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)
- [Add your tax ID: Add your VAT ID for your business.](billing.md#add-your-tax-id)

## Compute Plans and Quota

Source: https://northflank.com/docs/v1/application/billing/resource-plans-and-quotas.md

Use a resource plan to choose CPU, RAM, and GPU resources for each instance of a service or job. Account billing plans determine your account limits and are separate from resource plans.

The tables below use the public Northflank API. They update from the current plan and region lists. Listed GPU support does not guarantee available capacity or account access.

### Compute Plans and Quota: Compute plans

Set `billing.deploymentPlan` to a deployment plan ID. For builds, set `billing.buildPlan` to a plan that supports `build`. RAM values use MiB, where 1024 MiB equals 1 GiB.

| Plan ID | vCPU | RAM (MiB) | Use |
| --- | --- | --- | --- |
| `nf-compute-10` | 0.1 | 256 | deployment |
| `nf-compute-20` | 0.2 | 512 | deployment |
| `nf-compute-50` | 0.5 | 1024 | deployment |
| `nf-compute-100-1` | 1 | 1024 | deployment |
| `nf-compute-100-2` | 1 | 2048 | deployment |
| `nf-compute-100-4` | 1 | 4096 | deployment |
| `nf-compute-200` | 2 | 4096 | deployment |
| `nf-compute-200-4` | 2 | 4096 | deployment |
| `nf-compute-200-8` | 2 | 8192 | deployment |
| `nf-compute-200-16` | 2 | 16384 | deployment |
| `nf-compute-400` | 4 | 8192 | deployment |
| `nf-compute-400-16` | 4 | 16384 | deployment, build |
| `nf-compute-800-8` | 8 | 8192 | deployment, build |
| `nf-compute-800-16` | 8 | 16384 | deployment, build |
| `nf-compute-800-24` | 8 | 24576 | deployment, build |
| `nf-compute-800-32` | 8 | 32768 | deployment, build |
| `nf-compute-800-40` | 8 | 40960 | deployment, build |
| `nf-compute-1200-24` | 12 | 24576 | deployment, build |
| `nf-compute-1600-32` | 16 | 32768 | deployment, build |
| `nf-compute-2000-40` | 20 | 40960 | deployment, build |
| `nf-compute-32-131072` | 32 | 131072 | deployment |
| `nf-compute-32-488` | 32 | 499712 | deployment |

For current prices, see [Northflank pricing](https://northflank.com/pricing). Query the complete public list without an API token:

```shell
curl --fail https://api.northflank.com/v1/plans
```

#### Compute Plans and Quota: Dedicated compute, custom plans, and bare-metal

Northflank supports dedicated compute, custom plans on its managed platform (PaaS), and bare-metal servers. Bare-metal servers provide dedicated physical hardware.

Custom PaaS plans support up to 384 vCPU, 3 TB of memory, and 12 TB of NVMe storage.

If you need bare-metal or 10,000–150,000 vCPU, [Book a call](https://cal.com/team/northflank/northflank-intro) to discuss your requirements.

### Compute Plans and Quota: GPU plans

GPU plans bundle CPU and system RAM for the selected GPU model and count. GPU memory is separate from system RAM. Set `billing.deploymentPlan` to `nf-gpu-<gpuType>-<gpuCount>g`, replacing underscores in the plan ID with hyphens. Keep the original GPU type in `deployment.gpu.configuration.gpuType`.

Set the matching type and count in `deployment.gpu.configuration`:

```json
{
  "billing": { "deploymentPlan": "nf-gpu-rtx-pro-6000-96-1g" },
  "deployment": {
    "gpu": {
      "enabled": true,
      "configuration": {
        "gpuType": "rtx_pro_6000-96",
        "gpuCount": 1,
        "timesliced": false
      }
    }
  }
}
```

The matching compute plan, GPU type, and GPU count are required. Plan errors name the matching `billing.deploymentPlan`. Ephemeral storage and shared memory are optional. See [GPU storage](billing.md#compute-plans-and-quota-gpu-storage) for their defaults.

Use the same configuration for services and jobs. Counts apply to each instance. Timeslicing, which shares a GPU between workloads, is available in your own cloud.

The table shows vCPU, system memory, and ephemeral storage for each instance. These allocations scale with the GPU count. GPU memory is shown per GPU. Memory and storage use the dashboard's GB convention: 1024 MiB displays as 1 GB.

| Plan ID | GPU per instance | CPU and RAM | Ephemeral storage | Regions |
| --- | --- | --- | --- | --- |
| `nf-gpu-a100-40-1g` | 1 × `a100-40` 40 GB per GPU | 12 vCPU 85 GB | 250 GB | asia-northeast, asia-southeast, europe-west-netherlands, us-central |
| `nf-gpu-a100-40-2g` | 2 × `a100-40` 40 GB per GPU | 24 vCPU 170 GB | 500 GB | asia-northeast, asia-southeast, europe-west-netherlands, us-central |
| `nf-gpu-a100-40-4g` | 4 × `a100-40` 40 GB per GPU | 48 vCPU 340 GB | 1000 GB | asia-northeast, asia-southeast, europe-west-netherlands, us-central |
| `nf-gpu-a100-40-8g` | 8 × `a100-40` 40 GB per GPU | 96 vCPU 680 GB | 2000 GB | asia-northeast, asia-southeast, europe-west-netherlands, us-central |
| `nf-gpu-a100-80-1g` | 1 × `a100-80` 80 GB per GPU | 12 vCPU 170 GB | 250 GB | asia-southeast, europe-west-netherlands, us-central, us-east1 |
| `nf-gpu-a100-80-2g` | 2 × `a100-80` 80 GB per GPU | 24 vCPU 340 GB | 500 GB | asia-southeast, europe-west-netherlands, us-central, us-east1 |
| `nf-gpu-a100-80-4g` | 4 × `a100-80` 80 GB per GPU | 48 vCPU 680 GB | 1000 GB | asia-southeast, europe-west-netherlands, us-central, us-east1 |
| `nf-gpu-a100-80-8g` | 8 × `a100-80` 80 GB per GPU | 96 vCPU 1360 GB | 2000 GB | asia-southeast, europe-west-netherlands, us-central, us-east1 |
| `nf-gpu-b200-180-8g` | 8 × `b200-180` 180 GB per GPU | 224 vCPU 3968 GB | 10000 GB | asia-northeast, asia-southeast, europe-west-netherlands, us-central, us-east1 |
| `nf-gpu-h100-80-1g` | 1 × `h100-80` 80 GB per GPU | 26 vCPU 234 GB | 500 GB | asia-south-delhi, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-h100-80-2g` | 2 × `h100-80` 80 GB per GPU | 52 vCPU 468 GB | 1000 GB | asia-south-delhi, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-h100-80-4g` | 4 × `h100-80` 80 GB per GPU | 104 vCPU 936 GB | 2000 GB | asia-south-delhi, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-h100-80-8g` | 8 × `h100-80` 80 GB per GPU | 208 vCPU 1872 GB | 4000 GB | asia-northeast, asia-south-delhi, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-h200-141-8g` | 8 × `h200-141` 141 GB per GPU | 224 vCPU 2952 GB | 10000 GB | europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-l4-24-1g` | 1 × `l4-24` 24 GB per GPU | 12 vCPU 48 GB | 250 GB | asia-northeast, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-l4-24-2g` | 2 × `l4-24` 24 GB per GPU | 24 vCPU 96 GB | 500 GB | asia-northeast, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-l4-24-4g` | 4 × `l4-24` 24 GB per GPU | 48 vCPU 192 GB | 1000 GB | asia-northeast, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-l4-24-8g` | 8 × `l4-24` 24 GB per GPU | 96 vCPU 384 GB | 2000 GB | asia-northeast, asia-southeast, europe-west, europe-west-frankfurt, europe-west-netherlands, us-central, us-east1, us-west |
| `nf-gpu-rtx-pro-6000-96-1g` | 1 × `rtx_pro_6000-96` 96 GB per GPU | 48 vCPU 180 GB | 1200 GB | asia-south-delhi, europe-west, us-central, us-east-ohio, us-west |
| `nf-gpu-rtx-pro-6000-96-2g` | 2 × `rtx_pro_6000-96` 96 GB per GPU | 96 vCPU 360 GB | 2400 GB | asia-south-delhi, europe-west, us-central, us-east-ohio, us-west |
| `nf-gpu-rtx-pro-6000-96-4g` | 4 × `rtx_pro_6000-96` 96 GB per GPU | 192 vCPU 720 GB | 4800 GB | asia-south-delhi, europe-west, us-central, us-east-ohio, us-west |
| `nf-gpu-rtx-pro-6000-96-8g` | 8 × `rtx_pro_6000-96` 96 GB per GPU | 384 vCPU 1440 GB | 9600 GB | asia-south-delhi, europe-west, us-central, us-east-ohio, us-west |

The table derives GPU plan IDs from each region's supported types and counts. Resource allocations follow the GPU configuration on Northflank cloud. The `/v1/plans` endpoint lists compute plans. Use `/v1/regions` to discover GPU types and counts.

### Compute Plans and Quota: GPU regions

Create your project in a region that supports the GPU type and count you need. The project region cannot change after creation. Counts can differ between regions for the same GPU type.

| Region | API reference | Global region | GPU types and counts per instance |
| --- | --- | --- | --- |
| Asia Northeast | `asia-northeast` | Asia Pacific | `b200-180`: 8`h100-80`: 8`a100-40`: 1, 2, 4, 8`l4-24`: 1, 2, 4, 8 |
| Asia South Delhi | `asia-south-delhi` | Asia Pacific | `h100-80`: 1, 2, 4, 8`rtx_pro_6000-96`: 1, 2, 4, 8 |
| Asia Southeast | `asia-southeast` | Asia Pacific | `b200-180`: 8`h100-80`: 1, 2, 4, 8`a100-80`: 1, 2, 4, 8`a100-40`: 1, 2, 4, 8`l4-24`: 1, 2, 4, 8 |
| Europe West | `europe-west` | EMEA | `h100-80`: 1, 2, 4, 8`l4-24`: 1, 2, 4, 8`rtx_pro_6000-96`: 1, 2, 4, 8 |
| Europe West Frankfurt | `europe-west-frankfurt` | EMEA | `l4-24`: 1, 2, 4, 8`h100-80`: 1, 2, 4, 8 |
| Europe West Netherlands | `europe-west-netherlands` | EMEA | `h200-141`: 8`h100-80`: 1, 2, 4, 8`a100-80`: 1, 2, 4, 8`a100-40`: 1, 2, 4, 8`b200-180`: 8`l4-24`: 1, 2, 4, 8 |
| US Central | `us-central` | Americas | `h200-141`: 8`h100-80`: 1, 2, 4, 8`a100-80`: 1, 2, 4, 8`a100-40`: 1, 2, 4, 8`l4-24`: 1, 2, 4, 8`rtx_pro_6000-96`: 1, 2, 4, 8`b200-180`: 8 |
| US East Ohio | `us-east-ohio` | Americas | `rtx_pro_6000-96`: 1, 2, 4, 8 |
| US East1 | `us-east1` | Americas | `b200-180`: 8`h200-141`: 8`h100-80`: 1, 2, 4, 8`a100-80`: 1, 2, 4, 8`l4-24`: 1, 2, 4, 8 |
| US West | `us-west` | Americas | `h200-141`: 8`h100-80`: 1, 2, 4, 8`l4-24`: 1, 2, 4, 8`rtx_pro_6000-96`: 1, 2, 4, 8 |

Query the region list without an API token:

```shell
curl --fail https://api.northflank.com/v1/regions
```

See [GPU sandbox examples](sandboxes.md#examples-create-a-gpu-sandbox) for one or eight H100 or RTX PRO 6000 GPUs.

### Compute Plans and Quota: Quotas and GPU access

Your account and project quotas limit resource counts and resource sizes. A plan listed above does not grant access beyond those limits. Free projects do not support GPU workloads.

#### Compute Plans and Quota: Default quotas

These are selected default quotas for managed cloud workloads. Account and project limits can differ. Free projects have separate limits.

| Quota | Default | Scope |
| --- | --- | --- |
| CPU | 8 vCPU | Per instance |
| Memory | 16 GiB | Per instance |
| Ephemeral storage | 2 GiB | Per instance |
| Shared memory (SHM) | 64 MiB | Per instance |
| Projects | 100 | Per account or team |
| Services | 500 | Across projects in an account or team |
| Jobs | 100 | Across projects in an account or team |
| Service instances | 10 | Per service |
| Addon replicas | 3 | Per addon |
| Concurrent job runs | 10 | Per job |

Concurrent job runs are separate executions of the same job. Free jobs allow one active run at a time.

The resource sizes above apply to standard CPU workloads. Managed GPU workloads use the selected GPU plan's CPU, memory, and storage allocations. For a quota increase, contact [support@northflank.com](mailto:support@northflank.com).

For GPU access requirements, see [GPU credits and access](billing.md#credits-gpu-access). Contact [support@northflank.com](mailto:support@northflank.com) if your account cannot use a supported GPU configuration.

#### Compute Plans and Quota: GPU storage

Ephemeral storage is temporary disk space that does not survive container replacement. Managed GPU workloads use a fixed allocation for each GPU type and count. This allocation differs from the CPU ephemeral storage quota.

`deployment.storage.ephemeralStorage.storageSize` is optional for managed GPU workloads. The API sets it to the allocation per GPU multiplied by `deployment.gpu.configuration.gpuCount`, even if you supply another value. Changes to the GPU type or count recalculate this allocation. Storage values use MiB.

| GPU type | Ephemeral storage per GPU (MiB) |
| --- | --- |
| `h100-80` | 512000 |
| `rtx_pro_6000-96` | 1228800 |
| `a100-40`, `a100-80`, `l4-24` | 256000 |
| `h200-141`, `b200-180` | 1280000 |

For example, H100 with `gpuCount: 8` receives `storageSize: 4096000`. RTX PRO 6000 with `gpuCount: 8` receives `storageSize: 9830400`. These allocations come from the GPU type, not GPU memory or shared memory.

The [GPU examples](sandboxes.md#examples-create-a-gpu-sandbox) omit ephemeral storage and let the API select the allocation. CPU workloads and workloads in your own cloud use their existing storage defaults and limits.

Shared memory (`deployment.storage.shmSize`) uses system RAM and is separate from ephemeral storage and GPU memory. This field is optional. For managed GPU workloads, the API defaults it to system RAM per GPU multiplied by `gpuCount`. Smaller explicit values are preserved. Values above that limit are capped. Changes to GPU type or count reapply this rule to the existing value. CPU workloads and workloads in your own cloud keep the 64 MiB default. The GPU examples explicitly request 32 GiB. A persistent volume has its own size and quota.

#### Compute Plans and Quota: Troubleshoot API requests

If the API reports a GPU plan mismatch or says the plan is only available for specific GPU types, set `billing.deploymentPlan` to `nf-gpu-<gpuType>-<gpuCount>g`, replacing underscores in the plan ID with hyphens. Include `deployment.gpu.enabled: true` and the matching type and count under `deployment.gpu.configuration`. Use the exact plan named in the error. Make sure that the project region supports that type and count.

Older API versions can require explicit GPU storage. If they report `exceeds maximum ephemeral storage capacity` or `does not meet the minimum ephemeral storage`, supply the exact allocation from the table. Both smaller and larger values fail on those versions. Older errors label these numbers as `MB`; the API field uses MiB.

For an older API version, the storage fragment for H100 with eight GPUs is:

```json
{
  "deployment": {
    "storage": {
      "ephemeralStorage": { "storageSize": 4096000 }
    }
  }
}
```

If the API reports a runtime ephemeral storage allowance error for a GPU request, first check GPU enablement, configuration, and the matching plan. Do not reduce GPU storage to the standard CPU quota. For a CPU request, reduce storage to your account or project allowance, or request a quota increase.

If a correctly configured GPU request still fails, send support the error, project region, GPU type and count, plan ID, and storage size. Omit your API token.

Resource count quotas and per-instance resource limits are separate. Increasing a jobs count quota does not increase CPU, RAM, or storage limits.

## Add your tax ID

Source: https://northflank.com/docs/v1/application/billing/tax-id.md

If your business is registered in the European Union (EU) you can add your VAT ID to request that tax is paid on a reverse-charge basis. This means Northflank will not charge VAT on your invoices, and you must report it on your tax return.

You can also add your VAT ID as a UK business. This includes the VAT amount as a separate item on your invoices so you can reclaim it.

When adding your tax ID, you must add a valid VAT ID and the registered company name and address. This will then be verified, which may require manual follow-up from [ Northflank billing](mailto:billing@northflank.com).

### Add your tax ID: Next steps

- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)

## View invoices

Source: https://northflank.com/docs/v1/application/billing/view-invoices.md

Open Billing → Invoices in your team or organization to view invoices and their due dates. A summary of recent invoices is shown and you can select an invoice from the list for the full breakdown by project and service.

The invoice list will display the status, date the invoice was issued, the time period covered by the invoice, and the total amount (including VAT).

> [!note]
>
> [Click here](https://app.northflank.com/s/account/billing/invoices) to view your invoices.

![An invoice in the Northflank application](https://assets.northflank.com/documentation/v1/application/billing/view-invoices/invoice-view.png)

### View invoices: Invoice types

Northflank generates three types of invoices:

**Usage**

- Generated when [billing thresholds](billing.md#billing-thresholds) are reached or at month-end

- Cover Northflank platform usage and BYOC usage

- [Credits](billing.md#credits) are automatically applied to reduce the amount charged

**Subscription**

- Generated monthly for fixed subscription charges

- Billed separately from usage-based charges

- Recurring commitments such as organisation or enterprise plans

**Credits**

- Generated immediately when you purchase credits

- Record the credit purchase transaction

- Credits are added to your account balance upon payment

You may receive multiple usage invoices per month if you hit your billing threshold multiple times.

### View invoices: Download an invoice

You can download an individual invoice as a PDF from the invoice list page, or an individual invoice, by clicking the download button .

Each invoice consists of a summary for the total costs incurred for the invoice period on the first page, and an itemised breakdown of costs per service on the second page.

### View invoices: Invoice status

| Status | Meaning |
| --- | --- |
| Paid | You have successfully paid the invoice |
| Overdue | Payment for the invoice has failed and you will need to manually complete the payment |
| Carried over | The invoice amount is too small to be charged (under $0.50) and will be added to your next invoice |

### View invoices: Next steps

- [Monitor spending: Monitor your current resource usage across services.](billing.md#monitor-spending)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)
