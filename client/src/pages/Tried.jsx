import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getBeers } from '../services/api.js';

// Prototype-only: tried tracking is localStorage-based.
const STORAGE_KEY = 'brewbuddy:tried';

function readTried() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(raw)) return [];

    return raw
      .map((item) => {
        if (item && typeof item === 'object' && (item.beer_id || item.beer_id === 0)) {
          return {
            beer_id: item.beer_id,
            liked: item.liked
          };
        }
        return { beer_id: item, liked: undefined };
      })
      .filter((x) => x.beer_id !== undefined && x.beer_id !== null);
  } catch {
    return [];
  }
}

export default function Tried() {
  const [triedEntries, setTriedEntries] = useState(readTried());
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getBeers({})
      .then((data) => setBeers(Array.isArray(data) ? data : []))
      .catch(() => setBeers([]));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(triedEntries));
  }, [triedEntries]);

  const triedIds = triedEntries.map((t) => t.beer_id);
  const triedById = new Map(triedEntries.map((t) => [t.beer_id, t]));
  const tried = beers.filter((b) => triedIds.includes(b.beer_id));

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Tried</strong></div>
        <div className="small">Prototype: stored locally in your browser.</div>
      </div>

      <div className="card stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="small">Mark beers as tried.</div>
          <button onClick={() => setTriedEntries([])}>Clear</button>
        </div>

        <div className="stack">
          {beers.map((b) => {
            const isTried = triedIds.includes(b.beer_id);
            return (
              <div key={b.beer_id} className="card">
                <div className="listItem">
                  <div>
                    <Link to={`/beers/${b.beer_id}`}><strong>{b.beer_name}</strong></Link>
                    <div className="small">{b.style} • {b.abv}% ABV</div>
                  </div>
                  <button
                    onClick={() => {
                      setTriedEntries((prev) => {
                        const exists = prev.some((x) => x.beer_id === b.beer_id);
                        if (exists) return prev.filter((x) => x.beer_id !== b.beer_id);
                        return [...prev, { beer_id: b.beer_id, liked: undefined }];
                      });
                    }}
                  >
                    {isTried ? 'Unmark' : 'Mark tried'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card stack">
        <div><strong>Your tried beers</strong></div>
        {tried.length === 0 && <div className="small">None yet.</div>}
        {tried.map((b) => {
          const entry = triedById.get(b.beer_id);
          const liked = entry?.liked;

          const indicatorColor = liked === true ? '#16a34a' : liked === false ? '#dc2626' : '#6b7280';
          const bgColor = liked === true ? '#dcfce7' : liked === false ? '#fee2e2' : 'transparent';

          return (
            <div key={b.beer_id} className="card" style={{ background: bgColor }}>
              <div className="listItem">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: indicatorColor }} />
                  <div>
                    <Link to={`/beers/${b.beer_id}`}><strong>{b.beer_name}</strong></Link>
                    <div className="small">{b.style} • {b.abv}% ABV</div>
                  </div>
                </div>

                <div className="row" style={{ gap: 8 }}>
                  <button
                    onClick={() => {
                      setTriedEntries((prev) =>
                        prev.map((x) => (x.beer_id === b.beer_id ? { ...x, liked: true } : x))
                      );
                    }}
                    aria-label="Thumbs up"
                    title="Like"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => {
                      setTriedEntries((prev) =>
                        prev.map((x) => (x.beer_id === b.beer_id ? { ...x, liked: false } : x))
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
