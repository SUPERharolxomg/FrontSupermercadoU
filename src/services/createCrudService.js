import axiosClient from '../api/axiosClient';

/**
 * Crea un servicio con las operaciones CRUD de un recurso REST.
 * Todos los módulos lo reutilizan para no duplicar código de Axios.
 */
export function createCrudService(resource) {
  const url = `/${resource}`;

  return {
    getAll: (params) => axiosClient.get(url, { params }).then((res) => res.data),
    getById: (id) => axiosClient.get(`${url}/${id}`).then((res) => res.data),
    create: (data) => axiosClient.post(url, data).then((res) => res.data),
    update: (id, data) => axiosClient.put(`${url}/${id}`, data).then((res) => res.data),
    remove: (id) => axiosClient.delete(`${url}/${id}`).then((res) => res.data),
  };
}
