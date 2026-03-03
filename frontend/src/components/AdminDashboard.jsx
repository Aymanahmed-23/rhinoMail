import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [showAddContent, setShowAddContent] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [notifySubscribers, setNotifySubscribers] = useState(true);
  const [status, setStatus] = useState('');

  const [subscribers] = useState([
    { id: 1, email: 'user@example.com', date: '2024-01-15' },
    { id: 2, email: 'dev@example.com', date: '2024-01-16' },
    { id: 3, email: 'test@example.com', date: '2024-01-17' },
  ]);

  const [contents] = useState([
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      description: 'Learn the fundamentals of React Hooks',
      link: 'https://example.com/react-hooks',
      date: '2024-01-10',
    },
    {
      id: 2,
      title: 'Building REST APIs with Node.js',
      description: 'Complete guide to building scalable APIs',
      link: 'https://example.com/nodejs-api',
      date: '2024-01-12',
    },
  ]);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Adding content...');

    console.log('New content:', {
      title,
      description,
      link,
      notifySubscribers,
    });

    setStatus('Content added successfully!');
    setTitle('');
    setDescription('');
    setLink('');
    setNotifySubscribers(true);
    setShowAddContent(false);

    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h2 className="dashboard-logo">rhinoMail Admin</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-actions">
            <h1 className="dashboard-title">Dashboard</h1>
            <button
              onClick={() => setShowAddContent(!showAddContent)}
              className="add-content-btn"
            >
              {showAddContent ? 'Cancel' : '+ Add Content'}
            </button>
          </div>

          {status && <div className="success-message">{status}</div>}

          {showAddContent && (
            <div className="add-content-card">
              <h3 className="card-title">Add New Content</h3>
              <form onSubmit={handleSubmit} className="content-form">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., Introduction to TypeScript"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Short Description *</label>
                  <textarea
                    id="description"
                    placeholder="Brief description of the content"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="link">Link (optional)</label>
                  <input
                    id="link"
                    type="url"
                    placeholder="https://example.com/article"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-checkbox">
                  <input
                    id="notify"
                    type="checkbox"
                    checked={notifySubscribers}
                    onChange={(e) => setNotifySubscribers(e.target.checked)}
                  />
                  <label htmlFor="notify">Notify all subscribers via email</label>
                </div>

                <button type="submit" className="submit-content-btn">
                  Add Content & Notify
                </button>
              </form>
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number">{subscribers.length}</h3>
              <p className="stat-label">Total Subscribers</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">{contents.length}</h3>
              <p className="stat-label">Content Published</p>
            </div>
          </div>

          <div className="data-section">
            <h3 className="section-title">Recent Content</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Link</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((content) => (
                    <tr key={content.id}>
                      <td className="table-title">{content.title}</td>
                      <td>{content.description}</td>
                      <td>
                        {content.link && (
                          <a
                            href={content.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="table-link"
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td>{content.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="data-section">
            <h3 className="section-title">Subscribers</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Subscribed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td>{subscriber.email}</td>
                      <td>{subscriber.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
