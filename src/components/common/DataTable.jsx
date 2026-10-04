import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

/**
 * Tabla genérica con acciones de editar y eliminar.
 *
 * @param columns  [{ key, label, render?(row), className? }]
 * @param rows     registros a mostrar
 * @param editPath función que recibe el registro y devuelve la ruta de edición
 * @param onDelete función que recibe el id a eliminar
 * @param describe función que devuelve el nombre del registro para el mensaje de confirmación
 */
export default function DataTable({
  columns,
  rows,
  editPath,
  onDelete,
  describe = (row) => `#${row.id}`,
  emptyMessage = 'No hay registros',
}) {
  const [toDelete, setToDelete] = useState(null);

  const confirmDelete = async () => {
    const row = toDelete;
    setToDelete(null);
    await onDelete(row.id);
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={col.className}>
                  {col.label}
                </th>
              ))}
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center text-secondary py-4">
                  <i className="bi bi-inbox me-2" />
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key} className={col.className}>
                      {col.render ? col.render(row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                  <td className="text-end text-nowrap">
                    <Link to={editPath(row)} className="btn btn-sm btn-outline-primary me-1" title="Editar">
                      <i className="bi bi-pencil-square" />
                      <span className="d-none d-md-inline ms-1">Editar</span>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      title="Eliminar"
                      onClick={() => setToDelete(row)}
                    >
                      <i className="bi bi-trash" />
                      <span className="d-none d-md-inline ms-1">Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        show={Boolean(toDelete)}
        title="Confirmar eliminación"
        message={
          toDelete && (
            <>
              ¿Seguro que deseas eliminar <strong>{describe(toDelete)}</strong>? Esta acción no se puede deshacer.
            </>
          )
        }
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
