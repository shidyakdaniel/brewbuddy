import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
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
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
