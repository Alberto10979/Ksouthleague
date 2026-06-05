import { useState } from 'react';
import { useLeague } from '../context/LeagueContext';

const ADMIN_PASSWORD = 'ksouth2026';
const POSITIONS = ['GK', 'DEF', 'MID', 'FWD'];

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default function Admin() {
  const {
    adminLoggedIn, adminLogin, adminLogout,
    teams, players, fixtures, results, news, awards, leagueInfo,
    addTeam, updateTeam, deleteTeam,
    addPlayer, updatePlayer, deletePlayer,
    addFixture, updateFixture, deleteFixture,
    addResult, updateResult, deleteResult,
    addNews, updateNews, deleteNews,
    updateLeagueInfo, updateAwards,
    getTeamById,
  } = useLeague();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState('');
  const [saving, setSaving] = useState(false);
  const [settingsForm, setSettingsForm] = useState(leagueInfo || {});

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) { adminLogin(); setLoginError(''); }
    else setLoginError('Incorrect password. Please try again.');
  };

  const openModal = (type, data = {}) => { setFormData(data); setModal({ type }); };
  const closeModal = () => { setModal(null); setFormData({}); };
  const handleField = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const withSave = async (fn, successMsg) => {
    setSaving(true);
    try {
      await fn();
      notify(successMsg);
      closeModal();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // ─── Save handlers ─────────────────────────────────────────────────────────

  const saveTeam = () => {
    if (!formData.name || !formData.shortName) return alert('Name and short name required.');
    withSave(
      () => formData.id ? updateTeam(formData) : addTeam(formData),
      formData.id ? 'Team updated.' : 'Team added.'
    );
  };

  const savePlayer = () => {
    if (!formData.name || !formData.teamId) return alert('Name and team required.');
    withSave(
      () => formData.id ? updatePlayer(formData) : addPlayer(formData),
      formData.id ? 'Player updated.' : 'Player added.'
    );
  };

  const saveFixture = () => {
    if (!formData.homeTeamId || !formData.awayTeamId || !formData.date) return alert('Home team, away team and date required.');
    if (Number(formData.homeTeamId) === Number(formData.awayTeamId)) return alert('Home and away teams must be different.');
    withSave(
      () => formData.id ? updateFixture(formData) : addFixture({ ...formData, status: 'upcoming' }),
      formData.id ? 'Fixture updated.' : 'Fixture added.'
    );
  };

  const saveResult = () => {
    if (!formData.homeTeamId || !formData.awayTeamId || !formData.date) return alert('Teams and date required.');
    withSave(
      () => formData.id ? updateResult(formData) : addResult({ ...formData, scorers: [], yellowCards: [], redCards: [] }),
      formData.id ? 'Result updated.' : 'Result recorded.'
    );
  };

  const saveNewsItem = () => {
    if (!formData.title || !formData.content) return alert('Title and content required.');
    withSave(
      () => formData.id ? updateNews({ ...formData, featured: formData.featured === 'true' || formData.featured === true }) : addNews({ ...formData, featured: formData.featured === 'true', date: formData.date || new Date().toISOString().split('T')[0] }),
      formData.id ? 'Article updated.' : 'Article published.'
    );
  };

  const handleDeleteTeam = async (t) => {
    if (!window.confirm(`Delete ${t.name}? This will also delete all their players.`)) return;
    try { await deleteTeam(t.id); notify('Team deleted.'); } catch (err) { alert('Error: ' + err.message); }
  };
  const handleDeletePlayer = async (p) => {
    if (!window.confirm(`Delete ${p.name}?`)) return;
    try { await deletePlayer(p.id); notify('Player deleted.'); } catch (err) { alert('Error: ' + err.message); }
  };
  const handleDeleteFixture = async (id) => {
    if (!window.confirm('Delete this fixture?')) return;
    try { await deleteFixture(id); notify('Fixture deleted.'); } catch (err) { alert('Error: ' + err.message); }
  };
  const handleDeleteResult = async (id) => {
    if (!window.confirm('Delete this result?')) return;
    try { await deleteResult(id); notify('Result deleted.'); } catch (err) { alert('Error: ' + err.message); }
  };
  const handleDeleteNews = async (n) => {
    if (!window.confirm(`Delete "${n.title}"?`)) return;
    try { await deleteNews(n.id); notify('Article deleted.'); } catch (err) { alert('Error: ' + err.message); }
  };

  const saveSettings = async () => {
    setSaving(true);
    try { await updateLeagueInfo(settingsForm); notify('Settings saved.'); }
    catch (err) { alert('Error: ' + err.message); }
    finally { setSaving(false); }
  };

  // ─── Login screen ──────────────────────────────────────────────────────────
  if (!adminLoggedIn) {
    return (
      <div className="page">
        <div className="admin-login-page">
          <div className="admin-login-card">
            <div className="admin-login-icon">🔐</div>
            <h2>Admin Portal</h2>
            <p>KSouth League Administration</p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password" className="form-input" autoFocus />
              </div>
              {loginError && <p className="form-error">{loginError}</p>}
              <button type="submit" className="btn btn-primary btn-full">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const adminTabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'teams', label: '🏟️ Teams' },
    { id: 'players', label: '👤 Players' },
    { id: 'fixtures', label: '📅 Fixtures' },
    { id: 'results', label: '⚽ Results' },
    { id: 'news', label: '📰 News' },
    { id: 'awards', label: '🏅 Awards' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  return (
    <div className="page admin-page">
      {notification && <div className="admin-notification">{notification}</div>}

      <div className="admin-header">
        <div className="container admin-header-inner">
          <div>
            <h1>Admin Panel</h1>
            <p>KSouth League — {leagueInfo?.season}</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={adminLogout}>Logout</button>
        </div>
      </div>

      <div className="container admin-layout">
        <nav className="admin-nav">
          {adminTabs.map(t => (
            <button key={t.id} className={`admin-nav-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="admin-content">

          {/* ── Overview ── */}
          {activeTab === 'overview' && (
            <div>
              <h2>Dashboard Overview</h2>
              <div className="admin-stats-grid">
                {[
                  { label: 'Teams', value: teams.length, icon: '🏟️' },
                  { label: 'Players', value: players.length, icon: '👤' },
                  { label: 'Fixtures', value: fixtures.length, icon: '📅' },
                  { label: 'Results', value: results.length, icon: '⚽' },
                  { label: 'News Articles', value: news.length, icon: '📰' },
                  { label: 'Total Goals', value: results.reduce((s, r) => s + r.homeScore + r.awayScore, 0), icon: '🥅' },
                ].map(s => (
                  <div key={s.label} className="admin-stat-card">
                    <span className="admin-stat-icon">{s.icon}</span>
                    <span className="admin-stat-value">{s.value}</span>
                    <span className="admin-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="admin-info-box">
                <p>Welcome to the KSouth League Admin Panel. All changes are saved directly to the database and are immediately visible to all visitors on any device.</p>
              </div>
            </div>
          )}

          {/* ── Teams ── */}
          {activeTab === 'teams' && (
            <div>
              <div className="admin-section-header">
                <h2>Manage Teams</h2>
                <button className="btn btn-primary btn-sm" onClick={() => openModal('team', { primaryColor: '#1a472a', secondaryColor: '#ffffff' })}>+ Add Team</button>
              </div>
              <table className="admin-table">
                <thead><tr><th>Badge</th><th>Name</th><th>Manager</th><th>Stadium</th><th>Founded</th><th>Actions</th></tr></thead>
                <tbody>
                  {teams.map(t => (
                    <tr key={t.id}>
                      <td><div className="team-badge team-badge-sm" style={{ background: t.primaryColor, color: t.secondaryColor }}>{t.shortName}</div></td>
                      <td><strong>{t.name}</strong></td>
                      <td>{t.manager}</td>
                      <td>{t.stadium}</td>
                      <td>{t.founded}</td>
                      <td>
                        <button className="btn-action btn-edit" onClick={() => openModal('team', { ...t })}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => handleDeleteTeam(t)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Players ── */}
          {activeTab === 'players' && (
            <div>
              <div className="admin-section-header">
                <h2>Manage Players</h2>
                <button className="btn btn-primary btn-sm" onClick={() => openModal('player', { position: 'FWD', nationality: 'South African' })}>+ Add Player</button>
              </div>
              <table className="admin-table">
                <thead><tr><th>#</th><th>Name</th><th>Team</th><th>Pos</th><th>Goals</th><th>Assists</th><th>Apps</th><th>Actions</th></tr></thead>
                <tbody>
                  {players.map(p => {
                    const team = getTeamById(p.teamId);
                    return (
                      <tr key={p.id}>
                        <td><span className="jersey-sm">{p.jerseyNumber}</span></td>
                        <td><strong>{p.name}</strong></td>
                        <td><div className="team-badge team-badge-xs" style={{ background: team?.primaryColor, color: team?.secondaryColor }}>{team?.shortName}</div></td>
                        <td><span className={`position-badge pos-${p.position.toLowerCase()}`}>{p.position}</span></td>
                        <td>{p.goals}</td><td>{p.assists}</td><td>{p.appearances}</td>
                        <td>
                          <button className="btn-action btn-edit" onClick={() => openModal('player', { ...p })}>Edit</button>
                          <button className="btn-action btn-delete" onClick={() => handleDeletePlayer(p)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Fixtures ── */}
          {activeTab === 'fixtures' && (
            <div>
              <div className="admin-section-header">
                <h2>Manage Fixtures</h2>
                <button className="btn btn-primary btn-sm" onClick={() => openModal('fixture', { matchday: leagueInfo?.currentMatchday || 1, time: '15:00', status: 'upcoming' })}>+ Add Fixture</button>
              </div>
              <table className="admin-table">
                <thead><tr><th>MD</th><th>Date</th><th>Home</th><th>Away</th><th>Venue</th><th>Actions</th></tr></thead>
                <tbody>
                  {[...fixtures].sort((a, b) => a.matchday - b.matchday).map(f => {
                    const home = getTeamById(f.homeTeamId);
                    const away = getTeamById(f.awayTeamId);
                    return (
                      <tr key={f.id}>
                        <td>MD{f.matchday}</td>
                        <td>{new Date(f.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td>{home?.name}</td><td>{away?.name}</td><td>{f.venue}</td>
                        <td>
                          <button className="btn-action btn-edit" onClick={() => openModal('fixture', { ...f })}>Edit</button>
                          <button className="btn-action btn-delete" onClick={() => handleDeleteFixture(f.id)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Results ── */}
          {activeTab === 'results' && (
            <div>
              <div className="admin-section-header">
                <h2>Manage Results</h2>
                <button className="btn btn-primary btn-sm" onClick={() => openModal('result', { matchday: 1, homeScore: 0, awayScore: 0 })}>+ Add Result</button>
              </div>
              <table className="admin-table">
                <thead><tr><th>MD</th><th>Date</th><th>Match</th><th>Score</th><th>MOTM</th><th>Actions</th></tr></thead>
                <tbody>
                  {[...results].sort((a, b) => b.matchday - a.matchday).map(r => {
                    const home = getTeamById(r.homeTeamId);
                    const away = getTeamById(r.awayTeamId);
                    return (
                      <tr key={r.id}>
                        <td>MD{r.matchday}</td>
                        <td>{new Date(r.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</td>
                        <td>{home?.shortName} vs {away?.shortName}</td>
                        <td><strong>{r.homeScore} – {r.awayScore}</strong></td>
                        <td>{r.motm?.playerName || '—'}</td>
                        <td>
                          <button className="btn-action btn-edit" onClick={() => openModal('result', { ...r })}>Edit</button>
                          <button className="btn-action btn-delete" onClick={() => handleDeleteResult(r.id)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── News ── */}
          {activeTab === 'news' && (
            <div>
              <div className="admin-section-header">
                <h2>Manage News</h2>
                <button className="btn btn-primary btn-sm" onClick={() => openModal('news', { category: 'League News', author: 'Admin', featured: false, date: new Date().toISOString().split('T')[0] })}>+ Add Article</button>
              </div>
              <table className="admin-table">
                <thead><tr><th>Date</th><th>Title</th><th>Category</th><th>Author</th><th>Featured</th><th>Actions</th></tr></thead>
                <tbody>
                  {news.map(n => (
                    <tr key={n.id}>
                      <td>{new Date(n.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td><strong>{n.title}</strong></td>
                      <td><span className="news-category-tag news-category-sm">{n.category}</span></td>
                      <td>{n.author}</td>
                      <td>{n.featured ? '⭐' : '—'}</td>
                      <td>
                        <button className="btn-action btn-edit" onClick={() => openModal('news', { ...n })}>Edit</button>
                        <button className="btn-action btn-delete" onClick={() => handleDeleteNews(n)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Awards ── */}
          {activeTab === 'awards' && (
            <div>
              <h2>Awards & Honours</h2>
              <div className="awards-admin-grid">
                <div className="awards-admin-card">
                  <h3>🏅 Player of the Month</h3>
                  {awards.playerOfMonth?.map((a, i) => (
                    <div key={i} className="award-admin-item">
                      <strong>{a.month}</strong>: {a.playerName} ({getTeamById(a.teamId)?.shortName})
                      <p className="text-muted">{a.reason}</p>
                    </div>
                  ))}
                  <button className="btn btn-outline btn-sm" style={{ marginTop: '0.75rem' }}
                    onClick={() => openModal('award', { month: '', playerId: '', playerName: '', teamId: '', reason: '' })}>
                    + Add Award
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Settings ── */}
          {activeTab === 'settings' && (
            <div>
              <h2>League Settings</h2>
              <div className="settings-form">
                {[
                  { key: 'name', label: 'League Name' },
                  { key: 'season', label: 'Season' },
                  { key: 'headquarters', label: 'Headquarters' },
                  { key: 'chairman', label: 'Chairman' },
                  { key: 'secretary', label: 'Secretary' },
                  { key: 'website', label: 'Website' },
                ].map(field => (
                  <div key={field.key} className="settings-field">
                    <label>{field.label}</label>
                    <input className="form-input" value={settingsForm[field.key] || ''}
                      onChange={e => setSettingsForm(prev => ({ ...prev, [field.key]: e.target.value }))} />
                  </div>
                ))}
                <button className="btn btn-primary" disabled={saving} onClick={saveSettings} style={{ marginTop: '1rem' }}>
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Modals ─────────────────────────────────────────────────────────── */}

      {modal?.type === 'team' && (
        <Modal title={formData.id ? 'Edit Team' : 'Add Team'} onClose={closeModal}>
          <div className="modal-form">
            {[
              { key: 'name', label: 'Team Name *' },
              { key: 'shortName', label: 'Short Name (3 letters) *' },
              { key: 'manager', label: 'Manager' },
              { key: 'stadium', label: 'Stadium' },
              { key: 'founded', label: 'Founded Year', type: 'number' },
              { key: 'capacity', label: 'Stadium Capacity', type: 'number' },
            ].map(f => (
              <div key={f.key} className="form-group">
                <label>{f.label}</label>
                <input className="form-input" type={f.type || 'text'} value={formData[f.key] || ''} onChange={e => handleField(f.key, e.target.value)} />
              </div>
            ))}
            <div className="form-row-2">
              <div className="form-group">
                <label>Primary Colour</label>
                <input className="form-input" type="color" value={formData.primaryColor || '#1a472a'} onChange={e => handleField('primaryColor', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Secondary Colour</label>
                <input className="form-input" type="color" value={formData.secondaryColor || '#ffffff'} onChange={e => handleField('secondaryColor', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-input" rows={3} value={formData.description || ''} onChange={e => handleField('description', e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={saveTeam}>{saving ? 'Saving...' : 'Save Team'}</button>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'player' && (
        <Modal title={formData.id ? 'Edit Player' : 'Add Player'} onClose={closeModal}>
          <div className="modal-form">
            <div className="form-group">
              <label>Name *</label>
              <input className="form-input" value={formData.name || ''} onChange={e => handleField('name', e.target.value)} />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Team *</label>
                <select className="form-input" value={formData.teamId || ''} onChange={e => handleField('teamId', e.target.value)}>
                  <option value="">Select team...</option>
                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Position</label>
                <select className="form-input" value={formData.position || 'FWD'} onChange={e => handleField('position', e.target.value)}>
                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Jersey #</label>
                <input className="form-input" type="number" value={formData.jerseyNumber || ''} onChange={e => handleField('jerseyNumber', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input className="form-input" type="number" value={formData.age || ''} onChange={e => handleField('age', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Nationality</label>
              <input className="form-input" value={formData.nationality || ''} onChange={e => handleField('nationality', e.target.value)} />
            </div>
            <div className="form-row-3">
              {['appearances', 'goals', 'assists', 'yellowCards', 'redCards', 'cleanSheets'].map(key => (
                <div key={key} className="form-group">
                  <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                  <input className="form-input" type="number" min="0" value={formData[key] ?? 0} onChange={e => handleField(key, e.target.value)} />
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={savePlayer}>{saving ? 'Saving...' : 'Save Player'}</button>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'fixture' && (
        <Modal title={formData.id ? 'Edit Fixture' : 'Add Fixture'} onClose={closeModal}>
          <div className="modal-form">
            <div className="form-row-2">
              <div className="form-group">
                <label>Matchday</label>
                <input className="form-input" type="number" value={formData.matchday || ''} onChange={e => handleField('matchday', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date *</label>
                <input className="form-input" type="date" value={formData.date || ''} onChange={e => handleField('date', e.target.value)} />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Time</label>
                <input className="form-input" type="time" value={formData.time || '15:00'} onChange={e => handleField('time', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input className="form-input" value={formData.venue || ''} onChange={e => handleField('venue', e.target.value)} />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Home Team *</label>
                <select className="form-input" value={formData.homeTeamId || ''} onChange={e => handleField('homeTeamId', e.target.value)}>
                  <option value="">Select...</option>
                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Away Team *</label>
                <select className="form-input" value={formData.awayTeamId || ''} onChange={e => handleField('awayTeamId', e.target.value)}>
                  <option value="">Select...</option>
                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={saveFixture}>{saving ? 'Saving...' : 'Save Fixture'}</button>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'result' && (
        <Modal title={formData.id ? 'Edit Result' : 'Record Result'} onClose={closeModal}>
          <div className="modal-form">
            <div className="form-row-2">
              <div className="form-group">
                <label>Matchday</label>
                <input className="form-input" type="number" value={formData.matchday || ''} onChange={e => handleField('matchday', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date *</label>
                <input className="form-input" type="date" value={formData.date || ''} onChange={e => handleField('date', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Venue</label>
              <input className="form-input" value={formData.venue || ''} onChange={e => handleField('venue', e.target.value)} />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Home Team *</label>
                <select className="form-input" value={formData.homeTeamId || ''} onChange={e => handleField('homeTeamId', e.target.value)}>
                  <option value="">Select...</option>
                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Away Team *</label>
                <select className="form-input" value={formData.awayTeamId || ''} onChange={e => handleField('awayTeamId', e.target.value)}>
                  <option value="">Select...</option>
                  {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Home Score</label>
                <input className="form-input" type="number" min="0" value={formData.homeScore ?? 0} onChange={e => handleField('homeScore', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Away Score</label>
                <input className="form-input" type="number" min="0" value={formData.awayScore ?? 0} onChange={e => handleField('awayScore', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Man of the Match (name)</label>
              <input className="form-input" value={formData.motm?.playerName || ''} onChange={e => handleField('motm', { playerName: e.target.value })} placeholder="Player name" />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={saveResult}>{saving ? 'Saving...' : 'Save Result'}</button>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'news' && (
        <Modal title={formData.id ? 'Edit Article' : 'New Article'} onClose={closeModal}>
          <div className="modal-form">
            <div className="form-group">
              <label>Title *</label>
              <input className="form-input" value={formData.title || ''} onChange={e => handleField('title', e.target.value)} />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Category</label>
                <select className="form-input" value={formData.category || 'League News'} onChange={e => handleField('category', e.target.value)}>
                  {['League News', 'Match Report', 'Transfer', 'Announcement'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Author</label>
                <input className="form-input" value={formData.author || ''} onChange={e => handleField('author', e.target.value)} />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Date</label>
                <input className="form-input" type="date" value={formData.date || ''} onChange={e => handleField('date', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Featured?</label>
                <select className="form-input" value={formData.featured ? 'true' : 'false'} onChange={e => handleField('featured', e.target.value)}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Summary</label>
              <textarea className="form-input" rows={2} value={formData.summary || ''} onChange={e => handleField('summary', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Content *</label>
              <textarea className="form-input" rows={6} value={formData.content || ''} onChange={e => handleField('content', e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={saveNewsItem}>{saving ? 'Publishing...' : 'Publish Article'}</button>
            </div>
          </div>
        </Modal>
      )}

      {modal?.type === 'award' && (
        <Modal title="Add Player of the Month" onClose={closeModal}>
          <div className="modal-form">
            <div className="form-group">
              <label>Month (e.g. May 2026)</label>
              <input className="form-input" value={formData.month || ''} onChange={e => handleField('month', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Player</label>
              <select className="form-input" value={formData.playerId || ''} onChange={e => handleField('playerId', e.target.value)}>
                <option value="">Select player...</option>
                {players.map(p => <option key={p.id} value={p.id}>{p.name} ({getTeamById(p.teamId)?.shortName})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea className="form-input" rows={2} value={formData.reason || ''} onChange={e => handleField('reason', e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={async () => {
                const selected = players.find(p => p.id === Number(formData.playerId));
                if (!selected || !formData.month) return alert('Player and month required.');
                setSaving(true);
                try {
                  const newAward = { month: formData.month, playerId: selected.id, playerName: selected.name, teamId: selected.teamId, reason: formData.reason || '' };
                  await updateAwards({ playerOfMonth: [...(awards.playerOfMonth || []), newAward] });
                  notify('Award added.');
                  closeModal();
                } catch (err) { alert('Error: ' + err.message); }
                finally { setSaving(false); }
              }}>{saving ? 'Saving...' : 'Save Award'}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
