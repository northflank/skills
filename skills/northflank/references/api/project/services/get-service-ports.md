# Get service ports

Source: https://northflank.com/docs/v1/api/project/services/get-service-ports.md

This endpoint is deprecated and will be removed in the future. Please avoid making requests to this endpoint.

Requests should instead use the relevant GET endpoint.

[Use /services/get-service instead](get-service.md)

Lists the ports for the given service.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}
  - `ports`: [array of] {object}
     - `id`: (string) (required) The id used to identify the port across requests. (pattern: ^[a-z]-?[a-z0-9]+(-[a-z0-9]+)*$)
     - `name`: (string) (required) The name of the port used in the public url and UI. (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$)
     - `internalPort`: (integer) (required) The port number.
     - `protocol`: (string) (required) The protocol used by the port. (enum: HTTP, HTTP/2, TCP, UDP)
     - `public`: (boolean) (required) If true, the port is exposed publicly.
     - `dns`: (string) DNS entry for this port.
     - `domains`: [array of] {object}
         - `name`: (string) (required) The custom domain redirecting to this port.
         - `certificate`: {object}
           - `inProgress`: (boolean) Is the certificate in the process of being generated?
           - `expiryDate`: (string) The timestamp when the TLS certificate will expire. (format: date-time)
           - `refreshDate`: (string) The timestamp when a new TLS certificate will be generated. (format: date-time)
     - `security`: {object}
       - `credentials`: [array of] {object}
           - `username`: (string) (required) The username to access the service (pattern: ^[a-zA-Z](-?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?$) (min length: 3) (max length: 39)
           - `password`: (string) (required) The password to access the service with this username.
           - `type`: (string) (required) The type of authentication used (enum: basic-auth)
       - `policies`: [array of] {object}
           - `addresses`: [array of] (string) An IP address used by this rule
           - `action`: (string) (required) The action for this rule. (enum: ALLOW, DENY)
       - `sso`: {object}
         - `organizationId`: (string) Organization ID of the work OS organization that should be validated.
         - `directoryGroupIds`: [array of] (string)
         - `allowAnyOrgUsers`: (boolean) Allow entire organization to access this service
         - `validateInternalTraffic`: (boolean) Enforce internal traffic through SSO authentication flow
         - `setCookieOnRootDomain`: (boolean) Set SSO authentication cookie on root domain
         - `allowInternalTrafficViaPublicDns`: (boolean) Allow internal traffic from same or shared projects via public DNS to skip SSO authentication flow
       - `verificationMode`: (string) Mode used to verify multiple security features like ip policies and SSO authentication (enum: or, and)
       - `headers`: [array of] {object}
           - `regexMode`: (boolean)
           - `name`: (multiple options) (string) | (string) (pattern: ^[a-zA-Z0-9_\-%$+]+$)
           - `value`: (string) (required)
     - `disableNfDomain`: (boolean) Disable routing on the default code.run domain for public HTTP ports with custom domains.

### API reference

GET /v1/projects/{projectId}/services/{serviceId}/ports

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}/ports

#### Example Response

200 OK: Details about the ports for the service.

```json
{
  "data": {
    "ports": [
      {
        "id": "eonyui",
        "name": "p01",
        "internalPort": 8080,
        "protocol": "HTTP",
        "public": true,
        "dns": "p01--example-service--default-service--user-abc1.salvo.code.run",
        "domains": [
          {
            "name": "app.example.com",
            "certificate": {
              "inProgress": false,
              "expiryDate": "2022-04-26T09:25:02.000Z",
              "refreshDate": "2022-03-27T09:25:02.000Z"
            }
          }
        ],
        "security": {
          "credentials": [
            {
              "username": "admin",
              "password": "password123",
              "type": "basic-auth"
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
          "sso": {
            "organizationId": "org_uniquestringidentifier",
            "directoryGroupIds": [
              "directory_group_uniquestringidentifier"
            ]
          }
        },
        "disableNfDomain": false
      }
    ]
  }
}
```

### CLI reference

$ northflank get service ports

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the ports for the service.

```json
{
  "ports": [
    {
      "id": "eonyui",
      "name": "p01",
      "internalPort": 8080,
      "protocol": "HTTP",
      "public": true,
      "dns": "p01--example-service--default-service--user-abc1.salvo.code.run",
      "domains": [
        {
          "name": "app.example.com",
          "certificate": {
            "inProgress": false,
            "expiryDate": "2022-04-26T09:25:02.000Z",
            "refreshDate": "2022-03-27T09:25:02.000Z"
          }
        }
      ],
      "security": {
        "credentials": [
          {
            "username": "admin",
            "password": "password123",
            "type": "basic-auth"
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
        "sso": {
          "organizationId": "org_uniquestringidentifier",
          "directoryGroupIds": [
            "directory_group_uniquestringidentifier"
          ]
        }
      },
      "disableNfDomain": false
    }
  ]
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service.ports({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 Details about the ports for the service.

```json
{
  "data": {
    "ports": [
      {
        "id": "eonyui",
        "name": "p01",
        "internalPort": 8080,
        "protocol": "HTTP",
        "public": true,
        "dns": "p01--example-service--default-service--user-abc1.salvo.code.run",
        "domains": [
          {
            "name": "app.example.com",
            "certificate": {
              "inProgress": false,
              "expiryDate": "2022-04-26T09:25:02.000Z",
              "refreshDate": "2022-03-27T09:25:02.000Z"
            }
          }
        ],
        "security": {
          "credentials": [
            {
              "username": "admin",
              "password": "password123",
              "type": "basic-auth"
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
          "sso": {
            "organizationId": "org_uniquestringidentifier",
            "directoryGroupIds": [
              "directory_group_uniquestringidentifier"
            ]
          }
        },
        "disableNfDomain": false
      }
    ]
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
