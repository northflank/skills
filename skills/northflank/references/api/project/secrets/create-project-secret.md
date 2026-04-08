# Create project secret

Source: https://northflank.com/docs/v1/api/project/secrets/create-project-secret.md

Creates a project secret with the specified payload

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project

**Request body:**

{object}
- `name`: (string) (required) The name of the secret. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `description`: (string) A description of the secret. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
- `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
- `type`: (string) The hierarchy type of the created secret. (enum: secret, config)
- `secretType`: (string) (required) The injection scope of the created secret (enum: environment-arguments, environment, arguments)
- `priority`: (integer) (required) The priority with which different secrets will be merged.
- `restrictions`: {object}
  - `restricted`: (boolean) Whether the secret is restricted to specific resources. If this is `true`, only resources listed in `nfObjects` or with a tag listed in `tags` will have access to these secrets. Otherwise, all resources in the project will be able to access it.
  - `nfObjects`: [array of] {object}
     - `id`: (string) (required) ID of the entity the secret is restricted to. (pattern: ^[A-Za-z0-9-]+$)
     - `type`: (string) (required) Type of the entity the secret is restricted to. (enum: service, job)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
- `addonDependencies`: [array of] {object}
   - `addonId`: (string) (required) The id of the addon to link. (pattern: ^[A-Za-z0-9-]+$)
   - `keys`: [array of] {object}
      - `keyName`: (string) (required) The name of the key to link. (pattern: [a-zA-Z]+)
      - `aliases`: [array of] (string) The name of the alias. Keys may only contain letters, numbers, hyphens, forward slashes and dots. (pattern: ^[a-zA-Z0-9_./-]*$)
- `externalAddonDependencies`: [array of] {object}
   - `addonId`: (string) (required) The id of the external addon to link. (pattern: ^[A-Za-z0-9-]+$)
   - `keys`: [array of] {object}
      - `keyName`: (string) (required) The name of the key to link. (pattern: [a-zA-Z]+)
      - `aliases`: [array of] (string) The name of the alias. Keys may only contain letters, numbers, hyphens, forward slashes and dots. (pattern: ^[a-zA-Z0-9_./-]*$)
- `secrets`: {object}
  - `variables`: {object}
  - `files`: {object}
  - `dockerSecretMounts`: {object}

**Response body:**

{object}
- `data`: {object}
  - `name`: (string) (required) The name of the secret. (pattern: ^[a-zA-Z0-9]+((-|\s)[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) A description of the secret. (pattern: ^[a-zA-Z0-9.,?\s\\/'"()[\];`%^&*\-_:!]+$) (max length: 200)
  - `stageId`: (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `type`: (string) The hierarchy type of the created secret. (enum: secret, config)
  - `secretType`: (string) (required) The injection scope of the created secret (enum: environment-arguments, environment, arguments)
  - `priority`: (integer) (required) The priority with which different secrets will be merged.
  - `restrictions`: {object}
    - `restricted`: (boolean) Whether the secret is restricted to specific resources. If this is `true`, only resources listed in `nfObjects` or with a tag listed in `tags` will have access to these secrets. Otherwise, all resources in the project will be able to access it.
    - `nfObjects`: [array of] {object}
        - `id`: (string) (required) ID of the entity the secret is restricted to. (pattern: ^[A-Za-z0-9-]+$)
        - `type`: (string) (required) Type of the entity the secret is restricted to. (enum: service, job)
    - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
    - `tagMatchCondition`: (string) If all or any of the tags must be present on the target for it to match the condition. (enum: and, or)
  - `addonDependencies`: [array of] {object}
     - `addonId`: (string) (required) The id of the addon to link. (pattern: ^[A-Za-z0-9-]+$)
     - `keys`: [array of] {object}
         - `keyName`: (string) (required) The name of the key to link. (pattern: [a-zA-Z]+)
         - `aliases`: [array of] (string) The name of the alias. Keys may only contain letters, numbers, hyphens, forward slashes and dots. (pattern: ^[a-zA-Z0-9_./-]*$)
  - `externalAddonDependencies`: [array of] {object}
     - `addonId`: (string) (required) The id of the external addon to link. (pattern: ^[A-Za-z0-9-]+$)
     - `keys`: [array of] {object}
         - `keyName`: (string) (required) The name of the key to link. (pattern: [a-zA-Z]+)
         - `aliases`: [array of] (string) The name of the alias. Keys may only contain letters, numbers, hyphens, forward slashes and dots. (pattern: ^[a-zA-Z0-9_./-]*$)
  - `secrets`: {object}
    - `variables`: {object}
    - `files`: {object}
    - `dockerSecretMounts`: {object}
  - `id`: (string) (required) Identifier for the secret group (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `createdAt`: (string) time of creation (format: date-time)
  - `updatedAt`: (string) time of update (format: date-time)

### API reference

POST /v1/projects/{projectId}/secrets

POST /v1/teams/{teamId}/projects/{projectId}/secrets

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"name":"Example Secret","description":"A description","type":"secret","secretType":"environment","priority":10,"restrictions":{"restricted":true,"nfObjects":[{"id":"example-service","type":"service"}],"tagMatchCondition":"or"},"addonDependencies":[{"addonId":"example-addon","keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}],"externalAddonDependencies":[{"addonId":"example-addon","keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}],"secrets":{"variables":{"NODE_ENV":"production","MONGO_DB":"some_connection_string"},"files":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}}' \
  https://api.northflank.com/v1/projects/{projectId}/secrets
```

```javascript
const payload = {
  "name": "Example Secret",
  "description": "A description",
  "type": "secret",
  "secretType": "environment",
  "priority": 10,
  "restrictions": {
    "restricted": true,
    "nfObjects": [
      {
        "id": "example-service",
        "type": "service"
      }
    ],
    "tagMatchCondition": "or"
  },
  "addonDependencies": [
    {
      "addonId": "example-addon",
      "keys": [
        {
          "keyName": "USERNAME",
          "aliases": [
            "MONGO_USERNAME"
          ]
        }
      ]
    }
  ],
  "externalAddonDependencies": [
    {
      "addonId": "example-addon",
      "keys": [
        {
          "keyName": "USERNAME",
          "aliases": [
            "MONGO_USERNAME"
          ]
        }
      ]
    }
  ],
  "secrets": {
    "variables": {
      "NODE_ENV": "production",
      "MONGO_DB": "some_connection_string"
    },
    "files": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  }
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/secrets', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/secrets"

payload = {"name":"Example Secret","description":"A description","type":"secret","secretType":"environment","priority":10,"restrictions":{"restricted":true,"nfObjects":[{"id":"example-service","type":"service"}],"tagMatchCondition":"or"},"addonDependencies":[{"addonId":"example-addon","keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}],"externalAddonDependencies":[{"addonId":"example-addon","keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}],"secrets":{"variables":{"NODE_ENV":"production","MONGO_DB":"some_connection_string"},"files":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/secrets"

  var jsonStr = []byte(`{"name":"Example Secret","description":"A description","type":"secret","secretType":"environment","priority":10,"restrictions":{"restricted":true,"nfObjects":[{"id":"example-service","type":"service"}],"tagMatchCondition":"or"},"addonDependencies":[{"addonId":"example-addon","keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}],"externalAddonDependencies":[{"addonId":"example-addon","keys":[{"keyName":"USERNAME","aliases":["MONGO_USERNAME"]}]}],"secrets":{"variables":{"NODE_ENV":"production","MONGO_DB":"some_connection_string"},"files":{"/dir/fileName":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}},"dockerSecretMounts":{"example-secret-mount_1":{"data":"VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=","encoding":"utf-8"}}}}`)
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

200 OK: Details about the newly created secret.

```json
{
  "data": {
    "name": "Example Secret",
    "description": "A description",
    "type": "secret",
    "secretType": "environment",
    "priority": 10,
    "restrictions": {
      "restricted": true,
      "nfObjects": [
        {
          "id": "example-service",
          "type": "service"
        }
      ],
      "tagMatchCondition": "or"
    },
    "addonDependencies": [
      {
        "addonId": "example-addon",
        "keys": [
          {
            "keyName": "USERNAME",
            "aliases": [
              "MONGO_USERNAME"
            ]
          }
        ]
      }
    ],
    "externalAddonDependencies": [
      {
        "addonId": "example-addon",
        "keys": [
          {
            "keyName": "USERNAME",
            "aliases": [
              "MONGO_USERNAME"
            ]
          }
        ]
      }
    ],
    "secrets": {
      "variables": {
        "NODE_ENV": "production",
        "MONGO_DB": "some_connection_string"
      },
      "files": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      },
      "dockerSecretMounts": {
        "example-secret-mount_1": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      }
    },
    "id": "example-secret-group"
  }
}
```

#### Example Response

409 Conflict: There is already a secret with the same derived identifier

### CLI reference

$ northflank create secret

Options:

- `--projectId <projectId>`: ID of the project

- `-f --file <file>`: Path to a JSON/YAML resource definition file

- `-i --input <definition>`: JSON/YAML resource definition string (takes precedence over --file)

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

```json
{
  "name": "Example Secret",
  "description": "A description",
  "type": "secret",
  "secretType": "environment",
  "priority": 10,
  "restrictions": {
    "restricted": true,
    "nfObjects": [
      {
        "id": "example-service",
        "type": "service"
      }
    ],
    "tagMatchCondition": "or"
  },
  "addonDependencies": [
    {
      "addonId": "example-addon",
      "keys": [
        {
          "keyName": "USERNAME",
          "aliases": [
            "MONGO_USERNAME"
          ]
        }
      ]
    }
  ],
  "externalAddonDependencies": [
    {
      "addonId": "example-addon",
      "keys": [
        {
          "keyName": "USERNAME",
          "aliases": [
            "MONGO_USERNAME"
          ]
        }
      ]
    }
  ],
  "secrets": {
    "variables": {
      "NODE_ENV": "production",
      "MONGO_DB": "some_connection_string"
    },
    "files": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  }
}
```

#### Example Response

 Details about the newly created secret.

```json
{
  "name": "Example Secret",
  "description": "A description",
  "type": "secret",
  "secretType": "environment",
  "priority": 10,
  "restrictions": {
    "restricted": true,
    "nfObjects": [
      {
        "id": "example-service",
        "type": "service"
      }
    ],
    "tagMatchCondition": "or"
  },
  "addonDependencies": [
    {
      "addonId": "example-addon",
      "keys": [
        {
          "keyName": "USERNAME",
          "aliases": [
            "MONGO_USERNAME"
          ]
        }
      ]
    }
  ],
  "externalAddonDependencies": [
    {
      "addonId": "example-addon",
      "keys": [
        {
          "keyName": "USERNAME",
          "aliases": [
            "MONGO_USERNAME"
          ]
        }
      ]
    }
  ],
  "secrets": {
    "variables": {
      "NODE_ENV": "production",
      "MONGO_DB": "some_connection_string"
    },
    "files": {
      "/dir/fileName": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    },
    "dockerSecretMounts": {
      "example-secret-mount_1": {
        "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
        "encoding": "utf-8"
      }
    }
  },
  "id": "example-secret-group"
}
```

### JavaScript client reference

#### Example request

Request body

```javascript
await apiClient.create.secret({
  parameters: {
    "projectId": "default-project"
  },
  data: {
    "name": "Example Secret",
    "description": "A description",
    "type": "secret",
    "secretType": "environment",
    "priority": 10,
    "restrictions": {
      "restricted": true,
      "nfObjects": [
        {
          "id": "example-service",
          "type": "service"
        }
      ],
      "tagMatchCondition": "or"
    },
    "addonDependencies": [
      {
        "addonId": "example-addon",
        "keys": [
          {
            "keyName": "USERNAME",
            "aliases": [
              "MONGO_USERNAME"
            ]
          }
        ]
      }
    ],
    "externalAddonDependencies": [
      {
        "addonId": "example-addon",
        "keys": [
          {
            "keyName": "USERNAME",
            "aliases": [
              "MONGO_USERNAME"
            ]
          }
        ]
      }
    ],
    "secrets": {
      "variables": {
        "NODE_ENV": "production",
        "MONGO_DB": "some_connection_string"
      },
      "files": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      },
      "dockerSecretMounts": {
        "example-secret-mount_1": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      }
    }
  }
});
```

#### Example Response

 Details about the newly created secret.

```json
{
  "data": {
    "name": "Example Secret",
    "description": "A description",
    "type": "secret",
    "secretType": "environment",
    "priority": 10,
    "restrictions": {
      "restricted": true,
      "nfObjects": [
        {
          "id": "example-service",
          "type": "service"
        }
      ],
      "tagMatchCondition": "or"
    },
    "addonDependencies": [
      {
        "addonId": "example-addon",
        "keys": [
          {
            "keyName": "USERNAME",
            "aliases": [
              "MONGO_USERNAME"
            ]
          }
        ]
      }
    ],
    "externalAddonDependencies": [
      {
        "addonId": "example-addon",
        "keys": [
          {
            "keyName": "USERNAME",
            "aliases": [
              "MONGO_USERNAME"
            ]
          }
        ]
      }
    ],
    "secrets": {
      "variables": {
        "NODE_ENV": "production",
        "MONGO_DB": "some_connection_string"
      },
      "files": {
        "/dir/fileName": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      },
      "dockerSecretMounts": {
        "example-secret-mount_1": {
          "data": "VGhpcyBpcyBhbiBleGFtcGxlIHdpdGggYSB0ZW1wbGF0ZWQgJHtOT0RFX0VOVn0gdmFyaWFibGU=",
          "encoding": "utf-8"
        }
      }
    },
    "id": "example-secret-group"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
