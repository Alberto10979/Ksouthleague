import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

export default function Teams() {
  const { getStandings } = useLeague();
  const [search, setSearch] = useState('');
  const standings = getStandings();

  const filtered = standings.filter(row =>
    row.team.name.toLowerCase().includes(search.toLowerCase()) ||
    row.team.manager.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <h1>Teams</h1>
          <p>All {standings.length} clubs competing in the {useLeague().leagueInfo.season} season</p>
        </div>
      </div>

      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search teams or managers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="teams-grid">
          {filtered.map((row, i) => (
            <Link to={`/teams/${row.team.id}`} key={row.team.id} className="team-card">
              <div
                className="team-card-header"
                style={{ background: `linear-gradient(135deg, ${row.team.primaryColor}, ${row.team.secondaryColor}20)` }}
              >
                <div
                  className="team-card-badge"
                  style={{ background: row.team.primaryColor, color: row.team.secondaryColor, border: `2px solid ${row.team.secondaryColor}` }}
                >
                  {row.team.shortName}
                </div>
                <div className="team-card-position">
                  <span className={`pos-badge ${i < 2 ? 'pos-top' : i >= standings.length - 2 ? 'pos-bottom' : ''}`}>
                    #{i + 1}
                  </span>
                </div>
              </div>
              <div className="team-card-body">
                <h3 className="team-card-name">{row.team.name}</h3>
                <p className="team-card-meta">🏟️ {row.team.stadium}</p>
                <p className="team-card-meta">👤 {row.team.manager}</p>
                <p className="team-card-desc">{row.team.description}</p>
                <div className="team-card-stats">
                  <div className="team-stat">
                    <span className="team-stat-value">{row.points}</span>
                    <span className="team-stat-label">Pts</span>
                  </div>
                  <div className="team-stat">
                    <span className="team-stat-value">{row.won}</span>
                    <span className="team-stat-label">W</span>
                  </div>
                  <div className="team-stat">
                    <span className="team-stat-value">{row.drawn}</span>
                    <span className="team-stat-label">D</span>
                  </div>
                  <div className="team-stat">
                    <span className="team-stat-value">{row.lost}</span>
                    <span className="team-stat-label">L</span>
                  </div>
                  <div className="team-stat">
                    <span className="team-stat-value">{row.goalsFor}</span>
                    <span className="team-stat-label">GF</span>
                  </div>
                  <div className="team-stat">
                    <span className={`team-stat-value ${row.goalDiff > 0 ? 'positive' : row.goalDiff < 0 ? 'negative' : ''}`}>
                      {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                    </span>
                    <span className="team-stat-label">GD</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
