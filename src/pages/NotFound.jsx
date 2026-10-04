import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <i className="bi bi-signpost-split display-1 text-secondary" />
      <h1 className="h3 mt-3">Página no encontrada</h1>
      <p className="text-secondary">La ruta que buscas no existe.</p>
      <Link to="/" className="btn btn-success">
        Volver al inicio
      </Link>
    </div>
  );
}
