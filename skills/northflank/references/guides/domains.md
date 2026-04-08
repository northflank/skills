# Domains

Generated from 12 application pages listed in `llms.txt`.

## Pages

- [Add a domain to your account](#add-a-domain-to-your-account)
- [Certificate generation](#certificate-generation)
- [Add a Cloudflare domain to Northflank](#add-a-cloudflare-domain-to-northflank)
- [Add a Namecheap domain to Northflank](#add-a-namecheap-domain-to-northflank)
- [Add an NS1 domain to Northflank](#add-an-ns1-domain-to-northflank)
- [Add an OVH domain to Northflank](#add-an-ovh-domain-to-northflank)
- [Domains on Northflank](#domains-on-northflank)
- [Link a domain to a port](#link-a-domain-to-a-port)
- [Remove a domain](#remove-a-domain)
- [Use a CDN](#use-a-cdn)
- [Use path-based routing](#use-path-based-routing)
- [Wildcard domains and certificates](#wildcard-domains-and-certificates)

## Add a domain to your account

Source: https://northflank.com/docs/v1/application/domains/add-a-domain-to-your-account.md

To add your own domain and subdomains to your Northflank account you must have access to your DNS provider control panel in order to be able to modify the DNS records.

You can manage your domains and subdomains from the domains page in your Northflank account settings.

Domains and subdomains can both be linked to ports on a deployment after adding the required DNS records.

> [!note]
> [Click here](https://app.northflank.com/s/account/domains) to view your account domains page.

### Add a domain to your account: Add a domain

You can add the same domain to multiple accounts to be able to add subdomains, however only one account will be able to link the [apex domain](domains.md#add-a-domain-to-your-account-add-an-apex-domain) to a port.

To add a domain you will need to verify it by adding a DNS record on your DNS hosting service.

Click add domain on the domains page and enter your domain name (fully qualified domain name, for example `yourdomain.com`) to view instructions to verify that you control it.

Log in to the control panel on your DNS provider and find the DNS settings for your domain. Add a new text (TXT) record with the name and token shown on Northflank, and set the time to live (TTL) to the recommended or lowest value.

Return to Northflank to verify the domain, once verified you can begin adding subdomains.

Northflank automatically adds an entry for your apex domain, click verify to [add the necessary record](domains.md#add-a-domain-to-your-account-add-an-apex-domain) to use it with Northflank services.

![A verified domain in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/add-a-domain-to-your-account/domain-verified.png)

### Add a domain to your account: Add a subdomain

You can add as many subdomains as you require for each domain but each subdomain on Northflank is unique; multiple accounts cannot add the same subdomain.

You can create as many levels of subdomains as required (for example `one.yourdomain.com` or `three.two.one.yourdomain.com`).

To add a subdomain, select the domain namespace to add it to (`yourdomain.com`) and enter the subdomain to add (`one` or `three.two.one`).

After adding a subdomain you will see the name and token to add to your DNS records as a CNAME record, as well as the recommended time to live (TTL).

Log in to the control panel on your [DNS provider](domains.md#domains-on-northflank-dns-providers), find the DNS settings for your domain, and add the record with the information specified on Northflank.

![An unverified subdomain in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/add-a-domain-to-your-account/subdomain-unverified.png)

### Add a domain to your account: Verification

After adding the record for your domain or subdomain, return to your Northflank account's domains page and select verify on the entry for your domain or subdomain.

If it cannot be verified you may need to wait for the DNS to update, this will depend on the TTL set on the DNS host for the record. If it still fails to verify after the TTL has elapsed, check you have entered the record correctly and try again.

You can close the verification information to come back to it later, and view it again by clicking verify on the entry.

When successfully verified you can link the domain or subdomain to a public port on a deployment.

If your domain is proxied by your DNS provider, for example [Cloudflare proxy](domains.md#add-a-cloudflare-domain-to-northflank-add-and-verify-your-cloudflare-domains), you may need to disable this during verification and initial certificate generation when adding new domains.

### Add a domain to your account: Add an apex domain

Northflank automatically adds a subdomain entry for your apex domain, unless the apex domain is already associated with another Northflank account. Click verify to see the record content that you must add to your DNS provider to use it with Northflank services. You cannot link an apex domain name to a service if you have configured it using [wildcard redirect routing](domains.md#wildcard-domains-and-certificates).

Your DNS provider must support CNAME flattening in order to link an apex domain to your Northflank account. If you current provider does not support these records for apex domains, we recommend migrating to a service that does, such as [Cloudflare](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/).

### Add a domain to your account: Next steps

- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Use wildcard redirect routing: Configure your domains to use wildcard redirect routing to automatically verify subdomains added to Northflank.](domains.md#wildcard-domains-and-certificates-domain-routing)

## Certificate generation

Source: https://northflank.com/docs/v1/application/domains/certificate-generation.md

Northflank provides automatic certificate generation for your domains by default. Alternatively, you can upload certificates yourself.

> [!note]
> [Click here](https://app.northflank.com/s/account/domains) to view your account domains page.
Your services should automatically be able to connect to addons with TLS enabled. However, some applications may need [custom TLS configuration](databases-and-persistence.md#access-a-database-access-tls-certificates-in-services).

### Certificate generation: Automatic certificate generation

Northflank uses Let's Encrypt to provision TLS certificates on-demand, generated by Let's Encrypt. Certificates are created automatically and renewed before they expire, with 2048-bit RSA encryption.

Your [custom domains](domains.md#domains-on-northflank) can be linked to a service port and immediately start serving secure traffic with a managed Let's Encrypt certificate. A certificate will not be generated for a subdomain added to Northflank until it has been linked to a service's port.

Your custom domains will be subject to Let's Encrypt's [rate limits](https://letsencrypt.org/docs/rate-limits/).

- Certificates per registered domain: you can request 50 certificates per week for the same registered domain. This limit is applied to the root domain, and any subdomains will count towards the same limit. For example, `subdomain1.example.com` and `subdomain2.example.com` will both count towards the limit for `example.com`.

Please keep these limits in mind when creating new subdomains on Northflank and generating Let's Encrypt certificates for your domains via other channels.

You can reduce the number of certificates you need to generate by configuring a domain to use [wildcard certificates](domains.md#wildcard-domains-and-certificates-wildcard-certificate-generation). Wildcard certificates allow your subdomains to share a certificate, and are ideal for dynamically generating subdomains in Northflank [templates](infrastructure-as-code.md#infrastructure-as-code-on-northflank) and [preview environments](release.md#set-up-a-preview-environment).

> [!note] Cloudflare and certificates
> Cloudflare's advanced security features may cause issues when generating or renewing certificates. Read the [Cloudflare guide](domains.md#add-a-cloudflare-domain-to-northflank) on how to add and configure domains managed with Cloudflare.

### Certificate generation: Import a TLS certificate

Instead of using Northflank's automated certificate provisioning you can import your own TLS certificates, giving you full control over certificate management when required.

This approach is suitable if you already manage certificates externally (e.g. via Let’s Encrypt, DigiCert, Sectigo, GlobalSign, or other trusted CAs), or your organisation does not allow automated certificate generation.

When you [add a new domain](domains.md#add-a-domain-to-your-account-add-a-domain), select `wildcard via imported certificate` from the certificate generation drop-down menu under advanced options. You can then copy the certificate content and private key into Northflank and configure and verify the domain as normal.

Any new subdomains you create under the domain will use your own imported certificate, rather than a Northflank-generated Let's Encrypt certificate. Your certificate will need to cover any subdomains you want to add, see [wildcard certificate generation](domains.md#wildcard-domains-and-certificates-wildcard-certificate-generation) for more information.

You can update the certificate for a domain by opening the settings  for the domain. Expand the certificate import view, paste the new certificate and private key, and click update to begin using the new certificate.

![Importing a wildcard certificate in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/wildcard-domains-and-certificates/import-wildcard-certificate.png)

### Certificate generation: Next steps

- [Use wildcard certificates: Use wildcard certificate generation to avoid hitting certificate creation rate limits and dynamically generate subdomains.](domains.md#wildcard-domains-and-certificates-wildcard-certificate-generation)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)
- [Connect to an Addon with TLS: Ensure your service or job can connect to an addon using TLS.](databases-and-persistence.md#access-a-database-access-tls-certificates-in-containers)
- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)

## Add a Cloudflare domain to Northflank

Source: https://northflank.com/docs/v1/application/domains/domain-registrar-guides/add-a-cloudflare-domain-to-northflank.md

Configure your domain by following these instructions or read [Cloudflare's documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/) for more platform specific information.

Cloudflare features such as SSL/TLS encryption, caching, bot protection, and always online are only active while Cloudflare proxy is enabled for a domain. You can add a [custom security rule](domains.md#add-a-cloudflare-domain-to-northflank-configure-cloudflare-security-rules) to avoid issues with certificate regeneration while Cloudflare security features are active. Domains configured with [wildcard certificate generation](https://northflank.com/docs/v1/application/domains/domain-registrar-guides/wildcard-domains-and-certificates#wildcard-certificate-generation) do not require custom security rules for certificate regeneration.

> [!important]
> You cannot enable Cloudflare proxy while Northflank is verifying your subdomains. You can temporarily disable the proxy to verify the subdomain, generate an initial certificate, and re-enable the proxy afterwards.

### Add a Cloudflare domain to Northflank: Add and verify a Cloudflare domain

To add and verify Cloudflare domains and subdomains on Northflank:

1. [Add your domain to Northflank](domains.md#add-a-domain-to-your-account)

2. Open Cloudflare in a new browser tab or window and log in to your Cloudflare dashboard

3. Select the domain you are adding to Northflank

4. Select the DNS tab and add record

5. Open the type dropdown and scroll down to choose TXT to verify a domain namespace, or CNAME to add a subdomain

6. Copy the record name from Northflank into the name field

7. Set the TTL (time to live) to 2 minutes (you can select a higher value, but it might take longer to register changes) and disable the proxy

8. Copy the record content from Northflank into the target field and save the record

![Adding a TXT record to verify a domain on Cloudflare](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/cloudflare/cloudflare-domain.png)

1. Return to the domains page on Northflank and select verify on the entry for your domain

2. Your domain should verify shortly. If not, check you have entered the record correctly and try again.

3. Enable the proxy option for the record in Cloudflare, if desired

4. You can now [link your domain to a port](domains.md#link-a-domain-to-a-port)

> [!note]
> If subdomain records are created using the proxied setting the connection will use a Cloudflare certificate. Use DNS only to use a Northflank-generated certificate and to manually set the TTL.

#### Add a Cloudflare domain to Northflank: Add an apex domain

You can add an apex domain on Cloudflare by adding a CNAME record with `@` as the name and the Northflank generated content as the target.

![Adding a CNAME record to link an apex domain on Cloudflare](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/cloudflare/cloudflare-apex-cname.png)

### Add a Cloudflare domain to Northflank: Use the Cloudflare proxy

You can use the Cloudflare proxy with subdomains on Northflank, but you must disable the Cloudflare proxy for any DNS records you are using to verify with Northflank. If you have created a proxied record to verify your Northflank subdomain, disable the proxy and manually verify the domain on Northflank again.

You can configure the Cloudflare proxy for subdomains by selecting your domain on Cloudflare and navigating to the records page under DNS in the menu. Click edit to configure the proxy an individual record.

You will need to a [add custom security rule](domains.md#add-a-cloudflare-domain-to-northflank-configure-cloudflare-security-rules) or disable the Cloudflare proxy in order to generate the initial certificate for a subdomain. To generate a certificate for a subdomain you must first link it to a service in Northflank, which automatically triggers certificate generation. If certificate generation has been triggered while the Cloudflare proxy is enabled you can [add a custom security rule](domains.md#add-a-cloudflare-domain-to-northflank-configure-cloudflare-security-rules) or disable the proxy and re-trigger certificate generation from the subdomain settings in Northflank before re-enabling the Cloudflare proxy.

### Add a Cloudflare domain to Northflank: Configure Cloudflare SSL/TLS

You can configure Cloudflare's SSL/TLS encryption mode via the SSL/TLS overview in your Cloudflare dashboard. You are recommended to use the `Full (Strict)` mode for to serve all requests securely and ensure Cloudflare recognises the Northflank-generated certificates for your subdomains.

The `flexible` SSL/TLS configuration may cause issues if Cloudflare does not enable SSL/TLS between Cloudflare and Northflank.

To use Cloudflare proxy with domains other than your root domain (`example.com`) and immediate subdomains (`*.example.com`) you will need to use Cloudflare's Advanced Certificate Manager feature.

### Add a Cloudflare domain to Northflank: Use Cloudflare cache

You can [configure how Cloudflare caches your content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/) when the Cloudflare proxy is enabled for a domain on the configuration page of the caching section in your Cloudflare dashboard.

Cloudflare will cache static assets such as images and archives, but not HTML and JSON content. You may need to purge the cache or configure your cache settings if you do not see the expected changes from your Northflank service.

### Add a Cloudflare domain to Northflank: Configure Cloudflare security rules

Northflank may be unable to generate certificates for your subdomains while Cloudflare security features such as bot protection are enabled.

To avoid issues with certificate regeneration you can add a custom security rule in the security section of your Cloudflare dashboard. You can also add these security rules to enable initial certificate generation with proxied subdomains.

| Field | Operator | Value | Action |
| --- | --- | --- | --- |
| URI Path | ends with | `/.well-known/dns-challenge/:token` | Skip |
| URI Path | ends with | ` /.well-known/acme-challenge/:token` | Skip |

##### Add a Cloudflare domain to Northflank: Rule expression

```text
(ends_with(http.request.uri.path, " /.well-known/dns-challenge/:token")) or
(ends_with(http.request.uri.path, " /.well-known/acme-challenge/:token"))
```

You can then skip Cloudflare Web Application Firewall (WAF) components for these paths to allow challenges to succeed.

![Adding a custom security rule in the Cloudflare dashboard](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/cloudflare/cloudflare-domain.png)

### Add a Cloudflare domain to Northflank: Next steps

- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)

## Add a Namecheap domain to Northflank

Source: https://northflank.com/docs/v1/application/domains/domain-registrar-guides/add-a-namecheap-domain-to-northflank.md

You can add and use domains and subdomains from Namecheap's DNS services, and Namecheap's web hosting DNS service.

### Add a Namecheap domain to Northflank: Add and verify a Namecheap DNS domain

If you use one of Namecheap's BasicDNS, BackupDNS, PremiumDNS, or FreeDNS services, you can configure your domain by following these instructions. You can also read [Namecheap's documentation](https://www.namecheap.com/support/knowledgebase/article.aspx/434/2237/how-do-i-set-up-host-records-for-a-domain) for more platform specific information.

1. [Add your domain to Northflank](domains.md#add-a-domain-to-your-account)

2. Open Namecheap in a new browser tab or window and log in to your Namecheap dashboard

3. Open the domain list and select manage on the entry for the domain you are adding to Northflank

4. Select advanced DNS add and add new record

5. Open the type dropdown and scroll down to choose TXT, or CNAME to add a subdomain

6. Copy the record name from Northflank into the host field

7. Copy the record content from Northflank into the target field

![Adding a TXT record to verify a domain on Namecheap](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/namecheap-dns/namecheap-domain.png)

1. Set the TTL (time to live) to 1 minute (you can select a higher value, but it might take longer to register changes) and save all changes

2. Return to the domains page on Northflank and select verify on the entry for your domain

3. Your domain should now be verified. If not, check you have entered the record correctly and try again.

4. You can now [link your domain to a port](domains.md#link-a-domain-to-a-port)

#### Add a Namecheap domain to Northflank: Add an apex domain

You can add an apex domain from Namecheap DNS by adding an ALIAS record with `@` as the host and the record content generated by Northflank as the target.

See [Namecheap's documentation](https://www.namecheap.com/support/knowledgebase/article.aspx/10128/2237/how-to-create-an-alias-record/) for more details.

![Adding an ALIAS record to link an apex domain on Namecheap](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/namecheap-dns/namecheap-apex.png)

### Add a Namecheap domain to Northflank: Add and verify a Namecheap web hosting domain

If you use Namecheap's Web Hosting DNS to manage your domain name, you can configure it in cPanel by following these instructions. You can also read [Namecheap's documentation](https://www.namecheap.com/support/knowledgebase/article.aspx/9256/29/how-to-edit-dns-zone-in-cpanel/) for more platform specific information.

1. [Add your domain to Northflank](domains.md#add-a-domain-to-your-account)

2. Open Namecheap in a new browser tab or window and log in to your Namecheap dashboard

3. Open the domain list and select all products from the drop-down list

4. Hover over the hosting icon that contains the domain you want to add and select Go to cPanel

5. Locate the domains section in cPanel and select zone editor

6. Select manage on the entry for the domain you want to add

7. Select add record

8. Copy the record name from Northflank into the name field

![Adding a TXT record to verify a domain in cPanel](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/namecheap-web-hosting/cpanel-domain.png)

1. Set the TTL (time to live) to 60 seconds (you can select a higher value, but it might take longer to register changes)

2. Open the type dropdown and scroll down to choose TXT, or CNAME to add a subdomain

3. Copy the record content from Northflank into the record field and save all changes

4. Return to the domains page on Northflank and select verify on the entry for your domain

5. Your domain should verify shortly. If not, check you have entered the record correctly and try again.

6. You can now [link your domain to a service](domains.md#link-a-domain-to-a-port)

![Adding a CNAME record to link a subdomain in cPanel](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/namecheap-web-hosting/cpanel-subdomain.png)

#### Add a Namecheap domain to Northflank: Add an apex domain

It is not possible to add an apex domain through cPanel. If you want to add your apex domain to Northflank you must manage your DNS through Namecheap's, or another provider's, DNS service that supports CNAME flattening or ALIAS/ANAME records.

### Add a Namecheap domain to Northflank: Next steps

- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)

## Add an NS1 domain to Northflank

Source: https://northflank.com/docs/v1/application/domains/domain-registrar-guides/add-an-ns1-domain-to-northflank.md

If you manage your domain through NS1, you can configure it by following these instructions, or read [IBM NS1 Connect's documentation](https://www.ibm.com/docs/en/ns1-connect?topic=dns-resource-management) for more platform specific information.

### Add an NS1 domain to Northflank: Add and verify an NS1 domain

To add and verify NS1 domains and subdomains on Northflank:

1. [Add your domain to Northflank](domains.md#add-a-domain-to-your-account)

2. Open NS1 in a new browser tab or window and sign in

3. Navigate to DNS and select the domain you are adding to Northflank from Zones

4. Select add record

5. Select TXT under record type, or CNAME to add a subdomain

6. Set the TTL (time to live) to 60 seconds (you can select a higher or default value, but it might take longer to register changes)

7. Copy the record name from Northflank into the answers field, click save all changes to save the record

![Adding a TXT record to verify a domain on NS1](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/ns1/ns1-domain.png)

1. Return to the domains page on Northflank and select verify on the entry for your domain

2. Your domain should verify shortly. If not, check you have entered the record correctly and try again.

3. You can now [link your domain to a service](domains.md#link-a-domain-to-a-port)

#### Add an NS1 domain to Northflank: Add an apex domain

You can add an apex domain on NS1 by adding an ALIAS record with an empty name field and the Northflank generated content as the answer.

![Adding a CNAME record to link an apex domain on NS1](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/ns1/ns1-apex.png)

### Add an NS1 domain to Northflank: Next steps

- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)

## Add an OVH domain to Northflank

Source: https://northflank.com/docs/v1/application/domains/domain-registrar-guides/add-an-ovh-domain-to-northflank.md

If you manage your domain through OVH, you can configure it by following these instructions. You can also read [OVH's documentation](https://docs.ovh.com/gb/en/domains/web_hosting_how_to_edit_my_dns_zone/) for more platform specific information.

It is not possible to link an apex domain through OVH. If you want to link your apex domain you must manage your DNS through another provider's DNS service that supports CNAME flattening or ALIAS/ANAME records.

### Add an OVH domain to Northflank: Add and verify an OVH domain

1. [Add your domain to Northflank](domains.md#add-a-domain-to-your-account)

2. Open OVH in a new browser tab or window and log in to your OVHcloud Control Panel

3. Navigate to Web Cloud - Domains and select the domain you are adding to Northflank

4. Select DNS zone and add an entry

5. Select TXT under extended records, or CNAME to add a subdomain

6. Copy the record name from Northflank into the sub-domain field

7. Set the TTL (time to live) to custom and 60 seconds (you can select a higher or default value, but it might take longer to register changes)

8. Copy the record content from Northflank into the value/target field (when adding a CNAME you must add a period to the end of the target)

9. Click next and confirm to save the record

![Adding a TXT record to verify a domain on OVH](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/ovh/ovh-domain.png)

1. Return to the domains page on Northflank and select verify on the entry for your domain

2. Your domain should verify shortly. If not, check you have entered the record correctly and try again.

3. You can now [link your domain to a service](domains.md#link-a-domain-to-a-port)

![Adding a CNAME record to link a subdomain on OVH](https://assets.northflank.com/documentation/v1/application/domains/domain-registrar-guides/ovh/ovh-subdomain.png)

### Add an OVH domain to Northflank: Next steps

- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)

## Domains on Northflank

Source: https://northflank.com/docs/v1/application/domains/domains-on-northflank.md

You can add your own domains to your Northflank team to use with your applications and services. There are many ways to configure your domains on Northflank to allow flexibility, security, and dynamic provisioning of subdomains.

After adding your domain to Northflank you can then add subdomains and configure paths for them, which can then be linked to ports. You can enable CDNs for your subdomains to cache and serve content.

You can add domains with wildcard redirect routing and certificate generation to enable dynamic provisioning of subdomains on Northflank.

### Domains on Northflank: Custom domains and subdomains

To add and use subdomains on Northflank you must first add and verify the root domain on your DNS provider.

Once you have added a subdomain to your team it can be linked and unlinked to your service's ports using paths without having to configure it again in your DNS provider.

If you want to make a port on a service publicly accessible without adding your own domain, you can use the subdomain generated by Northflank.

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Use your apex domain: Use your apex (root) domain name with a Northflank service.](domains.md#add-a-domain-to-your-account-add-a-domain)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Remove a domain from your account: How to remove subdomains and domains from your Northflank account.](domains.md#remove-a-domain)
- [Use Northflank generated DNS entries: Learn about Northflank-generated DNS entries for your private and public ports.](network.md#configure-ports)

### Domains on Northflank: DNS providers

Follow guides on how to add and verify your domains from different DNS providers.

- [Add a Cloudflare domain: Add, verify, and configure a Cloudflare domain on Northflank.](domains.md#add-a-cloudflare-domain-to-northflank)
- [Add an NS1 domain: Add, verify, and configure an IBM NS1 Connect domain on Northflank.](domains.md#add-an-ns1-domain-to-northflank)
- [Add an OVH domain: Add, verify, and configure an OVH domain on Northflank.](domains.md#add-an-ovh-domain-to-northflank)
- [Add a Namecheap domain: Add, verify, and configure a Namecheap domain on Northflank.](domains.md#add-a-namecheap-domain-to-northflank)

### Domains on Northflank: Path-based routing

You can [use path-based routing](domains.md#use-path-based-routing) on subdomains to route requests to specific paths to different ports and services, and configure settings for how requests to that path are handled.

- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)
- [Configure request handling: You can configure how requests to a subdomain or specific paths are handled, such as modifying headers and setting the CORS policy.](domains.md#use-path-based-routing-configure-a-path)

### Domains on Northflank: Certificate generation

Northflank uses Let's Encrypt to provision TLS certificates on-demand. Your [custom domains](domains.md#domains-on-northflank) can be linked to a service port and immediately start serving traffic securely with a managed certificate.

You can reduce the number of certificates you need to generate by configuring a domain to use wildcard certificates, and import your own certificates.

- [Generate certificates automatically with Northflank: Northflank will generate certificates for your domains automatically when they are added to a service port.](domains.md#certificate-generation-automatic-certificate-generation)
- [Import a certificate: Import your own certificate to use with your Northflank domain.](domains.md#certificate-generation-import-a-certificate)
- [Connect to an Addon with TLS: Ensure your service or job can connect to an addon using TLS.](databases-and-persistence.md#access-a-database-access-tls-certificates-in-containers)
- [Use wildcard certificates: Use wildcard certificate generation to avoid hitting certificate creation rate limits and dynamically generate subdomains.](domains.md#wildcard-domains-and-certificates-wildcard-certificate-generation)

### Domains on Northflank: Wildcard redirects

You can configure wildcard redirect routing to add subdomains without adding DNS records for each new subdomain.

You can combine this with wildcard certificate generation to dynamically add subdomains in [Northflank templates](release.md#configure-a-release-flow) and [preview environments](release.md#set-up-a-preview-environment).

- [Use wildcard redirect routing: Configure your domains to use wildcard redirect routing to automatically verify subdomains added to Northflank.](domains.md#wildcard-domains-and-certificates-domain-routing)
- [Redirect all subdomains: Create wildcard subdomains to redirect all requests to a single domain or subdomain.](domains.md#wildcard-domains-and-certificates-redirect-all-subdomains)

### Domains on Northflank: Content distribution networks

You can use a CDN to serve static content from your deployments. This can improve the speed at which your content is delivered to users without needing to deploy in multiple regions, and can reduce the load on your containers from serving many simultaneous requests.

Using a CDN also means that your can deliver stale content, so your site will remain accessible even if your deployments becomes unavailable.

- [Use a CDN: Configure your subdomains to use a CDN to serve static content.](domains.md#use-a-cdn)

### Domains on Northflank: Cross-Origin Resource Sharing (CORS)

Applications that you write or deploy with a microservices or client-server architecture (for example, separate front and back-ends) will often require [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) access, which only accepts requests from specified domains.

Requests between your services, or even requests to the same service on different ports, may fail unless configured correctly. You may need to add the accepted domains as build arguments or environment variables to your services.

Some applications may have stricter policies and only accept requests from the same root domain. Northflank-generated `*.code.run` domains for public ports, even if they are on the same service, will be considered as different root domains. You should use your own subdomains for production services.

You can also configure your own CORS policies for individual paths on your own subdomains.

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)

## Link a domain to a port

Source: https://northflank.com/docs/v1/application/domains/link-a-domain-to-a-port.md

You can point your domains at specific ports on Northflank services. To do this, you will need to link your domain to a port on a service.

Domains on Northflank can be configured using [path-based routing](domains.md#use-path-based-routing). This means that every subdomain you add will have a base path `/`, which you can link to a port to handle all requests to the subdomain.

You can also [add more paths to a subdomain](domains.md#use-path-based-routing-add-a-path) to link a single subdomain to multiple ports and services, and [configure how requests](domains.md#use-path-based-routing-configure-a-path) to paths and subpaths are handled.

> [!note] Requirements
> You will need the following to get started:

- a [verified subdomain](domains.md#add-a-domain-to-your-account-add-a-subdomain) added to your Northflank team
- a [public port](network.md#configure-ports-public-ports) configured for a [service](run.md#run-containers-and-micro-services-on-northflank)

### Link a domain to a port: Link a domain in a deployment

Open the ports & DNS page on the service that contains the port you want to link a subdomain to, and find the entry for the port. Expand the custom domains & security rules view (the port must be [public](network.md#configure-ports-public-ports)).

Click add custom domain and find the subdomain you wish to associate with the port in the list. If it is not present, click manage domains to add it to your account. You can repeat this for as many subdomains as you want to add.

You can also choose to disable the default `code.run` domain generated by Northflank.

After saving your changes Northflank will automatically generate TLS certificates for your subdomain. It should redirect to the specified port on your deployment soon after saving, without requiring a service restart.

![Linking a domain to a port in a deployment service in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/link-a-domain-to-a-port/custom-domain.png)

### Link a domain to a port: Link a domain in account settings

Open the [domains page in your team](https://app.northflank.com/s/account/domains) and find the subdomain you want to link to a port. You can also search for the domain by name.

Find the subdomain listed in the domain entry and click the  button to edit it.

To link the subdomain to a port find the path base path (`/`) and select the service and port from the drop-down menus and update path.

Northflank will automatically generate a TLS certificate for your subdomain, and it will redirect to your specified port soon after saving.

![Linking a domain to a port from a subdomain settings page in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/link-a-domain-to-a-port/subdomain-base-path.png)

### Link a domain to a port: Next steps

- [Use path-based routing: Route incoming traffic to different services and ports for paths on a subdomain.](domains.md#use-path-based-routing)
- [Set IP policies: Allow or deny access to services based on IP addresses.](network.md#add-security-policies-for-ports-set-ip-policies)
- [Configure basic authentication: Require users to enter a username and password to access your site.](network.md#add-security-policies-for-ports-require-credentials)

## Remove a domain

Source: https://northflank.com/docs/v1/application/domains/remove-a-domain.md

You can unlink subdomains from ports and re-assign them to other ports without having to update your DNS records or re-verify, as long as the subdomain is already verified on Northflank.

You can also remove domains and subdomains entirely from your account, but you will need to re-verify them if you want to use them with your Northflank services again.

### Remove a domain: Unlink a domain from a port

You can unlink a subdomain from a port via a service's ports & DNS page, or from your account's domains page.

#### Remove a domain: Unlink a subdomain via a service

Navigate to the service that contains the port linked to your subdomain and open the ports & DNS page. Open the custom domains & security rules dropdown on the port your subdomain is linked to, and click remove from port . If you previously disabled the default `code.run` endpoint, it will now be active again.

If you no longer require the port, you can simply remove the port .

#### Remove a domain: Unlink a subdomain via the domains page

Find the subdomain in the list, or search for it. Select the x in the drop-down menu containing the service to unlink the subdomain from the service and port, or select another service and port to link the subdomain to.

### Remove a domain: Remove a domain from your account

To remove a domain or subdomain from your account, simply delete the entry from the [domains page in your account settings](https://app.northflank.com/s/account/domains). Removing an apex domain will also remove any subdomains associated with it.

You will be notified if the domain or subdomain is currently linked to any deployments, review this carefully before confirming.

It is recommended that you also remove any Northflank records from your DNS host to avoid confusion, as you will need to re-verify if you re-add the domain or subdomain.

### Remove a domain: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)

## Use a CDN

Source: https://northflank.com/docs/v1/application/domains/use-a-cdn.md

You can enable a CDN for your subdomains to serve static content from your deployments. This can improve the speed at which your content is delivered to users without needing to deploy in multiple regions, and reduce the load on your instances.

You may also choose to deliver stale content, which means your site will still be accessible even if your deployment becomes unavailable.

There is no extra cost to use a CDN with your Northflank deployment.

> [!note]
> [Click here](https://app.northflank.com/s/account/domains) to view your account domains page.

### Use a CDN: Enable CDN for a subdomain

You must configure each subdomain individually to use a CDN.

To enable CDN on a subdomain, navigate to your [team domains page](https://app.northflank.com/s/account/domains). Open the settings  for the subdomain you want to use a CDN with and select the CDN view.

Your subdomain must be [linked to a deployment's port](domains.md#link-a-domain-to-a-port) to use a CDN.

[Configure the CDN settings](domains.md#use-a-cdn-configure-cdn-settings), or leave as default, and enable CDN. The CDN status will show that the CDN is enabling and the network diagram will update to show the CDN sitting in front of the Northflank load balancer. The CDN will become active usually within a few seconds, and up to a few minutes.

To disable the CDN, click disable CDN. The status and network diagram will update when the CDN has been disabled.

![Configuring CDN settings for a subdomain in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/use-a-cdn/cdn-settings.png)

### Use a CDN: Configure Fastly CDN

##### Use a CDN: Logging

If enabled, Fastly logs for your services will be streamed to Northflank. Logs from Fastly can be viewed by [navigating to a container](observe.md#view-logs-view-logs) in the deployment service associated with the subdomain, and selecting `all containers` from the observability header.

##### Use a CDN: HTTP/3

You can enable connections between end users and Fastly to be upgraded to HTTP/3 (QUIC protocol). Connections between Northflank and Fastly will still use up to HTTP/2. HTTP/3 requires that all connections are secured using TLS. [Learn more.](https://docs.fastly.com/en/guides/enabling-http3-for-fastly-services)

##### Use a CDN: Force TLS and enable HSTS

If enabled, all requests must use TLS and will be redirected from `http` to `https`. You must set the HSTS duration, it is recommended to set this to the maximum possible value of `31557600` (1 year) for production applications.

##### Use a CDN: Serve stale content on origin failure

When enabled Fastly will serve stale content to your users if your Northflank deployment cannot be reached. The `Stale if Error TTL` defines how long content will be served for if the origin cannot be reached. The default value is `43200` seconds, or 12 hours.

##### Use a CDN: Default TTL

Set the default time-to-live (TTL) in seconds. Fastly will serve cached data for the defined TTL, and then fetch from the origin after the TTL has expired. The default value is `3600`, or 1 hour.

##### Use a CDN: Compression

If enabled, content sent from Fastly to end users will be compressed using the selected format (`gzip` or `Brotli`). This can potentially improve speeds as well as reduce costs.

### Use a CDN: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)

## Use path-based routing

Source: https://northflank.com/docs/v1/application/domains/use-path-based-routing.md

You can configure subdomains to route ingress traffic to different services and ports based on the path. You can route paths on a subdomain to multiple ports on the same service, ports on different services, as well as services in different projects.

When you add a new subdomain it will have the base path (`/`) added by default. You can [link the subdomain to a service's port](domains.md#link-a-domain-to-a-port) with no extra configuration required.

If you add multiple paths for a subdomain you may need to [set their priority](domains.md#use-path-based-routing-configure-a-path) to ensure the correct routing is used.

> [!note]
> [Click here](https://app.northflank.com/s/account/domains) to view your account domains page.

### Use path-based routing: Add a path

You can configure as many paths for a subdomain as you need.

> [!note] Requirements
> You will need the following to get started:

- a [verified subdomain](domains.md#add-a-domain-to-your-account-add-a-subdomain) added to your Northflank team

Navigate to your domains page and select  add path on the entry for the subdomain you want to add path routing to.

Click  add path in the paths section of your subdomain settings to add a new path.

Enter the URI as either plain text or regex and select the [routing mode](domains.md#use-path-based-routing-routing-modes).

You can [further configure](domains.md#use-path-based-routing-configure-a-path) the path by expanding advanced options. Advanced options can be edited after creating a path, but not the path URI or routing mode.

![Configuring paths for a subdomain in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/use-path-based-routing/edit-subdomain-paths.png)

### Use path-based routing: Routing modes

When you add a path you will need to select a routing mode to determine how Northflank should handle requests. You can enter a path as either plain text or as a regular expression. Paths take precedence based on their [priority](domains.md#use-path-based-routing-configure-a-path).

#### Use path-based routing: Exact

Will route requests only to the given path, and not any subpaths. For example, a path with the URI `/path` and the routing mode set to `exact` will route requests to `/path` to the assigned port, but not `/path/subpath`.

Requests to paths that include `/path` as a prefix will be routed to another path that matches, if any exists.

#### Use path-based routing: Prefix

Will route any paths beginning with the given URI to the assigned port. For example `/path` and `/path/subpath` will route to the assigned port, but not `/acme/subpath`.

#### Use path-based routing: RegEx

Will route paths that match the regex supplied as the URI. For example, `/path|/acme` will route requests to `/path` or `/acme` to the assigned port, but not `/path/subpath` or `/blog`.

You can configure more settings for each path in advanced options.

### Use path-based routing: Set path priority

Paths will be matched based on their priority in descending order. A higher priority means the path will overrule any other matching paths of lower priority. By default, the base path will be added with priority `0` and other paths with priority `1`.

For example, in the configuration below, any paths starting with `/api/v1/` will be routed according to the rules set for that path. Any requests to the path `/api` without the subpath `/v1` will be routed according to the configuration for `/api`, and all other requests will be routed according to `/`.

If, however, we changed the priority of `/` to `3`, all requests would be routed according to the rules for `/`, including requests to the paths `/api` and `/api/v1`.

| Path | Mode | Priority |
| --- | --- | --- |
| `/` | `prefix` | `0` |
| `/api` | `prefix` | `1` |
| `/api/v1/` | `prefix` | `2` |

### Use path-based routing: Ignore the URI case

By default, paths are case-sensitive. This means a request to the route `/API` will not match a path added as `/api` unless ignore URI case is selected.

This is not relevant if you add a path in RegEx mode which matches both cases.

### Use path-based routing: Set path timeout

You can configure a custom HTTP request timeout for each path. The timeout can be set in seconds (`s`) or milliseconds (`ms`), for example `250ms` or `1s`.

If the service does not respond before the timeout is reached a `408 Request Timeout` will be returned to the request origin.

### Use path-based routing: Rewrite a path

You can rewrite paths before the request is forwarded to the assigned port.

URI rewrite will replace the requested path with the new URI provided in the rewrite setting. For example, the rewrite `/api` for the prefix path `/api/v1` would rewrite a request to `/api/v1/health` as `/api/health`.

Regex rewrite can replace any specific parts of the path which matches the given regex. For example the regex `^/acme/([^/]+)(/.*)$` with rewrite `/api/\1/\2` would alter the path `/acme/v1/health` to `/api/v1/health`.

### Use path-based routing: Modify request headers

You can set and add HTTP headers for requests and responses to the path. You can also remove headers by key.

- Set will overwrite the headers specified by key with the given values

- Add will append the given values to the headers specified by key

- Remove will delete the specified headers by key

### Use path-based routing: Configure the CORS policy

You can configure the [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy for the path. You can enable the policy to apply it to any specified origins

#### Use path-based routing: Allow origins

You can set the allowed origins for CORS requests by selecting the matching mode and specifying the origin. The matching modes are the same as [routing modes](domains.md#use-path-based-routing-routing-modes) for paths.

You can include apex domains as the origin (for example prefix mode with `https://example.com`), wildcards (for example exact mode with `*`), or use RegEx to specify allowed domains and paths.

#### Use path-based routing: Allow methods

You can specify what [methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) are allowed in the CORS request. Allowing credentials will allow cookies and credentials to be sent with the request. You cannot send credentials if the origin is a wildcard (`*`).

#### Use path-based routing: Allow headers

You can specify what headers should be forwarded in the CORS request, otherwise only the default headers will be included.

#### Use path-based routing: Max age

Specify how long the results of a preflight request can be cached.

### Use path-based routing: Create retry policies

You can configure retry policies for paths, including whether to allow retries, how many retries to allow, and the time to wait between attempts.

You can select the specific HTTP or GRPC responses to retry on.

### Use path-based routing: Assign a path to a port

You can assign which service and port a path will route to after it has been added to the subdomain.

#### Use path-based routing: In the subdomain settings

Select a service from the dropdown menu, then select an existing port from the service. Update path and Northflank will begin routing requests for the path to the selected port. If the service has no ports, or the expected port is not listed, you can click the button  to view the service and update the ports.

#### Use path-based routing: In a service

Open the ports & DNS page for a service and expand the custom domains and security rules for the port you want to use. Add custom domain and select the subdomain with the path you want to route to the port. Save the changes and Northflank will begin routing requests for the path to the selected port.

### Use path-based routing: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)

## Wildcard domains and certificates

Source: https://northflank.com/docs/v1/application/domains/wildcard-domains-and-certificates.md

You can configure your domains on Northflank to use wildcard redirect routing, which allows you to add subdomains without the need to add an individual DNS record for each new subdomain, and to use wildcard certificate generation, which allows you to add subdomains without requiring an individual certificate to be generated for each one, or to import and use your own certificate for your subdomains on Northflank.

You can use wildcard redirect routing in combination with wildcard certificate generation to allow the dynamic provisioning of subdomains in [templates](infrastructure-as-code.md#infrastructure-as-code-on-northflank) and [preview environments](release.md#set-up-a-preview-environment).

> [!note]
> [Click here](https://app.northflank.com/s/account/domains) to view your account domains page.

### Wildcard domains and certificates: Domain routing

You can enable wildcard domain routing when you [add a domain to Northflank](domains.md#add-a-domain-to-your-account) to automatically verify subdomains added to Northflank. Wildcard redirect routing must be configured when adding a domain to Northflank, and cannot be changed except by removing and re-adding the domain.

> [!note]
> Wildcard routing will restrict the use of your domain to a single region, and you will be unable to use the top-level domain (also called the apex or root domain) for services. You may find [path-based routing](domains.md#use-path-based-routing) more suitable depending on your requirements.

To add a domain with wildcard routing, [begin by adding a domain normally](domains.md#add-a-domain-to-your-account-add-a-domain) and expand advanced options. Select `wildcard redirect` from the domain routing drop-down menu, and choose the region you want to use the domain in. Click add domain and create the record on your DNS provider. In this case a `CNAME` record with an asterisk subdomain for the name (for example `*.wildcard` for the domain `*.wildcard.example.com`), and the record content from Northflank for the value.

Return to Northflank and verify your domain to begin using it in your selected region. You can now add subdomains for this domain on Northflank without adding new DNS records to your DNS provider.

![Adding a wildcard domain in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/wildcard-domains-and-certificates/wildcard-domain-and-certificate.png)

### Wildcard domains and certificates: Wildcard certificate generation

You can choose to enable wildcard certificate generation when adding a domain to Northflank which allows you to avoid hitting rate limits for [certificate generation](domains.md#domains-on-northflank-certificate-generation), as certificates are not generated for individual subdomains. Certificate generation must be configured when adding a domain to Northflank, and cannot be changed except by removing and re-adding the domain.

Wildcard certificates generate a certificate for the entire subdomain level. For example, enabling wildcard generation for `*.example.com` would provide the same certificate for any subdomains added to `example.com`, such as `a.example.com` and `b.example.com`.

You must configure wildcard certificate generation and domain redirect routing for a domain to dynamically generate subdomains in Northflank [templates](infrastructure-as-code.md#infrastructure-as-code-on-northflank) and [preview environments](release.md#set-up-a-preview-environment).

> [!note]
> Chromium-based browsers may return a 404 error if a user tries to access multiple subdomains that share the same certificate, at the same time, on a service.

#### Wildcard domains and certificates: DCV

Domain Control Validation (DCV) allows you to use wildcard certificate generation by adding a CNAME record to your DNS provider.

To add a domain with wildcard certificate generation using DCV, [begin by adding a domain normally](domains.md#add-a-domain-to-your-account-add-a-domain) and expand advanced options. Select `wildcard via DCV` from the certificate generation drop-down menu, and click add domain. Create a CNAME record in your DNS provider with the content provided on Northflank under `wildcard certificate DCV verification`, as well as the record required to confirm you own the domain, and verify the domain on Northflank.

After your DNS record has been verified any new subdomains you create under the domain will use the same wildcard certificate.

#### Wildcard domains and certificates: Imported certificate

You can enable the use of wildcard certificates by importing a wildcard certificate from your DNS provider or certificate authority.

To add a domain with an imported certificate, [begin by adding a domain normally](domains.md#add-a-domain-to-your-account-add-a-domain) and expand advanced options. Select `wildcard via imported certificate` from the certificate generation drop-down menu, and click add domain. Copy the certificate content and private key into Northflank, create the record required to confirm you own the domain on your DNS provider, and verify the domain.

Any new subdomains you create under the domain will use your own imported wildcard certificate, rather than a [Northflank-generated Let's Encrypt certificate](domains.md#domains-on-northflank-certificate-generation).

You can update the certificate for a domain by opening the settings  for the domain. Expand the certificate import view, paste the new certificate and private key, and click update to begin using the new certificate.

![Importing a wildcard certificate in the Northflank application](https://assets.northflank.com/documentation/v1/application/domains/wildcard-domains-and-certificates/import-wildcard-certificate.png)

### Wildcard domains and certificates: Redirect all subdomains

You can create a wildcard subdomain, which will accept requests to any subdomain and route them to the assigned port of a service.

To add a wildcard subdomain you must add your domain with [wildcard redirect](domains.md#wildcard-domains-and-certificates-domain-routing) and [wildcard certificate generation](domains.md#wildcard-domains-and-certificates-certificate-generation).

Once the domain has been verified, add a subdomain with `*` as the value and [assign it to a service's port](domains.md#link-a-domain-to-a-port).

Requests to any subdomain at the level of the wildcard subdomain will now be forwarded to the assigned port.

For example, a wildcard subdomain added as `*.preview.example.com` for the domain `preview.example.com` will accept all requests to any subdomain `<string>.preview.example.com`, and route them to the specified service.

### Wildcard domains and certificates: Next steps

- [Add a domain: Add your domain name to your Northflank account.](domains.md#add-a-domain-to-your-account)
- [Link a domain to a port: How to link and unlink domains and subdomains with specific ports on your deployments.](domains.md#link-a-domain-to-a-port)
- [Add public ports: Configure ports to expose your services on the internet.](network.md#configure-ports-public-ports)
- [Domain registrar guides: Follow walkthroughs to add and verify domains on Cloudflare, NS1, OVH, and Namecheap.](domains.md#domains-on-northflank-custom-domains-and-subdomains)
