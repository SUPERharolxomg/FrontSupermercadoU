import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import Loading from '../../components/common/Loading';
import PageHeader from '../../components/common/PageHeader';
import { useResourceList } from '../../hooks/useResourceList';
import { saleService } from '../../services';
import { formatCurrency, formatDate } from '../../utils/format';

const columns = [
  { key: 'id', label: 'N°', render: (s) => `#${s.id}` },
  { key: 'date', label: 'Fecha', render: (s) => formatDate(s.date) },
  { key: 'user', label: 'Usuario', render: (s) => s.user?.nombre ?? '—' },
  {
    key: 'details',
    label: 'Productos',
    render: (s) => (
      <ul className="list-unstyled small mb-0">
        {s.details?.map((d) => (
          <li key={d.id}>
            <span className="badge text-bg-light border me-1">{d.quantity}×</span>
            {d.product?.nombre ?? `Producto #${d.productId}`}
            <span className="text-secondary"> · {formatCurrency(d.price)}</span>
          </li>
        ))}
      </ul>
    ),
  },
  { key: 'total', label: 'Total', className: 'text-end fw-semibold', render: (s) => formatCurrency(s.total) },
];

export default function SaleList() {
  const { items, loading, error, reload, removeItem } = useResourceList(saleService, {
    deletedMessage: 'Venta eliminada y stock devuelto',
  });

  return (
    <>
      <PageHeader title="Ventas" icon="receipt" subtitle="Ventas registradas; el total lo calcula el servidor" actionTo="/ventas/nueva" actionLabel="Nueva venta" />
      <AlertMessage message={error} onRetry={reload} />
      {loading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          rows={items}
          editPath={(s) => `/ventas/${s.id}/editar`}
          onDelete={removeItem}
          describe={(s) => `la venta #${s.id}`}
          emptyMessage="Aún no hay ventas registradas"
        />
      )}
    </>
  );
}
