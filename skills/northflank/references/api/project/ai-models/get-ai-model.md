# Get AI model

Source: https://northflank.com/docs/v1/api/project/ai-models/get-ai-model.md

Gets details about an AI model

Required permission: Project > AiModels > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `llmModelDeploymentId`: (string) (required) ID of the AI model

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the AI model. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) A description of the AI model. (pattern: ^[\s\S]*$) (max length: 1024)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `spec`: {object}
    - `type`: (string) (required) Type of model spec - custom for user-defined configuration (enum: custom)
    - `configuration`: {object}
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
          - `shmSize`: (integer)
      - `architecture`: {object}
        - `type`: (string) (enum: aggregated)
        - `workerConfig`: {object}
          - `replicas`: (integer)
          - `parallelismConfig`: {object}
            - `tensorParallelism`: (integer)
            - `pipelineParallelism`: (integer)
            - `expertParallelism`: (integer)
          - `sequenceLengthConfig`: {object}
            - `maxModelLength`: (multiple options) (integer) | (string) (enum: auto)
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
  - `dns`: {object}
    - `base`: (string) (required) (pattern: ^([a-zA-Z0-9-]{2,}\.){2,}[a-zA-Z]{2,}$)
    - `zone`: (string) (required)
  - `ports`: [array of] {object}
     - `id`: (string) (required) The id used to identify the port across requests. (pattern: ^[a-z]-?[a-z0-9]+(-[a-z0-9]+)*$)
     - `name`: (string) (required) The name of the port used in the public url and UI. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
     - `internalPort`: (integer) (required) The port number.
     - `protocol`: (string) (required) The protocol used by the port.
     - `public`: (boolean) (required) If true, the port is exposed publicly.
     - `dns`: (string) DNS entry for this port.
     - `disableNfDomain`: (boolean) Disable routing on the default code.run domain for public HTTP ports with custom domains.
  - `status`: (string) (required) The current status of the AI model. (enum: pending, provisioning, starting, crashed, paused, running, deleting)
  - `deploymentConfiguration`: {object}
    - `id`: (string) (required) The deployment configuration identifier.
    - `createdAt`: (string) time of creation (format: date-time)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

GET /v1/projects/{projectId}/llm-model-deployments/{llmModelDeploymentId}

GET /v1/teams/{teamId}/projects/{projectId}/llm-model-deployments/{llmModelDeploymentId}

#### Example Response

200 OK: Details about an AI model.

```json
{
  "data": {
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
      }
    },
    "projectId": "default-project"
  }
}
```

### CLI reference

$ northflank get llm-model-deployment

Options:

- `--projectId <projectId>`: ID of the project

- `--llmModelDeploymentId <llmModelDeploymentId>`: ID of the AI model

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about an AI model.

```json
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
    }
  },
  "projectId": "default-project"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.llmModelDeployment({
  parameters: {
    "projectId": "default-project",
    "llmModelDeploymentId": "deepseek-v3-deployment"
  }
});
```

#### Example Response

 Details about an AI model.

```json
{
  "data": {
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
      }
    },
    "projectId": "default-project"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
