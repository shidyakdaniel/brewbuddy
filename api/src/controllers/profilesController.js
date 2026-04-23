import { getSupabaseClient } from '../supabaseClient.js';

export async function getProfile(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { userId } = req.params;

  const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function createProfile(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const payload = req.body || {};

  if (!payload.user_id || payload.age_confirmed == null) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { data, error } = await supabase.from('profiles').insert(payload).select('*').single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}

export async function updateProfile(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { userId } = req.params;
  const payload = req.body || {};

  const { data, error } = await supabase.from('profiles').update(payload).eq('user_id', userId).select('*').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.json(data);
}

export async function deleteProfile(req, res) {
  const supabase = getSupabaseClient();
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  const { userId } = req.params;

  const { data, error } = await supabase.from('profiles').delete().eq('user_id', userId).select('user_id').maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  return res.status(204).send();
}
