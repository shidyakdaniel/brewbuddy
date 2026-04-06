import { supabase } from '../supabaseClient.js';

export async function listBreweries(req, res) {
  const { data, error } = await supabase.from('breweries').select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
}

export async function createBrewery(req, res) {
  const payload = req.body || {};

  if (!payload.brewery_name) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data, error } = await supabase.from('breweries').insert(payload).select('*').single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function getBrewery(req, res) {
  const { breweryId } = req.params;

  const { data, error } = await supabase.from('breweries').select('*').eq('brewery_id', breweryId).maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function updateBrewery(req, res) {
  const { breweryId } = req.params;
  const payload = req.body || {};

  const { data, error } = await supabase.from('breweries').update(payload).eq('brewery_id', breweryId).select('*').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function deleteBrewery(req, res) {
  const { breweryId } = req.params;

  const { data, error } = await supabase.from('breweries').delete().eq('brewery_id', breweryId).select('brewery_id').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
