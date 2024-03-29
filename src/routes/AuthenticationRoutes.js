import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthRegister31 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3WithGoogle')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/auth/login',
      element: <AuthLogin3 />
    },
    {
      path: '/auth/register',
      element: <AuthRegister3 />
    },
    {
      path: '/auth/register/google',
      element: <AuthRegister31 />
    }
  ]
};

export default AuthenticationRoutes;
