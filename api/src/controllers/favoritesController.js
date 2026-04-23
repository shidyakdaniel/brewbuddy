import { getSupabaseClient } from '../supabaseClient.js';

export async function listFavorites(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId query param' });
  }

  const { data, error } = await supabase.from('favorites').select('*').eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
}

export async function addFavorite(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const payload = req.body || {};

  if (!payload.user_id || !payload.beer_id) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data: existing, error: existingError } = await supabase
    .from('favorites')
    .select('favorite_id')
    .eq('user_id', payload.user_id)
    .eq('beer_id', payload.beer_id)
    .maybeSingle();

  if (existingError) {
    return res.status(500).json({ error: existingError.message });
  }

  if (existing) {
    return res.status(409).send();
  }

  const { data, error } = await supabase.from('favorites').insert(payload).select('*').single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function deleteFavorite(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { favoriteId } = req.params;

  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('favorite_id', favoriteId)
    .select('favorite_id')
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
