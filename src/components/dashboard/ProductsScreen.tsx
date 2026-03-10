import React from 'react';
import type { ProductFormState, ProductItem } from '../../types/dashboard';

interface Props {
  products: ProductItem[];
  loading: boolean;
  error: string | null;
  editingProductId: string | null;
  form: ProductFormState;
  onFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancelEdit: () => void;
  onEdit: (product: ProductItem) => void;
  onToggleStatus: (product: ProductItem) => Promise<void>;
}

const ProductsScreen: React.FC<Props> = ({
  products,
  loading,
  error,
  editingProductId,
  form,
  onFormChange,
  onImageChange,
  onSubmit,
  onCancelEdit,
  onEdit,
  onToggleStatus,
}) => (
  <section className="dashboard-panel services-panel">
    <h2>Products</h2>
    {loading && <p>Loading products...</p>}
    {error && <p>{error}</p>}

    <form className="service-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="form-field">
          Name
          <input type="text" name="name" value={form.name} onChange={onFormChange} required />
        </label>
        <label className="form-field">
          Price
          <input
            type="number"
            name="price"
            min={0}
            step="0.01"
            value={form.price}
            onChange={onFormChange}
            required
          />
        </label>
        <label className="form-field">
          Image
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onImageChange(event.target.files?.[0] ?? null)}
            required={!editingProductId}
          />
        </label>
      </div>

      <label className="form-field">
        Description
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={onFormChange}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingProductId ? 'Update Product' : 'Add Product'}
        </button>
        {editingProductId && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}
      </div>
    </form>

    {!loading && !error && products.length === 0 && <p>No products data found.</p>}
    {!loading && products.length > 0 && (
      <div className="services-table-wrap">
        <table className="services-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>Rs. {product.price}</td>
                <td>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>{product.isActive === false ? 'Inactive' : 'Active'}</td>
                <td className="action-cell">
                  <button type="button" className="table-btn edit-btn" onClick={() => onEdit(product)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`table-btn ${product.isActive === false ? 'activate-btn' : 'deactivate-btn'}`}
                    onClick={() => {
                      void onToggleStatus(product);
                    }}
                  >
                    {product.isActive === false ? 'Activate' : 'Deactivate'}
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

export default ProductsScreen;
