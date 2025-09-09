import { createBrowserRouter, Outlet } from 'react-router-dom';
import AppLayout from '@/components/app-layout';
import NotFoundPage from '../pages/NotFoundPage';
import VehiclesPage from '@/pages/vehicles/VehiclesPage';
import AddVehiclePage from '@/pages/vehicles/AddVehiclePage';
import ClientsPage from '@/pages/clients/ClientsPage';
import AddClientPage from '@/pages/clients/AddClientPage';
import HomePage from '@/pages/HomePage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { breadcrumb: 'Home' } },
      // { path: 'about', element: <AboutPage />, handle: { breadcrumb: 'About' } },
      // { path: 'contact', element: <ContactPage />, handle: { breadcrumb: 'Contact' } },
      {
        path: 'vehicles',
        element: <Outlet />,
        handle: { breadcrumb: 'Vehicles' },
        children: [
          { index: true, element: <VehiclesPage />, handle: { breadcrumb: 'Vehicles' } },
          { path: 'create', element: <AddVehiclePage />, handle: { breadcrumb: 'Create' } },
        ],
      },
      {
        path: 'clients',
        element: <Outlet />,
        handle: { breadcrumb: 'Clients' },
        children: [
          { index: true, element: <ClientsPage />, handle: { breadcrumb: 'Clients' } },
          { path: 'create', element: <AddClientPage />, handle: { breadcrumb: 'Create' } },
        ],
      },
      { path: '*', element: <NotFoundPage />, handle: { breadcrumb: 'Not Found' } },
    ],
  },
]);
