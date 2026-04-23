import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div>
      <header className="header">
        <div><strong>BrewBuddy</strong></div>
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/tried">Tried</NavLink>
          <NavLink to="/recommendations">Recommendations</NavLink>
          <NavLink to="/stores">Stores</NavLink>
          {user && (
            <button
              onClick={async () => {
                await signOut();
                navigate('/login');
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
