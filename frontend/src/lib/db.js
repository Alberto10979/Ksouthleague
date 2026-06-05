import { supabase } from './supabase';

// ─── Transforms: DB (snake_case) ↔ App (camelCase) ───────────────────────────

const toTeam = r => ({
  id: r.id, name: r.name, shortName: r.short_name,
  primaryColor: r.primary_color, secondaryColor: r.secondary_color,
  stadium: r.stadium, capacity: r.capacity, manager: r.manager,
  founded: r.founded, description: r.description,
});
const fromTeam = t => ({
  name: t.name, short_name: t.shortName,
  primary_color: t.primaryColor || '#1a472a', secondary_color: t.secondaryColor || '#ffffff',
  stadium: t.stadium || '', capacity: Number(t.capacity) || 0,
  manager: t.manager || '', founded: t.founded || null,
  description: t.description || '',
});

const toPlayer = r => ({
  id: r.id, name: r.name, teamId: r.team_id, position: r.position,
  jerseyNumber: r.jersey_number, age: r.age, nationality: r.nationality,
  appearances: r.appearances, goals: r.goals, assists: r.assists,
  yellowCards: r.yellow_cards, redCards: r.red_cards, cleanSheets: r.clean_sheets,
});
const fromPlayer = p => ({
  name: p.name, team_id: Number(p.teamId), position: p.position,
  jersey_number: Number(p.jerseyNumber) || 0, age: Number(p.age) || 0,
  nationality: p.nationality || 'South African',
  appearances: Number(p.appearances) || 0, goals: Number(p.goals) || 0,
  assists: Number(p.assists) || 0, yellow_cards: Number(p.yellowCards) || 0,
  red_cards: Number(p.redCards) || 0, clean_sheets: Number(p.cleanSheets) || 0,
});

const toFixture = r => ({
  id: r.id, matchday: r.matchday, date: r.date, time: r.time,
  homeTeamId: r.home_team_id, awayTeamId: r.away_team_id,
  venue: r.venue, status: r.status,
});
const fromFixture = f => ({
  matchday: Number(f.matchday), date: f.date, time: f.time || '15:00',
  home_team_id: Number(f.homeTeamId), away_team_id: Number(f.awayTeamId),
  venue: f.venue || '', status: f.status || 'upcoming',
});

const toResult = r => ({
  id: r.id, matchday: r.matchday, date: r.date, time: r.time,
  homeTeamId: r.home_team_id, awayTeamId: r.away_team_id,
  homeScore: r.home_score, awayScore: r.away_score, venue: r.venue,
  scorers: r.scorers || [], yellowCards: r.yellow_cards || [],
  redCards: r.red_cards || [], motm: r.motm || null,
});
const fromResult = r => ({
  matchday: Number(r.matchday), date: r.date, time: r.time || '15:00',
  home_team_id: Number(r.homeTeamId), away_team_id: Number(r.awayTeamId),
  home_score: Number(r.homeScore) || 0, away_score: Number(r.awayScore) || 0,
  venue: r.venue || '', scorers: r.scorers || [],
  yellow_cards: r.yellowCards || [], red_cards: r.redCards || [],
  motm: r.motm || null,
});

const toNews = r => ({
  id: r.id, title: r.title, category: r.category, date: r.date,
  author: r.author, summary: r.summary, content: r.content,
  featured: r.featured, image: r.image || null,
});
const fromNews = n => ({
  title: n.title, category: n.category || 'League News', date: n.date,
  author: n.author || '', summary: n.summary || '',
  content: n.content || '', featured: Boolean(n.featured), image: n.image || null,
});

// ─── League Info ───────────────────────────────────────────────────────────────

const defaultLeagueInfo = {
  name: 'KSouth League', season: '2025/2026', currentMatchday: 1,
  totalMatchdays: 14, founded: '', headquarters: '', chairman: '', secretary: '', website: '',
};

export const getLeagueInfo = async () => {
  const { data, error } = await supabase.from('league_info').select('*').maybeSingle();
  if (error) throw error;
  if (!data) return defaultLeagueInfo;
  return {
    name: data.name, season: data.season,
    currentMatchday: data.current_matchday, totalMatchdays: data.total_matchdays,
    founded: data.founded, headquarters: data.headquarters,
    chairman: data.chairman, secretary: data.secretary, website: data.website,
  };
};

export const updateLeagueInfo = async (updates) => {
  const map = {
    name: 'name', season: 'season', currentMatchday: 'current_matchday',
    totalMatchdays: 'total_matchdays', founded: 'founded',
    headquarters: 'headquarters', chairman: 'chairman',
    secretary: 'secretary', website: 'website',
  };
  const payload = { id: 1 };
  Object.keys(updates).forEach(k => { if (map[k]) payload[map[k]] = updates[k]; });
  const { error } = await supabase.from('league_info').upsert(payload);
  if (error) throw error;
  return getLeagueInfo();
};

// ─── Teams ─────────────────────────────────────────────────────────────────────

export const getTeams = async () => {
  const { data, error } = await supabase.from('teams').select('*').order('id');
  if (error) throw error;
  return data.map(toTeam);
};
export const createTeam = async (team) => {
  const { data, error } = await supabase.from('teams').insert(fromTeam(team)).select().single();
  if (error) throw error;
  return toTeam(data);
};
export const updateTeam = async (id, team) => {
  const { data, error } = await supabase.from('teams').update(fromTeam(team)).eq('id', id).select().single();
  if (error) throw error;
  return toTeam(data);
};
export const deleteTeam = async (id) => {
  const { error } = await supabase.from('teams').delete().eq('id', id);
  if (error) throw error;
};

// ─── Players ───────────────────────────────────────────────────────────────────

export const getPlayers = async () => {
  const { data, error } = await supabase.from('players').select('*').order('team_id').order('id');
  if (error) throw error;
  return data.map(toPlayer);
};
export const createPlayer = async (player) => {
  const { data, error } = await supabase.from('players').insert(fromPlayer(player)).select().single();
  if (error) throw error;
  return toPlayer(data);
};
export const updatePlayer = async (id, player) => {
  const { data, error } = await supabase.from('players').update(fromPlayer(player)).eq('id', id).select().single();
  if (error) throw error;
  return toPlayer(data);
};
export const deletePlayer = async (id) => {
  const { error } = await supabase.from('players').delete().eq('id', id);
  if (error) throw error;
};

// ─── Fixtures ──────────────────────────────────────────────────────────────────

export const getFixtures = async () => {
  const { data, error } = await supabase.from('fixtures').select('*').order('matchday').order('date');
  if (error) throw error;
  return data.map(toFixture);
};
export const createFixture = async (fixture) => {
  const { data, error } = await supabase.from('fixtures').insert(fromFixture(fixture)).select().single();
  if (error) throw error;
  return toFixture(data);
};
export const updateFixture = async (id, fixture) => {
  const { data, error } = await supabase.from('fixtures').update(fromFixture(fixture)).eq('id', id).select().single();
  if (error) throw error;
  return toFixture(data);
};
export const deleteFixture = async (id) => {
  const { error } = await supabase.from('fixtures').delete().eq('id', id);
  if (error) throw error;
};

// ─── Results ───────────────────────────────────────────────────────────────────

export const getResults = async () => {
  const { data, error } = await supabase.from('results').select('*').order('matchday').order('date');
  if (error) throw error;
  return data.map(toResult);
};
export const createResult = async (result) => {
  const { data, error } = await supabase.from('results').insert(fromResult(result)).select().single();
  if (error) throw error;
  return toResult(data);
};
export const updateResult = async (id, result) => {
  const { data, error } = await supabase.from('results').update(fromResult(result)).eq('id', id).select().single();
  if (error) throw error;
  return toResult(data);
};
export const deleteResult = async (id) => {
  const { error } = await supabase.from('results').delete().eq('id', id);
  if (error) throw error;
};

// ─── News ──────────────────────────────────────────────────────────────────────

export const getNews = async () => {
  const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data.map(toNews);
};
export const createNews = async (article) => {
  const { data, error } = await supabase.from('news').insert(fromNews(article)).select().single();
  if (error) throw error;
  return toNews(data);
};
export const updateNews = async (id, article) => {
  const { data, error } = await supabase.from('news').update(fromNews(article)).eq('id', id).select().single();
  if (error) throw error;
  return toNews(data);
};
export const deleteNews = async (id) => {
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw error;
};

// ─── Awards ────────────────────────────────────────────────────────────────────

export const getAwards = async () => {
  const { data, error } = await supabase.from('awards').select('*').maybeSingle();
  if (error) throw error;
  if (!data) return { playerOfMonth: [], playerOfSeason: null, goldenBoot: null, playmakerAward: null, goldenGloves: null };
  return {
    playerOfMonth: data.player_of_month || [],
    playerOfSeason: data.player_of_season || null,
    goldenBoot: data.top_scorer_trophy || null,
    playmakerAward: data.playmaker_award || null,
    goldenGloves: data.best_goalkeeper_trophy || null,
  };
};
export const updateAwards = async (updates) => {
  const payload = { id: 1 };
  if (updates.playerOfMonth !== undefined) payload.player_of_month = updates.playerOfMonth;
  if (updates.playerOfSeason !== undefined) payload.player_of_season = updates.playerOfSeason;
  if (updates.goldenBoot !== undefined) payload.top_scorer_trophy = updates.goldenBoot;
  if (updates.playmakerAward !== undefined) payload.playmaker_award = updates.playmakerAward;
  if (updates.goldenGloves !== undefined) payload.best_goalkeeper_trophy = updates.goldenGloves;
  const { error } = await supabase.from('awards').upsert(payload);
  if (error) throw error;
  return getAwards();
};
