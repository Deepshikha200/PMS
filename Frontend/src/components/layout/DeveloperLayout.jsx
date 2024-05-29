import React from 'react';
import { Outlet } from 'react-router-dom';
import DeveloperHeader from '../devloper/Devloper_header';

const DeveloperLayout = () => {
  return (
    <>
      <DeveloperHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DeveloperLayout;
