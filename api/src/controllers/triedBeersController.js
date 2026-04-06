import { supabase } from '../supabaseClient.js';

export async function listTriedBeers(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId query param' });
  }

  const { data, error } = await supabase.from('tried_beers').select('*').eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
}

export async function createTriedBeer(req, res) {
  const payload = req.body || {};

  if (!payload.user_id || !payload.beer_id) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data, error } = await supabase.from('tried_beers').insert(payload).select('*').single();

  if (error) {
    const code = String(error.code || '');
    if (code === '23505') {
      return res.status(409).send();
    }
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function updateTriedBeer(req, res) {
  const { triedId } = req.params;
  const payload = req.body || {};

  const { data, error } = await supabase.from('tried_beers').update(payload).eq('tried_id', triedId).select('*').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function deleteTriedBeer(req, res) {
  const { triedId } = req.params;

  const { data, error } = await supabase.from('tried_beers').delete().eq('tried_id', triedId).select('tried_id').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
