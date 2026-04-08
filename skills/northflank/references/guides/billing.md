# Billing

Generated from 9 application pages listed in `llms.txt`.

## Pages

- [Add a card](#add-a-card)
- [Add invoice email](#add-invoice-email)
- [Billing thresholds](#billing-thresholds)
- [Credits](#credits)
- [Monitor spending](#monitor-spending)
- [Pay an invoice](#pay-an-invoice)
- [Pricing on Northflank](#pricing-on-northflank)
- [Add your tax ID](#add-your-tax-id)
- [View invoices](#view-invoices)

## Add a card

Source: https://northflank.com/docs/v1/application/billing/add-a-card.md

You can add multiple payment cards to your profile and select one of them as your default.

You can manage your payment cards from the billing page in your account settings.

Click the target icon next to a card to make it the default. Northflank will automatically charge the default card for any future invoices.

You cannot remove your default card, you must add and select another method as the default to remove a payment method.

Your card will not be charged until you create and use paid services.

> [!note]
> [Click here](https://app.northflank.com/s/account/billing/add-card) to add a payment card.

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
> [Click here](https://app.northflank.com/s/account/billing) to view your invoice delivery emails.

### Add invoice email: Next steps

- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)

## Billing thresholds

Source: https://northflank.com/docs/v1/application/billing/billing-thresholds.md

Billing thresholds trigger automatic billing when your usage reaches predefined spending limits, giving you better control over cash flow and preventing large monthly bills.
New accounts start with a $50 billing threshold by default.

> [!note]
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
> [Click here](https://app.northflank.com/s/account/billing) to view your account billing.
If your team is [managed by an organisation](collaborate.md#manage-an-organisation-manage-organisation-billing), you may have limited ability to view and update your billing details in the team account.

### Monitor spending: View account billing

To view current usage by account, navigate to the billing page in your team settings.

You can view different breakdowns of your spend by selecting a view from the current usage section.

#### Monitor spending: Category

Divides spend by the following categories:

- Northflank platform usage, such as runtime, storage, and networking

- Bring your own cloud (BYOC) usage

- Recurring commitments such as organisation or enterprise plans

- Any other costs

#### Monitor spending: Project

Divides spend by project. Each project can be expanded to view services, jobs, and addons, which can also be expanded to view individual resources.

You can order this view alphabetically or by cost, and filter by amount.

#### Monitor spending: Resource Type

View spend by resource type:

- Addons

- Services

- Volumes

- Jobs

Each type can be expanded to view individual resources.

#### Monitor spending: Team

Organisations can also view spend by team. Each team can be expanded to view projects, resource types, and individual resources.

![The account billing overview in the Northflank application](https://assets.northflank.com/documentation/v1/application/billing/monitor-spending/team-billing-overview.png)

### Monitor spending: View project billing

To view your current usage for a project, navigate to the project and select  Project Settings from the header.

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

Please note: all users must add a payment method to start creating resources on Northflank, regardless of plan selection. This is to verify user identity, and prevent malicious usage of the platform. However, with our easily configurable [billing alerts](billing.md#monitor-spending-set-up-billing-alertss) - you don’t need to worry about surprise bills.

You can manage billing for multiple teams using [organisations](collaborate.md#manage-an-organisation).

Create [a bespoke plan with our team](https://cal.com/team/northflank/northflank-enterprise) to meet your requirements, and [enable SSO and directory sync](collaborate.md#manage-an-organisation-configure-single-sign-on-sso) for organisations.

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

You can change your plan from the billing page by clicking the edit icon  next to your current plan in the overview, or [click here](https://app.northflank.com/s/account/billing/plans) and select the account to change the plan for.

If you want to downgrade your plan, your team cannot contain more resources than your desired plan supports.

[View Northflank's plans and costs for resources, storage, and networking](https://northflank.com/pricing).

### Pricing on Northflank: Usage-based billing on Northflank's managed cloud

Use Northflank's secure and scalable infrastructure to the fullest, and access all the platform's features while only paying for the resources you actually use.

Your running services and volumes will be prorated to the second of usage, and all costs clearly displayed by service, project, and account so there's no surprises at the end of your monthly billing cycle.

You can quickly and easily scale up or down resources and available instances for your build services, deployments, and storage to meet your needs at any given time.

Your quotas for resources available to your account depends on your [billing plan](billing.md#pricing-on-northflank-select-a-billing-plan).

### Pricing on Northflank: Bring your own cloud

You can use your existing billing relationships with cloud providers (including commitments or credits) for infrastructure costs by [deploying into your own cloud provider accounts](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

Northflank will charge a flat fee for each cluster, vCPU, and GB of memory deployed using the platform, as well as any variable costs for network egress and storage on Northflank's infrastructure.

See [infrastructure pricing](https://northflank.com/pricing#plans) for bring your own cloud fees and compare costs with Northflank’s managed cloud, and use the pricing calculator to estimate your monthly spend.

You can view the total number of clusters, vCPU, and memory provisioned in your cloud providers on your clusters page. Your BYOC usage will be displayed on your billing page, with your monthly spend broken down in your current usage and invoices.

You can trial deploying into your own cloud account on Northflank's Developer Sandbox plan and upgrade your plan for unlimited usage.

> [!note]
> [Click here](https://app.northflank.com/s/account/billing/plans) to select a plan to run workloads on your preferred cloud provider.

### Pricing on Northflank: Next steps

- [Add a card: Add a credit or debit card to your user or team account, and select the card to charge.](billing.md#add-a-card)
- [Monitor spending: Monitor your current resource usage across services.](billing.md#monitor-spending)
- [Configure billing alerts: Set up alerts to notify you if your spend exceeds a specified amount.](billing.md#monitor-spending-set-up-billing-alerts)
- [View invoices: View your monthly Northflank invoices with detailed breakdowns of usage and cost.](billing.md#view-invoices)
- [Pay an invoice: Find and pay an overdue invoice.](billing.md#pay-an-invoice)
- [Add your tax ID: Add your VAT ID for your business.](billing.md#add-your-tax-id)

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

You can view past invoices on the billing page in your account settings, and the due date for your next invoice. A summary of recent invoices is shown and you can select an invoice from the list for the full breakdown by project and service.

The invoice list will display the status, date the invoice was issued, the time period covered by the invoice, and the total amount (including VAT).

> [!note]
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
