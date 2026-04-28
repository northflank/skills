# Northflank Plans & Regions

Generated from `GET https://api.northflank.com/v1/plans` and `GET https://api.northflank.com/v1/regions`. Both endpoints are public (no auth) — **query them directly if a SKU below looks stale or is missing**. Maintainers can refresh this file with `node scripts/generate_references.js --force`.

## Compute plans

Used as `billing.deploymentPlan` (and `billing.buildPlan` for plans flagged build-capable).

| Plan ID | vCPU | RAM | $/mo | $/hr | Build |
|---|---|---|---|---|---|
| `nf-compute-10` | 0.1 | 256 MB | $2.7 | $0.004 | — |
| `nf-compute-20` | 0.2 | 512 MB | $5.4 | $0.008 | — |
| `nf-compute-50` | 0.5 | 1 GB | $12 | $0.017 | — |
| `nf-compute-100-1` | 1 | 1 GB | $18 | $0.025 | — |
| `nf-compute-100-2` | 1 | 2 GB | $24 | $0.033 | — |
| `nf-compute-100-4` | 1 | 4 GB | $36 | $0.05 | — |
| `nf-compute-200` | 2 | 4 GB | $48 | $0.067 | — |
| `nf-compute-200-4` | 2 | 4 GB | $48 | $0.067 | — |
| `nf-compute-200-8` | 2 | 8 GB | $72 | $0.1 | — |
| `nf-compute-200-16` | 2 | 16 GB | $120 | $0.167 | — |
| `nf-compute-400` | 4 | 8 GB | $96 | $0.133 | — |
| `nf-compute-400-16` | 4 | 16 GB | $144 | $0.2 | ✓ |
| `nf-compute-800-8` | 8 | 8 GB | $144 | $0.2 | ✓ |
| `nf-compute-800-16` | 8 | 16 GB | $192 | $0.267 | ✓ |
| `nf-compute-800-24` | 8 | 24 GB | $240 | $0.333 | ✓ |
| `nf-compute-800-32` | 8 | 32 GB | $288 | $0.4 | ✓ |
| `nf-compute-800-40` | 8 | 40 GB | $336 | $0.467 | ✓ |
| `nf-compute-1200-24` | 12 | 24 GB | $288 | $0.4 | ✓ |
| `nf-compute-1600-32` | 16 | 32 GB | $384 | $0.533 | ✓ |
| `nf-compute-2000-40` | 20 | 40 GB | $480 | $0.667 | ✓ |

## GPU plans

GPU services use a paired plan slug: `nf-gpu-<gpuType>-<count>g`. Set `deployment.gpu` (or `billing.gpu`) with matching `gpuType` and `gpuCount`.

### GPU models (managed cloud)

Pricing is per GPU per hour, on top of the bundled CPU/RAM in the `nf-gpu-*` plan.

| Model | `gpuType` | VRAM | Counts per instance | $/hr per GPU | Available regions |
|---|---|---|---|---|---|
| NVIDIA L4 | `l4-24` | 24 GB | 1, 2, 4, 8 | $0.80 | europe-west, us-central, asia-southeast, us-east1, us-west, asia-northeast, europe-west-frankfurt |
| NVIDIA A100 | `a100-40` | 40 GB | 1, 2, 4, 8 | $1.42 | us-central, europe-west-netherlands, asia-southeast, asia-northeast |
| NVIDIA A100 | `a100-80` | 80 GB | 1, 2, 4, 8 | $1.76 | us-central, europe-west-netherlands, asia-southeast, us-east1 |
| NVIDIA H100 | `h100-80` | 80 GB | 1, 2, 4, 8 | $2.74 | us-central, europe-west-netherlands, asia-southeast, us-east1, us-west, asia-northeast |
| NVIDIA H200 | `h200-141` | 141 GB | 8 | $3.14 | us-central, europe-west-netherlands, us-east1, us-west |
| NVIDIA B200 | `b200-180` | 180 GB | 8 | $5.87 | europe-west-netherlands, asia-southeast, us-east1, asia-northeast |

### Enumerated GPU plan slugs

- `nf-gpu-a100-40-1g` — 1× NVIDIA A100 (40 GB)
- `nf-gpu-a100-40-2g` — 2× NVIDIA A100 (40 GB)
- `nf-gpu-a100-40-4g` — 4× NVIDIA A100 (40 GB)
- `nf-gpu-a100-40-8g` — 8× NVIDIA A100 (40 GB)
- `nf-gpu-a100-80-1g` — 1× NVIDIA A100 (80 GB)
- `nf-gpu-a100-80-2g` — 2× NVIDIA A100 (80 GB)
- `nf-gpu-a100-80-4g` — 4× NVIDIA A100 (80 GB)
- `nf-gpu-a100-80-8g` — 8× NVIDIA A100 (80 GB)
- `nf-gpu-b200-180-8g` — 8× NVIDIA B200 (180 GB)
- `nf-gpu-h100-80-1g` — 1× NVIDIA H100 (80 GB)
- `nf-gpu-h100-80-2g` — 2× NVIDIA H100 (80 GB)
- `nf-gpu-h100-80-4g` — 4× NVIDIA H100 (80 GB)
- `nf-gpu-h100-80-8g` — 8× NVIDIA H100 (80 GB)
- `nf-gpu-h200-141-8g` — 8× NVIDIA H200 (141 GB)
- `nf-gpu-l4-24-1g` — 1× NVIDIA L4 (24 GB)
- `nf-gpu-l4-24-2g` — 2× NVIDIA L4 (24 GB)
- `nf-gpu-l4-24-4g` — 4× NVIDIA L4 (24 GB)
- `nf-gpu-l4-24-8g` — 8× NVIDIA L4 (24 GB)

## Regions

Northflank's managed cloud runs on Google Cloud. GPU availability varies — only regions with GPU devices are selectable for GPU-enabled projects.

| ID | Name | Group | GCP region | GPU models |
|---|---|---|---|---|
| `canada-central` | Canada - Central | Americas | `gcp/northamerica-northeast2` | — |
| `southamerica-east` | South - America - East | Americas | `gcp/southamerica-east1` | — |
| `us-central` | US - Central | Americas | `gcp/us-central1` | H200, H100, A100, A100, L4 |
| `us-east-ohio` | US - East - Ohio | Americas | `gcp/us-east5` | — |
| `us-east1` | US - East | Americas | `gcp/us-east4` | B200, H200, H100, A100, L4 |
| `us-west` | US - West | Americas | `gcp/us-west1` | H200, H100, L4 |
| `us-west-california` | US - West - California | Americas | `gcp/us-west2` | — |
| `asia-east` | Asia - East | Asia Pacific | `gcp/asia-east2` | — |
| `asia-northeast` | Asia - Northeast | Asia Pacific | `gcp/asia-northeast1` | B200, H100, A100, L4 |
| `asia-southeast` | Asia - Southeast | Asia Pacific | `gcp/asia-southeast1` | B200, H100, A100, A100, L4 |
| `australia-southeast` | Australia - Southeast | Asia Pacific | `gcp/australia-southeast2` | — |
| `africa-south` | Africa - South | EMEA | `gcp/africa-south1` | — |
| `europe-west` | Europe - West | EMEA | `gcp/europe-west2` | L4 |
| `europe-west-frankfurt` | Europe - West - Frankfurt | EMEA | `gcp/europe-west3` | L4 |
| `europe-west-netherlands` | Europe - West - Netherlands | EMEA | `gcp/europe-west4` | H200, H100, A100, A100, B200 |
| `europe-west-zurich` | Europe - West - Zurich | EMEA | `gcp/europe-west6` | — |
