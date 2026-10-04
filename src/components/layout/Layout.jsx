import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="container py-4 flex-grow-1">
        <Outlet />
      </main>
      <footer className="border-top bg-white py-3 text-center text-secondary small">
        MarketSoft · Sistema de gestión de supermercado
      </footer>
    </div>
  );
}
