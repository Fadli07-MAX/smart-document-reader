# Smart Document Reader

AI-native document processing platform for receipts, invoices, and financial documents built on the Cloudflare edge ecosystem.

Technical test submission for AI Native Fullstack Developer — PT Superbrands International. :contentReference[oaicite:0]{index=0}

---

# Live Demo

Frontend:
```txt
https://YOUR-PAGES-URL.pages.dev
```

API:
```txt
https://YOUR-WORKER.workers.dev
```

GitHub Repository:
```txt
https://github.com/YOUR_USERNAME/smart-document-reader
```

---

# Features

## Core Features

- Upload JPG / PNG / PDF documents
- Multi-file upload
- OCR document extraction
- AI-based structured parsing
- Editable review form
- Confidence scoring / validation flags
- Persistent storage using Cloudflare D1
- CSV export
- Document filtering
- Processing status tracking
- Structured audit logging

## AI-Native Features

- OCR + LLM hybrid pipeline
- Confidence-based field validation
- Hallucination mitigation
- Structured deterministic JSON extraction
- Retry-safe queue processing
- AI processing lifecycle tracking

---

# Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router |
| UI | TailwindCSS + shadcn/ui |
| State Management | TanStack Query |
| Backend | Cloudflare Workers |
| API Framework | Hono |
| Database | Cloudflare D1 |
| ORM | Drizzle ORM |
| File Storage | Cloudflare R2 |
| Queue | Cloudflare Queues |
| OCR Engine | Mistral OCR |
| OCR Fallback | Google Vision OCR |
| AI Extraction | Gemini 2.5 Flash |
| AI Gateway | OpenRouter |
| Validation | Zod |
| Logging | Structured JSON Logs |
| Monitoring | Sentry |

---

# Why This Architecture

The architecture uses an:

```txt
Edge-Native Layered Modular Monolith
```

Reasoning:

- lower operational complexity
- faster iteration
- easier debugging
- Cloudflare-native deployment
- maintainable under rapid development
- scalable enough for the project scope
- contract-first architecture
- queue-safe processing pipeline

Instead of microservices, a modular monolith was chosen to maximize delivery speed, consistency, and maintainability during the technical test timeframe.

---

# System Architecture

```txt
Client
  ↓
Next.js Frontend
  ↓
Cloudflare Worker API
  ↓
Upload Queue
  ↓
OCR Pipeline
  ↓
AI Extraction
  ↓
Validation
  ↓
D1 Persistence
  ↓
Review & Export
```

---

# Processing Lifecycle

```txt
uploaded
queued
processing
ocr_completed
extraction_completed
review_required
approved
failed
archived
```

---

# OCR & AI Pipeline

## OCR Strategy

Primary OCR:
```txt
Mistral OCR
```

Fallback OCR:
```txt
Google Vision OCR
```

Reason:
- good accuracy
- fast processing
- reliable for receipts/invoices
- strong multilingual support
- lower implementation complexity

---

## AI Extraction Strategy

Model:
```txt
Gemini 2.5 Flash
```

Gateway:
```txt
OpenRouter
```

Reason:
- fast inference
- low latency
- strong JSON extraction capability
- low operational cost
- good instruction following
- suitable for structured financial extraction

---

# Confidence & Validation Strategy

OCR is never assumed to be fully accurate. :contentReference[oaicite:1]{index=1}

The system:

- stores raw OCR output
- calculates extraction confidence
- flags uncertain fields
- allows manual correction
- validates structured responses using Zod
- prevents invalid persistence

Fields with low confidence are highlighted in the review UI before final approval.

---

# Security

Implemented security measures:

- signed upload URLs
- MIME validation
- extension validation
- request validation
- Zod runtime validation
- rate limiting
- structured error handling
- CSP headers
- queue-safe processing
- input sanitization
- strict TypeScript mode
- no trust-from-client architecture

---

# Observability

The application includes:

- request correlation IDs
- structured JSON logs
- processing timeline tracking
- OCR latency visibility
- AI latency visibility
- audit logging
- queue visibility
- centralized error handling

---

# Database

Persistence layer:
```txt
Cloudflare D1
```

Features:
- relational schema
- indexed queries
- audit trail
- soft delete support
- retry-safe persistence
- append-only processing logs

---

# Folder Structure

```txt
/apps
  /web
  /api

/packages
  /ai
  /contracts
  /db
  /env
  /observability
  /shared
  /types
  /ui
  /security
```

---

# API Endpoints

```txt
POST   /api/v1/uploads
GET    /api/v1/documents
GET    /api/v1/documents/:id
PATCH  /api/v1/reviews/:id
GET    /api/v1/exports/csv
GET    /api/v1/health
```

---

# Setup

## Install

```bash
pnpm install
```

---

## Environment Variables

Create:

```txt
.env.local
```

Example:

```env
OPENROUTER_API_KEY=
MISTRAL_API_KEY=
GOOGLE_VISION_API_KEY=
DATABASE_URL=
R2_BUCKET=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
SENTRY_DSN=
```

---

## Run Development

```bash
pnpm dev
```

---

# Deploy

## Deploy Frontend

```bash
pnpm --filter web deploy
```

## Deploy API

```bash
pnpm --filter api deploy
```

---

# AI Workflow Log

The project was intentionally developed using AI-assisted orchestration as requested in the brief. :contentReference[oaicite:2]{index=2}

## AI Usage

| Area | AI Usage |
|---|---|
| Architecture | System design & modularization |
| Frontend | UI generation & refactoring |
| Backend | API scaffolding |
| Database | Schema generation |
| OCR Pipeline | Prompt engineering |
| Security | Validation checklist |
| DevOps | Cloudflare deployment |
| Documentation | README & architecture docs |

---

# Example High-Impact Prompt

```txt
Design an enterprise-grade AI-native Smart Document Reader using:
- Next.js
- Cloudflare Workers
- Cloudflare D1
- Cloudflare Queues
- OCR + LLM extraction

Requirements:
- maintainable
- scalable
- observable
- secure
- contract-first
- queue-safe
- deterministic AI extraction
- enterprise folder structure
- production-grade architecture

Avoid:
- overengineering
- microservices complexity
- fake abstractions
- placeholder architecture

Focus on:
- rapid delivery
- technical test execution
- clean architecture
- AI orchestration
```

---

# Assumptions

- users are internal business operators
- uploads are financial documents only
- AI extraction is assistive, not authoritative
- OCR failures are expected and recoverable
- processing may be asynchronous
- Cloudflare ecosystem is the deployment target

---

# Edge Cases Considered

- blurry receipts
- rotated documents
- dark images
- malformed PDFs
- missing totals
- unsupported formats
- partial OCR failures
- invalid AI responses
- duplicate uploads

---

# Tradeoffs

## Chosen

- modular monolith over microservices
- queue-based orchestration
- deterministic extraction pipeline
- SSR-first frontend architecture

## Avoided

- websocket complexity
- multi-agent orchestration
- event mesh
- service mesh
- recursive AI loops
- overengineered infrastructure

---

# What Would Be Improved With More Time

- stronger OCR preprocessing
- duplicate document detection
- advanced search
- export formats beyond CSV
- multi-tenant auth
- realtime processing updates
- smarter confidence scoring
- automatic categorization
- AI correction suggestions
- offline retry synchronization
- dashboard analytics

---

# Technical Notes

This project prioritizes:

```txt
correctness
consistency
maintainability
reliability
observability
security
```

over premature complexity.

---

# Submission Notes

This project was built specifically for the technical assessment requirements described in the brief. :contentReference[oaicite:3]{index=3}

The implementation focuses on:
- AI orchestration
- cloud-native architecture
- maintainability
- pragmatic engineering decisions
- rapid delivery
- production-oriented structure

---
