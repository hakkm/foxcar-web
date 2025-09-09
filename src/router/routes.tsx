import { createBrowserRouter, Outlet } from 'react-router-dom';
import AppLayout from '@/components/app-layout';
import NotFoundPage from '../pages/NotFoundPage';
import VehiclesPage from '@/pages/vehicles/VehiclesPage';
import AddVehiclePage from '@/pages/vehicles/AddVehiclePage';
import ClientsPage from '@/pages/clients/ClientsPage';
import AddClientPage from '@/pages/clients/AddClientPage';
import HomePage from '@/pages/HomePage';
import PartnersPage from '@/pages/partners/PartnersPage';
import AddPartnerPage from '@/pages/partners/AddPartnerPage';
import FranchisesPage from '@/pages/franchises/FranchisesPage';
import AddFranchisePage from '@/pages/franchises/AddFranchisePage';

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
      {
        path: 'partners',
        element: <Outlet />,
        handle: { breadcrumb: 'Partners' },
        children: [
          { index: true, element: <PartnersPage />, handle: { breadcrumb: 'Partners' } },
          { path: 'create', element: <AddPartnerPage />, handle: { breadcrumb: 'Create' } },
        ],
      },
      {
        path: 'franchises',
        element: <Outlet />,
        handle: { breadcrumb: 'Franchises' },
        children: [
          { index: true, element: <FranchisesPage />, handle: { breadcrumb: 'Franchises' } },
          { path: 'create', element: <AddFranchisePage />, handle: { breadcrumb: 'Create' } },
        ],
      },
      { path: '*', element: <NotFoundPage />, handle: { breadcrumb: 'Not Found' } },
    ],
  },
]);
