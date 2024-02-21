import { IconDashboard } from '@tabler/icons-react';
import { IconBrandChrome } from '@tabler/icons-react';
import { IconKey } from '@tabler/icons-react';

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Post',
      type: 'item',
      url: '/post',
      icon: IconBrandChrome,
      breadcrumbs: false
    }
  ]
};

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: IconKey,
      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/auth/login',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/auth/register',
          target: true
        }
      ]
    }
  ]
};
const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: IconDashboard,
      breadcrumbs: false
    }
  ]
};

const menuItems = {
  items: [dashboard, pages, other]
};

export default menuItems;
