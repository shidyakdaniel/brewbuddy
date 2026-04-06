import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getBeers } from '../services/api.js';

// Prototype limitation:
// The backend only supports POST /favorites (in-memory) and does not expose GET /favorites.
// For now we keep a client-side list in localStorage.
const STORAGE_KEY = 'brewbuddy:favorites';

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState(readFavorites());
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getBeers({})
      .then((data) => setBeers(Array.isArray(data) ? data : []))
      .catch(() => setBeers([]));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const favorites = beers.filter((b) => favoriteIds.includes(b.beer_id));

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Favorites</strong></div>
        <div className="small">Prototype: stored locally in your browser.</div>
      </div>

      <div className="card stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="small">Tap a beer to add/remove.</div>
          <button onClick={() => setFavoriteIds([])}>Clear</button>
        </div>

        <div className="stack">
          {beers.map((b) => {
            const isFav = favoriteIds.includes(b.beer_id);
            return (
              <div key={b.beer_id} className="card">
                <div className="listItem">
                  <div>
                    <Link to={`/beers/${b.beer_id}`}><strong>{b.beer_name}</strong></Link>
                    <div className="small">{b.style} • {b.abv}% ABV</div>
                  </div>
                  <button
                    onClick={() => {
                      setFavoriteIds((prev) =>
                        prev.includes(b.beer_id)
                          ? prev.filter((x) => x !== b.beer_id)
                          : [...prev, b.beer_id]
                      );
                    }}
                  >
                    {isFav ? 'Unfavorite' : 'Favorite'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card stack">
        <div><strong>Your favorites</strong></div>
        {favorites.length === 0 && <div className="small">None yet.</div>}
        {favorites.map((b) => (
          <Link key={b.beer_id} to={`/beers/${b.beer_id}`} className="card">
            <div><strong>{b.beer_name}</strong></div>
            <div className="small">{b.style} • {b.abv}% ABV</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
