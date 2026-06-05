import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LeagueProvider, useLeague } from './context/LeagueContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import Players from './pages/Players';
import PlayerDetail from './pages/PlayerDetail';
import Fixtures from './pages/Fixtures';
import Results from './pages/Results';
import Standings from './pages/Standings';
import Statistics from './pages/Statistics';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Admin from './pages/Admin';
import './App.css';

function AppContent() {
  const { loading, error, reload } = useLeague();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-icon">⚽</div>
        <h2>KSouth League</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <div className="app-error-icon">⚠️</div>
        <h2>Connection Error</h2>
        <p>{error}</p>
        <p className="app-error-hint">Check your Supabase credentials and make sure the database tables exist.</p>
        <button className="btn btn-primary" onClick={reload}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/results" element={<Results />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <div className="page container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
              <h2>404 — Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
              <a href="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <LeagueProvider>
      <Router>
        <div className="app">
          <AppContent />
        </div>
      </Router>
    </LeagueProvider>
  );
}

export default App;
