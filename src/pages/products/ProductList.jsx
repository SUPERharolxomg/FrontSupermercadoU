import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import Loading from '../../components/common/Loading';
import PageHeader from '../../components/common/PageHeader';
import { useResourceList } from '../../hooks/useResourceList';
import { productService } from '../../services';
import { formatCurrency } from '../../utils/format';

const LOW_STOCK = 10;

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre', render: (p) => <span className="fw-semibold">{p.nombre}</span> },
  { key: 'categoria', label: 'Categoría', render: (p) => (p.categoria ? <span className="badge text-bg-light border">{p.categoria}</span> : '—') },
  { key: 'precio', label: 'Precio', className: 'text-end', render: (p) => formatCurrency(p.precio) },
  {
    key: 'stock',
    label: 'Stock',
    className: 'text-center',
    render: (p) => <span className={`badge ${p.stock <= LOW_STOCK ? 'text-bg-warning' : 'text-bg-success'}`}>{p.stock}</span>,
  },
  { key: 'proveedor', label: 'Proveedor', render: (p) => p.proveedor?.nombre ?? '—' },
];

export default function ProductList() {
  const { items, loading, error, reload, removeItem } = useResourceList(productService, {
    deletedMessage: 'Producto eliminado correctamente',
  });

  return (
    <>
      <PageHeader title="Productos" icon="box-seam" subtitle="Catálogo de productos del supermercado" actionTo="/productos/nuevo" actionLabel="Nuevo producto" />
      <AlertMessage message={error} onRetry={reload} />
      {loading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          rows={items}
          editPath={(p) => `/productos/${p.id}/editar`}
          onDelete={removeItem}
          describe={(p) => p.nombre}
          emptyMessage="Aún no hay productos registrados"
        />
      )}
    </>
  );
}
