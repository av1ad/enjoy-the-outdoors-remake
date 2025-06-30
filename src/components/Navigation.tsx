import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

interface NavigationItem {
  to: string;
  label: string;
  ariaLabel?: string;
}

const navigationItems: NavigationItem[] = [
  { to: '/', label: 'Home', ariaLabel: 'Go to home page' },
  { to: '/national-parks', label: 'National Parks', ariaLabel: 'Search national parks' },
  { to: '/mountains', label: 'Mountains', ariaLabel: 'View mountain information' }
];

const Navigation: React.FC = memo(() => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark" role="navigation" aria-label="Main navigation">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/" aria-label="Greater Outdoors - Home">
          🏔️ Greater Outdoors
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="mainNavigation">
          <ul className="navbar-nav ms-auto">
            {navigationItems.map(({ to, label, ariaLabel }) => (
              <li key={to} className="nav-item">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                  }
                  aria-label={ariaLabel}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;