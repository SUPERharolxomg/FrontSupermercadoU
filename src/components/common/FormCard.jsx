import { Link } from 'react-router-dom';
import AlertMessage from './AlertMessage';
import Loading from './Loading';

/** Contenedor común de los formularios de creación y edición. */
export default function FormCard({ title, icon, isEdit, loading, saving, error, onSubmit, cancelTo, children }) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-9">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
            <h1 className="h4 mb-0">
              <i className={`bi bi-${isEdit ? 'pencil-square' : icon} me-2 text-success`} />
              {isEdit ? `Editar ${title}` : `Nuevo ${title}`}
            </h1>
          </div>
          <div className="card-body">
            <AlertMessage message={error} />
            {loading ? (
              <Loading />
            ) : (
              <form onSubmit={onSubmit}>
                <div className="row g-3">{children}</div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link to={cancelTo} className="btn btn-outline-secondary">
                    Cancelar
                  </Link>
                  <button type="submit" className="btn btn-success" disabled={saving}>
                    {saving ? (
                      <span className="spinner-border spinner-border-sm me-1" />
                    ) : (
                      <i className="bi bi-check-lg me-1" />
                    )}
                    {isEdit ? 'Guardar cambios' : 'Crear'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
