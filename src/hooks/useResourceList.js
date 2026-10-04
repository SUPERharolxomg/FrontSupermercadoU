import { useCallback, useEffect, useState } from 'react';
import { useNotify } from '../context/NotificationContext';
import { getErrorMessage } from '../utils/errors';

/**
 * Carga el listado de un recurso y expone la operación de eliminar.
 * Lo usan todas las páginas de listado.
 */
export function useResourceList(service, { deletedMessage = 'Registro eliminado' } = {}) {
  const notify = useNotify();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setItems(await service.getAll());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    load();
  }, [load]);

  const removeItem = useCallback(
    async (id) => {
      try {
        await service.remove(id);
        setItems((current) => current.filter((item) => item.id !== id));
        notify(deletedMessage);
      } catch (err) {
        notify(getErrorMessage(err), 'danger');
      }
    },
    [service, notify, deletedMessage]
  );

  return { items, loading, error, reload: load, removeItem };
}
