# Smart Document Reader

AI-native document extraction MVP built with Cloudflare edge infrastructure.

## Stack

Frontend:

* Next.js
* TailwindCSS
* TypeScript

Backend:

* Hono
* Cloudflare Workers

Storage & Database:

* Cloudflare D1
* Backblaze B2

AI/OCR:

* Gemini 2.5 Flash

## OCR / AI Approach

The application accepts invoices or receipt images/documents, uploads the original file to object storage, then sends the document to Gemini 2.5 Flash for structured extraction.

Gemini was chosen because:

* fast response time
* good multimodal OCR capability
* simple API integration
* suitable for lightweight MVP architecture
* no additional OCR pipeline required

The extraction result is normalized into deterministic invoice JSON fields:

* invoice number
* vendor
* date
* total amount

## Assumptions

* Documents are invoices or receipts
* Input quality is reasonably readable
* English-based invoice layouts are prioritized
* MVP scope focuses on extraction workflow rather than enterprise validation

## AI Workflow Log

AI tools heavily used during development:

* ChatGPT GPT-5.5

  * architecture planning
  * debugging
  * Cloudflare deployment troubleshooting
  * backend optimization
  * UI/UX iteration

* Codex

  * rapid implementation
  * refactoring
  * API integration
  * UI generation
  * migration fixes

Main AI-assisted workflow:

1. Define MVP architecture
2. Generate backend upload/extraction flow
3. Integrate Gemini OCR pipeline
4. Add D1 persistence
5. Deploy Workers + Pages
6. Refine UI/UX
7. Optimize error handling and schema safety

Example of one important prompt used:

"Build the minimum viable AI-native Smart Document Reader using Next.js, Hono, Cloudflare Workers, D1, and Gemini 2.5 Flash. Focus on upload, OCR extraction, structured invoice parsing, export-ready architecture, and fast deployment within a technical test constraint."

## Handling Low OCR Accuracy

Current mitigation:

* deterministic JSON normalization
* fallback parsing
* safe JSON cleanup
* field validation
* preserving original uploaded document for manual review

Potential future improvements:

* confidence scoring per field
* hybrid OCR pipeline
* document preprocessing
* layout-aware extraction
* human correction workflow

## If Given 2x More Time

Planned improvements:

* authentication and multi-user support
* extraction confidence visualization
* document thumbnail previews
* advanced table extraction
* better mobile responsiveness
* queue/background processing
* retry pipeline
* stronger validation rules
* searchable document history
* observability and analytics
* automated testing
* production CI/CD pipeline

## Local Development

Install dependencies:

```bash
pnpm install
```

Run frontend:

```bash
pnpm --filter web dev
```

Run backend:

```bash
pnpm --filter api dev
```

## Live Demo

Frontend:
https://4d11eb5f.smart-document-reader-web.pages.dev

API:
https://smart-document-reader-api.smartdoc-adi.workers.dev
