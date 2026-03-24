import { availability, beers, stores } from '../data/mockData.js';

export function getAvailability(req, res) {
  const { beer_id, store_id } = req.query;

  let result = [...availability];

  if (beer_id != null) {
    const beerIdNum = Number(beer_id);
    result = result.filter((a) => a.beer_id === beerIdNum);
  }

  if (store_id != null) {
    const storeIdNum = Number(store_id);
    result = result.filter((a) => a.store_id === storeIdNum);
  }

  // Expand with names for convenience in the prototype UI.
  const expanded = result.map((a) => {
    const beer = beers.find((b) => b.id === a.beer_id);
    const store = stores.find((s) => s.id === a.store_id);
    return {
      ...a,
      beer_name: beer?.name,
      store_name: store?.name
    };
  });

  res.json({ availability: expanded });
}
