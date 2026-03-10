import React from 'react';
import type { AppointmentFormState, AppointmentItem } from '../../types/dashboard';

interface Props {
  appointments: AppointmentItem[];
  loading: boolean;
  error: string | null;
  editingAppointmentId: string | null;
  form: AppointmentFormState;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancelEdit: () => void;
  onEdit: (appointment: AppointmentItem) => void;
  onToggleStatus: (appointment: AppointmentItem) => Promise<void>;
}

const formatDateTime = (value: string): string => {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
};

const AppointmentsScreen: React.FC<Props> = ({
  appointments,
  loading,
  error,
  editingAppointmentId,
  form,
  onFormChange,
  onSubmit,
  onCancelEdit,
  onEdit,
  onToggleStatus,
}) => (
  <section className="dashboard-panel services-panel">
    <h2>Appointments</h2>
    {loading && <p>Loading appointments...</p>}
    {error && <p>{error}</p>}

    <form className="service-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="form-field">
          Appointment Date
          <input
            type="datetime-local"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={onFormChange}
            required
          />
        </label>

        <label className="form-field">
          Customer Name
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={onFormChange}
            required
          />
        </label>

        <label className="form-field">
          Staff Name
          <input
            type="text"
            name="staffName"
            value={form.staffName}
            onChange={onFormChange}
            required
          />
        </label>

        <label className="form-field">
          Services (comma separated)
          <input
            type="text"
            name="services"
            value={form.services}
            onChange={onFormChange}
            placeholder="Haircut, Facial"
            required
          />
        </label>

        <label className="form-field">
          Status
          <input type="text" name="status" value={form.status} onChange={onFormChange} required />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingAppointmentId ? 'Update Appointment' : 'Add Appointment'}
        </button>
        {editingAppointmentId && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    {!loading && !error && appointments.length === 0 && <p>No appointments data found.</p>}
    {!loading && appointments.length > 0 && (
      <div className="services-table-wrap">
        <table className="services-table">
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Appointment ID</th>
              <th>Customer Name</th>
              <th>Services</th>
              <th>Staff Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((row, index) => (
              <tr key={row.appointmentId || String(index)}>
                <td>{formatDateTime(row.appointmentDate)}</td>
                <td>{row.appointmentId || '-'}</td>
                <td>{row.customerName || '-'}</td>
                <td>{row.services.length > 0 ? row.services.join(', ') : '-'}</td>
                <td>{row.staffName || '-'}</td>
                <td>{row.status || '-'}</td>
                <td className="action-cell">
                  <button type="button" className="table-btn edit-btn" onClick={() => onEdit(row)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`table-btn ${row.status.toLowerCase() === 'cancelled' ? 'activate-btn' : 'deactivate-btn'}`}
                    onClick={() => {
                      void onToggleStatus(row);
                    }}
                  >
                    {row.status.toLowerCase() === 'cancelled' ? 'Activate' : 'Deactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default AppointmentsScreen;
