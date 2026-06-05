import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { leagueInfo } = useLeague();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/teams', label: 'Teams' },
    { to: '/players', label: 'Players' },
    { to: '/fixtures', label: 'Fixtures' },
    { to: '/results', label: 'Results' },
    { to: '/standings', label: 'Standings' },
    { to: '/statistics', label: 'Statistics' },
    { to: '/news', label: 'News' },
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <div className="brand-shield">⚽</div>
          <div className="brand-text">
            <span className="brand-name">{leagueInfo.name}</span>
            <span className="brand-season">{leagueInfo.season}</span>
          </div>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
