# WORKSPACE_RULES.md

---

## 0) Summary (read this first)

- P1 & P2: Build and run everything locally (React client + Express API + Supabase DB)
- Use Supabase (cloud) for PostgreSQL (and auth if needed)
- Push to GitHub regularly for backup and visibility
- P3: Deploy client to AWS Amplify and API to AWS Lambda (serverless)

---

## 1) Project Scope Rules (IMPORTANT)

- Always follow `/docs/prd.md` for product scope
- Only implement features defined in `/docs/task_list.md`
- Do NOT implement out-of-scope features
- Keep implementation simple (this is a class project)

---

## 2) Git & Branching

- Single branch workflow: `main` only
- Commit early and often (goal: multiple commits per session)
- Push at least once per work session

### Commit format:
[scope]: short description

### Examples:
- api: add GET /beers endpoint
- client: build beer list page
- docs: update PRD and task list

---

## 3) Repo Layout

/client/        # React frontend (Vite)
/api/           # Express API (Node.js)
/supabase/      # SQL schema, migrations, seeds
/docs/          # PRD, task list, workspace rules
README.md       # setup instructions

---

## 4) Environment Variables & Secrets

### Rules:
- NEVER commit `.env` files
- Use `.env.example` files for templates

### Example:

/client/.env
VITE_SUPABASE_URL=<your-url>
VITE_SUPABASE_ANON_KEY=<public-key>

/api/.env
PORT=3000
SUPABASE_URL=<your-url>
SUPABASE_SERVICE_KEY=<secret-key>
JWT_SECRET=<secret>

### Important:
- Client can only use `VITE_` public variables
- API handles all sensitive keys
- Service keys must never be exposed to frontend

---

## 5) Local Development

### Run locally:

/client
npm run dev

/api
npm run dev

### Health checks:
- API: GET http://localhost:3000/api/v1/health → { "status": "ok" }
- Client should successfully call API endpoints

---

## 6) API Conventions

### Base path:
/api/v1

### Standard endpoints:
- GET /beers
- GET /beers/:id
- POST /ratings
- POST /favorites
- DELETE /favorites/:id
- POST /history
- GET /recommendations
- GET /stores
- GET /availability

### Query examples:
/beers?style=IPA
/beers?minABV=4&maxABV=8

### Response format:
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20
  }
}

### Error format:
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input"
  }
}

---

## 7) Supabase Rules

- Supabase used as PostgreSQL database only
- All CRUD operations go through Express API
- Tables include:
  - users
  - beers
  - ratings
  - favorites
  - history
  - stores
  - availability

### Rules:
- Do not expose service role key to client
- Use Supabase client in API layer only
- Keep schema simple (class project)

---

## 8) Testing & Validation

### API:
- Validate all inputs (required fields, types)
- Return proper HTTP status codes:
  - 200 → success
  - 400 → bad request
  - 500 → server error

### Client:
- Ensure pages render without errors
- Basic validation before sending requests

### Minimum testing:
- API endpoints tested manually (Postman or curl)
- Key flows tested:
  - Browse beers
  - Filter beers
  - Rate beers
  - View recommendations

---

## 9) Logging

### API logging:
- Log all requests (method + route)
- Log errors clearly

### Example:
GET /beers 200
POST /ratings 400 - invalid input

### Rules:
- Do not log sensitive data (API keys, tokens)

---

## 10) Documentation Requirements

Keep updated:

- /docs/prd.md → product requirements
- /docs/task_list.md → tasks + acceptance criteria
- /docs/workspace_rules.md → this file

### Per feature:
- Must match a user story
- Must have acceptance criteria
- Must map to an API endpoint if applicable

---

## 11) Definition of Ready (DoR)

A task is ready when:
- User story is clearly defined
- Acceptance criteria are written
- API endpoint (if needed) is identified
- UI component is understood

---

## 12) Definition of Done (DoD)

A task is done when:
- Feature works locally
- Acceptance criteria are met
- API endpoint responds correctly
- No major errors in console
- Code is committed and pushed
- Documentation updated if needed

---

## 13) Architecture Rules

- Follow separation of concerns:
  - Client → UI (React)
  - API → business logic (Express)
  - Database → storage (Supabase)
- Client must never directly access database with service keys
- All business logic lives in API layer

---
