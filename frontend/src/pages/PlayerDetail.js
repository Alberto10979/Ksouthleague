import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

const POSITION_LABELS = { GK: 'Goalkeeper', DEF: 'Defender', MID: 'Midfielder', FWD: 'Forward' };

export default function PlayerDetail() {
  const { id } = useParams();
  const { getPlayerById, getTeamById, results } = useLeague();

  const player = getPlayerById(id);
  const team = player ? getTeamById(player.teamId) : null;

  if (!player) return <div className="page container"><p>Player not found.</p></div>;

  // Matches where player scored
  const playerMatches = results.filter(r =>
    r.homeTeamId === player.teamId || r.awayTeamId === player.teamId
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const playerGoals = results.flatMap(r => r.scorers).filter(s => s.playerId === player.id);
  const playerCards = results.flatMap(r => [...r.yellowCards, ...r.redCards]).filter(c => c.playerName === player.name);
  const motmMatches = results.filter(r =>
    r.motm && (r.motm.playerId === player.id || r.motm.playerName === player.name)
  );

  return (
    <div className="page">
      {/* Profile Header */}
      <div
        className="player-hero"
        style={{ background: `linear-gradient(135deg, ${team?.primaryColor || '#1a1a2e'}, ${team?.primaryColor || '#1a1a2e'}66)` }}
      >
        <div className="container player-hero-inner">
          <div className="player-hero-number" style={{ color: team?.secondaryColor || '#fff', borderColor: team?.secondaryColor || '#fff' }}>
            {player.jerseyNumber}
          </div>
          <div className="player-hero-info">
            <div className="player-hero-pos">
              <span className={`position-badge pos-${player.position.toLowerCase()}`}>{player.position}</span>
              <span>{POSITION_LABELS[player.position]}</span>
            </div>
            <h1>{player.name}</h1>
            <div className="player-hero-meta">
              <Link to={`/teams/${team?.id}`} className="player-team-link" style={{ color: team?.secondaryColor || '#fff' }}>
                ⚽ {team?.name}
              </Link>
              <span>🌍 {player.nationality}</span>
              <span>🎂 Age {player.age}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Season Stats */}
        <section className="player-stats-section">
          <h2>Season Statistics</h2>
          <div className="player-stats-grid">
            <div className="pstat-card">
              <span className="pstat-value">{player.appearances}</span>
              <span className="pstat-label">Appearances</span>
            </div>
            <div className="pstat-card">
              <span className="pstat-value" style={{ color: 'var(--accent)' }}>{player.goals}</span>
              <span className="pstat-label">Goals</span>
            </div>
            <div className="pstat-card">
              <span className="pstat-value">{player.assists}</span>
              <span className="pstat-label">Assists</span>
            </div>
            {player.position === 'GK' && (
              <div className="pstat-card">
                <span className="pstat-value" style={{ color: 'var(--primary-light)' }}>{player.cleanSheets}</span>
                <span className="pstat-label">Clean Sheets</span>
              </div>
            )}
            <div className="pstat-card">
              <span className="pstat-value" style={{ color: player.yellowCards > 0 ? '#f59e0b' : 'inherit' }}>{player.yellowCards}</span>
              <span className="pstat-label">Yellow Cards</span>
            </div>
            <div className="pstat-card">
              <span className="pstat-value" style={{ color: player.redCards > 0 ? '#ef4444' : 'inherit' }}>{player.redCards}</span>
              <span className="pstat-label">Red Cards</span>
            </div>
            <div className="pstat-card">
              <span className="pstat-value">{player.goals + player.assists}</span>
              <span className="pstat-label">Goal Contributions</span>
            </div>
            <div className="pstat-card">
              <span className="pstat-value">
                {player.appearances > 0 ? (player.goals / player.appearances).toFixed(2) : '0.00'}
              </span>
              <span className="pstat-label">Goals/Game</span>
            </div>
          </div>
        </section>

        {/* Goals Log */}
        {playerGoals.length > 0 && (
          <section className="player-stats-section">
            <h2>Goals This Season</h2>
            <div className="goals-log">
              {results.filter(r => r.scorers.some(s => s.playerId === player.id)).map(r => {
                const goals = r.scorers.filter(s => s.playerId === player.id);
                const home = getTeamById(r.homeTeamId);
                const away = getTeamById(r.awayTeamId);
                return (
                  <div key={r.id} className="goal-log-row">
                    <span className="goal-match">{home?.shortName} {r.homeScore}–{r.awayScore} {away?.shortName}</span>
                    <span className="goal-date">{new Date(r.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</span>
                    <div className="goal-minutes">
                      {goals.map((g, i) => <span key={i} className="goal-minute">⚽ {g.minute}'</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Man of the Match Awards */}
        {motmMatches.length > 0 && (
          <section className="player-stats-section">
            <h2>⭐ Man of the Match Awards ({motmMatches.length})</h2>
            <div className="match-history">
              {motmMatches.sort((a, b) => new Date(b.date) - new Date(a.date)).map(r => {
                const home = getTeamById(r.homeTeamId);
                const away = getTeamById(r.awayTeamId);
                return (
                  <div key={r.id} className="match-history-row">
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>⭐</span>
                    <span className="match-history-date">{new Date(r.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</span>
                    <span className="match-history-fixture">{home?.shortName} {r.homeScore}–{r.awayScore} {away?.shortName}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Match History */}
        <section className="player-stats-section">
          <h2>Match Appearances</h2>
          <div className="match-history">
            {playerMatches.slice(0, 8).map(r => {
              const home = getTeamById(r.homeTeamId);
              const away = getTeamById(r.awayTeamId);
              const isHome = r.homeTeamId === player.teamId;
              const scored = r.scorers.some(s => s.playerId === player.id);
              const booked = r.yellowCards?.some(c => c.playerName === player.name);
              const sentOff = r.redCards?.some(c => c.playerName === player.name);
              const teamScore = isHome ? r.homeScore : r.awayScore;
              const oppScore = isHome ? r.awayScore : r.homeScore;
              const outcome = teamScore > oppScore ? 'W' : teamScore === oppScore ? 'D' : 'L';
              return (
                <div key={r.id} className="match-history-row">
                  <span className={`outcome-badge outcome-${outcome.toLowerCase()}`}>{outcome}</span>
                  <span className="match-history-date">{new Date(r.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</span>
                  <span className="match-history-fixture">{home?.shortName} {r.homeScore}–{r.awayScore} {away?.shortName}</span>
                  <div className="match-history-events">
                    {scored && <span title="Goal scored">⚽</span>}
                    {booked && <span title="Yellow card" className="card-icon yellow-card-icon">🟨</span>}
                    {sentOff && <span title="Red card" className="card-icon red-card-icon">🟥</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div style={{ marginBottom: '2rem' }}>
          <Link to="/players" className="btn btn-outline">← Back to Players</Link>
        </div>
      </div>
    </div>
  );
}
