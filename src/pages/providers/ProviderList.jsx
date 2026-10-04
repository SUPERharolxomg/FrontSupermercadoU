import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import Loading from '../../components/common/Loading';
import PageHeader from '../../components/common/PageHeader';
import { useResourceList } from '../../hooks/useResourceList';
import { providerService } from '../../services';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre', render: (p) => <span className="fw-semibold">{p.nombre}</span> },
  { key: 'nit', label: 'NIT' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
  { key: 'direccion', label: 'Dirección' },
];

export default function ProviderList() {
  const { items, loading, error, reload, removeItem } = useResourceList(providerService, {
    deletedMessage: 'Proveedor eliminado correctamente',
  });

  return (
    <>
      <PageHeader title="Proveedores" icon="truck" subtitle="Empresas que abastecen el supermercado" actionTo="/proveedores/nuevo" actionLabel="Nuevo proveedor" />
      <AlertMessage message={error} onRetry={reload} />
      {loading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          rows={items}
          editPath={(p) => `/proveedores/${p.id}/editar`}
          onDelete={removeItem}
          describe={(p) => p.nombre}
          emptyMessage="Aún no hay proveedores registrados"
        />
      )}
    </>
  );
}
