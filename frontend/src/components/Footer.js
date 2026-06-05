import React from 'react';
import { Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

export default function Footer() {
  const { leagueInfo } = useLeague();
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo">⚽ {leagueInfo.name}</div>
          <p className="footer-tagline">Passion. Pride. Football.</p>
          <p className="footer-season">Season {leagueInfo.season}</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/players">Players</Link>
          <Link to="/fixtures">Fixtures</Link>
          <Link to="/standings">Standings</Link>
          <Link to="/news">News</Link>
        </div>
        <div className="footer-links">
          <h4>League</h4>
          <Link to="/results">Results</Link>
          <Link to="/statistics">Statistics</Link>
          <Link to="/admin">Admin Portal</Link>
        </div>
        <div className="footer-info">
          <h4>Contact</h4>
          <p>📍 {leagueInfo.headquarters}</p>
          <p>👤 Chairman: {leagueInfo.chairman}</p>
          <p>📋 Secretary: {leagueInfo.secretary}</p>
          <p>🌐 {leagueInfo.website}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {leagueInfo.name}. All rights reserved. Founded {leagueInfo.founded}.</p>
      </div>
    </footer>
  );
}
