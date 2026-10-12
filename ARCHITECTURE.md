# System Architecture Document

## 1. High-Level Architecture Overview

```
                      +---------------------------------------+
                      |               Clients                 |
                      |   (Desktop, Tablet, Mobile Browsers)  |
                      +-------------------+-------------------+
                                          |
                                    HTTPS / WSS
                                          |
                      +-------------------v-------------------+
                      |      Next.js 16 (App Router)          |
                      |  - React 19 Server & Client Comps     |
                      |  - API Route Handlers                 |
                      |  - Server Actions                     |
                      +---------+-------------------+---------+
                                |                   |
             +------------------+                   +------------------+
             |                                                         |
+------------v-------------+                                +----------v----------+
|  Resume Editor Engine    |                                |  Document Services  |
|  - Unified Zod Schema    |                                |  - PDF Text Extract |
|  - Live Preview Sync     |                                |  - DOCX Text Parser |
|  - Multi-page Pagination |                                |  - AI Parser Engine |
|  - Debounced Autosave    |                                |  - Print/PDF Engine |
+------------+-------------+                                +----------+----------+
             |                                                         |
             +--------------------------+------------------------------+
                                        |
                      +-----------------v-----------------+
                      |     Service Layer & ORM           |
                      |  - `resume.service.ts`            |
                      |  - `ai.service.ts`                |
                      |  - `import.service.ts`            |
                      |  - Prisma Client                  |
                      +-----------------+-----------------+
                                        |
                      +-----------------v-----------------+
                      |     PostgreSQL Database           |
                      |  - Users, Sessions, Subscriptions |
                      |  - Resumes, Sections, Items       |
                      |  - AI Usage Logs, Imports         |
                      +-----------------------------------+
```

---

## 2. Directory Structure Convention

```
cv_builder/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── resumes/
│   │   │   ├── [resumeId]/
│   │   │   │   ├── edit/       # Full Live Split-screen Editor
│   │   │   │   └── preview/    # Fullscreen Read/Print View
│   │   │   └── new/            # 10-step Guided Wizard
│   │   └── settings/
│   ├── (marketing)/
│   │   ├── page.tsx            # High-conversion Landing Page
│   │   ├── templates/          # Template Showcase Gallery
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── privacy/
│   │   └── terms/
│   ├── api/
│   │   ├── auth/
│   │   ├── resumes/
│   │   │   └── [resumeId]/
│   │   │       ├── route.ts
│   │   │       └── export/route.ts
│   │   ├── import/route.ts     # Upload & text extraction endpoint
│   │   └── ai/
│   │       ├── parse/route.ts  # Structured extraction into Resume JSON
│   │       └── assist/route.ts # Bullet optimizer, summary & gap analysis
├── components/
│   ├── editor/                 # Navigation, forms, theme pickers
│   ├── resume-templates/       # Modern, Classic, Minimal renderers
│   ├── marketing/              # Hero, comparison tables, CTA blocks
│   └── ui/                     # Buttons, dialogs, inputs, dropdowns
├── lib/
│   ├── prisma.ts               # Shared singleton Prisma client
│   ├── auth.ts                 # Auth session & password hashing helpers
│   ├── validations/
│   │   ├── resume.ts           # Central Zod Resume Schema
│   │   ├── auth.ts
│   │   └── ai.ts
│   └── services/
│       ├── resume.service.ts
│       ├── import.service.ts
│       ├── ai.service.ts
│       └── pdf.service.ts
└── prisma/
    ├── schema.prisma           # Complete normalized PostgreSQL schema
    └── seed.ts                 # Demo templates and default user seed
```

---

## 3. Data Synchronization & Single Source of Truth
To prevent data drifts across editor forms, live preview, AI parser, and PDF export:
1. `ResumeData` is strictly typed via `lib/validations/resume.ts`.
2. Both relational models (for fast user querying, indexing, and cascade operations) and structured configuration data are synchronized through `resume.service.ts`.
3. The editor uses a local optimistic state with debounced diff syncing (800ms debounce), preventing race conditions via optimistic lock versions (`version` integer).
