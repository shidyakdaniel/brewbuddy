import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getBeers } from '../services/api.js';

// Prototype-only: tried tracking is localStorage-based.
const STORAGE_KEY = 'brewbuddy:tried';

function readTried() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function Tried() {
  const [triedIds, setTriedIds] = useState(readTried());
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getBeers({})
      .then((data) => setBeers(Array.isArray(data) ? data : []))
      .catch(() => setBeers([]));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(triedIds));
  }, [triedIds]);

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
          <button onClick={() => setTriedIds([])}>Clear</button>
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
                      setTriedIds((prev) =>
                        prev.includes(b.beer_id)
                          ? prev.filter((x) => x !== b.beer_id)
                          : [...prev, b.beer_id]
                      );
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
        {tried.map((b) => (
          <Link key={b.beer_id} to={`/beers/${b.beer_id}`} className="card">
            <div><strong>{b.beer_name}</strong></div>
            <div className="small">{b.style} • {b.abv}% ABV</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
