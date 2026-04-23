# BrewBuddy

A beer discovery web app that helps users find craft beers, track their favorites, rate what they've tried, and locate nearby stores. Built as a class project for CSU Chico.

## Live App

https://master.d2sgyfheoqna29.amplifyapp.com

## Tech Stack

- **Frontend:** React (Vite) hosted on AWS Amplify
- **Backend:** Express API on AWS Lambda via Serverless Framework
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email + password)
- **Maps:** Leaflet + OpenStreetMap

## Features

- Browse and search beers by name, style, and ABV
- View detailed beer information
- Save beers to favorites (one-click)
- Mark beers as tried with liked/disliked tracking (green/red indicators)
- Rate beers on a 1-5 scale
- View personalized recommendations based on ratings
- Find nearby stores on an interactive map
- User authentication with age verification (21+)

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm
- AWS CLI configured
- Supabase project

### Frontend
1. cd client
2. npm install
3. Create .env.local with:
   - VITE_SUPABASE_URL=your_supabase_url
   - VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   - VITE_API_BASE=your_api_endpoint
4. npm run dev

### Backend
1. cd api
2. npm install
3. Configure AWS Secrets Manager with Supabase credentials
4. npx serverless deploy --stage dev

## Demo User Instructions

1. Go to the live app URL above
2. Click "Register" to create a new account
3. Enter your email, create a password, and confirm you are 21+
4. Check your email for a confirmation link and click it
5. Return to the app and log in with your credentials
6. Browse beers, add favorites, mark beers as tried, and rate them
7. Visit Recommendations to see personalized suggestions
8. Visit Stores to see nearby locations on the map

## Known Issues

- Recommendations are basic and currently show beers sorted by popularity rather than a true recommendation algorithm
- Map placeholder area may appear briefly before tiles load
- No profile management page yet

## Deployment

- **Frontend:** Pushes to master branch auto-deploy via AWS Amplify
- **Backend:** Deploy manually with `cd api && npx serverless deploy --stage dev`

## Deployed Application

**Live Site:** [https://master.d2sgyfheoqna29.amplifyapp.com](https://master.d2sgyfheoqna29.amplifyapp.com)

### Local Setup Notes
- Make sure you have Node.js 18+ and npm installed
- Clone the repo: `git clone https://github.com/shidyakdaniel/brewbuddy.git` 
- Frontend: `cd client && npm install && npm run dev` 
- Backend: `cd api && npm install && npx serverless deploy --stage dev` 
- You must create `client/.env.local` with your own Supabase URL and anon key
- You must configure AWS Secrets Manager with your Supabase credentials for the backend

### Troubleshooting Tips
- If beers don't load on the Home page, check that RLS policies exist for the beers table (needs a public SELECT policy)
- If favorites/tried/ratings fail, make sure the user_id foreign keys point to auth.users, not a public users table
- If the API returns CORS errors, verify CORS_ORIGIN in AWS Secrets Manager matches your Amplify URL exactly
- If login doesn't work, check that your Supabase project has email auth enabled under Authentication > Providers
- If the Stores map doesn't render, make sure leaflet CSS is imported in Stores.jsx

### Known Issues / Incomplete Features
- Recommendations are sorted by popularity rather than a true personalized algorithm
- No profile management page (users can't edit their name or preferences)
- Store search/filter not yet implemented (all stores shown)
- Beer availability and estimated pricing at stores not yet wired up
- Map tiles may briefly show a gray placeholder before loading

### Support
For questions or issues, contact: **dannyshidyak12345678@gmail.com**
