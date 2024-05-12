import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps): React.JSX.Element => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '20px',
        }}
      >
        <main>
          <Container>
            {children}
            <Outlet />
          </Container>
        </main>
      </Container>
    </>
  );
};
export default AdminLayout;
