import { useEffect, useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { supabase } from '../lib/supabase.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow
});

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
        .order('store_name', { ascending: true });

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

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <MapContainer center={[39.5, -121.5]} zoom={7} style={{ height: 400, width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {stores
            .filter((s) => typeof s.latitude === 'number' && typeof s.longitude === 'number')
            .map((s) => (
              <Marker key={s.store_id} position={[s.latitude, s.longitude]}>
                <Popup>
                  <div><strong>{s.store_name}</strong></div>
                  <div className="small">
                    {s.address || ''}{s.city ? `, ${s.city}` : ''}{s.state ? `, ${s.state}` : ''}{s.zip_code ? ` ${s.zip_code}` : ''}
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      <div className="card stack">
        <div><strong>Store list</strong></div>
        {loading && <div className="small">Loading...</div>}
        {error && <div className="small">{error}</div>}
        {!loading && !error && stores.length === 0 && <div className="small">No stores found.</div>}
        <div className="stack">
          {stores.map((s) => (
            <div key={s.store_id} className="card">
              <div><strong>{s.store_name}</strong></div>
              <div className="small">
                {s.address || ''}{s.city ? `, ${s.city}` : ''}{s.state ? `, ${s.state}` : ''}{s.zip_code ? ` ${s.zip_code}` : ''}
              </div>
              {s.hours && <div className="small">{s.hours}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
