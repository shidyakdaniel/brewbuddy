import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Sign In</strong></div>
        <div className="small">Prototype: no real authentication yet.</div>
      </div>

      <form className="card stack" onSubmit={onSubmit}>
        <div className="stack">
          <div className="small">Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
          />
        </div>

        <div className="stack">
          <div className="small">Password</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Sign In</button>

        <div className="small">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
