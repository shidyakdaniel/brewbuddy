import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import { getRecommendations } from '../services/api.js';

export default function Recommendations() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reason, setReason] = useState('');
  const [items, setItems] = useState([]);

  function load() {
    setLoading(true);
    setError('');

    getRecommendations(user.id)
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setReason('');
      })
      .catch((e) => {
        const msg = e.message || 'Failed to load recommendations';
        if (!String(msg).toLowerCase().includes('invalid input syntax')) {
          setError(msg);
        }
        setItems([]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (user?.id) load();
  }, [user?.id]);

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Recommendations</strong></div>
        <div className="small">{reason || 'Rate a beer to get better recommendations.'}</div>
        <button onClick={load}>Refresh</button>
      </div>

      <div className="card stack">
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {!loading && !error && items.length === 0 && <div className="small">No recommendations yet.</div>}
        {items.map((b) => (
          <Link key={b.beer_id} to={`/beers/${b.beer_id}`} className="card">
            <div><strong>{b.beer_name}</strong></div>
            <div className="small">{b.style} • {b.abv}% ABV</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
