import React from 'react';
import type { GenericEntity } from '../../types/dashboard';

interface Props {
  title: string;
  loading: boolean;
  error: string | null;
  rows: GenericEntity[];
}

const formatCellValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '-';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};

const GenericEntityScreen: React.FC<Props> = ({ title, loading, error, rows }) => (
  <section className="dashboard-panel">
    <h2>{title}</h2>
    {loading && <p>Loading {title.toLowerCase()}...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && rows.length === 0 && <p>No {title.toLowerCase()} data found.</p>}
    {!loading && rows.length > 0 && (
      <div className="services-table-wrap">
        <table className="services-table">
          <thead>
            <tr>
              {Object.keys(rows[0])
                .slice(0, 5)
                .map((column) => (
                  <th key={column}>{column}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={String(row.id ?? row._id ?? index)}>
                {Object.keys(rows[0])
                  .slice(0, 5)
                  .map((column) => (
                    <td key={column}>{formatCellValue(row[column])}</td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default GenericEntityScreen;

