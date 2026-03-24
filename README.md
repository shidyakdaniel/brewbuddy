# BrewBuddy (MVP Prototype)

Mobile-first web app prototype to discover beers, rate them, get simple recommendations, track favorites/tried, and search nearby stores.

## Project Structure

- `client/` React (Vite) frontend
- `api/` Node.js (Express) backend (mock data)
- `supabase/` SQL migrations + seed data
- `docs/` Product + API notes

## Prerequisites

- Node.js 18+ recommended

## Run Backend (API)

```bash
npm install
npm run dev
```

From `api/`, the server runs on `http://localhost:3001`.

## Run Frontend (Client)

```bash
npm install
npm run dev
```

From `client/`, the app runs on `http://localhost:5173` and proxies `/api/*` to the backend.

## API Endpoints (Mock)

- `GET /api/beers`
- `GET /api/beers/:id`
- `POST /api/ratings`
- `GET /api/recommendations`
- `POST /api/favorites`
- `GET /api/stores`
- `GET /api/availability`

## Supabase

Schema + seed SQL are in `supabase/`.

- Migration: `supabase/migrations/001_init.sql`
- Seed: `supabase/seed.sql`
