import { getSupabaseClient } from '../supabaseClient.js';

export async function listRatings(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { userId, beerId } = req.query;

  let query = supabase.from('ratings').select('*');

  if (userId) {
    query = query.eq('user_id', userId);
  }
  if (beerId) {
    query = query.eq('beer_id', beerId);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
}

export async function createRating(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const payload = req.body || {};

  if (!payload.user_id || !payload.beer_id || payload.score == null) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const score = Number(payload.score);
  if (Number.isNaN(score) || score < 1 || score > 5) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data: existing, error: existingError } = await supabase
    .from('ratings')
    .select('rating_id')
    .eq('user_id', payload.user_id)
    .eq('beer_id', payload.beer_id)
    .maybeSingle();

  if (existingError) {
    return res.status(500).json({ error: existingError.message });
  }

  if (existing) {
    return res.status(409).send();
  }

  const { data, error } = await supabase.from('ratings').insert({ ...payload, score }).select('*').single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function getRating(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { ratingId } = req.params;

  const { data, error } = await supabase.from('ratings').select('*').eq('rating_id', ratingId).maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function updateRating(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { ratingId } = req.params;
  const payload = req.body || {};

  if (payload.score != null) {
    const score = Number(payload.score);
    if (Number.isNaN(score) || score < 1 || score > 5) {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    payload.score = score;
  }

  const { data, error } = await supabase.from('ratings').update(payload).eq('rating_id', ratingId).select('*').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function deleteRating(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { ratingId } = req.params;

  const { data, error } = await supabase.from('ratings').delete().eq('rating_id', ratingId).select('rating_id').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
