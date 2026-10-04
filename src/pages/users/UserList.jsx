import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import Loading from '../../components/common/Loading';
import PageHeader from '../../components/common/PageHeader';
import { useResourceList } from '../../hooks/useResourceList';
import { userService } from '../../services';
import { ROLE_BADGES } from './roles';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre', render: (u) => <span className="fw-semibold">{u.nombre}</span> },
  { key: 'email', label: 'Email' },
  { key: 'rol', label: 'Rol', render: (u) => <span className={`badge ${ROLE_BADGES[u.rol] ?? 'text-bg-secondary'}`}>{u.rol}</span> },
];

export default function UserList() {
  const { items, loading, error, reload, removeItem } = useResourceList(userService, {
    deletedMessage: 'Usuario eliminado correctamente',
  });

  return (
    <>
      <PageHeader title="Usuarios" icon="people" subtitle="Personas con acceso al sistema" actionTo="/usuarios/nuevo" actionLabel="Nuevo usuario" />
      <AlertMessage message={error} onRetry={reload} />
      {loading ? (
        <Loading />
      ) : (
        <DataTable
          columns={columns}
          rows={items}
          editPath={(u) => `/usuarios/${u.id}/editar`}
          onDelete={removeItem}
          describe={(u) => u.nombre}
          emptyMessage="Aún no hay usuarios registrados"
        />
      )}
    </>
  );
}
