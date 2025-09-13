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
import SubRentalVehiclesPage from '@/pages/sub-rental-vehicles/SubRentalVehiclesPage';
import AddSubRentalVehiclePage from '@/pages/sub-rental-vehicles/AddSubRentalVehiclePage';
import BookingsPage from '@/pages/bookings/BookingsPage';
import AddBookingPage from '@/pages/bookings/AddBookingPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { breadcrumb: 'Accueil' } },
      {
        path: 'vehicles',
        element: <Outlet />,
        handle: { breadcrumb: 'Véhicules' },
        children: [
          { index: true, element: <VehiclesPage />, handle: { breadcrumb: 'Véhicules' } },
          { path: 'create', element: <AddVehiclePage />, handle: { breadcrumb: 'Créer' } },
        ],
      },
      {
        path: 'clients',
        element: <Outlet />,
        handle: { breadcrumb: 'Clients' },
        children: [
          { index: true, element: <ClientsPage />, handle: { breadcrumb: 'Clients' } },
          { path: 'create', element: <AddClientPage />, handle: { breadcrumb: 'Créer' } },
        ],
      },
      {
        path: 'partners',
        element: <Outlet />,
        handle: { breadcrumb: 'Partenaires' },
        children: [
          { index: true, path: 'list', element: <PartnersPage />, handle: { breadcrumb: 'Partenaires' } },
          { path: 'create', element: <AddPartnerPage />, handle: { breadcrumb: 'Créer' } },
          {
            path: 'sub-rentals',
            element: <Outlet />,
            handle: { breadcrumb: 'Sous-location' },
            children: [
              { index: true, element: <SubRentalVehiclesPage />, handle: { breadcrumb: 'Sous-location' } },
              { path: 'create', element: <AddSubRentalVehiclePage />, handle: { breadcrumb: 'Créer' } },
            ],
          },
        ],
      },
      {
        path: 'franchises',
        element: <Outlet />,
        handle: { breadcrumb: 'Franchises' },
        children: [
          { index: true, element: <FranchisesPage />, handle: { breadcrumb: 'Franchises' } },
          { path: 'create', element: <AddFranchisePage />, handle: { breadcrumb: 'Créer' } },
        ],
      },
      {
        path: 'bookings',
        element: <Outlet />,
        handle: { breadcrumb: 'Réservations' },
        children: [
          { index: true, element: <BookingsPage />, handle: { breadcrumb: 'Réservations' } },
          { path: 'create', element: <AddBookingPage />, handle: { breadcrumb: 'Créer' } },
        ],
      },
      { path: '*', element: <NotFoundPage />, handle: { breadcrumb: 'Introuvable' } },
    ],
  },
]);
