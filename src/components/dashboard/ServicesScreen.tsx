import React from 'react';
import type { ServiceItem } from '../../types/dashboard';

interface ServiceForm {
  name: string;
  durationMinutes: string;
  price: string;
}

interface Props {
  services: ServiceItem[];
  loading: boolean;
  error: string | null;
  editingServiceId: string | null;
  form: ServiceForm;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancelEdit: () => void;
  onEdit: (service: ServiceItem) => void;
  onToggleStatus: (service: ServiceItem) => Promise<void>;
}

const ServicesScreen: React.FC<Props> = ({
  services,
  loading,
  error,
  editingServiceId,
  form,
  onFormChange,
  onSubmit,
  onCancelEdit,
  onEdit,
  onToggleStatus,
}) => (
  <section className="dashboard-panel services-panel">
    <div className="panel-header">
      <h2>Services CRUD</h2>
      <span className="panel-count">{services.length} Services</span>
    </div>
    {loading && <p>Loading services...</p>}
    {error && <p>{error}</p>}

    <form className="service-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="form-field">
          Service Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onFormChange}
            placeholder="Enter service name"
            required
          />
        </label>

        <label className="form-field">
          Duration (mins)
          <input
            type="number"
            name="durationMinutes"
            min={1}
            value={form.durationMinutes}
            onChange={onFormChange}
            placeholder="45"
            required
          />
        </label>

        <label className="form-field">
          Price (INR)
          <input
            type="number"
            name="price"
            min={1}
            value={form.price}
            onChange={onFormChange}
            placeholder="299"
            required
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingServiceId ? 'Update Service' : 'Add Service'}
        </button>
        {editingServiceId && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    <div className="services-table-wrap">
      <table className="services-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.durationMinutes} min</td>
              <td>Rs. {service.price}</td>
              <td>{service.isActive ? 'Active' : 'Inactive'}</td>
              <td className="action-cell">
                <button
                  type="button"
                  className="table-btn edit-btn"
                  onClick={() => onEdit(service)}
                  disabled={!service.id}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`table-btn ${service.isActive ? 'deactivate-btn' : 'activate-btn'}`}
                  onClick={() => {
                    void onToggleStatus(service);
                  }}
                  disabled={!service.id}
                >
                  {service.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default ServicesScreen;

