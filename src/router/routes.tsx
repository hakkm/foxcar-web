import { createBrowserRouter, Outlet } from 'react-router-dom';
import AppLayout from '@/components/app-layout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostsPage from '@/pages/products/ProductPage';
import AddProductPage from '@/pages/products/AddProductPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { breadcrumb: 'Home' } },
      { path: 'about', element: <AboutPage />, handle: { breadcrumb: 'About' } },
      { path: 'contact', element: <ContactPage />, handle: { breadcrumb: 'Contact' } },
      {
        path: 'posts',
        element: <Outlet />,
        handle: { breadcrumb: 'Posts' },
        children: [
          { index: true, element: <PostsPage />, handle: { breadcrumb: 'Posts' } },
          { path: 'create', element: <AddProductPage />, handle: { breadcrumb: 'Create' } },
        ],
      },
      { path: '*', element: <NotFoundPage />, handle: { breadcrumb: 'Not Found' } },
    ],
  },
]);
