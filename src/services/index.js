import { createCrudService } from './createCrudService';

export const productService = createCrudService('products');
export const userService = createCrudService('users');
export const providerService = createCrudService('providers');
export const saleService = createCrudService('sales');
