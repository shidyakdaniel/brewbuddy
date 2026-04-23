import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { signUp } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOfAge, setIsOfAge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!isOfAge) return;

    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const { error: signUpError } = await signUp({ email, password });
      if (signUpError) {
        setError(signUpError.message || 'Failed to create account');
        return;
      }
      setSuccess('Account created. Check your email to confirm your account, then sign in.');
    } catch (e) {
      setError(e?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Create Account</strong></div>
        <div className="small">Create an account with Supabase.</div>
      </div>

      <form className="card stack" onSubmit={onSubmit}>
        <div className="row">
          <div className="stack" style={{ flex: 1 }}>
            <div className="small">First name</div>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              autoComplete="given-name"
            />
          </div>

          <div className="stack" style={{ flex: 1 }}>
            <div className="small">Last name</div>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              autoComplete="family-name"
            />
          </div>
        </div>

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
            autoComplete="new-password"
          />
        </div>

        <label className="row" style={{ alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={isOfAge}
            onChange={(e) => setIsOfAge(e.target.checked)}
          />
          <span className="small">I confirm I am 21 or older</span>
        </label>

        <button type="submit" disabled={!isOfAge || loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        {error && <div className="small">{error}</div>}
        {success && <div className="small">{success}</div>}

        <div className="small">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
