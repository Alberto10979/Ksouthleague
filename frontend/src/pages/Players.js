import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

const POSITIONS = ['All', 'GK', 'DEF', 'MID', 'FWD'];
const POSITION_LABELS = { GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', FWD: 'Forward' };
const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'goals', label: 'Goals' },
  { value: 'assists', label: 'Assists' },
  { value: 'appearances', label: 'Appearances' },
  { value: 'cleanSheets', label: 'Clean Sheets' },
];

export default function Players() {
  const { players, teams, getTeamById, leagueInfo } = useLeague();
  const [posFilter, setPosFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');
  const [sortBy, setSortBy] = useState('goals');
  const [search, setSearch] = useState('');

  const filtered = players
    .filter(p => posFilter === 'All' || p.position === posFilter)
    .filter(p => teamFilter === 'All' || p.teamId === Number(teamFilter))
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b[sortBy] - a[sortBy];
    });

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <h1>Players</h1>
          <p>{players.length} registered players across {teams.length} clubs — {leagueInfo.season}</p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input search-input-sm"
            />
          </div>
          <div className="filter-group">
            <label>Position</label>
            <div className="pos-tabs">
              {POSITIONS.map(pos => (
                <button
                  key={pos}
                  className={`pos-tab ${posFilter === pos ? 'active' : ''}`}
                  onClick={() => setPosFilter(pos)}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>Team</label>
            <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="select-input">
              <option value="All">All Teams</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Sort by</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="select-input">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <p className="results-count">{filtered.length} player{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="players-grid">
          {filtered.map(p => {
            const team = getTeamById(p.teamId);
            return (
              <Link to={`/players/${p.id}`} key={p.id} className="player-card">
                <div
                  className="player-card-header"
                  style={{ background: `linear-gradient(135deg, ${team?.primaryColor || '#333'}, ${team?.primaryColor || '#333'}88)` }}
                >
                  <span
                    className="player-jersey"
                    style={{ color: team?.secondaryColor || '#fff', borderColor: team?.secondaryColor || '#fff' }}
                  >
                    {p.jerseyNumber}
                  </span>
                  <span className={`position-badge pos-${p.position.toLowerCase()}`}>{p.position}</span>
                </div>
                <div className="player-card-body">
                  <h4 className="player-card-name">{p.name}</h4>
                  <div className="player-card-team" style={{ color: team?.primaryColor }}>
                    <span
                      className="team-dot"
                      style={{ background: team?.primaryColor }}
                    />
                    {team?.name}
                  </div>
                  <div className="player-card-meta">
                    <span>{p.age} yrs</span>
                    <span>{p.nationality}</span>
                  </div>
                  <div className="player-card-stats">
                    <div className="pstat"><span>{p.appearances}</span><label>Apps</label></div>
                    <div className="pstat"><span>{p.goals}</span><label>Goals</label></div>
                    <div className="pstat"><span>{p.assists}</span><label>Assists</label></div>
                    {p.position === 'GK'
                      ? <div className="pstat"><span>{p.cleanSheets}</span><label>CS</label></div>
                      : <div className="pstat">
                          <span>{p.yellowCards}</span>
                          <label style={{ color: '#f59e0b' }}>YC</label>
                        </div>
                    }
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state-box">
            <p>No players match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
