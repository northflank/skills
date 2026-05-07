# Get service

Source: https://northflank.com/docs/v1/api/project/services/get-service.md

Gets information about the given service.

Required permission: Project > Services > General > Read

**Path parameters:**

{object}
- `projectId`: (string) (required) ID of the project
- `serviceId`: (string) (required) ID of the service

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the service
  - `appId`: (string) (required) Full identifier used for service deployment
  - `name`: (string) (required) Service name
  - `tags`: [array of] (string) (pattern: ^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$) (min length: 3) (max length: 100)
  - `description`: (string) A short description of the service
  - `projectId`: (string) (required) ID of the project that the service belongs to
  - `serviceType`: (string) (required) Type of the service (combined, build or deployment) (enum: combined, build, deployment)
  - `createdAt`: (string) (required) The time the service was created. (format: date-time)
  - `disabledCI`: (boolean) (required) Whether Continuous Integration is disabled
  - `disabledCD`: (boolean) (required) Whether Continuous Deployment is disabled
  - `billing`: {object}
    - `deploymentPlan`: (string) (required) ID of the billing plan used by this service
  - `status`: {object}
    - `build`: {object}
      - `status`: (string) (required) The current status of the build. (enum: QUEUED, PENDING, UNSCHEDULABLE, STARTING, CLONING, BUILDING, UPLOADING, ABORTED, FAILURE, SUBMISSION_FAILURE, SUCCESS, CRASHED, IN_PROGRESS)
      - `lastTransitionTime`: (string) The timestamp of when the build reached this status. (format: date-time)
    - `deployment`: {object}
      - `status`: (string) (required) The current status of the deployment. (enum: PENDING, IN_PROGRESS, COMPLETED, FAILED)
      - `reason`: (string) (required) The reason the current deployment was started. (enum: SCALING, DEPLOYING)
      - `lastTransitionTime`: (string) The timestamp of when the deployment reached this status. (format: date-time)
  - `servicePaused`: (boolean) (required) Is the service paused?
  - `buildSource`: (string) Defines the build source for this resource (enum: git, bundle)
  - `vcsData`: {object}
    - `projectUrl`: (string) (required) URL of the repository being built
    - `projectType`: (string) (required) VCS provider for the repo being built (enum: bitbucket, gitlab, github, self-hosted, azure)
    - `selfHostedVcsId`: (string) ID of the self-hosted VCS, if applicable.
    - `projectBranch`: (string) Branch of the repo being built
    - `publicRepo`: (boolean) Whether the repo is being accessed without authentication.
    - `dockerWorkDir`: (string) (required) Working directory used by the dockerfile
    - `dockerFilePath`: (string) (required) File path of the Dockerfile
  - `bundleData`: {object}
    - `bundleUrl`: (string) (required) URL of the bundle to be built
    - `projectBranch`: (string) Branch of the bundle being built
    - `dockerWorkDir`: (string) (required) Working directory used by the dockerfile
    - `dockerFilePath`: (string) (required) File path of the Dockerfile
  - `deployment`: {object}
    - `region`: (string) Region where this service is deployed and/or built
    - `instances`: (integer) Number of instances/replicas running
    - `external`: {object}
      - `imagePath`: (string) (required) Path of the external image excluding the hostname
      - `registryProvider`: (string) (required) Registry provider hosting the external image (enum: acr, ecr, gar, dockerhub, dhi, github, gitlab, custom, legacy)
      - `privateImage`: (boolean) (required) Does the image require authentication
    - `internal`: {object}
      - `nfObjectId`: (string) (required) Database ID of deployed entity
      - `nfObjectType`: (string) (required) Type of deployed entity (enum: service)
      - `repository`: (string) (required) URL of the repository being deployed
      - `branch`: (string) (required) Branch of the repo being deployed
      - `buildSHA`: (string) (required) Commit SHA to be deployed. `latest` means the latest commit is automatically being deployed.
      - `deployedSHA`: (string) Currently deployed commit SHA. If buildSHA is set to `latest`, this will show the SHA of the latest commit.
    - `docker`: {object}
      - `configType`: (string) (required) Override configuration which is used at runtime. (enum: default, customEntrypoint, customCommand, customEntrypointCustomCommand)
      - `customEntrypoint`: (string) The CMD to run instead of the default if entrypoint override is enabled.
      - `customCommand`: (string) The CMD to run instead of the default if CMD override is enabled.
    - `buildpack`: {object}
      - `configType`: (string) (required) Type of buildpack run configuration. (enum: default, customProcess, customCommand, customEntrypointCustomCommand, originalEntrypointCustomCommand)
      - `customProcess`: (string) Custom process which should be run.
      - `customEntrypoint`: (string) Custom entrypoint which should be run.
      - `customCommand`: (string) Custom command which should be run.
    - `storage`: {object}
      - `ephemeralStorage`: {object}
        - `storageSize`: (number) (required) Ephemeral storage per container in MB (format: float)
      - `shmSize`: (integer) Configures the amount of available memory-backed disk space available to /dev/shm
    - `strategy`: {object}
      - `type`: (string) Configures the instance roll out strategy of your service. Currently only available via feature flag. (enum: recreate, rollout-steady, rollout-balanced, rollout-fast, custom)
      - `settings`: {object}
        - `maxSurge`: (multiple options) (integer) A non-negative integer. | (string) A percentage string in the range 0% to 100%, e.g. `25%` (pattern: ^\d+%$)
        - `maxUnavailable`: (multiple options) (integer) A non-negative integer. | (string) A percentage string in the range 0% to 100%, e.g. `25%` (pattern: ^\d+%$)
    - `zonalRedundancy`: {object}
      - `type`: (string) Defines scheduling behaviour across different zones within the same region. (enum: disabled, preferred, required)
      - `minZones`: (integer) Defines how many zones are required and will prevent containers from additional scheduling into existing zones. (Only relevant if type is set to "required")
    - `gpu`: {object}
      - `enabled`: (boolean)
      - `configuration`: {object}
        - `gpuType`: (string) (required)
        - `gpuCount`: (integer)
        - `timesliced`: (boolean)
    - `gracePeriodSeconds`: (integer) The maximum amount of time the process has to shut down after receiving a SIGTERM signal before it is forcefully shut down SIGKILL by the system.
    - `metadata`: {object}
      - `labels`: {object}
      - `annotations`: {object}
    - `imageUrl`: (string) URL at which the service's deployed image is located
  - `loadBalancing`: {object}
    - `mode`: (string) (required) (enum: leastConnection, consistentHash, roundRobin, consistentReplicaRouting)
    - `consistentHash`: {object}
      - `mode`: (string) (required) (enum: ip, customHeader)
      - `header`: (string)
    - `consistentReplicaRouting`: {object}
      - `mode`: (string) (required) (enum: path, header)
  - `buildConfiguration`: {object}
    - `prRestrictions`: [array of] (string) A pull request build rule. Can contain `*` as a wildcard to match multiple branch names. For example, `feature/*` will build all commits from pull requests from branches that start with `feature/`. (pattern: ^[^?:@$~ [\]{}]*$)
    - `branchRestrictions`: [array of] (string) A branch build rule. Can contain `*` as a wildcard to match multiple branch names. For example, `feature/*` will build all commits from branches that start with `feature/`. (pattern: ^[^?:@$~ [\]{}]*$)
    - `crossProjectAccess`: {object}
      - `enabled`: (boolean) (required) Allow this build service to be referenced by resources in other projects.
      - `projects`: [array of] (string) The ID of a project to include or exclude. (pattern: ^[A-Za-z0-9-]+$)
      - `isAllowList`: (boolean) (required) If true, only the listed projects can use this build service. If false, all projects except the listed ones can use this build service.
    - `pathIgnoreRules`: [array of] (string) A path ignore rule, following `.gitignore` syntax. For example, `*.md` will ignore all files ending with `.md`. (max length: 260)
    - `isAllowList`: (boolean) If `true`, the functionality of `pathIgnoreRules` will be inverted. A commit will only be built if a file has been changed that matches one or more of the rules in `pathIgnoreRules`.
    - `ciIgnoreFlagsEnabled`: (boolean) If `true`, enables commit ignore flags. If a commit message contains one or more of the flags in `ciIgnoreFlags`, that commit will not be built.
    - `ciIgnoreFlags`: [array of] (string) A commit ignore flag. (max length: 72)
    - `dockerfileTarget`: (string) If your Dockerfile contains multiple build stages, you can specify the target stage by entering its name here.
    - `dockerCredentials`: [array of] (string) The ID of the docker credentials to use. (pattern: ^[A-Za-z0-9-]+$)
    - `includeGitFolder`: (boolean) Include .git folder inside the build context
    - `fullGitClone`: (boolean) Include the entire git history as part of the .git folder. Only relevant if "includeGitFolder" is set.
    - `enableGitLfs`: (boolean) Enable Git LFS support for the build
    - `storage`: {object}
      - `ephemeralStorage`: {object}
        - `storageSize`: (integer) Ephemeral storage per build in MB (enum: 16384, 32768, 65536, 131072, 262144, 524288)
  - `buildEngineConfiguration`: {object}
    - `buildEngine`: (string) The build engine used. (enum: buildpack, buildkit, kaniko)
    - `buildpack`: {object}
      - `builder`: (string) The Buildpack stack used. (enum: HEROKU_24, HEROKU_22, HEROKU_22_CLASSIC, HEROKU_20, HEROKU_18, GOOGLE_22, GOOGLE_V1, CNB_ALPINE, CNB_BIONIC, PAKETO_JAMMY_TINY, PAKETO_JAMMY_BASE, PAKETO_JAMMY_FULL, PAKETO_TINY, PAKETO_BASE, PAKETO_FULL)
      - `buildpackLocators`: [array of] (string) Url or registry identifier of custom Buildpack.
      - `useCache`: (boolean) Should build dependencies be cached?
    - `buildkit`: {object}
      - `useCache`: (boolean) Should intermediate image layers be cached?
      - `useInternalCache`: (boolean) Should use persistent storage to store all layers?
      - `internalCacheStorage`: (boolean) Storage size to use for internal cache
    - `kaniko`: {object}
      - `useCache`: (boolean) Should intermediate image layers be cached?
  - `autoscaling`: {object}
    - `horizontal`: {object}
      - `enabled`: (boolean) (required) Whether horizontal autoscaling should be enabled
      - `minReplicas`: (number) (required) Minimum number of replicas which should be running at any time (format: float)
      - `maxReplicas`: (number) (required) Maximum number of replicas which can be running at any time (format: float)
      - `cpu`: {object}
        - `enabled`: (boolean) (required) Whether autoscaling should take into account cpu usage
        - `thresholdPercentage`: (integer) (required) Threshold CPU usage percentage at which the workload will be scaled
      - `memory`: {object}
        - `enabled`: (boolean) (required) Whether autoscaling should take into account memory usage
        - `thresholdPercentage`: (integer) (required) Threshold memory usage percentage at which the workload will be scaled
      - `rps`: {object}
        - `enabled`: (boolean) (required) Whether autoscaling should take into requests-per-second
        - `thresholdValue`: (integer) (required) Threshold rps value on which the workload will be scaled
      - `userMetrics`: {object}
        - `enabled`: (boolean) (required) Whether to enable handling for custom metrics in the autoscaling configuration
        - `exposedMetricsPath`: (string) (required) Path on which the metrics will be exposed by the service.. (pattern: ^\/([_a-zA-Z0-9-&?=.]*)((\/[_a-zA-Z0-9-&?=.]+)*(\/)?)?$)
        - `exposedMetricsPort`: (integer) (required) Port on which the metrics will be exposed by the service.
        - `metrics`: [array of] {object}
            - `metricName`: (string) (required) Name of the custom metric (pattern: [a-zA-Z_:][a-zA-Z0-9_:]*$)
            - `metricType`: (string) (required) Type of metric exposed, this will affect how it'll be queried by the autoscaler component: Gauge will be used as is, Counter will be used with rate() (enum: gauge, counter)
            - `thresholdValue`: (number) (required) Threshold value on which the workload will be scaled. Represents the average value across all running pods. (format: float)
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
  - `cluster`: {object}
    - `id`: (string) (required) The id of the cluster associated with this project.
    - `name`: (string) (required) The name of the cluster associated with this project.
    - `namespace`: (string) Namespace this resource is located within on the cluster.
    - `loadBalancers`: [array of] (string)

### API reference

GET /v1/projects/{projectId}/services/{serviceId}

GET /v1/teams/{teamId}/projects/{projectId}/services/{serviceId}

#### Example Response

200 OK: Details about the service.

```json
{
  "data": {
    "id": "example-service",
    "appId": "/example-user/default-project/example-service",
    "name": "Example Service",
    "description": "This is the service description",
    "projectId": "default-project",
    "serviceType": "combined",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "disabledCI": false,
    "disabledCD": false,
    "billing": {
      "deploymentPlan": "nf-compute-20"
    },
    "status": {
      "build": {
        "status": "SUCCESS",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      },
      "deployment": {
        "status": "COMPLETED",
        "reason": "DEPLOYING",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      }
    },
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "selfHostedVcsId": "example-team/self-hosted-vcs",
      "projectBranch": "master",
      "publicRepo": false,
      "dockerWorkDir": "/",
      "dockerFilePath": "/Dockerfile"
    },
    "bundleData": {
      "bundleUrl": "https://example.com/archive.tar",
      "projectBranch": "main",
      "dockerWorkDir": "/",
      "dockerFilePath": "/Dockerfile"
    },
    "deployment": {
      "region": "europe-west",
      "instances": 1,
      "internal": {
        "nfObjectId": "example-service",
        "nfObjectType": "service",
        "repository": "https://github.com/northflank/gatsby-with-northflank",
        "branch": "master",
        "buildSHA": "latest",
        "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616"
      },
      "docker": {
        "configType": "default",
        "customCommand": "nginx -g"
      },
      "buildpack": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      }
    },
    "buildConfiguration": {
      "prRestrictions": [
        "feature/*"
      ],
      "branchRestrictions": [
        "feature/*"
      ],
      "crossProjectAccess": {
        "enabled": true,
        "projects": [
          "example-project"
        ]
      },
      "pathIgnoreRules": [
        "README.md"
      ],
      "isAllowList": false,
      "ciIgnoreFlags": [
        "[skip ci]"
      ],
      "dockerCredentials": [
        "example-docker-credential"
      ],
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      }
    },
    "buildEngineConfiguration": {
      "buildEngine": "buildpack",
      "buildpack": {
        "builder": "HEROKU_24",
        "buildpackLocators": [
          "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
        ]
      }
    },
    "autoscaling": {
      "horizontal": {
        "enabled": true,
        "minReplicas": 1,
        "maxReplicas": 3,
        "userMetrics": {
          "enabled": true,
          "exposedMetricsPath": "/metrics",
          "exposedMetricsPort": 8080,
          "metrics": [
            {
              "metricName": "example-metric",
              "metricType": "gauge",
              "thresholdValue": 2
            }
          ]
        }
      }
    },
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
    ],
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  }
}
```

### CLI reference

$ northflank get service

Options:

- `--projectId <projectId>`: ID of the project

- `--serviceId <serviceId>`: ID of the service

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Details about the service.

```json
{
  "id": "example-service",
  "appId": "/example-user/default-project/example-service",
  "name": "Example Service",
  "description": "This is the service description",
  "projectId": "default-project",
  "serviceType": "combined",
  "createdAt": "2021-01-20T11:19:53.175Z",
  "disabledCI": false,
  "disabledCD": false,
  "billing": {
    "deploymentPlan": "nf-compute-20"
  },
  "status": {
    "build": {
      "status": "SUCCESS",
      "lastTransitionTime": "2021-11-29T11:47:16.624Z"
    },
    "deployment": {
      "status": "COMPLETED",
      "reason": "DEPLOYING",
      "lastTransitionTime": "2021-11-29T11:47:16.624Z"
    }
  },
  "buildSource": "git",
  "vcsData": {
    "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
    "projectType": "github",
    "selfHostedVcsId": "example-team/self-hosted-vcs",
    "projectBranch": "master",
    "publicRepo": false,
    "dockerWorkDir": "/",
    "dockerFilePath": "/Dockerfile"
  },
  "bundleData": {
    "bundleUrl": "https://example.com/archive.tar",
    "projectBranch": "main",
    "dockerWorkDir": "/",
    "dockerFilePath": "/Dockerfile"
  },
  "deployment": {
    "region": "europe-west",
    "instances": 1,
    "internal": {
      "nfObjectId": "example-service",
      "nfObjectType": "service",
      "repository": "https://github.com/northflank/gatsby-with-northflank",
      "branch": "master",
      "buildSHA": "latest",
      "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616"
    },
    "docker": {
      "configType": "default",
      "customCommand": "nginx -g"
    },
    "buildpack": {
      "configType": "default"
    },
    "storage": {
      "ephemeralStorage": {
        "storageSize": 1024
      }
    }
  },
  "buildConfiguration": {
    "prRestrictions": [
      "feature/*"
    ],
    "branchRestrictions": [
      "feature/*"
    ],
    "crossProjectAccess": {
      "enabled": true,
      "projects": [
        "example-project"
      ]
    },
    "pathIgnoreRules": [
      "README.md"
    ],
    "isAllowList": false,
    "ciIgnoreFlags": [
      "[skip ci]"
    ],
    "dockerCredentials": [
      "example-docker-credential"
    ],
    "storage": {
      "ephemeralStorage": {
        "storageSize": 16384
      }
    }
  },
  "buildEngineConfiguration": {
    "buildEngine": "buildpack",
    "buildpack": {
      "builder": "HEROKU_24",
      "buildpackLocators": [
        "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
      ]
    }
  },
  "autoscaling": {
    "horizontal": {
      "enabled": true,
      "minReplicas": 1,
      "maxReplicas": 3,
      "userMetrics": {
        "enabled": true,
        "exposedMetricsPath": "/metrics",
        "exposedMetricsPort": 8080,
        "metrics": [
          {
            "metricName": "example-metric",
            "metricType": "gauge",
            "thresholdValue": 2
          }
        ]
      }
    }
  },
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
  ],
  "cluster": {
    "id": "nf-europe-west",
    "name": "nf-europe-west",
    "namespace": "ns-8zy2mcjh9zn2",
    "loadBalancers": [
      "lb.659200800000000000000000.northflank.com"
    ]
  }
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.service({
  parameters: {
    "projectId": "default-project",
    "serviceId": "example-service"
  }
});
```

#### Example Response

 Details about the service.

```json
{
  "data": {
    "id": "example-service",
    "appId": "/example-user/default-project/example-service",
    "name": "Example Service",
    "description": "This is the service description",
    "projectId": "default-project",
    "serviceType": "combined",
    "createdAt": "2021-01-20T11:19:53.175Z",
    "disabledCI": false,
    "disabledCD": false,
    "billing": {
      "deploymentPlan": "nf-compute-20"
    },
    "status": {
      "build": {
        "status": "SUCCESS",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      },
      "deployment": {
        "status": "COMPLETED",
        "reason": "DEPLOYING",
        "lastTransitionTime": "2021-11-29T11:47:16.624Z"
      }
    },
    "buildSource": "git",
    "vcsData": {
      "projectUrl": "https://github.com/northflank/gatsby-with-northflank",
      "projectType": "github",
      "selfHostedVcsId": "example-team/self-hosted-vcs",
      "projectBranch": "master",
      "publicRepo": false,
      "dockerWorkDir": "/",
      "dockerFilePath": "/Dockerfile"
    },
    "bundleData": {
      "bundleUrl": "https://example.com/archive.tar",
      "projectBranch": "main",
      "dockerWorkDir": "/",
      "dockerFilePath": "/Dockerfile"
    },
    "deployment": {
      "region": "europe-west",
      "instances": 1,
      "internal": {
        "nfObjectId": "example-service",
        "nfObjectType": "service",
        "repository": "https://github.com/northflank/gatsby-with-northflank",
        "branch": "master",
        "buildSHA": "latest",
        "deployedSHA": "262ed9817b3cad5142fbceabe0c9e371e390d616"
      },
      "docker": {
        "configType": "default",
        "customCommand": "nginx -g"
      },
      "buildpack": {
        "configType": "default"
      },
      "storage": {
        "ephemeralStorage": {
          "storageSize": 1024
        }
      }
    },
    "buildConfiguration": {
      "prRestrictions": [
        "feature/*"
      ],
      "branchRestrictions": [
        "feature/*"
      ],
      "crossProjectAccess": {
        "enabled": true,
        "projects": [
          "example-project"
        ]
      },
      "pathIgnoreRules": [
        "README.md"
      ],
      "isAllowList": false,
      "ciIgnoreFlags": [
        "[skip ci]"
      ],
      "dockerCredentials": [
        "example-docker-credential"
      ],
      "storage": {
        "ephemeralStorage": {
          "storageSize": 16384
        }
      }
    },
    "buildEngineConfiguration": {
      "buildEngine": "buildpack",
      "buildpack": {
        "builder": "HEROKU_24",
        "buildpackLocators": [
          "https://buildpack-registry.heroku.com/cnb/mars/create-react-app"
        ]
      }
    },
    "autoscaling": {
      "horizontal": {
        "enabled": true,
        "minReplicas": 1,
        "maxReplicas": 3,
        "userMetrics": {
          "enabled": true,
          "exposedMetricsPath": "/metrics",
          "exposedMetricsPort": 8080,
          "metrics": [
            {
              "metricName": "example-metric",
              "metricType": "gauge",
              "thresholdValue": 2
            }
          ]
        }
      }
    },
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
    ],
    "cluster": {
      "id": "nf-europe-west",
      "name": "nf-europe-west",
      "namespace": "ns-8zy2mcjh9zn2",
      "loadBalancers": [
        "lb.659200800000000000000000.northflank.com"
      ]
    }
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
