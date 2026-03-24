import { beers, favorites } from '../data/mockData.js';

export function addFavorite(req, res) {
  const { user_id, beer_id } = req.body || {};

  const beerIdNum = Number(beer_id);

  if (!user_id || !beer_id || Number.isNaN(beerIdNum)) {
    return res.status(400).json({ error: 'Invalid payload. Expected { user_id, beer_id }' });
  }

  const beerExists = beers.some((b) => b.id === beerIdNum);
  if (!beerExists) {
    return res.status(404).json({ error: 'Beer not found' });
  }

  const exists = favorites.some((f) => f.user_id === String(user_id) && f.beer_id === beerIdNum);
  if (exists) {
    return res.status(200).json({ ok: true, favorite: { user_id: String(user_id), beer_id: beerIdNum } });
  }

  const newFav = {
    id: favorites.length + 1,
    user_id: String(user_id),
    beer_id: beerIdNum
  };

  favorites.push(newFav);
  return res.status(201).json({ favorite: newFav });
}
