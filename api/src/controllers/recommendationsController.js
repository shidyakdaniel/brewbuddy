import { beers, ratings } from '../data/mockData.js';

// Very simple prototype logic:
// - Find the user's highest-rated style
// - Recommend other beers in that style not yet rated
export function getRecommendations(req, res) {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id query param' });
  }

  const userId = String(user_id);
  const userRatings = ratings.filter((r) => r.user_id === userId);

  if (userRatings.length === 0) {
    return res.json({ recommendations: beers.slice(0, 3), reason: 'No ratings yet' });
  }

  const styleScores = new Map();
  for (const r of userRatings) {
    const beer = beers.find((b) => b.id === r.beer_id);
    if (!beer) continue;
    const key = beer.style;
    const prev = styleScores.get(key) || { sum: 0, count: 0 };
    styleScores.set(key, { sum: prev.sum + r.rating, count: prev.count + 1 });
  }

  let bestStyle = null;
  let bestAvg = -Infinity;
  for (const [style, { sum, count }] of styleScores.entries()) {
    const avg = sum / count;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestStyle = style;
    }
  }

  const ratedBeerIds = new Set(userRatings.map((r) => r.beer_id));

  const recommendations = beers
    .filter((b) => b.style === bestStyle && !ratedBeerIds.has(b.id))
    .slice(0, 5);

  return res.json({ recommendations, reason: `Because you like ${bestStyle}` });
}
