import { getSupabaseClient } from '../supabaseClient.js';

export async function getRecommendations(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { userId, limit } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId query param' });
  }

  const requestedLimit = limit != null && limit !== '' ? Number(limit) : 5;
  const safeLimit = Number.isNaN(requestedLimit) ? 5 : Math.min(Math.max(requestedLimit, 1), 50);

  const { data: userRatings, error: ratingsError } = await supabase
    .from('ratings')
    .select('beer_id, score')
    .eq('user_id', userId);

  if (ratingsError) {
    return res.status(500).json({ error: ratingsError.message });
  }

  if (!userRatings || userRatings.length === 0) {
    const { data: fallback, error: fallbackError } = await supabase
      .from('beers')
      .select('*')
      .order('popularity_score', { ascending: false })
      .limit(safeLimit);

    if (fallbackError) {
      return res.status(500).json({ error: fallbackError.message });
    }

    return res.json(fallback || []);
  }

  const ratedBeerIds = userRatings.map((r) => r.beer_id);

  const { data: ratedBeers, error: ratedBeersError } = await supabase
    .from('beers')
    .select('beer_id, style')
    .in('beer_id', ratedBeerIds);

  if (ratedBeersError) {
    return res.status(500).json({ error: ratedBeersError.message });
  }

  const styleAgg = new Map();
  for (const r of userRatings) {
    const beer = ratedBeers?.find((b) => b.beer_id === r.beer_id);
    if (!beer?.style) continue;
    const prev = styleAgg.get(beer.style) || { sum: 0, count: 0 };
    styleAgg.set(beer.style, { sum: prev.sum + Number(r.score), count: prev.count + 1 });
  }

  let bestStyle = null;
  let bestAvg = -Infinity;
  for (const [style, { sum, count }] of styleAgg.entries()) {
    const avg = sum / count;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestStyle = style;
    }
  }

  if (!bestStyle) {
    const { data: fallback, error: fallbackError } = await supabase
      .from('beers')
      .select('*')
      .order('popularity_score', { ascending: false })
      .limit(safeLimit);

    if (fallbackError) {
      return res.status(500).json({ error: fallbackError.message });
    }

    return res.json(fallback || []);
  }

  const ratedBeerIdsList = ratedBeerIds.map((id) => `"${id}"`).join(',');

  const { data: recs, error: recsError } = await supabase
    .from('beers')
    .select('*')
    .eq('style', bestStyle)
    .not('beer_id', 'in', `(${ratedBeerIdsList})`)
    .order('popularity_score', { ascending: false })
    .limit(safeLimit);

  if (recsError) {
    return res.status(500).json({ error: recsError.message });
  }

  if (recs && recs.length > 0) {
    return res.json(recs);
  }

  const { data: fallback, error: fallbackError } = await supabase
    .from('beers')
    .select('*')
    .order('popularity_score', { ascending: false })
    .limit(safeLimit);

  if (fallbackError) {
    return res.status(500).json({ error: fallbackError.message });
  }

  return res.json(fallback || []);
}
