import { productService, providerService, saleService, userService } from './services';

/** Módulos del sistema: se usan en el menú y en el panel de inicio. */
export const MODULES = [
  { path: '/productos', label: 'Productos', icon: 'box-seam', service: productService },
  { path: '/proveedores', label: 'Proveedores', icon: 'truck', service: providerService },
  { path: '/usuarios', label: 'Usuarios', icon: 'people', service: userService },
  { path: '/ventas', label: 'Ventas', icon: 'receipt', service: saleService },
];
