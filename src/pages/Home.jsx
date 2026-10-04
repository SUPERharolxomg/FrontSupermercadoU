import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/common/AlertMessage';
import { MODULES } from '../modules';
import { getErrorMessage } from '../utils/errors';
import { formatCurrency } from '../utils/format';

/** Panel de inicio: muestra cuántos registros tiene cada módulo. */
export default function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // allSettled: si un módulo falla, los demás igual muestran su conteo
    Promise.allSettled(MODULES.map((mod) => mod.service.getAll())).then((results) => {
      const failed = results.find((r) => r.status === 'rejected');
      if (failed) setError(getErrorMessage(failed.reason));
      setData(Object.fromEntries(MODULES.map((mod, i) => [mod.path, results[i].value ?? []])));
      setLoading(false);
    });
  }, []);

  const sales = data['/ventas'] ?? [];
  const totalSold = sales.reduce((sum, sale) => sum + Number(sale.total), 0);

  return (
    <>
      <div className="p-4 p-md-5 mb-4 bg-success-subtle rounded-3">
        <h1 className="display-6 fw-bold">
          <i className="bi bi-basket2-fill me-2 text-success" />
          Bienvenido a MarketSoft
        </h1>
        <p className="lead mb-0">Gestiona productos, proveedores, usuarios y ventas del supermercado desde un solo lugar.</p>
      </div>

      <AlertMessage message={error} />

      <div className="row g-3">
        {MODULES.map((mod) => (
          <div className="col-sm-6 col-lg-3" key={mod.path}>
            <Link to={mod.path} className="card h-100 shadow-sm border-0 text-decoration-none">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                  <i className={`bi bi-${mod.icon} fs-4`} />
                </div>
                <div>
                  <div className="text-secondary small">{mod.label}</div>
                  <div className="fs-3 fw-bold text-body">
                    {loading ? <span className="spinner-border spinner-border-sm text-success" /> : (data[mod.path]?.length ?? 0)}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="card shadow-sm border-0 mt-3">
        <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span className="text-secondary">
            <i className="bi bi-cash-coin me-2" />
            Total vendido
          </span>
          <span className="fs-4 fw-bold text-success">{formatCurrency(totalSold)}</span>
        </div>
      </div>
    </>
  );
}
