import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      // if not logged in, send them back to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <h2>Welcome, {user?.firstName || 'User'}!</h2>
        <p>
          Here you can manage your salon, view reports, and update your
          settings. This is just a starter layout; expand it with widgets,
          charts or navigation panels based on your requirements.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
