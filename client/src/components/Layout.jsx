import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/tried">Tried</NavLink>
          <NavLink to="/recommendations">Recommendations</NavLink>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
