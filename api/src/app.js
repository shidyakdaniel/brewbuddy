import express from 'express';
import cors from 'cors';

import beersRouter from './routes/beers.js';
import ratingsRouter from './routes/ratings.js';
import recommendationsRouter from './routes/recommendations.js';
import favoritesRouter from './routes/favorites.js';
import storesRouter from './routes/stores.js';
import availabilityRouter from './routes/availability.js';
import profilesRouter from './routes/profiles.js';
import breweriesRouter from './routes/breweries.js';
import triedBeersRouter from './routes/triedBeers.js';
import inventoryRouter from './routes/inventory.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/v1/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/v1/profiles', profilesRouter);
app.use('/v1/breweries', breweriesRouter);
app.use('/v1/beers', beersRouter);
app.use('/v1/ratings', ratingsRouter);
app.use('/v1/favorites', favoritesRouter);
app.use('/v1/tried-beers', triedBeersRouter);
app.use('/v1/stores', storesRouter);
app.use('/v1/inventory', inventoryRouter);
app.use('/v1/recommendations', recommendationsRouter);

app.use('/api/profiles', profilesRouter);
app.use('/api/breweries', breweriesRouter);
app.use('/api/beers', beersRouter);
app.use('/api/ratings', ratingsRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/tried-beers', triedBeersRouter);
app.use('/api/stores', storesRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/availability', availabilityRouter);

export default app;
