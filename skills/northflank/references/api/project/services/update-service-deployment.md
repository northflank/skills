# Update service deployment

Source: https://northflank.com/docs/v1/api/project/services/update-service-deployment.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /services/patch-combined-service instead](patch-combined-service.md)

Updates the deployment settings of the given service.

Required permission: Project > Services > Deployment > Update Deployment

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `external`: {object}
  - `imagePath`: (string) (required) Image to be deployed. When not deploying from Dockerhub the URL must be specified. (pattern: ^(?:(?:https?:\/\/)?([a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+)(\/v1)?)?(?:\/)?([a-zA-Z/-9\.\-_]+)(?:\:([a-zA-Z/-9\.\-_\:]+)|\@([a-zA-Z/-9\.\-_\:]+))$)
  - `credentials`: (string) ID of the saved credentials to use to access this external image. (pattern: ^[A-Za-z0-9-]+$)
- `docker`: {object}
  - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
  - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
  - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`

OR

{object}
- `internal`: {object}
  - `id`: (multiple options) (string) (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 54) | (string)
  - `branch`: (string) Branch to deploy
  - `buildSHA`: (multiple options) (string) A commit sha. (min length: 40) (max length: 40) | (string) Latest commit. (enum: latest)
  - `buildId`: (string) ID of the build that should be deployed
- `buildpack`: {object}
  - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
  - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
  - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
  - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
- `docker`: {object}
  - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
  - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
  - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`

OR

{object}
- `buildpack`: {object}
  - `configType`: (string) (required) Type of buildpack run configuration (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
  - `customProcess`: (string) Custom process which should be run. Required in case where `configType` is `customProcess`
  - `customEntrypoint`: (string) Custom entrypoint which should be run. Required in case where `configType` is `customEntrypointCustomCommand`
  - `customCommand`: (string) Custom command which should be run. Required in case where `configType` is `customCommand`, `customEntrypointCustomCommand` or `originalEntrypointCustomCommand`
- `docker`: {object}
  - `configType`: (string) (required) Type of entrypoint & command override configuration (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
  - `customEntrypoint`: (string) Custom entrypoint which should be used. Required in case where `configType` is `customEntrypoint` or `customEntrypointCustomCommand`
  - `customCommand`: (string) Custom command which should be used. Required in case where `configType` is `customCommand` or `customEntrypointCustomCommand`

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/deployment

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/deployment

#### Example request

Request body

An external deployment

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"external":{"imagePath":"nginx:latest","credentials":"example-credentials"},"docker":{"configType":"default"}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment
```

```javascript
const payload = {
  "external": {
    "imagePath": "nginx:latest",
    "credentials": "example-credentials"
  },
  "docker": {
    "configType": "default"
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment"

payload = {"external":{"imagePath":"nginx:latest","credentials":"example-credentials"},"docker":{"configType":"default"}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment"

  var jsonStr = []byte(`{"external":{"imagePath":"nginx:latest","credentials":"example-credentials"},"docker":{"configType":"default"}}`)
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

OR

An internal deployment

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"internal":{"id":"example-build-service","branch":"master","buildId":"premium-guide-6393"},"docker":{"configType":"default"}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment
```

```javascript
const payload = {
  "internal": {
    "id": "example-build-service",
    "branch": "master",
    "buildId": "premium-guide-6393"
  },
  "docker": {
    "configType": "default"
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment"

payload = {"internal":{"id":"example-build-service","branch":"master","buildId":"premium-guide-6393"},"docker":{"configType":"default"}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment"

  var jsonStr = []byte(`{"internal":{"id":"example-build-service","branch":"master","buildId":"premium-guide-6393"},"docker":{"configType":"default"}}`)
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

OR

Don't modify the deployment

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"docker":{"configType":"default"}}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment
```

```javascript
const payload = {
  "docker": {
    "configType": "default"
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment"

payload = {"docker":{"configType":"default"}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/deployment"

  var jsonStr = []byte(`{"docker":{"configType":"default"}}`)
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

200 OK: The operation was performed successfully.

```json
{
  "data": {}
}
```

### CLI reference

$ northflank update service deployment

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

An external deployment

```json
{
  "external": {
    "imagePath": "nginx:latest",
    "credentials": "example-credentials"
  },
  "docker": {
    "configType": "default"
  }
}
```

OR

An internal deployment

```json
{
  "internal": {
    "id": "example-build-service",
    "branch": "master",
    "buildId": "premium-guide-6393"
  },
  "docker": {
    "configType": "default"
  }
}
```

OR

Don't modify the deployment

```json
{
  "docker": {
    "configType": "default"
  }
}
```

#### Example Response

 The operation was performed successfully.

```json
{}
```

### JavaScript client reference

#### Example request

Request body

An external deployment

```javascript
await apiClient.update.service.deployment({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "external": {
      "imagePath": "nginx:latest",
      "credentials": "example-credentials"
    },
    "docker": {
      "configType": "default"
    }
  }
});
```

OR

An internal deployment

```javascript
await apiClient.update.service.deployment({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "internal": {
      "id": "example-build-service",
      "branch": "master",
      "buildId": "premium-guide-6393"
    },
    "docker": {
      "configType": "default"
    }
  }
});
```

OR

Don't modify the deployment

```javascript
await apiClient.update.service.deployment({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "docker": {
      "configType": "default"
    }
  }
});
```

#### Example Response

 The operation was performed successfully.

```json
{
  "data": {},
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
