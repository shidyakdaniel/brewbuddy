import { getSupabaseClient } from '../supabaseClient.js';

export async function listBeers(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { style, abv_min, abv_max, sort } = req.query;

  let query = supabase.from('beers').select('*');

  if (style) {
    query = query.eq('style', style);
  }

  if (abv_min != null && abv_min !== '') {
    const min = Number(abv_min);
    if (!Number.isNaN(min)) {
      query = query.gte('abv', min);
    }
  }

  if (abv_max != null && abv_max !== '') {
    const max = Number(abv_max);
    if (!Number.isNaN(max)) {
      query = query.lte('abv', max);
    }
  }

  if (sort) {
    const field = String(sort);
    const ascending = field !== 'popularity_score';
    query = query.order(field, { ascending });
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
}

export async function createBeer(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const payload = req.body || {};

  if (!payload.brewery_id || !payload.beer_name) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data, error } = await supabase.from('beers').insert(payload).select('*').single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function getBeerById(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { beerId } = req.params;

  const { data, error } = await supabase.from('beers').select('*').eq('beer_id', beerId).maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function updateBeer(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { beerId } = req.params;
  const payload = req.body || {};

  const { data, error } = await supabase.from('beers').update(payload).eq('beer_id', beerId).select('*').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function deleteBeer(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { beerId } = req.params;

  const { data, error } = await supabase.from('beers').delete().eq('beer_id', beerId).select('beer_id').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
