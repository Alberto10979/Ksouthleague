import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

export default function Statistics() {
  const { getTopScorers, getTopAssists, getCleanSheets, getDisciplinary, awards, getTeamById, results, leagueInfo } = useLeague();
  const [tab, setTab] = useState('scorers');

  const scorers = getTopScorers();
  const assists = getTopAssists();
  const cleanSheets = getCleanSheets();
  const disciplinary = getDisciplinary();

  const motmLeaderboard = () => {
    const counts = {};
    results.forEach(r => {
      if (r.motm) {
        const key = r.motm.playerId;
        counts[key] = counts[key] || { ...r.motm, team: getTeamById(r.motm.teamId), count: 0 };
        counts[key].count++;
      }
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  };

  const tabs = [
    { id: 'scorers', label: '⚽ Top Scorers' },
    { id: 'assists', label: '🎯 Top Assists' },
    { id: 'clean', label: '🧤 Clean Sheets' },
    { id: 'discipline', label: '🟨 Discipline' },
    { id: 'motm', label: '⭐ MOTM' },
  ];

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <h1>Statistics</h1>
          <p>Player & team statistics for the {leagueInfo.season} season</p>
        </div>
      </div>

      <div className="container">
        <div className="tabs tabs-wrap">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Top Scorers */}
        {tab === 'scorers' && (
          <div className="stats-section">
            <h2>Top Goalscorers</h2>
            <div className="stats-table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Club</th>
                    <th>Apps</th>
                    <th>Goals</th>
                    <th>Assists</th>
                    <th>Goals/Game</th>
                  </tr>
                </thead>
                <tbody>
                  {scorers.map((p, i) => {
                    const team = getTeamById(p.teamId);
                    return (
                      <tr key={p.id} className={i < 3 ? 'top-row' : ''}>
                        <td>
                          <span className={`rank-badge ${i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : ''}`}>
                            {i + 1}
                          </span>
                        </td>
                        <td><Link to={`/players/${p.id}`} className="player-link">{p.name}</Link></td>
                        <td>
                          <div className="stat-team-cell">
                            <div className="team-badge team-badge-sm" style={{ background: team?.primaryColor, color: team?.secondaryColor }}>{team?.shortName}</div>
                            <span className="hide-mobile">{team?.name}</span>
                          </div>
                        </td>
                        <td>{p.appearances}</td>
                        <td><strong className="highlight-stat">{p.goals}</strong></td>
                        <td>{p.assists}</td>
                        <td>{p.appearances > 0 ? (p.goals / p.appearances).toFixed(2) : '0.00'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Top Assists */}
        {tab === 'assists' && (
          <div className="stats-section">
            <h2>Top Assist Providers</h2>
            <div className="stats-table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Club</th>
                    <th>Apps</th>
                    <th>Assists</th>
                    <th>Goals</th>
                    <th>Contributions</th>
                  </tr>
                </thead>
                <tbody>
                  {assists.map((p, i) => {
                    const team = getTeamById(p.teamId);
                    return (
                      <tr key={p.id} className={i < 3 ? 'top-row' : ''}>
                        <td>
                          <span className={`rank-badge ${i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : ''}`}>
                            {i + 1}
                          </span>
                        </td>
                        <td><Link to={`/players/${p.id}`} className="player-link">{p.name}</Link></td>
                        <td>
                          <div className="stat-team-cell">
                            <div className="team-badge team-badge-sm" style={{ background: team?.primaryColor, color: team?.secondaryColor }}>{team?.shortName}</div>
                            <span className="hide-mobile">{team?.name}</span>
                          </div>
                        </td>
                        <td>{p.appearances}</td>
                        <td><strong className="highlight-stat">{p.assists}</strong></td>
                        <td>{p.goals}</td>
                        <td>{p.goals + p.assists}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Clean Sheets */}
        {tab === 'clean' && (
          <div className="stats-section">
            <h2>Goalkeeper Clean Sheets</h2>
            <div className="stats-table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Goalkeeper</th>
                    <th>Club</th>
                    <th>Apps</th>
                    <th>Clean Sheets</th>
                    <th>CS%</th>
                  </tr>
                </thead>
                <tbody>
                  {cleanSheets.map((p, i) => {
                    const team = getTeamById(p.teamId);
                    return (
                      <tr key={p.id} className={i < 3 ? 'top-row' : ''}>
                        <td>
                          <span className={`rank-badge ${i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : ''}`}>
                            {i + 1}
                          </span>
                        </td>
                        <td><Link to={`/players/${p.id}`} className="player-link">{p.name}</Link></td>
                        <td>
                          <div className="stat-team-cell">
                            <div className="team-badge team-badge-sm" style={{ background: team?.primaryColor, color: team?.secondaryColor }}>{team?.shortName}</div>
                            <span className="hide-mobile">{team?.name}</span>
                          </div>
                        </td>
                        <td>{p.appearances}</td>
                        <td><strong className="highlight-stat">{p.cleanSheets}</strong></td>
                        <td>{p.appearances > 0 ? ((p.cleanSheets / p.appearances) * 100).toFixed(0) + '%' : '0%'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Disciplinary */}
        {tab === 'discipline' && (
          <div className="stats-section">
            <h2>Disciplinary Record</h2>
            <div className="stats-table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Club</th>
                    <th>Position</th>
                    <th>🟨 Yellow</th>
                    <th>🟥 Red</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinary.map((p, i) => {
                    const team = getTeamById(p.teamId);
                    const pts = p.yellowCards + p.redCards * 3;
                    return (
                      <tr key={p.id}>
                        <td>{i + 1}</td>
                        <td><Link to={`/players/${p.id}`} className="player-link">{p.name}</Link></td>
                        <td>
                          <div className="stat-team-cell">
                            <div className="team-badge team-badge-sm" style={{ background: team?.primaryColor, color: team?.secondaryColor }}>{team?.shortName}</div>
                            <span className="hide-mobile">{team?.name}</span>
                          </div>
                        </td>
                        <td><span className={`position-badge pos-${p.position.toLowerCase()}`}>{p.position}</span></td>
                        <td className={p.yellowCards > 0 ? 'yellow-card-cell' : ''}><strong>{p.yellowCards}</strong></td>
                        <td className={p.redCards > 0 ? 'red-card-cell' : ''}><strong>{p.redCards}</strong></td>
                        <td>{pts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MOTM */}
        {tab === 'motm' && (
          <div className="stats-section">
            <h2>Man of the Match Awards</h2>
            <div className="stats-table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Club</th>
                    <th>MOTM Awards</th>
                  </tr>
                </thead>
                <tbody>
                  {motmLeaderboard().map((entry, i) => (
                    <tr key={entry.playerId} className={i < 3 ? 'top-row' : ''}>
                      <td>
                        <span className={`rank-badge ${i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : ''}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td><Link to={`/players/${entry.playerId}`} className="player-link">{entry.playerName}</Link></td>
                      <td>
                        <div className="stat-team-cell">
                          <div className="team-badge team-badge-sm" style={{ background: entry.team?.primaryColor, color: entry.team?.secondaryColor }}>{entry.team?.shortName}</div>
                          <span className="hide-mobile">{entry.team?.name}</span>
                        </div>
                      </td>
                      <td><strong className="highlight-stat">⭐ {entry.count}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Player of the Month */}
            {awards.playerOfMonth?.length > 0 && (
              <div className="awards-section">
                <h3>Player of the Month</h3>
                <div className="awards-grid">
                  {awards.playerOfMonth.map((award, i) => {
                    const team = getTeamById(award.teamId);
                    return (
                      <div key={i} className="award-card">
                        <div className="award-medal">🏅</div>
                        <div className="award-month">{award.month}</div>
                        <Link to={`/players/${award.playerId}`} className="award-player">{award.playerName}</Link>
                        <div className="award-team" style={{ color: team?.primaryColor }}>{team?.name}</div>
                        <p className="award-reason">{award.reason}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
