# Reflect AI — Next.js + Prisma + MongoDB + OpenAI + Cypress

AI-assisted daily reflection journal. Users rate their day, write a short note, and get a summary, mood tag, and a small tip. Built for end-to-end testing with Cypress.

---

## Features

- ✍️ Clean landing page with ChatGPT-style textarea  
- 🎚️ 1–5 rating → live mood preview (emoji + enum)  
- 🤖 OpenAI-powered insights 
- 🗂️ History page listing saved reflections  
- 🧪 Full E2E coverage with Cypress (happy path, validation, AI failure, history)  
- 🎨 Themeable UI (shadcn/ui, Tailwind, tweakcn)

---

## Tech stack

- **Next.js (App Router)**, **TypeScript**
- **Prisma** (MongoDB)
- **OpenAI Node SDK**
- **shadcn/ui**, **Tailwind**
- **Cypress** for E2E tests
- **mongodb-memory-server** for test DB

---

## Getting started

### 1) Install
```bash
npm install
```

### 2) Environment variables
Create **`.env.local`** (and/or `.env`) at the project root:

```env
# Prisma / Mongo
DATABASE_URL="mongodb://localhost:27017/cypressFullstack"  # or your Atlas URI

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```


### 3) Prisma: generate, push & seed
```bash
# generate Prisma client
npm run generate          # or: npx prisma generate

# apply schema to DB
npm run push              # or: npx prisma db push

# seed database
npm run seed
```

### 4) Start the app
```bash
npm run dev
```
App runs on **http://localhost:3000** in dev. (Cypress will spin a separate server on **:3100**.)

---

## E2E tests (Cypress)

Cypress bootstraps:
- an **in-memory MongoDB replica set** (`mongodb-memory-server`)
- a **Next.js dev server on :3100** (see `cypress.config.*`)
- a **`reseed` task** before each test for deterministic state

### Commands
```bash
# Open Cypress UI
npx cypress open

# Headless run (CI-style)
npx cypress run

# Or use npm script if present:
npm test
```

### What the tests cover (`cypress/e2e/journal.cy.ts`)
- **Flow 1 – Happy path (real API):** select rating, write text, submit → redirected to history → newest entry shows deterministic AI fields in test env.
- **Flow 2a – Validation (too-short / missing text):** shows inline error, prevents submit.
- **Flow 2b – Validation (missing rating):** shows inline error, prevents network call.
- **Flow 3 – AI failure:** test sets header **`x-test-no-ai: 1`** to skip AI; entry persists without AI fields; UI omits Summary/Mood/Tip.
- **Flow 4 – History:** renders seeded entries with timestamp and rating.
- **Smoke/Nav tests:** header, legend, rating buttons, clear resets, nav to history.

---

```
app/
  page.tsx                 # Landing (client) – form, rating, preview
  history/page.tsx         # History (server) – lists entries

components/
  home/
    actions.tsx
    form-error.tsx
    mood-legend.tsx
    mood-preview.tsx
    rating-selector.tsx
    reflection-textarea.tsx
  history/
    entry-card.tsx
    entries-list.tsx
  site-header.tsx

lib/
  prisma.ts                # Prisma client (singleton)
  openai.ts                # OpenAI client (singleton)
  mood.ts                  # shared mood helpers (emoji, mapping)

prisma/
  schema.prisma
  seed/
    index.ts
    entry.ts              # mock data seeding

cypress/
  e2e/journal.cy.ts
  (config files)

generated/
  prisma/                  # Prisma client output (per schema)
```

---

## API

### `POST /api/entries`
**Body**
```json
{ "rating": 1, "text": "at least 10 chars" }
```

**Behavior**
- Validates inputs; returns **201** with the created entry.
- In **test env**, returns deterministic AI fields (no network).
- In dev/prod, calls OpenAI for `aiSummary`, `aiMood`, `aiTip`.
- **Test-only:** if the request includes header `x-test-no-ai: 1`, saves **without** AI fields (used by Flow 3).

### `GET /api/entries`
Returns recent entries

---

## Local MongoDB replica set (for dev)

Prisma’s MongoDB connector expects a **replica set** (even locally). If you use local Mongo instead of Atlas:

### macOS
1. Stop service  
   `brew services stop mongodb-community@8.0`
2. Edit config  
   `code /opt/homebrew/etc/mongod.conf`  
   Add:
   ```yaml
   replication:
     replSetName: rs0
   ```
3. Start service  
   `brew services start mongodb-community`
4. Init replica set  
   ```bash
   mongosh
   rs.initiate()
   rs.status() 
   ```

### Windows
1. Stop service  
   `Stop-Service "MongoDB"`
2. Edit config  
   `code "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg"`  
   Add:
   ```yaml
   replication:
     replSetName: rs0
   ```
3. Start service  
   `Start-Service "MongoDB"`
4. Init replica set  
   ```powershell
   mongosh
   rs.initiate()
   rs.status() 
   ```