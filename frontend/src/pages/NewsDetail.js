import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';

export default function NewsDetail() {
  const { id } = useParams();
  const { news } = useLeague();
  const article = news.find(n => n.id === Number(id));
  const related = news.filter(n => n.id !== Number(id) && n.category === article?.category).slice(0, 3);

  if (!article) return <div className="page container"><p>Article not found.</p><Link to="/news" className="btn btn-outline">Back to News</Link></div>;

  return (
    <div className="page">
      <div className="container news-detail-layout">
        <div className="news-detail-main">
          <div className="news-detail-header">
            <Link to="/news" className="back-link">← Back to News</Link>
            <span className="news-category-tag">{article.category}</span>
          </div>
          <h1 className="news-detail-title">{article.title}</h1>
          <div className="news-detail-meta">
            <span>✍️ By {article.author}</span>
            <span>📅 {new Date(article.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="news-detail-summary">{article.summary}</div>
          <div className="news-detail-img-placeholder">
            <span>📰 {article.category}</span>
          </div>
          <div className="news-detail-content">
            {article.content.split('\n').map((para, i) => {
              if (!para.trim()) return null;
              // Handle bold markdown
              if (para.startsWith('**') || para.includes('**')) {
                const formatted = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
              }
              return <p key={i}>{para}</p>;
            })}
          </div>
        </div>

        <aside className="news-detail-sidebar">
          <div className="sidebar-section">
            <h3>Related Articles</h3>
            {related.length === 0 ? <p className="text-muted">No related articles.</p> : related.map(n => (
              <Link to={`/news/${n.id}`} key={n.id} className="related-article-card">
                <span className="news-category-tag news-category-sm">{n.category}</span>
                <h4>{n.title}</h4>
                <span className="news-date">{new Date(n.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
