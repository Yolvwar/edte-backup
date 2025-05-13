import { RouteObject } from 'react-router-dom';
import PublicLayout from '../components/layout/public-layout';

import Dashboard from '../pages/Dashboard';
import Documents from '../pages/document/Documents';
import DocumentPage from '../pages/document/DocumentPage';
import Processes from '../pages/Processes';
import Validations from '../pages/Validations';
import NotFound from '../pages/404';


const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { path: '', element: <Dashboard /> },
    ]
  },
  {
    path: '/documents',
    element: <PublicLayout/>,
    children: [
        { path: '', element: <Documents /> },
    ]
  },
  {
    path: '/document/:id',
    element: <PublicLayout />,
    children: [
      { path: '', element: <DocumentPage /> },
    ]
  },
  {
    path: '/processes',
    element: <PublicLayout />,
    children: [
      { path: '', element: <Processes /> },
    ]
  },
  {
    path: '/validations',
    element: <PublicLayout />,
    children: [
      { path: '', element: <Validations /> },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;