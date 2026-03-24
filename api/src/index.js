import express from 'express';
import cors from 'cors';

import beersRouter from './routes/beers.js';
import ratingsRouter from './routes/ratings.js';
import recommendationsRouter from './routes/recommendations.js';
import favoritesRouter from './routes/favorites.js';
import storesRouter from './routes/stores.js';
import availabilityRouter from './routes/availability.js';

const app = express();

// Prototype-friendly defaults: JSON parsing + permissive CORS.
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/beers', beersRouter);
app.use('/api/ratings', ratingsRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/stores', storesRouter);
app.use('/api/availability', availabilityRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`BrewBuddy API running on http://localhost:${PORT}`);
});
