import { useState } from 'react';
import { subscriptionAPI } from '../api';
import './Landing.css';

function Landing() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus('Please enter your email');
      return;
    }

    setLoading(true);
    setStatus('Subscribing...');

    try {
      await subscriptionAPI.subscribe(email);
      setStatus('Check your email to verify your subscription!');
      setEmail('');
    } catch (error) {
      setStatus(error.message || 'Subscription failed. Please try again.');
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <div className="landing">
      <nav className="nav">
        <div className="nav-content">
          <h2 className="logo">rhinoMail</h2>
        </div>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Get notified when we add new tech articles or tools
          </h1>
          <p className="hero-description">
            Stay updated with the latest tech insights, tutorials, and developer tools.
            Join our community of developers.
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                disabled={loading}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Subscribing...' : 'Notify Me'}
              </button>
            </div>
            {status && <p className="status-message">{status}</p>}
          </form>

          <p className="trust-note">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 rhinoMail. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;