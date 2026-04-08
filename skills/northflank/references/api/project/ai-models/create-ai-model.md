# Create AI model

Source: https://northflank.com/docs/v1/api/project/ai-models/create-ai-model.md

Create an AI model

Required permission: Project > AiModels > General > Create

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `name`: (string) (required) The name of the AI model. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) A description of the AI model. (pattern: ^[\s\S]*$) (max length: 1024)
- `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `ports`: [array of] {object}
   - `name`: (string) (required) The name used to identify the port. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 1) (max length: 8)
   - `internalPort`: (integer) (required) The port number.
   - `public`: (boolean) If true, the port will be exposed publicly.
   - `domains`: [array of] (string) A domain to redirect to this port.
   - `disableNfDomain`: (boolean) Disable routing on the default code.run domain for public HTTP ports with custom domains.
   - `protocol`: (string) (required) The protocol to use for the port. (enum: HTTP, HTTP/2, TCP, UDP)
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

### API reference

POST /v1/projects/{projectId}/llm-model-deployments

POST /v1/teams/{teamId}/projects/{projectId}/llm-model-deployments

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"deepseek-v3-deployment","description":"A deployment for DeepSeek V3 model","spec":{"configuration":{"nodeConfiguration":{"storage":{"storageClass":"nvme","storageSize":6144}}}}}' \
  https://api.northflank.com/v1/projects/{projectId}/llm-model-deployments
```

```javascript
const payload = {
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
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/llm-model-deployments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NORTHFLANK_API_TOKEN}`
  },
  body: JSON.stringify(payload)
})

const json = await response.json()
console.log(json)
```

```python
import requests

url = "https://api.northflank.com/v1/projects/{projectId}/llm-model-deployments"

payload = {"name":"deepseek-v3-deployment","description":"A deployment for DeepSeek V3 model","spec":{"configuration":{"nodeConfiguration":{"storage":{"storageClass":"nvme","storageSize":6144}}}}}
headers = {"Content-Type": "application/json", "Authorization": "Bearer NORTHFLANK_API_TOKEN"}

response = requests.request("POST", url, headers = headers, json = payload)

print(response.json())
```

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

func main() {
  url := "https://api.northflank.com/v1/projects/{projectId}/llm-model-deployments"

  var jsonStr = []byte(`{"name":"deepseek-v3-deployment","description":"A deployment for DeepSeek V3 model","spec":{"configuration":{"nodeConfiguration":{"storage":{"storageClass":"nvme","storageSize":6144}}}}}`)
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer NORTHFLANK_API_TOKEN")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("Response status:", resp.Status)
  fmt.Println("Response headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("Response body:", string(body))
}
```

#### Example Response

200 OK: success

### CLI reference

$ northflank create llm-model-deployment

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

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
  }
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.llmModelDeployment({
  parameters: {
    "projectId": "default-project"
  },
  data: {
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
    }
  }
});
```
