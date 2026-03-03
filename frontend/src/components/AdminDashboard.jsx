import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, subscriptionAPI } from '../api';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [showAddContent, setShowAddContent] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [notifySubscribers, setNotifySubscribers] = useState(true);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // Check if user is authenticated
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      navigate('/admin/login');
      return;
    }
    setToken(storedToken);
    fetchSubscribers(storedToken);
  }, [navigate]);

  const fetchSubscribers = async (authToken) => {
    try {
      const data = await subscriptionAPI.getAllSubscribers(authToken);
      setSubscribers(data.subscribers || data || []);
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
      setStatus('Failed to load subscribers');
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      navigate('/admin/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Adding content...');

    try {
      const newsletterData = {
        title,
        description,
        link,
      };

      if (notifySubscribers) {
        await subscriptionAPI.sendNewsletter(token, newsletterData);
      }

      // Add to contents list (in real app, this would come from backend)
      const newContent = {
        id: contents.length + 1,
        title,
        description,
        link,
        date: new Date().toISOString().split('T')[0],
      };
      setContents([newContent, ...contents]);

      setStatus('Content added and subscribers notified!');
      setTitle('');
      setDescription('');
      setLink('');
      setNotifySubscribers(true);
      setShowAddContent(false);
    } catch (error) {
      setStatus(error.message || 'Failed to add content');
      console.error('Add content error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 4000);
    }
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>

                <div className="form-checkbox">
                  <input
                    id="notify"
                    type="checkbox"
                    checked={notifySubscribers}
                    onChange={(e) => setNotifySubscribers(e.target.checked)}
                    disabled={loading}
                  />
                  <label htmlFor="notify">Notify all subscribers via email</label>
                </div>

                <button type="submit" className="submit-content-btn" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Content & Notify'}
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
                  {contents.length > 0 ? (
                    contents.map((content) => (
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                        No content yet
                      </td>
                    </tr>
                  )}
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
                  {subscribers.length > 0 ? (
                    subscribers.map((subscriber) => (
                      <tr key={subscriber.id || subscriber.email}>
                        <td>{subscriber.email}</td>
                        <td>{subscriber.subscribedDate || subscriber.date || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                        No subscribers yet
                      </td>
                    </tr>
                  )}
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