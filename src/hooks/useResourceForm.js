import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotify } from '../context/NotificationContext';
import { getErrorMessage } from '../utils/errors';

/**
 * Maneja el estado de un formulario de creación/edición.
 * Si la ruta trae :id, carga el registro y al guardar hace PUT; si no, hace POST.
 *
 * @param service       servicio CRUD del recurso
 * @param initialValues valores vacíos del formulario
 * @param fromEntity    convierte el registro del backend en valores del formulario
 * @param toPayload     convierte los valores del formulario en el body de la petición
 * @param redirectTo    ruta a la que se vuelve después de guardar
 */
export function useResourceForm({ service, initialValues, fromEntity = (e) => e, toPayload = (v) => v, redirectTo, entityName }) {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const notify = useNotify();

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    let active = true;
    service
      .getById(id)
      .then((entity) => active && setValues({ ...initialValues, ...fromEntity(entity) }))
      .catch((err) => active && setError(getErrorMessage(err)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // initialValues y fromEntity son constantes de cada módulo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEdit, service]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = toPayload(values, { isEdit });
      if (isEdit) await service.update(id, payload);
      else await service.create(payload);
      notify(`${entityName} ${isEdit ? 'actualizado' : 'creado'} correctamente`);
      navigate(redirectTo);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return { id, isEdit, values, setValues, loading, saving, error, handleChange, handleSubmit };
}
