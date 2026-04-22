import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getBeer, postRating } from '../services/api.js';

const DEMO_USER_ID = 'demo-user';

export default function BeerDetail() {
  const { id } = useParams();

  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isFavorited, setIsFavorited] = useState(false);
  const [isTried, setIsTried] = useState(false);

  const [rating, setRating] = useState('5');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getBeer(id)
      .then((data) => {
        if (cancelled) return;
        setBeer(data);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || 'Failed to load beer');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function onRate() {
    setMessage('');
    try {
      await postRating({ user_id: DEMO_USER_ID, beer_id: id, score: Number(rating) });
      setMessage('Rating saved. Check Recommendations.');
    } catch (e) {
      setMessage(e.message || 'Failed to rate');
    }
  }

  function onToggleFavorite() {
    setIsFavorited((prev) => !prev);
  }

  function onToggleTried() {
    setIsTried((prev) => !prev);
  }

  return (
    <div className="stack">
      <div className="card">
        <Link to="/" className="small">← Back</Link>
      </div>

      <div className="card stack">
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {beer && (
          <>
            <div><strong>{beer.beer_name}</strong></div>
            <div className="small">{beer.style} • {beer.abv}% ABV</div>

            <div className="row">
              <button onClick={onToggleFavorite} style={{ flex: 1 }}>
                {isFavorited ? '♥ Favorited' : '♥ Favorite'}
              </button>
              <button onClick={onToggleTried} style={{ flex: 1 }}>
                {isTried ? '✓ Tried' : '✓ Mark as Tried'}
              </button>
            </div>

            <div className="row">
              <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ flex: 1 }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button onClick={onRate} style={{ flex: 1 }}>Rate</button>
            </div>
            {message && <div className="small">{message}</div>}
          </>
        )}
      </div>

      <div className="card small">
        No authentication: using demo user id <code>{DEMO_USER_ID}</code>.
      </div>
    </div>
  );
}
