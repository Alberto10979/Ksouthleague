import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

const CATEGORIES = ['All', 'League News', 'Match Report', 'Transfer', 'Announcement'];

export default function News() {
  const { news, leagueInfo } = useLeague();
  const [category, setCategory] = useState('All');

  const filtered = news.filter(n => category === 'All' || n.category === category);
  const featured = filtered.find(n => n.featured) || filtered[0];
  const rest = filtered.filter(n => n !== featured);

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <h1>News</h1>
          <p>Latest updates from {leagueInfo.name} — {leagueInfo.season}</p>
        </div>
      </div>

      <div className="container">
        {/* Category Filter */}
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-tab ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state-box"><p>No articles in this category.</p></div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <Link to={`/news/${featured.id}`} className="news-featured-hero">
                <div className="news-featured-overlay">
                  <span className="news-category-tag">{featured.category}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.summary}</p>
                  <div className="news-featured-meta">
                    <span>✍️ {featured.author}</span>
                    <span>📅 {new Date(featured.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Articles Grid */}
            {rest.length > 0 && (
              <div className="news-grid">
                {rest.map(article => (
                  <Link to={`/news/${article.id}`} key={article.id} className="news-card">
                    <div className="news-card-img-placeholder">
                      <span className="news-card-icon">📰</span>
                    </div>
                    <div className="news-card-body">
                      <span className="news-category-tag news-category-sm">{article.category}</span>
                      <h3 className="news-card-title">{article.title}</h3>
                      <p className="news-card-summary">{article.summary}</p>
                      <div className="news-card-meta">
                        <span>✍️ {article.author}</span>
                        <span>{new Date(article.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
