import { getSupabaseClient } from '../supabaseClient.js';

export async function getAvailability(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { beer_id, store_id } = req.query;

  let query = supabase.from('inventory').select('*');

  if (beer_id) {
    query = query.eq('beer_id', beer_id);
  }

  if (store_id) {
    query = query.eq('store_id', store_id);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ availability: data || [] });
}
