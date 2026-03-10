import React from 'react';
import type { CustomerFormState, CustomerItem } from '../../types/dashboard';

interface Props {
  customers: CustomerItem[];
  loading: boolean;
  error: string | null;
  editingCustomerId: string | null;
  form: CustomerFormState;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancelEdit: () => void;
  onEdit: (customer: CustomerItem) => void;
  onToggleStatus: (customer: CustomerItem) => Promise<void>;
}

const CustomersScreen: React.FC<Props> = ({
  customers,
  loading,
  error,
  editingCustomerId,
  form,
  onFormChange,
  onSubmit,
  onCancelEdit,
  onEdit,
  onToggleStatus,
}) => (
  <section className="dashboard-panel services-panel">
    <h2>Customers</h2>
    {loading && <p>Loading customers...</p>}
    {error && <p>{error}</p>}

    <form className="service-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="form-field">
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onFormChange}
            placeholder="Enter customer name"
            required
          />
        </label>

        <label className="form-field">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onFormChange}
            placeholder="Enter email"
            required
          />
        </label>

        <label className="form-field">
          Phone
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={onFormChange}
            placeholder="Enter phone"
            required
          />
        </label>

        <label className="form-field">
          Date of Birth
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={onFormChange} />
        </label>
      </div>

      <label className="form-field">
        Notes
        <textarea
          name="notes"
          rows={2}
          value={form.notes}
          onChange={onFormChange}
          placeholder="Notes (optional)"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingCustomerId ? 'Update Customer' : 'Add Customer'}
        </button>
        {editingCustomerId && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    {!loading && !error && customers.length === 0 && <p>No customers data found.</p>}
    {!loading && customers.length > 0 && (
      <div className="services-table-wrap">
        <table className="services-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Total Appointments</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.name || '-'}</td>
                <td>{customer.email || '-'}</td>
                <td>{customer.phone || '-'}</td>
                <td>{customer.dateOfBirth || '-'}</td>
                <td>{customer.totalAppointments}</td>
                <td>{customer.isActive ? 'Active' : 'Inactive'}</td>
                <td>{customer.notes || '-'}</td>
                <td className="action-cell">
                  <button type="button" className="table-btn edit-btn" onClick={() => onEdit(customer)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`table-btn ${customer.isActive ? 'deactivate-btn' : 'activate-btn'}`}
                    onClick={() => {
                      void onToggleStatus(customer);
                    }}
                  >
                    {customer.isActive ? 'Deactivate' : 'Activate'}
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

export default CustomersScreen;

