import { useState } from 'react';

export default function Stores() {
  const [status, setStatus] = useState('');

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
        <div className="small">Map view coming soon</div>
      </div>

      <div className="card stack">
        <div><strong>Search</strong></div>
        <div className="small">This page is scaffolded for structure first. We’ll hook up API calls next.</div>
        <button onClick={() => setStatus('TODO: implement store search')}>Test action</button>
        {status && <div className="small">{status}</div>}
      </div>
    </div>
  );
}
