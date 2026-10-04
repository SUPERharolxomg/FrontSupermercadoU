import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductForm from './pages/products/ProductForm';
import ProductList from './pages/products/ProductList';
import ProviderForm from './pages/providers/ProviderForm';
import ProviderList from './pages/providers/ProviderList';
import SaleForm from './pages/sales/SaleForm';
import SaleList from './pages/sales/SaleList';
import UserForm from './pages/users/UserForm';
import UserList from './pages/users/UserList';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="productos" element={<ProductList />} />
        <Route path="productos/nuevo" element={<ProductForm />} />
        <Route path="productos/:id/editar" element={<ProductForm />} />

        <Route path="proveedores" element={<ProviderList />} />
        <Route path="proveedores/nuevo" element={<ProviderForm />} />
        <Route path="proveedores/:id/editar" element={<ProviderForm />} />

        <Route path="usuarios" element={<UserList />} />
        <Route path="usuarios/nuevo" element={<UserForm />} />
        <Route path="usuarios/:id/editar" element={<UserForm />} />

        <Route path="ventas" element={<SaleList />} />
        <Route path="ventas/nueva" element={<SaleForm />} />
        <Route path="ventas/:id/editar" element={<SaleForm />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
