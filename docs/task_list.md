# Task List

---

## Epic: Discover Beers

• Task: Build Beer Browse Page (Frontend)  
o User Story: As a user, I want to browse beers so that I can explore available options.  
o Acceptance Criteria:
- Displays a list of beers on page load
- Each beer shows name, style, and basic info
- User can scroll through results
- Shows empty state if no beers available

---

• Task: Implement Beer Style Filter (Frontend + Backend)  
o User Story: As a user, I want to filter beers by style so that I can narrow down my choices.  
o Acceptance Criteria:
- User can select a beer style filter
- Beer list updates based on selected style
- User can clear/reset filter
- Data fetched via GET /beers?style=IPA

---

• Task: Implement ABV Filter (Frontend + Backend)  
o User Story: As a user, I want to filter beers by ABV so that I can control the strength of my selection.  
o Acceptance Criteria:
- User can filter beers by ABV range
- Results update dynamically
- User can reset ABV filter
- Data fetched via GET /beers?minABV=4&maxABV=8

---

• Task: Create Beer Details Page (Frontend)  
o User Story: As a user, I want to view beer details so that I can make informed decisions.  
o Acceptance Criteria:
- Displays detailed beer info (name, style, ABV, description)
- Accessible from beer list
- Maintains navigation back to browse page
- Data fetched via GET /beers/:id

---

• Task: Create GET /beers API Endpoint (Backend)  
o Acceptance Criteria:
- Returns JSON list of beers
- Supports filters (style, ABV)
- Status 200 on success, 500 on error

---

• Task: Create GET /beers/:id API Endpoint (Backend)  
o Acceptance Criteria:
- Returns single beer with full details
- Includes style, ABV, description
- Status 200 on success

---

## Epic: Recommendations

• Task: Implement Beer Rating System (Frontend + Backend)  
o User Story: As a user, I want to rate beers so that the system can provide better recommendations.  
o Acceptance Criteria:
- User can submit a rating (e.g., 1–5)
- Rating is saved to user profile
- User can update rating
- Data sent via POST /ratings

---

• Task: Generate Personalized Recommendations (Backend)  
o User Story: As a user, I want to receive personalized recommendations so that I can discover new beers.  
o Acceptance Criteria:
- Recommendations based on user ratings/history
- Returns list of recommended beers
- Handles users with no data (fallback recommendations)
- Data fetched via GET /recommendations

---

• Task: Build Recommendations Page (Frontend)  
o User Story: As a user, I want to view my recommendations.  
o Acceptance Criteria:
- Displays recommended beers
- Updates after new ratings
- Shows fallback message if no recommendations available

---

## Epic: Track Activity

• Task: Implement Favorites Feature (Frontend + Backend)  
o User Story: As a user, I want to save beers to favorites so that I can revisit them later.  
o Acceptance Criteria:
- User can favorite/unfavorite a beer
- Favorites saved to user account
- Favorites list displays saved beers
- Uses POST /favorites and DELETE /favorites/:id

---

• Task: Track Beers Tried (Frontend + Backend)  
o User Story: As a user, I want to track beers I have tried so that I can remember them.  
o Acceptance Criteria:
- User can mark a beer as “tried”
- Stored in user history
- User can view list of tried beers
- Prevents duplicate entries (or handles them clearly)
- Uses POST /history

---

• Task: Build User History Page (Frontend)  
o User Story: As a user, I want to view my past beers.  
o Acceptance Criteria:
- Displays list of tried beers
- Shows ratings if available
- Accessible from user profile

---

## Epic: Locate Stores

• Task: Search Nearby Stores (Frontend + Backend)  
o User Story: As a user, I want to search for nearby stores so that I can find where to buy beers.  
o Acceptance Criteria:
- User can search stores by location
- Displays list of nearby stores
- Handles missing location permissions gracefully
- Data fetched via GET /stores?location=user

---

• Task: Check Beer Availability at Stores (Frontend + Backend)  
o User Story: As a user, I want to check if a beer is available at a store so that I don’t waste a trip.  
o Acceptance Criteria:
- User can view stores that carry a selected beer
- Displays availability status
- Handles unknown availability clearly
- Data fetched via GET /availability?beerId=123

---

• Task: Create GET /stores API Endpoint (Backend)  
o Acceptance Criteria:
- Returns list of nearby stores
- Includes name and location
- Status 200 on success

---

• Task: Create GET /availability API Endpoint (Backend)  
o Acceptance Criteria:
- Returns store-beer availability mapping
- Handles missing data safely
- Status 200 on success

---

## Supporting Tasks

• Task: Set Up Database Schema  
o Acceptance Criteria:
- Tables for users, beers, ratings, favorites, history, stores
- Relationships properly defined

---

• Task: User Authentication (Optional if required)  
o Acceptance Criteria:
- Users can log in/out
- User-specific data persists

