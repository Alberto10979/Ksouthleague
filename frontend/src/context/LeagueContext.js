import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as db from '../lib/db';

const LeagueContext = createContext();

export function LeagueProvider({ children }) {
  const [leagueInfo, setLeagueInfo] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [results, setResults] = useState([]);
  const [news, setNews] = useState([]);
  const [awards, setAwards] = useState({ playerOfMonth: [] });
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [li, t, p, f, r, n, a] = await Promise.all([
        db.getLeagueInfo(),
        db.getTeams(),
        db.getPlayers(),
        db.getFixtures(),
        db.getResults(),
        db.getNews(),
        db.getAwards(),
      ]);
      setLeagueInfo(li);
      setTeams(t);
      setPlayers(p);
      setFixtures(f);
      setResults(r);
      setNews(n);
      setAwards(a);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // ─── Admin ──────────────────────────────────────────────────────────────────
  const adminLogin = () => setAdminLoggedIn(true);
  const adminLogout = () => setAdminLoggedIn(false);

  // ─── Teams ──────────────────────────────────────────────────────────────────
  const addTeam = async (team) => {
    const t = await db.createTeam(team);
    setTeams(prev => [...prev, t]);
    return t;
  };
  const updateTeam = async (team) => {
    const t = await db.updateTeam(team.id, team);
    setTeams(prev => prev.map(x => x.id === t.id ? t : x));
    return t;
  };
  const deleteTeam = async (id) => {
    await db.deleteTeam(id);
    setTeams(prev => prev.filter(t => t.id !== id));
    setPlayers(prev => prev.filter(p => p.teamId !== id));
  };

  // ─── Players ────────────────────────────────────────────────────────────────
  const addPlayer = async (player) => {
    const p = await db.createPlayer(player);
    setPlayers(prev => [...prev, p]);
    return p;
  };
  const updatePlayer = async (player) => {
    const p = await db.updatePlayer(player.id, player);
    setPlayers(prev => prev.map(x => x.id === p.id ? p : x));
    return p;
  };
  const deletePlayer = async (id) => {
    await db.deletePlayer(id);
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  // ─── Fixtures ───────────────────────────────────────────────────────────────
  const addFixture = async (fixture) => {
    const f = await db.createFixture(fixture);
    setFixtures(prev => [...prev, f]);
    return f;
  };
  const updateFixture = async (fixture) => {
    const f = await db.updateFixture(fixture.id, fixture);
    setFixtures(prev => prev.map(x => x.id === f.id ? f : x));
    return f;
  };
  const deleteFixture = async (id) => {
    await db.deleteFixture(id);
    setFixtures(prev => prev.filter(f => f.id !== id));
  };

  // ─── Results ────────────────────────────────────────────────────────────────
  const addResult = async (result) => {
    const r = await db.createResult(result);
    setResults(prev => [...prev, r]);
    return r;
  };
  const updateResult = async (result) => {
    const r = await db.updateResult(result.id, result);
    setResults(prev => prev.map(x => x.id === r.id ? r : x));
    return r;
  };
  const deleteResult = async (id) => {
    await db.deleteResult(id);
    setResults(prev => prev.filter(r => r.id !== id));
  };

  // ─── News ───────────────────────────────────────────────────────────────────
  const addNews = async (article) => {
    const n = await db.createNews(article);
    setNews(prev => [n, ...prev]);
    return n;
  };
  const updateNews = async (article) => {
    const n = await db.updateNews(article.id, article);
    setNews(prev => prev.map(x => x.id === n.id ? n : x));
    return n;
  };
  const deleteNews = async (id) => {
    await db.deleteNews(id);
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // ─── League Info & Awards ───────────────────────────────────────────────────
  const updateLeagueInfo = async (updates) => {
    const li = await db.updateLeagueInfo(updates);
    setLeagueInfo(li);
  };
  const updateAwards = async (updates) => {
    const a = await db.updateAwards(updates);
    setAwards(a);
  };

  // ─── Computed helpers ───────────────────────────────────────────────────────
  const getTeamById = (id) => teams.find(t => t.id === Number(id));
  const getPlayerById = (id) => players.find(p => p.id === Number(id));
  const getPlayersByTeam = (teamId) => players.filter(p => p.teamId === Number(teamId));

  const getStandings = () => {
    const table = teams.map(team => {
      const teamResults = results.filter(r => r.homeTeamId === team.id || r.awayTeamId === team.id);
      let w = 0, d = 0, l = 0, gf = 0, ga = 0;
      const form = [];
      teamResults.forEach(r => {
        const isHome = r.homeTeamId === team.id;
        const scored = isHome ? r.homeScore : r.awayScore;
        const conceded = isHome ? r.awayScore : r.homeScore;
        gf += scored; ga += conceded;
        if (scored > conceded) { w++; form.push('W'); }
        else if (scored === conceded) { d++; form.push('D'); }
        else { l++; form.push('L'); }
      });
      return { team, played: w + d + l, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: w * 3 + d, form: form.slice(-5) };
    });
    return table.sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff || b.goalsFor - a.goalsFor);
  };

  const getTopScorers = () =>
    [...players].filter(p => p.goals > 0).sort((a, b) => b.goals - a.goals || b.assists - a.assists).slice(0, 20);

  const getTopAssists = () =>
    [...players].filter(p => p.assists > 0).sort((a, b) => b.assists - a.assists).slice(0, 20);

  const getCleanSheets = () =>
    [...players].filter(p => p.position === 'GK').sort((a, b) => b.cleanSheets - a.cleanSheets).slice(0, 10);

  const getDisciplinary = () =>
    [...players].filter(p => p.yellowCards > 0 || p.redCards > 0)
      .sort((a, b) => (a.redCards * 3 + a.yellowCards) - (b.redCards * 3 + b.yellowCards)).slice(0, 20);

  const getResultsByTeam = (teamId) =>
    results.filter(r => r.homeTeamId === Number(teamId) || r.awayTeamId === Number(teamId));

  const getFixturesByTeam = (teamId) =>
    fixtures.filter(f => f.homeTeamId === Number(teamId) || f.awayTeamId === Number(teamId));

  const getRecentResults = (count = 5) =>
    [...results].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count);

  const getUpcomingFixtures = (count = 5) =>
    [...fixtures].filter(f => f.status === 'upcoming').sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, count);

  return (
    <LeagueContext.Provider value={{
      leagueInfo, teams, players, fixtures, results, news, awards,
      adminLoggedIn, loading, error,
      adminLogin, adminLogout,
      addTeam, updateTeam, deleteTeam,
      addPlayer, updatePlayer, deletePlayer,
      addFixture, updateFixture, deleteFixture,
      addResult, updateResult, deleteResult,
      addNews, updateNews, deleteNews,
      updateLeagueInfo, updateAwards,
      getTeamById, getPlayerById, getPlayersByTeam,
      getStandings, getTopScorers, getTopAssists,
      getCleanSheets, getDisciplinary,
      getResultsByTeam, getFixturesByTeam,
      getRecentResults, getUpcomingFixtures,
      reload: loadAll,
    }}>
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  return useContext(LeagueContext);
}
