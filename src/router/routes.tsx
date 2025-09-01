import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostsPage from '@/pages/PostsPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage />, handle: { breadcrumb: 'Home' } },
      { path: 'about', element: <AboutPage />, handle: { breadcrumb: 'About' } },
      { path: 'contact', element: <ContactPage />, handle: { breadcrumb: 'Contact' } },
      { path: 'posts', element: <PostsPage />, handle: { breadcrumb: 'Posts' } },
      { path: '*', element: <NotFoundPage />, handle: { breadcrumb: 'Not Found' } },
    ],
  },
]);
