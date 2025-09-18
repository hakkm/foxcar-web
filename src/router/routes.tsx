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
import ContractsPage from '@/pages/documents/contracts/ContractsPage';
import AddContractPage from '@/pages/documents/contracts/AddContractPage';
import InvoicesPage from '@/pages/documents/invoices/InvoicesPage';
import AddInvoicePage from '@/pages/documents/invoices/AddInvoicePage';
import OilChangesPage from '@/pages/control/oil-changes/OilChangesPage';
import AddOilChangePage from '@/pages/control/oil-changes/AddOilChangePage';
import InsurancesPage from '@/pages/control/insurances/InsurancesPage';
import AddInsurancePage from '@/pages/control/insurances/AddInsurancePage';
import OtherMaintenancesPage from '@/pages/control/other-maintenances/OtherMaintenancesPage';
import AddOtherMaintenancePage from '@/pages/control/other-maintenances/AddOtherMaintenancePage';
import TechnicalInspectionsPage from '@/pages/control/technical-inspections/TechnicalInspectionsPage';
import AddTechnicalInspectionPage from '@/pages/control/technical-inspections/AddTechnicalInspectionPage';

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
      {
        path: 'documents',
        element: <Outlet />,
        handle: { breadcrumb: 'Documents' },
        children: [
          {
            path: 'invoices',
            element: <Outlet />,
            handle: { breadcrumb: 'Factures' },
            children: [
              { index: true, element: <InvoicesPage />, handle: { breadcrumb: 'Factures' } },
              { path: 'create', element: <AddInvoicePage />, handle: { breadcrumb: 'Créer' } },
            ],
          },
          {
            path: 'contracts',
            element: <Outlet />,
            handle: { breadcrumb: 'Contrats' },
            children: [
              { index: true, element: <ContractsPage />, handle: { breadcrumb: 'Contrats' } },
              { path: 'create', element: <AddContractPage />, handle: { breadcrumb: 'Créer' } },
            ],
          },
        ],
      },
      {
        path: 'control',
        element: <Outlet />,
        handle: { breadcrumb: 'Contrôle' },
        children: [
          {
            path: 'oil-changes',
            element: <Outlet />,
            handle: { breadcrumb: 'Vidanges' },
            children: [
              { index: true, element: <OilChangesPage />, handle: { breadcrumb: 'Liste' } },
              { path: 'create', element: <AddOilChangePage />, handle: { breadcrumb: 'Créer' } },
            ],
          },
          {
            path: 'insurances',
            element: <Outlet />,
            handle: { breadcrumb: 'Assurances' },
            children: [
              { index: true, element: <InsurancesPage />, handle: { breadcrumb: 'Liste' } },
              { path: 'create', element: <AddInsurancePage />, handle: { breadcrumb: 'Créer' } },
            ],
          },
          {
            path: 'other-maintenances',
            element: <Outlet />,
            handle: { breadcrumb: 'Autres maintenances' },
            children: [
              { index: true, element: <OtherMaintenancesPage />, handle: { breadcrumb: 'Liste' } },
              { path: 'create', element: <AddOtherMaintenancePage />, handle: { breadcrumb: 'Créer' } },
            ],
          },
          {
            path: 'technical-inspections',
            element: <Outlet />,
            handle: { breadcrumb: 'Inspections techniques' },
            children: [
              { index: true, element: <TechnicalInspectionsPage />, handle: { breadcrumb: 'Liste' } },
              { path: 'create', element: <AddTechnicalInspectionPage />, handle: { breadcrumb: 'Créer' } },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage />, handle: { breadcrumb: 'Introuvable' } },
    ],
  },
]);
