import { stores } from '../data/mockData.js';

export function listStores(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.json({ stores });
  }

  const query = String(q).toLowerCase();
  const filtered = stores.filter((s) => s.name.toLowerCase().includes(query) || s.location.toLowerCase().includes(query));

  return res.json({ stores: filtered });
}
