import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Tried() {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('tried_beers')
        .select('tried_id, beer_id, liked, tried_at, beers:beers(*)')
        .eq('user_id', user.id)
        .order('tried_at', { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message || 'Failed to load tried beers');
        setItems([]);
      } else {
        const normalized = (data || [])
          .map((row) => ({
            tried_id: row.tried_id,
            beer_id: row.beer_id,
            liked: row.liked,
            tried_at: row.tried_at,
            beer: row.beers
          }))
          .filter((x) => x.beer);
        setItems(normalized);
      }

      setLoading(false);
    }

    if (user?.id) load();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Tried</strong></div>
      </div>

      <div className="card stack">
        <div><strong>Your tried beers</strong></div>
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {!loading && !error && items.length === 0 && <div className="small">None yet.</div>}
        {items.map((item) => {
          const liked = item.liked;

          const indicatorColor = liked === true ? '#16a34a' : liked === false ? '#dc2626' : '#6b7280';
          const bgColor = liked === true ? '#dcfce7' : liked === false ? '#fee2e2' : 'transparent';

          return (
            <div key={item.tried_id} className="card" style={{ background: bgColor }}>
              <div className="listItem">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: indicatorColor }} />
                  <div>
                    <Link to={`/beers/${item.beer.beer_id}`}><strong>{item.beer.beer_name}</strong></Link>
                    <div className="small">{item.beer.style} • {item.beer.abv}% ABV</div>
                  </div>
                </div>

                <div className="row" style={{ gap: 8 }}>
                  <button
                    onClick={async () => {
                      const { error: updateError } = await supabase
                        .from('tried_beers')
                        .update({ liked: true })
                        .eq('tried_id', item.tried_id);

                      if (updateError) {
                        setError(updateError.message || 'Failed to update');
                        return;
                      }

                      setItems((prev) =>
                        prev.map((x) => (x.tried_id === item.tried_id ? { ...x, liked: true } : x))
                      );
                    }}
                    aria-label="Thumbs up"
                    title="Like"
                  >
                    👍
                  </button>
                  <button
                    onClick={async () => {
                      const { error: updateError } = await supabase
                        .from('tried_beers')
                        .update({ liked: false })
                        .eq('tried_id', item.tried_id);

                      if (updateError) {
                        setError(updateError.message || 'Failed to update');
                        return;
                      }

                      setItems((prev) =>
                        prev.map((x) => (x.tried_id === item.tried_id ? { ...x, liked: false } : x))
                      );
                    }}
                    aria-label="Thumbs down"
                    title="Dislike"
                  >
                    👎
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
