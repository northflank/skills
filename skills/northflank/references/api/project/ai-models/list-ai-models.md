# List AI models

Source: https://northflank.com/docs/v1/api/project/ai-models/list-ai-models.md

Lists all AI models for a project

Required permission: Project > AiModels > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Query parameters:**

{object}
- `per_page`: (integer) The number of results to display per request. Maximum of 100 results per page.
- `page`: (integer) The page number to access.
- `cursor`: (string) The cursor returned from the previous page of results, used to request the next page. (min length: 24) (max length: 24)

**Response body:**

{object} Response object.
- `data`: {object} (required) Result data.
  - `llmModelDeployments`: [array of] (required) An array of AI models in this project. {object} An AI model.
     - `name`: (string) (required) The name of the AI model. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `description`: (string) A description of the AI model. (pattern: ^[\s\S]*$) (max length: 1024)
     - `tags`: [array of] An array of previously defined tags to help identify and group the resource. (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
     - `spec`: {object} (required)
       - `type`: (string) (required) Type of model spec - custom for user-defined configuration (enum: custom)
       - `configuration`: {object} (required) LLM model configuration including engine, architecture, and compute settings
         - `name`: (string)
         - `engine`: (string) (enum: vllm)
         - `revision`: (string)
         - `nodeConfiguration`: {object}
           - `gpu`: {object}
             - `enabled`: (boolean)
             - `configuration`: {object}
               - `gpuType`: (string)
               - `gpuCount`: (integer)
               - `timesliced`: (boolean)
           - `storage`: {object}
             - `accessMode`: (string) (enum: ReadWriteMany)
             - `storageClass`: (string) The type of the storage. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
             - `storageSize`: (integer) (required) The size of the storage, in megabytes. Configurable sizes depend on the storage class.
             - `shmSize`: (integer) (nullable)
         - `architecture`: {object}
           - `type`: (string) (enum: aggregated)
           - `workerConfig`: {object}
             - `replicas`: (integer)
             - `parallelismConfig`: {object}
               - `tensorParallelism`: (integer)
               - `pipelineParallelism`: (integer)
               - `expertParallelism`: (integer)
             - `sequenceLengthConfig`: {object}
               - `maxModelLength`: (multiple options) The maximum model context length (input and output tokens), or `auto` to derive it from the model's config (integer) A fixed maximum context length, in tokens | (string) `auto` to derive the maximum context length from the model's config (enum: auto)
               - `maxInputLength`: (integer)
               - `maxOutputLength`: (integer)
             - `batchingConfig`: {object}
               - `maxNumSeqs`: (integer)
               - `maxNumBatchedTokens`: (integer)
             - `enableChunkedPrefill`: (boolean)
             - `enablePrefixCaching`: (boolean)
             - `enforceEager`: (boolean)
             - `enableAsyncScheduling`: (boolean)
             - `gpuMemoryUtilization`: (number) (format: float)
             - `trustRemoteCode`: (boolean)
             - `dataType`: (string) (enum: auto, float16, bfloat16)
             - `kvCacheDataType`: (string) (enum: fp8, fp8_e5m2, fp8_e4m3)
             - `quantization`: (string) (enum: fp8, awq, gptq, int4)
     - `id`: (string) (required) The unique identifier of the AI model.
     - `projectId`: (string) (required) ID of the project that the AI model belongs to
     - `entityId`: (string) (required) The entity ID (team) this deployment belongs to.
     - `entityType`: (string) (required) (enum: user, team, org)
     - `creatorId`: (string) (required) The user who created this deployment.
     - `dns`: {object} (required) DNS configuration for the AI model.
       - `base`: (string) (required) (pattern: ^([a-zA-Z0-9-]{2,}\.){2,}[a-zA-Z]{2,}$)
       - `zone`: (string) (required)
     - `ports`: [array of] (required) An array of ports for the AI model. {object}
         - `id`: (string) (required) The id used to identify the port across requests. (pattern: ^[a-z]-?[a-z0-9]+(-[a-z0-9]+)*$)
         - `name`: (string) (required) The name of the port used in the public url and UI. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
         - `internalPort`: (integer) (required) The port number.
         - `protocol`: (string) (required) The protocol used by the port.
         - `public`: (boolean) (required) If true, the port is exposed publicly.
         - `dns`: (string) DNS entry for this port.
         - `disableNfDomain`: (boolean) Disable routing on the default code.run domain for public HTTP ports with custom domains.
     - `status`: (string) (required) The current status of the AI model. (enum: pending, provisioning, starting, crashed, paused, running, deleting)
     - `deploymentConfiguration`: {object} Details of the latest deployment configuration.
       - `id`: (string) (required) The deployment configuration identifier.
       - `createdAt`: (string) time of creation (format: date-time)
     - `createdAt`: (string) time of creation (format: date-time)
     - `updatedAt`: (string) time of update (format: date-time)
- `pagination`: {object} (required) Data about the endpoint pagination.
  - `hasNextPage`: (boolean) (required) Is there another page of results available?
  - `cursor`: (string) The cursor to access the next page of results.
  - `count`: (number) (required) The number of results returned by this request. (format: float)

### API reference

GET /v1/projects/{projectId}/llm-model-deployments

GET /v1/teams/{teamId}/projects/{projectId}/llm-model-deployments

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request GET \
  "https://api.northflank.com/v1/projects/{projectId}/llm-model-deployments?per_page=50&page=1"
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/llm-model-deployments?per_page=50&page=1"

headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("GET", url, headers = headers)

print(response.json())
```

#### Example Response

200 OK: A list of AI models that belong to the project.

```json
{
  "data": {
    "llmModelDeployments": [
      {
        "name": "deepseek-v3-deployment",
        "description": "A deployment for DeepSeek V3 model",
        "spec": {
          "configuration": {
            "nodeConfiguration": {
              "storage": {
                "storageClass": "nvme",
                "storageSize": 6144
              }
            }
          },
          "type": "custom"
        },
        "projectId": "default-project",
        "id": "string",
        "entityId": "string",
        "entityType": "user",
        "creatorId": "string",
        "dns": {
          "base": "string",
          "zone": "string"
        },
        "ports": [],
        "status": "pending"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  }
}
```

### CLI reference

$ northflank list llm-model-deployments

Options:

- `--projectId <projectId>`: ID of the project

- `--per_page <per_page>`: The number of results to display per request. Maximum of 100 results per page.

- `--page <page>`: The page number to access.

- `--cursor <cursor>`: The cursor returned from the previous page of results, used to request the next page.

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting - custom-columns only applies for list commands

#### Example Response

 A list of AI models that belong to the project.

```json
{
  "llmModelDeployments": [
    {
      "name": "deepseek-v3-deployment",
      "description": "A deployment for DeepSeek V3 model",
      "spec": {
        "configuration": {
          "nodeConfiguration": {
            "storage": {
              "storageClass": "nvme",
              "storageSize": 6144
            }
          }
        },
        "type": "custom"
      },
      "projectId": "default-project",
      "id": "string",
      "entityId": "string",
      "entityType": "user",
      "creatorId": "string",
      "dns": {
        "base": "string",
        "zone": "string"
      },
      "ports": [],
      "status": "pending"
    }
  ]
}
```

### JavaScript client reference

#### Example request

With an organization token, add `parameters.teamId`. [Organization API access](../../use-the-api.md#organization-api-access).

```javascript
await apiClient.list.llmModelDeployments({
  parameters: {
    "projectId": "default-project"
  },
  options: {
    "per_page": 50,
    "page": 1
  }
});
```

#### Example Response

 A list of AI models that belong to the project.

```json
{
  "data": {
    "llmModelDeployments": [
      {
        "name": "deepseek-v3-deployment",
        "description": "A deployment for DeepSeek V3 model",
        "spec": {
          "configuration": {
            "nodeConfiguration": {
              "storage": {
                "storageClass": "nvme",
                "storageSize": 6144
              }
            }
          },
          "type": "custom"
        },
        "projectId": "default-project",
        "id": "string",
        "entityId": "string",
        "entityType": "user",
        "creatorId": "string",
        "dns": {
          "base": "string",
          "zone": "string"
        },
        "ports": [],
        "status": "pending"
      }
    ]
  },
  "pagination": {
    "hasNextPage": false,
    "count": 1
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```

### Python client reference

#### Example request

[Set up the Python client](../../use-the-python-client.md#usage).

With an organization token, add `team_id`. [Organization API access](../../use-the-api.md#organization-api-access).

```python
from northflank import ApiClient

# Reads NORTHFLANK_API_TOKEN or NF_API_TOKEN
client = ApiClient()

response = client.list.llm_model_deployments(
    project_id="default-project",
    page=1,
    per_page=50,
)
print(response.data)
```

#### Example Response

 Example value of response.data:

```json
{
  "llmModelDeployments": [
    {
      "name": "deepseek-v3-deployment",
      "description": "A deployment for DeepSeek V3 model",
      "spec": {
        "configuration": {
          "nodeConfiguration": {
            "storage": {
              "storageClass": "nvme",
              "storageSize": 6144
            }
          }
        },
        "type": "custom"
      },
      "projectId": "default-project",
      "id": "string",
      "entityId": "string",
      "entityType": "user",
      "creatorId": "string",
      "dns": {
        "base": "string",
        "zone": "string"
      },
      "ports": [],
      "status": "pending"
    }
  ]
}
```
