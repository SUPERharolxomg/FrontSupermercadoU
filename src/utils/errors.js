/** Extrae un mensaje legible de un error de Axios, sin importar el formato del backend. */
export function getErrorMessage(error) {
  const data = error?.response?.data;
  if (data && typeof data === 'object') {
    if (data.message) return data.message;
    if (data.error) return data.error;
  }
  if (!error?.response || error.response.status >= 500) {
    return 'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.';
  }
  return error.message || 'Ocurrió un error inesperado';
}
