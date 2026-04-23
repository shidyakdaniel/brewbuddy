import { useEffect, useState } from 'react';

import { supabase } from '../lib/supabase.js';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('stores')
        .select('*')
        .order('name', { ascending: true });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message || 'Failed to load stores');
        setStores([]);
      } else {
        setStores(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Stores</strong></div>
        <div className="small">Search for nearby stores.</div>
      </div>

      <div
        className="card"
        style={{ background: '#f3f4f6', minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
      </div>

      <div className="card stack">
        <div><strong>Store list</strong></div>
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {!loading && !error && stores.length === 0 && <div className="small">No stores found.</div>}
        <div className="stack">
          {stores.map((s) => (
            <div key={s.store_id} className="card">
              <div><strong>{s.name}</strong></div>
              <div className="small">
                {s.address || ''}{s.city ? `, ${s.city}` : ''}{s.state ? `, ${s.state}` : ''}{s.zip ? ` ${s.zip}` : ''}
              </div>
              {s.phone && <div className="small">{s.phone}</div>}
              {s.hours && <div className="small">{s.hours}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
