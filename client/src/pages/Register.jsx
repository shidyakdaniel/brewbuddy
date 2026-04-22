import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOfAge, setIsOfAge] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!isOfAge) return;
    navigate('/');
  }

  return (
    <div className="stack">
      <div className="card stack">
        <div><strong>Create Account</strong></div>
        <div className="small">Prototype: no real authentication yet.</div>
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
          <span className="small">I confirm I am of legal drinking age</span>
        </label>

        <button type="submit" disabled={!isOfAge}>Create Account</button>

        <div className="small">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
