# BrewBuddy Deployment Guide

## Live URLs

- **Frontend (Amplify):** https://master.d2sgyfheoqna29.amplifyapp.com
- **API Endpoint:** https://gi2kdnugob.execute-api.us-east-1.amazonaws.com/v1
- **Supabase Project:** https://gepfvqpjdtjwocwfkfwu.supabase.co

## AWS Resources

### Lambda Function
- **Function Name:** brewbuddy-api-dev-api
- **Runtime:** Node.js 18.x
- **Region:** us-east-1

### API Gateway
- **API ID:** gi2kdnugob
- **Stage:** v1
- **Type:** REST API

### AWS Amplify
- **App ID:** d2sgyfheoqna29
- **Branch:** master
- **Auto-deploy:** Yes (triggers on push to master)

### AWS Secrets Manager
- **Secret Name:** brewbuddy/api/prod
- **Region:** us-east-1
- **Contains:** SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, NODE_ENV, CORS_ORIGIN

### IAM
- **Deploy User:** brew-buddy-deploy
- **Policies:** SecretsManagerPolicy, serverlessDeployPolicy

## Supabase Configuration

### Authentication
- **Auth Method:** Email + Password
- **Age Verification:** Required (21+)
- **Site URL:** https://master.d2sgyfheoqna29.amplifyapp.com/
- **Redirect URLs:** https://master.d2sgyfheoqna29.amplifyapp.com/*, https://*.d2sgyfheoqna29.amplifyapp.com/*

### RLS Policies
- **Public read (SELECT for anon + authenticated):** beers, breweries, stores, inventory
- **User-owned (CRUD for authenticated, scoped by user_id):** favorites, tried_beers, ratings, profiles

### Database Tables
- beers, breweries, stores, inventory (public data)
- favorites, tried_beers, ratings, profiles (user-scoped data)

## Deployment Commands

### Frontend
Pushes to master auto-deploy via Amplify. No manual steps needed.

```bash
git add .
git commit -m "your message"
git push origin master
```

### Backend (Lambda API)

```bash
cd api
npx serverless deploy --stage dev
```

To force redeploy without code changes:

```bash
npx serverless deploy --stage dev --force
```

### Update Secrets

```bash
aws secretsmanager put-secret-value --secret-id brewbuddy/api/prod --secret-string "{\"SUPABASE_URL\":\"your_url\",\"SUPABASE_PUBLISHABLE_KEY\":\"your_key\",\"SUPABASE_SECRET_KEY\":\"your_key\",\"NODE_ENV\":\"production\",\"CORS_ORIGIN\":\"https://master.d2sgyfheoqna29.amplifyapp.com\"}"
```

## Security Checklist
- [x] .env files excluded from git (.gitignore)
- [x] No hardcoded secrets in source code
- [x] Backend secrets in AWS Secrets Manager
- [x] Frontend env vars in Amplify Environment Variables
- [x] RLS enabled on all Supabase tables
- [x] CORS configured to block unauthorized domains
- [x] IAM deploy user follows least privilege (2 scoped policies only)
- [x] Supabase secret key rotated after accidental exposure
