import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

function FormBadge({ result }) {
  return <span className={`form-badge form-${result.toLowerCase()}`}>{result}</span>;
}

export default function Standings() {
  const { getStandings, leagueInfo, results, getTeamById } = useLeague();
  const [view, setView] = useState('overall');
  const standings = getStandings();

  const getHomeStandings = () => {
    const table = standings.map(row => {
      const homeResults = results.filter(r => r.homeTeamId === row.team.id);
      let w = 0, d = 0, l = 0, gf = 0, ga = 0;
      homeResults.forEach(r => {
        gf += r.homeScore; ga += r.awayScore;
        if (r.homeScore > r.awayScore) w++;
        else if (r.homeScore === r.awayScore) d++;
        else l++;
      });
      return { ...row, played: w + d + l, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: w * 3 + d, form: row.form };
    }).sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff);
    return table;
  };

  const getAwayStandings = () => {
    const table = standings.map(row => {
      const awayResults = results.filter(r => r.awayTeamId === row.team.id);
      let w = 0, d = 0, l = 0, gf = 0, ga = 0;
      awayResults.forEach(r => {
        gf += r.awayScore; ga += r.homeScore;
        if (r.awayScore > r.homeScore) w++;
        else if (r.awayScore === r.homeScore) d++;
        else l++;
      });
      return { ...row, played: w + d + l, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: w * 3 + d, form: row.form };
    }).sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff);
    return table;
  };

  const tableData = view === 'home' ? getHomeStandings() : view === 'away' ? getAwayStandings() : standings;
  const totalMatchdays = standings.length > 0 ? standings[0].played : 0;

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <h1>Standings</h1>
          <p>{leagueInfo.season} · Matchday {leagueInfo.currentMatchday - 1} completed</p>
        </div>
      </div>

      <div className="container">
        <div className="tabs">
          {['overall', 'home', 'away'].map(v => (
            <button
              key={v}
              className={`tab-btn ${view === v ? 'active' : ''}`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {tableData.length === 0 && (
          <div className="empty-state-box">
            <p>No teams added yet. Go to <a href="/admin" style={{ color: 'var(--primary-light)' }}>Admin</a> to add teams.</p>
          </div>
        )}
        <div className="table-card standings-card">
          <table className="league-table standings-table">
            <thead>
              <tr>
                <th className="th-pos">#</th>
                <th className="th-team">Club</th>
                <th title="Played">P</th>
                <th title="Won">W</th>
                <th title="Drawn">D</th>
                <th title="Lost">L</th>
                <th title="Goals For">GF</th>
                <th title="Goals Against">GA</th>
                <th title="Goal Difference">GD</th>
                <th title="Points">Pts</th>
                <th className="hide-mobile" title="Last 5 games">Form</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => {
                const isTop = i < 2;
                const isBottom = i >= tableData.length - 2;
                return (
                  <tr
                    key={row.team.id}
                    className={`standings-row ${isTop ? 'row-promotion' : isBottom ? 'row-relegation' : ''}`}
                  >
                    <td>
                      <span className={`pos-badge ${isTop ? 'pos-top' : isBottom ? 'pos-bottom' : ''}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td>
                      <Link to={`/teams/${row.team.id}`} className="team-name-link">
                        <div
                          className="team-badge team-badge-sm"
                          style={{ background: row.team.primaryColor, color: row.team.secondaryColor }}
                        >
                          {row.team.shortName}
                        </div>
                        <span className="team-full-name">{row.team.name}</span>
                        <span className="team-short-name hide-desktop">{row.team.shortName}</span>
                      </Link>
                    </td>
                    <td>{row.played}</td>
                    <td className="won-cell">{row.won}</td>
                    <td>{row.drawn}</td>
                    <td className="lost-cell">{row.lost}</td>
                    <td>{row.goalsFor}</td>
                    <td>{row.goalsAgainst}</td>
                    <td className={row.goalDiff > 0 ? 'positive' : row.goalDiff < 0 ? 'negative' : ''}>
                      {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                    </td>
                    <td className="pts-cell"><strong>{row.points}</strong></td>
                    <td className="hide-mobile">
                      <div className="form-row">
                        {row.form.map((f, fi) => <FormBadge key={fi} result={f} />)}
                        {row.form.length === 0 && <span className="text-muted">—</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="standings-legend">
          <div className="legend-item"><span className="legend-dot promotion" /> <span>Promotion Places (Top 2)</span></div>
          <div className="legend-item"><span className="legend-dot relegation" /> <span>Bottom 2</span></div>
        </div>

        {/* Head-to-Head quick view */}
        <div className="h2h-section">
          <h2>Season Summary</h2>
          <div className="summary-cards">
            {standings[0] && (
              <div className="summary-card">
                <div className="summary-card-label">🏆 League Leader</div>
                <Link to={`/teams/${standings[0].team.id}`} className="summary-card-value">{standings[0].team.name}</Link>
                <div className="summary-card-sub">{standings[0].points} points</div>
              </div>
            )}
            {standings.length > 1 && (
              <div className="summary-card">
                <div className="summary-card-label">📈 Best Goal Difference</div>
                {(() => {
                  const best = [...standings].sort((a, b) => b.goalDiff - a.goalDiff)[0];
                  return <>
                    <Link to={`/teams/${best.team.id}`} className="summary-card-value">{best.team.name}</Link>
                    <div className="summary-card-sub">+{best.goalDiff} GD</div>
                  </>;
                })()}
              </div>
            )}
            {standings.length > 0 && (
              <div className="summary-card">
                <div className="summary-card-label">⚽ Most Goals Scored</div>
                {(() => {
                  const best = [...standings].sort((a, b) => b.goalsFor - a.goalsFor)[0];
                  return <>
                    <Link to={`/teams/${best.team.id}`} className="summary-card-value">{best.team.name}</Link>
                    <div className="summary-card-sub">{best.goalsFor} goals</div>
                  </>;
                })()}
              </div>
            )}
            {standings.filter(r => r.played > 0).length > 0 && (
              <div className="summary-card">
                <div className="summary-card-label">🛡️ Best Defence</div>
                {(() => {
                  const best = [...standings].filter(r => r.played > 0).sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];
                  return <>
                    <Link to={`/teams/${best.team.id}`} className="summary-card-value">{best.team.name}</Link>
                    <div className="summary-card-sub">{best.goalsAgainst} conceded</div>
                  </>;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
