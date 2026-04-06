import { supabase } from '../supabaseClient.js';

export async function listStores(req, res) {
  const { lat, lng } = req.query;

  let query = supabase.from('stores').select('*');

  if (lat != null && lng != null && lat !== '' && lng !== '') {
    const latitude = Number(lat);
    const longitude = Number(lng);
    if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
      query = query.order('store_name', { ascending: true });
    }
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
}

export async function createStore(req, res) {
  const payload = req.body || {};

  if (!payload.store_name) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data, error } = await supabase.from('stores').insert(payload).select('*').single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function getStore(req, res) {
  const { storeId } = req.params;

  const { data, error } = await supabase.from('stores').select('*').eq('store_id', storeId).maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function updateStore(req, res) {
  const { storeId } = req.params;
  const payload = req.body || {};

  const { data, error } = await supabase.from('stores').update(payload).eq('store_id', storeId).select('*').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function deleteStore(req, res) {
  const { storeId } = req.params;

  const { data, error } = await supabase.from('stores').delete().eq('store_id', storeId).select('store_id').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
