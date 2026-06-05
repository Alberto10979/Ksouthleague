import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

function FormBadge({ result }) {
  return <span className={`form-badge form-${result.toLowerCase()}`}>{result}</span>;
}

export default function TeamDetail() {
  const { id } = useParams();
  const { getTeamById, getPlayersByTeam, getResultsByTeam, getFixturesByTeam, getStandings, getTeamById: getTeam } = useLeague();
  const [activeTab, setActiveTab] = useState('squad');

  const team = getTeamById(id);
  const squad = getPlayersByTeam(id);
  const teamResults = getResultsByTeam(id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const teamFixtures = getFixturesByTeam(id).filter(f => f.status === 'upcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  const standings = getStandings();
  const standingRow = standings.find(r => r.team.id === Number(id));
  const position = standings.findIndex(r => r.team.id === Number(id)) + 1;

  if (!team) return <div className="page container"><p>Team not found.</p></div>;

  const positionGroups = [
    { label: 'Goalkeepers', position: 'GK' },
    { label: 'Defenders', position: 'DEF' },
    { label: 'Midfielders', position: 'MID' },
    { label: 'Forwards', position: 'FWD' },
  ];

  return (
    <div className="page">
      {/* Team Header */}
      <div
        className="team-detail-hero"
        style={{ background: `linear-gradient(135deg, ${team.primaryColor}dd, ${team.primaryColor}88)` }}
      >
        <div className="container team-detail-hero-inner">
          <div className="team-detail-badge" style={{ background: team.primaryColor, color: team.secondaryColor, border: `3px solid ${team.secondaryColor}` }}>
            {team.shortName}
          </div>
          <div className="team-detail-info">
            <h1>{team.name}</h1>
            <div className="team-detail-meta-row">
              <span>🏟️ {team.stadium} ({team.capacity.toLocaleString()} cap.)</span>
              <span>👤 {team.manager}</span>
              <span>📅 Founded {team.founded}</span>
              <span>🏆 Position: #{position}</span>
            </div>
            <p className="team-detail-desc">{team.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      {standingRow && (
        <div className="team-stats-strip" style={{ borderTop: `3px solid ${team.primaryColor}` }}>
          <div className="container team-stats-strip-inner">
            {[
              { label: 'Points', value: standingRow.points },
              { label: 'Played', value: standingRow.played },
              { label: 'Won', value: standingRow.won },
              { label: 'Drawn', value: standingRow.drawn },
              { label: 'Lost', value: standingRow.lost },
              { label: 'Goals For', value: standingRow.goalsFor },
              { label: 'Goals Against', value: standingRow.goalsAgainst },
              { label: 'Goal Diff', value: standingRow.goalDiff > 0 ? `+${standingRow.goalDiff}` : standingRow.goalDiff },
            ].map(s => (
              <div key={s.label} className="team-stat-chip">
                <span className="team-stat-chip-value">{s.value}</span>
                <span className="team-stat-chip-label">{s.label}</span>
              </div>
            ))}
            <div className="team-stat-chip">
              <div className="form-row">
                {standingRow.form.map((f, i) => <FormBadge key={i} result={f} />)}
              </div>
              <span className="team-stat-chip-label">Form</span>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* Tabs */}
        <div className="tabs">
          {['squad', 'results', 'fixtures'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={activeTab === tab ? { borderBottomColor: team.primaryColor } : {}}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'squad' && ` (${squad.length})`}
              {tab === 'results' && ` (${teamResults.length})`}
              {tab === 'fixtures' && ` (${teamFixtures.length})`}
            </button>
          ))}
        </div>

        {/* Squad Tab */}
        {activeTab === 'squad' && (
          <div className="tab-content">
            {positionGroups.map(group => {
              const groupPlayers = squad.filter(p => p.position === group.position);
              if (!groupPlayers.length) return null;
              return (
                <div key={group.position} className="squad-group">
                  <h3 className="squad-group-title" style={{ color: team.primaryColor }}>{group.label}</h3>
                  <div className="squad-table-wrapper">
                    <table className="squad-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Nationality</th>
                          <th>Age</th>
                          <th>Apps</th>
                          <th>Goals</th>
                          <th>Assists</th>
                          <th>YC</th>
                          <th>RC</th>
                          {group.position === 'GK' && <th>CS</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {groupPlayers.map(p => (
                          <tr key={p.id}>
                            <td><span className="jersey-number" style={{ background: team.primaryColor, color: team.secondaryColor }}>{p.jerseyNumber}</span></td>
                            <td><Link to={`/players/${p.id}`} className="player-link">{p.name}</Link></td>
                            <td>{p.nationality}</td>
                            <td>{p.age}</td>
                            <td>{p.appearances}</td>
                            <td><strong>{p.goals}</strong></td>
                            <td>{p.assists}</td>
                            <td className={p.yellowCards > 0 ? 'yellow-card-cell' : ''}>{p.yellowCards}</td>
                            <td className={p.redCards > 0 ? 'red-card-cell' : ''}>{p.redCards}</td>
                            {group.position === 'GK' && <td><strong>{p.cleanSheets}</strong></td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="tab-content">
            {teamResults.length === 0 ? <p className="empty-state">No results yet.</p> : teamResults.map(r => {
              const home = getTeamById(r.homeTeamId);
              const away = getTeamById(r.awayTeamId);
              const isHome = r.homeTeamId === Number(id);
              const teamScore = isHome ? r.homeScore : r.awayScore;
              const oppScore = isHome ? r.awayScore : r.homeScore;
              const outcome = teamScore > oppScore ? 'W' : teamScore === oppScore ? 'D' : 'L';
              return (
                <div key={r.id} className="result-row">
                  <span className={`outcome-badge outcome-${outcome.toLowerCase()}`}>{outcome}</span>
                  <span className="result-date">{new Date(r.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <div className="result-match">
                    <span className={r.homeTeamId === Number(id) ? 'current-team' : ''}>{home?.name}</span>
                    <span className="score-block">{r.homeScore} – {r.awayScore}</span>
                    <span className={r.awayTeamId === Number(id) ? 'current-team' : ''}>{away?.name}</span>
                  </div>
                  <div className="result-scorers-mini">
                    {r.scorers.map((s, si) => (
                      <span key={si} className="scorer-mini">{s.playerName} {s.minute}'</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Fixtures Tab */}
        {activeTab === 'fixtures' && (
          <div className="tab-content">
            {teamFixtures.length === 0 ? <p className="empty-state">No upcoming fixtures.</p> : teamFixtures.map(f => {
              const home = getTeamById(f.homeTeamId);
              const away = getTeamById(f.awayTeamId);
              return (
                <div key={f.id} className="fixture-row">
                  <div className="fixture-row-meta">
                    <span className="matchday-badge">MD{f.matchday}</span>
                    <span>{new Date(f.date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>{f.time}</span>
                  </div>
                  <div className="fixture-row-teams">
                    <span className={f.homeTeamId === Number(id) ? 'current-team' : ''}>{home?.name}</span>
                    <span className="vs-badge">vs</span>
                    <span className={f.awayTeamId === Number(id) ? 'current-team' : ''}>{away?.name}</span>
                  </div>
                  <span className="fixture-venue">📍 {f.venue}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
