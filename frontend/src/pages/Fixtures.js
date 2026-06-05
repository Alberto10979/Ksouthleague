import React, { useState } from 'react';
import { useLeague } from '../context/LeagueContext';

export default function Fixtures() {
  const { fixtures, teams, getTeamById, leagueInfo } = useLeague();
  const [matchdayFilter, setMatchdayFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');

  const matchdays = [...new Set(fixtures.map(f => f.matchday))].sort((a, b) => a - b);

  const filtered = fixtures
    .filter(f => matchdayFilter === 'All' || f.matchday === Number(matchdayFilter))
    .filter(f => teamFilter === 'All' || f.homeTeamId === Number(teamFilter) || f.awayTeamId === Number(teamFilter))
    .sort((a, b) => a.matchday - b.matchday || new Date(a.date) - new Date(b.date));

  const grouped = filtered.reduce((acc, f) => {
    if (!acc[f.matchday]) acc[f.matchday] = [];
    acc[f.matchday].push(f);
    return acc;
  }, {});

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <h1>Fixtures</h1>
          <p>Upcoming matches for the {leagueInfo.season} season</p>
        </div>
      </div>

      <div className="container">
        <div className="filters-bar">
          <div className="filter-group">
            <label>Matchday</label>
            <select value={matchdayFilter} onChange={e => setMatchdayFilter(e.target.value)} className="select-input">
              <option value="All">All Matchdays</option>
              {matchdays.map(md => <option key={md} value={md}>Matchday {md}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Team</label>
            <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="select-input">
              <option value="All">All Teams</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>

        {Object.keys(grouped).length === 0 ? (
          <div className="empty-state-box"><p>No fixtures match your filters.</p></div>
        ) : (
          Object.entries(grouped).map(([matchday, games]) => {
            const date = games[0].date;
            return (
              <div key={matchday} className="matchday-section">
                <div className="matchday-header">
                  <h3>Matchday {matchday}</h3>
                  <span>{new Date(date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="fixtures-list">
                  {games.map(f => {
                    const home = getTeamById(f.homeTeamId);
                    const away = getTeamById(f.awayTeamId);
                    return (
                      <div key={f.id} className="fixture-item">
                        <div className="fixture-time">{f.time}</div>
                        <div className="fixture-teams-row">
                          <div className="fixture-team-block">
                            <div
                              className="fixture-team-badge"
                              style={{ background: home?.primaryColor, color: home?.secondaryColor }}
                            >
                              {home?.shortName}
                            </div>
                            <span className="fixture-team-name">{home?.name}</span>
                          </div>
                          <div className="fixture-score-box">
                            <span className="fixture-vs-text">VS</span>
                          </div>
                          <div className="fixture-team-block fixture-team-right">
                            <span className="fixture-team-name">{away?.name}</span>
                            <div
                              className="fixture-team-badge"
                              style={{ background: away?.primaryColor, color: away?.secondaryColor }}
                            >
                              {away?.shortName}
                            </div>
                          </div>
                        </div>
                        <div className="fixture-venue-row">
                          📍 {f.venue}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
