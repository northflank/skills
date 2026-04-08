# Update service ports

Source: https://northflank.com/docs/v1/api/project/services/update-service-ports.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant PATCH endpoint.

[Use /services/patch-combined-service instead](patch-combined-service.md)

Updates the list of ports for the given service.

Required permission: Project > Services > General > Update

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Request body:**

{object}
- `ports`: [array of] {object}
   - `id`: (string) The id of an existing port. Pass this when changing in order to keep security configurations. (pattern: ^[a-z]-?[a-z0-9]+(-[a-z0-9]+)*$)
   - `name`: (string) (required) The name used to identify the port. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 1) (max length: 8)
   - `internalPort`: (integer) (required) The port number.
   - `public`: (boolean) If true, the port will be exposed publicly.
   - `protocol`: (string) (required) The protocol to use for the port. Public ports only support `HTTP` and `HTTP/2`. (enum: HTTP, HTTP/2, TCP, UDP)
   - `domains`: [array of] (string) A domain to redirect to this port.
   - `security`: {object}
     - `credentials`: [array of] {object}
         - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
         - `password`: (string) (required) The password to access the service with this username.
         - `type`: (string) (required) The type of authentication used (enum: basic-auth)
     - `ip`: [array of] {object}
         - `addresses`: [array of] (string) An IP address used by this rule
         - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
     - `policies`: [array of] {object}
         - `addresses`: [array of] (string) An IP address used by this rule
         - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
     - `sso`: {object}
       - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
       - `directoryGroupIds`: [array of] (string)
       - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
       - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
       - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
       - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
     - `headers`: [array of] (multiple options) {object}
           - `regexMode`: (boolean)
           - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
           - `value`: (string) (required) | {object}
           - `regexMode`: (boolean)
           - `name`: (string) (required)
           - `value`: (string) (required)
     - `verificationMode`: (string) Mode used to verify multiple security features like ip policies and SSO authentication (enum: or, and)
     - `securePathConfiguration`: {object}
       - `enabled`: (boolean) Enable security policies on a path-level style
       - `skipSecurityPoliciesForInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip all security policies
       - `rules`: [array of] {object}
           - `paths`: [array of] (multiple options) {object}
                 - `path`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
                 - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: prefix)
                 - `priority`: (integer) (required) | {object}
                 - `path`: (string) (required) (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
                 - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: exact)
                 - `priority`: (integer) (required) | {object}
                 - `path`: (string) (required)
                 - `routingMode`: (string) (required) Mode of the path, determining how the URI will be interpreted. (enum: regex)
                 - `priority`: (integer) (required)
           - `accessMode`: (string) (required) Specify the way the path rule will behave when processing policies. This enables an allow-list/deny-list approach for access control on each path (enum: protected, unprotected)
           - `securityPolicies`: {object}
             - `orPolicies`: {object}
               - `credentials`: [array of] {object}
                   - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
                   - `password`: (string) (required) The password to access the service with this username.
                   - `type`: (string) (required) The type of authentication used (enum: basic-auth)
               - `ip`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `policies`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `sso`: {object}
                 - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
                 - `directoryGroupIds`: [array of] (string)
                 - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
                 - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
                 - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
                 - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
               - `headers`: [array of] (multiple options) {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
                     - `value`: (string) (required) | {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required)
                     - `value`: (string) (required)
             - `requiredPolicies`: {object}
               - `credentials`: [array of] {object}
                   - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
                   - `password`: (string) (required) The password to access the service with this username.
                   - `type`: (string) (required) The type of authentication used (enum: basic-auth)
               - `ip`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `policies`: [array of] {object}
                   - `addresses`: [array of] (string) An IP address used by this rule
                   - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
               - `sso`: {object}
                 - `organizationId`: (string) ID of the SSO organization that the user will have to be a member of
                 - `directoryGroupIds`: [array of] (string)
                 - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
                 - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
                 - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
                 - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
               - `headers`: [array of] (multiple options) {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
                     - `value`: (string) (required) | {object}
                     - `regexMode`: (boolean)
                     - `name`: (string) (required)
                     - `value`: (string) (required)
   - `disableNfDomain`: (boolean) Disable routing on the default code.run domain for public HTTP ports with custom domains.

**Response body:**

{object}
- `data`: {object}

### API reference

POST /v1/projects/{projectId}/services/{serviceId}/ports

POST /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/ports

#### Example request

Request body

```curl
curl --header "Content-Type: application/json" \
  --header "Authorization: Bearer NORTHFLANK_API_TOKEN" \
  --request POST \
  --data '{"ports":[{"id":"p01","name":"p01","internalPort":12345,"public":true,"protocol":"HTTP","domains":["app.example.com"],"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}}}]}' \
  https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/ports
```

```javascript
const payload = {
  "ports": [
    {
      "id": "p01",
      "name": "p01",
      "internalPort": 12345,
      "public": true,
      "protocol": "HTTP",
      "domains": [
        "app.example.com"
      ],
      "security": {
        "credentials": [
          {
            "username": "admin",
            "password": "password123",
            "type": "basic-auth"
          }
        ],
        "ip": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "policies": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "headers": [
          {
            "regexMode": false,
            "name": "headerName",
            "value": "headerValue"
          }
        ],
        "securePathConfiguration": {
          "rules": [
            {
              "paths": [
                {
                  "routingMode": "prefix",
                  "priority": 80
                }
              ],
              "accessMode": "protected",
              "securityPolicies": {
                "orPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                },
                "requiredPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  ]
}

const response = await fetch('https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/ports', {
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

url = "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/ports"

payload = {"ports":[{"id":"p01","name":"p01","internalPort":12345,"public":true,"protocol":"HTTP","domains":["app.example.com"],"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}}}]}
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
  url := "https://api.northflank.com/v1/projects/{projectId}/services/{serviceId}/ports"

  var jsonStr = []byte(`{"ports":[{"id":"p01","name":"p01","internalPort":12345,"public":true,"protocol":"HTTP","domains":["app.example.com"],"security":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}],"securePathConfiguration":{"rules":[{"paths":[{"routingMode":"prefix","priority":80}],"accessMode":"protected","securityPolicies":{"orPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]},"requiredPolicies":{"credentials":[{"username":"admin","password":"password123","type":"basic-auth"}],"ip":[{"addresses":["127.0.0.1"],"action":"DENY"}],"policies":[{"addresses":["127.0.0.1"],"action":"DENY"}],"headers":[{"regexMode":false,"name":"headerName","value":"headerValue"}]}}}]}}}]}`)
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

#### Example Response

404 Not Found: One of the provided domains has not been registered to this account.

### CLI reference

$ northflank update service ports

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
  "ports": [
    {
      "id": "p01",
      "name": "p01",
      "internalPort": 12345,
      "public": true,
      "protocol": "HTTP",
      "domains": [
        "app.example.com"
      ],
      "security": {
        "credentials": [
          {
            "username": "admin",
            "password": "password123",
            "type": "basic-auth"
          }
        ],
        "ip": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "policies": [
          {
            "addresses": [
              "127.0.0.1"
            ],
            "action": "DENY"
          }
        ],
        "headers": [
          {
            "regexMode": false,
            "name": "headerName",
            "value": "headerValue"
          }
        ],
        "securePathConfiguration": {
          "rules": [
            {
              "paths": [
                {
                  "routingMode": "prefix",
                  "priority": 80
                }
              ],
              "accessMode": "protected",
              "securityPolicies": {
                "orPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                },
                "requiredPolicies": {
                  "credentials": [
                    {
                      "username": "admin",
                      "password": "password123",
                      "type": "basic-auth"
                    }
                  ],
                  "ip": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "policies": [
                    {
                      "addresses": [
                        "127.0.0.1"
                      ],
                      "action": "DENY"
                    }
                  ],
                  "headers": [
                    {
                      "regexMode": false,
                      "name": "headerName",
                      "value": "headerValue"
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  ]
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

```javascript
await apiClient.update.service.ports({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  },
  data: {
    "ports": [
      {
        "id": "p01",
        "name": "p01",
        "internalPort": 12345,
        "public": true,
        "protocol": "HTTP",
        "domains": [
          "app.example.com"
        ],
        "security": {
          "credentials": [
            {
              "username": "admin",
              "password": "password123",
              "type": "basic-auth"
            }
          ],
          "ip": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "policies": [
            {
              "addresses": [
                "127.0.0.1"
              ],
              "action": "DENY"
            }
          ],
          "headers": [
            {
              "regexMode": false,
              "name": "headerName",
              "value": "headerValue"
            }
          ],
          "securePathConfiguration": {
            "rules": [
              {
                "paths": [
                  {
                    "routingMode": "prefix",
                    "priority": 80
                  }
                ],
                "accessMode": "protected",
                "securityPolicies": {
                  "orPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  },
                  "requiredPolicies": {
                    "credentials": [
                      {
                        "username": "admin",
                        "password": "password123",
                        "type": "basic-auth"
                      }
                    ],
                    "ip": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "policies": [
                      {
                        "addresses": [
                          "127.0.0.1"
                        ],
                        "action": "DENY"
                      }
                    ],
                    "headers": [
                      {
                        "regexMode": false,
                        "name": "headerName",
                        "value": "headerValue"
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    ]
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
