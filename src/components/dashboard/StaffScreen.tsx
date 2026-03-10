import React from 'react';
import type { StaffFormState, StaffItem } from '../../types/dashboard';

interface Props {
  staff: StaffItem[];
  loading: boolean;
  error: string | null;
  editingStaffId: string | null;
  form: StaffFormState;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancelEdit: () => void;
  onEdit: (staffMember: StaffItem) => void;
  onToggleStatus: (staffMember: StaffItem) => Promise<void>;
}

const StaffScreen: React.FC<Props> = ({
  staff,
  loading,
  error,
  editingStaffId,
  form,
  onFormChange,
  onSubmit,
  onCancelEdit,
  onEdit,
  onToggleStatus,
}) => (
  <section className="dashboard-panel services-panel">
    <h2>Staff</h2>
    {loading && <p>Loading staff...</p>}
    {error && <p>{error}</p>}

    <form className="service-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="form-field">
          First Name
          <input type="text" name="firstName" value={form.firstName} onChange={onFormChange} required />
        </label>
        <label className="form-field">
          Last Name
          <input type="text" name="lastName" value={form.lastName} onChange={onFormChange} required />
        </label>
        <label className="form-field">
          Email
          <input type="email" name="email" value={form.email} onChange={onFormChange} required />
        </label>
      </div>

      <div className="form-grid">
        <label className="form-field">
          Phone
          <input type="text" name="phone" value={form.phone} onChange={onFormChange} required />
        </label>
        <label className="form-field">
          Specialization
          <input
            type="text"
            name="specialization"
            value={form.specialization}
            onChange={onFormChange}
            required
          />
        </label>
        <label className="form-field">
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onFormChange}
            placeholder={editingStaffId ? 'Leave blank to keep unchanged' : 'Enter password'}
            required={!editingStaffId}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingStaffId ? 'Update Staff' : 'Add Staff'}
        </button>
        {editingStaffId && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    {!loading && !error && staff.length === 0 && <p>No staff data found.</p>}
    {!loading && staff.length > 0 && (
      <div className="services-table-wrap">
        <table className="services-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember.staffId}>
                <td>{staffMember.firstName || '-'}</td>
                <td>{staffMember.lastName || '-'}</td>
                <td>{staffMember.email || '-'}</td>
                <td>{staffMember.phone || '-'}</td>
                <td>{staffMember.specialization || '-'}</td>
                <td>{staffMember.isActive ? 'Active' : 'Inactive'}</td>
                <td className="action-cell">
                  <button type="button" className="table-btn edit-btn" onClick={() => onEdit(staffMember)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`table-btn ${staffMember.isActive ? 'deactivate-btn' : 'activate-btn'}`}
                    onClick={() => {
                      void onToggleStatus(staffMember);
                    }}
                  >
                    {staffMember.isActive ? 'Deactivate' : 'Activate'}
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

export default StaffScreen;

