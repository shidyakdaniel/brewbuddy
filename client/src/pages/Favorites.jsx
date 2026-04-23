import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Favorites() {
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
        .from('favorites')
        .select('favorite_id, beer_id, beers:beers(*)')
        .eq('user_id', user.id);

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message || 'Failed to load favorites');
        setItems([]);
      } else {
        const normalized = (data || [])
          .map((row) => ({
            favorite_id: row.favorite_id,
            beer_id: row.beer_id,
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
        <div><strong>Favorites</strong></div>
      </div>

      <div className="card stack">
        <div><strong>Your favorites</strong></div>
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {!loading && !error && items.length === 0 && <div className="small">None yet.</div>}
        {items.map((item) => (
          <div key={item.favorite_id} className="card">
            <div className="listItem">
              <div>
                <Link to={`/beers/${item.beer.beer_id}`}><strong>{item.beer.beer_name}</strong></Link>
                <div className="small">{item.beer.style} • {item.beer.abv}% ABV</div>
              </div>
              <button
                onClick={async () => {
                  const { error: deleteError } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('favorite_id', item.favorite_id);

                  if (deleteError) {
                    setError(deleteError.message || 'Failed to update favorite');
                    return;
                  }

                  setItems((prev) => prev.filter((x) => x.favorite_id !== item.favorite_id));
                }}
              >
                Unfavorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
