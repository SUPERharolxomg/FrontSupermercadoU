import { useEffect, useState } from 'react';
import { getErrorMessage } from '../utils/errors';

/** Carga los registros de otro recurso para llenar listas desplegables (select). */
export function useOptions(service) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    service
      .getAll()
      .then((data) => active && setOptions(data))
      .catch((err) => active && setError(getErrorMessage(err)));
    return () => {
      active = false;
    };
  }, [service]);

  return { options, error };
}
