# Update project secret addon link

Source: https://northflank.com/docs/v1/api/project/secrets/update-project-secret-addon-link.md

Link an addon to a project secret or edit the settings of the linked addon.

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `secretId`: (string) (required) ID of the project secret
- `addonId`: (string) (required) ID of the addon

**Request body:**

{object}
- `keys`: [array of] {object}
   - `keyName`: (string) (required) The name of the key to link. (pattern: [a-zA-Z]+)
   - `aliases`: [array of] (string) The name of the alias. Keys may only contain letters, numbers, hyphens, forward slashes and dots. (pattern: ^[a-zA-Z0-9_./-]*$)

**Response body:**

{object}
- `data`: {object}
  - `keys`: [array of] {object}
     - `keyName`: (string) (required) The name of the key to link. (pattern: [a-zA-Z]+)
     - `aliases`: [array of] (string) The name of the alias. Keys may only contain letters, numbers, hyphens, forward slashes and dots. (pattern: ^[a-zA-Z0-9_./-]*$)
     - `defaultKey`: (string) (required)

### API reference

POST /v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}

POST /v1/teams/{teamId}/projects/{projectId}/secrets/{secretId}/addons/{addonId}

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}' \
  https://api.northflank.com/v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}
```

```javascript
const payload = {
  "keys": [
    {
      "keyName": "USERNAME",
      "aliases": [
        "MONGO_USERNAME"
      ]
    }
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}"

payload = {"keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/secrets/{secretId}/addons/{addonId}"

  var jsonStr = []byte(`{"keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}`)
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

200 OK: Details about the new keys.

```json
{
  "data": {
    "keys": [
      {
        "keyName": "USERNAME",
        "aliases": [
          "MONGO_USERNAME"
        ],
        "defaultKey": "NF_EXAMPLE-ADDON_USERNAME"
      }
    ]
  }
}
```

### CLI reference

$ northflank update secret-link

Options:

- `--projectId <projectId>`: ID of the project

- `--secretId <secretId>`: ID of the project secret

- `--addonId <addonId>`: ID of the addon

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "keys": [
    {
      "keyName": "USERNAME",
      "aliases": [
        "MONGO_USERNAME"
      ]
    }
  ]
}
```

#### Example Response

 Details about the new keys.

```json
{
  "keys": [
    {
      "keyName": "USERNAME",
      "aliases": [
        "MONGO_USERNAME"
      ],
      "defaultKey": "NF_EXAMPLE-ADDON_USERNAME"
    }
  ]
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.update.secretLink({
  parameters: {
    "projectId": "default-project",
    "secretId": "example-secret",
    "addonId": "example-addon"
  },
  data: {
    "keys": [
      {
        "keyName": "USERNAME",
        "aliases": [
          "MONGO_USERNAME"
        ]
      }
    ]
  }
});
```

#### Example Response

 Details about the new keys.

```json
{
  "data": {
    "keys": [
      {
        "keyName": "USERNAME",
        "aliases": [
          "MONGO_USERNAME"
        ],
        "defaultKey": "NF_EXAMPLE-ADDON_USERNAME"
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
