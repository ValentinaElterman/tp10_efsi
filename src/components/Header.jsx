import { Link, NavLink } from 'react-router-dom';
import { Heart, Disc } from 'lucide-react';

export const Header = ({ favoritesCount }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <Disc size={28} />
        <span>1D Explorer</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Inicio
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>
          <Heart size={18} />
          <span>Favoritos</span>
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </NavLink>
      </nav>
    </header>
  );
};