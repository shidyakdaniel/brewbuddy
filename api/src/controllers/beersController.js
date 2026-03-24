import { beers } from '../data/mockData.js';

export function listBeers(req, res) {
  const { style, abvMin, abvMax, q } = req.query;

  let result = [...beers];

  if (q) {
    const query = String(q).toLowerCase();
    result = result.filter((b) => b.name.toLowerCase().includes(query));
  }

  if (style) {
    const s = String(style).toLowerCase();
    result = result.filter((b) => b.style.toLowerCase() === s);
  }

  const min = abvMin != null ? Number(abvMin) : null;
  const max = abvMax != null ? Number(abvMax) : null;

  if (min != null && !Number.isNaN(min)) {
    result = result.filter((b) => b.abv >= min);
  }
  if (max != null && !Number.isNaN(max)) {
    result = result.filter((b) => b.abv <= max);
  }

  res.json({ beers: result });
}

export function getBeerById(req, res) {
  const id = Number(req.params.id);
  const beer = beers.find((b) => b.id === id);

  if (!beer) {
    return res.status(404).json({ error: 'Beer not found' });
  }

  return res.json({ beer });
}
