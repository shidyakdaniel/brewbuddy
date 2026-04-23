import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await signIn({ email, password });
      if (signInError) {
        setError(signInError.message || 'Failed to sign in');
        return;
      }
      navigate('/');
    } catch (e) {
      setError(e?.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Sign In</strong></div>
        <div className="small">Use your Supabase account.</div>
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

        <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>

        {error && <div className="small">{error}</div>}

        <div className="small">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
