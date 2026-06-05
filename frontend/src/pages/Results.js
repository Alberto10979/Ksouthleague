import React, { useState } from 'react';
import { useLeague } from '../context/LeagueContext';

export default function Results() {
  const { results, teams, getTeamById, leagueInfo } = useLeague();
  const [matchdayFilter, setMatchdayFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');

  const matchdays = [...new Set(results.map(r => r.matchday))].sort((a, b) => a - b);

  const filtered = results
    .filter(r => matchdayFilter === 'All' || r.matchday === Number(matchdayFilter))
    .filter(r => teamFilter === 'All' || r.homeTeamId === Number(teamFilter) || r.awayTeamId === Number(teamFilter))
    .sort((a, b) => b.matchday - a.matchday || new Date(b.date) - new Date(a.date));

  const grouped = filtered.reduce((acc, r) => {
    if (!acc[r.matchday]) acc[r.matchday] = [];
    acc[r.matchday].push(r);
    return acc;
  }, {});

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <h1>Results</h1>
          <p>{results.length} matches completed in the {leagueInfo.season} season</p>
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
          <div className="empty-state-box"><p>No results match your filters.</p></div>
        ) : (
          Object.entries(grouped).sort((a, b) => b[0] - a[0]).map(([matchday, games]) => (
            <div key={matchday} className="matchday-section">
              <div className="matchday-header">
                <h3>Matchday {matchday}</h3>
                <span>{new Date(games[0].date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="results-list">
                {games.map(r => {
                  const home = getTeamById(r.homeTeamId);
                  const away = getTeamById(r.awayTeamId);
                  const homeWon = r.homeScore > r.awayScore;
                  const awayWon = r.awayScore > r.homeScore;
                  const draw = r.homeScore === r.awayScore;

                  const homeScorers = r.scorers.filter(s => s.teamId === r.homeTeamId);
                  const awayScorers = r.scorers.filter(s => s.teamId === r.awayTeamId);

                  return (
                    <div key={r.id} className="result-item">
                      <div className="result-item-main">
                        <div className={`result-item-team ${homeWon ? 'winner' : ''}`}>
                          <div
                            className="result-badge"
                            style={{ background: home?.primaryColor, color: home?.secondaryColor }}
                          >
                            {home?.shortName}
                          </div>
                          <span className="result-item-name">{home?.name}</span>
                        </div>
                        <div className="result-item-score">
                          <span className={homeWon ? 'score-winner' : draw ? 'score-draw' : ''}>{r.homeScore}</span>
                          <span className="score-sep">–</span>
                          <span className={awayWon ? 'score-winner' : draw ? 'score-draw' : ''}>{r.awayScore}</span>
                        </div>
                        <div className={`result-item-team result-item-away ${awayWon ? 'winner' : ''}`}>
                          <span className="result-item-name">{away?.name}</span>
                          <div
                            className="result-badge"
                            style={{ background: away?.primaryColor, color: away?.secondaryColor }}
                          >
                            {away?.shortName}
                          </div>
                        </div>
                      </div>

                      {/* Scorers */}
                      <div className="result-item-details">
                        <div className="result-scorers">
                          <div className="home-scorers">
                            {homeScorers.map((s, i) => (
                              <span key={i} className="scorer-entry">⚽ {s.playerName} <span className="scorer-min">{s.minute}'</span></span>
                            ))}
                          </div>
                          <div className="away-scorers">
                            {awayScorers.map((s, i) => (
                              <span key={i} className="scorer-entry">{s.minute}' <span className="scorer-min">{s.playerName}</span> ⚽</span>
                            ))}
                          </div>
                        </div>

                        {/* Cards */}
                        {(r.yellowCards?.length > 0 || r.redCards?.length > 0) && (
                          <div className="result-cards">
                            {r.yellowCards?.map((c, i) => (
                              <span key={`y${i}`} className="card-entry">🟨 {c.playerName} {c.minute}'</span>
                            ))}
                            {r.redCards?.map((c, i) => (
                              <span key={`r${i}`} className="card-entry">🟥 {c.playerName} {c.minute}'</span>
                            ))}
                          </div>
                        )}

                        {/* MOTM */}
                        {r.motm && (
                          <div className="result-motm">
                            <span>⭐ Man of the Match: <strong>{r.motm.playerName}</strong> ({getTeamById(r.motm.teamId)?.shortName})</span>
                          </div>
                        )}

                        <div className="result-venue">📍 {r.venue}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
