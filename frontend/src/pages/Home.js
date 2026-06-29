import React from 'react';
import { Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

function FormBadge({ result }) {
  return <span className={`form-badge form-${result.toLowerCase()}`}>{result}</span>;
}

function TeamBadge({ team, size = 'md' }) {
  return (
    <div
      className={`team-badge team-badge-${size}`}
      style={{ background: team?.primaryColor || '#333', color: team?.secondaryColor || '#fff' }}
    >
      {team?.shortName || '?'}
    </div>
  );
}

export default function Home() {
  const {
    leagueInfo, teams, results, fixtures,
    getStandings, getTopScorers, getRecentResults,
    getUpcomingFixtures, getTeamById, news,
  } = useLeague();

  const standings = getStandings();
  const topScorers = getTopScorers().slice(0, 5);
  const recentResults = getRecentResults(4);
  const upcomingFixtures = getUpcomingFixtures(4);
  const featuredNews = news.find(n => n.featured) || news[0];
  const sideNews = news.filter(n => !n.featured).slice(0, 2);

  const totalGoals = results.reduce((sum, r) => sum + r.homeScore + r.awayScore, 0);
  const totalMatches = results.length;
  const matchdaysDone = new Set(results.map(r => r.matchday)).size;

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content container">
          <div className="hero-badge">⚽ Official League Website</div>
          <h1 className="hero-title">{leagueInfo.name}</h1>
          <p className="hero-subtitle">Season {leagueInfo.season} · Matchday {leagueInfo.currentMatchday} of {leagueInfo.totalMatchdays}</p>
          <div className="hero-actions">
            <Link to="/standings" className="btn btn-primary">View Standings</Link>
            <Link to="/fixtures" className="btn btn-outline">Upcoming Fixtures</Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="stats-strip">
        <div className="container stats-strip-inner">
          <div className="stat-pill">
            <span className="stat-pill-value">{teams.length}</span>
            <span className="stat-pill-label">Clubs</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-value">{totalMatches}</span>
            <span className="stat-pill-label">Matches Played</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-value">{totalGoals}</span>
            <span className="stat-pill-label">Goals Scored</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-value">{totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : '0'}</span>
            <span className="stat-pill-label">Goals / Match</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-value">{matchdaysDone}</span>
            <span className="stat-pill-label">Matchdays Done</span>
          </div>
        </div>
      </section>

      <div className="container home-grid">
        {/* Standings Preview */}
        <section className="home-section">
          <div className="section-header">
            <h2>League Table</h2>
            <Link to="/standings" className="see-all">Full Table →</Link>
          </div>
          <div className="table-card">
            <table className="league-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GD</th>
                  <th>Pts</th>
                  <th className="hide-mobile">Form</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <tr key={row.team.id} className={i === 0 ? 'leader-row' : ''}>
                    <td className="pos-cell">
                      <span className={`pos-badge ${i < 2 ? 'pos-top' : i >= standings.length - 2 ? 'pos-bottom' : ''}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td>
                      <Link to={`/teams/${row.team.id}`} className="team-name-link">
                        <TeamBadge team={row.team} size="sm" />
                        <span>{row.team.name}</span>
                      </Link>
                    </td>
                    <td>{row.played}</td>
                    <td>{row.won}</td>
                    <td>{row.drawn}</td>
                    <td>{row.lost}</td>
                    <td className={row.goalDiff > 0 ? 'positive' : row.goalDiff < 0 ? 'negative' : ''}>{row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}</td>
                    <td className="pts-cell"><strong>{row.points}</strong></td>
                    <td className="hide-mobile">
                      <div className="form-row">
                        {row.form.map((f, fi) => <FormBadge key={fi} result={f} />)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Scorers */}
        <section className="home-section home-side">
          <div className="section-header">
            <h2>Top Scorers</h2>
            <Link to="/statistics" className="see-all">All Stats →</Link>
          </div>
          <div className="scorers-list">
            {topScorers.map((p, i) => {
              const team = getTeamById(p.teamId);
              return (
                <Link to={`/players/${p.id}`} key={p.id} className="scorer-row">
                  <span className="scorer-rank">{i + 1}</span>
                  <TeamBadge team={team} size="sm" />
                  <div className="scorer-info">
                    <span className="scorer-name">{p.name}</span>
                    <span className="scorer-team">{team?.shortName}</span>
                  </div>
                  <div className="scorer-stats">
                    <span className="scorer-goals">{p.goals}</span>
                    <span className="scorer-goals-label">goals</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Upcoming Fixtures */}
          <div className="section-header" style={{ marginTop: '2rem' }}>
            <h2>Upcoming</h2>
            <Link to="/fixtures" className="see-all">All Fixtures →</Link>
          </div>
          <div className="fixture-list">
            {upcomingFixtures.map(fix => {
              const home = getTeamById(fix.homeTeamId);
              const away = getTeamById(fix.awayTeamId);
              return (
                <div key={fix.id} className="fixture-card-mini">
                  <div className="fixture-mini-date">MD{fix.matchday} · {new Date(fix.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</div>
                  <div className="fixture-mini-teams">
                    <span className="fixture-team">{home?.shortName}</span>
                    <span className="fixture-vs">vs</span>
                    <span className="fixture-team">{away?.shortName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Recent Results */}
      <section className="container home-section" style={{ marginTop: '0' }}>
        <div className="section-header">
          <h2>Recent Results</h2>
          <Link to="/results" className="see-all">All Results →</Link>
        </div>
        <div className="results-grid">
          {recentResults.map(r => {
            const home = getTeamById(r.homeTeamId);
            const away = getTeamById(r.awayTeamId);
            return (
              <div key={r.id} className="result-card">
                <div className="result-matchday">MD{r.matchday} · {new Date(r.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="result-teams">
                  <div className="result-team">
                    <TeamBadge team={home} size="md" />
                    <span>{home?.name}</span>
                  </div>
                  <div className="result-score">
                    <span style={{ color: r.homeScore > r.awayScore ? 'var(--accent)' : 'inherit' }}>{r.homeScore}</span>
                    <span className="score-sep">–</span>
                    <span style={{ color: r.awayScore > r.homeScore ? 'var(--accent)' : 'inherit' }}>{r.awayScore}</span>
                  </div>
                  <div className="result-team result-team-away">
                    <span>{away?.name}</span>
                    <TeamBadge team={away} size="md" />
                  </div>
                </div>
                {r.motm && (
                  <div className="result-motm">⭐ MOTM: {r.motm.playerName}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* News */}
      <section className="container home-section">
        <div className="section-header">
          <h2>Latest News</h2>
          <Link to="/news" className="see-all">All News →</Link>
        </div>
        <div className="news-home-grid">
          {featuredNews && (
            <Link to={`/news/${featuredNews.id}`} className="news-featured-card">
              <div className="news-category-tag">{featuredNews.category}</div>
              <h3>{featuredNews.title}</h3>
              <p>{featuredNews.summary}</p>
              <span className="news-date">{new Date(featuredNews.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </Link>
          )}
          <div className="news-side-list">
            {sideNews.map(n => (
              <Link to={`/news/${n.id}`} key={n.id} className="news-side-card">
                <div className="news-category-tag news-category-sm">{n.category}</div>
                <h4>{n.title}</h4>
                <span className="news-date">{new Date(n.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
