export default function AlertMessage({ message, variant = 'danger', onRetry }) {
  if (!message) return null;
  return (
    <div className={`alert alert-${variant} d-flex flex-wrap justify-content-between align-items-center gap-2`} role="alert">
      <span>
        <i className="bi bi-exclamation-triangle-fill me-2" />
        {message}
      </span>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
