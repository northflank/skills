# Network

Generated from 10 application pages listed in `llms.txt`.

## Pages

- [Add security policies for ports](#add-security-policies-for-ports)
- [Configure egress IPs](#configure-egress-ips)
- [Configure load balancers](#configure-load-balancers)
- [Configure ports](#configure-ports)
- [Create path-based security policies](#create-path-based-security-policies)
- [Enable multi-project networking](#enable-multi-project-networking)
- [Expose your application](#expose-your-application)
- [Select a load balancing strategy](#select-a-load-balancing-strategy)
- [Networking on Northflank](#networking-on-northflank)
- [Use Tailscale](#use-tailscale)

## Add security policies for ports

Source: https://northflank.com/docs/v1/application/network/add-security-policies-for-ports.md

You can configure security policies for a service's port. Port security policies apply to all public DNS entries and paths assigned to the port.

To configure a port-wide security policy, expand the custom domains & security rules menu for a port and add a new IP policy, credentials, or select an organisation for SSO access control.

### Add security policies for ports: Set IP policies

IP policies allow you to either block IP addresses from accessing a port, or to only allow certain IP addresses and exclude all others. You can use this feature to, for example:

- Block the IP ranges of certain countries to meet legal requirements

- Block the IP addresses of malicious actors

- Allow only the IP addresses of your employees or clients to help secure a website or data

- Allow only the IP address for a required external service

You can set IP policies for a specific port from the security rules section of the ports & DNS page of combined and deployment services.

![Configuring IP policies for a port for a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/network/set-ip-policies/ip-policy.png)

You can enter specific IP addresses or use [CIDR blocks](https://www.ripe.net/about-us/press-centre/understanding-ip-addressing) to allow or deny ranges of IP addresses. For example, `192.168.0.0/24` would apply your policy to IP addresses in the range `192.168.0.0` - `192.168.0.255`.

Allowing an IP address, or a range of addresses, will block all other IP addresses.

Denying an IP address will always take precedence over allowing an IP address, so it isn't possible to deny a range of IP addresses and allow specific ones within that range. You can, however, allow a range of IP addresses and deny specific IP addresses within the range.

You can apply rules to one or multiple ports, and apply different policies to different ports on the same service.

### Add security policies for ports: Require credentials

Basic authentication is a simple method to prevent unwanted access to a website or endpoint. If you have added basic authentication to a port users will need to enter a valid username and password in the browser prompt to access your service, or send an [authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) with their HTTP requests.

You can add basic access authentication to a specific port from the security rules section of the ports & DNS page of deployment and combined services.

You can add multiple username and password combinations to the same port.

![Configuring basic authentication on a port for a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/network/configure-basic-authentication/basic-authentication.png)

### Add security policies for ports: Use SSO provider

You can require users to authenticate via your SSO provider before they can access your Northflank service.

> [!note] Requirements
> You will need the following to get started:

- A team that's part of an [organisation](collaborate.md#manage-an-organisation)
- [Single sign-on](collaborate.md#manage-an-organisation-configure-single-sign-on-sso) configured for your organisation
- [Directory sync](collaborate.md#manage-an-organisation-sync-your-directory) enabled

You can require SSO authentication for a port on a service by expanding the custom domains & security rules option.

Select your organisation's ID and choose the directory groups you want to be able to access the service via the port.

You can enforce internal traffic through the SSO authentication flow, which means that requests made using [private networking](network.md#configure-ports-private-ports) will need to authenticate. This applies to other services, as well as any users using [port forwarding](../api/forwarding.md) with the Northflank CLI.

You can allow internal traffic to skip the SSO authentication flow for requests using a [public DNS](network.md#configure-ports-public-ports), which includes traffic from the same project or projects with ingress permissions from [multi-project networking](network.md#enable-multi-project-networking).

These enforce/allow options are mutually exclusive. The default behaviour allows private networking to skip authentication, but requires authentication for all traffic accessing the port via public endpoints.

### Add security policies for ports: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)

## Configure egress IPs

Source: https://northflank.com/docs/v1/application/network/configure-egress-ips.md

> [!note] Using BYOC or managed cloud?
>

- **Using Northflank's managed cloud?** You're in the right place.

- **Using BYOC clusters?** See [Configure static egress IPs for BYOC](bring-your-own-cloud.md#configure-static-egress-ips).

Egress IPs provide a dedicated, static public IP address for outbound traffic from selected workloads. By default, outbound requests from your services use shared, unpredictable IP addresses. With an egress IP, outbound traffic routes through a single, fixed IP address that you can share with third parties for firewall allowlisting.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/egress-ips) to view your egress IPs.

### Configure egress IPs: Create an egress IP

1. Navigate to [**Cloud** → **Egress IPs**](https://app.northflank.com/s/account/cloud/egress-ips) from your team menu

2. Click **Create egress IP**

#### Configure egress IPs: Basic information

1. **Name**: Provide a name for the egress IP

2. **Description**: (Optional) Describe the purpose

3. **Provisioning mode**: Select **Dedicated** (provisions an isolated IP for your team)

4. **Region**: Choose the region where the IP will be provisioned

**Note:** Region and provisioning mode cannot be changed after creation.

#### Configure egress IPs: Configuration

1. **Mode**: Select **Include** (only specified workloads use this IP)

#### Configure egress IPs: Rules

Configure which workloads route traffic through the egress IP:

1. Click **Add rule**

2. Select a project

3. Choose restriction mode:

  - **Restrictions disabled**: All services and jobs in the project use the egress IP

  - **Restrictions enabled**: Only specific services and jobs you add use the egress IP

4. If restrictions enabled, add specific services and jobs

5. Add additional projects as needed

**Addon exclusion:** Addon traffic (managed databases, etc.) is never routed through the egress IP, even if the project is included in rules.

#### Configure egress IPs: Create

Click **Create egress IP** to provision the infrastructure. Provisioning typically takes a few minutes.

### Configure egress IPs: Update egress IP rules

To modify which workloads use an egress IP:

1. Navigate to the egress IP settings

2. Update rules:

  - Add or remove projects

  - Enable or disable restrictions per project

  - Add or remove specific services/jobs

3. Click **Update egress IP**

**Note:** You can only edit egress IPs in the **Active** or **Error** state. Editing is locked during staging, loading, deleting, or deleted states.

### Configure egress IPs: Lifecycle states

Egress IPs progress through these states:

| Status | Description |
| --- | --- |
| Staging | Created or updated, provisioning starting |
| Loading | Infrastructure being set up (typically a few minutes) |
| Active | Operational - IP assigned and traffic routing |
| Error | Provisioning failed - platform will retry automatically |
| Deleting | Being torn down |
| Deleted | Fully removed |

Once an egress IP reaches the **Active** state, you'll see the assigned static IP address. Share this IP with third parties for allowlisting.

### Configure egress IPs: Template support

Egress IPs can be included in Northflank templates for infrastructure as code.

Example template node:

```json
{
  "kind": "EgressIp",
  "spec": {
    "name": "production-egress-ip",
    "description": "",
    "spec": {
      "provisioningMode": "dedicated",
      "region": "europe-west",
      "mode": "include",
      "rules": [
        {
          "id": "${refs.production-project.id}",
          "restrictions": {
            "enabled": true,
            "resources": [
              {
                "type": "service",
                "id": "${refs.production-project.id}/${refs.web-service.id}"
              }
            ]
          }
        }
      ]
    }
  }
}
```

### Configure egress IPs: Important notes

**Region locked after creation:**

- Cannot change region once created

- To use a different region, delete and recreate the egress IP

**Provisioning mode locked after creation:**

- Cannot change from Dedicated to other modes after creation

**Addon traffic excluded:**

- Managed database connections and other addon traffic never route through egress IPs

- This applies even if the addon's project is included in rules

**Provisioning time:**

- Initial provisioning takes a few minutes (up to ~10 minutes)

- IP is assigned once cloud infrastructure is fully set up

### Configure egress IPs: Use cases

**Third-party API allowlisting:**

- External APIs require your IP for firewall rules

- Share your egress IP for allowlisting

- All outbound API calls originate from this IP

**Compliance requirements:**

- Organization requires predictable, auditable outbound IPs

- Configure egress IPs for production workloads

- Document IPs for security audits

**Partner integrations:**

- Partner systems only accept traffic from known IPs

- Provision egress IP and share with partner

- Route integration traffic through the static IP

### Configure egress IPs: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Set IP policies: Allow or deny access to services based on IP addresses.](network.md#add-security-policies-for-ports-set-ip-policies)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)

## Configure load balancers

Source: https://northflank.com/docs/v1/application/network/configure-load-balancers.md

Load balancers provide a stable public IP address for routing external TCP or UDP traffic to your services and addons. They operate at Layer 4, distributing connections across one or more backends. Managed at the team level, a single load balancer can route traffic to workloads across multiple projects.

> [!note]
> [Click here](https://app.northflank.com/s/account/cloud/load-balancers) to view your load balancers.

### Configure load balancers: Create a load balancer

To create a load balancer:

1. Navigate to **Cloud** → **Load balancers** from your team menu

2. Click **Create load balancer**

#### Configure load balancers: Basic information

1. **Name**: Provide a name for the load balancer

2. **Description**: (Optional) Describe the purpose

3. **Protocol**: Select **TCP** or **UDP**

#### Configure load balancers: Target

Choose where the load balancer is provisioned:

**For PaaS (managed cloud):**

- Select a **region** (e.g., `europe-west`, `us-east`)

**For BYOC:**

- Select a **specific cluster**

- Your cluster must support the provisioning of load balancers (contact support if needed)

#### Configure load balancers: Ports

Configure which ports the load balancer listens on. You can specify:

- **Single port**: `80`

- **Multiple ports**: `80,443,8080`

- **Port range**: `8000-9000`

You can configure up to **100 ports** per load balancer.

**Restriction:** Ports 30000-32767 are reserved and cannot be used.

#### Configure load balancers: Backends

For each port, configure one or more backends to receive traffic.

**For each backend, specify:**

1. **Project**: Select the project containing the service or addon

2. **Service or addon**: Select the backend workload

3. **Container port**: The port on the service/addon (1-65535)

4. **Weight**: Traffic proportion (1-100)

**Backend requirements:**

- Services must be running (not paused)

- Projects must be deployed in the same region or cluster as the load balancer

- For addon backends, only PostgreSQL is currently supported

**Traffic weights:**
Weights across all backends for a port must sum to **100**. Traffic is distributed proportionally based on these weights.

#### Configure load balancers: Create

Click **Create load balancer** to provision the infrastructure. Provisioning typically takes a few minutes.

### Configure load balancers: Configure traffic distribution

Each backend's traffic share is its weight divided by the total weight across all backends for that port. Weights must sum to 100.

| Backend | Weight | Traffic share |
| --- | --- | --- |
| Backend A | 60 | 60% |
| Backend B | 25 | 25% |
| Backend C | 15 | 15% |

### Configure load balancers: Update load balancers

To modify an existing load balancer:

1. Navigate to the load balancer settings

2. Update configuration:

  - Add or remove ports

  - Add, remove, or modify backends

  - Adjust backend weights

3. Click **Update load balancer**

**Important:** Updating a load balancer triggers re-provisioning. There may be a brief traffic interruption during the update.

### Configure load balancers: Lifecycle states

Load balancers progress through these states:

| Status | Description |
| --- | --- |
| Pending | Created, waiting to be set up |
| Provisioning | Infrastructure is being provisioned |
| Provisioned | Live and routing traffic - IPs available |
| Error | Provisioning failed - platform will retry automatically |
| Deleting | Being torn down |

Once a load balancer reaches **Provisioned** state, you'll see one or more public IP addresses. Point your DNS A records to these IPs.

### Configure load balancers: DNS configuration

To use a custom domain:

1. Wait for the load balancer to reach **Provisioned** state

2. Copy the public IP address

3. Create an A record in your DNS provider pointing to the load balancer IP

Example: `app.example.com  A  203.0.113.42`

### Configure load balancers: Template support

Load balancers can be included in Northflank templates for infrastructure as code.

**Example template node:**

```json
{
  "kind": "LoadBalancer",
  "ref": "production-lb",
  "spec": {
    "name": "production-load-balancer",
    "description": "Load balancer for production traffic",
    "spec": {
      "type": "tcp",
      "target": {
        "type": "region",
        "targetId": "europe-west"
      },
      "ports": [
        {
          "id": "port-80",
          "port": "80",
          "backends": [
            {
              "id": "${refs.production-project.id}/${refs.web-service.id}",
              "type": "service",
              "port": 8080,
              "weight": 100
            }
          ]
        },
        {
          "id": "port-443",
          "port": "443",
          "backends": [
            {
              "id": "${refs.production-project.id}/${refs.web-service.id}",
              "type": "service",
              "port": 8443,
              "weight": 100
            }
          ]
        }
      ]
    }
  }
}
```

### Configure load balancers: Important notes

**No TLS termination:** Load balancers operate at Layer 4 only. Handle TLS in your application, or use Northflank's built-in domains for HTTP workloads.

**No rate limiting:** Load balancers do not provide rate limiting or connection limits. Implement these at the application level.

**BYOC and BYOK clusters:** Load balancers use the Kubernetes Gateway API with automated provisioning on the cloud provider side. BYOC clusters support load balancers (on AWS, provisioned as Network Load Balancers). For BYOK clusters, contact support to confirm whether your cloud provider supports this feature.

### Configure load balancers: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Set IP policies: Allow or deny access to services based on IP addresses.](network.md#add-security-policies-for-ports-set-ip-policies)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)

## Configure ports

Source: https://northflank.com/docs/v1/application/network/configure-ports.md

You can expose as many ports per deployment, public and private, as you require, and link each public port with a [subdomain](domains.md#link-a-domain-to-a-port).

You can add ports required by your application manually, or Northflank can automatically detect ports exposed by your Dockerfile.

Ports can be added while creating your deployment, or afterwards from the ports & DNS page on deployment and combined services. Updating ports on your deployments will not require a restart.

| Protocol | Uses | Can be made public? |
| --- | --- | --- |
| HTTP(S)/1.1 | Common web servers, websockets | Yes |
| HTTP(S)/2 | Modern web servers, [gRPC](https://grpc.io/), websockets | Yes |
| TCP | Common applications | No |
| UDP | Real-time communication, media and game servers, VoIP, DNS | No |

You can use any port from 1 to 65535 (ports for web servers are often 80, 443, 3000, 8000, and 8080).

![Configuring ports for a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/network/configure-ports/public-private-ports.png)

### Configure ports: Public ports

Public ports allow your application to receive and send traffic from clients on the internet. Only HTTP and HTTP/2 ports can be publicly exposed.

> [!note]
> HTTP and HTTP/2 public ports work out of the box and need no additional cluster configuration. TCP and UDP ports cannot be made public directly — to reach a TCP or UDP service from the internet, route traffic to it through a [load balancer](https://northflank.com/docs/v1/application/configure-load-balancers), which provides a stable public IP at Layer 4.

Public ports are automatically assigned a Northflank domain name, secured with an automatically-generated TLS certificate. They take the format:

`[port-name]--[service-name]--[random-string].code.run`

Public ports can be also linked to [your own subdomain](domains.md#link-a-domain-to-a-port).

Your application can be configured to listen on any port for HTTP/S traffic. Northflank will expose your HTTP ports publicly on ports 80 and 443 and route traffic to your configured port. HTTP (port 80) traffic will be automatically redirected to HTTPS (port 443).

For example:

| Application port | Port configuration on Northflank | Ports exposed by Northflank |
| --- | --- | --- |
| 80 | 80, HTTP, publicly exposed | 80, 443 |
| 3000 | 3000, HTTP, publicly exposed | 80, 443 |

### Configure ports: Private ports

You can create a private port for any protocol supported on Northflank.

Applications in your project will be able to access the private ports simply by referring to the service name and port in the following format:

`[service-name]:[port-number]`

Internal traffic in your project is managed with round-robin load-balancing between replicas.

You can forward private ports using the Northflank [CLI, API, or JavaScript client](../api/forwarding.md).

If required, internal traffic between your containers can be encrypted with mTLS. Contact [[support@northflank.com](mailto:support@northflank.com)](mailto:support@northflank.com) to discuss your requirements.

### Configure ports: Detect ports

When you create a new deployment Northflank will scan the image manifest and attempt to identify and add the ports exposed by the image. You can also detect ports from the ports & DNS page on a service. You should always verify that the ports are correct for your deployment.

You can expose ports in your Dockerfile in the following ways:

```Dockerfile
# HTTP port (public by default)
EXPOSE 3000
# TCP port (private)
EXPOSE 2121/tcp
# UDP port (private)
EXPOSE 7171/udp
```

### Configure ports: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Set IP policies: Allow or deny access to services based on IP addresses.](network.md#add-security-policies-for-ports-set-ip-policies)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)

## Create path-based security policies

Source: https://northflank.com/docs/v1/application/network/create-path-based-security-policies.md

You can configure security policies by path for each port on a service. Security policies consist of rules, which are a group of paths and a group of security policies. This allows you to use the same security policy for multiple paths, and create different security policies for different paths.

### Create path-based security policies: Allow internal traffic to skip security policies

By default, all requests to the service's port using the [public endpoints](network.md#configure-ports-public-ports) will trigger the security policies. Only traffic using the [internal, private DNS](network.md#configure-ports-private-ports) will be able to access the service without passing the security policies.

You can allow your team's resources to skip the security policies for requests using a public DNS, which includes traffic from the same project or from resources in projects with ingress permissions from [multi-project networking](network.md#enable-multi-project-networking).

### Create path-based security policies: Create a security policy

To configure security policies, expand the custom domains & security rules menu for a port and enable security policies. You can enable or disable all security policies for a port using this toggle.

#### Create path-based security policies: Create a rule

You can add rule to create a new rule, and enable or disable individual rules with their respective protected toggles. You can add multiple rules to a port. Each rule consists of one or more paths, and one or more security policies.

#### Create path-based security policies: Add a path

You must add at least one path to your rule. If you add multiple paths, the policies will apply to all matching paths in the rule. Paths consist of a URI (for example `/login`), the routing mode, and the priority.

##### Create path-based security policies: Routing mode

- Exact will route only the specific path, and not subpaths

- Prefix will route the given path and all subpaths

- RegEx will route paths that match the given regular expression

##### Create path-based security policies: Priority

Rules will match paths based on their priority in descending order. The rule with the highest priority that contains the matching path will override any other rules that match this path with a lower priority.

#### Create path-based security policies: Add a policy

You can add one or more security policies to a rule. This allows you to include, for example, IP allow lists as well as IP block lists, or combine an IP allow list with basic authentication.

You can add policies to an `AND` group or an `OR` group.

- `&& AND` requires users to pass all security policies in this group

- `|| OR` requires users to pass at least one security policies in this group

You can include policies from both groups. For example, you could add multiple credential policies in the `OR` group to allow for multiple basic auth username and password combinations, and an IP address policy and a HTTP header policy in the `AND` group. This would require users to match only one of the credential policies, but also the other security policies.

### Create path-based security policies: Set IP policies

IP address policies allow you to either deny IP addresses from accessing a service, or to only allow certain IP addresses and exclude all others.

You can use this feature to, for example:

- Block the IP ranges of certain countries to meet legal requirements

- Block the IP addresses of malicious actors

- Allow only the IP addresses of your employees and clients

- Allow only the IP address for a required external service

You can enter specific IP addresses or use [CIDR blocks](https://www.ripe.net/about-us/press-centre/understanding-ip-addressing) to allow or deny ranges of IP addresses. For example, `192.168.0.0/24` would apply your policy to IP addresses in the range `192.168.0.0` - `192.168.0.255`.

Allowing an IP address, or a range of addresses, will block all other IP addresses.

Denying an IP address will always take precedence over allowing an IP address, so it isn't possible to deny a range of IP addresses and allow specific ones within that range. You can, however, allow a range of IP addresses and deny specific IP addresses within the range.

You can add multiple IP address policies using the `&& AND` group.

### Create path-based security policies: Require credentials

The credentials policy includes methods to require a username/password combination before accessing the service.

#### Create path-based security policies: Basic authentication

Basic authentication is a simple method to prevent unwanted access to a website or endpoint. Users will need to enter a valid username and password in the browser prompt to access your service, or send an [authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) with their HTTP requests.

You can add multiple username and password combinations to the same rule by adding policies to the `|| OR` group.

### Create path-based security policies: Allow based on HTTP header

You can allow access to a service based on [HTTP header](https://developer.mozilla.org/en-US/docs/Glossary/HTTP_header) content.

Northflank will check for the presence of a key/value pair in the header of a HTTP request, and allow or deny access based on whether it matches the key/value in the security policy. The value for the specified key can be evaluated against the exact string given, or as a regular expression.

This can be used to restrict access to requests based on a manually-set key/value pair, or by detecting a header like `Origin` to only allow requests from specified sources.

### Create path-based security policies: Use SSO provider

You can require users to authenticate via your SSO provider before they can access your Northflank service.

> [!note] Requirements
> You will need the following to get started:

- A team that's part of an [organisation](collaborate.md#manage-an-organisation)
- [Single sign-on](collaborate.md#manage-an-organisation-configure-single-sign-on-sso) configured for your organisation
- [Directory sync](collaborate.md#manage-an-organisation-sync-your-directory) enabled

Select your organisation's ID and choose the directory groups you want to grant access to.

You can enforce internal traffic through the SSO authentication flow, which means that requests made using [private networking](network.md#configure-ports-private-ports) will need to authenticate. This applies to other services, as well as any users using [port forwarding](../api/forwarding.md) with the Northflank CLI. This cannot be enabled at the same time as [allowing internal traffic to skip security policies](network.md#create-path-based-security-policies-allow-internal-traffic-to-skip-security-policies).

You can also choose to set the authentication cookie on the root domain. This means that if you also require SSO authentication to access different subdomains or paths that the user only has to authenticate once.

Only one SSO authorisation can be added per `AND`/`OR` group.

### Create path-based security policies: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)

## Enable multi-project networking

Source: https://northflank.com/docs/v1/application/network/enable-multi-project-networking.md

Projects on Northflank are, by default, self-contained, secure networks. Other than by [publicly exposing](network.md#configure-ports-public-ports) or [securely forwarding](../api/forwarding.md) a service or addon, resources in your project remain accessible only to other resources within the same project.

You can, however, configure projects to securely allow ingress network traffic from other projects, without publicly exposing them to the internet. This allows your services access to resources in other projects that would normally be inaccessible, for example to query a database or access an API that you do not want to expose to the public internet.

### Enable multi-project networking: Allow ingress from other projects

You can configure which projects are allowed network ingress on the [project's settings page](https://app.northflank.com/s/project/settings).

You can only allow ingress for projects which are in the same team, and deployed on the same cluster. For example, you cannot enable ingress to a project hosted on Northflank's managed cloud from a [project hosted on another provider](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank).

Select the projects you want to allow access to the project you are configuring. Enabling ingress for a project is one-way, and does not also enable egress. To access to resources across both, or multiple, projects, you will need to allow ingress in each project respectively. See the table below for an example.

| Project | Ingress projects | Can access |
| --- | --- | --- |
| A | B, C | - |
| B | C | A |
| C | - | A, B |

To disable access, simply remove the projects from the ingress projects list.

![Allowing ingress networking from another project in the Northflank application](https://assets.northflank.com/documentation/v1/application/network/enable-multi-project-networking/multi-project-networking.png)

### Enable multi-project networking: Access resources from other projects

#### Enable multi-project networking: Access services

When you allow ingress to a project, ports on combined and deployment services in the project will be assigned a new address listed under `ingress projects`. These addresses will only allow access from the projects specified in the network ingress settings.

![Multi-project network addresses in the Northflank application](https://assets.northflank.com/documentation/v1/application/network/enable-multi-project-networking/project-network-dns.png)

#### Enable multi-project networking: Access addons

You can use the same connection details to access addons from other projects as you do to access the addon from within the same project.

### Enable multi-project networking: Next steps

- [Network security: Set IP policies and add basic authentication to your deployments.](network.md#networking-on-northflank)
- [Add private ports: Configure ports to allow your services to communicate securely within your project.](network.md#configure-ports-private-ports)
- [Forward deployments and databases: Forward deployments and databases to your local machine for development.](../api/forwarding.md)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)

## Expose your application

Source: https://northflank.com/docs/v1/application/network/expose-your-application.md

You will need to expose the relevant port(s) in your application to make it available on private or public networks if this is not configured by default.

If you're using a [Dockerfile](build.md#build-with-a-dockerfile) you should use the [EXPOSE](https://docs.docker.com/engine/reference/builder/#expose) command to specify which [ports the container listens on](https://docs.docker.com/engine/reference/builder/#expose). This does not expose the ports in your application, but informs Northflank which ports your deployment should publish.

You may need to specifically bind your application to all available IP addresses by specifying the hostname as `0.0.0.0` in order to accept incoming connections from the container it is running in, while some applications bind to this hostname by default.

Below is a list of commonly-deployed applications and examples of the necessary commands to run them on the desired port. You should refer to the documentation for the language or framework you are using for more detailed information, and use [environment variables](secure.md#inject-secrets) rather than hardcoded settings where possible.

### Expose your application: Node

To run a [Node server](https://nodejs.org/en/), the server must be bound to hostname `0.0.0.0` and given a port to listen on. Specify the port in the Dockerfile and call your main file with the `node` command.

##### Expose your application: App example

```js
const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname);
```

##### Expose your application: Docker commands example

```Dockerfile
EXPOSE 3000
CMD ["node", "index.js"]
```

### Expose your application: NGINX

Many web applications use [NGINX](https://www.f5.com/products/nginx) to serve a generated site, for example [Angular](https://github.com/northflank-examples/angular-js-example). By default, NGINX listens on port 80, but this can be changed in the [NGINX configuration file](https://docs.nginx.com/nginx/admin-guide/web-server/web-server/) if required.

##### Expose your application: Docker commands example

```Dockerfile
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Expose your application: Express

To serve an [Express.js application](https://expressjs.com/), ensure the Express application is set to listen on your desired port, then expose that port in the Dockerfile and include the command to run the server.

You can find an example of a [Node Express Server in this repository](https://github.com/northflank-examples/node-express-example).

##### Expose your application: Application example

```javascript
const express = require('express');
const app = express();
const port = 80;

app.listen(port);
```

##### Expose your application: Docker commands example

```Dockerfile
EXPOSE 80
CMD [ "yarn", "run", "start" ]
```

### Expose your application: Next

A [Next.js application](https://nextjs.org/) runs by default on hostname `0.0.0.0` and port `3000`. You can change the port by adding an [environment variable](run.md#inject-runtime-variables) called `PORT`, with the value of the port you want to use. You should update your [Dockerfile](build.md#build-with-a-dockerfile) and the [network settings](network.md#configure-ports) of any deployments to reflect the new port.

You can find an example of a [Next.js application in this repository](https://github.com/northflank-examples/next-js-example).

##### Expose your application: Docker commands example

```Dockerfile
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
```

### Expose your application: Flask

To run a Python [Flask application](https://palletsprojects.com/p/flask/) you will need to include a [WSGI server](https://flask.palletsprojects.com/en/2.2.x/deploying/).

You can find an example of a [Python Flask application in this repository](https://github.com/northflank-examples/python-flask-example). This example uses the [Waitress server](https://flask.palletsprojects.com/en/2.2.x/deploying/waitress/).

##### Expose your application: Application example

```python
if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=80)
```

##### Expose your application: Docker commands example

```Dockerfile
ENTRYPOINT ["python"]
CMD ["main.py"]

EXPOSE 80
```

### Expose your application: Django

To run a Python [Django application](https://www.djangoproject.com/) you will need to run the server with the command `python manage.py runserver`, binding to `0.0.0.0` with the port specified. The example below uses port `80`.

You can find an example of a [Python Django application in this repository](https://github.com/northflank-examples/python-django-example).

##### Expose your application: Docker commands example

```Dockerfile
EXPOSE 80
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
```

### Expose your application: PHP Laravel

To serve a [Laravel application](https://laravel.com/) you must run the PHP [artisan](https://laravel.com/docs/9.x/artisan) command to serve the site, binding to hostname `0.0.0.0` with the option `--host=`. You can use the option `--port=` to specify the port to listen on.

You can find an example of a [Laravel application in this repository](https://github.com/northflank-examples/php-laravel-example).

##### Expose your application: Docker commands example

```Dockerfile
CMD [ "php", "artisan", "serve", "--host=0.0.0.0", "--port=80" ]
EXPOSE 80
```

### Expose your application: Ruby on Rails

To serve a [Ruby on Rails application](https://rubyonrails.org/), you must expose the port (default `3000`) and run the Rails server, bound to `0.0.0.0`.

You can find an example of a [Ruby on Rails application in this repository](https://github.com/northflank-examples/ruby-on-rails-example).

##### Expose your application: Configuration example

While developing on your local machine, your Rails server will be available on `localhost`, however you will need to authorize hosts to make it accessible when deployed.

You can configure your application to accept connections on Northflank by adding the following to the relevant environment configuration file in `config/environments`. The `NF_HOSTS` environment variable is injected to all runtime containers on Northflank and contains all the configured [domain names](network.md#configure-ports-public-ports) for the server.

```rb
if ENV["NF_HOSTS"].present?
     config.hosts = ENV["NF_HOSTS"]
end
```

##### Expose your application: Docker commands example

```Dockerfile
EXPOSE 3000
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
```

### Expose your application: Rust

To serve a [Rust application](https://rust-lang.org/) you can use a web application framework, in our example we use [nickel](https://nickel-org.github.io/) to listen on port `6767`, and bound to `0.0.0.0`.

You can find an example of a [Rust application in this repository](https://github.com/northflank-examples/rust-example).

##### Expose your application: Rust application example

```rust
#[macro_use] extern crate nickel;

use nickel::{Nickel, StaticFilesHandler};

fn main() {
    let mut server = Nickel::new();
    server.utilize(StaticFilesHandler::new("static/"));
    server.listen("0.0.0.0:6767").unwrap();
}
```

##### Expose your application: Docker commands example

```Dockerfile
EXPOSE 6767
CMD ["./rust-docker-web"]
```

### Expose your application: Next steps

- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)

## Select a load balancing strategy

Source: https://northflank.com/docs/v1/application/network/load-balancing.md

Northflank routes external traffic to your instances using scalable, secure, and highly performant load balancers.

By default, traffic will be distributed using the least-connection strategy. You can select the load-balancing strategy for a combined or deployment service in the networking section when creating it, or change it on the networking page of an existing service. Changes will take effect immediately and do not require redeployment.

If an instance is replaced then requests will be routed to a new instance using the same strategy.

### Select a load balancing strategy: Least connection

Least-connection selects the pod with the least current open connections. This approach helps ensure even distribution of traffic across your instances, especially when requests can vary in duration and resource usage.

### Select a load balancing strategy: Consistent hashing

Consistent hashing can be used to create "sticky sessions", consistent connections between users and a specific instance.

You can choose different hash modes depending on your requirements:

Client IP address mode will use the IP address of the request to route requests to the same instances.

Custom header allows you to set the [HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers) to use, for example `X-Sticky-Session`. The value of this header will be hashed to consistently route to the same instance. This also allows for multiple different users to be routed to the same instance.

### Select a load balancing strategy: Round robin

Round-robin balances requests by routing each request to the next instance in turn. This strategy is best if requests are fairly uniform in resource usage.

For example, with 2 instances: request 1 is routed to instance 1, request 2 is routed to instance 2, and request 3 is routed to instance 1.

### Select a load balancing strategy: Next steps

- [Expose ports in your application: Expose ports in your application to make it available for networking.](network.md#expose-your-application)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Set IP policies: Allow or deny access to services based on IP addresses.](network.md#add-security-policies-for-ports-set-ip-policies)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)

## Networking on Northflank

Source: https://northflank.com/docs/v1/application/network/networking-on-northflank.md

Northflank allows flexible and secure private and public networking for services, jobs, databases and other addons. HTTP, HTTP/2, Websockets, gRPC, TCP and UDP are all supported networking protocols.

Networking settings are accessed on the ports & DNS page on deployment and combined services, and on the settings page in the network section for databases and other addons.

### Networking on Northflank: Public networking

HTTP, HTTP/2, Websockets and gRPC can be exposed publicly via a load-balancer served with an auto-generated TLS certificate with either `code.run` endpoints or your own domains. HTTPS requests are terminated at the edge load-balancer and the request is then routed internally via Northflank’s network.

You can choose to [publicly expose databases](databases-and-persistence.md#access-a-database-expose-a-database-publicly) and other addons via a load-balanced TCP endpoint. Northflank will enforce and generate TLS certificates which will be automatically configured in the database and connection details.

Northflank will expose your HTTP ports publicly on ports 80 and 443 and route traffic to your configured ports. HTTP (port 80) traffic is automatically redirected to HTTPS (port 443).

- [Expose ports in your application: Expose ports in your application to make it available for networking.](network.md#expose-your-application)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Domains on Northflank: Manage your domains on Northflank, quickly and easily assigning them to your deployments.](domains.md#domains-on-northflank)
- [Expose a database with TLS: Secure internal database connections or expose it publicly with TLS.](databases-and-persistence.md#access-a-database)

### Networking on Northflank: Network security

You can configure security policies for individual ports, with allow/deny lists based on IP address, basic auth for endpoints, and SSO for organisations. You can also create granular security policies by subdomain path, for even greater control.

- [Set IP policies: Allow or deny access to services based on IP addresses.](network.md#add-security-policies-for-ports-set-ip-policies)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)
- [Use SSO access control: Use your organisation's SSO provider to authenticate access to your services.](network.md#add-security-policies-for-ports-use-sso-provider)
- [Configure security policies by path: Set security policies to restrict access to your endpoints based on port and subdomain path.](network.md#create-path-based-security-policies)

### Networking on Northflank: Private networking

Ports serving all protocols can be configured for private networking. Services, jobs and databases with private ports will only be accessible by other resources inside the same project.

Deployments and databases can be forwarded for secure, local access, without the need to publicly expose them to the internet.

You can enable multi-project networking to securely access resources from another Northflank project, and enable Tailscale in your projects to access resources in your Tailscale VPN.

- [Add private ports: Configure ports to allow your services to communicate securely within your project.](network.md#configure-ports-private-ports)
- [Forward deployments and databases: Forward deployments and databases to your local machine for development.](../api/forwarding.md)
- [Multi-project networking: Configure projects to securely allow ingress network traffic from other projects.](network.md#enable-multi-project-networking)
- [Use Tailscale: Allow secure access to Tailscale devices to resources within your project.](network.md#use-tailscale)

### Networking on Northflank: Load-balancing strategies

Northflank uses scalable and highly performant load balancers to securely distribute external traffic to services in your projects.

When you create a service you can select the load-balancing strategy to use, the default selects the instance with the least current traffic.

- [Select a load-balancing strategy: Choose the load-balancing strategy for your services.](network.md#select-a-load-balancing-strategy)

### Networking on Northflank: Headers

You can access the source IP of a request from the [X-Forwarded-For header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For), which is attached to all HTTP/S requests by the Northflank load balancer.

Request and response headers can also be managed by configuring path-based routing for your subdomains.

- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)

## Use Tailscale

Source: https://northflank.com/docs/v1/application/network/use-tailscale.md

You can enable Tailscale in a project to give your resources secure access to your Tailscale network. Your resources will be able to access Tailscale devices, and normal Northflank networking to public and private resources will continue to work as usual.

You will be able to access Tailscale devices from your Northflank resources by their IP addresses, or the fully-qualified domain name for the device (for example `device1.<id>.ts.net`). The shortened form of the Tailscale domain for a device will not work.

### Use Tailscale: Enable Tailscale

You will integrate Tailscale with Northflank using an OAuth client so that Northflank can automatically regenerate auth keys for your project.

#### Use Tailscale: Create a Tailscale tag

You'll need one or more [Tailscale tags](https://tailscale.com/kb/1068/tags) to create an OAuth Client for use with Northflank. You can use one tag for all your Northflank projects, or create and assign as many tags as you require.

To create a Tailscale tag, open your [access control](https://login.tailscale.com/admin/acls/file) page in Tailscale and add a new entry in the `tagOwners` object. You may need to add this object if you don't already have any tags.

Example Tailscale tag definition

```json
{
  "tagOwners": {
    "tag:northflank": [],
  }
}
```

You must leave tag owners empty, so it can be applied by your generated auth key.

#### Use Tailscale: Create an OAuth Client

To create your OAuth client open [OAuth clients](https://login.tailscale.com/admin/settings/oauth) on your Tailscale settings page, under Tailnet Settings. Select generate OAuth client, give it a recognisable description, and grant it write scope for `auth_keys`.

Add at least one tag for the `auth keys` scope, and click generate client. Copy the ID and secret somewhere secure or keep the page open while you configure Northflank, as you will not be able to access the values in full again.

#### Use Tailscale: Add your OAuth client to Northflank

Open your [project settings](https://app.northflank.com/s/project/settings) and enable Tailscale.

Copy the client ID and secret to the corresponding fields. Next, enter the Tailscale tags that are assigned to the `auth keys` scope of your OAuth client. They should be added in full, in the format `tag:name`.

You can now configure Tailscale for your project, detailed below, or click update to add Tailscale to your project.

> [!note] Identify your Northflank resources on Tailscale
> When you deploy new resources, or redeploy existing resources in your project after enabling Tailscale, they will appear in your Tailscale machines list. To identify a Northflank resource in Tailscale, open the resource in Northflank and navigate to the containers page for a service, or the job runs page for a job. The first two parts of the container name or the job run name, separated by a dash, will be the name of the machine listed in Tailscale. For example `proxy-54fcd583a7-adf5c` would appear as `proxy-54fcd583a7`.

### Use Tailscale: Restrict Tailscale access

Select restrict Tailscale to only allow specific resources access to your Tailscale network.

Resources are [restricted by Northflank tag](release.md#tag-workloads-and-resources). Select the tags that will allow Tailscale, and ensure the resources you want to have access are tagged appropriately.

### Use Tailscale: Accept advertised routes from your tailnet

You can choose to accept advertised routes from the Tailscale network. If you have [configured subnet routers](https://tailscale.com/kb/1019/subnets) in your Tailscale network this will allow you to access the other devices connected via the subnet.

Without enabling this feature your resources will only be able to access devices that have the Tailscale client installed on them directly.

### Use Tailscale: Auto-redeploy on key regeneration

All auth keys expire within 90 days. Running containers will not be disconnected from Tailscale, but if a container restarts (for example due to a crash), it will not be able to authenticate with the expired key.

You can enable auto-redeploy on key regeneration to automatically redeploy resources with then updated auth key to ensure they have access to your tailnet.

If Tailscale is restricted to specific [tagged resources](release.md#tag-workloads-and-resources), only resources using Tailscale will be redeployed when a new auth key is generated.

### Use Tailscale: Disable Tailscale

If you have restricted Tailscale you can disable specific resources from accessing Tailscale by either removing the tag from the resource, or by removing the tag from the Tailscale tag restrictions list, and redeploying the relevant resources.

If you want to disable Tailscale for all resources, uncheck enable tailscale sidecar, update, and redeploy the relevant resources.

### Use Tailscale: Next steps

- [Network security: Set IP policies and add basic authentication to your deployments.](network.md#networking-on-northflank)
- [Add private ports: Configure ports to allow your services to communicate securely within your project.](network.md#configure-ports-private-ports)
- [Forward deployments and databases: Forward deployments and databases to your local machine for development.](../api/forwarding.md)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)
