# Infrastructure As Code

Generated from 12 application pages listed in `llms.txt`.

## Pages

- [Configure teardown workflows](#configure-teardown-workflows)
- [Create a template](#create-a-template)
- [Manage external infrastructure](#manage-external-infrastructure)
- [GitOps on Northflank](#gitops-on-northflank)
- [Infrastructure as code on Northflank](#infrastructure-as-code-on-northflank)
- [Make a template dynamic](#make-a-template-dynamic)
- [Manage template versions](#manage-template-versions)
- [Run a template](#run-a-template)
- [Share a template](#share-a-template)
- [Template nodes](#template-nodes)
- [Use GitHub Actions with Northflank](#use-github-actions-with-northflank)
- [Write a template](#write-a-template)

## Configure teardown workflows

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/configure-teardown-workflows.md

Teardown workflows clean up resources for templates, workflows, and preview environments. Use teardowns to destroy OpenTofu infrastructure, run cleanup jobs, call external APIs, or perform other cleanup tasks.

Teardowns are defined in the teardownSpec section of your template definition. The structure mirrors your template’s spec, but instead of provisioning resources, it destroys them using a separate set of nodes designed for cleanup operations.

### Configure teardown workflows: Add a teardown workflow

Configure teardowns through the visual editor or by editing your template definition directly.

1. Navigate to your template, workflow, or preview blueprint

2. Click **Settings**

3. Scroll to **Teardown**

4. Click **Add teardown specification**

5. Add nodes to define your cleanup workflow (see available nodes below)

6. Configure each node with the required settings

7. Click **Save**

### Configure teardown workflows: Available teardown nodes

Teardown workflows support a limited set of nodes:

- **Run job**: Run a job to execute cleanup scripts

- **Message**: Send teardown notifications

- **Run action**: Execute actions like running commands on a pod or restoring backups

- **OpenTofu destroy**: Destroy infrastructure created by an OpenTofu node

- **Await condition**: Wait for external conditions

- **Approval**: Require manual approval before proceeding

### Configure teardown workflows: Destroy OpenTofu resources

The OpenTofu destroy node removes all infrastructure created by a corresponding OpenTofu node. To reference an OpenTofu node, set a `ref` on it in your template spec.

```json
{
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "OpenTofu",
          "ref": "infrastructure",
          "spec": {
            "stateKey": "e4bd4d08-7165-41ae-b099-ad5d13c4d86e",
            "spec": {
              "resource": {
                "aws_s3_bucket": {
                  "bucket": "my-bucket-name"
                }
              }
            }
          }
        }
      ]
    }
  },
  "teardownSpec": {
    "spec": {
      "kind": "Workflow",
      "spec": {
        "type": "sequential",
        "steps": [
          {
            "kind": "OpenTofuDestroy",
            "spec": {
              "nodeRef": "infrastructure"
            }
          }
        ]
      }
    }
  }
}
```

The OpenTofu destroy node uses the `nodeRef` field to target the OpenTofu node you want to destroy.

### Configure teardown workflows: Reference resources from setup

Teardown runs inherit refs from the most recent successful setup run. This lets you reference resources created during setup using the same `${refs.nodeName.id}` syntax.

For example, if your setup workflow creates a service, your teardown can reference its ID:

```json
{
  "teardownSpec": {
    "spec": {
      "steps": [
        {
          "kind": "RunJob",
          "spec": {
            "command": "cleanup ${refs.api.id}"
          }
        }
      ]
    }
  }
}
```

The teardown will use the service ID from the most recent successful setup run.

### Configure teardown workflows: Run teardown workflows

Teardown behavior depends on whether you are using preview environments or templates and workflows.

#### Configure teardown workflows: Preview environments

Preview environments run teardowns automatically when you delete an environment. To skip the teardown, enable **Skip teardown** when manually deleting the environment through the UI.

#### Configure teardown workflows: Templates and workflows

Templates and workflows require manual teardown execution from the UI or API. Teardowns do not run automatically when you delete a template or workflow.

### Configure teardown workflows: Set failure policy

The failure policy controls what happens when a teardown run fails. Configure this in the `teardownSpec.failurePolicy` field:

```json
{
  "teardownSpec": {
    "spec": {},
    "failurePolicy": "block"
  }
}
```

**Available policies:**

- **ignore** (default): Deletes resources regardless of teardown outcome

- **block**: Halts deletion and marks the environment as failed if teardown fails

Use `block` when teardown failures could leave orphaned resources on third-party providers that may incur additional costs. Use `ignore` when teardown is best effort and should not prevent deletion.

### Configure teardown workflows: Next steps

- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Update a template: Update a template and resources within a project.](infrastructure-as-code.md#run-a-template-update-a-template)

## Create a template

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/create-a-template.md

You can create and configure Northflank templates to manage your team integrations, projects, and resources.

You can create a new template from the templates page in your team dashboard, or from the templates page in a project. You can then define the template using the visual or code editor, or copy the resources [from an existing project](infrastructure-as-code.md#create-a-template-create-from-an-existing-project-or-resource).

For the specifics of creating and configuring [release flow](release.md#configure-a-release-flow) and [preview environment](release.md#set-up-a-preview-environment) templates, see the relevant pages in the [release section](release.md#continuous-integration-and-delivery-on-northflank).

> [!note]
> [Click here](https://app.northflank.com/s/account/templates) to create a new template.
To add an existing template from a Git repository to your team, create a new template and [enable GitOps](infrastructure-as-code.md#create-a-template-enable-gitops-for-your-template).

You can configure a template's settings on the template edit page, to [run a template automatically when it's updated](infrastructure-as-code.md#create-a-template-run-your-template-automatically), [set the concurrency policy](infrastructure-as-code.md#create-a-template-configure-template-run-concurrency), and [add secrets](infrastructure-as-code.md#create-a-template-provide-secrets-securely-to-a-template).

### Create a template: Use the visual editor

The visual editor allows you to drag and drop nodes in the order you want them to run. You can see your template's entire flow and the key configuration details of nodes at a glance in the visual editor.

#### Create a template: Navigation

You can move around the viewport by scrolling. A normal scroll moves the viewport vertically, and either a horizontal scroll on a trackpad or shift and scroll will move the viewport horizontally. You can also move around the viewport by dragging the mouse while holding the space key. Trackpad pinch gestures as well as control/command key and scroll wheel will zoom the viewport, as will the  and  buttons. Press  to re-centre the view on the template contents.

![Creating a template in the Northflank application using the visual editor](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/create-template-visual-editor.png)

#### Create a template: Edit workflows and nodes

To re-arrange workflows, click and drag anywhere within the workflow that isn't a button or node. To re-order nodes, click and drag the  move area of the node.

You can click the switch button  in the workflow node to change to a parallel or sequential flow.

You can edit an individual node by clicking on it. You can configure a node using the  form, or switch to  code to directly edit the JSON for the individual node. Editing the code directly is useful to paste in [resource specifications](infrastructure-as-code.md#create-a-template-create-from-an-existing-project-or-resource) from your existing projects, or other sources. You can expand  the node edit form which is particularly useful on smaller screens.

![Editing a template node in the Northflank application using the visual editor](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/create-template-edit-node.png)

The [write a template](infrastructure-as-code.md#write-a-template) section covers more specific details of workflows and nodes, and how to make templates for different use-cases.

Click create template or save changes to save your template.

### Create a template: Edit a template as code

Template code consists of JSON that defines resources and actions to be performed in workflows, as well as information about the template itself.

You can enter the content of your template using the Northflank code editor by selecting the  code view. The editor includes code hints, autocompletion, and error checking to help you include required properties in the correct format.

You can also use access the schema to edit templates in your IDE by including the relevant `$schema` field in the root of the template object:

| Template type | Schema |
| --- | --- |
| Template | `"$schema": "[https://api.northflank.com/v1/schemas/template](https://api.northflank.com/v1/schemas/template)"` |
| Release flow | `"$schema": "[https://api.northflank.com/v1/schemas/release-flow](https://api.northflank.com/v1/schemas/release-flow)"` |
| Preview environment | `"$schema": "[https://api.northflank.com/v1/schemas/preview-env](https://api.northflank.com/v1/schemas/preview-env)"` |

You can view the required specifications for [individual nodes](infrastructure-as-code.md#template-nodes), and for an entire template [in the API docs](../api/team/templates/create-template.md).

To see the full specification for a template (excluding argument overrides) you can click view specification from the template options , or you can enable GitOps to view it in your repo.

![Creating a template in the Northflank application using the code editor](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/create-template-code-editor.png)

### Create a template: Create from an existing project or resource

You can create from your existing resources and projects in the Northflank application by clicking new template from spec while viewing a specification.

#### Create a template: Create a template from a project

Click the  project template button in the project header to get the template for an entire project. You can switch between viewing the template code and the visual representation of the project, and view the specification for an individual resource by clicking on a node in the visual editor.

Click new template from spec to create a new template from the specification. Northflank will generate a template for your project based on your project's existing resources and their current configurations, and will group resources in workflows and order them in a logical way.

You may need to re-order workflows and nodes, edit their configurations, or add new nodes to your template to deploy your project successfully.

![An example of a project template specification in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/project-template-specification.png)

#### Create a template: Create a template from a resource

To view the specification for individual resources, such as services, addons, jobs you can click the options button  in the resource's header.

Select  view specification and ensure the view is on template code. Toggle between node only to copy the specification into an existing template, or full template which will give you a full template specification including the resource.

Click new template from spec to create a new template containing only this resource. If it's a [resource from within a project](infrastructure-as-code.md#template-nodes-project-resource-nodes) it will have the [project context](infrastructure-as-code.md#write-a-template-set-project-context) set on the node.

![An example of a resource template specification in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/resource-template-specification.png)

### Create a template: Set project context

Every node for a project-level resource must have a project context. You can either set the project context directly in the resource node, or the node can inherit the project context from a parent workflow. You can create and update resources across multiple projects by setting different contexts for workflows or nodes.

![Setting the project context for a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/setting-project-context.png)

Learn more about [setting project contexts](infrastructure-as-code.md#write-a-template-set-project-context).

### Create a template: Run your template automatically

You can enable run a template automatically so that any changes made to the template will trigger a template run, whether it's updated in the Northflank UI, via the API, or changed in the Git repository (if [GitOps is enabled](infrastructure-as-code.md#gitops-on-northflank)).

This is convenient if you want to manage your resources via templates, as triggering a run automatically will mean your resources will be updated to reflect the template specifications on change.

> [!warning]
> As your modified template will run as soon as it's updated, make sure your changes are as intended before saving or pushing to the repository, especially if the template affects your production environment. Any other templates linked via GitOps will also run automatically, if this option is enabled for those templates.

### Create a template: Enable GitOps for your template

You can enable GitOps to sync the template with a Git repository. You can make changes to your template by committing changes to it in the repository or by editing it on Northflank, and the changes will be propagated to the other platform automatically. This allows you to maintain your templates alongside your codebase, or in a separate infrastructure repository.

Enable GitOps and select the repository and branch that contains, or will contain, the template code. Enter the path to the template relative to the repository root. For example `/template.json` will look for a file called `template.json` in the repository root, while `/platform/backend.json` will look for a file called `backend.json` in the directory `platform`.

![GitOps enabled for a template in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/gitops-auto-run.png)

If a template file already exists at the path, it will be loaded into the editor. If no file exists, one will be created with the template specification defined in the editor.

It is not necessary, but it is recommended, to save the template file with the format `json` so it can be recognised by IDEs and text editors.

[Learn more about GitOps on Northflank](infrastructure-as-code.md#gitops-on-northflank).

### Create a template: Configure template run concurrency

You can choose how a template will behave if it receives more than one request to run at the same time, or receives a request to run while a run is still in progress.

- Allow (default): multiple template runs can be executed in parallel, with no restrictions

- Queue: each time a template run is triggered it will be added to a queue, and runs will be executed sequentially in order of creation

- Forbid: if a template is currently pending or running any run requests will be ignored

You may want to queue or forbid simultaneous runs to ensure that resources are not updated with conflicting configurations.

### Create a template: Provide secrets securely to a template

You should not include any secrets, such as API keys, passwords, or other sensitive data in your template. Instead, you should provide the values as [argument overrides](infrastructure-as-code.md#make-a-template-dynamic-supply-secrets-with-argument-overrides), which are stored securely on the Northflank platform, encrypted at rest. It's good practice to define [argument keys in your template](infrastructure-as-code.md#make-a-template-dynamic-add-arguments) without values, or with placeholder values, to make it clear what arguments are required in the template if you plan to share it or are working in a team.

![Setting argument overrides for a template in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/argument-overrides.png)

You can configure argument overrides for a template on its settings page, or via the `argumentsOverride` object in the template code, which will override any arguments with the same key. If the key specified in the overrides object does not exist in the arguments object, it will be inserted.

#### Create a template: Secret file encoding

Generally, secret files should be provided as a base64-encoded string. Secret file content provided as plain text via the UI will be converted to base64 when it is stored securely on the Northflank platform.

You can specify how Northflank will handle the `data` value for your secret file using the `encoding` field when it is mounted to the container. If you specify `utf-8`, Northflank will decode base64 content to utf-8. For example, you can use this to provide JSON, YAML, or other configuration files as a base64-encoded string, which can then be decoded for use in your container.

If you select `base64` encoding, Northflank will mount the file as base64 content without decoding it.

#### Create a template: Provide secret files in templates

You can provide secret files in service, job, and secret group [resource nodes](infrastructure-as-code.md#template-nodes-project-resource-nodes), in the relevant field for the resource in the template specification.

To use arguments, references, or functions in a secret file you must provide the content as a plaintext string so that they will resolve correctly when the template runs. You can then wrap the content in the `toBase64` [function](infrastructure-as-code.md#make-a-template-dynamic-use-northflank-functions) to encode the content as base64. For example:

```json
{
  "files": {
    "/config": {
      "data": "${fn.toBase64(args.CONFIG_SECRET)}",
      "encoding": "utf-8"
    }
  }
}
```

The argument or reference will be evaluated and the content of the secret file will be saved as base64. Northflank will then decode the `data` content to utf-8 when it is mounted to the container.

### Create a template: Access your templates

There are two ways to access your templates in the Northflank UI, either from your team dashboard, or from within a project.

Your team templates page will display all templates created within your team, regardless of any projects they may be related to. The template page within a project will only show templates that create or reference that project.

These separate views are only to make it easier to navigate to relevant templates as all templates are stored on the team.

### Create a template: Next steps

- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Update a template: Update a template and resources within a project.](infrastructure-as-code.md#run-a-template-update-a-template)

## Manage external infrastructure

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/external-infrastructure.md

Northflank provides a robust mechanism for provisioning and managing external
infrastructure directly within your own cloud environment through the use of
OpenTofu modules. OpenTofu is an open-source Infrastructure as Code (IaC) tool,
and Northflank integrates this capability by allowing OpenTofu modules to be
embedded as template nodes within Northflank templates.

These OpenTofu nodes can be added to any existing or new Northflank template,
enabling teams to automate the deployment of external infrastructure
components—such as databases, object storage, and other cloud
services—alongside application and service configuration. This infrastructure
is created and managed within your own cloud accounts.

Once the OpenTofu module is added to a template and configured, Northflank
takes responsibility for executing the module, managing its life cycle, and
securely storing the Terraform state between runs. This allows infrastructure
management integrated directly into your Northflank workflows.

The process of creating and configuring an OpenTofu node is consistent with how
other template nodes are added in Northflank. This documentation will guide you
through a complete example that demonstrates how to use an OpenTofu module to
provision an AWS S3 bucket.

You should understand how to [create a new template](infrastructure-as-code.md#create-a-template) and
[use other cloud
providers](../bring-your-own-cloud/use-other-cloud-providers-with-northflank)
before reading this section.

### Manage external infrastructure: Add provider integration to Northflank

Northflank OpenTofu nodes will require credentials to access upstream
providers. These are described in detail in [use other cloud
providers](../bring-your-own-cloud/use-other-cloud-providers-with-northflank).

> [!note]
> Northflank OpenTofu nodes currently do not support cross account roles. Make
sure to setup a provider integration with direct credentials.

1. Navigate to your Northflank account settings and open the clusters page

2. [Create a new cloud provider integration](https://app.northflank.com/s/account/cloud/clusters/integrations/new/aws)

3. Select Amazon Web Services as the provider and choose the OpenTofu feature

4. Open your
  [AWS IAM console](https://console.aws.amazon.com/iam/home),
  open the users page and create a new user without console access.
  Skip the remaining steps and save the user.

5. In the new user click add permissions and the required
  permissions for the resources you want to create. In our case we can allow
  all actions to S3 resources.

6. Open security credentials in your new user and click create
  access key. Select the `third-party service` use case and click
  next. Enter a description that will help you recognise your key
  (e.g. `Northflank OpenTofu`) and create access key.

7. Enter the `access key` and `secret key` for the user you created into the
  Northflank integration form and create the integration.

### Manage external infrastructure: Add an OpenTofu node to a template

OpenTofu nodes are created as part of a template. [Create a new
template](./create-a-template) or pick an existing one to begin. Add example as
the Node reference so we can refer to this node later in our template.

Add a new OpenTofu node to your template, this node contains all of the details
for a single OpenTofu module. We recommended keeping your modules as small as
possible as larger modules take longer to apply. You can use Northflank
templating system to pass variables between OpenTofu nodes, more details in the
outputs section below.

Northflank offers a limited selection of providers and resources. Please
contact us if there is anything you would like added.

Since we want an S3 bucket, that is available under the AWS provider. Select
that and the integration credentials setup in the previous step, as well as the
aws region that your resources will be created in.

The set of required fields will vary for different providers.

The providers and resources that Northflank makes available come directly from
the upstream [OpenTofu
registry](https://search.opentofu.org/providers). Refer to that documentation at any time for any
available attributes and descriptions of each one.

### Manage external infrastructure: Add OpenTofu resources

The next section of the OpenTofu node is where resources are defined, the set
of resources available will be different depending on the provider selected. To
add a resource click the Add resource button then select the resource type from
the available list. Provide a name to refer to that resource later in the node.

Select `aws_s3_bucket` as the type and name it `my_bucket`.

The Spec field is for entering this resources attributes as documented in the [
upstream providers resource documentation](https://search.opentofu.org/provider/hashicorp/aws/latest/docs/resources/s3_bucket#argument-reference). Refer to the upstream
documentation for details about which attributes are available for any resource
and details about those attributes. Northflank uses the JSON configuration
syntax, [
documented here](https://opentofu.org/docs/language/syntax/json/). The syntax is similar to HCL, the main
difference being that keys are quoted and the value separator is colon (:)
instead of equals (=).

There are no required attributes for the `aws_s3_bucket` resource so
we can leave the spec as an empty object, alternatively we can pass a name to
our bucket:

```json
{
  "bucket": "example-bucket-name"
}
```

> [!important]
> OpenTofu modules use the same syntax for template strings as Northflank
templates `{"${}"}`. They will be interpreted as Northflank template
strings, to use OpenTofu template strings you need to escape them with a
backslash.
For example `${aws_s3_bucket.my_bucket.id}`
will need to be written as `\${aws_s3_bucket.my_bucket.id}`.

### Manage external infrastructure: Use outputs

Any output attribute can be exposed to subsequent template nodes, however they
must be declared in the output section of the OpenTofu node.

In our example we want to access the S3 bucket domain name later in our
template. To do this add a new output, give it a descriptive name, and then as
the value enter

```
${aws_s3_bucket.my_bucket.bucket_domain_name}
```

> [!important]
> The form editor will auto escape these strings, however the code editor will
not. Make sure to escape any OpenTofu template string in the output section the
same as the resource section when using the code editor.

Any outputs declared in this way will be available on the OpenTofu node after
it has run. They can be accessed using Northflank template strings under the
refs object. If our node has a ref of example and we called the
output generated_url then the value can be referenced later in the
template with the template string
${refs.example.outputs.generated_url.value}.

> [!note]
> Outputs are not known until after the resources have been applied. Make sure
Wait for completion is selected if you are planning on using the
outputs.

Create a new secret group node and add a new variable with any name and
${refs.example.outputs.generated_url.value} as the value. Once
this template is run you will be able to retrieve the generated url from this
secret group.

### Manage external infrastructure: Run template

Once you are happy with the template, save and run it. Northflank will
provision all of the resources defined in the OpenTofu node once that node is
processed.

Provisioning resources may take some time so be patient. The OpenTofu node will
remain in pending state until the resources have either been successfully
created or failed. Any error messages are displayed on the node that failed.

Once the template has fully completed, you can view the secret group we created
to confirm that the outputs have saved as expected.

> [!note]
> Northflank currently has no way to delete resources once created. If you no
longer need these resources then it is up to you to clean them up.

Northflank can handle running multiple OpenTofu jobs simultaneously, however
only the latest run will contain accurate information. Northflank will skip
running any job for a OpenTofu node if it detects a later one has been
scheduled for the same OpenTofu node.

## GitOps on Northflank

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/gitops-on-northflank.md

GitOps on Northflank allows you to manage infrastructure, run releases, update deployments, and automate complex tasks using templates in a Git repository.

Bidirectional sync means that any changes to your template in your repository are automatically reflected on Northflank, and any changes you make in Northflank are committed to your repository on save, enforcing a single source of truth.

You can use GitOps with Northflank templates, release flows, and preview environments. You can [include release flows and preview environment templates](infrastructure-as-code.md#write-a-template-include-release-flows-and-preview-environment-templates) in a single template, or enable GitOps on each of your templates separately.

If run automatically when updated is also enabled you can run releases, scale up deployments, run backups, and manage almost anything else on Northflank simply by pushing a commit to a Git repository.

You can store templates in the same directory as your codebase, or you can store them in separate infrastructure repositories.

### GitOps on Northflank: Enable GitOps

You can enable GitOps from a template's settings page to begin syncing your release flow or template with a Git repository.

Northflank must have access to the repository to be able to create and update templates in it. If the repository is not accessible, navigate to Git integrations in your Northflank account and edit the installation for the Git account to enable access.

It is recommended, but not required, that you save templates with the `.json` file extension, so your IDE knows how to handle the file. When you save a template that has GitOps enabled you will be prompted to provide a commit message.

#### GitOps on Northflank: Save a new template in a repository

You can create a template in the Northflank application and save it to a repository and branch of your choice. Select the repository and branch, and enter the path (relative to the repository root) you want to save the file to.

Click fetch and continue editing your template. When you save your template Northflank will create the file in your repository and link it with the template on Northflank.

> [!warning]
> When you enable GitOps and fetch a template, if a template already exists at the specified path it will overwrite any template content on Northflank.

#### GitOps on Northflank: Use an existing template

You can use a template that already exists in a Git repository on Northflank. Select the repository and branch that contains the template file you want to use in the GitOps section.

Enter the path to your file (relative to the repository root, e.g. `/Northflank.json` or `/release-flows/development.json`) and click fetch to retrieve the existing template or release flow.

Northflank will load the file into the editor, and the file in the repository will be linked with the template or release flow in the Northflank application.

### GitOps on Northflank: Use GitOps

Any changes you make to a release flow or template with GitOps enabled in the Northflank application will be pushed to your linked repository on the configured branch on save.

Likewise, any commit pushed to the linked branch in your repository will update the template or release flow in Northflank.

#### GitOps on Northflank: Run a template on change

You can enable run automatically when the template is updated so that any changes to the template pushed to your repository will trigger a run of the template. You may want to configure your template's [concurrency settings](infrastructure-as-code.md#create-a-template-configure-template-run-concurrency), so that multiple updates in a short time period are handled as desired.

#### GitOps on Northflank: Run a release flow on change

You can run a release flow when changes are pushed to your repository, by configuring [Git triggers](release.md#create-a-pipeline-and-release-flow-release-flow-settings).

You can configure Git triggers to run a release only on commits to specific branches or pull requests with branch and pull request rules. You can also only run a release flow when either specific files or directories are changed, or ignore certain files or directories so releases are not triggered by, for example, documentation files.

You can also add commit message ignore flags, so that releases will not be triggered when commits with certain strings are pushed to your repository.

> [!note]
> If you have configured your template or release flow to run on change, your modified template or release flow will run as soon as it's updated. Make sure your changes are as intended before saving or pushing to the repository, especially if the template affects your production environment.

### GitOps on Northflank: Create multiple Northflank templates from one source

You can use a single template file in a Git repository as the source for multiple Northflank templates. To use the same template file for multiple Northflank templates you can use [arguments](infrastructure-as-code.md#make-a-template-dynamic-add-arguments), as well as [references](infrastructure-as-code.md#make-a-template-dynamic-get-node-outputs-from-references) and [functions](infrastructure-as-code.md#make-a-template-dynamic-use-northflank-functions) to make it programmatic, and not tied to specific projects or regions.

You can then create multiple Northflank templates from the template file. Create a new template in Northflank, [enable GitOps](infrastructure-as-code.md#gitops-on-northflank-enable-gitops) and enter the repository, branch, and path of your template. Give the template a distinct name and provide the necessary configuration values and secrets using argument overrides, which can be [added in the template's settings](infrastructure-as-code.md#make-a-template-dynamic-supply-secrets-with-argument-overrides). You can then repeat this process, adding different argument overrides for each template. Argument overrides are stored securely on Northflank, and not saved to your Git repository.

> [!note]
> If you have run automatically when the template is updated enabled while GitOps is enabled, all templates linked to the template file in the same Git repository and branch will run when the template is updated on Northflank or via Git.

The example below shows a template that creates a new project with a combined service. Most of the configuration fields are given as arguments, some of which are set as defaults in the arguments object, which can be overridden. Other arguments have no defaults, and must be provided as overrides for a successful template run.

Example template

#### GitOps on Northflank: Argument overrides

```json
{
  "argumentOverrides": {
    "PROJECT_NAME": "Demo in Europe West",
    "PROJECT_REGION": "europe-west",
    "API_KEY": "123xyz"
  }
}
```

#### GitOps on Northflank: Example template

```json
{
  "apiVersion": "v1.2",
  "arguments": {
    "PROJECT_NAME": "",
    "PROJECT_REGION": "",
    "SERVICE_INSTANCES": "1",
    "SERVICE_PLAN": "nf-compute-100-1",
    "GIT_ACCOUNT": "acme_corp",
    "GIT_REPO": "https://vcs.example.com/acme-corp/demo-service",
    "GIT_BRANCH": "main"
    "API_KEY": ""
  },
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "${args.PROJECT_NAME}",
            "color": "#7FD1B9",
            "region": "${args.PROJECT_REGION}",
            "networking": {
              "allowedIngressProjects": []
            }
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "context": {
              "projectId": "${refs.project.id}"
            },
            "steps": [
              {
                "kind": "CombinedService",
                "spec": {
                  "deployment": {
                    "instances": "${args.SERVICE_INSTANCES}",
                    "storage": {
                      "ephemeralStorage": {
                        "storageSize": 1024
                      },
                      "shmSize": 64
                    },
                    "docker": {
                      "configType": "default"
                    }
                  },
                  "runtimeEnvironment": {
                    "API_KEY": "${args.API_KEY}"
                  },
                  "runtimeFiles": {},
                  "buildArguments": {},
                  "buildFiles": {},
                  "billing": {
                    "deploymentPlan": "${args.SERVICE_PLAN}",
                    "buildPlan": "nf-compute-400-16"
                  },
                  "name": "Demo",
                  "vcsData": {
                    "projectType": "github",
                    "accountLogin": "${args.GIT_ACCOUNT}",
                    "projectUrl": "${args.GIT_REPO}",
                    "projectBranch": "${args.GIT_BRANCH}"
                  },
                  "ports": [
                    {
                      "internalPort": 80,
                      "protocol": "HTTP",
                      "name": "web",
                      "public": true,
                      "domains": [
                        "${args.PROJECT_REGION}.example.com"
                      ],
                      "security": {
                        "policies": [],
                        "credentials": []
                      },
                      "disableNfDomain": true
                    }
                  ],
                  "buildSettings": {
                    "dockerfile": {
                      "buildEngine": "kaniko",
                      "useCache": false,
                      "dockerWorkDir": "/",
                      "dockerFilePath": "/Dockerfile"
                    }
                  },
                  "disabledCI": false,
                  "buildConfiguration": {
                    "pathIgnoreRules": [],
                    "isAllowList": false,
                    "ciIgnoreFlagsEnabled": false
                  }
                },
                "ref": "demo"
              }
            ]
          }
        }
      ]
    }
  }
}
```

### GitOps on Northflank: GitOps security

In order to use GitOps securely with release flows and templates you should avoid including any sensitive data in the file committed to the repository, even if it is private.

You can save secrets for a template as [argument overrides](infrastructure-as-code.md#create-a-template-provide-secrets-securely-to-a-template) in the template settings, or pass them in [using the API, CLI, or client](../api/team/templates/run-template.md) when triggering a template run.

These arguments will be securely stored on the Northflank platform so you can save any sensitive information, or information you do not want to include in the template, as argument overrides. They can then be [used in your template](infrastructure-as-code.md#write-a-template-create-from-an-existing-project-or-resource) by referring to them using the format `${args.argumentName}`, replacing `argumentName` with the key saved in argument overrides.

### GitOps on Northflank: Remove a GitOps integration

You can remove the integration with your infrastructure file by disabling GitOps for the template or release flow in the Northflank application.

This will leave the file in your repository, but changes pushed to the file in your repository will no longer update the relevant release flow or template on Northflank. Similarly, changes made on Northflank will not be pushed to the file in your repository.

> [!warning]
> It is not recommended that you delete the file from the repository before disabling GitOps, as your file will become inaccessible on Northflank.

### GitOps on Northflank: Next steps

- [Create a template: Learn how to create and configure a Northflank template.](infrastructure-as-code.md#create-a-template)
- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)

## Infrastructure as code on Northflank

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/infrastructure-as-code.md

Northflank uses templates as its infrastructure as code (IaC) primitive. A template describes resources, services, databases, pipelines, and integrations, everything you would otherwise configure manually through the Northflank UI or API. You can build templates visually using a drag-and-drop node editor, or work directly in JSON. Both approaches produce the same output and can be used interchangeably. Templates are repeatable, versionable, and can be run on-demand or triggered automatically.

If you've used tools like Terraform or Pulumi, templates fill a similar role: they let you define your infrastructure in code, commit it to Git, and apply changes programmatically. The key difference is that templates are native to Northflank and can express the full range of Northflank-specific concepts including pipelines, release flows, and preview environments without needing a separate provider or plugin.

#### Infrastructure as code on Northflank: Types of template

There are three types of templates in Northflank, each scoped to a different part of your workflow.

- Team templates are the most general type. They are created at the team level and can define anything: cloud provider integrations, projects, services, databases, pipelines, and more. Use a team template when you want to provision an entire stack from scratch, replicate an environment across regions, or give other users a one-click way to deploy your project with their own configuration.

- Release flow templates are defined within a pipeline stage and automate the steps needed to ship a release. A release flow can back up a database, trigger a build, run a migration job, promote an image from staging to production, and more, all in a defined sequence. Each stage in a pipeline can have its own release flow template.

- Preview environment templates are also defined within a pipeline. They specify the resources and secrets that should be created whenever a pull request is opened or a new commit is pushed to a branch. The environment is ephemeral and is torn down automatically when the PR is closed or merged

![An example of a successfully run template in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/infrastructure-as-code-on-northflank/template-success.png)

### Infrastructure as code on Northflank: Writing templates

Templates are composed of nodes. Each node represents an action or resource, such as creating a service, deploying a database, or running a job. In the visual editor you drag nodes onto a canvas and connect them. In JSON, you define them as objects in a spec. Nodes can reference each other's outputs, allowing you to chain actions together. For example, you can create a database node and pass its connection string directly into a service node as an environment variable.

You can use templates to:

- Automate the process to deploy a single service, or multiple projects

- Manage your infrastructure and deployments using GitOps

- Add [integrations with cloud providers](bring-your-own-cloud.md#use-other-cloud-providers-with-northflank) and deploy clusters into your own cloud accounts

- Define pipelines with release flows and preview environments

- Create shareable one-click deployments for your project so users can get up and running immediately

Templates can be created using the visual editor in the Northflank application, or edited directly as JSON.

- [Create a template: Learn how to create and configure a Northflank template.](infrastructure-as-code.md#create-a-template)
- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [Template nodes: Learn about different types of template nodes, their behaviour, and their specifications.](infrastructure-as-code.md#template-nodes)
- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)

### Infrastructure as code on Northflank: Write dynamic templates

You can write templates in a programmatic manner so that they can be easily run with different configurations, or use dynamic values based on variables. Hardcoded values can be replaced by template arguments, references to the output from a previous template node, and functions that are evaluated when the template is run.

This allows you to use a single generalised template to deploy the same project in different regions, as different staging environments, or share a template where team members or the public can enter their own arguments to configure a deployment.

- [Use values from a template node: Use the values output from a node executed in a template.](infrastructure-as-code.md#make-a-template-dynamic-get-node-outputs-from-references)
- [Use arguments in your template: Use variables to make your template dynamic, and override the values on individual template runs.](infrastructure-as-code.md#make-a-template-dynamic-add-arguments)
- [Use functions in templates: Use Northflank functions in your templates to change and evaluate values based on arguments and node outputs.](infrastructure-as-code.md#make-a-template-dynamic-use-northflank-functions)
- [Manage multiple templates with GitOps: Use a single source of truth for your infrastructure and projects across regions and cloud providers, or deploy the same project with different configuration values.](infrastructure-as-code.md#gitops-on-northflank-create-multiple-northflank-templates-from-one-source)

### Infrastructure as code on Northflank: Manage infrastructure with GitOps

Northflank's bidirectional GitOps helps you maintain a single source of truth for your infrastructure and resource configuration. Any changes to your template code committed to your repository will automatically update the template on Northflank, and any changes to your template in Northflank will be committed to your repository. You can use one source template to manage multiple Northflank templates. Combined with [arguments and overrides](infrastructure-as-code.md#infrastructure-as-code-on-northflank-write-dynamic-templates) you can update multiple projects with separate configurations.

You can also set your template to run automatically when it is updated, meaning you can manage your infrastructure and configuration using Git.

- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Use Git Actions on Northflank: Create workflows and publish GitHub Actions that interact with Northflank.](infrastructure-as-code.md#use-github-actions-with-northflank)

### Infrastructure as code on Northflank: Define release flows and preview environments

Release flows are templates for specific pipeline stages that can automate release tasks, such as backing up databases, triggering and deploying builds, running jobs, and promoting images from one stage to another.

You can create a release flow either in an existing project's pipeline, or by configuring it in a pipeline node in a Northflank template. You can add Git or webhook triggers to run a release automatically.

- [Release flows and preview environments within templates: Create and manage pipelines with release flow and preview environment templates within Northflank templates.](infrastructure-as-code.md#write-a-template-include-release-flows-and-preview-environment-templates)
- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Configure a release flow: Learn how to use the visual editor or code to configure a release flow.](release.md#configure-a-release-flow)
- [Set up a preview environment: Create templates in your pipelines to automatically generate temporary preview environments to view pull requests and branches.](release.md#set-up-a-preview-environment)

### Infrastructure as code on Northflank: Versioning and history for templates

You can use [GitOps](infrastructure-as-code.md#infrastructure-as-code-on-northflank-manage-infrastructure-with-gitops) with your Northflank templates to track and manage changes in your Git repository.

All templates have a run history, detailing the status and output of each template run, which you can use to review and troubleshoot templates. Release flows allow you to roll back to a previous release with a single click.

Enterprise customers can use the template drafts feature to review proposed changes to a template directly in Northflank, and track template changes and runs using [audit logs](observe.md#audit-logs).

- [Manage template versions on Northflank: Use the template drafts system to review, accept, or reject proposed changes to your team's Northflank templates.](infrastructure-as-code.md#manage-template-versions)
- [Roll back a release: Roll back a release to a previous version.](release.md#run-and-manage-releases-roll-back-a-release)

## Make a template dynamic

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/make-a-template-dynamic.md

You can include variables and functions that are evaluated and resolved when a template is run. Rather than manually updating the same value across a template, such as changing the number of instances on a service or editing configuration values in a secret group, you can provide these values dynamically using references, arguments, and functions.

This means you can create one template as the source of truth for your infrastructure, and deploy the same projects in different regions or cloud providers, or using different configuration values and secrets.

Node references allow you to access the outputs from previous nodes in the workflow. You can use these, for example, to specify a build to deploy, a subdomain path to assign to a port, or a database or deployment status to check in a condition.

You can use arguments to provide configuration values to the template or your resources, argument overrides to supply secrets such as API tokens, and functions to manipulate data and provide different values based on arguments or node outputs.

You can include dynamic values in [release flow and preview environment templates](infrastructure-as-code.md#template-nodes-pipeline-node) within a pipeline node that will resolve on a template run, and specify dynamic values that will persist into the created pipeline templates that will then resolve when the release flow or preview environment template is run.

Northflank will dry-run a template before any template nodes are executed to ensure any references, arguments, and functions in the template can be resolved.

#### Make a template dynamic: Use dynamic values in the visual editor

You can include dynamic values in node forms by entering them in text fields as you would any other value. For example `${args.PROJECT_NAME}` can be directly inserted into the `Project name` field of a project node.

Where node forms have non-text fields you can switch to references mode  to enter a variable or function.

### Make a template dynamic: Get node outputs from references

When you add a node to your template and save it, it will be given a reference property (`ref`) generated from the resource name.

You can use this reference to refer to the output of that node later in the template. This is useful if you have steps in your workflow that require confirmation that previous steps have been completed successfully, or need values from resources created earlier. When you add a node to your template you will be given the option, where relevant, to select resources from your template, allowing you to specify resources that have not yet been created.

For example, a start build node will include references to any build services in your template when you select the resource to start a build in, as well as any that are in the project context if the project currently exists in your team.

![Getting a build service by reference in a template build node in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/make-a-template-dynamic/build-service-reference.png)

You can see the available properties for a reference by expanding output variables on the relevant node.

References to a node return a promise, which resolves to the relevant response from the node. References are accessed as code using the `refs` object, in the format `${refs.<reference-name>.<property>}`.

Reference code example
The example below shows a node to create a build service, and later a node to start a build. In this case the reference will resolve to `my-build-service`, which will be the Northflank ID generated from the build service's name. By using the reference to get `id` you can change the name of the build service without the need to update the value in the rest of the template.

```json
"steps": [
  {
    "kind": "BuildService",
    "ref": "builder"
    "spec": {
      "name": "My build service",
      ...
    }
  },
  {
    "kind": "Build",
    "spec": {
      "id": "${refs.builder.id}",
      "type": "service",
      "branch": "main",
      "reuseExistingBuilds": true,
    },
    "condition": "success"
  },
]
```

#### Make a template dynamic: Northflank DNS references

You can obtain the public DNS for a service from a reference in the following format: `${refs.<service-name>.ports.<array-number>.dns}`. Ports are an array of objects, you must provide the array position of the port you want to get the DNS for. For example if the first port on your service is a public HTTP port, you would obtain the DNS with the following: `${refs.<service-name>.ports.0.dns}`.

If you are using references to obtain the Northflank-generated DNS for a service, or connection details for an addon, you should include a [condition node](infrastructure-as-code.md#template-nodes-condition-nodes) to make sure the service or addon is running. This will ensure the service or addon has obtained a subdomain before using the reference to obtain the DNS or connection details.

#### Make a template dynamic: Dynamic domains

You can dynamically create subdomains in templates by configuring your domain to use [wildcard redirect routing and certificate generation](domains.md#wildcard-domains-and-certificates) when you add it to Northflank.

You can then use the values from references and arguments to assign subdomains to your services, for example `"${args.<argument-name>}.example.com"` or `"${refs.<reference-name>.<property>}.example.com"`.

You can also accept requests to any subdomain of the parent domain using [wildcard subdomains](domains.md#wildcard-domains-and-certificates-redirect-all-subdomains).

### Make a template dynamic: Add arguments

Arguments can be used to store template configuration values, dynamic values that you want to change, or build and environment variables for services and secret groups. This allows you to change one value passed to your template, rather than potentially multiple values throughout your template code.

You can include arguments in your template, referenced in the format `${args.<argument-name>}`, replacing `<argument-name>` with your key.

They are also useful if you have a value which is used repeatedly throughout the template that you want to change on subsequent template runs, or a value you wish to dynamically generate using a function.

Arguments are stored in the [argument object at the top-level of the template](infrastructure-as-code.md#write-a-template-template-specification) as key-value pairs. If you enable [GitOps](infrastructure-as-code.md#gitops-on-northflank) the arguments object will be saved in your template file. Similarly, [sharing a template](infrastructure-as-code.md#share-a-template) will also share the arguments object.

It can be useful to include the keys for sensitive data in your arguments object for reference, but you should use placeholder values and not include the actual secrets. Secrets should only be provided to a template securely using argument overrides.

### Make a template dynamic: Supply secrets with argument overrides

Argument overrides can be used to inject secure values into your template, or override existing argument values. Argument overrides are stored securely on Northflank, separately from your template. If you are [using GitOps](infrastructure-as-code.md#gitops-on-northflank) these will not be saved in your repository if you add the argument overrides in the Northflank UI using the template form. You should not commit argument overrides in your template.

You can configure argument overrides for a template on its settings page, which will override arguments with the same key in the `arguments` object. If the key specified in the overrides object does not exist in the arguments object, it will be inserted.

You can supply argument overrides using [the API](../api/team/templates/create-template.md) by including an `argumentOverrides` object containing the key-value pairs of arguments to override.

#### Make a template dynamic: Run on creation overrides

If you are creating a template using the API you can also specify `runOnCreationArgumentOverrides` in `options`, which will only be used when the template is created if `runOnCreation` is set to `true`.

Example template arguments

```json
{
  "name": "Example template arguments",
  "description": "This is a sample template.",
  "apiVersion": "v1",
  "arguments": {
    "ARGUMENT_1": "default_1",
    "ARGUMENT_2": "default_2",
    "ARGUMENT_3": ""
  },
  "argumentOverrides": {
    "ARGUMENT_1": "hello",
    "ARGUMENT_2": "world",
    "ARGUMENT_3": ""
  },
  "options": {
    "runOnCreation": true,
    "runOnCreationArgumentOverrides": {
      "ARGUMENT_1": "goodnight",
      "ARGUMENT_2": "moon",
      "ARGUMENT_3": ""
    },
    "autorun": false
  },
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        ...
      ]
    }
  }
}
```

### Make a template dynamic: Use Northflank functions

You can include functions in your template. Functions are called in the format: `"${fn.<function-name>(<arguments>)}"`, for example `"${fn.randomSecret(32, 'hex')}"`.

Functions are deterministic and will be evaluated on every template run, excluding the `randomSecret` function.

Functions can include references and arguments that do not resolve to a value, unlike the top-level of a template where references and arguments must resolve. Unresolved references and arguments will be treated as `false` if used as boolean arguments.

Functions are listed below, consisting of the function name, arguments and their types, and the purpose of the function.

#### Make a template dynamic: General

| Function | Arguments | Description |
| --- | --- | --- |
| randomSecret | length: `number`, encoding: `string: 'base64' or 'hex'` | Returns a random secret of the specified length in either base64 (default) or hex. This secret will be securely stored in the target resource and remain unchanged during subsequent executions of the template, unless it is manually removed. |
| date | format: `string` | Returns the current UTC date and time in ISO 8601, for example `2025-05-14T22:00:00.000Z`. You can optionally provide [Moment.js](https://momentjs.com/) formatting options such as `'YYYYMMDD'` or `'llll'`. |
| fetchSecret | secretId: `string` | Returns a global secret with the given secret ID. This is equivalent to fetching a secret with `secrets.SECRET_ID`, but can be used to dynamically fetch a secret with a changing ID string. This is less performant however, so is not recommended for cases where the secret ID is static. |

#### Make a template dynamic: String manipulation

| Function | Arguments | Description |
| --- | --- | --- |
| toBase64 | string: `string` | Converts a UTF-8 encoded string to a base64-encoded string |
| fromBase64 | base64: `base64` | Converts a base64-encoded string to a UTF-8 encoded string |
| slug | string: `string` | Converts a string to a slug (lowercase string with hyphens instead of spaces) |
| indexOf | string: `string`, match: `string` | Returns the index of the first instance of the substring in the string, or `-1` if not found |
| search | string: `string`, match: `string or regex` | Returns the index of the first pattern match in the string, or `-1` for no match |
| replace | original: `string`, match: `string or regex`, replacement: `string` | Replace the first match in the original string with the replacement string |
| replaceAll | original: `string`, match: `string or regex`, replacement: `string` | Replace all instances of the match in the original string with the replacement string |
| slice | original: `string`, startIndex: `integer`, endIndex: `integer` | Returns the string between the indices of the original string |
| length | string: `string` | Returns the length of the string as an integer |
| toUpper | string: `string` | Returns the string as uppercase characters |
| toLower | string: `string` | Returns the string as lowercase characters |
| split | string: `string`, separator: `string or regex`, limit?: `integer` | Splits the string into an array of substrings, split at the given separator. If `limit` is provided, the string will stop being split after `limit` entries, discarding the rest of the string. |
| join | strings: `string[]`, separator?: `string` | Join an array of substrings into a single string. If `separator` is provided, the substrings are joined with the `separator` between them. |
| toUpper | string: `string` | Converts a string to upper case. |
| toLower | string: `string` | Converts a string to lower case. |

#### Make a template dynamic: Boolean functions

Boolean arguments can be provided as truthy and falsy values similar to JavaScript. They can accept booleans, strings, and numbers, and if a reference or argument does not resolve, it will be regarded as false.

| Function | Arguments | Description |
| --- | --- | --- |
| not | boolean: `boolean` | Not |
| or | boolean1: `boolean`, boolean2: `boolean`, ... | Or, accepts any number of arguments |
| and | boolean1: `boolean`, boolean2: `boolean`, ... | And, accepts any number of arguments |
| if | boolean: `boolean`, then: `any`, else: `any` (optional) | If, returns `then` argument if true, otherwise returns `else` argument if provided |
| eq | equal1: `any`, equal2: `any`, ... | Equals, accepts any number of arguments |
| neq | not1: `any`, not2: `any`, ... | Not equals, accepts any number of arguments |
| gt | num1: `number`, num2: `number` | Greater than |
| lt | num1: `number`, num2: `number` | Lesser than |
| gte | num1: `number`, num2: `number` | Greater than or equal to |
| lte | num1: `number`, num2: `number` | Lesser than or equal to |

#### Make a template dynamic: Maths

| Function | Arguments | Description |
| --- | --- | --- |
| add | a: `number`, b: `number`, ... | Add all arguments, accepts any number of arguments |
| subtract | a: `number`, b: `number`, ... | Subtract all arguments, accepts any number of arguments |
| multiply | a: `number`, b: `number`, ... | Multiply all arguments, accepts any number of arguments |
| divide | a: `number`, b: `number` | Divide `a` by `b` |
| remainder | a: `number`, b: `number` | The remainder of `a` divided by `b` |
| exp | a: `number`, b: `number` | `a` to the power of `b` |
| floor | a: `number` | The floor of `a` |
| ceil | a: `number` | The ceiling of `a` |

#### Make a template dynamic: Objects

| Function | Arguments | Description |
| --- | --- | --- |
| get | object: `object or array`, field: `string` | Returns the value at a given path inside an object or array. |
| stringifyJSON | input: `any` | Converts an input to a JSON string. |
| parseJSON | string: `string` | Converts a string representing a JSON object into its respective type. Returns `''` if it failed to parse. |
| entries | object: `object` | Returns an array containing length-2 arrays of key-value pairs representing each key of the object and its respective value. |
| values | object: `object` | Returns an array containing the values of each key of the object. |
| keys | object: `object` | Returns an array containing the name of each key of the object. |

#### Make a template dynamic: Arrays

| Function | Arguments | Description |
| --- | --- | --- |
| find | array: `T[]`, fn: `(item: T, index: integer) => boolean` | Finds a given item in an array by applying a function to each member of the array and returning the first entry where the function returns a truthy value. If no items match, returns `undefined` |
| concat | arr1: `T[]`, arr2: `T[]`, ... | Joins any number of arrays together into a single array. |
| some | array: `T[]`, fn: `(item: T, index: integer) => boolean` | Applies a function to each member of an array, returning `true` if any results are truthy, and false if all results are falsy. |
| every | array: `T[]`, fn: `(item: T, index: integer) => boolean` | Applies a function to each member of an array, returning `true` if all results are truthy, and false if any results are falsy. |
| filter | array: `T[]`, fn: `(item: T, index: integer) => boolean` | Applies a function to each member of an array, returning an array containing only the original items where the function returned a truthy value. |
| map | array: `T[]`, fn: `(item: T, index: integer) => boolean` | Applies a function to each member of an array, returning a copy of the array containing the resulting values of the function. |
| arrSlice | array: `T[]`, start: `integer`, end?: `integer` | Returns a copy of an array containing a subset of the array contents, starting at the `start` index and ending at the `end` (or the end of the array if no `end` is provided). `start` can be negative to begin counting from the end of the array instead. |
| arrLength | array: `T[]` | Returns the length of the array. |

Functions example
This example template uses references, arguments, and functions to programmatically build and deploy from a Git repository.
The Git account, repository, and branch are given as arguments to define the service names and retrieve the Git account and repository URL. References are then used to trigger a build and deploy it in the deployment service.
The resources assigned to the deployment service depend on the name of the branch, combining `if` and `eq` functions, as well as passing different runtime variables to the deployment.

```JSON
{
  "apiVersion": "v1",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "BuildService",
          "ref": "builder",
          "spec": {
            "name": "${args.repository}-builder",
            "billing": {
              "deploymentPlan": "nf-compute-50"
            },
            "vcsData": {
              "projectUrl": "https://github.com/${args.account}/${args.repository}",
              "projectType": "github"
            },
            "buildSettings": {
              "dockerfile": {
                "buildEngine": "kaniko",
                "dockerFilePath": "/Dockerfile",
                "dockerWorkDir": "/"
              }
            },
            "buildConfiguration": {
              "prRestrictions": [
                "*"
              ],
              "branchRestrictions": [
                "main"
              ]
            }
          }
        },
        {
          "kind": "Build",
          "ref": "build",
          "spec": {
            "id": "${refs.builder.id}",
            "type": "service",
            "branch": "${args.branch}"
          }
        },
        {
          "kind": "Condition",
          "spec": {
            "kind": "Build",
            "spec": {
              "type": "success",
              "data": {
                "buildId": "${refs.build.id}"
              }
            }
          }
        },
        {
          "kind": "DeploymentService",
          "spec": {
            "name": "${args.branch}-deployment",
            "billing": {
              "deploymentPlan": "${fn.if(fn.eq(args.branch, 'main'), 'nf-compute-100', 'nf-compute-50')}"
            },
            "deployment": {
              "instances": "${fn.if(fn.eq(args.branch, 'main'), 3, 1)}",
              "docker": {
                "configType": "default"
              },
              "storage": {
                "ephemeralStorage": {
                  "storageSize": 1024
                }
              },
              "internal": {
                "id": "${refs.builder.id}",
                "branch": "${args.branch}",
                "buildId": "${refs.build.id}"
              }
            },
            "runtimeEnvironment": {
              "ENVIRONMENT": "${fn.if(fn.eq(args.branch, 'main'), 'production', 'development')}"
            }
          }
        }
      ]
    }
  }
}
```

### Make a template dynamic: Conditionally skip node execution

You can execute nodes on a conditional basis, so that they can either be skipped or executed depending on your requirements. You can use this to include nodes or entire workflows in your template that you don't want to execute on every template run, for example a job to initialise your database that you can skip on subsequent runs to scale your existing resources.

You can set this on a node in the template section where applicable. You can check skip node execution to skip a node or workflow, or switch the mode  to enter an argument or function.

If the provided value resolves to `true` then the node will not be executed during the template run, if the value resolves to `false` then the node will execute as normal.

You can use template arguments, functions, and references to programmatically execute or skip nodes.

Skip node execution example
In this example a function to check equality is used to see if the argument provided for `ENVIRONMENT` is `DEVELOPMENT`. If it is `DEVELOPMENT` then the function will resolve to `true` and the node will be skipped in the template run.

```json
{
    "kind": "workflow",
    "skipNodeExecution": "${fn.eq(args.ENVIRONMENT, 'DEVELOPMENT')}",
    "spec": {}
}
```

### Make a template dynamic: Next steps

- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Update a template: Update a template and resources within a project.](infrastructure-as-code.md#run-a-template-update-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)
- [Manage template versions on Northflank: Use the template drafts system to review, accept, or reject proposed changes to your team's Northflank templates.](infrastructure-as-code.md#manage-template-versions)

## Manage template versions

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/manage-template-versions.md

Template drafts allow you to review and manage updates to templates. Instead of directly saving changes to a template, team members create a new draft with their proposed updates. Drafts can then be reviewed, edited, and either closed or accepted.

Template drafts rely on a separate set of [role permissions](secure.md#use-role-based-access-control) compared to standard templates. Only team members assigned a role with `close` and `accept` permissions will be able to manage drafts.

You can enable template drafts in an [organisation's settings](collaborate.md#manage-an-organisation). This will prevent teams in your organisation from editing their templates directly, replacing save with create draft.

Drafts can be used with or without Git integration for templates, and allow you to review and manage template versions on Northflank.

### Manage template versions: Create a draft

You can create a new draft for a template by updating an existing template's content or settings [in the Northflank application](infrastructure-as-code.md#create-a-template).

After making your changes click create draft to preview your changes. You can add a name and description to help identify the request for changes, otherwise drafts will be given a randomly generated name if none is provided.

![Creating a template draft in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/manage-template-versions/create-template-draft.png)

#### Manage template versions: GitOps and drafts

If you have [enabled GitOps](infrastructure-as-code.md#gitops-on-northflank) for your template a new pull request will be opened for each template draft, and closed when a draft is accepted or closed. Pull requests to change templates will not appear in Northflank as template drafts.

If changes to a template have been submitted as a draft it should be managed on Northflank, similarly if changes been proposed using a pull request they should be managed on your Git service.

### Manage template versions: Manage drafts

Once a draft is created it will be listed under  drafts in the template editor. You can open a draft see more detail.

![Reviewing a template draft in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/manage-template-versions/review-template-draft.png)

#### Manage template versions: View differences

You can view the changes proposed in the draft as [template code](infrastructure-as-code.md#write-a-template). The read-only editor will display the differences between the currently existing template and the draft. Drafts will not contain updates to the template that happen after the draft has been created. You should check for any unwanted reversions if later drafts have already been accepted.

#### Manage template versions: Edit, accept, or close a draft

You can edit a draft to make more changes, reject the draft by closing it, or accept the changes to replace the existing template with the draft.

#### Manage template versions: Check history

If you have [audit logging](observe.md#audit-logs) enabled you can view the history of a template draft including who created it, any updates to it, and who closed or accepted it.

### Manage template versions: Next steps

- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Create a template: Learn how to create and configure a Northflank template.](infrastructure-as-code.md#create-a-template)
- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [Update a template: Update a template and resources within a project.](infrastructure-as-code.md#run-a-template-update-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)

## Run a template

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/run-a-template.md

You can run a template manually from either your account templates page or a project templates page. You can see all of your team's templates in the team templates page, while the project templates page will only contain templates that have created that project or affected project resources.

Open the template you want to use and click  run to start a template run.

You can add or edit [argument overrides](infrastructure-as-code.md#create-a-template-provide-secrets-securely-to-a-template) to change values and secrets for the template run. You can also provide arguments for a template run [using the API](../api/team/templates/run-template.md). This allows you to use one template and provide different configuration and secret values on each run simply by passing the required arguments.

### Run a template: View run status and history

When you run a template it will be scheduled to run, and enter the `pending` state.

It will shortly enter the `running` state, where it will begin running through the workflows defined in the template. You can see the status of each template, as well as the repository and file if [GitOps is enabled](infrastructure-as-code.md#gitops-on-northflank).

Each of your individual templates contains a list of template runs, the status of the template run, the commit hash (if the template run was triggered by a commit to a repository), and the time the template run was triggered.

#### Run a template: View template run

You can click on a template run to view the status of the components of your template, including creating/updating the project, overall workflows, and resources within individual workflows. Each node will indicate the state it is in, which can help you debug templates that are taking longer than expected to complete, or failing.

Each node can be expanded to view the template JSON for `running` nodes, and `successful` or `failed` nodes will also contain a `response` object from the Northflank API. Nodes can also receive a `retries` object, detailing the number of attempts and the time of the next attempt.

![The response for a node from a template run in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/run-a-template/template-run-response.png)

#### Run a template: Template node states

Workflows and nodes can have the following states:

Pending: the node or workflow will run when previous steps are executed successfully
Running: the node or workflow is currently being executed
Waiting: the node is waiting for an action to be completed, will eventually timeout unless it receives a successful response
Retrying: the node has failed on previous runs, but is being executed again (up to 3 attempts)
Success: the node or workflow has completed successfully
Failed: the node or workflow has failed to execute, or exceeded 3 retries

### Run a template: Run a template automatically

You can enable run a template automatically so that any changes made to the template will trigger a template run, whether it's updated in the Northflank UI, via the API, or changed in the Git repository (if [GitOps is enabled](infrastructure-as-code.md#gitops-on-northflank)).

This is convenient if you want to manage your resources via templates, as triggering a run automatically will mean your resources will be updated to reflect the template specifications on change.

> [!warning]
> As your modified template will run as soon as it's updated, make sure your changes are as intended before saving or pushing to the repository, especially if the template affects your production environment. Any other templates linked via GitOps will also run automatically, if this option is enabled for those templates.

### Run a template: Update a template

Templates can create new resources and update existing resources in your projects. If you update a template that uses one or more existing [projects as context](infrastructure-as-code.md#create-a-template-set-project-context) in the template, the next time it is run it will update resources with the same name (ID) with the new values in the template.

If the new template changes values that cannot be patched the template run will fail and the rest of the template will not be executed.

Existing resources in the projects, created manually or by previous template runs, will not be deleted by the template. If you have changed the names of resource in the template, new resources will be created alongside the existing ones, which may lead to unintended duplication of resources.

If you have enabled [run a template automatically](infrastructure-as-code.md#run-a-template-run-your-template-automatically) the template will be run immediately with any changes when you save the updated template. If you have also [enabled GitOps](infrastructure-as-code.md#create-a-template-enable-gitops-for-your-template) the template will be run as soon as your changes are committed.

### Run a template: Next steps

- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)

## Share a template

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/share-a-template.md

You can easily share any of your existing Northflank templates with a link, which you can copy after creating your template. This link will allow anyone with a Northflank account or team to add the template to their own account and run it, meaning users can begin using your application quickly, easily, and with minimal configuration on their part.

You should ensure there are no secrets contained within your template before sharing it. If your template requires secret values such as API tokens, the user receiving the template should add these in their own [argument overrides](infrastructure-as-code.md#create-a-template-provide-secrets-securely-to-a-template).

You can also share templates by making them available in a [git repository](infrastructure-as-code.md#gitops-on-northflank).

### Share a template: Use a Northflank template link

You can click the link for a Northflank template to add it to your account. If you belong to one or more teams, you must select the account to add the template to.

You will then be directed to the new template form, automatically populated with the contents of the shared template. You can [modify the template configuration](infrastructure-as-code.md#create-a-template) before saving, for example to change the project or to [enable GitOps](infrastructure-as-code.md#gitops-on-northflank) to save the template to a repository. You can also add any required [argument overrides](infrastructure-as-code.md#write-a-template-create-from-an-existing-project-or-resource) for the template. Check the documentation or guide from the source of the template for instructions on configuration and usage of the deployed application(s).

After you have created the template you will be able to run it.

> [!warning]
> Northflank cannot guarantee that templates written by third parties will work correctly. You should always check the contents of a template before running it.
For example, if the template deploys a Docker image, is it the expected image from the right account?

### Share a template: Next steps

- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Create a template: Learn how to create and configure a Northflank template.](infrastructure-as-code.md#create-a-template)
- [Write a template: Learn how to structure a Northflank template, define workflows, create resources, and perform actions.](infrastructure-as-code.md#write-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)

## Template nodes

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/template-nodes.md

The sections below contain information on the types of node that you can include in your template, how they are used, and their schema.

The nodes are divided into the following categories:

- Flow control  contains nodes that are to be run in sequence or parallel

- Team resources  specifies team-level resources, such as projects and cloud integrations

- Project resources  specifies a service, job, addon, or other resource to be created or updated

- Actions  specifies an action to run on a resources, such as starting a build, running a job, or executing a command

- Conditions  hold the template run while until the status of a resource or action is returned

### Template nodes: Flow control nodes

Flow control nodes contain resource and action nodes, and determine in what order they are executed. You can click the switch button  in the workflow node to change to a parallel or sequential flow.

Sequential workflows will execute nodes from first to last, and will wait until a node has succeeded before executing the next. Parallel workflows will execute all the nodes contained within in them at the same time.

Workflows can be nested. For example, you can run two sequential workflows simultaneously within a parallel workflow, within another sequential workflow.

If a node contained in a workflow fails, the entire workflow will be marked as failed.

#### Template nodes: Project context

You can specify the [project context](infrastructure-as-code.md#write-a-template-set-project-context) for a workflow which will be inherited by all the nodes contained within the workflow. This context can be overridden by setting the context directly on nodes or other workflows nested within this workflow.

- {object} Workflow node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofWorkflow
- spec
  {object} requiredThe specification for the workflow node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

### Template nodes: Team resource nodes

Team nodes create and update resources and integrations on the team level. They do not require a project context to run.

| Kind | Description |
| --- | --- |
| Project | Create or update a project |
| BYOC integration | Create or update a cloud provider integration |
| BYOC cluster | Create or update a cluster and node pools |
| Subdomain path | Create a path for routing on a subdomain |
| Tag | Create a new tag in the team for tagging resources |
| Custom plan | Create a custom resource plan in the team |
| Secret inheritance | Merge multiple global secrets with priority ordering |

#### Template nodes: Project

- {object} Project node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofProject
- spec
  (multiple options: oneOf) required
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: BYOC integration

- {object} BYOCIntegration node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofBYOCIntegration
- spec
  {object} requiredThe specification for the BYOCIntegration node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: BYOC cluster

- {object} BYOCCluster node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofBYOCCluster
- spec
  {object} requiredThe specification for the BYOCCluster node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Subdomain path

- {object} SubdomainPath node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofSubdomainPath
- spec
  {object} requiredThe specification for the SubdomainPath node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Tag

- {object} ResourceTag node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofResourceTag
- spec
  {object} requiredThe specification for the ResourceTag node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Custom plan

- {object} CustomPlan node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofCustomPlan
- spec
  {object} requiredThe specification for the CustomPlan node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Secret inheritance

- {object} SecretInheritance node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofSecretInheritance
- spec
  {object} requiredThe specification for the SecretInheritance node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

### Template nodes: Project resource nodes

Project resource nodes can be used to create or update services, jobs, addons, and other resources on the Northflank platform. They can also be used to trigger builds, run jobs, and schedule addon backups.

Project resource nodes require a [project context](infrastructure-as-code.md#create-a-template-set-project-context) to run. The context can be set directly on the node or inherited from a parent workflow.

| Kind | Description |
| --- | --- |
| Combined service | Create or update a combined service |
| Build service | Create or update a build service |
| Deployment service | Create or update a deployment service |
| Cron job | Create or update a cron job |
| Manual job | Creates or update a manual job |
| Addon | Creates or updates an addon |
| Secret group | Creates or updates a secret group |
| Pipeline | Creates or updates a [pipeline](infrastructure-as-code.md#template-nodes-pipeline-node) |
| Volume | Creates or updates a volume |

To enable CI/CD and build from private Git repositories you must have a [Git account linked to your Northflank team](getting-started.md#link-your-git-account). To deploy images from a private container registry you must add your [registry credentials to your team](run.md#save-registry-credentials).

#### Template nodes: Combined service

A combined service will automatically build and deploy the latest commit for the selected branch when it is created.

- {object} CombinedService node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofCombinedService
- spec
  {object} requiredThe specification for the CombinedService node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Build service

You must trigger a build using a start build node to deploy from a build service later in the template. Otherwise, a build will only be triggered when a commit matching the [build rules](build.md#build-code-from-a-git-repository-build-from-a-repository) is pushed.

- {object} BuildService node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofBuildService
- spec
  {object} requiredThe specification for the BuildService node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Deployment service

You can link a deployment service to a build service or deploy an image from a container registry.

If you are deploying from a Northflank build service you can toggle between deploying the latest build or the latest commit from the build service.

Latest build will deploy whatever the service has build most recently, regardless of the commit age. Latest commit will deploy the most recent commit to the branch that has been built by the service.

- {object} DeploymentService node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofDeploymentService
- spec
  {object} requiredThe specification for the DeploymentService node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Cron job

You can deploy a job using an image from a container registry or one built by a Northflank build service.

You can also build and deploy an image in a job by linking it to a Git repository, and create a build to deploy using a start build node.

- {object} CronJob node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofCronJob
- spec
  {object} requiredThe specification for the CronJob node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Manual job

You can deploy a job using an image from a container registry or one built by a Northflank build service.

You can also build and deploy an image in a job by linking it to a Git repository, and create a build to deploy using a start build node.

- {object} ManualJob node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofManualJob
- spec
  {object} requiredThe specification for the ManualJob node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Addon

You can make an addon's connection details available by linking them in a secret group node. An addon must be running to execute a backup or restore, you can use a [condition node](infrastructure-as-code.md#template-nodes-condition-nodes) to check before performing actions on an addon.

##### Template nodes: Fork an addon

You can fork an addon from an existing project, or one created earlier in the template using a reference. The addon must have a backup available created from the same major version.

You can use `latest` to use the most recent backup, but if no backup exists the template run will fail.

##### Template nodes: Upgrade an addon

You can enable upgrade on version mismatch to allow a template to trigger an upgrade for an existing addon (disabled by default). If the addon version specified in the template is greater than the version of the existing addon, the addon will be upgraded. Addons must follow the upgrade path and cannot skip major versions. For example, to upgrade an addon from version 14 to version 16, you must first run the template with version 15 specified before updating to version 16.

- {object} Addon node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofAddon
- spec
  (multiple options: anyOf) requiredThe provisioner type of the addon
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Secret group

- {object} SecretGroup node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofSecretGroup
- spec
  {object} requiredThe specification for the SecretGroup node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Volume

A running service will be restarted when a volume is attached to it.

- {object} Volume node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofVolume
- spec
  {object} requiredThe specification for the Volume node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

### Template nodes: Pipeline node

Pipeline nodes are used to create a pipeline in a project and populate the stages of the pipeline with deployment services, jobs, and addons.

You can also define a [preview environment and release flow templates](infrastructure-as-code.md#write-a-template-include-release-flows-and-preview-environment-templates) for each stage of the pipeline using the visual editor within the pipeline node.

#### Template nodes: References, arguments, and functions in nested templates

Normally composed references, arguments, and functions will not be resolved in release flow or preview environment templates in pipeline nodes when the template is executed. This is to preserve their functionality in the release flow and preview templates when they are created.

If you want to include references, arguments, or functions that will be executed when the template runs, so that the values are resolved in the release flow and preview environment templates when they are created, you can prefix them with `template`.

For example:

- `"${refs.build.branch}"` would become `"${template.refs.build.branch}"`

- `"${args.SECRET}"` would become `"${template.args.SECRET}"`

- `"${fn.randomString(64)}"` would become `"${template.fn.randomString(64)}"`

- {object} Pipeline node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofPipeline
- spec
  {object} requiredThe specification for the Pipeline node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Preview environment

The pipeline specification can include `preview`, a node with the kind `PreviewEnv`. The spec for the `PreviewEnv` node includes `apiVersion` and `spec`, where `spec` is the content of the preview environment template.

- {object} preview

- kind
  string The kind of node.one ofPreviewEnv
- spec
  {object} requiredThe preview environment template specification.

#### Template nodes: Release flow

Release flow template specifications can be included in pipeline stages.

- {object} releaseFlow

- kind
  string requiredThe kind of node.one ofReleaseFlow
- spec
  {object} requiredThe release flow template specification.

### Template nodes: Action nodes

You can define actions to take on existing services, addons, or Git services.

| Kind | Description |
| --- | --- |
| Run backup | Performs a backup on an addon |
| Import backup | Imports a backup into an addon from a URL or connection string |
| Job run | Runs a job with the specified configuration |
| Start build | Triggers a build in a service or job, from a branch or a specific commit |
| Run action | Performs the action contained within the node |

#### Template nodes: Run backup

An addon must be in a running state to [run a backup](databases-and-persistence.md#backup-restore-and-import-data) successfully. You can use a [condition node](infrastructure-as-code.md#template-nodes-condition-nodes) to ensure an addon is ready before the backup node runs.

- {object} AddonBackup node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofAddonBackup
- spec
  {object} requiredThe specification for the AddonBackup node.
- condition
  string one ofsuccess
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Run job

Start a [job run](run.md#run-an-image-once-or-on-a-schedule). The job must have a build or image available.

- {object} JobRun node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofJobRun
- spec
  {object} requiredThe specification for the JobRun node.
- condition
  string one ofsuccess
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Import backup

Import a backup into an addon from a URL or live database connection. Use this to automate data seeding, cross-environment migrations, or disaster recovery workflows in templates, workflows, and preview blueprints. See [backup, restore, and import data](databases-and-persistence.md#backup-restore-and-import-data-import-a-backup) for the UI method.

Provide exactly one of `url` (for publicly accessible backup files) or `connectionString` (to dump a live external database). File upload is only supported via the UI, not in template nodes.

By default, imports run asynchronously. Enable `waitForCompletion` to pause the workflow until the import finishes.

You can combine this with a `Run action` node to import and restore data in the same workflow.

- {object} AddonImport node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofAddonImport
- spec
  {object} requiredThe specification for the AddonImport node.
- condition
  string one ofsuccess
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Start build

You can trigger builds in build and combined services, and jobs that deploy from version control.

- {object} Build node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofBuild
- spec
  {object} requiredThe specification for the Build node.
- condition
  string one ofsuccess
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

#### Template nodes: Run action

The run action node can be used to perform actions in services, jobs, addons, and VCS (version control system) accounts.

| Kind | On resource |
| --- | --- |
| Restart | Service or addon |
| Execute command | Service or job |
| Restore addon from backup | Addon (with available backup) |
| Clone repository | Linked VCS account |

Commands in action nodes do not invoke a shell by default. Learn more about [executing commands in action nodes](run.md#access-running-containers-locally-execute-commands-in-an-action-node).

- {object} Action node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofAction
- spec
  (multiple options: oneOf) requiredThe specification for the Action node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

### Template nodes: Condition nodes

You can use condition nodes to check the status of a resource or action in a template or in an individual workflow. The workflow or template will continue to run until the condition is met, or until it times out.

In a sequential workflow the condition will stop following steps from running until the condition is met. In a parallel workflow all the steps will run, but the workflow will not be marked as completed unless the condition is met.

Below is a list of checks you can include in your template.

| Kind | Description |
| --- | --- |
| Running | Check a service, addon, or BYOC cluster is running |
| Success | Check a job, build, or addon backup has completed successfully |
| VCS | Check that a repository has been created |

| Kind | Description |
| --- | --- |
| Service | Check a service is running |
| Addon | Check an addon is running |
| Addon backup | Check an addon backup has completed successfully |
| BYOC cluster | Check a BYOC cluster is running |
| VCS | Check a Git repository has been cloned successfully |
| Build | Check a build has completed successfully |
| Job run | Check a job run has completed successfully |

- {object} Condition node

- ref
  string An identifier that can used to reference the output of this node later in the template.
- kind
  string requiredThe kind of node.one ofCondition
- spec
  (multiple options: oneOf) requiredThe specification for the Condition node.
- skipNodeExecution
  (multiple options: oneOf)

- string one oftrue, false
OR
- string pattern.*\${.*}.*

### Template nodes: Next steps

- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Update a template: Update a template and resources within a project.](infrastructure-as-code.md#run-a-template-update-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)
- [Manage template versions on Northflank: Use the template drafts system to review, accept, or reject proposed changes to your team's Northflank templates.](infrastructure-as-code.md#manage-template-versions)

## Use GitHub Actions with Northflank

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/use-github-actions-with-northflank.md

You can automate your workflows using [GitHub Actions](https://github.com/features/actions). You can adapt your existing GitHub Actions to work with Northflank, or create new ones.

You can define custom workflows that are triggered by events, such as a push to a repository or the creation of a pull request.

Workflows are defined in YAML files, which specify the sequence of steps to be executed in response to an event. Each step in a workflow can run commands, set environment variables, and interact with the GitHub API or other APIs.

Actions are reusable units of code that perform a specific task, such as building and testing your code, deploying to a server, or publishing a package. [GitHub marketplace](https://github.com/marketplace/actions) provides a library of pre-built actions that you can use in your workflows.

You can also create and publish your own custom actions to the GitHub Marketplace, where other developers can use them in their own workflows.

### Use GitHub Actions with Northflank: Create a GitHub Actions workflow

GitHub Actions workflows specify the sequence of steps to be executed in response to an event. Each step in a workflow can run commands, set environment variables, and interact with the GitHub API or other APIs. Workflows are defined by YAML files in your Git repository, saved in the `.github/workflows/` directory.

You can [learn more about writing workflows in the GitHub documentation](https://docs.github.com/en/actions/using-workflows/about-workflows).

You can reuse other workflows from your own repository, public repositories, or workflows in your organisation account. Learn more about [workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions).

#### Use GitHub Actions with Northflank: Workflow example

This example workflow builds and publishes and image, and then [triggers a Northflank release flow run](release.md#create-a-pipeline-and-release-flow) to deploy it.

The workflow logs in to the [GitHub container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry), builds the pull request branch in the repository and pushes the image to [https://ghcr.io/](https://ghcr.io/), and then [triggers a Northflank release flow using a webhook](release.md#create-a-pipeline-and-release-flow-release-flow-settings).

The events that trigger the workflow to run are defined in `on`, the environment variables to use in the workflow are defined in `env`, and the jobs to run as part of the workflow are defined in `jobs`.

The environment variables include the container registry to use (`REGISTRY`), and the `IMAGE_NAME`, which uses the `github` context to get the `repository` name as the value.

The `build-and-push-image` job specifies the base image to run the steps on (`ubuntu-latest`), and the GitHub `permissions` it requires.

The steps include `checkout repository`, which uses the published [checkout](https://github.com/marketplace/actions/checkout) action, `log in to the container registry` which uses the [Docker login](https://github.com/marketplace/actions/docker-login) action, and `build and push Docker image` which uses the [build and push Docker image](https://github.com/marketplace/actions/build-and-push-docker-images) action.

The final step runs a command (`curl`) to send a GET request to a Northflank release flow webhook, stored in the `NF_WEBHOOK` secret, and provides `image_tag` as a URL query parameter, which can then be [accessed in the release flow via the `args` object](release.md#configure-a-release-flow-node-arguments-and-references) to provide an image tag to deploy.

The workflow also uses two [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets), `GITHUB_TOKEN` which is automatically generated and passed to the workflow, and `NF_WEBHOOK`, which is generated in your [release flow's settings](release.md#create-a-pipeline-and-release-flow-release-flow-settings).

```yaml
name: Publish image and run release flow

on:
  pull_request:
    types: ['opened', 'reopened', 'synchronize']

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Log in to the Container registry
        uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@ad44023a93711e3deb337508980b4b5e9bcdc5dc
        with:
          context: .
          push: true
          tags: ghcr.io/northflank/release-flow-webhook-test:${{ github.SHA }}

      - name: Trigger release flow
        run: curl -X GET ${{ secrets.NF_WEBHOOK }}?image_tag=${{ github.SHA }}
```

### Use GitHub Actions with Northflank: Use secrets with a GitHub Action workflow

You can use environment variables and secrets with GitHub Actions. [Environment variables](https://docs.github.com/en/actions/learn-github-actions/variables#about-variables) are useful for passing data between steps, while [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) are used to store sensitive information such as passwords or API keys.

You can define secrets for a repository in the security section of the repository settings. Secrets for an organisation can similarly be defined in the security section of the organisation settings. You can define which organisation repositories a secret is available in by selecting a policy from the repository access dropdown list.

You can also give job steps an `id`, which can then be used to refer to the output from the Action used in that step, via the `steps` context (for example, `${{ steps.<id>.outputs.<key> }}`).

Learn more about the [contexts available in workflows](https://docs.github.com/en/actions/learn-github-actions/contexts), and see the [deploy to Northflank](infrastructure-as-code.md#use-github-actions-with-northflank-deploy-to-Northflank) workflow for more examples of contexts.

### Use GitHub Actions with Northflank: Deploy to Northflank using a GitHub Action

This workflow step demonstrates the [Deploy to Northflank](https://github.com/marketplace/actions/deploy-to-northflank) action, available on the GitHub marketplace, as it would be used in a workflow.

By providing the required variables this action can be used in your workflow to deploy an image from a container registry. [Read the full guide here](https://northflank.com/guides/use-a-git-hub-action-to-deploy-to-northflank).

```yaml
         - name: Deploy to Northflank
           uses: northflank/deploy-to-northflank@v1
           with:
              northflank-api-key: ${{ secrets.NORTHFLANK_API_KEY }}
              project-id: ${{ env.PROJECT_ID }}
              service-id: ${{ env.SERVICE_ID }}
              image-path: ${{ steps.<id>.outputs.<tags> }}
              credentials-id: ${{ env.CREDENTIALS_ID }}
```

### Use GitHub Actions with Northflank: Publish a GitHub Action

You can [write and publish](https://docs.github.com/en/actions/creating-actions/about-custom-actions) your own GitHub Actions to interact with Northflank, as well as the GitHub API and other third-party APIs.

GitHub Actions consist of your application code and an `action.yml`. The `action.yml` file [contains the metadata for your action](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions), including `name`, `author`, and `description`.

The `runs` attribute defines how GitHub will run your action, and the contents depend on whether you have written a [JavaScript, Docker, or composite action](https://docs.github.com/en/actions/creating-actions/about-custom-actions#types-of-actions).

It also contains the definitions for the `inputs` accepted by, and the `outputs` returned by your action, if required.

#### Use GitHub Actions with Northflank: Example action.yml file

The example below is a truncated version of the published Deploy to Northflank JavaScript action. You can see the [repository here](https://github.com/northflank/deploy-to-northflank), which contains the whole `action.yml`, as well as the action code (`index.ts`), `package.json`, and license.

```yaml
name: Deploy to Northflank
author: Northflank
description: Deploy Docker images to Northflank by updating the deployment configuration of existing services or jobs via a GitHub action.
inputs:
  northflank-api-host:
    description: Host of the Northflank API.
    required: false
    default: https://api.northflank.com

runs:
  using: node16
  main: dist/index.js

branding:
  icon: upload-cloud
  color: gray-dark
```

### Use GitHub Actions with Northflank: Next steps

- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Create a template: Learn how to create and configure a Northflank template.](infrastructure-as-code.md#create-a-template)
- [Set up a pipeline and release flow: Manage your deployments and release your updates in an intuitive pipeline with release flows.](release.md#create-a-pipeline-and-release-flow)
- [Configure a release flow: Learn how to use the visual editor or code to configure a release flow.](release.md#configure-a-release-flow)

## Write a template

Source: https://northflank.com/docs/v1/application/infrastructure-as-code/write-a-template.md

Templates consist of nodes within workflows. Nodes specify resources to create or update, or actions to take on existing resources within your team. You can create simple templates to create a project and deploy a service, or more complex templates with team account integrations, multiple projects, many resources, and different actions.

To write a template you can replicate your manual workflow to set up a project. Generally, the flow of the template should be the same as the steps to achieve a task using the Northflank application. For example, you would create a database addon, link it to a secret group, build your repository, and then deploy your service when the addon is ready.

You can also write separate templates for different stages of your workflow, for example one template to create an integration with a cloud provider and deploy a new cluster, and another template to create a project with your build and deployments.

The JSON that underlies Northflank templates is always accessible, so you can [view and edit a template as code](infrastructure-as-code.md#create-a-template-edit-a-template-as-code) if you prefer.

You should understand how to [create a new template](infrastructure-as-code.md#create-a-template) before reading this section.

### Write a template: Structure a template

Templates consist of workflows and nodes. Workflows determine the order that other workflows and nodes within them are executed, and the entire template specification must be contained in a parent workflow.

#### Write a template: Workflows

Nodes must be nested in workflows, which define whether nodes contained run in sequence (`sequential`), or at the same time (`parallel`). Click the switch button  in the workflow node to change to a parallel or sequential flow.

Workflows can be nested within other workflows to create more efficient templates. For example, you can group tasks that have to be executed in sequence in sequential workflows, but then place these within a parallel workflow if they can all be performed at the same time. This can help you avoid bottlenecks. For example, waiting for an addon to become ready may take a few minutes so it makes sense to create other services and build images at the same time, where possible.

![Parallel and sequential workflows in a template in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/write-a-template/workflows.png)

#### Write a template: Nodes

Nodes can create or update team integrations or resources, projects, and project resources. They can also perform actions on resources in the template or an existing project, such as cloning a repository, starting a build, executing a command in a running deployment, backing up a database, and much more.

To add a node, find the relevant node from the list, or use the search box, and drag the node into your workflow. You can then configure the node using the form, or the code view.

If a node is inserted into a sequential workflow, it will be placed before, between, or after other nodes depending on where it is dropped, with arrows showing the sequence the template will run in. Nodes dropped into a parallel workflow will be added without any order, as they will be executed simultaneously. You can drag and drop nodes to re-order them, or move them into and out of workflows.

Click save node to finish editing an individual node, cancel to discard your changes, or delete node to remove it.

### Write a template: Set project context

Every node for a [project resource](infrastructure-as-code.md#template-nodes-project-resource-nodes) must have a project context. You can either set the project context directly in the resource node specification, or the node can inherit the project context from a parent workflow. You can override the inherited project context by setting another project context on a nested node or workflow.

You can create and update resources across multiple projects by setting different project contexts for workflows or nodes.

![Setting the project context for a workflow in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/create-a-template/setting-project-context.png)

You can set the context as an existing project from your team, or create a new project in the template. If you [use a reference](infrastructure-as-code.md#make-a-template-dynamic-node-references) to set the project context, the project node must run before the reference is used in the template.

If you run a template with nodes that require, but do not have, a project context, the template run will fail.

Project context on a workflow code example
The example below creates a new project with a reference, before defining a workflow with that project as the context. Any resources included in this workflow will be created in that project.

```json
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "context": {},
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "New Project",
            "description": "This is a new project.",
            "color": "#0A5BA5",
            "region": "europe-west"
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "context": {
              "projectId": "${refs.project.id}"
            },
            "steps": []
          }
        }
      ]
    }
  }
}
```

Project context for a node code example
Project context can be supplied to nodes in the specification, either as a hardcoded project ID, or as a reference. This will override the project context inherited from a workflow, if any exists.

```json
{
  "kind": "DeploymentService",
  "spec": {
    "name": "nginx",
    "projectId": "my-project",
    "billing": {
      "deploymentPlan": "nf-compute-50"
    },
    "deployment": {
      "instances": 1,
      "external": {
        "imagePath": "library/nginx:latest"
      }
    },
    "ports": [
      {
        "name": "port-01",
        "internalPort": 80,
        "public": true,
        "protocol": "HTTP"
      }
    ]
  }
}
```

### Write a template: Get node outputs

A reference is automatically generated for each node you create, and you can manually edit node references in the template section of a node form. Some nodes display their output variables in a list that you can expand in the template editor.

You can refer to the output of a previous node by selecting the [node reference](infrastructure-as-code.md#make-a-template-dynamic-node-references) from the drop-down menu in another node, which will display relevant resources. You can use this to create sequences of actions, such as creating a build service, starting a build on that service, and then deploying the build image in a deployment service.

You can also check the values a node outputs by viewing a template run and expanding the node you want to view. The node's outputs that are accessible via the reference are contained in the `data` object within `response`.

![A node's output variables in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/write-a-template/node-output-variables.png)

### Write a template: Control node execution

While you can configure a template to perform tasks in parallel to ensure it runs quickly, you also need to ensure that prerequisite steps have been completed, or tasks have finished, before some nodes are executed.

If you try to reference a node before that node has been executed, you will not be able to run your template. Similarly, if you attempt to execute a command in a service that has not finished deploying, or need to run a job against a database that is not in a ready state, your template run will fail. In other cases your template run may succeed, but your jobs and deployments may have failed to execute or initialise properly.

You should not only put your nodes and workflows in the correct order, but also ensure that you're creating and awaiting the necessary conditions for each node to succeed.

![An await condition followed by an action node in a template in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/write-a-template/await-condition-and-action.png)

#### Write a template: Trigger actions

You can use [action nodes](infrastructure-as-code.md#template-nodes-action-nodes) to trigger actions in existing resources, including resources created previously in your template.

For example, you may need to run a job, create a new build in a build service, or restart a running deployment.

#### Write a template: Await condition

You can use [condition nodes](infrastructure-as-code.md#template-nodes-condition-nodes) to delay the execution of subsequent nodes until a condition has been successfully met, such as the completion of a build or an addon backup. Actions nodes also have conditions built in, but you can still use separate condition nodes elsewhere in the template to ensure nodes are executed at the right time.

You can set the timeout duration (in seconds) which will fail a condition node if the check fails to pass within the deadline. You can use this to make sure you get timely feedback about the state of a template run.

#### Write a template: Conditionally skip node execution

You can [add a condition to nodes and workflows](infrastructure-as-code.md#make-a-template-dynamic-conditionally-skip-node-execution) that will be checked before they are executed in the template. You can use this to include nodes or entire workflows that you don't want to be executed on every template run.

### Write a template: Include release flows and preview environment templates

[Pipeline nodes](infrastructure-as-code.md#template-nodes-pipeline-node) include the ability to create and edit release flows and preview environment templates within the template editor.

Editing a release flow or preview environment within a template will open the specific editors for those templates, and return you to the template editor when you save or exit the nested editor.

[Release flow](release.md#configure-a-release-flow) and [preview environment](release.md#set-up-a-preview-environment) templates have some unique nodes and behaviour to consider when creating them.

![A pipeline node in a template in the Northflank application](https://assets.northflank.com/documentation/v1/application/infrastructure-as-code/write-a-template/pipeline-node-resources-templates.png)

### Write a template: Template specification

A Northflank template includes metadata about the template itself, such as `apiVersion`, `name`, `arguments`, and more.

The `spec` object contains the body of the template, the workflows, conditions, resources, and actions that will be executed during a template run.

If you create or edit a template using the Northflank application you can configure all the template options on the settings page.

> [!note]
> Properties not mentioned in the Northflank application documentation may only be applicable to templates [created using the API](../api/team/templates/create-template.md) and should not be included in templates managed using the Northflank application or a Git repository.

Top level template fields
If you are writing a template as a JSON file the required fields, listed in the attributes below, must be included. You can also add a [`$schema` property](infrastructure-as-code.md#create-a-template-edit-a-template-as-code) to have code hints and error checking in your IDE.
If you  [enable GitOps](infrastructure-as-code.md#gitops-on-northflank-enable-gitops) it will add an object to the template containing the link data.

- {object}

- apiVersion
  string requiredThe version of the Northflank API to run the template against.one ofv1.2
- name
  string requiredName of the template.
- description
  string Description of the template.
- arguments
  {object} A set of arguments that can be referenced in a template using '${args.argumentName}'.

- argumentOverrides
  {object} Argument overrides stored outside of the template. If GitOps is enabled, these will not be saved in version control.

- options
  {object} Additional options for the template creation.

- autorun
  boolean If true, the template will run automatically whenever it is updated.
- concurrencyPolicy
  string Defines the concurrency behaviour of the template with respect to parallel runs.one offorbid, allow, queue

- spec
  {object} requiredContains nodes representing actions to be performed as part of the template.

```json
{
  "apiVersion": "v1.2",
  "name": "template-name",
  "description": "Your template description",
  "arguments": {},
  "argumentOverrides": {},
  "options": {
    "autorun": true,
    "concurrencyPolicy": "queue"
  },
  "spec": {}
}
```

### Write a template: Example template

This template example will guide you through building a template to deploy [Payload CMS](https://payloadcms.com/). In this example you will:

1. Create a new template

2. Deploy an addon and a combined service that builds from a Git repository

3. Create a secret group to store required environment variables and addon connection details

4. Configure template settings

5. Run the template

6. Await conditions and restart the service (optional)

Each step also has the template code for reference.

#### Write a template: Create a new template

First, [create a new template](https://app.northflank.com/s/account/templates) in your team and select the visual editor.

When you create a new template in Northflank it is populated with a project node and a sequential workflow. The workflow node uses the reference to the project node to get the project context from the project node (`"${refs.project.id}"`). All nodes that create or update project resources within this workflow will execute in this project, unless they are given another context.

The project node form will automatically open, or you can click on the node to enter the editor. Enter `Payload` as the name for your project, select a region, and save the node.

A project and a workflow with project context

```json
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "Payload",
            "region": "europe-west",
            "networking": {
              "allowedIngressProjects": []
            }
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "context": {
              "projectId": "${refs.project.id}"
            },
            "steps": []
          }
        }
      ]
    }
  }
}
```

#### Write a template: Deploy an addon and combined service

You can now add project resources to your workflow, they will be created in the project when the template runs.

First, drag and drop an Addon node into the sequential workflow. Select `MongoDB`, name it `Database` and select `latest` as the version before saving the node.

Next, drag and drop a Combined service node into the workflow after the addon. Name it `Payload`, enter `https://github.com/northflank-guides/deploy-payload-on-northflank` as the repository and select the `master` branch. You can replace this with your own repository, if you have one. Select `Dockerfile` as the build type and Northflank will automatically configure a port for it. Click save the node to finish.

Deploy an addon and combined service

```json
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "Payload",
            "region": "europe-west",
            "networking": {
              "allowedIngressProjects": []
            }
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "context": {
              "projectId": "${refs.project.id}"
            },
            "steps": [
              {
                "kind": "Addon",
                "spec": {
                  "externalAccessEnabled": false,
                  "type": "mongodb",
                  "billing": {
                    "replicas": 1,
                    "storage": 6144,
                    "storageClass": "nvme",
                    "deploymentPlan": "nf-compute-50"
                  },
                  "tlsEnabled": true,
                  "name": "Database",
                  "version": "latest"
                },
                "ref": "database"
              },
              {
                "kind": "CombinedService",
                "spec": {
                  "deployment": {
                    "instances": 1,
                    "storage": {
                      "ephemeralStorage": {
                        "storageSize": 1024
                      },
                      "shmSize": 64
                    },
                    "docker": {
                      "configType": "default"
                    }
                  },
                  "runtimeEnvironment": {},
                  "runtimeFiles": {},
                  "buildArguments": {},
                  "buildFiles": {},
                  "billing": {
                    "deploymentPlan": "nf-compute-10",
                    "buildPlan": "nf-compute-400-16"
                  },
                  "name": "Payload",
                  "vcsData": {
                    "projectType": "github",
                    "projectUrl": "https://github.com/northflank-guides/deploy-payload-on-northflank",
                    "projectBranch": "master"
                  },
                  "ports": [
                    {
                      "internalPort": 3000,
                      "protocol": "HTTP",
                      "name": "p01",
                      "public": true,
                      "domains": [],
                      "security": {
                        "policies": [],
                        "credentials": []
                      },
                      "disableNfDomain": false
                    }
                  ],
                  "buildSettings": {
                    "dockerfile": {
                      "buildEngine": "kaniko",
                      "useCache": false,
                      "dockerWorkDir": "/",
                      "dockerFilePath": "/Dockerfile",
                      "buildkit": {
                        "useInternalCache": false,
                        "internalCacheStorage": 16384
                      }
                    }
                  }
                },
                "ref": "payload"
              }
            ]
          }
        }
      ]
    }
  }
}
```

#### Write a template: Create a secret group

New you can add a secret group in the workflow to contain environment variables that the Payload application requires. Drag and drop a Secret group node after your combined service and name it `Secrets`.

In the secrets section of the form, switch to the env editor and copy and paste the following variables:

```dotenv
PAYLOAD_PUBLIC_BASE_DNS="https://${refs.payload.ports.0.dns}"
PAYLOAD_SECRET="${args.PAYLOAD_SECRET}"
```

`PAYLOAD_PUBLIC_BASE_DNS` gets the Northflank-generated domain name for the Payload port using the reference `"https://${refs.payload.ports.0.dns}"` with the required `https://` protocol added. This is only available after the service has been created, so the secret group needs to be added after the combined service.

`PAYLOAD_SECRET` is a random secret value used to encrypt Payload API keys. The value in the secret group is obtained from the template arguments object, using `"${args.PAYLOAD_SECRET}"`. We'll add this argument in the template settings later.

Next click show addons in the linked addons section. Configure the database we added to the template, and then click `MONGO_SRV` to link this connection detail to the secret group. Add an alias of `MONGODB_URI`, as this is the environment variable key expected by Payload. Save the node.

Create a secret group

```json
{
  "apiVersion": "v1.2",
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "Payload",
            "region": "europe-west",
            "networking": {
              "allowedIngressProjects": []
            }
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "context": {
              "projectId": "${refs.project.id}"
            },
            "steps": [
              {
                "kind": "Addon",
                "spec": {
                  "externalAccessEnabled": false,
                  "type": "mongodb",
                  "billing": {
                    "replicas": 1,
                    "storage": 6144,
                    "storageClass": "nvme",
                    "deploymentPlan": "nf-compute-50"
                  },
                  "tlsEnabled": true,
                  "name": "Database",
                  "version": "latest"
                },
                "ref": "database"
              },
              {
                "kind": "CombinedService",
                "spec": {
                  "deployment": {
                    "instances": 1,
                    "storage": {
                      "ephemeralStorage": {
                        "storageSize": 1024
                      },
                      "shmSize": 64
                    },
                    "docker": {
                      "configType": "default"
                    }
                  },
                  "runtimeEnvironment": {},
                  "runtimeFiles": {},
                  "buildArguments": {},
                  "buildFiles": {},
                  "billing": {
                    "deploymentPlan": "nf-compute-10",
                    "buildPlan": "nf-compute-400-16"
                  },
                  "name": "Payload",
                  "vcsData": {
                    "projectType": "github",
                    "projectUrl": "https://github.com/northflank-guides/deploy-payload-on-northflank",
                    "projectBranch": "master"
                  },
                  "ports": [
                    {
                      "internalPort": 3000,
                      "protocol": "HTTP",
                      "name": "p01",
                      "public": true,
                      "domains": [],
                      "security": {
                        "policies": [],
                        "credentials": []
                      },
                      "disableNfDomain": false
                    }
                  ],
                  "buildSettings": {
                    "dockerfile": {
                      "buildEngine": "kaniko",
                      "useCache": false,
                      "dockerWorkDir": "/",
                      "dockerFilePath": "/Dockerfile",
                      "buildkit": {
                        "useInternalCache": false,
                        "internalCacheStorage": 16384
                      }
                    }
                  }
                },
                "ref": "payload"
              },
              {
                "kind": "SecretGroup",
                "spec": {
                  "type": "secret",
                  "secretType": "environment-arguments",
                  "priority": 10,
                  "secrets": {
                    "variables": {
                      "PAYLOAD_PUBLIC_BASE_DNS": "https://${refs.payload.ports.0.dns}",
                      "PAYLOAD_SECRET": "${args.PAYLOAD_SECRET}"
                    },
                    "files": {}
                  },
                  "addonDependencies": [
                    {
                      "addonId": "${refs.database.id}",
                      "keys": [
                        {
                          "keyName": "MONGO_SRV",
                          "aliases": [
                            "MONGODB_URI"
                          ]
                        }
                      ]
                    }
                  ],
                  "name": "Secrets"
                },
                "ref": "secrets"
              }
            ]
          }
        }
      ]
    }
  }
}
```

#### Write a template: Configure template settings

Open the settings for the template.

Name the template `Payload` and then select edit in the argument overrides section. Click add variable then enter `PAYLOAD_SECRET` as the key and `${fn.randomSecret(256)}` as the value.

This will generate a random value using the Northflank function. Once generated, it will be securely stored on Northflank and injected into the template arguments on each run. It also ensures that future template runs do not generate new values.

All sensitive secrets should be stored as argument overrides, not within the template or as template arguments.

Finally, create template to save your template.

Configure template settings

```json
{
  "apiVersion": "v1.2",
  "name": "Payload",
  "description": "Deploy Payload with MongoDB",
  "options": {
    "autorun": false,
    "concurrencyPolicy": "allow"
  },
  "argumentOverrides": {
    "PAYLOAD_SECRET": "${fn.randomSecret(256)}"
  },
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "Payload",
            "region": "europe-west",
            "networking": {
              "allowedIngressProjects": []
            }
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "context": {
              "projectId": "${refs.project.id}"
            },
            "steps": [
              {
                "kind": "Addon",
                "spec": {
                  "externalAccessEnabled": false,
                  "type": "mongodb",
                  "billing": {
                    "replicas": 1,
                    "storage": 6144,
                    "storageClass": "nvme",
                    "deploymentPlan": "nf-compute-50"
                  },
                  "tlsEnabled": true,
                  "name": "Database",
                  "version": "latest"
                },
                "ref": "database"
              },
              {
                "kind": "CombinedService",
                "spec": {
                  "deployment": {
                    "instances": 1,
                    "storage": {
                      "ephemeralStorage": {
                        "storageSize": 1024
                      },
                      "shmSize": 64
                    },
                    "docker": {
                      "configType": "default"
                    }
                  },
                  "runtimeEnvironment": {},
                  "runtimeFiles": {},
                  "buildArguments": {},
                  "buildFiles": {},
                  "billing": {
                    "deploymentPlan": "nf-compute-10",
                    "buildPlan": "nf-compute-400-16"
                  },
                  "name": "Payload",
                  "vcsData": {
                    "projectType": "github",
                    "projectUrl": "https://github.com/northflank-guides/deploy-payload-on-northflank",
                    "projectBranch": "master"
                  },
                  "ports": [
                    {
                      "internalPort": 3000,
                      "protocol": "HTTP",
                      "name": "p01",
                      "public": true,
                      "domains": [],
                      "security": {
                        "policies": [],
                        "credentials": []
                      },
                      "disableNfDomain": false
                    }
                  ],
                  "buildSettings": {
                    "dockerfile": {
                      "buildEngine": "kaniko",
                      "useCache": false,
                      "dockerWorkDir": "/",
                      "dockerFilePath": "/Dockerfile",
                      "buildkit": {
                        "useInternalCache": false,
                        "internalCacheStorage": 16384
                      }
                    }
                  },
                  "disabledCI": false,
                  "buildConfiguration": {
                    "pathIgnoreRules": [],
                    "isAllowList": false,
                    "ciIgnoreFlagsEnabled": false
                  }
                },
                "ref": "payload"
              },
              {
                "kind": "SecretGroup",
                "spec": {
                  "type": "secret",
                  "secretType": "environment-arguments",
                  "priority": 10,
                  "secrets": {
                    "variables": {
                      "PAYLOAD_PUBLIC_BASE_DNS": "https://${refs.payload.ports.0.dns}",
                      "PAYLOAD_SECRET": "${args.PAYLOAD_SECRET}"
                    },
                    "files": {}
                  },
                  "addonDependencies": [
                    {
                      "addonId": "${refs.database.id}",
                      "keys": [
                        {
                          "keyName": "MONGO_SRV",
                          "aliases": [
                            "MONGODB_URI"
                          ]
                        }
                      ]
                    }
                  ],
                  "name": "Secrets",
                  "restrictions": {
                    "restricted": false,
                    "nfObjects": [],
                    "tags": []
                  }
                },
                "ref": "secrets"
              }
            ]
          }
        }
      ]
    }
  }
}
```

#### Write a template: Run your template

Now you can [run your template](infrastructure-as-code.md#run-a-template), and watch each step complete. You can click view resource on a node to be taken to the created project resource.

#### Write a template: Await conditions and restart the service (optional)

This is a simple template and the combined service should deploy the image after the addon has finished provisioning and when the required secrets are created. When you create more complex templates and use separate build and deployment services, you may find services deploy before other necessary resources are ready.

To solve this you can add await nodes to control the template flow, and action nodes to restart resources when required. As an example, we'll add two condition nodes and an action node to our template.

Drag and drop a parallel workflow after the secret group node, then add an Await condition node to it. Select `addon` as the resource kind, select `database` from the template as the resource, and then choose to wait until the `resource is running`.

Save the node, then add another Await condition to the same parallel workflow. This time select `service` as the kind, `payload` as the resource, wait until the `resource is running` and save the node.

These condition nodes check that the addon is ready to use and that the combined service has built and deployed an image.

Finally, add an Action node after the parallel workflow. Select `service` as the kind, `payload` as the resource, and choose `restart` as the action.

Await conditions and restart the service

```json
{
  "apiVersion": "v1.2",
  "name": "Payload",
  "description": "Deploy Payload with MongoDB",
  "options": {
    "autorun": false,
    "concurrencyPolicy": "allow",
    "runOnUpdate": false
  },
  "argumentOverrides": {
    "PAYLOAD_SECRET": "${fn.randomSecret(256)}"
  },
  "spec": {
    "kind": "Workflow",
    "spec": {
      "type": "sequential",
      "steps": [
        {
          "kind": "Project",
          "ref": "project",
          "spec": {
            "name": "Payload",
            "region": "europe-west",
            "networking": {
              "allowedIngressProjects": []
            }
          }
        },
        {
          "kind": "Workflow",
          "spec": {
            "type": "sequential",
            "context": {
              "projectId": "${refs.project.id}"
            },
            "steps": [
              {
                "kind": "Addon",
                "spec": {
                  "externalAccessEnabled": false,
                  "type": "mongodb",
                  "billing": {
                    "replicas": 1,
                    "storage": 6144,
                    "storageClass": "nvme",
                    "deploymentPlan": "nf-compute-50"
                  },
                  "tlsEnabled": true,
                  "name": "Database",
                  "version": "latest"
                },
                "ref": "database"
              },
              {
                "kind": "CombinedService",
                "spec": {
                  "deployment": {
                    "instances": 1,
                    "storage": {
                      "ephemeralStorage": {
                        "storageSize": 1024
                      },
                      "shmSize": 64
                    },
                    "docker": {
                      "configType": "default"
                    }
                  },
                  "runtimeEnvironment": {},
                  "runtimeFiles": {},
                  "buildArguments": {},
                  "buildFiles": {},
                  "billing": {
                    "deploymentPlan": "nf-compute-10",
                    "buildPlan": "nf-compute-400-16"
                  },
                  "name": "Payload",
                  "vcsData": {
                    "projectType": "github",
                    "projectUrl": "https://github.com/northflank-guides/deploy-payload-on-northflank",
                    "projectBranch": "master"
                  },
                  "ports": [
                    {
                      "internalPort": 3000,
                      "protocol": "HTTP",
                      "name": "p01",
                      "public": true,
                      "domains": [],
                      "security": {
                        "policies": [],
                        "credentials": []
                      },
                      "disableNfDomain": false
                    }
                  ],
                  "buildSettings": {
                    "dockerfile": {
                      "buildEngine": "kaniko",
                      "useCache": false,
                      "dockerWorkDir": "/",
                      "dockerFilePath": "/Dockerfile",
                      "buildkit": {
                        "useInternalCache": false,
                        "internalCacheStorage": 16384
                      }
                    }
                  },
                  "disabledCI": false,
                  "buildConfiguration": {
                    "pathIgnoreRules": [],
                    "isAllowList": false,
                    "ciIgnoreFlagsEnabled": false
                  }
                },
                "ref": "payload"
              },
              {
                "kind": "SecretGroup",
                "spec": {
                  "type": "secret",
                  "secretType": "environment-arguments",
                  "priority": 10,
                  "secrets": {
                    "variables": {
                      "PAYLOAD_PUBLIC_BASE_DNS": "https://${refs.payload.ports.0.dns}",
                      "PAYLOAD_SECRET": "${args.PAYLOAD_SECRET}"
                    },
                    "files": {}
                  },
                  "addonDependencies": [
                    {
                      "addonId": "${refs.database.id}",
                      "keys": [
                        {
                          "keyName": "MONGO_SRV",
                          "aliases": [
                            "MONGODB_URI"
                          ]
                        }
                      ]
                    }
                  ],
                  "name": "Secrets",
                  "restrictions": {
                    "restricted": false,
                    "nfObjects": [],
                    "tags": []
                  }
                },
                "ref": "secrets"
              },
              {
                "kind": "Workflow",
                "spec": {
                  "type": "parallel",
                  "steps": [
                    {
                      "kind": "Condition",
                      "spec": {
                        "kind": "Addon",
                        "spec": {
                          "data": {
                            "addonId": "${refs.database.id}"
                          },
                          "type": "running"
                        }
                      }
                    },
                    {
                      "kind": "Condition",
                      "spec": {
                        "kind": "Service",
                        "spec": {
                          "data": {
                            "serviceId": "${refs.payload.id}"
                          },
                          "type": "running"
                        }
                      }
                    }
                  ]
                }
              },
              {
                "kind": "Action",
                "spec": {
                  "kind": "Service",
                  "spec": {
                    "data": {
                      "serviceId": "${refs.payload.id}"
                    },
                    "type": "restart"
                  }
                },
                "ref": "refspayloadid-action-1"
              }
            ]
          }
        }
      ]
    }
  }
}
```

### Write a template: Next steps

- [Run a template: Run templates manually or automatically.](infrastructure-as-code.md#run-a-template)
- [Update a template: Update a template and resources within a project.](infrastructure-as-code.md#run-a-template-update-a-template)
- [GitOps on Northflank: Use templates and release flows in a Git repository to trigger changes to your config and resources.](infrastructure-as-code.md#gitops-on-northflank)
- [Share a template: Share templates with your team or the public.](infrastructure-as-code.md#share-a-template)
- [Manage template versions on Northflank: Use the template drafts system to review, accept, or reject proposed changes to your team's Northflank templates.](infrastructure-as-code.md#manage-template-versions)
