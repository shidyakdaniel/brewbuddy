import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAvailability, getBeers, getStores } from '../services/api.js';

export default function Home() {
  const [style, setStyle] = useState('');
  const [abvMin, setAbvMin] = useState('');
  const [abvMax, setAbvMax] = useState('');
  const [q, setQ] = useState('');

  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [storeQ, setStoreQ] = useState('');
  const [stores, setStores] = useState([]);
  const [availability, setAvailability] = useState([]);

  const styles = useMemo(() => {
    const s = new Set(beers.map((b) => b.style));
    return Array.from(s).sort();
  }, [beers]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getBeers({
      style,
      abv_min: abvMin,
      abv_max: abvMax,
      q
    })
      .then((data) => {
        if (cancelled) return;
        setBeers(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || 'Failed to load beers');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [style, abvMin, abvMax, q]);

  useEffect(() => {
    let cancelled = false;
    getStores(storeQ)
      .then((data) => {
        if (cancelled) return;
        setStores(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (cancelled) return;
        setStores([]);
      });

    return () => {
      cancelled = true;
    };
  }, [storeQ]);

  function refreshAvailability() {
    getAvailability({})
      .then((data) => setAvailability(data.availability || []))
      .catch(() => setAvailability([]));
  }

  useEffect(() => {
    refreshAvailability();
  }, []);

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Recommendations</strong></div>
        <div className="small">
          Start with personalized picks based on what you like.
        </div>
        <div>
          <Link to="/recommendations">View recommendations</Link>
        </div>
      </div>

      <div className="card stack">
        <div><strong>Beer Discovery</strong></div>
        <div className="row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search beers"
            style={{ flex: 1 }}
          />
        </div>
        <div className="row">
          <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ flex: 1 }}>
            <option value="">All styles</option>
            {styles.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="row">
          <input
            value={abvMin}
            onChange={(e) => setAbvMin(e.target.value)}
            placeholder="ABV min"
            inputMode="decimal"
            style={{ width: '50%' }}
          />
          <input
            value={abvMax}
            onChange={(e) => setAbvMax(e.target.value)}
            placeholder="ABV max"
            inputMode="decimal"
            style={{ width: '50%' }}
          />
        </div>
        <div className="small">Filters apply automatically.</div>
      </div>

      <div className="card stack">
        <div><strong>Beers</strong></div>
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {!loading && !error && beers.length === 0 && <div className="small">No beers found.</div>}
        <div className="stack">
          {beers.map((b) => (
            <Link key={b.beer_id} to={`/beers/${b.beer_id}`} className="card">
              <div className="listItem">
                <div>
                  <div><strong>{b.beer_name}</strong></div>
                  <div className="small">{b.style} • {b.abv}% ABV</div>
                </div>
                <div className="small">View</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card stack">
        <div><strong>Store Search (prototype)</strong></div>
        <input
          value={storeQ}
          onChange={(e) => setStoreQ(e.target.value)}
          placeholder="Search stores by name/location"
        />
        <div className="stack">
          {stores.map((s) => (
            <div key={s.store_id} className="card">
              <div><strong>{s.store_name}</strong></div>
              <div className="small">{s.city || ''}{s.state ? `, ${s.state}` : ''}</div>
            </div>
          ))}
        </div>
        <button onClick={refreshAvailability}>Refresh availability</button>
        <div className="small">Availability is mock data and not tied to your filters.</div>
        <div className="stack">
          {availability.slice(0, 10).map((a, idx) => (
            <div key={idx} className="card">
              <div><strong>{a.beer_name}</strong> @ {a.store_name}</div>
              <div className="small">In stock: {String(a.in_stock)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
