# Edit service runtime environment

Source: https://northflank.com/docs/v1/api/project/services/edit-service-runtime-environment.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /services/patch-combined-service instead](patch-combined-service.md)

Sets the runtime environment for the given service.

Required permission: Project > Secrets > Services > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `runtimeEnvironment`: {object}
- `runtimeFiles`: {object}

**Response body:**

{object}
- `data`: {object}
  - `success`: (boolean) (required) True if the operation was successful.
  - `restartSuccessful`: (boolean) (required) Did the service successfully restart with the new environment variables?

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/runtime-environment

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/runtime-environment

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/runtime-environment
```

```javascript
const payload = {
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/runtime-environment', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/runtime-environment"

payload = {"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/runtime-environment"

  var jsonStr = []byte(`{"runtimeEnvironment":{"VARIABLE_1":"abcdef","VARIABLE_2":"12345"},"runtimeFiles":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}`)
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

200 OK: Details about the updated runtime environment.

```json
{
  "data": {
    "success": true,
    "restartSuccessful": true
  }
}
```

### CLI reference

$ northflank update service runtime-environment

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "runtimeEnvironment": {
    "VARIABLE_1": "abcdef",
    "VARIABLE_2": "12345"
  },
  "runtimeFiles": {
    "/dir/fileName": {
      "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
      "encoding": "utf-8"
    }
  }
}
```

#### Example Response

 Details about the updated runtime environment.

```json
{
  "success": true,
  "restartSuccessful": true
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.service.runtimeEnvironment({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "runtimeEnvironment": {
      "VARIABLE_1": "abcdef",
      "VARIABLE_2": "12345"
    },
    "runtimeFiles": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  }
});
```

#### Example Response

 Details about the updated runtime environment.

```json
{
  "data": {
    "success": true,
    "restartSuccessful": true
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
