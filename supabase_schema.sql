-- ============================================================
--  KSouth League — Clean Database Setup (no seed data)
--  Paste into Supabase > SQL Editor > Run
-- ============================================================

-- Drop existing tables if re-running
DROP TABLE IF EXISTS results CASCADE;
DROP TABLE IF EXISTS fixtures CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS league_info CASCADE;
DROP TABLE IF EXISTS awards CASCADE;

-- ─── TABLES ───────────────────────────────────────────────────

CREATE TABLE league_info (
  id BIGINT PRIMARY KEY DEFAULT 1,
  name TEXT DEFAULT 'KSouth League',
  season TEXT DEFAULT '2025/2026',
  current_matchday INTEGER DEFAULT 1,
  total_matchdays INTEGER DEFAULT 14,
  founded TEXT DEFAULT '',
  headquarters TEXT DEFAULT '',
  chairman TEXT DEFAULT '',
  secretary TEXT DEFAULT '',
  website TEXT DEFAULT ''
);

CREATE TABLE teams (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  primary_color TEXT DEFAULT '#1a472a',
  secondary_color TEXT DEFAULT '#ffffff',
  stadium TEXT DEFAULT '',
  capacity INTEGER DEFAULT 0,
  manager TEXT DEFAULT '',
  founded INTEGER,
  description TEXT DEFAULT ''
);

CREATE TABLE players (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  team_id BIGINT REFERENCES teams(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  jersey_number INTEGER DEFAULT 0,
  age INTEGER DEFAULT 0,
  nationality TEXT DEFAULT 'South African',
  appearances INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  yellow_cards INTEGER DEFAULT 0,
  red_cards INTEGER DEFAULT 0,
  clean_sheets INTEGER DEFAULT 0
);

CREATE TABLE fixtures (
  id BIGSERIAL PRIMARY KEY,
  matchday INTEGER NOT NULL,
  date DATE NOT NULL,
  time TEXT DEFAULT '15:00',
  home_team_id BIGINT REFERENCES teams(id) ON DELETE CASCADE,
  away_team_id BIGINT REFERENCES teams(id) ON DELETE CASCADE,
  venue TEXT DEFAULT '',
  status TEXT DEFAULT 'upcoming'
);

CREATE TABLE results (
  id BIGSERIAL PRIMARY KEY,
  matchday INTEGER NOT NULL,
  date DATE NOT NULL,
  time TEXT DEFAULT '15:00',
  home_team_id BIGINT REFERENCES teams(id) ON DELETE CASCADE,
  away_team_id BIGINT REFERENCES teams(id) ON DELETE CASCADE,
  home_score INTEGER DEFAULT 0,
  away_score INTEGER DEFAULT 0,
  venue TEXT DEFAULT '',
  scorers JSONB DEFAULT '[]',
  yellow_cards JSONB DEFAULT '[]',
  red_cards JSONB DEFAULT '[]',
  motm JSONB
);

CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'League News',
  date DATE NOT NULL,
  author TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  content TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  image TEXT
);

CREATE TABLE awards (
  id BIGINT PRIMARY KEY DEFAULT 1,
  player_of_month JSONB DEFAULT '[]',
  player_of_season JSONB,
  top_scorer_trophy JSONB,
  best_goalkeeper_trophy JSONB
);

-- ─── DISABLE ROW LEVEL SECURITY ───────────────────────────────
ALTER TABLE league_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE players DISABLE ROW LEVEL SECURITY;
ALTER TABLE fixtures DISABLE ROW LEVEL SECURITY;
ALTER TABLE results DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE awards DISABLE ROW LEVEL SECURITY;

-- ─── INSERT EMPTY DEFAULTS ─────────────────────────────────────
-- Required so the app has a league_info and awards row to update
INSERT INTO league_info (id) VALUES (1);
INSERT INTO awards (id) VALUES (1);

SELECT 'Clean database ready. Add your teams and data via the Admin panel.' AS status;
