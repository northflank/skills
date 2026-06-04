# Northflank Enterprise

Source: https://northflank.com/docs/v1/application/enterprise.md

Northflank Enterprise is for teams running serious workloads at scale who need contractual uptime guarantees, direct access to engineering support, and platform capabilities built for stricter security, compliance, and nuanced infrastructure requirements. It covers everything from SSO and audit logging to air-gapped control planes, white label deployments, and custom disaster recovery configurations.

Many teams that move to Northflank Enterprise have outgrown simpler platforms or found that other tools didn't meet their deployment requirements, security requirements, or the complexity of their workloads.

It is not limited to large organisations. Any team that needs a guaranteed SLA, a dedicated support channel, or specific enterprise features can move onto this plan. Northflank remains fully self-service, Enterprise adds guarantees and capabilities on top of the same platform.

Northflank Enterprise is priced as an annual platform fee, with usage discounts available for PaaS and BYOC at certain spend thresholds.

To set up an Enterprise plan, [contact our team](https://cal.com/team/northflank/northflank-enterprise).

### Compliance & risk

| Feature | Description |
| --- | --- |
| SSO/SAML | Authenticate users through your identity provider |
| SCIM and JIT provisioning | Automate user and group synchronisation from your directory |
| Audit logs and SSO audit logs | Full record of platform and authentication events |
| Infrastructure audit events | Capture infrastructure-level events across your clusters |
| Template drafts | Save and review templates before publishing |
| WAF and DDoS protection | Layer 7 firewall and volumetric attack mitigation |
| Workload identities | Assign cloud provider identities directly to workloads |
| Advanced security proxy | Per port and path authentication and network security |
| Forward-deployed logging | Ship logs to your own logging infrastructure |
| Forward-deployed control plane | Run the Northflank control plane in your own environment |
| Advanced sandboxing (microVM) | Isolate workloads using microVM-based sandboxes |

### Platform API

| Feature | Description |
| --- | --- |
| White label platform | Deploy the Northflank platform under your own brand |
| White label VCS | Leverage Northflank's VCS integrations to power CI/CD under your own platform |
| White label notifications | Send platform notifications from your own domain and identity |
| White label workload domains | Serve default workload domains under your own vanity domain |
| Azure DevOps as a VCS provider | Connect Azure DevOps repositories to Northflank |
| Azure DevOps and GitLab linking via personal access token | Link accounts without requiring OAuth |
| GitHub Enterprise | Connect to a self-hosted GitHub Enterprise instance |

### Infrastructure

| Feature | Description |
| --- | --- |
| Org-level clusters | Define clusters once and share them across all teams in an organisation |
| Custom AWS launch templates | Use custom node pools and AMIs for your clusters |
| Managed Ceph as CSI driver | Use Northflank-managed Ceph for persistent storage |
| Multi read-write volumes (BYOC, Ceph-backed) | Mount volumes across multiple pods simultaneously |
| Custom labels and annotations (BYOC) | Apply custom Kubernetes metadata to workloads |
| BYOC overlay networking | Configure custom overlay networking for BYOC clusters |
| Azure CNI plugin mode | Use Azure CNI for advanced pod networking on AKS |
| TLS passthrough mode | Forward encrypted traffic without terminating TLS at the proxy |
| Alias domains for subdomains | Route subdomain traffic via aliases for use cases such as Cloudflare for SaaS |
| Gradual rollouts | Roll out changes incrementally using traffic splitting |

### Disaster recovery

| Feature | Description |
| --- | --- |
| High-frequency backup schedules | Take backups more frequently than standard plans allow |
| Custom backup destinations | Send backups to your own storage buckets |
| Global disaster recovery | Restore services across regions following a failure |
| Custom dump backup destinations | Direct database dumps to custom storage locations |

### Forward-deployed control plane

The forward-deployed control plane runs the Northflank control plane entirely within your own infrastructure. All platform operations, scheduling, and API traffic remain inside your network boundary, with no dependency on Northflank's managed cloud.

This is suited to deployments that cannot allow outbound connectivity to external services, such as air-gapped environments in regulated industries or secure government networks.

In this configuration:

- The Northflank control plane runs as workloads on your own clusters

- No platform data leaves your environment

- You retain full control over network policies and egress rules

- Updates to the control plane are delivered as versioned artefacts and applied on your schedule

> [!note] Note
> Forward-deployed control plane is available to Enterprise customers at specific spend thresholds or by arrangement, given the operational complexity involved in provisioning and supporting it. [Contact our team](https://cal.com/team/northflank/northflank-enterprise) to discuss whether this is right for your deployment.

### Northflank support

Enterprise customers have direct access to the Northflank engineering team via a dedicated Slack channel. This includes technical and engineering advice covering platform best practices and recommended use of Northflank primitives, such as resource configuration, CI/CD, release flows, pipelines, and templates.

### SLA

The Enterprise plan includes a 99.99% uptime SLA with a guaranteed response time to customer inquiries submitted via Slack or email.
