import React from 'react';
import type { MenuKey, SummaryItem } from '../../types/dashboard';

interface Props {
  summary: SummaryItem[];
  onChangeMenu: (menu: MenuKey) => void;
}

const DashboardHomeScreen: React.FC<Props> = ({ summary, onChangeMenu }) => (
  <>
    <section className="summary-grid">
      {summary.map((item) => (
        <article className="summary-card" key={item.title}>
          <div className="summary-head">
            <h3>{item.title}</h3>
            <span className={`summary-trend ${item.trendType}`}>{item.trend}</span>
          </div>
          <p className="summary-value">{item.value}</p>
        </article>
      ))}
    </section>

    <section className="dashboard-overview-grid">
      <article className="dashboard-panel">
        <h2>Overview</h2>
        <p>
          Track daily appointments, monitor staffing, and quickly switch to Services,
          Customers, Users, Staff, or Appointments from the sidebar.
        </p>
      </article>
      <article className="dashboard-panel quick-actions-panel">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button type="button" className="quick-action-btn" onClick={() => onChangeMenu('services')}>
            Add Service
          </button>
          <button
            type="button"
            className="quick-action-btn"
            onClick={() => onChangeMenu('appointments')}
          >
            View Appointments
          </button>
          <button type="button" className="quick-action-btn" onClick={() => onChangeMenu('customers')}>
            Open Customers
          </button>
        </div>
      </article>
    </section>
  </>
);

export default DashboardHomeScreen;

