# Get invoice

Source: https://northflank.com/docs/v1/api/org/billing/get-invoice.md

Gets details about a given invoice.

Required permission: Account > Billing > General > Read

**Path parameters:**

{object}
- `invoiceId`: (string) (required) ID of the invoice

**Query parameters:**

{object}
- `teamId`: (string) The ID of the team to filter by.
- `projectId`: (string) The ID of the project to filter by.
- `resourceType`: (string) The resource type to filter by (e.g. service, job, addon, volume). (enum: job, service, addon, volume, opentofu-job, llm-model-deployment, external-addon)

**Response body:**

{object}
- `data`: {object}
  - `id`: (string) (required) Identifier for the invoice.
  - `period`: {object}
    - `start`: (number) The start of the billing period, as a Unix timestamp. (format: float)
    - `end`: (number) The end of the billing period, as a Unix timestamp. (format: float)
  - `currency`: (string) The currency code.
  - `byocUsage`: {object}
    - `price`: {object}
      - `total`: (number) The total BYOC price, in cents. (format: float)
      - `vcpu`: (number) The vCPU usage price, in cents. (format: float)
      - `memory`: (number) The memory usage price, in cents. (format: float)
      - `gpuMemory`: (number) The GPU memory usage price, in cents. (format: float)
      - `cluster`: (number) The cluster usage price, in cents. (format: float)
  - `paasUsage`: {object}
    - `price`: {object}
      - `total`: (number) The total PaaS price, in cents. (format: float)
      - `cpu`: (number) The CPU usage price, in cents. (format: float)
      - `memory`: (number) The memory usage price, in cents. (format: float)
      - `storage`: (number) The storage usage price, in cents. (format: float)
      - `gpu`: (number) The GPU usage price, in cents. (format: float)
    - `teams`: [array of] {object}
        - `id`: (string) Identifier for the team.
        - `name`: (string) The name of the team.
        - `price`: {object}
          - `total`: (number) The total PaaS price, in cents. (format: float)
          - `cpu`: (number) The CPU usage price, in cents. (format: float)
          - `memory`: (number) The memory usage price, in cents. (format: float)
          - `storage`: (number) The storage usage price, in cents. (format: float)
          - `gpu`: (number) The GPU usage price, in cents. (format: float)
        - `projects`: [array of] {object}
            - `id`: (string) Identifier for the project.
            - `name`: (string) The name of the project.
            - `price`: {object}
              - `total`: (number) The total PaaS price, in cents. (format: float)
              - `cpu`: (number) The CPU usage price, in cents. (format: float)
              - `memory`: (number) The memory usage price, in cents. (format: float)
              - `storage`: (number) The storage usage price, in cents. (format: float)
              - `gpu`: (number) The GPU usage price, in cents. (format: float)
            - `resourceTypes`: [array of] {object}
                - `resourceType`: (string) The type of the resource (service, job, addon, volume, etc.).
                - `price`: {object}
                  - `total`: (number) The total PaaS price, in cents. (format: float)
                  - `cpu`: (number) The CPU usage price, in cents. (format: float)
                  - `memory`: (number) The memory usage price, in cents. (format: float)
                  - `storage`: (number) The storage usage price, in cents. (format: float)
                  - `gpu`: (number) The GPU usage price, in cents. (format: float)
                - `resources`: [array of] {object}
                    - `id`: (string) Identifier for the resource.
                    - `name`: (string) The name of the resource.
                    - `price`: {object}
                      - `total`: (number) The total PaaS price, in cents. (format: float)
                      - `cpu`: (number) The CPU usage price, in cents. (format: float)
                      - `memory`: (number) The memory usage price, in cents. (format: float)
                      - `storage`: (number) The storage usage price, in cents. (format: float)
                      - `gpu`: (number) The GPU usage price, in cents. (format: float)
  - `lineItems`: [array of] {object}
     - `title`: (string) A description of the line item.
     - `total`: (number) The total cost of the line item, in cents. (format: float)
     - `base`: (number) The base amount before proration, in cents. (format: float)
     - `proration`: (number) The proration adjustment amount, in cents. (format: float)
  - `subTotal`: (number) The subtotal before tax and discounts, in cents. (format: float)
  - `discounts`: {object}
    - `total`: (number) The total discount amount, in cents. (format: float)
  - `tax`: {object}
    - `percent`: (number) The tax percentage. (format: float)
    - `amount`: (number) The tax amount, in cents. (format: float)
  - `total`: (number) The total cost of the invoice, including tax, in cents. (format: float)
  - `paid`: (boolean) Whether the invoice has been paid.

### API reference

GET /v1/billing/invoices/{invoiceId}

GET /v1/teams/{teamId}/billing/invoices/{invoiceId}

#### Example Response

200 OK: Invoice details.

```json
{
  "data": {
    "currency": "usd"
  }
}
```

### CLI reference

$ northflank get invoice

Options:

- `--invoiceId <invoiceId>`: ID of the invoice

- `--teamId <teamId>`: The ID of the team to filter by.

- `--projectId <projectId>`: The ID of the project to filter by.

- `--resourceType <resourceType>`: The resource type to filter by (e.g. service, job, addon, volume).

- `--verbose `: Verbose output

- `--quiet `: No console output

- `-o --output <format>`: Output formatting

#### Example Response

 Invoice details.

```json
{
  "currency": "usd"
}
```

### JavaScript client reference

#### Example request

```javascript
await apiClient.get.invoice({
  parameters: {
    "invoiceId": "835994C3-14310"
  },
  options: {}
});
```

#### Example Response

 Invoice details.

```json
{
  "data": {
    "currency": "usd"
  },
  "rawResponse": "...",
  "request": "...",
  "error": "..."
}
```
