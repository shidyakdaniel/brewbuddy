import { getSupabaseClient } from '../supabaseClient.js';

export async function listInventory(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { storeId, beerId } = req.query;

  let query = supabase.from('inventory').select('*');

  if (storeId) {
    query = query.eq('store_id', storeId);
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

export async function createInventory(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const payload = req.body || {};

  if (!payload.store_id || !payload.beer_id) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data, error } = await supabase.from('inventory').insert(payload).select('*').single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function updateInventory(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { inventoryId } = req.params;
  const payload = req.body || {};

  const { data, error } = await supabase
    .from('inventory')
    .update(payload)
    .eq('inventory_id', inventoryId)
    .select('*')
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function deleteInventory(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { inventoryId } = req.params;

  const { data, error } = await supabase
    .from('inventory')
    .delete()
    .eq('inventory_id', inventoryId)
    .select('inventory_id')
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
