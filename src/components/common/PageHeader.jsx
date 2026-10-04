import { Link } from 'react-router-dom';

/** Encabezado de página con título, icono y botón de acción opcional. */
export default function PageHeader({ title, icon, subtitle, actionTo, actionLabel }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <div>
        <h1 className="h3 mb-0">
          {icon && <i className={`bi bi-${icon} me-2 text-success`} />}
          {title}
        </h1>
        {subtitle && <p className="text-secondary mb-0">{subtitle}</p>}
      </div>
      {actionTo && (
        <Link to={actionTo} className="btn btn-success">
          <i className="bi bi-plus-lg me-1" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
