import { beers, ratings } from '../data/mockData.js';

export function createRating(req, res) {
  const { user_id, beer_id, rating } = req.body || {};

  const beerIdNum = Number(beer_id);
  const ratingNum = Number(rating);

  if (!user_id || !beer_id || Number.isNaN(beerIdNum) || Number.isNaN(ratingNum)) {
    return res.status(400).json({ error: 'Invalid payload. Expected { user_id, beer_id, rating }' });
  }

  if (ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const beerExists = beers.some((b) => b.id === beerIdNum);
  if (!beerExists) {
    return res.status(404).json({ error: 'Beer not found' });
  }

  const newRating = {
    id: ratings.length + 1,
    user_id: String(user_id),
    beer_id: beerIdNum,
    rating: ratingNum
  };

  ratings.push(newRating);

  return res.status(201).json({ rating: newRating });
}
