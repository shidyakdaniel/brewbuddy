# BrewBuddy Launch Announcement

Hey team! BrewBuddy is officially live!

**Live app:** https://master.d2sgyfheoqna29.amplifyapp.com

## What is BrewBuddy?
A beer discovery app that helps users find craft beers, save favorites, track what they've tried, get recommendations, and find nearby stores on a map.

## What's working
- Full authentication flow (register with age verification, login, logout)
- Browse and search beers by name, style, and ABV
- Beer detail pages with one-click favorite, tried, and rating actions
- Favorites and Tried pages pull real data from Supabase
- Personalized recommendations based on user ratings
- Interactive store map with Leaflet + OpenStreetMap
- Deployed frontend on AWS Amplify with auto-deploy from GitHub
- Serverless API on AWS Lambda connected to Supabase via Secrets Manager
- RLS policies securing all user data
- CORS blocking unauthorized domains

## Known limitations
- Recommendations use popularity sorting, not a true ML algorithm
- No profile editing page yet
- Store availability and pricing not yet implemented

## Tech stack
React (Vite) | Express on Lambda | Supabase (PostgreSQL + Auth) | AWS Amplify | Leaflet

## Questions?
Reach out to dannyshidyak12345678@gmail.com
