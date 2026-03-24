
# Product Requirements Document (PRD)
## BrewBuddy

---

## 1. Overview

BrewBuddy is a web application designed to help users discover beers, track what they’ve tried, and find where beers are available locally. The app focuses on simplifying beer discovery through filtering, personalized recommendations, and basic location-based store search.

The system does not support purchasing or delivery. It is strictly a discovery and tracking tool.

---

## 2. Goals

- Allow users to browse and filter beers easily
- Help users track beers they’ve tried and liked
- Provide personalized beer recommendations
- Enable users to find nearby stores that carry specific beers

---

## 3. Core Features

### Discover Beers
- Browse a list of beers
- Filter beers by style
- Filter beers by ABV
- View detailed beer information

### Recommendations
- Rate beers
- Generate personalized recommendations based on user activity
- View recommended beers

### Track Activity
- Save beers to favorites
- Track beers that have been tried
- View history of tried beers

### Locate Stores
- Search for nearby stores
- Check if a beer is available at a store

---

## 4. Out of Scope

The following features are intentionally excluded:

- In-app purchasing
- Delivery or shipping
- Social media sharing
- Messaging between users
- Notifications
- Gamification (badges, points, etc.)
- Store inventory management tools
- Advanced analytics or pricing tools

---

## 5. Architecture

### Frontend
- Built with React (Vite-ready)
- Handles UI rendering and user interaction
- Communicates with API via HTTP requests

### API Layer
- Built with Express (Node.js)
- Handles business logic and routing
- Exposes REST endpoints

### Database
- Managed in Supabase (PostgreSQL)
- Stores users, beers, ratings, favorites, history, and stores

---

## 6. API Design (High-Level)

### Beer Endpoints
- GET /beers → list beers (supports filters)
- GET /beers/:id → get beer details

### Rating & Activity
- POST /ratings → submit/update rating
- POST /favorites → add favorite
- DELETE /favorites/:id → remove favorite
- POST /history → mark beer as tried

### Recommendations
- GET /recommendations → get personalized recommendations

### Store & Availability
- GET /stores → get nearby stores
- GET /availability → check beer availability at stores

---

## 7. Deployment Strategy

- Frontend: AWS Amplify (continuous deployment via GitHub)
- API Layer: AWS Lambda (serverless Express via serverless-http)
- Database: Supabase cloud-hosted PostgreSQL

---

## 8. Development Tools

- GitHub for version control and collaboration
- Windsurf IDE for development
- Trello or similar for task tracking
- Slack or similar for communication

---

## 9. Key Considerations

- Separation of Concerns:
  Clear distinction between frontend (UI), API (logic), and database (storage)

- Role-Based Access:
  Basic user-level permissions (user-specific data like favorites and history)

- Environment Variables:
  API keys and credentials stored securely in .env files (never committed)

- Scalability:
  Architecture reflects real-world practices, though scaled down for a class project

- Data Limitations:
  Store availability data may be incomplete and should be handled gracefully

---

## 10. Assumptions

- Users will interact primarily through a web interface
- Beer and store data will be preloaded or mocked if necessary
- Location-based features may rely on browser permissions
- Recommendation logic will be basic (rule-based or simple filtering)

---

## 11. Future Enhancements (Optional)

- More advanced recommendation algorithms
- Mobile app version
- Integration with real-time inventory APIs
- User profiles with deeper analytics
