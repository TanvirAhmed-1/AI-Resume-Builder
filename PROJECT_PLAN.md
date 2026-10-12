# AI-Powered CV Builder SaaS - Master Project Plan

## Executive Overview
A production-grade, full-stack CV and Resume Builder SaaS inspired by modern builder paradigms (such as FlowCV), built entirely with Next.js App Router, React 19, TypeScript (strict mode), Tailwind CSS, shadcn/ui, PostgreSQL with Prisma ORM, Zod, and an extensible AI and document parsing architecture.

---

## Technical Architecture & Stack Specs

- **Runtime & Framework**: Node.js v24+, Next.js (App Router, Server Actions & Route Handlers), React 19, TypeScript (strict mode)
- **Styling & UI**: Tailwind CSS v4, Lucide React, Radix UI / shadcn/ui primitives
- **Database & ORM**: PostgreSQL (hosted / Prisma Accelerate / Supabase/Neon connection pool compatible), Prisma ORM
- **Authentication**: NextAuth.js / Auth.js (v5 compatible) or lightweight secure JWT session auth with bcryptjs password hashing and Google OAuth support
- **Validation**: Zod (strict schemas shared between client forms, API routes, AI parser, and PDF export)
- **Document Ingestion**:
  - `pdf-parse` / `unpdf` for text-based PDF extraction
  - `mammoth` for DOCX extraction
  - OCR fallback architecture using client or Tesseract/Node integration
- **AI Engine**: Modular provider abstraction (`OpenAI`, `Anthropic`, `Google Gemini`, or custom endpoint) for:
  - Structured CV parsing (raw text -> Zod validated resume JSON)
  - Resume bullet rewriting & action verb enhancements
  - Summary generator & job-description gap analysis
- **PDF Generation**:
  - High-fidelity print-to-PDF engine with custom print CSS @page A4 styling
  - Server-side / client-side printable document rendering ensuring 0 clipping and accurate page breaks across multi-page resumes
- **Testing**: Vitest for unit & parser schema tests, Playwright for end-to-end user flows

---

## Phased Implementation Roadmap

### Phase 1: Repository Inspection & Architectural Blueprint (In Progress)
- [x] Inspect existing dependencies: Next.js 16.4.0, React 19.3.0, Tailwind v4
- [x] Terminate conflicting background processes (hanging `create-prisma` prompt)
- [ ] Create core architectural docs:
  - `PROJECT_PLAN.md`
  - `ARCHITECTURE.md`
  - `DATABASE_DESIGN.md`
  - `IMPLEMENTATION_STATUS.md`

### Phase 2: Database Schema & Prisma Foundation
- [ ] Install Prisma CLI & `@prisma/client`
- [ ] Define comprehensive PostgreSQL schema in `prisma/schema.prisma`
  - User & Account models
  - Resume with metadata, theme, layout & typography configs
  - Relational resume sections: PersonalInfo, Experience, Education, Skills, Projects, Certifications, Languages, Awards, CustomSections
  - Import tracking & AI usage logs
  - Subscription & entitlement flags
- [ ] Generate Prisma Client & verify database connection
- [ ] Create seed script & DB utilities

### Phase 3: Core Validation & Unified Resume Data Model
- [ ] Implement `lib/validations/resume.ts`: Single source of truth Zod schema for full CV data
- [ ] Build mock and sample resume datasets conforming strictly to the schema
- [ ] Setup unified typography, color themes, and spacing token system

### Phase 4: Resume Template Engine (Modern, Classic, Minimal)
- [ ] Reusable multi-page A4 resume canvas renderer (`components/resume-templates/resume-renderer.tsx`)
- [ ] Template 1: **Modern** (sleek sidebar / top header, accent badges, crisp divider lines)
- [ ] Template 2: **Classic** (traditional serif/sans executive layout, elegant margins, ivy-league styling)
- [ ] Template 3: **Minimal** (clean Scandinavian whitespace, typographic hierarchy, modern tech focus)
- [ ] Template registry mapping validated template IDs

### Phase 5: Live Resume Editor & Creation Wizard
- [ ] 10-step guided creation wizard for first-time onboarding
- [ ] Full two-column split live editor:
  - Left pane: section navigation & responsive collapsible forms (PersonalInfo, Experience, Education, Skills, Projects, etc.)
  - Right pane: live interactive A4 zoomable preview
- [ ] Real-time reactive state management with debounced autosave indicator (Saving... / Saved / Error)
- [ ] Reordering, adding, removing, and toggling visibility of sections

### Phase 6: Document Import & AI Parsing Pipeline
- [ ] PDF & DOCX file upload validator (magic bytes, size limits)
- [ ] Text extraction service (`lib/services/import.service.ts`)
- [ ] AI prompt architecture with structured JSON output enforced by Zod
- [ ] Interactive review & correction screen highlighting uncertain or extracted fields before saving to DB

### Phase 7: AI Writing Assistant
- [ ] Bullet point enhancer (action verbs, quantifiable achievements)
- [ ] Summary generator tailored to target job titles
- [ ] Job description alignment & gap analyzer
- [ ] AI rate limiter and token tracking

### Phase 8: High-Fidelity A4 PDF Export
- [ ] Dedicated export route and print layout styling
- [ ] Browser-native print-to-PDF trigger and serverless PDF fallback
- [ ] Verification against multi-page overflow and link preservation

### Phase 9: Dashboard, Authentication & User Management
- [ ] User authentication flow (Email/Password + Google OAuth)
- [ ] Protected dashboard: Resume card grid, create new, rename, duplicate, delete with confirmation modal
- [ ] User settings & profile management
- [ ] Subscription & plan entitlement infrastructure (Free vs Pro limits)

### Phase 10: Marketing Website, Quality Assurance & Deployment
- [ ] Landing page (`/`), `/templates`, `/features`, `/pricing`, `/privacy`, `/terms`
- [ ] Vitest test suite for Zod validation, text extraction, and template registry
- [ ] Playwright E2E test suite for full flow: Register -> Create -> Edit -> Preview -> Export
- [ ] `.env.example` and production deployment guide
