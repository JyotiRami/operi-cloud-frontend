import React from 'react';
import type { MenuItem, MenuKey } from '../../types/dashboard';

interface Props {
  isSidebarOpen: boolean;
  activeMenu: MenuKey;
  items: MenuItem[];
  onToggleSidebar: () => void;
  onChangeMenu: (menu: MenuKey) => void;
}

const SidebarMenu: React.FC<Props> = ({
  isSidebarOpen,
  activeMenu,
  items,
  onToggleSidebar,
  onChangeMenu,
}) => (
  <aside className="dashboard-sidebar" aria-hidden={!isSidebarOpen}>
    <div className="sidebar-top">
      <h2 className="menu-title">Menu</h2>
      <button
        type="button"
        className="menu-toggle-btn"
        onClick={onToggleSidebar}
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          <span className="menu-toggle-glyph" aria-hidden="true">
            X
          </span>
        ) : (
          <span className="menu-toggle-glyph" aria-hidden="true">
            ≡
          </span>
        )}
      </button>
    </div>
    <nav>
      <ul className="menu-list">
        {items.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className={`menu-item ${activeMenu === item.key ? 'menu-item-active' : ''}`}
              onClick={() => onChangeMenu(item.key)}
            >
              <span className="menu-badge">{item.shortLabel}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default SidebarMenu;

