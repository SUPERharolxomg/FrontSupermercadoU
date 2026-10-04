import axios from 'axios';

/**
 * Instancia única de Axios para toda la aplicación.
 * En desarrollo, Vite redirige /api al backend (ver vite.config.js).
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosClient;
