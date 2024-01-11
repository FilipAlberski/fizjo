import { Outlet } from 'react-router-dom';
import Alert from '../Alert';

import React from 'react';

const Layout = () => {
  return (
    <>
      <Alert />
      <Outlet />
    </>
  );
};

export default Layout;
