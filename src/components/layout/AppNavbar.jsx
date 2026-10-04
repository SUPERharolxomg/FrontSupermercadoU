import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MODULES } from '../../modules';

export default function AppNavbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold" onClick={close}>
          <i className="bi bi-basket2-fill me-2" />
          MarketSoft
        </NavLink>
        <button className="navbar-toggler" type="button" aria-label="Menú" onClick={() => setOpen((v) => !v)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {MODULES.map((mod) => (
              <li className="nav-item" key={mod.path}>
                <NavLink to={mod.path} className="nav-link" onClick={close}>
                  <i className={`bi bi-${mod.icon} me-1`} />
                  {mod.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
